/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import SitesTable from "./SitesTable";
import SitesTablePom from "./SitesTable.pom";

import { infra } from "@orch-ui/apis";
import { ApiErrorPom, EmptyPom, TableColumn } from "@orch-ui/components";
import { cyGet } from "@orch-ui/tests";
import { regionUsWest, siteOregonPortland } from "@orch-ui/utils";

const pom = new SitesTablePom("sitesTable");
const apiErrorPom = new ApiErrorPom();
const emptyPom = new EmptyPom();

describe("<SitesTable />", () => {
  describe("when the API are responding correctly", () => {
    beforeEach(() => {
      pom.interceptApis([
        pom.api.getAllSitesMockedSingle,
        pom.api.getSingleRegionMocked,
      ]);
    });
    it("should render a list of sites", () => {
      cy.mount(
        <SitesTable
          source="site"
          hiddenColumns={["select"]}
          sort={[0]}
          regionId={"testRegion"}
        />,
      );
      pom._table.getCell(1, 1).contains(siteOregonPortland.name!);
      pom._table.getCell(1, 2).contains("customer: Culvers");
      pom._table.getCell(1, 3).contains(regionUsWest.name!);
    });

    it("should show the defined actions", () => {
      const actions: TableColumn<infra.SiteRead> = {
        Header: "Action",
        Cell: () => <div>Action Column</div>,
      };
      cy.mount(
        <SitesTable
          source="site"
          actions={actions}
          hiddenColumns={["select"]}
          sort={[0]}
          regionId={"testRegion"}
        />,
      );
      cy.contains("Action Column");
    });
    it("should show the subtitle", () => {
      cy.mount(
        <SitesTable
          source="site"
          subtitle="Test Subtitle"
          regionId={"testRegion"}
        />,
      );
      cy.contains("Test Subtitle");
    });
  });

  describe("SitesTable Ribbon should ", () => {
    it("disable action button when unauthorized", () => {
      pom.interceptApis([pom.api.getAllSitesMocked]);
      cy.mount(
        <SitesTable
          source="site"
          hasPermission={false}
          hiddenColumns={["select"]}
          sort={[0]}
          regionId={"testRegion"}
        />,
      );
      pom.waitForApis();
      pom.el.addSiteButton.should("not.exist");
    });

    it("enable action button when authorized", () => {
      pom.interceptApis([pom.api.getAllSitesMocked]);
      cy.mount(
        <SitesTable
          source="site"
          hasPermission={true}
          hiddenColumns={["select"]}
          sort={[0]}
          regionId={"testRegion"}
        />,
      );
      pom.waitForApis();
      pom.el.addSiteButton.should("be.visible");
    });
  });

  describe("SitesTable status should ", () => {
    it("handle empty", () => {
      pom.interceptApis([pom.api.getAllSitesEmpty]);
      cy.mount(
        <SitesTable
          source="site"
          hiddenColumns={["select"]}
          sort={[0]}
          regionId={"testRegion"}
        />,
      );
      pom.waitForApis();
      cy.get("[data-cy='emptyTitle']").should("have.text", "No sites found");
      emptyPom.root.should("be.visible");
    });

    it("handle 500 error", () => {
      pom.interceptApis([pom.api.getSitesError500]);
      cy.mount(
        <SitesTable
          source="site"
          hiddenColumns={["select"]}
          sort={[0]}
          regionId={"testRegion"}
        />,
      );
      pom.waitForApis();
      apiErrorPom.root.should("be.visible");
    });

    it("display table when data is loaded", () => {
      pom.interceptApis([pom.api.getAllSitesMocked]);
      cy.mount(
        <SitesTable
          source="site"
          hiddenColumns={["select"]}
          sort={[0]}
          regionId={"testRegion"}
        />,
      );
      pom.waitForApis();
      pom.root.should("be.visible");
    });
  });

  describe("<SiteTable /> pagination, fiter and order should", () => {
    it("pass search value to GET request", () => {
      pom.interceptApis([pom.api.getAllSitesMocked]);
      cy.mount(
        <SitesTable
          source="site"
          hiddenColumns={["select"]}
          regionId={"testRegion"}
        />,
      );
      pom.waitForApis();
      pom.interceptApis([pom.api.getAllSitesMockedWithFilter]);
      cyGet("search").type("testingSearch");

      pom.waitForApis();
    });

    //TODO rework test, it's not asserting
    xit("pass page value to GET request", () => {
      pom.interceptApis([pom.api.getAllSitesMocked]);
      cy.mount(
        <SitesTable
          source="site"
          hiddenColumns={["select"]}
          sort={[0]}
          regionId={"testRegion"}
        />,
      );
      pom.waitForApis();
      pom.interceptApis([pom.api.getAllSitesMockedWithOffset]);
      cy.get(".spark-pagination-list").contains(2).click();
      pom.waitForApis();
    });
  });
});
