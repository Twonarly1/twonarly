import { flexRender } from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";

import HeaderCell from "@/components/table/header-cell";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";

import type { RowData, Table as TableProps } from "@tanstack/react-table";
import type { Task } from "@/lib/db/schema";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateTask: (rowId: string, columnId: string, value: unknown) => void;
    deleteTask: (rowId: string) => void;
  }
}

interface Props {
  table: TableProps<Task>;
}

export function DataTable({ table }: Props) {
  const tableContainerRef = useRef<HTMLDivElement>(null);

  const { rows } = table.getRowModel();
  const isEmpty = !rows?.length;

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => 32,
    overscan: 10,
  });

  const virtualRows = rowVirtualizer.getVirtualItems();
  const totalSize = rowVirtualizer.getTotalSize();

  const paddingTop = virtualRows.length > 0 ? virtualRows[0]?.start || 0 : 0;
  const paddingBottom =
    virtualRows.length > 0 ? totalSize - (virtualRows[virtualRows.length - 1]?.end || 0) : 0;

  return (
    <div ref={tableContainerRef} className="min-h-0 flex-1 overflow-auto">
      <Table>
        <TableHeader className="sticky top-0 z-0 bg-background">
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
            <>
              {paddingTop > 0 && (
                <tr>
                  <td style={{ height: `${paddingTop}px` }} />
                </tr>
              )}
              {virtualRows.map((virtualRow) => {
                const row = rows[virtualRow.index];
                return (
                  <TableRow
                    key={row.id}
                    data-row-id={row.id}
                    tabIndex={0}
                    data-state={row.getIsSelected() && "selected"}
                    className="group bg-background hover:bg-background"
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
              })}
              {paddingBottom > 0 && (
                <tr>
                  <td style={{ height: `${paddingBottom}px` }} />
                </tr>
              )}
            </>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

// const COLUMN_WIDTHS = [24, 200, 320, 56, 32];
// const ROW_H = 32;

// function GridCanvas({ rows }: { rows: Task[] }) {
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   useLayoutEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     const dpr = window.devicePixelRatio || 1;
//     const rect = canvas.getBoundingClientRect();
//     canvas.width = rect.width * dpr;
//     canvas.height = rect.height * dpr;
//     ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

//     ctx.clearRect(0, 0, rect.width, rect.height);

//     const totalWidth = COLUMN_WIDTHS.reduce((a, b) => a + b, 0);

//     // Background
//     // ctx.fillStyle = "#ffffff";
//     ctx.fillRect(0, 0, totalWidth, ROW_H + rows.length * ROW_H);

//     // Horizontal lines
//     // ctx.strokeStyle = "hsl(var(--border))";
//     ctx.lineWidth = 1;

//     // Header bottom border
//     ctx.beginPath();
//     ctx.moveTo(0, ROW_H + 0.5);
//     ctx.lineTo(totalWidth, ROW_H + 0.5);
//     ctx.stroke();

//     // Row borders
//     for (let r = 1; r <= rows.length; r++) {
//       const y = ROW_H + r * ROW_H;
//       ctx.beginPath();
//       ctx.moveTo(0, y + 0.5);
//       ctx.lineTo(totalWidth, y + 0.5);
//       ctx.stroke();
//     }
//   }, [rows]);

//   const totalWidth = COLUMN_WIDTHS.reduce((a, b) => a + b, 0);

//   return (
//     <canvas
//       ref={canvasRef}
//       className="pointer-events-none absolute inset-0"
//       style={{
//         width: totalWidth,
//         height: ROW_H + rows.length * ROW_H,
//         zIndex: -1,
//       }}
//     />
//   );
// }
