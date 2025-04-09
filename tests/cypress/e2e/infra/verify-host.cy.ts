/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { TablePom } from "@orch-ui/components";
import { NetworkLog } from "../../support/network-logs";
import { EIM_USER } from "../../support/utilities";
import {
  deleteHostInstanceViaApi,
  deleteHostViaApi,
  deleteRegionViaApi,
  deleteSiteViaApi,
  getRegionViaAPi,
  getSiteViaApi,
} from "../helpers";
import {
  isTestVerifyHostData,
  TestVerifyHostData,
} from "../helpers/eimTestVerifyHostData";

describe(`Infra smoke: the ${EIM_USER.username}`, () => {
  const netLog = new NetworkLog();
  const tablePom = new TablePom();

  let testVerifyHostData: TestVerifyHostData, 
  serialNumber: string,
    activeProject: string,
    regionId: string,
    siteId: string,
    provisionedHosts: string[] = [],
    instanceHosts: string[] = [];

  before(() => {
    const verifyHostDataFile = "./cypress/e2e/infra/data/verify-host.json";
    cy.readFile(verifyHostDataFile, "utf-8").then((data) => {
      if (!isTestVerifyHostData(data)) {
        throw new Error(
          `Invalid test data in ${verifyHostDataFile}: ${JSON.stringify(data)}`,
        );
      }
      testVerifyHostData = data;
    });


    serialNumber = Cypress.env("EN_SERIAL_NUMBER");
    if (!serialNumber) {
      throw new Error(
        "Please set the serial number via CYPRESS_EN_SERIAL_NUMBER environment variable",
      );
    }
  });

  describe("when provisioning hosts", () => {
    beforeEach(() => {
      netLog.intercept();

      cy.login(EIM_USER);
      cy.visit("/");
      cy.currentProject().then((p) => (activeProject = p));
    });

    //TODO: Ensure it works with VEN once it is available
    it("should see a host in provisioned state", () => {
      getRegionViaAPi(activeProject, testVerifyHostData.region).then((response) => {
        console.log("Regions result", response);
        regionId = response.find(
          (region) => region.name === testVerifyHostData.region,
        )?.resourceId!;

        getSiteViaApi(activeProject, regionId, testVerifyHostData.site).then((response) => {
          console.log("Sites result", response);
          siteId = response.find(
            (site) => site.name === testVerifyHostData.site,
          )?.resourceId!;
        });
     
      });

      cy.dataCy("header").contains("Infrastructure").click();
      cy.dataCy("aside", { timeout: 10 * 1000 })
        .contains("button", "Hosts")
        .click();
      tablePom.search(serialNumber);

      tablePom.getRows().should("have.length", 1);
      cy.contains(serialNumber).should("be.visible");
      tablePom.getCell(1, 3).should("contain.text", "Provisioned");
    });

    afterEach(() => {
      cy.log("regionId & siteId to be deleted", regionId, siteId);
      deleteSiteViaApi(activeProject, regionId, siteId);
      deleteRegionViaApi(activeProject, regionId);
      netLog.save();
      netLog.clear();
    });
  });
});
