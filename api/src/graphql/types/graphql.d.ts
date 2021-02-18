import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  JSON: any;
};











export type _AddChangeRequestRequested_ByPayload = {
  __typename?: '_AddChangeRequestRequested_byPayload';
  /**
   * Field for the ChangeRequest node this requested_by
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is coming from.
   */
  from?: Maybe<ChangeRequest>;
  /**
   * Field for the User node this requested_by
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is going to.
   */
  to?: Maybe<User>;
};

export type _AddChangeRequestRequested_ForPayload = {
  __typename?: '_AddChangeRequestRequested_forPayload';
  /**
   * Field for the ChangeRequest node this requested_for
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is coming from.
   */
  from?: Maybe<ChangeRequest>;
  /**
   * Field for the WateringTask node this requested_for
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is going to.
   */
  to?: Maybe<WateringTask>;
};

export type _AddChangeRequestRequested_New_TaskPayload = {
  __typename?: '_AddChangeRequestRequested_new_taskPayload';
  /**
   * Field for the ChangeRequest node this requested_new_task
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is coming from.
   */
  from?: Maybe<ChangeRequest>;
  /**
   * Field for the WateringTask node this requested_new_task
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is going to.
   */
  to?: Maybe<WateringTask>;
};

export type _AddChangeRequestRequested_ToPayload = {
  __typename?: '_AddChangeRequestRequested_toPayload';
  /**
   * Field for the ChangeRequest node this requested_to
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is coming from.
   */
  from?: Maybe<ChangeRequest>;
  /**
   * Field for the User node this requested_to
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is going to.
   */
  to?: Maybe<User>;
};

export type _AddLogEventRefers_ToPayload = {
  __typename?: '_AddLogEventRefers_toPayload';
  /**
   * Field for the LogEvent node this refers_to
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is coming from.
   */
  from?: Maybe<LogEvent>;
  /**
   * Field for the WateringTask node this refers_to
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is going to.
   */
  to?: Maybe<WateringTask>;
};

export type _AddLogEventTriggered_ByPayload = {
  __typename?: '_AddLogEventTriggered_byPayload';
  /**
   * Field for the LogEvent node this triggered_by
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is coming from.
   */
  from?: Maybe<LogEvent>;
  /**
   * Field for the User node this triggered_by
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is going to.
   */
  to?: Maybe<User>;
};

export type _AddUserAssignedPayload = {
  __typename?: '_AddUserAssignedPayload';
  /**
   * Field for the User node this assigned
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is coming from.
   */
  from?: Maybe<User>;
  /**
   * Field for the WateringTask node this assigned
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is going to.
   */
  to?: Maybe<WateringTask>;
};

export type _AddUserAvailablePayload = {
  __typename?: '_AddUserAvailablePayload';
  /**
   * Field for the User node this available
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is coming from.
   */
  from?: Maybe<User>;
  /**
   * Field for the WateringTask node this available
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is going to.
   */
  to?: Maybe<WateringTask>;
};

export type _AddUserChangerequests_Requested_ByPayload = {
  __typename?: '_AddUserChangerequests_requested_byPayload';
  /**
   * Field for the ChangeRequest node this requested_by
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is coming from.
   */
  from?: Maybe<ChangeRequest>;
  /**
   * Field for the User node this requested_by
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is going to.
   */
  to?: Maybe<User>;
};

export type _AddUserChangerequests_Requested_ToPayload = {
  __typename?: '_AddUserChangerequests_requested_toPayload';
  /**
   * Field for the ChangeRequest node this requested_to
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is coming from.
   */
  from?: Maybe<ChangeRequest>;
  /**
   * Field for the User node this requested_to
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is going to.
   */
  to?: Maybe<User>;
};

export type _AddUserLogevents_Triggered_ByPayload = {
  __typename?: '_AddUserLogevents_triggered_byPayload';
  /**
   * Field for the LogEvent node this triggered_by
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is coming from.
   */
  from?: Maybe<LogEvent>;
  /**
   * Field for the User node this triggered_by
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is going to.
   */
  to?: Maybe<User>;
};

export type _AddWateringTaskChangerequests_Requested_ForPayload = {
  __typename?: '_AddWateringTaskChangerequests_requested_forPayload';
  /**
   * Field for the ChangeRequest node this requested_for
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is coming from.
   */
  from?: Maybe<ChangeRequest>;
  /**
   * Field for the WateringTask node this requested_for
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is going to.
   */
  to?: Maybe<WateringTask>;
};

export type _AddWateringTaskChangerequests_Requested_New_TaskPayload = {
  __typename?: '_AddWateringTaskChangerequests_requested_new_taskPayload';
  /**
   * Field for the ChangeRequest node this requested_new_task
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is coming from.
   */
  from?: Maybe<ChangeRequest>;
  /**
   * Field for the WateringTask node this requested_new_task
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is going to.
   */
  to?: Maybe<WateringTask>;
};

export type _AddWateringTaskLogevents_Refers_ToPayload = {
  __typename?: '_AddWateringTaskLogevents_refers_toPayload';
  /**
   * Field for the LogEvent node this refers_to
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is coming from.
   */
  from?: Maybe<LogEvent>;
  /**
   * Field for the WateringTask node this refers_to
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is going to.
   */
  to?: Maybe<WateringTask>;
};

export type _AddWateringTaskUsers_AssignedPayload = {
  __typename?: '_AddWateringTaskUsers_assignedPayload';
  /**
   * Field for the User node this assigned
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is coming from.
   */
  from?: Maybe<User>;
  /**
   * Field for the WateringTask node this assigned
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is going to.
   */
  to?: Maybe<WateringTask>;
};

export type _AddWateringTaskUsers_AvailablePayload = {
  __typename?: '_AddWateringTaskUsers_availablePayload';
  /**
   * Field for the User node this available
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is coming from.
   */
  from?: Maybe<User>;
  /**
   * Field for the WateringTask node this available
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is going to.
   */
  to?: Maybe<WateringTask>;
};

export type _ChangeRequestFilter = {
  AND?: Maybe<Array<_ChangeRequestFilter>>;
  OR?: Maybe<Array<_ChangeRequestFilter>>;
  label?: Maybe<Scalars['String']>;
  label_not?: Maybe<Scalars['String']>;
  label_in?: Maybe<Array<Scalars['String']>>;
  label_not_in?: Maybe<Array<Scalars['String']>>;
  label_contains?: Maybe<Scalars['String']>;
  label_not_contains?: Maybe<Scalars['String']>;
  label_starts_with?: Maybe<Scalars['String']>;
  label_not_starts_with?: Maybe<Scalars['String']>;
  label_ends_with?: Maybe<Scalars['String']>;
  label_not_ends_with?: Maybe<Scalars['String']>;
  neo4jImportId?: Maybe<Scalars['String']>;
  neo4jImportId_not?: Maybe<Scalars['String']>;
  neo4jImportId_in?: Maybe<Array<Scalars['String']>>;
  neo4jImportId_not_in?: Maybe<Array<Scalars['String']>>;
  neo4jImportId_contains?: Maybe<Scalars['String']>;
  neo4jImportId_not_contains?: Maybe<Scalars['String']>;
  neo4jImportId_starts_with?: Maybe<Scalars['String']>;
  neo4jImportId_not_starts_with?: Maybe<Scalars['String']>;
  neo4jImportId_ends_with?: Maybe<Scalars['String']>;
  neo4jImportId_not_ends_with?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  type_not?: Maybe<Scalars['String']>;
  type_in?: Maybe<Array<Scalars['String']>>;
  type_not_in?: Maybe<Array<Scalars['String']>>;
  type_contains?: Maybe<Scalars['String']>;
  type_not_contains?: Maybe<Scalars['String']>;
  type_starts_with?: Maybe<Scalars['String']>;
  type_not_starts_with?: Maybe<Scalars['String']>;
  type_ends_with?: Maybe<Scalars['String']>;
  type_not_ends_with?: Maybe<Scalars['String']>;
  requested_by?: Maybe<_UserFilter>;
  requested_by_not?: Maybe<_UserFilter>;
  requested_by_in?: Maybe<Array<_UserFilter>>;
  requested_by_not_in?: Maybe<Array<_UserFilter>>;
  requested_by_some?: Maybe<_UserFilter>;
  requested_by_none?: Maybe<_UserFilter>;
  requested_by_single?: Maybe<_UserFilter>;
  requested_by_every?: Maybe<_UserFilter>;
  requested_for?: Maybe<_WateringTaskFilter>;
  requested_for_not?: Maybe<_WateringTaskFilter>;
  requested_for_in?: Maybe<Array<_WateringTaskFilter>>;
  requested_for_not_in?: Maybe<Array<_WateringTaskFilter>>;
  requested_for_some?: Maybe<_WateringTaskFilter>;
  requested_for_none?: Maybe<_WateringTaskFilter>;
  requested_for_single?: Maybe<_WateringTaskFilter>;
  requested_for_every?: Maybe<_WateringTaskFilter>;
  requested_to?: Maybe<_UserFilter>;
  requested_to_not?: Maybe<_UserFilter>;
  requested_to_in?: Maybe<Array<_UserFilter>>;
  requested_to_not_in?: Maybe<Array<_UserFilter>>;
  requested_to_some?: Maybe<_UserFilter>;
  requested_to_none?: Maybe<_UserFilter>;
  requested_to_single?: Maybe<_UserFilter>;
  requested_to_every?: Maybe<_UserFilter>;
  requested_new_task?: Maybe<_WateringTaskFilter>;
  requested_new_task_not?: Maybe<_WateringTaskFilter>;
  requested_new_task_in?: Maybe<Array<_WateringTaskFilter>>;
  requested_new_task_not_in?: Maybe<Array<_WateringTaskFilter>>;
  requested_new_task_some?: Maybe<_WateringTaskFilter>;
  requested_new_task_none?: Maybe<_WateringTaskFilter>;
  requested_new_task_single?: Maybe<_WateringTaskFilter>;
  requested_new_task_every?: Maybe<_WateringTaskFilter>;
};

export type _ChangeRequestInput = {
  label: Scalars['String'];
};

export enum _ChangeRequestOrdering {
  LabelAsc = 'label_asc',
  LabelDesc = 'label_desc',
  Neo4jImportIdAsc = 'neo4jImportId_asc',
  Neo4jImportIdDesc = 'neo4jImportId_desc',
  TypeAsc = 'type_asc',
  TypeDesc = 'type_desc',
  IdAsc = '_id_asc',
  IdDesc = '_id_desc'
}

export type _LogEventFilter = {
  AND?: Maybe<Array<_LogEventFilter>>;
  OR?: Maybe<Array<_LogEventFilter>>;
  date?: Maybe<Scalars['String']>;
  date_not?: Maybe<Scalars['String']>;
  date_in?: Maybe<Array<Scalars['String']>>;
  date_not_in?: Maybe<Array<Scalars['String']>>;
  date_contains?: Maybe<Scalars['String']>;
  date_not_contains?: Maybe<Scalars['String']>;
  date_starts_with?: Maybe<Scalars['String']>;
  date_not_starts_with?: Maybe<Scalars['String']>;
  date_ends_with?: Maybe<Scalars['String']>;
  date_not_ends_with?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  label_not?: Maybe<Scalars['String']>;
  label_in?: Maybe<Array<Scalars['String']>>;
  label_not_in?: Maybe<Array<Scalars['String']>>;
  label_contains?: Maybe<Scalars['String']>;
  label_not_contains?: Maybe<Scalars['String']>;
  label_starts_with?: Maybe<Scalars['String']>;
  label_not_starts_with?: Maybe<Scalars['String']>;
  label_ends_with?: Maybe<Scalars['String']>;
  label_not_ends_with?: Maybe<Scalars['String']>;
  neo4jImportId?: Maybe<Scalars['String']>;
  neo4jImportId_not?: Maybe<Scalars['String']>;
  neo4jImportId_in?: Maybe<Array<Scalars['String']>>;
  neo4jImportId_not_in?: Maybe<Array<Scalars['String']>>;
  neo4jImportId_contains?: Maybe<Scalars['String']>;
  neo4jImportId_not_contains?: Maybe<Scalars['String']>;
  neo4jImportId_starts_with?: Maybe<Scalars['String']>;
  neo4jImportId_not_starts_with?: Maybe<Scalars['String']>;
  neo4jImportId_ends_with?: Maybe<Scalars['String']>;
  neo4jImportId_not_ends_with?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  type_not?: Maybe<Scalars['String']>;
  type_in?: Maybe<Array<Scalars['String']>>;
  type_not_in?: Maybe<Array<Scalars['String']>>;
  type_contains?: Maybe<Scalars['String']>;
  type_not_contains?: Maybe<Scalars['String']>;
  type_starts_with?: Maybe<Scalars['String']>;
  type_not_starts_with?: Maybe<Scalars['String']>;
  type_ends_with?: Maybe<Scalars['String']>;
  type_not_ends_with?: Maybe<Scalars['String']>;
  triggered_by?: Maybe<_UserFilter>;
  triggered_by_not?: Maybe<_UserFilter>;
  triggered_by_in?: Maybe<Array<_UserFilter>>;
  triggered_by_not_in?: Maybe<Array<_UserFilter>>;
  triggered_by_some?: Maybe<_UserFilter>;
  triggered_by_none?: Maybe<_UserFilter>;
  triggered_by_single?: Maybe<_UserFilter>;
  triggered_by_every?: Maybe<_UserFilter>;
  refers_to?: Maybe<_WateringTaskFilter>;
  refers_to_not?: Maybe<_WateringTaskFilter>;
  refers_to_in?: Maybe<Array<_WateringTaskFilter>>;
  refers_to_not_in?: Maybe<Array<_WateringTaskFilter>>;
  refers_to_some?: Maybe<_WateringTaskFilter>;
  refers_to_none?: Maybe<_WateringTaskFilter>;
  refers_to_single?: Maybe<_WateringTaskFilter>;
  refers_to_every?: Maybe<_WateringTaskFilter>;
};

export type _LogEventInput = {
  date: Scalars['String'];
};

export enum _LogEventOrdering {
  DateAsc = 'date_asc',
  DateDesc = 'date_desc',
  LabelAsc = 'label_asc',
  LabelDesc = 'label_desc',
  Neo4jImportIdAsc = 'neo4jImportId_asc',
  Neo4jImportIdDesc = 'neo4jImportId_desc',
  TypeAsc = 'type_asc',
  TypeDesc = 'type_desc',
  IdAsc = '_id_asc',
  IdDesc = '_id_desc'
}

export type _MergeChangeRequestRequested_ByPayload = {
  __typename?: '_MergeChangeRequestRequested_byPayload';
  /**
   * Field for the ChangeRequest node this requested_by
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is coming from.
   */
  from?: Maybe<ChangeRequest>;
  /**
   * Field for the User node this requested_by
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is going to.
   */
  to?: Maybe<User>;
};

export type _MergeChangeRequestRequested_ForPayload = {
  __typename?: '_MergeChangeRequestRequested_forPayload';
  /**
   * Field for the ChangeRequest node this requested_for
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is coming from.
   */
  from?: Maybe<ChangeRequest>;
  /**
   * Field for the WateringTask node this requested_for
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is going to.
   */
  to?: Maybe<WateringTask>;
};

export type _MergeChangeRequestRequested_New_TaskPayload = {
  __typename?: '_MergeChangeRequestRequested_new_taskPayload';
  /**
   * Field for the ChangeRequest node this requested_new_task
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is coming from.
   */
  from?: Maybe<ChangeRequest>;
  /**
   * Field for the WateringTask node this requested_new_task
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is going to.
   */
  to?: Maybe<WateringTask>;
};

export type _MergeChangeRequestRequested_ToPayload = {
  __typename?: '_MergeChangeRequestRequested_toPayload';
  /**
   * Field for the ChangeRequest node this requested_to
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is coming from.
   */
  from?: Maybe<ChangeRequest>;
  /**
   * Field for the User node this requested_to
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is going to.
   */
  to?: Maybe<User>;
};

export type _MergeLogEventRefers_ToPayload = {
  __typename?: '_MergeLogEventRefers_toPayload';
  /**
   * Field for the LogEvent node this refers_to
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is coming from.
   */
  from?: Maybe<LogEvent>;
  /**
   * Field for the WateringTask node this refers_to
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is going to.
   */
  to?: Maybe<WateringTask>;
};

export type _MergeLogEventTriggered_ByPayload = {
  __typename?: '_MergeLogEventTriggered_byPayload';
  /**
   * Field for the LogEvent node this triggered_by
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is coming from.
   */
  from?: Maybe<LogEvent>;
  /**
   * Field for the User node this triggered_by
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is going to.
   */
  to?: Maybe<User>;
};

export type _MergeUserAssignedPayload = {
  __typename?: '_MergeUserAssignedPayload';
  /**
   * Field for the User node this assigned
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is coming from.
   */
  from?: Maybe<User>;
  /**
   * Field for the WateringTask node this assigned
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is going to.
   */
  to?: Maybe<WateringTask>;
};

export type _MergeUserAvailablePayload = {
  __typename?: '_MergeUserAvailablePayload';
  /**
   * Field for the User node this available
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is coming from.
   */
  from?: Maybe<User>;
  /**
   * Field for the WateringTask node this available
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is going to.
   */
  to?: Maybe<WateringTask>;
};

export type _MergeUserChangerequests_Requested_ByPayload = {
  __typename?: '_MergeUserChangerequests_requested_byPayload';
  /**
   * Field for the ChangeRequest node this requested_by
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is coming from.
   */
  from?: Maybe<ChangeRequest>;
  /**
   * Field for the User node this requested_by
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is going to.
   */
  to?: Maybe<User>;
};

export type _MergeUserChangerequests_Requested_ToPayload = {
  __typename?: '_MergeUserChangerequests_requested_toPayload';
  /**
   * Field for the ChangeRequest node this requested_to
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is coming from.
   */
  from?: Maybe<ChangeRequest>;
  /**
   * Field for the User node this requested_to
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is going to.
   */
  to?: Maybe<User>;
};

export type _MergeUserLogevents_Triggered_ByPayload = {
  __typename?: '_MergeUserLogevents_triggered_byPayload';
  /**
   * Field for the LogEvent node this triggered_by
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is coming from.
   */
  from?: Maybe<LogEvent>;
  /**
   * Field for the User node this triggered_by
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is going to.
   */
  to?: Maybe<User>;
};

export type _MergeWateringTaskChangerequests_Requested_ForPayload = {
  __typename?: '_MergeWateringTaskChangerequests_requested_forPayload';
  /**
   * Field for the ChangeRequest node this requested_for
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is coming from.
   */
  from?: Maybe<ChangeRequest>;
  /**
   * Field for the WateringTask node this requested_for
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is going to.
   */
  to?: Maybe<WateringTask>;
};

export type _MergeWateringTaskChangerequests_Requested_New_TaskPayload = {
  __typename?: '_MergeWateringTaskChangerequests_requested_new_taskPayload';
  /**
   * Field for the ChangeRequest node this requested_new_task
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is coming from.
   */
  from?: Maybe<ChangeRequest>;
  /**
   * Field for the WateringTask node this requested_new_task
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is going to.
   */
  to?: Maybe<WateringTask>;
};

export type _MergeWateringTaskLogevents_Refers_ToPayload = {
  __typename?: '_MergeWateringTaskLogevents_refers_toPayload';
  /**
   * Field for the LogEvent node this refers_to
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is coming from.
   */
  from?: Maybe<LogEvent>;
  /**
   * Field for the WateringTask node this refers_to
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is going to.
   */
  to?: Maybe<WateringTask>;
};

export type _MergeWateringTaskUsers_AssignedPayload = {
  __typename?: '_MergeWateringTaskUsers_assignedPayload';
  /**
   * Field for the User node this assigned
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is coming from.
   */
  from?: Maybe<User>;
  /**
   * Field for the WateringTask node this assigned
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is going to.
   */
  to?: Maybe<WateringTask>;
};

export type _MergeWateringTaskUsers_AvailablePayload = {
  __typename?: '_MergeWateringTaskUsers_availablePayload';
  /**
   * Field for the User node this available
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is coming from.
   */
  from?: Maybe<User>;
  /**
   * Field for the WateringTask node this available
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is going to.
   */
  to?: Maybe<WateringTask>;
};

/** Generated Date object type for Neo4j [Temporal fields](https://grandstack.io/docs/graphql-temporal-types-datetime#using-temporal-fields-in-queries). */
export type _Neo4jDate = {
  __typename?: '_Neo4jDate';
  year?: Maybe<Scalars['Int']>;
  month?: Maybe<Scalars['Int']>;
  day?: Maybe<Scalars['Int']>;
  /**
   * Outputs a Neo4j [Temporal](https://grandstack.io/docs/graphql-temporal-types-datetime#using-temporal-fields-in-queries)
   * Date value as a String type by using the [toString](https://neo4j.com/docs/cypher-manual/current/functions/string/#functions-tostring)
   * Cypher function.
   */
  formatted?: Maybe<Scalars['String']>;
};

/** Generated Date input object for Neo4j [Temporal field arguments](https://grandstack.io/docs/graphql-temporal-types-datetime/#temporal-query-arguments). */
export type _Neo4jDateInput = {
  year?: Maybe<Scalars['Int']>;
  month?: Maybe<Scalars['Int']>;
  day?: Maybe<Scalars['Int']>;
  /**
   * Creates a Neo4j [Temporal](https://grandstack.io/docs/graphql-temporal-types-datetime/#using-temporal-fields-in-mutations)
   * Date value using a [String format](https://neo4j.com/docs/cypher-manual/current/functions/temporal/date/#functions-date-create-string).
   */
  formatted?: Maybe<Scalars['String']>;
};

/** Generated DateTime object type for Neo4j [Temporal fields](https://grandstack.io/docs/graphql-temporal-types-datetime#using-temporal-fields-in-queries). */
export type _Neo4jDateTime = {
  __typename?: '_Neo4jDateTime';
  year?: Maybe<Scalars['Int']>;
  month?: Maybe<Scalars['Int']>;
  day?: Maybe<Scalars['Int']>;
  hour?: Maybe<Scalars['Int']>;
  minute?: Maybe<Scalars['Int']>;
  second?: Maybe<Scalars['Int']>;
  millisecond?: Maybe<Scalars['Int']>;
  microsecond?: Maybe<Scalars['Int']>;
  nanosecond?: Maybe<Scalars['Int']>;
  timezone?: Maybe<Scalars['String']>;
  /**
   * Outputs a Neo4j [Temporal](https://grandstack.io/docs/graphql-temporal-types-datetime#using-temporal-fields-in-queries)
   * DateTime value as a String type by using the [toString](https://neo4j.com/docs/cypher-manual/current/functions/string/#functions-tostring)
   * Cypher function.
   */
  formatted?: Maybe<Scalars['String']>;
};

/** Generated DateTime input object for Neo4j [Temporal field arguments](https://grandstack.io/docs/graphql-temporal-types-datetime/#temporal-query-arguments). */
export type _Neo4jDateTimeInput = {
  year?: Maybe<Scalars['Int']>;
  month?: Maybe<Scalars['Int']>;
  day?: Maybe<Scalars['Int']>;
  hour?: Maybe<Scalars['Int']>;
  minute?: Maybe<Scalars['Int']>;
  second?: Maybe<Scalars['Int']>;
  millisecond?: Maybe<Scalars['Int']>;
  microsecond?: Maybe<Scalars['Int']>;
  nanosecond?: Maybe<Scalars['Int']>;
  timezone?: Maybe<Scalars['String']>;
  /**
   * Creates a Neo4j [Temporal](https://grandstack.io/docs/graphql-temporal-types-datetime/#using-temporal-fields-in-mutations)
   * DateTime value using a [String format](https://neo4j.com/docs/cypher-manual/current/functions/temporal/datetime/#functions-datetime-create-string).
   */
  formatted?: Maybe<Scalars['String']>;
};

/** Generated LocalDateTime object type for Neo4j [Temporal fields](https://grandstack.io/docs/graphql-temporal-types-datetime#using-temporal-fields-in-queries). */
export type _Neo4jLocalDateTime = {
  __typename?: '_Neo4jLocalDateTime';
  year?: Maybe<Scalars['Int']>;
  month?: Maybe<Scalars['Int']>;
  day?: Maybe<Scalars['Int']>;
  hour?: Maybe<Scalars['Int']>;
  minute?: Maybe<Scalars['Int']>;
  second?: Maybe<Scalars['Int']>;
  millisecond?: Maybe<Scalars['Int']>;
  microsecond?: Maybe<Scalars['Int']>;
  nanosecond?: Maybe<Scalars['Int']>;
  /**
   * Outputs a Neo4j [Temporal](https://grandstack.io/docs/graphql-temporal-types-datetime#using-temporal-fields-in-queries)
   * LocalDateTime value as a String type by using the [toString](https://neo4j.com/docs/cypher-manual/current/functions/string/#functions-tostring)
   * Cypher function.
   */
  formatted?: Maybe<Scalars['String']>;
};

/** Generated LocalDateTime input object for Neo4j [Temporal field arguments](https://grandstack.io/docs/graphql-temporal-types-datetime/#temporal-query-arguments). */
export type _Neo4jLocalDateTimeInput = {
  year?: Maybe<Scalars['Int']>;
  month?: Maybe<Scalars['Int']>;
  day?: Maybe<Scalars['Int']>;
  hour?: Maybe<Scalars['Int']>;
  minute?: Maybe<Scalars['Int']>;
  second?: Maybe<Scalars['Int']>;
  millisecond?: Maybe<Scalars['Int']>;
  microsecond?: Maybe<Scalars['Int']>;
  nanosecond?: Maybe<Scalars['Int']>;
  /**
   * Creates a Neo4j [Temporal](https://grandstack.io/docs/graphql-temporal-types-datetime/#using-temporal-fields-in-mutations)
   * LocalDateTime value using a [String format](https://neo4j.com/docs/cypher-manual/current/functions/temporal/localdatetime/#functions-localdatetime-create-string).
   */
  formatted?: Maybe<Scalars['String']>;
};

/** Generated LocalTime object type for Neo4j [Temporal fields](https://grandstack.io/docs/graphql-temporal-types-datetime#using-temporal-fields-in-queries). */
export type _Neo4jLocalTime = {
  __typename?: '_Neo4jLocalTime';
  hour?: Maybe<Scalars['Int']>;
  minute?: Maybe<Scalars['Int']>;
  second?: Maybe<Scalars['Int']>;
  millisecond?: Maybe<Scalars['Int']>;
  microsecond?: Maybe<Scalars['Int']>;
  nanosecond?: Maybe<Scalars['Int']>;
  /**
   * Outputs a Neo4j [Temporal](https://grandstack.io/docs/graphql-temporal-types-datetime#using-temporal-fields-in-queries)
   * LocalTime value as a String type by using the [toString](https://neo4j.com/docs/cypher-manual/current/functions/string/#functions-tostring)
   * Cypher function.
   */
  formatted?: Maybe<Scalars['String']>;
};

/** Generated LocalTime input object for Neo4j [Temporal field arguments](https://grandstack.io/docs/graphql-temporal-types-datetime/#temporal-query-arguments). */
export type _Neo4jLocalTimeInput = {
  hour?: Maybe<Scalars['Int']>;
  minute?: Maybe<Scalars['Int']>;
  second?: Maybe<Scalars['Int']>;
  millisecond?: Maybe<Scalars['Int']>;
  microsecond?: Maybe<Scalars['Int']>;
  nanosecond?: Maybe<Scalars['Int']>;
  /**
   * Creates a Neo4j [Temporal](https://grandstack.io/docs/graphql-temporal-types-datetime/#using-temporal-fields-in-mutations)
   * LocalTime value using a [String format](https://neo4j.com/docs/cypher-manual/current/functions/temporal/localtime/#functions-localtime-create-string).
   */
  formatted?: Maybe<Scalars['String']>;
};

/** Generated Point object type for Neo4j [Spatial fields](https://grandstack.io/docs/graphql-spatial-types#using-point-in-queries). */
export type _Neo4jPoint = {
  __typename?: '_Neo4jPoint';
  x?: Maybe<Scalars['Float']>;
  y?: Maybe<Scalars['Float']>;
  z?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
  latitude?: Maybe<Scalars['Float']>;
  height?: Maybe<Scalars['Float']>;
  crs?: Maybe<Scalars['String']>;
  srid?: Maybe<Scalars['Int']>;
};

export type _Neo4jPointDistanceFilter = {
  point: _Neo4jPointInput;
  distance: Scalars['Float'];
};

/** Generated Point input object for Neo4j [Spatial field arguments](https://grandstack.io/docs/graphql-spatial-types/#point-query-arguments). */
export type _Neo4jPointInput = {
  x?: Maybe<Scalars['Float']>;
  y?: Maybe<Scalars['Float']>;
  z?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
  latitude?: Maybe<Scalars['Float']>;
  height?: Maybe<Scalars['Float']>;
  crs?: Maybe<Scalars['String']>;
  srid?: Maybe<Scalars['Int']>;
};

/** Generated Time object type for Neo4j [Temporal fields](https://grandstack.io/docs/graphql-temporal-types-datetime#using-temporal-fields-in-queries). */
export type _Neo4jTime = {
  __typename?: '_Neo4jTime';
  hour?: Maybe<Scalars['Int']>;
  minute?: Maybe<Scalars['Int']>;
  second?: Maybe<Scalars['Int']>;
  millisecond?: Maybe<Scalars['Int']>;
  microsecond?: Maybe<Scalars['Int']>;
  nanosecond?: Maybe<Scalars['Int']>;
  timezone?: Maybe<Scalars['String']>;
  /**
   * Outputs a Neo4j [Temporal](https://grandstack.io/docs/graphql-temporal-types-datetime#using-temporal-fields-in-queries)
   * Time value as a String type by using the [toString](https://neo4j.com/docs/cypher-manual/current/functions/string/#functions-tostring)
   * Cypher function.
   */
  formatted?: Maybe<Scalars['String']>;
};

/** Generated Time input object for Neo4j [Temporal field arguments](https://grandstack.io/docs/graphql-temporal-types-datetime/#temporal-query-arguments). */
export type _Neo4jTimeInput = {
  hour?: Maybe<Scalars['Int']>;
  minute?: Maybe<Scalars['Int']>;
  second?: Maybe<Scalars['Int']>;
  millisecond?: Maybe<Scalars['Int']>;
  microsecond?: Maybe<Scalars['Int']>;
  nanosecond?: Maybe<Scalars['Int']>;
  timezone?: Maybe<Scalars['String']>;
  /**
   * Creates a Neo4j [Temporal](https://grandstack.io/docs/graphql-temporal-types-datetime/#using-temporal-fields-in-mutations)
   * Time value using a [String format](https://neo4j.com/docs/cypher-manual/current/functions/temporal/time/#functions-time-create-string).
   */
  formatted?: Maybe<Scalars['String']>;
};

export enum _RelationDirections {
  In = 'IN',
  Out = 'OUT'
}

export type _RemoveChangeRequestRequested_ByPayload = {
  __typename?: '_RemoveChangeRequestRequested_byPayload';
  /**
   * Field for the ChangeRequest node this requested_by
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is coming from.
   */
  from?: Maybe<ChangeRequest>;
  /**
   * Field for the User node this requested_by
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is going to.
   */
  to?: Maybe<User>;
};

export type _RemoveChangeRequestRequested_ForPayload = {
  __typename?: '_RemoveChangeRequestRequested_forPayload';
  /**
   * Field for the ChangeRequest node this requested_for
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is coming from.
   */
  from?: Maybe<ChangeRequest>;
  /**
   * Field for the WateringTask node this requested_for
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is going to.
   */
  to?: Maybe<WateringTask>;
};

export type _RemoveChangeRequestRequested_New_TaskPayload = {
  __typename?: '_RemoveChangeRequestRequested_new_taskPayload';
  /**
   * Field for the ChangeRequest node this requested_new_task
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is coming from.
   */
  from?: Maybe<ChangeRequest>;
  /**
   * Field for the WateringTask node this requested_new_task
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is going to.
   */
  to?: Maybe<WateringTask>;
};

export type _RemoveChangeRequestRequested_ToPayload = {
  __typename?: '_RemoveChangeRequestRequested_toPayload';
  /**
   * Field for the ChangeRequest node this requested_to
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is coming from.
   */
  from?: Maybe<ChangeRequest>;
  /**
   * Field for the User node this requested_to
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is going to.
   */
  to?: Maybe<User>;
};

export type _RemoveLogEventRefers_ToPayload = {
  __typename?: '_RemoveLogEventRefers_toPayload';
  /**
   * Field for the LogEvent node this refers_to
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is coming from.
   */
  from?: Maybe<LogEvent>;
  /**
   * Field for the WateringTask node this refers_to
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is going to.
   */
  to?: Maybe<WateringTask>;
};

export type _RemoveLogEventTriggered_ByPayload = {
  __typename?: '_RemoveLogEventTriggered_byPayload';
  /**
   * Field for the LogEvent node this triggered_by
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is coming from.
   */
  from?: Maybe<LogEvent>;
  /**
   * Field for the User node this triggered_by
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is going to.
   */
  to?: Maybe<User>;
};

export type _RemoveUserAssignedPayload = {
  __typename?: '_RemoveUserAssignedPayload';
  /**
   * Field for the User node this assigned
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is coming from.
   */
  from?: Maybe<User>;
  /**
   * Field for the WateringTask node this assigned
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is going to.
   */
  to?: Maybe<WateringTask>;
};

export type _RemoveUserAvailablePayload = {
  __typename?: '_RemoveUserAvailablePayload';
  /**
   * Field for the User node this available
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is coming from.
   */
  from?: Maybe<User>;
  /**
   * Field for the WateringTask node this available
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is going to.
   */
  to?: Maybe<WateringTask>;
};

export type _RemoveUserChangerequests_Requested_ByPayload = {
  __typename?: '_RemoveUserChangerequests_requested_byPayload';
  /**
   * Field for the ChangeRequest node this requested_by
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is coming from.
   */
  from?: Maybe<ChangeRequest>;
  /**
   * Field for the User node this requested_by
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is going to.
   */
  to?: Maybe<User>;
};

export type _RemoveUserChangerequests_Requested_ToPayload = {
  __typename?: '_RemoveUserChangerequests_requested_toPayload';
  /**
   * Field for the ChangeRequest node this requested_to
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is coming from.
   */
  from?: Maybe<ChangeRequest>;
  /**
   * Field for the User node this requested_to
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is going to.
   */
  to?: Maybe<User>;
};

export type _RemoveUserLogevents_Triggered_ByPayload = {
  __typename?: '_RemoveUserLogevents_triggered_byPayload';
  /**
   * Field for the LogEvent node this triggered_by
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is coming from.
   */
  from?: Maybe<LogEvent>;
  /**
   * Field for the User node this triggered_by
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is going to.
   */
  to?: Maybe<User>;
};

export type _RemoveWateringTaskChangerequests_Requested_ForPayload = {
  __typename?: '_RemoveWateringTaskChangerequests_requested_forPayload';
  /**
   * Field for the ChangeRequest node this requested_for
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is coming from.
   */
  from?: Maybe<ChangeRequest>;
  /**
   * Field for the WateringTask node this requested_for
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is going to.
   */
  to?: Maybe<WateringTask>;
};

export type _RemoveWateringTaskChangerequests_Requested_New_TaskPayload = {
  __typename?: '_RemoveWateringTaskChangerequests_requested_new_taskPayload';
  /**
   * Field for the ChangeRequest node this requested_new_task
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is coming from.
   */
  from?: Maybe<ChangeRequest>;
  /**
   * Field for the WateringTask node this requested_new_task
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is going to.
   */
  to?: Maybe<WateringTask>;
};

export type _RemoveWateringTaskLogevents_Refers_ToPayload = {
  __typename?: '_RemoveWateringTaskLogevents_refers_toPayload';
  /**
   * Field for the LogEvent node this refers_to
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is coming from.
   */
  from?: Maybe<LogEvent>;
  /**
   * Field for the WateringTask node this refers_to
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is going to.
   */
  to?: Maybe<WateringTask>;
};

export type _RemoveWateringTaskUsers_AssignedPayload = {
  __typename?: '_RemoveWateringTaskUsers_assignedPayload';
  /**
   * Field for the User node this assigned
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is coming from.
   */
  from?: Maybe<User>;
  /**
   * Field for the WateringTask node this assigned
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is going to.
   */
  to?: Maybe<WateringTask>;
};

export type _RemoveWateringTaskUsers_AvailablePayload = {
  __typename?: '_RemoveWateringTaskUsers_availablePayload';
  /**
   * Field for the User node this available
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is coming from.
   */
  from?: Maybe<User>;
  /**
   * Field for the WateringTask node this available
   * [relationship](https://grandstack.io/docs/graphql-relationship-types) is going to.
   */
  to?: Maybe<WateringTask>;
};

export type _UserFilter = {
  AND?: Maybe<Array<_UserFilter>>;
  OR?: Maybe<Array<_UserFilter>>;
  id?: Maybe<Scalars['String']>;
  id_not?: Maybe<Scalars['String']>;
  id_in?: Maybe<Array<Scalars['String']>>;
  id_not_in?: Maybe<Array<Scalars['String']>>;
  id_contains?: Maybe<Scalars['String']>;
  id_not_contains?: Maybe<Scalars['String']>;
  id_starts_with?: Maybe<Scalars['String']>;
  id_not_starts_with?: Maybe<Scalars['String']>;
  id_ends_with?: Maybe<Scalars['String']>;
  id_not_ends_with?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  label_not?: Maybe<Scalars['String']>;
  label_in?: Maybe<Array<Scalars['String']>>;
  label_not_in?: Maybe<Array<Scalars['String']>>;
  label_contains?: Maybe<Scalars['String']>;
  label_not_contains?: Maybe<Scalars['String']>;
  label_starts_with?: Maybe<Scalars['String']>;
  label_not_starts_with?: Maybe<Scalars['String']>;
  label_ends_with?: Maybe<Scalars['String']>;
  label_not_ends_with?: Maybe<Scalars['String']>;
  neo4jImportId?: Maybe<Scalars['String']>;
  neo4jImportId_not?: Maybe<Scalars['String']>;
  neo4jImportId_in?: Maybe<Array<Scalars['String']>>;
  neo4jImportId_not_in?: Maybe<Array<Scalars['String']>>;
  neo4jImportId_contains?: Maybe<Scalars['String']>;
  neo4jImportId_not_contains?: Maybe<Scalars['String']>;
  neo4jImportId_starts_with?: Maybe<Scalars['String']>;
  neo4jImportId_not_starts_with?: Maybe<Scalars['String']>;
  neo4jImportId_ends_with?: Maybe<Scalars['String']>;
  neo4jImportId_not_ends_with?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  type_not?: Maybe<Scalars['String']>;
  type_in?: Maybe<Array<Scalars['String']>>;
  type_not_in?: Maybe<Array<Scalars['String']>>;
  type_contains?: Maybe<Scalars['String']>;
  type_not_contains?: Maybe<Scalars['String']>;
  type_starts_with?: Maybe<Scalars['String']>;
  type_not_starts_with?: Maybe<Scalars['String']>;
  type_ends_with?: Maybe<Scalars['String']>;
  type_not_ends_with?: Maybe<Scalars['String']>;
  assigned?: Maybe<_WateringTaskFilter>;
  assigned_not?: Maybe<_WateringTaskFilter>;
  assigned_in?: Maybe<Array<_WateringTaskFilter>>;
  assigned_not_in?: Maybe<Array<_WateringTaskFilter>>;
  assigned_some?: Maybe<_WateringTaskFilter>;
  assigned_none?: Maybe<_WateringTaskFilter>;
  assigned_single?: Maybe<_WateringTaskFilter>;
  assigned_every?: Maybe<_WateringTaskFilter>;
  available?: Maybe<_WateringTaskFilter>;
  available_not?: Maybe<_WateringTaskFilter>;
  available_in?: Maybe<Array<_WateringTaskFilter>>;
  available_not_in?: Maybe<Array<_WateringTaskFilter>>;
  available_some?: Maybe<_WateringTaskFilter>;
  available_none?: Maybe<_WateringTaskFilter>;
  available_single?: Maybe<_WateringTaskFilter>;
  available_every?: Maybe<_WateringTaskFilter>;
  changerequests_requested_by?: Maybe<_ChangeRequestFilter>;
  changerequests_requested_by_not?: Maybe<_ChangeRequestFilter>;
  changerequests_requested_by_in?: Maybe<Array<_ChangeRequestFilter>>;
  changerequests_requested_by_not_in?: Maybe<Array<_ChangeRequestFilter>>;
  changerequests_requested_by_some?: Maybe<_ChangeRequestFilter>;
  changerequests_requested_by_none?: Maybe<_ChangeRequestFilter>;
  changerequests_requested_by_single?: Maybe<_ChangeRequestFilter>;
  changerequests_requested_by_every?: Maybe<_ChangeRequestFilter>;
  changerequests_requested_to?: Maybe<_ChangeRequestFilter>;
  changerequests_requested_to_not?: Maybe<_ChangeRequestFilter>;
  changerequests_requested_to_in?: Maybe<Array<_ChangeRequestFilter>>;
  changerequests_requested_to_not_in?: Maybe<Array<_ChangeRequestFilter>>;
  changerequests_requested_to_some?: Maybe<_ChangeRequestFilter>;
  changerequests_requested_to_none?: Maybe<_ChangeRequestFilter>;
  changerequests_requested_to_single?: Maybe<_ChangeRequestFilter>;
  changerequests_requested_to_every?: Maybe<_ChangeRequestFilter>;
  logevents_triggered_by?: Maybe<_LogEventFilter>;
  logevents_triggered_by_not?: Maybe<_LogEventFilter>;
  logevents_triggered_by_in?: Maybe<Array<_LogEventFilter>>;
  logevents_triggered_by_not_in?: Maybe<Array<_LogEventFilter>>;
  logevents_triggered_by_some?: Maybe<_LogEventFilter>;
  logevents_triggered_by_none?: Maybe<_LogEventFilter>;
  logevents_triggered_by_single?: Maybe<_LogEventFilter>;
  logevents_triggered_by_every?: Maybe<_LogEventFilter>;
};

export type _UserInput = {
  id: Scalars['String'];
};

export enum _UserOrdering {
  IdAsc = 'id_asc',
  IdDesc = 'id_desc',
  LabelAsc = 'label_asc',
  LabelDesc = 'label_desc',
  Neo4jImportIdAsc = 'neo4jImportId_asc',
  Neo4jImportIdDesc = 'neo4jImportId_desc',
  TypeAsc = 'type_asc',
  TypeDesc = 'type_desc',
  _IdAsc = '_id_asc',
  _IdDesc = '_id_desc'
}

export type _UserSettingsFilter = {
  AND?: Maybe<Array<_UserSettingsFilter>>;
  OR?: Maybe<Array<_UserSettingsFilter>>;
  ui_locale?: Maybe<Scalars['String']>;
  ui_locale_not?: Maybe<Scalars['String']>;
  ui_locale_in?: Maybe<Array<Scalars['String']>>;
  ui_locale_not_in?: Maybe<Array<Scalars['String']>>;
  ui_locale_contains?: Maybe<Scalars['String']>;
  ui_locale_not_contains?: Maybe<Scalars['String']>;
  ui_locale_starts_with?: Maybe<Scalars['String']>;
  ui_locale_not_starts_with?: Maybe<Scalars['String']>;
  ui_locale_ends_with?: Maybe<Scalars['String']>;
  ui_locale_not_ends_with?: Maybe<Scalars['String']>;
  letitrain_maximum_tasks?: Maybe<Scalars['Int']>;
  letitrain_maximum_tasks_not?: Maybe<Scalars['Int']>;
  letitrain_maximum_tasks_in?: Maybe<Array<Scalars['Int']>>;
  letitrain_maximum_tasks_not_in?: Maybe<Array<Scalars['Int']>>;
  letitrain_maximum_tasks_lt?: Maybe<Scalars['Int']>;
  letitrain_maximum_tasks_lte?: Maybe<Scalars['Int']>;
  letitrain_maximum_tasks_gt?: Maybe<Scalars['Int']>;
  letitrain_maximum_tasks_gte?: Maybe<Scalars['Int']>;
};

export type _UserSettingsInput = {
  ui_locale: Scalars['String'];
};

export enum _UserSettingsOrdering {
  UiLocaleAsc = 'ui_locale_asc',
  UiLocaleDesc = 'ui_locale_desc',
  LetitrainMaximumTasksAsc = 'letitrain_maximum_tasks_asc',
  LetitrainMaximumTasksDesc = 'letitrain_maximum_tasks_desc',
  IdAsc = '_id_asc',
  IdDesc = '_id_desc'
}

export type _WateringPeriodFilter = {
  AND?: Maybe<Array<_WateringPeriodFilter>>;
  OR?: Maybe<Array<_WateringPeriodFilter>>;
  from?: Maybe<_Neo4jDateInput>;
  from_not?: Maybe<_Neo4jDateInput>;
  from_in?: Maybe<Array<_Neo4jDateInput>>;
  from_not_in?: Maybe<Array<_Neo4jDateInput>>;
  from_lt?: Maybe<_Neo4jDateInput>;
  from_lte?: Maybe<_Neo4jDateInput>;
  from_gt?: Maybe<_Neo4jDateInput>;
  from_gte?: Maybe<_Neo4jDateInput>;
  till?: Maybe<_Neo4jDateInput>;
  till_not?: Maybe<_Neo4jDateInput>;
  till_in?: Maybe<Array<_Neo4jDateInput>>;
  till_not_in?: Maybe<Array<_Neo4jDateInput>>;
  till_lt?: Maybe<_Neo4jDateInput>;
  till_lte?: Maybe<_Neo4jDateInput>;
  till_gt?: Maybe<_Neo4jDateInput>;
  till_gte?: Maybe<_Neo4jDateInput>;
  wateringtasks?: Maybe<_WateringTaskFilter>;
  wateringtasks_not?: Maybe<_WateringTaskFilter>;
  wateringtasks_in?: Maybe<Array<_WateringTaskFilter>>;
  wateringtasks_not_in?: Maybe<Array<_WateringTaskFilter>>;
  wateringtasks_some?: Maybe<_WateringTaskFilter>;
  wateringtasks_none?: Maybe<_WateringTaskFilter>;
  wateringtasks_single?: Maybe<_WateringTaskFilter>;
  wateringtasks_every?: Maybe<_WateringTaskFilter>;
};

export enum _WateringPeriodOrdering {
  FromAsc = 'from_asc',
  FromDesc = 'from_desc',
  TillAsc = 'till_asc',
  TillDesc = 'till_desc',
  HasUsersAssignedAsc = 'hasUsersAssigned_asc',
  HasUsersAssignedDesc = 'hasUsersAssigned_desc',
  IdAsc = '_id_asc',
  IdDesc = '_id_desc'
}

export type _WateringTaskFilter = {
  AND?: Maybe<Array<_WateringTaskFilter>>;
  OR?: Maybe<Array<_WateringTaskFilter>>;
  date?: Maybe<_Neo4jDateInput>;
  date_not?: Maybe<_Neo4jDateInput>;
  date_in?: Maybe<Array<_Neo4jDateInput>>;
  date_not_in?: Maybe<Array<_Neo4jDateInput>>;
  date_lt?: Maybe<_Neo4jDateInput>;
  date_lte?: Maybe<_Neo4jDateInput>;
  date_gt?: Maybe<_Neo4jDateInput>;
  date_gte?: Maybe<_Neo4jDateInput>;
  done?: Maybe<Scalars['Boolean']>;
  done_not?: Maybe<Scalars['Boolean']>;
  neo4jImportId?: Maybe<Scalars['String']>;
  neo4jImportId_not?: Maybe<Scalars['String']>;
  neo4jImportId_in?: Maybe<Array<Scalars['String']>>;
  neo4jImportId_not_in?: Maybe<Array<Scalars['String']>>;
  neo4jImportId_contains?: Maybe<Scalars['String']>;
  neo4jImportId_not_contains?: Maybe<Scalars['String']>;
  neo4jImportId_starts_with?: Maybe<Scalars['String']>;
  neo4jImportId_not_starts_with?: Maybe<Scalars['String']>;
  neo4jImportId_ends_with?: Maybe<Scalars['String']>;
  neo4jImportId_not_ends_with?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  type_not?: Maybe<Scalars['String']>;
  type_in?: Maybe<Array<Scalars['String']>>;
  type_not_in?: Maybe<Array<Scalars['String']>>;
  type_contains?: Maybe<Scalars['String']>;
  type_not_contains?: Maybe<Scalars['String']>;
  type_starts_with?: Maybe<Scalars['String']>;
  type_not_starts_with?: Maybe<Scalars['String']>;
  type_ends_with?: Maybe<Scalars['String']>;
  type_not_ends_with?: Maybe<Scalars['String']>;
  users_assigned?: Maybe<_UserFilter>;
  users_assigned_not?: Maybe<_UserFilter>;
  users_assigned_in?: Maybe<Array<_UserFilter>>;
  users_assigned_not_in?: Maybe<Array<_UserFilter>>;
  users_assigned_some?: Maybe<_UserFilter>;
  users_assigned_none?: Maybe<_UserFilter>;
  users_assigned_single?: Maybe<_UserFilter>;
  users_assigned_every?: Maybe<_UserFilter>;
  changerequests_requested_for?: Maybe<_ChangeRequestFilter>;
  changerequests_requested_for_not?: Maybe<_ChangeRequestFilter>;
  changerequests_requested_for_in?: Maybe<Array<_ChangeRequestFilter>>;
  changerequests_requested_for_not_in?: Maybe<Array<_ChangeRequestFilter>>;
  changerequests_requested_for_some?: Maybe<_ChangeRequestFilter>;
  changerequests_requested_for_none?: Maybe<_ChangeRequestFilter>;
  changerequests_requested_for_single?: Maybe<_ChangeRequestFilter>;
  changerequests_requested_for_every?: Maybe<_ChangeRequestFilter>;
  changerequests_requested_new_task?: Maybe<_ChangeRequestFilter>;
  changerequests_requested_new_task_not?: Maybe<_ChangeRequestFilter>;
  changerequests_requested_new_task_in?: Maybe<Array<_ChangeRequestFilter>>;
  changerequests_requested_new_task_not_in?: Maybe<Array<_ChangeRequestFilter>>;
  changerequests_requested_new_task_some?: Maybe<_ChangeRequestFilter>;
  changerequests_requested_new_task_none?: Maybe<_ChangeRequestFilter>;
  changerequests_requested_new_task_single?: Maybe<_ChangeRequestFilter>;
  changerequests_requested_new_task_every?: Maybe<_ChangeRequestFilter>;
  logevents_refers_to?: Maybe<_LogEventFilter>;
  logevents_refers_to_not?: Maybe<_LogEventFilter>;
  logevents_refers_to_in?: Maybe<Array<_LogEventFilter>>;
  logevents_refers_to_not_in?: Maybe<Array<_LogEventFilter>>;
  logevents_refers_to_some?: Maybe<_LogEventFilter>;
  logevents_refers_to_none?: Maybe<_LogEventFilter>;
  logevents_refers_to_single?: Maybe<_LogEventFilter>;
  logevents_refers_to_every?: Maybe<_LogEventFilter>;
  users_available?: Maybe<_UserFilter>;
  users_available_not?: Maybe<_UserFilter>;
  users_available_in?: Maybe<Array<_UserFilter>>;
  users_available_not_in?: Maybe<Array<_UserFilter>>;
  users_available_some?: Maybe<_UserFilter>;
  users_available_none?: Maybe<_UserFilter>;
  users_available_single?: Maybe<_UserFilter>;
  users_available_every?: Maybe<_UserFilter>;
  wateringperiod?: Maybe<_WateringPeriodFilter>;
  wateringperiod_not?: Maybe<_WateringPeriodFilter>;
  wateringperiod_in?: Maybe<Array<_WateringPeriodFilter>>;
  wateringperiod_not_in?: Maybe<Array<_WateringPeriodFilter>>;
  wateringperiod_some?: Maybe<_WateringPeriodFilter>;
  wateringperiod_none?: Maybe<_WateringPeriodFilter>;
  wateringperiod_single?: Maybe<_WateringPeriodFilter>;
  wateringperiod_every?: Maybe<_WateringPeriodFilter>;
};

export type _WateringTaskInput = {
  neo4jImportId: Scalars['String'];
};

export enum _WateringTaskOrdering {
  DateAsc = 'date_asc',
  DateDesc = 'date_desc',
  DoneAsc = 'done_asc',
  DoneDesc = 'done_desc',
  Neo4jImportIdAsc = 'neo4jImportId_asc',
  Neo4jImportIdDesc = 'neo4jImportId_desc',
  TypeAsc = 'type_asc',
  TypeDesc = 'type_desc',
  IdAsc = '_id_asc',
  IdDesc = '_id_desc'
}

export type ChangeRequest = {
  __typename?: 'ChangeRequest';
  /** Generated field for querying the Neo4j [system id](https://neo4j.com/docs/cypher-manual/current/functions/scalar/#functions-id) of this node. */
  _id?: Maybe<Scalars['String']>;
  label: Scalars['String'];
  neo4jImportId: Scalars['String'];
  type: Scalars['String'];
  requested_by?: Maybe<Array<Maybe<User>>>;
  requested_for?: Maybe<Array<Maybe<WateringTask>>>;
  requested_to?: Maybe<Array<Maybe<User>>>;
  requested_new_task?: Maybe<Array<Maybe<WateringTask>>>;
};


export type ChangeRequestRequested_ByArgs = {
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<Maybe<_UserOrdering>>>;
  filter?: Maybe<_UserFilter>;
};


export type ChangeRequestRequested_ForArgs = {
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<Maybe<_WateringTaskOrdering>>>;
  filter?: Maybe<_WateringTaskFilter>;
};


export type ChangeRequestRequested_ToArgs = {
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<Maybe<_UserOrdering>>>;
  filter?: Maybe<_UserFilter>;
};


export type ChangeRequestRequested_New_TaskArgs = {
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<Maybe<_WateringTaskOrdering>>>;
  filter?: Maybe<_WateringTaskFilter>;
};


export type LogEvent = {
  __typename?: 'LogEvent';
  /** Generated field for querying the Neo4j [system id](https://neo4j.com/docs/cypher-manual/current/functions/scalar/#functions-id) of this node. */
  _id?: Maybe<Scalars['String']>;
  date: Scalars['String'];
  label: Scalars['String'];
  neo4jImportId: Scalars['String'];
  type: Scalars['String'];
  triggered_by?: Maybe<Array<Maybe<User>>>;
  refers_to?: Maybe<Array<Maybe<WateringTask>>>;
};


export type LogEventTriggered_ByArgs = {
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<Maybe<_UserOrdering>>>;
  filter?: Maybe<_UserFilter>;
};


export type LogEventRefers_ToArgs = {
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<Maybe<_WateringTaskOrdering>>>;
  filter?: Maybe<_WateringTaskFilter>;
};

export type Mutation = {
  __typename?: 'Mutation';
  ownMergeUserSettings?: Maybe<UserSettings>;
  seedNeo4jFromJSON?: Maybe<Scalars['Boolean']>;
  setUserAvailability?: Maybe<Scalars['Boolean']>;
  seedAvailabilitiesFromTests?: Maybe<Scalars['Boolean']>;
  planWateringPeriods?: Maybe<Scalars['JSON']>;
  pushSubscribe?: Maybe<Scalars['Boolean']>;
  publishToAll?: Maybe<Scalars['Boolean']>;
  sendWelcomeMail?: Maybe<Scalars['Boolean']>;
  /** [Generated mutation](https://grandstack.io/docs/graphql-schema-generation-augmentation/##add--remove-relationship) for [creating](https://neo4j.com/docs/cypher-manual/4.1/clauses/create/#create-relationships) the assigned relationship. */
  AddUserAssigned?: Maybe<_AddUserAssignedPayload>;
  /** [Generated mutation](https://grandstack.io/docs/graphql-schema-generation-augmentation/##add--remove-relationship) for [deleting](https://neo4j.com/docs/cypher-manual/4.1/clauses/delete/#delete-delete-relationships-only) the assigned relationship. */
  RemoveUserAssigned?: Maybe<_RemoveUserAssignedPayload>;
  /** [Generated mutation](https://grandstack.io/docs/graphql-schema-generation-augmentation/##merge-relationship) for [merging](https://neo4j.com/docs/cypher-manual/4.1/clauses/merge/#query-merge-relationships) the assigned relationship. */
  MergeUserAssigned?: Maybe<_MergeUserAssignedPayload>;
  /** [Generated mutation](https://grandstack.io/docs/graphql-schema-generation-augmentation/##add--remove-relationship) for [creating](https://neo4j.com/docs/cypher-manual/4.1/clauses/create/#create-relationships) the available relationship. */
  AddUserAvailable?: Maybe<_AddUserAvailablePayload>;
  /** [Generated mutation](https://grandstack.io/docs/graphql-schema-generation-augmentation/##add--remove-relationship) for [deleting](https://neo4j.com/docs/cypher-manual/4.1/clauses/delete/#delete-delete-relationships-only) the available relationship. */
  RemoveUserAvailable?: Maybe<_RemoveUserAvailablePayload>;
  /** [Generated mutation](https://grandstack.io/docs/graphql-schema-generation-augmentation/##merge-relationship) for [merging](https://neo4j.com/docs/cypher-manual/4.1/clauses/merge/#query-merge-relationships) the available relationship. */
  MergeUserAvailable?: Maybe<_MergeUserAvailablePayload>;
  /** [Generated mutation](https://grandstack.io/docs/graphql-schema-generation-augmentation/##add--remove-relationship) for [creating](https://neo4j.com/docs/cypher-manual/4.1/clauses/create/#create-relationships) the requested_by relationship. */
  AddUserChangerequests_requested_by?: Maybe<_AddUserChangerequests_Requested_ByPayload>;
  /** [Generated mutation](https://grandstack.io/docs/graphql-schema-generation-augmentation/##add--remove-relationship) for [deleting](https://neo4j.com/docs/cypher-manual/4.1/clauses/delete/#delete-delete-relationships-only) the requested_by relationship. */
  RemoveUserChangerequests_requested_by?: Maybe<_RemoveUserChangerequests_Requested_ByPayload>;
  /** [Generated mutation](https://grandstack.io/docs/graphql-schema-generation-augmentation/##merge-relationship) for [merging](https://neo4j.com/docs/cypher-manual/4.1/clauses/merge/#query-merge-relationships) the requested_by relationship. */
  MergeUserChangerequests_requested_by?: Maybe<_MergeUserChangerequests_Requested_ByPayload>;
  /** [Generated mutation](https://grandstack.io/docs/graphql-schema-generation-augmentation/##add--remove-relationship) for [creating](https://neo4j.com/docs/cypher-manual/4.1/clauses/create/#create-relationships) the requested_to relationship. */
  AddUserChangerequests_requested_to?: Maybe<_AddUserChangerequests_Requested_ToPayload>;
  /** [Generated mutation](https://grandstack.io/docs/graphql-schema-generation-augmentation/##add--remove-relationship) for [deleting](https://neo4j.com/docs/cypher-manual/4.1/clauses/delete/#delete-delete-relationships-only) the requested_to relationship. */
  RemoveUserChangerequests_requested_to?: Maybe<_RemoveUserChangerequests_Requested_ToPayload>;
  /** [Generated mutation](https://grandstack.io/docs/graphql-schema-generation-augmentation/##merge-relationship) for [merging](https://neo4j.com/docs/cypher-manual/4.1/clauses/merge/#query-merge-relationships) the requested_to relationship. */
  MergeUserChangerequests_requested_to?: Maybe<_MergeUserChangerequests_Requested_ToPayload>;
  /** [Generated mutation](https://grandstack.io/docs/graphql-schema-generation-augmentation/##add--remove-relationship) for [creating](https://neo4j.com/docs/cypher-manual/4.1/clauses/create/#create-relationships) the triggered_by relationship. */
  AddUserLogevents_triggered_by?: Maybe<_AddUserLogevents_Triggered_ByPayload>;
  /** [Generated mutation](https://grandstack.io/docs/graphql-schema-generation-augmentation/##add--remove-relationship) for [deleting](https://neo4j.com/docs/cypher-manual/4.1/clauses/delete/#delete-delete-relationships-only) the triggered_by relationship. */
  RemoveUserLogevents_triggered_by?: Maybe<_RemoveUserLogevents_Triggered_ByPayload>;
  /** [Generated mutation](https://grandstack.io/docs/graphql-schema-generation-augmentation/##merge-relationship) for [merging](https://neo4j.com/docs/cypher-manual/4.1/clauses/merge/#query-merge-relationships) the triggered_by relationship. */
  MergeUserLogevents_triggered_by?: Maybe<_MergeUserLogevents_Triggered_ByPayload>;
  /** [Generated mutation](https://grandstack.io/docs/graphql-schema-generation-augmentation/#create) for [creating](https://neo4j.com/docs/cypher-manual/4.1/clauses/create/#create-nodes) a User node. */
  CreateUser?: Maybe<User>;
  /** [Generated mutation](https://grandstack.io/docs/graphql-schema-generation-augmentation/#update) for [updating](https://neo4j.com/docs/cypher-manual/4.1/clauses/set/#set-update-a-property) a User node. */
  UpdateUser?: Maybe<User>;
  /** [Generated mutation](https://grandstack.io/docs/graphql-schema-generation-augmentation/#delete) for [deleting](https://neo4j.com/docs/cypher-manual/4.1/clauses/delete/#delete-delete-single-node) a User node. */
  DeleteUser?: Maybe<User>;
  /** [Generated mutation](https://grandstack.io/docs/graphql-schema-generation-augmentation/#merge) for [merging](https://neo4j.com/docs/cypher-manual/4.1/clauses/merge/#query-merge-node-derived) a User node. */
  MergeUser?: Maybe<User>;
  /** [Generated mutation](https://grandstack.io/docs/graphql-schema-generation-augmentation/##add--remove-relationship) for [creating](https://neo4j.com/docs/cypher-manual/4.1/clauses/create/#create-relationships) the assigned relationship. */
  AddWateringTaskUsers_assigned?: Maybe<_AddWateringTaskUsers_AssignedPayload>;
  /** [Generated mutation](https://grandstack.io/docs/graphql-schema-generation-augmentation/##add--remove-relationship) for [deleting](https://neo4j.com/docs/cypher-manual/4.1/clauses/delete/#delete-delete-relationships-only) the assigned relationship. */
  RemoveWateringTaskUsers_assigned?: Maybe<_RemoveWateringTaskUsers_AssignedPayload>;
  /** [Generated mutation](https://grandstack.io/docs/graphql-schema-generation-augmentation/##merge-relationship) for [merging](https://neo4j.com/docs/cypher-manual/4.1/clauses/merge/#query-merge-relationships) the assigned relationship. */
  MergeWateringTaskUsers_assigned?: Maybe<_MergeWateringTaskUsers_AssignedPayload>;
  /** [Generated mutation](https://grandstack.io/docs/graphql-schema-generation-augmentation/##add--remove-relationship) for [creating](https://neo4j.com/docs/cypher-manual/4.1/clauses/create/#create-relationships) the requested_for relationship. */
  AddWateringTaskChangerequests_requested_for?: Maybe<_AddWateringTaskChangerequests_Requested_ForPayload>;
  /** [Generated mutation](https://grandstack.io/docs/graphql-schema-generation-augmentation/##add--remove-relationship) for [deleting](https://neo4j.com/docs/cypher-manual/4.1/clauses/delete/#delete-delete-relationships-only) the requested_for relationship. */
  RemoveWateringTaskChangerequests_requested_for?: Maybe<_RemoveWateringTaskChangerequests_Requested_ForPayload>;
  /** [Generated mutation](https://grandstack.io/docs/graphql-schema-generation-augmentation/##merge-relationship) for [merging](https://neo4j.com/docs/cypher-manual/4.1/clauses/merge/#query-merge-relationships) the requested_for relationship. */
  MergeWateringTaskChangerequests_requested_for?: Maybe<_MergeWateringTaskChangerequests_Requested_ForPayload>;
  /** [Generated mutation](https://grandstack.io/docs/graphql-schema-generation-augmentation/##add--remove-relationship) for [creating](https://neo4j.com/docs/cypher-manual/4.1/clauses/create/#create-relationships) the requested_new_task relationship. */
  AddWateringTaskChangerequests_requested_new_task?: Maybe<_AddWateringTaskChangerequests_Requested_New_TaskPayload>;
  /** [Generated mutation](https://grandstack.io/docs/graphql-schema-generation-augmentation/##add--remove-relationship) for [deleting](https://neo4j.com/docs/cypher-manual/4.1/clauses/delete/#delete-delete-relationships-only) the requested_new_task relationship. */
  RemoveWateringTaskChangerequests_requested_new_task?: Maybe<_RemoveWateringTaskChangerequests_Requested_New_TaskPayload>;
  /** [Generated mutation](https://grandstack.io/docs/graphql-schema-generation-augmentation/##merge-relationship) for [merging](https://neo4j.com/docs/cypher-manual/4.1/clauses/merge/#query-merge-relationships) the requested_new_task relationship. */
  MergeWateringTaskChangerequests_requested_new_task?: Maybe<_MergeWateringTaskChangerequests_Requested_New_TaskPayload>;
  /** [Generated mutation](https://grandstack.io/docs/graphql-schema-generation-augmentation/##add--remove-relationship) for [creating](https://neo4j.com/docs/cypher-manual/4.1/clauses/create/#create-relationships) the refers_to relationship. */
  AddWateringTaskLogevents_refers_to?: Maybe<_AddWateringTaskLogevents_Refers_ToPayload>;
  /** [Generated mutation](https://grandstack.io/docs/graphql-schema-generation-augmentation/##add--remove-relationship) for [deleting](https://neo4j.com/docs/cypher-manual/4.1/clauses/delete/#delete-delete-relationships-only) the refers_to relationship. */
  RemoveWateringTaskLogevents_refers_to?: Maybe<_RemoveWateringTaskLogevents_Refers_ToPayload>;
  /** [Generated mutation](https://grandstack.io/docs/graphql-schema-generation-augmentation/##merge-relationship) for [merging](https://neo4j.com/docs/cypher-manual/4.1/clauses/merge/#query-merge-relationships) the refers_to relationship. */
  MergeWateringTaskLogevents_refers_to?: Maybe<_MergeWateringTaskLogevents_Refers_ToPayload>;
  /** [Generated mutation](https://grandstack.io/docs/graphql-schema-generation-augmentation/##add--remove-relationship) for [creating](https://neo4j.com/docs/cypher-manual/4.1/clauses/create/#create-relationships) the available relationship. */
  AddWateringTaskUsers_available?: Maybe<_AddWateringTaskUsers_AvailablePayload>;
  /** [Generated mutation](https://grandstack.io/docs/graphql-schema-generation-augmentation/##add--remove-relationship) for [deleting](https://neo4j.com/docs/cypher-manual/4.1/clauses/delete/#delete-delete-relationships-only) the available relationship. */
  RemoveWateringTaskUsers_available?: Maybe<_RemoveWateringTaskUsers_AvailablePayload>;
  /** [Generated mutation](https://grandstack.io/docs/graphql-schema-generation-augmentation/##merge-relationship) for [merging](https://neo4j.com/docs/cypher-manual/4.1/clauses/merge/#query-merge-relationships) the available relationship. */
  MergeWateringTaskUsers_available?: Maybe<_MergeWateringTaskUsers_AvailablePayload>;
  /** [Generated mutation](https://grandstack.io/docs/graphql-schema-generation-augmentation/#create) for [creating](https://neo4j.com/docs/cypher-manual/4.1/clauses/create/#create-nodes) a WateringTask node. */
  CreateWateringTask?: Maybe<WateringTask>;
  /** [Generated mutation](https://grandstack.io/docs/graphql-schema-generation-augmentation/#update) for [updating](https://neo4j.com/docs/cypher-manual/4.1/clauses/set/#set-update-a-property) a WateringTask node. */
  UpdateWateringTask?: Maybe<WateringTask>;
  /** [Generated mutation](https://grandstack.io/docs/graphql-schema-generation-augmentation/#delete) for [deleting](https://neo4j.com/docs/cypher-manual/4.1/clauses/delete/#delete-delete-single-node) a WateringTask node. */
  DeleteWateringTask?: Maybe<WateringTask>;
  /** [Generated mutation](https://grandstack.io/docs/graphql-schema-generation-augmentation/#merge) for [merging](https://neo4j.com/docs/cypher-manual/4.1/clauses/merge/#query-merge-node-derived) a WateringTask node. */
  MergeWateringTask?: Maybe<WateringTask>;
  /** [Generated mutation](https://grandstack.io/docs/graphql-schema-generation-augmentation/#create) for [creating](https://neo4j.com/docs/cypher-manual/4.1/clauses/create/#create-nodes) a WateringPeriod node. */
  CreateWateringPeriod?: Maybe<WateringPeriod>;
  /** [Generated mutation](https://grandstack.io/docs/graphql-schema-generation-augmentation/##add--remove-relationship) for [creating](https://neo4j.com/docs/cypher-manual/4.1/clauses/create/#create-relationships) the requested_by relationship. */
  AddChangeRequestRequested_by?: Maybe<_AddChangeRequestRequested_ByPayload>;
  /** [Generated mutation](https://grandstack.io/docs/graphql-schema-generation-augmentation/##add--remove-relationship) for [deleting](https://neo4j.com/docs/cypher-manual/4.1/clauses/delete/#delete-delete-relationships-only) the requested_by relationship. */
  RemoveChangeRequestRequested_by?: Maybe<_RemoveChangeRequestRequested_ByPayload>;
  /** [Generated mutation](https://grandstack.io/docs/graphql-schema-generation-augmentation/##merge-relationship) for [merging](https://neo4j.com/docs/cypher-manual/4.1/clauses/merge/#query-merge-relationships) the requested_by relationship. */
  MergeChangeRequestRequested_by?: Maybe<_MergeChangeRequestRequested_ByPayload>;
  /** [Generated mutation](https://grandstack.io/docs/graphql-schema-generation-augmentation/##add--remove-relationship) for [creating](https://neo4j.com/docs/cypher-manual/4.1/clauses/create/#create-relationships) the requested_for relationship. */
  AddChangeRequestRequested_for?: Maybe<_AddChangeRequestRequested_ForPayload>;
  /** [Generated mutation](https://grandstack.io/docs/graphql-schema-generation-augmentation/##add--remove-relationship) for [deleting](https://neo4j.com/docs/cypher-manual/4.1/clauses/delete/#delete-delete-relationships-only) the requested_for relationship. */
  RemoveChangeRequestRequested_for?: Maybe<_RemoveChangeRequestRequested_ForPayload>;
  /** [Generated mutation](https://grandstack.io/docs/graphql-schema-generation-augmentation/##merge-relationship) for [merging](https://neo4j.com/docs/cypher-manual/4.1/clauses/merge/#query-merge-relationships) the requested_for relationship. */
  MergeChangeRequestRequested_for?: Maybe<_MergeChangeRequestRequested_ForPayload>;
  /** [Generated mutation](https://grandstack.io/docs/graphql-schema-generation-augmentation/##add--remove-relationship) for [creating](https://neo4j.com/docs/cypher-manual/4.1/clauses/create/#create-relationships) the requested_to relationship. */
  AddChangeRequestRequested_to?: Maybe<_AddChangeRequestRequested_ToPayload>;
  /** [Generated mutation](https://grandstack.io/docs/graphql-schema-generation-augmentation/##add--remove-relationship) for [deleting](https://neo4j.com/docs/cypher-manual/4.1/clauses/delete/#delete-delete-relationships-only) the requested_to relationship. */
  RemoveChangeRequestRequested_to?: Maybe<_RemoveChangeRequestRequested_ToPayload>;
  /** [Generated mutation](https://grandstack.io/docs/graphql-schema-generation-augmentation/##merge-relationship) for [merging](https://neo4j.com/docs/cypher-manual/4.1/clauses/merge/#query-merge-relationships) the requested_to relationship. */
  MergeChangeRequestRequested_to?: Maybe<_MergeChangeRequestRequested_ToPayload>;
  /** [Generated mutation](https://grandstack.io/docs/graphql-schema-generation-augmentation/##add--remove-relationship) for [creating](https://neo4j.com/docs/cypher-manual/4.1/clauses/create/#create-relationships) the requested_new_task relationship. */
  AddChangeRequestRequested_new_task?: Maybe<_AddChangeRequestRequested_New_TaskPayload>;
  /** [Generated mutation](https://grandstack.io/docs/graphql-schema-generation-augmentation/##add--remove-relationship) for [deleting](https://neo4j.com/docs/cypher-manual/4.1/clauses/delete/#delete-delete-relationships-only) the requested_new_task relationship. */
  RemoveChangeRequestRequested_new_task?: Maybe<_RemoveChangeRequestRequested_New_TaskPayload>;
  /** [Generated mutation](https://grandstack.io/docs/graphql-schema-generation-augmentation/##merge-relationship) for [merging](https://neo4j.com/docs/cypher-manual/4.1/clauses/merge/#query-merge-relationships) the requested_new_task relationship. */
  MergeChangeRequestRequested_new_task?: Maybe<_MergeChangeRequestRequested_New_TaskPayload>;
  /** [Generated mutation](https://grandstack.io/docs/graphql-schema-generation-augmentation/#create) for [creating](https://neo4j.com/docs/cypher-manual/4.1/clauses/create/#create-nodes) a ChangeRequest node. */
  CreateChangeRequest?: Maybe<ChangeRequest>;
  /** [Generated mutation](https://grandstack.io/docs/graphql-schema-generation-augmentation/#update) for [updating](https://neo4j.com/docs/cypher-manual/4.1/clauses/set/#set-update-a-property) a ChangeRequest node. */
  UpdateChangeRequest?: Maybe<ChangeRequest>;
  /** [Generated mutation](https://grandstack.io/docs/graphql-schema-generation-augmentation/#delete) for [deleting](https://neo4j.com/docs/cypher-manual/4.1/clauses/delete/#delete-delete-single-node) a ChangeRequest node. */
  DeleteChangeRequest?: Maybe<ChangeRequest>;
  /** [Generated mutation](https://grandstack.io/docs/graphql-schema-generation-augmentation/#merge) for [merging](https://neo4j.com/docs/cypher-manual/4.1/clauses/merge/#query-merge-node-derived) a ChangeRequest node. */
  MergeChangeRequest?: Maybe<ChangeRequest>;
  /** [Generated mutation](https://grandstack.io/docs/graphql-schema-generation-augmentation/##add--remove-relationship) for [creating](https://neo4j.com/docs/cypher-manual/4.1/clauses/create/#create-relationships) the triggered_by relationship. */
  AddLogEventTriggered_by?: Maybe<_AddLogEventTriggered_ByPayload>;
  /** [Generated mutation](https://grandstack.io/docs/graphql-schema-generation-augmentation/##add--remove-relationship) for [deleting](https://neo4j.com/docs/cypher-manual/4.1/clauses/delete/#delete-delete-relationships-only) the triggered_by relationship. */
  RemoveLogEventTriggered_by?: Maybe<_RemoveLogEventTriggered_ByPayload>;
  /** [Generated mutation](https://grandstack.io/docs/graphql-schema-generation-augmentation/##merge-relationship) for [merging](https://neo4j.com/docs/cypher-manual/4.1/clauses/merge/#query-merge-relationships) the triggered_by relationship. */
  MergeLogEventTriggered_by?: Maybe<_MergeLogEventTriggered_ByPayload>;
  /** [Generated mutation](https://grandstack.io/docs/graphql-schema-generation-augmentation/##add--remove-relationship) for [creating](https://neo4j.com/docs/cypher-manual/4.1/clauses/create/#create-relationships) the refers_to relationship. */
  AddLogEventRefers_to?: Maybe<_AddLogEventRefers_ToPayload>;
  /** [Generated mutation](https://grandstack.io/docs/graphql-schema-generation-augmentation/##add--remove-relationship) for [deleting](https://neo4j.com/docs/cypher-manual/4.1/clauses/delete/#delete-delete-relationships-only) the refers_to relationship. */
  RemoveLogEventRefers_to?: Maybe<_RemoveLogEventRefers_ToPayload>;
  /** [Generated mutation](https://grandstack.io/docs/graphql-schema-generation-augmentation/##merge-relationship) for [merging](https://neo4j.com/docs/cypher-manual/4.1/clauses/merge/#query-merge-relationships) the refers_to relationship. */
  MergeLogEventRefers_to?: Maybe<_MergeLogEventRefers_ToPayload>;
  /** [Generated mutation](https://grandstack.io/docs/graphql-schema-generation-augmentation/#create) for [creating](https://neo4j.com/docs/cypher-manual/4.1/clauses/create/#create-nodes) a LogEvent node. */
  CreateLogEvent?: Maybe<LogEvent>;
  /** [Generated mutation](https://grandstack.io/docs/graphql-schema-generation-augmentation/#update) for [updating](https://neo4j.com/docs/cypher-manual/4.1/clauses/set/#set-update-a-property) a LogEvent node. */
  UpdateLogEvent?: Maybe<LogEvent>;
  /** [Generated mutation](https://grandstack.io/docs/graphql-schema-generation-augmentation/#delete) for [deleting](https://neo4j.com/docs/cypher-manual/4.1/clauses/delete/#delete-delete-single-node) a LogEvent node. */
  DeleteLogEvent?: Maybe<LogEvent>;
  /** [Generated mutation](https://grandstack.io/docs/graphql-schema-generation-augmentation/#merge) for [merging](https://neo4j.com/docs/cypher-manual/4.1/clauses/merge/#query-merge-node-derived) a LogEvent node. */
  MergeLogEvent?: Maybe<LogEvent>;
  /** [Generated mutation](https://grandstack.io/docs/graphql-schema-generation-augmentation/#create) for [creating](https://neo4j.com/docs/cypher-manual/4.1/clauses/create/#create-nodes) a UserSettings node. */
  CreateUserSettings?: Maybe<UserSettings>;
  /** [Generated mutation](https://grandstack.io/docs/graphql-schema-generation-augmentation/#update) for [updating](https://neo4j.com/docs/cypher-manual/4.1/clauses/set/#set-update-a-property) a UserSettings node. */
  UpdateUserSettings?: Maybe<UserSettings>;
  /** [Generated mutation](https://grandstack.io/docs/graphql-schema-generation-augmentation/#delete) for [deleting](https://neo4j.com/docs/cypher-manual/4.1/clauses/delete/#delete-delete-single-node) a UserSettings node. */
  DeleteUserSettings?: Maybe<UserSettings>;
  /** [Generated mutation](https://grandstack.io/docs/graphql-schema-generation-augmentation/#merge) for [merging](https://neo4j.com/docs/cypher-manual/4.1/clauses/merge/#query-merge-node-derived) a UserSettings node. */
  MergeUserSettings?: Maybe<UserSettings>;
};


export type MutationOwnMergeUserSettingsArgs = {
  settings?: Maybe<UserSettingsInput>;
};


export type MutationSetUserAvailabilityArgs = {
  dates: Array<Maybe<_Neo4jDateInput>>;
  from?: Maybe<_Neo4jDateInput>;
  till?: Maybe<_Neo4jDateInput>;
};


export type MutationPlanWateringPeriodsArgs = {
  period_length?: Maybe<Scalars['Int']>;
  planing_ahead?: Maybe<Scalars['Int']>;
  periods_predefined?: Maybe<Scalars['Int']>;
};


export type MutationPushSubscribeArgs = {
  subscription?: Maybe<PushSubscriptionInput>;
};


export type MutationPublishToAllArgs = {
  message?: Maybe<PushMessageInput>;
};


export type MutationAddUserAssignedArgs = {
  from: _UserInput;
  to: _WateringTaskInput;
};


export type MutationRemoveUserAssignedArgs = {
  from: _UserInput;
  to: _WateringTaskInput;
};


export type MutationMergeUserAssignedArgs = {
  from: _UserInput;
  to: _WateringTaskInput;
};


export type MutationAddUserAvailableArgs = {
  from: _UserInput;
  to: _WateringTaskInput;
};


export type MutationRemoveUserAvailableArgs = {
  from: _UserInput;
  to: _WateringTaskInput;
};


export type MutationMergeUserAvailableArgs = {
  from: _UserInput;
  to: _WateringTaskInput;
};


export type MutationAddUserChangerequests_Requested_ByArgs = {
  from: _ChangeRequestInput;
  to: _UserInput;
};


export type MutationRemoveUserChangerequests_Requested_ByArgs = {
  from: _ChangeRequestInput;
  to: _UserInput;
};


export type MutationMergeUserChangerequests_Requested_ByArgs = {
  from: _ChangeRequestInput;
  to: _UserInput;
};


export type MutationAddUserChangerequests_Requested_ToArgs = {
  from: _ChangeRequestInput;
  to: _UserInput;
};


export type MutationRemoveUserChangerequests_Requested_ToArgs = {
  from: _ChangeRequestInput;
  to: _UserInput;
};


export type MutationMergeUserChangerequests_Requested_ToArgs = {
  from: _ChangeRequestInput;
  to: _UserInput;
};


export type MutationAddUserLogevents_Triggered_ByArgs = {
  from: _LogEventInput;
  to: _UserInput;
};


export type MutationRemoveUserLogevents_Triggered_ByArgs = {
  from: _LogEventInput;
  to: _UserInput;
};


export type MutationMergeUserLogevents_Triggered_ByArgs = {
  from: _LogEventInput;
  to: _UserInput;
};


export type MutationCreateUserArgs = {
  id: Scalars['String'];
  label: Scalars['String'];
  neo4jImportId: Scalars['String'];
  type: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  id: Scalars['String'];
  label?: Maybe<Scalars['String']>;
  neo4jImportId?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};


export type MutationDeleteUserArgs = {
  id: Scalars['String'];
};


export type MutationMergeUserArgs = {
  id: Scalars['String'];
  label?: Maybe<Scalars['String']>;
  neo4jImportId?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};


export type MutationAddWateringTaskUsers_AssignedArgs = {
  from: _UserInput;
  to: _WateringTaskInput;
};


export type MutationRemoveWateringTaskUsers_AssignedArgs = {
  from: _UserInput;
  to: _WateringTaskInput;
};


export type MutationMergeWateringTaskUsers_AssignedArgs = {
  from: _UserInput;
  to: _WateringTaskInput;
};


export type MutationAddWateringTaskChangerequests_Requested_ForArgs = {
  from: _ChangeRequestInput;
  to: _WateringTaskInput;
};


export type MutationRemoveWateringTaskChangerequests_Requested_ForArgs = {
  from: _ChangeRequestInput;
  to: _WateringTaskInput;
};


export type MutationMergeWateringTaskChangerequests_Requested_ForArgs = {
  from: _ChangeRequestInput;
  to: _WateringTaskInput;
};


export type MutationAddWateringTaskChangerequests_Requested_New_TaskArgs = {
  from: _ChangeRequestInput;
  to: _WateringTaskInput;
};


export type MutationRemoveWateringTaskChangerequests_Requested_New_TaskArgs = {
  from: _ChangeRequestInput;
  to: _WateringTaskInput;
};


export type MutationMergeWateringTaskChangerequests_Requested_New_TaskArgs = {
  from: _ChangeRequestInput;
  to: _WateringTaskInput;
};


export type MutationAddWateringTaskLogevents_Refers_ToArgs = {
  from: _LogEventInput;
  to: _WateringTaskInput;
};


export type MutationRemoveWateringTaskLogevents_Refers_ToArgs = {
  from: _LogEventInput;
  to: _WateringTaskInput;
};


export type MutationMergeWateringTaskLogevents_Refers_ToArgs = {
  from: _LogEventInput;
  to: _WateringTaskInput;
};


export type MutationAddWateringTaskUsers_AvailableArgs = {
  from: _UserInput;
  to: _WateringTaskInput;
};


export type MutationRemoveWateringTaskUsers_AvailableArgs = {
  from: _UserInput;
  to: _WateringTaskInput;
};


export type MutationMergeWateringTaskUsers_AvailableArgs = {
  from: _UserInput;
  to: _WateringTaskInput;
};


export type MutationCreateWateringTaskArgs = {
  date: _Neo4jDateInput;
  done?: Maybe<Scalars['Boolean']>;
  neo4jImportId: Scalars['String'];
  type: Scalars['String'];
};


export type MutationUpdateWateringTaskArgs = {
  date?: Maybe<_Neo4jDateInput>;
  done?: Maybe<Scalars['Boolean']>;
  neo4jImportId: Scalars['String'];
  type?: Maybe<Scalars['String']>;
};


export type MutationDeleteWateringTaskArgs = {
  neo4jImportId: Scalars['String'];
};


export type MutationMergeWateringTaskArgs = {
  date?: Maybe<_Neo4jDateInput>;
  done?: Maybe<Scalars['Boolean']>;
  neo4jImportId: Scalars['String'];
  type?: Maybe<Scalars['String']>;
};


export type MutationCreateWateringPeriodArgs = {
  from: _Neo4jDateInput;
  till: _Neo4jDateInput;
};


export type MutationAddChangeRequestRequested_ByArgs = {
  from: _ChangeRequestInput;
  to: _UserInput;
};


export type MutationRemoveChangeRequestRequested_ByArgs = {
  from: _ChangeRequestInput;
  to: _UserInput;
};


export type MutationMergeChangeRequestRequested_ByArgs = {
  from: _ChangeRequestInput;
  to: _UserInput;
};


export type MutationAddChangeRequestRequested_ForArgs = {
  from: _ChangeRequestInput;
  to: _WateringTaskInput;
};


export type MutationRemoveChangeRequestRequested_ForArgs = {
  from: _ChangeRequestInput;
  to: _WateringTaskInput;
};


export type MutationMergeChangeRequestRequested_ForArgs = {
  from: _ChangeRequestInput;
  to: _WateringTaskInput;
};


export type MutationAddChangeRequestRequested_ToArgs = {
  from: _ChangeRequestInput;
  to: _UserInput;
};


export type MutationRemoveChangeRequestRequested_ToArgs = {
  from: _ChangeRequestInput;
  to: _UserInput;
};


export type MutationMergeChangeRequestRequested_ToArgs = {
  from: _ChangeRequestInput;
  to: _UserInput;
};


export type MutationAddChangeRequestRequested_New_TaskArgs = {
  from: _ChangeRequestInput;
  to: _WateringTaskInput;
};


export type MutationRemoveChangeRequestRequested_New_TaskArgs = {
  from: _ChangeRequestInput;
  to: _WateringTaskInput;
};


export type MutationMergeChangeRequestRequested_New_TaskArgs = {
  from: _ChangeRequestInput;
  to: _WateringTaskInput;
};


export type MutationCreateChangeRequestArgs = {
  label: Scalars['String'];
  neo4jImportId: Scalars['String'];
  type: Scalars['String'];
};


export type MutationUpdateChangeRequestArgs = {
  label: Scalars['String'];
  neo4jImportId?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};


export type MutationDeleteChangeRequestArgs = {
  label: Scalars['String'];
};


export type MutationMergeChangeRequestArgs = {
  label: Scalars['String'];
  neo4jImportId?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};


export type MutationAddLogEventTriggered_ByArgs = {
  from: _LogEventInput;
  to: _UserInput;
};


export type MutationRemoveLogEventTriggered_ByArgs = {
  from: _LogEventInput;
  to: _UserInput;
};


export type MutationMergeLogEventTriggered_ByArgs = {
  from: _LogEventInput;
  to: _UserInput;
};


export type MutationAddLogEventRefers_ToArgs = {
  from: _LogEventInput;
  to: _WateringTaskInput;
};


export type MutationRemoveLogEventRefers_ToArgs = {
  from: _LogEventInput;
  to: _WateringTaskInput;
};


export type MutationMergeLogEventRefers_ToArgs = {
  from: _LogEventInput;
  to: _WateringTaskInput;
};


export type MutationCreateLogEventArgs = {
  date: Scalars['String'];
  label: Scalars['String'];
  neo4jImportId: Scalars['String'];
  type: Scalars['String'];
};


export type MutationUpdateLogEventArgs = {
  date: Scalars['String'];
  label?: Maybe<Scalars['String']>;
  neo4jImportId?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};


export type MutationDeleteLogEventArgs = {
  date: Scalars['String'];
};


export type MutationMergeLogEventArgs = {
  date: Scalars['String'];
  label?: Maybe<Scalars['String']>;
  neo4jImportId?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};


export type MutationCreateUserSettingsArgs = {
  ui_locale?: Maybe<Scalars['String']>;
  letitrain_maximum_tasks?: Maybe<Scalars['Int']>;
};


export type MutationUpdateUserSettingsArgs = {
  ui_locale: Scalars['String'];
  letitrain_maximum_tasks?: Maybe<Scalars['Int']>;
};


export type MutationDeleteUserSettingsArgs = {
  ui_locale: Scalars['String'];
};


export type MutationMergeUserSettingsArgs = {
  ui_locale: Scalars['String'];
  letitrain_maximum_tasks?: Maybe<Scalars['Int']>;
};

export type PushKeyInput = {
  auth: Scalars['String'];
  p256dh: Scalars['String'];
};

export type PushMessageInput = {
  title: Scalars['String'];
  message?: Maybe<Scalars['String']>;
};

export type PushSubscriptionInput = {
  endpoint: Scalars['String'];
  expirationTime?: Maybe<Scalars['Int']>;
  keys: PushKeyInput;
};

export type Query = {
  __typename?: 'Query';
  assignableWateringPeriod?: Maybe<WateringPeriod>;
  /** [Generated query](https://grandstack.io/docs/graphql-schema-generation-augmentation#generated-queries) for User type nodes. */
  User?: Maybe<Array<Maybe<User>>>;
  /** [Generated query](https://grandstack.io/docs/graphql-schema-generation-augmentation#generated-queries) for WateringTask type nodes. */
  WateringTask?: Maybe<Array<Maybe<WateringTask>>>;
  /** [Generated query](https://grandstack.io/docs/graphql-schema-generation-augmentation#generated-queries) for WateringPeriod type nodes. */
  WateringPeriod?: Maybe<Array<Maybe<WateringPeriod>>>;
  /** [Generated query](https://grandstack.io/docs/graphql-schema-generation-augmentation#generated-queries) for ChangeRequest type nodes. */
  ChangeRequest?: Maybe<Array<Maybe<ChangeRequest>>>;
  /** [Generated query](https://grandstack.io/docs/graphql-schema-generation-augmentation#generated-queries) for LogEvent type nodes. */
  LogEvent?: Maybe<Array<Maybe<LogEvent>>>;
  /** [Generated query](https://grandstack.io/docs/graphql-schema-generation-augmentation#generated-queries) for UserSettings type nodes. */
  UserSettings?: Maybe<Array<Maybe<UserSettings>>>;
};


export type QueryUserArgs = {
  id?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  neo4jImportId?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  _id?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<Maybe<_UserOrdering>>>;
  filter?: Maybe<_UserFilter>;
};


export type QueryWateringTaskArgs = {
  date?: Maybe<_Neo4jDateInput>;
  done?: Maybe<Scalars['Boolean']>;
  neo4jImportId?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  _id?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<Maybe<_WateringTaskOrdering>>>;
  filter?: Maybe<_WateringTaskFilter>;
};


export type QueryWateringPeriodArgs = {
  from?: Maybe<_Neo4jDateInput>;
  till?: Maybe<_Neo4jDateInput>;
  _id?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<Maybe<_WateringPeriodOrdering>>>;
  filter?: Maybe<_WateringPeriodFilter>;
};


export type QueryChangeRequestArgs = {
  label?: Maybe<Scalars['String']>;
  neo4jImportId?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  _id?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<Maybe<_ChangeRequestOrdering>>>;
  filter?: Maybe<_ChangeRequestFilter>;
};


export type QueryLogEventArgs = {
  date?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  neo4jImportId?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  _id?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<Maybe<_LogEventOrdering>>>;
  filter?: Maybe<_LogEventFilter>;
};


export type QueryUserSettingsArgs = {
  ui_locale?: Maybe<Scalars['String']>;
  letitrain_maximum_tasks?: Maybe<Scalars['Int']>;
  _id?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<Maybe<_UserSettingsOrdering>>>;
  filter?: Maybe<_UserSettingsFilter>;
};

export type Subscription = {
  __typename?: 'Subscription';
  WateringTaskChange?: Maybe<Scalars['Boolean']>;
};

export type User = {
  __typename?: 'User';
  /** Generated field for querying the Neo4j [system id](https://neo4j.com/docs/cypher-manual/current/functions/scalar/#functions-id) of this node. */
  _id?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  label: Scalars['String'];
  neo4jImportId: Scalars['String'];
  type: Scalars['String'];
  assigned?: Maybe<Array<Maybe<WateringTask>>>;
  available?: Maybe<Array<Maybe<WateringTask>>>;
  changerequests_requested_by?: Maybe<Array<Maybe<ChangeRequest>>>;
  changerequests_requested_to?: Maybe<Array<Maybe<ChangeRequest>>>;
  logevents_triggered_by?: Maybe<Array<Maybe<LogEvent>>>;
};


export type UserAssignedArgs = {
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<Maybe<_WateringTaskOrdering>>>;
  filter?: Maybe<_WateringTaskFilter>;
};


export type UserAvailableArgs = {
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<Maybe<_WateringTaskOrdering>>>;
  filter?: Maybe<_WateringTaskFilter>;
};


export type UserChangerequests_Requested_ByArgs = {
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<Maybe<_ChangeRequestOrdering>>>;
  filter?: Maybe<_ChangeRequestFilter>;
};


export type UserChangerequests_Requested_ToArgs = {
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<Maybe<_ChangeRequestOrdering>>>;
  filter?: Maybe<_ChangeRequestFilter>;
};


export type UserLogevents_Triggered_ByArgs = {
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<Maybe<_LogEventOrdering>>>;
  filter?: Maybe<_LogEventFilter>;
};

export type UserSettings = {
  __typename?: 'UserSettings';
  ui_locale?: Maybe<Scalars['String']>;
  letitrain_maximum_tasks?: Maybe<Scalars['Int']>;
  /** Generated field for querying the Neo4j [system id](https://neo4j.com/docs/cypher-manual/current/functions/scalar/#functions-id) of this node. */
  _id?: Maybe<Scalars['String']>;
};

export type UserSettingsInput = {
  ui_locale?: Maybe<Scalars['String']>;
  letitrain_maximum_tasks?: Maybe<Scalars['Int']>;
};

export type WateringPeriod = {
  __typename?: 'WateringPeriod';
  /** Generated field for querying the Neo4j [system id](https://neo4j.com/docs/cypher-manual/current/functions/scalar/#functions-id) of this node. */
  _id?: Maybe<Scalars['String']>;
  from: _Neo4jDate;
  till: _Neo4jDate;
  wateringtasks?: Maybe<Array<Maybe<WateringTask>>>;
  hasUsersAssigned?: Maybe<Scalars['Boolean']>;
};


export type WateringPeriodWateringtasksArgs = {
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<Maybe<_WateringTaskOrdering>>>;
  filter?: Maybe<_WateringTaskFilter>;
};

export type WateringTask = {
  __typename?: 'WateringTask';
  /** Generated field for querying the Neo4j [system id](https://neo4j.com/docs/cypher-manual/current/functions/scalar/#functions-id) of this node. */
  _id?: Maybe<Scalars['String']>;
  date: _Neo4jDate;
  done?: Maybe<Scalars['Boolean']>;
  neo4jImportId: Scalars['String'];
  type: Scalars['String'];
  users_assigned?: Maybe<Array<Maybe<User>>>;
  changerequests_requested_for?: Maybe<Array<Maybe<ChangeRequest>>>;
  changerequests_requested_new_task?: Maybe<Array<Maybe<ChangeRequest>>>;
  logevents_refers_to?: Maybe<Array<Maybe<LogEvent>>>;
  users_available?: Maybe<Array<Maybe<User>>>;
  wateringperiod?: Maybe<Array<Maybe<WateringPeriod>>>;
};


export type WateringTaskUsers_AssignedArgs = {
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<Maybe<_UserOrdering>>>;
  filter?: Maybe<_UserFilter>;
};


export type WateringTaskChangerequests_Requested_ForArgs = {
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<Maybe<_ChangeRequestOrdering>>>;
  filter?: Maybe<_ChangeRequestFilter>;
};


export type WateringTaskChangerequests_Requested_New_TaskArgs = {
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<Maybe<_ChangeRequestOrdering>>>;
  filter?: Maybe<_ChangeRequestFilter>;
};


export type WateringTaskLogevents_Refers_ToArgs = {
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<Maybe<_LogEventOrdering>>>;
  filter?: Maybe<_LogEventFilter>;
};


export type WateringTaskUsers_AvailableArgs = {
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<Maybe<_UserOrdering>>>;
  filter?: Maybe<_UserFilter>;
};


export type WateringTaskWateringperiodArgs = {
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<Maybe<_WateringPeriodOrdering>>>;
  filter?: Maybe<_WateringPeriodFilter>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>;
  WateringPeriod: ResolverTypeWrapper<WateringPeriod>;
  String: ResolverTypeWrapper<Scalars['String']>;
  _Neo4jDate: ResolverTypeWrapper<_Neo4jDate>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  _WateringTaskOrdering: _WateringTaskOrdering;
  _WateringTaskFilter: _WateringTaskFilter;
  _Neo4jDateInput: _Neo4jDateInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  _UserFilter: _UserFilter;
  _ChangeRequestFilter: _ChangeRequestFilter;
  _LogEventFilter: _LogEventFilter;
  _WateringPeriodFilter: _WateringPeriodFilter;
  WateringTask: ResolverTypeWrapper<WateringTask>;
  _UserOrdering: _UserOrdering;
  User: ResolverTypeWrapper<User>;
  _ChangeRequestOrdering: _ChangeRequestOrdering;
  ChangeRequest: ResolverTypeWrapper<ChangeRequest>;
  _LogEventOrdering: _LogEventOrdering;
  LogEvent: ResolverTypeWrapper<LogEvent>;
  _WateringPeriodOrdering: _WateringPeriodOrdering;
  _UserSettingsOrdering: _UserSettingsOrdering;
  _UserSettingsFilter: _UserSettingsFilter;
  UserSettings: ResolverTypeWrapper<UserSettings>;
  Mutation: ResolverTypeWrapper<{}>;
  UserSettingsInput: UserSettingsInput;
  JSON: ResolverTypeWrapper<Scalars['JSON']>;
  PushSubscriptionInput: PushSubscriptionInput;
  PushKeyInput: PushKeyInput;
  PushMessageInput: PushMessageInput;
  _UserInput: _UserInput;
  _WateringTaskInput: _WateringTaskInput;
  _AddUserAssignedPayload: ResolverTypeWrapper<_AddUserAssignedPayload>;
  _RemoveUserAssignedPayload: ResolverTypeWrapper<_RemoveUserAssignedPayload>;
  _MergeUserAssignedPayload: ResolverTypeWrapper<_MergeUserAssignedPayload>;
  _AddUserAvailablePayload: ResolverTypeWrapper<_AddUserAvailablePayload>;
  _RemoveUserAvailablePayload: ResolverTypeWrapper<_RemoveUserAvailablePayload>;
  _MergeUserAvailablePayload: ResolverTypeWrapper<_MergeUserAvailablePayload>;
  _ChangeRequestInput: _ChangeRequestInput;
  _AddUserChangerequests_requested_byPayload: ResolverTypeWrapper<_AddUserChangerequests_Requested_ByPayload>;
  _RemoveUserChangerequests_requested_byPayload: ResolverTypeWrapper<_RemoveUserChangerequests_Requested_ByPayload>;
  _MergeUserChangerequests_requested_byPayload: ResolverTypeWrapper<_MergeUserChangerequests_Requested_ByPayload>;
  _AddUserChangerequests_requested_toPayload: ResolverTypeWrapper<_AddUserChangerequests_Requested_ToPayload>;
  _RemoveUserChangerequests_requested_toPayload: ResolverTypeWrapper<_RemoveUserChangerequests_Requested_ToPayload>;
  _MergeUserChangerequests_requested_toPayload: ResolverTypeWrapper<_MergeUserChangerequests_Requested_ToPayload>;
  _LogEventInput: _LogEventInput;
  _AddUserLogevents_triggered_byPayload: ResolverTypeWrapper<_AddUserLogevents_Triggered_ByPayload>;
  _RemoveUserLogevents_triggered_byPayload: ResolverTypeWrapper<_RemoveUserLogevents_Triggered_ByPayload>;
  _MergeUserLogevents_triggered_byPayload: ResolverTypeWrapper<_MergeUserLogevents_Triggered_ByPayload>;
  _AddWateringTaskUsers_assignedPayload: ResolverTypeWrapper<_AddWateringTaskUsers_AssignedPayload>;
  _RemoveWateringTaskUsers_assignedPayload: ResolverTypeWrapper<_RemoveWateringTaskUsers_AssignedPayload>;
  _MergeWateringTaskUsers_assignedPayload: ResolverTypeWrapper<_MergeWateringTaskUsers_AssignedPayload>;
  _AddWateringTaskChangerequests_requested_forPayload: ResolverTypeWrapper<_AddWateringTaskChangerequests_Requested_ForPayload>;
  _RemoveWateringTaskChangerequests_requested_forPayload: ResolverTypeWrapper<_RemoveWateringTaskChangerequests_Requested_ForPayload>;
  _MergeWateringTaskChangerequests_requested_forPayload: ResolverTypeWrapper<_MergeWateringTaskChangerequests_Requested_ForPayload>;
  _AddWateringTaskChangerequests_requested_new_taskPayload: ResolverTypeWrapper<_AddWateringTaskChangerequests_Requested_New_TaskPayload>;
  _RemoveWateringTaskChangerequests_requested_new_taskPayload: ResolverTypeWrapper<_RemoveWateringTaskChangerequests_Requested_New_TaskPayload>;
  _MergeWateringTaskChangerequests_requested_new_taskPayload: ResolverTypeWrapper<_MergeWateringTaskChangerequests_Requested_New_TaskPayload>;
  _AddWateringTaskLogevents_refers_toPayload: ResolverTypeWrapper<_AddWateringTaskLogevents_Refers_ToPayload>;
  _RemoveWateringTaskLogevents_refers_toPayload: ResolverTypeWrapper<_RemoveWateringTaskLogevents_Refers_ToPayload>;
  _MergeWateringTaskLogevents_refers_toPayload: ResolverTypeWrapper<_MergeWateringTaskLogevents_Refers_ToPayload>;
  _AddWateringTaskUsers_availablePayload: ResolverTypeWrapper<_AddWateringTaskUsers_AvailablePayload>;
  _RemoveWateringTaskUsers_availablePayload: ResolverTypeWrapper<_RemoveWateringTaskUsers_AvailablePayload>;
  _MergeWateringTaskUsers_availablePayload: ResolverTypeWrapper<_MergeWateringTaskUsers_AvailablePayload>;
  _AddChangeRequestRequested_byPayload: ResolverTypeWrapper<_AddChangeRequestRequested_ByPayload>;
  _RemoveChangeRequestRequested_byPayload: ResolverTypeWrapper<_RemoveChangeRequestRequested_ByPayload>;
  _MergeChangeRequestRequested_byPayload: ResolverTypeWrapper<_MergeChangeRequestRequested_ByPayload>;
  _AddChangeRequestRequested_forPayload: ResolverTypeWrapper<_AddChangeRequestRequested_ForPayload>;
  _RemoveChangeRequestRequested_forPayload: ResolverTypeWrapper<_RemoveChangeRequestRequested_ForPayload>;
  _MergeChangeRequestRequested_forPayload: ResolverTypeWrapper<_MergeChangeRequestRequested_ForPayload>;
  _AddChangeRequestRequested_toPayload: ResolverTypeWrapper<_AddChangeRequestRequested_ToPayload>;
  _RemoveChangeRequestRequested_toPayload: ResolverTypeWrapper<_RemoveChangeRequestRequested_ToPayload>;
  _MergeChangeRequestRequested_toPayload: ResolverTypeWrapper<_MergeChangeRequestRequested_ToPayload>;
  _AddChangeRequestRequested_new_taskPayload: ResolverTypeWrapper<_AddChangeRequestRequested_New_TaskPayload>;
  _RemoveChangeRequestRequested_new_taskPayload: ResolverTypeWrapper<_RemoveChangeRequestRequested_New_TaskPayload>;
  _MergeChangeRequestRequested_new_taskPayload: ResolverTypeWrapper<_MergeChangeRequestRequested_New_TaskPayload>;
  _AddLogEventTriggered_byPayload: ResolverTypeWrapper<_AddLogEventTriggered_ByPayload>;
  _RemoveLogEventTriggered_byPayload: ResolverTypeWrapper<_RemoveLogEventTriggered_ByPayload>;
  _MergeLogEventTriggered_byPayload: ResolverTypeWrapper<_MergeLogEventTriggered_ByPayload>;
  _AddLogEventRefers_toPayload: ResolverTypeWrapper<_AddLogEventRefers_ToPayload>;
  _RemoveLogEventRefers_toPayload: ResolverTypeWrapper<_RemoveLogEventRefers_ToPayload>;
  _MergeLogEventRefers_toPayload: ResolverTypeWrapper<_MergeLogEventRefers_ToPayload>;
  Subscription: ResolverTypeWrapper<{}>;
  _UserSettingsInput: _UserSettingsInput;
  _Neo4jTimeInput: _Neo4jTimeInput;
  _Neo4jTime: ResolverTypeWrapper<_Neo4jTime>;
  _Neo4jDateTimeInput: _Neo4jDateTimeInput;
  _Neo4jDateTime: ResolverTypeWrapper<_Neo4jDateTime>;
  _Neo4jLocalTimeInput: _Neo4jLocalTimeInput;
  _Neo4jLocalTime: ResolverTypeWrapper<_Neo4jLocalTime>;
  _Neo4jLocalDateTimeInput: _Neo4jLocalDateTimeInput;
  _Neo4jLocalDateTime: ResolverTypeWrapper<_Neo4jLocalDateTime>;
  _Neo4jPointDistanceFilter: _Neo4jPointDistanceFilter;
  _Neo4jPointInput: _Neo4jPointInput;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  _Neo4jPoint: ResolverTypeWrapper<_Neo4jPoint>;
  _RelationDirections: _RelationDirections;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {};
  WateringPeriod: WateringPeriod;
  String: Scalars['String'];
  _Neo4jDate: _Neo4jDate;
  Int: Scalars['Int'];
  _WateringTaskFilter: _WateringTaskFilter;
  _Neo4jDateInput: _Neo4jDateInput;
  Boolean: Scalars['Boolean'];
  _UserFilter: _UserFilter;
  _ChangeRequestFilter: _ChangeRequestFilter;
  _LogEventFilter: _LogEventFilter;
  _WateringPeriodFilter: _WateringPeriodFilter;
  WateringTask: WateringTask;
  User: User;
  ChangeRequest: ChangeRequest;
  LogEvent: LogEvent;
  _UserSettingsFilter: _UserSettingsFilter;
  UserSettings: UserSettings;
  Mutation: {};
  UserSettingsInput: UserSettingsInput;
  JSON: Scalars['JSON'];
  PushSubscriptionInput: PushSubscriptionInput;
  PushKeyInput: PushKeyInput;
  PushMessageInput: PushMessageInput;
  _UserInput: _UserInput;
  _WateringTaskInput: _WateringTaskInput;
  _AddUserAssignedPayload: _AddUserAssignedPayload;
  _RemoveUserAssignedPayload: _RemoveUserAssignedPayload;
  _MergeUserAssignedPayload: _MergeUserAssignedPayload;
  _AddUserAvailablePayload: _AddUserAvailablePayload;
  _RemoveUserAvailablePayload: _RemoveUserAvailablePayload;
  _MergeUserAvailablePayload: _MergeUserAvailablePayload;
  _ChangeRequestInput: _ChangeRequestInput;
  _AddUserChangerequests_requested_byPayload: _AddUserChangerequests_Requested_ByPayload;
  _RemoveUserChangerequests_requested_byPayload: _RemoveUserChangerequests_Requested_ByPayload;
  _MergeUserChangerequests_requested_byPayload: _MergeUserChangerequests_Requested_ByPayload;
  _AddUserChangerequests_requested_toPayload: _AddUserChangerequests_Requested_ToPayload;
  _RemoveUserChangerequests_requested_toPayload: _RemoveUserChangerequests_Requested_ToPayload;
  _MergeUserChangerequests_requested_toPayload: _MergeUserChangerequests_Requested_ToPayload;
  _LogEventInput: _LogEventInput;
  _AddUserLogevents_triggered_byPayload: _AddUserLogevents_Triggered_ByPayload;
  _RemoveUserLogevents_triggered_byPayload: _RemoveUserLogevents_Triggered_ByPayload;
  _MergeUserLogevents_triggered_byPayload: _MergeUserLogevents_Triggered_ByPayload;
  _AddWateringTaskUsers_assignedPayload: _AddWateringTaskUsers_AssignedPayload;
  _RemoveWateringTaskUsers_assignedPayload: _RemoveWateringTaskUsers_AssignedPayload;
  _MergeWateringTaskUsers_assignedPayload: _MergeWateringTaskUsers_AssignedPayload;
  _AddWateringTaskChangerequests_requested_forPayload: _AddWateringTaskChangerequests_Requested_ForPayload;
  _RemoveWateringTaskChangerequests_requested_forPayload: _RemoveWateringTaskChangerequests_Requested_ForPayload;
  _MergeWateringTaskChangerequests_requested_forPayload: _MergeWateringTaskChangerequests_Requested_ForPayload;
  _AddWateringTaskChangerequests_requested_new_taskPayload: _AddWateringTaskChangerequests_Requested_New_TaskPayload;
  _RemoveWateringTaskChangerequests_requested_new_taskPayload: _RemoveWateringTaskChangerequests_Requested_New_TaskPayload;
  _MergeWateringTaskChangerequests_requested_new_taskPayload: _MergeWateringTaskChangerequests_Requested_New_TaskPayload;
  _AddWateringTaskLogevents_refers_toPayload: _AddWateringTaskLogevents_Refers_ToPayload;
  _RemoveWateringTaskLogevents_refers_toPayload: _RemoveWateringTaskLogevents_Refers_ToPayload;
  _MergeWateringTaskLogevents_refers_toPayload: _MergeWateringTaskLogevents_Refers_ToPayload;
  _AddWateringTaskUsers_availablePayload: _AddWateringTaskUsers_AvailablePayload;
  _RemoveWateringTaskUsers_availablePayload: _RemoveWateringTaskUsers_AvailablePayload;
  _MergeWateringTaskUsers_availablePayload: _MergeWateringTaskUsers_AvailablePayload;
  _AddChangeRequestRequested_byPayload: _AddChangeRequestRequested_ByPayload;
  _RemoveChangeRequestRequested_byPayload: _RemoveChangeRequestRequested_ByPayload;
  _MergeChangeRequestRequested_byPayload: _MergeChangeRequestRequested_ByPayload;
  _AddChangeRequestRequested_forPayload: _AddChangeRequestRequested_ForPayload;
  _RemoveChangeRequestRequested_forPayload: _RemoveChangeRequestRequested_ForPayload;
  _MergeChangeRequestRequested_forPayload: _MergeChangeRequestRequested_ForPayload;
  _AddChangeRequestRequested_toPayload: _AddChangeRequestRequested_ToPayload;
  _RemoveChangeRequestRequested_toPayload: _RemoveChangeRequestRequested_ToPayload;
  _MergeChangeRequestRequested_toPayload: _MergeChangeRequestRequested_ToPayload;
  _AddChangeRequestRequested_new_taskPayload: _AddChangeRequestRequested_New_TaskPayload;
  _RemoveChangeRequestRequested_new_taskPayload: _RemoveChangeRequestRequested_New_TaskPayload;
  _MergeChangeRequestRequested_new_taskPayload: _MergeChangeRequestRequested_New_TaskPayload;
  _AddLogEventTriggered_byPayload: _AddLogEventTriggered_ByPayload;
  _RemoveLogEventTriggered_byPayload: _RemoveLogEventTriggered_ByPayload;
  _MergeLogEventTriggered_byPayload: _MergeLogEventTriggered_ByPayload;
  _AddLogEventRefers_toPayload: _AddLogEventRefers_ToPayload;
  _RemoveLogEventRefers_toPayload: _RemoveLogEventRefers_ToPayload;
  _MergeLogEventRefers_toPayload: _MergeLogEventRefers_ToPayload;
  Subscription: {};
  _UserSettingsInput: _UserSettingsInput;
  _Neo4jTimeInput: _Neo4jTimeInput;
  _Neo4jTime: _Neo4jTime;
  _Neo4jDateTimeInput: _Neo4jDateTimeInput;
  _Neo4jDateTime: _Neo4jDateTime;
  _Neo4jLocalTimeInput: _Neo4jLocalTimeInput;
  _Neo4jLocalTime: _Neo4jLocalTime;
  _Neo4jLocalDateTimeInput: _Neo4jLocalDateTimeInput;
  _Neo4jLocalDateTime: _Neo4jLocalDateTime;
  _Neo4jPointDistanceFilter: _Neo4jPointDistanceFilter;
  _Neo4jPointInput: _Neo4jPointInput;
  Float: Scalars['Float'];
  _Neo4jPoint: _Neo4jPoint;
};

export type HasRoleDirectiveArgs = {   role?: Maybe<Array<Maybe<Scalars['String']>>>; };

export type HasRoleDirectiveResolver<Result, Parent, ContextType = any, Args = HasRoleDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AuthDirectiveArgs = {  };

export type AuthDirectiveResolver<Result, Parent, ContextType = any, Args = AuthDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type CypherDirectiveArgs = {   statement?: Maybe<Scalars['String']>; };

export type CypherDirectiveResolver<Result, Parent, ContextType = any, Args = CypherDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type RelationDirectiveArgs = {   name?: Maybe<Scalars['String']>;
  direction?: Maybe<_RelationDirections>;
  from?: Maybe<Scalars['String']>;
  to?: Maybe<Scalars['String']>; };

export type RelationDirectiveResolver<Result, Parent, ContextType = any, Args = RelationDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AdditionalLabelsDirectiveArgs = {   labels?: Maybe<Array<Maybe<Scalars['String']>>>; };

export type AdditionalLabelsDirectiveResolver<Result, Parent, ContextType = any, Args = AdditionalLabelsDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type MutationMetaDirectiveArgs = {   relationship?: Maybe<Scalars['String']>;
  from?: Maybe<Scalars['String']>;
  to?: Maybe<Scalars['String']>; };

export type MutationMetaDirectiveResolver<Result, Parent, ContextType = any, Args = MutationMetaDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type Neo4j_IgnoreDirectiveArgs = {  };

export type Neo4j_IgnoreDirectiveResolver<Result, Parent, ContextType = any, Args = Neo4j_IgnoreDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type IdDirectiveArgs = {  };

export type IdDirectiveResolver<Result, Parent, ContextType = any, Args = IdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type UniqueDirectiveArgs = {  };

export type UniqueDirectiveResolver<Result, Parent, ContextType = any, Args = UniqueDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type IndexDirectiveArgs = {  };

export type IndexDirectiveResolver<Result, Parent, ContextType = any, Args = IndexDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type _AddChangeRequestRequested_ByPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['_AddChangeRequestRequested_byPayload'] = ResolversParentTypes['_AddChangeRequestRequested_byPayload']> = {
  from?: Resolver<Maybe<ResolversTypes['ChangeRequest']>, ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type _AddChangeRequestRequested_ForPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['_AddChangeRequestRequested_forPayload'] = ResolversParentTypes['_AddChangeRequestRequested_forPayload']> = {
  from?: Resolver<Maybe<ResolversTypes['ChangeRequest']>, ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes['WateringTask']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type _AddChangeRequestRequested_New_TaskPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['_AddChangeRequestRequested_new_taskPayload'] = ResolversParentTypes['_AddChangeRequestRequested_new_taskPayload']> = {
  from?: Resolver<Maybe<ResolversTypes['ChangeRequest']>, ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes['WateringTask']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type _AddChangeRequestRequested_ToPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['_AddChangeRequestRequested_toPayload'] = ResolversParentTypes['_AddChangeRequestRequested_toPayload']> = {
  from?: Resolver<Maybe<ResolversTypes['ChangeRequest']>, ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type _AddLogEventRefers_ToPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['_AddLogEventRefers_toPayload'] = ResolversParentTypes['_AddLogEventRefers_toPayload']> = {
  from?: Resolver<Maybe<ResolversTypes['LogEvent']>, ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes['WateringTask']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type _AddLogEventTriggered_ByPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['_AddLogEventTriggered_byPayload'] = ResolversParentTypes['_AddLogEventTriggered_byPayload']> = {
  from?: Resolver<Maybe<ResolversTypes['LogEvent']>, ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type _AddUserAssignedPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['_AddUserAssignedPayload'] = ResolversParentTypes['_AddUserAssignedPayload']> = {
  from?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes['WateringTask']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type _AddUserAvailablePayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['_AddUserAvailablePayload'] = ResolversParentTypes['_AddUserAvailablePayload']> = {
  from?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes['WateringTask']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type _AddUserChangerequests_Requested_ByPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['_AddUserChangerequests_requested_byPayload'] = ResolversParentTypes['_AddUserChangerequests_requested_byPayload']> = {
  from?: Resolver<Maybe<ResolversTypes['ChangeRequest']>, ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type _AddUserChangerequests_Requested_ToPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['_AddUserChangerequests_requested_toPayload'] = ResolversParentTypes['_AddUserChangerequests_requested_toPayload']> = {
  from?: Resolver<Maybe<ResolversTypes['ChangeRequest']>, ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type _AddUserLogevents_Triggered_ByPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['_AddUserLogevents_triggered_byPayload'] = ResolversParentTypes['_AddUserLogevents_triggered_byPayload']> = {
  from?: Resolver<Maybe<ResolversTypes['LogEvent']>, ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type _AddWateringTaskChangerequests_Requested_ForPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['_AddWateringTaskChangerequests_requested_forPayload'] = ResolversParentTypes['_AddWateringTaskChangerequests_requested_forPayload']> = {
  from?: Resolver<Maybe<ResolversTypes['ChangeRequest']>, ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes['WateringTask']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type _AddWateringTaskChangerequests_Requested_New_TaskPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['_AddWateringTaskChangerequests_requested_new_taskPayload'] = ResolversParentTypes['_AddWateringTaskChangerequests_requested_new_taskPayload']> = {
  from?: Resolver<Maybe<ResolversTypes['ChangeRequest']>, ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes['WateringTask']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type _AddWateringTaskLogevents_Refers_ToPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['_AddWateringTaskLogevents_refers_toPayload'] = ResolversParentTypes['_AddWateringTaskLogevents_refers_toPayload']> = {
  from?: Resolver<Maybe<ResolversTypes['LogEvent']>, ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes['WateringTask']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type _AddWateringTaskUsers_AssignedPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['_AddWateringTaskUsers_assignedPayload'] = ResolversParentTypes['_AddWateringTaskUsers_assignedPayload']> = {
  from?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes['WateringTask']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type _AddWateringTaskUsers_AvailablePayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['_AddWateringTaskUsers_availablePayload'] = ResolversParentTypes['_AddWateringTaskUsers_availablePayload']> = {
  from?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes['WateringTask']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type _MergeChangeRequestRequested_ByPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['_MergeChangeRequestRequested_byPayload'] = ResolversParentTypes['_MergeChangeRequestRequested_byPayload']> = {
  from?: Resolver<Maybe<ResolversTypes['ChangeRequest']>, ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type _MergeChangeRequestRequested_ForPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['_MergeChangeRequestRequested_forPayload'] = ResolversParentTypes['_MergeChangeRequestRequested_forPayload']> = {
  from?: Resolver<Maybe<ResolversTypes['ChangeRequest']>, ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes['WateringTask']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type _MergeChangeRequestRequested_New_TaskPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['_MergeChangeRequestRequested_new_taskPayload'] = ResolversParentTypes['_MergeChangeRequestRequested_new_taskPayload']> = {
  from?: Resolver<Maybe<ResolversTypes['ChangeRequest']>, ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes['WateringTask']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type _MergeChangeRequestRequested_ToPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['_MergeChangeRequestRequested_toPayload'] = ResolversParentTypes['_MergeChangeRequestRequested_toPayload']> = {
  from?: Resolver<Maybe<ResolversTypes['ChangeRequest']>, ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type _MergeLogEventRefers_ToPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['_MergeLogEventRefers_toPayload'] = ResolversParentTypes['_MergeLogEventRefers_toPayload']> = {
  from?: Resolver<Maybe<ResolversTypes['LogEvent']>, ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes['WateringTask']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type _MergeLogEventTriggered_ByPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['_MergeLogEventTriggered_byPayload'] = ResolversParentTypes['_MergeLogEventTriggered_byPayload']> = {
  from?: Resolver<Maybe<ResolversTypes['LogEvent']>, ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type _MergeUserAssignedPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['_MergeUserAssignedPayload'] = ResolversParentTypes['_MergeUserAssignedPayload']> = {
  from?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes['WateringTask']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type _MergeUserAvailablePayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['_MergeUserAvailablePayload'] = ResolversParentTypes['_MergeUserAvailablePayload']> = {
  from?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes['WateringTask']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type _MergeUserChangerequests_Requested_ByPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['_MergeUserChangerequests_requested_byPayload'] = ResolversParentTypes['_MergeUserChangerequests_requested_byPayload']> = {
  from?: Resolver<Maybe<ResolversTypes['ChangeRequest']>, ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type _MergeUserChangerequests_Requested_ToPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['_MergeUserChangerequests_requested_toPayload'] = ResolversParentTypes['_MergeUserChangerequests_requested_toPayload']> = {
  from?: Resolver<Maybe<ResolversTypes['ChangeRequest']>, ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type _MergeUserLogevents_Triggered_ByPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['_MergeUserLogevents_triggered_byPayload'] = ResolversParentTypes['_MergeUserLogevents_triggered_byPayload']> = {
  from?: Resolver<Maybe<ResolversTypes['LogEvent']>, ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type _MergeWateringTaskChangerequests_Requested_ForPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['_MergeWateringTaskChangerequests_requested_forPayload'] = ResolversParentTypes['_MergeWateringTaskChangerequests_requested_forPayload']> = {
  from?: Resolver<Maybe<ResolversTypes['ChangeRequest']>, ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes['WateringTask']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type _MergeWateringTaskChangerequests_Requested_New_TaskPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['_MergeWateringTaskChangerequests_requested_new_taskPayload'] = ResolversParentTypes['_MergeWateringTaskChangerequests_requested_new_taskPayload']> = {
  from?: Resolver<Maybe<ResolversTypes['ChangeRequest']>, ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes['WateringTask']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type _MergeWateringTaskLogevents_Refers_ToPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['_MergeWateringTaskLogevents_refers_toPayload'] = ResolversParentTypes['_MergeWateringTaskLogevents_refers_toPayload']> = {
  from?: Resolver<Maybe<ResolversTypes['LogEvent']>, ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes['WateringTask']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type _MergeWateringTaskUsers_AssignedPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['_MergeWateringTaskUsers_assignedPayload'] = ResolversParentTypes['_MergeWateringTaskUsers_assignedPayload']> = {
  from?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes['WateringTask']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type _MergeWateringTaskUsers_AvailablePayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['_MergeWateringTaskUsers_availablePayload'] = ResolversParentTypes['_MergeWateringTaskUsers_availablePayload']> = {
  from?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes['WateringTask']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type _Neo4jDateResolvers<ContextType = any, ParentType extends ResolversParentTypes['_Neo4jDate'] = ResolversParentTypes['_Neo4jDate']> = {
  year?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  month?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  day?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  formatted?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type _Neo4jDateTimeResolvers<ContextType = any, ParentType extends ResolversParentTypes['_Neo4jDateTime'] = ResolversParentTypes['_Neo4jDateTime']> = {
  year?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  month?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  day?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  hour?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  minute?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  second?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  millisecond?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  microsecond?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  nanosecond?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  timezone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  formatted?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type _Neo4jLocalDateTimeResolvers<ContextType = any, ParentType extends ResolversParentTypes['_Neo4jLocalDateTime'] = ResolversParentTypes['_Neo4jLocalDateTime']> = {
  year?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  month?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  day?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  hour?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  minute?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  second?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  millisecond?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  microsecond?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  nanosecond?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  formatted?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type _Neo4jLocalTimeResolvers<ContextType = any, ParentType extends ResolversParentTypes['_Neo4jLocalTime'] = ResolversParentTypes['_Neo4jLocalTime']> = {
  hour?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  minute?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  second?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  millisecond?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  microsecond?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  nanosecond?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  formatted?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type _Neo4jPointResolvers<ContextType = any, ParentType extends ResolversParentTypes['_Neo4jPoint'] = ResolversParentTypes['_Neo4jPoint']> = {
  x?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  y?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  z?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  longitude?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  latitude?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  height?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  crs?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  srid?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type _Neo4jTimeResolvers<ContextType = any, ParentType extends ResolversParentTypes['_Neo4jTime'] = ResolversParentTypes['_Neo4jTime']> = {
  hour?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  minute?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  second?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  millisecond?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  microsecond?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  nanosecond?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  timezone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  formatted?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type _RemoveChangeRequestRequested_ByPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['_RemoveChangeRequestRequested_byPayload'] = ResolversParentTypes['_RemoveChangeRequestRequested_byPayload']> = {
  from?: Resolver<Maybe<ResolversTypes['ChangeRequest']>, ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type _RemoveChangeRequestRequested_ForPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['_RemoveChangeRequestRequested_forPayload'] = ResolversParentTypes['_RemoveChangeRequestRequested_forPayload']> = {
  from?: Resolver<Maybe<ResolversTypes['ChangeRequest']>, ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes['WateringTask']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type _RemoveChangeRequestRequested_New_TaskPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['_RemoveChangeRequestRequested_new_taskPayload'] = ResolversParentTypes['_RemoveChangeRequestRequested_new_taskPayload']> = {
  from?: Resolver<Maybe<ResolversTypes['ChangeRequest']>, ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes['WateringTask']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type _RemoveChangeRequestRequested_ToPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['_RemoveChangeRequestRequested_toPayload'] = ResolversParentTypes['_RemoveChangeRequestRequested_toPayload']> = {
  from?: Resolver<Maybe<ResolversTypes['ChangeRequest']>, ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type _RemoveLogEventRefers_ToPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['_RemoveLogEventRefers_toPayload'] = ResolversParentTypes['_RemoveLogEventRefers_toPayload']> = {
  from?: Resolver<Maybe<ResolversTypes['LogEvent']>, ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes['WateringTask']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type _RemoveLogEventTriggered_ByPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['_RemoveLogEventTriggered_byPayload'] = ResolversParentTypes['_RemoveLogEventTriggered_byPayload']> = {
  from?: Resolver<Maybe<ResolversTypes['LogEvent']>, ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type _RemoveUserAssignedPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['_RemoveUserAssignedPayload'] = ResolversParentTypes['_RemoveUserAssignedPayload']> = {
  from?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes['WateringTask']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type _RemoveUserAvailablePayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['_RemoveUserAvailablePayload'] = ResolversParentTypes['_RemoveUserAvailablePayload']> = {
  from?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes['WateringTask']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type _RemoveUserChangerequests_Requested_ByPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['_RemoveUserChangerequests_requested_byPayload'] = ResolversParentTypes['_RemoveUserChangerequests_requested_byPayload']> = {
  from?: Resolver<Maybe<ResolversTypes['ChangeRequest']>, ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type _RemoveUserChangerequests_Requested_ToPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['_RemoveUserChangerequests_requested_toPayload'] = ResolversParentTypes['_RemoveUserChangerequests_requested_toPayload']> = {
  from?: Resolver<Maybe<ResolversTypes['ChangeRequest']>, ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type _RemoveUserLogevents_Triggered_ByPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['_RemoveUserLogevents_triggered_byPayload'] = ResolversParentTypes['_RemoveUserLogevents_triggered_byPayload']> = {
  from?: Resolver<Maybe<ResolversTypes['LogEvent']>, ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type _RemoveWateringTaskChangerequests_Requested_ForPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['_RemoveWateringTaskChangerequests_requested_forPayload'] = ResolversParentTypes['_RemoveWateringTaskChangerequests_requested_forPayload']> = {
  from?: Resolver<Maybe<ResolversTypes['ChangeRequest']>, ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes['WateringTask']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type _RemoveWateringTaskChangerequests_Requested_New_TaskPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['_RemoveWateringTaskChangerequests_requested_new_taskPayload'] = ResolversParentTypes['_RemoveWateringTaskChangerequests_requested_new_taskPayload']> = {
  from?: Resolver<Maybe<ResolversTypes['ChangeRequest']>, ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes['WateringTask']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type _RemoveWateringTaskLogevents_Refers_ToPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['_RemoveWateringTaskLogevents_refers_toPayload'] = ResolversParentTypes['_RemoveWateringTaskLogevents_refers_toPayload']> = {
  from?: Resolver<Maybe<ResolversTypes['LogEvent']>, ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes['WateringTask']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type _RemoveWateringTaskUsers_AssignedPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['_RemoveWateringTaskUsers_assignedPayload'] = ResolversParentTypes['_RemoveWateringTaskUsers_assignedPayload']> = {
  from?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes['WateringTask']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type _RemoveWateringTaskUsers_AvailablePayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['_RemoveWateringTaskUsers_availablePayload'] = ResolversParentTypes['_RemoveWateringTaskUsers_availablePayload']> = {
  from?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes['WateringTask']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ChangeRequestResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChangeRequest'] = ResolversParentTypes['ChangeRequest']> = {
  _id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  neo4jImportId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  requested_by?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType, RequireFields<ChangeRequestRequested_ByArgs, never>>;
  requested_for?: Resolver<Maybe<Array<Maybe<ResolversTypes['WateringTask']>>>, ParentType, ContextType, RequireFields<ChangeRequestRequested_ForArgs, never>>;
  requested_to?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType, RequireFields<ChangeRequestRequested_ToArgs, never>>;
  requested_new_task?: Resolver<Maybe<Array<Maybe<ResolversTypes['WateringTask']>>>, ParentType, ContextType, RequireFields<ChangeRequestRequested_New_TaskArgs, never>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type LogEventResolvers<ContextType = any, ParentType extends ResolversParentTypes['LogEvent'] = ResolversParentTypes['LogEvent']> = {
  _id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  date?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  neo4jImportId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  triggered_by?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType, RequireFields<LogEventTriggered_ByArgs, never>>;
  refers_to?: Resolver<Maybe<Array<Maybe<ResolversTypes['WateringTask']>>>, ParentType, ContextType, RequireFields<LogEventRefers_ToArgs, never>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  ownMergeUserSettings?: Resolver<Maybe<ResolversTypes['UserSettings']>, ParentType, ContextType, RequireFields<MutationOwnMergeUserSettingsArgs, never>>;
  seedNeo4jFromJSON?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  setUserAvailability?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationSetUserAvailabilityArgs, 'dates'>>;
  seedAvailabilitiesFromTests?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  planWateringPeriods?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType, RequireFields<MutationPlanWateringPeriodsArgs, never>>;
  pushSubscribe?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationPushSubscribeArgs, never>>;
  publishToAll?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationPublishToAllArgs, never>>;
  sendWelcomeMail?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  AddUserAssigned?: Resolver<Maybe<ResolversTypes['_AddUserAssignedPayload']>, ParentType, ContextType, RequireFields<MutationAddUserAssignedArgs, 'from' | 'to'>>;
  RemoveUserAssigned?: Resolver<Maybe<ResolversTypes['_RemoveUserAssignedPayload']>, ParentType, ContextType, RequireFields<MutationRemoveUserAssignedArgs, 'from' | 'to'>>;
  MergeUserAssigned?: Resolver<Maybe<ResolversTypes['_MergeUserAssignedPayload']>, ParentType, ContextType, RequireFields<MutationMergeUserAssignedArgs, 'from' | 'to'>>;
  AddUserAvailable?: Resolver<Maybe<ResolversTypes['_AddUserAvailablePayload']>, ParentType, ContextType, RequireFields<MutationAddUserAvailableArgs, 'from' | 'to'>>;
  RemoveUserAvailable?: Resolver<Maybe<ResolversTypes['_RemoveUserAvailablePayload']>, ParentType, ContextType, RequireFields<MutationRemoveUserAvailableArgs, 'from' | 'to'>>;
  MergeUserAvailable?: Resolver<Maybe<ResolversTypes['_MergeUserAvailablePayload']>, ParentType, ContextType, RequireFields<MutationMergeUserAvailableArgs, 'from' | 'to'>>;
  AddUserChangerequests_requested_by?: Resolver<Maybe<ResolversTypes['_AddUserChangerequests_requested_byPayload']>, ParentType, ContextType, RequireFields<MutationAddUserChangerequests_Requested_ByArgs, 'from' | 'to'>>;
  RemoveUserChangerequests_requested_by?: Resolver<Maybe<ResolversTypes['_RemoveUserChangerequests_requested_byPayload']>, ParentType, ContextType, RequireFields<MutationRemoveUserChangerequests_Requested_ByArgs, 'from' | 'to'>>;
  MergeUserChangerequests_requested_by?: Resolver<Maybe<ResolversTypes['_MergeUserChangerequests_requested_byPayload']>, ParentType, ContextType, RequireFields<MutationMergeUserChangerequests_Requested_ByArgs, 'from' | 'to'>>;
  AddUserChangerequests_requested_to?: Resolver<Maybe<ResolversTypes['_AddUserChangerequests_requested_toPayload']>, ParentType, ContextType, RequireFields<MutationAddUserChangerequests_Requested_ToArgs, 'from' | 'to'>>;
  RemoveUserChangerequests_requested_to?: Resolver<Maybe<ResolversTypes['_RemoveUserChangerequests_requested_toPayload']>, ParentType, ContextType, RequireFields<MutationRemoveUserChangerequests_Requested_ToArgs, 'from' | 'to'>>;
  MergeUserChangerequests_requested_to?: Resolver<Maybe<ResolversTypes['_MergeUserChangerequests_requested_toPayload']>, ParentType, ContextType, RequireFields<MutationMergeUserChangerequests_Requested_ToArgs, 'from' | 'to'>>;
  AddUserLogevents_triggered_by?: Resolver<Maybe<ResolversTypes['_AddUserLogevents_triggered_byPayload']>, ParentType, ContextType, RequireFields<MutationAddUserLogevents_Triggered_ByArgs, 'from' | 'to'>>;
  RemoveUserLogevents_triggered_by?: Resolver<Maybe<ResolversTypes['_RemoveUserLogevents_triggered_byPayload']>, ParentType, ContextType, RequireFields<MutationRemoveUserLogevents_Triggered_ByArgs, 'from' | 'to'>>;
  MergeUserLogevents_triggered_by?: Resolver<Maybe<ResolversTypes['_MergeUserLogevents_triggered_byPayload']>, ParentType, ContextType, RequireFields<MutationMergeUserLogevents_Triggered_ByArgs, 'from' | 'to'>>;
  CreateUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'id' | 'label' | 'neo4jImportId' | 'type'>>;
  UpdateUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'id'>>;
  DeleteUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationDeleteUserArgs, 'id'>>;
  MergeUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationMergeUserArgs, 'id'>>;
  AddWateringTaskUsers_assigned?: Resolver<Maybe<ResolversTypes['_AddWateringTaskUsers_assignedPayload']>, ParentType, ContextType, RequireFields<MutationAddWateringTaskUsers_AssignedArgs, 'from' | 'to'>>;
  RemoveWateringTaskUsers_assigned?: Resolver<Maybe<ResolversTypes['_RemoveWateringTaskUsers_assignedPayload']>, ParentType, ContextType, RequireFields<MutationRemoveWateringTaskUsers_AssignedArgs, 'from' | 'to'>>;
  MergeWateringTaskUsers_assigned?: Resolver<Maybe<ResolversTypes['_MergeWateringTaskUsers_assignedPayload']>, ParentType, ContextType, RequireFields<MutationMergeWateringTaskUsers_AssignedArgs, 'from' | 'to'>>;
  AddWateringTaskChangerequests_requested_for?: Resolver<Maybe<ResolversTypes['_AddWateringTaskChangerequests_requested_forPayload']>, ParentType, ContextType, RequireFields<MutationAddWateringTaskChangerequests_Requested_ForArgs, 'from' | 'to'>>;
  RemoveWateringTaskChangerequests_requested_for?: Resolver<Maybe<ResolversTypes['_RemoveWateringTaskChangerequests_requested_forPayload']>, ParentType, ContextType, RequireFields<MutationRemoveWateringTaskChangerequests_Requested_ForArgs, 'from' | 'to'>>;
  MergeWateringTaskChangerequests_requested_for?: Resolver<Maybe<ResolversTypes['_MergeWateringTaskChangerequests_requested_forPayload']>, ParentType, ContextType, RequireFields<MutationMergeWateringTaskChangerequests_Requested_ForArgs, 'from' | 'to'>>;
  AddWateringTaskChangerequests_requested_new_task?: Resolver<Maybe<ResolversTypes['_AddWateringTaskChangerequests_requested_new_taskPayload']>, ParentType, ContextType, RequireFields<MutationAddWateringTaskChangerequests_Requested_New_TaskArgs, 'from' | 'to'>>;
  RemoveWateringTaskChangerequests_requested_new_task?: Resolver<Maybe<ResolversTypes['_RemoveWateringTaskChangerequests_requested_new_taskPayload']>, ParentType, ContextType, RequireFields<MutationRemoveWateringTaskChangerequests_Requested_New_TaskArgs, 'from' | 'to'>>;
  MergeWateringTaskChangerequests_requested_new_task?: Resolver<Maybe<ResolversTypes['_MergeWateringTaskChangerequests_requested_new_taskPayload']>, ParentType, ContextType, RequireFields<MutationMergeWateringTaskChangerequests_Requested_New_TaskArgs, 'from' | 'to'>>;
  AddWateringTaskLogevents_refers_to?: Resolver<Maybe<ResolversTypes['_AddWateringTaskLogevents_refers_toPayload']>, ParentType, ContextType, RequireFields<MutationAddWateringTaskLogevents_Refers_ToArgs, 'from' | 'to'>>;
  RemoveWateringTaskLogevents_refers_to?: Resolver<Maybe<ResolversTypes['_RemoveWateringTaskLogevents_refers_toPayload']>, ParentType, ContextType, RequireFields<MutationRemoveWateringTaskLogevents_Refers_ToArgs, 'from' | 'to'>>;
  MergeWateringTaskLogevents_refers_to?: Resolver<Maybe<ResolversTypes['_MergeWateringTaskLogevents_refers_toPayload']>, ParentType, ContextType, RequireFields<MutationMergeWateringTaskLogevents_Refers_ToArgs, 'from' | 'to'>>;
  AddWateringTaskUsers_available?: Resolver<Maybe<ResolversTypes['_AddWateringTaskUsers_availablePayload']>, ParentType, ContextType, RequireFields<MutationAddWateringTaskUsers_AvailableArgs, 'from' | 'to'>>;
  RemoveWateringTaskUsers_available?: Resolver<Maybe<ResolversTypes['_RemoveWateringTaskUsers_availablePayload']>, ParentType, ContextType, RequireFields<MutationRemoveWateringTaskUsers_AvailableArgs, 'from' | 'to'>>;
  MergeWateringTaskUsers_available?: Resolver<Maybe<ResolversTypes['_MergeWateringTaskUsers_availablePayload']>, ParentType, ContextType, RequireFields<MutationMergeWateringTaskUsers_AvailableArgs, 'from' | 'to'>>;
  CreateWateringTask?: Resolver<Maybe<ResolversTypes['WateringTask']>, ParentType, ContextType, RequireFields<MutationCreateWateringTaskArgs, 'date' | 'neo4jImportId' | 'type'>>;
  UpdateWateringTask?: Resolver<Maybe<ResolversTypes['WateringTask']>, ParentType, ContextType, RequireFields<MutationUpdateWateringTaskArgs, 'neo4jImportId'>>;
  DeleteWateringTask?: Resolver<Maybe<ResolversTypes['WateringTask']>, ParentType, ContextType, RequireFields<MutationDeleteWateringTaskArgs, 'neo4jImportId'>>;
  MergeWateringTask?: Resolver<Maybe<ResolversTypes['WateringTask']>, ParentType, ContextType, RequireFields<MutationMergeWateringTaskArgs, 'neo4jImportId'>>;
  CreateWateringPeriod?: Resolver<Maybe<ResolversTypes['WateringPeriod']>, ParentType, ContextType, RequireFields<MutationCreateWateringPeriodArgs, 'from' | 'till'>>;
  AddChangeRequestRequested_by?: Resolver<Maybe<ResolversTypes['_AddChangeRequestRequested_byPayload']>, ParentType, ContextType, RequireFields<MutationAddChangeRequestRequested_ByArgs, 'from' | 'to'>>;
  RemoveChangeRequestRequested_by?: Resolver<Maybe<ResolversTypes['_RemoveChangeRequestRequested_byPayload']>, ParentType, ContextType, RequireFields<MutationRemoveChangeRequestRequested_ByArgs, 'from' | 'to'>>;
  MergeChangeRequestRequested_by?: Resolver<Maybe<ResolversTypes['_MergeChangeRequestRequested_byPayload']>, ParentType, ContextType, RequireFields<MutationMergeChangeRequestRequested_ByArgs, 'from' | 'to'>>;
  AddChangeRequestRequested_for?: Resolver<Maybe<ResolversTypes['_AddChangeRequestRequested_forPayload']>, ParentType, ContextType, RequireFields<MutationAddChangeRequestRequested_ForArgs, 'from' | 'to'>>;
  RemoveChangeRequestRequested_for?: Resolver<Maybe<ResolversTypes['_RemoveChangeRequestRequested_forPayload']>, ParentType, ContextType, RequireFields<MutationRemoveChangeRequestRequested_ForArgs, 'from' | 'to'>>;
  MergeChangeRequestRequested_for?: Resolver<Maybe<ResolversTypes['_MergeChangeRequestRequested_forPayload']>, ParentType, ContextType, RequireFields<MutationMergeChangeRequestRequested_ForArgs, 'from' | 'to'>>;
  AddChangeRequestRequested_to?: Resolver<Maybe<ResolversTypes['_AddChangeRequestRequested_toPayload']>, ParentType, ContextType, RequireFields<MutationAddChangeRequestRequested_ToArgs, 'from' | 'to'>>;
  RemoveChangeRequestRequested_to?: Resolver<Maybe<ResolversTypes['_RemoveChangeRequestRequested_toPayload']>, ParentType, ContextType, RequireFields<MutationRemoveChangeRequestRequested_ToArgs, 'from' | 'to'>>;
  MergeChangeRequestRequested_to?: Resolver<Maybe<ResolversTypes['_MergeChangeRequestRequested_toPayload']>, ParentType, ContextType, RequireFields<MutationMergeChangeRequestRequested_ToArgs, 'from' | 'to'>>;
  AddChangeRequestRequested_new_task?: Resolver<Maybe<ResolversTypes['_AddChangeRequestRequested_new_taskPayload']>, ParentType, ContextType, RequireFields<MutationAddChangeRequestRequested_New_TaskArgs, 'from' | 'to'>>;
  RemoveChangeRequestRequested_new_task?: Resolver<Maybe<ResolversTypes['_RemoveChangeRequestRequested_new_taskPayload']>, ParentType, ContextType, RequireFields<MutationRemoveChangeRequestRequested_New_TaskArgs, 'from' | 'to'>>;
  MergeChangeRequestRequested_new_task?: Resolver<Maybe<ResolversTypes['_MergeChangeRequestRequested_new_taskPayload']>, ParentType, ContextType, RequireFields<MutationMergeChangeRequestRequested_New_TaskArgs, 'from' | 'to'>>;
  CreateChangeRequest?: Resolver<Maybe<ResolversTypes['ChangeRequest']>, ParentType, ContextType, RequireFields<MutationCreateChangeRequestArgs, 'label' | 'neo4jImportId' | 'type'>>;
  UpdateChangeRequest?: Resolver<Maybe<ResolversTypes['ChangeRequest']>, ParentType, ContextType, RequireFields<MutationUpdateChangeRequestArgs, 'label'>>;
  DeleteChangeRequest?: Resolver<Maybe<ResolversTypes['ChangeRequest']>, ParentType, ContextType, RequireFields<MutationDeleteChangeRequestArgs, 'label'>>;
  MergeChangeRequest?: Resolver<Maybe<ResolversTypes['ChangeRequest']>, ParentType, ContextType, RequireFields<MutationMergeChangeRequestArgs, 'label'>>;
  AddLogEventTriggered_by?: Resolver<Maybe<ResolversTypes['_AddLogEventTriggered_byPayload']>, ParentType, ContextType, RequireFields<MutationAddLogEventTriggered_ByArgs, 'from' | 'to'>>;
  RemoveLogEventTriggered_by?: Resolver<Maybe<ResolversTypes['_RemoveLogEventTriggered_byPayload']>, ParentType, ContextType, RequireFields<MutationRemoveLogEventTriggered_ByArgs, 'from' | 'to'>>;
  MergeLogEventTriggered_by?: Resolver<Maybe<ResolversTypes['_MergeLogEventTriggered_byPayload']>, ParentType, ContextType, RequireFields<MutationMergeLogEventTriggered_ByArgs, 'from' | 'to'>>;
  AddLogEventRefers_to?: Resolver<Maybe<ResolversTypes['_AddLogEventRefers_toPayload']>, ParentType, ContextType, RequireFields<MutationAddLogEventRefers_ToArgs, 'from' | 'to'>>;
  RemoveLogEventRefers_to?: Resolver<Maybe<ResolversTypes['_RemoveLogEventRefers_toPayload']>, ParentType, ContextType, RequireFields<MutationRemoveLogEventRefers_ToArgs, 'from' | 'to'>>;
  MergeLogEventRefers_to?: Resolver<Maybe<ResolversTypes['_MergeLogEventRefers_toPayload']>, ParentType, ContextType, RequireFields<MutationMergeLogEventRefers_ToArgs, 'from' | 'to'>>;
  CreateLogEvent?: Resolver<Maybe<ResolversTypes['LogEvent']>, ParentType, ContextType, RequireFields<MutationCreateLogEventArgs, 'date' | 'label' | 'neo4jImportId' | 'type'>>;
  UpdateLogEvent?: Resolver<Maybe<ResolversTypes['LogEvent']>, ParentType, ContextType, RequireFields<MutationUpdateLogEventArgs, 'date'>>;
  DeleteLogEvent?: Resolver<Maybe<ResolversTypes['LogEvent']>, ParentType, ContextType, RequireFields<MutationDeleteLogEventArgs, 'date'>>;
  MergeLogEvent?: Resolver<Maybe<ResolversTypes['LogEvent']>, ParentType, ContextType, RequireFields<MutationMergeLogEventArgs, 'date'>>;
  CreateUserSettings?: Resolver<Maybe<ResolversTypes['UserSettings']>, ParentType, ContextType, RequireFields<MutationCreateUserSettingsArgs, never>>;
  UpdateUserSettings?: Resolver<Maybe<ResolversTypes['UserSettings']>, ParentType, ContextType, RequireFields<MutationUpdateUserSettingsArgs, 'ui_locale'>>;
  DeleteUserSettings?: Resolver<Maybe<ResolversTypes['UserSettings']>, ParentType, ContextType, RequireFields<MutationDeleteUserSettingsArgs, 'ui_locale'>>;
  MergeUserSettings?: Resolver<Maybe<ResolversTypes['UserSettings']>, ParentType, ContextType, RequireFields<MutationMergeUserSettingsArgs, 'ui_locale'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  assignableWateringPeriod?: Resolver<Maybe<ResolversTypes['WateringPeriod']>, ParentType, ContextType>;
  User?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType, RequireFields<QueryUserArgs, never>>;
  WateringTask?: Resolver<Maybe<Array<Maybe<ResolversTypes['WateringTask']>>>, ParentType, ContextType, RequireFields<QueryWateringTaskArgs, never>>;
  WateringPeriod?: Resolver<Maybe<Array<Maybe<ResolversTypes['WateringPeriod']>>>, ParentType, ContextType, RequireFields<QueryWateringPeriodArgs, never>>;
  ChangeRequest?: Resolver<Maybe<Array<Maybe<ResolversTypes['ChangeRequest']>>>, ParentType, ContextType, RequireFields<QueryChangeRequestArgs, never>>;
  LogEvent?: Resolver<Maybe<Array<Maybe<ResolversTypes['LogEvent']>>>, ParentType, ContextType, RequireFields<QueryLogEventArgs, never>>;
  UserSettings?: Resolver<Maybe<Array<Maybe<ResolversTypes['UserSettings']>>>, ParentType, ContextType, RequireFields<QueryUserSettingsArgs, never>>;
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  WateringTaskChange?: SubscriptionResolver<Maybe<ResolversTypes['Boolean']>, "WateringTaskChange", ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  _id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  neo4jImportId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  assigned?: Resolver<Maybe<Array<Maybe<ResolversTypes['WateringTask']>>>, ParentType, ContextType, RequireFields<UserAssignedArgs, never>>;
  available?: Resolver<Maybe<Array<Maybe<ResolversTypes['WateringTask']>>>, ParentType, ContextType, RequireFields<UserAvailableArgs, never>>;
  changerequests_requested_by?: Resolver<Maybe<Array<Maybe<ResolversTypes['ChangeRequest']>>>, ParentType, ContextType, RequireFields<UserChangerequests_Requested_ByArgs, never>>;
  changerequests_requested_to?: Resolver<Maybe<Array<Maybe<ResolversTypes['ChangeRequest']>>>, ParentType, ContextType, RequireFields<UserChangerequests_Requested_ToArgs, never>>;
  logevents_triggered_by?: Resolver<Maybe<Array<Maybe<ResolversTypes['LogEvent']>>>, ParentType, ContextType, RequireFields<UserLogevents_Triggered_ByArgs, never>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserSettingsResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserSettings'] = ResolversParentTypes['UserSettings']> = {
  ui_locale?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  letitrain_maximum_tasks?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  _id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WateringPeriodResolvers<ContextType = any, ParentType extends ResolversParentTypes['WateringPeriod'] = ResolversParentTypes['WateringPeriod']> = {
  _id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  from?: Resolver<ResolversTypes['_Neo4jDate'], ParentType, ContextType>;
  till?: Resolver<ResolversTypes['_Neo4jDate'], ParentType, ContextType>;
  wateringtasks?: Resolver<Maybe<Array<Maybe<ResolversTypes['WateringTask']>>>, ParentType, ContextType, RequireFields<WateringPeriodWateringtasksArgs, never>>;
  hasUsersAssigned?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WateringTaskResolvers<ContextType = any, ParentType extends ResolversParentTypes['WateringTask'] = ResolversParentTypes['WateringTask']> = {
  _id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  date?: Resolver<ResolversTypes['_Neo4jDate'], ParentType, ContextType>;
  done?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  neo4jImportId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  users_assigned?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType, RequireFields<WateringTaskUsers_AssignedArgs, never>>;
  changerequests_requested_for?: Resolver<Maybe<Array<Maybe<ResolversTypes['ChangeRequest']>>>, ParentType, ContextType, RequireFields<WateringTaskChangerequests_Requested_ForArgs, never>>;
  changerequests_requested_new_task?: Resolver<Maybe<Array<Maybe<ResolversTypes['ChangeRequest']>>>, ParentType, ContextType, RequireFields<WateringTaskChangerequests_Requested_New_TaskArgs, never>>;
  logevents_refers_to?: Resolver<Maybe<Array<Maybe<ResolversTypes['LogEvent']>>>, ParentType, ContextType, RequireFields<WateringTaskLogevents_Refers_ToArgs, never>>;
  users_available?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType, RequireFields<WateringTaskUsers_AvailableArgs, never>>;
  wateringperiod?: Resolver<Maybe<Array<Maybe<ResolversTypes['WateringPeriod']>>>, ParentType, ContextType, RequireFields<WateringTaskWateringperiodArgs, never>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  _AddChangeRequestRequested_byPayload?: _AddChangeRequestRequested_ByPayloadResolvers<ContextType>;
  _AddChangeRequestRequested_forPayload?: _AddChangeRequestRequested_ForPayloadResolvers<ContextType>;
  _AddChangeRequestRequested_new_taskPayload?: _AddChangeRequestRequested_New_TaskPayloadResolvers<ContextType>;
  _AddChangeRequestRequested_toPayload?: _AddChangeRequestRequested_ToPayloadResolvers<ContextType>;
  _AddLogEventRefers_toPayload?: _AddLogEventRefers_ToPayloadResolvers<ContextType>;
  _AddLogEventTriggered_byPayload?: _AddLogEventTriggered_ByPayloadResolvers<ContextType>;
  _AddUserAssignedPayload?: _AddUserAssignedPayloadResolvers<ContextType>;
  _AddUserAvailablePayload?: _AddUserAvailablePayloadResolvers<ContextType>;
  _AddUserChangerequests_requested_byPayload?: _AddUserChangerequests_Requested_ByPayloadResolvers<ContextType>;
  _AddUserChangerequests_requested_toPayload?: _AddUserChangerequests_Requested_ToPayloadResolvers<ContextType>;
  _AddUserLogevents_triggered_byPayload?: _AddUserLogevents_Triggered_ByPayloadResolvers<ContextType>;
  _AddWateringTaskChangerequests_requested_forPayload?: _AddWateringTaskChangerequests_Requested_ForPayloadResolvers<ContextType>;
  _AddWateringTaskChangerequests_requested_new_taskPayload?: _AddWateringTaskChangerequests_Requested_New_TaskPayloadResolvers<ContextType>;
  _AddWateringTaskLogevents_refers_toPayload?: _AddWateringTaskLogevents_Refers_ToPayloadResolvers<ContextType>;
  _AddWateringTaskUsers_assignedPayload?: _AddWateringTaskUsers_AssignedPayloadResolvers<ContextType>;
  _AddWateringTaskUsers_availablePayload?: _AddWateringTaskUsers_AvailablePayloadResolvers<ContextType>;
  _MergeChangeRequestRequested_byPayload?: _MergeChangeRequestRequested_ByPayloadResolvers<ContextType>;
  _MergeChangeRequestRequested_forPayload?: _MergeChangeRequestRequested_ForPayloadResolvers<ContextType>;
  _MergeChangeRequestRequested_new_taskPayload?: _MergeChangeRequestRequested_New_TaskPayloadResolvers<ContextType>;
  _MergeChangeRequestRequested_toPayload?: _MergeChangeRequestRequested_ToPayloadResolvers<ContextType>;
  _MergeLogEventRefers_toPayload?: _MergeLogEventRefers_ToPayloadResolvers<ContextType>;
  _MergeLogEventTriggered_byPayload?: _MergeLogEventTriggered_ByPayloadResolvers<ContextType>;
  _MergeUserAssignedPayload?: _MergeUserAssignedPayloadResolvers<ContextType>;
  _MergeUserAvailablePayload?: _MergeUserAvailablePayloadResolvers<ContextType>;
  _MergeUserChangerequests_requested_byPayload?: _MergeUserChangerequests_Requested_ByPayloadResolvers<ContextType>;
  _MergeUserChangerequests_requested_toPayload?: _MergeUserChangerequests_Requested_ToPayloadResolvers<ContextType>;
  _MergeUserLogevents_triggered_byPayload?: _MergeUserLogevents_Triggered_ByPayloadResolvers<ContextType>;
  _MergeWateringTaskChangerequests_requested_forPayload?: _MergeWateringTaskChangerequests_Requested_ForPayloadResolvers<ContextType>;
  _MergeWateringTaskChangerequests_requested_new_taskPayload?: _MergeWateringTaskChangerequests_Requested_New_TaskPayloadResolvers<ContextType>;
  _MergeWateringTaskLogevents_refers_toPayload?: _MergeWateringTaskLogevents_Refers_ToPayloadResolvers<ContextType>;
  _MergeWateringTaskUsers_assignedPayload?: _MergeWateringTaskUsers_AssignedPayloadResolvers<ContextType>;
  _MergeWateringTaskUsers_availablePayload?: _MergeWateringTaskUsers_AvailablePayloadResolvers<ContextType>;
  _Neo4jDate?: _Neo4jDateResolvers<ContextType>;
  _Neo4jDateTime?: _Neo4jDateTimeResolvers<ContextType>;
  _Neo4jLocalDateTime?: _Neo4jLocalDateTimeResolvers<ContextType>;
  _Neo4jLocalTime?: _Neo4jLocalTimeResolvers<ContextType>;
  _Neo4jPoint?: _Neo4jPointResolvers<ContextType>;
  _Neo4jTime?: _Neo4jTimeResolvers<ContextType>;
  _RemoveChangeRequestRequested_byPayload?: _RemoveChangeRequestRequested_ByPayloadResolvers<ContextType>;
  _RemoveChangeRequestRequested_forPayload?: _RemoveChangeRequestRequested_ForPayloadResolvers<ContextType>;
  _RemoveChangeRequestRequested_new_taskPayload?: _RemoveChangeRequestRequested_New_TaskPayloadResolvers<ContextType>;
  _RemoveChangeRequestRequested_toPayload?: _RemoveChangeRequestRequested_ToPayloadResolvers<ContextType>;
  _RemoveLogEventRefers_toPayload?: _RemoveLogEventRefers_ToPayloadResolvers<ContextType>;
  _RemoveLogEventTriggered_byPayload?: _RemoveLogEventTriggered_ByPayloadResolvers<ContextType>;
  _RemoveUserAssignedPayload?: _RemoveUserAssignedPayloadResolvers<ContextType>;
  _RemoveUserAvailablePayload?: _RemoveUserAvailablePayloadResolvers<ContextType>;
  _RemoveUserChangerequests_requested_byPayload?: _RemoveUserChangerequests_Requested_ByPayloadResolvers<ContextType>;
  _RemoveUserChangerequests_requested_toPayload?: _RemoveUserChangerequests_Requested_ToPayloadResolvers<ContextType>;
  _RemoveUserLogevents_triggered_byPayload?: _RemoveUserLogevents_Triggered_ByPayloadResolvers<ContextType>;
  _RemoveWateringTaskChangerequests_requested_forPayload?: _RemoveWateringTaskChangerequests_Requested_ForPayloadResolvers<ContextType>;
  _RemoveWateringTaskChangerequests_requested_new_taskPayload?: _RemoveWateringTaskChangerequests_Requested_New_TaskPayloadResolvers<ContextType>;
  _RemoveWateringTaskLogevents_refers_toPayload?: _RemoveWateringTaskLogevents_Refers_ToPayloadResolvers<ContextType>;
  _RemoveWateringTaskUsers_assignedPayload?: _RemoveWateringTaskUsers_AssignedPayloadResolvers<ContextType>;
  _RemoveWateringTaskUsers_availablePayload?: _RemoveWateringTaskUsers_AvailablePayloadResolvers<ContextType>;
  ChangeRequest?: ChangeRequestResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  LogEvent?: LogEventResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserSettings?: UserSettingsResolvers<ContextType>;
  WateringPeriod?: WateringPeriodResolvers<ContextType>;
  WateringTask?: WateringTaskResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
export type DirectiveResolvers<ContextType = any> = {
  hasRole?: HasRoleDirectiveResolver<any, any, ContextType>;
  auth?: AuthDirectiveResolver<any, any, ContextType>;
  cypher?: CypherDirectiveResolver<any, any, ContextType>;
  relation?: RelationDirectiveResolver<any, any, ContextType>;
  additionalLabels?: AdditionalLabelsDirectiveResolver<any, any, ContextType>;
  MutationMeta?: MutationMetaDirectiveResolver<any, any, ContextType>;
  neo4j_ignore?: Neo4j_IgnoreDirectiveResolver<any, any, ContextType>;
  id?: IdDirectiveResolver<any, any, ContextType>;
  unique?: UniqueDirectiveResolver<any, any, ContextType>;
  index?: IndexDirectiveResolver<any, any, ContextType>;
};


/**
 * @deprecated
 * Use "DirectiveResolvers" root object instead. If you wish to get "IDirectiveResolvers", add "typesPrefix: I" to your config.
 */
export type IDirectiveResolvers<ContextType = any> = DirectiveResolvers<ContextType>;
