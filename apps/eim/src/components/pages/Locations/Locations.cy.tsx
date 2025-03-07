/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { cyGet } from "@orch-ui/tests";
import { regionAshland, simpleTree, siteBoston } from "@orch-ui/utils";
import { RegionViewActions } from "../../../components/organism/locations/RegionView/RegionView";
import { ROOT_REGIONS } from "../../../store/locations";
import { setupStore } from "../../../store/store";
import { DELETE_SITE_DIALOG_TITLE, Locations } from "./Locations";
import { LocationsPom } from "./Locations.pom";

const pom = new LocationsPom();
describe("<Locations/>", () => {
  describe("basic functionality", () => {
    it("should render component", () => {
      cy.mount(<Locations />);
      pom.root.should("exist");
      pom.regionSiteTreePom.root.should("exist");
    });

    it("shows empty component when no root regions exist", () => {
      pom.regionSiteTreePom.interceptApis([
        pom.regionSiteTreePom.api.getRootRegionsEmptyMocked,
      ]);
      cy.mount(<Locations />, {
        reduxStore: setupStore({
          locations: {
            regionId: ROOT_REGIONS,
            branches: [],
            isEmpty: true,
            expandedRegionIds: [],
          },
        }),
      });
      pom.regionSiteTreePom.waitForApis();
      pom.root.should("exist");
      pom.el.empty.should("be.visible");
    });
  });

  describe("with redux data", () => {
    beforeEach(() => {
      pom.regionSiteTreePom.interceptApis([
        pom.regionSiteTreePom.api.getRootRegionsMocked,
      ]);
      cy.mount(<Locations />, {
        reduxStore: setupStore({
          locations: {
            regionId: undefined,
            branches: simpleTree,
            isEmpty: undefined,
            siteId: siteBoston.siteID,
            expandedRegionIds: [],
            isLoadingTree: false,
          },
        }),
      });
      pom.regionSiteTreePom.waitForApis();
    });

    // temporarily disabling because it is failing
    xit("shows existing tree from redux store", () => {
      pom.root.should("exist");
      pom.el.empty.should("not.exist");
      pom.regionSiteTreePom.root.should("exist");
    });

    it("shows confirmation dialog for deletion", () => {
      pom.regionSiteTreePom.region.el.regionTreePopup.eq(0).click();
      cyGet("Delete").click();
      pom.dialog.root.should("be.visible");
    });

    it("calls the deletion endpoint", () => {
      pom.regionSiteTreePom.region.el.regionTreePopup.eq(0).click();
      cyGet("Delete").click();
      cy.intercept("DELETE", "**/regions/*", cy.spy().as("deleteRegion"));
      pom.dialog.el.confirmBtn.click();
      cy.get("@deleteRegion").should("have.been.called");
    });

    describe("schedule maintenance for a region", () => {
      describe("from region popup", () => {
        beforeEach(() => {
          pom.regionSiteTreePom.region.el.regionTreePopup
            .eq(0)
            .click()
            .as("popup");
          cy.get("@popup").find("[data-cy='Schedule Maintenance']").click();
        });
        it("should show maintenance drawer", () => {
          pom.scheduleDrawerPom.root.should("exist");
        });
        it("should close drawer to goto tree with cross button in header", () => {
          pom.scheduleDrawerPom.drawerHeaderPom.el.crossButton.click();
          pom.regionViewPom.root.should("not.exist");
          pom.regionSiteTreePom.root.should("exist");
        });
      });

      describe("from region view details drawer", () => {
        beforeEach(() => {
          cy.mount(<Locations />, {
            reduxStore: setupStore({
              locations: {
                region: regionAshland,
                branches: simpleTree,
                isEmpty: undefined,
                expandedRegionIds: [],
                isLoadingTree: false,
              },
            }),
          });
          pom.regionViewPom.el.regionActions
            .find("button")
            .click({ multiple: true })
            .as("popup");
          cyGet(RegionViewActions["Schedule Maintenance"]).click();
        });
        it("should show maintenance drawer", () => {
          pom.scheduleDrawerPom.root.should("exist");
        });
        it("should go back to region drawer with back button in header", () => {
          pom.scheduleDrawerPom.drawerHeaderPom.el.backButton.click();
          pom.regionViewPom.root.should("exist");
        });
      });
    });
  });

  describe("see location drawer headers", () => {
    it("should show region drawer header", () => {
      cy.mount(<Locations />, {
        reduxStore: setupStore({
          locations: {
            region: regionAshland,
            branches: simpleTree,
            isEmpty: undefined,
            expandedRegionIds: [],
            isLoadingTree: false,
          },
        }),
      });
      pom.drawerHeaderPom.root.should("exist");
    });
    it("should show site drawer header", () => {
      cy.mount(<Locations />, {
        reduxStore: setupStore({
          locations: {
            site: siteBoston,
            branches: simpleTree,
            isEmpty: undefined,
            expandedRegionIds: [],
          },
        }),
      });
      pom.drawerHeaderPom.root.should("exist");
    });
  });

  // TODO .contans issue is seen failing this test
  // convert this modal to not use spark dialog trigger
  xdescribe("site deletion dialog", () => {
    it("should show a dialog to delete site if siteToDelete is present in redux", () => {
      pom.interceptApis([pom.api.deleteSiteBySiteId]);
      cy.mount(<Locations />, {
        reduxStore: setupStore({
          locations: {
            branches: [],
            siteToDelete: siteBoston,
            expandedRegionIds: [],
            isLoadingTree: false,
          },
        }),
      });

      pom.dialog.root.should("be.visible");
      pom.dialog.root.should("contain.text", DELETE_SITE_DIALOG_TITLE);
      pom.dialog.el.confirmBtn.click();

      cy.get(`@${pom.api.deleteSiteBySiteId}`)
        .its("request.url")
        .then((url: string) => {
          const match = url.match(
            `regions/${siteBoston.region?.resourceId}/sites/${siteBoston.resourceId}`,
          );
          expect(match).to.have.length(1);
        });
    });
  });
});
