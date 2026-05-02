import type { ComponentProps } from "react";

function Collapsible({ open, children, ...props }: ComponentProps<"div"> & { open: boolean }) {
  return (
    <div
      data-slot="collapsible"
      data-open={open}
      className={`overflow-hidden transition-[height,opacity] duration-200 ease-out-strong [interpolate-size:allow-keywords] ${open ? "h-auto opacity-100" : "h-0 opacity-0"}`}
      {...props}
    >
      {children}
    </div>
  );
}

export { Collapsible };
