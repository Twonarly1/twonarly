// @ts-nocheck
import { PgCondition, PgDeleteSingleStep, PgExecutor, TYPES, assertPgClassSingleStep, listOfCodec, makeRegistry, pgDeleteSingle, pgInsertSingle, pgSelectFromRecord, pgUpdateSingle, recordCodec, sqlValueWithCodec } from "@dataplan/pg";
import { ConnectionStep, EdgeStep, ObjectStep, __ValueStep, access, assertExecutableStep, bakedInputRuntime, connection, constant, context, createObjectAndApplyChildren, first, get as get2, inhibitOnNull, inspect, lambda, list, makeDecodeNodeId, makeGrafastSchema, object, rootValue, specFromNodeId } from "grafast";
import { GraphQLError, Kind } from "graphql";
import { sql } from "pg-sql2";
const nodeIdHandler_Query = {
  typeName: "Query",
  codec: {
    name: "raw",
    encode: Object.assign(function rawEncode(value) {
      return typeof value === "string" ? value : null;
    }, {
      isSyncAndSafe: true
    }),
    decode: Object.assign(function rawDecode(value) {
      return typeof value === "string" ? value : null;
    }, {
      isSyncAndSafe: true
    })
  },
  match(specifier) {
    return specifier === "query";
  },
  getIdentifiers(_value) {
    return [];
  },
  getSpec() {
    return "irrelevant";
  },
  get() {
    return rootValue();
  },
  plan() {
    return constant`query`;
  }
};
const nodeIdCodecs_base64JSON_base64JSON = {
  name: "base64JSON",
  encode: (() => {
    function base64JSONEncode(value) {
      return Buffer.from(JSON.stringify(value), "utf8").toString("base64");
    }
    base64JSONEncode.isSyncAndSafe = !0;
    return base64JSONEncode;
  })(),
  decode: (() => {
    function base64JSONDecode(value) {
      return JSON.parse(Buffer.from(value, "base64").toString("utf8"));
    }
    base64JSONDecode.isSyncAndSafe = !0;
    return base64JSONDecode;
  })()
};
const nodeIdCodecs = {
  __proto__: null,
  raw: nodeIdHandler_Query.codec,
  base64JSON: nodeIdCodecs_base64JSON_base64JSON,
  pipeString: {
    name: "pipeString",
    encode: Object.assign(function pipeStringEncode(value) {
      return Array.isArray(value) ? value.join("|") : null;
    }, {
      isSyncAndSafe: true
    }),
    decode: Object.assign(function pipeStringDecode(value) {
      return typeof value === "string" ? value.split("|") : null;
    }, {
      isSyncAndSafe: true
    })
  }
};
const executor = new PgExecutor({
  name: "main",
  context() {
    const ctx = context();
    return object({
      pgSettings: "pgSettings" != null ? ctx.get("pgSettings") : constant(null),
      withPgClient: ctx.get("withPgClient")
    });
  }
});
const verificationIdentifier = sql.identifier("public", "verification");
const spec_verification = {
  name: "verification",
  identifier: verificationIdentifier,
  attributes: {
    __proto__: null,
    id: {
      description: undefined,
      codec: TYPES.text,
      notNull: true,
      hasDefault: false,
      extensions: {
        tags: {},
        canSelect: true,
        canInsert: true,
        canUpdate: true
      }
    },
    identifier: {
      description: undefined,
      codec: TYPES.text,
      notNull: true,
      hasDefault: false,
      extensions: {
        tags: {},
        canSelect: true,
        canInsert: true,
        canUpdate: true
      }
    },
    value: {
      description: undefined,
      codec: TYPES.text,
      notNull: true,
      hasDefault: false,
      extensions: {
        tags: {},
        canSelect: true,
        canInsert: true,
        canUpdate: true
      }
    },
    expires_at: {
      description: undefined,
      codec: TYPES.timestamp,
      notNull: true,
      hasDefault: false,
      extensions: {
        tags: {},
        canSelect: true,
        canInsert: true,
        canUpdate: true
      }
    },
    createdAt: {
      description: undefined,
      codec: TYPES.timestamptz,
      notNull: true,
      hasDefault: true,
      extensions: {
        tags: {},
        canSelect: true,
        canInsert: true,
        canUpdate: true
      }
    },
    updatedAt: {
      description: undefined,
      codec: TYPES.timestamptz,
      notNull: true,
      hasDefault: true,
      extensions: {
        tags: {},
        canSelect: true,
        canInsert: true,
        canUpdate: true
      }
    }
  },
  description: undefined,
  extensions: {
    oid: "233185",
    isTableLike: true,
    pg: {
      serviceName: "main",
      schemaName: "public",
      name: "verification"
    },
    tags: {
      __proto__: null
    }
  },
  executor: executor
};
const verificationCodec = recordCodec(spec_verification);
const tasksIdentifier = sql.identifier("public", "tasks");
const spec_tasks = {
  name: "tasks",
  identifier: tasksIdentifier,
  attributes: {
    __proto__: null,
    id: {
      description: undefined,
      codec: TYPES.uuid,
      notNull: true,
      hasDefault: true,
      extensions: {
        tags: {},
        canSelect: true,
        canInsert: true,
        canUpdate: true
      }
    },
    user_id: {
      description: undefined,
      codec: TYPES.text,
      notNull: true,
      hasDefault: false,
      extensions: {
        tags: {},
        canSelect: true,
        canInsert: true,
        canUpdate: true
      }
    },
    name: {
      description: undefined,
      codec: TYPES.text,
      notNull: true,
      hasDefault: false,
      extensions: {
        tags: {},
        canSelect: true,
        canInsert: true,
        canUpdate: true
      }
    },
    description: {
      description: undefined,
      codec: TYPES.text,
      notNull: true,
      hasDefault: false,
      extensions: {
        tags: {},
        canSelect: true,
        canInsert: true,
        canUpdate: true
      }
    },
    completed: {
      description: undefined,
      codec: TYPES.boolean,
      notNull: true,
      hasDefault: true,
      extensions: {
        tags: {},
        canSelect: true,
        canInsert: true,
        canUpdate: true
      }
    },
    createdAt: {
      description: undefined,
      codec: TYPES.timestamptz,
      notNull: true,
      hasDefault: true,
      extensions: {
        tags: {},
        canSelect: true,
        canInsert: true,
        canUpdate: true
      }
    },
    updatedAt: {
      description: undefined,
      codec: TYPES.timestamptz,
      notNull: true,
      hasDefault: true,
      extensions: {
        tags: {},
        canSelect: true,
        canInsert: true,
        canUpdate: true
      }
    }
  },
  description: undefined,
  extensions: {
    oid: "233162",
    isTableLike: true,
    pg: {
      serviceName: "main",
      schemaName: "public",
      name: "tasks"
    },
    tags: {
      __proto__: null
    }
  },
  executor: executor
};
const tasksCodec = recordCodec(spec_tasks);
const userIdentifier = sql.identifier("public", "user");
const spec_user = {
  name: "user",
  identifier: userIdentifier,
  attributes: {
    __proto__: null,
    id: {
      description: undefined,
      codec: TYPES.text,
      notNull: true,
      hasDefault: false,
      extensions: {
        tags: {},
        canSelect: true,
        canInsert: true,
        canUpdate: true
      }
    },
    name: {
      description: undefined,
      codec: TYPES.text,
      notNull: true,
      hasDefault: false,
      extensions: {
        tags: {},
        canSelect: true,
        canInsert: true,
        canUpdate: true
      }
    },
    email: {
      description: undefined,
      codec: TYPES.text,
      notNull: true,
      hasDefault: false,
      extensions: {
        tags: {},
        canSelect: true,
        canInsert: true,
        canUpdate: true
      }
    },
    email_verified: {
      description: undefined,
      codec: TYPES.boolean,
      notNull: true,
      hasDefault: true,
      extensions: {
        tags: {},
        canSelect: true,
        canInsert: true,
        canUpdate: true
      }
    },
    image: {
      description: undefined,
      codec: TYPES.text,
      notNull: false,
      hasDefault: false,
      extensions: {
        tags: {},
        canSelect: true,
        canInsert: true,
        canUpdate: true
      }
    },
    createdAt: {
      description: undefined,
      codec: TYPES.timestamptz,
      notNull: true,
      hasDefault: true,
      extensions: {
        tags: {},
        canSelect: true,
        canInsert: true,
        canUpdate: true
      }
    },
    updatedAt: {
      description: undefined,
      codec: TYPES.timestamptz,
      notNull: true,
      hasDefault: true,
      extensions: {
        tags: {},
        canSelect: true,
        canInsert: true,
        canUpdate: true
      }
    }
  },
  description: undefined,
  extensions: {
    oid: "233173",
    isTableLike: true,
    pg: {
      serviceName: "main",
      schemaName: "public",
      name: "user"
    },
    tags: {
      __proto__: null
    }
  },
  executor: executor
};
const userCodec = recordCodec(spec_user);
const accountIdentifier = sql.identifier("public", "account");
const spec_account = {
  name: "account",
  identifier: accountIdentifier,
  attributes: {
    __proto__: null,
    id: {
      description: undefined,
      codec: TYPES.text,
      notNull: true,
      hasDefault: false,
      extensions: {
        tags: {},
        canSelect: true,
        canInsert: true,
        canUpdate: true
      }
    },
    account_id: {
      description: undefined,
      codec: TYPES.text,
      notNull: true,
      hasDefault: false,
      extensions: {
        tags: {},
        canSelect: true,
        canInsert: true,
        canUpdate: true
      }
    },
    provider_id: {
      description: undefined,
      codec: TYPES.text,
      notNull: true,
      hasDefault: false,
      extensions: {
        tags: {},
        canSelect: true,
        canInsert: true,
        canUpdate: true
      }
    },
    user_id: {
      description: undefined,
      codec: TYPES.text,
      notNull: true,
      hasDefault: false,
      extensions: {
        tags: {},
        canSelect: true,
        canInsert: true,
        canUpdate: true
      }
    },
    access_token: {
      description: undefined,
      codec: TYPES.text,
      notNull: false,
      hasDefault: false,
      extensions: {
        tags: {},
        canSelect: true,
        canInsert: true,
        canUpdate: true
      }
    },
    refresh_token: {
      description: undefined,
      codec: TYPES.text,
      notNull: false,
      hasDefault: false,
      extensions: {
        tags: {},
        canSelect: true,
        canInsert: true,
        canUpdate: true
      }
    },
    id_token: {
      description: undefined,
      codec: TYPES.text,
      notNull: false,
      hasDefault: false,
      extensions: {
        tags: {},
        canSelect: true,
        canInsert: true,
        canUpdate: true
      }
    },
    access_token_expires_at: {
      description: undefined,
      codec: TYPES.timestamp,
      notNull: false,
      hasDefault: false,
      extensions: {
        tags: {},
        canSelect: true,
        canInsert: true,
        canUpdate: true
      }
    },
    refresh_token_expires_at: {
      description: undefined,
      codec: TYPES.timestamp,
      notNull: false,
      hasDefault: false,
      extensions: {
        tags: {},
        canSelect: true,
        canInsert: true,
        canUpdate: true
      }
    },
    scope: {
      description: undefined,
      codec: TYPES.text,
      notNull: false,
      hasDefault: false,
      extensions: {
        tags: {},
        canSelect: true,
        canInsert: true,
        canUpdate: true
      }
    },
    password: {
      description: undefined,
      codec: TYPES.text,
      notNull: false,
      hasDefault: false,
      extensions: {
        tags: {},
        canSelect: true,
        canInsert: true,
        canUpdate: true
      }
    },
    createdAt: {
      description: undefined,
      codec: TYPES.timestamptz,
      notNull: true,
      hasDefault: true,
      extensions: {
        tags: {},
        canSelect: true,
        canInsert: true,
        canUpdate: true
      }
    },
    updatedAt: {
      description: undefined,
      codec: TYPES.timestamptz,
      notNull: true,
      hasDefault: true,
      extensions: {
        tags: {},
        canSelect: true,
        canInsert: true,
        canUpdate: true
      }
    }
  },
  description: undefined,
  extensions: {
    oid: "233132",
    isTableLike: true,
    pg: {
      serviceName: "main",
      schemaName: "public",
      name: "account"
    },
    tags: {
      __proto__: null
    }
  },
  executor: executor
};
const accountCodec = recordCodec(spec_account);
const sessionIdentifier = sql.identifier("public", "session");
const spec_session = {
  name: "session",
  identifier: sessionIdentifier,
  attributes: {
    __proto__: null,
    id: {
      description: undefined,
      codec: TYPES.text,
      notNull: true,
      hasDefault: false,
      extensions: {
        tags: {},
        canSelect: true,
        canInsert: true,
        canUpdate: true
      }
    },
    expires_at: {
      description: undefined,
      codec: TYPES.timestamp,
      notNull: true,
      hasDefault: false,
      extensions: {
        tags: {},
        canSelect: true,
        canInsert: true,
        canUpdate: true
      }
    },
    token: {
      description: undefined,
      codec: TYPES.text,
      notNull: true,
      hasDefault: false,
      extensions: {
        tags: {},
        canSelect: true,
        canInsert: true,
        canUpdate: true
      }
    },
    createdAt: {
      description: undefined,
      codec: TYPES.timestamptz,
      notNull: true,
      hasDefault: true,
      extensions: {
        tags: {},
        canSelect: true,
        canInsert: true,
        canUpdate: true
      }
    },
    updatedAt: {
      description: undefined,
      codec: TYPES.timestamptz,
      notNull: true,
      hasDefault: true,
      extensions: {
        tags: {},
        canSelect: true,
        canInsert: true,
        canUpdate: true
      }
    },
    ip_address: {
      description: undefined,
      codec: TYPES.text,
      notNull: false,
      hasDefault: false,
      extensions: {
        tags: {},
        canSelect: true,
        canInsert: true,
        canUpdate: true
      }
    },
    user_agent: {
      description: undefined,
      codec: TYPES.text,
      notNull: false,
      hasDefault: false,
      extensions: {
        tags: {},
        canSelect: true,
        canInsert: true,
        canUpdate: true
      }
    },
    user_id: {
      description: undefined,
      codec: TYPES.text,
      notNull: true,
      hasDefault: false,
      extensions: {
        tags: {},
        canSelect: true,
        canInsert: true,
        canUpdate: true
      }
    }
  },
  description: undefined,
  extensions: {
    oid: "233141",
    isTableLike: true,
    pg: {
      serviceName: "main",
      schemaName: "public",
      name: "session"
    },
    tags: {
      __proto__: null
    }
  },
  executor: executor
};
const sessionCodec = recordCodec(spec_session);
const verificationUniques = [{
  isPrimary: true,
  attributes: ["id"],
  description: undefined,
  extensions: {
    tags: {
      __proto__: null
    }
  }
}];
const tasksUniques = [{
  isPrimary: true,
  attributes: ["id"],
  description: undefined,
  extensions: {
    tags: {
      __proto__: null
    }
  }
}];
const registryConfig_pgResources_tasks_tasks = {
  executor: executor,
  name: "tasks",
  identifier: "main.public.tasks",
  from: tasksIdentifier,
  codec: tasksCodec,
  uniques: tasksUniques,
  isVirtual: false,
  description: undefined,
  extensions: {
    description: undefined,
    pg: {
      serviceName: "main",
      schemaName: "public",
      name: "tasks"
    },
    isInsertable: true,
    isUpdatable: true,
    isDeletable: true,
    tags: {},
    canSelect: true,
    canInsert: true,
    canUpdate: true,
    canDelete: true
  }
};
const userUniques = [{
  isPrimary: true,
  attributes: ["id"],
  description: undefined,
  extensions: {
    tags: {
      __proto__: null
    }
  }
}, {
  isPrimary: false,
  attributes: ["email"],
  description: undefined,
  extensions: {
    tags: {
      __proto__: null
    }
  }
}];
const registryConfig_pgResources_user_user = {
  executor: executor,
  name: "user",
  identifier: "main.public.user",
  from: userIdentifier,
  codec: userCodec,
  uniques: userUniques,
  isVirtual: false,
  description: undefined,
  extensions: {
    description: undefined,
    pg: {
      serviceName: "main",
      schemaName: "public",
      name: "user"
    },
    isInsertable: true,
    isUpdatable: true,
    isDeletable: true,
    tags: {},
    canSelect: true,
    canInsert: true,
    canUpdate: true,
    canDelete: true
  }
};
const sessionUniques = [{
  isPrimary: true,
  attributes: ["id"],
  description: undefined,
  extensions: {
    tags: {
      __proto__: null
    }
  }
}, {
  isPrimary: false,
  attributes: ["token"],
  description: undefined,
  extensions: {
    tags: {
      __proto__: null
    }
  }
}];
const registryConfig_pgResources_session_session = {
  executor: executor,
  name: "session",
  identifier: "main.public.session",
  from: sessionIdentifier,
  codec: sessionCodec,
  uniques: sessionUniques,
  isVirtual: false,
  description: undefined,
  extensions: {
    description: undefined,
    pg: {
      serviceName: "main",
      schemaName: "public",
      name: "session"
    },
    isInsertable: true,
    isUpdatable: true,
    isDeletable: true,
    tags: {},
    canSelect: true,
    canInsert: true,
    canUpdate: true,
    canDelete: true
  }
};
const accountUniques = [{
  isPrimary: true,
  attributes: ["id"],
  description: undefined,
  extensions: {
    tags: {
      __proto__: null
    }
  }
}];
const registryConfig_pgResources_account_account = {
  executor: executor,
  name: "account",
  identifier: "main.public.account",
  from: accountIdentifier,
  codec: accountCodec,
  uniques: accountUniques,
  isVirtual: false,
  description: undefined,
  extensions: {
    description: undefined,
    pg: {
      serviceName: "main",
      schemaName: "public",
      name: "account"
    },
    isInsertable: true,
    isUpdatable: true,
    isDeletable: true,
    tags: {},
    canSelect: true,
    canInsert: true,
    canUpdate: true,
    canDelete: true
  }
};
const registryConfig = {
  pgExecutors: {
    __proto__: null,
    main: executor
  },
  pgCodecs: {
    __proto__: null,
    verification: verificationCodec,
    text: TYPES.text,
    timestamp: TYPES.timestamp,
    timestamptz: TYPES.timestamptz,
    tasks: tasksCodec,
    uuid: TYPES.uuid,
    bool: TYPES.boolean,
    user: userCodec,
    account: accountCodec,
    session: sessionCodec
  },
  pgResources: {
    __proto__: null,
    verification: {
      executor: executor,
      name: "verification",
      identifier: "main.public.verification",
      from: verificationIdentifier,
      codec: verificationCodec,
      uniques: verificationUniques,
      isVirtual: false,
      description: undefined,
      extensions: {
        description: undefined,
        pg: {
          serviceName: "main",
          schemaName: "public",
          name: "verification"
        },
        isInsertable: true,
        isUpdatable: true,
        isDeletable: true,
        tags: {},
        canSelect: true,
        canInsert: true,
        canUpdate: true,
        canDelete: true
      }
    },
    tasks: registryConfig_pgResources_tasks_tasks,
    user: registryConfig_pgResources_user_user,
    session: registryConfig_pgResources_session_session,
    account: registryConfig_pgResources_account_account
  },
  pgRelations: {
    __proto__: null,
    account: {
      __proto__: null,
      userByMyUserId: {
        localCodec: accountCodec,
        remoteResourceOptions: registryConfig_pgResources_user_user,
        localCodecPolymorphicTypes: undefined,
        localAttributes: ["user_id"],
        remoteAttributes: ["id"],
        isUnique: true,
        isReferencee: false,
        description: undefined,
        extensions: {
          tags: {
            behavior: []
          }
        }
      }
    },
    session: {
      __proto__: null,
      userByMyUserId: {
        localCodec: sessionCodec,
        remoteResourceOptions: registryConfig_pgResources_user_user,
        localCodecPolymorphicTypes: undefined,
        localAttributes: ["user_id"],
        remoteAttributes: ["id"],
        isUnique: true,
        isReferencee: false,
        description: undefined,
        extensions: {
          tags: {
            behavior: []
          }
        }
      }
    },
    tasks: {
      __proto__: null,
      userByMyUserId: {
        localCodec: tasksCodec,
        remoteResourceOptions: registryConfig_pgResources_user_user,
        localCodecPolymorphicTypes: undefined,
        localAttributes: ["user_id"],
        remoteAttributes: ["id"],
        isUnique: true,
        isReferencee: false,
        description: undefined,
        extensions: {
          tags: {
            behavior: []
          }
        }
      }
    },
    user: {
      __proto__: null,
      accountsByTheirUserId: {
        localCodec: userCodec,
        remoteResourceOptions: registryConfig_pgResources_account_account,
        localCodecPolymorphicTypes: undefined,
        localAttributes: ["id"],
        remoteAttributes: ["user_id"],
        isUnique: false,
        isReferencee: true,
        description: undefined,
        extensions: {
          tags: {
            behavior: []
          }
        }
      },
      sessionsByTheirUserId: {
        localCodec: userCodec,
        remoteResourceOptions: registryConfig_pgResources_session_session,
        localCodecPolymorphicTypes: undefined,
        localAttributes: ["id"],
        remoteAttributes: ["user_id"],
        isUnique: false,
        isReferencee: true,
        description: undefined,
        extensions: {
          tags: {
            behavior: []
          }
        }
      },
      tasksByTheirUserId: {
        localCodec: userCodec,
        remoteResourceOptions: registryConfig_pgResources_tasks_tasks,
        localCodecPolymorphicTypes: undefined,
        localAttributes: ["id"],
        remoteAttributes: ["user_id"],
        isUnique: false,
        isReferencee: true,
        description: undefined,
        extensions: {
          tags: {
            behavior: []
          }
        }
      }
    }
  }
};
const registry = makeRegistry(registryConfig);
const resource_verificationPgResource = registry.pgResources["verification"];
const resource_tasksPgResource = registry.pgResources["tasks"];
const resource_userPgResource = registry.pgResources["user"];
const resource_sessionPgResource = registry.pgResources["session"];
const resource_accountPgResource = registry.pgResources["account"];
const nodeIdHandler_Verification = {
  typeName: "Verification",
  codec: nodeIdCodecs_base64JSON_base64JSON,
  deprecationReason: undefined,
  plan($record) {
    return list([constant("Verification", false), $record.get("id")]);
  },
  getSpec($list) {
    return {
      id: inhibitOnNull(access($list, [1]))
    };
  },
  getIdentifiers(value) {
    return value.slice(1);
  },
  get(spec) {
    return resource_verificationPgResource.get(spec);
  },
  match(obj) {
    return obj[0] === "Verification";
  }
};
const specForHandlerCache = new Map();
function specForHandler(handler) {
  const existing = specForHandlerCache.get(handler);
  if (existing) return existing;
  function spec(nodeId) {
    if (nodeId == null) return null;
    try {
      const specifier = handler.codec.decode(nodeId);
      if (handler.match(specifier)) return specifier;
    } catch {}
    return null;
  }
  spec.displayName = `specifier_${handler.typeName}_${handler.codec.name}`;
  spec.isSyncAndSafe = !0;
  specForHandlerCache.set(handler, spec);
  return spec;
}
const nodeFetcher_Verification = $nodeId => {
  const $decoded = lambda($nodeId, specForHandler(nodeIdHandler_Verification));
  return nodeIdHandler_Verification.get(nodeIdHandler_Verification.getSpec($decoded));
};
const nodeIdHandler_Task = {
  typeName: "Task",
  codec: nodeIdCodecs_base64JSON_base64JSON,
  deprecationReason: undefined,
  plan($record) {
    return list([constant("Task", false), $record.get("id")]);
  },
  getSpec($list) {
    return {
      id: inhibitOnNull(access($list, [1]))
    };
  },
  getIdentifiers(value) {
    return value.slice(1);
  },
  get(spec) {
    return resource_tasksPgResource.get(spec);
  },
  match(obj) {
    return obj[0] === "Task";
  }
};
const nodeFetcher_Task = $nodeId => {
  const $decoded = lambda($nodeId, specForHandler(nodeIdHandler_Task));
  return nodeIdHandler_Task.get(nodeIdHandler_Task.getSpec($decoded));
};
const nodeIdHandler_User = {
  typeName: "User",
  codec: nodeIdCodecs_base64JSON_base64JSON,
  deprecationReason: undefined,
  plan($record) {
    return list([constant("User", false), $record.get("id")]);
  },
  getSpec($list) {
    return {
      id: inhibitOnNull(access($list, [1]))
    };
  },
  getIdentifiers(value) {
    return value.slice(1);
  },
  get(spec) {
    return resource_userPgResource.get(spec);
  },
  match(obj) {
    return obj[0] === "User";
  }
};
const nodeFetcher_User = $nodeId => {
  const $decoded = lambda($nodeId, specForHandler(nodeIdHandler_User));
  return nodeIdHandler_User.get(nodeIdHandler_User.getSpec($decoded));
};
const nodeIdHandler_Session = {
  typeName: "Session",
  codec: nodeIdCodecs_base64JSON_base64JSON,
  deprecationReason: undefined,
  plan($record) {
    return list([constant("Session", false), $record.get("id")]);
  },
  getSpec($list) {
    return {
      id: inhibitOnNull(access($list, [1]))
    };
  },
  getIdentifiers(value) {
    return value.slice(1);
  },
  get(spec) {
    return resource_sessionPgResource.get(spec);
  },
  match(obj) {
    return obj[0] === "Session";
  }
};
const nodeFetcher_Session = $nodeId => {
  const $decoded = lambda($nodeId, specForHandler(nodeIdHandler_Session));
  return nodeIdHandler_Session.get(nodeIdHandler_Session.getSpec($decoded));
};
const nodeIdHandler_Account = {
  typeName: "Account",
  codec: nodeIdCodecs_base64JSON_base64JSON,
  deprecationReason: undefined,
  plan($record) {
    return list([constant("Account", false), $record.get("id")]);
  },
  getSpec($list) {
    return {
      id: inhibitOnNull(access($list, [1]))
    };
  },
  getIdentifiers(value) {
    return value.slice(1);
  },
  get(spec) {
    return resource_accountPgResource.get(spec);
  },
  match(obj) {
    return obj[0] === "Account";
  }
};
const nodeFetcher_Account = $nodeId => {
  const $decoded = lambda($nodeId, specForHandler(nodeIdHandler_Account));
  return nodeIdHandler_Account.get(nodeIdHandler_Account.getSpec($decoded));
};
function qbWhereBuilder(qb) {
  return qb.whereBuilder();
}
function isEmpty(o) {
  return typeof o === "object" && o !== null && Object.keys(o).length === 0;
}
function assertAllowed(value, mode) {
  if (mode === "object" && !true && isEmpty(value)) throw Object.assign(Error("Empty objects are forbidden in filter argument input."), {});
  if (mode === "list" && !true) {
    const arr = value;
    if (arr) {
      const l = arr.length;
      for (let i = 0; i < l; i++) if (isEmpty(arr[i])) throw Object.assign(Error("Empty objects are forbidden in filter argument input."), {});
    }
  }
  if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
}
function assertAllowed2(value, mode) {
  if (mode === "object" && !true && isEmpty(value)) throw Object.assign(Error("Empty objects are forbidden in filter argument input."), {});
  if (mode === "list" && !true) {
    const arr = value;
    if (arr) {
      const l = arr.length;
      for (let i = 0; i < l; i++) if (isEmpty(arr[i])) throw Object.assign(Error("Empty objects are forbidden in filter argument input."), {});
    }
  }
  if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
}
function assertAllowed3(value, mode) {
  if (mode === "object" && !true && isEmpty(value)) throw Object.assign(Error("Empty objects are forbidden in filter argument input."), {});
  if (mode === "list" && !true) {
    const arr = value;
    if (arr) {
      const l = arr.length;
      for (let i = 0; i < l; i++) if (isEmpty(arr[i])) throw Object.assign(Error("Empty objects are forbidden in filter argument input."), {});
    }
  }
  if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
}
function assertAllowed4(value, mode) {
  if (mode === "object" && !true && isEmpty(value)) throw Object.assign(Error("Empty objects are forbidden in filter argument input."), {});
  if (mode === "list" && !true) {
    const arr = value;
    if (arr) {
      const l = arr.length;
      for (let i = 0; i < l; i++) if (isEmpty(arr[i])) throw Object.assign(Error("Empty objects are forbidden in filter argument input."), {});
    }
  }
  if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
}
function assertAllowed5(value, mode) {
  if (mode === "object" && !true && isEmpty(value)) throw Object.assign(Error("Empty objects are forbidden in filter argument input."), {});
  if (mode === "list" && !true) {
    const arr = value;
    if (arr) {
      const l = arr.length;
      for (let i = 0; i < l; i++) if (isEmpty(arr[i])) throw Object.assign(Error("Empty objects are forbidden in filter argument input."), {});
    }
  }
  if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
}
const nodeIdHandlerByTypeName = {
  __proto__: null,
  Query: nodeIdHandler_Query,
  Verification: nodeIdHandler_Verification,
  Task: nodeIdHandler_Task,
  User: nodeIdHandler_User,
  Session: nodeIdHandler_Session,
  Account: nodeIdHandler_Account
};
const decodeNodeId = makeDecodeNodeId(Object.values(nodeIdHandlerByTypeName));
function findTypeNameMatch(specifier) {
  if (!specifier) return null;
  for (const [typeName, typeSpec] of Object.entries(nodeIdHandlerByTypeName)) {
    const value = specifier[typeSpec.codec.name];
    if (value != null && typeSpec.match(value)) return typeName;
  }
  console.warn(`Could not find a type that matched the specifier '${inspect(specifier)}'`);
  return null;
}
function DatetimeSerialize(value) {
  return "" + value;
}
const coerce = string => {
  if (!/^[0-9a-f]{8}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{12}$/i.test(string)) throw new GraphQLError("Invalid UUID, expected 32 hexadecimal characters, optionally with hyphens");
  return string;
};
function assertAllowed6(value, mode) {
  if (mode === "object" && !true && isEmpty(value)) throw Object.assign(Error("Empty objects are forbidden in filter argument input."), {});
  if (mode === "list" && !true) {
    const arr = value;
    if (arr) {
      const l = arr.length;
      for (let i = 0; i < l; i++) if (isEmpty(arr[i])) throw Object.assign(Error("Empty objects are forbidden in filter argument input."), {});
    }
  }
  if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
}
function assertAllowed7(value, mode) {
  if (mode === "object" && !true && isEmpty(value)) throw Object.assign(Error("Empty objects are forbidden in filter argument input."), {});
  if (mode === "list" && !true) {
    const arr = value;
    if (arr) {
      const l = arr.length;
      for (let i = 0; i < l; i++) if (isEmpty(arr[i])) throw Object.assign(Error("Empty objects are forbidden in filter argument input."), {});
    }
  }
  if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
}
function assertAllowed8(value, mode) {
  if (mode === "object" && !true && isEmpty(value)) throw Object.assign(Error("Empty objects are forbidden in filter argument input."), {});
  if (mode === "list" && !true) {
    const arr = value;
    if (arr) {
      const l = arr.length;
      for (let i = 0; i < l; i++) if (isEmpty(arr[i])) throw Object.assign(Error("Empty objects are forbidden in filter argument input."), {});
    }
  }
  if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
}
const colSpec = {
  fieldName: "rowId",
  attributeName: "id",
  attribute: spec_account.attributes.id
};
const colSpec2 = {
  fieldName: "accountId",
  attributeName: "account_id",
  attribute: spec_account.attributes.account_id
};
const colSpec3 = {
  fieldName: "providerId",
  attributeName: "provider_id",
  attribute: spec_account.attributes.provider_id
};
const colSpec4 = {
  fieldName: "userId",
  attributeName: "user_id",
  attribute: spec_account.attributes.user_id
};
const colSpec5 = {
  fieldName: "accessToken",
  attributeName: "access_token",
  attribute: spec_account.attributes.access_token
};
const colSpec6 = {
  fieldName: "refreshToken",
  attributeName: "refresh_token",
  attribute: spec_account.attributes.refresh_token
};
const colSpec7 = {
  fieldName: "idToken",
  attributeName: "id_token",
  attribute: spec_account.attributes.id_token
};
const colSpec8 = {
  fieldName: "accessTokenExpiresAt",
  attributeName: "access_token_expires_at",
  attribute: spec_account.attributes.access_token_expires_at
};
const colSpec9 = {
  fieldName: "refreshTokenExpiresAt",
  attributeName: "refresh_token_expires_at",
  attribute: spec_account.attributes.refresh_token_expires_at
};
const colSpec10 = {
  fieldName: "scope",
  attributeName: "scope",
  attribute: spec_account.attributes.scope
};
const colSpec11 = {
  fieldName: "password",
  attributeName: "password",
  attribute: spec_account.attributes.password
};
const colSpec12 = {
  fieldName: "createdAt",
  attributeName: "createdAt",
  attribute: spec_account.attributes.createdAt
};
const colSpec13 = {
  fieldName: "updatedAt",
  attributeName: "updatedAt",
  attribute: spec_account.attributes.updatedAt
};
function assertAllowed9(value, mode) {
  if (mode === "object" && !true && isEmpty(value)) throw Object.assign(Error("Empty objects are forbidden in filter argument input."), {});
  if (mode === "list" && !true) {
    const arr = value;
    if (arr) {
      const l = arr.length;
      for (let i = 0; i < l; i++) if (isEmpty(arr[i])) throw Object.assign(Error("Empty objects are forbidden in filter argument input."), {});
    }
  }
  if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
}
function assertAllowed10(value, mode) {
  if (mode === "object" && !true && isEmpty(value)) throw Object.assign(Error("Empty objects are forbidden in filter argument input."), {});
  if (mode === "list" && !true) {
    const arr = value;
    if (arr) {
      const l = arr.length;
      for (let i = 0; i < l; i++) if (isEmpty(arr[i])) throw Object.assign(Error("Empty objects are forbidden in filter argument input."), {});
    }
  }
  if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
}
const resolve = (i, _v, input) => sql`${i} ${input ? sql`IS NULL` : sql`IS NOT NULL`}`;
const resolveInputCodec = () => TYPES.boolean;
const resolveSqlValue = () => sql.null;
const resolve2 = (i, v) => sql`${i} = ${v}`;
const forceTextTypesSensitive = [TYPES.citext, TYPES.char, TYPES.bpchar];
function resolveDomains(c) {
  let current = c;
  while (current.domainOfCodec) current = current.domainOfCodec;
  return current;
}
function resolveInputCodec2(c) {
  if (c.arrayOfCodec) {
    if (forceTextTypesSensitive.includes(resolveDomains(c.arrayOfCodec))) return listOfCodec(TYPES.text, {
      extensions: {
        listItemNonNull: c.extensions?.listItemNonNull
      }
    });
    return c;
  } else {
    if (forceTextTypesSensitive.includes(resolveDomains(c))) return TYPES.text;
    return c;
  }
}
function resolveSqlIdentifier(identifier, c) {
  if (c.arrayOfCodec && forceTextTypesSensitive.includes(resolveDomains(c.arrayOfCodec))) return [sql`(${identifier})::text[]`, listOfCodec(TYPES.text, {
    extensions: {
      listItemNonNull: c.extensions?.listItemNonNull
    }
  })];else if (forceTextTypesSensitive.includes(resolveDomains(c))) return [sql`(${identifier})::text`, TYPES.text];else return [identifier, c];
}
const resolve3 = (i, v) => sql`${i} <> ${v}`;
const resolve4 = (i, v) => sql`${i} IS DISTINCT FROM ${v}`;
const resolve5 = (i, v) => sql`${i} IS NOT DISTINCT FROM ${v}`;
const resolve6 = (i, v) => sql`${i} = ANY(${v})`;
function resolveInputCodec3(c) {
  if (forceTextTypesSensitive.includes(resolveDomains(c))) return listOfCodec(TYPES.text, {
    extensions: {
      listItemNonNull: !0
    }
  });else return listOfCodec(c, {
    extensions: {
      listItemNonNull: !0
    }
  });
}
const resolve7 = (i, v) => sql`${i} <> ALL(${v})`;
const resolve8 = (i, v) => sql`${i} < ${v}`;
const resolve9 = (i, v) => sql`${i} <= ${v}`;
const resolve10 = (i, v) => sql`${i} > ${v}`;
const resolve11 = (i, v) => sql`${i} >= ${v}`;
const resolve12 = (i, v) => sql`${i} LIKE ${v}`;
function escapeLikeWildcards(input) {
  if (typeof input !== "string") throw Error("Non-string input was provided to escapeLikeWildcards");else return input.split("%").join("\\%").split("_").join("\\_");
}
const resolveInput = input => `%${escapeLikeWildcards(input)}%`;
const resolve13 = (i, v) => sql`${i} NOT LIKE ${v}`;
const resolveInput2 = input => `%${escapeLikeWildcards(input)}%`;
const resolve14 = (i, v) => sql`${i} ILIKE ${v}`;
const resolveInput3 = input => `%${escapeLikeWildcards(input)}%`;
const forceTextTypesInsensitive = [TYPES.char, TYPES.bpchar];
function resolveInputCodec4(c) {
  if (c.arrayOfCodec) {
    if (forceTextTypesInsensitive.includes(resolveDomains(c.arrayOfCodec))) return listOfCodec(TYPES.text, {
      extensions: {
        listItemNonNull: c.extensions?.listItemNonNull
      }
    });
    return c;
  } else {
    if (forceTextTypesInsensitive.includes(resolveDomains(c))) return TYPES.text;
    return c;
  }
}
function resolveSqlIdentifier2(identifier, c) {
  if (c.arrayOfCodec && forceTextTypesInsensitive.includes(resolveDomains(c.arrayOfCodec))) return [sql`(${identifier})::text[]`, listOfCodec(TYPES.text, {
    extensions: {
      listItemNonNull: c.extensions?.listItemNonNull
    }
  })];else if (forceTextTypesInsensitive.includes(resolveDomains(c))) return [sql`(${identifier})::text`, TYPES.text];else return [identifier, c];
}
const resolve15 = (i, v) => sql`${i} NOT ILIKE ${v}`;
const resolveInput4 = input => `%${escapeLikeWildcards(input)}%`;
const resolve16 = (i, v) => sql`${i} LIKE ${v}`;
const resolveInput5 = input => `${escapeLikeWildcards(input)}%`;
const resolve17 = (i, v) => sql`${i} NOT LIKE ${v}`;
const resolveInput6 = input => `${escapeLikeWildcards(input)}%`;
const resolve18 = (i, v) => sql`${i} ILIKE ${v}`;
const resolveInput7 = input => `${escapeLikeWildcards(input)}%`;
const resolve19 = (i, v) => sql`${i} NOT ILIKE ${v}`;
const resolveInput8 = input => `${escapeLikeWildcards(input)}%`;
const resolve20 = (i, v) => sql`${i} LIKE ${v}`;
const resolveInput9 = input => `%${escapeLikeWildcards(input)}`;
const resolve21 = (i, v) => sql`${i} NOT LIKE ${v}`;
const resolveInput10 = input => `%${escapeLikeWildcards(input)}`;
const resolve22 = (i, v) => sql`${i} ILIKE ${v}`;
const resolveInput11 = input => `%${escapeLikeWildcards(input)}`;
const resolve23 = (i, v) => sql`${i} NOT ILIKE ${v}`;
const resolveInput12 = input => `%${escapeLikeWildcards(input)}`;
const resolve24 = (i, v) => sql`${i} LIKE ${v}`;
const resolve25 = (i, v) => sql`${i} NOT LIKE ${v}`;
const resolve26 = (i, v) => sql`${i} ILIKE ${v}`;
const resolve27 = (i, v) => sql`${i} NOT ILIKE ${v}`;
function resolveInputCodec5(inputCodec) {
  if ("equalTo" === "in" || "equalTo" === "notIn") {
    const t = resolveDomains(inputCodec) === TYPES.citext ? inputCodec : TYPES.text;
    return listOfCodec(t, {
      extensions: {
        listItemNonNull: !0
      }
    });
  } else return resolveDomains(inputCodec) === TYPES.citext ? inputCodec : TYPES.text;
}
function resolveSqlIdentifier3(sourceAlias, codec) {
  return resolveDomains(codec) === TYPES.citext ? [sourceAlias, codec] : [sql`lower(${sourceAlias}::text)`, TYPES.text];
}
function resolveSqlValue2(_unused, input, inputCodec) {
  if ("equalTo" === "in" || "equalTo" === "notIn") {
    const sqlList = sqlValueWithCodec(input, inputCodec);
    if (inputCodec.arrayOfCodec === TYPES.citext) return sqlList;else return sql`(select lower(t) from unnest(${sqlList}) t)`;
  } else {
    const sqlValue = sqlValueWithCodec(input, inputCodec);
    if (inputCodec === TYPES.citext) return sqlValue;else return sql`lower(${sqlValue})`;
  }
}
function resolveInputCodec6(inputCodec) {
  if ("notEqualTo" === "in" || "notEqualTo" === "notIn") {
    const t = resolveDomains(inputCodec) === TYPES.citext ? inputCodec : TYPES.text;
    return listOfCodec(t, {
      extensions: {
        listItemNonNull: !0
      }
    });
  } else return resolveDomains(inputCodec) === TYPES.citext ? inputCodec : TYPES.text;
}
function resolveSqlIdentifier4(sourceAlias, codec) {
  return resolveDomains(codec) === TYPES.citext ? [sourceAlias, codec] : [sql`lower(${sourceAlias}::text)`, TYPES.text];
}
function resolveSqlValue3(_unused, input, inputCodec) {
  if ("notEqualTo" === "in" || "notEqualTo" === "notIn") {
    const sqlList = sqlValueWithCodec(input, inputCodec);
    if (inputCodec.arrayOfCodec === TYPES.citext) return sqlList;else return sql`(select lower(t) from unnest(${sqlList}) t)`;
  } else {
    const sqlValue = sqlValueWithCodec(input, inputCodec);
    if (inputCodec === TYPES.citext) return sqlValue;else return sql`lower(${sqlValue})`;
  }
}
function resolveInputCodec7(inputCodec) {
  if ("distinctFrom" === "in" || "distinctFrom" === "notIn") {
    const t = resolveDomains(inputCodec) === TYPES.citext ? inputCodec : TYPES.text;
    return listOfCodec(t, {
      extensions: {
        listItemNonNull: !0
      }
    });
  } else return resolveDomains(inputCodec) === TYPES.citext ? inputCodec : TYPES.text;
}
function resolveSqlIdentifier5(sourceAlias, codec) {
  return resolveDomains(codec) === TYPES.citext ? [sourceAlias, codec] : [sql`lower(${sourceAlias}::text)`, TYPES.text];
}
function resolveSqlValue4(_unused, input, inputCodec) {
  if ("distinctFrom" === "in" || "distinctFrom" === "notIn") {
    const sqlList = sqlValueWithCodec(input, inputCodec);
    if (inputCodec.arrayOfCodec === TYPES.citext) return sqlList;else return sql`(select lower(t) from unnest(${sqlList}) t)`;
  } else {
    const sqlValue = sqlValueWithCodec(input, inputCodec);
    if (inputCodec === TYPES.citext) return sqlValue;else return sql`lower(${sqlValue})`;
  }
}
function resolveInputCodec8(inputCodec) {
  if ("notDistinctFrom" === "in" || "notDistinctFrom" === "notIn") {
    const t = resolveDomains(inputCodec) === TYPES.citext ? inputCodec : TYPES.text;
    return listOfCodec(t, {
      extensions: {
        listItemNonNull: !0
      }
    });
  } else return resolveDomains(inputCodec) === TYPES.citext ? inputCodec : TYPES.text;
}
function resolveSqlIdentifier6(sourceAlias, codec) {
  return resolveDomains(codec) === TYPES.citext ? [sourceAlias, codec] : [sql`lower(${sourceAlias}::text)`, TYPES.text];
}
function resolveSqlValue5(_unused, input, inputCodec) {
  if ("notDistinctFrom" === "in" || "notDistinctFrom" === "notIn") {
    const sqlList = sqlValueWithCodec(input, inputCodec);
    if (inputCodec.arrayOfCodec === TYPES.citext) return sqlList;else return sql`(select lower(t) from unnest(${sqlList}) t)`;
  } else {
    const sqlValue = sqlValueWithCodec(input, inputCodec);
    if (inputCodec === TYPES.citext) return sqlValue;else return sql`lower(${sqlValue})`;
  }
}
function resolveInputCodec9(inputCodec) {
  if ("in" === "in" || "in" === "notIn") {
    const t = resolveDomains(inputCodec) === TYPES.citext ? inputCodec : TYPES.text;
    return listOfCodec(t, {
      extensions: {
        listItemNonNull: !0
      }
    });
  } else return resolveDomains(inputCodec) === TYPES.citext ? inputCodec : TYPES.text;
}
function resolveSqlIdentifier7(sourceAlias, codec) {
  return resolveDomains(codec) === TYPES.citext ? [sourceAlias, codec] : [sql`lower(${sourceAlias}::text)`, TYPES.text];
}
function resolveSqlValue6(_unused, input, inputCodec) {
  if ("in" === "in" || "in" === "notIn") {
    const sqlList = sqlValueWithCodec(input, inputCodec);
    if (inputCodec.arrayOfCodec === TYPES.citext) return sqlList;else return sql`(select lower(t) from unnest(${sqlList}) t)`;
  } else {
    const sqlValue = sqlValueWithCodec(input, inputCodec);
    if (inputCodec === TYPES.citext) return sqlValue;else return sql`lower(${sqlValue})`;
  }
}
function resolveInputCodec10(inputCodec) {
  if ("notIn" === "in" || "notIn" === "notIn") {
    const t = resolveDomains(inputCodec) === TYPES.citext ? inputCodec : TYPES.text;
    return listOfCodec(t, {
      extensions: {
        listItemNonNull: !0
      }
    });
  } else return resolveDomains(inputCodec) === TYPES.citext ? inputCodec : TYPES.text;
}
function resolveSqlIdentifier8(sourceAlias, codec) {
  return resolveDomains(codec) === TYPES.citext ? [sourceAlias, codec] : [sql`lower(${sourceAlias}::text)`, TYPES.text];
}
function resolveSqlValue7(_unused, input, inputCodec) {
  if ("notIn" === "in" || "notIn" === "notIn") {
    const sqlList = sqlValueWithCodec(input, inputCodec);
    if (inputCodec.arrayOfCodec === TYPES.citext) return sqlList;else return sql`(select lower(t) from unnest(${sqlList}) t)`;
  } else {
    const sqlValue = sqlValueWithCodec(input, inputCodec);
    if (inputCodec === TYPES.citext) return sqlValue;else return sql`lower(${sqlValue})`;
  }
}
function resolveInputCodec11(inputCodec) {
  if ("lessThan" === "in" || "lessThan" === "notIn") {
    const t = resolveDomains(inputCodec) === TYPES.citext ? inputCodec : TYPES.text;
    return listOfCodec(t, {
      extensions: {
        listItemNonNull: !0
      }
    });
  } else return resolveDomains(inputCodec) === TYPES.citext ? inputCodec : TYPES.text;
}
function resolveSqlIdentifier9(sourceAlias, codec) {
  return resolveDomains(codec) === TYPES.citext ? [sourceAlias, codec] : [sql`lower(${sourceAlias}::text)`, TYPES.text];
}
function resolveSqlValue8(_unused, input, inputCodec) {
  if ("lessThan" === "in" || "lessThan" === "notIn") {
    const sqlList = sqlValueWithCodec(input, inputCodec);
    if (inputCodec.arrayOfCodec === TYPES.citext) return sqlList;else return sql`(select lower(t) from unnest(${sqlList}) t)`;
  } else {
    const sqlValue = sqlValueWithCodec(input, inputCodec);
    if (inputCodec === TYPES.citext) return sqlValue;else return sql`lower(${sqlValue})`;
  }
}
function resolveInputCodec12(inputCodec) {
  if ("lessThanOrEqualTo" === "in" || "lessThanOrEqualTo" === "notIn") {
    const t = resolveDomains(inputCodec) === TYPES.citext ? inputCodec : TYPES.text;
    return listOfCodec(t, {
      extensions: {
        listItemNonNull: !0
      }
    });
  } else return resolveDomains(inputCodec) === TYPES.citext ? inputCodec : TYPES.text;
}
function resolveSqlIdentifier10(sourceAlias, codec) {
  return resolveDomains(codec) === TYPES.citext ? [sourceAlias, codec] : [sql`lower(${sourceAlias}::text)`, TYPES.text];
}
function resolveSqlValue9(_unused, input, inputCodec) {
  if ("lessThanOrEqualTo" === "in" || "lessThanOrEqualTo" === "notIn") {
    const sqlList = sqlValueWithCodec(input, inputCodec);
    if (inputCodec.arrayOfCodec === TYPES.citext) return sqlList;else return sql`(select lower(t) from unnest(${sqlList}) t)`;
  } else {
    const sqlValue = sqlValueWithCodec(input, inputCodec);
    if (inputCodec === TYPES.citext) return sqlValue;else return sql`lower(${sqlValue})`;
  }
}
function resolveInputCodec13(inputCodec) {
  if ("greaterThan" === "in" || "greaterThan" === "notIn") {
    const t = resolveDomains(inputCodec) === TYPES.citext ? inputCodec : TYPES.text;
    return listOfCodec(t, {
      extensions: {
        listItemNonNull: !0
      }
    });
  } else return resolveDomains(inputCodec) === TYPES.citext ? inputCodec : TYPES.text;
}
function resolveSqlIdentifier11(sourceAlias, codec) {
  return resolveDomains(codec) === TYPES.citext ? [sourceAlias, codec] : [sql`lower(${sourceAlias}::text)`, TYPES.text];
}
function resolveSqlValue10(_unused, input, inputCodec) {
  if ("greaterThan" === "in" || "greaterThan" === "notIn") {
    const sqlList = sqlValueWithCodec(input, inputCodec);
    if (inputCodec.arrayOfCodec === TYPES.citext) return sqlList;else return sql`(select lower(t) from unnest(${sqlList}) t)`;
  } else {
    const sqlValue = sqlValueWithCodec(input, inputCodec);
    if (inputCodec === TYPES.citext) return sqlValue;else return sql`lower(${sqlValue})`;
  }
}
function resolveInputCodec14(inputCodec) {
  if ("greaterThanOrEqualTo" === "in" || "greaterThanOrEqualTo" === "notIn") {
    const t = resolveDomains(inputCodec) === TYPES.citext ? inputCodec : TYPES.text;
    return listOfCodec(t, {
      extensions: {
        listItemNonNull: !0
      }
    });
  } else return resolveDomains(inputCodec) === TYPES.citext ? inputCodec : TYPES.text;
}
function resolveSqlIdentifier12(sourceAlias, codec) {
  return resolveDomains(codec) === TYPES.citext ? [sourceAlias, codec] : [sql`lower(${sourceAlias}::text)`, TYPES.text];
}
function resolveSqlValue11(_unused, input, inputCodec) {
  if ("greaterThanOrEqualTo" === "in" || "greaterThanOrEqualTo" === "notIn") {
    const sqlList = sqlValueWithCodec(input, inputCodec);
    if (inputCodec.arrayOfCodec === TYPES.citext) return sqlList;else return sql`(select lower(t) from unnest(${sqlList}) t)`;
  } else {
    const sqlValue = sqlValueWithCodec(input, inputCodec);
    if (inputCodec === TYPES.citext) return sqlValue;else return sql`lower(${sqlValue})`;
  }
}
const resolve28 = (i, _v, input) => sql`${i} ${input ? sql`IS NULL` : sql`IS NOT NULL`}`;
const resolveInputCodec15 = () => TYPES.boolean;
const resolveSqlValue12 = () => sql.null;
const resolve29 = (i, v) => sql`${i} = ${v}`;
const forceTextTypesSensitive2 = [TYPES.citext, TYPES.char, TYPES.bpchar];
function resolveDomains2(c) {
  let current = c;
  while (current.domainOfCodec) current = current.domainOfCodec;
  return current;
}
function resolveInputCodec16(c) {
  if (c.arrayOfCodec) {
    if (forceTextTypesSensitive2.includes(resolveDomains2(c.arrayOfCodec))) return listOfCodec(TYPES.text, {
      extensions: {
        listItemNonNull: c.extensions?.listItemNonNull
      }
    });
    return c;
  } else {
    if (forceTextTypesSensitive2.includes(resolveDomains2(c))) return TYPES.text;
    return c;
  }
}
function resolveSqlIdentifier13(identifier, c) {
  if (c.arrayOfCodec && forceTextTypesSensitive2.includes(resolveDomains2(c.arrayOfCodec))) return [sql`(${identifier})::text[]`, listOfCodec(TYPES.text, {
    extensions: {
      listItemNonNull: c.extensions?.listItemNonNull
    }
  })];else if (forceTextTypesSensitive2.includes(resolveDomains2(c))) return [sql`(${identifier})::text`, TYPES.text];else return [identifier, c];
}
const resolve30 = (i, v) => sql`${i} <> ${v}`;
const resolve31 = (i, v) => sql`${i} IS DISTINCT FROM ${v}`;
const resolve32 = (i, v) => sql`${i} IS NOT DISTINCT FROM ${v}`;
const resolve33 = (i, v) => sql`${i} = ANY(${v})`;
function resolveInputCodec17(c) {
  if (forceTextTypesSensitive2.includes(resolveDomains2(c))) return listOfCodec(TYPES.text, {
    extensions: {
      listItemNonNull: !0
    }
  });else return listOfCodec(c, {
    extensions: {
      listItemNonNull: !0
    }
  });
}
const resolve34 = (i, v) => sql`${i} <> ALL(${v})`;
const resolve35 = (i, v) => sql`${i} < ${v}`;
const resolve36 = (i, v) => sql`${i} <= ${v}`;
const resolve37 = (i, v) => sql`${i} > ${v}`;
const resolve38 = (i, v) => sql`${i} >= ${v}`;
const colSpec14 = {
  fieldName: "rowId",
  attributeName: "id",
  attribute: spec_user.attributes.id
};
const colSpec15 = {
  fieldName: "name",
  attributeName: "name",
  attribute: spec_user.attributes.name
};
const colSpec16 = {
  fieldName: "email",
  attributeName: "email",
  attribute: spec_user.attributes.email
};
const colSpec17 = {
  fieldName: "emailVerified",
  attributeName: "email_verified",
  attribute: spec_user.attributes.email_verified
};
const colSpec18 = {
  fieldName: "image",
  attributeName: "image",
  attribute: spec_user.attributes.image
};
const colSpec19 = {
  fieldName: "createdAt",
  attributeName: "createdAt",
  attribute: spec_user.attributes.createdAt
};
const colSpec20 = {
  fieldName: "updatedAt",
  attributeName: "updatedAt",
  attribute: spec_user.attributes.updatedAt
};
function assertAllowed11(value, mode) {
  if (mode === "object" && !true && isEmpty(value)) throw Object.assign(Error("Empty objects are forbidden in filter argument input."), {});
  if (mode === "list" && !true) {
    const arr = value;
    if (arr) {
      const l = arr.length;
      for (let i = 0; i < l; i++) if (isEmpty(arr[i])) throw Object.assign(Error("Empty objects are forbidden in filter argument input."), {});
    }
  }
  if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
}
function assertAllowed12(value, mode) {
  if (mode === "object" && !true && isEmpty(value)) throw Object.assign(Error("Empty objects are forbidden in filter argument input."), {});
  if (mode === "list" && !true) {
    const arr = value;
    if (arr) {
      const l = arr.length;
      for (let i = 0; i < l; i++) if (isEmpty(arr[i])) throw Object.assign(Error("Empty objects are forbidden in filter argument input."), {});
    }
  }
  if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
}
const resolve39 = (i, _v, input) => sql`${i} ${input ? sql`IS NULL` : sql`IS NOT NULL`}`;
const resolveInputCodec18 = () => TYPES.boolean;
const resolveSqlValue13 = () => sql.null;
const resolve40 = (i, v) => sql`${i} = ${v}`;
const forceTextTypesSensitive3 = [TYPES.citext, TYPES.char, TYPES.bpchar];
function resolveDomains3(c) {
  let current = c;
  while (current.domainOfCodec) current = current.domainOfCodec;
  return current;
}
function resolveInputCodec19(c) {
  if (c.arrayOfCodec) {
    if (forceTextTypesSensitive3.includes(resolveDomains3(c.arrayOfCodec))) return listOfCodec(TYPES.text, {
      extensions: {
        listItemNonNull: c.extensions?.listItemNonNull
      }
    });
    return c;
  } else {
    if (forceTextTypesSensitive3.includes(resolveDomains3(c))) return TYPES.text;
    return c;
  }
}
function resolveSqlIdentifier14(identifier, c) {
  if (c.arrayOfCodec && forceTextTypesSensitive3.includes(resolveDomains3(c.arrayOfCodec))) return [sql`(${identifier})::text[]`, listOfCodec(TYPES.text, {
    extensions: {
      listItemNonNull: c.extensions?.listItemNonNull
    }
  })];else if (forceTextTypesSensitive3.includes(resolveDomains3(c))) return [sql`(${identifier})::text`, TYPES.text];else return [identifier, c];
}
const resolve41 = (i, v) => sql`${i} <> ${v}`;
const resolve42 = (i, v) => sql`${i} IS DISTINCT FROM ${v}`;
const resolve43 = (i, v) => sql`${i} IS NOT DISTINCT FROM ${v}`;
const resolve44 = (i, v) => sql`${i} = ANY(${v})`;
function resolveInputCodec20(c) {
  if (forceTextTypesSensitive3.includes(resolveDomains3(c))) return listOfCodec(TYPES.text, {
    extensions: {
      listItemNonNull: !0
    }
  });else return listOfCodec(c, {
    extensions: {
      listItemNonNull: !0
    }
  });
}
const resolve45 = (i, v) => sql`${i} <> ALL(${v})`;
const resolve46 = (i, v) => sql`${i} < ${v}`;
const resolve47 = (i, v) => sql`${i} <= ${v}`;
const resolve48 = (i, v) => sql`${i} > ${v}`;
const resolve49 = (i, v) => sql`${i} >= ${v}`;
function assertAllowed13(value, mode) {
  if (mode === "object" && !true && isEmpty(value)) throw Object.assign(Error("Empty objects are forbidden in filter argument input."), {});
  if (mode === "list" && !true) {
    const arr = value;
    if (arr) {
      const l = arr.length;
      for (let i = 0; i < l; i++) if (isEmpty(arr[i])) throw Object.assign(Error("Empty objects are forbidden in filter argument input."), {});
    }
  }
  if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
}
function assertAllowed14(value, mode) {
  if (mode === "object" && !true && isEmpty(value)) throw Object.assign(Error("Empty objects are forbidden in filter argument input."), {});
  if (mode === "list" && !true) {
    const arr = value;
    if (arr) {
      const l = arr.length;
      for (let i = 0; i < l; i++) if (isEmpty(arr[i])) throw Object.assign(Error("Empty objects are forbidden in filter argument input."), {});
    }
  }
  if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
}
const colSpec21 = {
  fieldName: "rowId",
  attributeName: "id",
  attribute: spec_session.attributes.id
};
const colSpec22 = {
  fieldName: "expiresAt",
  attributeName: "expires_at",
  attribute: spec_session.attributes.expires_at
};
const colSpec23 = {
  fieldName: "token",
  attributeName: "token",
  attribute: spec_session.attributes.token
};
const colSpec24 = {
  fieldName: "createdAt",
  attributeName: "createdAt",
  attribute: spec_session.attributes.createdAt
};
const colSpec25 = {
  fieldName: "updatedAt",
  attributeName: "updatedAt",
  attribute: spec_session.attributes.updatedAt
};
const colSpec26 = {
  fieldName: "ipAddress",
  attributeName: "ip_address",
  attribute: spec_session.attributes.ip_address
};
const colSpec27 = {
  fieldName: "userAgent",
  attributeName: "user_agent",
  attribute: spec_session.attributes.user_agent
};
const colSpec28 = {
  fieldName: "userId",
  attributeName: "user_id",
  attribute: spec_session.attributes.user_id
};
function assertAllowed15(value, mode) {
  if (mode === "object" && !true && isEmpty(value)) throw Object.assign(Error("Empty objects are forbidden in filter argument input."), {});
  if (mode === "list" && !true) {
    const arr = value;
    if (arr) {
      const l = arr.length;
      for (let i = 0; i < l; i++) if (isEmpty(arr[i])) throw Object.assign(Error("Empty objects are forbidden in filter argument input."), {});
    }
  }
  if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
}
function assertAllowed16(value, mode) {
  if (mode === "object" && !true && isEmpty(value)) throw Object.assign(Error("Empty objects are forbidden in filter argument input."), {});
  if (mode === "list" && !true) {
    const arr = value;
    if (arr) {
      const l = arr.length;
      for (let i = 0; i < l; i++) if (isEmpty(arr[i])) throw Object.assign(Error("Empty objects are forbidden in filter argument input."), {});
    }
  }
  if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
}
function assertAllowed17(value, mode) {
  if (mode === "object" && !true && isEmpty(value)) throw Object.assign(Error("Empty objects are forbidden in filter argument input."), {});
  if (mode === "list" && !true) {
    const arr = value;
    if (arr) {
      const l = arr.length;
      for (let i = 0; i < l; i++) if (isEmpty(arr[i])) throw Object.assign(Error("Empty objects are forbidden in filter argument input."), {});
    }
  }
  if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
}
const colSpec29 = {
  fieldName: "rowId",
  attributeName: "id",
  attribute: spec_tasks.attributes.id
};
const colSpec30 = {
  fieldName: "userId",
  attributeName: "user_id",
  attribute: spec_tasks.attributes.user_id
};
const colSpec31 = {
  fieldName: "name",
  attributeName: "name",
  attribute: spec_tasks.attributes.name
};
const colSpec32 = {
  fieldName: "description",
  attributeName: "description",
  attribute: spec_tasks.attributes.description
};
const colSpec33 = {
  fieldName: "completed",
  attributeName: "completed",
  attribute: spec_tasks.attributes.completed
};
const colSpec34 = {
  fieldName: "createdAt",
  attributeName: "createdAt",
  attribute: spec_tasks.attributes.createdAt
};
const colSpec35 = {
  fieldName: "updatedAt",
  attributeName: "updatedAt",
  attribute: spec_tasks.attributes.updatedAt
};
function assertAllowed18(value, mode) {
  if (mode === "object" && !true && isEmpty(value)) throw Object.assign(Error("Empty objects are forbidden in filter argument input."), {});
  if (mode === "list" && !true) {
    const arr = value;
    if (arr) {
      const l = arr.length;
      for (let i = 0; i < l; i++) if (isEmpty(arr[i])) throw Object.assign(Error("Empty objects are forbidden in filter argument input."), {});
    }
  }
  if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
}
function assertAllowed19(value, mode) {
  if (mode === "object" && !true && isEmpty(value)) throw Object.assign(Error("Empty objects are forbidden in filter argument input."), {});
  if (mode === "list" && !true) {
    const arr = value;
    if (arr) {
      const l = arr.length;
      for (let i = 0; i < l; i++) if (isEmpty(arr[i])) throw Object.assign(Error("Empty objects are forbidden in filter argument input."), {});
    }
  }
  if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
}
const resolve50 = (i, _v, input) => sql`${i} ${input ? sql`IS NULL` : sql`IS NOT NULL`}`;
const resolveInputCodec21 = () => TYPES.boolean;
const resolveSqlValue14 = () => sql.null;
const resolve51 = (i, v) => sql`${i} = ${v}`;
const forceTextTypesSensitive4 = [TYPES.citext, TYPES.char, TYPES.bpchar];
function resolveDomains4(c) {
  let current = c;
  while (current.domainOfCodec) current = current.domainOfCodec;
  return current;
}
function resolveInputCodec22(c) {
  if (c.arrayOfCodec) {
    if (forceTextTypesSensitive4.includes(resolveDomains4(c.arrayOfCodec))) return listOfCodec(TYPES.text, {
      extensions: {
        listItemNonNull: c.extensions?.listItemNonNull
      }
    });
    return c;
  } else {
    if (forceTextTypesSensitive4.includes(resolveDomains4(c))) return TYPES.text;
    return c;
  }
}
function resolveSqlIdentifier15(identifier, c) {
  if (c.arrayOfCodec && forceTextTypesSensitive4.includes(resolveDomains4(c.arrayOfCodec))) return [sql`(${identifier})::text[]`, listOfCodec(TYPES.text, {
    extensions: {
      listItemNonNull: c.extensions?.listItemNonNull
    }
  })];else if (forceTextTypesSensitive4.includes(resolveDomains4(c))) return [sql`(${identifier})::text`, TYPES.text];else return [identifier, c];
}
const resolve52 = (i, v) => sql`${i} <> ${v}`;
const resolve53 = (i, v) => sql`${i} IS DISTINCT FROM ${v}`;
const resolve54 = (i, v) => sql`${i} IS NOT DISTINCT FROM ${v}`;
const resolve55 = (i, v) => sql`${i} = ANY(${v})`;
function resolveInputCodec23(c) {
  if (forceTextTypesSensitive4.includes(resolveDomains4(c))) return listOfCodec(TYPES.text, {
    extensions: {
      listItemNonNull: !0
    }
  });else return listOfCodec(c, {
    extensions: {
      listItemNonNull: !0
    }
  });
}
const resolve56 = (i, v) => sql`${i} <> ALL(${v})`;
const resolve57 = (i, v) => sql`${i} < ${v}`;
const resolve58 = (i, v) => sql`${i} <= ${v}`;
const resolve59 = (i, v) => sql`${i} > ${v}`;
const resolve60 = (i, v) => sql`${i} >= ${v}`;
const colSpec36 = {
  fieldName: "rowId",
  attributeName: "id",
  attribute: spec_verification.attributes.id
};
const colSpec37 = {
  fieldName: "identifier",
  attributeName: "identifier",
  attribute: spec_verification.attributes.identifier
};
const colSpec38 = {
  fieldName: "value",
  attributeName: "value",
  attribute: spec_verification.attributes.value
};
const colSpec39 = {
  fieldName: "expiresAt",
  attributeName: "expires_at",
  attribute: spec_verification.attributes.expires_at
};
const colSpec40 = {
  fieldName: "createdAt",
  attributeName: "createdAt",
  attribute: spec_verification.attributes.createdAt
};
const colSpec41 = {
  fieldName: "updatedAt",
  attributeName: "updatedAt",
  attribute: spec_verification.attributes.updatedAt
};
function assertAllowed20(value, mode) {
  if (mode === "object" && !true && isEmpty(value)) throw Object.assign(Error("Empty objects are forbidden in filter argument input."), {});
  if (mode === "list" && !true) {
    const arr = value;
    if (arr) {
      const l = arr.length;
      for (let i = 0; i < l; i++) if (isEmpty(arr[i])) throw Object.assign(Error("Empty objects are forbidden in filter argument input."), {});
    }
  }
  if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
}
const specFromArgs_Verification = args => {
  const $nodeId = args.getRaw(["input", "id"]);
  return specFromNodeId(nodeIdHandler_Verification, $nodeId);
};
const specFromArgs_Task = args => {
  const $nodeId = args.getRaw(["input", "id"]);
  return specFromNodeId(nodeIdHandler_Task, $nodeId);
};
const specFromArgs_User = args => {
  const $nodeId = args.getRaw(["input", "id"]);
  return specFromNodeId(nodeIdHandler_User, $nodeId);
};
const specFromArgs_Session = args => {
  const $nodeId = args.getRaw(["input", "id"]);
  return specFromNodeId(nodeIdHandler_Session, $nodeId);
};
const specFromArgs_Account = args => {
  const $nodeId = args.getRaw(["input", "id"]);
  return specFromNodeId(nodeIdHandler_Account, $nodeId);
};
const specFromArgs_Verification2 = args => {
  const $nodeId = args.getRaw(["input", "id"]);
  return specFromNodeId(nodeIdHandler_Verification, $nodeId);
};
const specFromArgs_Task2 = args => {
  const $nodeId = args.getRaw(["input", "id"]);
  return specFromNodeId(nodeIdHandler_Task, $nodeId);
};
const specFromArgs_User2 = args => {
  const $nodeId = args.getRaw(["input", "id"]);
  return specFromNodeId(nodeIdHandler_User, $nodeId);
};
const specFromArgs_Session2 = args => {
  const $nodeId = args.getRaw(["input", "id"]);
  return specFromNodeId(nodeIdHandler_Session, $nodeId);
};
const specFromArgs_Account2 = args => {
  const $nodeId = args.getRaw(["input", "id"]);
  return specFromNodeId(nodeIdHandler_Account, $nodeId);
};
const getPgSelectSingleFromMutationResult = (resource, pkAttributes, $mutation) => {
  const $result = $mutation.getStepForKey("result", !0);
  if (!$result) return null;
  if ($result instanceof PgDeleteSingleStep) return pgSelectFromRecord($result.resource, $result.record());else {
    const spec = pkAttributes.reduce((memo, attributeName) => {
      memo[attributeName] = $result.get(attributeName);
      return memo;
    }, Object.create(null));
    return resource.find(spec);
  }
};
const pgMutationPayloadEdge = (resource, pkAttributes, $mutation, fieldArgs) => {
  const $select = getPgSelectSingleFromMutationResult(resource, pkAttributes, $mutation);
  if (!$select) return constant(null);
  fieldArgs.apply($select, "orderBy");
  const $connection = connection($select);
  return new EdgeStep($connection, first($connection));
};
export const typeDefs = /* GraphQL */`"""The root query type which gives access points into the data universe."""
type Query implements Node {
  """
  Exposes the root query type nested one level down. This is helpful for Relay 1
  which can only query top level fields if they are in a particular form.
  """
  query: Query!

  """
  The root query type must be a \`Node\` to work well with Relay 1 mutations. This just resolves to \`query\`.
  """
  id: ID!

  """Fetches an object given its globally unique \`ID\`."""
  node(
    """The globally unique \`ID\`."""
    id: ID!
  ): Node

  """Get a single \`Verification\`."""
  verification(rowId: String!): Verification

  """Get a single \`Task\`."""
  task(rowId: UUID!): Task

  """Get a single \`User\`."""
  user(rowId: String!): User

  """Get a single \`User\`."""
  userByEmail(email: String!): User

  """Get a single \`Session\`."""
  session(rowId: String!): Session

  """Get a single \`Session\`."""
  sessionByToken(token: String!): Session

  """Get a single \`Account\`."""
  account(rowId: String!): Account

  """Reads a single \`Verification\` using its globally unique \`ID\`."""
  verificationById(
    """
    The globally unique \`ID\` to be used in selecting a single \`Verification\`.
    """
    id: ID!
  ): Verification

  """Reads a single \`Task\` using its globally unique \`ID\`."""
  taskById(
    """The globally unique \`ID\` to be used in selecting a single \`Task\`."""
    id: ID!
  ): Task

  """Reads a single \`User\` using its globally unique \`ID\`."""
  userById(
    """The globally unique \`ID\` to be used in selecting a single \`User\`."""
    id: ID!
  ): User

  """Reads a single \`Session\` using its globally unique \`ID\`."""
  sessionById(
    """The globally unique \`ID\` to be used in selecting a single \`Session\`."""
    id: ID!
  ): Session

  """Reads a single \`Account\` using its globally unique \`ID\`."""
  accountById(
    """The globally unique \`ID\` to be used in selecting a single \`Account\`."""
    id: ID!
  ): Account

  """Reads and enables pagination through a set of \`Verification\`."""
  verifications(
    """Only read the first \`n\` values of the set."""
    first: Int

    """Only read the last \`n\` values of the set."""
    last: Int

    """
    Skip the first \`n\` values from our \`after\` cursor, an alternative to cursor
    based pagination. May not be used with \`last\`.
    """
    offset: Int

    """Read all values in the set before (above) this cursor."""
    before: Cursor

    """Read all values in the set after (below) this cursor."""
    after: Cursor

    """
    A condition to be used in determining which values should be returned by the collection.
    """
    condition: VerificationCondition

    """
    A filter to be used in determining which values should be returned by the collection.
    """
    filter: VerificationFilter

    """The method to use when ordering \`Verification\`."""
    orderBy: [VerificationOrderBy!] = [PRIMARY_KEY_ASC]
  ): VerificationConnection

  """Reads and enables pagination through a set of \`Task\`."""
  tasks(
    """Only read the first \`n\` values of the set."""
    first: Int

    """Only read the last \`n\` values of the set."""
    last: Int

    """
    Skip the first \`n\` values from our \`after\` cursor, an alternative to cursor
    based pagination. May not be used with \`last\`.
    """
    offset: Int

    """Read all values in the set before (above) this cursor."""
    before: Cursor

    """Read all values in the set after (below) this cursor."""
    after: Cursor

    """
    A condition to be used in determining which values should be returned by the collection.
    """
    condition: TaskCondition

    """
    A filter to be used in determining which values should be returned by the collection.
    """
    filter: TaskFilter

    """The method to use when ordering \`Task\`."""
    orderBy: [TaskOrderBy!] = [PRIMARY_KEY_ASC]
  ): TaskConnection

  """Reads and enables pagination through a set of \`User\`."""
  users(
    """Only read the first \`n\` values of the set."""
    first: Int

    """Only read the last \`n\` values of the set."""
    last: Int

    """
    Skip the first \`n\` values from our \`after\` cursor, an alternative to cursor
    based pagination. May not be used with \`last\`.
    """
    offset: Int

    """Read all values in the set before (above) this cursor."""
    before: Cursor

    """Read all values in the set after (below) this cursor."""
    after: Cursor

    """
    A condition to be used in determining which values should be returned by the collection.
    """
    condition: UserCondition

    """
    A filter to be used in determining which values should be returned by the collection.
    """
    filter: UserFilter

    """The method to use when ordering \`User\`."""
    orderBy: [UserOrderBy!] = [PRIMARY_KEY_ASC]
  ): UserConnection

  """Reads and enables pagination through a set of \`Session\`."""
  sessions(
    """Only read the first \`n\` values of the set."""
    first: Int

    """Only read the last \`n\` values of the set."""
    last: Int

    """
    Skip the first \`n\` values from our \`after\` cursor, an alternative to cursor
    based pagination. May not be used with \`last\`.
    """
    offset: Int

    """Read all values in the set before (above) this cursor."""
    before: Cursor

    """Read all values in the set after (below) this cursor."""
    after: Cursor

    """
    A condition to be used in determining which values should be returned by the collection.
    """
    condition: SessionCondition

    """
    A filter to be used in determining which values should be returned by the collection.
    """
    filter: SessionFilter

    """The method to use when ordering \`Session\`."""
    orderBy: [SessionOrderBy!] = [PRIMARY_KEY_ASC]
  ): SessionConnection

  """Reads and enables pagination through a set of \`Account\`."""
  accounts(
    """Only read the first \`n\` values of the set."""
    first: Int

    """Only read the last \`n\` values of the set."""
    last: Int

    """
    Skip the first \`n\` values from our \`after\` cursor, an alternative to cursor
    based pagination. May not be used with \`last\`.
    """
    offset: Int

    """Read all values in the set before (above) this cursor."""
    before: Cursor

    """Read all values in the set after (below) this cursor."""
    after: Cursor

    """
    A condition to be used in determining which values should be returned by the collection.
    """
    condition: AccountCondition

    """
    A filter to be used in determining which values should be returned by the collection.
    """
    filter: AccountFilter

    """The method to use when ordering \`Account\`."""
    orderBy: [AccountOrderBy!] = [PRIMARY_KEY_ASC]
  ): AccountConnection
}

"""An object with a globally unique \`ID\`."""
interface Node {
  """
  A globally unique identifier. Can be used in various places throughout the system to identify this single value.
  """
  id: ID!
}

type Verification implements Node {
  """
  A globally unique identifier. Can be used in various places throughout the system to identify this single value.
  """
  id: ID!
  rowId: String!
  identifier: String!
  value: String!
  expiresAt: Datetime!
  createdAt: Datetime!
  updatedAt: Datetime!
}

"""
A point in time as described by the [ISO
8601](https://en.wikipedia.org/wiki/ISO_8601) and, if it has a timezone, [RFC
3339](https://datatracker.ietf.org/doc/html/rfc3339) standards. Input values
that do not conform to both ISO 8601 and RFC 3339 may be coerced, which may lead
to unexpected results.
"""
scalar Datetime

type Task implements Node {
  """
  A globally unique identifier. Can be used in various places throughout the system to identify this single value.
  """
  id: ID!
  rowId: UUID!
  userId: String!
  name: String!
  description: String!
  completed: Boolean!
  createdAt: Datetime!
  updatedAt: Datetime!

  """Reads a single \`User\` that is related to this \`Task\`."""
  user: User
}

"""
A universally unique identifier as defined by [RFC 4122](https://tools.ietf.org/html/rfc4122).
"""
scalar UUID

type User implements Node {
  """
  A globally unique identifier. Can be used in various places throughout the system to identify this single value.
  """
  id: ID!
  rowId: String!
  name: String!
  email: String!
  emailVerified: Boolean!
  image: String
  createdAt: Datetime!
  updatedAt: Datetime!

  """Reads and enables pagination through a set of \`Account\`."""
  accounts(
    """Only read the first \`n\` values of the set."""
    first: Int

    """Only read the last \`n\` values of the set."""
    last: Int

    """
    Skip the first \`n\` values from our \`after\` cursor, an alternative to cursor
    based pagination. May not be used with \`last\`.
    """
    offset: Int

    """Read all values in the set before (above) this cursor."""
    before: Cursor

    """Read all values in the set after (below) this cursor."""
    after: Cursor

    """
    A condition to be used in determining which values should be returned by the collection.
    """
    condition: AccountCondition

    """
    A filter to be used in determining which values should be returned by the collection.
    """
    filter: AccountFilter

    """The method to use when ordering \`Account\`."""
    orderBy: [AccountOrderBy!] = [PRIMARY_KEY_ASC]
  ): AccountConnection!

  """Reads and enables pagination through a set of \`Session\`."""
  sessions(
    """Only read the first \`n\` values of the set."""
    first: Int

    """Only read the last \`n\` values of the set."""
    last: Int

    """
    Skip the first \`n\` values from our \`after\` cursor, an alternative to cursor
    based pagination. May not be used with \`last\`.
    """
    offset: Int

    """Read all values in the set before (above) this cursor."""
    before: Cursor

    """Read all values in the set after (below) this cursor."""
    after: Cursor

    """
    A condition to be used in determining which values should be returned by the collection.
    """
    condition: SessionCondition

    """
    A filter to be used in determining which values should be returned by the collection.
    """
    filter: SessionFilter

    """The method to use when ordering \`Session\`."""
    orderBy: [SessionOrderBy!] = [PRIMARY_KEY_ASC]
  ): SessionConnection!

  """Reads and enables pagination through a set of \`Task\`."""
  tasks(
    """Only read the first \`n\` values of the set."""
    first: Int

    """Only read the last \`n\` values of the set."""
    last: Int

    """
    Skip the first \`n\` values from our \`after\` cursor, an alternative to cursor
    based pagination. May not be used with \`last\`.
    """
    offset: Int

    """Read all values in the set before (above) this cursor."""
    before: Cursor

    """Read all values in the set after (below) this cursor."""
    after: Cursor

    """
    A condition to be used in determining which values should be returned by the collection.
    """
    condition: TaskCondition

    """
    A filter to be used in determining which values should be returned by the collection.
    """
    filter: TaskFilter

    """The method to use when ordering \`Task\`."""
    orderBy: [TaskOrderBy!] = [PRIMARY_KEY_ASC]
  ): TaskConnection!
}

"""A connection to a list of \`Account\` values."""
type AccountConnection {
  """A list of \`Account\` objects."""
  nodes: [Account!]!

  """
  A list of edges which contains the \`Account\` and cursor to aid in pagination.
  """
  edges: [AccountEdge!]!

  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """The count of *all* \`Account\` you could get from the connection."""
  totalCount: Int!
}

type Account implements Node {
  """
  A globally unique identifier. Can be used in various places throughout the system to identify this single value.
  """
  id: ID!
  rowId: String!
  accountId: String!
  providerId: String!
  userId: String!
  accessToken: String
  refreshToken: String
  idToken: String
  accessTokenExpiresAt: Datetime
  refreshTokenExpiresAt: Datetime
  scope: String
  password: String
  createdAt: Datetime!
  updatedAt: Datetime!

  """Reads a single \`User\` that is related to this \`Account\`."""
  user: User
}

"""A \`Account\` edge in the connection."""
type AccountEdge {
  """A cursor for use in pagination."""
  cursor: Cursor

  """The \`Account\` at the end of the edge."""
  node: Account!
}

"""A location in a connection that can be used for resuming pagination."""
scalar Cursor

"""Information about pagination in a connection."""
type PageInfo {
  """When paginating forwards, are there more items?"""
  hasNextPage: Boolean!

  """When paginating backwards, are there more items?"""
  hasPreviousPage: Boolean!

  """When paginating backwards, the cursor to continue."""
  startCursor: Cursor

  """When paginating forwards, the cursor to continue."""
  endCursor: Cursor
}

"""
A condition to be used against \`Account\` object types. All fields are tested for equality and combined with a logical ‘and.’
"""
input AccountCondition {
  """Checks for equality with the object’s \`rowId\` field."""
  rowId: String

  """Checks for equality with the object’s \`accountId\` field."""
  accountId: String

  """Checks for equality with the object’s \`providerId\` field."""
  providerId: String

  """Checks for equality with the object’s \`userId\` field."""
  userId: String

  """Checks for equality with the object’s \`accessToken\` field."""
  accessToken: String

  """Checks for equality with the object’s \`refreshToken\` field."""
  refreshToken: String

  """Checks for equality with the object’s \`idToken\` field."""
  idToken: String

  """Checks for equality with the object’s \`accessTokenExpiresAt\` field."""
  accessTokenExpiresAt: Datetime

  """Checks for equality with the object’s \`refreshTokenExpiresAt\` field."""
  refreshTokenExpiresAt: Datetime

  """Checks for equality with the object’s \`scope\` field."""
  scope: String

  """Checks for equality with the object’s \`password\` field."""
  password: String

  """Checks for equality with the object’s \`createdAt\` field."""
  createdAt: Datetime

  """Checks for equality with the object’s \`updatedAt\` field."""
  updatedAt: Datetime
}

"""
A filter to be used against \`Account\` object types. All fields are combined with a logical ‘and.’
"""
input AccountFilter {
  """Filter by the object’s \`rowId\` field."""
  rowId: StringFilter

  """Filter by the object’s \`accountId\` field."""
  accountId: StringFilter

  """Filter by the object’s \`providerId\` field."""
  providerId: StringFilter

  """Filter by the object’s \`userId\` field."""
  userId: StringFilter

  """Filter by the object’s \`accessToken\` field."""
  accessToken: StringFilter

  """Filter by the object’s \`refreshToken\` field."""
  refreshToken: StringFilter

  """Filter by the object’s \`idToken\` field."""
  idToken: StringFilter

  """Filter by the object’s \`accessTokenExpiresAt\` field."""
  accessTokenExpiresAt: DatetimeFilter

  """Filter by the object’s \`refreshTokenExpiresAt\` field."""
  refreshTokenExpiresAt: DatetimeFilter

  """Filter by the object’s \`scope\` field."""
  scope: StringFilter

  """Filter by the object’s \`password\` field."""
  password: StringFilter

  """Filter by the object’s \`createdAt\` field."""
  createdAt: DatetimeFilter

  """Filter by the object’s \`updatedAt\` field."""
  updatedAt: DatetimeFilter

  """Filter by the object’s \`user\` relation."""
  user: UserFilter

  """Checks for all expressions in this list."""
  and: [AccountFilter!]

  """Checks for any expressions in this list."""
  or: [AccountFilter!]

  """Negates the expression."""
  not: AccountFilter
}

"""
A filter to be used against String fields. All fields are combined with a logical ‘and.’
"""
input StringFilter {
  """
  Is null (if \`true\` is specified) or is not null (if \`false\` is specified).
  """
  isNull: Boolean

  """Equal to the specified value."""
  equalTo: String

  """Not equal to the specified value."""
  notEqualTo: String

  """
  Not equal to the specified value, treating null like an ordinary value.
  """
  distinctFrom: String

  """Equal to the specified value, treating null like an ordinary value."""
  notDistinctFrom: String

  """Included in the specified list."""
  in: [String!]

  """Not included in the specified list."""
  notIn: [String!]

  """Less than the specified value."""
  lessThan: String

  """Less than or equal to the specified value."""
  lessThanOrEqualTo: String

  """Greater than the specified value."""
  greaterThan: String

  """Greater than or equal to the specified value."""
  greaterThanOrEqualTo: String

  """Contains the specified string (case-sensitive)."""
  includes: String

  """Does not contain the specified string (case-sensitive)."""
  notIncludes: String

  """Contains the specified string (case-insensitive)."""
  includesInsensitive: String

  """Does not contain the specified string (case-insensitive)."""
  notIncludesInsensitive: String

  """Starts with the specified string (case-sensitive)."""
  startsWith: String

  """Does not start with the specified string (case-sensitive)."""
  notStartsWith: String

  """Starts with the specified string (case-insensitive)."""
  startsWithInsensitive: String

  """Does not start with the specified string (case-insensitive)."""
  notStartsWithInsensitive: String

  """Ends with the specified string (case-sensitive)."""
  endsWith: String

  """Does not end with the specified string (case-sensitive)."""
  notEndsWith: String

  """Ends with the specified string (case-insensitive)."""
  endsWithInsensitive: String

  """Does not end with the specified string (case-insensitive)."""
  notEndsWithInsensitive: String

  """
  Matches the specified pattern (case-sensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters.
  """
  like: String

  """
  Does not match the specified pattern (case-sensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters.
  """
  notLike: String

  """
  Matches the specified pattern (case-insensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters.
  """
  likeInsensitive: String

  """
  Does not match the specified pattern (case-insensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters.
  """
  notLikeInsensitive: String

  """Equal to the specified value (case-insensitive)."""
  equalToInsensitive: String

  """Not equal to the specified value (case-insensitive)."""
  notEqualToInsensitive: String

  """
  Not equal to the specified value, treating null like an ordinary value (case-insensitive).
  """
  distinctFromInsensitive: String

  """
  Equal to the specified value, treating null like an ordinary value (case-insensitive).
  """
  notDistinctFromInsensitive: String

  """Included in the specified list (case-insensitive)."""
  inInsensitive: [String!]

  """Not included in the specified list (case-insensitive)."""
  notInInsensitive: [String!]

  """Less than the specified value (case-insensitive)."""
  lessThanInsensitive: String

  """Less than or equal to the specified value (case-insensitive)."""
  lessThanOrEqualToInsensitive: String

  """Greater than the specified value (case-insensitive)."""
  greaterThanInsensitive: String

  """Greater than or equal to the specified value (case-insensitive)."""
  greaterThanOrEqualToInsensitive: String
}

"""
A filter to be used against Datetime fields. All fields are combined with a logical ‘and.’
"""
input DatetimeFilter {
  """
  Is null (if \`true\` is specified) or is not null (if \`false\` is specified).
  """
  isNull: Boolean

  """Equal to the specified value."""
  equalTo: Datetime

  """Not equal to the specified value."""
  notEqualTo: Datetime

  """
  Not equal to the specified value, treating null like an ordinary value.
  """
  distinctFrom: Datetime

  """Equal to the specified value, treating null like an ordinary value."""
  notDistinctFrom: Datetime

  """Included in the specified list."""
  in: [Datetime!]

  """Not included in the specified list."""
  notIn: [Datetime!]

  """Less than the specified value."""
  lessThan: Datetime

  """Less than or equal to the specified value."""
  lessThanOrEqualTo: Datetime

  """Greater than the specified value."""
  greaterThan: Datetime

  """Greater than or equal to the specified value."""
  greaterThanOrEqualTo: Datetime
}

"""
A filter to be used against \`User\` object types. All fields are combined with a logical ‘and.’
"""
input UserFilter {
  """Filter by the object’s \`rowId\` field."""
  rowId: StringFilter

  """Filter by the object’s \`name\` field."""
  name: StringFilter

  """Filter by the object’s \`email\` field."""
  email: StringFilter

  """Filter by the object’s \`emailVerified\` field."""
  emailVerified: BooleanFilter

  """Filter by the object’s \`image\` field."""
  image: StringFilter

  """Filter by the object’s \`createdAt\` field."""
  createdAt: DatetimeFilter

  """Filter by the object’s \`updatedAt\` field."""
  updatedAt: DatetimeFilter

  """Filter by the object’s \`accounts\` relation."""
  accounts: UserToManyAccountFilter

  """Some related \`accounts\` exist."""
  accountsExist: Boolean

  """Filter by the object’s \`sessions\` relation."""
  sessions: UserToManySessionFilter

  """Some related \`sessions\` exist."""
  sessionsExist: Boolean

  """Filter by the object’s \`tasks\` relation."""
  tasks: UserToManyTaskFilter

  """Some related \`tasks\` exist."""
  tasksExist: Boolean

  """Checks for all expressions in this list."""
  and: [UserFilter!]

  """Checks for any expressions in this list."""
  or: [UserFilter!]

  """Negates the expression."""
  not: UserFilter
}

"""
A filter to be used against Boolean fields. All fields are combined with a logical ‘and.’
"""
input BooleanFilter {
  """
  Is null (if \`true\` is specified) or is not null (if \`false\` is specified).
  """
  isNull: Boolean

  """Equal to the specified value."""
  equalTo: Boolean

  """Not equal to the specified value."""
  notEqualTo: Boolean

  """
  Not equal to the specified value, treating null like an ordinary value.
  """
  distinctFrom: Boolean

  """Equal to the specified value, treating null like an ordinary value."""
  notDistinctFrom: Boolean

  """Included in the specified list."""
  in: [Boolean!]

  """Not included in the specified list."""
  notIn: [Boolean!]

  """Less than the specified value."""
  lessThan: Boolean

  """Less than or equal to the specified value."""
  lessThanOrEqualTo: Boolean

  """Greater than the specified value."""
  greaterThan: Boolean

  """Greater than or equal to the specified value."""
  greaterThanOrEqualTo: Boolean
}

"""
A filter to be used against many \`Account\` object types. All fields are combined with a logical ‘and.’
"""
input UserToManyAccountFilter {
  """
  Every related \`Account\` matches the filter criteria. All fields are combined with a logical ‘and.’
  """
  every: AccountFilter

  """
  Some related \`Account\` matches the filter criteria. All fields are combined with a logical ‘and.’
  """
  some: AccountFilter

  """
  No related \`Account\` matches the filter criteria. All fields are combined with a logical ‘and.’
  """
  none: AccountFilter
}

"""
A filter to be used against many \`Session\` object types. All fields are combined with a logical ‘and.’
"""
input UserToManySessionFilter {
  """
  Every related \`Session\` matches the filter criteria. All fields are combined with a logical ‘and.’
  """
  every: SessionFilter

  """
  Some related \`Session\` matches the filter criteria. All fields are combined with a logical ‘and.’
  """
  some: SessionFilter

  """
  No related \`Session\` matches the filter criteria. All fields are combined with a logical ‘and.’
  """
  none: SessionFilter
}

"""
A filter to be used against \`Session\` object types. All fields are combined with a logical ‘and.’
"""
input SessionFilter {
  """Filter by the object’s \`rowId\` field."""
  rowId: StringFilter

  """Filter by the object’s \`expiresAt\` field."""
  expiresAt: DatetimeFilter

  """Filter by the object’s \`token\` field."""
  token: StringFilter

  """Filter by the object’s \`createdAt\` field."""
  createdAt: DatetimeFilter

  """Filter by the object’s \`updatedAt\` field."""
  updatedAt: DatetimeFilter

  """Filter by the object’s \`ipAddress\` field."""
  ipAddress: StringFilter

  """Filter by the object’s \`userAgent\` field."""
  userAgent: StringFilter

  """Filter by the object’s \`userId\` field."""
  userId: StringFilter

  """Filter by the object’s \`user\` relation."""
  user: UserFilter

  """Checks for all expressions in this list."""
  and: [SessionFilter!]

  """Checks for any expressions in this list."""
  or: [SessionFilter!]

  """Negates the expression."""
  not: SessionFilter
}

"""
A filter to be used against many \`Task\` object types. All fields are combined with a logical ‘and.’
"""
input UserToManyTaskFilter {
  """
  Every related \`Task\` matches the filter criteria. All fields are combined with a logical ‘and.’
  """
  every: TaskFilter

  """
  Some related \`Task\` matches the filter criteria. All fields are combined with a logical ‘and.’
  """
  some: TaskFilter

  """
  No related \`Task\` matches the filter criteria. All fields are combined with a logical ‘and.’
  """
  none: TaskFilter
}

"""
A filter to be used against \`Task\` object types. All fields are combined with a logical ‘and.’
"""
input TaskFilter {
  """Filter by the object’s \`rowId\` field."""
  rowId: UUIDFilter

  """Filter by the object’s \`userId\` field."""
  userId: StringFilter

  """Filter by the object’s \`name\` field."""
  name: StringFilter

  """Filter by the object’s \`description\` field."""
  description: StringFilter

  """Filter by the object’s \`completed\` field."""
  completed: BooleanFilter

  """Filter by the object’s \`createdAt\` field."""
  createdAt: DatetimeFilter

  """Filter by the object’s \`updatedAt\` field."""
  updatedAt: DatetimeFilter

  """Filter by the object’s \`user\` relation."""
  user: UserFilter

  """Checks for all expressions in this list."""
  and: [TaskFilter!]

  """Checks for any expressions in this list."""
  or: [TaskFilter!]

  """Negates the expression."""
  not: TaskFilter
}

"""
A filter to be used against UUID fields. All fields are combined with a logical ‘and.’
"""
input UUIDFilter {
  """
  Is null (if \`true\` is specified) or is not null (if \`false\` is specified).
  """
  isNull: Boolean

  """Equal to the specified value."""
  equalTo: UUID

  """Not equal to the specified value."""
  notEqualTo: UUID

  """
  Not equal to the specified value, treating null like an ordinary value.
  """
  distinctFrom: UUID

  """Equal to the specified value, treating null like an ordinary value."""
  notDistinctFrom: UUID

  """Included in the specified list."""
  in: [UUID!]

  """Not included in the specified list."""
  notIn: [UUID!]

  """Less than the specified value."""
  lessThan: UUID

  """Less than or equal to the specified value."""
  lessThanOrEqualTo: UUID

  """Greater than the specified value."""
  greaterThan: UUID

  """Greater than or equal to the specified value."""
  greaterThanOrEqualTo: UUID
}

"""Methods to use when ordering \`Account\`."""
enum AccountOrderBy {
  NATURAL
  PRIMARY_KEY_ASC
  PRIMARY_KEY_DESC
  ROW_ID_ASC
  ROW_ID_DESC
  ACCOUNT_ID_ASC
  ACCOUNT_ID_DESC
  PROVIDER_ID_ASC
  PROVIDER_ID_DESC
  USER_ID_ASC
  USER_ID_DESC
  ACCESS_TOKEN_ASC
  ACCESS_TOKEN_DESC
  REFRESH_TOKEN_ASC
  REFRESH_TOKEN_DESC
  ID_TOKEN_ASC
  ID_TOKEN_DESC
  ACCESS_TOKEN_EXPIRES_AT_ASC
  ACCESS_TOKEN_EXPIRES_AT_DESC
  REFRESH_TOKEN_EXPIRES_AT_ASC
  REFRESH_TOKEN_EXPIRES_AT_DESC
  SCOPE_ASC
  SCOPE_DESC
  PASSWORD_ASC
  PASSWORD_DESC
  CREATED_AT_ASC
  CREATED_AT_DESC
  UPDATED_AT_ASC
  UPDATED_AT_DESC
}

"""A connection to a list of \`Session\` values."""
type SessionConnection {
  """A list of \`Session\` objects."""
  nodes: [Session!]!

  """
  A list of edges which contains the \`Session\` and cursor to aid in pagination.
  """
  edges: [SessionEdge!]!

  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """The count of *all* \`Session\` you could get from the connection."""
  totalCount: Int!
}

type Session implements Node {
  """
  A globally unique identifier. Can be used in various places throughout the system to identify this single value.
  """
  id: ID!
  rowId: String!
  expiresAt: Datetime!
  token: String!
  createdAt: Datetime!
  updatedAt: Datetime!
  ipAddress: String
  userAgent: String
  userId: String!

  """Reads a single \`User\` that is related to this \`Session\`."""
  user: User
}

"""A \`Session\` edge in the connection."""
type SessionEdge {
  """A cursor for use in pagination."""
  cursor: Cursor

  """The \`Session\` at the end of the edge."""
  node: Session!
}

"""
A condition to be used against \`Session\` object types. All fields are tested for equality and combined with a logical ‘and.’
"""
input SessionCondition {
  """Checks for equality with the object’s \`rowId\` field."""
  rowId: String

  """Checks for equality with the object’s \`expiresAt\` field."""
  expiresAt: Datetime

  """Checks for equality with the object’s \`token\` field."""
  token: String

  """Checks for equality with the object’s \`createdAt\` field."""
  createdAt: Datetime

  """Checks for equality with the object’s \`updatedAt\` field."""
  updatedAt: Datetime

  """Checks for equality with the object’s \`ipAddress\` field."""
  ipAddress: String

  """Checks for equality with the object’s \`userAgent\` field."""
  userAgent: String

  """Checks for equality with the object’s \`userId\` field."""
  userId: String
}

"""Methods to use when ordering \`Session\`."""
enum SessionOrderBy {
  NATURAL
  PRIMARY_KEY_ASC
  PRIMARY_KEY_DESC
  ROW_ID_ASC
  ROW_ID_DESC
  EXPIRES_AT_ASC
  EXPIRES_AT_DESC
  TOKEN_ASC
  TOKEN_DESC
  CREATED_AT_ASC
  CREATED_AT_DESC
  UPDATED_AT_ASC
  UPDATED_AT_DESC
  IP_ADDRESS_ASC
  IP_ADDRESS_DESC
  USER_AGENT_ASC
  USER_AGENT_DESC
  USER_ID_ASC
  USER_ID_DESC
}

"""A connection to a list of \`Task\` values."""
type TaskConnection {
  """A list of \`Task\` objects."""
  nodes: [Task!]!

  """
  A list of edges which contains the \`Task\` and cursor to aid in pagination.
  """
  edges: [TaskEdge!]!

  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """The count of *all* \`Task\` you could get from the connection."""
  totalCount: Int!
}

"""A \`Task\` edge in the connection."""
type TaskEdge {
  """A cursor for use in pagination."""
  cursor: Cursor

  """The \`Task\` at the end of the edge."""
  node: Task!
}

"""
A condition to be used against \`Task\` object types. All fields are tested for equality and combined with a logical ‘and.’
"""
input TaskCondition {
  """Checks for equality with the object’s \`rowId\` field."""
  rowId: UUID

  """Checks for equality with the object’s \`userId\` field."""
  userId: String

  """Checks for equality with the object’s \`name\` field."""
  name: String

  """Checks for equality with the object’s \`description\` field."""
  description: String

  """Checks for equality with the object’s \`completed\` field."""
  completed: Boolean

  """Checks for equality with the object’s \`createdAt\` field."""
  createdAt: Datetime

  """Checks for equality with the object’s \`updatedAt\` field."""
  updatedAt: Datetime
}

"""Methods to use when ordering \`Task\`."""
enum TaskOrderBy {
  NATURAL
  PRIMARY_KEY_ASC
  PRIMARY_KEY_DESC
  ROW_ID_ASC
  ROW_ID_DESC
  USER_ID_ASC
  USER_ID_DESC
  NAME_ASC
  NAME_DESC
  DESCRIPTION_ASC
  DESCRIPTION_DESC
  COMPLETED_ASC
  COMPLETED_DESC
  CREATED_AT_ASC
  CREATED_AT_DESC
  UPDATED_AT_ASC
  UPDATED_AT_DESC
}

"""A connection to a list of \`Verification\` values."""
type VerificationConnection {
  """A list of \`Verification\` objects."""
  nodes: [Verification!]!

  """
  A list of edges which contains the \`Verification\` and cursor to aid in pagination.
  """
  edges: [VerificationEdge!]!

  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """The count of *all* \`Verification\` you could get from the connection."""
  totalCount: Int!
}

"""A \`Verification\` edge in the connection."""
type VerificationEdge {
  """A cursor for use in pagination."""
  cursor: Cursor

  """The \`Verification\` at the end of the edge."""
  node: Verification!
}

"""
A condition to be used against \`Verification\` object types. All fields are
tested for equality and combined with a logical ‘and.’
"""
input VerificationCondition {
  """Checks for equality with the object’s \`rowId\` field."""
  rowId: String

  """Checks for equality with the object’s \`identifier\` field."""
  identifier: String

  """Checks for equality with the object’s \`value\` field."""
  value: String

  """Checks for equality with the object’s \`expiresAt\` field."""
  expiresAt: Datetime

  """Checks for equality with the object’s \`createdAt\` field."""
  createdAt: Datetime

  """Checks for equality with the object’s \`updatedAt\` field."""
  updatedAt: Datetime
}

"""
A filter to be used against \`Verification\` object types. All fields are combined with a logical ‘and.’
"""
input VerificationFilter {
  """Filter by the object’s \`rowId\` field."""
  rowId: StringFilter

  """Filter by the object’s \`identifier\` field."""
  identifier: StringFilter

  """Filter by the object’s \`value\` field."""
  value: StringFilter

  """Filter by the object’s \`expiresAt\` field."""
  expiresAt: DatetimeFilter

  """Filter by the object’s \`createdAt\` field."""
  createdAt: DatetimeFilter

  """Filter by the object’s \`updatedAt\` field."""
  updatedAt: DatetimeFilter

  """Checks for all expressions in this list."""
  and: [VerificationFilter!]

  """Checks for any expressions in this list."""
  or: [VerificationFilter!]

  """Negates the expression."""
  not: VerificationFilter
}

"""Methods to use when ordering \`Verification\`."""
enum VerificationOrderBy {
  NATURAL
  PRIMARY_KEY_ASC
  PRIMARY_KEY_DESC
  ROW_ID_ASC
  ROW_ID_DESC
  IDENTIFIER_ASC
  IDENTIFIER_DESC
  VALUE_ASC
  VALUE_DESC
  EXPIRES_AT_ASC
  EXPIRES_AT_DESC
  CREATED_AT_ASC
  CREATED_AT_DESC
  UPDATED_AT_ASC
  UPDATED_AT_DESC
}

"""A connection to a list of \`User\` values."""
type UserConnection {
  """A list of \`User\` objects."""
  nodes: [User!]!

  """
  A list of edges which contains the \`User\` and cursor to aid in pagination.
  """
  edges: [UserEdge!]!

  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """The count of *all* \`User\` you could get from the connection."""
  totalCount: Int!
}

"""A \`User\` edge in the connection."""
type UserEdge {
  """A cursor for use in pagination."""
  cursor: Cursor

  """The \`User\` at the end of the edge."""
  node: User!
}

"""
A condition to be used against \`User\` object types. All fields are tested for equality and combined with a logical ‘and.’
"""
input UserCondition {
  """Checks for equality with the object’s \`rowId\` field."""
  rowId: String

  """Checks for equality with the object’s \`name\` field."""
  name: String

  """Checks for equality with the object’s \`email\` field."""
  email: String

  """Checks for equality with the object’s \`emailVerified\` field."""
  emailVerified: Boolean

  """Checks for equality with the object’s \`image\` field."""
  image: String

  """Checks for equality with the object’s \`createdAt\` field."""
  createdAt: Datetime

  """Checks for equality with the object’s \`updatedAt\` field."""
  updatedAt: Datetime
}

"""Methods to use when ordering \`User\`."""
enum UserOrderBy {
  NATURAL
  PRIMARY_KEY_ASC
  PRIMARY_KEY_DESC
  ROW_ID_ASC
  ROW_ID_DESC
  NAME_ASC
  NAME_DESC
  EMAIL_ASC
  EMAIL_DESC
  EMAIL_VERIFIED_ASC
  EMAIL_VERIFIED_DESC
  IMAGE_ASC
  IMAGE_DESC
  CREATED_AT_ASC
  CREATED_AT_DESC
  UPDATED_AT_ASC
  UPDATED_AT_DESC
}

"""
The root mutation type which contains root level fields which mutate data.
"""
type Mutation {
  """Creates a single \`Verification\`."""
  createVerification(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: CreateVerificationInput!
  ): CreateVerificationPayload

  """Creates a single \`Task\`."""
  createTask(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: CreateTaskInput!
  ): CreateTaskPayload

  """Creates a single \`User\`."""
  createUser(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: CreateUserInput!
  ): CreateUserPayload

  """Creates a single \`Session\`."""
  createSession(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: CreateSessionInput!
  ): CreateSessionPayload

  """Creates a single \`Account\`."""
  createAccount(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: CreateAccountInput!
  ): CreateAccountPayload

  """
  Updates a single \`Verification\` using its globally unique id and a patch.
  """
  updateVerificationById(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: UpdateVerificationByIdInput!
  ): UpdateVerificationPayload

  """Updates a single \`Verification\` using a unique key and a patch."""
  updateVerification(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: UpdateVerificationInput!
  ): UpdateVerificationPayload

  """Updates a single \`Task\` using its globally unique id and a patch."""
  updateTaskById(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: UpdateTaskByIdInput!
  ): UpdateTaskPayload

  """Updates a single \`Task\` using a unique key and a patch."""
  updateTask(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: UpdateTaskInput!
  ): UpdateTaskPayload

  """Updates a single \`User\` using its globally unique id and a patch."""
  updateUserById(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: UpdateUserByIdInput!
  ): UpdateUserPayload

  """Updates a single \`User\` using a unique key and a patch."""
  updateUser(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: UpdateUserInput!
  ): UpdateUserPayload

  """Updates a single \`User\` using a unique key and a patch."""
  updateUserByEmail(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: UpdateUserByEmailInput!
  ): UpdateUserPayload

  """Updates a single \`Session\` using its globally unique id and a patch."""
  updateSessionById(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: UpdateSessionByIdInput!
  ): UpdateSessionPayload

  """Updates a single \`Session\` using a unique key and a patch."""
  updateSession(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: UpdateSessionInput!
  ): UpdateSessionPayload

  """Updates a single \`Session\` using a unique key and a patch."""
  updateSessionByToken(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: UpdateSessionByTokenInput!
  ): UpdateSessionPayload

  """Updates a single \`Account\` using its globally unique id and a patch."""
  updateAccountById(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: UpdateAccountByIdInput!
  ): UpdateAccountPayload

  """Updates a single \`Account\` using a unique key and a patch."""
  updateAccount(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: UpdateAccountInput!
  ): UpdateAccountPayload

  """Deletes a single \`Verification\` using its globally unique id."""
  deleteVerificationById(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: DeleteVerificationByIdInput!
  ): DeleteVerificationPayload

  """Deletes a single \`Verification\` using a unique key."""
  deleteVerification(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: DeleteVerificationInput!
  ): DeleteVerificationPayload

  """Deletes a single \`Task\` using its globally unique id."""
  deleteTaskById(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: DeleteTaskByIdInput!
  ): DeleteTaskPayload

  """Deletes a single \`Task\` using a unique key."""
  deleteTask(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: DeleteTaskInput!
  ): DeleteTaskPayload

  """Deletes a single \`User\` using its globally unique id."""
  deleteUserById(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: DeleteUserByIdInput!
  ): DeleteUserPayload

  """Deletes a single \`User\` using a unique key."""
  deleteUser(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: DeleteUserInput!
  ): DeleteUserPayload

  """Deletes a single \`User\` using a unique key."""
  deleteUserByEmail(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: DeleteUserByEmailInput!
  ): DeleteUserPayload

  """Deletes a single \`Session\` using its globally unique id."""
  deleteSessionById(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: DeleteSessionByIdInput!
  ): DeleteSessionPayload

  """Deletes a single \`Session\` using a unique key."""
  deleteSession(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: DeleteSessionInput!
  ): DeleteSessionPayload

  """Deletes a single \`Session\` using a unique key."""
  deleteSessionByToken(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: DeleteSessionByTokenInput!
  ): DeleteSessionPayload

  """Deletes a single \`Account\` using its globally unique id."""
  deleteAccountById(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: DeleteAccountByIdInput!
  ): DeleteAccountPayload

  """Deletes a single \`Account\` using a unique key."""
  deleteAccount(
    """
    The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
    """
    input: DeleteAccountInput!
  ): DeleteAccountPayload
}

"""The output of our create \`Verification\` mutation."""
type CreateVerificationPayload {
  """
  The exact same \`clientMutationId\` that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """The \`Verification\` that was created by this mutation."""
  verification: Verification

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query

  """An edge for our \`Verification\`. May be used by Relay 1."""
  verificationEdge(
    """The method to use when ordering \`Verification\`."""
    orderBy: [VerificationOrderBy!]! = [PRIMARY_KEY_ASC]
  ): VerificationEdge
}

"""All input for the create \`Verification\` mutation."""
input CreateVerificationInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """The \`Verification\` to be created by this mutation."""
  verification: VerificationInput!
}

"""An input for mutations affecting \`Verification\`"""
input VerificationInput {
  rowId: String!
  identifier: String!
  value: String!
  expiresAt: Datetime!
  createdAt: Datetime
  updatedAt: Datetime
}

"""The output of our create \`Task\` mutation."""
type CreateTaskPayload {
  """
  The exact same \`clientMutationId\` that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """The \`Task\` that was created by this mutation."""
  task: Task

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query

  """An edge for our \`Task\`. May be used by Relay 1."""
  taskEdge(
    """The method to use when ordering \`Task\`."""
    orderBy: [TaskOrderBy!]! = [PRIMARY_KEY_ASC]
  ): TaskEdge
}

"""All input for the create \`Task\` mutation."""
input CreateTaskInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """The \`Task\` to be created by this mutation."""
  task: TaskInput!
}

"""An input for mutations affecting \`Task\`"""
input TaskInput {
  rowId: UUID
  userId: String!
  name: String!
  description: String!
  completed: Boolean
  createdAt: Datetime
  updatedAt: Datetime
}

"""The output of our create \`User\` mutation."""
type CreateUserPayload {
  """
  The exact same \`clientMutationId\` that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """The \`User\` that was created by this mutation."""
  user: User

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query

  """An edge for our \`User\`. May be used by Relay 1."""
  userEdge(
    """The method to use when ordering \`User\`."""
    orderBy: [UserOrderBy!]! = [PRIMARY_KEY_ASC]
  ): UserEdge
}

"""All input for the create \`User\` mutation."""
input CreateUserInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """The \`User\` to be created by this mutation."""
  user: UserInput!
}

"""An input for mutations affecting \`User\`"""
input UserInput {
  rowId: String!
  name: String!
  email: String!
  emailVerified: Boolean
  image: String
  createdAt: Datetime
  updatedAt: Datetime
}

"""The output of our create \`Session\` mutation."""
type CreateSessionPayload {
  """
  The exact same \`clientMutationId\` that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """The \`Session\` that was created by this mutation."""
  session: Session

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query

  """An edge for our \`Session\`. May be used by Relay 1."""
  sessionEdge(
    """The method to use when ordering \`Session\`."""
    orderBy: [SessionOrderBy!]! = [PRIMARY_KEY_ASC]
  ): SessionEdge
}

"""All input for the create \`Session\` mutation."""
input CreateSessionInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """The \`Session\` to be created by this mutation."""
  session: SessionInput!
}

"""An input for mutations affecting \`Session\`"""
input SessionInput {
  rowId: String!
  expiresAt: Datetime!
  token: String!
  createdAt: Datetime
  updatedAt: Datetime
  ipAddress: String
  userAgent: String
  userId: String!
}

"""The output of our create \`Account\` mutation."""
type CreateAccountPayload {
  """
  The exact same \`clientMutationId\` that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """The \`Account\` that was created by this mutation."""
  account: Account

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query

  """An edge for our \`Account\`. May be used by Relay 1."""
  accountEdge(
    """The method to use when ordering \`Account\`."""
    orderBy: [AccountOrderBy!]! = [PRIMARY_KEY_ASC]
  ): AccountEdge
}

"""All input for the create \`Account\` mutation."""
input CreateAccountInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """The \`Account\` to be created by this mutation."""
  account: AccountInput!
}

"""An input for mutations affecting \`Account\`"""
input AccountInput {
  rowId: String!
  accountId: String!
  providerId: String!
  userId: String!
  accessToken: String
  refreshToken: String
  idToken: String
  accessTokenExpiresAt: Datetime
  refreshTokenExpiresAt: Datetime
  scope: String
  password: String
  createdAt: Datetime
  updatedAt: Datetime
}

"""The output of our update \`Verification\` mutation."""
type UpdateVerificationPayload {
  """
  The exact same \`clientMutationId\` that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """The \`Verification\` that was updated by this mutation."""
  verification: Verification

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query

  """An edge for our \`Verification\`. May be used by Relay 1."""
  verificationEdge(
    """The method to use when ordering \`Verification\`."""
    orderBy: [VerificationOrderBy!]! = [PRIMARY_KEY_ASC]
  ): VerificationEdge
}

"""All input for the \`updateVerificationById\` mutation."""
input UpdateVerificationByIdInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """
  The globally unique \`ID\` which will identify a single \`Verification\` to be updated.
  """
  id: ID!

  """
  An object where the defined keys will be set on the \`Verification\` being updated.
  """
  patch: VerificationPatch!
}

"""
Represents an update to a \`Verification\`. Fields that are set will be updated.
"""
input VerificationPatch {
  rowId: String
  identifier: String
  value: String
  expiresAt: Datetime
  createdAt: Datetime
  updatedAt: Datetime
}

"""All input for the \`updateVerification\` mutation."""
input UpdateVerificationInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String
  rowId: String!

  """
  An object where the defined keys will be set on the \`Verification\` being updated.
  """
  patch: VerificationPatch!
}

"""The output of our update \`Task\` mutation."""
type UpdateTaskPayload {
  """
  The exact same \`clientMutationId\` that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """The \`Task\` that was updated by this mutation."""
  task: Task

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query

  """An edge for our \`Task\`. May be used by Relay 1."""
  taskEdge(
    """The method to use when ordering \`Task\`."""
    orderBy: [TaskOrderBy!]! = [PRIMARY_KEY_ASC]
  ): TaskEdge
}

"""All input for the \`updateTaskById\` mutation."""
input UpdateTaskByIdInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """
  The globally unique \`ID\` which will identify a single \`Task\` to be updated.
  """
  id: ID!

  """
  An object where the defined keys will be set on the \`Task\` being updated.
  """
  patch: TaskPatch!
}

"""Represents an update to a \`Task\`. Fields that are set will be updated."""
input TaskPatch {
  rowId: UUID
  userId: String
  name: String
  description: String
  completed: Boolean
  createdAt: Datetime
  updatedAt: Datetime
}

"""All input for the \`updateTask\` mutation."""
input UpdateTaskInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String
  rowId: UUID!

  """
  An object where the defined keys will be set on the \`Task\` being updated.
  """
  patch: TaskPatch!
}

"""The output of our update \`User\` mutation."""
type UpdateUserPayload {
  """
  The exact same \`clientMutationId\` that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """The \`User\` that was updated by this mutation."""
  user: User

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query

  """An edge for our \`User\`. May be used by Relay 1."""
  userEdge(
    """The method to use when ordering \`User\`."""
    orderBy: [UserOrderBy!]! = [PRIMARY_KEY_ASC]
  ): UserEdge
}

"""All input for the \`updateUserById\` mutation."""
input UpdateUserByIdInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """
  The globally unique \`ID\` which will identify a single \`User\` to be updated.
  """
  id: ID!

  """
  An object where the defined keys will be set on the \`User\` being updated.
  """
  patch: UserPatch!
}

"""Represents an update to a \`User\`. Fields that are set will be updated."""
input UserPatch {
  rowId: String
  name: String
  email: String
  emailVerified: Boolean
  image: String
  createdAt: Datetime
  updatedAt: Datetime
}

"""All input for the \`updateUser\` mutation."""
input UpdateUserInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String
  rowId: String!

  """
  An object where the defined keys will be set on the \`User\` being updated.
  """
  patch: UserPatch!
}

"""All input for the \`updateUserByEmail\` mutation."""
input UpdateUserByEmailInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String
  email: String!

  """
  An object where the defined keys will be set on the \`User\` being updated.
  """
  patch: UserPatch!
}

"""The output of our update \`Session\` mutation."""
type UpdateSessionPayload {
  """
  The exact same \`clientMutationId\` that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """The \`Session\` that was updated by this mutation."""
  session: Session

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query

  """An edge for our \`Session\`. May be used by Relay 1."""
  sessionEdge(
    """The method to use when ordering \`Session\`."""
    orderBy: [SessionOrderBy!]! = [PRIMARY_KEY_ASC]
  ): SessionEdge
}

"""All input for the \`updateSessionById\` mutation."""
input UpdateSessionByIdInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """
  The globally unique \`ID\` which will identify a single \`Session\` to be updated.
  """
  id: ID!

  """
  An object where the defined keys will be set on the \`Session\` being updated.
  """
  patch: SessionPatch!
}

"""
Represents an update to a \`Session\`. Fields that are set will be updated.
"""
input SessionPatch {
  rowId: String
  expiresAt: Datetime
  token: String
  createdAt: Datetime
  updatedAt: Datetime
  ipAddress: String
  userAgent: String
  userId: String
}

"""All input for the \`updateSession\` mutation."""
input UpdateSessionInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String
  rowId: String!

  """
  An object where the defined keys will be set on the \`Session\` being updated.
  """
  patch: SessionPatch!
}

"""All input for the \`updateSessionByToken\` mutation."""
input UpdateSessionByTokenInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String
  token: String!

  """
  An object where the defined keys will be set on the \`Session\` being updated.
  """
  patch: SessionPatch!
}

"""The output of our update \`Account\` mutation."""
type UpdateAccountPayload {
  """
  The exact same \`clientMutationId\` that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """The \`Account\` that was updated by this mutation."""
  account: Account

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query

  """An edge for our \`Account\`. May be used by Relay 1."""
  accountEdge(
    """The method to use when ordering \`Account\`."""
    orderBy: [AccountOrderBy!]! = [PRIMARY_KEY_ASC]
  ): AccountEdge
}

"""All input for the \`updateAccountById\` mutation."""
input UpdateAccountByIdInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """
  The globally unique \`ID\` which will identify a single \`Account\` to be updated.
  """
  id: ID!

  """
  An object where the defined keys will be set on the \`Account\` being updated.
  """
  patch: AccountPatch!
}

"""
Represents an update to a \`Account\`. Fields that are set will be updated.
"""
input AccountPatch {
  rowId: String
  accountId: String
  providerId: String
  userId: String
  accessToken: String
  refreshToken: String
  idToken: String
  accessTokenExpiresAt: Datetime
  refreshTokenExpiresAt: Datetime
  scope: String
  password: String
  createdAt: Datetime
  updatedAt: Datetime
}

"""All input for the \`updateAccount\` mutation."""
input UpdateAccountInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String
  rowId: String!

  """
  An object where the defined keys will be set on the \`Account\` being updated.
  """
  patch: AccountPatch!
}

"""The output of our delete \`Verification\` mutation."""
type DeleteVerificationPayload {
  """
  The exact same \`clientMutationId\` that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """The \`Verification\` that was deleted by this mutation."""
  verification: Verification
  deletedVerificationId: ID

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query

  """An edge for our \`Verification\`. May be used by Relay 1."""
  verificationEdge(
    """The method to use when ordering \`Verification\`."""
    orderBy: [VerificationOrderBy!]! = [PRIMARY_KEY_ASC]
  ): VerificationEdge
}

"""All input for the \`deleteVerificationById\` mutation."""
input DeleteVerificationByIdInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """
  The globally unique \`ID\` which will identify a single \`Verification\` to be deleted.
  """
  id: ID!
}

"""All input for the \`deleteVerification\` mutation."""
input DeleteVerificationInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String
  rowId: String!
}

"""The output of our delete \`Task\` mutation."""
type DeleteTaskPayload {
  """
  The exact same \`clientMutationId\` that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """The \`Task\` that was deleted by this mutation."""
  task: Task
  deletedTaskId: ID

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query

  """An edge for our \`Task\`. May be used by Relay 1."""
  taskEdge(
    """The method to use when ordering \`Task\`."""
    orderBy: [TaskOrderBy!]! = [PRIMARY_KEY_ASC]
  ): TaskEdge
}

"""All input for the \`deleteTaskById\` mutation."""
input DeleteTaskByIdInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """
  The globally unique \`ID\` which will identify a single \`Task\` to be deleted.
  """
  id: ID!
}

"""All input for the \`deleteTask\` mutation."""
input DeleteTaskInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String
  rowId: UUID!
}

"""The output of our delete \`User\` mutation."""
type DeleteUserPayload {
  """
  The exact same \`clientMutationId\` that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """The \`User\` that was deleted by this mutation."""
  user: User
  deletedUserId: ID

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query

  """An edge for our \`User\`. May be used by Relay 1."""
  userEdge(
    """The method to use when ordering \`User\`."""
    orderBy: [UserOrderBy!]! = [PRIMARY_KEY_ASC]
  ): UserEdge
}

"""All input for the \`deleteUserById\` mutation."""
input DeleteUserByIdInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """
  The globally unique \`ID\` which will identify a single \`User\` to be deleted.
  """
  id: ID!
}

"""All input for the \`deleteUser\` mutation."""
input DeleteUserInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String
  rowId: String!
}

"""All input for the \`deleteUserByEmail\` mutation."""
input DeleteUserByEmailInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String
  email: String!
}

"""The output of our delete \`Session\` mutation."""
type DeleteSessionPayload {
  """
  The exact same \`clientMutationId\` that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """The \`Session\` that was deleted by this mutation."""
  session: Session
  deletedSessionId: ID

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query

  """An edge for our \`Session\`. May be used by Relay 1."""
  sessionEdge(
    """The method to use when ordering \`Session\`."""
    orderBy: [SessionOrderBy!]! = [PRIMARY_KEY_ASC]
  ): SessionEdge
}

"""All input for the \`deleteSessionById\` mutation."""
input DeleteSessionByIdInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """
  The globally unique \`ID\` which will identify a single \`Session\` to be deleted.
  """
  id: ID!
}

"""All input for the \`deleteSession\` mutation."""
input DeleteSessionInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String
  rowId: String!
}

"""All input for the \`deleteSessionByToken\` mutation."""
input DeleteSessionByTokenInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String
  token: String!
}

"""The output of our delete \`Account\` mutation."""
type DeleteAccountPayload {
  """
  The exact same \`clientMutationId\` that was provided in the mutation input,
  unchanged and unused. May be used by a client to track mutations.
  """
  clientMutationId: String

  """The \`Account\` that was deleted by this mutation."""
  account: Account
  deletedAccountId: ID

  """
  Our root query field type. Allows us to run any query from our mutation payload.
  """
  query: Query

  """An edge for our \`Account\`. May be used by Relay 1."""
  accountEdge(
    """The method to use when ordering \`Account\`."""
    orderBy: [AccountOrderBy!]! = [PRIMARY_KEY_ASC]
  ): AccountEdge
}

"""All input for the \`deleteAccountById\` mutation."""
input DeleteAccountByIdInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String

  """
  The globally unique \`ID\` which will identify a single \`Account\` to be deleted.
  """
  id: ID!
}

"""All input for the \`deleteAccount\` mutation."""
input DeleteAccountInput {
  """
  An arbitrary string value with no semantic meaning. Will be included in the
  payload verbatim. May be used to track mutations by the client.
  """
  clientMutationId: String
  rowId: String!
}`;
export const objects = {
  Query: {
    assertStep() {
      return !0;
    },
    plans: {
      account(_$root, {
        $rowId
      }) {
        return resource_accountPgResource.get({
          id: $rowId
        });
      },
      accountById(_$parent, args) {
        const $nodeId = args.getRaw("id");
        return nodeFetcher_Account($nodeId);
      },
      accounts: {
        plan() {
          return connection(resource_accountPgResource.find());
        },
        args: {
          first(_, $connection, arg) {
            $connection.setFirst(arg.getRaw());
          },
          last(_, $connection, val) {
            $connection.setLast(val.getRaw());
          },
          offset(_, $connection, val) {
            $connection.setOffset(val.getRaw());
          },
          before(_, $connection, val) {
            $connection.setBefore(val.getRaw());
          },
          after(_, $connection, val) {
            $connection.setAfter(val.getRaw());
          },
          condition(_condition, $connection, arg) {
            const $select = $connection.getSubplan();
            arg.apply($select, qbWhereBuilder);
          },
          filter(_, $connection, fieldArg) {
            const $pgSelect = $connection.getSubplan();
            fieldArg.apply($pgSelect, (queryBuilder, value) => {
              assertAllowed5(value, "object");
              if (value == null) return;
              const condition = new PgCondition(queryBuilder);
              return condition;
            });
          },
          orderBy(parent, $connection, value) {
            const $select = $connection.getSubplan();
            value.apply($select);
          }
        }
      },
      id($parent) {
        const specifier = nodeIdHandler_Query.plan($parent);
        return lambda(specifier, nodeIdCodecs[nodeIdHandler_Query.codec.name].encode);
      },
      node(_$root, fieldArgs) {
        return fieldArgs.getRaw("id");
      },
      query() {
        return rootValue();
      },
      session(_$root, {
        $rowId
      }) {
        return resource_sessionPgResource.get({
          id: $rowId
        });
      },
      sessionById(_$parent, args) {
        const $nodeId = args.getRaw("id");
        return nodeFetcher_Session($nodeId);
      },
      sessionByToken(_$root, {
        $token
      }) {
        return resource_sessionPgResource.get({
          token: $token
        });
      },
      sessions: {
        plan() {
          return connection(resource_sessionPgResource.find());
        },
        args: {
          first(_, $connection, arg) {
            $connection.setFirst(arg.getRaw());
          },
          last(_, $connection, val) {
            $connection.setLast(val.getRaw());
          },
          offset(_, $connection, val) {
            $connection.setOffset(val.getRaw());
          },
          before(_, $connection, val) {
            $connection.setBefore(val.getRaw());
          },
          after(_, $connection, val) {
            $connection.setAfter(val.getRaw());
          },
          condition(_condition, $connection, arg) {
            const $select = $connection.getSubplan();
            arg.apply($select, qbWhereBuilder);
          },
          filter(_, $connection, fieldArg) {
            const $pgSelect = $connection.getSubplan();
            fieldArg.apply($pgSelect, (queryBuilder, value) => {
              assertAllowed4(value, "object");
              if (value == null) return;
              const condition = new PgCondition(queryBuilder);
              return condition;
            });
          },
          orderBy(parent, $connection, value) {
            const $select = $connection.getSubplan();
            value.apply($select);
          }
        }
      },
      task(_$root, {
        $rowId
      }) {
        return resource_tasksPgResource.get({
          id: $rowId
        });
      },
      taskById(_$parent, args) {
        const $nodeId = args.getRaw("id");
        return nodeFetcher_Task($nodeId);
      },
      tasks: {
        plan() {
          return connection(resource_tasksPgResource.find());
        },
        args: {
          first(_, $connection, arg) {
            $connection.setFirst(arg.getRaw());
          },
          last(_, $connection, val) {
            $connection.setLast(val.getRaw());
          },
          offset(_, $connection, val) {
            $connection.setOffset(val.getRaw());
          },
          before(_, $connection, val) {
            $connection.setBefore(val.getRaw());
          },
          after(_, $connection, val) {
            $connection.setAfter(val.getRaw());
          },
          condition(_condition, $connection, arg) {
            const $select = $connection.getSubplan();
            arg.apply($select, qbWhereBuilder);
          },
          filter(_, $connection, fieldArg) {
            const $pgSelect = $connection.getSubplan();
            fieldArg.apply($pgSelect, (queryBuilder, value) => {
              assertAllowed2(value, "object");
              if (value == null) return;
              const condition = new PgCondition(queryBuilder);
              return condition;
            });
          },
          orderBy(parent, $connection, value) {
            const $select = $connection.getSubplan();
            value.apply($select);
          }
        }
      },
      user(_$root, {
        $rowId
      }) {
        return resource_userPgResource.get({
          id: $rowId
        });
      },
      userByEmail(_$root, {
        $email
      }) {
        return resource_userPgResource.get({
          email: $email
        });
      },
      userById(_$parent, args) {
        const $nodeId = args.getRaw("id");
        return nodeFetcher_User($nodeId);
      },
      users: {
        plan() {
          return connection(resource_userPgResource.find());
        },
        args: {
          first(_, $connection, arg) {
            $connection.setFirst(arg.getRaw());
          },
          last(_, $connection, val) {
            $connection.setLast(val.getRaw());
          },
          offset(_, $connection, val) {
            $connection.setOffset(val.getRaw());
          },
          before(_, $connection, val) {
            $connection.setBefore(val.getRaw());
          },
          after(_, $connection, val) {
            $connection.setAfter(val.getRaw());
          },
          condition(_condition, $connection, arg) {
            const $select = $connection.getSubplan();
            arg.apply($select, qbWhereBuilder);
          },
          filter(_, $connection, fieldArg) {
            const $pgSelect = $connection.getSubplan();
            fieldArg.apply($pgSelect, (queryBuilder, value) => {
              assertAllowed3(value, "object");
              if (value == null) return;
              const condition = new PgCondition(queryBuilder);
              return condition;
            });
          },
          orderBy(parent, $connection, value) {
            const $select = $connection.getSubplan();
            value.apply($select);
          }
        }
      },
      verification(_$root, {
        $rowId
      }) {
        return resource_verificationPgResource.get({
          id: $rowId
        });
      },
      verificationById(_$parent, args) {
        const $nodeId = args.getRaw("id");
        return nodeFetcher_Verification($nodeId);
      },
      verifications: {
        plan() {
          return connection(resource_verificationPgResource.find());
        },
        args: {
          first(_, $connection, arg) {
            $connection.setFirst(arg.getRaw());
          },
          last(_, $connection, val) {
            $connection.setLast(val.getRaw());
          },
          offset(_, $connection, val) {
            $connection.setOffset(val.getRaw());
          },
          before(_, $connection, val) {
            $connection.setBefore(val.getRaw());
          },
          after(_, $connection, val) {
            $connection.setAfter(val.getRaw());
          },
          condition(_condition, $connection, arg) {
            const $select = $connection.getSubplan();
            arg.apply($select, qbWhereBuilder);
          },
          filter(_, $connection, fieldArg) {
            const $pgSelect = $connection.getSubplan();
            fieldArg.apply($pgSelect, (queryBuilder, value) => {
              assertAllowed(value, "object");
              if (value == null) return;
              const condition = new PgCondition(queryBuilder);
              return condition;
            });
          },
          orderBy(parent, $connection, value) {
            const $select = $connection.getSubplan();
            value.apply($select);
          }
        }
      }
    }
  },
  Mutation: {
    assertStep: __ValueStep,
    plans: {
      createAccount: {
        plan(_, args) {
          const $insert = pgInsertSingle(resource_accountPgResource, Object.create(null));
          args.apply($insert);
          return object({
            result: $insert
          });
        },
        args: {
          input(_, $object) {
            return $object;
          }
        }
      },
      createSession: {
        plan(_, args) {
          const $insert = pgInsertSingle(resource_sessionPgResource, Object.create(null));
          args.apply($insert);
          return object({
            result: $insert
          });
        },
        args: {
          input(_, $object) {
            return $object;
          }
        }
      },
      createTask: {
        plan(_, args) {
          const $insert = pgInsertSingle(resource_tasksPgResource, Object.create(null));
          args.apply($insert);
          return object({
            result: $insert
          });
        },
        args: {
          input(_, $object) {
            return $object;
          }
        }
      },
      createUser: {
        plan(_, args) {
          const $insert = pgInsertSingle(resource_userPgResource, Object.create(null));
          args.apply($insert);
          return object({
            result: $insert
          });
        },
        args: {
          input(_, $object) {
            return $object;
          }
        }
      },
      createVerification: {
        plan(_, args) {
          const $insert = pgInsertSingle(resource_verificationPgResource, Object.create(null));
          args.apply($insert);
          return object({
            result: $insert
          });
        },
        args: {
          input(_, $object) {
            return $object;
          }
        }
      },
      deleteAccount: {
        plan(_$root, args) {
          const $delete = pgDeleteSingle(resource_accountPgResource, {
            id: args.getRaw(['input', "rowId"])
          });
          args.apply($delete);
          return object({
            result: $delete
          });
        },
        args: {
          input(_, $object) {
            return $object;
          }
        }
      },
      deleteAccountById: {
        plan(_$root, args) {
          const $delete = pgDeleteSingle(resource_accountPgResource, specFromArgs_Account2(args));
          args.apply($delete);
          return object({
            result: $delete
          });
        },
        args: {
          input(_, $object) {
            return $object;
          }
        }
      },
      deleteSession: {
        plan(_$root, args) {
          const $delete = pgDeleteSingle(resource_sessionPgResource, {
            id: args.getRaw(['input', "rowId"])
          });
          args.apply($delete);
          return object({
            result: $delete
          });
        },
        args: {
          input(_, $object) {
            return $object;
          }
        }
      },
      deleteSessionById: {
        plan(_$root, args) {
          const $delete = pgDeleteSingle(resource_sessionPgResource, specFromArgs_Session2(args));
          args.apply($delete);
          return object({
            result: $delete
          });
        },
        args: {
          input(_, $object) {
            return $object;
          }
        }
      },
      deleteSessionByToken: {
        plan(_$root, args) {
          const $delete = pgDeleteSingle(resource_sessionPgResource, {
            token: args.getRaw(['input', "token"])
          });
          args.apply($delete);
          return object({
            result: $delete
          });
        },
        args: {
          input(_, $object) {
            return $object;
          }
        }
      },
      deleteTask: {
        plan(_$root, args) {
          const $delete = pgDeleteSingle(resource_tasksPgResource, {
            id: args.getRaw(['input', "rowId"])
          });
          args.apply($delete);
          return object({
            result: $delete
          });
        },
        args: {
          input(_, $object) {
            return $object;
          }
        }
      },
      deleteTaskById: {
        plan(_$root, args) {
          const $delete = pgDeleteSingle(resource_tasksPgResource, specFromArgs_Task2(args));
          args.apply($delete);
          return object({
            result: $delete
          });
        },
        args: {
          input(_, $object) {
            return $object;
          }
        }
      },
      deleteUser: {
        plan(_$root, args) {
          const $delete = pgDeleteSingle(resource_userPgResource, {
            id: args.getRaw(['input', "rowId"])
          });
          args.apply($delete);
          return object({
            result: $delete
          });
        },
        args: {
          input(_, $object) {
            return $object;
          }
        }
      },
      deleteUserByEmail: {
        plan(_$root, args) {
          const $delete = pgDeleteSingle(resource_userPgResource, {
            email: args.getRaw(['input', "email"])
          });
          args.apply($delete);
          return object({
            result: $delete
          });
        },
        args: {
          input(_, $object) {
            return $object;
          }
        }
      },
      deleteUserById: {
        plan(_$root, args) {
          const $delete = pgDeleteSingle(resource_userPgResource, specFromArgs_User2(args));
          args.apply($delete);
          return object({
            result: $delete
          });
        },
        args: {
          input(_, $object) {
            return $object;
          }
        }
      },
      deleteVerification: {
        plan(_$root, args) {
          const $delete = pgDeleteSingle(resource_verificationPgResource, {
            id: args.getRaw(['input', "rowId"])
          });
          args.apply($delete);
          return object({
            result: $delete
          });
        },
        args: {
          input(_, $object) {
            return $object;
          }
        }
      },
      deleteVerificationById: {
        plan(_$root, args) {
          const $delete = pgDeleteSingle(resource_verificationPgResource, specFromArgs_Verification2(args));
          args.apply($delete);
          return object({
            result: $delete
          });
        },
        args: {
          input(_, $object) {
            return $object;
          }
        }
      },
      updateAccount: {
        plan(_$root, args) {
          const $update = pgUpdateSingle(resource_accountPgResource, {
            id: args.getRaw(['input', "rowId"])
          });
          args.apply($update);
          return object({
            result: $update
          });
        },
        args: {
          input(_, $object) {
            return $object;
          }
        }
      },
      updateAccountById: {
        plan(_$root, args) {
          const $update = pgUpdateSingle(resource_accountPgResource, specFromArgs_Account(args));
          args.apply($update);
          return object({
            result: $update
          });
        },
        args: {
          input(_, $object) {
            return $object;
          }
        }
      },
      updateSession: {
        plan(_$root, args) {
          const $update = pgUpdateSingle(resource_sessionPgResource, {
            id: args.getRaw(['input', "rowId"])
          });
          args.apply($update);
          return object({
            result: $update
          });
        },
        args: {
          input(_, $object) {
            return $object;
          }
        }
      },
      updateSessionById: {
        plan(_$root, args) {
          const $update = pgUpdateSingle(resource_sessionPgResource, specFromArgs_Session(args));
          args.apply($update);
          return object({
            result: $update
          });
        },
        args: {
          input(_, $object) {
            return $object;
          }
        }
      },
      updateSessionByToken: {
        plan(_$root, args) {
          const $update = pgUpdateSingle(resource_sessionPgResource, {
            token: args.getRaw(['input', "token"])
          });
          args.apply($update);
          return object({
            result: $update
          });
        },
        args: {
          input(_, $object) {
            return $object;
          }
        }
      },
      updateTask: {
        plan(_$root, args) {
          const $update = pgUpdateSingle(resource_tasksPgResource, {
            id: args.getRaw(['input', "rowId"])
          });
          args.apply($update);
          return object({
            result: $update
          });
        },
        args: {
          input(_, $object) {
            return $object;
          }
        }
      },
      updateTaskById: {
        plan(_$root, args) {
          const $update = pgUpdateSingle(resource_tasksPgResource, specFromArgs_Task(args));
          args.apply($update);
          return object({
            result: $update
          });
        },
        args: {
          input(_, $object) {
            return $object;
          }
        }
      },
      updateUser: {
        plan(_$root, args) {
          const $update = pgUpdateSingle(resource_userPgResource, {
            id: args.getRaw(['input', "rowId"])
          });
          args.apply($update);
          return object({
            result: $update
          });
        },
        args: {
          input(_, $object) {
            return $object;
          }
        }
      },
      updateUserByEmail: {
        plan(_$root, args) {
          const $update = pgUpdateSingle(resource_userPgResource, {
            email: args.getRaw(['input', "email"])
          });
          args.apply($update);
          return object({
            result: $update
          });
        },
        args: {
          input(_, $object) {
            return $object;
          }
        }
      },
      updateUserById: {
        plan(_$root, args) {
          const $update = pgUpdateSingle(resource_userPgResource, specFromArgs_User(args));
          args.apply($update);
          return object({
            result: $update
          });
        },
        args: {
          input(_, $object) {
            return $object;
          }
        }
      },
      updateVerification: {
        plan(_$root, args) {
          const $update = pgUpdateSingle(resource_verificationPgResource, {
            id: args.getRaw(['input', "rowId"])
          });
          args.apply($update);
          return object({
            result: $update
          });
        },
        args: {
          input(_, $object) {
            return $object;
          }
        }
      },
      updateVerificationById: {
        plan(_$root, args) {
          const $update = pgUpdateSingle(resource_verificationPgResource, specFromArgs_Verification(args));
          args.apply($update);
          return object({
            result: $update
          });
        },
        args: {
          input(_, $object) {
            return $object;
          }
        }
      }
    }
  },
  Account: {
    assertStep: assertPgClassSingleStep,
    plans: {
      accessToken($record) {
        return $record.get("access_token");
      },
      accessTokenExpiresAt($record) {
        return $record.get("access_token_expires_at");
      },
      accountId($record) {
        return $record.get("account_id");
      },
      id($parent) {
        const specifier = nodeIdHandler_Account.plan($parent);
        return lambda(specifier, nodeIdCodecs[nodeIdHandler_Account.codec.name].encode);
      },
      idToken($record) {
        return $record.get("id_token");
      },
      providerId($record) {
        return $record.get("provider_id");
      },
      refreshToken($record) {
        return $record.get("refresh_token");
      },
      refreshTokenExpiresAt($record) {
        return $record.get("refresh_token_expires_at");
      },
      rowId($record) {
        return $record.get("id");
      },
      user($record) {
        return resource_userPgResource.get({
          id: $record.get("user_id")
        });
      },
      userId($record) {
        return $record.get("user_id");
      }
    },
    planType($specifier) {
      const spec = Object.create(null);
      for (const pkCol of accountUniques[0].attributes) spec[pkCol] = get2($specifier, pkCol);
      return resource_accountPgResource.get(spec);
    }
  },
  AccountConnection: {
    assertStep: ConnectionStep,
    plans: {
      totalCount($connection) {
        return $connection.cloneSubplanWithoutPagination("aggregate").singleAsRecord().select(sql`count(*)`, TYPES.bigint, !1);
      }
    }
  },
  CreateAccountPayload: {
    assertStep: assertExecutableStep,
    plans: {
      account($object) {
        return $object.get("result");
      },
      accountEdge($mutation, fieldArgs) {
        return pgMutationPayloadEdge(resource_accountPgResource, accountUniques[0].attributes, $mutation, fieldArgs);
      },
      clientMutationId($mutation) {
        return $mutation.getStepForKey("result").getMeta("clientMutationId");
      },
      query() {
        return rootValue();
      }
    }
  },
  CreateSessionPayload: {
    assertStep: assertExecutableStep,
    plans: {
      clientMutationId($mutation) {
        return $mutation.getStepForKey("result").getMeta("clientMutationId");
      },
      query() {
        return rootValue();
      },
      session($object) {
        return $object.get("result");
      },
      sessionEdge($mutation, fieldArgs) {
        return pgMutationPayloadEdge(resource_sessionPgResource, sessionUniques[0].attributes, $mutation, fieldArgs);
      }
    }
  },
  CreateTaskPayload: {
    assertStep: assertExecutableStep,
    plans: {
      clientMutationId($mutation) {
        return $mutation.getStepForKey("result").getMeta("clientMutationId");
      },
      query() {
        return rootValue();
      },
      task($object) {
        return $object.get("result");
      },
      taskEdge($mutation, fieldArgs) {
        return pgMutationPayloadEdge(resource_tasksPgResource, tasksUniques[0].attributes, $mutation, fieldArgs);
      }
    }
  },
  CreateUserPayload: {
    assertStep: assertExecutableStep,
    plans: {
      clientMutationId($mutation) {
        return $mutation.getStepForKey("result").getMeta("clientMutationId");
      },
      query() {
        return rootValue();
      },
      user($object) {
        return $object.get("result");
      },
      userEdge($mutation, fieldArgs) {
        return pgMutationPayloadEdge(resource_userPgResource, userUniques[0].attributes, $mutation, fieldArgs);
      }
    }
  },
  CreateVerificationPayload: {
    assertStep: assertExecutableStep,
    plans: {
      clientMutationId($mutation) {
        return $mutation.getStepForKey("result").getMeta("clientMutationId");
      },
      query() {
        return rootValue();
      },
      verification($object) {
        return $object.get("result");
      },
      verificationEdge($mutation, fieldArgs) {
        return pgMutationPayloadEdge(resource_verificationPgResource, verificationUniques[0].attributes, $mutation, fieldArgs);
      }
    }
  },
  DeleteAccountPayload: {
    assertStep: ObjectStep,
    plans: {
      account($object) {
        return $object.get("result");
      },
      accountEdge($mutation, fieldArgs) {
        return pgMutationPayloadEdge(resource_accountPgResource, accountUniques[0].attributes, $mutation, fieldArgs);
      },
      clientMutationId($mutation) {
        return $mutation.getStepForKey("result").getMeta("clientMutationId");
      },
      deletedAccountId($object) {
        const $record = $object.getStepForKey("result"),
          specifier = nodeIdHandler_Account.plan($record);
        return lambda(specifier, nodeIdCodecs_base64JSON_base64JSON.encode);
      },
      query() {
        return rootValue();
      }
    }
  },
  DeleteSessionPayload: {
    assertStep: ObjectStep,
    plans: {
      clientMutationId($mutation) {
        return $mutation.getStepForKey("result").getMeta("clientMutationId");
      },
      deletedSessionId($object) {
        const $record = $object.getStepForKey("result"),
          specifier = nodeIdHandler_Session.plan($record);
        return lambda(specifier, nodeIdCodecs_base64JSON_base64JSON.encode);
      },
      query() {
        return rootValue();
      },
      session($object) {
        return $object.get("result");
      },
      sessionEdge($mutation, fieldArgs) {
        return pgMutationPayloadEdge(resource_sessionPgResource, sessionUniques[0].attributes, $mutation, fieldArgs);
      }
    }
  },
  DeleteTaskPayload: {
    assertStep: ObjectStep,
    plans: {
      clientMutationId($mutation) {
        return $mutation.getStepForKey("result").getMeta("clientMutationId");
      },
      deletedTaskId($object) {
        const $record = $object.getStepForKey("result"),
          specifier = nodeIdHandler_Task.plan($record);
        return lambda(specifier, nodeIdCodecs_base64JSON_base64JSON.encode);
      },
      query() {
        return rootValue();
      },
      task($object) {
        return $object.get("result");
      },
      taskEdge($mutation, fieldArgs) {
        return pgMutationPayloadEdge(resource_tasksPgResource, tasksUniques[0].attributes, $mutation, fieldArgs);
      }
    }
  },
  DeleteUserPayload: {
    assertStep: ObjectStep,
    plans: {
      clientMutationId($mutation) {
        return $mutation.getStepForKey("result").getMeta("clientMutationId");
      },
      deletedUserId($object) {
        const $record = $object.getStepForKey("result"),
          specifier = nodeIdHandler_User.plan($record);
        return lambda(specifier, nodeIdCodecs_base64JSON_base64JSON.encode);
      },
      query() {
        return rootValue();
      },
      user($object) {
        return $object.get("result");
      },
      userEdge($mutation, fieldArgs) {
        return pgMutationPayloadEdge(resource_userPgResource, userUniques[0].attributes, $mutation, fieldArgs);
      }
    }
  },
  DeleteVerificationPayload: {
    assertStep: ObjectStep,
    plans: {
      clientMutationId($mutation) {
        return $mutation.getStepForKey("result").getMeta("clientMutationId");
      },
      deletedVerificationId($object) {
        const $record = $object.getStepForKey("result"),
          specifier = nodeIdHandler_Verification.plan($record);
        return lambda(specifier, nodeIdCodecs_base64JSON_base64JSON.encode);
      },
      query() {
        return rootValue();
      },
      verification($object) {
        return $object.get("result");
      },
      verificationEdge($mutation, fieldArgs) {
        return pgMutationPayloadEdge(resource_verificationPgResource, verificationUniques[0].attributes, $mutation, fieldArgs);
      }
    }
  },
  Session: {
    assertStep: assertPgClassSingleStep,
    plans: {
      expiresAt($record) {
        return $record.get("expires_at");
      },
      id($parent) {
        const specifier = nodeIdHandler_Session.plan($parent);
        return lambda(specifier, nodeIdCodecs[nodeIdHandler_Session.codec.name].encode);
      },
      ipAddress($record) {
        return $record.get("ip_address");
      },
      rowId($record) {
        return $record.get("id");
      },
      user($record) {
        return resource_userPgResource.get({
          id: $record.get("user_id")
        });
      },
      userAgent($record) {
        return $record.get("user_agent");
      },
      userId($record) {
        return $record.get("user_id");
      }
    },
    planType($specifier) {
      const spec = Object.create(null);
      for (const pkCol of sessionUniques[0].attributes) spec[pkCol] = get2($specifier, pkCol);
      return resource_sessionPgResource.get(spec);
    }
  },
  SessionConnection: {
    assertStep: ConnectionStep,
    plans: {
      totalCount($connection) {
        return $connection.cloneSubplanWithoutPagination("aggregate").singleAsRecord().select(sql`count(*)`, TYPES.bigint, !1);
      }
    }
  },
  Task: {
    assertStep: assertPgClassSingleStep,
    plans: {
      id($parent) {
        const specifier = nodeIdHandler_Task.plan($parent);
        return lambda(specifier, nodeIdCodecs[nodeIdHandler_Task.codec.name].encode);
      },
      rowId($record) {
        return $record.get("id");
      },
      user($record) {
        return resource_userPgResource.get({
          id: $record.get("user_id")
        });
      },
      userId($record) {
        return $record.get("user_id");
      }
    },
    planType($specifier) {
      const spec = Object.create(null);
      for (const pkCol of tasksUniques[0].attributes) spec[pkCol] = get2($specifier, pkCol);
      return resource_tasksPgResource.get(spec);
    }
  },
  TaskConnection: {
    assertStep: ConnectionStep,
    plans: {
      totalCount($connection) {
        return $connection.cloneSubplanWithoutPagination("aggregate").singleAsRecord().select(sql`count(*)`, TYPES.bigint, !1);
      }
    }
  },
  UpdateAccountPayload: {
    assertStep: ObjectStep,
    plans: {
      account($object) {
        return $object.get("result");
      },
      accountEdge($mutation, fieldArgs) {
        return pgMutationPayloadEdge(resource_accountPgResource, accountUniques[0].attributes, $mutation, fieldArgs);
      },
      clientMutationId($mutation) {
        return $mutation.getStepForKey("result").getMeta("clientMutationId");
      },
      query() {
        return rootValue();
      }
    }
  },
  UpdateSessionPayload: {
    assertStep: ObjectStep,
    plans: {
      clientMutationId($mutation) {
        return $mutation.getStepForKey("result").getMeta("clientMutationId");
      },
      query() {
        return rootValue();
      },
      session($object) {
        return $object.get("result");
      },
      sessionEdge($mutation, fieldArgs) {
        return pgMutationPayloadEdge(resource_sessionPgResource, sessionUniques[0].attributes, $mutation, fieldArgs);
      }
    }
  },
  UpdateTaskPayload: {
    assertStep: ObjectStep,
    plans: {
      clientMutationId($mutation) {
        return $mutation.getStepForKey("result").getMeta("clientMutationId");
      },
      query() {
        return rootValue();
      },
      task($object) {
        return $object.get("result");
      },
      taskEdge($mutation, fieldArgs) {
        return pgMutationPayloadEdge(resource_tasksPgResource, tasksUniques[0].attributes, $mutation, fieldArgs);
      }
    }
  },
  UpdateUserPayload: {
    assertStep: ObjectStep,
    plans: {
      clientMutationId($mutation) {
        return $mutation.getStepForKey("result").getMeta("clientMutationId");
      },
      query() {
        return rootValue();
      },
      user($object) {
        return $object.get("result");
      },
      userEdge($mutation, fieldArgs) {
        return pgMutationPayloadEdge(resource_userPgResource, userUniques[0].attributes, $mutation, fieldArgs);
      }
    }
  },
  UpdateVerificationPayload: {
    assertStep: ObjectStep,
    plans: {
      clientMutationId($mutation) {
        return $mutation.getStepForKey("result").getMeta("clientMutationId");
      },
      query() {
        return rootValue();
      },
      verification($object) {
        return $object.get("result");
      },
      verificationEdge($mutation, fieldArgs) {
        return pgMutationPayloadEdge(resource_verificationPgResource, verificationUniques[0].attributes, $mutation, fieldArgs);
      }
    }
  },
  User: {
    assertStep: assertPgClassSingleStep,
    plans: {
      accounts: {
        plan($record) {
          const $records = resource_accountPgResource.find({
            user_id: $record.get("id")
          });
          return connection($records);
        },
        args: {
          first(_, $connection, arg) {
            $connection.setFirst(arg.getRaw());
          },
          last(_, $connection, val) {
            $connection.setLast(val.getRaw());
          },
          offset(_, $connection, val) {
            $connection.setOffset(val.getRaw());
          },
          before(_, $connection, val) {
            $connection.setBefore(val.getRaw());
          },
          after(_, $connection, val) {
            $connection.setAfter(val.getRaw());
          },
          condition(_condition, $connection, arg) {
            const $select = $connection.getSubplan();
            arg.apply($select, qbWhereBuilder);
          },
          filter(_, $connection, fieldArg) {
            const $pgSelect = $connection.getSubplan();
            fieldArg.apply($pgSelect, (queryBuilder, value) => {
              assertAllowed6(value, "object");
              if (value == null) return;
              const condition = new PgCondition(queryBuilder);
              return condition;
            });
          },
          orderBy(parent, $connection, value) {
            const $select = $connection.getSubplan();
            value.apply($select);
          }
        }
      },
      emailVerified($record) {
        return $record.get("email_verified");
      },
      id($parent) {
        const specifier = nodeIdHandler_User.plan($parent);
        return lambda(specifier, nodeIdCodecs[nodeIdHandler_User.codec.name].encode);
      },
      rowId($record) {
        return $record.get("id");
      },
      sessions: {
        plan($record) {
          const $records = resource_sessionPgResource.find({
            user_id: $record.get("id")
          });
          return connection($records);
        },
        args: {
          first(_, $connection, arg) {
            $connection.setFirst(arg.getRaw());
          },
          last(_, $connection, val) {
            $connection.setLast(val.getRaw());
          },
          offset(_, $connection, val) {
            $connection.setOffset(val.getRaw());
          },
          before(_, $connection, val) {
            $connection.setBefore(val.getRaw());
          },
          after(_, $connection, val) {
            $connection.setAfter(val.getRaw());
          },
          condition(_condition, $connection, arg) {
            const $select = $connection.getSubplan();
            arg.apply($select, qbWhereBuilder);
          },
          filter(_, $connection, fieldArg) {
            const $pgSelect = $connection.getSubplan();
            fieldArg.apply($pgSelect, (queryBuilder, value) => {
              assertAllowed7(value, "object");
              if (value == null) return;
              const condition = new PgCondition(queryBuilder);
              return condition;
            });
          },
          orderBy(parent, $connection, value) {
            const $select = $connection.getSubplan();
            value.apply($select);
          }
        }
      },
      tasks: {
        plan($record) {
          const $records = resource_tasksPgResource.find({
            user_id: $record.get("id")
          });
          return connection($records);
        },
        args: {
          first(_, $connection, arg) {
            $connection.setFirst(arg.getRaw());
          },
          last(_, $connection, val) {
            $connection.setLast(val.getRaw());
          },
          offset(_, $connection, val) {
            $connection.setOffset(val.getRaw());
          },
          before(_, $connection, val) {
            $connection.setBefore(val.getRaw());
          },
          after(_, $connection, val) {
            $connection.setAfter(val.getRaw());
          },
          condition(_condition, $connection, arg) {
            const $select = $connection.getSubplan();
            arg.apply($select, qbWhereBuilder);
          },
          filter(_, $connection, fieldArg) {
            const $pgSelect = $connection.getSubplan();
            fieldArg.apply($pgSelect, (queryBuilder, value) => {
              assertAllowed8(value, "object");
              if (value == null) return;
              const condition = new PgCondition(queryBuilder);
              return condition;
            });
          },
          orderBy(parent, $connection, value) {
            const $select = $connection.getSubplan();
            value.apply($select);
          }
        }
      }
    },
    planType($specifier) {
      const spec = Object.create(null);
      for (const pkCol of userUniques[0].attributes) spec[pkCol] = get2($specifier, pkCol);
      return resource_userPgResource.get(spec);
    }
  },
  UserConnection: {
    assertStep: ConnectionStep,
    plans: {
      totalCount($connection) {
        return $connection.cloneSubplanWithoutPagination("aggregate").singleAsRecord().select(sql`count(*)`, TYPES.bigint, !1);
      }
    }
  },
  Verification: {
    assertStep: assertPgClassSingleStep,
    plans: {
      expiresAt($record) {
        return $record.get("expires_at");
      },
      id($parent) {
        const specifier = nodeIdHandler_Verification.plan($parent);
        return lambda(specifier, nodeIdCodecs[nodeIdHandler_Verification.codec.name].encode);
      },
      rowId($record) {
        return $record.get("id");
      }
    },
    planType($specifier) {
      const spec = Object.create(null);
      for (const pkCol of verificationUniques[0].attributes) spec[pkCol] = get2($specifier, pkCol);
      return resource_verificationPgResource.get(spec);
    }
  },
  VerificationConnection: {
    assertStep: ConnectionStep,
    plans: {
      totalCount($connection) {
        return $connection.cloneSubplanWithoutPagination("aggregate").singleAsRecord().select(sql`count(*)`, TYPES.bigint, !1);
      }
    }
  }
};
export const interfaces = {
  Node: {
    planType($nodeId) {
      const $specifier = decodeNodeId($nodeId);
      return {
        $__typename: lambda($specifier, findTypeNameMatch, !0),
        planForType(type) {
          const spec = nodeIdHandlerByTypeName[type.name];
          if (spec) return spec.get(spec.getSpec(access($specifier, [spec.codec.name])));else throw Error(`Failed to find handler for ${type.name}`);
        }
      };
    }
  }
};
export const inputObjects = {
  AccountCondition: {
    plans: {
      accessToken($condition, val) {
        $condition.where({
          type: "attribute",
          attribute: "access_token",
          callback(expression) {
            return val === null ? sql`${expression} is null` : sql`${expression} = ${sqlValueWithCodec(val, TYPES.text)}`;
          }
        });
      },
      accessTokenExpiresAt($condition, val) {
        $condition.where({
          type: "attribute",
          attribute: "access_token_expires_at",
          callback(expression) {
            return val === null ? sql`${expression} is null` : sql`${expression} = ${sqlValueWithCodec(val, TYPES.timestamp)}`;
          }
        });
      },
      accountId($condition, val) {
        $condition.where({
          type: "attribute",
          attribute: "account_id",
          callback(expression) {
            return val === null ? sql`${expression} is null` : sql`${expression} = ${sqlValueWithCodec(val, TYPES.text)}`;
          }
        });
      },
      createdAt($condition, val) {
        $condition.where({
          type: "attribute",
          attribute: "createdAt",
          callback(expression) {
            return val === null ? sql`${expression} is null` : sql`${expression} = ${sqlValueWithCodec(val, TYPES.timestamptz)}`;
          }
        });
      },
      idToken($condition, val) {
        $condition.where({
          type: "attribute",
          attribute: "id_token",
          callback(expression) {
            return val === null ? sql`${expression} is null` : sql`${expression} = ${sqlValueWithCodec(val, TYPES.text)}`;
          }
        });
      },
      password($condition, val) {
        $condition.where({
          type: "attribute",
          attribute: "password",
          callback(expression) {
            return val === null ? sql`${expression} is null` : sql`${expression} = ${sqlValueWithCodec(val, TYPES.text)}`;
          }
        });
      },
      providerId($condition, val) {
        $condition.where({
          type: "attribute",
          attribute: "provider_id",
          callback(expression) {
            return val === null ? sql`${expression} is null` : sql`${expression} = ${sqlValueWithCodec(val, TYPES.text)}`;
          }
        });
      },
      refreshToken($condition, val) {
        $condition.where({
          type: "attribute",
          attribute: "refresh_token",
          callback(expression) {
            return val === null ? sql`${expression} is null` : sql`${expression} = ${sqlValueWithCodec(val, TYPES.text)}`;
          }
        });
      },
      refreshTokenExpiresAt($condition, val) {
        $condition.where({
          type: "attribute",
          attribute: "refresh_token_expires_at",
          callback(expression) {
            return val === null ? sql`${expression} is null` : sql`${expression} = ${sqlValueWithCodec(val, TYPES.timestamp)}`;
          }
        });
      },
      rowId($condition, val) {
        $condition.where({
          type: "attribute",
          attribute: "id",
          callback(expression) {
            return val === null ? sql`${expression} is null` : sql`${expression} = ${sqlValueWithCodec(val, TYPES.text)}`;
          }
        });
      },
      scope($condition, val) {
        $condition.where({
          type: "attribute",
          attribute: "scope",
          callback(expression) {
            return val === null ? sql`${expression} is null` : sql`${expression} = ${sqlValueWithCodec(val, TYPES.text)}`;
          }
        });
      },
      updatedAt($condition, val) {
        $condition.where({
          type: "attribute",
          attribute: "updatedAt",
          callback(expression) {
            return val === null ? sql`${expression} is null` : sql`${expression} = ${sqlValueWithCodec(val, TYPES.timestamptz)}`;
          }
        });
      },
      userId($condition, val) {
        $condition.where({
          type: "attribute",
          attribute: "user_id",
          callback(expression) {
            return val === null ? sql`${expression} is null` : sql`${expression} = ${sqlValueWithCodec(val, TYPES.text)}`;
          }
        });
      }
    }
  },
  AccountFilter: {
    plans: {
      accessToken(queryBuilder, value) {
        if (value === void 0) return;
        if (!true && isEmpty(value)) throw Object.assign(Error("Empty objects are forbidden in filter argument input."), {});
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const condition = new PgCondition(queryBuilder);
        condition.extensions.pgFilterAttribute = colSpec5;
        return condition;
      },
      accessTokenExpiresAt(queryBuilder, value) {
        if (value === void 0) return;
        if (!true && isEmpty(value)) throw Object.assign(Error("Empty objects are forbidden in filter argument input."), {});
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const condition = new PgCondition(queryBuilder);
        condition.extensions.pgFilterAttribute = colSpec8;
        return condition;
      },
      accountId(queryBuilder, value) {
        if (value === void 0) return;
        if (!true && isEmpty(value)) throw Object.assign(Error("Empty objects are forbidden in filter argument input."), {});
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const condition = new PgCondition(queryBuilder);
        condition.extensions.pgFilterAttribute = colSpec2;
        return condition;
      },
      and($where, value) {
        assertAllowed10(value, "list");
        if (value == null) return;
        return $where.andPlan();
      },
      createdAt(queryBuilder, value) {
        if (value === void 0) return;
        if (!true && isEmpty(value)) throw Object.assign(Error("Empty objects are forbidden in filter argument input."), {});
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const condition = new PgCondition(queryBuilder);
        condition.extensions.pgFilterAttribute = colSpec12;
        return condition;
      },
      idToken(queryBuilder, value) {
        if (value === void 0) return;
        if (!true && isEmpty(value)) throw Object.assign(Error("Empty objects are forbidden in filter argument input."), {});
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const condition = new PgCondition(queryBuilder);
        condition.extensions.pgFilterAttribute = colSpec7;
        return condition;
      },
      not($where, value) {
        assertAllowed10(value, "object");
        if (value == null) return;
        return $where.notPlan().andPlan();
      },
      or($where, value) {
        assertAllowed10(value, "list");
        if (value == null) return;
        const $or = $where.orPlan();
        return () => $or.andPlan();
      },
      password(queryBuilder, value) {
        if (value === void 0) return;
        if (!true && isEmpty(value)) throw Object.assign(Error("Empty objects are forbidden in filter argument input."), {});
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const condition = new PgCondition(queryBuilder);
        condition.extensions.pgFilterAttribute = colSpec11;
        return condition;
      },
      providerId(queryBuilder, value) {
        if (value === void 0) return;
        if (!true && isEmpty(value)) throw Object.assign(Error("Empty objects are forbidden in filter argument input."), {});
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const condition = new PgCondition(queryBuilder);
        condition.extensions.pgFilterAttribute = colSpec3;
        return condition;
      },
      refreshToken(queryBuilder, value) {
        if (value === void 0) return;
        if (!true && isEmpty(value)) throw Object.assign(Error("Empty objects are forbidden in filter argument input."), {});
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const condition = new PgCondition(queryBuilder);
        condition.extensions.pgFilterAttribute = colSpec6;
        return condition;
      },
      refreshTokenExpiresAt(queryBuilder, value) {
        if (value === void 0) return;
        if (!true && isEmpty(value)) throw Object.assign(Error("Empty objects are forbidden in filter argument input."), {});
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const condition = new PgCondition(queryBuilder);
        condition.extensions.pgFilterAttribute = colSpec9;
        return condition;
      },
      rowId(queryBuilder, value) {
        if (value === void 0) return;
        if (!true && isEmpty(value)) throw Object.assign(Error("Empty objects are forbidden in filter argument input."), {});
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const condition = new PgCondition(queryBuilder);
        condition.extensions.pgFilterAttribute = colSpec;
        return condition;
      },
      scope(queryBuilder, value) {
        if (value === void 0) return;
        if (!true && isEmpty(value)) throw Object.assign(Error("Empty objects are forbidden in filter argument input."), {});
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const condition = new PgCondition(queryBuilder);
        condition.extensions.pgFilterAttribute = colSpec10;
        return condition;
      },
      updatedAt(queryBuilder, value) {
        if (value === void 0) return;
        if (!true && isEmpty(value)) throw Object.assign(Error("Empty objects are forbidden in filter argument input."), {});
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const condition = new PgCondition(queryBuilder);
        condition.extensions.pgFilterAttribute = colSpec13;
        return condition;
      },
      user($where, value) {
        assertAllowed9(value, "object");
        if (value == null) return;
        const $subQuery = $where.existsPlan({
          tableExpression: userIdentifier,
          alias: resource_userPgResource.name
        });
        registryConfig.pgRelations.account.userByMyUserId.localAttributes.forEach((localAttribute, i) => {
          const remoteAttribute = registryConfig.pgRelations.account.userByMyUserId.remoteAttributes[i];
          $subQuery.where(sql`${$where.alias}.${sql.identifier(localAttribute)} = ${$subQuery.alias}.${sql.identifier(remoteAttribute)}`);
        });
        return $subQuery;
      },
      userId(queryBuilder, value) {
        if (value === void 0) return;
        if (!true && isEmpty(value)) throw Object.assign(Error("Empty objects are forbidden in filter argument input."), {});
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const condition = new PgCondition(queryBuilder);
        condition.extensions.pgFilterAttribute = colSpec4;
        return condition;
      }
    }
  },
  AccountInput: {
    baked: createObjectAndApplyChildren,
    plans: {
      accessToken(obj, val, {
        field,
        schema
      }) {
        obj.set("access_token", bakedInputRuntime(schema, field.type, val));
      },
      accessTokenExpiresAt(obj, val, {
        field,
        schema
      }) {
        obj.set("access_token_expires_at", bakedInputRuntime(schema, field.type, val));
      },
      accountId(obj, val, {
        field,
        schema
      }) {
        obj.set("account_id", bakedInputRuntime(schema, field.type, val));
      },
      createdAt(obj, val, {
        field,
        schema
      }) {
        obj.set("createdAt", bakedInputRuntime(schema, field.type, val));
      },
      idToken(obj, val, {
        field,
        schema
      }) {
        obj.set("id_token", bakedInputRuntime(schema, field.type, val));
      },
      password(obj, val, {
        field,
        schema
      }) {
        obj.set("password", bakedInputRuntime(schema, field.type, val));
      },
      providerId(obj, val, {
        field,
        schema
      }) {
        obj.set("provider_id", bakedInputRuntime(schema, field.type, val));
      },
      refreshToken(obj, val, {
        field,
        schema
      }) {
        obj.set("refresh_token", bakedInputRuntime(schema, field.type, val));
      },
      refreshTokenExpiresAt(obj, val, {
        field,
        schema
      }) {
        obj.set("refresh_token_expires_at", bakedInputRuntime(schema, field.type, val));
      },
      rowId(obj, val, {
        field,
        schema
      }) {
        obj.set("id", bakedInputRuntime(schema, field.type, val));
      },
      scope(obj, val, {
        field,
        schema
      }) {
        obj.set("scope", bakedInputRuntime(schema, field.type, val));
      },
      updatedAt(obj, val, {
        field,
        schema
      }) {
        obj.set("updatedAt", bakedInputRuntime(schema, field.type, val));
      },
      userId(obj, val, {
        field,
        schema
      }) {
        obj.set("user_id", bakedInputRuntime(schema, field.type, val));
      }
    }
  },
  AccountPatch: {
    baked: createObjectAndApplyChildren,
    plans: {
      accessToken(obj, val, {
        field,
        schema
      }) {
        obj.set("access_token", bakedInputRuntime(schema, field.type, val));
      },
      accessTokenExpiresAt(obj, val, {
        field,
        schema
      }) {
        obj.set("access_token_expires_at", bakedInputRuntime(schema, field.type, val));
      },
      accountId(obj, val, {
        field,
        schema
      }) {
        obj.set("account_id", bakedInputRuntime(schema, field.type, val));
      },
      createdAt(obj, val, {
        field,
        schema
      }) {
        obj.set("createdAt", bakedInputRuntime(schema, field.type, val));
      },
      idToken(obj, val, {
        field,
        schema
      }) {
        obj.set("id_token", bakedInputRuntime(schema, field.type, val));
      },
      password(obj, val, {
        field,
        schema
      }) {
        obj.set("password", bakedInputRuntime(schema, field.type, val));
      },
      providerId(obj, val, {
        field,
        schema
      }) {
        obj.set("provider_id", bakedInputRuntime(schema, field.type, val));
      },
      refreshToken(obj, val, {
        field,
        schema
      }) {
        obj.set("refresh_token", bakedInputRuntime(schema, field.type, val));
      },
      refreshTokenExpiresAt(obj, val, {
        field,
        schema
      }) {
        obj.set("refresh_token_expires_at", bakedInputRuntime(schema, field.type, val));
      },
      rowId(obj, val, {
        field,
        schema
      }) {
        obj.set("id", bakedInputRuntime(schema, field.type, val));
      },
      scope(obj, val, {
        field,
        schema
      }) {
        obj.set("scope", bakedInputRuntime(schema, field.type, val));
      },
      updatedAt(obj, val, {
        field,
        schema
      }) {
        obj.set("updatedAt", bakedInputRuntime(schema, field.type, val));
      },
      userId(obj, val, {
        field,
        schema
      }) {
        obj.set("user_id", bakedInputRuntime(schema, field.type, val));
      }
    }
  },
  BooleanFilter: {
    plans: {
      distinctFrom($where, value) {
        if (!$where.extensions?.pgFilterAttribute) throw Error("Planning error: expected 'pgFilterAttribute' to be present on the $where plan's extensions; your extensions to `postgraphile-plugin-connection-filter` does not implement the required interfaces.");
        if (value === void 0) return;
        const {
            fieldName: parentFieldName,
            attributeName,
            attribute,
            codec,
            expression
          } = $where.extensions.pgFilterAttribute,
          sourceAlias = attribute ? attribute.expression ? attribute.expression($where.alias) : sql`${$where.alias}.${sql.identifier(attributeName)}` : expression ? expression : $where.alias,
          sourceCodec = codec ?? attribute.codec,
          [sqlIdentifier, identifierCodec] = resolveSqlIdentifier14 ? resolveSqlIdentifier14(sourceAlias, sourceCodec) : [sourceAlias, sourceCodec];
        if (true && value === null) return;
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const resolvedInput = value,
          inputCodec = resolveInputCodec19 ? resolveInputCodec19(codec ?? attribute.codec) : codec ?? attribute.codec,
          sqlValue = sqlValueWithCodec(resolvedInput, inputCodec),
          fragment = resolve42(sqlIdentifier, sqlValue, value, $where, {
            fieldName: parentFieldName ?? null,
            operatorName: "distinctFrom"
          });
        $where.where(fragment);
      },
      equalTo($where, value) {
        if (!$where.extensions?.pgFilterAttribute) throw Error("Planning error: expected 'pgFilterAttribute' to be present on the $where plan's extensions; your extensions to `postgraphile-plugin-connection-filter` does not implement the required interfaces.");
        if (value === void 0) return;
        const {
            fieldName: parentFieldName,
            attributeName,
            attribute,
            codec,
            expression
          } = $where.extensions.pgFilterAttribute,
          sourceAlias = attribute ? attribute.expression ? attribute.expression($where.alias) : sql`${$where.alias}.${sql.identifier(attributeName)}` : expression ? expression : $where.alias,
          sourceCodec = codec ?? attribute.codec,
          [sqlIdentifier, identifierCodec] = resolveSqlIdentifier14 ? resolveSqlIdentifier14(sourceAlias, sourceCodec) : [sourceAlias, sourceCodec];
        if (true && value === null) return;
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const resolvedInput = value,
          inputCodec = resolveInputCodec19 ? resolveInputCodec19(codec ?? attribute.codec) : codec ?? attribute.codec,
          sqlValue = sqlValueWithCodec(resolvedInput, inputCodec),
          fragment = resolve40(sqlIdentifier, sqlValue, value, $where, {
            fieldName: parentFieldName ?? null,
            operatorName: "equalTo"
          });
        $where.where(fragment);
      },
      greaterThan($where, value) {
        if (!$where.extensions?.pgFilterAttribute) throw Error("Planning error: expected 'pgFilterAttribute' to be present on the $where plan's extensions; your extensions to `postgraphile-plugin-connection-filter` does not implement the required interfaces.");
        if (value === void 0) return;
        const {
            fieldName: parentFieldName,
            attributeName,
            attribute,
            codec,
            expression
          } = $where.extensions.pgFilterAttribute,
          sourceAlias = attribute ? attribute.expression ? attribute.expression($where.alias) : sql`${$where.alias}.${sql.identifier(attributeName)}` : expression ? expression : $where.alias,
          sourceCodec = codec ?? attribute.codec,
          [sqlIdentifier, identifierCodec] = resolveSqlIdentifier14 ? resolveSqlIdentifier14(sourceAlias, sourceCodec) : [sourceAlias, sourceCodec];
        if (true && value === null) return;
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const resolvedInput = value,
          inputCodec = resolveInputCodec19 ? resolveInputCodec19(codec ?? attribute.codec) : codec ?? attribute.codec,
          sqlValue = sqlValueWithCodec(resolvedInput, inputCodec),
          fragment = resolve48(sqlIdentifier, sqlValue, value, $where, {
            fieldName: parentFieldName ?? null,
            operatorName: "greaterThan"
          });
        $where.where(fragment);
      },
      greaterThanOrEqualTo($where, value) {
        if (!$where.extensions?.pgFilterAttribute) throw Error("Planning error: expected 'pgFilterAttribute' to be present on the $where plan's extensions; your extensions to `postgraphile-plugin-connection-filter` does not implement the required interfaces.");
        if (value === void 0) return;
        const {
            fieldName: parentFieldName,
            attributeName,
            attribute,
            codec,
            expression
          } = $where.extensions.pgFilterAttribute,
          sourceAlias = attribute ? attribute.expression ? attribute.expression($where.alias) : sql`${$where.alias}.${sql.identifier(attributeName)}` : expression ? expression : $where.alias,
          sourceCodec = codec ?? attribute.codec,
          [sqlIdentifier, identifierCodec] = resolveSqlIdentifier14 ? resolveSqlIdentifier14(sourceAlias, sourceCodec) : [sourceAlias, sourceCodec];
        if (true && value === null) return;
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const resolvedInput = value,
          inputCodec = resolveInputCodec19 ? resolveInputCodec19(codec ?? attribute.codec) : codec ?? attribute.codec,
          sqlValue = sqlValueWithCodec(resolvedInput, inputCodec),
          fragment = resolve49(sqlIdentifier, sqlValue, value, $where, {
            fieldName: parentFieldName ?? null,
            operatorName: "greaterThanOrEqualTo"
          });
        $where.where(fragment);
      },
      in($where, value) {
        if (!$where.extensions?.pgFilterAttribute) throw Error("Planning error: expected 'pgFilterAttribute' to be present on the $where plan's extensions; your extensions to `postgraphile-plugin-connection-filter` does not implement the required interfaces.");
        if (value === void 0) return;
        const {
            fieldName: parentFieldName,
            attributeName,
            attribute,
            codec,
            expression
          } = $where.extensions.pgFilterAttribute,
          sourceAlias = attribute ? attribute.expression ? attribute.expression($where.alias) : sql`${$where.alias}.${sql.identifier(attributeName)}` : expression ? expression : $where.alias,
          sourceCodec = codec ?? attribute.codec,
          [sqlIdentifier, identifierCodec] = resolveSqlIdentifier14 ? resolveSqlIdentifier14(sourceAlias, sourceCodec) : [sourceAlias, sourceCodec];
        if (true && value === null) return;
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const resolvedInput = value,
          inputCodec = resolveInputCodec20 ? resolveInputCodec20(codec ?? attribute.codec) : codec ?? attribute.codec,
          sqlValue = sqlValueWithCodec(resolvedInput, inputCodec),
          fragment = resolve44(sqlIdentifier, sqlValue, value, $where, {
            fieldName: parentFieldName ?? null,
            operatorName: "in"
          });
        $where.where(fragment);
      },
      isNull($where, value) {
        if (!$where.extensions?.pgFilterAttribute) throw Error("Planning error: expected 'pgFilterAttribute' to be present on the $where plan's extensions; your extensions to `postgraphile-plugin-connection-filter` does not implement the required interfaces.");
        if (value === void 0) return;
        const {
            fieldName: parentFieldName,
            attributeName,
            attribute,
            codec,
            expression
          } = $where.extensions.pgFilterAttribute,
          sourceAlias = attribute ? attribute.expression ? attribute.expression($where.alias) : sql`${$where.alias}.${sql.identifier(attributeName)}` : expression ? expression : $where.alias,
          sourceCodec = codec ?? attribute.codec,
          [sqlIdentifier, identifierCodec] = [sourceAlias, sourceCodec];
        if (true && value === null) return;
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const resolvedInput = value,
          inputCodec = resolveInputCodec18 ? resolveInputCodec18(codec ?? attribute.codec) : codec ?? attribute.codec,
          sqlValue = resolveSqlValue13 ? resolveSqlValue13($where, value, inputCodec) : sqlValueWithCodec(resolvedInput, inputCodec),
          fragment = resolve39(sqlIdentifier, sqlValue, value, $where, {
            fieldName: parentFieldName ?? null,
            operatorName: "isNull"
          });
        $where.where(fragment);
      },
      lessThan($where, value) {
        if (!$where.extensions?.pgFilterAttribute) throw Error("Planning error: expected 'pgFilterAttribute' to be present on the $where plan's extensions; your extensions to `postgraphile-plugin-connection-filter` does not implement the required interfaces.");
        if (value === void 0) return;
        const {
            fieldName: parentFieldName,
            attributeName,
            attribute,
            codec,
            expression
          } = $where.extensions.pgFilterAttribute,
          sourceAlias = attribute ? attribute.expression ? attribute.expression($where.alias) : sql`${$where.alias}.${sql.identifier(attributeName)}` : expression ? expression : $where.alias,
          sourceCodec = codec ?? attribute.codec,
          [sqlIdentifier, identifierCodec] = resolveSqlIdentifier14 ? resolveSqlIdentifier14(sourceAlias, sourceCodec) : [sourceAlias, sourceCodec];
        if (true && value === null) return;
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const resolvedInput = value,
          inputCodec = resolveInputCodec19 ? resolveInputCodec19(codec ?? attribute.codec) : codec ?? attribute.codec,
          sqlValue = sqlValueWithCodec(resolvedInput, inputCodec),
          fragment = resolve46(sqlIdentifier, sqlValue, value, $where, {
            fieldName: parentFieldName ?? null,
            operatorName: "lessThan"
          });
        $where.where(fragment);
      },
      lessThanOrEqualTo($where, value) {
        if (!$where.extensions?.pgFilterAttribute) throw Error("Planning error: expected 'pgFilterAttribute' to be present on the $where plan's extensions; your extensions to `postgraphile-plugin-connection-filter` does not implement the required interfaces.");
        if (value === void 0) return;
        const {
            fieldName: parentFieldName,
            attributeName,
            attribute,
            codec,
            expression
          } = $where.extensions.pgFilterAttribute,
          sourceAlias = attribute ? attribute.expression ? attribute.expression($where.alias) : sql`${$where.alias}.${sql.identifier(attributeName)}` : expression ? expression : $where.alias,
          sourceCodec = codec ?? attribute.codec,
          [sqlIdentifier, identifierCodec] = resolveSqlIdentifier14 ? resolveSqlIdentifier14(sourceAlias, sourceCodec) : [sourceAlias, sourceCodec];
        if (true && value === null) return;
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const resolvedInput = value,
          inputCodec = resolveInputCodec19 ? resolveInputCodec19(codec ?? attribute.codec) : codec ?? attribute.codec,
          sqlValue = sqlValueWithCodec(resolvedInput, inputCodec),
          fragment = resolve47(sqlIdentifier, sqlValue, value, $where, {
            fieldName: parentFieldName ?? null,
            operatorName: "lessThanOrEqualTo"
          });
        $where.where(fragment);
      },
      notDistinctFrom($where, value) {
        if (!$where.extensions?.pgFilterAttribute) throw Error("Planning error: expected 'pgFilterAttribute' to be present on the $where plan's extensions; your extensions to `postgraphile-plugin-connection-filter` does not implement the required interfaces.");
        if (value === void 0) return;
        const {
            fieldName: parentFieldName,
            attributeName,
            attribute,
            codec,
            expression
          } = $where.extensions.pgFilterAttribute,
          sourceAlias = attribute ? attribute.expression ? attribute.expression($where.alias) : sql`${$where.alias}.${sql.identifier(attributeName)}` : expression ? expression : $where.alias,
          sourceCodec = codec ?? attribute.codec,
          [sqlIdentifier, identifierCodec] = resolveSqlIdentifier14 ? resolveSqlIdentifier14(sourceAlias, sourceCodec) : [sourceAlias, sourceCodec];
        if (true && value === null) return;
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const resolvedInput = value,
          inputCodec = resolveInputCodec19 ? resolveInputCodec19(codec ?? attribute.codec) : codec ?? attribute.codec,
          sqlValue = sqlValueWithCodec(resolvedInput, inputCodec),
          fragment = resolve43(sqlIdentifier, sqlValue, value, $where, {
            fieldName: parentFieldName ?? null,
            operatorName: "notDistinctFrom"
          });
        $where.where(fragment);
      },
      notEqualTo($where, value) {
        if (!$where.extensions?.pgFilterAttribute) throw Error("Planning error: expected 'pgFilterAttribute' to be present on the $where plan's extensions; your extensions to `postgraphile-plugin-connection-filter` does not implement the required interfaces.");
        if (value === void 0) return;
        const {
            fieldName: parentFieldName,
            attributeName,
            attribute,
            codec,
            expression
          } = $where.extensions.pgFilterAttribute,
          sourceAlias = attribute ? attribute.expression ? attribute.expression($where.alias) : sql`${$where.alias}.${sql.identifier(attributeName)}` : expression ? expression : $where.alias,
          sourceCodec = codec ?? attribute.codec,
          [sqlIdentifier, identifierCodec] = resolveSqlIdentifier14 ? resolveSqlIdentifier14(sourceAlias, sourceCodec) : [sourceAlias, sourceCodec];
        if (true && value === null) return;
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const resolvedInput = value,
          inputCodec = resolveInputCodec19 ? resolveInputCodec19(codec ?? attribute.codec) : codec ?? attribute.codec,
          sqlValue = sqlValueWithCodec(resolvedInput, inputCodec),
          fragment = resolve41(sqlIdentifier, sqlValue, value, $where, {
            fieldName: parentFieldName ?? null,
            operatorName: "notEqualTo"
          });
        $where.where(fragment);
      },
      notIn($where, value) {
        if (!$where.extensions?.pgFilterAttribute) throw Error("Planning error: expected 'pgFilterAttribute' to be present on the $where plan's extensions; your extensions to `postgraphile-plugin-connection-filter` does not implement the required interfaces.");
        if (value === void 0) return;
        const {
            fieldName: parentFieldName,
            attributeName,
            attribute,
            codec,
            expression
          } = $where.extensions.pgFilterAttribute,
          sourceAlias = attribute ? attribute.expression ? attribute.expression($where.alias) : sql`${$where.alias}.${sql.identifier(attributeName)}` : expression ? expression : $where.alias,
          sourceCodec = codec ?? attribute.codec,
          [sqlIdentifier, identifierCodec] = resolveSqlIdentifier14 ? resolveSqlIdentifier14(sourceAlias, sourceCodec) : [sourceAlias, sourceCodec];
        if (true && value === null) return;
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const resolvedInput = value,
          inputCodec = resolveInputCodec20 ? resolveInputCodec20(codec ?? attribute.codec) : codec ?? attribute.codec,
          sqlValue = sqlValueWithCodec(resolvedInput, inputCodec),
          fragment = resolve45(sqlIdentifier, sqlValue, value, $where, {
            fieldName: parentFieldName ?? null,
            operatorName: "notIn"
          });
        $where.where(fragment);
      }
    }
  },
  CreateAccountInput: {
    plans: {
      account(qb, arg) {
        if (arg != null) return qb.setBuilder();
      },
      clientMutationId(qb, val) {
        qb.setMeta("clientMutationId", val);
      }
    }
  },
  CreateSessionInput: {
    plans: {
      clientMutationId(qb, val) {
        qb.setMeta("clientMutationId", val);
      },
      session(qb, arg) {
        if (arg != null) return qb.setBuilder();
      }
    }
  },
  CreateTaskInput: {
    plans: {
      clientMutationId(qb, val) {
        qb.setMeta("clientMutationId", val);
      },
      task(qb, arg) {
        if (arg != null) return qb.setBuilder();
      }
    }
  },
  CreateUserInput: {
    plans: {
      clientMutationId(qb, val) {
        qb.setMeta("clientMutationId", val);
      },
      user(qb, arg) {
        if (arg != null) return qb.setBuilder();
      }
    }
  },
  CreateVerificationInput: {
    plans: {
      clientMutationId(qb, val) {
        qb.setMeta("clientMutationId", val);
      },
      verification(qb, arg) {
        if (arg != null) return qb.setBuilder();
      }
    }
  },
  DatetimeFilter: {
    plans: {
      distinctFrom($where, value) {
        if (!$where.extensions?.pgFilterAttribute) throw Error("Planning error: expected 'pgFilterAttribute' to be present on the $where plan's extensions; your extensions to `postgraphile-plugin-connection-filter` does not implement the required interfaces.");
        if (value === void 0) return;
        const {
            fieldName: parentFieldName,
            attributeName,
            attribute,
            codec,
            expression
          } = $where.extensions.pgFilterAttribute,
          sourceAlias = attribute ? attribute.expression ? attribute.expression($where.alias) : sql`${$where.alias}.${sql.identifier(attributeName)}` : expression ? expression : $where.alias,
          sourceCodec = codec ?? attribute.codec,
          [sqlIdentifier, identifierCodec] = resolveSqlIdentifier13 ? resolveSqlIdentifier13(sourceAlias, sourceCodec) : [sourceAlias, sourceCodec];
        if (true && value === null) return;
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const resolvedInput = value,
          inputCodec = resolveInputCodec16 ? resolveInputCodec16(codec ?? attribute.codec) : codec ?? attribute.codec,
          sqlValue = sqlValueWithCodec(resolvedInput, inputCodec),
          fragment = resolve31(sqlIdentifier, sqlValue, value, $where, {
            fieldName: parentFieldName ?? null,
            operatorName: "distinctFrom"
          });
        $where.where(fragment);
      },
      equalTo($where, value) {
        if (!$where.extensions?.pgFilterAttribute) throw Error("Planning error: expected 'pgFilterAttribute' to be present on the $where plan's extensions; your extensions to `postgraphile-plugin-connection-filter` does not implement the required interfaces.");
        if (value === void 0) return;
        const {
            fieldName: parentFieldName,
            attributeName,
            attribute,
            codec,
            expression
          } = $where.extensions.pgFilterAttribute,
          sourceAlias = attribute ? attribute.expression ? attribute.expression($where.alias) : sql`${$where.alias}.${sql.identifier(attributeName)}` : expression ? expression : $where.alias,
          sourceCodec = codec ?? attribute.codec,
          [sqlIdentifier, identifierCodec] = resolveSqlIdentifier13 ? resolveSqlIdentifier13(sourceAlias, sourceCodec) : [sourceAlias, sourceCodec];
        if (true && value === null) return;
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const resolvedInput = value,
          inputCodec = resolveInputCodec16 ? resolveInputCodec16(codec ?? attribute.codec) : codec ?? attribute.codec,
          sqlValue = sqlValueWithCodec(resolvedInput, inputCodec),
          fragment = resolve29(sqlIdentifier, sqlValue, value, $where, {
            fieldName: parentFieldName ?? null,
            operatorName: "equalTo"
          });
        $where.where(fragment);
      },
      greaterThan($where, value) {
        if (!$where.extensions?.pgFilterAttribute) throw Error("Planning error: expected 'pgFilterAttribute' to be present on the $where plan's extensions; your extensions to `postgraphile-plugin-connection-filter` does not implement the required interfaces.");
        if (value === void 0) return;
        const {
            fieldName: parentFieldName,
            attributeName,
            attribute,
            codec,
            expression
          } = $where.extensions.pgFilterAttribute,
          sourceAlias = attribute ? attribute.expression ? attribute.expression($where.alias) : sql`${$where.alias}.${sql.identifier(attributeName)}` : expression ? expression : $where.alias,
          sourceCodec = codec ?? attribute.codec,
          [sqlIdentifier, identifierCodec] = resolveSqlIdentifier13 ? resolveSqlIdentifier13(sourceAlias, sourceCodec) : [sourceAlias, sourceCodec];
        if (true && value === null) return;
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const resolvedInput = value,
          inputCodec = resolveInputCodec16 ? resolveInputCodec16(codec ?? attribute.codec) : codec ?? attribute.codec,
          sqlValue = sqlValueWithCodec(resolvedInput, inputCodec),
          fragment = resolve37(sqlIdentifier, sqlValue, value, $where, {
            fieldName: parentFieldName ?? null,
            operatorName: "greaterThan"
          });
        $where.where(fragment);
      },
      greaterThanOrEqualTo($where, value) {
        if (!$where.extensions?.pgFilterAttribute) throw Error("Planning error: expected 'pgFilterAttribute' to be present on the $where plan's extensions; your extensions to `postgraphile-plugin-connection-filter` does not implement the required interfaces.");
        if (value === void 0) return;
        const {
            fieldName: parentFieldName,
            attributeName,
            attribute,
            codec,
            expression
          } = $where.extensions.pgFilterAttribute,
          sourceAlias = attribute ? attribute.expression ? attribute.expression($where.alias) : sql`${$where.alias}.${sql.identifier(attributeName)}` : expression ? expression : $where.alias,
          sourceCodec = codec ?? attribute.codec,
          [sqlIdentifier, identifierCodec] = resolveSqlIdentifier13 ? resolveSqlIdentifier13(sourceAlias, sourceCodec) : [sourceAlias, sourceCodec];
        if (true && value === null) return;
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const resolvedInput = value,
          inputCodec = resolveInputCodec16 ? resolveInputCodec16(codec ?? attribute.codec) : codec ?? attribute.codec,
          sqlValue = sqlValueWithCodec(resolvedInput, inputCodec),
          fragment = resolve38(sqlIdentifier, sqlValue, value, $where, {
            fieldName: parentFieldName ?? null,
            operatorName: "greaterThanOrEqualTo"
          });
        $where.where(fragment);
      },
      in($where, value) {
        if (!$where.extensions?.pgFilterAttribute) throw Error("Planning error: expected 'pgFilterAttribute' to be present on the $where plan's extensions; your extensions to `postgraphile-plugin-connection-filter` does not implement the required interfaces.");
        if (value === void 0) return;
        const {
            fieldName: parentFieldName,
            attributeName,
            attribute,
            codec,
            expression
          } = $where.extensions.pgFilterAttribute,
          sourceAlias = attribute ? attribute.expression ? attribute.expression($where.alias) : sql`${$where.alias}.${sql.identifier(attributeName)}` : expression ? expression : $where.alias,
          sourceCodec = codec ?? attribute.codec,
          [sqlIdentifier, identifierCodec] = resolveSqlIdentifier13 ? resolveSqlIdentifier13(sourceAlias, sourceCodec) : [sourceAlias, sourceCodec];
        if (true && value === null) return;
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const resolvedInput = value,
          inputCodec = resolveInputCodec17 ? resolveInputCodec17(codec ?? attribute.codec) : codec ?? attribute.codec,
          sqlValue = sqlValueWithCodec(resolvedInput, inputCodec),
          fragment = resolve33(sqlIdentifier, sqlValue, value, $where, {
            fieldName: parentFieldName ?? null,
            operatorName: "in"
          });
        $where.where(fragment);
      },
      isNull($where, value) {
        if (!$where.extensions?.pgFilterAttribute) throw Error("Planning error: expected 'pgFilterAttribute' to be present on the $where plan's extensions; your extensions to `postgraphile-plugin-connection-filter` does not implement the required interfaces.");
        if (value === void 0) return;
        const {
            fieldName: parentFieldName,
            attributeName,
            attribute,
            codec,
            expression
          } = $where.extensions.pgFilterAttribute,
          sourceAlias = attribute ? attribute.expression ? attribute.expression($where.alias) : sql`${$where.alias}.${sql.identifier(attributeName)}` : expression ? expression : $where.alias,
          sourceCodec = codec ?? attribute.codec,
          [sqlIdentifier, identifierCodec] = [sourceAlias, sourceCodec];
        if (true && value === null) return;
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const resolvedInput = value,
          inputCodec = resolveInputCodec15 ? resolveInputCodec15(codec ?? attribute.codec) : codec ?? attribute.codec,
          sqlValue = resolveSqlValue12 ? resolveSqlValue12($where, value, inputCodec) : sqlValueWithCodec(resolvedInput, inputCodec),
          fragment = resolve28(sqlIdentifier, sqlValue, value, $where, {
            fieldName: parentFieldName ?? null,
            operatorName: "isNull"
          });
        $where.where(fragment);
      },
      lessThan($where, value) {
        if (!$where.extensions?.pgFilterAttribute) throw Error("Planning error: expected 'pgFilterAttribute' to be present on the $where plan's extensions; your extensions to `postgraphile-plugin-connection-filter` does not implement the required interfaces.");
        if (value === void 0) return;
        const {
            fieldName: parentFieldName,
            attributeName,
            attribute,
            codec,
            expression
          } = $where.extensions.pgFilterAttribute,
          sourceAlias = attribute ? attribute.expression ? attribute.expression($where.alias) : sql`${$where.alias}.${sql.identifier(attributeName)}` : expression ? expression : $where.alias,
          sourceCodec = codec ?? attribute.codec,
          [sqlIdentifier, identifierCodec] = resolveSqlIdentifier13 ? resolveSqlIdentifier13(sourceAlias, sourceCodec) : [sourceAlias, sourceCodec];
        if (true && value === null) return;
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const resolvedInput = value,
          inputCodec = resolveInputCodec16 ? resolveInputCodec16(codec ?? attribute.codec) : codec ?? attribute.codec,
          sqlValue = sqlValueWithCodec(resolvedInput, inputCodec),
          fragment = resolve35(sqlIdentifier, sqlValue, value, $where, {
            fieldName: parentFieldName ?? null,
            operatorName: "lessThan"
          });
        $where.where(fragment);
      },
      lessThanOrEqualTo($where, value) {
        if (!$where.extensions?.pgFilterAttribute) throw Error("Planning error: expected 'pgFilterAttribute' to be present on the $where plan's extensions; your extensions to `postgraphile-plugin-connection-filter` does not implement the required interfaces.");
        if (value === void 0) return;
        const {
            fieldName: parentFieldName,
            attributeName,
            attribute,
            codec,
            expression
          } = $where.extensions.pgFilterAttribute,
          sourceAlias = attribute ? attribute.expression ? attribute.expression($where.alias) : sql`${$where.alias}.${sql.identifier(attributeName)}` : expression ? expression : $where.alias,
          sourceCodec = codec ?? attribute.codec,
          [sqlIdentifier, identifierCodec] = resolveSqlIdentifier13 ? resolveSqlIdentifier13(sourceAlias, sourceCodec) : [sourceAlias, sourceCodec];
        if (true && value === null) return;
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const resolvedInput = value,
          inputCodec = resolveInputCodec16 ? resolveInputCodec16(codec ?? attribute.codec) : codec ?? attribute.codec,
          sqlValue = sqlValueWithCodec(resolvedInput, inputCodec),
          fragment = resolve36(sqlIdentifier, sqlValue, value, $where, {
            fieldName: parentFieldName ?? null,
            operatorName: "lessThanOrEqualTo"
          });
        $where.where(fragment);
      },
      notDistinctFrom($where, value) {
        if (!$where.extensions?.pgFilterAttribute) throw Error("Planning error: expected 'pgFilterAttribute' to be present on the $where plan's extensions; your extensions to `postgraphile-plugin-connection-filter` does not implement the required interfaces.");
        if (value === void 0) return;
        const {
            fieldName: parentFieldName,
            attributeName,
            attribute,
            codec,
            expression
          } = $where.extensions.pgFilterAttribute,
          sourceAlias = attribute ? attribute.expression ? attribute.expression($where.alias) : sql`${$where.alias}.${sql.identifier(attributeName)}` : expression ? expression : $where.alias,
          sourceCodec = codec ?? attribute.codec,
          [sqlIdentifier, identifierCodec] = resolveSqlIdentifier13 ? resolveSqlIdentifier13(sourceAlias, sourceCodec) : [sourceAlias, sourceCodec];
        if (true && value === null) return;
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const resolvedInput = value,
          inputCodec = resolveInputCodec16 ? resolveInputCodec16(codec ?? attribute.codec) : codec ?? attribute.codec,
          sqlValue = sqlValueWithCodec(resolvedInput, inputCodec),
          fragment = resolve32(sqlIdentifier, sqlValue, value, $where, {
            fieldName: parentFieldName ?? null,
            operatorName: "notDistinctFrom"
          });
        $where.where(fragment);
      },
      notEqualTo($where, value) {
        if (!$where.extensions?.pgFilterAttribute) throw Error("Planning error: expected 'pgFilterAttribute' to be present on the $where plan's extensions; your extensions to `postgraphile-plugin-connection-filter` does not implement the required interfaces.");
        if (value === void 0) return;
        const {
            fieldName: parentFieldName,
            attributeName,
            attribute,
            codec,
            expression
          } = $where.extensions.pgFilterAttribute,
          sourceAlias = attribute ? attribute.expression ? attribute.expression($where.alias) : sql`${$where.alias}.${sql.identifier(attributeName)}` : expression ? expression : $where.alias,
          sourceCodec = codec ?? attribute.codec,
          [sqlIdentifier, identifierCodec] = resolveSqlIdentifier13 ? resolveSqlIdentifier13(sourceAlias, sourceCodec) : [sourceAlias, sourceCodec];
        if (true && value === null) return;
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const resolvedInput = value,
          inputCodec = resolveInputCodec16 ? resolveInputCodec16(codec ?? attribute.codec) : codec ?? attribute.codec,
          sqlValue = sqlValueWithCodec(resolvedInput, inputCodec),
          fragment = resolve30(sqlIdentifier, sqlValue, value, $where, {
            fieldName: parentFieldName ?? null,
            operatorName: "notEqualTo"
          });
        $where.where(fragment);
      },
      notIn($where, value) {
        if (!$where.extensions?.pgFilterAttribute) throw Error("Planning error: expected 'pgFilterAttribute' to be present on the $where plan's extensions; your extensions to `postgraphile-plugin-connection-filter` does not implement the required interfaces.");
        if (value === void 0) return;
        const {
            fieldName: parentFieldName,
            attributeName,
            attribute,
            codec,
            expression
          } = $where.extensions.pgFilterAttribute,
          sourceAlias = attribute ? attribute.expression ? attribute.expression($where.alias) : sql`${$where.alias}.${sql.identifier(attributeName)}` : expression ? expression : $where.alias,
          sourceCodec = codec ?? attribute.codec,
          [sqlIdentifier, identifierCodec] = resolveSqlIdentifier13 ? resolveSqlIdentifier13(sourceAlias, sourceCodec) : [sourceAlias, sourceCodec];
        if (true && value === null) return;
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const resolvedInput = value,
          inputCodec = resolveInputCodec17 ? resolveInputCodec17(codec ?? attribute.codec) : codec ?? attribute.codec,
          sqlValue = sqlValueWithCodec(resolvedInput, inputCodec),
          fragment = resolve34(sqlIdentifier, sqlValue, value, $where, {
            fieldName: parentFieldName ?? null,
            operatorName: "notIn"
          });
        $where.where(fragment);
      }
    }
  },
  DeleteAccountByIdInput: {
    plans: {
      clientMutationId(qb, val) {
        qb.setMeta("clientMutationId", val);
      }
    }
  },
  DeleteAccountInput: {
    plans: {
      clientMutationId(qb, val) {
        qb.setMeta("clientMutationId", val);
      }
    }
  },
  DeleteSessionByIdInput: {
    plans: {
      clientMutationId(qb, val) {
        qb.setMeta("clientMutationId", val);
      }
    }
  },
  DeleteSessionByTokenInput: {
    plans: {
      clientMutationId(qb, val) {
        qb.setMeta("clientMutationId", val);
      }
    }
  },
  DeleteSessionInput: {
    plans: {
      clientMutationId(qb, val) {
        qb.setMeta("clientMutationId", val);
      }
    }
  },
  DeleteTaskByIdInput: {
    plans: {
      clientMutationId(qb, val) {
        qb.setMeta("clientMutationId", val);
      }
    }
  },
  DeleteTaskInput: {
    plans: {
      clientMutationId(qb, val) {
        qb.setMeta("clientMutationId", val);
      }
    }
  },
  DeleteUserByEmailInput: {
    plans: {
      clientMutationId(qb, val) {
        qb.setMeta("clientMutationId", val);
      }
    }
  },
  DeleteUserByIdInput: {
    plans: {
      clientMutationId(qb, val) {
        qb.setMeta("clientMutationId", val);
      }
    }
  },
  DeleteUserInput: {
    plans: {
      clientMutationId(qb, val) {
        qb.setMeta("clientMutationId", val);
      }
    }
  },
  DeleteVerificationByIdInput: {
    plans: {
      clientMutationId(qb, val) {
        qb.setMeta("clientMutationId", val);
      }
    }
  },
  DeleteVerificationInput: {
    plans: {
      clientMutationId(qb, val) {
        qb.setMeta("clientMutationId", val);
      }
    }
  },
  SessionCondition: {
    plans: {
      createdAt($condition, val) {
        $condition.where({
          type: "attribute",
          attribute: "createdAt",
          callback(expression) {
            return val === null ? sql`${expression} is null` : sql`${expression} = ${sqlValueWithCodec(val, TYPES.timestamptz)}`;
          }
        });
      },
      expiresAt($condition, val) {
        $condition.where({
          type: "attribute",
          attribute: "expires_at",
          callback(expression) {
            return val === null ? sql`${expression} is null` : sql`${expression} = ${sqlValueWithCodec(val, TYPES.timestamp)}`;
          }
        });
      },
      ipAddress($condition, val) {
        $condition.where({
          type: "attribute",
          attribute: "ip_address",
          callback(expression) {
            return val === null ? sql`${expression} is null` : sql`${expression} = ${sqlValueWithCodec(val, TYPES.text)}`;
          }
        });
      },
      rowId($condition, val) {
        $condition.where({
          type: "attribute",
          attribute: "id",
          callback(expression) {
            return val === null ? sql`${expression} is null` : sql`${expression} = ${sqlValueWithCodec(val, TYPES.text)}`;
          }
        });
      },
      token($condition, val) {
        $condition.where({
          type: "attribute",
          attribute: "token",
          callback(expression) {
            return val === null ? sql`${expression} is null` : sql`${expression} = ${sqlValueWithCodec(val, TYPES.text)}`;
          }
        });
      },
      updatedAt($condition, val) {
        $condition.where({
          type: "attribute",
          attribute: "updatedAt",
          callback(expression) {
            return val === null ? sql`${expression} is null` : sql`${expression} = ${sqlValueWithCodec(val, TYPES.timestamptz)}`;
          }
        });
      },
      userAgent($condition, val) {
        $condition.where({
          type: "attribute",
          attribute: "user_agent",
          callback(expression) {
            return val === null ? sql`${expression} is null` : sql`${expression} = ${sqlValueWithCodec(val, TYPES.text)}`;
          }
        });
      },
      userId($condition, val) {
        $condition.where({
          type: "attribute",
          attribute: "user_id",
          callback(expression) {
            return val === null ? sql`${expression} is null` : sql`${expression} = ${sqlValueWithCodec(val, TYPES.text)}`;
          }
        });
      }
    }
  },
  SessionFilter: {
    plans: {
      and($where, value) {
        assertAllowed16(value, "list");
        if (value == null) return;
        return $where.andPlan();
      },
      createdAt(queryBuilder, value) {
        if (value === void 0) return;
        if (!true && isEmpty(value)) throw Object.assign(Error("Empty objects are forbidden in filter argument input."), {});
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const condition = new PgCondition(queryBuilder);
        condition.extensions.pgFilterAttribute = colSpec24;
        return condition;
      },
      expiresAt(queryBuilder, value) {
        if (value === void 0) return;
        if (!true && isEmpty(value)) throw Object.assign(Error("Empty objects are forbidden in filter argument input."), {});
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const condition = new PgCondition(queryBuilder);
        condition.extensions.pgFilterAttribute = colSpec22;
        return condition;
      },
      ipAddress(queryBuilder, value) {
        if (value === void 0) return;
        if (!true && isEmpty(value)) throw Object.assign(Error("Empty objects are forbidden in filter argument input."), {});
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const condition = new PgCondition(queryBuilder);
        condition.extensions.pgFilterAttribute = colSpec26;
        return condition;
      },
      not($where, value) {
        assertAllowed16(value, "object");
        if (value == null) return;
        return $where.notPlan().andPlan();
      },
      or($where, value) {
        assertAllowed16(value, "list");
        if (value == null) return;
        const $or = $where.orPlan();
        return () => $or.andPlan();
      },
      rowId(queryBuilder, value) {
        if (value === void 0) return;
        if (!true && isEmpty(value)) throw Object.assign(Error("Empty objects are forbidden in filter argument input."), {});
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const condition = new PgCondition(queryBuilder);
        condition.extensions.pgFilterAttribute = colSpec21;
        return condition;
      },
      token(queryBuilder, value) {
        if (value === void 0) return;
        if (!true && isEmpty(value)) throw Object.assign(Error("Empty objects are forbidden in filter argument input."), {});
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const condition = new PgCondition(queryBuilder);
        condition.extensions.pgFilterAttribute = colSpec23;
        return condition;
      },
      updatedAt(queryBuilder, value) {
        if (value === void 0) return;
        if (!true && isEmpty(value)) throw Object.assign(Error("Empty objects are forbidden in filter argument input."), {});
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const condition = new PgCondition(queryBuilder);
        condition.extensions.pgFilterAttribute = colSpec25;
        return condition;
      },
      user($where, value) {
        assertAllowed15(value, "object");
        if (value == null) return;
        const $subQuery = $where.existsPlan({
          tableExpression: userIdentifier,
          alias: resource_userPgResource.name
        });
        registryConfig.pgRelations.session.userByMyUserId.localAttributes.forEach((localAttribute, i) => {
          const remoteAttribute = registryConfig.pgRelations.session.userByMyUserId.remoteAttributes[i];
          $subQuery.where(sql`${$where.alias}.${sql.identifier(localAttribute)} = ${$subQuery.alias}.${sql.identifier(remoteAttribute)}`);
        });
        return $subQuery;
      },
      userAgent(queryBuilder, value) {
        if (value === void 0) return;
        if (!true && isEmpty(value)) throw Object.assign(Error("Empty objects are forbidden in filter argument input."), {});
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const condition = new PgCondition(queryBuilder);
        condition.extensions.pgFilterAttribute = colSpec27;
        return condition;
      },
      userId(queryBuilder, value) {
        if (value === void 0) return;
        if (!true && isEmpty(value)) throw Object.assign(Error("Empty objects are forbidden in filter argument input."), {});
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const condition = new PgCondition(queryBuilder);
        condition.extensions.pgFilterAttribute = colSpec28;
        return condition;
      }
    }
  },
  SessionInput: {
    baked: createObjectAndApplyChildren,
    plans: {
      createdAt(obj, val, {
        field,
        schema
      }) {
        obj.set("createdAt", bakedInputRuntime(schema, field.type, val));
      },
      expiresAt(obj, val, {
        field,
        schema
      }) {
        obj.set("expires_at", bakedInputRuntime(schema, field.type, val));
      },
      ipAddress(obj, val, {
        field,
        schema
      }) {
        obj.set("ip_address", bakedInputRuntime(schema, field.type, val));
      },
      rowId(obj, val, {
        field,
        schema
      }) {
        obj.set("id", bakedInputRuntime(schema, field.type, val));
      },
      token(obj, val, {
        field,
        schema
      }) {
        obj.set("token", bakedInputRuntime(schema, field.type, val));
      },
      updatedAt(obj, val, {
        field,
        schema
      }) {
        obj.set("updatedAt", bakedInputRuntime(schema, field.type, val));
      },
      userAgent(obj, val, {
        field,
        schema
      }) {
        obj.set("user_agent", bakedInputRuntime(schema, field.type, val));
      },
      userId(obj, val, {
        field,
        schema
      }) {
        obj.set("user_id", bakedInputRuntime(schema, field.type, val));
      }
    }
  },
  SessionPatch: {
    baked: createObjectAndApplyChildren,
    plans: {
      createdAt(obj, val, {
        field,
        schema
      }) {
        obj.set("createdAt", bakedInputRuntime(schema, field.type, val));
      },
      expiresAt(obj, val, {
        field,
        schema
      }) {
        obj.set("expires_at", bakedInputRuntime(schema, field.type, val));
      },
      ipAddress(obj, val, {
        field,
        schema
      }) {
        obj.set("ip_address", bakedInputRuntime(schema, field.type, val));
      },
      rowId(obj, val, {
        field,
        schema
      }) {
        obj.set("id", bakedInputRuntime(schema, field.type, val));
      },
      token(obj, val, {
        field,
        schema
      }) {
        obj.set("token", bakedInputRuntime(schema, field.type, val));
      },
      updatedAt(obj, val, {
        field,
        schema
      }) {
        obj.set("updatedAt", bakedInputRuntime(schema, field.type, val));
      },
      userAgent(obj, val, {
        field,
        schema
      }) {
        obj.set("user_agent", bakedInputRuntime(schema, field.type, val));
      },
      userId(obj, val, {
        field,
        schema
      }) {
        obj.set("user_id", bakedInputRuntime(schema, field.type, val));
      }
    }
  },
  StringFilter: {
    plans: {
      distinctFrom($where, value) {
        if (!$where.extensions?.pgFilterAttribute) throw Error("Planning error: expected 'pgFilterAttribute' to be present on the $where plan's extensions; your extensions to `postgraphile-plugin-connection-filter` does not implement the required interfaces.");
        if (value === void 0) return;
        const {
            fieldName: parentFieldName,
            attributeName,
            attribute,
            codec,
            expression
          } = $where.extensions.pgFilterAttribute,
          sourceAlias = attribute ? attribute.expression ? attribute.expression($where.alias) : sql`${$where.alias}.${sql.identifier(attributeName)}` : expression ? expression : $where.alias,
          sourceCodec = codec ?? attribute.codec,
          [sqlIdentifier, identifierCodec] = resolveSqlIdentifier ? resolveSqlIdentifier(sourceAlias, sourceCodec) : [sourceAlias, sourceCodec];
        if (true && value === null) return;
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const resolvedInput = value,
          inputCodec = resolveInputCodec2 ? resolveInputCodec2(codec ?? attribute.codec) : codec ?? attribute.codec,
          sqlValue = sqlValueWithCodec(resolvedInput, inputCodec),
          fragment = resolve4(sqlIdentifier, sqlValue, value, $where, {
            fieldName: parentFieldName ?? null,
            operatorName: "distinctFrom"
          });
        $where.where(fragment);
      },
      distinctFromInsensitive($where, value) {
        if (!$where.extensions?.pgFilterAttribute) throw Error("Planning error: expected 'pgFilterAttribute' to be present on the $where plan's extensions; your extensions to `postgraphile-plugin-connection-filter` does not implement the required interfaces.");
        if (value === void 0) return;
        const {
            fieldName: parentFieldName,
            attributeName,
            attribute,
            codec,
            expression
          } = $where.extensions.pgFilterAttribute,
          sourceAlias = attribute ? attribute.expression ? attribute.expression($where.alias) : sql`${$where.alias}.${sql.identifier(attributeName)}` : expression ? expression : $where.alias,
          sourceCodec = codec ?? attribute.codec,
          [sqlIdentifier, identifierCodec] = resolveSqlIdentifier5 ? resolveSqlIdentifier5(sourceAlias, sourceCodec) : [sourceAlias, sourceCodec];
        if (true && value === null) return;
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const resolvedInput = value,
          inputCodec = resolveInputCodec7 ? resolveInputCodec7(codec ?? attribute.codec) : codec ?? attribute.codec,
          sqlValue = resolveSqlValue4 ? resolveSqlValue4($where, value, inputCodec) : sqlValueWithCodec(resolvedInput, inputCodec),
          fragment = resolve4(sqlIdentifier, sqlValue, value, $where, {
            fieldName: parentFieldName ?? null,
            operatorName: "distinctFromInsensitive"
          });
        $where.where(fragment);
      },
      endsWith($where, value) {
        if (!$where.extensions?.pgFilterAttribute) throw Error("Planning error: expected 'pgFilterAttribute' to be present on the $where plan's extensions; your extensions to `postgraphile-plugin-connection-filter` does not implement the required interfaces.");
        if (value === void 0) return;
        const {
            fieldName: parentFieldName,
            attributeName,
            attribute,
            codec,
            expression
          } = $where.extensions.pgFilterAttribute,
          sourceAlias = attribute ? attribute.expression ? attribute.expression($where.alias) : sql`${$where.alias}.${sql.identifier(attributeName)}` : expression ? expression : $where.alias,
          sourceCodec = codec ?? attribute.codec,
          [sqlIdentifier, identifierCodec] = resolveSqlIdentifier ? resolveSqlIdentifier(sourceAlias, sourceCodec) : [sourceAlias, sourceCodec];
        if (true && value === null) return;
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const resolvedInput = resolveInput9 ? resolveInput9(value) : value,
          inputCodec = resolveInputCodec2 ? resolveInputCodec2(codec ?? attribute.codec) : codec ?? attribute.codec,
          sqlValue = sqlValueWithCodec(resolvedInput, inputCodec),
          fragment = resolve20(sqlIdentifier, sqlValue, value, $where, {
            fieldName: parentFieldName ?? null,
            operatorName: "endsWith"
          });
        $where.where(fragment);
      },
      endsWithInsensitive($where, value) {
        if (!$where.extensions?.pgFilterAttribute) throw Error("Planning error: expected 'pgFilterAttribute' to be present on the $where plan's extensions; your extensions to `postgraphile-plugin-connection-filter` does not implement the required interfaces.");
        if (value === void 0) return;
        const {
            fieldName: parentFieldName,
            attributeName,
            attribute,
            codec,
            expression
          } = $where.extensions.pgFilterAttribute,
          sourceAlias = attribute ? attribute.expression ? attribute.expression($where.alias) : sql`${$where.alias}.${sql.identifier(attributeName)}` : expression ? expression : $where.alias,
          sourceCodec = codec ?? attribute.codec,
          [sqlIdentifier, identifierCodec] = resolveSqlIdentifier2 ? resolveSqlIdentifier2(sourceAlias, sourceCodec) : [sourceAlias, sourceCodec];
        if (true && value === null) return;
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const resolvedInput = resolveInput11 ? resolveInput11(value) : value,
          inputCodec = resolveInputCodec4 ? resolveInputCodec4(codec ?? attribute.codec) : codec ?? attribute.codec,
          sqlValue = sqlValueWithCodec(resolvedInput, inputCodec),
          fragment = resolve22(sqlIdentifier, sqlValue, value, $where, {
            fieldName: parentFieldName ?? null,
            operatorName: "endsWithInsensitive"
          });
        $where.where(fragment);
      },
      equalTo($where, value) {
        if (!$where.extensions?.pgFilterAttribute) throw Error("Planning error: expected 'pgFilterAttribute' to be present on the $where plan's extensions; your extensions to `postgraphile-plugin-connection-filter` does not implement the required interfaces.");
        if (value === void 0) return;
        const {
            fieldName: parentFieldName,
            attributeName,
            attribute,
            codec,
            expression
          } = $where.extensions.pgFilterAttribute,
          sourceAlias = attribute ? attribute.expression ? attribute.expression($where.alias) : sql`${$where.alias}.${sql.identifier(attributeName)}` : expression ? expression : $where.alias,
          sourceCodec = codec ?? attribute.codec,
          [sqlIdentifier, identifierCodec] = resolveSqlIdentifier ? resolveSqlIdentifier(sourceAlias, sourceCodec) : [sourceAlias, sourceCodec];
        if (true && value === null) return;
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const resolvedInput = value,
          inputCodec = resolveInputCodec2 ? resolveInputCodec2(codec ?? attribute.codec) : codec ?? attribute.codec,
          sqlValue = sqlValueWithCodec(resolvedInput, inputCodec),
          fragment = resolve2(sqlIdentifier, sqlValue, value, $where, {
            fieldName: parentFieldName ?? null,
            operatorName: "equalTo"
          });
        $where.where(fragment);
      },
      equalToInsensitive($where, value) {
        if (!$where.extensions?.pgFilterAttribute) throw Error("Planning error: expected 'pgFilterAttribute' to be present on the $where plan's extensions; your extensions to `postgraphile-plugin-connection-filter` does not implement the required interfaces.");
        if (value === void 0) return;
        const {
            fieldName: parentFieldName,
            attributeName,
            attribute,
            codec,
            expression
          } = $where.extensions.pgFilterAttribute,
          sourceAlias = attribute ? attribute.expression ? attribute.expression($where.alias) : sql`${$where.alias}.${sql.identifier(attributeName)}` : expression ? expression : $where.alias,
          sourceCodec = codec ?? attribute.codec,
          [sqlIdentifier, identifierCodec] = resolveSqlIdentifier3 ? resolveSqlIdentifier3(sourceAlias, sourceCodec) : [sourceAlias, sourceCodec];
        if (true && value === null) return;
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const resolvedInput = value,
          inputCodec = resolveInputCodec5 ? resolveInputCodec5(codec ?? attribute.codec) : codec ?? attribute.codec,
          sqlValue = resolveSqlValue2 ? resolveSqlValue2($where, value, inputCodec) : sqlValueWithCodec(resolvedInput, inputCodec),
          fragment = resolve2(sqlIdentifier, sqlValue, value, $where, {
            fieldName: parentFieldName ?? null,
            operatorName: "equalToInsensitive"
          });
        $where.where(fragment);
      },
      greaterThan($where, value) {
        if (!$where.extensions?.pgFilterAttribute) throw Error("Planning error: expected 'pgFilterAttribute' to be present on the $where plan's extensions; your extensions to `postgraphile-plugin-connection-filter` does not implement the required interfaces.");
        if (value === void 0) return;
        const {
            fieldName: parentFieldName,
            attributeName,
            attribute,
            codec,
            expression
          } = $where.extensions.pgFilterAttribute,
          sourceAlias = attribute ? attribute.expression ? attribute.expression($where.alias) : sql`${$where.alias}.${sql.identifier(attributeName)}` : expression ? expression : $where.alias,
          sourceCodec = codec ?? attribute.codec,
          [sqlIdentifier, identifierCodec] = resolveSqlIdentifier ? resolveSqlIdentifier(sourceAlias, sourceCodec) : [sourceAlias, sourceCodec];
        if (true && value === null) return;
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const resolvedInput = value,
          inputCodec = resolveInputCodec2 ? resolveInputCodec2(codec ?? attribute.codec) : codec ?? attribute.codec,
          sqlValue = sqlValueWithCodec(resolvedInput, inputCodec),
          fragment = resolve10(sqlIdentifier, sqlValue, value, $where, {
            fieldName: parentFieldName ?? null,
            operatorName: "greaterThan"
          });
        $where.where(fragment);
      },
      greaterThanInsensitive($where, value) {
        if (!$where.extensions?.pgFilterAttribute) throw Error("Planning error: expected 'pgFilterAttribute' to be present on the $where plan's extensions; your extensions to `postgraphile-plugin-connection-filter` does not implement the required interfaces.");
        if (value === void 0) return;
        const {
            fieldName: parentFieldName,
            attributeName,
            attribute,
            codec,
            expression
          } = $where.extensions.pgFilterAttribute,
          sourceAlias = attribute ? attribute.expression ? attribute.expression($where.alias) : sql`${$where.alias}.${sql.identifier(attributeName)}` : expression ? expression : $where.alias,
          sourceCodec = codec ?? attribute.codec,
          [sqlIdentifier, identifierCodec] = resolveSqlIdentifier11 ? resolveSqlIdentifier11(sourceAlias, sourceCodec) : [sourceAlias, sourceCodec];
        if (true && value === null) return;
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const resolvedInput = value,
          inputCodec = resolveInputCodec13 ? resolveInputCodec13(codec ?? attribute.codec) : codec ?? attribute.codec,
          sqlValue = resolveSqlValue10 ? resolveSqlValue10($where, value, inputCodec) : sqlValueWithCodec(resolvedInput, inputCodec),
          fragment = resolve10(sqlIdentifier, sqlValue, value, $where, {
            fieldName: parentFieldName ?? null,
            operatorName: "greaterThanInsensitive"
          });
        $where.where(fragment);
      },
      greaterThanOrEqualTo($where, value) {
        if (!$where.extensions?.pgFilterAttribute) throw Error("Planning error: expected 'pgFilterAttribute' to be present on the $where plan's extensions; your extensions to `postgraphile-plugin-connection-filter` does not implement the required interfaces.");
        if (value === void 0) return;
        const {
            fieldName: parentFieldName,
            attributeName,
            attribute,
            codec,
            expression
          } = $where.extensions.pgFilterAttribute,
          sourceAlias = attribute ? attribute.expression ? attribute.expression($where.alias) : sql`${$where.alias}.${sql.identifier(attributeName)}` : expression ? expression : $where.alias,
          sourceCodec = codec ?? attribute.codec,
          [sqlIdentifier, identifierCodec] = resolveSqlIdentifier ? resolveSqlIdentifier(sourceAlias, sourceCodec) : [sourceAlias, sourceCodec];
        if (true && value === null) return;
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const resolvedInput = value,
          inputCodec = resolveInputCodec2 ? resolveInputCodec2(codec ?? attribute.codec) : codec ?? attribute.codec,
          sqlValue = sqlValueWithCodec(resolvedInput, inputCodec),
          fragment = resolve11(sqlIdentifier, sqlValue, value, $where, {
            fieldName: parentFieldName ?? null,
            operatorName: "greaterThanOrEqualTo"
          });
        $where.where(fragment);
      },
      greaterThanOrEqualToInsensitive($where, value) {
        if (!$where.extensions?.pgFilterAttribute) throw Error("Planning error: expected 'pgFilterAttribute' to be present on the $where plan's extensions; your extensions to `postgraphile-plugin-connection-filter` does not implement the required interfaces.");
        if (value === void 0) return;
        const {
            fieldName: parentFieldName,
            attributeName,
            attribute,
            codec,
            expression
          } = $where.extensions.pgFilterAttribute,
          sourceAlias = attribute ? attribute.expression ? attribute.expression($where.alias) : sql`${$where.alias}.${sql.identifier(attributeName)}` : expression ? expression : $where.alias,
          sourceCodec = codec ?? attribute.codec,
          [sqlIdentifier, identifierCodec] = resolveSqlIdentifier12 ? resolveSqlIdentifier12(sourceAlias, sourceCodec) : [sourceAlias, sourceCodec];
        if (true && value === null) return;
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const resolvedInput = value,
          inputCodec = resolveInputCodec14 ? resolveInputCodec14(codec ?? attribute.codec) : codec ?? attribute.codec,
          sqlValue = resolveSqlValue11 ? resolveSqlValue11($where, value, inputCodec) : sqlValueWithCodec(resolvedInput, inputCodec),
          fragment = resolve11(sqlIdentifier, sqlValue, value, $where, {
            fieldName: parentFieldName ?? null,
            operatorName: "greaterThanOrEqualToInsensitive"
          });
        $where.where(fragment);
      },
      in($where, value) {
        if (!$where.extensions?.pgFilterAttribute) throw Error("Planning error: expected 'pgFilterAttribute' to be present on the $where plan's extensions; your extensions to `postgraphile-plugin-connection-filter` does not implement the required interfaces.");
        if (value === void 0) return;
        const {
            fieldName: parentFieldName,
            attributeName,
            attribute,
            codec,
            expression
          } = $where.extensions.pgFilterAttribute,
          sourceAlias = attribute ? attribute.expression ? attribute.expression($where.alias) : sql`${$where.alias}.${sql.identifier(attributeName)}` : expression ? expression : $where.alias,
          sourceCodec = codec ?? attribute.codec,
          [sqlIdentifier, identifierCodec] = resolveSqlIdentifier ? resolveSqlIdentifier(sourceAlias, sourceCodec) : [sourceAlias, sourceCodec];
        if (true && value === null) return;
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const resolvedInput = value,
          inputCodec = resolveInputCodec3 ? resolveInputCodec3(codec ?? attribute.codec) : codec ?? attribute.codec,
          sqlValue = sqlValueWithCodec(resolvedInput, inputCodec),
          fragment = resolve6(sqlIdentifier, sqlValue, value, $where, {
            fieldName: parentFieldName ?? null,
            operatorName: "in"
          });
        $where.where(fragment);
      },
      includes($where, value) {
        if (!$where.extensions?.pgFilterAttribute) throw Error("Planning error: expected 'pgFilterAttribute' to be present on the $where plan's extensions; your extensions to `postgraphile-plugin-connection-filter` does not implement the required interfaces.");
        if (value === void 0) return;
        const {
            fieldName: parentFieldName,
            attributeName,
            attribute,
            codec,
            expression
          } = $where.extensions.pgFilterAttribute,
          sourceAlias = attribute ? attribute.expression ? attribute.expression($where.alias) : sql`${$where.alias}.${sql.identifier(attributeName)}` : expression ? expression : $where.alias,
          sourceCodec = codec ?? attribute.codec,
          [sqlIdentifier, identifierCodec] = resolveSqlIdentifier ? resolveSqlIdentifier(sourceAlias, sourceCodec) : [sourceAlias, sourceCodec];
        if (true && value === null) return;
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const resolvedInput = resolveInput ? resolveInput(value) : value,
          inputCodec = resolveInputCodec2 ? resolveInputCodec2(codec ?? attribute.codec) : codec ?? attribute.codec,
          sqlValue = sqlValueWithCodec(resolvedInput, inputCodec),
          fragment = resolve12(sqlIdentifier, sqlValue, value, $where, {
            fieldName: parentFieldName ?? null,
            operatorName: "includes"
          });
        $where.where(fragment);
      },
      includesInsensitive($where, value) {
        if (!$where.extensions?.pgFilterAttribute) throw Error("Planning error: expected 'pgFilterAttribute' to be present on the $where plan's extensions; your extensions to `postgraphile-plugin-connection-filter` does not implement the required interfaces.");
        if (value === void 0) return;
        const {
            fieldName: parentFieldName,
            attributeName,
            attribute,
            codec,
            expression
          } = $where.extensions.pgFilterAttribute,
          sourceAlias = attribute ? attribute.expression ? attribute.expression($where.alias) : sql`${$where.alias}.${sql.identifier(attributeName)}` : expression ? expression : $where.alias,
          sourceCodec = codec ?? attribute.codec,
          [sqlIdentifier, identifierCodec] = resolveSqlIdentifier2 ? resolveSqlIdentifier2(sourceAlias, sourceCodec) : [sourceAlias, sourceCodec];
        if (true && value === null) return;
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const resolvedInput = resolveInput3 ? resolveInput3(value) : value,
          inputCodec = resolveInputCodec4 ? resolveInputCodec4(codec ?? attribute.codec) : codec ?? attribute.codec,
          sqlValue = sqlValueWithCodec(resolvedInput, inputCodec),
          fragment = resolve14(sqlIdentifier, sqlValue, value, $where, {
            fieldName: parentFieldName ?? null,
            operatorName: "includesInsensitive"
          });
        $where.where(fragment);
      },
      inInsensitive($where, value) {
        if (!$where.extensions?.pgFilterAttribute) throw Error("Planning error: expected 'pgFilterAttribute' to be present on the $where plan's extensions; your extensions to `postgraphile-plugin-connection-filter` does not implement the required interfaces.");
        if (value === void 0) return;
        const {
            fieldName: parentFieldName,
            attributeName,
            attribute,
            codec,
            expression
          } = $where.extensions.pgFilterAttribute,
          sourceAlias = attribute ? attribute.expression ? attribute.expression($where.alias) : sql`${$where.alias}.${sql.identifier(attributeName)}` : expression ? expression : $where.alias,
          sourceCodec = codec ?? attribute.codec,
          [sqlIdentifier, identifierCodec] = resolveSqlIdentifier7 ? resolveSqlIdentifier7(sourceAlias, sourceCodec) : [sourceAlias, sourceCodec];
        if (true && value === null) return;
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const resolvedInput = value,
          inputCodec = resolveInputCodec9 ? resolveInputCodec9(codec ?? attribute.codec) : codec ?? attribute.codec,
          sqlValue = resolveSqlValue6 ? resolveSqlValue6($where, value, inputCodec) : sqlValueWithCodec(resolvedInput, inputCodec),
          fragment = resolve6(sqlIdentifier, sqlValue, value, $where, {
            fieldName: parentFieldName ?? null,
            operatorName: "inInsensitive"
          });
        $where.where(fragment);
      },
      isNull($where, value) {
        if (!$where.extensions?.pgFilterAttribute) throw Error("Planning error: expected 'pgFilterAttribute' to be present on the $where plan's extensions; your extensions to `postgraphile-plugin-connection-filter` does not implement the required interfaces.");
        if (value === void 0) return;
        const {
            fieldName: parentFieldName,
            attributeName,
            attribute,
            codec,
            expression
          } = $where.extensions.pgFilterAttribute,
          sourceAlias = attribute ? attribute.expression ? attribute.expression($where.alias) : sql`${$where.alias}.${sql.identifier(attributeName)}` : expression ? expression : $where.alias,
          sourceCodec = codec ?? attribute.codec,
          [sqlIdentifier, identifierCodec] = [sourceAlias, sourceCodec];
        if (true && value === null) return;
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const resolvedInput = value,
          inputCodec = resolveInputCodec ? resolveInputCodec(codec ?? attribute.codec) : codec ?? attribute.codec,
          sqlValue = resolveSqlValue ? resolveSqlValue($where, value, inputCodec) : sqlValueWithCodec(resolvedInput, inputCodec),
          fragment = resolve(sqlIdentifier, sqlValue, value, $where, {
            fieldName: parentFieldName ?? null,
            operatorName: "isNull"
          });
        $where.where(fragment);
      },
      lessThan($where, value) {
        if (!$where.extensions?.pgFilterAttribute) throw Error("Planning error: expected 'pgFilterAttribute' to be present on the $where plan's extensions; your extensions to `postgraphile-plugin-connection-filter` does not implement the required interfaces.");
        if (value === void 0) return;
        const {
            fieldName: parentFieldName,
            attributeName,
            attribute,
            codec,
            expression
          } = $where.extensions.pgFilterAttribute,
          sourceAlias = attribute ? attribute.expression ? attribute.expression($where.alias) : sql`${$where.alias}.${sql.identifier(attributeName)}` : expression ? expression : $where.alias,
          sourceCodec = codec ?? attribute.codec,
          [sqlIdentifier, identifierCodec] = resolveSqlIdentifier ? resolveSqlIdentifier(sourceAlias, sourceCodec) : [sourceAlias, sourceCodec];
        if (true && value === null) return;
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const resolvedInput = value,
          inputCodec = resolveInputCodec2 ? resolveInputCodec2(codec ?? attribute.codec) : codec ?? attribute.codec,
          sqlValue = sqlValueWithCodec(resolvedInput, inputCodec),
          fragment = resolve8(sqlIdentifier, sqlValue, value, $where, {
            fieldName: parentFieldName ?? null,
            operatorName: "lessThan"
          });
        $where.where(fragment);
      },
      lessThanInsensitive($where, value) {
        if (!$where.extensions?.pgFilterAttribute) throw Error("Planning error: expected 'pgFilterAttribute' to be present on the $where plan's extensions; your extensions to `postgraphile-plugin-connection-filter` does not implement the required interfaces.");
        if (value === void 0) return;
        const {
            fieldName: parentFieldName,
            attributeName,
            attribute,
            codec,
            expression
          } = $where.extensions.pgFilterAttribute,
          sourceAlias = attribute ? attribute.expression ? attribute.expression($where.alias) : sql`${$where.alias}.${sql.identifier(attributeName)}` : expression ? expression : $where.alias,
          sourceCodec = codec ?? attribute.codec,
          [sqlIdentifier, identifierCodec] = resolveSqlIdentifier9 ? resolveSqlIdentifier9(sourceAlias, sourceCodec) : [sourceAlias, sourceCodec];
        if (true && value === null) return;
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const resolvedInput = value,
          inputCodec = resolveInputCodec11 ? resolveInputCodec11(codec ?? attribute.codec) : codec ?? attribute.codec,
          sqlValue = resolveSqlValue8 ? resolveSqlValue8($where, value, inputCodec) : sqlValueWithCodec(resolvedInput, inputCodec),
          fragment = resolve8(sqlIdentifier, sqlValue, value, $where, {
            fieldName: parentFieldName ?? null,
            operatorName: "lessThanInsensitive"
          });
        $where.where(fragment);
      },
      lessThanOrEqualTo($where, value) {
        if (!$where.extensions?.pgFilterAttribute) throw Error("Planning error: expected 'pgFilterAttribute' to be present on the $where plan's extensions; your extensions to `postgraphile-plugin-connection-filter` does not implement the required interfaces.");
        if (value === void 0) return;
        const {
            fieldName: parentFieldName,
            attributeName,
            attribute,
            codec,
            expression
          } = $where.extensions.pgFilterAttribute,
          sourceAlias = attribute ? attribute.expression ? attribute.expression($where.alias) : sql`${$where.alias}.${sql.identifier(attributeName)}` : expression ? expression : $where.alias,
          sourceCodec = codec ?? attribute.codec,
          [sqlIdentifier, identifierCodec] = resolveSqlIdentifier ? resolveSqlIdentifier(sourceAlias, sourceCodec) : [sourceAlias, sourceCodec];
        if (true && value === null) return;
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const resolvedInput = value,
          inputCodec = resolveInputCodec2 ? resolveInputCodec2(codec ?? attribute.codec) : codec ?? attribute.codec,
          sqlValue = sqlValueWithCodec(resolvedInput, inputCodec),
          fragment = resolve9(sqlIdentifier, sqlValue, value, $where, {
            fieldName: parentFieldName ?? null,
            operatorName: "lessThanOrEqualTo"
          });
        $where.where(fragment);
      },
      lessThanOrEqualToInsensitive($where, value) {
        if (!$where.extensions?.pgFilterAttribute) throw Error("Planning error: expected 'pgFilterAttribute' to be present on the $where plan's extensions; your extensions to `postgraphile-plugin-connection-filter` does not implement the required interfaces.");
        if (value === void 0) return;
        const {
            fieldName: parentFieldName,
            attributeName,
            attribute,
            codec,
            expression
          } = $where.extensions.pgFilterAttribute,
          sourceAlias = attribute ? attribute.expression ? attribute.expression($where.alias) : sql`${$where.alias}.${sql.identifier(attributeName)}` : expression ? expression : $where.alias,
          sourceCodec = codec ?? attribute.codec,
          [sqlIdentifier, identifierCodec] = resolveSqlIdentifier10 ? resolveSqlIdentifier10(sourceAlias, sourceCodec) : [sourceAlias, sourceCodec];
        if (true && value === null) return;
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const resolvedInput = value,
          inputCodec = resolveInputCodec12 ? resolveInputCodec12(codec ?? attribute.codec) : codec ?? attribute.codec,
          sqlValue = resolveSqlValue9 ? resolveSqlValue9($where, value, inputCodec) : sqlValueWithCodec(resolvedInput, inputCodec),
          fragment = resolve9(sqlIdentifier, sqlValue, value, $where, {
            fieldName: parentFieldName ?? null,
            operatorName: "lessThanOrEqualToInsensitive"
          });
        $where.where(fragment);
      },
      like($where, value) {
        if (!$where.extensions?.pgFilterAttribute) throw Error("Planning error: expected 'pgFilterAttribute' to be present on the $where plan's extensions; your extensions to `postgraphile-plugin-connection-filter` does not implement the required interfaces.");
        if (value === void 0) return;
        const {
            fieldName: parentFieldName,
            attributeName,
            attribute,
            codec,
            expression
          } = $where.extensions.pgFilterAttribute,
          sourceAlias = attribute ? attribute.expression ? attribute.expression($where.alias) : sql`${$where.alias}.${sql.identifier(attributeName)}` : expression ? expression : $where.alias,
          sourceCodec = codec ?? attribute.codec,
          [sqlIdentifier, identifierCodec] = resolveSqlIdentifier ? resolveSqlIdentifier(sourceAlias, sourceCodec) : [sourceAlias, sourceCodec];
        if (true && value === null) return;
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const resolvedInput = value,
          inputCodec = resolveInputCodec2 ? resolveInputCodec2(codec ?? attribute.codec) : codec ?? attribute.codec,
          sqlValue = sqlValueWithCodec(resolvedInput, inputCodec),
          fragment = resolve24(sqlIdentifier, sqlValue, value, $where, {
            fieldName: parentFieldName ?? null,
            operatorName: "like"
          });
        $where.where(fragment);
      },
      likeInsensitive($where, value) {
        if (!$where.extensions?.pgFilterAttribute) throw Error("Planning error: expected 'pgFilterAttribute' to be present on the $where plan's extensions; your extensions to `postgraphile-plugin-connection-filter` does not implement the required interfaces.");
        if (value === void 0) return;
        const {
            fieldName: parentFieldName,
            attributeName,
            attribute,
            codec,
            expression
          } = $where.extensions.pgFilterAttribute,
          sourceAlias = attribute ? attribute.expression ? attribute.expression($where.alias) : sql`${$where.alias}.${sql.identifier(attributeName)}` : expression ? expression : $where.alias,
          sourceCodec = codec ?? attribute.codec,
          [sqlIdentifier, identifierCodec] = resolveSqlIdentifier2 ? resolveSqlIdentifier2(sourceAlias, sourceCodec) : [sourceAlias, sourceCodec];
        if (true && value === null) return;
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const resolvedInput = value,
          inputCodec = resolveInputCodec4 ? resolveInputCodec4(codec ?? attribute.codec) : codec ?? attribute.codec,
          sqlValue = sqlValueWithCodec(resolvedInput, inputCodec),
          fragment = resolve26(sqlIdentifier, sqlValue, value, $where, {
            fieldName: parentFieldName ?? null,
            operatorName: "likeInsensitive"
          });
        $where.where(fragment);
      },
      notDistinctFrom($where, value) {
        if (!$where.extensions?.pgFilterAttribute) throw Error("Planning error: expected 'pgFilterAttribute' to be present on the $where plan's extensions; your extensions to `postgraphile-plugin-connection-filter` does not implement the required interfaces.");
        if (value === void 0) return;
        const {
            fieldName: parentFieldName,
            attributeName,
            attribute,
            codec,
            expression
          } = $where.extensions.pgFilterAttribute,
          sourceAlias = attribute ? attribute.expression ? attribute.expression($where.alias) : sql`${$where.alias}.${sql.identifier(attributeName)}` : expression ? expression : $where.alias,
          sourceCodec = codec ?? attribute.codec,
          [sqlIdentifier, identifierCodec] = resolveSqlIdentifier ? resolveSqlIdentifier(sourceAlias, sourceCodec) : [sourceAlias, sourceCodec];
        if (true && value === null) return;
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const resolvedInput = value,
          inputCodec = resolveInputCodec2 ? resolveInputCodec2(codec ?? attribute.codec) : codec ?? attribute.codec,
          sqlValue = sqlValueWithCodec(resolvedInput, inputCodec),
          fragment = resolve5(sqlIdentifier, sqlValue, value, $where, {
            fieldName: parentFieldName ?? null,
            operatorName: "notDistinctFrom"
          });
        $where.where(fragment);
      },
      notDistinctFromInsensitive($where, value) {
        if (!$where.extensions?.pgFilterAttribute) throw Error("Planning error: expected 'pgFilterAttribute' to be present on the $where plan's extensions; your extensions to `postgraphile-plugin-connection-filter` does not implement the required interfaces.");
        if (value === void 0) return;
        const {
            fieldName: parentFieldName,
            attributeName,
            attribute,
            codec,
            expression
          } = $where.extensions.pgFilterAttribute,
          sourceAlias = attribute ? attribute.expression ? attribute.expression($where.alias) : sql`${$where.alias}.${sql.identifier(attributeName)}` : expression ? expression : $where.alias,
          sourceCodec = codec ?? attribute.codec,
          [sqlIdentifier, identifierCodec] = resolveSqlIdentifier6 ? resolveSqlIdentifier6(sourceAlias, sourceCodec) : [sourceAlias, sourceCodec];
        if (true && value === null) return;
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const resolvedInput = value,
          inputCodec = resolveInputCodec8 ? resolveInputCodec8(codec ?? attribute.codec) : codec ?? attribute.codec,
          sqlValue = resolveSqlValue5 ? resolveSqlValue5($where, value, inputCodec) : sqlValueWithCodec(resolvedInput, inputCodec),
          fragment = resolve5(sqlIdentifier, sqlValue, value, $where, {
            fieldName: parentFieldName ?? null,
            operatorName: "notDistinctFromInsensitive"
          });
        $where.where(fragment);
      },
      notEndsWith($where, value) {
        if (!$where.extensions?.pgFilterAttribute) throw Error("Planning error: expected 'pgFilterAttribute' to be present on the $where plan's extensions; your extensions to `postgraphile-plugin-connection-filter` does not implement the required interfaces.");
        if (value === void 0) return;
        const {
            fieldName: parentFieldName,
            attributeName,
            attribute,
            codec,
            expression
          } = $where.extensions.pgFilterAttribute,
          sourceAlias = attribute ? attribute.expression ? attribute.expression($where.alias) : sql`${$where.alias}.${sql.identifier(attributeName)}` : expression ? expression : $where.alias,
          sourceCodec = codec ?? attribute.codec,
          [sqlIdentifier, identifierCodec] = resolveSqlIdentifier ? resolveSqlIdentifier(sourceAlias, sourceCodec) : [sourceAlias, sourceCodec];
        if (true && value === null) return;
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const resolvedInput = resolveInput10 ? resolveInput10(value) : value,
          inputCodec = resolveInputCodec2 ? resolveInputCodec2(codec ?? attribute.codec) : codec ?? attribute.codec,
          sqlValue = sqlValueWithCodec(resolvedInput, inputCodec),
          fragment = resolve21(sqlIdentifier, sqlValue, value, $where, {
            fieldName: parentFieldName ?? null,
            operatorName: "notEndsWith"
          });
        $where.where(fragment);
      },
      notEndsWithInsensitive($where, value) {
        if (!$where.extensions?.pgFilterAttribute) throw Error("Planning error: expected 'pgFilterAttribute' to be present on the $where plan's extensions; your extensions to `postgraphile-plugin-connection-filter` does not implement the required interfaces.");
        if (value === void 0) return;
        const {
            fieldName: parentFieldName,
            attributeName,
            attribute,
            codec,
            expression
          } = $where.extensions.pgFilterAttribute,
          sourceAlias = attribute ? attribute.expression ? attribute.expression($where.alias) : sql`${$where.alias}.${sql.identifier(attributeName)}` : expression ? expression : $where.alias,
          sourceCodec = codec ?? attribute.codec,
          [sqlIdentifier, identifierCodec] = resolveSqlIdentifier2 ? resolveSqlIdentifier2(sourceAlias, sourceCodec) : [sourceAlias, sourceCodec];
        if (true && value === null) return;
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const resolvedInput = resolveInput12 ? resolveInput12(value) : value,
          inputCodec = resolveInputCodec4 ? resolveInputCodec4(codec ?? attribute.codec) : codec ?? attribute.codec,
          sqlValue = sqlValueWithCodec(resolvedInput, inputCodec),
          fragment = resolve23(sqlIdentifier, sqlValue, value, $where, {
            fieldName: parentFieldName ?? null,
            operatorName: "notEndsWithInsensitive"
          });
        $where.where(fragment);
      },
      notEqualTo($where, value) {
        if (!$where.extensions?.pgFilterAttribute) throw Error("Planning error: expected 'pgFilterAttribute' to be present on the $where plan's extensions; your extensions to `postgraphile-plugin-connection-filter` does not implement the required interfaces.");
        if (value === void 0) return;
        const {
            fieldName: parentFieldName,
            attributeName,
            attribute,
            codec,
            expression
          } = $where.extensions.pgFilterAttribute,
          sourceAlias = attribute ? attribute.expression ? attribute.expression($where.alias) : sql`${$where.alias}.${sql.identifier(attributeName)}` : expression ? expression : $where.alias,
          sourceCodec = codec ?? attribute.codec,
          [sqlIdentifier, identifierCodec] = resolveSqlIdentifier ? resolveSqlIdentifier(sourceAlias, sourceCodec) : [sourceAlias, sourceCodec];
        if (true && value === null) return;
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const resolvedInput = value,
          inputCodec = resolveInputCodec2 ? resolveInputCodec2(codec ?? attribute.codec) : codec ?? attribute.codec,
          sqlValue = sqlValueWithCodec(resolvedInput, inputCodec),
          fragment = resolve3(sqlIdentifier, sqlValue, value, $where, {
            fieldName: parentFieldName ?? null,
            operatorName: "notEqualTo"
          });
        $where.where(fragment);
      },
      notEqualToInsensitive($where, value) {
        if (!$where.extensions?.pgFilterAttribute) throw Error("Planning error: expected 'pgFilterAttribute' to be present on the $where plan's extensions; your extensions to `postgraphile-plugin-connection-filter` does not implement the required interfaces.");
        if (value === void 0) return;
        const {
            fieldName: parentFieldName,
            attributeName,
            attribute,
            codec,
            expression
          } = $where.extensions.pgFilterAttribute,
          sourceAlias = attribute ? attribute.expression ? attribute.expression($where.alias) : sql`${$where.alias}.${sql.identifier(attributeName)}` : expression ? expression : $where.alias,
          sourceCodec = codec ?? attribute.codec,
          [sqlIdentifier, identifierCodec] = resolveSqlIdentifier4 ? resolveSqlIdentifier4(sourceAlias, sourceCodec) : [sourceAlias, sourceCodec];
        if (true && value === null) return;
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const resolvedInput = value,
          inputCodec = resolveInputCodec6 ? resolveInputCodec6(codec ?? attribute.codec) : codec ?? attribute.codec,
          sqlValue = resolveSqlValue3 ? resolveSqlValue3($where, value, inputCodec) : sqlValueWithCodec(resolvedInput, inputCodec),
          fragment = resolve3(sqlIdentifier, sqlValue, value, $where, {
            fieldName: parentFieldName ?? null,
            operatorName: "notEqualToInsensitive"
          });
        $where.where(fragment);
      },
      notIn($where, value) {
        if (!$where.extensions?.pgFilterAttribute) throw Error("Planning error: expected 'pgFilterAttribute' to be present on the $where plan's extensions; your extensions to `postgraphile-plugin-connection-filter` does not implement the required interfaces.");
        if (value === void 0) return;
        const {
            fieldName: parentFieldName,
            attributeName,
            attribute,
            codec,
            expression
          } = $where.extensions.pgFilterAttribute,
          sourceAlias = attribute ? attribute.expression ? attribute.expression($where.alias) : sql`${$where.alias}.${sql.identifier(attributeName)}` : expression ? expression : $where.alias,
          sourceCodec = codec ?? attribute.codec,
          [sqlIdentifier, identifierCodec] = resolveSqlIdentifier ? resolveSqlIdentifier(sourceAlias, sourceCodec) : [sourceAlias, sourceCodec];
        if (true && value === null) return;
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const resolvedInput = value,
          inputCodec = resolveInputCodec3 ? resolveInputCodec3(codec ?? attribute.codec) : codec ?? attribute.codec,
          sqlValue = sqlValueWithCodec(resolvedInput, inputCodec),
          fragment = resolve7(sqlIdentifier, sqlValue, value, $where, {
            fieldName: parentFieldName ?? null,
            operatorName: "notIn"
          });
        $where.where(fragment);
      },
      notIncludes($where, value) {
        if (!$where.extensions?.pgFilterAttribute) throw Error("Planning error: expected 'pgFilterAttribute' to be present on the $where plan's extensions; your extensions to `postgraphile-plugin-connection-filter` does not implement the required interfaces.");
        if (value === void 0) return;
        const {
            fieldName: parentFieldName,
            attributeName,
            attribute,
            codec,
            expression
          } = $where.extensions.pgFilterAttribute,
          sourceAlias = attribute ? attribute.expression ? attribute.expression($where.alias) : sql`${$where.alias}.${sql.identifier(attributeName)}` : expression ? expression : $where.alias,
          sourceCodec = codec ?? attribute.codec,
          [sqlIdentifier, identifierCodec] = resolveSqlIdentifier ? resolveSqlIdentifier(sourceAlias, sourceCodec) : [sourceAlias, sourceCodec];
        if (true && value === null) return;
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const resolvedInput = resolveInput2 ? resolveInput2(value) : value,
          inputCodec = resolveInputCodec2 ? resolveInputCodec2(codec ?? attribute.codec) : codec ?? attribute.codec,
          sqlValue = sqlValueWithCodec(resolvedInput, inputCodec),
          fragment = resolve13(sqlIdentifier, sqlValue, value, $where, {
            fieldName: parentFieldName ?? null,
            operatorName: "notIncludes"
          });
        $where.where(fragment);
      },
      notIncludesInsensitive($where, value) {
        if (!$where.extensions?.pgFilterAttribute) throw Error("Planning error: expected 'pgFilterAttribute' to be present on the $where plan's extensions; your extensions to `postgraphile-plugin-connection-filter` does not implement the required interfaces.");
        if (value === void 0) return;
        const {
            fieldName: parentFieldName,
            attributeName,
            attribute,
            codec,
            expression
          } = $where.extensions.pgFilterAttribute,
          sourceAlias = attribute ? attribute.expression ? attribute.expression($where.alias) : sql`${$where.alias}.${sql.identifier(attributeName)}` : expression ? expression : $where.alias,
          sourceCodec = codec ?? attribute.codec,
          [sqlIdentifier, identifierCodec] = resolveSqlIdentifier2 ? resolveSqlIdentifier2(sourceAlias, sourceCodec) : [sourceAlias, sourceCodec];
        if (true && value === null) return;
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const resolvedInput = resolveInput4 ? resolveInput4(value) : value,
          inputCodec = resolveInputCodec4 ? resolveInputCodec4(codec ?? attribute.codec) : codec ?? attribute.codec,
          sqlValue = sqlValueWithCodec(resolvedInput, inputCodec),
          fragment = resolve15(sqlIdentifier, sqlValue, value, $where, {
            fieldName: parentFieldName ?? null,
            operatorName: "notIncludesInsensitive"
          });
        $where.where(fragment);
      },
      notInInsensitive($where, value) {
        if (!$where.extensions?.pgFilterAttribute) throw Error("Planning error: expected 'pgFilterAttribute' to be present on the $where plan's extensions; your extensions to `postgraphile-plugin-connection-filter` does not implement the required interfaces.");
        if (value === void 0) return;
        const {
            fieldName: parentFieldName,
            attributeName,
            attribute,
            codec,
            expression
          } = $where.extensions.pgFilterAttribute,
          sourceAlias = attribute ? attribute.expression ? attribute.expression($where.alias) : sql`${$where.alias}.${sql.identifier(attributeName)}` : expression ? expression : $where.alias,
          sourceCodec = codec ?? attribute.codec,
          [sqlIdentifier, identifierCodec] = resolveSqlIdentifier8 ? resolveSqlIdentifier8(sourceAlias, sourceCodec) : [sourceAlias, sourceCodec];
        if (true && value === null) return;
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const resolvedInput = value,
          inputCodec = resolveInputCodec10 ? resolveInputCodec10(codec ?? attribute.codec) : codec ?? attribute.codec,
          sqlValue = resolveSqlValue7 ? resolveSqlValue7($where, value, inputCodec) : sqlValueWithCodec(resolvedInput, inputCodec),
          fragment = resolve7(sqlIdentifier, sqlValue, value, $where, {
            fieldName: parentFieldName ?? null,
            operatorName: "notInInsensitive"
          });
        $where.where(fragment);
      },
      notLike($where, value) {
        if (!$where.extensions?.pgFilterAttribute) throw Error("Planning error: expected 'pgFilterAttribute' to be present on the $where plan's extensions; your extensions to `postgraphile-plugin-connection-filter` does not implement the required interfaces.");
        if (value === void 0) return;
        const {
            fieldName: parentFieldName,
            attributeName,
            attribute,
            codec,
            expression
          } = $where.extensions.pgFilterAttribute,
          sourceAlias = attribute ? attribute.expression ? attribute.expression($where.alias) : sql`${$where.alias}.${sql.identifier(attributeName)}` : expression ? expression : $where.alias,
          sourceCodec = codec ?? attribute.codec,
          [sqlIdentifier, identifierCodec] = resolveSqlIdentifier ? resolveSqlIdentifier(sourceAlias, sourceCodec) : [sourceAlias, sourceCodec];
        if (true && value === null) return;
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const resolvedInput = value,
          inputCodec = resolveInputCodec2 ? resolveInputCodec2(codec ?? attribute.codec) : codec ?? attribute.codec,
          sqlValue = sqlValueWithCodec(resolvedInput, inputCodec),
          fragment = resolve25(sqlIdentifier, sqlValue, value, $where, {
            fieldName: parentFieldName ?? null,
            operatorName: "notLike"
          });
        $where.where(fragment);
      },
      notLikeInsensitive($where, value) {
        if (!$where.extensions?.pgFilterAttribute) throw Error("Planning error: expected 'pgFilterAttribute' to be present on the $where plan's extensions; your extensions to `postgraphile-plugin-connection-filter` does not implement the required interfaces.");
        if (value === void 0) return;
        const {
            fieldName: parentFieldName,
            attributeName,
            attribute,
            codec,
            expression
          } = $where.extensions.pgFilterAttribute,
          sourceAlias = attribute ? attribute.expression ? attribute.expression($where.alias) : sql`${$where.alias}.${sql.identifier(attributeName)}` : expression ? expression : $where.alias,
          sourceCodec = codec ?? attribute.codec,
          [sqlIdentifier, identifierCodec] = resolveSqlIdentifier2 ? resolveSqlIdentifier2(sourceAlias, sourceCodec) : [sourceAlias, sourceCodec];
        if (true && value === null) return;
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const resolvedInput = value,
          inputCodec = resolveInputCodec4 ? resolveInputCodec4(codec ?? attribute.codec) : codec ?? attribute.codec,
          sqlValue = sqlValueWithCodec(resolvedInput, inputCodec),
          fragment = resolve27(sqlIdentifier, sqlValue, value, $where, {
            fieldName: parentFieldName ?? null,
            operatorName: "notLikeInsensitive"
          });
        $where.where(fragment);
      },
      notStartsWith($where, value) {
        if (!$where.extensions?.pgFilterAttribute) throw Error("Planning error: expected 'pgFilterAttribute' to be present on the $where plan's extensions; your extensions to `postgraphile-plugin-connection-filter` does not implement the required interfaces.");
        if (value === void 0) return;
        const {
            fieldName: parentFieldName,
            attributeName,
            attribute,
            codec,
            expression
          } = $where.extensions.pgFilterAttribute,
          sourceAlias = attribute ? attribute.expression ? attribute.expression($where.alias) : sql`${$where.alias}.${sql.identifier(attributeName)}` : expression ? expression : $where.alias,
          sourceCodec = codec ?? attribute.codec,
          [sqlIdentifier, identifierCodec] = resolveSqlIdentifier ? resolveSqlIdentifier(sourceAlias, sourceCodec) : [sourceAlias, sourceCodec];
        if (true && value === null) return;
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const resolvedInput = resolveInput6 ? resolveInput6(value) : value,
          inputCodec = resolveInputCodec2 ? resolveInputCodec2(codec ?? attribute.codec) : codec ?? attribute.codec,
          sqlValue = sqlValueWithCodec(resolvedInput, inputCodec),
          fragment = resolve17(sqlIdentifier, sqlValue, value, $where, {
            fieldName: parentFieldName ?? null,
            operatorName: "notStartsWith"
          });
        $where.where(fragment);
      },
      notStartsWithInsensitive($where, value) {
        if (!$where.extensions?.pgFilterAttribute) throw Error("Planning error: expected 'pgFilterAttribute' to be present on the $where plan's extensions; your extensions to `postgraphile-plugin-connection-filter` does not implement the required interfaces.");
        if (value === void 0) return;
        const {
            fieldName: parentFieldName,
            attributeName,
            attribute,
            codec,
            expression
          } = $where.extensions.pgFilterAttribute,
          sourceAlias = attribute ? attribute.expression ? attribute.expression($where.alias) : sql`${$where.alias}.${sql.identifier(attributeName)}` : expression ? expression : $where.alias,
          sourceCodec = codec ?? attribute.codec,
          [sqlIdentifier, identifierCodec] = resolveSqlIdentifier2 ? resolveSqlIdentifier2(sourceAlias, sourceCodec) : [sourceAlias, sourceCodec];
        if (true && value === null) return;
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const resolvedInput = resolveInput8 ? resolveInput8(value) : value,
          inputCodec = resolveInputCodec4 ? resolveInputCodec4(codec ?? attribute.codec) : codec ?? attribute.codec,
          sqlValue = sqlValueWithCodec(resolvedInput, inputCodec),
          fragment = resolve19(sqlIdentifier, sqlValue, value, $where, {
            fieldName: parentFieldName ?? null,
            operatorName: "notStartsWithInsensitive"
          });
        $where.where(fragment);
      },
      startsWith($where, value) {
        if (!$where.extensions?.pgFilterAttribute) throw Error("Planning error: expected 'pgFilterAttribute' to be present on the $where plan's extensions; your extensions to `postgraphile-plugin-connection-filter` does not implement the required interfaces.");
        if (value === void 0) return;
        const {
            fieldName: parentFieldName,
            attributeName,
            attribute,
            codec,
            expression
          } = $where.extensions.pgFilterAttribute,
          sourceAlias = attribute ? attribute.expression ? attribute.expression($where.alias) : sql`${$where.alias}.${sql.identifier(attributeName)}` : expression ? expression : $where.alias,
          sourceCodec = codec ?? attribute.codec,
          [sqlIdentifier, identifierCodec] = resolveSqlIdentifier ? resolveSqlIdentifier(sourceAlias, sourceCodec) : [sourceAlias, sourceCodec];
        if (true && value === null) return;
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const resolvedInput = resolveInput5 ? resolveInput5(value) : value,
          inputCodec = resolveInputCodec2 ? resolveInputCodec2(codec ?? attribute.codec) : codec ?? attribute.codec,
          sqlValue = sqlValueWithCodec(resolvedInput, inputCodec),
          fragment = resolve16(sqlIdentifier, sqlValue, value, $where, {
            fieldName: parentFieldName ?? null,
            operatorName: "startsWith"
          });
        $where.where(fragment);
      },
      startsWithInsensitive($where, value) {
        if (!$where.extensions?.pgFilterAttribute) throw Error("Planning error: expected 'pgFilterAttribute' to be present on the $where plan's extensions; your extensions to `postgraphile-plugin-connection-filter` does not implement the required interfaces.");
        if (value === void 0) return;
        const {
            fieldName: parentFieldName,
            attributeName,
            attribute,
            codec,
            expression
          } = $where.extensions.pgFilterAttribute,
          sourceAlias = attribute ? attribute.expression ? attribute.expression($where.alias) : sql`${$where.alias}.${sql.identifier(attributeName)}` : expression ? expression : $where.alias,
          sourceCodec = codec ?? attribute.codec,
          [sqlIdentifier, identifierCodec] = resolveSqlIdentifier2 ? resolveSqlIdentifier2(sourceAlias, sourceCodec) : [sourceAlias, sourceCodec];
        if (true && value === null) return;
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const resolvedInput = resolveInput7 ? resolveInput7(value) : value,
          inputCodec = resolveInputCodec4 ? resolveInputCodec4(codec ?? attribute.codec) : codec ?? attribute.codec,
          sqlValue = sqlValueWithCodec(resolvedInput, inputCodec),
          fragment = resolve18(sqlIdentifier, sqlValue, value, $where, {
            fieldName: parentFieldName ?? null,
            operatorName: "startsWithInsensitive"
          });
        $where.where(fragment);
      }
    }
  },
  TaskCondition: {
    plans: {
      completed($condition, val) {
        $condition.where({
          type: "attribute",
          attribute: "completed",
          callback(expression) {
            return val === null ? sql`${expression} is null` : sql`${expression} = ${sqlValueWithCodec(val, TYPES.boolean)}`;
          }
        });
      },
      createdAt($condition, val) {
        $condition.where({
          type: "attribute",
          attribute: "createdAt",
          callback(expression) {
            return val === null ? sql`${expression} is null` : sql`${expression} = ${sqlValueWithCodec(val, TYPES.timestamptz)}`;
          }
        });
      },
      description($condition, val) {
        $condition.where({
          type: "attribute",
          attribute: "description",
          callback(expression) {
            return val === null ? sql`${expression} is null` : sql`${expression} = ${sqlValueWithCodec(val, TYPES.text)}`;
          }
        });
      },
      name($condition, val) {
        $condition.where({
          type: "attribute",
          attribute: "name",
          callback(expression) {
            return val === null ? sql`${expression} is null` : sql`${expression} = ${sqlValueWithCodec(val, TYPES.text)}`;
          }
        });
      },
      rowId($condition, val) {
        $condition.where({
          type: "attribute",
          attribute: "id",
          callback(expression) {
            return val === null ? sql`${expression} is null` : sql`${expression} = ${sqlValueWithCodec(val, TYPES.uuid)}`;
          }
        });
      },
      updatedAt($condition, val) {
        $condition.where({
          type: "attribute",
          attribute: "updatedAt",
          callback(expression) {
            return val === null ? sql`${expression} is null` : sql`${expression} = ${sqlValueWithCodec(val, TYPES.timestamptz)}`;
          }
        });
      },
      userId($condition, val) {
        $condition.where({
          type: "attribute",
          attribute: "user_id",
          callback(expression) {
            return val === null ? sql`${expression} is null` : sql`${expression} = ${sqlValueWithCodec(val, TYPES.text)}`;
          }
        });
      }
    }
  },
  TaskFilter: {
    plans: {
      and($where, value) {
        assertAllowed19(value, "list");
        if (value == null) return;
        return $where.andPlan();
      },
      completed(queryBuilder, value) {
        if (value === void 0) return;
        if (!true && isEmpty(value)) throw Object.assign(Error("Empty objects are forbidden in filter argument input."), {});
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const condition = new PgCondition(queryBuilder);
        condition.extensions.pgFilterAttribute = colSpec33;
        return condition;
      },
      createdAt(queryBuilder, value) {
        if (value === void 0) return;
        if (!true && isEmpty(value)) throw Object.assign(Error("Empty objects are forbidden in filter argument input."), {});
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const condition = new PgCondition(queryBuilder);
        condition.extensions.pgFilterAttribute = colSpec34;
        return condition;
      },
      description(queryBuilder, value) {
        if (value === void 0) return;
        if (!true && isEmpty(value)) throw Object.assign(Error("Empty objects are forbidden in filter argument input."), {});
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const condition = new PgCondition(queryBuilder);
        condition.extensions.pgFilterAttribute = colSpec32;
        return condition;
      },
      name(queryBuilder, value) {
        if (value === void 0) return;
        if (!true && isEmpty(value)) throw Object.assign(Error("Empty objects are forbidden in filter argument input."), {});
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const condition = new PgCondition(queryBuilder);
        condition.extensions.pgFilterAttribute = colSpec31;
        return condition;
      },
      not($where, value) {
        assertAllowed19(value, "object");
        if (value == null) return;
        return $where.notPlan().andPlan();
      },
      or($where, value) {
        assertAllowed19(value, "list");
        if (value == null) return;
        const $or = $where.orPlan();
        return () => $or.andPlan();
      },
      rowId(queryBuilder, value) {
        if (value === void 0) return;
        if (!true && isEmpty(value)) throw Object.assign(Error("Empty objects are forbidden in filter argument input."), {});
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const condition = new PgCondition(queryBuilder);
        condition.extensions.pgFilterAttribute = colSpec29;
        return condition;
      },
      updatedAt(queryBuilder, value) {
        if (value === void 0) return;
        if (!true && isEmpty(value)) throw Object.assign(Error("Empty objects are forbidden in filter argument input."), {});
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const condition = new PgCondition(queryBuilder);
        condition.extensions.pgFilterAttribute = colSpec35;
        return condition;
      },
      user($where, value) {
        assertAllowed18(value, "object");
        if (value == null) return;
        const $subQuery = $where.existsPlan({
          tableExpression: userIdentifier,
          alias: resource_userPgResource.name
        });
        registryConfig.pgRelations.tasks.userByMyUserId.localAttributes.forEach((localAttribute, i) => {
          const remoteAttribute = registryConfig.pgRelations.tasks.userByMyUserId.remoteAttributes[i];
          $subQuery.where(sql`${$where.alias}.${sql.identifier(localAttribute)} = ${$subQuery.alias}.${sql.identifier(remoteAttribute)}`);
        });
        return $subQuery;
      },
      userId(queryBuilder, value) {
        if (value === void 0) return;
        if (!true && isEmpty(value)) throw Object.assign(Error("Empty objects are forbidden in filter argument input."), {});
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const condition = new PgCondition(queryBuilder);
        condition.extensions.pgFilterAttribute = colSpec30;
        return condition;
      }
    }
  },
  TaskInput: {
    baked: createObjectAndApplyChildren,
    plans: {
      completed(obj, val, {
        field,
        schema
      }) {
        obj.set("completed", bakedInputRuntime(schema, field.type, val));
      },
      createdAt(obj, val, {
        field,
        schema
      }) {
        obj.set("createdAt", bakedInputRuntime(schema, field.type, val));
      },
      description(obj, val, {
        field,
        schema
      }) {
        obj.set("description", bakedInputRuntime(schema, field.type, val));
      },
      name(obj, val, {
        field,
        schema
      }) {
        obj.set("name", bakedInputRuntime(schema, field.type, val));
      },
      rowId(obj, val, {
        field,
        schema
      }) {
        obj.set("id", bakedInputRuntime(schema, field.type, val));
      },
      updatedAt(obj, val, {
        field,
        schema
      }) {
        obj.set("updatedAt", bakedInputRuntime(schema, field.type, val));
      },
      userId(obj, val, {
        field,
        schema
      }) {
        obj.set("user_id", bakedInputRuntime(schema, field.type, val));
      }
    }
  },
  TaskPatch: {
    baked: createObjectAndApplyChildren,
    plans: {
      completed(obj, val, {
        field,
        schema
      }) {
        obj.set("completed", bakedInputRuntime(schema, field.type, val));
      },
      createdAt(obj, val, {
        field,
        schema
      }) {
        obj.set("createdAt", bakedInputRuntime(schema, field.type, val));
      },
      description(obj, val, {
        field,
        schema
      }) {
        obj.set("description", bakedInputRuntime(schema, field.type, val));
      },
      name(obj, val, {
        field,
        schema
      }) {
        obj.set("name", bakedInputRuntime(schema, field.type, val));
      },
      rowId(obj, val, {
        field,
        schema
      }) {
        obj.set("id", bakedInputRuntime(schema, field.type, val));
      },
      updatedAt(obj, val, {
        field,
        schema
      }) {
        obj.set("updatedAt", bakedInputRuntime(schema, field.type, val));
      },
      userId(obj, val, {
        field,
        schema
      }) {
        obj.set("user_id", bakedInputRuntime(schema, field.type, val));
      }
    }
  },
  UpdateAccountByIdInput: {
    plans: {
      clientMutationId(qb, val) {
        qb.setMeta("clientMutationId", val);
      },
      patch(qb, arg) {
        if (arg != null) return qb.setBuilder();
      }
    }
  },
  UpdateAccountInput: {
    plans: {
      clientMutationId(qb, val) {
        qb.setMeta("clientMutationId", val);
      },
      patch(qb, arg) {
        if (arg != null) return qb.setBuilder();
      }
    }
  },
  UpdateSessionByIdInput: {
    plans: {
      clientMutationId(qb, val) {
        qb.setMeta("clientMutationId", val);
      },
      patch(qb, arg) {
        if (arg != null) return qb.setBuilder();
      }
    }
  },
  UpdateSessionByTokenInput: {
    plans: {
      clientMutationId(qb, val) {
        qb.setMeta("clientMutationId", val);
      },
      patch(qb, arg) {
        if (arg != null) return qb.setBuilder();
      }
    }
  },
  UpdateSessionInput: {
    plans: {
      clientMutationId(qb, val) {
        qb.setMeta("clientMutationId", val);
      },
      patch(qb, arg) {
        if (arg != null) return qb.setBuilder();
      }
    }
  },
  UpdateTaskByIdInput: {
    plans: {
      clientMutationId(qb, val) {
        qb.setMeta("clientMutationId", val);
      },
      patch(qb, arg) {
        if (arg != null) return qb.setBuilder();
      }
    }
  },
  UpdateTaskInput: {
    plans: {
      clientMutationId(qb, val) {
        qb.setMeta("clientMutationId", val);
      },
      patch(qb, arg) {
        if (arg != null) return qb.setBuilder();
      }
    }
  },
  UpdateUserByEmailInput: {
    plans: {
      clientMutationId(qb, val) {
        qb.setMeta("clientMutationId", val);
      },
      patch(qb, arg) {
        if (arg != null) return qb.setBuilder();
      }
    }
  },
  UpdateUserByIdInput: {
    plans: {
      clientMutationId(qb, val) {
        qb.setMeta("clientMutationId", val);
      },
      patch(qb, arg) {
        if (arg != null) return qb.setBuilder();
      }
    }
  },
  UpdateUserInput: {
    plans: {
      clientMutationId(qb, val) {
        qb.setMeta("clientMutationId", val);
      },
      patch(qb, arg) {
        if (arg != null) return qb.setBuilder();
      }
    }
  },
  UpdateVerificationByIdInput: {
    plans: {
      clientMutationId(qb, val) {
        qb.setMeta("clientMutationId", val);
      },
      patch(qb, arg) {
        if (arg != null) return qb.setBuilder();
      }
    }
  },
  UpdateVerificationInput: {
    plans: {
      clientMutationId(qb, val) {
        qb.setMeta("clientMutationId", val);
      },
      patch(qb, arg) {
        if (arg != null) return qb.setBuilder();
      }
    }
  },
  UserCondition: {
    plans: {
      createdAt($condition, val) {
        $condition.where({
          type: "attribute",
          attribute: "createdAt",
          callback(expression) {
            return val === null ? sql`${expression} is null` : sql`${expression} = ${sqlValueWithCodec(val, TYPES.timestamptz)}`;
          }
        });
      },
      email($condition, val) {
        $condition.where({
          type: "attribute",
          attribute: "email",
          callback(expression) {
            return val === null ? sql`${expression} is null` : sql`${expression} = ${sqlValueWithCodec(val, TYPES.text)}`;
          }
        });
      },
      emailVerified($condition, val) {
        $condition.where({
          type: "attribute",
          attribute: "email_verified",
          callback(expression) {
            return val === null ? sql`${expression} is null` : sql`${expression} = ${sqlValueWithCodec(val, TYPES.boolean)}`;
          }
        });
      },
      image($condition, val) {
        $condition.where({
          type: "attribute",
          attribute: "image",
          callback(expression) {
            return val === null ? sql`${expression} is null` : sql`${expression} = ${sqlValueWithCodec(val, TYPES.text)}`;
          }
        });
      },
      name($condition, val) {
        $condition.where({
          type: "attribute",
          attribute: "name",
          callback(expression) {
            return val === null ? sql`${expression} is null` : sql`${expression} = ${sqlValueWithCodec(val, TYPES.text)}`;
          }
        });
      },
      rowId($condition, val) {
        $condition.where({
          type: "attribute",
          attribute: "id",
          callback(expression) {
            return val === null ? sql`${expression} is null` : sql`${expression} = ${sqlValueWithCodec(val, TYPES.text)}`;
          }
        });
      },
      updatedAt($condition, val) {
        $condition.where({
          type: "attribute",
          attribute: "updatedAt",
          callback(expression) {
            return val === null ? sql`${expression} is null` : sql`${expression} = ${sqlValueWithCodec(val, TYPES.timestamptz)}`;
          }
        });
      }
    }
  },
  UserFilter: {
    plans: {
      accounts($where, value) {
        assertAllowed11(value, "object");
        const $rel = $where.andPlan();
        $rel.extensions.pgFilterRelation = {
          tableExpression: accountIdentifier,
          alias: resource_accountPgResource.name,
          localAttributes: registryConfig.pgRelations.user.accountsByTheirUserId.localAttributes,
          remoteAttributes: registryConfig.pgRelations.user.accountsByTheirUserId.remoteAttributes
        };
        return $rel;
      },
      accountsExist($where, value) {
        assertAllowed11(value, "scalar");
        if (value == null) return;
        const $subQuery = $where.existsPlan({
          tableExpression: accountIdentifier,
          alias: resource_accountPgResource.name,
          equals: value
        });
        registryConfig.pgRelations.user.accountsByTheirUserId.localAttributes.forEach((localAttribute, i) => {
          const remoteAttribute = registryConfig.pgRelations.user.accountsByTheirUserId.remoteAttributes[i];
          $subQuery.where(sql`${$where.alias}.${sql.identifier(localAttribute)} = ${$subQuery.alias}.${sql.identifier(remoteAttribute)}`);
        });
      },
      and($where, value) {
        assertAllowed12(value, "list");
        if (value == null) return;
        return $where.andPlan();
      },
      createdAt(queryBuilder, value) {
        if (value === void 0) return;
        if (!true && isEmpty(value)) throw Object.assign(Error("Empty objects are forbidden in filter argument input."), {});
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const condition = new PgCondition(queryBuilder);
        condition.extensions.pgFilterAttribute = colSpec19;
        return condition;
      },
      email(queryBuilder, value) {
        if (value === void 0) return;
        if (!true && isEmpty(value)) throw Object.assign(Error("Empty objects are forbidden in filter argument input."), {});
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const condition = new PgCondition(queryBuilder);
        condition.extensions.pgFilterAttribute = colSpec16;
        return condition;
      },
      emailVerified(queryBuilder, value) {
        if (value === void 0) return;
        if (!true && isEmpty(value)) throw Object.assign(Error("Empty objects are forbidden in filter argument input."), {});
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const condition = new PgCondition(queryBuilder);
        condition.extensions.pgFilterAttribute = colSpec17;
        return condition;
      },
      image(queryBuilder, value) {
        if (value === void 0) return;
        if (!true && isEmpty(value)) throw Object.assign(Error("Empty objects are forbidden in filter argument input."), {});
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const condition = new PgCondition(queryBuilder);
        condition.extensions.pgFilterAttribute = colSpec18;
        return condition;
      },
      name(queryBuilder, value) {
        if (value === void 0) return;
        if (!true && isEmpty(value)) throw Object.assign(Error("Empty objects are forbidden in filter argument input."), {});
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const condition = new PgCondition(queryBuilder);
        condition.extensions.pgFilterAttribute = colSpec15;
        return condition;
      },
      not($where, value) {
        assertAllowed12(value, "object");
        if (value == null) return;
        return $where.notPlan().andPlan();
      },
      or($where, value) {
        assertAllowed12(value, "list");
        if (value == null) return;
        const $or = $where.orPlan();
        return () => $or.andPlan();
      },
      rowId(queryBuilder, value) {
        if (value === void 0) return;
        if (!true && isEmpty(value)) throw Object.assign(Error("Empty objects are forbidden in filter argument input."), {});
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const condition = new PgCondition(queryBuilder);
        condition.extensions.pgFilterAttribute = colSpec14;
        return condition;
      },
      sessions($where, value) {
        assertAllowed11(value, "object");
        const $rel = $where.andPlan();
        $rel.extensions.pgFilterRelation = {
          tableExpression: sessionIdentifier,
          alias: resource_sessionPgResource.name,
          localAttributes: registryConfig.pgRelations.user.sessionsByTheirUserId.localAttributes,
          remoteAttributes: registryConfig.pgRelations.user.sessionsByTheirUserId.remoteAttributes
        };
        return $rel;
      },
      sessionsExist($where, value) {
        assertAllowed11(value, "scalar");
        if (value == null) return;
        const $subQuery = $where.existsPlan({
          tableExpression: sessionIdentifier,
          alias: resource_sessionPgResource.name,
          equals: value
        });
        registryConfig.pgRelations.user.sessionsByTheirUserId.localAttributes.forEach((localAttribute, i) => {
          const remoteAttribute = registryConfig.pgRelations.user.sessionsByTheirUserId.remoteAttributes[i];
          $subQuery.where(sql`${$where.alias}.${sql.identifier(localAttribute)} = ${$subQuery.alias}.${sql.identifier(remoteAttribute)}`);
        });
      },
      tasks($where, value) {
        assertAllowed11(value, "object");
        const $rel = $where.andPlan();
        $rel.extensions.pgFilterRelation = {
          tableExpression: tasksIdentifier,
          alias: resource_tasksPgResource.name,
          localAttributes: registryConfig.pgRelations.user.tasksByTheirUserId.localAttributes,
          remoteAttributes: registryConfig.pgRelations.user.tasksByTheirUserId.remoteAttributes
        };
        return $rel;
      },
      tasksExist($where, value) {
        assertAllowed11(value, "scalar");
        if (value == null) return;
        const $subQuery = $where.existsPlan({
          tableExpression: tasksIdentifier,
          alias: resource_tasksPgResource.name,
          equals: value
        });
        registryConfig.pgRelations.user.tasksByTheirUserId.localAttributes.forEach((localAttribute, i) => {
          const remoteAttribute = registryConfig.pgRelations.user.tasksByTheirUserId.remoteAttributes[i];
          $subQuery.where(sql`${$where.alias}.${sql.identifier(localAttribute)} = ${$subQuery.alias}.${sql.identifier(remoteAttribute)}`);
        });
      },
      updatedAt(queryBuilder, value) {
        if (value === void 0) return;
        if (!true && isEmpty(value)) throw Object.assign(Error("Empty objects are forbidden in filter argument input."), {});
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const condition = new PgCondition(queryBuilder);
        condition.extensions.pgFilterAttribute = colSpec20;
        return condition;
      }
    }
  },
  UserInput: {
    baked: createObjectAndApplyChildren,
    plans: {
      createdAt(obj, val, {
        field,
        schema
      }) {
        obj.set("createdAt", bakedInputRuntime(schema, field.type, val));
      },
      email(obj, val, {
        field,
        schema
      }) {
        obj.set("email", bakedInputRuntime(schema, field.type, val));
      },
      emailVerified(obj, val, {
        field,
        schema
      }) {
        obj.set("email_verified", bakedInputRuntime(schema, field.type, val));
      },
      image(obj, val, {
        field,
        schema
      }) {
        obj.set("image", bakedInputRuntime(schema, field.type, val));
      },
      name(obj, val, {
        field,
        schema
      }) {
        obj.set("name", bakedInputRuntime(schema, field.type, val));
      },
      rowId(obj, val, {
        field,
        schema
      }) {
        obj.set("id", bakedInputRuntime(schema, field.type, val));
      },
      updatedAt(obj, val, {
        field,
        schema
      }) {
        obj.set("updatedAt", bakedInputRuntime(schema, field.type, val));
      }
    }
  },
  UserPatch: {
    baked: createObjectAndApplyChildren,
    plans: {
      createdAt(obj, val, {
        field,
        schema
      }) {
        obj.set("createdAt", bakedInputRuntime(schema, field.type, val));
      },
      email(obj, val, {
        field,
        schema
      }) {
        obj.set("email", bakedInputRuntime(schema, field.type, val));
      },
      emailVerified(obj, val, {
        field,
        schema
      }) {
        obj.set("email_verified", bakedInputRuntime(schema, field.type, val));
      },
      image(obj, val, {
        field,
        schema
      }) {
        obj.set("image", bakedInputRuntime(schema, field.type, val));
      },
      name(obj, val, {
        field,
        schema
      }) {
        obj.set("name", bakedInputRuntime(schema, field.type, val));
      },
      rowId(obj, val, {
        field,
        schema
      }) {
        obj.set("id", bakedInputRuntime(schema, field.type, val));
      },
      updatedAt(obj, val, {
        field,
        schema
      }) {
        obj.set("updatedAt", bakedInputRuntime(schema, field.type, val));
      }
    }
  },
  UserToManyAccountFilter: {
    plans: {
      every($where, value) {
        assertAllowed13(value, "object");
        if (value == null) return;
        if (!$where.extensions.pgFilterRelation) throw Error("Invalid use of filter, 'pgFilterRelation' expected");
        const {
            localAttributes,
            remoteAttributes,
            tableExpression,
            alias
          } = $where.extensions.pgFilterRelation,
          $subQuery = $where.notPlan().existsPlan({
            tableExpression,
            alias
          });
        localAttributes.forEach((localAttribute, i) => {
          const remoteAttribute = remoteAttributes[i];
          $subQuery.where(sql`${$where.alias}.${sql.identifier(localAttribute)} = ${$subQuery.alias}.${sql.identifier(remoteAttribute)}`);
        });
        return $subQuery.notPlan().andPlan();
      },
      none($where, value) {
        assertAllowed13(value, "object");
        if (value == null) return;
        if (!$where.extensions.pgFilterRelation) throw Error("Invalid use of filter, 'pgFilterRelation' expected");
        const {
            localAttributes,
            remoteAttributes,
            tableExpression,
            alias
          } = $where.extensions.pgFilterRelation,
          $subQuery = $where.notPlan().existsPlan({
            tableExpression,
            alias
          });
        localAttributes.forEach((localAttribute, i) => {
          const remoteAttribute = remoteAttributes[i];
          $subQuery.where(sql`${$where.alias}.${sql.identifier(localAttribute)} = ${$subQuery.alias}.${sql.identifier(remoteAttribute)}`);
        });
        return $subQuery;
      },
      some($where, value) {
        assertAllowed13(value, "object");
        if (value == null) return;
        if (!$where.extensions.pgFilterRelation) throw Error("Invalid use of filter, 'pgFilterRelation' expected");
        const {
            localAttributes,
            remoteAttributes,
            tableExpression,
            alias
          } = $where.extensions.pgFilterRelation,
          $subQuery = $where.existsPlan({
            tableExpression,
            alias
          });
        localAttributes.forEach((localAttribute, i) => {
          const remoteAttribute = remoteAttributes[i];
          $subQuery.where(sql`${$where.alias}.${sql.identifier(localAttribute)} = ${$subQuery.alias}.${sql.identifier(remoteAttribute)}`);
        });
        return $subQuery;
      }
    }
  },
  UserToManySessionFilter: {
    plans: {
      every($where, value) {
        assertAllowed14(value, "object");
        if (value == null) return;
        if (!$where.extensions.pgFilterRelation) throw Error("Invalid use of filter, 'pgFilterRelation' expected");
        const {
            localAttributes,
            remoteAttributes,
            tableExpression,
            alias
          } = $where.extensions.pgFilterRelation,
          $subQuery = $where.notPlan().existsPlan({
            tableExpression,
            alias
          });
        localAttributes.forEach((localAttribute, i) => {
          const remoteAttribute = remoteAttributes[i];
          $subQuery.where(sql`${$where.alias}.${sql.identifier(localAttribute)} = ${$subQuery.alias}.${sql.identifier(remoteAttribute)}`);
        });
        return $subQuery.notPlan().andPlan();
      },
      none($where, value) {
        assertAllowed14(value, "object");
        if (value == null) return;
        if (!$where.extensions.pgFilterRelation) throw Error("Invalid use of filter, 'pgFilterRelation' expected");
        const {
            localAttributes,
            remoteAttributes,
            tableExpression,
            alias
          } = $where.extensions.pgFilterRelation,
          $subQuery = $where.notPlan().existsPlan({
            tableExpression,
            alias
          });
        localAttributes.forEach((localAttribute, i) => {
          const remoteAttribute = remoteAttributes[i];
          $subQuery.where(sql`${$where.alias}.${sql.identifier(localAttribute)} = ${$subQuery.alias}.${sql.identifier(remoteAttribute)}`);
        });
        return $subQuery;
      },
      some($where, value) {
        assertAllowed14(value, "object");
        if (value == null) return;
        if (!$where.extensions.pgFilterRelation) throw Error("Invalid use of filter, 'pgFilterRelation' expected");
        const {
            localAttributes,
            remoteAttributes,
            tableExpression,
            alias
          } = $where.extensions.pgFilterRelation,
          $subQuery = $where.existsPlan({
            tableExpression,
            alias
          });
        localAttributes.forEach((localAttribute, i) => {
          const remoteAttribute = remoteAttributes[i];
          $subQuery.where(sql`${$where.alias}.${sql.identifier(localAttribute)} = ${$subQuery.alias}.${sql.identifier(remoteAttribute)}`);
        });
        return $subQuery;
      }
    }
  },
  UserToManyTaskFilter: {
    plans: {
      every($where, value) {
        assertAllowed17(value, "object");
        if (value == null) return;
        if (!$where.extensions.pgFilterRelation) throw Error("Invalid use of filter, 'pgFilterRelation' expected");
        const {
            localAttributes,
            remoteAttributes,
            tableExpression,
            alias
          } = $where.extensions.pgFilterRelation,
          $subQuery = $where.notPlan().existsPlan({
            tableExpression,
            alias
          });
        localAttributes.forEach((localAttribute, i) => {
          const remoteAttribute = remoteAttributes[i];
          $subQuery.where(sql`${$where.alias}.${sql.identifier(localAttribute)} = ${$subQuery.alias}.${sql.identifier(remoteAttribute)}`);
        });
        return $subQuery.notPlan().andPlan();
      },
      none($where, value) {
        assertAllowed17(value, "object");
        if (value == null) return;
        if (!$where.extensions.pgFilterRelation) throw Error("Invalid use of filter, 'pgFilterRelation' expected");
        const {
            localAttributes,
            remoteAttributes,
            tableExpression,
            alias
          } = $where.extensions.pgFilterRelation,
          $subQuery = $where.notPlan().existsPlan({
            tableExpression,
            alias
          });
        localAttributes.forEach((localAttribute, i) => {
          const remoteAttribute = remoteAttributes[i];
          $subQuery.where(sql`${$where.alias}.${sql.identifier(localAttribute)} = ${$subQuery.alias}.${sql.identifier(remoteAttribute)}`);
        });
        return $subQuery;
      },
      some($where, value) {
        assertAllowed17(value, "object");
        if (value == null) return;
        if (!$where.extensions.pgFilterRelation) throw Error("Invalid use of filter, 'pgFilterRelation' expected");
        const {
            localAttributes,
            remoteAttributes,
            tableExpression,
            alias
          } = $where.extensions.pgFilterRelation,
          $subQuery = $where.existsPlan({
            tableExpression,
            alias
          });
        localAttributes.forEach((localAttribute, i) => {
          const remoteAttribute = remoteAttributes[i];
          $subQuery.where(sql`${$where.alias}.${sql.identifier(localAttribute)} = ${$subQuery.alias}.${sql.identifier(remoteAttribute)}`);
        });
        return $subQuery;
      }
    }
  },
  UUIDFilter: {
    plans: {
      distinctFrom($where, value) {
        if (!$where.extensions?.pgFilterAttribute) throw Error("Planning error: expected 'pgFilterAttribute' to be present on the $where plan's extensions; your extensions to `postgraphile-plugin-connection-filter` does not implement the required interfaces.");
        if (value === void 0) return;
        const {
            fieldName: parentFieldName,
            attributeName,
            attribute,
            codec,
            expression
          } = $where.extensions.pgFilterAttribute,
          sourceAlias = attribute ? attribute.expression ? attribute.expression($where.alias) : sql`${$where.alias}.${sql.identifier(attributeName)}` : expression ? expression : $where.alias,
          sourceCodec = codec ?? attribute.codec,
          [sqlIdentifier, identifierCodec] = resolveSqlIdentifier15 ? resolveSqlIdentifier15(sourceAlias, sourceCodec) : [sourceAlias, sourceCodec];
        if (true && value === null) return;
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const resolvedInput = value,
          inputCodec = resolveInputCodec22 ? resolveInputCodec22(codec ?? attribute.codec) : codec ?? attribute.codec,
          sqlValue = sqlValueWithCodec(resolvedInput, inputCodec),
          fragment = resolve53(sqlIdentifier, sqlValue, value, $where, {
            fieldName: parentFieldName ?? null,
            operatorName: "distinctFrom"
          });
        $where.where(fragment);
      },
      equalTo($where, value) {
        if (!$where.extensions?.pgFilterAttribute) throw Error("Planning error: expected 'pgFilterAttribute' to be present on the $where plan's extensions; your extensions to `postgraphile-plugin-connection-filter` does not implement the required interfaces.");
        if (value === void 0) return;
        const {
            fieldName: parentFieldName,
            attributeName,
            attribute,
            codec,
            expression
          } = $where.extensions.pgFilterAttribute,
          sourceAlias = attribute ? attribute.expression ? attribute.expression($where.alias) : sql`${$where.alias}.${sql.identifier(attributeName)}` : expression ? expression : $where.alias,
          sourceCodec = codec ?? attribute.codec,
          [sqlIdentifier, identifierCodec] = resolveSqlIdentifier15 ? resolveSqlIdentifier15(sourceAlias, sourceCodec) : [sourceAlias, sourceCodec];
        if (true && value === null) return;
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const resolvedInput = value,
          inputCodec = resolveInputCodec22 ? resolveInputCodec22(codec ?? attribute.codec) : codec ?? attribute.codec,
          sqlValue = sqlValueWithCodec(resolvedInput, inputCodec),
          fragment = resolve51(sqlIdentifier, sqlValue, value, $where, {
            fieldName: parentFieldName ?? null,
            operatorName: "equalTo"
          });
        $where.where(fragment);
      },
      greaterThan($where, value) {
        if (!$where.extensions?.pgFilterAttribute) throw Error("Planning error: expected 'pgFilterAttribute' to be present on the $where plan's extensions; your extensions to `postgraphile-plugin-connection-filter` does not implement the required interfaces.");
        if (value === void 0) return;
        const {
            fieldName: parentFieldName,
            attributeName,
            attribute,
            codec,
            expression
          } = $where.extensions.pgFilterAttribute,
          sourceAlias = attribute ? attribute.expression ? attribute.expression($where.alias) : sql`${$where.alias}.${sql.identifier(attributeName)}` : expression ? expression : $where.alias,
          sourceCodec = codec ?? attribute.codec,
          [sqlIdentifier, identifierCodec] = resolveSqlIdentifier15 ? resolveSqlIdentifier15(sourceAlias, sourceCodec) : [sourceAlias, sourceCodec];
        if (true && value === null) return;
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const resolvedInput = value,
          inputCodec = resolveInputCodec22 ? resolveInputCodec22(codec ?? attribute.codec) : codec ?? attribute.codec,
          sqlValue = sqlValueWithCodec(resolvedInput, inputCodec),
          fragment = resolve59(sqlIdentifier, sqlValue, value, $where, {
            fieldName: parentFieldName ?? null,
            operatorName: "greaterThan"
          });
        $where.where(fragment);
      },
      greaterThanOrEqualTo($where, value) {
        if (!$where.extensions?.pgFilterAttribute) throw Error("Planning error: expected 'pgFilterAttribute' to be present on the $where plan's extensions; your extensions to `postgraphile-plugin-connection-filter` does not implement the required interfaces.");
        if (value === void 0) return;
        const {
            fieldName: parentFieldName,
            attributeName,
            attribute,
            codec,
            expression
          } = $where.extensions.pgFilterAttribute,
          sourceAlias = attribute ? attribute.expression ? attribute.expression($where.alias) : sql`${$where.alias}.${sql.identifier(attributeName)}` : expression ? expression : $where.alias,
          sourceCodec = codec ?? attribute.codec,
          [sqlIdentifier, identifierCodec] = resolveSqlIdentifier15 ? resolveSqlIdentifier15(sourceAlias, sourceCodec) : [sourceAlias, sourceCodec];
        if (true && value === null) return;
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const resolvedInput = value,
          inputCodec = resolveInputCodec22 ? resolveInputCodec22(codec ?? attribute.codec) : codec ?? attribute.codec,
          sqlValue = sqlValueWithCodec(resolvedInput, inputCodec),
          fragment = resolve60(sqlIdentifier, sqlValue, value, $where, {
            fieldName: parentFieldName ?? null,
            operatorName: "greaterThanOrEqualTo"
          });
        $where.where(fragment);
      },
      in($where, value) {
        if (!$where.extensions?.pgFilterAttribute) throw Error("Planning error: expected 'pgFilterAttribute' to be present on the $where plan's extensions; your extensions to `postgraphile-plugin-connection-filter` does not implement the required interfaces.");
        if (value === void 0) return;
        const {
            fieldName: parentFieldName,
            attributeName,
            attribute,
            codec,
            expression
          } = $where.extensions.pgFilterAttribute,
          sourceAlias = attribute ? attribute.expression ? attribute.expression($where.alias) : sql`${$where.alias}.${sql.identifier(attributeName)}` : expression ? expression : $where.alias,
          sourceCodec = codec ?? attribute.codec,
          [sqlIdentifier, identifierCodec] = resolveSqlIdentifier15 ? resolveSqlIdentifier15(sourceAlias, sourceCodec) : [sourceAlias, sourceCodec];
        if (true && value === null) return;
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const resolvedInput = value,
          inputCodec = resolveInputCodec23 ? resolveInputCodec23(codec ?? attribute.codec) : codec ?? attribute.codec,
          sqlValue = sqlValueWithCodec(resolvedInput, inputCodec),
          fragment = resolve55(sqlIdentifier, sqlValue, value, $where, {
            fieldName: parentFieldName ?? null,
            operatorName: "in"
          });
        $where.where(fragment);
      },
      isNull($where, value) {
        if (!$where.extensions?.pgFilterAttribute) throw Error("Planning error: expected 'pgFilterAttribute' to be present on the $where plan's extensions; your extensions to `postgraphile-plugin-connection-filter` does not implement the required interfaces.");
        if (value === void 0) return;
        const {
            fieldName: parentFieldName,
            attributeName,
            attribute,
            codec,
            expression
          } = $where.extensions.pgFilterAttribute,
          sourceAlias = attribute ? attribute.expression ? attribute.expression($where.alias) : sql`${$where.alias}.${sql.identifier(attributeName)}` : expression ? expression : $where.alias,
          sourceCodec = codec ?? attribute.codec,
          [sqlIdentifier, identifierCodec] = [sourceAlias, sourceCodec];
        if (true && value === null) return;
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const resolvedInput = value,
          inputCodec = resolveInputCodec21 ? resolveInputCodec21(codec ?? attribute.codec) : codec ?? attribute.codec,
          sqlValue = resolveSqlValue14 ? resolveSqlValue14($where, value, inputCodec) : sqlValueWithCodec(resolvedInput, inputCodec),
          fragment = resolve50(sqlIdentifier, sqlValue, value, $where, {
            fieldName: parentFieldName ?? null,
            operatorName: "isNull"
          });
        $where.where(fragment);
      },
      lessThan($where, value) {
        if (!$where.extensions?.pgFilterAttribute) throw Error("Planning error: expected 'pgFilterAttribute' to be present on the $where plan's extensions; your extensions to `postgraphile-plugin-connection-filter` does not implement the required interfaces.");
        if (value === void 0) return;
        const {
            fieldName: parentFieldName,
            attributeName,
            attribute,
            codec,
            expression
          } = $where.extensions.pgFilterAttribute,
          sourceAlias = attribute ? attribute.expression ? attribute.expression($where.alias) : sql`${$where.alias}.${sql.identifier(attributeName)}` : expression ? expression : $where.alias,
          sourceCodec = codec ?? attribute.codec,
          [sqlIdentifier, identifierCodec] = resolveSqlIdentifier15 ? resolveSqlIdentifier15(sourceAlias, sourceCodec) : [sourceAlias, sourceCodec];
        if (true && value === null) return;
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const resolvedInput = value,
          inputCodec = resolveInputCodec22 ? resolveInputCodec22(codec ?? attribute.codec) : codec ?? attribute.codec,
          sqlValue = sqlValueWithCodec(resolvedInput, inputCodec),
          fragment = resolve57(sqlIdentifier, sqlValue, value, $where, {
            fieldName: parentFieldName ?? null,
            operatorName: "lessThan"
          });
        $where.where(fragment);
      },
      lessThanOrEqualTo($where, value) {
        if (!$where.extensions?.pgFilterAttribute) throw Error("Planning error: expected 'pgFilterAttribute' to be present on the $where plan's extensions; your extensions to `postgraphile-plugin-connection-filter` does not implement the required interfaces.");
        if (value === void 0) return;
        const {
            fieldName: parentFieldName,
            attributeName,
            attribute,
            codec,
            expression
          } = $where.extensions.pgFilterAttribute,
          sourceAlias = attribute ? attribute.expression ? attribute.expression($where.alias) : sql`${$where.alias}.${sql.identifier(attributeName)}` : expression ? expression : $where.alias,
          sourceCodec = codec ?? attribute.codec,
          [sqlIdentifier, identifierCodec] = resolveSqlIdentifier15 ? resolveSqlIdentifier15(sourceAlias, sourceCodec) : [sourceAlias, sourceCodec];
        if (true && value === null) return;
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const resolvedInput = value,
          inputCodec = resolveInputCodec22 ? resolveInputCodec22(codec ?? attribute.codec) : codec ?? attribute.codec,
          sqlValue = sqlValueWithCodec(resolvedInput, inputCodec),
          fragment = resolve58(sqlIdentifier, sqlValue, value, $where, {
            fieldName: parentFieldName ?? null,
            operatorName: "lessThanOrEqualTo"
          });
        $where.where(fragment);
      },
      notDistinctFrom($where, value) {
        if (!$where.extensions?.pgFilterAttribute) throw Error("Planning error: expected 'pgFilterAttribute' to be present on the $where plan's extensions; your extensions to `postgraphile-plugin-connection-filter` does not implement the required interfaces.");
        if (value === void 0) return;
        const {
            fieldName: parentFieldName,
            attributeName,
            attribute,
            codec,
            expression
          } = $where.extensions.pgFilterAttribute,
          sourceAlias = attribute ? attribute.expression ? attribute.expression($where.alias) : sql`${$where.alias}.${sql.identifier(attributeName)}` : expression ? expression : $where.alias,
          sourceCodec = codec ?? attribute.codec,
          [sqlIdentifier, identifierCodec] = resolveSqlIdentifier15 ? resolveSqlIdentifier15(sourceAlias, sourceCodec) : [sourceAlias, sourceCodec];
        if (true && value === null) return;
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const resolvedInput = value,
          inputCodec = resolveInputCodec22 ? resolveInputCodec22(codec ?? attribute.codec) : codec ?? attribute.codec,
          sqlValue = sqlValueWithCodec(resolvedInput, inputCodec),
          fragment = resolve54(sqlIdentifier, sqlValue, value, $where, {
            fieldName: parentFieldName ?? null,
            operatorName: "notDistinctFrom"
          });
        $where.where(fragment);
      },
      notEqualTo($where, value) {
        if (!$where.extensions?.pgFilterAttribute) throw Error("Planning error: expected 'pgFilterAttribute' to be present on the $where plan's extensions; your extensions to `postgraphile-plugin-connection-filter` does not implement the required interfaces.");
        if (value === void 0) return;
        const {
            fieldName: parentFieldName,
            attributeName,
            attribute,
            codec,
            expression
          } = $where.extensions.pgFilterAttribute,
          sourceAlias = attribute ? attribute.expression ? attribute.expression($where.alias) : sql`${$where.alias}.${sql.identifier(attributeName)}` : expression ? expression : $where.alias,
          sourceCodec = codec ?? attribute.codec,
          [sqlIdentifier, identifierCodec] = resolveSqlIdentifier15 ? resolveSqlIdentifier15(sourceAlias, sourceCodec) : [sourceAlias, sourceCodec];
        if (true && value === null) return;
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const resolvedInput = value,
          inputCodec = resolveInputCodec22 ? resolveInputCodec22(codec ?? attribute.codec) : codec ?? attribute.codec,
          sqlValue = sqlValueWithCodec(resolvedInput, inputCodec),
          fragment = resolve52(sqlIdentifier, sqlValue, value, $where, {
            fieldName: parentFieldName ?? null,
            operatorName: "notEqualTo"
          });
        $where.where(fragment);
      },
      notIn($where, value) {
        if (!$where.extensions?.pgFilterAttribute) throw Error("Planning error: expected 'pgFilterAttribute' to be present on the $where plan's extensions; your extensions to `postgraphile-plugin-connection-filter` does not implement the required interfaces.");
        if (value === void 0) return;
        const {
            fieldName: parentFieldName,
            attributeName,
            attribute,
            codec,
            expression
          } = $where.extensions.pgFilterAttribute,
          sourceAlias = attribute ? attribute.expression ? attribute.expression($where.alias) : sql`${$where.alias}.${sql.identifier(attributeName)}` : expression ? expression : $where.alias,
          sourceCodec = codec ?? attribute.codec,
          [sqlIdentifier, identifierCodec] = resolveSqlIdentifier15 ? resolveSqlIdentifier15(sourceAlias, sourceCodec) : [sourceAlias, sourceCodec];
        if (true && value === null) return;
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const resolvedInput = value,
          inputCodec = resolveInputCodec23 ? resolveInputCodec23(codec ?? attribute.codec) : codec ?? attribute.codec,
          sqlValue = sqlValueWithCodec(resolvedInput, inputCodec),
          fragment = resolve56(sqlIdentifier, sqlValue, value, $where, {
            fieldName: parentFieldName ?? null,
            operatorName: "notIn"
          });
        $where.where(fragment);
      }
    }
  },
  VerificationCondition: {
    plans: {
      createdAt($condition, val) {
        $condition.where({
          type: "attribute",
          attribute: "createdAt",
          callback(expression) {
            return val === null ? sql`${expression} is null` : sql`${expression} = ${sqlValueWithCodec(val, TYPES.timestamptz)}`;
          }
        });
      },
      expiresAt($condition, val) {
        $condition.where({
          type: "attribute",
          attribute: "expires_at",
          callback(expression) {
            return val === null ? sql`${expression} is null` : sql`${expression} = ${sqlValueWithCodec(val, TYPES.timestamp)}`;
          }
        });
      },
      identifier($condition, val) {
        $condition.where({
          type: "attribute",
          attribute: "identifier",
          callback(expression) {
            return val === null ? sql`${expression} is null` : sql`${expression} = ${sqlValueWithCodec(val, TYPES.text)}`;
          }
        });
      },
      rowId($condition, val) {
        $condition.where({
          type: "attribute",
          attribute: "id",
          callback(expression) {
            return val === null ? sql`${expression} is null` : sql`${expression} = ${sqlValueWithCodec(val, TYPES.text)}`;
          }
        });
      },
      updatedAt($condition, val) {
        $condition.where({
          type: "attribute",
          attribute: "updatedAt",
          callback(expression) {
            return val === null ? sql`${expression} is null` : sql`${expression} = ${sqlValueWithCodec(val, TYPES.timestamptz)}`;
          }
        });
      },
      value($condition, val) {
        $condition.where({
          type: "attribute",
          attribute: "value",
          callback(expression) {
            return val === null ? sql`${expression} is null` : sql`${expression} = ${sqlValueWithCodec(val, TYPES.text)}`;
          }
        });
      }
    }
  },
  VerificationFilter: {
    plans: {
      and($where, value) {
        assertAllowed20(value, "list");
        if (value == null) return;
        return $where.andPlan();
      },
      createdAt(queryBuilder, value) {
        if (value === void 0) return;
        if (!true && isEmpty(value)) throw Object.assign(Error("Empty objects are forbidden in filter argument input."), {});
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const condition = new PgCondition(queryBuilder);
        condition.extensions.pgFilterAttribute = colSpec40;
        return condition;
      },
      expiresAt(queryBuilder, value) {
        if (value === void 0) return;
        if (!true && isEmpty(value)) throw Object.assign(Error("Empty objects are forbidden in filter argument input."), {});
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const condition = new PgCondition(queryBuilder);
        condition.extensions.pgFilterAttribute = colSpec39;
        return condition;
      },
      identifier(queryBuilder, value) {
        if (value === void 0) return;
        if (!true && isEmpty(value)) throw Object.assign(Error("Empty objects are forbidden in filter argument input."), {});
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const condition = new PgCondition(queryBuilder);
        condition.extensions.pgFilterAttribute = colSpec37;
        return condition;
      },
      not($where, value) {
        assertAllowed20(value, "object");
        if (value == null) return;
        return $where.notPlan().andPlan();
      },
      or($where, value) {
        assertAllowed20(value, "list");
        if (value == null) return;
        const $or = $where.orPlan();
        return () => $or.andPlan();
      },
      rowId(queryBuilder, value) {
        if (value === void 0) return;
        if (!true && isEmpty(value)) throw Object.assign(Error("Empty objects are forbidden in filter argument input."), {});
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const condition = new PgCondition(queryBuilder);
        condition.extensions.pgFilterAttribute = colSpec36;
        return condition;
      },
      updatedAt(queryBuilder, value) {
        if (value === void 0) return;
        if (!true && isEmpty(value)) throw Object.assign(Error("Empty objects are forbidden in filter argument input."), {});
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const condition = new PgCondition(queryBuilder);
        condition.extensions.pgFilterAttribute = colSpec41;
        return condition;
      },
      value(queryBuilder, value) {
        if (value === void 0) return;
        if (!true && isEmpty(value)) throw Object.assign(Error("Empty objects are forbidden in filter argument input."), {});
        if (!true && value === null) throw Object.assign(Error("Null literals are forbidden in filter argument input."), {});
        const condition = new PgCondition(queryBuilder);
        condition.extensions.pgFilterAttribute = colSpec38;
        return condition;
      }
    }
  },
  VerificationInput: {
    baked: createObjectAndApplyChildren,
    plans: {
      createdAt(obj, val, {
        field,
        schema
      }) {
        obj.set("createdAt", bakedInputRuntime(schema, field.type, val));
      },
      expiresAt(obj, val, {
        field,
        schema
      }) {
        obj.set("expires_at", bakedInputRuntime(schema, field.type, val));
      },
      identifier(obj, val, {
        field,
        schema
      }) {
        obj.set("identifier", bakedInputRuntime(schema, field.type, val));
      },
      rowId(obj, val, {
        field,
        schema
      }) {
        obj.set("id", bakedInputRuntime(schema, field.type, val));
      },
      updatedAt(obj, val, {
        field,
        schema
      }) {
        obj.set("updatedAt", bakedInputRuntime(schema, field.type, val));
      },
      value(obj, val, {
        field,
        schema
      }) {
        obj.set("value", bakedInputRuntime(schema, field.type, val));
      }
    }
  },
  VerificationPatch: {
    baked: createObjectAndApplyChildren,
    plans: {
      createdAt(obj, val, {
        field,
        schema
      }) {
        obj.set("createdAt", bakedInputRuntime(schema, field.type, val));
      },
      expiresAt(obj, val, {
        field,
        schema
      }) {
        obj.set("expires_at", bakedInputRuntime(schema, field.type, val));
      },
      identifier(obj, val, {
        field,
        schema
      }) {
        obj.set("identifier", bakedInputRuntime(schema, field.type, val));
      },
      rowId(obj, val, {
        field,
        schema
      }) {
        obj.set("id", bakedInputRuntime(schema, field.type, val));
      },
      updatedAt(obj, val, {
        field,
        schema
      }) {
        obj.set("updatedAt", bakedInputRuntime(schema, field.type, val));
      },
      value(obj, val, {
        field,
        schema
      }) {
        obj.set("value", bakedInputRuntime(schema, field.type, val));
      }
    }
  }
};
export const scalars = {
  Cursor: {
    serialize: DatetimeSerialize,
    parseValue: DatetimeSerialize,
    parseLiteral(ast) {
      if (ast.kind !== Kind.STRING) throw new GraphQLError(`${"Cursor" ?? "This scalar"} can only parse string values (kind='${ast.kind}')`);
      return ast.value;
    }
  },
  Datetime: {
    serialize: DatetimeSerialize,
    parseValue: DatetimeSerialize,
    parseLiteral(ast) {
      if (ast.kind !== Kind.STRING) throw new GraphQLError(`${"Datetime" ?? "This scalar"} can only parse string values (kind='${ast.kind}')`);
      return ast.value;
    }
  },
  UUID: {
    serialize: DatetimeSerialize,
    parseValue(value) {
      return coerce("" + value);
    },
    parseLiteral(ast) {
      if (ast.kind !== Kind.STRING) throw new GraphQLError(`${"UUID" ?? "This scalar"} can only parse string values (kind = '${ast.kind}')`);
      return coerce(ast.value);
    }
  }
};
export const enums = {
  AccountOrderBy: {
    values: {
      ACCESS_TOKEN_ASC(queryBuilder) {
        queryBuilder.orderBy({
          attribute: "access_token",
          direction: "ASC"
        });
      },
      ACCESS_TOKEN_DESC(queryBuilder) {
        queryBuilder.orderBy({
          attribute: "access_token",
          direction: "DESC"
        });
      },
      ACCESS_TOKEN_EXPIRES_AT_ASC(queryBuilder) {
        queryBuilder.orderBy({
          attribute: "access_token_expires_at",
          direction: "ASC"
        });
      },
      ACCESS_TOKEN_EXPIRES_AT_DESC(queryBuilder) {
        queryBuilder.orderBy({
          attribute: "access_token_expires_at",
          direction: "DESC"
        });
      },
      ACCOUNT_ID_ASC(queryBuilder) {
        queryBuilder.orderBy({
          attribute: "account_id",
          direction: "ASC"
        });
      },
      ACCOUNT_ID_DESC(queryBuilder) {
        queryBuilder.orderBy({
          attribute: "account_id",
          direction: "DESC"
        });
      },
      CREATED_AT_ASC(queryBuilder) {
        queryBuilder.orderBy({
          attribute: "createdAt",
          direction: "ASC"
        });
      },
      CREATED_AT_DESC(queryBuilder) {
        queryBuilder.orderBy({
          attribute: "createdAt",
          direction: "DESC"
        });
      },
      ID_TOKEN_ASC(queryBuilder) {
        queryBuilder.orderBy({
          attribute: "id_token",
          direction: "ASC"
        });
      },
      ID_TOKEN_DESC(queryBuilder) {
        queryBuilder.orderBy({
          attribute: "id_token",
          direction: "DESC"
        });
      },
      PASSWORD_ASC(queryBuilder) {
        queryBuilder.orderBy({
          attribute: "password",
          direction: "ASC"
        });
      },
      PASSWORD_DESC(queryBuilder) {
        queryBuilder.orderBy({
          attribute: "password",
          direction: "DESC"
        });
      },
      PRIMARY_KEY_ASC(queryBuilder) {
        accountUniques[0].attributes.forEach(attributeName => {
          queryBuilder.orderBy({
            attribute: attributeName,
            direction: "ASC"
          });
        });
        queryBuilder.setOrderIsUnique();
      },
      PRIMARY_KEY_DESC(queryBuilder) {
        accountUniques[0].attributes.forEach(attributeName => {
          queryBuilder.orderBy({
            attribute: attributeName,
            direction: "DESC"
          });
        });
        queryBuilder.setOrderIsUnique();
      },
      PROVIDER_ID_ASC(queryBuilder) {
        queryBuilder.orderBy({
          attribute: "provider_id",
          direction: "ASC"
        });
      },
      PROVIDER_ID_DESC(queryBuilder) {
        queryBuilder.orderBy({
          attribute: "provider_id",
          direction: "DESC"
        });
      },
      REFRESH_TOKEN_ASC(queryBuilder) {
        queryBuilder.orderBy({
          attribute: "refresh_token",
          direction: "ASC"
        });
      },
      REFRESH_TOKEN_DESC(queryBuilder) {
        queryBuilder.orderBy({
          attribute: "refresh_token",
          direction: "DESC"
        });
      },
      REFRESH_TOKEN_EXPIRES_AT_ASC(queryBuilder) {
        queryBuilder.orderBy({
          attribute: "refresh_token_expires_at",
          direction: "ASC"
        });
      },
      REFRESH_TOKEN_EXPIRES_AT_DESC(queryBuilder) {
        queryBuilder.orderBy({
          attribute: "refresh_token_expires_at",
          direction: "DESC"
        });
      },
      ROW_ID_ASC(queryBuilder) {
        queryBuilder.orderBy({
          attribute: "id",
          direction: "ASC"
        });
        queryBuilder.setOrderIsUnique();
      },
      ROW_ID_DESC(queryBuilder) {
        queryBuilder.orderBy({
          attribute: "id",
          direction: "DESC"
        });
        queryBuilder.setOrderIsUnique();
      },
      SCOPE_ASC(queryBuilder) {
        queryBuilder.orderBy({
          attribute: "scope",
          direction: "ASC"
        });
      },
      SCOPE_DESC(queryBuilder) {
        queryBuilder.orderBy({
          attribute: "scope",
          direction: "DESC"
        });
      },
      UPDATED_AT_ASC(queryBuilder) {
        queryBuilder.orderBy({
          attribute: "updatedAt",
          direction: "ASC"
        });
      },
      UPDATED_AT_DESC(queryBuilder) {
        queryBuilder.orderBy({
          attribute: "updatedAt",
          direction: "DESC"
        });
      },
      USER_ID_ASC(queryBuilder) {
        queryBuilder.orderBy({
          attribute: "user_id",
          direction: "ASC"
        });
      },
      USER_ID_DESC(queryBuilder) {
        queryBuilder.orderBy({
          attribute: "user_id",
          direction: "DESC"
        });
      }
    }
  },
  SessionOrderBy: {
    values: {
      CREATED_AT_ASC(queryBuilder) {
        queryBuilder.orderBy({
          attribute: "createdAt",
          direction: "ASC"
        });
      },
      CREATED_AT_DESC(queryBuilder) {
        queryBuilder.orderBy({
          attribute: "createdAt",
          direction: "DESC"
        });
      },
      EXPIRES_AT_ASC(queryBuilder) {
        queryBuilder.orderBy({
          attribute: "expires_at",
          direction: "ASC"
        });
      },
      EXPIRES_AT_DESC(queryBuilder) {
        queryBuilder.orderBy({
          attribute: "expires_at",
          direction: "DESC"
        });
      },
      IP_ADDRESS_ASC(queryBuilder) {
        queryBuilder.orderBy({
          attribute: "ip_address",
          direction: "ASC"
        });
      },
      IP_ADDRESS_DESC(queryBuilder) {
        queryBuilder.orderBy({
          attribute: "ip_address",
          direction: "DESC"
        });
      },
      PRIMARY_KEY_ASC(queryBuilder) {
        sessionUniques[0].attributes.forEach(attributeName => {
          queryBuilder.orderBy({
            attribute: attributeName,
            direction: "ASC"
          });
        });
        queryBuilder.setOrderIsUnique();
      },
      PRIMARY_KEY_DESC(queryBuilder) {
        sessionUniques[0].attributes.forEach(attributeName => {
          queryBuilder.orderBy({
            attribute: attributeName,
            direction: "DESC"
          });
        });
        queryBuilder.setOrderIsUnique();
      },
      ROW_ID_ASC(queryBuilder) {
        queryBuilder.orderBy({
          attribute: "id",
          direction: "ASC"
        });
        queryBuilder.setOrderIsUnique();
      },
      ROW_ID_DESC(queryBuilder) {
        queryBuilder.orderBy({
          attribute: "id",
          direction: "DESC"
        });
        queryBuilder.setOrderIsUnique();
      },
      TOKEN_ASC(queryBuilder) {
        queryBuilder.orderBy({
          attribute: "token",
          direction: "ASC"
        });
        queryBuilder.setOrderIsUnique();
      },
      TOKEN_DESC(queryBuilder) {
        queryBuilder.orderBy({
          attribute: "token",
          direction: "DESC"
        });
        queryBuilder.setOrderIsUnique();
      },
      UPDATED_AT_ASC(queryBuilder) {
        queryBuilder.orderBy({
          attribute: "updatedAt",
          direction: "ASC"
        });
      },
      UPDATED_AT_DESC(queryBuilder) {
        queryBuilder.orderBy({
          attribute: "updatedAt",
          direction: "DESC"
        });
      },
      USER_AGENT_ASC(queryBuilder) {
        queryBuilder.orderBy({
          attribute: "user_agent",
          direction: "ASC"
        });
      },
      USER_AGENT_DESC(queryBuilder) {
        queryBuilder.orderBy({
          attribute: "user_agent",
          direction: "DESC"
        });
      },
      USER_ID_ASC(queryBuilder) {
        queryBuilder.orderBy({
          attribute: "user_id",
          direction: "ASC"
        });
      },
      USER_ID_DESC(queryBuilder) {
        queryBuilder.orderBy({
          attribute: "user_id",
          direction: "DESC"
        });
      }
    }
  },
  TaskOrderBy: {
    values: {
      COMPLETED_ASC(queryBuilder) {
        queryBuilder.orderBy({
          attribute: "completed",
          direction: "ASC"
        });
      },
      COMPLETED_DESC(queryBuilder) {
        queryBuilder.orderBy({
          attribute: "completed",
          direction: "DESC"
        });
      },
      CREATED_AT_ASC(queryBuilder) {
        queryBuilder.orderBy({
          attribute: "createdAt",
          direction: "ASC"
        });
      },
      CREATED_AT_DESC(queryBuilder) {
        queryBuilder.orderBy({
          attribute: "createdAt",
          direction: "DESC"
        });
      },
      DESCRIPTION_ASC(queryBuilder) {
        queryBuilder.orderBy({
          attribute: "description",
          direction: "ASC"
        });
      },
      DESCRIPTION_DESC(queryBuilder) {
        queryBuilder.orderBy({
          attribute: "description",
          direction: "DESC"
        });
      },
      NAME_ASC(queryBuilder) {
        queryBuilder.orderBy({
          attribute: "name",
          direction: "ASC"
        });
      },
      NAME_DESC(queryBuilder) {
        queryBuilder.orderBy({
          attribute: "name",
          direction: "DESC"
        });
      },
      PRIMARY_KEY_ASC(queryBuilder) {
        tasksUniques[0].attributes.forEach(attributeName => {
          queryBuilder.orderBy({
            attribute: attributeName,
            direction: "ASC"
          });
        });
        queryBuilder.setOrderIsUnique();
      },
      PRIMARY_KEY_DESC(queryBuilder) {
        tasksUniques[0].attributes.forEach(attributeName => {
          queryBuilder.orderBy({
            attribute: attributeName,
            direction: "DESC"
          });
        });
        queryBuilder.setOrderIsUnique();
      },
      ROW_ID_ASC(queryBuilder) {
        queryBuilder.orderBy({
          attribute: "id",
          direction: "ASC"
        });
        queryBuilder.setOrderIsUnique();
      },
      ROW_ID_DESC(queryBuilder) {
        queryBuilder.orderBy({
          attribute: "id",
          direction: "DESC"
        });
        queryBuilder.setOrderIsUnique();
      },
      UPDATED_AT_ASC(queryBuilder) {
        queryBuilder.orderBy({
          attribute: "updatedAt",
          direction: "ASC"
        });
      },
      UPDATED_AT_DESC(queryBuilder) {
        queryBuilder.orderBy({
          attribute: "updatedAt",
          direction: "DESC"
        });
      },
      USER_ID_ASC(queryBuilder) {
        queryBuilder.orderBy({
          attribute: "user_id",
          direction: "ASC"
        });
      },
      USER_ID_DESC(queryBuilder) {
        queryBuilder.orderBy({
          attribute: "user_id",
          direction: "DESC"
        });
      }
    }
  },
  UserOrderBy: {
    values: {
      CREATED_AT_ASC(queryBuilder) {
        queryBuilder.orderBy({
          attribute: "createdAt",
          direction: "ASC"
        });
      },
      CREATED_AT_DESC(queryBuilder) {
        queryBuilder.orderBy({
          attribute: "createdAt",
          direction: "DESC"
        });
      },
      EMAIL_ASC(queryBuilder) {
        queryBuilder.orderBy({
          attribute: "email",
          direction: "ASC"
        });
        queryBuilder.setOrderIsUnique();
      },
      EMAIL_DESC(queryBuilder) {
        queryBuilder.orderBy({
          attribute: "email",
          direction: "DESC"
        });
        queryBuilder.setOrderIsUnique();
      },
      EMAIL_VERIFIED_ASC(queryBuilder) {
        queryBuilder.orderBy({
          attribute: "email_verified",
          direction: "ASC"
        });
      },
      EMAIL_VERIFIED_DESC(queryBuilder) {
        queryBuilder.orderBy({
          attribute: "email_verified",
          direction: "DESC"
        });
      },
      IMAGE_ASC(queryBuilder) {
        queryBuilder.orderBy({
          attribute: "image",
          direction: "ASC"
        });
      },
      IMAGE_DESC(queryBuilder) {
        queryBuilder.orderBy({
          attribute: "image",
          direction: "DESC"
        });
      },
      NAME_ASC(queryBuilder) {
        queryBuilder.orderBy({
          attribute: "name",
          direction: "ASC"
        });
      },
      NAME_DESC(queryBuilder) {
        queryBuilder.orderBy({
          attribute: "name",
          direction: "DESC"
        });
      },
      PRIMARY_KEY_ASC(queryBuilder) {
        userUniques[0].attributes.forEach(attributeName => {
          queryBuilder.orderBy({
            attribute: attributeName,
            direction: "ASC"
          });
        });
        queryBuilder.setOrderIsUnique();
      },
      PRIMARY_KEY_DESC(queryBuilder) {
        userUniques[0].attributes.forEach(attributeName => {
          queryBuilder.orderBy({
            attribute: attributeName,
            direction: "DESC"
          });
        });
        queryBuilder.setOrderIsUnique();
      },
      ROW_ID_ASC(queryBuilder) {
        queryBuilder.orderBy({
          attribute: "id",
          direction: "ASC"
        });
        queryBuilder.setOrderIsUnique();
      },
      ROW_ID_DESC(queryBuilder) {
        queryBuilder.orderBy({
          attribute: "id",
          direction: "DESC"
        });
        queryBuilder.setOrderIsUnique();
      },
      UPDATED_AT_ASC(queryBuilder) {
        queryBuilder.orderBy({
          attribute: "updatedAt",
          direction: "ASC"
        });
      },
      UPDATED_AT_DESC(queryBuilder) {
        queryBuilder.orderBy({
          attribute: "updatedAt",
          direction: "DESC"
        });
      }
    }
  },
  VerificationOrderBy: {
    values: {
      CREATED_AT_ASC(queryBuilder) {
        queryBuilder.orderBy({
          attribute: "createdAt",
          direction: "ASC"
        });
      },
      CREATED_AT_DESC(queryBuilder) {
        queryBuilder.orderBy({
          attribute: "createdAt",
          direction: "DESC"
        });
      },
      EXPIRES_AT_ASC(queryBuilder) {
        queryBuilder.orderBy({
          attribute: "expires_at",
          direction: "ASC"
        });
      },
      EXPIRES_AT_DESC(queryBuilder) {
        queryBuilder.orderBy({
          attribute: "expires_at",
          direction: "DESC"
        });
      },
      IDENTIFIER_ASC(queryBuilder) {
        queryBuilder.orderBy({
          attribute: "identifier",
          direction: "ASC"
        });
      },
      IDENTIFIER_DESC(queryBuilder) {
        queryBuilder.orderBy({
          attribute: "identifier",
          direction: "DESC"
        });
      },
      PRIMARY_KEY_ASC(queryBuilder) {
        verificationUniques[0].attributes.forEach(attributeName => {
          queryBuilder.orderBy({
            attribute: attributeName,
            direction: "ASC"
          });
        });
        queryBuilder.setOrderIsUnique();
      },
      PRIMARY_KEY_DESC(queryBuilder) {
        verificationUniques[0].attributes.forEach(attributeName => {
          queryBuilder.orderBy({
            attribute: attributeName,
            direction: "DESC"
          });
        });
        queryBuilder.setOrderIsUnique();
      },
      ROW_ID_ASC(queryBuilder) {
        queryBuilder.orderBy({
          attribute: "id",
          direction: "ASC"
        });
        queryBuilder.setOrderIsUnique();
      },
      ROW_ID_DESC(queryBuilder) {
        queryBuilder.orderBy({
          attribute: "id",
          direction: "DESC"
        });
        queryBuilder.setOrderIsUnique();
      },
      UPDATED_AT_ASC(queryBuilder) {
        queryBuilder.orderBy({
          attribute: "updatedAt",
          direction: "ASC"
        });
      },
      UPDATED_AT_DESC(queryBuilder) {
        queryBuilder.orderBy({
          attribute: "updatedAt",
          direction: "DESC"
        });
      },
      VALUE_ASC(queryBuilder) {
        queryBuilder.orderBy({
          attribute: "value",
          direction: "ASC"
        });
      },
      VALUE_DESC(queryBuilder) {
        queryBuilder.orderBy({
          attribute: "value",
          direction: "DESC"
        });
      }
    }
  }
};
export const schema = makeGrafastSchema({
  typeDefs: typeDefs,
  objects: objects,
  interfaces: interfaces,
  inputObjects: inputObjects,
  scalars: scalars,
  enums: enums
});