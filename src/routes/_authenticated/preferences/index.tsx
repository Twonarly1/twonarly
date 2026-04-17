import { createFileRoute } from "@tanstack/react-router";
import { ChevronDown, Droplet, Monitor, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { match } from "ts-pattern";

import ColorPickerDialog from "@/components/color-picker";
import PageContainer from "@/components/page-container";
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
import { Switch } from "@/components/ui/switch";
import { useIsMobile } from "@/lib/hooks/use-mobile";
import { useIsPhone } from "@/lib/hooks/use-phone";
import { cn } from "@/lib/utils";
import { useAppearance } from "@/providers/appearance-provider";
import { useLayout } from "@/providers/layout-provider";
import { useTheme } from "@/providers/theme-provider";

import type { AppearanceSettings } from "@/providers/appearance-provider";
import type { LayoutSettings } from "@/providers/layout-provider";

const THEME_OPTIONS = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
  { value: "custom", label: "Custom", icon: Droplet },
];

export const Route = createFileRoute("/_authenticated/preferences/")({
  component: SettingsPage,
});

function SettingsPage() {
  const { theme, setTheme, customColors, setCustomColors, clearCustomColors } = useTheme();
  const { appearance, updateAppearance } = useAppearance();
  const { layout, updateLayout } = useLayout();
  const isMobile = useIsMobile();
  const isPhone = useIsPhone();

  const [backgroundHex, setBackgroundHex] = useState(customColors?.background);
  const [accentHex, setAccentHex] = useState(customColors?.accent);
  const [borderHex, setBorderHex] = useState(customColors?.border);

  const handleResetCustomTheme = async () => {
    setBackgroundHex("");
    setAccentHex("");
    setBorderHex("");
    clearCustomColors();
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
    <PageContainer className="last:mb-24">
      <h1 className="items-baseline font-medium text-4xl">Preferences</h1>

      <div className="space-y-4">
        <Item>
          <ItemContent>
            <ItemTitle>Appearance</ItemTitle>
            <ItemDescription>
              Customize the appearance and behavior of the application
            </ItemDescription>
          </ItemContent>
        </Item>

        <ItemGroup className="rounded-lg border">
          <Collapsible open={theme === "custom"} className="w-full">
            <Item className="px-0">
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
                      {THEME_OPTIONS.map((option) => (
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
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </ItemActions>

              {theme === "custom" && (
                <CollapsibleContent className="w-full p-0">
                  <Item>
                    <ItemContent>
                      <ItemTitle>Background</ItemTitle>
                    </ItemContent>
                    <ItemActions>
                      <ColorPickerDialog value={backgroundHex} onChange={setBackgroundHex} />
                    </ItemActions>
                  </Item>

                  <Item>
                    <ItemContent>
                      <ItemTitle>Accent</ItemTitle>
                    </ItemContent>
                    <ItemActions>
                      <ColorPickerDialog value={accentHex} onChange={setAccentHex} />
                    </ItemActions>
                  </Item>

                  <Item>
                    <ItemContent>
                      <ItemTitle>Wireframe</ItemTitle>
                    </ItemContent>
                    <ItemActions>
                      <ColorPickerDialog value={borderHex} onChange={setBorderHex} />
                    </ItemActions>
                  </Item>

                  {(backgroundHex || accentHex || borderHex) && (
                    <div className="flex justify-end pt-2 pb-0">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleResetCustomTheme}
                        className="mr-4"
                      >
                        Reset to Default
                      </Button>
                    </div>
                  )}
                </CollapsibleContent>
              )}
            </Item>
          </Collapsible>

          <Item>
            <ItemContent>
              <ItemTitle>Font size</ItemTitle>
              <ItemDescription>Adjust the font size to your preference</ItemDescription>
            </ItemContent>
            <ItemActions>
              <Select
                value={appearance.fontSize}
                onValueChange={(v) =>
                  updateAppearance({ fontSize: v as AppearanceSettings["fontSize"] })
                }
              >
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

          {!isMobile && (
            <Item>
              <ItemContent>
                <ItemTitle>Use pointer cursors</ItemTitle>
                <ItemDescription>Use a pointer cursor for interactive elements</ItemDescription>
              </ItemContent>
              <ItemActions>
                <Switch
                  id="switch-pointer-cursor"
                  checked={appearance.usePointerCursor}
                  onCheckedChange={(v) => updateAppearance({ usePointerCursor: v })}
                />
              </ItemActions>
            </Item>
          )}
        </ItemGroup>
      </div>

      {!isPhone && (
        <div className="space-y-4">
          <Item>
            <ItemContent>
              <ItemTitle>Sidebar customization</ItemTitle>
              <ItemDescription>
                Customize the appearance and behavior of the sidebar and app layout
              </ItemDescription>
            </ItemContent>
          </Item>

          <ItemGroup className="rounded-lg border">
            <Item>
              <ItemContent>
                <ItemTitle>Sidebar position</ItemTitle>
                <ItemDescription>Choose the position of the sidebar</ItemDescription>
              </ItemContent>
              <ItemActions>
                <Select
                  value={layout.sidebarPosition}
                  onValueChange={(v) =>
                    updateLayout({ sidebarPosition: v as LayoutSettings["sidebarPosition"] })
                  }
                >
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

            {!isMobile && (
              <>
                <Item>
                  <ItemContent>
                    <ItemTitle>Sidebar variant</ItemTitle>
                    <ItemDescription>Choose the variant of the sidebar</ItemDescription>
                  </ItemContent>
                  <ItemActions>
                    <Select
                      value={layout.sidebarVariant}
                      onValueChange={(v) =>
                        updateLayout({ sidebarVariant: v as LayoutSettings["sidebarVariant"] })
                      }
                    >
                      <SelectTrigger asChild>
                        <Button variant="outline" size="sm" className="transition-none">
                          <SelectValue placeholder="Select sidebar variant" />
                          <ChevronDown className="icon-xs ml-2 text-muted-foreground" />
                        </Button>
                      </SelectTrigger>
                      <SelectContent align="end">
                        <SelectGroup>
                          <SelectItem value="classic">Classic</SelectItem>
                          <SelectItem value="floating">Floating</SelectItem>
                          <SelectItem value="inset">Inset</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </ItemActions>
                </Item>

                <Item>
                  <ItemContent>
                    <ItemTitle>Collapsible sidebar</ItemTitle>
                    <ItemDescription>Choose how the sidebar collapses</ItemDescription>
                  </ItemContent>
                  <ItemActions>
                    <Select
                      value={layout.sidebarCollapsible}
                      onValueChange={(v) =>
                        updateLayout({
                          sidebarCollapsible: v as LayoutSettings["sidebarCollapsible"],
                        })
                      }
                    >
                      <SelectTrigger asChild>
                        <Button variant="outline" size="sm" className="transition-none">
                          <SelectValue placeholder="Select sidebar collapsible option" />
                          <ChevronDown className="icon-xs ml-2 text-muted-foreground" />
                        </Button>
                      </SelectTrigger>
                      <SelectContent align="end">
                        <SelectGroup>
                          <SelectItem value="offcanvas">Off canvas</SelectItem>
                          <SelectItem value="icon">Icon</SelectItem>
                          <SelectItem value="none">None</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </ItemActions>
                </Item>
              </>
            )}
          </ItemGroup>
        </div>
      )}
    </PageContainer>
  );
}
