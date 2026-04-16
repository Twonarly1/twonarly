import { APIError, createAuthEndpoint, sessionMiddleware } from "better-auth/api";
import { verifyMessage } from "viem";
import * as z from "zod";

import type { BetterAuthPlugin } from "better-auth";

/**
 * Parse a plain-text SIWE-style message to extract structured fields.
 *
 * Expected format (ERC-4361):
 *   {domain} wants you to sign in with your Ethereum account:
 *   {address}
 *
 *   {statement}
 *
 *   URI: {uri}
 *   Version: {version}
 *   Chain ID: {chainId}
 *   Nonce: {nonce}
 *   Issued At: {issuedAt}
 *   Expiration Time: {expirationTime}   (optional)
 */
function parseSiweMessage(message: string) {
  const lines = message.split("\n");

  const domainMatch = lines[0]?.match(/^(.+?) wants you to sign in with your Ethereum account:$/);
  const domain = domainMatch?.[1]?.trim();

  const address = lines[1]?.trim();

  const chainIdMatch = message.match(/Chain ID:\s*(\d+)/);
  const chainId = chainIdMatch ? Number(chainIdMatch[1]) : undefined;

  const nonceMatch = message.match(/Nonce:\s*(\S+)/);
  const nonce = nonceMatch?.[1]?.trim();

  const issuedAtMatch = message.match(/Issued At:\s*(.+)/);
  const issuedAt = issuedAtMatch?.[1]?.trim();

  const expirationMatch = message.match(/Expiration Time:\s*(.+)/);
  const expirationTime = expirationMatch?.[1]?.trim();

  return { domain, address, chainId, nonce, issuedAt, expirationTime };
}

/** How long a nonce is valid (5 minutes) */
const NONCE_MAX_AGE_MS = 5 * 60 * 1000;

export const linkWalletPlugin = (opts: { domain: string }) =>
  ({
    id: "link-wallet",
    endpoints: {
      linkWallet: createAuthEndpoint(
        "/siwe/link-wallet",
        {
          method: "POST",
          use: [sessionMiddleware],
          body: z.object({
            message: z.string(),
            signature: z.string(),
            walletAddress: z.string(),
            chainId: z.number().default(1),
          }),
        },
        async (ctx) => {
          const { message, signature, walletAddress, chainId } = ctx.body;
          const session = ctx.context.session;

          // ── 1. Parse the SIWE message and validate structural fields ──

          const parsed = parseSiweMessage(message);

          if (!parsed.nonce) {
            throw new APIError("BAD_REQUEST", {
              message: "Message does not contain a nonce",
            });
          }

          if (parsed.domain !== opts.domain) {
            throw new APIError("BAD_REQUEST", {
              message: "Domain mismatch",
            });
          }

          if (parsed.address?.toLowerCase() !== walletAddress.toLowerCase()) {
            throw new APIError("BAD_REQUEST", {
              message: "Address mismatch",
            });
          }

          if (parsed.chainId !== undefined && parsed.chainId !== chainId) {
            throw new APIError("BAD_REQUEST", {
              message: "Chain ID mismatch",
            });
          }

          if (parsed.expirationTime) {
            const expiry = new Date(parsed.expirationTime);
            if (Number.isNaN(expiry.getTime()) || expiry < new Date()) {
              throw new APIError("BAD_REQUEST", {
                message: "Message has expired",
              });
            }
          }

          // ── 2. Validate and consume the nonce (one-time use) ──
          //
          // better-auth's siwe.nonce() stores nonces in the "verification"
          // model with identifier = "siwe:{address}:{chainId}"

          const identifier = `siwe:${walletAddress}:${chainId}`;

          const records = (await ctx.context.adapter.findMany({
            model: "verification",
            where: [{ field: "identifier", value: identifier }],
            sortBy: { field: "createdAt", direction: "desc" },
            limit: 1,
          })) as {
            id: string;
            value: string;
            createdAt: Date;
            expiresAt: Date;
            identifier: string;
          }[];

          const verificationRecord = records[0];

          if (!verificationRecord) {
            throw new APIError("UNAUTHORIZED", {
              message: "Nonce not found — request a new one",
            });
          }

          if (verificationRecord.value !== parsed.nonce) {
            throw new APIError("UNAUTHORIZED", {
              message: "Invalid nonce",
            });
          }

          const createdAt = new Date(verificationRecord.createdAt);
          if (Date.now() - createdAt.getTime() > NONCE_MAX_AGE_MS) {
            await ctx.context.adapter.delete({
              model: "verification",
              where: [{ field: "id", value: verificationRecord.id }],
            });
            throw new APIError("UNAUTHORIZED", {
              message: "Nonce expired — request a new one",
            });
          }

          // Consume the nonce so it can never be replayed.
          // Also clean up any older stale nonces for this identifier.
          for (const r of records) {
            await ctx.context.adapter.delete({
              model: "verification",
              where: [{ field: "id", value: r.id }],
            });
          }

          // ── 3. Verify the cryptographic signature ──

          const isValid = await verifyMessage({
            address: walletAddress as `0x${string}`,
            message,
            signature: signature as `0x${string}`,
          });

          if (!isValid) {
            throw new APIError("UNAUTHORIZED", {
              message: "Invalid signature",
            });
          }

          // ── 4. Link the wallet ──

          const userWallet = await ctx.context.adapter.findOne({
            model: "walletAddress",
            where: [{ field: "userId", value: session.user.id }],
          });

          if (userWallet) {
            throw new APIError("BAD_REQUEST", {
              message: "You already have a wallet linked. Unlink it first.",
            });
          }

          const existing = await ctx.context.adapter.findOne({
            model: "walletAddress",
            where: [{ field: "address", value: walletAddress }],
          });

          if (existing) {
            throw new APIError("BAD_REQUEST", {
              message: "Wallet already linked to an account",
            });
          }

          await ctx.context.adapter.create({
            model: "walletAddress",
            data: {
              userId: session.user.id,
              address: walletAddress,
              chainId,
              isPrimary: false,
              createdAt: new Date(),
            },
          });

          return ctx.json({ success: true });
        },
      ),

      unlinkWallet: createAuthEndpoint(
        "/siwe/unlink-wallet",
        {
          method: "POST",
          use: [sessionMiddleware],
          body: z.object({
            walletId: z.string(),
          }),
        },
        async (ctx) => {
          const { walletId } = ctx.body;
          const session = ctx.context.session;

          const wallet = await ctx.context.adapter.findOne({
            model: "walletAddress",
            where: [
              { field: "id", value: walletId },
              { field: "userId", value: session.user.id },
            ],
          });

          if (!wallet) {
            throw new APIError("NOT_FOUND", {
              message: "Wallet not found",
            });
          }

          await ctx.context.adapter.delete({
            model: "walletAddress",
            where: [
              { field: "id", value: walletId },
              { field: "userId", value: session.user.id },
            ],
          });

          return ctx.json({ success: true });
        },
      ),
    },
  }) satisfies BetterAuthPlugin;
