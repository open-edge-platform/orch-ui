/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */
import { infra } from "@orch-ui/apis";
import { CyApiDetails, CyPom } from "@orch-ui/tests";
import { regionAshland } from "@orch-ui/utils";
import { TelemetryProfileLogsPom } from "../../../../components/molecules/locations/TelemetryProfileLogs/TelemetryProfileLogs.pom";
import { TelemetryProfileMetricsPom } from "../../../../components/molecules/locations/TelemetryProfileMetrics/TelemetryProfileMetrics.pom";

const dataCySelectors = ["regionActions", "type"] as const;
type Selectors = (typeof dataCySelectors)[number];

type ApiAliases =
  | "getRegionMocked"
  | "getSingleRegionMocked"
  | "getSingleRegionNoMetadataMocked"
  | "getAnyRegionMocked";

const endpoints: CyApiDetails<ApiAliases> = {
  getRegionMocked: {
    route: "**/regions/region-1.0",
    statusCode: 200,
    response: {
      hasNext: false,
      regions: [{ resourceId: "region-1.0", name: "region-1.0" }],
      totalElements: 1,
    } as infra.RegionServiceListRegionsApiResponse,
  },
  getSingleRegionMocked: {
    route: "**/regions/region-1.0",
    statusCode: 200,
    response: {
      resourceId: "region-1.0",
      name: "region-1.0",
      metadata: [{ key: "key-1", value: "value-1" }],
    } as infra.RegionResourceRead,
  },
  getSingleRegionNoMetadataMocked: {
    route: "**/regions/region-1.0",
    statusCode: 200,
    response: {
      resourceId: "region-1.0",
      name: "region-no-metadata",
      metadata: [],
    } as infra.RegionResourceRead,
  },
  getAnyRegionMocked: {
    route: "**/regions/*",
    statusCode: 200,
    response: regionAshland as infra.RegionResourceRead,
  },
};
export class RegionViewPom extends CyPom<Selectors, ApiAliases> {
  public metrics = new TelemetryProfileMetricsPom();
  public logs = new TelemetryProfileLogsPom();
  constructor(public rootCy: string = "regionView") {
    super(rootCy, [...dataCySelectors], endpoints);
  }
}
