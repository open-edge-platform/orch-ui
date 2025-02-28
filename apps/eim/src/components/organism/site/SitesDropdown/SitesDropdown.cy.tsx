/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { ApiErrorPom } from "@orch-ui/components";
import {
  regionUsWestId,
  sitePortlandId,
  siteRestaurantOneId,
} from "@orch-ui/utils";
import SitesDropdown from "./SitesDropdown";
import SitesDropdownPom from "./SitesDropdown.pom";
const pom = new SitesDropdownPom();
const apiErrorPom = new ApiErrorPom();
describe("<SitesDropdown />", () => {
  it("should render select of sites", () => {
    pom.interceptApis([pom.api.getAllSites]);
    cy.mount(<SitesDropdown regionId={""} />);
    pom.waitForApis();
    pom.dropdown.openDropdown(pom.root);
    pom.dropdown.selectDropdownValue(
      pom.root,
      "site",
      siteRestaurantOneId,
      siteRestaurantOneId,
    );
  });
  it("should get sites by region ID", () => {
    pom.interceptApis([pom.api.getSitesByRegion]);
    cy.mount(<SitesDropdown regionId={regionUsWestId} />);
    pom.waitForApis();

    pom.dropdown.openDropdown(pom.root);
    pom.dropdown.selectDropdownValue(
      pom.root,
      "site",
      sitePortlandId,
      sitePortlandId,
    );
  });
  it("should handle 500 error", () => {
    pom.interceptApis([pom.api.getSitesError500]);
    cy.mount(<SitesDropdown regionId={""} />);
    pom.waitForApis();
    apiErrorPom.root.should("be.visible");
  });
  it("should handle empty response", () => {
    pom.interceptApis([pom.api.getAllSitesEmpty]);
    cy.mount(<SitesDropdown regionId={""} />);
    pom.waitForApis();
    pom.el.empty.should("be.visible");
  });
  describe("when the API returns 404 should", () => {
    beforeEach(() => {
      pom.interceptApis([pom.api.getAllSitesEmpty]);
      cy.mount(<SitesDropdown regionId={""} />);
      pom.waitForApis();
    });
    it("render the empty component", () => {
      pom.el.empty.should("be.visible");
    });
    it("print info with no add option", () => {
      pom.el.empty.should("contain", "No Sites found");
    });
  });
});
