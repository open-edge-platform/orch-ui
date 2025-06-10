/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { eim } from "@orch-ui/apis";

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

export interface FilterParams {
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

function buildSearchTermQuery(
  searchTerm: string,
  uuids?: string[],
  hostIds?: string[],
): string {
  return `(${searchableColumns
    .map((col) => {
      if (col === "uuid" && uuids && uuids.length > 0) return `(uuid="${searchTerm}")`;
      if (col === "resourceId" && hostIds && hostIds.length > 0) return `(resourceId="${searchTerm}")`;
      return `${col}="${searchTerm}"`;
    })
    .filter(Boolean)
    .join(" OR ")})`;
}

export function buildFilterNew(params: FilterParams): string | undefined {
  const filterParts: (string | undefined)[] = [];

  if (params.lifeCycleState) {
    filterParts.push(lifeCycleStateQuery.get(params.lifeCycleState));
  }

  if (params.searchTerm) {
    filterParts.push(buildSearchTermQuery(params.searchTerm, params.uuids, params.hostIds));
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