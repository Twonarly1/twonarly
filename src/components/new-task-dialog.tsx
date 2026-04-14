import { useForm } from "@tanstack/react-form";
import { useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useHotkeys } from "react-hotkeys-hook";
import z from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
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
      description: "",
      completed: false,
    },
    onSubmit: async ({ value }) => {
      await addTaskFn({
        data: {
          name: value.name,
          description: value.description,
          completed: value.completed,
        },
      });

      router.invalidate();
      setIsCreateTaskOpen(false);

      form.reset();
    },
  });

  useHotkeys(
    "c",
    (e) => {
      e.preventDefault();
      setIsCreateTaskOpen(true);
    },
    {
      description: "Add new task",
      enabled: !isCreateTaskOpen,
    },
    [isCreateTaskOpen],
  );

  return (
    <Tooltip delayDuration={400}>
      <Dialog open={isCreateTaskOpen} onOpenChange={setIsCreateTaskOpen}>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button className="flex pointer-hover:scale-[1.04] gap-2 active:scale-[0.97]">
              New Task
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <DialogContent className="p-3">
          <DialogHeader className="sr-only">
            <DialogTitle className="hidden" />
            <DialogDescription className="hidden" />
          </DialogHeader>

          <DialogHeader>
            <DialogTitle className="text-body-lg text-sidebar-foreground">New Task</DialogTitle>
          </DialogHeader>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
            className="space-y-2"
          >
            <form.Field
              name="name"
              validators={{
                onSubmit: z.string().min(1, "Name is required"),
              }}
            >
              {(field) => (
                <Input
                  autoFocus
                  aria-label="Name"
                  placeholder="Enter a task name..."
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => {
                    field.handleChange(e.target.value);
                  }}
                />
              )}
            </form.Field>

            <form.Field name="description">
              {(field) => (
                <Textarea
                  aria-label="Description"
                  placeholder="Enter a description..."
                  value={field.state.value ?? ""}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="min-h-24"
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

      <TooltipContent side="left" sideOffset={8} className="flex items-center gap-2 text-body-sm">
        Create new task <Kbd className="ml-2">c</Kbd>
      </TooltipContent>
    </Tooltip>
  );
};

export default NewTaskDialog;
