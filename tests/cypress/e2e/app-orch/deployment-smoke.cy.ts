/*
 * SPDX-FileCopyrightText: (C) 2024 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import {
  APP_ORCH_READWRITE_USER,
  APP_ORCH_READ_USER,
} from "tests/cypress/support/utilities";
import { NetworkLog } from "../../support/network-logs";
import {
  getDeploymentsMFETab,
  isDeploymentTestDataPresent,
  TestData,
} from "../helpers/app-orch";
import AppOrchPom from "./app-orch-smoke.pom";

const pom = new AppOrchPom("appOrchLayout");
describe("APP_ORCH E2E: Deployment Package Smoke tests", () => {
  const netLog = new NetworkLog();
  let testData: TestData;

  before(() => {
    const dataFile =
      Cypress.env("DATA_FILE") ||
      "./cypress/e2e/app-orch/data/app-orch-smoke.json";
    cy.readFile(dataFile, "utf-8").then((data) => {
      if (!isDeploymentTestDataPresent(data)) {
        throw new Error(
          `Invalid test data in ${dataFile}: ${JSON.stringify(data)}`,
        );
      }
      testData = data;
    });
  });

  beforeEach(() => {
    netLog.intercept();
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
    });
    describe("on create deployment package", () => {
      it("should see empty table", () => {});
      it("should create new entry", () => {});
      it("should see created entry", () => {});
    });
  });

  describe(`the ${APP_ORCH_READ_USER.username}`, () => {
    beforeEach(() => {
      cy.login(APP_ORCH_READWRITE_USER);
      cy.visit("/");

      // navigate to Deployments MFE from navigation bar.
      getDeploymentsMFETab().click();
    });
    describe("on create deployment package", () => {
      it("should not be able to create", () => {});
    });
  });
});
