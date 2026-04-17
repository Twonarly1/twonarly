import { useServerFn } from "@tanstack/react-start";
import { useEffect, useRef, useState } from "react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { updateTask } from "@/server/functions/task/update-task";

import type { CellContext } from "@tanstack/react-table";
import type { KeyboardEvent } from "react";
import type { Task } from "@/lib/db/schema";

const EditableCell = ({ getValue, row, column, table }: CellContext<Task, unknown>) => {
  const initialValue = (getValue() as string | undefined) ?? "";
  const [value, setValue] = useState(initialValue);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const didCancelRef = useRef(false);
  const updateTaskFn = useServerFn(updateTask);

  const isCompleted = row.original.completed;
  const isNameColumn = column.id === "name";
  const isDescriptionColumn = column.id === "description";

  // Sync external updates when not editing
  useEffect(() => {
    if (!isEditing) setValue(initialValue);
  }, [initialValue, isEditing]);

  // Auto-focus with caret at end
  useEffect(() => {
    if (isEditing && inputRef.current) {
      const input = inputRef.current;
      input.focus();
      input.setSelectionRange(input.value.length, input.value.length);
    }
  }, [isEditing]);

  const commit = async () => {
    const trimmed = value.trim();
    if (trimmed === initialValue.trim()) return;

    // Validate required task name
    if (isNameColumn && !trimmed) {
      inputRef.current?.focus();
      return;
    }

    // Optimistic update
    if (!row.original.id) return;
    table.options.meta?.updateTask(row.original.id, column.id, trimmed);

    try {
      await updateTaskFn({
        data: {
          ...row.original,
          [column.id]: trimmed,
        },
      });
    } catch (err) {
      console.error("Failed to save task", err);
      // Optionally rollback UI
      table.options.meta?.updateTask(row.original.id, column.id, initialValue);
    }
  };

  const cancel = () => {
    didCancelRef.current = true;
    setValue(initialValue);
    setIsEditing(false);
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (didCancelRef.current) {
      didCancelRef.current = false;
      return;
    }
    commit();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      inputRef.current?.blur();
    } else if (e.key === "Escape") {
      e.preventDefault();
      cancel();
    }
  };

  if (!isEditing) {
    return (
      <button
        type="button"
        tabIndex={-1}
        onClick={() => setIsEditing(true)}
        className={cn(
          "group flex h-7 w-full items-center truncate rounded border border-transparent px-2 font-medium text-body text-foreground leading-7 focus-visible:border-border",
          isCompleted && "pointer-events-none",
        )}
      >
        {initialValue ? (
          <span className={cn(isCompleted && "text-muted-foreground line-through")}>
            {initialValue}
          </span>
        ) : (
          <span className="text-muted-foreground/50 opacity-100 hover:text-muted-foreground group-hover:opacity-100 sm:opacity-0">
            {isDescriptionColumn ? "Add task description" : undefined}
          </span>
        )}
      </button>
    );
  }

  return (
    <Input
      tabIndex={-1}
      ref={inputRef}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      className="placeholder: h-7 w-full bg-white px-2 font-medium focus-visible:border-border"
      placeholder={column.id === "description" ? "Add task description..." : undefined}
    />
  );
};

export default EditableCell;
