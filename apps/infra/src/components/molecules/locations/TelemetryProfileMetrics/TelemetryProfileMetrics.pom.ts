/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { eim } from "@orch-ui/apis";
import { CyApiDetails, CyPom } from "@orch-ui/tests";

const dataCySelectors = [
  "item",
  "metricType",
  "interval",
  "empty",
  "apiError",
] as const;
type Selectors = (typeof dataCySelectors)[number];

type ApiAliases =
  | "getRegionTelemetryMetrics"
  | "getRegionTelemetryMetricsMocked"
  | "getRegionTelemetryMetricsEmpty"
  | "getRegionTelemetryMetrics500";

const regionMetricsUrl = "**/metricprofiles?regionId=region-1.0";
export const regionTelemetryMetricsResponse: eim.GetV1ProjectsByProjectNameTelemetryMetricgroupsAndTelemetryMetricsGroupIdMetricprofilesApiResponse =
  {
    TelemetryMetricsProfiles: [
      {
        metricsGroupId: "1",
        metricsInterval: 0,
        metricsGroup: {
          name: "metric1",
          collectorKind: "TELEMETRY_COLLECTOR_KIND_CLUSTER",
          groups: [],
        },
      },
    ],
    hasNext: false,
    totalElements: 1,
  };

const endpoints: CyApiDetails<ApiAliases> = {
  getRegionTelemetryMetrics: { route: "**/metricprofiles*", statusCode: 200 },
  getRegionTelemetryMetricsMocked: {
    route: regionMetricsUrl,
    statusCode: 200,
    response: regionTelemetryMetricsResponse,
  },
  getRegionTelemetryMetricsEmpty: {
    route: regionMetricsUrl,
    response: {},
  },
  getRegionTelemetryMetrics500: {
    route: regionMetricsUrl,
    statusCode: 500,
  },
};

export class TelemetryProfileMetricsPom extends CyPom<Selectors, ApiAliases> {
  constructor(public rootCy: string = "telemetryProfileMetrics") {
    super(rootCy, [...dataCySelectors], endpoints);
  }
}
