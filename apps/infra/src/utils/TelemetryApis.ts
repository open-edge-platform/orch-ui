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
  infra.TelemetryMetricsProfileServiceListTelemetryMetricsProfilesApiResponse
> = {
  getTelemetryProfilesMetricsMocked: {
    route: `${baseRoute}metricgroups/**/metricprofiles?*`,
    response: {
      telemetryMetricsProfiles: [],
      totalElements: 0,
      hasNext: false,
    },
  },
};

export type TelemetryProfilesLogsApis = "getTelemetryProfilesLogsMocked";
export const telemetryProfilesLogsEndpoints: CyApiDetails<
  TelemetryProfilesLogsApis,
  infra.TelemetryLogsProfileServiceListTelemetryLogsProfilesApiResponse
> = {
  getTelemetryProfilesLogsMocked: {
    route: `${baseRoute}loggroups/**/logprofiles?*`,
    response: { telemetryLogsProfiles: [], totalElements: 0, hasNext: false },
  },
};

export type TelemetryGroupsMetricsApis = "getTelemetryGroupsMetricsMocked";
export const telemetryGroupsMetricsEndpoints: CyApiDetails<
  TelemetryGroupsMetricsApis,
  infra.TelemetryMetricsGroupServiceListTelemetryMetricsGroupsApiResponse
> = {
  getTelemetryGroupsMetricsMocked: {
    route: `${baseRoute}metricgroups?*`,
    response: {
      telemetryMetricsGroups: [],
      totalElements: 0,
      hasNext: false,
    },
  },
};

export type TelemetryGroupsLogsApis = "getTelemetryGroupsLogsMocked";
export const telemetryGroupsLogsEndpoints: CyApiDetails<
  TelemetryGroupsLogsApis,
  infra.TelemetryLogsGroupServiceListTelemetryLogsGroupsApiResponse
> = {
  getTelemetryGroupsLogsMocked: {
    route: `${baseRoute}loggroups?*`,
    response: { telemetryLogsGroups: [], totalElements: 0, hasNext: false },
  },
};
