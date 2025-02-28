/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { initialState } from "../../../../store/configureHost";
import { setupStore } from "../../../../store/store";
import { RegionSiteTreePom } from "../../locations/RegionSiteTree/RegionSiteTree.pom";
import { RegionSite } from "./RegionSite";

const pom = new RegionSiteTreePom();
describe("<RegionSite/>", () => {
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
    cy.mount(<RegionSite />, { reduxStore: store });
    pom.root.should("exist");
  });

  it("selecting a site should update the redux store", () => {
    pom.interceptApis([pom.api.getRootRegionsMocked]);
    // @ts-ignore
    window.store = store;
    cy.mount(<RegionSite />, { reduxStore: store });
    pom.waitForApis();
    pom.expandFirstRootMocked();
    pom.tree.branch.el.content.should("contain", "Region 1.1");
    pom.tree.branch.el.content.should("contain", "Region 1.2");
    pom.site.el.selectSiteRadio.should("exist");
    pom.site.el.selectSiteRadio.click();
    cy.window()
      .its("store")
      .invoke("getState")
      .then(() => {
        const { hosts } = store.getState().configureHost;
        expect(hosts["testId"].siteId).to.eq("site-1");
        expect(hosts["testId"].region?.resourceId).to.eq("1");
      });
  });
});
