import { useServerFn } from "@tanstack/react-start";
import { Archive, MoreHorizontal, Trash } from "lucide-react";
import { useCallback } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/toast";
import { archiveTask } from "@/server/functions/task/archive-task";
import { deleteTask } from "@/server/functions/task/delete-task";

import type { Row, Table } from "@tanstack/react-table";
import type { Task } from "@/lib/db/schema";

interface Props {
  row: Row<Task>;
  table: Table<Task>;
}

const ActionCell = ({ row, table }: Props) => {
  const deleteTaskFn = useServerFn(deleteTask);
  const archiveTaskFn = useServerFn(archiveTask);

  const task = row.original;

  const handleArchive = useCallback(
    async (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();

      if (!task.id) return;

      // optimistically remove from view
      table.options.meta?.deleteTask(task.id);

      try {
        await archiveTaskFn({ data: { id: task.id } });
        toast.success({
          title: "Task archived",
          description: `"${task.name}" has been archived.`,
        });
      } catch (err) {
        table.options.meta?.restoreTask?.(task);
        console.error("Failed to archive", err);
        toast.error({
          title: "Failed to archive",
          description: `Could not archive "${task.name}".`,
        });
      }
    },
    [task, table, archiveTaskFn],
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
        >
          <MoreHorizontal className="icon-sm" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handleArchive}>
            <Archive className="icon-sm" />
            <span>Archive</span>
          </DropdownMenuItem>
          <DropdownMenuItem variant="destructive" onClick={handleDelete}>
            <Trash className="icon-sm" />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionCell;
