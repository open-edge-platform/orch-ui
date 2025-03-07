/*
* SPDX-FileCopyrightText: (C) 2023 Intel Corporation
* SPDX-License-Identifier: Apache-2.0
*/

import { NetworkLog } from "../../support/network-logs";
import {
  APP_ORCH_READWRITE_USER,
  EIM_USER,
} from "../../support/utilities";
import {
  validateDefaultProject,
  validateNoAccessToProjectTab,
} from "../helpers";

describe("Non Project Admin Smoke", () => {
  const netLog = new NetworkLog();

  beforeEach(() => {
    netLog.intercept();
  });

  // Test for EIM User
  describe(`the ${EIM_USER.username}`, () => {
    beforeEach(() => {
      cy.login(EIM_USER);
      cy.visit("/");
    });
    it("should have a default project set", () => {
      validateDefaultProject();
    });
    it("should not have acces to projects tab ", () => {
      validateNoAccessToProjectTab();
    });
  });

  // Test for App-orch User
  describe(`the ${APP_ORCH_READWRITE_USER.username}`, () => {
    beforeEach(() => {
      cy.login(APP_ORCH_READWRITE_USER);
      cy.visit("/");
    });
    it("should have a default project set", () => {
      validateDefaultProject();
    });
    it("should not have acces to projects tab ", () => {
      validateNoAccessToProjectTab();
    });
  });

  afterEach(() => {
    netLog.save();
    netLog.clear();
  });
});
