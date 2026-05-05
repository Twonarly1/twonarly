import { Braces } from "lucide-react";
import { useState } from "react";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import useDialogStore, { DialogType } from "@/lib/hooks/use-dialog-store";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

import type { CustomTheme, LchTuple } from "@/lib/utils/theme";

const PLACEHOLDER = `{
  "base": [80, 20, 300],
  "accent": [50, 40, 260],
  "contrast": 100,
  "sidebar": {
    "base": [20, 10, 240],
    "contrast": 50
  }
}`;

interface Props {
  onChange: (next: CustomTheme) => void;
}

const isLchTuple = (val: unknown): val is LchTuple =>
  Array.isArray(val) && val.length >= 3 && val.slice(0, 3).every((n) => typeof n === "number");

const isValidTheme = (val: unknown): val is CustomTheme => {
  if (typeof val !== "object" || val === null) return false;
  const t = val as Record<string, unknown>;
  if (t.contrast !== undefined && typeof t.contrast !== "number") return false;
  if (t.base !== undefined && !isLchTuple(t.base)) return false;
  if (t.accent !== undefined && !isLchTuple(t.accent)) return false;
  if (t.sidebar !== undefined) {
    if (typeof t.sidebar !== "object" || t.sidebar === null) return false;
    const s = t.sidebar as Record<string, unknown>;
    if (s.contrast !== undefined && typeof s.contrast !== "number") return false;
    if (s.base !== undefined && !isLchTuple(s.base)) return false;
  }
  return true;
};

const normalizeTheme = (val: CustomTheme): CustomTheme => ({
  ...val,
  sidebar: val.sidebar
    ? {
        ...val.sidebar,
        base: val.sidebar.base
          ? ((val.sidebar.base as number[]).slice(0, 3) as LchTuple)
          : undefined,
      }
    : undefined,
});

type ImportError = "invalid_json" | "invalid_shape" | null;

const errorMessages: Record<NonNullable<ImportError>, string> = {
  invalid_json: "That doesn't look like valid JSON. Check for missing brackets or quotes.",
  invalid_shape:
    'Theme must have at least a "base" or "accent" array of 3 numbers, e.g. {"base": [80, 20, 300], "contrast": 100}',
};

const EXAMPLE_THEME = JSON.stringify(
  { base: [80, 20, 300], accent: [50, 40, 260], contrast: 100 },
  null,
  2,
);

const ImportThemeDialog = ({ onChange }: Props) => {
  const { isOpen: isImportThemeOpen, setIsOpen: setIsImportThemeOpen } = useDialogStore({
    type: DialogType.ImportTheme,
  });

  const [importValue, setImportValue] = useState("");
  const [error, setError] = useState<ImportError>(null);

  const handleChange = (val: string) => {
    setImportValue(val);
    setError(null);
  };

  const handlePrettify = () => {
    try {
      const parsed = JSON.parse(importValue);
      setImportValue(JSON.stringify(parsed, null, 2));
      setError(null);
    } catch {
      setError("invalid_json");
    }
  };

  const handleImport = () => {
    let parsed: unknown;
    try {
      parsed = JSON.parse(importValue);
    } catch {
      setError("invalid_json");
      return;
    }

    if (!isValidTheme(parsed)) {
      setError("invalid_shape");
      return;
    }

    onChange(normalizeTheme(parsed));
    setIsImportThemeOpen(false);
    setImportValue("");
    setError(null);
  };

  const handleUseExample = () => {
    setImportValue(EXAMPLE_THEME);
    setError(null);
  };

  return (
    <Dialog open={isImportThemeOpen} onOpenChange={setIsImportThemeOpen}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Import Theme</DialogTitle>
        </DialogHeader>

        <Textarea
          value={importValue}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={PLACEHOLDER}
          className={`h-48 resize-none font-mono text-sm ${error ? "border-destructive focus-visible:border-destructive" : ""}`}
        />

        {error && (
          <div className="flex items-start justify-between gap-2 rounded-lg border border-destructive/20 bg-destructive/5 px-3 py-2 text-destructive text-sm">
            <span>{errorMessages[error]}</span>
            {error === "invalid_shape" && (
              <Button variant="ghost" size="sm" onClick={handleUseExample}>
                Use example
              </Button>
            )}
          </div>
        )}

        <div className="flex items-center justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrettify}
            disabled={!importValue.trim()}
          >
            <Braces className="icon-sm" />
            Prettify
          </Button>

          <Button onClick={handleImport} disabled={!importValue.trim()}>
            Import
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImportThemeDialog;
