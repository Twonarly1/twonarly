interface Props {
  value: number;
  onChange: (value: number) => void;
}

export function SliderControl({ value, onChange }: Props) {
  return (
    <div className="flex h-10 w-full items-center gap-3">
      <input
        type="range"
        min={15}
        max={100}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full bg-muted accent-primary"
      />
      <span className="w-8 text-right font-medium text-base tabular-nums">{value}</span>
    </div>
  );
}
