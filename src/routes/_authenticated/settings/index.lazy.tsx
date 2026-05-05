import { createLazyFileRoute } from "@tanstack/react-router";
import {
  ChevronDown,
  Copy,
  FileBracesCorner,
  Monitor,
  Moon,
  MoreHorizontal,
  Palette,
  SquareChevronDown,
  SquareChevronUp,
  Sun,
} from "lucide-react";
import { useRef, useState } from "react";
import { match } from "ts-pattern";

import ImportThemeDialog from "@/components/import-theme-dialog";
import PageContainer from "@/components/layout/page-container";
import Section from "@/components/layout/section";
import ThemeChanger from "@/components/theme-changer";
import { Button } from "@/components/ui/button";
import { Collapsible } from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { toast } from "@/components/ui/toast";
import { useCopy } from "@/lib/hooks/use-copy";
import useDialogStore, { DialogType } from "@/lib/hooks/use-dialog-store";
import { useIsMobile } from "@/lib/hooks/use-mobile";
import { applyCustomTheme, computeColorsFromTheme } from "@/lib/utils/theme";
import { useAppearance } from "@/providers/appearance-provider";
import { useLayout } from "@/providers/layout-provider";
import { useTheme } from "@/providers/theme-provider";
import { setThemePreferences } from "@/server/functions/preferences/theme";

import type { CustomTheme } from "@/lib/utils/theme";
import type { AppearanceSettings } from "@/providers/appearance-provider";
import type { LayoutSettings } from "@/providers/layout-provider";

const THEME_OPTIONS = [
  { value: "light", label: "Light", icon: Sun, className: "icon-xs" },
  { value: "dark", label: "Dark", icon: Moon, className: "icon-xs" },
  { value: "system", label: "System", icon: Monitor, className: "icon-xs" },
  {
    value: "custom",
    label: "Custom",
    icon: Palette,
    className: "icon-xs",
  },
];

const initialTheme: CustomTheme = {
  contrast: 100,
  sidebar: {
    contrast: 50,
  },
};

export const Route = createLazyFileRoute("/_authenticated/settings/")({
  component: SettingsPage,
});

function SettingsPage() {
  const { theme, setTheme, customTheme: savedTheme, setCustomTheme: setProviderTheme } = useTheme();
  const [customTheme, setCustomTheme] = useState(savedTheme ?? initialTheme);
  const { appearance, updateAppearance } = useAppearance();
  const { layout, updateLayout } = useLayout();
  const isMobile = useIsMobile();
  const { copy } = useCopy(JSON.stringify(customTheme, null, 2));

  const saveTimeout = useRef<NodeJS.Timeout | null>(null);
  const [isThemeChangerOpen, setIsThemeChangerOpen] = useState(theme === "custom");

  const { setIsOpen: setIsImportThemeOpen } = useDialogStore({
    type: DialogType.ImportTheme,
  });

  const handleThemeChange = (v: string) => {
    const newTheme = v as typeof theme;
    if (newTheme === "custom") {
      setIsThemeChangerOpen(true);
      if (customTheme?.base) {
        setTheme(newTheme);
      }
      return;
    }
    setTheme(newTheme);
    setIsThemeChangerOpen(false);
  };

  const save = (next: CustomTheme) => {
    applyCustomTheme(document.documentElement, next);
    setCustomTheme(next); // local state
    setProviderTheme(next); // provider state so the effect has the right value

    if (next.base && theme !== "custom") {
      setTheme("custom");
    }

    if (saveTimeout.current) clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(() => {
      const css = computeColorsFromTheme(next);
      setThemePreferences({ data: { theme: "custom", customTheme: next, css } });
    }, 300);
  };

  return (
    <PageContainer>
      <h1 className="items-baseline px-4 font-medium text-4xl">Settings</h1>

      <Section title="Appearance">
        <Item variant="outline" className="rounded-xl">
          <ItemContent>
            <ItemTitle>Font size</ItemTitle>
            <ItemDescription>Adjust the font size</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Select
              value={appearance.fontSize}
              onValueChange={(v) =>
                updateAppearance({ fontSize: v as AppearanceSettings["fontSize"] })
              }
            >
              <SelectTrigger asChild>
                <Button variant="outline">
                  <SelectValue placeholder="Select font size" />
                  <ChevronDown className="icon-xs" />
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

        <div className="rounded-xl border bg-surface">
          <Item>
            <ItemContent>
              <ItemTitle>Interface theme</ItemTitle>
              <ItemDescription>Customize your theme</ItemDescription>
            </ItemContent>
            <ItemActions>
              {theme === "custom" && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon-sm">
                      <MoreHorizontal className="icon-sm mx-auto" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    align={layout.sidebarPosition === "left" ? "start" : "end"}
                    side="bottom"
                    sideOffset={4}
                  >
                    <DropdownMenuGroup>
                      <DropdownMenuItem onSelect={() => setIsThemeChangerOpen(!isThemeChangerOpen)}>
                        {isThemeChangerOpen ? (
                          <SquareChevronUp className="icon-sm" />
                        ) : (
                          <SquareChevronDown className="icon-sm" />
                        )}
                        {isThemeChangerOpen ? "Close" : "Open"} Theme Editor
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => setIsImportThemeOpen(true)}>
                        <FileBracesCorner className="icon-sm" />
                        Import Theme
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onSelect={() => {
                          copy();
                          toast.success({
                            title: "Theme copied!",
                          });
                        }}
                      >
                        <Copy className="icon-sm" />
                        Copy Theme
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}

              <Select value={theme} onValueChange={handleThemeChange}>
                <SelectTrigger asChild>
                  <Button variant="outline">
                    {match(theme)
                      .with("light", () => <Sun className="icon-xs" />)
                      .with("dark", () => <Moon className="icon-xs" />)
                      .with("system", () => <Monitor className="icon-xs" />)
                      .with("custom", () => <Palette className="icon-xs" />)
                      .exhaustive()}
                    <SelectValue placeholder="Select a theme" />
                    <ChevronDown className="icon-xs" />
                  </Button>
                </SelectTrigger>
                <SelectContent align="end">
                  <SelectGroup>
                    {THEME_OPTIONS.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value}
                        icon={<option.icon className={option.className} />}
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </ItemActions>
          </Item>

          <Collapsible open={isThemeChangerOpen}>
            <ThemeChanger theme={customTheme} onChange={save} />
          </Collapsible>
        </div>
      </Section>

      {!isMobile && (
        <Section title="Layout">
          <ItemGroup>
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
                    <Button variant="outline">
                      <SelectValue placeholder="Select sidebar position" />
                      <ChevronDown className="icon-xs" />
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
                    <Button variant="outline">
                      <SelectValue placeholder="Select sidebar variant" />
                      <ChevronDown className="icon-xs" />
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
                    <Button variant="outline">
                      <SelectValue placeholder="Select sidebar collapsible option" />
                      <ChevronDown className="icon-xs" />
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
          </ItemGroup>
        </Section>
      )}

      <ImportThemeDialog onChange={save} />
    </PageContainer>
  );
}
