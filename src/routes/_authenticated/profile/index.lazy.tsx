import { createLazyFileRoute, useNavigate, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Pen, Trash } from "lucide-react";
import { useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";

import PageContainer from "@/components/page-container";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { toast } from "@/components/ui/toast";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { authClient, signOut } from "@/lib/auth/auth-client";
import { deleteUser } from "@/server/functions/user/delete-user";
import { removeAvatar } from "@/server/functions/user/remove-avatar";
import { updateUser } from "@/server/functions/user/update-user";
import { uploadAvatar } from "@/server/functions/user/upload-avatar";

import type { RefObject } from "react";

export const Route = createLazyFileRoute("/_authenticated/profile/")({
  component: ProfilePage,
});

function ProfilePage() {
  const { user } = Route.useRouteContext();

  const router = useRouter();
  const navigate = useNavigate();
  const { refetch } = authClient.useSession();

  const removeAvatarFn = useServerFn(removeAvatar);
  const uploadAvatarFn = useServerFn(uploadAvatar);
  const updateUserFn = useServerFn(updateUser);
  const deleteUserFn = useServerFn(deleteUser);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [name, setName] = useState(user.name);

  const handleRemoveAvatar = async () => {
    try {
      await removeAvatarFn();
      toast.success({ title: "Profile updated" });
      await refetch();
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
      await refetch();
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
      await refetch();
      router.invalidate();
    } catch (error) {
      console.error("Update name error:", error);
      toast.error({ title: "Failed to update profile" });
    }
  };

  useOnClickOutside(containerRef as RefObject<HTMLElement>, () => {
    if (name?.trim() && name !== user.name) {
      handleUpdateName();
    }
  });

  return (
    <PageContainer ref={containerRef}>
      <h1 className="items-baseline font-medium text-4xl">Profile</h1>

      <ItemGroup className="rounded-lg border">
        <Item>
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
                      src={user.image || undefined}
                      alt={user.name || "User avatar"}
                      className="rounded-lg"
                    />

                    <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition-opacity group-hover:opacity-100">
                      <Pen className="icon-sm" />
                    </div>

                    <AvatarFallback className="size-9 rounded-full">
                      {user.name?.charAt(0)}
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
              <Tooltip delayDuration={400}>
                <TooltipTrigger asChild>
                  <Avatar
                    onClick={triggerFileUpload}
                    role="button"
                    className="group relative size-9 cursor-pointer rounded-full"
                  >
                    <AvatarImage
                      src={user.image || undefined}
                      alt={user.name || "User avatar"}
                      className="rounded-lg"
                    />

                    <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition-opacity group-hover:opacity-100">
                      <Pen className="icon-sm" />
                    </div>

                    <AvatarFallback className="size-9 rounded-full">
                      {user.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent side="left" sideOffset={8} className="text-xs">
                  Change avatar
                </TooltipContent>
              </Tooltip>
            )}
          </ItemActions>
        </Item>

        <Item>
          <ItemContent>
            <ItemTitle>Email</ItemTitle>
          </ItemContent>
          <ItemActions>
            <p className="py-1.5 text-secondary-foreground">{user.email}</p>
          </ItemActions>
        </Item>

        <Item>
          <ItemContent>
            <ItemTitle>Username</ItemTitle>
          </ItemContent>
          <ItemActions>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
              required
              className="shadow-none"
            />
          </ItemActions>
        </Item>
      </ItemGroup>

      <ItemGroup className="rounded-lg border">
        <Item>
          <ItemContent>
            <ItemTitle>Delete account</ItemTitle>
            <ItemDescription>All your data will be permanently deleted.</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="destructive">Delete</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                  <DialogTitle>Delete account</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete your account? This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button
                    variant="destructive"
                    onClick={async () => {
                      await deleteUserFn({ data: { id: user.id } });
                      await signOut();
                      await router.invalidate();
                      await navigate({ to: "/" });
                    }}
                  >
                    Delete
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
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
    </PageContainer>
  );
}
