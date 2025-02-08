/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { TelemetryProfileMetrics } from "./TelemetryProfileMetrics";
import {
  regionTelemetryMetricsResponse,
  TelemetryProfileMetricsPom,
} from "./TelemetryProfileMetrics.pom";

const pom = new TelemetryProfileMetricsPom();
describe("<RegionViewMetrics/>", () => {
  it("should render component", () => {
    pom.interceptApis([pom.api.getRegionTelemetryMetricsMocked]);
    cy.mount(<TelemetryProfileMetrics region={{ resourceId: "region-1.0" }} />);
    pom.waitForApis();
    pom.root.should("exist");
    pom.el.metricType
      .eq(0)
      .should(
        "contain",
        regionTelemetryMetricsResponse.TelemetryMetricsProfiles[0].metricsGroup
          ?.name,
      );
    pom.el.interval
      .eq(0)
      .should(
        "contain",
        regionTelemetryMetricsResponse.TelemetryMetricsProfiles[0]
          .metricsInterval,
      );
  });

  it("should handle empty results", () => {
    pom.interceptApis([pom.api.getRegionTelemetryMetricsEmpty]);
    cy.mount(<TelemetryProfileMetrics region={{ resourceId: "region-1.0" }} />);
    pom.waitForApis();
    pom.root.should("exist");
    pom.el.metricType.should("not.exist");
    pom.el.interval.should("not.exist");
    pom.el.empty.contains("No metrics available");
  });

  it("should handle 500 error", () => {
    pom.interceptApis([pom.api.getRegionTelemetryMetrics500]);
    cy.mount(<TelemetryProfileMetrics region={{ resourceId: "region-1.0" }} />);
    pom.waitForApis();
    pom.el.apiError.should("exist");
  });
});
