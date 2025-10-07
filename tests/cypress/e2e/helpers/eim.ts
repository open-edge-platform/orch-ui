/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import * as _ from "lodash";
import Chainable = Cypress.Chainable;
export const validateEimTab = () => {
  cy.dataCy("header").should("not.contain.text", "Applications");
  cy.dataCy("header").should("contain.text", "Infrastructure");
};

export const validateEimTabFailed = () => {
  cy.dataCy("header").should("contain.text", "Applications");
  cy.dataCy("header").should("contain.text", "Infrastructure");
};

export const createRegionViaAPi = (
  project: string,
  regionName: string,
): Chainable<string> => {
  return cy
    .authenticatedRequest<infra.RegionResourceRead>({
      method: "POST",
      url: `/v1/projects/${project}/regions`,
      body: {
        name: regionName,
      },
    })
    .then((response) => {
      expect(
        response.status,
        "Failed to create region" + JSON.stringify(response.body),
      ).to.equal(200);
      return cy.wrap(response.body.resourceId!);
    });
};

export const getRegionViaAPi = (
  project: string,
  regionName: string,
): Chainable<infra.RegionResourceRead[]> => {
  return cy
    .authenticatedRequest<infra.ListRegionsResponseRead>({
      method: "GET",
      url: `/v1/projects/${project}/regions`,
      body: {
        name: regionName,
      },
    })
    .then((response) => {
      expect(response.status).to.equal(200);

      return cy.wrap(response.body.regions);
    });
};

export const createSiteViaApi = (
  project: string,
  regionId: string,
  siteName: string,
): Chainable<string> => {
  return cy
    .authenticatedRequest<infra.SiteResourceRead>({
      method: "POST",
      url: `/v1/projects/${project}/regions/${regionId}/sites`,
      body: {
        name: siteName,
        regionId: regionId,
      },
    })
    .then((response) => {
      const success = response.status === 201 || response.status === 200;
      expect(
        success,
        `Failed to create site (status: ${response.status})` +
          JSON.stringify(response.body),
      ).to.be.true;
      return cy.wrap(response.body.resourceId!);
    });
};

export const getSiteViaApi = (
  project: string,
  regionId: string,
  siteName: string,
): Chainable<infra.SiteResourceRead[]> => {
  return cy
    .authenticatedRequest<infra.ListSitesResponse>({
      method: "GET",
      url: `/v1/projects/${project}/regions/${regionId}/sites`,
      body: {
        name: siteName,
        regionId: regionId,
      },
    })
    .then((response) => {
      const success = response.status === 200;
      expect(success).to.be.true;
      return cy.wrap(response.body.sites);
    });
};

export const deleteRegionViaApi = (project: string, regionId: string) => {
  cy.authenticatedRequest({
    method: "DELETE",
    url: `/v1/projects/${project}/regions/${regionId}`,
  }).then((response) => {
    // we only care that the created region is  not there,
    // if the test failed before creating it we're fine with a 404
    const success =
      response.status === 204 ||
      response.status === 404 ||
      response.status === 200;
    expect(success).to.be.true;
  });
};

export const deleteSiteViaApi = (
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
    const success =
      response.status === 204 ||
      response.status === 404 ||
      response.status === 200;
    expect(success).to.be.true;
  });
};

export const deleteHostInstanceViaApi = (
  project: string,
  instanceId: string,
) => {
  cy.authenticatedRequest({
    method: "DELETE",
    url: `/v1/projects/${project}/compute/instances/${instanceId}`,
  }).then((response) => {
    const success =
      response.status === 204 ||
      response.status === 404 ||
      response.status === 200;
    expect(success).to.be.true;
  });
};

export const deleteHostViaApi = (project: string, hostId: string) => {
  cy.authenticatedRequest({
    method: "DELETE",
    url: `/v1/projects/${project}/compute/hosts/${hostId}`,
  }).then((response) => {
    const success =
      response.status === 204 ||
      response.status === 404 ||
      response.status === 200;
    expect(success).to.be.true;
  });
};

export const deleteClusterViaApi = (project: string, clusterName: string) => {
  cy.authenticatedRequest({
    method: "DELETE",
    url: `v2/projects/${project}/clusters/${clusterName}`,
  }).then((response) => {
    const success =
      response.status === 204 ||
      response.status === 404 ||
      response.status === 200;
    expect(success).to.be.true;
  });
};

export const unconfigureHostViaApi = (project: string, hostId: string) => {
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
      "timestamps",
      "hostStatusIndicator",
      "hostStatusTimestamp",
      "onboardingStatusIndicator",
      "onboardingStatusTimestamp",
      "registrationStatusIndicator",
      "registrationStatusTimestamp",
      "provider",
      "amtSku",
      "amtStatus",
      "amtStatusTimestamp",
      "bmcIp",
      "inheritedMetadata",
      "powerOnTime",
      "powerStatus",
      "powerStatusIndicator",
      "powerStatusTimestamp",
      "userLvmSize"
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

export const configureHostViaAPI = (
  project: string,
  hostName: string,
  hostId: string,
  siteId: string,
  metadata?: { key: string; value: string }[],
) => {
  cy.authenticatedRequest({
    method: "PATCH",
    url: `/v1/projects/${project}/compute/hosts/${hostId}`,
    body: { name: hostName, siteId: siteId, metadata: metadata },
  }).then((response) => {
    expect(response.status).to.equal(200);
  });
};

export const getHostsViaApi = (project): Chainable => {
  const onBoardedHostsFilter =
    "%28currentState%3DHOST_STATE_ONBOARDED%20AND%20has%28instance%29%29";

  return cy
    .authenticatedRequest({
      method: "GET",
      url: `/v1/projects/${project}/compute/hosts?filter=${onBoardedHostsFilter}`,
    })
    .then((response) => {
      expect(response.status).to.equal(200);
      return cy.wrap(response.body.hosts);
    });
};
