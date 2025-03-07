/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */
import { defaultActiveProject } from "@orch-ui/tests";
import { sitePortland } from "@orch-ui/utils";
import Site from "./Site";
import SitePom from "./Site.pom";

// NOTE: This component can be deleted!
describe("<Site />", () => {
  const pom: SitePom = new SitePom();
  describe("when the API are responding correctly", () => {
    beforeEach(() => {
      cy.intercept(
        {
          method: "GET",
          url: `**/v1/projects/${defaultActiveProject.name}/regions/**/sites?*`,
        },
        {
          statusCode: 200,
          body: {
            sites: [sitePortland],
            totalElements: 1,
          },
        },
      ).as("getSitesSuccess");
    });

    it("should render a list of sites", () => {
      cy.mount(<Site />);
      // cy.contains("Sites");
      // cy.contains("button", "Add").should("be.visible");
      // cy.contains("Portland");
    });

    xit("should go to add new site page when clicking Add", () => {
      cy.mount(<Site />, {
        routerProps: { initialEntries: ["/infrastructure/sites"] },
        routerRule: [
          { path: "/infrastructure/sites", element: <Site /> },
          {
            path: "/infrastructure/sites/new",
            element: <text>Create New Site</text>,
          },
        ],
      });
      cy.contains("button", "Add").should("be.visible").click();
      cy.contains("Create New Site");
    });

    xdescribe("should schedule site maintenance", () => {
      beforeEach(() => {
        // Steps to open a schedule maintenance drawer
        cy.mount(<Site />);
        pom.table
          .getRowBySearchText(sitePortland.name!)
          .find("[data-cy='sitePopup']")
          .click()
          .contains("Schedule Maintenance")
          .click();
      });
      it("should open drawer", () => {
        pom.maintenancePom.root.should("exist");
      });
    });

    // TODO: missing assertion
    xit("should delete region", () => {
      cy.mount(<Site />);
      pom.deleteSite(sitePortland.resourceId!, sitePortland.name!);
    });
  });
});
