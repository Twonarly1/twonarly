export function createMockTask(
  overrides?: Partial<{
    id: string;
    userId: string;
    name: string;
    description: string;
    completed: boolean;
  }>,
) {
  return {
    id: "test-task-id",
    userId: "test-user-id",
    name: "Test Task",
    description: "A test task",
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...overrides,
  };
}

export function createMockUser(
  overrides?: Partial<{
    id: string;
    name: string;
    email: string;
    image: string | null;
  }>,
) {
  return {
    id: "test-user-id",
    name: "Test User",
    email: "test@example.com",
    emailVerified: true,
    image: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...overrides,
  };
}

/**
 * Create a mock db object with chainable query methods.
 * Override specific methods per test.
 */
export function createMockDb() {
  const chainable = () => {
    const chain: Record<string, unknown> = {};
    chain.where = () => chain;
    chain.set = () => chain;
    chain.values = () => chain;
    chain.returning = () => chain;
    // biome-ignore lint/suspicious/noThenProperty: Unsure
    chain.then = (resolve: (val: unknown) => void) => resolve(undefined);
    return chain;
  };

  return {
    query: {
      tasks: {
        findMany: async () => [],
        findFirst: async () => null,
      },
      user: {
        findFirst: async () => null,
      },
    },
    select: () => chainable(),
    insert: () => chainable(),
    update: () => chainable(),
    delete: () => chainable(),
  };
}
