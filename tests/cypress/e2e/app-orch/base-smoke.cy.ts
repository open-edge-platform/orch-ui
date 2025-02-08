/*
 * SPDX-FileCopyrightText: (C) 2024 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { APP_ORCH_READ_USER } from "tests/cypress/support/utilities";
import { NetworkLog } from "../../support/network-logs";
import { getDeploymentsMFETab } from "../helpers/app-orch";

const testUser = APP_ORCH_READ_USER;

describe("APP_ORCH E2E: Base Smoke tests", () => {
  const netLog = new NetworkLog();

  beforeEach(() => {
    netLog.intercept();
  });
  afterEach(() => {
    netLog.save();
    netLog.clear();
  });

  describe(`the ${testUser.username}`, () => {
    beforeEach(() => {
      cy.login(testUser);
      cy.visit("/");
    });
    describe("on App Orchestration home page", () => {
      it("should visit deployments page", () => {
        getDeploymentsMFETab().click();
        cy.get("h1").should("contain.text", "Deployments");
      });

      // TODO: test below line in new coder (with open-source)
      xit("should visit deployment packages page via url", () => {
        cy.visit("/applications");
        cy.get("h1").should("contain.text", "Deployments");
      });
    });
  });
});
