/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */
import { ROOT_REGIONS } from "../../../../store/locations";
import { setupStore } from "../../../../store/store";
import { RegionSiteTree } from "./RegionSiteTree";
import { RegionSiteTreePom } from "./RegionSiteTree.pom";

const pom = new RegionSiteTreePom();
describe("<RegionSiteTree/>", () => {
  it("should render component", () => {
    cy.mount(<RegionSiteTree />);
    pom.root.should("exist");
  });

  it("renders the correct number of roots", () => {
    pom.interceptApis([pom.api.getRootRegionsMocked]);
    cy.mount(<RegionSiteTree />);
    pom.waitForApis();
    pom.tree.branch.el.content.should("have.length", 1);
  });

  it("can open tree node and display children", () => {
    pom.interceptApis([pom.api.getRootRegionsMocked]);
    cy.mount(<RegionSiteTree />, {
      //@ts-ignore TODO: how to make store pieces optional
      reduxStore: setupStore({
        locations: {
          regionId: ROOT_REGIONS,
          branches: [],
          isEmpty: undefined,
          expandedRegionIds: [],
        },
      }),
    });
    pom.waitForApis();
    pom.expandFirstRootMocked();
    pom.tree.branch.el.content.should("contain", "Region 1.1");
    pom.tree.branch.el.content.should("contain", "Region 1.2");
  });

  it("responds with message on 500 error from regions", () => {
    pom.interceptApis([pom.api.getRegions500]);
    cy.mount(<RegionSiteTree />);
    pom.waitForApis();
    pom.el.apiError.should("exist");
  });
});
