import { generateId } from "better-auth";
import { APIError, createAuthEndpoint, sessionMiddleware } from "better-auth/api";
import { verifyMessage } from "viem";
import * as z from "zod";

import type { BetterAuthPlugin } from "better-auth";

export const linkWalletPlugin = () =>
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

          const isValid = await verifyMessage({
            address: walletAddress as `0x${string}`,
            message,
            signature: signature as `0x${string}`,
          });

          if (!isValid) {
            throw new APIError("UNAUTHORIZED", { message: "Invalid signature" });
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
              id: generateId(),
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

          // Only allow unlinking wallets that belong to the current user
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
