/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { EIM_USER } from "@orch-ui/tests";
import * as _ from "lodash";
import { LocationsPom } from "../../../../apps/infra/src/components/pages/Locations/Locations.pom";
import RegionFormPom from "../../../../apps/infra/src/components/pages/region/RegionForm.pom";
import SiteFormPom from "../../../../apps/infra/src/components/pages/site/SiteForm.pom";
import { NetworkLog } from "../../support/network-logs";
import { deleteRegionViaApi, deleteSiteViaApi } from "../helpers";

interface TestData {
  regions: {
    name: string;
    parentName?: string;
  }[];
  sites: {
    name: string;
    parentRegions: string[];
  }[];
}

function isTestData(arg: any): arg is TestData {
  if (!arg.regions || !Array.isArray(arg.regions)) return false;
  _.forEach(arg.regions, (region) => {
    if (!region.name) {
      return false;
    }
  });
  _.forEach(arg.sites, (s) => {
    if (!s.name || !s.parentRegions || s.parentRegions.length === 0) {
      return false;
    }
  });
  if (
    !arg.hostConfig ||
    !arg.hostConfig.region ||
    !arg.hostConfig.site ||
    !arg.hostConfig.hostName
  ) {
    return false;
  }

  return true;
}

const netLog = new NetworkLog();
const locationsPom = new LocationsPom();
const regionFormPom = new RegionFormPom();
const siteFormPom = new SiteFormPom();

let testData: TestData;

before(() => {
  const dataFile =
    Cypress.env("DATA_FILE") || "./cypress/e2e/infra/data/locations.json";
  cy.readFile(dataFile, "utf-8").then((data) => {
    if (!isTestData(data)) {
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
  netLog.save("infra_locations");
  netLog.clear();
});

describe(`Infra smoke: the ${EIM_USER.username}`, () => {
  let activeProject: string;
  beforeEach(() => {
    cy.login(EIM_USER);
    cy.visit("/");
    cy.currentProject().then((p) => (activeProject = p));
  });
  describe("when managing Locations", () => {
    const testRegionIds: string[] = [];
    const testSiteIds: { siteId: string; regionId: string }[] = [];
    it("should create Regions and Sites", () => {
      // navigate to the location page and then to the form
      cy.dataCy("header").contains("Infrastructure").click();
      cy.dataCy("aside", { timeout: 10 * 1000 })
        .contains("button", "Locations")
        .click();

      // create the regions
      cy.intercept({
        method: "POST",
        url: `**/v1/projects/${activeProject}/regions`,
        times: testData.regions.length,
      }).as("createRegion");
      _.forEach(testData.regions, (region) => {
        cy.dataCy("locations").contains("Locations").should("be.visible");
        if (!region.parentName) {
          locationsPom.gotoAddNewRegion();
          regionFormPom.submit(region);
        } else {
          locationsPom.goToAddSubRegion(region.parentName);
          regionFormPom.submit(region);
        }

        // check that the region has been created and save the id
        cy.wait("@createRegion").then((interception) => {
          expect(
            interception.response?.statusCode,
            "Failed to create region: " +
              JSON.stringify(interception.response?.body),
          ).to.equal(200);
          // NOTE that we store the IDs in reverse order to make it easier to delete them
          // (the last one created should be the first one delete to avoid dependencies)
          testRegionIds.unshift(interception.response?.body.regionID);
        });
      });

      cy.url().should("contain", "locations");
      cy.reload(); // seems like this is required to get the latest regions?
      cy.wait(5000);
      // create sites
      cy.intercept({
        method: "POST",
        url: `/v1/projects/${activeProject}/regions/*/sites`,
        times: testData.sites.length,
      }).as("createSite");
      _.forEach(testData.sites, (site) => {
        locationsPom.goToAddSite(site.parentRegions);
        siteFormPom.submit({ name: site.name });

        // check that the site has been created and save the id
        cy.wait("@createSite").then((interception) => {
          expect(
            interception.response?.statusCode,
            "Failed to create site" +
              JSON.stringify(interception.response?.body),
          ).to.equal(200);
          // NOTE that we store the IDs in reverse order to make it easier to delete them
          // (the last one created should be the first one delete to avoid dependencies)
          testSiteIds.unshift({
            siteId: interception.response?.body.siteID,
            regionId: interception.response?.body.regionId,
          });
        });
      });
    });
    after(() => {
      _.forEach(testSiteIds, (s) => {
        deleteSiteViaApi(activeProject, s.regionId, s.siteId);
      });
      _.forEach(testRegionIds, (testRegionId) => {
        deleteRegionViaApi(activeProject, testRegionId);
      });
    });
  });
});
