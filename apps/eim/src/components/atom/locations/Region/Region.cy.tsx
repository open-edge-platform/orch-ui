/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { regionUsWest } from "@orch-ui/utils";
import { setupStore } from "../../../../store/store";
import { Region } from "./Region";
import { RegionPom } from "./Region.pom";

const pom = new RegionPom();

describe("<Region/>", () => {
  it("should render component with basic props", () => {
    const mockFunctionProp = cy.stub();
    cy.mount(
      <Region
        region={regionUsWest}
        sitesCount={7}
        showSitesCount
        viewHandler={mockFunctionProp}
        addSiteHandler={mockFunctionProp}
        addSubRegionHandler={mockFunctionProp}
        deleteHandler={mockFunctionProp}
        showActionsMenu
      />,
    );
    pom.root.should("exist");
    pom.root.contains("Us-West");
  });

  it("should render non-root Region component without showSitesCount prop", () => {
    const mockFunctionProp = cy.stub();
    cy.mount(
      <Region
        region={regionUsWest}
        sitesCount={7}
        viewHandler={mockFunctionProp}
        addSiteHandler={mockFunctionProp}
        addSubRegionHandler={mockFunctionProp}
        deleteHandler={mockFunctionProp}
        showActionsMenu
      />,
    );
    pom.root.should("not.contain", "7 Sites");
  });

  it("Should have a popup component with options", () => {
    const mockFunctionProp = cy.stub();
    cy.mount(
      <Region
        region={regionUsWest}
        viewHandler={mockFunctionProp}
        addSiteHandler={mockFunctionProp}
        addSubRegionHandler={mockFunctionProp}
        deleteHandler={mockFunctionProp}
        showActionsMenu
      />,
    );

    pom.el.regionTreePopup.should("exist");
    pom.el.regionTreePopup.click();
    pom.el.regionTreePopup.should("contain.text", "View");
    pom.el.regionTreePopup.should("contain.text", "Add Site");
    pom.el.regionTreePopup.should("contain.text", "Add Subregion");
    pom.el.regionTreePopup.should("contain.text", "Delete");
    pom.el.Delete.should("not.have.class", "popup__option-item-disable");
  });

  it("If Delete handler is not passed Delete option in popup menu should be disabled", () => {
    const mockFunctionProp = cy.stub();
    cy.mount(
      <Region
        region={regionUsWest}
        viewHandler={mockFunctionProp}
        addSiteHandler={mockFunctionProp}
        addSubRegionHandler={mockFunctionProp}
        showActionsMenu
      />,
    );

    pom.el.regionTreePopup.should("exist");
    pom.el.regionTreePopup.click();
    pom.el.regionTreePopup.should("contain.text", "Delete");
    pom.el.Delete.should("have.class", "popup__option-item-disable");
  });

  it("show correct count when in search result mode", () => {
    const mockFunctionProp = cy.stub();
    cy.mount(
      <Region
        region={{ resourceId: "abc", name: "ABC" }}
        showSitesCount
        viewHandler={mockFunctionProp}
        addSiteHandler={mockFunctionProp}
        addSubRegionHandler={mockFunctionProp}
        showActionsMenu
      />,
      {
        reduxStore: setupStore({
          locations: {
            branches: [],
            expandedRegionIds: [],
            searchIsPristine: true,
            rootSiteCounts: [{ resourceId: "abc", totalSites: 12 }],
          },
        }),
      },
    );
    pom.root.contains("12 Sites");
  });

  it("show correct count for single site count", () => {
    cy.mount(
      <Region
        region={{ resourceId: "abc", name: "ABC" }}
        showSitesCount
        sitesCount={1}
        showActionsMenu
      />,
    );
    pom.root.contains("1 Site");
  });

  it("show correct count for multiple site count", () => {
    cy.mount(
      <Region
        region={{ resourceId: "abc", name: "ABC" }}
        showSitesCount
        sitesCount={2}
        showActionsMenu
      />,
    );
    pom.root.contains("2 Sites");
  });

  it("should not have a popup component when showActionsMenu prop is false", () => {
    const mockFunctionProp = cy.stub();
    cy.mount(
      <Region
        region={regionUsWest}
        viewHandler={mockFunctionProp}
        addSiteHandler={mockFunctionProp}
        addSubRegionHandler={mockFunctionProp}
        deleteHandler={mockFunctionProp}
        showActionsMenu={false}
      />,
    );

    pom.el.regionTreePopup.should("not.exist");
  });
});
