/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { applicationOne, registryOneName } from "@orch-ui/utils";
import ApplicationTabs from "./ApplicationTabs";
import ApplicationTabsPom from "./ApplicationTabs.pom";

const pom = new ApplicationTabsPom();
describe("<ApplicationTabs/>", () => {
  const mountConfig = {
    routerProps: {
      initialEntries: ["/applications/apps"],
    },
    routerRule: [
      {
        path: "/applications/apps",
        element: <ApplicationTabs hasPermission={true} />,
      },
      {
        path: "/applications/extensions",
        element: <ApplicationTabs hasPermission={true} />,
      },
      {
        path: "/applications/registries",
        element: <ApplicationTabs hasPermission={true} />,
      },
    ],
  };

  describe("performs basic functionality", () => {
    beforeEach(() => {
      cy.mount(<ApplicationTabs hasPermission={true} />, mountConfig);
    });
    it("should render application tab component", () => {
      pom.getTab("Applications");

      pom.el.appTableContent.should("be.visible");
      pom.appTablePom.root.should("be.visible");

      pom.root.contains("Add Application").click();
      pom.getPath().then((path: string) => {
        const match = path.match(/\/add/);
        return expect(match && match.length > 0).to.be.eq(true);
      });
    });

    it("should render Extensions tab component", () => {
      cy.mount(<ApplicationTabs hasPermission={true} />, {
        ...mountConfig,
        routerProps: {
          initialEntries: ["/applications/extensions"],
        },
      });
      pom.getTab("Extensions");

      pom.el.appExtensionsContent.should("be.visible");
      pom.appTablePom.root.should("be.visible");
    });

    it("should render app registry tab component", () => {
      cy.mount(<ApplicationTabs hasPermission={true} />, {
        ...mountConfig,
        routerProps: {
          initialEntries: ["/applications/registries"],
        },
      });
      pom.getTab("Registries");
      pom.el.registryTableContent.should("be.visible");
      pom.registryDrawerPom.root
        .find(".spark-drawer-base")
        .should("have.class", "spark-drawer-hide");
      pom.root.contains("Add a Registry").click();
      pom.registryDrawerPom.root
        .find(".spark-drawer-base")
        .should("have.class", "spark-drawer-show");
    });

    it("should render correct tab component upon switching tab selection", () => {
      pom.getTab("Registries").click();
      pom.getPath().should("contain", "registries");
    });

    it("should render correct tab component upon switching tab selection", () => {
      pom.getTab("Extensions").click();
      pom.getPath().should("contain", "extensions");
    });

    it("should render correct tab component upon switching tab selection", () => {
      cy.mount(<ApplicationTabs hasPermission={true} />, {
        ...mountConfig,
        routerProps: {
          initialEntries: ["/applications/registries"],
        },
      });
      pom.getTab("Applications").click();
      pom.getPath().should("contain", "apps");
    });
  });

  describe("should work on application table options", () => {
    const applicationName = "Application 5",
      applicationId = "application-5";
    beforeEach(() => {
      pom.appTablePom.interceptApis([pom.appTablePom.api.appMultipleListPage1]);
      cy.mount(<ApplicationTabs hasPermission={true} />, {
        ...mountConfig,
      });
      pom.waitForApis();
    });

    describe("should work on application action that goes to another page", () => {
      it("should goto add application page", () => {
        pom.el.addApplicationButton.click();
        pom.getPath().should("eq", "/applications/apps/add");
      });
      it("should goto edit application page", () => {
        pom.appTablePom
          .getActionPopupBySearchText(applicationName)
          .click()
          .as("popup");
        cy.get("@popup").find('[data-cy="Edit"]').click();
        pom
          .getPath()
          .should(
            "eq",
            `/applications/apps/edit/${applicationId}/version/${applicationOne.version}`,
          );
      });
      it("should goto application details page via popup option", () => {
        pom.appTablePom
          .getActionPopupBySearchText(applicationName)
          .click()
          .as("popup");
        cy.get("@popup").find('[data-cy="View Details"]').click();
        pom
          .getPath()
          .should(
            "eq",
            `/application/${applicationId}/version/${applicationOne.version}`,
          );
      });
    });

    // TODO: replace confirmation dialog with modal
    xdescribe("should work on delete application", () => {
      beforeEach(() => {
        pom.appTablePom
          .getActionPopupBySearchText(applicationName)
          .click()
          .as("popup");
        cy.get("@popup").find("[data-cy='Delete']").click();
      });
      it("should cancel delete application in modal", () => {
        cy.get(".spark-modal").find("[data-cy='cancelBtn']").click();
        cy.get(".spark-modal").should("not.exist");
      });
      it("should perform delete on application", () => {
        pom.interceptApis([pom.api.deleteApplication]);
        cy.get(".spark-modal").find("[data-cy='confirmBtn']").click();
        pom.waitForApis();
        cy.get(`@${pom.api.deleteApplication}`)
          .its("request.url")
          .then((url: string) => {
            const match = url.match(
              `${applicationId}/versions/${applicationOne.version}`,
            );
            return expect(match && match.length > 0).to.be.true;
          });
      });
    });
  });

  describe("should work on Extensions table options", () => {
    beforeEach(() => {
      pom.appTablePom.interceptApis([
        pom.appTablePom.api.appExtensionsMultiple,
      ]);
      cy.mount(<ApplicationTabs hasPermission={true} />, {
        ...mountConfig,
        routerProps: {
          initialEntries: ["/applications/extensions"],
        },
      });
      pom.waitForApis();
    });

    describe("should work on Extensions action that goes to another page", () => {
      it("should goto application details page via popup option", () => {
        pom.appTablePom
          .getActionPopupBySearchText("wordpress-extension")
          .click()
          .as("popup");
        cy.get("@popup").find('[data-cy="View Details"]').click();
        pom
          .getPath()
          .should("eq", "/application/wordpress-extension/version/1.1.0");
      });
    });
  });

  describe("should work on registry table options", () => {
    beforeEach(() => {
      pom.appRegistryTablePom.interceptApis([
        pom.appRegistryTablePom.api.registriesMock,
      ]);
      cy.mount(<ApplicationTabs hasPermission={true} />, {
        ...mountConfig,
        routerProps: {
          initialEntries: ["/applications/registries"],
        },
      });
      pom.waitForApis();

      pom.el.registryTableContent.should("be.visible");
    });

    describe("should work on edit registry", () => {
      it("should open and close edit drawer", () => {
        pom.appRegistryTablePom
          .getActionPopupOptionBySearchText(registryOneName)
          .click()
          .as("popup");
        cy.get("@popup").find('[data-cy="Edit"]').click();

        pom.registryDrawerPom.root.find(".spark-drawer-show").should("exist");
        pom.registryDrawerPom.root
          .find(".spark-drawer-hide")
          .should("not.exist");
        pom.registryDrawerPom.root
          .find(".spark-drawer-footer")
          .contains("Cancel")
          .click();
        pom.registryDrawerPom.root
          .find(".spark-drawer-show")
          .should("not.exist");
        pom.registryDrawerPom.root.find(".spark-drawer-hide").should("exist");
      });
    });

    describe("should open and close add registry drawer", () => {
      it("upon non-empty list of application registry", () => {
        pom.appRegistryTablePom.empty.root.should("not.exist");
        pom.el.addRegistryButton.click();
      });
      it("upon empty list of application registry", () => {
        pom.appRegistryTablePom.interceptApis([
          pom.appRegistryTablePom.api.registriesEmpty,
        ]);
        cy.mount(<ApplicationTabs hasPermission={true} />, {
          ...mountConfig,
          routerProps: {
            initialEntries: ["/applications/registries"],
          },
        });
        pom.waitForApis();

        pom.appRegistryTablePom.empty.root.should("exist");
        pom.appRegistryTablePom.empty.el.emptyActionBtn.click();
      });
      afterEach(() => {
        pom.registryDrawerPom.root.find(".spark-drawer-show").should("exist");
        pom.registryDrawerPom.root
          .find(".spark-drawer-hide")
          .should("not.exist");
        pom.registryDrawerPom.root
          .find(".spark-drawer-footer")
          .contains("Cancel")
          .click();
        pom.registryDrawerPom.root
          .find(".spark-drawer-show")
          .should("not.exist");
        pom.registryDrawerPom.root.find(".spark-drawer-hide").should("exist");
      });
    });

    describe("work on delete registry feature", () => {
      beforeEach(() => {
        pom.appRegistryTablePom
          .getActionPopupOptionBySearchText(registryOneName)
          .click()
          .as("popup");
        cy.get("@popup").find("[data-cy='Delete']").click();
      });
      it("should cancel delete registry in modal", () => {
        cy.get(".spark-modal").find("[data-cy='cancelBtn']").click();
        cy.get(".spark-modal").should("not.exist");
      });
      it("should delete registry", () => {
        pom.appRegistryTablePom.interceptApis([
          pom.appRegistryTablePom.api.deleteRegistry,
        ]);
        cy.get(".spark-modal").find("[data-cy='confirmBtn']").click();
        pom.appRegistryTablePom.waitForApis();

        cy.get(`@${pom.appRegistryTablePom.api.deleteRegistry}`)
          .its("request.url")
          .then((url: string) => {
            const match = url.match(/\/registries\/orch-harbor/);
            expect(match && match.length > 0).to.be.eq(true);
          });
      });
    });

    it("should go to page 1 when deleting last element on page 2", () => {
      pom.appRegistryTablePom.interceptApis([
        pom.appRegistryTablePom.api.registriesMockPage2,
      ]);
      pom.appRegistryTablePom.table.getPageButton(2).click();
      pom.waitForApis();

      //Delete
      pom.appRegistryTablePom.tableUtils
        .getRowBySearchText("page-2-registry")
        .find("[data-cy='appRegistryPopup']")
        .click()
        .as("appRegistryPopup");
      cy.get("@appRegistryPopup").find("[data-cy='Delete']").click();

      pom.appRegistryTablePom.interceptApis([
        pom.appRegistryTablePom.api.deleteRegistry,
        pom.appRegistryTablePom.api.registriesMock,
      ]);
      cy.get(".spark-modal").find("[data-cy='confirmBtn']").click();
      pom.appRegistryTablePom.waitForApi([
        pom.appRegistryTablePom.api.deleteRegistry,
      ]);

      cy.get("#search").contains("offset=0");
    });
  });

  describe("when user have no permission", () => {
    const mountConfigNoPermission = {
      routerRule: [
        {
          path: "/applications/apps",
          element: <ApplicationTabs hasPermission={false} />,
        },
        {
          path: "/applications/registries",
          element: <ApplicationTabs hasPermission={false} />,
        },
      ],
    };

    describe("and permission not in props", () => {
      it("should result in no registries available", () => {
        pom.appRegistryTablePom.interceptApis([
          pom.appRegistryTablePom.api.registriesEmpty,
        ]);
        cy.mount(<ApplicationTabs />, {
          ...mountConfigNoPermission,
          routerProps: {
            initialEntries: ["/applications/registries"],
          },
        });
        pom.waitForApis();
        pom.el.empty.should("be.visible");
      });
    });
    describe("should verify registry", () => {
      it("add registry is disabled", () => {
        pom.appRegistryTablePom.interceptApis([
          pom.appRegistryTablePom.api.registriesEmpty,
        ]);
        cy.mount(<ApplicationTabs hasPermission={false} />, {
          ...mountConfigNoPermission,
          routerProps: {
            initialEntries: ["/applications/registries"],
          },
        });
        pom.waitForApis();
        pom.el.addRegistryButton.should("have.class", "spark-button-disabled");

        // TODO: this feature might need fixing
        // pom.appRegistryTablePom.orchTable.empty.el.emptyActionBtn.should(
        //   "have.class",
        //   "spark-button-disabled"
        // );
      });
    });

    // TODO: this feature might need fixing
    xdescribe("should verify application", () => {
      it("add application is disabled", () => {
        pom.appTablePom.interceptApis([pom.appTablePom.api.appEmpty]);
        cy.mount(<ApplicationTabs hasPermission={false} />, {
          ...mountConfigNoPermission,
          routerProps: {
            initialEntries: ["/applications/apps"],
          },
        });
        pom.waitForApis();
        pom.el.addRegistryButton.should("have.class", "spark-button-disabled");
      });
    });
  });
});
