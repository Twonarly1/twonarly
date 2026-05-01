import { createFileRoute } from "@tanstack/react-router";

import { fetchTasks } from "@/server/functions/task/fetch-tasks";

export const Route = createFileRoute("/_authenticated/tasks/")({
  validateSearch: (search) => ({
    archived: search.archived === true || undefined,
    newTask: search.newTask === true || undefined,
  }),
  loaderDeps: ({ search }) => ({ archived: search.archived }),
  loader: async ({ deps }) => {
    const tasks = await fetchTasks({ data: { archived: deps.archived } });
    return { tasks };
  },
  pendingMs: 0,
});
