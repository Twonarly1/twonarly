function Kbd({ ...props }: React.ComponentProps<"kbd">) {
  return (
    <kbd
      data-slot="kbd"
      className="pointer-events-none ml-2 inline-flex h-5 w-fit min-w-5 select-none items-center justify-center gap-1 rounded border bg-muted custom:bg-surface px-1 font-medium font-sans text-sm [&_svg:not([class*='size-'])]:size-3"
      {...props}
    />
  );
}

function KbdGroup({ ...props }: React.ComponentProps<"div">) {
  return <kbd data-slot="kbd-group" className="inline-flex items-center gap-1" {...props} />;
}

export { Kbd, KbdGroup };
