import { useRouter } from "@tanstack/react-router";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "@/components/ui/item";
import { toast } from "@/components/ui/toast";
import { authClient } from "@/lib/auth/auth-client";
import { Route } from "@/routes/_authenticated/accounts";

const PasskeyList = () => {
  const { passkeys } = Route.useLoaderData();

  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState("");
  const router = useRouter();

  const handleDeletePasskey = async (id: string) => {
    const { error } = await authClient.passkey.deletePasskey({ id });

    if (error) {
      toast.error({
        title: "Failed to delete passkey",
        description: getAuthErrorMessage(error),
      });
      return;
    }

    router.invalidate();
  };

  const handleAddPasskey = async () => {
    if (!newName.trim()) return;

    const { error } = await authClient.passkey.addPasskey({
      name: newName.trim(),
      authenticatorAttachment: "platform",
    });

    if (error) {
      toast.error({
        title: "Failed to add passkey",
        description: getAuthErrorMessage(error),
      });
      return;
    }

    setIsAdding(false);
    setNewName("");
    router.invalidate();
  };

  return (
    <ItemGroup variant="list">
      {passkeys.map((pk) => (
        <Item key={pk.id}>
          <ItemContent>
            <ItemTitle>{pk.name || "Unnamed passkey"}</ItemTitle>
            <ItemDescription>Added {new Date(pk.createdAt).toLocaleDateString()}</ItemDescription>
          </ItemContent>

          <ItemActions>
            <Button variant="ghost" onClick={() => handleDeletePasskey(pk.id)}>
              Remove
            </Button>
          </ItemActions>
        </Item>
      ))}

      <Item>
        <ItemContent>
          {isAdding ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddPasskey();
              }}
              className="flex items-center gap-2"
            >
              <Input
                autoFocus
                placeholder="Enter name..."
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="h-7 w-full sm:w-48"
              />

              <div className="flex items-center">
                <Button type="submit" variant="ghost">
                  Save
                </Button>

                <Button
                  variant="ghost"
                  onClick={() => {
                    setIsAdding(false);
                    setNewName("");
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          ) : (
            <ItemDescription>
              {passkeys.length === 0 ? "No passkeys yet" : "Add another passkey"}
            </ItemDescription>
          )}
        </ItemContent>

        {!isAdding && (
          <ItemActions>
            <Button variant="ghost" onClick={() => setIsAdding(true)}>
              Add passkey
            </Button>
          </ItemActions>
        )}
      </Item>
    </ItemGroup>
  );
};
export default PasskeyList;

const AUTH_ERROR_MESSAGES: Record<string, string> = {
  SESSION_NOT_FRESH: "Please re-authenticate to manage your account.",
  CREDENTIAL_NOT_FOUND: "Passkey not found. It may have already been removed.",
  TOO_MANY_REQUESTS: "Too many attempts. Please wait a moment.",
  // add codes as you encounter them
};

function getAuthErrorMessage(error: { code?: string; message?: string }): string {
  if (error.code && error.code in AUTH_ERROR_MESSAGES) {
    return AUTH_ERROR_MESSAGES[error.code];
  }

  return error.message || "Something went wrong. Please try again.";
}
