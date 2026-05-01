import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import PageContainer from "@/components/layout/page-container";
import NewTaskDialog from "@/components/new-task-dialog";
import { DataTable } from "@/components/table/data-table";
import EditableCell from "@/components/table/editable-cell";
import TableActions from "@/components/table/table-actions";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDebounce } from "@/lib/hooks/use-debounce";
import { formatDate } from "@/lib/utils/format";

import type {
  ColumnDef,
  ColumnFiltersState,
  RowSelectionState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";
import type { Task } from "@/lib/db/schema";

export const Route = createLazyFileRoute("/_authenticated/tasks/")({
  component: TasksPage,
});

function TasksPage() {
  const { tasks } = Route.useLoaderData();
  const { archived } = Route.useSearch();

  const [data, setData] = useState(tasks ?? []);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounce(searchInput, 300);

  const columns: ColumnDef<Task>[] = useMemo(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <div className="flex">
            <Checkbox
              className="mx-auto flex size-3.5 items-center justify-center"
              checked={
                table.getIsAllPageRowsSelected()
                  ? true
                  : table.getIsSomePageRowsSelected()
                    ? "indeterminate"
                    : false
              }
              onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            />
          </div>
        ),
        enableSorting: false,
        size: 16,
        maxSize: 16,
        cell: ({ row }) => (
          <div className="flex">
            <Checkbox
              className="mx-auto flex size-3.5 items-center justify-center"
              checked={row.getIsSelected()}
              onCheckedChange={(value) => row.toggleSelected(!!value)}
            />
          </div>
        ),
      },
      {
        accessorKey: "name",
        header: "Name",
        sortingFn: "alphanumeric",
      },
      {
        accessorKey: "createdAt",
        id: "created at",
        header: "Created",
        size: 28,
        maxSize: 28,
        sortingFn: "datetime",
        cell: ({ getValue }) => {
          const createdAt = new Date(getValue() as string);
          return <div className="ml-4 text-muted-foreground text-sm">{formatDate(createdAt)}</div>;
        },
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
    manualSorting: false,
    state: {
      columnVisibility,
      columnFilters,
      rowSelection,
      sorting,
    },
    manualPagination: true,
    enableRowSelection: true,
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
      restoreTask: (task: Task) => {
        setData((old) => [...old, task]);
      },
    },
  });

  useEffect(() => {
    table.getColumn("name")?.setFilterValue(debouncedSearch);
  }, [debouncedSearch, table]);

  useEffect(() => {
    setData(tasks ?? []);
  }, [tasks]);

  return (
    <PageContainer>
      <h1 className="items-baseline px-4 font-medium text-4xl">Tasks</h1>

      <div className="-mt-10">
        <div className="h-10 min-h-10">
          <TableActions table={table} />
        </div>

        <div className="flex flex-col rounded-xl border bg-surface">
          <div className="flex items-center gap-2 p-4">
            <div className="relative flex w-full gap-2">
              <Search
                strokeWidth={2.5}
                className="absolute top-2.25 left-2.25 size-3.5 text-muted-foreground"
              />
              <Input
                placeholder="Search tasks..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="max-w-[233px] pl-8"
              />

              <Select
                defaultValue="active"
                value={archived ? "archived" : "active"}
                onValueChange={(v) =>
                  navigate({
                    to: ".",
                    search: (prev) => ({ ...prev, archived: v === "archived" ? true : undefined }),
                  })
                }
              >
                <SelectTrigger asChild>
                  <Button variant="outline" className="h-8 transition-none">
                    <SelectValue placeholder="Select view" />
                    <ChevronDown className="icon-xs ml-2 text-muted-foreground" />
                  </Button>
                </SelectTrigger>
                <SelectContent align="end">
                  <SelectGroup>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <NewTaskDialog />
          </div>

          <DataTable table={table} />
        </div>
      </div>
    </PageContainer>
  );
}
