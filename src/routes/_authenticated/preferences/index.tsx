import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { setCookie } from "@tanstack/react-start/server";
import { ChevronDown, Droplet, Monitor, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { match } from "ts-pattern";

import ColorPickerDialog from "@/components/color-picker-dialog";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "@/components/ui/item";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { useSettings } from "@/providers/settings-provider";
import { useTheme } from "@/providers/theme-provider";
import { customColorsKey } from "@/server/functions/preferences/theme";

const themeOptions = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
  { value: "custom", label: "Custom", icon: Droplet },
] as const;

const clearCustomColors = createServerFn({ method: "POST" }).handler(async () => {
  setCookie(customColorsKey, "", { maxAge: 0 });
});

export const Route = createFileRoute("/_authenticated/preferences/")({
  component: SettingsPage,
});

function SettingsPage() {
  const {
    theme,
    setTheme,
    customColors,
    setCustomColors,
    clearCustomColors: clearCustomColorsContext,
  } = useTheme();

  const { settings, setFontSize, setUsePointerCursor, setSidebarPosition } = useSettings();
  const [backgroundHex, setBackgroundHex] = useState(customColors?.background);
  const [accentHex, setAccentHex] = useState(customColors?.accent);
  const [borderHex, setBorderHex] = useState(customColors?.border);

  const handleResetCustomTheme = async () => {
    setBackgroundHex("");
    setAccentHex("");
    setBorderHex("");
    clearCustomColorsContext();
    await clearCustomColors();
  };

  useEffect(() => {
    if (theme === "custom" && (backgroundHex || accentHex || borderHex)) {
      setCustomColors({
        background: backgroundHex,
        accent: accentHex,
        border: borderHex,
      });
    }
  }, [backgroundHex, accentHex, borderHex, theme, setCustomColors]);

  return (
    <div className="container mx-auto space-y-12 p-4">
      <h1 className="items-baseline font-medium text-h1">Preferences</h1>

      <ItemGroup className="rounded-lg border">
        <Collapsible open={theme === "custom"} className="w-full">
          <Item size="sm" className="px-0">
            <ItemContent className="px-4">
              <ItemTitle>Interface theme</ItemTitle>
              <ItemDescription>Choose your theme</ItemDescription>
            </ItemContent>
            <ItemActions className="px-4">
              <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 transition-none"
                  >
                    {match(theme)
                      .with("light", () => <Sun className="icon-xs" />)
                      .with("dark", () => <Moon className="icon-xs" />)
                      .with("system", () => <Monitor className="icon-xs" />)
                      .with("custom", () => (
                        <Droplet className="icon-xs fill-primary text-primary" />
                      ))
                      .exhaustive()}
                    <SelectValue placeholder="Select a theme" />
                    <ChevronDown className="icon-xs ml-2 text-muted-foreground" />
                  </Button>
                </SelectTrigger>
                <SelectContent align="end">
                  <SelectGroup>
                    {themeOptions.map((option) => {
                      return (
                        <SelectItem
                          key={option.value}
                          value={option.value}
                          icon={
                            <option.icon
                              className={cn(
                                "icon-xs",
                                option.value === "custom" ? "fill-primary text-primary" : "",
                              )}
                            />
                          }
                        >
                          {option.label}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </ItemActions>

            <Separator className={cn("hidden", theme === "custom" && "flex")} />
            {theme === "custom" && (
              <CollapsibleContent className="w-full">
                <Item size="sm">
                  <ItemContent>
                    <ItemTitle>Background</ItemTitle>
                  </ItemContent>
                  <ItemActions>
                    <ColorPickerDialog value={backgroundHex} onChange={setBackgroundHex} />
                  </ItemActions>
                </Item>

                <Item size="sm">
                  <ItemContent>
                    <ItemTitle>Accent</ItemTitle>
                  </ItemContent>
                  <ItemActions>
                    <ColorPickerDialog value={accentHex} onChange={setAccentHex} />
                  </ItemActions>
                </Item>

                <Item size="sm">
                  <ItemContent>
                    <ItemTitle>Wireframe</ItemTitle>
                  </ItemContent>
                  <ItemActions>
                    <ColorPickerDialog value={borderHex} onChange={setBorderHex} />
                  </ItemActions>
                </Item>

                {(backgroundHex || accentHex || borderHex) && (
                  <>
                    <Separator />

                    <div className="mt-3 mr-4 flex justify-end">
                      <Button variant="outline" size="sm" onClick={handleResetCustomTheme}>
                        Reset to Default
                      </Button>
                    </div>
                  </>
                )}
              </CollapsibleContent>
            )}
          </Item>
        </Collapsible>

        <Separator />

        <Item size="sm">
          <ItemContent>
            <ItemTitle>Font size</ItemTitle>
            <ItemDescription>Adjust the font size to your preference</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Select value={settings.fontSize} onValueChange={setFontSize}>
              <SelectTrigger asChild>
                <Button variant="outline" size="sm" className="transition-none">
                  <SelectValue placeholder="Select font size" />
                  <ChevronDown className="icon-xs ml-2 text-muted-foreground" />
                </Button>
              </SelectTrigger>
              <SelectContent align="end">
                <SelectGroup>
                  <SelectItem value="smaller">Smaller</SelectItem>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                  <SelectItem value="larger">Larger</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </ItemActions>
        </Item>

        <Separator />

        <Item size="sm">
          <ItemContent>
            <ItemTitle>Use pointer cursors</ItemTitle>
            <ItemDescription>Use a pointer cursor for interactive elements</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Switch
              id="switch-pointer-cursor"
              checked={settings.usePointerCursor}
              onCheckedChange={setUsePointerCursor}
            />
          </ItemActions>
        </Item>

        <Separator />

        <Item size="sm">
          <ItemContent>
            <ItemTitle>Sidebar position</ItemTitle>
            <ItemDescription>Use a pointer cursor for interactive elements</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Select value={settings.sidebarPosition} onValueChange={setSidebarPosition}>
              <SelectTrigger asChild>
                <Button variant="outline" size="sm" className="transition-none">
                  <SelectValue placeholder="Select sidebar position" />
                  <ChevronDown className="icon-xs ml-2 text-muted-foreground" />
                </Button>
              </SelectTrigger>
              <SelectContent align="end">
                <SelectGroup>
                  <SelectItem value="left">Left</SelectItem>
                  <SelectItem value="right">Right</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </ItemActions>
        </Item>
      </ItemGroup>
    </div>
  );
}
