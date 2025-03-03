import { TablePom } from "@orch-ui/components";
import * as _ from "lodash";
import { LocationsPom } from "../../../../apps/eim/src/components/pages/Locations/Locations.pom";
import RegionFormPom from "../../../../apps/eim/src/components/pages/region/RegionForm.pom";
import SiteFormPom from "../../../../apps/eim/src/components/pages/site/SiteForm.pom";
import UnconfiguredHostsPom from "../../../../apps/eim/src/components/pages/UnconfiguredHosts/UnconfiguredHosts.pom";
import { NetworkLog } from "../../support/network-logs";
import { EIM_USER } from "../../support/utilities";
import {
  createRegionViaAPi,
  createSiteViaApi,
  deleteRegionViaApi,
  deleteSiteViaApi,
  unconfigureHostViaApi,
} from "../helpers";

interface TestData {
  regions: {
    name: string;
    parentName?: string;
  }[];
  sites: {
    name: string;
    parentRegions: string[];
  }[];
  hostConfig: {
    region: string;
    site: string;
    hostName: string;
  };
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

describe("EIM Smoke test:", () => {
  const netLog = new NetworkLog();
  const locationsPom = new LocationsPom();
  const regionFormPom = new RegionFormPom();
  const siteFormPom = new SiteFormPom();
  const tablePom = new TablePom();
  const unconfigureHostsPom = new UnconfiguredHostsPom();

  let testData: TestData;

  before(() => {
    const dataFile =
      Cypress.env("DATA_FILE") || "./cypress/e2e/eim/data/eim-smoke.json";
    cy.readFile(dataFile, "utf-8").then((data) => {
      if (!isTestData(data)) {
        throw new Error(
          `Invalid test data in ${dataFile}: ${JSON.stringify(data)}`,
        );
      }
      testData = data;
    });
    if (!Cypress.env("EN_UUID")) {
      throw new Error(
        "Please set the EN UUID via CYPRESS_EN_UUID environment variable",
      );
    }
  });

  beforeEach(() => {
    netLog.intercept();
  });
  afterEach(() => {
    netLog.save();
    netLog.clear();
  });

  describe(`the ${EIM_USER.username}`, () => {
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
          if (!cy.isMockEnv()) {
            // check that the region has been created and save the id
            cy.wait("@createRegion").then((interception) => {
              expect(interception.response?.statusCode).to.equal(201);
              // NOTE that we store the IDs in reverse order to make it easier to delete them
              // (the last one created should be the first one delete to avoid dependencies)
              testRegionIds.unshift(interception.response?.body.regionID);
            });
          }
        });

        cy.url().should("contain", "locations");
        cy.reload(); // seems like this is required to get the latest regions?

        // create sites
        cy.intercept({
          method: "POST",
          url: `/v1/projects/${activeProject}/regions/*/sites`,
          times: testData.sites.length,
        }).as("createSite");
        _.forEach(testData.sites, (site) => {
          locationsPom.goToAddSite(site.parentRegions);
          siteFormPom.submit({ name: site.name });
          if (!cy.isMockEnv()) {
            // check that the site has been created and save the id
            cy.wait("@createSite").then((interception) => {
              expect(interception.response?.statusCode).to.equal(201);
              // NOTE that we store the IDs in reverse order to make it easier to delete them
              // (the last one created should be the first one delete to avoid dependencies)
              testSiteIds.unshift({
                siteId: interception.response?.body.siteID,
                regionId: interception.response?.body.regionId,
              });
            });
          }
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

    //TODO: needs to be reworked for new hosts page
    // npx cypress open --e2e --env EN_UUID=398395da-c10e-7c47-9b4f-efb34c0b261e
    describe("when managing Hosts", () => {
      let regionId: string,
        siteId: string,
        hostId: string,
        data: TestData["hostConfig"];
      const uuid = Cypress.env("EN_UUID");
      before(() => {
        data = testData.hostConfig;
      });

      it("should see a host in onboarded state", () => {
        // navigate to the onboarded hosts page
        cy.dataCy("header").contains("Infrastructure").click();
        cy.dataCy("aside", { timeout: 10 * 1000 })
          .contains("button", "Onboarded")
          .click();

        tablePom.search(uuid);

        cy.contains(uuid).should("be.visible");

        tablePom.getCell(1, 3).should("contain.text", "Running");
      });

      it("should configure a host", () => {
        createRegionViaAPi(activeProject, data.region).then((rid) => {
          regionId = rid;
          cy.log(`Created region ${data.region} with id ${regionId}`);
          createSiteViaApi(activeProject, regionId, data.site).then((sid) => {
            siteId = sid;
            cy.log(`Created site ${data.site} with id ${siteId}`);
          });
        });

        // navigate to the onboarded hosts page
        cy.dataCy("header").contains("Infrastructure").click();
        cy.dataCy("aside", { timeout: 10 * 1000 })
          .contains("button", "Onboarded")
          .click();

        tablePom.search(uuid);

        unconfigureHostsPom.tablePom.getHostCheckboxByName(uuid).click();
        unconfigureHostsPom.el.ribbonButtonconfigure.click();
        cy.contains("Configure Host").should("be.visible");

        cy.intercept({
          method: "PATCH",
          url: `/v1/projects/${activeProject}/compute/hosts/*`,
          times: 1,
        }).as("patchHost");
        unconfigureHostsPom.hostConfigPom.configureHost(
          data.site,
          data.hostName,
          [],
        );
        cy.wait("@patchHost").then((interception) => {
          expect(interception.response?.statusCode).to.equal(200);
          hostId = interception.response?.body.resourceId;
        });

        cy.url().should("contain", "infrastructure/unassigned-hosts");
      });

      after(() => {
        if (hostId) {
          unconfigureHostViaApi(activeProject, hostId);
        }
        if (siteId) {
          deleteSiteViaApi(activeProject, regionId, siteId);
        }
        if (regionId) {
          deleteRegionViaApi(activeProject, regionId);
        }
      });
    });
  });
});
