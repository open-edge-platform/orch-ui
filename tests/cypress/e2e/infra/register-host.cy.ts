/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  AddHostsFormPom,
  HostsPom,
  HostsTablePom,
  RegisterHostsPom,
} from "@orch-ui/infra-poms";
import { cyGet } from "@orch-ui/tests";
import { NetworkLog } from "../../support/network-logs";
import { EIM_USER } from "../../support/utilities";
import { deleteHostViaApi } from "../helpers";
import {
  isTestRegisterHostData,
  TestRegisterHostData,
} from "../helpers/eimTestRegisterHostData";

describe(`Infra smoke: the ${EIM_USER.username}`, () => {
  const netLog = new NetworkLog();
  const addHostsFormPom = new AddHostsFormPom();
  const registerHostsPom = new RegisterHostsPom();
  const hostsTablePom = new HostsTablePom();
  const hostsPom = new HostsPom();

  let testRegisterHostData: TestRegisterHostData,
    activeProject,
    registeredHostId: string;

  before(() => {
    const registerHostDataFile = "./cypress/e2e/infra/data/register-host.json";
    cy.readFile(registerHostDataFile, "utf-8").then((data) => {
      if (!isTestRegisterHostData(data)) {
        throw new Error(
          `Invalid test data in ${registerHostDataFile}: ${JSON.stringify(data)}`,
        );
      }
      testRegisterHostData = data;
    });
  });

  describe("when registering hosts", () => {
    beforeEach(() => {
      netLog.intercept();

      cy.login(EIM_USER);
      cy.visit("/");
      cy.currentProject().then((p) => (activeProject = p));
    });

    it("should sucessfully fill out form details and create a registered host", () => {
      cy.viewport(1920, 1080);

      cy.intercept({
        url: `/v1/projects/${activeProject}/compute/hosts?filter=*`,
      }).as("getHosts");

      cy.intercept({
        method: "POST",
        url: `/v1/projects/${activeProject}/compute/hosts/register`,
        times: 1,
      }).as("registerHost");

      // navigate to the register hosts page
      cy.dataCy("header").contains("Infrastructure").click();
      cy.dataCy("aside", { timeout: 10 * 1000 })
        .contains("button", "Hosts")
        .click();
      cyGet("registerHosts").click();
      cy.url().should("contain", "register-hosts");
      cy.wait("@getHosts");

      // fill in the form to register a new host
      addHostsFormPom.newHostNamePom.root
        .should("be.visible")
        .type(testRegisterHostData!.name);
      addHostsFormPom.newSerialNumberPom.root.type(
        testRegisterHostData!.serialNumber,
      );

      //isAutoOnboarded/isAutoProvisioned points to actual <input/> which is not visible,
      //need the next element which is the clickable <span/> to set them to false
      registerHostsPom.el.isAutoOnboarded.next().click();
      registerHostsPom.el.nextButton.click();

      // wait for the registered host id for deletion afterwards
      cy.wait("@registerHost").then((interception) => {
        expect(interception.response?.statusCode).to.equal(201);
        registeredHostId = interception.response?.body.resourceId;
      });

      // verify that the host is registered
      hostsPom.hostContextSwitcherPom.el.all.click();
      cy.wait("@getHosts");
      hostsTablePom.el.search
        .should("be.visible")
        .type(testRegisterHostData.serialNumber, { force: true });
      // allow the search to complete before we count the number of rows
      hostsTablePom.el.search.should(
        "have.value",
        testRegisterHostData.serialNumber,
      );
      hostsTablePom.getTableRows().should("have.length", 1);
    });

    afterEach(() => {
      if (registeredHostId) deleteHostViaApi(activeProject, registeredHostId);
      netLog.save();
      netLog.clear();
    });
  });
});
