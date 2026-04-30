import { useServerFn } from "@tanstack/react-start";
import { Check, MoreHorizontal, Trash } from "lucide-react";
import { useCallback } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/toast";
import { deleteTask } from "@/server/functions/task/delete-task";
import { toggleTaskComplete } from "@/server/functions/task/toggle-task-complete";

import type { Row, Table } from "@tanstack/react-table";
import type { Task } from "@/lib/db/schema";

interface Props {
  row: Row<Task>;
  table: Table<Task>;
}

const ActionCell = ({ row, table }: Props) => {
  const deleteTaskFn = useServerFn(deleteTask);
  const toggleCompletedFn = useServerFn(toggleTaskComplete);

  const task = row.original;
  const completed = row.original.completed;

  const handleToggleComplete = useCallback(
    async (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();

      if (!task.id) return;

      table.options.meta?.updateTask(task.id, "completed", !completed);

      try {
        await toggleCompletedFn({ data: { id: task.id, completed: !completed } });
      } catch (err) {
        table.options.meta?.updateTask(task.id, "completed", completed);
        console.error("Failed to toggle completed", err);
      }
    },
    [task.id, completed, table, toggleCompletedFn],
  );

  const handleDelete = useCallback(
    async (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();

      if (!task.id) return;

      table.options.meta?.deleteTask(task.id);

      try {
        await deleteTaskFn({ data: { id: task.id } });
        toast.success({
          title: "Task deleted",
          description: `The task "${task.name}" has been deleted.`,
        });
      } catch (err) {
        table.options.meta?.restoreTask?.(task);
        console.error("Failed to delete", err);
        toast.error({
          title: "Failed to delete",
          description: `Could not delete "${task.name}".`,
        });
      }
    },
    [task, table, deleteTaskFn],
  );

  return (
    <DropdownMenu modal>
      <DropdownMenuTrigger asChild>
        <Button
          onClick={(e) => {
            e.preventDefault();
          }}
          variant="ghost"
          size="icon-sm"
          className="mx-auto custom:hover:bg-surface"
        >
          <MoreHorizontal className="icon-sm" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="space-y-0.5">
        <DropdownMenuItem onClick={handleToggleComplete} className="">
          <Check className="icon-xs" />
          <span>Completed</span>
        </DropdownMenuItem>
        <DropdownMenuItem variant="destructive" onClick={handleDelete}>
          <Trash className="icon-xs" />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionCell;
