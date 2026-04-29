import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { match } from "ts-pattern";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SliderControl } from "@/components/ui/slider";
import { hexToLch } from "@/lib/utils/color";
import { computeColorsFromTheme } from "@/lib/utils/theme";
import { Collapsible } from "./ui/collapsible";
import { Item, ItemActions, ItemContent, ItemTitle } from "./ui/item";

import type { CustomTheme } from "@/lib/utils/theme";

type ZoneId = "sidebar" | "content" | "accent";

interface Props {
  theme: CustomTheme;
  onChange: (next: CustomTheme) => void;
}

export default function ThemeChanger({ theme, onChange }: Props) {
  const [activeZone, setActiveZone] = useState<ZoneId | null>(null);
  const [inputValue, setInputValue] = useState("");

  const palette = computeColorsFromTheme(theme);
  const hasContent = !!theme.base;
  const hasSidebarOverride = !!theme.sidebar?.base;

  const activeColor = match(activeZone)
    .with("sidebar", () => palette.sidebar)
    .with("content", () => palette.content)
    .with("accent", () => palette.primary)
    .otherwise(() => undefined);

  const canClear = match(activeZone)
    .with("sidebar", () => hasSidebarOverride)
    .with("content", () => hasContent)
    .with("accent", () => !!theme.accent)
    .otherwise(() => false);

  const handleZoneClick = (zoneId: ZoneId) => {
    if (zoneId === activeZone) {
      setActiveZone(null);
      return;
    }

    setActiveZone(zoneId);
    setInputValue(
      match(zoneId)
        .with("sidebar", () => palette.sidebar)
        .with("content", () => palette.content)
        .with("accent", () => palette.primary)
        .otherwise(() => undefined) ?? "",
    );
  };

  const handleColorChange = (hex: string) => {
    setInputValue(hex);
    const lch = hexToLch(hex);

    match(activeZone)
      .with("sidebar", () =>
        onChange({
          ...theme,
          sidebar: { contrast: theme.sidebar?.contrast ?? 30, ...theme.sidebar, base: lch },
        }),
      )
      .with("content", () => onChange({ ...theme, base: lch }))
      .with("accent", () => onChange({ ...theme, accent: lch }))
      .otherwise(() => {});
  };

  const handleClear = () => {
    match(activeZone)
      .with("sidebar", () => {
        const { sidebar: _, ...rest } = theme;
        onChange(rest as CustomTheme);
      })
      .with("content", () => {
        const { base: _, ...rest } = theme;
        onChange(rest as CustomTheme);
      })
      .with("accent", () => {
        const { accent: _, ...rest } = theme;
        onChange(rest as CustomTheme);
      })
      .otherwise(() => {});
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    if (/^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(val)) {
      handleColorChange(val.startsWith("#") ? val : `#${val}`);
    }
  };

  const contrastConfig = match(activeZone)
    .with("content", () => ({
      value: theme.contrast,
      onChange: (v: number) => onChange({ ...theme, contrast: v }),
    }))
    .with("sidebar", () =>
      hasSidebarOverride && theme.sidebar
        ? {
            value: theme.sidebar.contrast,
            onChange: (v: number) =>
              onChange({ ...theme, sidebar: { ...theme.sidebar!, contrast: v } }),
          }
        : null,
    )
    .otherwise(() => null);

  return (
    <div className="flex w-full flex-col gap-3 p-4">
      {/* ── Layout map ── */}
      <div className="mx-auto flex w-full max-w-100 flex-col items-center gap-2 p-2">
        <div className="grid w-full grid-cols-[100px_1fr] gap-x-2 overflow-hidden">
          <Button
            variant="unstyled"
            onClick={() => handleZoneClick("sidebar")}
            className="row-span-2 flex h-60 cursor-crosshair! flex-col items-start justify-start rounded-xl border-border border-dashed bg-sidebar pt-2 text-sidebar-foreground transition-transform hover:bg-sidebar/80 hover:text-sidebar-foreground active:scale-[0.99]"
          >
            <span className="mx-auto flex">Sidebar</span>

            {/* Mock nav items showing sidebar-accent contrast */}
            <div className="mt-4 flex w-full flex-col justify-start gap-1">
              <div className="h-4 rounded-md bg-sidebar-accent" />
              <div className="h-4 w-full rounded-md bg-sidebar-accent/60" />
              <div className="h-4 w-full rounded-md bg-sidebar-accent/60" />
            </div>
          </Button>

          <Button
            variant="unstyled"
            onClick={() => handleZoneClick("content")}
            className="z-10 flex h-60 cursor-crosshair! items-start justify-center rounded-xl border-border border-dashed bg-content p-2 text-foreground transition-transform hover:bg-content/80 active:scale-[0.99]"
          >
            Content
          </Button>

          <Button
            variant="unstyled"
            onClick={() => handleZoneClick("content")}
            className="z-20 mx-8 -mt-48.25 flex h-48 cursor-crosshair! items-center justify-center rounded-xl rounded-b-none border-border border-b-0 border-dashed bg-surface transition-none transition-transform active:scale-[0.99]"
          >
            Surface
          </Button>

          <Button
            variant="unstyled"
            onClick={() => handleZoneClick("accent")}
            className="col-span-2 mx-auto mt-2 flex h-8 w-full cursor-crosshair! border border-border border-dashed bg-primary text-primary-foreground transition-transform hover:bg-primary/80 active:scale-[0.99]"
          >
            Accent
          </Button>
        </div>
      </div>

      <Collapsible open={activeZone !== null} className="">
        <div className="mx-auto flex w-full flex-col gap-2 px-8 py-4">
          {/* Header */}
          <div className="flex items-center gap-2">
            <span className="font-medium text-base first-letter:uppercase">{activeZone}</span>

            <div className="ml-auto flex items-center gap-1.5">
              {canClear && (
                <Button variant="ghost" onClick={handleClear}>
                  Reset
                </Button>
              )}

              <Input
                value={inputValue}
                onChange={handleInputChange}
                placeholder="#000000"
                className="h-7"
              />
            </div>
          </div>

          <div className="color-picker-custom">
            <HexColorPicker color={activeColor ?? "#000000"} onChange={handleColorChange} />
          </div>

          {contrastConfig && (
            <Item className="p-0">
              <ItemContent>
                <ItemTitle>
                  {match(activeZone)
                    .with("content", () => "Surface Contrast")
                    .with("sidebar", () => "Sidebar Button Contrast")
                    .otherwise(() => "")}
                </ItemTitle>
              </ItemContent>
              <ItemActions className="flex w-full flex-1">
                <SliderControl value={contrastConfig.value} onChange={contrastConfig.onChange} />
              </ItemActions>
            </Item>
          )}
        </div>
      </Collapsible>
    </div>
  );
}
