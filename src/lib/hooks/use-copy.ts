import { useEffect, useRef, useState } from "react";

export function useCopy(text: string) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    timeoutRef.current = setTimeout(() => setCopied(false), 1800);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return { copy, copied };
}
