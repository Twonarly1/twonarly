import { useNavigate, useRouter, useSearch } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Kbd } from "@/components/ui/kbd";
import useDialogStore, { DialogType } from "@/lib/hooks/use-dialog-store";
import { addTask } from "@/server/functions/task/add-task";

const NewTaskDialog = () => {
  const { newTask } = useSearch({ from: "/_authenticated/tasks/" });
  const addTaskFn = useServerFn(addTask);
  const router = useRouter();
  const navigate = useNavigate();

  const { isOpen: isCreateTaskOpen, setIsOpen: setIsCreateTaskOpen } = useDialogStore({
    type: DialogType.CreateTask,
  });

  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canSubmit = name.trim().length > 0 && name.length <= 256 && !isSubmitting;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setIsSubmitting(true);
    try {
      await addTaskFn({ data: { name: name.trim() } });
      router.invalidate();
      setIsCreateTaskOpen(false);
      setName("");
    } finally {
      setIsSubmitting(false);
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: we only want to listen to changes in isCreateTaskOpen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (isCreateTaskOpen) return;
      if (e.key === "c") {
        e.preventDefault();
        setIsCreateTaskOpen(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isCreateTaskOpen]);

  return (
    <Dialog
      open={isCreateTaskOpen}
      onOpenChange={(open) => {
        setIsCreateTaskOpen(open);
        if (!open) {
          setName("");
          if (newTask) {
            navigate({
              to: ".",
              search: (prev) => ({ ...prev, newTask: undefined }),
              replace: true,
            });
          }
        }
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline" press="scale">
          New Task
          <Kbd>C</Kbd>
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>New Task</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-1">
          <Input
            autoFocus
            aria-label="Name"
            placeholder="Enter a task name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-8"
          />
          <div className="mt-2 flex justify-end">
            <Button type="submit" disabled={!canSubmit} press="scale" color="primary">
              Create task
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewTaskDialog;
