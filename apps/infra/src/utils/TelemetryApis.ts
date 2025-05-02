/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";

import { CyApiDetails, defaultActiveProject } from "@orch-ui/tests";

const baseRoute = `**/v1/projects/${defaultActiveProject.name}/telemetry/`;

export type TelemetryProfilesMetricsApis = "getTelemetryProfilesMetricsMocked";
export const telemetryProfilesMetricsEndpoints: CyApiDetails<
  TelemetryProfilesMetricsApis,
  infra.GetV1ProjectsByProjectNameTelemetryMetricgroupsAndTelemetryMetricsGroupIdMetricprofilesApiResponse
> = {
  getTelemetryProfilesMetricsMocked: {
    route: `${baseRoute}metricgroups/**/metricprofiles?*`,
    response: {
      TelemetryMetricsProfiles: [],
      totalElements: 0,
      hasNext: false,
    },
  },
};

export type TelemetryProfilesLogsApis = "getTelemetryProfilesLogsMocked";
export const telemetryProfilesLogsEndpoints: CyApiDetails<
  TelemetryProfilesLogsApis,
  infra.GetV1ProjectsByProjectNameTelemetryLoggroupsAndTelemetryLogsGroupIdLogprofilesApiResponse
> = {
  getTelemetryProfilesLogsMocked: {
    route: `${baseRoute}loggroups/**/logprofiles?*`,
    response: { TelemetryLogsProfiles: [], totalElements: 0, hasNext: false },
  },
};

export type TelemetryGroupsMetricsApis = "getTelemetryGroupsMetricsMocked";
export const telemetryGroupsMetricsEndpoints: CyApiDetails<
  TelemetryGroupsMetricsApis,
  infra.GetV1ProjectsByProjectNameTelemetryMetricgroupsApiResponse
> = {
  getTelemetryGroupsMetricsMocked: {
    route: `${baseRoute}metricgroups?*`,
    response: {
      TelemetryMetricsGroups: [],
      totalElements: 0,
      hasNext: false,
    },
  },
};

export type TelemetryGroupsLogsApis = "getTelemetryGroupsLogsMocked";
export const telemetryGroupsLogsEndpoints: CyApiDetails<
  TelemetryGroupsLogsApis,
  infra.GetV1ProjectsByProjectNameTelemetryLoggroupsApiResponse
> = {
  getTelemetryGroupsLogsMocked: {
    route: `${baseRoute}loggroups?*`,
    response: { TelemetryLogsGroups: [], totalElements: 0, hasNext: false },
  },
};
