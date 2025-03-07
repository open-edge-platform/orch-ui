/*
 * SPDX-FileCopyrightText: (C) 2024 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  APP_ORCH_READWRITE_USER,
  APP_ORCH_READ_USER,
} from "tests/cypress/support/utilities";
import { NetworkLog } from "../../support/network-logs";
import {
  getDeploymentsMFETab,
  getSidebarTabByName,
  isApplicationProfileTestDataPresent,
  isApplicationTestDataPresent,
  isDeploymentPackageTestDataPresent,
  isDeploymentTestDataPresent,
  isRegistryChartTestDataPresent,
  isRegistryTestDataPresent,
  TestData,
} from "../helpers/app-orch";
import AppOrchPom from "./app-orch-smoke.pom";

const pom = new AppOrchPom("appOrchLayout");
describe("APP_ORCH E2E: Deployments Smoke tests", () => {
  const netLog = new NetworkLog();
  let testData: TestData;
  let registryNameId: string;
  let deploymentPackageDisplayName: string;

  /** Get to Applications SidebarTab */
  const initPageByUser = (user = APP_ORCH_READWRITE_USER) => {
    cy.viewport(1024, 768);
    netLog.interceptAll(["**/v1/**", "**/v3/**"]);
    cy.login(user);
    cy.visit("/");
    getDeploymentsMFETab().click();
  };

  /** Prereq: Add Application Registry, Application */
  const initPrequisite = () => {
    initPageByUser(); // Get to Applications Tab
    getSidebarTabByName("Applications").click();
    // Add registry
    pom.applicationsPom.tabs.getTab("Registries").click();
    pom.addRegistry(testData.registry!);

    // Add application
    pom.applicationsPom.tabs.getTab("Applications").click();
    pom.applicationsPom.el.addApplicationButton.click();
    pom.addApplication(
      { ...testData.registry!, name: registryNameId },
      testData.registryChart!,
      testData.application!,
      testData.applicationProfile!,
    );
    // Add Deployment Package
    getSidebarTabByName("Deployment Packages").click();
    pom.deploymentPackagesPom.createButtonPom.el.button.click();
    pom.addDeploymentPackage(testData.deploymentPackage!, [
      testData.application!.name,
    ]);
  };

  /** Prereq: Remove Application Registry, Application (that was added in initPrequisite) */
  const deinitPrequisite = () => {
    initPageByUser(); // Get to Applications Tab
    getSidebarTabByName("Deployment Packages").click();
    pom.removeDeploymentPackage(deploymentPackageDisplayName);

    // Remove Application
    cy.visit("/");
    getDeploymentsMFETab().click();
    getSidebarTabByName("Applications").click();
    pom.removeApplication(testData.application!.name);

    // Remove Registry
    cy.visit("/");
    getDeploymentsMFETab().click();
    getSidebarTabByName("Applications").click();
    pom.applicationsPom.tabs.getTab("Registries").click();
    pom.removeRegistry(registryNameId); // Delete the added registry by name (id)
  };

  before(() => {
    const dataFile =
      Cypress.env("DATA_FILE") ||
      "./cypress/e2e/app-orch/data/app-orch-smoke.json";
    cy.readFile(dataFile, "utf-8").then((data) => {
      if (
        // Registry related test-data
        !isRegistryTestDataPresent(data) ||
        !isRegistryChartTestDataPresent(data) ||
        // Application related test-data
        !isApplicationTestDataPresent(data) ||
        !isApplicationProfileTestDataPresent(data) ||
        // Deployment Package related test-data
        !isDeploymentPackageTestDataPresent(data) ||
        // Deployment related test-data
        !isDeploymentTestDataPresent(data)
      ) {
        throw new Error(
          "Require valid: registry, registryChart, application, deploymentPackage & deployments\n" +
            `Invalid test data in ${dataFile}: ${JSON.stringify(data)}`,
        );
      }
      testData = data;
      registryNameId = testData
        .registry!.displayName!.toLowerCase()
        .split(" ")
        .join("-");
      // TODO: change this to displayName when opensource ready to be deployed in coder
      deploymentPackageDisplayName = testData
        .deploymentPackage!.displayName!.toLowerCase()
        .split(" ")
        .join("-");

      initPrequisite(); // Initialize things needed for test before it runs
    });
  });

  after(() => {
    deinitPrequisite(); // Deinitialize everything for any future E2E test.
  });
  afterEach(() => {
    netLog.save();
    netLog.clear();
  });

  describe(`the ${APP_ORCH_READWRITE_USER.username}`, () => {
    beforeEach(() => {
      initPageByUser();
      getSidebarTabByName("Deployments").click();
    });
    describe("on create deployment", () => {
      it("should see empty table", () => {
        // Note: this test requires the table to be empty
        pom.deploymentsPom.deploymentTablePom.emptyPom.root.should("exist");
      });
      it("should create new entry", () => {
        // If Empty
        pom.deploymentsPom.deploymentTablePom.emptyPom.el.emptyActionBtn.click();
        // else execute below
        // pom.deploymentsPom.deploymentTablePom.el.addDeploymentButton.click();

        // TODO: Fix below step need to be coming from SetupDeployment.pom (which show error for MFE remote not found in cypress webpack upon import!!)
        // Fill Setup Deployment Flow
        pom.addDeployment(testData.deployments!, deploymentPackageDisplayName);
      });
      it("should see created entry", () => {
        pom.deploymentsPom.deploymentTablePom.tableUtils.getRowBySearchText(
          deploymentPackageDisplayName,
        );
      });
      it("should see delete entry", () => {
        pom.removeDeployment(testData.deployments!.displayName!);
        pom.deploymentsPom.root.should(
          "not.contain.text",
          testData.deployments!.displayName!,
        );
      });
    });
  });

  xdescribe(`the ${APP_ORCH_READ_USER.username}`, () => {
    beforeEach(() => {
      initPageByUser(APP_ORCH_READ_USER);
      getSidebarTabByName("Deployments").click();
    });
    describe("on create deployment", () => {
      // TODO: See if edge operator can create  deployments
      it("should not be able to create", () => {
        // if Empty
        pom.deploymentsPom.deploymentTablePom.emptyPom.el.emptyActionBtn.should(
          "have.class",
          "spark-button-disabled",
        );
        // Else
        // pom.deploymentsPom.deploymentTablePom.el.addDeploymentButton.should(
        //   "have.class",
        //   "spark-button-disabled",
        // );
      });
    });
  });
});
