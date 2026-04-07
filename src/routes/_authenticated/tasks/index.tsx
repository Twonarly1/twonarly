import { createFileRoute } from "@tanstack/react-router";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import NewTaskDialog from "@/components/new-task-dialog";
import ActionCell from "@/components/table/action-cell";
import { DataTable } from "@/components/table/data-table";
import EditableCell from "@/components/table/editable-cell";
import TableActions from "@/components/table/table-actions";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/lib/hooks/use-debounce";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/utils/format";
import { fetchTasks } from "@/server/functions/task/fetch-tasks";

import type {
  ColumnDef,
  ColumnFiltersState,
  RowSelectionState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";
import type { Task } from "@/lib/db/schema";

export const Route = createFileRoute("/_authenticated/tasks/")({
  component: TasksPage,
  loader: async () => {
    const tasks = await fetchTasks();
    return { tasks };
  },
});

function TasksPage() {
  const { tasks } = Route.useLoaderData();

  const [data, setData] = useState(tasks ?? []);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [sorting, setSorting] = useState<SortingState>([]);

  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounce(searchInput, 300);

  const columns: ColumnDef<Task>[] = useMemo(
    () => [
      {
        accessorKey: "completed",
        header: "",
        enableSorting: false,
        size: 24,
        cell: ({ row }) => (
          <div className="ml-2 flex w-fit md:w-8">
            <Checkbox
              tabIndex={-1}
              className={cn(
                "mx-auto flex size-3.5 items-center justify-center",
                !row.getIsSelected() &&
                  "opacity-0 hover:border hover:border-primary group-hover:opacity-100",
              )}
              checked={row.getIsSelected()}
              onCheckedChange={(value) => row.toggleSelected(!!value)}
            />
          </div>
        ),
      },
      {
        accessorKey: "name",
        header: "Name",
        size: 200,
        sortingFn: "alphanumeric",
      },
      {
        accessorKey: "description",
        header: "Description",
        size: 320,
        sortingFn: "alphanumeric",
      },
      {
        accessorKey: "createdAt",
        id: "created at",
        header: "Created",
        size: 56,
        sortingFn: "datetime",
        cell: ({ getValue }) => {
          const createdAt = new Date(getValue() as string);
          return <span className="px-2 font-medium">{formatDate(createdAt)}</span>;
        },
      },
      {
        id: "actions",
        enableSorting: false,
        size: 32,
        cell: ({ row, table }) => <ActionCell row={row} table={table} />,
      },
    ],
    [],
  );

  const table = useReactTable({
    data,
    columns,
    defaultColumn: { cell: (props) => <EditableCell {...props} /> },
    getRowId: (row) => row.id!,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    columnResizeMode: "onChange",
    manualSorting: false,
    state: {
      columnVisibility,
      columnFilters,
      rowSelection,
      sorting,
    },
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    meta: {
      updateTask: (rowId: string, columnId: string, value: unknown) => {
        setData((old) =>
          old.map((row) => {
            if (row.id === rowId) {
              return {
                ...row,
                [columnId]: value,
              };
            }
            return row;
          }),
        );
      },
      deleteTask: (rowId: string) => {
        setData((old) => old.filter((row) => row.id !== rowId));
      },
    },
  });

  useEffect(() => {
    setColumnFilters([{ id: "name", value: debouncedSearch }]);
  }, [debouncedSearch]);

  useEffect(() => {
    setData(tasks ?? []);
  }, [tasks]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "x" && e.key !== "X") return;

      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      e.preventDefault();

      const focusedRow = document.activeElement?.closest("tr[data-row-id]") as HTMLElement;
      const hoveredRow = document.querySelector("tr[data-row-id]:hover") as HTMLElement;

      const targetRow = focusedRow || hoveredRow;
      if (!targetRow) return;

      const rowId = targetRow.getAttribute("data-row-id");
      if (!rowId) return;

      const row = table.getRowModel().rows.find((r) => r.id === rowId);
      if (row) {
        row.toggleSelected();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [table]);

  return (
    <div>
      <div className="mx-auto space-y-6 p-4 px-6 lg:px-12">
        <h1 className="items-baseline font-medium text-h1">
          Tasks {data?.length ? `(${data.length})` : ""}
        </h1>

        <div className="flex items-center gap-2">
          <div className="group relative flex w-full gap-2">
            <Search className="absolute top-2.25 left-2.25 size-3.5 text-muted-foreground" />
            <Input
              placeholder="Search tasks..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="max-w-sm pl-8"
            />
          </div>

          <NewTaskDialog />
        </div>
      </div>

      <DataTable table={table} />

      <TableActions table={table} />
    </div>
  );
}
