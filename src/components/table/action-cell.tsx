import { useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Check, MoreHorizontal, Trash } from "lucide-react";
import { memo, useCallback } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/toast";
import { deleteTask } from "@/server/functions/task/delete-task";
import { toggleIsComplete } from "@/server/functions/task/toggle-completed";

import type { Row, Table } from "@tanstack/react-table";
import type { Task } from "@/lib/types";

interface Props {
  row: Row<Task>;
  table: Table<Task>;
}

const ActionCell = memo(({ row, table }: Props) => {
  const router = useRouter();
  const deleteTaskFn = useServerFn(deleteTask);
  const toggleCompletedFn = useServerFn(toggleIsComplete);

  const task = row.original;
  const completed = row.getValue("completed") as boolean;

  const handleToggleComplete = useCallback(
    async (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();

      table.options.meta?.updateTask(task.id, "completed", !completed);

      try {
        await toggleCompletedFn({ data: { id: task.id, completed: !completed } });
        router.invalidate();
      } catch (err) {
        table.options.meta?.updateTask(task.id, "completed", completed);
        console.error("Failed to toggle completed", err);
      }
    },
    [task.id, completed, table, toggleCompletedFn, router],
  );

  const handleDelete = useCallback(
    async (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();

      table.options.meta?.deleteTask(task.id);

      try {
        await deleteTaskFn({ data: { id: task.id } });
        toast.success({
          title: "Task deleted",
          description: `The task "${task.name}" has been deleted.`,
        });
        router.invalidate();
      } catch (err) {
        console.error("Failed to delete", err);
        toast.error({
          title: "Failed to delete",
          description: `Could not delete "${task.name}".`,
        });
        router.invalidate();
      }
    },
    [task.id, task.name, table, deleteTaskFn, router],
  );

  return (
    <DropdownMenu modal>
      <DropdownMenuTrigger tabIndex={-1} asChild>
        <Button
          onClick={(e) => {
            e.preventDefault();
          }}
          variant="ghost"
          size="icon"
          className="mr-4 opacity-0 group-hover:opacity-100 data-[state=open]:opacity-100"
        >
          <MoreHorizontal className="icon-sm" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="space-y-0.5">
        <DropdownMenuItem onClick={handleToggleComplete}>
          <Check className="icon-xs" />
          <span>Completed</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDelete}>
          <Trash className="icon-xs" />
          <span>Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

export default ActionCell;
