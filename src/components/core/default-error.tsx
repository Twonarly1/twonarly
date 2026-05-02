import { useRouter } from "@tanstack/react-router";
import { ArrowLeft, RefreshCw } from "lucide-react";

import Link from "@/components/core/link";
import { Button } from "@/components/ui/button";
import { StatusErrorIcon } from "../icons/status-error";

import type { ErrorComponentProps } from "@tanstack/react-router";

const DefaultError = ({ error }: ErrorComponentProps) => {
  const router = useRouter();
  const message = error instanceof Error ? error.message : "Something went wrong";

  return (
    <div className="mx-auto flex h-full w-full max-w-lg flex-col items-center justify-center gap-8 text-center">
      {/* Icon badge */}
      <StatusErrorIcon className="size-12! shrink-0 grow-0" />

      <div className="space-y-2">
        <h1 className="font-medium text-2xl">Something went wrong</h1>
        <p className="text-base text-muted-foreground">{message}</p>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={() => router.invalidate()}
          className="custom:hover:bg-surface"
        >
          <RefreshCw className="icon-sm" />
          Try Again
        </Button>

        <Button
          variant="outline"
          onClick={(e) => {
            e.preventDefault();
            window.history.back();
          }}
          className="custom:hover:bg-surface"
        >
          <ArrowLeft className="icon-sm" />
          Go Back
        </Button>

        <Link to="/">Go to Home</Link>
      </div>
    </div>
  );
};

export default DefaultError;
