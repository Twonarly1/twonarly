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
import { LoadingSwap } from "@/components/ui/loading-swap";
import { Textarea } from "@/components/ui/textarea";
import useDialogStore, { DialogType } from "@/lib/hooks/use-dialog-store";
import { addTask } from "@/server/functions/task/add-task";

const NewTaskDialog = () => {
  const addTaskFn = useServerFn(addTask);
  const router = useRouter();

  const { isOpen: isCreateTaskOpen, setIsOpen: setIsCreateTaskOpen } = useDialogStore({
    type: DialogType.CreateTask,
  });

  const closeDialog = () => {
    setIsCreateTaskOpen(false);
  };

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      completed: false,
      category: "",
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
      closeDialog();
      form.reset();
    },
  });

  useHotkeys("mod+j", () => setIsCreateTaskOpen(true), { description: "Add new task" }, [
    isCreateTaskOpen,
  ]);

  return (
    <Dialog open={isCreateTaskOpen} onOpenChange={setIsCreateTaskOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="active:scale-[0.97]">
          New Task
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="sr-only">
          <DialogDescription className="hidden" />
        </DialogHeader>

        <DialogHeader>
          <DialogTitle>New Task</DialogTitle>
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
                placeholder="Enter your task..."
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
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
              />
            )}
          </form.Field>

          <form.Field name="category">
            {(field) => (
              <Input
                aria-label="Category"
                placeholder="Enter your category..."
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
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
                className="mt-2 ml-auto flex active:scale-[0.97]"
              >
                <LoadingSwap
                  isLoading={form.state.isSubmitting}
                  className="flex items-center gap-2"
                >
                  Create task
                </LoadingSwap>
              </Button>
            )}
          </form.Subscribe>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewTaskDialog;
