/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */
import { deploymentPackageMock } from "../../organisms/deploymentPackages/DeploymentPackageTable/DeploymentPackageTable.pom";
import DeploymentPackages from "./DeploymentPackages";
import DeploymentPackagesPagePom from "./DeploymentPackages.pom";

const pom = new DeploymentPackagesPagePom();
describe("<DeploymentPackages />", () => {
  describe("basic functionality", () => {
    beforeEach(() => {
      pom.deploymentPackageTable.interceptApis([
        pom.deploymentPackageTable.api.packageList,
      ]);
      cy.mount(<DeploymentPackages />);
    });

    it("should render component", () => {
      pom.root.should("exist");
    });

    it("should render Packages and Extensions tabs", () => {
      pom.root.find(".spark-tabs-tab").contains("Packages");
      pom.root.find(".spark-tabs-tab").contains("Extensions");

      pom.el.packagesTabContent.should("be.visible");
      pom.deploymentPackageTable.root.should("exist");
      pom.el.extensionsTabContent.should("not.exist");

      pom.root.find(".spark-tabs-tab").contains("Extensions").click();
      pom.el.extensionsTabContent.should("be.visible");
      pom.deploymentPackageTable.root.should("exist");
      pom.el.packagesTabContent.should("not.exist");
    });

    it("navigates correctly when Create is clicked", () => {
      pom.trigger.click();
      pom.el.Create.click();
      cy.get("#pathname").should("contain", "/applications/packages/create");
    });

    it("navigates correctly when Import from file is clicked", () => {
      pom.trigger.click();
      pom.el["Import from file"].click();
      cy.get("#pathname").should("contain", "/applications/packages/import");
    });

    it("navigates correctly when Import Helm Chart is clicked", () => {
      pom.trigger.click();
      pom.el["Import Helm Chart"].click();
      cy.get("#pathname").should(
        "contain",
        "/applications/packages/import-from-helm-chart",
      );
    });

    it("should load table with mocked data", () => {
      pom.waitForApis();
      pom.deploymentPackageTable.table
        .getRows()
        .should("have.length", deploymentPackageMock.length);
    });

    it("should render empty", () => {
      pom.deploymentPackageTable.interceptApis([
        pom.deploymentPackageTable.api.packageEmpty,
      ]);
      pom.ribbonPom.el.search.type("testing");
      pom.waitForApis();
      pom.root.should("contain.text", "No information to display");
    });
  });

  describe("table Ribbon should", () => {
    it("be able to trigger a GET request with filter query parameter when active tab is Packages", () => {
      pom.deploymentPackageTable.interceptApis([
        pom.deploymentPackageTable.api.packageList,
        pom.deploymentPackageTable.api.packageWithFilter,
      ]);
      cy.mount(<DeploymentPackages />);
      pom.root.find(".spark-tabs-active").contains("Packages"); // active tab
      pom.ribbonPom.el.search.type("testing");
      cy.wait("@packageWithFilter").then((interception) => {
        expect(interception.request.url).to.not.contain("KIND_EXTENSION");
        expect(interception.request.url).to.contain("KIND_NORMAL");
      });
    });

    it("be able to trigger a GET request with filter query parameter when active tab is Extensions", () => {
      pom.deploymentPackageTable.interceptApis([
        pom.deploymentPackageTable.api.packageList,
        pom.deploymentPackageTable.api.packageWithFilter,
      ]);
      cy.mount(<DeploymentPackages />);
      pom.root.find(".spark-tabs-tab").contains("Extensions").click();
      pom.root.find(".spark-tabs-active").contains("Extensions"); // active tab
      pom.ribbonPom.el.search.type("testing");
      cy.wait("@packageWithFilter").then((interception) => {
        expect(interception.request.url).to.not.contain("KIND_NORMAL");
        expect(interception.request.url).to.contain("KIND_EXTENSION");
      });
    });
  });
});
