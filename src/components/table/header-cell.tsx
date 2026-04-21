import { flexRender } from "@tanstack/react-table";
import { ArrowDown, ArrowUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { TableCell, TableHead } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

import type { Header } from "@tanstack/react-table";
import type { Task } from "@/lib/db/schema";

interface Props {
  header: Header<Task, unknown>;
}

const HeaderCell = ({ header }: Props) => {
  const { column, getContext } = header;
  const sortDirection = column.getIsSorted();
  const canSort = column.getCanSort();

  const hasAnySorting = getContext().table.getState().sorting.length > 0;
  const isDefaultSortColumn = header.id === "name" && !hasAnySorting;
  const showIcon = !!sortDirection || isDefaultSortColumn;

  const cellStyle = {
    width: header.getSize(),
    minWidth: header.getSize(),
    maxWidth: header.getSize(),
  };

  if (!canSort) {
    return (
      <TableCell className="py-1" style={cellStyle}>
        {flexRender(column.columnDef.header, getContext())}
      </TableCell>
    );
  }

  const handleSort = () => {
    column.toggleSorting(sortDirection !== "desc");
  };

  const SortIcon = sortDirection === "asc" ? ArrowUp : ArrowDown;

  return (
    <TableHead className="text-muted-foreground" colSpan={header.colSpan} style={cellStyle}>
      <Tooltip delayDuration={700}>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="xs"
            onClick={handleSort}
            className="group flex w-fit justify-between px-2 text-sm"
          >
            {flexRender(column.columnDef.header, getContext())}
            <SortIcon
              className={cn(
                "size-3 shrink-0",
                showIcon ? "opacity-100" : "opacity-0 group-hover:opacity-100",
              )}
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent sideOffset={4} className="text-xs">
          Order by {header.id}
        </TooltipContent>
      </Tooltip>
    </TableHead>
  );
};

export default HeaderCell;
