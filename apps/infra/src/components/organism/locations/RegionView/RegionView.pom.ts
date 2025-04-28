/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { CyApiDetails, CyPom } from "@orch-ui/tests";
import { TelemetryProfileLogsPom } from "../../../../components/molecules/locations/TelemetryProfileLogs/TelemetryProfileLogs.pom";
import { TelemetryProfileMetricsPom } from "../../../../components/molecules/locations/TelemetryProfileMetrics/TelemetryProfileMetrics.pom";

const dataCySelectors = ["regionActions", "type"] as const;
type Selectors = (typeof dataCySelectors)[number];

type ApiAliases = "getRegionMocked";

const endpoints: CyApiDetails<
  ApiAliases,
  infra.GetV1ProjectsByProjectNameRegionsApiResponse
> = {
  getRegionMocked: {
    route: "**/regions/region-1.0",
    statusCode: 200,
    response: {
      hasNext: false,
      regions: [{ resourceId: "region-1.0", name: "region-1.0" }],
      totalElements: 1,
    },
  },
};
export class RegionViewPom extends CyPom<Selectors, ApiAliases> {
  public metrics = new TelemetryProfileMetricsPom();
  public logs = new TelemetryProfileLogsPom();
  constructor(public rootCy: string = "regionView") {
    super(rootCy, [...dataCySelectors], endpoints);
  }
}
