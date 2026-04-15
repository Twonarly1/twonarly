import { useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Check, Trash, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/toast";
import { deleteTask } from "@/server/functions/task/delete-task";
import { toggleTaskComplete } from "@/server/functions/task/toggle-task-complete";

import type { Table as TableProps } from "@tanstack/react-table";
import type { Task } from "@/lib/db/schema";

interface Props {
  table: TableProps<Task>;
}

const TableActions = ({ table }: Props) => {
  const router = useRouter();
  const selectedCount = table.getFilteredSelectedRowModel().rows.length;
  const deleteTaskFn = useServerFn(deleteTask);
  const toggleCompletedFn = useServerFn(toggleTaskComplete);

  const handleToggleComplete = async () => {
    const selectedRows = table.getFilteredSelectedRowModel().rows;

    // Count how many are being marked complete vs incomplete
    const markingComplete = selectedRows.filter((row) => !row.original.completed).length;
    const markingIncomplete = selectedRows.filter((row) => row.original.completed).length;

    for (const row of selectedRows) {
      if (!row.original.id) continue;
      table.options.meta?.updateTask(row.original.id, "completed", !row.original.completed);
    }

    try {
      for (const row of selectedRows) {
        if (!row.original.id) continue;
        await toggleCompletedFn({
          data: { id: row.original.id, completed: !row.original.completed },
        });
      }

      // Build dynamic message based on what's being toggled
      let title = "Tasks updated";
      let description = "";

      if (markingComplete > 0 && markingIncomplete > 0) {
        description = `Marked ${markingComplete} ${markingComplete === 1 ? "task" : "tasks"} as complete and ${markingIncomplete} ${markingIncomplete === 1 ? "task" : "tasks"} as incomplete.`;
      } else if (markingComplete > 0) {
        title = `${markingComplete === 1 ? "Task marked as complete" : "Tasks marked as complete"}`;
        description = `${markingComplete} ${markingComplete === 1 ? "task has" : "tasks have"} been completed.`;
      } else {
        title = `${markingIncomplete === 1 ? "Task marked as incomplete" : "Tasks marked as incomplete"}`;
        description = `${markingIncomplete} ${markingIncomplete === 1 ? "task has" : "tasks have"} been marked as incomplete.`;
      }

      toast.success({
        title,
        description,
      });
      router.invalidate();
    } catch (err) {
      for (const row of selectedRows) {
        if (!row.original.id) continue;
        table.options.meta?.updateTask(row.original.id, "completed", row.original.completed);
      }
      toast.error({
        title: "Failed to update tasks",
        description: `Could not update ${selectedCount} ${selectedCount === 1 ? "task" : "tasks"}.`,
      });
      console.error("Failed to toggle completed", err);
    }

    table.resetRowSelection();
  };

  const handleDelete = async () => {
    const selectedRows = table.getFilteredSelectedRowModel().rows;

    for (const row of selectedRows) {
      if (!row.original.id) continue;
      table.options.meta?.deleteTask(row.original.id);
    }

    try {
      for (const row of selectedRows) {
        if (!row.original.id) continue;
        await deleteTaskFn({ data: { id: row.original.id } });
      }
      toast.success({
        title: "Tasks deleted",
        description: `${selectedCount} ${selectedCount === 1 ? "task has" : "tasks have"} been deleted.`,
      });
      router.invalidate();
    } catch (err) {
      console.error("Failed to delete", err);
      toast.error({
        title: "Failed to delete",
        description: `Could not delete ${selectedCount} ${selectedCount === 1 ? "task" : "tasks"}.`,
      });
      router.invalidate();
    }

    table.resetRowSelection();
  };

  if (!selectedCount) return null;

  return (
    <div className="pointer-events-none sticky bottom-20 flex justify-center sm:bottom-12">
      <div className="pointer-events-auto flex items-center gap-1 rounded-lg border bg-background/95 p-1.5 shadow-lg backdrop-blur">
        <span className="px-3 text-muted-foreground">{selectedCount}</span>

        <Separator orientation="vertical" className="h-6" />

        <Button variant="ghost" size="sm" onClick={handleToggleComplete}>
          <Check className="icon-sm" />
          Complete
        </Button>

        <Button variant="ghost" size="sm" onClick={handleDelete}>
          <Trash className="icon-sm" />
          Delete
        </Button>

        <Separator orientation="vertical" className="h-6" />

        <Button variant="ghost" size="icon-sm" onClick={() => table.resetRowSelection()}>
          <X className="icon-xs" />
        </Button>
      </div>
    </div>
  );
};

export default TableActions;
