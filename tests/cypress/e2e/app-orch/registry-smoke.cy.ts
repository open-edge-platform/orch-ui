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
  isRegistryTestDataPresent,
  TestData,
} from "../helpers/app-orch";
import AppOrchPom from "./app-orch-smoke.pom";

const pom = new AppOrchPom("appOrchLayout");
describe("APP_ORCH E2E: Application Registries Smoke tests", () => {
  const netLog = new NetworkLog();
  let testData: TestData;
  let registryNameId: string;

  before(() => {
    const dataFile =
      Cypress.env("DATA_FILE") ||
      "./cypress/e2e/app-orch/data/app-orch-smoke.json";
    cy.readFile(dataFile, "utf-8").then((data) => {
      if (!isRegistryTestDataPresent(data)) {
        throw new Error(
          "Require valid: registry\n" +
            `Invalid test data in ${dataFile}: ${JSON.stringify(data)}`,
        );
      }
      testData = data;
      registryNameId = testData.registry?.displayName
        ?.toLowerCase()
        .split(" ")
        .join("-")!;
    });
  });

  beforeEach(() => {
    cy.viewport(1024, 768);
    netLog.interceptAll(["**/v1/**", "**/v3/**"]);
  });
  afterEach(() => {
    netLog.save();
    netLog.clear();
  });

  describe(`the ${APP_ORCH_READWRITE_USER.username}`, () => {
    beforeEach(() => {
      cy.login(APP_ORCH_READWRITE_USER);
      cy.visit("/");

      // navigate to Deployments MFE from navigation bar.
      getDeploymentsMFETab().click();
      getSidebarTabByName("Applications").click();
      pom.applicationsPom.tabs.getTab("Registries").click();
    });

    it("should see App Registry content", () => {
      pom.applicationsPom.tabs.el.registryTableContent.should("exist");
    });

    describe("on registries create drill", () => {
      xit("should see empty table", () => {
        /* TODO: need to add this after spinning a new coder */
      });
      it("should create new entry", () => {
        pom.addRegistry(testData.registry!);
      });
      it("should see created entry", () => {
        pom.applicationsPom.tabs.appRegistryTablePom.tableUtils
          .getRowBySearchText(registryNameId)
          .should("exist");
      });
      it("should see delete entry", () => {
        pom.removeRegistry(registryNameId);
        pom.applicationsPom.tabs.appRegistryTablePom.root.should(
          "not.contain",
          registryNameId,
        );
      });
    });
  });

  describe(`the ${APP_ORCH_READ_USER.username}`, () => {
    beforeEach(() => {
      cy.login(APP_ORCH_READ_USER);
      cy.visit("/");

      // navigate to Deployments MFE from navigation bar.
      getDeploymentsMFETab().click();
      getSidebarTabByName("Applications").click();
      pom.applicationsPom.tabs.getTab("Registries").click();
    });
    describe("on create registries", () => {
      it("should not be able to create", () => {
        pom.applicationsPom.tabs.el.addRegistryButton.should(
          "have.class",
          "spark-button-disabled",
        );
      });
    });
  });
});
