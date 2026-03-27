"use client";

import { X } from "lucide-react";
import { useTheme } from "next-themes";
import { Toaster as ToasterPrimitive, toast as toastPrimitive } from "sonner";

import { INTENT_ICONS } from "@/components/intent";
import { Button } from "./button";

import type { ToasterProps } from "sonner";
import type { Intent } from "@/components/intent";

interface ToastData {
  title: string;
  description?: string;
}

function toast(intent: Intent, data: ToastData) {
  return toastPrimitive.custom((id) => (
    <div className="relative flex min-w-sm items-center gap-3 rounded-lg bg-background px-3 py-2 shadow-lg ring-1 ring-black/5">
      <Button
        variant="unstyled"
        size="icon-xs"
        className="absolute top-1 right-1 text-muted-foreground hover:text-foreground"
        onClick={() => toastPrimitive.dismiss(id)}
      >
        <X className="icon-xs" />
      </Button>

      <div className="space-y-0">
        <div className="flex items-center gap-2">
          {INTENT_ICONS[intent]}
          <span className="font-medium text-body-sm leading-loose">{data.title}</span>
        </div>
        {data.description && (
          <p className="ml-5.5 text-body-sm text-muted-foreground">{data.description}</p>
        )}
      </div>
    </div>
  ));
}

toast.success = (d: ToastData) => toast("success", d);
toast.error = (d: ToastData) => toast("error", d);
toast.info = (d: ToastData) => toast("info", d);
toast.warning = (d: ToastData) => toast("warning", d);
// TODO: Add action button like "undo" or "view" or something in the future
// TODO: Add promise with loading state in the future

function Toaster(props: ToasterProps) {
  const { theme = "system" } = useTheme();

  return (
    <ToasterPrimitive
      icons={INTENT_ICONS}
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      {...props}
    />
  );
}

export { Toaster, toast };
