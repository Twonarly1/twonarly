"use client";

import { X } from "lucide-react";
import { Toaster as ToasterPrimitive, toast as toastPrimitive } from "sonner";

import { StatusErrorIcon } from "@/components/icons/status-error";
import { StatusInfoIcon } from "@/components/icons/status-info";
import { StatusSuccessIcon } from "@/components/icons/status-success";
import { StatusWarningIcon } from "@/components/icons/status-warning";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/lib/hooks/use-mobile";
import { useTheme } from "@/providers/theme-provider";

import type { ReactNode } from "react";
import type { ToasterProps } from "sonner";

type Intent = "success" | "error" | "info" | "warning";

const INTENT_ICONS: Record<Intent, ReactNode> = {
  success: <StatusSuccessIcon />,
  error: <StatusErrorIcon />,
  warning: <StatusWarningIcon />,
  info: <StatusInfoIcon />,
};

interface ToastData {
  title: string;
  description?: string;
}

function toast(intent: Intent, data: ToastData) {
  return toastPrimitive.custom((id) => (
    <div className="relative flex items-center gap-3 rounded-lg bg-background px-3 py-2 shadow-lg ring-1 ring-black/5 sm:min-w-sm">
      <Button
        variant="unstyled"
        size="icon-xs"
        className="absolute top-1 right-1 text-muted-foreground hover:text-foreground"
        onClick={() => toastPrimitive.dismiss(id)}
      >
        <X className="icon-sm" />
      </Button>

      <div className="space-y-0">
        <div className="flex items-center gap-2">
          {INTENT_ICONS[intent]}
          <span className="font-medium text-base leading-loose">{data.title}</span>
        </div>
        {data.description && (
          <p className="ml-5.5 text-base text-muted-foreground">{data.description}</p>
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
  const { theme } = useTheme();
  const isMobile = useIsMobile();

  return (
    <ToasterPrimitive
      icons={INTENT_ICONS}
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position={isMobile ? "top-center" : "bottom-right"}
      {...props}
    />
  );
}

export { Toaster, toast };
