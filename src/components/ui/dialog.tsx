import { X } from "lucide-react";
import { Dialog as DialogPrimitive } from "radix-ui";

import { Button } from "./button";

import type * as React from "react";

function Dialog(props: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

function DialogTrigger(props: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal(props: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogClose(props: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

function DialogOverlay(props: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className="data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-out data-[state=open]:animate-in"
      {...props}
    />
  );
}

function DialogContent({
  children,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean;
}) {
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className="data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-4rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-xl border bg-background custom:bg-surface p-6 shadow-lg outline-none duration-0 data-[state=closed]:animate-out data-[state=open]:animate-in sm:max-w-md"
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close asChild data-slot="dialog-close">
            <Button variant="ghost" size="icon-xs" className="absolute top-2 right-2">
              <X className="icon-sm mx-auto" />
              <span className="sr-only">Close</span>
            </Button>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

function DialogHeader(props: React.ComponentProps<"div">) {
  return <div data-slot="dialog-header" className="flex flex-col gap-2 text-left" {...props} />;
}

function DialogFooter(props: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end"
      {...props}
    />
  );
}

function DialogTitle(props: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className="font-semibold text-foreground text-lg leading-none"
      {...props}
    />
  );
}

function DialogDescription(props: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className="text-muted-foreground"
      {...props}
    />
  );
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
