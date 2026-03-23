/** biome-ignore-all lint/suspicious/noExplicitAny: TODO */
import { describe, expect, mock, test } from "bun:test";

import { insertTask } from "@/server/functions/task/add-task";
import { deleteTaskForUser } from "@/server/functions/task/delete-task";
import { fetchTasksForUser } from "@/server/functions/task/get-tasks";
import { toggleTaskCompleted } from "@/server/functions/task/toggle-completed";
import { updateTaskForUser } from "@/server/functions/task/update-task";
import { createMockDb, createMockTask } from "@/tests/helpers";

describe("fetchTasksForUser", () => {
  test("returns tasks for the given user", async () => {
    const mockTasks = [
      createMockTask({ id: "1", name: "Task 1" }),
      createMockTask({ id: "2", name: "Task 2" }),
    ];

    const mockDb = createMockDb();
    mockDb.query.tasks.findMany = mock(async () => mockTasks) as any;

    const result = await fetchTasksForUser("test-user-id", mockDb as any);

    expect(result).toEqual(mockTasks);
    expect(mockDb.query.tasks.findMany).toHaveBeenCalled();
  });

  test("returns empty array when user has no tasks", async () => {
    const mockDb = createMockDb();
    mockDb.query.tasks.findMany = mock(async () => []) as any;

    const result = await fetchTasksForUser("test-user-id", mockDb as any);

    expect(result).toEqual([]);
  });
});

describe("insertTask", () => {
  test("inserts a task with the correct userId", async () => {
    const mockDb = createMockDb();
    mockDb.insert = mock(() => ({ values: mock(async () => {}) }));

    await insertTask(
      "test-user-id",
      { name: "New Task", description: "Description" },
      mockDb as any,
    );

    expect(mockDb.insert).toHaveBeenCalled();
  });
});

describe("deleteTaskForUser", () => {
  test("calls delete with correct task id and user id", async () => {
    const whereMock = mock(async () => {});
    const mockDb = createMockDb();
    mockDb.delete = mock(() => ({ where: whereMock }));

    await deleteTaskForUser("task-123", "user-456", mockDb as any);

    expect(mockDb.delete).toHaveBeenCalled();
    expect(whereMock).toHaveBeenCalled();
  });
});

describe("toggleTaskCompleted", () => {
  test("updates completed to true", async () => {
    const whereMock = mock(async () => {});
    const setMock = mock(() => ({ where: whereMock }));
    const mockDb = createMockDb();
    mockDb.update = mock(() => ({ set: setMock }));

    await toggleTaskCompleted("task-123", "user-456", true, mockDb as any);

    expect(mockDb.update).toHaveBeenCalled();
    expect(setMock).toHaveBeenCalledWith({ completed: true });
    expect(whereMock).toHaveBeenCalled();
  });

  test("updates completed to false", async () => {
    const whereMock = mock(async () => {});
    const setMock = mock(() => ({ where: whereMock }));
    const mockDb = createMockDb();
    mockDb.update = mock(() => ({ set: setMock }));

    await toggleTaskCompleted("task-123", "user-456", false, mockDb as any);

    expect(setMock).toHaveBeenCalledWith({ completed: false });
  });
});

describe("updateTaskForUser", () => {
  test("updates task with correct data scoped to user", async () => {
    const whereMock = mock(async () => {});
    const setMock = mock(() => ({ where: whereMock }));
    const mockDb = createMockDb();
    mockDb.update = mock(() => ({ set: setMock }));

    const updateData = {
      id: "task-123",
      name: "Updated Task",
      description: "Updated description",
    };

    await updateTaskForUser("user-456", updateData, mockDb as any);

    expect(mockDb.update).toHaveBeenCalled();
    expect(setMock).toHaveBeenCalledWith(updateData);
    expect(whereMock).toHaveBeenCalled();
  });
});
