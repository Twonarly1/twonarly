import { flexRender } from "@tanstack/react-table";
import clsx from "clsx";
import { ArrowDown, ArrowUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { TableHead } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

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
      <TableHead className="py-1" style={cellStyle}>
        {flexRender(column.columnDef.header, getContext())}
      </TableHead>
    );
  }

  const handleSort = () => {
    column.toggleSorting(sortDirection !== "desc");
  };

  const SortIcon = sortDirection === "asc" ? ArrowUp : ArrowDown;

  return (
    <TableHead colSpan={header.colSpan} style={cellStyle}>
      <Tooltip delayDuration={500}>
        <TooltipTrigger asChild>
          <Button variant="ghost" onClick={handleSort} className="group w-fit text-sm">
            {flexRender(column.columnDef.header, getContext())}
            <SortIcon
              className={clsx(
                "size-3 shrink-0",
                showIcon
                  ? "opacity-100"
                  : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100",
              )}
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent sideOffset={4} className="bg-surface">
          Order by {header.id}
        </TooltipContent>
      </Tooltip>
    </TableHead>
  );
};

export default HeaderCell;
