/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { ApiErrorPom, EmptyPom } from "@orch-ui/components";
import { cyGet } from "@orch-ui/tests";
import {
  deploymentOne,
  deploymentOneDisplayName,
  DeploymentsStore,
} from "@orch-ui/utils";
import DeploymentsTable from "./DeploymentsTable";
import { DeploymentsTablePom } from "./DeploymentsTable.pom";

const mockStore = new DeploymentsStore();
const pom = new DeploymentsTablePom();
const apiErrorPom = new ApiErrorPom();
const emptyPom = new EmptyPom();

describe("<DeploymentsTable />", () => {
  describe("on different api responses", () => {
    it("handle when no deployments created", () => {
      pom.interceptApis([pom.api.getEmptyDeploymentsList]);
      cy.mount(<DeploymentsTable hasPermission={true} />);
      pom.waitForApis();

      pom.root.should("be.visible");
      pom.tablePom.root.should("not.exist");
      pom.el.empty.should("be.visible");

      emptyPom.el.emptyActionBtn.click();
      cy.get("#pathname").contains("/setup-deployment");
    });

    it("handle loading deployments", () => {
      pom.interceptApis([pom.api.getEmptyDeploymentsList]);
      cy.mount(<DeploymentsTable />);
      cy.get(".spark-shimmer").should("exist");
      pom.waitForApis();
      cy.get(".spark-shimmer").should("not.exist");
    });

    it("handle table with one deployments", () => {
      pom.interceptApis([pom.api.getSingleDeploymentsList]);
      pom.upgradeStatusPom.interceptApis([
        pom.upgradeStatusPom.api.getVersionList,
      ]);
      cy.mount(<DeploymentsTable />);
      pom.waitForApis();
      pom.root.find("tbody tr").should("have.length", 1);
      pom.upgradeStatusPom.root.should("contain.text", "Upgrades Available!");
    });

    it("handle table with multiple deployments", () => {
      pom.interceptApis([pom.api.getDeploymentsList]);
      cy.mount(<DeploymentsTable />);
      pom.waitForApis();

      pom.tablePom.getRows().should("have.length", mockStore.list().length);
      pom.el.empty.should("not.exist");
    });
  });

  describe("on basic table functionality", () => {
    it("should hide columns", () => {
      pom.interceptApis([pom.api.getSingleDeploymentsList]);
      cy.mount(<DeploymentsTable hideColumns={["Package version"]} />);
      pom.waitForApis();
      pom.root.find("thead tr").should("not.contain.text", "Package version");
    });

    it("redirects on name column clicks to edit route", () => {
      pom.interceptApis([pom.api.getDeploymentsList]);
      cy.mount(<DeploymentsTable />);
      pom.waitForApis();
      pom.tablePom
        .getCellBySearchText(deploymentOneDisplayName)
        //can't just rely on previous statement to then do a click, have to grab the actual link (a)
        .find("a")
        .click();

      cy.get("#pathname").contains(
        `/applications/deployment/${deploymentOne.deployId}`,
      );
    });

    it("shows the deployment upgrade modal via popup", () => {
      pom.interceptApis([pom.api.getSingleDeploymentsList]);
      pom.upgradePom.interceptApis([pom.upgradePom.api.multipleVersionList]);
      cy.mount(<DeploymentsTable />);
      pom.upgradePom.waitForApis();
      pom.waitForApis();

      pom.root.get(".popup").click().contains("Upgrade").click();
      cyGet("deploymentUpgradeModalBody").should("contain.text", "Upgrade");
    });

    it("shows the deployment delete modal via popup", () => {
      pom.interceptApis([pom.api.getSingleDeploymentsList]);
      cy.mount(<DeploymentsTable />);
      pom.waitForApis();

      pom.root.get(".popup").click().contains("Delete").click();
      pom
        .getConfirmationDialog()
        .find("[data-cy='content']")
        .should(
          "contain.text",
          'Are you sure you want to delete Deployment "Restaurant smart inventory deployment"?',
        );
      pom
        .getConfirmationDialog()
        .find("[data-cy='confirmBtn']")
        .should("have.text", "Delete");
      pom.interceptApis([pom.api.deleteDeploymentByDeployId]);
      pom.getConfirmationDialog().find("[data-cy='confirmBtn']").click();
      pom.waitForApis();

      cy.get(`@${pom.api.deleteDeploymentByDeployId}`)
        .its("request.url")
        .then((url: string) => {
          const match = url.match(deploymentOne.deployId!);
          expect(match && match.length > 0).to.be.eq(true);
        });
    });

    it("handle 500 error", () => {
      pom.interceptApis([pom.api.getDeploymentsListError]);
      cy.mount(<DeploymentsTable />);
      pom.waitForApis();
      apiErrorPom.root.should("be.visible");
    });
  });

  describe("ribbon should", () => {
    it("disable action button when unauthorized", () => {
      pom.interceptApis([pom.api.getDeploymentsList]);
      cy.mount(<DeploymentsTable hasPermission={false} />);
      pom.waitForApis();
      pom.el.addDeploymentButton.should("have.attr", "aria-disabled", "true");
    });

    it("enable action button when authorized", () => {
      pom.interceptApis([pom.api.getDeploymentsList]);
      cy.mount(<DeploymentsTable hasPermission={true} />);
      pom.waitForApis();
      pom.el.addDeploymentButton.should(
        "not.have.attr",
        "aria-disabled",
        "true",
      );
    });

    it("perform a search on `test-filter`", () => {
      pom.interceptApis([pom.api.getDeploymentsListPage1Size10]);
      cy.mount(<DeploymentsTable />);
      pom.waitForApis();

      pom.interceptApis([pom.api.getDeploymentsListWithSearchFilter]);
      pom.el.search.type("test-filter");
      pom.waitForApis();

      pom.tablePom.getTotalItemCount().should("contain.text", "8 items found");
      pom.tablePom.root
        .find("td:contains(test-filter)")
        .should("have.length", 8);
    });
  });

  describe("should perform pagination", () => {
    it("should show pages on click", () => {
      pom.interceptApis([pom.api.getDeploymentsListPage1Size18]);
      cy.mount(<DeploymentsTable />);
      pom.waitForApis();

      pom.tablePom.getCellBySearchText("Deployment 1");
      pom.tablePom.getCellBySearchText("Deployment 10");

      pom.interceptApis([pom.api.getDeploymentsListPage2Size18]);
      pom.tablePom.getPageButton(2).click();
      pom.waitForApis();

      pom.tablePom.getCellBySearchText("Deployment 11");
      pom.tablePom.getCellBySearchText("Deployment 18");
    });
  });

  describe("should perform sorting", () => {
    beforeEach(() => {
      pom.interceptApis([pom.api.getDeploymentsListWithOrderByNameAsc]);
      cy.mount(<DeploymentsTable />);
      pom.waitForApis();
    });
    it("should sort `name asc` by default", () => {
      pom.tablePom.getCell(1, 1).should("have.text", "Deployment 1");
      pom.tablePom.getCell(2, 1).should("have.text", "Deployment 10");
      pom.tablePom.getCell(10, 1).should("have.text", "Deployment 9");
    });

    it("should sort `name desc`", () => {
      pom.interceptApis([pom.api.getDeploymentsListWithOrderByNameDesc]);
      pom.tablePom.getColumnHeaderSortArrows(0).click();
      pom.waitForApis();

      pom.tablePom.getCell(1, 1).should("have.text", "Deployment 9");
      pom.tablePom.getCell(2, 1).should("have.text", "Deployment 8");
      pom.tablePom.getCell(9, 1).should("have.text", "Deployment 10");
      pom.tablePom.getCell(10, 1).should("have.text", "Deployment 1");
    });
  });
});
