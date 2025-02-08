/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { TelemetryProfileLogs } from "./TelemetryProfileLogs";
import {
  regionTelemetryLogResponse,
  TelemetryProfileLogsPom,
} from "./TelemetryProfileLogs.pom";

const pom = new TelemetryProfileLogsPom();
describe("<TelemetryProfileLogs/>", () => {
  it("should render component", () => {
    pom.interceptApis([pom.api.getRegionTelemetryLogsMocked]);
    cy.mount(<TelemetryProfileLogs region={{ resourceId: "region-1.0" }} />);
    pom.waitForApis();
    pom.root.should("exist");
    pom.el.source
      .eq(0)
      .should(
        "contain",
        regionTelemetryLogResponse.TelemetryLogsProfiles[0].logsGroup?.name,
      );
    pom.el.level
      .eq(0)
      .should(
        "contain",
        regionTelemetryLogResponse.TelemetryLogsProfiles[0].logLevel,
      );
  });

  it("should handle empty results", () => {
    pom.interceptApis([pom.api.getRegionTelemetryLogsEmpty]);
    cy.mount(<TelemetryProfileLogs region={{ resourceId: "region-1.0" }} />);
    pom.waitForApis();
    pom.root.should("exist");
    pom.el.source.should("not.exist");
    pom.el.level.should("not.exist");
    pom.el.empty.contains("No logs available");
  });

  it("should handle 500 error", () => {
    pom.interceptApis([pom.api.getRegionTelemetryLogs500]);
    cy.mount(<TelemetryProfileLogs region={{ resourceId: "region-1.0" }} />);
    pom.waitForApis();
    pom.el.apiError.should("exist");
  });
});
