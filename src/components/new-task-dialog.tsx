import { useForm } from "@tanstack/react-form";
import { useNavigate, useRouter, useSearch } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect } from "react";
import { maxLength, minLength, pipe, string } from "valibot";

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
    <Dialog
      open={isCreateTaskOpen}
      onOpenChange={(open) => {
        setIsCreateTaskOpen(open);
        if (!open && newTask) {
          navigate({
            to: ".",
            search: (prev) => ({ ...prev, newTask: undefined }),
            replace: true,
          });
        }
      }}
    >
      <DialogTrigger asChild>
        <Button variant="ghost" className="flex h-8 gap-2 border-border active:scale-[0.97]">
          New Task
          <Kbd>C</Kbd>
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
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
              <Input
                autoFocus
                aria-label="Name"
                placeholder="Enter a task name..."
                className="border-transparent focus-visible:border-primary"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => {
                  field.handleChange(e.target.value);
                }}
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
  );
};

export default NewTaskDialog;
