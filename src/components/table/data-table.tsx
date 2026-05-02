import { flexRender } from "@tanstack/react-table";
import { useRef } from "react";

import HeaderCell from "@/components/table/header-cell";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";

import type { RowData, Table as TableProps } from "@tanstack/react-table";
import type { Task } from "@/lib/db/schema";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateTask: (rowId: string, columnId: string, value: unknown) => void;
    deleteTask: (rowId: string) => void;
    restoreTask: (task: TData) => void;
  }
}

interface Props {
  table: TableProps<Task>;
}

export function DataTable({ table }: Props) {
  const tableContainerRef = useRef<HTMLDivElement>(null);

  const { rows } = table.getRowModel();
  const isEmpty = !rows?.length;

  return (
    <div ref={tableContainerRef} className="min-h-full flex-1 overflow-auto">
      <Table style={{ tableLayout: "auto", width: "100%", height: "100%" }}>
        <TableHeader className="sticky top-0 z-0">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="hover:bg-transparent">
              {headerGroup.headers.map((header) => {
                return <HeaderCell key={header.id} header={header} />;
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {isEmpty ? (
            <TableRow className="hover:bg-transparent">
              {table.getAllColumns().map((column) => (
                <TableCell
                  key={column.id}
                  style={{
                    width: column.getSize(),
                    maxWidth: column.getSize(),
                    minWidth: column.getSize(),
                  }}
                  className="leading-7"
                >
                  {column.id === "name" && (
                    <div className="group flex h-7 w-full items-center truncate rounded border border-transparent px-2 text-foreground leading-7 focus-visible:border-border">
                      No results
                    </div>
                  )}
                </TableCell>
              ))}
            </TableRow>
          ) : (
            rows.map((row) => {
              return (
                <TableRow
                  key={row.id}
                  data-row-id={row.id}
                  tabIndex={0}
                  data-state={row.getIsSelected() && "selected"}
                  className="group hover:bg-primary/5"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      style={{
                        width: cell.column.getSize(),
                        maxWidth: cell.column.getSize(),
                        minWidth: cell.column.getSize(),
                      }}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}
