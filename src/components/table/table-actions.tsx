import { useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Archive, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { archiveTask } from "@/server/functions/task/archive-task";
import { deleteTask } from "@/server/functions/task/delete-task";

import type { Table as TableProps } from "@tanstack/react-table";
import type { Task } from "@/lib/db/schema";

interface Props {
  table: TableProps<Task>;
}

// TODO: Need inspiration
const TableActions = ({ table }: Props) => {
  const router = useRouter();
  const selectedCount = table.getFilteredSelectedRowModel().rows.length;
  const deleteTaskFn = useServerFn(deleteTask);
  const archiveTaskFn = useServerFn(archiveTask);

  const handleArchive = async () => {
    const selectedRows = table.getFilteredSelectedRowModel().rows;

    for (const row of selectedRows) {
      if (!row.original.id) continue;
      table.options.meta?.deleteTask(row.original.id); // optimistically remove
    }

    try {
      for (const row of selectedRows) {
        if (!row.original.id) continue;
        await archiveTaskFn({ data: { id: row.original.id } });
      }
      toast.success({
        title: "Tasks archived",
        description: `${selectedCount} ${selectedCount === 1 ? "task has" : "tasks have"} been archived.`,
      });
      router.invalidate();
    } catch (err) {
      console.error("Failed to archive", err);
      toast.error({
        title: "Failed to archive",
        description: `Could not archive ${selectedCount} ${selectedCount === 1 ? "task" : "tasks"}.`,
      });
      router.invalidate();
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
    <div className="flex h-10 items-center justify-end gap-2">
      <span className="select-none text-secondary-foreground">
        {selectedCount} selected <span className="pl-1">—</span>
      </span>

      <Button variant="outline-surface" onClick={handleArchive}>
        <Archive className="icon-sm" />
        Archive
      </Button>

      <Button variant="outline-surface" onClick={handleDelete}>
        <Trash className="icon-sm" />
        Delete
      </Button>
    </div>
  );
};

export default TableActions;
