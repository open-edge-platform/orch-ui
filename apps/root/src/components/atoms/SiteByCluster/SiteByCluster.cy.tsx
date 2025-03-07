/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { clusterTwo } from "@orch-ui/utils";
import SiteByCluster from "./SiteByCluster";
import SiteByClusterPom, {
  regionId,
  siteRestaurantTwo,
} from "./SiteByCluster.pom";

const pom = new SiteByClusterPom();
describe("<SiteByCluster/>", () => {
  describe("when the API are returning the expected result should", () => {
    beforeEach(() => {
      pom.interceptApis([
        pom.api.getClusterSuccess,
        pom.api.getHostByUuidSuccess,
        pom.api.getSiteSuccess,
      ]);
      cy.mount(<SiteByCluster clusterName={clusterTwo.name as string} />);
      pom.waitForApis();
    });

    it("render the site name", () => {
      pom.root.should("have.text", siteRestaurantTwo.name);
    });

    it("navigate to the site detail page", () => {
      pom.root.contains(siteRestaurantTwo.name!).click();
      pom
        .getPath()
        .should(
          "eq",
          `/infrastructure/regions/${regionId}/sites/${siteRestaurantTwo.siteID}`,
        );
    });
  });

  describe("when the cluster API fails", () => {
    beforeEach(() => {
      pom.interceptApis([pom.api.getCluster500]);
      cy.mount(<SiteByCluster clusterName={clusterTwo.name as string} />);
      pom.waitForApis();
    });
    it("an error message is displayed", () => {
      pom.el.error.should("be.visible");
    });
  });

  describe("when the host API fails", () => {
    beforeEach(() => {
      pom.interceptApis([pom.api.getClusterSuccess, pom.api.getHostByUuid500]);
      cy.mount(<SiteByCluster clusterName={clusterTwo.name as string} />);
      pom.waitForApis();
    });
    it("an error message is displayed", () => {
      pom.el.error.should("be.visible");
    });
  });

  describe("when the host API fails", () => {
    beforeEach(() => {
      pom.interceptApis([
        pom.api.getClusterSuccess,
        pom.api.getHostByUuidSuccess,
        pom.api.getSite500,
      ]);
      cy.mount(<SiteByCluster clusterName={clusterTwo.name as string} />);
      pom.waitForApis();
    });
    it("an error message is displayed", () => {
      pom.el.error.should("be.visible");
    });
  });
});
