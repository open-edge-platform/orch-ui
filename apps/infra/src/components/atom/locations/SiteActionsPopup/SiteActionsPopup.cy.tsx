/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { siteRestaurantTwo } from "@orch-ui/utils";
import { setupStore } from "../../../../store/store";
import { SiteActionsPopup } from "./SiteActionsPopup";
import { SiteActionsPopupPom } from "./SiteActionsPopup.pom";

const pom = new SiteActionsPopupPom();
describe("<SiteActionsPopup/>", () => {
  describe("general tests", () => {
    beforeEach(() => {
      cy.mount(<SiteActionsPopup site={siteRestaurantTwo} />);
    });

    const store = setupStore({
      locations: {
        regionId: undefined,
        branches: [
          {
            id: "",
            name: "",
            data: { resourceId: siteRestaurantTwo.resourceId },
            type: "region",
          },
        ],
        isEmpty: undefined,
        expandedRegionIds: [],
      },
    });

    it("should render component", () => {
      pom.root.should("exist");
    });

    it("should show Edit option when the Site Actions button is clicked", () => {
      pom.el.siteActionsBtn.click();
      pom.root.should("contain.text", "Edit");
    });

    it("should add the site to redux when the delete option is clicked", () => {
      // @ts-ignore
      window.store = store;
      cy.mount(<SiteActionsPopup site={siteRestaurantTwo} />, {
        reduxStore: store,
      });

      pom.el.siteActionsBtn.click();
      pom.el.Delete.click();

      cy.window()
        .its("store")
        .invoke("getState")
        .then(() => {
          expect(store.getState().locations.siteToDelete).to.be.a("object");
        });
    });
  });

  describe("router correctly navigates", () => {
    it("from Edge Orchestrator context", () => {
      cy.mount(<SiteActionsPopup site={siteRestaurantTwo} />, {
        routerProps: { initialEntries: ["/infrastructure/locations"] },
        routerRule: [
          {
            path: "infrastructure/locations",
            element: <SiteActionsPopup site={siteRestaurantTwo} />,
          },
        ],
      });
      pom.el.siteActionsBtn.click();
      pom.el.Edit.click();
      cy.get("#pathname").contains(
        "/regions/region-salem/sites/restaurant-two",
      );
    });

    it("from INFRA only context", () => {
      cy.mount(<SiteActionsPopup site={siteRestaurantTwo} />, {
        routerProps: { initialEntries: ["/"] },
        routerRule: [
          {
            path: "/",
            element: <SiteActionsPopup site={siteRestaurantTwo} />,
          },
        ],
      });

      const redirectUrl = `/regions/${siteRestaurantTwo?.region?.regionID}/sites/${siteRestaurantTwo?.siteID}`;
      pom.el.siteActionsBtn.click();
      pom.el.Edit.click();
      cy.get("#pathname").should("contain.text", redirectUrl);
    });
  });
});
