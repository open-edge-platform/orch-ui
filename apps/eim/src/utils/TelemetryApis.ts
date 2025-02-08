/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { eim } from "@orch-ui/apis";

import { CyApiDetails, defaultActiveProject } from "@orch-ui/tests";

const baseRoute = `**/v1/projects/${defaultActiveProject.name}/telemetry/`;

export type TelemetryProfilesMetricsApis = "getTelemetryProfilesMetricsMocked";
export const telemetryProfilesMetricsEndpoints: CyApiDetails<
  TelemetryProfilesMetricsApis,
  eim.GetV1ProjectsByProjectNameTelemetryMetricgroupsAndTelemetryMetricsGroupIdMetricprofilesApiResponse
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
  eim.GetV1ProjectsByProjectNameTelemetryLoggroupsAndTelemetryLogsGroupIdLogprofilesApiResponse
> = {
  getTelemetryProfilesLogsMocked: {
    route: `${baseRoute}loggroups/**/logprofiles?*`,
    response: { TelemetryLogsProfiles: [], totalElements: 0, hasNext: false },
  },
};

export type TelemetryGroupsMetricsApis = "getTelemetryGroupsMetricsMocked";
export const telemetryGroupsMetricsEndpoints: CyApiDetails<
  TelemetryGroupsMetricsApis,
  eim.GetV1ProjectsByProjectNameTelemetryMetricgroupsApiResponse
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
  eim.GetV1ProjectsByProjectNameTelemetryLoggroupsApiResponse
> = {
  getTelemetryGroupsLogsMocked: {
    route: `${baseRoute}loggroups?*`,
    response: { TelemetryLogsGroups: [], totalElements: 0, hasNext: false },
  },
};
