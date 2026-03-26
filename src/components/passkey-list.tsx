import { useRouter } from "@tanstack/react-router";
import { Fingerprint, Pencil, Trash } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Item, ItemActions, ItemContent, ItemDescription, ItemGroup } from "@/components/ui/item";
import { authClient } from "@/lib/auth/auth-client";
import { Separator } from "./ui/separator";

import type { Passkey } from "@better-auth/passkey/client";

interface Props {
  passkeys: Passkey[];
}

const PasskeyList = ({ passkeys }: Props) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const router = useRouter();

  const handleDeletePasskey = async (id: string) => {
    await authClient.passkey.deletePasskey({ id });
    router.invalidate();
  };

  const handleRenamePasskey = async (id: string) => {
    if (!editName.trim()) return;

    await authClient.passkey.updatePasskey({ id, name: editName.trim() });

    setEditingId(null);
    setEditName("");
    router.invalidate();
  };

  const handleAddPasskey = async () => {
    const { error } = await authClient.passkey.addPasskey({
      name: "example-passkey-name",
      authenticatorAttachment: "platform",
    });

    if (!error) router.invalidate();
  };

  return (
    <ItemGroup className="rounded-lg border">
      {passkeys.map((pk: Passkey) => (
        <>
          <Item size="sm" key={pk.id}>
            <ItemContent>
              <div className="flex items-center gap-2">
                <Fingerprint className="size-8 p-1 text-muted-foreground" />
                <div>
                  {editingId === pk.id ? (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleRenamePasskey(pk.id);
                      }}
                      className="flex items-center gap-2"
                    >
                      <Input
                        autoFocus
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="h-7 w-48"
                      />
                      <Button type="submit" size="sm" variant="ghost">
                        Save
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => setEditingId(null)}>
                        Cancel
                      </Button>
                    </form>
                  ) : (
                    <>
                      <p className="font-medium text-body">{pk.name || "Unnamed passkey"}</p>
                      <p className="text-body-sm text-muted-foreground">
                        Added {new Date(pk.createdAt).toLocaleDateString()}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </ItemContent>

            {editingId !== pk.id && (
              <ItemActions>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => {
                    setEditingId(pk.id);
                    setEditName(pk.name || "");
                  }}
                >
                  <Pencil className="icon-xs" />
                </Button>
                <Button variant="ghost" size="icon-sm" onClick={() => handleDeletePasskey(pk.id)}>
                  <Trash className="icon-xs" />
                </Button>
              </ItemActions>
            )}
          </Item>

          <Separator />
        </>
      ))}

      <Item>
        <ItemContent>
          <ItemDescription>No passkeys yet</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="ghost" size="sm" onClick={handleAddPasskey}>
            Add passkey
          </Button>
        </ItemActions>
      </Item>
    </ItemGroup>
  );
};

export default PasskeyList;
