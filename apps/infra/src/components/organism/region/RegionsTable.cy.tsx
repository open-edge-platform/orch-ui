/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import { ApiErrorPom, EmptyPom, TableColumn } from "@orch-ui/components";
import {
  getInfraPath,
  regionRoute,
  regions as allRegions,
} from "@orch-ui/utils";
import RegionsTable from "./RegionsTable";
import RegionsTablePom from "./RegionsTable.pom";

const pom = new RegionsTablePom();
const apiErrorPom = new ApiErrorPom();
const emptyPom = new EmptyPom();

describe("<RegionTable /> with mocked data should ", () => {
  it("render a list of regions", () => {
    if (!allRegions.regions) throw "Regions are missing from data";
    pom.interceptApis([pom.api.getRegionsMocked]);
    cy.mount(<RegionsTable hiddenColumns={["select"]} sort={[0]} />);
    pom.waitForApis();
    pom.regionsTable.getRows().should("have.length", allRegions.regions.length);
  });

  it("show the defined actions", () => {
    const actions: TableColumn<infra.RegionResourceRead> = {
      Header: "Action",
      Cell: () => <div>Action Column</div>,
    };
    pom.interceptApis([pom.api.getRegionsMocked]);
    cy.mount(
      <RegionsTable actions={actions} hiddenColumns={["select"]} sort={[0]} />,
    );
    pom.waitForApis();
    cy.contains("Action Column");
  });

  describe("when the API returns 404 should ", () => {
    beforeEach(() => {
      pom.interceptApis([pom.api.getRegionsEmpty]);
      cy.mount(
        <RegionsTable
          hasPermission={true}
          hiddenColumns={["select"]}
          sort={[0]}
        />,
      );
      pom.waitForApis();
    });
    it("render the empty component", () => {
      emptyPom.root.should("be.visible");
    });
    it("render the Add button", () => {
      emptyPom.el.emptyActionBtn.click();
      pom
        .getPath()
        .should("contain", getInfraPath(regionRoute, { regionId: "new" }));
    });
  });

  describe("RegionsTable Ribbon should ", () => {
    it("disable action button when unauthorized", () => {
      pom.interceptApis([pom.api.getRegionsMocked]);
      cy.mount(
        <RegionsTable
          hasPermission={false}
          hiddenColumns={["select"]}
          sort={[0]}
        />,
      );
      pom.waitForApis();
      pom.el.addRegionsButton.should("not.exist");
    });

    it("enable action button when authorized", () => {
      pom.interceptApis([pom.api.getRegionsMocked]);
      cy.mount(
        <RegionsTable
          hasPermission={true}
          hiddenColumns={["select"]}
          sort={[0]}
        />,
      );
      pom.waitForApis();
      pom.el.addRegionsButton.should("exist");
      pom.el.addRegionsButton.should("have.class", "spark-button-action");
    });
  });

  describe("RegionsTable status should ", () => {
    it("handle empty", () => {
      pom.interceptApis([pom.api.getRegionsEmpty]);
      cy.mount(<RegionsTable hiddenColumns={["select"]} />);
      pom.waitForApis();
      emptyPom.root.should("be.visible");
    });

    it("handle loading", () => {
      pom.interceptApis([pom.api.getRegionsMocked]);
      cy.mount(
        <RegionsTable hasPermission={true} hiddenColumns={["select"]} />,
      );
      cy.get(".spark-shimmer").should("be.visible");

      cy.get(".spark-shimmer").should("exist");
      pom.waitForApis();
      cy.get(".spark-shimmer").should("not.exist");
    });

    it("handle 500 error", () => {
      pom.interceptApis([pom.api.getRegionsError500]);
      cy.mount(<RegionsTable hiddenColumns={["select"]} />);
      pom.waitForApis();
      apiErrorPom.root.should("be.visible");
    });

    it("display table when data is loaded", () => {
      pom.interceptApis([pom.api.getRegionsMocked]);
      cy.mount(<RegionsTable hiddenColumns={["select"]} />);
      pom.waitForApis();
      pom.root.should("be.visible");
    });
  });
});

describe("<RegionTable /> pagination, fiter and order should", () => {
  it("pass search value to GET request", () => {
    pom.interceptApis([pom.api.getRegionsMocked]);
    cy.mount(<RegionsTable hiddenColumns={["select"]} />);
    pom.waitForApis();
    pom.interceptApis([pom.api.getRegionsMockedWithFilter]);
    pom.el.search.type("testingSearch");
    pom.waitForApis();
  });
  it("pass page value to GET request", () => {
    pom.interceptApis([pom.api.getRegionsMocked]);
    cy.mount(<RegionsTable hiddenColumns={["select"]} />);
    pom.waitForApis();
    pom.interceptApis([pom.api.getRegionsMockedWithOffset]);
    cy.get(".spark-pagination-list").contains(2).click();
    pom.waitForApis();
  });
});
