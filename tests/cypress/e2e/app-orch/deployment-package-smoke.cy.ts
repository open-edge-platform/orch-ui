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
  isRegistryChartTestDataPresent,
  isRegistryTestDataPresent,
  TestData,
} from "../helpers/app-orch";
import AppOrchPom from "./app-orch-smoke.pom";

const pom = new AppOrchPom("appOrchLayout");

describe("APP_ORCH E2E: Deployment Package Smoke tests", () => {
  const netLog = new NetworkLog();
  let testData: TestData;
  let registryNameId: string;

  /** Get to Applications SidebarTab */
  const initPageByUser = (user = APP_ORCH_READWRITE_USER) => {
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
    cy.waitForPageTransition();
    pom.applicationsPom.el.addApplicationButton.click();
    pom.addApplication(
      { ...testData.registry!, name: registryNameId },
      testData.registryChart!,
      testData.application!,
      testData.applicationProfile!,
    );
  };

  /** Prereq: Remove Application Registry, Application (that was added in initPrequisite) */
  const deinitPrequisite = () => {
    initPageByUser(); // Get to Applications Tab
    // Remove Application
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
        !isDeploymentPackageTestDataPresent(data)
      ) {
        throw new Error(
          "Require valid: registry, registryChart, application & deploymentPackage\n" +
            `Invalid test data in ${dataFile}: ${JSON.stringify(data)}`,
        );
      }
      testData = data;
      registryNameId = testData
        .registry!.displayName!.toLowerCase()
        .split(" ")
        .join("-");

      netLog.interceptAll(["**/v1/**", "**/v3/**"]);
      initPrequisite(); // Initialize things needed for test before it runs
      netLog.save("app_orch_e2e_deployment_package_smoke_before");
      netLog.clear();
    });
  });

  afterEach(() => {
    netLog.save();
    netLog.clear();
  });

  after(() => {
    deinitPrequisite(); // Deinitialize everything for any future E2E test.
  });

  describe(`the ${APP_ORCH_READWRITE_USER.username}`, () => {
    beforeEach(() => {
      initPageByUser();
      getSidebarTabByName("Deployment Packages").click();
    });
    let displayName: string;
    before(() => {
      displayName = testData
        .deploymentPackage!.displayName!.toLowerCase()
        .split(" ")
        .join("-");
    });
    it("should create a deployment package", () => {
      pom.deploymentPackagePopupPom.openPopUp();
      pom.deploymentPackagePopupPom.clickMenuOption("Create");
      cy.waitForPageTransition();
      // Fill Deployment Package Creation form flow
      // General Info Flow
      pom.deploymentPackageCreatePom.deploymentPackageCreateEditPom.deploymentPackageGeneralInfoFormPom.fillGeneralInfoForm(
        testData.deploymentPackage!,
      );
      pom.deploymentPackageCreatePom.deploymentPackageCreateEditPom.clickNextOnStep(
        0,
      );

      // Application Selection Flow
      pom.deploymentPackageCreatePom.deploymentPackageCreateEditPom.appTablePom
        .getCheckBoxBySearchText(testData.application!.name)
        .click();
      pom.deploymentPackageCreatePom.deploymentPackageCreateEditPom.clickNextOnStep(
        1,
      );

      // Deployment Package Profile flow
      const generatedProfileCy =
        pom.deploymentPackageCreatePom.deploymentPackageCreateEditPom.deploymentPackageProfilePom.profileList.getProfileEntryByProfileName(
          "Deployment Profile 1",
        );
      generatedProfileCy.should("contain.text", "System generated profile");
      generatedProfileCy
        .find(".spark-badge-text")
        .should("contain.text", "Default");
      pom.deploymentPackageCreatePom.deploymentPackageCreateEditPom.clickNextOnStep(
        2,
      );

      // Submit at Review step
      pom.deploymentPackageCreatePom.deploymentPackageCreateEditPom.el.submitButton.click();

      // TODO Verify success toast
      cy.contains("Deployment Packages").click();

      pom.deploymentPackagesPom.deploymentPackageTable.tableUtils.getRowBySearchText(
        displayName,
      );
    });
    it("should delete a deployment package", () => {
      pom.removeDeploymentPackage(displayName);
      pom.deploymentPackagesPom.root.should("not.contain.text", displayName);
    });

    // TODO: describe for Deployment Package clone
    // TODO: describe for Deployment Package edit
  });

  describe(`the ${APP_ORCH_READ_USER.username}`, () => {
    beforeEach(() => {
      initPageByUser(APP_ORCH_READ_USER);
      getSidebarTabByName("Deployment Packages").click();
    });
    describe("on create deployment package", () => {
      it("should not be able to create", () => {
        pom.deploymentPackagePopupPom.openPopUp();
        cy.contains("Create").should(
          "have.class",
          "popup__option-item-disable",
        );
        cy.contains("Import from file").should(
          "have.class",
          "popup__option-item-disable",
        );
        cy.contains("Import Helm Chart").should(
          "have.class",
          "popup__option-item-disable",
        );
      });
    });
  });
});
