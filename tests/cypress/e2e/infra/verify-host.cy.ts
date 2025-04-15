/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { TablePom } from "@orch-ui/components";
import { NetworkLog } from "../../support/network-logs";
import { EIM_USER } from "../../support/utilities";
import { getHostsViaApi, getRegionViaAPi, getSiteViaApi } from "../helpers";
import {
  isTestProvisionHostData,
  TestProvisionHostData,
} from "../helpers/eimTestProvisionHostData";

describe(`Infra smoke: the ${EIM_USER.username}`, () => {
  const netLog = new NetworkLog();
  const tablePom = new TablePom();

  let testVerifyHostData: TestProvisionHostData,
    serialNumber: string,
    activeProject: string,
    regionId: string,
    siteId: string,
    provisionedHosts: string[] = [],
    instanceHosts: string[] = [];

  before(() => {
    // If we have a Serial Number passed in we are testing with VEN in CI/CD, should only be one host
    serialNumber = Cypress.env("EN_SERIAL_NUMBER");
    if (serialNumber) {
      const verifyHostDataFile = "./cypress/e2e/infra/data/provision-host.json";
      cy.readFile(verifyHostDataFile, "utf-8").then((data) => {
        if (!isTestProvisionHostData(data)) {
          throw new Error(
            `Invalid test data in ${verifyHostDataFile}: ${JSON.stringify(data)}`,
          );
        }
        testVerifyHostData = data;
        testVerifyHostData.hosts = [testVerifyHostData.hosts[0]];
        testVerifyHostData.hosts[0].serialNumber = serialNumber;
      });
    }
  });

  describe("when verifying provisioned hosts", () => {
    beforeEach(() => {
      netLog.intercept();

      cy.login(EIM_USER);
      cy.visit("/");
      cy.currentProject().then((p) => (activeProject = p));
    });

    it("should see a host in provisioned state", () => {
      getHostsViaApi(activeProject).then((response) => {
        if (serialNumber) {
          const host = response.find(
            (host) => host.name === testVerifyHostData.hosts[0].name,
          );
          provisionedHosts.push(host?.resourceId!);
          instanceHosts.push(host?.instance?.resourceId!);
        } else {
          provisionedHosts.push(...response.map((host) => host.resourceId!));
          instanceHosts.push(
            ...response.map((host) => host.instance?.resourceId!),
          );
        }
      });

      getRegionViaAPi(activeProject, testVerifyHostData.region).then(
        (response) => {
          regionId = response.find(
            (region) => region.name === testVerifyHostData.region,
          )?.resourceId!;

          getSiteViaApi(activeProject, regionId, testVerifyHostData.site).then(
            (response) => {
              siteId = response.find(
                (site) => site.name === testVerifyHostData.site,
              )?.resourceId!;
            },
          );
        },
      );

      cy.dataCy("header").contains("Infrastructure").click();
      cy.dataCy("aside", { timeout: 10 * 1000 })
        .contains("button", "Hosts")
        .click();

      testVerifyHostData.hosts.forEach((host) => {
        tablePom.search(host.serialNumber);
        tablePom.getRows().should("have.length", 1);
        cy.contains(host.serialNumber).should("be.visible");
        tablePom
          .getCell(1, 3)
          .contains("Provisioned", { timeout: 10 * 60 * 1000 }) // it can take up to 10 minutes for the Host to be provisioned
          .should("contain.text", "Provisioned");
      });
    });

    afterEach(() => {
      // instanceHosts.forEach((resourceId) => {
      //   deleteHostInstanceViaApi(activeProject, resourceId);
      // });
      // provisionedHosts.forEach((resourceId) => {
      //   deleteHostViaApi(activeProject, resourceId);
      // });
      // deleteSiteViaApi(activeProject, regionId, siteId);
      // deleteRegionViaApi(activeProject, regionId);

      netLog.save("infra_verify-host");
      netLog.clear();
    });
  });
});
