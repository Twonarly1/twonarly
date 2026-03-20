// @ts-nocheck
import { GraphQLClient, RequestOptions } from 'graphql-request';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Cursor: { input: string; output: string; }
  Datetime: { input: Date; output: Date; }
  UUID: { input: string; output: string; }
};

export type Account = Node & {
  __typename?: 'Account';
  accessToken?: Maybe<Scalars['String']['output']>;
  accessTokenExpiresAt?: Maybe<Scalars['Datetime']['output']>;
  accountId: Scalars['String']['output'];
  createdAt: Scalars['Datetime']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  idToken?: Maybe<Scalars['String']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  providerId: Scalars['String']['output'];
  refreshToken?: Maybe<Scalars['String']['output']>;
  refreshTokenExpiresAt?: Maybe<Scalars['Datetime']['output']>;
  rowId: Scalars['String']['output'];
  scope?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['Datetime']['output'];
  /** Reads a single `User` that is related to this `Account`. */
  user?: Maybe<User>;
  userId: Scalars['String']['output'];
};

/** A condition to be used against `Account` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type AccountCondition = {
  /** Checks for equality with the object’s `accessToken` field. */
  accessToken?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `accessTokenExpiresAt` field. */
  accessTokenExpiresAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `accountId` field. */
  accountId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `idToken` field. */
  idToken?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `password` field. */
  password?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `providerId` field. */
  providerId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `refreshToken` field. */
  refreshToken?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `refreshTokenExpiresAt` field. */
  refreshTokenExpiresAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `scope` field. */
  scope?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `userId` field. */
  userId?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `Account` values. */
export type AccountConnection = {
  __typename?: 'AccountConnection';
  /** A list of edges which contains the `Account` and cursor to aid in pagination. */
  edges: Array<AccountEdge>;
  /** A list of `Account` objects. */
  nodes: Array<Account>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Account` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Account` edge in the connection. */
export type AccountEdge = {
  __typename?: 'AccountEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Account` at the end of the edge. */
  node: Account;
};

/** A filter to be used against `Account` object types. All fields are combined with a logical ‘and.’ */
export type AccountFilter = {
  /** Filter by the object’s `accessToken` field. */
  accessToken?: InputMaybe<StringFilter>;
  /** Filter by the object’s `accessTokenExpiresAt` field. */
  accessTokenExpiresAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `accountId` field. */
  accountId?: InputMaybe<StringFilter>;
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<AccountFilter>>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `idToken` field. */
  idToken?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<AccountFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<AccountFilter>>;
  /** Filter by the object’s `password` field. */
  password?: InputMaybe<StringFilter>;
  /** Filter by the object’s `providerId` field. */
  providerId?: InputMaybe<StringFilter>;
  /** Filter by the object’s `refreshToken` field. */
  refreshToken?: InputMaybe<StringFilter>;
  /** Filter by the object’s `refreshTokenExpiresAt` field. */
  refreshTokenExpiresAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<StringFilter>;
  /** Filter by the object’s `scope` field. */
  scope?: InputMaybe<StringFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `user` relation. */
  user?: InputMaybe<UserFilter>;
  /** Filter by the object’s `userId` field. */
  userId?: InputMaybe<StringFilter>;
};

/** An input for mutations affecting `Account` */
export type AccountInput = {
  accessToken?: InputMaybe<Scalars['String']['input']>;
  accessTokenExpiresAt?: InputMaybe<Scalars['Datetime']['input']>;
  accountId: Scalars['String']['input'];
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  idToken?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  providerId: Scalars['String']['input'];
  refreshToken?: InputMaybe<Scalars['String']['input']>;
  refreshTokenExpiresAt?: InputMaybe<Scalars['Datetime']['input']>;
  rowId: Scalars['String']['input'];
  scope?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  userId: Scalars['String']['input'];
};

/** Methods to use when ordering `Account`. */
export enum AccountOrderBy {
  AccessTokenAsc = 'ACCESS_TOKEN_ASC',
  AccessTokenDesc = 'ACCESS_TOKEN_DESC',
  AccessTokenExpiresAtAsc = 'ACCESS_TOKEN_EXPIRES_AT_ASC',
  AccessTokenExpiresAtDesc = 'ACCESS_TOKEN_EXPIRES_AT_DESC',
  AccountIdAsc = 'ACCOUNT_ID_ASC',
  AccountIdDesc = 'ACCOUNT_ID_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  IdTokenAsc = 'ID_TOKEN_ASC',
  IdTokenDesc = 'ID_TOKEN_DESC',
  Natural = 'NATURAL',
  PasswordAsc = 'PASSWORD_ASC',
  PasswordDesc = 'PASSWORD_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  ProviderIdAsc = 'PROVIDER_ID_ASC',
  ProviderIdDesc = 'PROVIDER_ID_DESC',
  RefreshTokenAsc = 'REFRESH_TOKEN_ASC',
  RefreshTokenDesc = 'REFRESH_TOKEN_DESC',
  RefreshTokenExpiresAtAsc = 'REFRESH_TOKEN_EXPIRES_AT_ASC',
  RefreshTokenExpiresAtDesc = 'REFRESH_TOKEN_EXPIRES_AT_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  ScopeAsc = 'SCOPE_ASC',
  ScopeDesc = 'SCOPE_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  UserIdAsc = 'USER_ID_ASC',
  UserIdDesc = 'USER_ID_DESC'
}

/** Represents an update to a `Account`. Fields that are set will be updated. */
export type AccountPatch = {
  accessToken?: InputMaybe<Scalars['String']['input']>;
  accessTokenExpiresAt?: InputMaybe<Scalars['Datetime']['input']>;
  accountId?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  idToken?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  providerId?: InputMaybe<Scalars['String']['input']>;
  refreshToken?: InputMaybe<Scalars['String']['input']>;
  refreshTokenExpiresAt?: InputMaybe<Scalars['Datetime']['input']>;
  rowId?: InputMaybe<Scalars['String']['input']>;
  scope?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

/** A filter to be used against Boolean fields. All fields are combined with a logical ‘and.’ */
export type BooleanFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['Boolean']['input']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['Boolean']['input']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['Boolean']['input']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['Boolean']['input']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['Boolean']['input']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['Boolean']['input']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['Boolean']['input']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['Boolean']['input']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['Boolean']['input']>>;
};

/** All input for the create `Account` mutation. */
export type CreateAccountInput = {
  /** The `Account` to be created by this mutation. */
  account: AccountInput;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
};

/** The output of our create `Account` mutation. */
export type CreateAccountPayload = {
  __typename?: 'CreateAccountPayload';
  /** The `Account` that was created by this mutation. */
  account?: Maybe<Account>;
  /** An edge for our `Account`. May be used by Relay 1. */
  accountEdge?: Maybe<AccountEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `Account` mutation. */
export type CreateAccountPayloadAccountEdgeArgs = {
  orderBy?: Array<AccountOrderBy>;
};

/** All input for the create `Session` mutation. */
export type CreateSessionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `Session` to be created by this mutation. */
  session: SessionInput;
};

/** The output of our create `Session` mutation. */
export type CreateSessionPayload = {
  __typename?: 'CreateSessionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Session` that was created by this mutation. */
  session?: Maybe<Session>;
  /** An edge for our `Session`. May be used by Relay 1. */
  sessionEdge?: Maybe<SessionEdge>;
};


/** The output of our create `Session` mutation. */
export type CreateSessionPayloadSessionEdgeArgs = {
  orderBy?: Array<SessionOrderBy>;
};

/** All input for the create `Task` mutation. */
export type CreateTaskInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `Task` to be created by this mutation. */
  task: TaskInput;
};

/** The output of our create `Task` mutation. */
export type CreateTaskPayload = {
  __typename?: 'CreateTaskPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Task` that was created by this mutation. */
  task?: Maybe<Task>;
  /** An edge for our `Task`. May be used by Relay 1. */
  taskEdge?: Maybe<TaskEdge>;
};


/** The output of our create `Task` mutation. */
export type CreateTaskPayloadTaskEdgeArgs = {
  orderBy?: Array<TaskOrderBy>;
};

/** All input for the create `User` mutation. */
export type CreateUserInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `User` to be created by this mutation. */
  user: UserInput;
};

/** The output of our create `User` mutation. */
export type CreateUserPayload = {
  __typename?: 'CreateUserPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `User` that was created by this mutation. */
  user?: Maybe<User>;
  /** An edge for our `User`. May be used by Relay 1. */
  userEdge?: Maybe<UserEdge>;
};


/** The output of our create `User` mutation. */
export type CreateUserPayloadUserEdgeArgs = {
  orderBy?: Array<UserOrderBy>;
};

/** All input for the create `Verification` mutation. */
export type CreateVerificationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The `Verification` to be created by this mutation. */
  verification: VerificationInput;
};

/** The output of our create `Verification` mutation. */
export type CreateVerificationPayload = {
  __typename?: 'CreateVerificationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Verification` that was created by this mutation. */
  verification?: Maybe<Verification>;
  /** An edge for our `Verification`. May be used by Relay 1. */
  verificationEdge?: Maybe<VerificationEdge>;
};


/** The output of our create `Verification` mutation. */
export type CreateVerificationPayloadVerificationEdgeArgs = {
  orderBy?: Array<VerificationOrderBy>;
};

/** A filter to be used against Datetime fields. All fields are combined with a logical ‘and.’ */
export type DatetimeFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['Datetime']['input']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['Datetime']['input']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['Datetime']['input']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['Datetime']['input']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['Datetime']['input']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['Datetime']['input']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['Datetime']['input']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['Datetime']['input']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['Datetime']['input']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['Datetime']['input']>>;
};

/** All input for the `deleteAccountById` mutation. */
export type DeleteAccountByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Account` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteAccount` mutation. */
export type DeleteAccountInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['String']['input'];
};

/** The output of our delete `Account` mutation. */
export type DeleteAccountPayload = {
  __typename?: 'DeleteAccountPayload';
  /** The `Account` that was deleted by this mutation. */
  account?: Maybe<Account>;
  /** An edge for our `Account`. May be used by Relay 1. */
  accountEdge?: Maybe<AccountEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedAccountId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `Account` mutation. */
export type DeleteAccountPayloadAccountEdgeArgs = {
  orderBy?: Array<AccountOrderBy>;
};

/** All input for the `deleteSessionById` mutation. */
export type DeleteSessionByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Session` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteSessionByToken` mutation. */
export type DeleteSessionByTokenInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  token: Scalars['String']['input'];
};

/** All input for the `deleteSession` mutation. */
export type DeleteSessionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['String']['input'];
};

/** The output of our delete `Session` mutation. */
export type DeleteSessionPayload = {
  __typename?: 'DeleteSessionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedSessionId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Session` that was deleted by this mutation. */
  session?: Maybe<Session>;
  /** An edge for our `Session`. May be used by Relay 1. */
  sessionEdge?: Maybe<SessionEdge>;
};


/** The output of our delete `Session` mutation. */
export type DeleteSessionPayloadSessionEdgeArgs = {
  orderBy?: Array<SessionOrderBy>;
};

/** All input for the `deleteTaskById` mutation. */
export type DeleteTaskByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Task` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteTask` mutation. */
export type DeleteTaskInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['UUID']['input'];
};

/** The output of our delete `Task` mutation. */
export type DeleteTaskPayload = {
  __typename?: 'DeleteTaskPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedTaskId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Task` that was deleted by this mutation. */
  task?: Maybe<Task>;
  /** An edge for our `Task`. May be used by Relay 1. */
  taskEdge?: Maybe<TaskEdge>;
};


/** The output of our delete `Task` mutation. */
export type DeleteTaskPayloadTaskEdgeArgs = {
  orderBy?: Array<TaskOrderBy>;
};

/** All input for the `deleteUserByEmail` mutation. */
export type DeleteUserByEmailInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
};

/** All input for the `deleteUserById` mutation. */
export type DeleteUserByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `User` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteUserByUsername` mutation. */
export type DeleteUserByUsernameInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  username: Scalars['String']['input'];
};

/** All input for the `deleteUser` mutation. */
export type DeleteUserInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['String']['input'];
};

/** The output of our delete `User` mutation. */
export type DeleteUserPayload = {
  __typename?: 'DeleteUserPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedUserId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `User` that was deleted by this mutation. */
  user?: Maybe<User>;
  /** An edge for our `User`. May be used by Relay 1. */
  userEdge?: Maybe<UserEdge>;
};


/** The output of our delete `User` mutation. */
export type DeleteUserPayloadUserEdgeArgs = {
  orderBy?: Array<UserOrderBy>;
};

/** All input for the `deleteVerificationById` mutation. */
export type DeleteVerificationByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Verification` to be deleted. */
  id: Scalars['ID']['input'];
};

/** All input for the `deleteVerification` mutation. */
export type DeleteVerificationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['String']['input'];
};

/** The output of our delete `Verification` mutation. */
export type DeleteVerificationPayload = {
  __typename?: 'DeleteVerificationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  deletedVerificationId?: Maybe<Scalars['ID']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Verification` that was deleted by this mutation. */
  verification?: Maybe<Verification>;
  /** An edge for our `Verification`. May be used by Relay 1. */
  verificationEdge?: Maybe<VerificationEdge>;
};


/** The output of our delete `Verification` mutation. */
export type DeleteVerificationPayloadVerificationEdgeArgs = {
  orderBy?: Array<VerificationOrderBy>;
};

/** The root mutation type which contains root level fields which mutate data. */
export type Mutation = {
  __typename?: 'Mutation';
  /** Creates a single `Account`. */
  createAccount?: Maybe<CreateAccountPayload>;
  /** Creates a single `Session`. */
  createSession?: Maybe<CreateSessionPayload>;
  /** Creates a single `Task`. */
  createTask?: Maybe<CreateTaskPayload>;
  /** Creates a single `User`. */
  createUser?: Maybe<CreateUserPayload>;
  /** Creates a single `Verification`. */
  createVerification?: Maybe<CreateVerificationPayload>;
  /** Deletes a single `Account` using a unique key. */
  deleteAccount?: Maybe<DeleteAccountPayload>;
  /** Deletes a single `Account` using its globally unique id. */
  deleteAccountById?: Maybe<DeleteAccountPayload>;
  /** Deletes a single `Session` using a unique key. */
  deleteSession?: Maybe<DeleteSessionPayload>;
  /** Deletes a single `Session` using its globally unique id. */
  deleteSessionById?: Maybe<DeleteSessionPayload>;
  /** Deletes a single `Session` using a unique key. */
  deleteSessionByToken?: Maybe<DeleteSessionPayload>;
  /** Deletes a single `Task` using a unique key. */
  deleteTask?: Maybe<DeleteTaskPayload>;
  /** Deletes a single `Task` using its globally unique id. */
  deleteTaskById?: Maybe<DeleteTaskPayload>;
  /** Deletes a single `User` using a unique key. */
  deleteUser?: Maybe<DeleteUserPayload>;
  /** Deletes a single `User` using a unique key. */
  deleteUserByEmail?: Maybe<DeleteUserPayload>;
  /** Deletes a single `User` using its globally unique id. */
  deleteUserById?: Maybe<DeleteUserPayload>;
  /** Deletes a single `User` using a unique key. */
  deleteUserByUsername?: Maybe<DeleteUserPayload>;
  /** Deletes a single `Verification` using a unique key. */
  deleteVerification?: Maybe<DeleteVerificationPayload>;
  /** Deletes a single `Verification` using its globally unique id. */
  deleteVerificationById?: Maybe<DeleteVerificationPayload>;
  /** Updates a single `Account` using a unique key and a patch. */
  updateAccount?: Maybe<UpdateAccountPayload>;
  /** Updates a single `Account` using its globally unique id and a patch. */
  updateAccountById?: Maybe<UpdateAccountPayload>;
  /** Updates a single `Session` using a unique key and a patch. */
  updateSession?: Maybe<UpdateSessionPayload>;
  /** Updates a single `Session` using its globally unique id and a patch. */
  updateSessionById?: Maybe<UpdateSessionPayload>;
  /** Updates a single `Session` using a unique key and a patch. */
  updateSessionByToken?: Maybe<UpdateSessionPayload>;
  /** Updates a single `Task` using a unique key and a patch. */
  updateTask?: Maybe<UpdateTaskPayload>;
  /** Updates a single `Task` using its globally unique id and a patch. */
  updateTaskById?: Maybe<UpdateTaskPayload>;
  /** Updates a single `User` using a unique key and a patch. */
  updateUser?: Maybe<UpdateUserPayload>;
  /** Updates a single `User` using a unique key and a patch. */
  updateUserByEmail?: Maybe<UpdateUserPayload>;
  /** Updates a single `User` using its globally unique id and a patch. */
  updateUserById?: Maybe<UpdateUserPayload>;
  /** Updates a single `User` using a unique key and a patch. */
  updateUserByUsername?: Maybe<UpdateUserPayload>;
  /** Updates a single `Verification` using a unique key and a patch. */
  updateVerification?: Maybe<UpdateVerificationPayload>;
  /** Updates a single `Verification` using its globally unique id and a patch. */
  updateVerificationById?: Maybe<UpdateVerificationPayload>;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateAccountArgs = {
  input: CreateAccountInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateSessionArgs = {
  input: CreateSessionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateTaskArgs = {
  input: CreateTaskInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateVerificationArgs = {
  input: CreateVerificationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteAccountArgs = {
  input: DeleteAccountInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteAccountByIdArgs = {
  input: DeleteAccountByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSessionArgs = {
  input: DeleteSessionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSessionByIdArgs = {
  input: DeleteSessionByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSessionByTokenArgs = {
  input: DeleteSessionByTokenInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteTaskArgs = {
  input: DeleteTaskInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteTaskByIdArgs = {
  input: DeleteTaskByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserArgs = {
  input: DeleteUserInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserByEmailArgs = {
  input: DeleteUserByEmailInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserByIdArgs = {
  input: DeleteUserByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserByUsernameArgs = {
  input: DeleteUserByUsernameInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteVerificationArgs = {
  input: DeleteVerificationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteVerificationByIdArgs = {
  input: DeleteVerificationByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAccountArgs = {
  input: UpdateAccountInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAccountByIdArgs = {
  input: UpdateAccountByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSessionArgs = {
  input: UpdateSessionInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSessionByIdArgs = {
  input: UpdateSessionByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSessionByTokenArgs = {
  input: UpdateSessionByTokenInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTaskArgs = {
  input: UpdateTaskInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTaskByIdArgs = {
  input: UpdateTaskByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserByEmailArgs = {
  input: UpdateUserByEmailInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserByIdArgs = {
  input: UpdateUserByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserByUsernameArgs = {
  input: UpdateUserByUsernameInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateVerificationArgs = {
  input: UpdateVerificationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateVerificationByIdArgs = {
  input: UpdateVerificationByIdInput;
};

/** An object with a globally unique `ID`. */
export type Node = {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['Cursor']['output']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']['output'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['Cursor']['output']>;
};

/** The root query type which gives access points into the data universe. */
export type Query = Node & {
  __typename?: 'Query';
  /** Get a single `Account`. */
  account?: Maybe<Account>;
  /** Reads a single `Account` using its globally unique `ID`. */
  accountById?: Maybe<Account>;
  /** Reads and enables pagination through a set of `Account`. */
  accounts?: Maybe<AccountConnection>;
  /** The root query type must be a `Node` to work well with Relay 1 mutations. This just resolves to `query`. */
  id: Scalars['ID']['output'];
  /** Fetches an object given its globally unique `ID`. */
  node?: Maybe<Node>;
  /**
   * Exposes the root query type nested one level down. This is helpful for Relay 1
   * which can only query top level fields if they are in a particular form.
   */
  query: Query;
  /** Get a single `Session`. */
  session?: Maybe<Session>;
  /** Reads a single `Session` using its globally unique `ID`. */
  sessionById?: Maybe<Session>;
  /** Get a single `Session`. */
  sessionByToken?: Maybe<Session>;
  /** Reads and enables pagination through a set of `Session`. */
  sessions?: Maybe<SessionConnection>;
  /** Get a single `Task`. */
  task?: Maybe<Task>;
  /** Reads a single `Task` using its globally unique `ID`. */
  taskById?: Maybe<Task>;
  /** Reads and enables pagination through a set of `Task`. */
  tasks?: Maybe<TaskConnection>;
  /** Get a single `User`. */
  user?: Maybe<User>;
  /** Get a single `User`. */
  userByEmail?: Maybe<User>;
  /** Reads a single `User` using its globally unique `ID`. */
  userById?: Maybe<User>;
  /** Get a single `User`. */
  userByUsername?: Maybe<User>;
  /** Reads and enables pagination through a set of `User`. */
  users?: Maybe<UserConnection>;
  /** Get a single `Verification`. */
  verification?: Maybe<Verification>;
  /** Reads a single `Verification` using its globally unique `ID`. */
  verificationById?: Maybe<Verification>;
  /** Reads and enables pagination through a set of `Verification`. */
  verifications?: Maybe<VerificationConnection>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAccountArgs = {
  rowId: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAccountByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAccountsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AccountCondition>;
  filter?: InputMaybe<AccountFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AccountOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryNodeArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySessionArgs = {
  rowId: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySessionByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySessionByTokenArgs = {
  token: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySessionsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SessionCondition>;
  filter?: InputMaybe<SessionFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SessionOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryTaskArgs = {
  rowId: Scalars['UUID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTaskByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTasksArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<TaskCondition>;
  filter?: InputMaybe<TaskFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TaskOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryUserArgs = {
  rowId: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserByEmailArgs = {
  email: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserByUsernameArgs = {
  username: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUsersArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<UserCondition>;
  filter?: InputMaybe<UserFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UserOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryVerificationArgs = {
  rowId: Scalars['String']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryVerificationByIdArgs = {
  id: Scalars['ID']['input'];
};


/** The root query type which gives access points into the data universe. */
export type QueryVerificationsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<VerificationCondition>;
  filter?: InputMaybe<VerificationFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<VerificationOrderBy>>;
};

export type Session = Node & {
  __typename?: 'Session';
  createdAt: Scalars['Datetime']['output'];
  expiresAt: Scalars['Datetime']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  ipAddress?: Maybe<Scalars['String']['output']>;
  rowId: Scalars['String']['output'];
  token: Scalars['String']['output'];
  updatedAt: Scalars['Datetime']['output'];
  /** Reads a single `User` that is related to this `Session`. */
  user?: Maybe<User>;
  userAgent?: Maybe<Scalars['String']['output']>;
  userId: Scalars['String']['output'];
};

/** A condition to be used against `Session` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type SessionCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `expiresAt` field. */
  expiresAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `ipAddress` field. */
  ipAddress?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `token` field. */
  token?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `userAgent` field. */
  userAgent?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `userId` field. */
  userId?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `Session` values. */
export type SessionConnection = {
  __typename?: 'SessionConnection';
  /** A list of edges which contains the `Session` and cursor to aid in pagination. */
  edges: Array<SessionEdge>;
  /** A list of `Session` objects. */
  nodes: Array<Session>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Session` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Session` edge in the connection. */
export type SessionEdge = {
  __typename?: 'SessionEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Session` at the end of the edge. */
  node: Session;
};

/** A filter to be used against `Session` object types. All fields are combined with a logical ‘and.’ */
export type SessionFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<SessionFilter>>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `expiresAt` field. */
  expiresAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `ipAddress` field. */
  ipAddress?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<SessionFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<SessionFilter>>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<StringFilter>;
  /** Filter by the object’s `token` field. */
  token?: InputMaybe<StringFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `user` relation. */
  user?: InputMaybe<UserFilter>;
  /** Filter by the object’s `userAgent` field. */
  userAgent?: InputMaybe<StringFilter>;
  /** Filter by the object’s `userId` field. */
  userId?: InputMaybe<StringFilter>;
};

/** An input for mutations affecting `Session` */
export type SessionInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  expiresAt: Scalars['Datetime']['input'];
  ipAddress?: InputMaybe<Scalars['String']['input']>;
  rowId: Scalars['String']['input'];
  token: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  userAgent?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['String']['input'];
};

/** Methods to use when ordering `Session`. */
export enum SessionOrderBy {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  ExpiresAtAsc = 'EXPIRES_AT_ASC',
  ExpiresAtDesc = 'EXPIRES_AT_DESC',
  IpAddressAsc = 'IP_ADDRESS_ASC',
  IpAddressDesc = 'IP_ADDRESS_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  TokenAsc = 'TOKEN_ASC',
  TokenDesc = 'TOKEN_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  UserAgentAsc = 'USER_AGENT_ASC',
  UserAgentDesc = 'USER_AGENT_DESC',
  UserIdAsc = 'USER_ID_ASC',
  UserIdDesc = 'USER_ID_DESC'
}

/** Represents an update to a `Session`. Fields that are set will be updated. */
export type SessionPatch = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  expiresAt?: InputMaybe<Scalars['Datetime']['input']>;
  ipAddress?: InputMaybe<Scalars['String']['input']>;
  rowId?: InputMaybe<Scalars['String']['input']>;
  token?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  userAgent?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

/** A filter to be used against String fields. All fields are combined with a logical ‘and.’ */
export type StringFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['String']['input']>;
  /** Not equal to the specified value, treating null like an ordinary value (case-insensitive). */
  distinctFromInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Ends with the specified string (case-sensitive). */
  endsWith?: InputMaybe<Scalars['String']['input']>;
  /** Ends with the specified string (case-insensitive). */
  endsWithInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['String']['input']>;
  /** Equal to the specified value (case-insensitive). */
  equalToInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['String']['input']>;
  /** Greater than the specified value (case-insensitive). */
  greaterThanInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['String']['input']>;
  /** Greater than or equal to the specified value (case-insensitive). */
  greaterThanOrEqualToInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Included in the specified list (case-insensitive). */
  inInsensitive?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Contains the specified string (case-sensitive). */
  includes?: InputMaybe<Scalars['String']['input']>;
  /** Contains the specified string (case-insensitive). */
  includesInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['String']['input']>;
  /** Less than the specified value (case-insensitive). */
  lessThanInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['String']['input']>;
  /** Less than or equal to the specified value (case-insensitive). */
  lessThanOrEqualToInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Matches the specified pattern (case-sensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  like?: InputMaybe<Scalars['String']['input']>;
  /** Matches the specified pattern (case-insensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  likeInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['String']['input']>;
  /** Equal to the specified value, treating null like an ordinary value (case-insensitive). */
  notDistinctFromInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Does not end with the specified string (case-sensitive). */
  notEndsWith?: InputMaybe<Scalars['String']['input']>;
  /** Does not end with the specified string (case-insensitive). */
  notEndsWithInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['String']['input']>;
  /** Not equal to the specified value (case-insensitive). */
  notEqualToInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Not included in the specified list (case-insensitive). */
  notInInsensitive?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Does not contain the specified string (case-sensitive). */
  notIncludes?: InputMaybe<Scalars['String']['input']>;
  /** Does not contain the specified string (case-insensitive). */
  notIncludesInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Does not match the specified pattern (case-sensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  notLike?: InputMaybe<Scalars['String']['input']>;
  /** Does not match the specified pattern (case-insensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  notLikeInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Does not start with the specified string (case-sensitive). */
  notStartsWith?: InputMaybe<Scalars['String']['input']>;
  /** Does not start with the specified string (case-insensitive). */
  notStartsWithInsensitive?: InputMaybe<Scalars['String']['input']>;
  /** Starts with the specified string (case-sensitive). */
  startsWith?: InputMaybe<Scalars['String']['input']>;
  /** Starts with the specified string (case-insensitive). */
  startsWithInsensitive?: InputMaybe<Scalars['String']['input']>;
};

export type Task = Node & {
  __typename?: 'Task';
  completed: Scalars['Boolean']['output'];
  createdAt: Scalars['Datetime']['output'];
  description: Scalars['String']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  rowId: Scalars['UUID']['output'];
  updatedAt: Scalars['Datetime']['output'];
  /** Reads a single `User` that is related to this `Task`. */
  user?: Maybe<User>;
  userId: Scalars['String']['output'];
};

/** A condition to be used against `Task` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type TaskCondition = {
  /** Checks for equality with the object’s `completed` field. */
  completed?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `description` field. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `userId` field. */
  userId?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `Task` values. */
export type TaskConnection = {
  __typename?: 'TaskConnection';
  /** A list of edges which contains the `Task` and cursor to aid in pagination. */
  edges: Array<TaskEdge>;
  /** A list of `Task` objects. */
  nodes: Array<Task>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Task` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Task` edge in the connection. */
export type TaskEdge = {
  __typename?: 'TaskEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Task` at the end of the edge. */
  node: Task;
};

/** A filter to be used against `Task` object types. All fields are combined with a logical ‘and.’ */
export type TaskFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<TaskFilter>>;
  /** Filter by the object’s `completed` field. */
  completed?: InputMaybe<BooleanFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `description` field. */
  description?: InputMaybe<StringFilter>;
  /** Filter by the object’s `name` field. */
  name?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<TaskFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<TaskFilter>>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `user` relation. */
  user?: InputMaybe<UserFilter>;
  /** Filter by the object’s `userId` field. */
  userId?: InputMaybe<StringFilter>;
};

/** An input for mutations affecting `Task` */
export type TaskInput = {
  completed?: InputMaybe<Scalars['Boolean']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  userId: Scalars['String']['input'];
};

/** Methods to use when ordering `Task`. */
export enum TaskOrderBy {
  CompletedAsc = 'COMPLETED_ASC',
  CompletedDesc = 'COMPLETED_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  DescriptionAsc = 'DESCRIPTION_ASC',
  DescriptionDesc = 'DESCRIPTION_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  UserIdAsc = 'USER_ID_ASC',
  UserIdDesc = 'USER_ID_DESC'
}

/** Represents an update to a `Task`. Fields that are set will be updated. */
export type TaskPatch = {
  completed?: InputMaybe<Scalars['Boolean']['input']>;
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  rowId?: InputMaybe<Scalars['UUID']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

/** A filter to be used against UUID fields. All fields are combined with a logical ‘and.’ */
export type UuidFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['UUID']['input']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['UUID']['input']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['UUID']['input']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['UUID']['input']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['UUID']['input']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']['input']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['UUID']['input']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['UUID']['input']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['UUID']['input']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['UUID']['input']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['UUID']['input']>>;
};

/** All input for the `updateAccountById` mutation. */
export type UpdateAccountByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Account` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `Account` being updated. */
  patch: AccountPatch;
};

/** All input for the `updateAccount` mutation. */
export type UpdateAccountInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `Account` being updated. */
  patch: AccountPatch;
  rowId: Scalars['String']['input'];
};

/** The output of our update `Account` mutation. */
export type UpdateAccountPayload = {
  __typename?: 'UpdateAccountPayload';
  /** The `Account` that was updated by this mutation. */
  account?: Maybe<Account>;
  /** An edge for our `Account`. May be used by Relay 1. */
  accountEdge?: Maybe<AccountEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `Account` mutation. */
export type UpdateAccountPayloadAccountEdgeArgs = {
  orderBy?: Array<AccountOrderBy>;
};

/** All input for the `updateSessionById` mutation. */
export type UpdateSessionByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Session` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `Session` being updated. */
  patch: SessionPatch;
};

/** All input for the `updateSessionByToken` mutation. */
export type UpdateSessionByTokenInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `Session` being updated. */
  patch: SessionPatch;
  token: Scalars['String']['input'];
};

/** All input for the `updateSession` mutation. */
export type UpdateSessionInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `Session` being updated. */
  patch: SessionPatch;
  rowId: Scalars['String']['input'];
};

/** The output of our update `Session` mutation. */
export type UpdateSessionPayload = {
  __typename?: 'UpdateSessionPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Session` that was updated by this mutation. */
  session?: Maybe<Session>;
  /** An edge for our `Session`. May be used by Relay 1. */
  sessionEdge?: Maybe<SessionEdge>;
};


/** The output of our update `Session` mutation. */
export type UpdateSessionPayloadSessionEdgeArgs = {
  orderBy?: Array<SessionOrderBy>;
};

/** All input for the `updateTaskById` mutation. */
export type UpdateTaskByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Task` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `Task` being updated. */
  patch: TaskPatch;
};

/** All input for the `updateTask` mutation. */
export type UpdateTaskInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `Task` being updated. */
  patch: TaskPatch;
  rowId: Scalars['UUID']['input'];
};

/** The output of our update `Task` mutation. */
export type UpdateTaskPayload = {
  __typename?: 'UpdateTaskPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Task` that was updated by this mutation. */
  task?: Maybe<Task>;
  /** An edge for our `Task`. May be used by Relay 1. */
  taskEdge?: Maybe<TaskEdge>;
};


/** The output of our update `Task` mutation. */
export type UpdateTaskPayloadTaskEdgeArgs = {
  orderBy?: Array<TaskOrderBy>;
};

/** All input for the `updateUserByEmail` mutation. */
export type UpdateUserByEmailInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  /** An object where the defined keys will be set on the `User` being updated. */
  patch: UserPatch;
};

/** All input for the `updateUserById` mutation. */
export type UpdateUserByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `User` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `User` being updated. */
  patch: UserPatch;
};

/** All input for the `updateUserByUsername` mutation. */
export type UpdateUserByUsernameInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `User` being updated. */
  patch: UserPatch;
  username: Scalars['String']['input'];
};

/** All input for the `updateUser` mutation. */
export type UpdateUserInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `User` being updated. */
  patch: UserPatch;
  rowId: Scalars['String']['input'];
};

/** The output of our update `User` mutation. */
export type UpdateUserPayload = {
  __typename?: 'UpdateUserPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `User` that was updated by this mutation. */
  user?: Maybe<User>;
  /** An edge for our `User`. May be used by Relay 1. */
  userEdge?: Maybe<UserEdge>;
};


/** The output of our update `User` mutation. */
export type UpdateUserPayloadUserEdgeArgs = {
  orderBy?: Array<UserOrderBy>;
};

/** All input for the `updateVerificationById` mutation. */
export type UpdateVerificationByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** The globally unique `ID` which will identify a single `Verification` to be updated. */
  id: Scalars['ID']['input'];
  /** An object where the defined keys will be set on the `Verification` being updated. */
  patch: VerificationPatch;
};

/** All input for the `updateVerification` mutation. */
export type UpdateVerificationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  /** An object where the defined keys will be set on the `Verification` being updated. */
  patch: VerificationPatch;
  rowId: Scalars['String']['input'];
};

/** The output of our update `Verification` mutation. */
export type UpdateVerificationPayload = {
  __typename?: 'UpdateVerificationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Verification` that was updated by this mutation. */
  verification?: Maybe<Verification>;
  /** An edge for our `Verification`. May be used by Relay 1. */
  verificationEdge?: Maybe<VerificationEdge>;
};


/** The output of our update `Verification` mutation. */
export type UpdateVerificationPayloadVerificationEdgeArgs = {
  orderBy?: Array<VerificationOrderBy>;
};

export type User = Node & {
  __typename?: 'User';
  /** Reads and enables pagination through a set of `Account`. */
  accounts: AccountConnection;
  createdAt: Scalars['Datetime']['output'];
  email: Scalars['String']['output'];
  emailVerified: Scalars['Boolean']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  rowId: Scalars['String']['output'];
  /** Reads and enables pagination through a set of `Session`. */
  sessions: SessionConnection;
  /** Reads and enables pagination through a set of `Task`. */
  tasks: TaskConnection;
  updatedAt: Scalars['Datetime']['output'];
  username?: Maybe<Scalars['String']['output']>;
};


export type UserAccountsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<AccountCondition>;
  filter?: InputMaybe<AccountFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AccountOrderBy>>;
};


export type UserSessionsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<SessionCondition>;
  filter?: InputMaybe<SessionFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SessionOrderBy>>;
};


export type UserTasksArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  condition?: InputMaybe<TaskCondition>;
  filter?: InputMaybe<TaskFilter>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TaskOrderBy>>;
};

/** A condition to be used against `User` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type UserCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `email` field. */
  email?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `emailVerified` field. */
  emailVerified?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks for equality with the object’s `image` field. */
  image?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `username` field. */
  username?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `User` values. */
export type UserConnection = {
  __typename?: 'UserConnection';
  /** A list of edges which contains the `User` and cursor to aid in pagination. */
  edges: Array<UserEdge>;
  /** A list of `User` objects. */
  nodes: Array<User>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `User` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `User` edge in the connection. */
export type UserEdge = {
  __typename?: 'UserEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `User` at the end of the edge. */
  node: User;
};

/** A filter to be used against `User` object types. All fields are combined with a logical ‘and.’ */
export type UserFilter = {
  /** Filter by the object’s `accounts` relation. */
  accounts?: InputMaybe<UserToManyAccountFilter>;
  /** Some related `accounts` exist. */
  accountsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<UserFilter>>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `email` field. */
  email?: InputMaybe<StringFilter>;
  /** Filter by the object’s `emailVerified` field. */
  emailVerified?: InputMaybe<BooleanFilter>;
  /** Filter by the object’s `image` field. */
  image?: InputMaybe<StringFilter>;
  /** Filter by the object’s `name` field. */
  name?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<UserFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<UserFilter>>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<StringFilter>;
  /** Filter by the object’s `sessions` relation. */
  sessions?: InputMaybe<UserToManySessionFilter>;
  /** Some related `sessions` exist. */
  sessionsExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `tasks` relation. */
  tasks?: InputMaybe<UserToManyTaskFilter>;
  /** Some related `tasks` exist. */
  tasksExist?: InputMaybe<Scalars['Boolean']['input']>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `username` field. */
  username?: InputMaybe<StringFilter>;
};

/** An input for mutations affecting `User` */
export type UserInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  email: Scalars['String']['input'];
  emailVerified?: InputMaybe<Scalars['Boolean']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  rowId: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

/** Methods to use when ordering `User`. */
export enum UserOrderBy {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  EmailAsc = 'EMAIL_ASC',
  EmailDesc = 'EMAIL_DESC',
  EmailVerifiedAsc = 'EMAIL_VERIFIED_ASC',
  EmailVerifiedDesc = 'EMAIL_VERIFIED_DESC',
  ImageAsc = 'IMAGE_ASC',
  ImageDesc = 'IMAGE_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  UsernameAsc = 'USERNAME_ASC',
  UsernameDesc = 'USERNAME_DESC'
}

/** Represents an update to a `User`. Fields that are set will be updated. */
export type UserPatch = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  emailVerified?: InputMaybe<Scalars['Boolean']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  rowId?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

/** A filter to be used against many `Account` object types. All fields are combined with a logical ‘and.’ */
export type UserToManyAccountFilter = {
  /** Every related `Account` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<AccountFilter>;
  /** No related `Account` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<AccountFilter>;
  /** Some related `Account` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<AccountFilter>;
};

/** A filter to be used against many `Session` object types. All fields are combined with a logical ‘and.’ */
export type UserToManySessionFilter = {
  /** Every related `Session` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<SessionFilter>;
  /** No related `Session` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<SessionFilter>;
  /** Some related `Session` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<SessionFilter>;
};

/** A filter to be used against many `Task` object types. All fields are combined with a logical ‘and.’ */
export type UserToManyTaskFilter = {
  /** Every related `Task` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<TaskFilter>;
  /** No related `Task` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<TaskFilter>;
  /** Some related `Task` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<TaskFilter>;
};

export type Verification = Node & {
  __typename?: 'Verification';
  createdAt: Scalars['Datetime']['output'];
  expiresAt: Scalars['Datetime']['output'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID']['output'];
  identifier: Scalars['String']['output'];
  rowId: Scalars['String']['output'];
  updatedAt: Scalars['Datetime']['output'];
  value: Scalars['String']['output'];
};

/**
 * A condition to be used against `Verification` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type VerificationCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `expiresAt` field. */
  expiresAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `identifier` field. */
  identifier?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `rowId` field. */
  rowId?: InputMaybe<Scalars['String']['input']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  /** Checks for equality with the object’s `value` field. */
  value?: InputMaybe<Scalars['String']['input']>;
};

/** A connection to a list of `Verification` values. */
export type VerificationConnection = {
  __typename?: 'VerificationConnection';
  /** A list of edges which contains the `Verification` and cursor to aid in pagination. */
  edges: Array<VerificationEdge>;
  /** A list of `Verification` objects. */
  nodes: Array<Verification>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Verification` you could get from the connection. */
  totalCount: Scalars['Int']['output'];
};

/** A `Verification` edge in the connection. */
export type VerificationEdge = {
  __typename?: 'VerificationEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']['output']>;
  /** The `Verification` at the end of the edge. */
  node: Verification;
};

/** A filter to be used against `Verification` object types. All fields are combined with a logical ‘and.’ */
export type VerificationFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<VerificationFilter>>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `expiresAt` field. */
  expiresAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `identifier` field. */
  identifier?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<VerificationFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<VerificationFilter>>;
  /** Filter by the object’s `rowId` field. */
  rowId?: InputMaybe<StringFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `value` field. */
  value?: InputMaybe<StringFilter>;
};

/** An input for mutations affecting `Verification` */
export type VerificationInput = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  expiresAt: Scalars['Datetime']['input'];
  identifier: Scalars['String']['input'];
  rowId: Scalars['String']['input'];
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  value: Scalars['String']['input'];
};

/** Methods to use when ordering `Verification`. */
export enum VerificationOrderBy {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  ExpiresAtAsc = 'EXPIRES_AT_ASC',
  ExpiresAtDesc = 'EXPIRES_AT_DESC',
  IdentifierAsc = 'IDENTIFIER_ASC',
  IdentifierDesc = 'IDENTIFIER_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RowIdAsc = 'ROW_ID_ASC',
  RowIdDesc = 'ROW_ID_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  ValueAsc = 'VALUE_ASC',
  ValueDesc = 'VALUE_DESC'
}

/** Represents an update to a `Verification`. Fields that are set will be updated. */
export type VerificationPatch = {
  createdAt?: InputMaybe<Scalars['Datetime']['input']>;
  expiresAt?: InputMaybe<Scalars['Datetime']['input']>;
  identifier?: InputMaybe<Scalars['String']['input']>;
  rowId?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['Datetime']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

export type TaskFieldsFragment = { __typename?: 'Task', id: string, name: string, description: string, completed: boolean, createdAt: Date, updatedAt: Date, userId: string, rowId: string };

export type GetTaskByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetTaskByIdQuery = { __typename?: 'Query', taskById?: { __typename?: 'Task', id: string, name: string, description: string, completed: boolean, createdAt: Date, updatedAt: Date, userId: string, rowId: string } | null };

export type CreateTaskMutationVariables = Exact<{
  input: CreateTaskInput;
}>;


export type CreateTaskMutation = { __typename?: 'Mutation', createTask?: { __typename?: 'CreateTaskPayload', task?: { __typename?: 'Task', id: string, name: string, description: string, completed: boolean, createdAt: Date, updatedAt: Date, userId: string, rowId: string } | null } | null };

export type UpdateTaskMutationVariables = Exact<{
  input: UpdateTaskByIdInput;
}>;


export type UpdateTaskMutation = { __typename?: 'Mutation', updateTaskById?: { __typename?: 'UpdateTaskPayload', task?: { __typename?: 'Task', id: string, name: string, description: string, completed: boolean, createdAt: Date, updatedAt: Date, userId: string, rowId: string } | null } | null };

export type DeleteTaskMutationVariables = Exact<{
  input: DeleteTaskInput;
}>;


export type DeleteTaskMutation = { __typename?: 'Mutation', deleteTask?: { __typename?: 'DeleteTaskPayload', clientMutationId?: string | null } | null };

export type GetUserTasksQueryVariables = Exact<{
  userId: Scalars['String']['input'];
  first?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetUserTasksQuery = { __typename?: 'Query', tasks?: { __typename?: 'TaskConnection', totalCount: number, nodes: Array<{ __typename?: 'Task', id: string, name: string, description: string, completed: boolean, createdAt: Date, updatedAt: Date, userId: string, rowId: string }> } | null };

export const TaskFieldsFragmentDoc = gql`
    fragment TaskFields on Task {
  id
  name
  description
  completed
  createdAt
  updatedAt
  userId
  rowId
}
    `;
export const GetTaskByIdDocument = gql`
    query GetTaskById($id: ID!) {
  taskById(id: $id) {
    ...TaskFields
  }
}
    ${TaskFieldsFragmentDoc}`;
export const CreateTaskDocument = gql`
    mutation CreateTask($input: CreateTaskInput!) {
  createTask(input: $input) {
    task {
      ...TaskFields
    }
  }
}
    ${TaskFieldsFragmentDoc}`;
export const UpdateTaskDocument = gql`
    mutation UpdateTask($input: UpdateTaskByIdInput!) {
  updateTaskById(input: $input) {
    task {
      ...TaskFields
    }
  }
}
    ${TaskFieldsFragmentDoc}`;
export const DeleteTaskDocument = gql`
    mutation DeleteTask($input: DeleteTaskInput!) {
  deleteTask(input: $input) {
    clientMutationId
  }
}
    `;
export const GetUserTasksDocument = gql`
    query GetUserTasks($userId: String!, $first: Int, $offset: Int) {
  tasks(condition: {userId: $userId}, first: $first, offset: $offset) {
    nodes {
      ...TaskFields
    }
    totalCount
  }
}
    ${TaskFieldsFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    GetTaskById(variables: GetTaskByIdQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<GetTaskByIdQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetTaskByIdQuery>({ document: GetTaskByIdDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'GetTaskById', 'query', variables);
    },
    CreateTask(variables: CreateTaskMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<CreateTaskMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateTaskMutation>({ document: CreateTaskDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'CreateTask', 'mutation', variables);
    },
    UpdateTask(variables: UpdateTaskMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<UpdateTaskMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateTaskMutation>({ document: UpdateTaskDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'UpdateTask', 'mutation', variables);
    },
    DeleteTask(variables: DeleteTaskMutationVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<DeleteTaskMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteTaskMutation>({ document: DeleteTaskDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'DeleteTask', 'mutation', variables);
    },
    GetUserTasks(variables: GetUserTasksQueryVariables, requestHeaders?: GraphQLClientRequestHeaders, signal?: RequestInit['signal']): Promise<GetUserTasksQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetUserTasksQuery>({ document: GetUserTasksDocument, variables, requestHeaders: { ...requestHeaders, ...wrappedRequestHeaders }, signal }), 'GetUserTasks', 'query', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;