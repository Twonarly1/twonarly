import { Keyboard } from "lucide-react";
import { useHotkeys } from "react-hotkeys-hook";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useDialogStore, { DialogType } from "@/lib/hooks/use-dialog-store";
import { Kbd } from "./ui/kbd";
import { SidebarMenuButton } from "./ui/sidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

interface Shortcut {
  keys: string;
  action: string;
  location?: string;
}

const shortcuts: Shortcut[] = [
  { keys: "B", action: "Toggle Sidebar", location: "App Sidebar" },
  { keys: "X", action: "Select Task", location: "Table / Editable Cell" },
  { keys: "Cmd+J", action: "Create New Task", location: "New Task Dialog" },
  { keys: "Enter", action: "Save/Edit Cell", location: "Editable Cell" },
  { keys: "Esc", action: "Cancel/Edit Cell", location: "Editable Cell" },
];

const ShortcutsDialog = () => {
  const { isOpen: isShortcutsOpen, setIsOpen: setIsShortcutsOpen } = useDialogStore({
    type: DialogType.Shortcuts,
  });

  useHotkeys("cmd+/", () => setIsShortcutsOpen(true), {
    description: "Show keyboard shortcuts",
  });

  return (
    <Tooltip delayDuration={500}>
      <Dialog open={isShortcutsOpen} onOpenChange={setIsShortcutsOpen}>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <SidebarMenuButton variant="ghost" size="icon">
              <Keyboard className="icon-sm" />
            </SidebarMenuButton>
          </DialogTrigger>
        </TooltipTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Keyboard Shortcuts</DialogTitle>
          </DialogHeader>
          <ul className="mt-4 space-y-2">
            {shortcuts.map((s) => (
              <li key={s.keys} className="flex justify-between">
                <span>
                  {s.action} {s.location ? `(${s.location})` : ""}
                </span>
                <Kbd>{s.keys}</Kbd>
              </li>
            ))}
          </ul>
        </DialogContent>
      </Dialog>
      <TooltipContent side="left" sideOffset={8} className="text-body-sm">
        Keyboard shortcuts <Kbd>Cmd</Kbd> + <Kbd>/</Kbd>
      </TooltipContent>
    </Tooltip>
  );
};

export default ShortcutsDialog;
