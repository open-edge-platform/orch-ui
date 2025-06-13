/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  AddHostsFormPom,
  HostConfigPom,
  RegisterHostsPom,
} from "@orch-ui/infra-poms";
import { EIM_USER } from "@orch-ui/tests";
import { NetworkLog } from "../../support/network-logs";
import {
  createRegionViaAPi,
  createSiteViaApi,
  deleteHostInstanceViaApi,
  deleteHostViaApi,
  deleteRegionViaApi,
  deleteSiteViaApi,
} from "../helpers";
import {
  isTestProvisionHostData,
  TestProvisionHostData,
} from "../helpers/eimTestProvisionHostData";

describe(`Infra smoke: the ${EIM_USER.username}`, () => {
  const netLog = new NetworkLog();
  const addHostsFormPom = new AddHostsFormPom();
  const registerHostsPom = new RegisterHostsPom();
  const hostConfigPom = new HostConfigPom();

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

      cy.login(EIM_USER);
      cy.visit("/");
      cy.currentProject().then((p) => (activeProject = p));
    });

    it("should successfuly complete all steppersteps", () => {
      cy.viewport(1920, 1080);

      cy.intercept({
        method: "POST",
        url: `/v1/projects/${activeProject}/compute/hosts/register`,
        times: testProvisionHostData.hosts.length,
      }).as("registerHost");

      cy.intercept({
        method: "PATCH",
        url: `/v1/projects/${activeProject}/compute/hosts/host-*`,
        times: testProvisionHostData.hosts.length,
      }).as("updateHost");

      cy.intercept({
        method: "POST",
        url: `/v1/projects/${activeProject}/compute/instances`,
        times: testProvisionHostData.hosts.length,
      }).as("createInstance");

      createRegionViaAPi(activeProject, testProvisionHostData.region).then(
        (rid) => {
          regionId = rid;
          cy.log(
            `Created region ${testProvisionHostData.region} with id ${regionId}`,
          );
          createSiteViaApi(
            activeProject,
            regionId,
            testProvisionHostData.site,
          ).then((sid) => {
            siteId = sid;
            cy.log(
              `Created site ${testProvisionHostData.site} with id ${siteId}`,
            );
          });
        },
      );
      // navigate to the register hosts page
      cy.dataCy("header").contains("Infrastructure").click();
      cy.dataCy("aside", { timeout: 10 * 1000 })
        .contains("button", "Hosts")
        .click();
      cy.dataCy("registerHosts").click();

      testProvisionHostData.hosts.forEach((host, index) => {
        addHostsFormPom.newHostNamePom.root
          .should("be.visible")
          .type(host.name, { force: true });
        addHostsFormPom.newSerialNumberPom.root
          .should("be.visible")
          .type(host.serialNumber);
        if (index < testProvisionHostData.hosts.length - 1)
          addHostsFormPom.el.add.click();
      });

      registerHostsPom.el.isAutoProvisioned.next().click();
      registerHostsPom.el.nextButton.click();

      //Does all the work of going through the stepper
      cy.dataCy("textField").should("be.visible");
      hostConfigPom.provisionHost(
        testProvisionHostData.site,
        [],
        serialNumber !== undefined,
      );

      for (let i = 0; i < testProvisionHostData.hosts.length; i++) {
        cy.wait("@registerHost").then((interception) => {
          expect(interception.response?.statusCode).to.equal(200);
          provisionedHosts.push(interception.response?.body.resourceId);
        });

        cy.wait("@updateHost");

        cy.wait("@createInstance").then((interception) => {
          expect(interception.response?.statusCode).to.equal(200);
          instanceHosts.push(interception.response?.body.resourceId);
        });
      }
      cy.url().should("contain", "infrastructure/hosts");
    });

    afterEach(() => {
      // If we are using a serial number skip deletion until after the `verify-host` test
      if (serialNumber) return;

      instanceHosts.forEach((resourceId) => {
        deleteHostInstanceViaApi(activeProject, resourceId);
      });
      provisionedHosts.forEach((resourceId) => {
        deleteHostViaApi(activeProject, resourceId);
      });
      if (siteId) deleteSiteViaApi(activeProject, regionId, siteId);
      if (regionId) deleteRegionViaApi(activeProject, regionId);
      netLog.save("infra_provision-host");
      netLog.clear();
    });
  });
});
