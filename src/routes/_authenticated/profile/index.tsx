import { createFileRoute, useNavigate, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Pen, Trash } from "lucide-react";
import { useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "@/components/ui/item";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/toast";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { authClient } from "@/lib/auth/auth-client";
import { getSession } from "@/server/functions/get-session";
import { deleteUser } from "@/server/functions/user/delete-user";
import { getUser } from "@/server/functions/user/get-user";
import { removeAvatar } from "@/server/functions/user/remove-avatar";
import { updateUser } from "@/server/functions/user/update-user";
import { uploadAvatar } from "@/server/functions/user/upload-avatar";

import type { RefObject } from "react";

export const Route = createFileRoute("/_authenticated/profile/")({
  component: ProfilePage,
  loader: async () => {
    const session = await getSession();

    return getUser({ data: { userId: session?.userId! } });
  },
});

function ProfilePage() {
  const user = Route.useLoaderData();
  const router = useRouter();
  const navigate = useNavigate();
  const { data: session, isPending } = authClient.useSession();

  const removeAvatarFn = useServerFn(removeAvatar);
  const uploadAvatarFn = useServerFn(uploadAvatar);
  const updateUserFn = useServerFn(updateUser);
  const deleteUserFn = useServerFn(deleteUser);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [name, setName] = useState(user?.name);

  const handleRemoveAvatar = async () => {
    try {
      await removeAvatarFn();
      toast.success({ title: "Profile updated" });
      router.invalidate();
    } catch (error) {
      console.error("File upload error:", error);
      toast.error({ title: "Failed to update profile" });
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("file", file);

      await uploadAvatarFn({ data: formData });

      toast.success({ title: "Profile updated" });
      router.invalidate();
    } catch (error) {
      console.error("File upload error:", error);
      toast.error({ title: "Failed to update profile" });
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleUpdateName = async () => {
    if (!name?.trim()) return;
    try {
      await updateUserFn({ data: { name: name.trim() } });
      toast.success({ title: "Profile updated" });
      router.invalidate();
    } catch (error) {
      console.error("Update name error:", error);
      toast.error({ title: "Failed to update profile" });
    }
  };

  useOnClickOutside(containerRef as RefObject<HTMLElement>, () => {
    if (name?.trim() && name !== user?.name) {
      handleUpdateName();
    }
  });

  if (!user) {
    return (
      <div className="Fields-center flex h-dvh justify-center">
        <LoadingSwap isLoading={isPending} className="Fields-center flex gap-2">
          Loading
        </LoadingSwap>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="container mx-auto space-y-12 p-4">
      <h1 className="items-baseline font-medium text-h1">Profile</h1>
      <ItemGroup className="rounded-lg border">
        <Item size="sm">
          <ItemContent>
            <ItemTitle>Profile picture</ItemTitle>
          </ItemContent>

          <ItemActions>
            {user.image ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar
                    role="button"
                    className="group relative size-9 cursor-pointer rounded-full"
                  >
                    <AvatarImage
                      src={user?.image || undefined}
                      alt={user?.name || "User avatar"}
                      className="rounded-lg"
                    />

                    <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition-opacity group-hover:opacity-100">
                      <Pen className="icon-sm" />
                    </div>

                    <AvatarFallback className="size-9 rounded-full">
                      {user?.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="min-w-48">
                  <DropdownMenuGroup className="space-y-0.5">
                    <DropdownMenuItem onClick={triggerFileUpload}>
                      <Pen className="icon-xs" />
                      Change avatar
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={handleRemoveAvatar}>
                      <Trash className="icon-xs" />
                      Remove avatar
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Tooltip delayDuration={500}>
                <TooltipTrigger asChild>
                  <Avatar
                    onClick={triggerFileUpload}
                    role="button"
                    className="group relative size-9 cursor-pointer rounded-full"
                  >
                    <AvatarImage
                      src={user?.image || undefined}
                      alt={user?.name || "User avatar"}
                      className="rounded-lg"
                    />

                    <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition-opacity group-hover:opacity-100">
                      <Pen className="icon-sm" />
                    </div>

                    <AvatarFallback className="size-9 rounded-full">
                      {user?.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent side="left" sideOffset={8} className="text-body-xs">
                  Change avatar
                </TooltipContent>
              </Tooltip>
            )}
          </ItemActions>
        </Item>

        <Separator />

        <Item size="sm">
          <ItemContent>
            <ItemTitle>Email</ItemTitle>
          </ItemContent>
          <ItemActions>
            <div className="flex h-8 items-center">
              <p className="font-medium">{session?.user.email}</p>
            </div>
          </ItemActions>
        </Item>

        <Separator />

        <Item size="sm">
          <ItemContent>
            <ItemTitle>Username</ItemTitle>
          </ItemContent>
          <ItemActions>
            <Input value={name} onChange={(e) => setName(e.target.value)} id="name" required />
          </ItemActions>
        </Item>
      </ItemGroup>

      <ItemGroup className="rounded-lg border">
        <Item size="sm">
          <ItemContent>
            <ItemTitle>Delete account</ItemTitle>
            <ItemDescription>All your data will be permanently deleted.</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button
              variant="destructive"
              onClick={() => {
                deleteUserFn({ data: { id: user.id } });
                navigate({ to: "/" });
              }}
            >
              Delete
            </Button>
          </ItemActions>
        </Item>
      </ItemGroup>

      {/* Hidden file input for avatar upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        onChange={handleFileUpload}
        className="hidden"
      />
    </div>
  );
}
