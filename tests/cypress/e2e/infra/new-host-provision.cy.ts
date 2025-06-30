/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { AddHostsFormPom, RegisterHostsPom } from "@orch-ui/infra-poms";
import { EIM_USER } from "@orch-ui/tests";
import OsProfileDropdownPom from "../../../../apps/infra/src/components/organism/OsProfileDropdown/OsProfileDropdown.pom";
import { NetworkLog } from "../../support/network-logs";
import {
  isTestProvisionHostData,
  TestProvisionHostData,
} from "../helpers/eimTestProvisionHostData";
import { sessionKey, sessionValue } from "./test";

describe(`Infra smoke: the ${EIM_USER.username}`, () => {
  const netLog = new NetworkLog();
  const addHostsFormPom = new AddHostsFormPom();
  const registerHostsPom = new RegisterHostsPom();
  const osProfileDropdownPom = new OsProfileDropdownPom();

  let testProvisionHostData: TestProvisionHostData,
    serialNumber: string,
    activeProject: string,
    regionId: string,
    siteId: string,
    provisionedHosts: string[] = [],
    instanceHosts: string[] = [];

  before(() => {
    const provisionHostDataFile =
      "./cypress/e2e/infra/data/provision-host.json";
    cy.readFile(provisionHostDataFile, "utf-8").then((data) => {
      if (!isTestProvisionHostData(data)) {
        throw new Error(
          `Invalid test data in ${provisionHostDataFile}: ${JSON.stringify(data)}`,
        );
      }
      testProvisionHostData = data;

      serialNumber = Cypress.env("EN_SERIAL_NUMBER");
      if (serialNumber) {
        testProvisionHostData.hosts = [testProvisionHostData.hosts[0]];
        testProvisionHostData.hosts[0].serialNumber = serialNumber;
      }
    });
  });

  describe("when provisioning hosts", () => {
    beforeEach(() => {
      netLog.intercept();

      // cy.login(EIM_USER);

      cy.window().then((window) => {
        // Add items to sessionStorage
        window.sessionStorage.setItem(sessionKey, sessionValue);
        // Reload the page
        cy.reload();

        cy.visit("/");
        cy.currentProject().then((p) => (activeProject = p));
      });
    });

    it("should just log a message", () => {
      cy.viewport(1920, 1080);

      cy.intercept({
        method: "POST",
        url: `/v1/projects/${activeProject}/compute/hosts/register`,
      }).as("registerHost");

      cy.intercept({
        method: "PATCH",
        url: `/v1/projects/${activeProject}/compute/hosts/host-*`,
      }).as("updateHost");

      cy.intercept({
        method: "POST",
        url: `/v1/projects/${activeProject}/compute/instances`,
      }).as("createInstance");

      cy.intercept({
        method: "POST",
        url: `/v2/projects/${activeProject}/clusters`,
      }).as("createCluster");

      osProfileDropdownPom.interceptApis([
        osProfileDropdownPom.api.getOSResources,
      ]);

      cy.dataCy("header").contains("Infrastructure").click();
      cy.dataCy("aside", { timeout: 10 * 1000 })
        .contains("button", "Hosts")
        .click();
      cy.dataCy("registerHosts").click();

      const host = testProvisionHostData.hosts[0];

      addHostsFormPom.newHostNamePom.root
        .should("be.visible")
        .type(host.name, { force: true });
      addHostsFormPom.newSerialNumberPom.root
        .should("be.visible")
        .type(host.serialNumber);

      registerHostsPom.el.nextButton.click();

      cy.wait(3000);

      osProfileDropdownPom.dropdown.openDropdown(osProfileDropdownPom.root);
      osProfileDropdownPom.dropdown.selectFirstListItemValue();
    });
  });
});
