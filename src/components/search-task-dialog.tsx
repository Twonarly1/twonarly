import { Search } from "lucide-react";
import { useEffect, useState } from "react";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/lib/hooks/use-debounce";
import useDialogStore, { DialogType } from "@/lib/hooks/use-dialog-store";

import type { Table as TableProps } from "@tanstack/react-table";
import type { Task } from "@/lib/db/schema";

interface Props {
  table: TableProps<Task>;
}

const SearchTaskDialog = ({ table }: Props) => {
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounce(searchInput, 300);

  const { isOpen: isSearchTaskOpen, setIsOpen: setIsSearchTaskOpen } = useDialogStore({
    type: DialogType.SearchTask,
  });

  useEffect(() => {
    table.getColumn("name")?.setFilterValue(debouncedSearch);
  }, [debouncedSearch, table]);

  return (
    <Dialog open={isSearchTaskOpen} onOpenChange={setIsSearchTaskOpen}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Search Task</DialogTitle>
        </DialogHeader>

        <div className="relative flex items-center">
          <Search strokeWidth={2.5} className="absolute left-2.5 size-3.5 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="pl-8"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchTaskDialog;
