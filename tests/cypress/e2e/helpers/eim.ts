import * as _ from "lodash";
import { eim } from "../../../../library/apis";
import Chainable = Cypress.Chainable;

export const validateEimTab = () => {
  cy.dataCy("header").should("not.contain.text", "Applications");
  cy.dataCy("header").should("contain.text", "Infrastructure");
};

export const validateEimTabFailed = () => {
  cy.dataCy("header").should("contain.text", "Applications");
  cy.dataCy("header").should("contain.text", "Infrastructure");
};

export const createRegion = (
  project: string,
  regionName: string,
): Chainable<string> => {
  return cy
    .authenticatedRequest<eim.RegionRead>({
      method: "POST",
      url: `/v1/projects/${project}/regions`,
      body: {
        name: regionName,
      },
    })
    .then((response) => {
      const success = response.status === 201;
      expect(success).to.be.true;
      return cy.wrap(response.body.resourceId!);
    });
};

export const createSite = (
  project: string,
  regionId: string,
  siteName: string,
): Chainable<string> => {
  return cy
    .authenticatedRequest<eim.SiteRead>({
      method: "POST",
      url: `/v1/projects/${project}/regions/${regionId}/sites`,
      body: {
        name: siteName,
        regionId: regionId,
      },
    })
    .then((response) => {
      const success = response.status === 201;
      expect(success).to.be.true;
      return cy.wrap(response.body.resourceId!);
    });
};

export const deleteRegion = (project: string, regionId: string) => {
  cy.authenticatedRequest({
    method: "DELETE",
    url: `/v1/projects/${project}/regions/${regionId}`,
  }).then((response) => {
    // we only care that the created region is  not there,
    // if the test failed before creating it we're fine with a 404
    const success = response.status === 204 || response.status === 404;
    expect(success).to.be.true;
  });
};

export const deleteSite = (
  project: string,
  regionId: string,
  siteId: string,
) => {
  cy.authenticatedRequest({
    method: "DELETE",
    url: `/v1/projects/${project}/regions/${regionId}/sites/${siteId}`,
  }).then((response) => {
    // we only care that the created region is  not there,
    // if the test failed before creating it we're fine with a 404
    const success = response.status === 204 || response.status === 404;
    expect(success).to.be.true;
  });
};

export const unconfigureHost = (project: string, hostId: string) => {
  cy.authenticatedRequest({
    method: "GET",
    url: `/v1/projects/${project}/compute/hosts/${hostId}`,
  }).then((response) => {
    const host = response.body;

    // remove all readonly props from the Host
    const readOnlyProps = [
      "resourceId",
      "instance",
      "hostStorages",
      "site",
      "state",
      "biosReleaseDate",
      "biosVendor",
      "biosVersion",
      "cpuArchitecture",
      "cpuCapabilities",
      "cpuCores",
      "cpuModel",
      "cpuSockets",
      "cpuThreads",
      "cpuTopology",
      "hostGpus",
      "hostNics",
      "hostStatus",
      "hostUsbs",
      "hostname",
      "memoryBytes",
      "note",
      "productName",
      "providerStatus",
      "providerStatusDetail",
      "serialNumber",
      "indicator",
      "message",
      "status",
      "onboardingStatus",
      "registrationStatus",
      "uuid",
      "licenseExpirationTimestamp",
      "licenseStatus",
      "licenseStatusIndicator",
      "licenseStatusTimestamp",
    ];

    _.forEach(readOnlyProps, (prop) => {
      delete host[prop];
    });

    // remove site and name
    delete host.siteId;
    host.name = "";

    cy.authenticatedRequest({
      method: "PUT",
      url: `/v1/projects/${project}/compute/hosts/${hostId}`,
      body: host,
    }).then((response) => {
      expect(response.status).to.equal(200);
    });
  });
};
