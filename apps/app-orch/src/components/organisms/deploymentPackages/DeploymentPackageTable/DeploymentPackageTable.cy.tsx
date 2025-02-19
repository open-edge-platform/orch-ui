/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { catalog } from "@orch-ui/apis";
import { setupStore } from "../../../../store";
import DeploymentPackageTable from "./DeploymentPackageTable";
import DeploymentPackageTablePom, {
  deploymentPackageMock,
} from "./DeploymentPackageTable.pom";

const pom = new DeploymentPackageTablePom();

describe("<DeploymentPackageTable />", () => {
  it("should render table", () => {
    pom.interceptApis([pom.api.packageList]);
    cy.mount(<DeploymentPackageTable kind="KIND_NORMAL" />);
    pom.waitForApis();
    pom.table.getRows().should("have.length", deploymentPackageMock.length);
  });

  describe("table ribbon should", () => {
    describe("with kind type KIND_NORMAL should", () => {
      it("handle empty", () => {
        pom.interceptApis([pom.api.packageEmpty]);
        cy.mount(<DeploymentPackageTable kind="KIND_NORMAL" hasPermission />);
        pom.waitForApis();
        pom.emptyPom.root.should("be.visible");
        pom.emptyPom.el.emptyTitle.contains(
          "There are no Deployment Packages currently available.",
        );
        pom.emptyPom.el.emptySubTitle.contains(
          "To add deployment package, select Add Deployment Package.",
        );
        pom.emptyPom.el.emptyActionBtn.click();
        cy.get("#pathname").contains("/create");
      });

      it("should be able to import deployment package when no deployment packages is present", () => {
        pom.interceptApis([pom.api.packageEmpty]);
        cy.mount(<DeploymentPackageTable kind="KIND_NORMAL" hasPermission />);
        pom.waitForApis();
        pom.emptyPom.root.find("[data-cy='importActionBtn']").click();
        pom.getPath().should("equal", "/applications/packages/import");
      });

      it("handle loading", () => {
        pom.interceptApis([pom.api.packageList]);
        cy.mount(<DeploymentPackageTable kind="KIND_NORMAL" />);
        cy.get(".spark-shimmer").should("be.visible");
        cy.get(".spark-shimmer").should("exist");
        pom.waitForApis();
        cy.get(".spark-shimmer").should("not.exist");
      });

      it("handle 500 error", () => {
        pom.interceptApis([pom.api.packageError500]);
        cy.mount(<DeploymentPackageTable kind="KIND_NORMAL" />);
        pom.waitForApis();
        pom.apiErrorPom.root.should("be.visible");
      });

      it("display table when data is loaded", () => {
        pom.interceptApis([pom.api.packageList]);
        cy.mount(<DeploymentPackageTable kind="KIND_NORMAL" />);
        pom.waitForApis();
        pom.root.should("be.visible");
      });
    });

    describe("with kind type KIND_EXTENSION should", () => {
      it("handle empty", () => {
        pom.interceptApis([pom.api.packageEmpty]);
        cy.mount(
          <DeploymentPackageTable kind="KIND_EXTENSION" hasPermission={true} />,
        );
        pom.waitForApis();
        pom.emptyPom.root.should("be.visible");
        pom.emptyPom.el.emptyTitle.contains(
          "There are no Deployment Packages currently available.",
        );
      });

      it("handle loading", () => {
        pom.interceptApis([pom.api.packageExtensionsList]);
        cy.mount(<DeploymentPackageTable kind="KIND_EXTENSION" />);
        cy.get(".spark-shimmer").should("be.visible");
        cy.get(".spark-shimmer").should("exist");
        pom.waitForApis();
        cy.get(".spark-shimmer").should("not.exist");
      });

      it("handle 500 error", () => {
        pom.interceptApis([pom.api.packageError500]);
        cy.mount(<DeploymentPackageTable kind="KIND_EXTENSION" />);
        pom.waitForApis();
        pom.apiErrorPom.root.should("be.visible");
      });

      it("display table when data is loaded", () => {
        pom.interceptApis([pom.api.packageExtensionsList]);
        cy.mount(<DeploymentPackageTable kind="KIND_EXTENSION" />);
        pom.waitForApis();
        pom.root.should("be.visible");
      });
    });

    describe("on popup items", () => {
      const targetApp = deploymentPackageMock[0];

      it("should have a disabled delete button", () => {
        pom.interceptApis([pom.api.packageList]);
        cy.mount(
          <DeploymentPackageTable kind="KIND_NORMAL" hasPermission={false} />,
        );
        pom.waitForApis();
        pom
          .getActionPopupBySearchText(targetApp.displayName ?? targetApp.name)
          .click();
        cy.contains("Edit").should("have.class", "popup__option-item-disable");
        cy.contains("Delete").should(
          "have.class",
          "popup__option-item-disable",
        );
      });

      describe("when the user has permissions", () => {
        const store = setupStore({});
        beforeEach(() => {
          // @ts-ignore
          window.store = store;
          store.dispatch(catalog.catalogServiceApis.util.resetApiState());
          pom.interceptApis([pom.api.packageList]);
          cy.mount(<></>, {
            reduxStore: store,
            routerProps: { initialEntries: ["/deployment-package-table"] },
            routerRule: [
              {
                path: "/deployment-package-table",
                element: (
                  <DeploymentPackageTable kind="KIND_NORMAL" hasPermission />
                ),
              },
            ],
          });
          pom.waitForApis();
        });

        it("should be able to View details", () => {
          pom.tableUtils
            .getRowBySearchText(targetApp.displayName ?? targetApp.name)
            .find("[data-cy='popup']")
            .click();
          pom.clickPopupOption("View Details");
          pom
            .getPath()
            .should(
              "equal",
              `/applications/package/${targetApp.name}/version/${targetApp.version}`,
            );
        });

        it("should be able to clone deployment package", () => {
          pom.tableUtils
            .getRowBySearchText(targetApp.displayName ?? targetApp.name)
            .find("[data-cy='popup']")
            .click();
          pom.clickPopupOption("Clone");
          pom
            .getPath()
            .should(
              "equal",
              `/packages/clone/${targetApp.name}/version/${targetApp.version}`,
            );
        });

        it("should deploy a deployment package", () => {
          pom
            .getActionPopupBySearchText(targetApp.displayName ?? targetApp.name)
            .click();
          pom.clickPopupOption("Deploy");
          pom
            .getPath()
            .should(
              "equal",
              `/applications/package/deploy/${targetApp.name}/version/${targetApp.version}`,
            );
        });

        it("should edit an item", () => {
          pom
            .getActionPopupBySearchText(targetApp.displayName ?? targetApp.name)
            .click();
          pom.clickPopupOption("Edit");
          pom
            .getPath()
            .should(
              "equal",
              `/packages/edit/${targetApp.name}/version/${targetApp.version}`,
            );
          cy.window()
            .its("store")
            .invoke("getState")
            .then((state) => {
              expect(state.deploymentPackage).to.deep.equal(targetApp);
            });
        });

        it("should delete an item", () => {
          pom
            .getActionPopupBySearchText(targetApp.displayName ?? targetApp.name)
            .click();
          cy.get(".popup__options").contains("Delete");

          // TODO: after fixing confirmation dialog .contains error
          // pom.clickPopupOption("Delete");
          // cy.get(`[data-cy="confirmBtn"]`).click;
          // //check api here ...
        });
      });
    });
  });

  describe("table basic functionality", () => {
    beforeEach(() => {
      pom.interceptApis([pom.api.packageList]);
      cy.mount(<DeploymentPackageTable kind="KIND_NORMAL" />);
      pom.waitForApis();
    });

    describe("working on sorting", () => {
      it("should see default sorting name asc", () => {
        cy.get(`@${pom.api.packageList}`)
          .its("request.url")
          .then((url: string) => {
            const match = url.match(/orderBy=name\+asc/);
            return expect(match && match.length > 0).to.be.true;
          });
      });
      it("should perform sorting name desc", () => {
        pom.interceptApis([pom.api.packageList]);
        pom.table.getColumnHeaderSortArrows(0).click();
        pom.waitForApis();
        cy.get(`@${pom.api.packageList}`)
          .its("request.url")
          .then((url: string) => {
            const match = url.match(/orderBy=name\+desc/);
            return expect(match && match.length > 0).to.be.true;
          });
      });
      it("should perform sorting on version", () => {
        pom.interceptApis([pom.api.packageList]);
        pom.table.getColumnHeaderSortArrows(1).click();
        pom.waitForApis();
        cy.get(`@${pom.api.packageList}`)
          .its("request.url")
          .then((url: string) => {
            const match = url.match(/orderBy=version\+asc/);
            return expect(match && match.length > 0).to.be.true;
          });
      });
    });

    describe("working on page size", () => {
      it("should see default page size", () => {
        cy.get(`@${pom.api.packageList}`)
          .its("request.url")
          .then((url: string) => {
            const match = url.match(/pageSize=10/);
            return expect(match && match.length > 0).to.be.true;
          });
      });
      it("should change page size", () => {
        // Change Page
        pom.interceptApis([pom.api.packageList]);
        pom.table.root
          .find("[data-testid='pagination-control-pagesize']")
          .find(".spark-icon-chevron-down")
          .click();
        cy.get(".spark-popover .spark-list-item").contains("100").click();
        pom.waitForApis();

        // Check api response
        cy.get(`@${pom.api.packageList}`)
          .its("request.url")
          .then((url: string) => {
            const match = url.match(/pageSize=100/);
            return expect(match && match.length > 0).to.be.true;
          });
      });
    });

    describe("working on page index", () => {
      beforeEach(() => {
        pom.interceptApis([pom.api.packageListPage1]);
        cy.mount(<DeploymentPackageTable kind="KIND_NORMAL" />);
        pom.waitForApis();
      });
      it("should see default page index", () => {
        cy.get(`@${pom.api.packageListPage1}`)
          .its("request.url")
          .then((url: string) => {
            const match = url.match(/offset=0/);
            return expect(match && match.length > 0).to.be.true;
          });
      });
      it("should change page index", () => {
        pom.interceptApis([pom.api.packageListPage2]);
        pom.table.getNextPageButton().click();
        pom.waitForApis();
        cy.get(`@${pom.api.packageListPage2}`)
          .its("request.url")
          .then((url: string) => {
            const match = url.match(/offset=10/);
            return expect(match && match.length > 0).to.be.true;
          });
      });
    });

    describe("working with radio selection", () => {
      const packageRow1 = "package-1";
      const packageRow11 = "package-11";
      beforeEach(() => {
        pom.interceptApis([pom.api.packageListPage1]);
        cy.mount(<DeploymentPackageTable kind="KIND_NORMAL" canRadioSelect />);
        pom.waitForApis();
      });

      it("Should able to select a row", () => {
        pom.getFieldByName(packageRow1).should("not.be.checked");
        pom.getFieldByName(packageRow1).check();
        pom.getFieldByName(packageRow1).should("be.checked");
      });

      it("Should select a row in page 1 ", () => {
        pom.getFieldByName(packageRow1).check();
        pom.getFieldByName(packageRow1).should("be.checked");
        pom.interceptApis([pom.api.packageListPage2]);
        pom.table.getPageButton(2).click();
        pom.waitForApis();

        pom.getFieldByName(packageRow11).should("not.be.checked");
      });

      it("should select a row of page 2 ", () => {
        pom.interceptApis([pom.api.packageListPage1, pom.api.packageListPage2]);
        pom.table.getPageButton(2).click();

        pom.getFieldByName(packageRow11).check();
        pom.getFieldByName(packageRow11).should("be.checked");
        // move to previous page
        pom.table.getPageButton(1).click();

        pom.getFieldByName(packageRow1).should("not.be.checked");
      });
      it("should perform sorting on name and version", () => {
        pom.interceptApis([pom.api.packageList]);
        pom.table.getColumnHeaderSortArrows(1).click();
        pom.waitForApis();
        cy.get(`@${pom.api.packageList}`)
          .its("request.url")
          .then((url: string) => {
            const match = url.match(/orderBy=name\+desc/);
            return expect(match && match.length > 0).to.be.true;
          });
        pom.interceptApis([pom.api.packageList]);

        pom.table.getColumnHeaderSortArrows(2).click();
        pom.waitForApis();
        cy.get(`@${pom.api.packageList}`)
          .its("request.url")
          .then((url: string) => {
            const match = url.match(/orderBy=version\+asc/);
            return expect(match && match.length > 0).to.be.true;
          });
      });
    });
  });
});
