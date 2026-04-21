import { createFileRoute } from "@tanstack/react-router";

import { fetchTasks } from "@/server/functions/task/fetch-tasks";

export const Route = createFileRoute("/_authenticated/tasks/")({
  loader: async () => {
    const tasks = await fetchTasks();
    return { tasks };
  },
});
