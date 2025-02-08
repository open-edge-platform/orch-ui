/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { cyGet } from "@orch-ui/tests";
import { setRegion } from "../../../../store/locations";
import { setupStore } from "../../../../store/store";
import { RegionView } from "./RegionView";
import { RegionViewPom } from "./RegionView.pom";

const pom = new RegionViewPom();
describe("<RegionView/>", () => {
  describe("basic tests", () => {
    const store = setupStore({
      locations: {
        regionId: undefined,
        region: {
          resourceId: "region-1.0",
          name: "region-1.0",
          metadata: [{ key: "key-1", value: "value-1" }],
        },
        branches: [],
        isEmpty: undefined,
        expandedRegionIds: [],
      },
    });
    beforeEach(() => {
      pom.metrics.interceptApis([pom.metrics.api.getRegionTelemetryMetrics]);
      pom.logs.interceptApis([pom.logs.api.getRegionTelemetryLogs]);
      cy.mount(<RegionView />, {
        //@ts-ignore TODO: how to make store pieces optional
        reduxStore: store,
      });
      pom.metrics.waitForApis();
      pom.logs.waitForApis();
    });

    it("should render component", () => {
      pom.root.should("exist");
      pom.metrics.root.should("exist");
      pom.logs.root.should("exist");
    });

    it("should not change Dropdown title", () => {
      pom.el.regionActions.find("button").click();
      cyGet("Delete").click();
      pom.el.regionActions.find("button").contains("Region Actions");
    });

    it("should change url to region edit route", () => {
      pom.el.regionActions.find("button").click();
      cyGet("Edit").click();
      cy.get("#pathname").contains("/regions/region-1.0");
    });

    it("should handle redux stored region with no metadata", () => {
      store.dispatch(setRegion({ metadata: [], name: "region-no-metadata" }));
      pom.el.type.should("contain.text", "Not specified");
    });
  });

  it("should handle api response region with no metadata (e.g. search results)", () => {
    const store = setupStore({
      locations: {
        regionId: undefined,
        region: {
          resourceId: "region-1.0",
          name: "region-1.0",
        },
        branches: [],
        isEmpty: undefined,
        expandedRegionIds: [],
      },
    });

    pom.interceptApis([pom.api.getRegionMocked]);
    pom.metrics.interceptApis([pom.metrics.api.getRegionTelemetryMetrics]);
    pom.logs.interceptApis([pom.logs.api.getRegionTelemetryLogs]);
    cy.mount(<RegionView />, { reduxStore: store });
    pom.waitForApis();
    pom.metrics.waitForApis();
    pom.logs.waitForApis();
    pom.el.type.should("contain.text", "Not specified");
  });
});
