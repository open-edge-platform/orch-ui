/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { siteRestaurantTwo } from "@orch-ui/utils";
import { setupStore } from "../../../../store/store";
import { SiteView } from "./SiteView";
import { SiteViewPom } from "./SiteView.pom";

const pom = new SiteViewPom();
describe("<SiteView/>", () => {
  it("should render component", () => {
    pom.interceptApis([pom.api.getSite]);
    cy.mount(<SiteView />, {
      reduxStore: setupStore({
        locations: {
          site: siteRestaurantTwo,
          branches: [],
          expandedRegionIds: [],
        },
      }),
    });

    pom.waitForApis();
    pom.root.should("exist");
  });

  it("should render all info correctly when the site is valid", () => {
    pom.interceptApis([pom.api.getSite]);
    pom.metrics.interceptApis([pom.metrics.api.getRegionTelemetryMetrics]);
    pom.logs.interceptApis([pom.logs.api.getRegionTelemetryLogs]);

    cy.mount(<SiteView />, {
      reduxStore: setupStore({
        locations: {
          site: siteRestaurantTwo,
          branches: [],
          expandedRegionIds: [],
        },
      }),
    });

    pom.waitForApis();
    pom.metrics.waitForApis();
    pom.logs.waitForApis();

    pom.root.should("exist");
    pom.metrics.root.should("exist");
    pom.logs.root.should("exist");

    pom.el.siteName.should("contain.text", siteRestaurantTwo.name);
    pom.el.siteRegion.should("contain.text", siteRestaurantTwo.region?.name);
  });

  it("should render actions button by default when hideActions prop is not passed", () => {
    pom.interceptApis([pom.api.getSite]);
    pom.metrics.interceptApis([pom.metrics.api.getRegionTelemetryMetrics]);
    pom.logs.interceptApis([pom.logs.api.getRegionTelemetryLogs]);

    cy.mount(<SiteView />, {
      reduxStore: setupStore({
        locations: {
          site: siteRestaurantTwo,
          branches: [],
          expandedRegionIds: [],
        },
      }),
    });

    pom.waitForApis();
    pom.metrics.waitForApis();
    pom.logs.waitForApis();
    pom.siteActionsPopup.el.siteActionsBtn.should("exist");
  });

  it("should not render actions button when hideActions prop is passed as true", () => {
    pom.interceptApis([pom.api.getSite]);
    pom.metrics.interceptApis([pom.metrics.api.getRegionTelemetryMetrics]);
    pom.logs.interceptApis([pom.logs.api.getRegionTelemetryLogs]);

    cy.mount(<SiteView hideActions />, {
      reduxStore: setupStore({
        locations: {
          site: siteRestaurantTwo,
          branches: [],
          expandedRegionIds: [],
        },
      }),
    });

    pom.waitForApis();
    pom.metrics.waitForApis();
    pom.logs.waitForApis();
    pom.siteActionsPopup.el.siteActionsBtn.should("not.exist");
  });
});
