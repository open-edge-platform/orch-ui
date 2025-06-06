/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { eim } from "@orch-ui/apis";
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
  statusIndicator: eim.StatusIndicator,
) => {
  return `${detailedStatuses
    .map((value) => `${value}=${statusIndicator}`)
    .join(" OR ")}`;
};

const getIndicator = (
  value: "IDLE" | "UNSPECIFIED" | "IN_PROGRESS" | "ERROR",
) => `STATUS_INDICATION_${value}` as eim.StatusIndicator;

export const lifeCycleStateQuery = new Map<LifeCycleState, string | undefined>([
  [
    LifeCycleState.Healthy,
    "(currentState=HOST_STATE_ONBOARDED AND has(instance) AND instance.currentState=INSTANCE_STATE_RUNNING)",
  ],
  [LifeCycleState.Provisioned, "(currentState=HOST_STATE_ONBOARDED AND has(instance))"],
  [LifeCycleState.Onboarded, "(currentState=HOST_STATE_ONBOARDED AND NOT has(instance))"],
  [LifeCycleState.Registered, "(currentState=HOST_STATE_REGISTERED OR currentState=HOST_STATE_UNSPECIFIED)"],
  [LifeCycleState.All, undefined],
]);

const aggregatedStatusQuery = new Map<AggregatedStatus, string>();
aggregatedStatusQuery.set(
  AggregatedStatus.Ready,
  `${buildStatusQuery(detailedStatuses, getIndicator("IDLE"))} OR ${buildStatusQuery(
    detailedStatuses,
    getIndicator("UNSPECIFIED"),
  )}`,
);
aggregatedStatusQuery.set(
  AggregatedStatus.Error,
  buildStatusQuery(detailedStatuses, getIndicator("ERROR")),
);
aggregatedStatusQuery.set(
  AggregatedStatus.InProgress,
  buildStatusQuery(detailedStatuses, getIndicator("IN_PROGRESS")),
);
aggregatedStatusQuery.set(AggregatedStatus.Unknown, "currentState=HOST_STATE_UNSPECIFIED");
aggregatedStatusQuery.set(AggregatedStatus.Deauthorized, "currentState=HOST_STATE_UNTRUSTED");

interface HostFilterBuilderState {
  lifeCycleState?: LifeCycleState;
  searchTerm?: string;
  statuses?: AggregatedStatus[];
  osProfiles?: string[];
  hasWorkload?: boolean;
  workloadMemberId?: string;
  siteId?: string;
  uuids?: string[];
  hostIds?: string[];
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
};

export const _setLifeCycleState = (
  state: HostFilterBuilderState,
  action: PayloadAction<LifeCycleState>,
) => {
  state.lifeCycleState = action.payload;
};

export const _setHasWorkload = (
  state: HostFilterBuilderState,
  action: PayloadAction<boolean | undefined>,
) => {
  state.hasWorkload = action.payload;
};

export const _setWorkloadMemberId = (
  state: HostFilterBuilderState,
  action: PayloadAction<string | undefined>,
) => {
  state.workloadMemberId = action.payload;
};

export const _setSearchTerm = (
  state: HostFilterBuilderState,
  action: PayloadAction<string | undefined>,
) => {
  state.searchTerm = action.payload;
};

export const _setStatuses = (
  state: HostFilterBuilderState,
  action: PayloadAction<AggregatedStatus[] | undefined>,
) => {
  state.statuses = action.payload;
};

export const _setFiltersByUuids = (
  state: HostFilterBuilderState,
  action: PayloadAction<string[] | undefined>,
) => {
  state.uuids = action.payload;
};

export const _setFiltersByHostIds = (
  state: HostFilterBuilderState,
  action: PayloadAction<string[] | undefined>,
) => {
  state.hostIds = action.payload;
};

export const _setOsProfiles = (
  state: HostFilterBuilderState,
  action: PayloadAction<string[] | undefined>,
) => {
  state.osProfiles = action.payload;
};

export function buildFilterNew(params: HostFilterBuilderState): string | undefined {
  const filterParts: (string | undefined)[] = [];

  if (params.lifeCycleState) {
    filterParts.push(lifeCycleStateQuery.get(params.lifeCycleState));
  }

  if (params.searchTerm && params.searchTerm.trim().length > 0) {
    const term = params.searchTerm.trim();
    const searchParts = searchableColumns
      .map((column) => {
        if (column === "uuid" && params.uuids && params.uuids.length > 0) {
          return undefined;
        }
        if (column === "resourceId" && params.hostIds && params.hostIds.length > 0) {
          return undefined;
        }
        return `${column}="${term}"`;
      })
      .filter(Boolean);

    if (searchParts.length > 0) {
      filterParts.push(`(${searchParts.join(" OR ")})`);
    }
  }

  if (params.statuses && params.statuses.length > 0) {
    const statusQueries = params.statuses
      .map((status) => aggregatedStatusQuery.get(status))
      .filter(Boolean);
    if (statusQueries.length > 0) {
      filterParts.push(`(${statusQueries.join(" OR ")})`);
    }
  }

  if (params.osProfiles && params.osProfiles.length > 0) {
    filterParts.push(buildColumnOrs("instance.currentOs.profileName", params.osProfiles));
  }

  if (params.hasWorkload !== undefined) {
    filterParts.push(params.hasWorkload ? "has(instance.workloadMembers)" : "NOT has(instance.workloadMembers)");
  }

  if (params.workloadMemberId) {
    filterParts.push(`workloadMembers="${params.workloadMemberId}"`);
  }

  if (params.siteId) {
    filterParts.push(`site.resourceId="${params.siteId}"`);
  }

  if (params.uuids && params.uuids.length > 0) {
    filterParts.push(buildColumnOrs("uuid", params.uuids));
  }

  if (params.hostIds && params.hostIds.length > 0) {
    filterParts.push(buildColumnOrs("resourceId", params.hostIds));
  }

  const result = filterParts.filter(Boolean).join(" AND ");
  return result.length > 0 ? result : undefined;
}

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
    setSiteId: _setSiteId,
    setFiltersByUuids: _setFiltersByUuids,
    setFiltersByHostIds: _setFiltersByHostIds,
  },
});

export const selectHostFilterState = (state: _FilterBuilderRootState) =>
  state.hostFilterBuilder;

export const selectFilter = (state: _FilterBuilderRootState): string | undefined => {
  const filterState = selectHostFilterState(state);
  return buildFilterNew(filterState);
};

export const {
  setLifeCycleState,
  setHasWorkload,
  setWorkloadMemberId,
  setSearchTerm,
  setStatuses,
  setOsProfiles,
  setSiteId,
  setFiltersByUuids,
  setFiltersByHostIds,
} = hostFilterBuilder.actions;

export default hostFilterBuilder.reducer;
