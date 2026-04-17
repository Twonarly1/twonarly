import { useEffect, useRef } from "react";
import { useCopyToClipboard } from "usehooks-ts";

import { cn } from "@/lib/utils";
import { StatusSuccessIcon } from "./icons/status-success";
import { Button } from "./ui/button";

const hide = "opacity-0 blur-[2px]";
const show = "opacity-100 blur-none";

interface Props {
  text?: string;
}

export default function CopyButton({ text = "Copy me!" }: Props) {
  const [copiedText, copy] = useCopyToClipboard();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCopy = () => {
    copy(text);
    timeoutRef.current = setTimeout(() => copy(""), 1800);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const copied = !!copiedText;

  return (
    <div className="relative grid place-items-center">
      <Button
        variant="outline"
        size="icon-sm"
        onClick={handleCopy}
        disabled={copied}
        className="transition-transform duration-150 ease-out-strong active:scale-[0.97]"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className={cn(
            "icon-sm absolute",
            "transition-[opacity,filter] duration-150 ease-out-strong",
            copied ? hide : show,
          )}
        >
          <title>Copy</title>
          <path
            d="M9 9V5.25C9 4.00736 10.0074 3 11.25 3H18.75C19.9926 3 21 4.00736 21 5.25V12.75C21 13.9926 19.9926 15 18.75 15H15M12.75 9H5.25C4.00736 9 3 10.0074 3 11.25V18.75C3 19.9926 4.00736 21 5.25 21H12.75C13.9926 21 15 19.9926 15 18.75V11.25C15 10.0074 13.9926 9 12.75 9Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Button>

      <StatusSuccessIcon
        className={cn(
          "icon-sm pointer-events-none absolute",
          "transition-[opacity,filter] duration-150 ease-out-strong",
          copied ? show : hide,
        )}
      />
    </div>
  );
}
