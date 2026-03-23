"use client";

import { Check, Info, X } from "lucide-react";
import { useTheme } from "next-themes";
import { Toaster as ToasterPrimitive, toast as toastPrimitive } from "sonner";

import { Button } from "./button";

import type { ReactNode } from "react";
import type { ToasterProps } from "sonner";

// TODO: rethink
// Mmove some acions to hook

type Intent = "success" | "error" | "info" | "warning";

interface ToastData {
  title: string;
  description?: string;
  intent?: Intent;
}

const ICONS: Record<Intent, ReactNode> = {
  success: (
    <div className="icon-xs flex shrink-0 items-center justify-center rounded-full bg-green-500 p-0.5">
      <Check strokeWidth={3} className="icon-xs text-white" />
    </div>
  ),
  error: (
    <div className="icon-xs flex shrink-0 items-center justify-center rounded-full bg-red-500 p-0.5">
      <X strokeWidth={3} className="icon-xs text-white" />
    </div>
  ),
  warning: (
    <svg viewBox="0 0 24 24" className="icon-xs shrink-0">
      <title>Warning</title>
      <path
        d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
        fill="#f59e0b"
      />
      <text
        x="12"
        y="18.5"
        textAnchor="middle"
        fontSize="text-body-xs"
        fontWeight="900"
        fill="white"
      >
        !
      </text>
    </svg>
  ),
  info: <Info className="icon-xs text-blue-500" />,
};

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
          {ICONS[intent]}
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
