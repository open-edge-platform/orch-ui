/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { cyGet } from "@orch-ui/tests";
import { useNavigate } from "react-router-dom";
import { initialState } from "../../../../store/configureHost";
import { setupStore } from "../../../../store/store";
import { RegionSiteTreePom } from "../../locations/RegionSiteTree/RegionSiteTree.pom";
import { RegionSiteSelectTree } from "./RegionSiteSelectTree";

const pom = new RegionSiteTreePom();
describe("<RegionSiteSelectTree/>", () => {
  const store = setupStore({
    configureHost: {
      formStatus: initialState.formStatus,
      hosts: {
        testId: {
          name: "",
        },
      },
      autoOnboard: false,
      autoProvision: false,
    },
  });
  it("should render component", () => {
    pom.interceptApis([pom.api.getRootRegionsMocked]);
    cy.mount(
      <RegionSiteSelectTree
        handleOnSiteSelected={cy.stub().as("handleOnSiteSelected")}
        selectedSite={{ name: "site", resourceId: "site-6a754398" }}
      />,
      { reduxStore: store },
    );
    pom.root.should("exist");
  });

  it("shows single selection of site ", () => {
    pom.interceptApis([pom.api.getLocationsMocked]);
    cy.mount(
      <RegionSiteSelectTree
        handleOnSiteSelected={cy.stub().as("handleOnSiteSelected")}
        selectedSite={{ name: "site", resourceId: "site-6a754398" }}
        showSingleSelection={true}
      />,
      { reduxStore: store },
    );
    pom.waitForApis();
    cyGet("siteName").contains("site-1");
  });

  it("updates the page state to perform a tree reset ", () => {
    pom.interceptApis([pom.api.getRootRegionsMocked]);
    const stub = cy.stub().as("handleOnSiteSelected");
    const Jsx = () => {
      const navigate = useNavigate();
      return (
        <>
          <button onClick={() => navigate("/b")} data-cy="buttonB"></button>
          <RegionSiteSelectTree handleOnSiteSelected={stub} />
        </>
      );
    };
    // @ts-ignore
    window.store = store;
    cy.mount(null, {
      reduxStore: store,
      routerProps: { initialEntries: ["/a"] },
      routerRule: [
        {
          path: "/a",
          element: <Jsx />,
        },
        {
          path: "/b",
          element: <RegionSiteSelectTree handleOnSiteSelected={stub} />,
        },
      ],
    });
    pom.waitForApis();
    pom.interceptApis([pom.api.getRootRegionsMocked]);
    cyGet("buttonB").click();
    pom.waitForApis();

    cy.window()
      .its("store")
      .invoke("getState")
      .then(() => {
        const {
          isLoadingTree,
          page,
          searchTerm,
          searchIsPristine,
          regionId,
          branches,
        } = store.getState().locations;
        expect(searchTerm).to.eq(undefined);
        expect(isLoadingTree).to.eq(false);
        expect(searchIsPristine).to.eq(false);
        expect(regionId).to.eq("null");
        expect(branches).to.have.length(1);
        expect(page).to.eq("/b");
      });
  });
});
