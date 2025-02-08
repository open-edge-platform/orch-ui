/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { sitePortland } from "@orch-ui/utils";
import SiteCell from "./SiteCell";
import SiteCellPom from "./SiteCell.pom";
const pom = new SiteCellPom();
describe("<SiteCell/>", () => {
  describe("when the API return a site", () => {
    it("should render the name", () => {
      pom.interceptApis([pom.api.getSiteSuccess]);
      cy.mount(
        <SiteCell
          siteId={sitePortland.resourceId}
          regionId={sitePortland.region?.resourceId}
        />,
      );
      pom.waitForApis();
      pom.root.contains(sitePortland.name!);
    });
  });

  describe("when the API return no site with a 404 Not Found response", () => {
    it("should render the id", () => {
      pom.interceptApis([pom.api.getSiteNotFound]);
      cy.mount(
        <SiteCell
          siteId={sitePortland.resourceId}
          regionId={sitePortland.region?.resourceId}
        />,
      );
      pom.waitForApis();
      pom.root.contains(sitePortland.resourceId!);
    });
  });

  describe("when no siteId is provided", () => {
    it("should render a dash", () => {
      cy.mount(<SiteCell />);
      pom.root.contains("-");
    });
  });
});
