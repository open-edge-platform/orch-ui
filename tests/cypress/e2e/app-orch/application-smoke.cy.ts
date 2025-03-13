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
  isRegistryChartTestDataPresent,
  isRegistryTestDataPresent,
  TestData,
} from "../helpers/app-orch";
import AppOrchPom from "./app-orch-smoke.pom";

const pom = new AppOrchPom("appOrchLayout");
describe("APP_ORCH E2E: Applications Smoke tests", () => {
  const netLog = new NetworkLog();
  let testData: TestData;
  let registryNameId: string;

  /** Get to Applications SidebarTab */
  const initPageByUser = (user = APP_ORCH_READWRITE_USER) => {
    cy.login(user);
    cy.visit("/");
    getDeploymentsMFETab().click();
    getSidebarTabByName("Applications").click();
  };

  /** Prereq: Add Application Registry */
  const initPrequisite = () => {
    initPageByUser(); // Get to Applications Tab
    pom.applicationsPom.tabs.getTab("Registries").click();
    pom.addRegistry(testData.registry!);
    pom.applicationsPom.tabs.getTab("Applications").click();
  };

  /** Prereq: Remove Application Registry (that was added in initPrequisite) */
  const deinitPrequisite = () => {
    initPageByUser(); // Get to Applications Tab
    pom.applicationsPom.tabs.getTab("Registries").click();
    cy.contains("Add a Registry").should("be.visible");
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
        !isApplicationProfileTestDataPresent(data)
      ) {
        throw new Error(
          "Require valid: registry, registryChart & application\n" +
            `Invalid test data in ${dataFile}: ${JSON.stringify(data)}`,
        );
      }
      testData = data;
      registryNameId = testData.registry?.displayName
        ?.toLowerCase()
        .split(" ")
        .join("-")!;
      netLog.interceptAll(["**/v1/**", "**/v3/**"]);
      initPrequisite(); // Initialize things needed for test before it runs
      netLog.save("app_orch_e2e_application_smoke_before");
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
    });
    it("should create a new application", () => {
      // Goto Add Application page
      pom.applicationsPom.el.addApplicationButton.click();

      pom.addApplication(
        { ...testData.registry!, name: registryNameId },
        testData.registryChart!,
        testData.application!,
        testData.applicationProfile!,
      );

      pom.applicationCreateEditPom.el.successToast
        .should("be.visible")
        .should("not.have.class", "spark-toast-content-visibility-hide")
        .should("contain.text", "Application created");

      // FIXME for some reason the redirect is not working
      cy.contains("Applications").click();

      pom.applicationsPom.el.introTitle
        .should("be.visible", { timeout: 5000 })
        .should("contain.text", "Applications");

      pom.applicationsPom.search(testData.application?.name!);
      pom.applicationsPom.tabs.appTablePom.tableUtils
        .getRowBySearchText(testData.application?.name!)
        .should("exist");
    });
    it("should delete an application", () => {
      pom.applicationsPom.search(testData.application?.name!);
      pom.removeApplication(testData.application?.name!);
      pom.applicationsPom.tabs.appTablePom.root.should(
        "not.contain",
        registryNameId,
      );
    });
  });

  describe(`the ${APP_ORCH_READ_USER.username}`, () => {
    beforeEach(() => {
      initPageByUser(APP_ORCH_READ_USER);
    });
    describe("on create applications", () => {
      it("should not be able to create", () => {
        pom.applicationsPom.tabs.el.addApplicationButton.should(
          "have.class",
          "spark-button-disabled",
        );
      });
    });
  });
});
