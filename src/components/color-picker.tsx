import { useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface Props {
  value?: string;
  onChange: (value: string) => void;
}

const ColorPicker = ({ value, onChange }: Props) => {
  const [inputValue, setInputValue] = useState(value);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    // Validate hex color (with or without #)
    const hexRegex = /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    if (hexRegex.test(newValue)) {
      const hexWithHash = newValue.startsWith("#") ? newValue : `#${newValue}`;
      onChange(hexWithHash);
    }
  };

  const handlePickerChange = (color: string) => {
    onChange(color);
    setInputValue(color);
  };

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <Popover>
      <Input
        value={inputValue}
        onChange={handleInputChange}
        placeholder="#000000"
        className="w-full shadow-none transition-none"
      />
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0">
          {value ? (
            <div className="size-4 rounded-full border" style={{ backgroundColor: value }} />
          ) : (
            <div className="relative size-4 overflow-hidden rounded-full">
              <div
                className="absolute inset-0"
                style={{
                  background: `conic-gradient(
                      from 0deg,
                      #ef4444 0deg 60deg,
                      #f59e0b 60deg 120deg,
                      #eab308 120deg 180deg,
                      #22c55e 180deg 240deg,
                      #3b82f6 240deg 300deg,
                      #a855f7 300deg 360deg
                    )`,
                }}
              />
            </div>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent align="end" className="w-80 p-3">
        <div className="color-picker-custom flex w-56 flex-col gap-3">
          <HexColorPicker color={value || "#000000"} onChange={handlePickerChange} />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ColorPicker;
