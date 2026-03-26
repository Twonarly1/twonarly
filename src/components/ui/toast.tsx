"use client";

import { X } from "lucide-react";
import { useTheme } from "next-themes";
import { Toaster as ToasterPrimitive, toast as toastPrimitive } from "sonner";

import { INTENT_ICONS } from "@/components/intent";
import { Button } from "./button";

import type { ToasterProps } from "sonner";
import type { Intent } from "@/components/intent";

// TODO: Move some actions to hook and just display UI here.
// TODO: Implement a toast.promise.

interface ToastData {
  title: string;
  description?: string;
  intent?: Intent;
}

function ToastUI({
  id,
  title,
  description,
  intent = "success",
}: ToastData & { id: string | number }) {
  return (
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
          <span className="font-medium text-body-sm leading-loose">{title}</span>
        </div>
        {description && <p className="ml-5.5 text-body-sm text-muted-foreground">{description}</p>}
      </div>
    </div>
  );
}

function show(data: ToastData) {
  return toastPrimitive.custom((id) => <ToastUI id={id} {...data} />);
}

export const toast = {
  success: (d: Omit<ToastData, "intent">) => show({ ...d, intent: "success" }),
  error: (d: Omit<ToastData, "intent">) => show({ ...d, intent: "error" }),
  info: (d: Omit<ToastData, "intent">) => show({ ...d, intent: "info" }),
  warning: (d: Omit<ToastData, "intent">) => show({ ...d, intent: "warning" }),
  custom: toastPrimitive.custom,
  dismiss: toastPrimitive.dismiss,
};

export function Toaster(props: ToasterProps) {
  const { theme = "light" } = useTheme();

  return (
    <ToasterPrimitive theme={theme as ToasterProps["theme"]} className="toaster group" {...props} />
  );
}
