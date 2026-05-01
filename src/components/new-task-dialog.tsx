import { useForm } from "@tanstack/react-form";
import { useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect } from "react";
import { maxLength, minLength, pipe, string } from "valibot";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Kbd } from "@/components/ui/kbd";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import useDialogStore, { DialogType } from "@/lib/hooks/use-dialog-store";
import { addTask } from "@/server/functions/task/add-task";

const NewTaskDialog = () => {
  const addTaskFn = useServerFn(addTask);
  const router = useRouter();

  const { isOpen: isCreateTaskOpen, setIsOpen: setIsCreateTaskOpen } = useDialogStore({
    type: DialogType.CreateTask,
  });

  const form = useForm({
    defaultValues: {
      name: "",
    },
    onSubmit: async ({ value }) => {
      await addTaskFn({
        data: {
          name: value.name,
        },
      });

      router.invalidate();
      setIsCreateTaskOpen(false);

      form.reset();
    },
  });

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
    <Tooltip delayDuration={700}>
      <Dialog open={isCreateTaskOpen} onOpenChange={setIsCreateTaskOpen}>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button className="flex h-8 gap-2 active:scale-[0.97]">New Task</Button>
          </DialogTrigger>
        </TooltipTrigger>
        <DialogContent className="p-3">
          <DialogHeader className="sr-only">
            <DialogTitle className="hidden" />
            <DialogDescription className="hidden" />
          </DialogHeader>

          <DialogHeader>
            <DialogTitle className="text-foreground text-lg">New Task</DialogTitle>
          </DialogHeader>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
            className="space-y-1"
          >
            <form.Field
              name="name"
              validators={{
                onSubmit: pipe(
                  string(),
                  minLength(1, "Name is required"),
                  maxLength(256, "Name is too long"),
                ),
              }}
            >
              {(field) => (
                <Textarea
                  aria-label="Task description"
                  placeholder="What needs to be done?"
                  value={field.state.value ?? ""}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="min-h-24 cursor-text border-transparent focus-visible:border-primary"
                />
              )}
            </form.Field>

            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting, state.isDefaultValue]}
            >
              {([canSubmit, isSubmitting, isDefaultValue]) => (
                <Button
                  type="submit"
                  disabled={!canSubmit || isSubmitting || isDefaultValue}
                  className="mt-2 ml-auto flex pointer-hover:scale-[1.04] active:scale-[0.97]"
                >
                  Create task
                </Button>
              )}
            </form.Subscribe>
          </form>
        </DialogContent>
      </Dialog>

      <TooltipContent
        side="top"
        sideOffset={8}
        align="end"
        className="flex items-center gap-2 text-sm"
      >
        Create new task <Kbd className="ml-2">C</Kbd>
      </TooltipContent>
    </Tooltip>
  );
};

export default NewTaskDialog;
