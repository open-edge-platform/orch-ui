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
  return `${detailedStatuses.map((value) => `${value}=${statusIndicator}`).join(" OR ")}`;
};

const getIndicator = (
  value: "IDLE" | "UNSPECIFIED" | "IN_PROGRESS" | "ERROR",
) => `STATUS_INDICATION_${value}` as eim.StatusIndicator;

export const lifeCycleStateQuery = new Map<
  LifeCycleState,
  string | undefined
>();
lifeCycleStateQuery.set(
  LifeCycleState.Provisioned,
  "(currentState=HOST_STATE_ONBOARDED AND has(instance))",
);
lifeCycleStateQuery.set(
  LifeCycleState.Onboarded,
  "(currentState=HOST_STATE_ONBOARDED AND NOT has(instance))",
);
lifeCycleStateQuery.set(
  LifeCycleState.Registered,
  "(currentState=HOST_STATE_UNSPECIFIED OR currentState=HOST_STATE_REGISTERED)",
);
lifeCycleStateQuery.set(LifeCycleState.All, undefined);

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

export const _setLifeCycleState = (
  state: HostFilterBuilderState,
  action: PayloadAction<LifeCycleState>,
) => {
  state.lifeCycleState = action.payload;
  hostFilterBuilder.caseReducers.buildFilter(state);
  return state;
};

export const _setSearchTerm = (
  state: HostFilterBuilderState,
  action: PayloadAction<string>,
) => {
  state.searchTerm = action.payload;
  state.searchTermQuery = `(${searchableColumns
    .map((value) => `${value}="${action.payload}"`)
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
  const result = filter.filter((value) => value !== undefined).join(" AND ");
  state.filter = result.length === 0 ? undefined : result;
};

export const hostFilterBuilder = createSlice({
  name: hostFilterBuilderSliceName,
  initialState,
  reducers: {
    setLifeCycleState: _setLifeCycleState,
    setSearchTerm: _setSearchTerm,
    setStatuses: _setStatuses,
    setOsProfiles: _setOsProfiles,
    buildFilter: _buildFilter,
  },
});

export const {
  setLifeCycleState,
  setSearchTerm,
  setStatuses,
  setOsProfiles,
  buildFilter,
} = hostFilterBuilder.actions;

export const selectFilter = (state: _FilterBuilderRootState) =>
  state.hostFilterBuilder.filter;

export default hostFilterBuilder.reducer;
