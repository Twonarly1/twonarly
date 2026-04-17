import { CheckIcon, Signal } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { SidebarMenuButton } from "./ui/sidebar";

type Phase = "idle" | "form" | "submitting" | "done";

const TIMING = {
  AUTO_CLOSE_DELAY: 2400,
  SUBMIT_DURATION: 1500,
} as const;

function useFeedbackFlow() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [text, setText] = useState("");

  const isIdle = phase === "idle";
  const isForm = phase === "form";
  const isSubmitting = phase === "submitting";
  const isDone = phase === "done";
  const canSubmit = text.trim().length > 0 && isForm;

  const open = useCallback((): void => setPhase("form"), []);

  const close = useCallback((): void => {
    setPhase("idle");
    setText("");
  }, []);

  const submit = useCallback((): void => {
    if (!text.trim()) return;
    setPhase("submitting");
    setTimeout(() => setPhase("done"), TIMING.SUBMIT_DURATION);
  }, [text]);

  useEffect(() => {
    if (!isDone) return;
    const t = setTimeout(close, TIMING.AUTO_CLOSE_DELAY);
    return () => clearTimeout(t);
  }, [isDone, close]);

  return {
    phase,
    text,
    setText,
    isIdle,
    isForm,
    isSubmitting,
    isDone,
    canSubmit,
    open,
    close,
    submit,
  } as const;
}

function FeedbackForm({
  text,
  setText,
  isSubmitting,
  canSubmit,
  onSubmit,
  taRef,
}: {
  text: string;
  setText: (value: string) => void;
  isSubmitting: boolean;
  canSubmit: boolean;
  onSubmit: () => void;
  taRef: React.RefObject<HTMLTextAreaElement | null>;
}) {
  return (
    <div className="flex flex-col gap-3">
      <Textarea
        ref={taRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What's on your mind?"
        disabled={isSubmitting}
        className={cn("min-h-24 resize-none", isSubmitting && "opacity-45")}
      />

      <div className="flex justify-end gap-2">
        <Button variant="default" size="default" onClick={onSubmit} disabled={!canSubmit}>
          {isSubmitting ? (
            <>
              <Spinner className="size-3.5" />
              <span>Sending</span>
            </>
          ) : (
            "Send feedback"
          )}
        </Button>
      </div>
    </div>
  );
}

export default function FeedbackWidget() {
  const flow = useFeedbackFlow();
  const taRef = useRef<HTMLTextAreaElement>(null);

  const isPopoverOpen = !flow.isIdle;

  useEffect(() => {
    if (flow.isForm) {
      const t = setTimeout(() => taRef.current?.focus(), 100);
      return () => clearTimeout(t);
    }
  }, [flow.isForm]);

  const handleOpenChange = (open: boolean): void => {
    if (open) {
      flow.open();
    } else if (!flow.isSubmitting) {
      flow.close();
    }
  };

  return (
    <Popover open={isPopoverOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <SidebarMenuButton className="transition-transform duration-160 ease-out-strong active:scale-[.97]">
          <Signal className="icon-sm" />
          Feedback
        </SidebarMenuButton>
      </PopoverTrigger>

      <PopoverContent
        sideOffset={8}
        className="w-80 p-1.5"
        onInteractOutside={(e) => {
          if (flow.isSubmitting) e.preventDefault();
        }}
        onEscapeKeyDown={(e) => {
          if (flow.isSubmitting) e.preventDefault();
        }}
      >
        {flow.isDone ? (
          <div className="flex flex-col items-center justify-center px-6 py-10">
            <div className="flex size-11 items-center justify-center rounded-full border border-green-600/20 bg-green-600/8">
              <CheckIcon className="size-5 text-green-600" strokeWidth={2.2} />
            </div>
            <p className="mt-3 font-semibold text-sm tracking-tight">Thank you!</p>
            <p className="mt-1 text-center text-muted-foreground text-xs leading-normal">
              Your feedback has been received.
            </p>
          </div>
        ) : (
          <FeedbackForm
            text={flow.text}
            setText={flow.setText}
            isSubmitting={flow.isSubmitting}
            canSubmit={flow.canSubmit}
            onSubmit={flow.submit}
            taRef={taRef}
          />
        )}
      </PopoverContent>
    </Popover>
  );
}
