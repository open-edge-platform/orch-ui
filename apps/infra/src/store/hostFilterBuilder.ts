/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const hostFilterBuilderSliceName = "hostFilterBuilder";
export interface _FilterBuilderRootState {
  [hostFilterBuilderSliceName]: HostFilterBuilderState;
}

export const detailedStatuses = [
  "hostStatusIndicator",
  "onboardingStatusIndicator",
  "registrationStatusIndicator",
];

export enum LifeCycleState {
  Provisioned = "provisioned",
  Onboarded = "onboarded",
  Registered = "registered",
  All = "all",
  Healthy = "healthy",
}

export enum AggregatedStatus {
  Ready,
  InProgress,
  Error,
  Unknown,
  Deauthorized,
}
export const buildStatusQuery = (
  detailedStatuses: string[],
  statusIndicator: infra.StatusIndication,
) => {
  return `${detailedStatuses.map((value) => `${value}=${statusIndicator}`).join(" OR ")}`;
};

const getIndicator = (
  value: "IDLE" | "UNSPECIFIED" | "IN_PROGRESS" | "ERROR",
) => `STATUS_INDICATION_${value}` as infra.StatusIndication;

export const lifeCycleStateQuery = new Map<LifeCycleState, string | undefined>([
  [
    LifeCycleState.Healthy,
    "(currentState=HOST_STATE_ONBOARDED AND has(instance) AND instance.currentState=INSTANCE_STATE_RUNNING)",
  ],
  [
    LifeCycleState.Provisioned,
    "(currentState=HOST_STATE_ONBOARDED AND has(instance))",
  ],
  [
    LifeCycleState.Onboarded,
    "(currentState=HOST_STATE_ONBOARDED AND NOT has(instance))",
  ],

  [
    LifeCycleState.Registered,
    "(currentState=HOST_STATE_REGISTERED OR currentState=HOST_STATE_UNSPECIFIED)",
  ],
  [LifeCycleState.All, undefined],
]);

const aggregatedStatusQuery = new Map<AggregatedStatus, string>();
aggregatedStatusQuery.set(
  AggregatedStatus.Ready,
  `${buildStatusQuery(detailedStatuses, getIndicator("IDLE"))} OR ${buildStatusQuery(detailedStatuses, getIndicator("UNSPECIFIED"))}`,
);
aggregatedStatusQuery.set(
  AggregatedStatus.Error,
  buildStatusQuery(detailedStatuses, getIndicator("ERROR")),
);
aggregatedStatusQuery.set(
  AggregatedStatus.InProgress,
  buildStatusQuery(detailedStatuses, getIndicator("IN_PROGRESS")),
);
aggregatedStatusQuery.set(
  AggregatedStatus.Unknown,
  "currentState=HOST_STATE_UNSPECIFIED",
);
aggregatedStatusQuery.set(
  AggregatedStatus.Deauthorized,
  "currentState=HOST_STATE_UNTRUSTED",
);

export interface HostFilterBuilderState {
  lifeCycleState: LifeCycleState;
  lifeCycleStateQuery?: string;
  uuids?: string[];
  uuidsQuery?: string;
  hostIds?: string[];
  hostIdsQuery?: string;
  hasSiteIdQuery?: string;
  siteId?: string;
  siteIdQuery?: string;
  hasWorkload?: boolean;
  hasWorkloadQuery?: string;
  workloadMemberId?: string;
  workloadMemberIdQuery?: string;
  searchTerm?: string;
  searchTermQuery?: string;
  statuses?: AggregatedStatus[];
  statusesQuery?: string;
  osProfiles?: string[];
  osProfilesQuery?: string;
  filter?: string; //The final result send over
}

const initialState: HostFilterBuilderState = {
  lifeCycleState: LifeCycleState.Provisioned,
};

export const searchableColumns = [
  "name",
  "uuid",
  "serialNumber",
  "resourceId",
  "note",
  "site.name",
  "instance.desiredOs.name",
];

export const buildColumnOrs = (column: string, values: string[]): string =>
  `(${values.map((value) => `${column}="${value}"`).join(" OR ")})`;

export const _setSiteId = (
  state: HostFilterBuilderState,
  action: PayloadAction<string | undefined>,
) => {
  state.siteId = action.payload;
  state.siteIdQuery = `site.resourceId="${action.payload}"`;
  hostFilterBuilder.caseReducers.buildFilter(state);
  return state;
};

export const _setLifeCycleState = (
  state: HostFilterBuilderState,
  action: PayloadAction<LifeCycleState>,
) => {
  state.lifeCycleState = action.payload;
  hostFilterBuilder.caseReducers.buildFilter(state);
  return state;
};

export const _setHasWorkload = (
  state: HostFilterBuilderState,
  action: PayloadAction<boolean | undefined>,
) => {
  state.hasWorkload = action.payload;
  state.hasWorkloadQuery = action.payload
    ? "has(instance.workloadMembers)"
    : "NOT has(instance.workloadMembers)";
  hostFilterBuilder.caseReducers.buildFilter(state);
  return state;
};

export const _setWorkloadMemberId = (
  state: HostFilterBuilderState,
  action: PayloadAction<string | undefined>,
) => {
  state.workloadMemberId = action.payload;
  state.workloadMemberIdQuery = `workloadMembers="${action.payload}"`;
  hostFilterBuilder.caseReducers.buildFilter(state);
  return state;
};

export const _setSearchTerm = (
  state: HostFilterBuilderState,
  action: PayloadAction<string>,
) => {
  state.searchTerm = action.payload;
  state.searchTermQuery = `(${searchableColumns
    .map((value) => {
      // Ignore search filter on `uuid` column if filters.uuids are set
      if (value === "uuid" && state.uuidsQuery !== undefined) {
        return;
      }
      // Ignore search filter on `resourceId` column if filters.hostIds are set
      if (value === "resourceId" && state.hostIdsQuery !== undefined) {
        return;
      }
      return `${value}="${action.payload}"`;
    })
    .filter((value) => value !== undefined)
    .join(" OR ")})`;
  hostFilterBuilder.caseReducers.buildFilter(state);
};

export const _setStatuses = (
  state: HostFilterBuilderState,
  action: PayloadAction<AggregatedStatus[] | undefined>,
) => {
  state.statuses = action.payload;
  if (state.statuses) {
    state.statusesQuery = `(${state.statuses
      .map((value) => aggregatedStatusQuery.get(value))
      .join(" OR ")})`;
  } else {
    state.statusesQuery = undefined;
  }
  hostFilterBuilder.caseReducers.buildFilter(state);
};

export const _setFiltersByUuids = (
  state: HostFilterBuilderState,
  action: PayloadAction<string[] | undefined>,
) => {
  state.uuids = action.payload;
  if (action.payload && action.payload.length > 0) {
    state.uuidsQuery = buildColumnOrs("uuid", action.payload);
  } else {
    state.uuidsQuery = undefined;
  }
  hostFilterBuilder.caseReducers.buildFilter(state);
  return state;
};

export const _setFiltersByHostIds = (
  state: HostFilterBuilderState,
  action: PayloadAction<string[] | undefined>,
) => {
  state.hostIds = action.payload;
  if (action.payload && action.payload.length > 0) {
    state.hostIdsQuery = buildColumnOrs("resourceId", action.payload);
  } else {
    state.hostIdsQuery = undefined;
  }
  hostFilterBuilder.caseReducers.buildFilter(state);
  return state;
};

export const _setOsProfiles = (
  state: HostFilterBuilderState,
  action: PayloadAction<string[] | undefined>,
) => {
  state.osProfiles = action.payload;
  if (action.payload) {
    state.osProfilesQuery = buildColumnOrs(
      "instance.currentOs.profileName",
      action.payload,
    );
  } else {
    state.osProfilesQuery = undefined;
  }
  hostFilterBuilder.caseReducers.buildFilter(state);
};

export const _buildFilter = (state: HostFilterBuilderState) => {
  const filter: (string | undefined)[] = [];
  filter.push(
    state.lifeCycleState
      ? lifeCycleStateQuery.get(state.lifeCycleState)
      : undefined,
  );
  filter.push(state.searchTerm ? state.searchTermQuery : undefined);
  filter.push(state.statuses ? state.statusesQuery : undefined);
  filter.push(state.osProfiles ? state.osProfilesQuery : undefined);
  filter.push(
    state.hasWorkload !== undefined ? state.hasWorkloadQuery : undefined,
  );
  filter.push(state.workloadMemberId ? state.workloadMemberIdQuery : undefined);
  filter.push(state.siteId ? state.siteIdQuery : undefined);
  filter.push(
    state.uuids && state.uuids.length > 0 ? state.uuidsQuery : undefined,
  );
  filter.push(
    state.hostIds && state.hostIds.length > 0 ? state.hostIdsQuery : undefined,
  );
  const result = filter.filter((value) => value !== undefined).join(" AND ");
  state.filter = result.length === 0 ? undefined : result;
};

export const hostFilterBuilder = createSlice({
  name: hostFilterBuilderSliceName,
  initialState,
  reducers: {
    setLifeCycleState: _setLifeCycleState,
    setHasWorkload: _setHasWorkload,
    setWorkloadMemberId: _setWorkloadMemberId,
    setSearchTerm: _setSearchTerm,
    setStatuses: _setStatuses,
    setOsProfiles: _setOsProfiles,
    buildFilter: _buildFilter,
    setSiteId: _setSiteId,
    setFiltersByUuids: _setFiltersByUuids,
    setFiltersByHostIds: _setFiltersByHostIds,
  },
});

export const {
  setLifeCycleState,
  setHasWorkload,
  setWorkloadMemberId,
  setSearchTerm,
  setStatuses,
  setOsProfiles,
  buildFilter,
  setSiteId,
  setFiltersByUuids,
  setFiltersByHostIds,
} = hostFilterBuilder.actions;

export const selectFilter = (state: _FilterBuilderRootState) =>
  state.hostFilterBuilder.filter;

export default hostFilterBuilder.reducer;
