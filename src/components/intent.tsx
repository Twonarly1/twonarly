import { StatusErrorIcon } from "@/components/icons/status-error";
import { StatusInfoIcon } from "@/components/icons/status-info";
import { StatusSuccessIcon } from "@/components/icons/status-success";
import { StatusWarningIcon } from "@/components/icons/status-warning";

import type { ReactNode } from "react";

export type Intent = "success" | "error" | "info" | "warning";

export const INTENT_ICONS: Record<Intent, ReactNode> = {
  success: <StatusSuccessIcon />,
  error: <StatusErrorIcon />,
  warning: <StatusWarningIcon />,
  info: <StatusInfoIcon />,
};
