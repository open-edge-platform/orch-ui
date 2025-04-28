/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { CyApiDetails, CyPom, defaultActiveProject } from "@orch-ui/tests";

import { MetadataFormPom } from "@orch-ui/components";
import {
  assignedWorkloadHostTwo as hostTwo,
  HostStore,
  InstanceStore,
  RegionStore,
  siteSantaClara,
  SiteStore,
} from "@orch-ui/utils";

import { mbApi } from "@orch-ui/apis";

const metadataRoute = "**/v1/projects/**/metadata";

const dataCySelectors = [
  "hostEditHeader",
  "nameInput",
  "regionCombobox",
  "siteCombobox",
  "hostEditHostLabels",
  "updateHostButton",
  "hostLocationControls",
] as const;
type Selectors = (typeof dataCySelectors)[number];

// Routes
const hostDetailRoute = `**/v1/projects/${defaultActiveProject.name}/compute/hosts/**`;
const siteByIdRoute = `**/v1/projects/${defaultActiveProject.name}/regions/**/sites/**`;
const sitesRoute = `**/v1/projects/${defaultActiveProject.name}/regions/**/sites?*`;
const regionsRoute = `**/v1/projects/${defaultActiveProject.name}/regions?*`;
const instanceRoute = `**/v1/projects/${defaultActiveProject.name}/compute/instances?*`;

// API Intercepts types
type HostApiAliases =
  | "hostSuccess"
  | "hostWithoutSite"
  | "hostWithoutMetadata"
  | "updateHostSuccess"
  | "hostUpdatedSuccess";
type SiteApiAliases = "siteByIdSuccess" | "sitesSuccess" | "sitesEmpty";
type RegionApiAliases = "regionsSuccess" | "regionsEmpty";
type MetadataApiAliases = "updateMetadataSuccess";
type InstanceApiAliases = "getInstances" | "getInstancesEmpty";
type ErrorApiAliases =
  | "hostNotFound"
  | "siteByIdNotFound"
  | "updateHostError"
  | "updateMetadataError"
  | "getInstances500";
type ApiAliases =
  | ErrorApiAliases
  | SiteApiAliases
  | MetadataApiAliases
  | RegionApiAliases
  | HostApiAliases
  | InstanceApiAliases;

type HostEditApiResponseType =
  | infra.Host
  | infra.GetV1ProjectsByProjectNameRegionsAndRegionIdSitesApiResponse
  | infra.GetV1ProjectsByProjectNameRegionsAndRegionIdSitesSiteIdApiResponse
  | infra.GetV1ProjectsByProjectNameRegionsApiResponse
  | infra.GetV1ProjectsByProjectNameComputeInstancesApiResponse
  | mbApi.MetadataList;
const getApiEndpoints = (
  hostId = HostEditPom.testHost.resourceId,
): CyApiDetails<ApiAliases, HostEditApiResponseType> => {
  // Get Host
  const mockHost = new HostStore().get(hostId!);

  if (!mockHost || !mockHost) {
    throw Error(`no host found with ${hostId}`);
  }
  // Note: Host Edit is not applied on Unconfigured host. Hence this will not happen.
  if (!mockHost.site) {
    throw Error(`no site found in host in ${mockHost?.resourceId}`);
  }
  const mockSite = new SiteStore().get(mockHost.site.siteID ?? "");

  // Mock response creation
  const mockHostNoMetadata = structuredClone(mockHost);
  mockHostNoMetadata.metadata = [];
  mockHostNoMetadata.inheritedMetadata = { location: [] };

  const mockHostNoSite = structuredClone(mockHost);
  mockHostNoSite.site = undefined;

  const mockHostUpdated = structuredClone(mockHost);

  const newHostName = "Host name updated";
  mockHostUpdated.name = newHostName;
  mockHostUpdated.metadata = mockHost.metadata?.concat({
    key: "environment",
    value: "production",
  });

  /* --- Api Intercept Definitions starts here --- */
  const successHostEndpoints: CyApiDetails<HostApiAliases, infra.Host> = {
    hostSuccess: {
      route: hostDetailRoute,
      response: mockHost,
    },
    hostWithoutSite: {
      route: hostDetailRoute,
      response: mockHostNoSite,
    },
    hostWithoutMetadata: {
      route: hostDetailRoute,
      response: mockHostNoMetadata,
    },
    updateHostSuccess: {
      method: "PUT",
      route: hostDetailRoute,
      response: mockHostUpdated,
    },
    hostUpdatedSuccess: {
      route: hostDetailRoute,
      response: mockHostUpdated,
    },
  };

  const successMetadataEndpoints: CyApiDetails<
    MetadataApiAliases,
    mbApi.MetadataList
  > = {
    updateMetadataSuccess: {
      method: "POST",
      route: metadataRoute,
      statusCode: 200,
      response: {
        metadata:
          mockHost.metadata?.concat({
            key: "environment",
            value: "production",
          }) ?? [],
      },
    },
  };

  const successSiteEndpoints: CyApiDetails<
    SiteApiAliases,
    | infra.GetV1ProjectsByProjectNameRegionsAndRegionIdSitesApiResponse
    | infra.GetV1ProjectsByProjectNameRegionsAndRegionIdSitesSiteIdApiResponse
  > = {
    siteByIdSuccess: {
      route: siteByIdRoute,
      response: mockSite,
    },
    sitesSuccess: {
      route: sitesRoute,
      response: {
        hasNext: false,
        sites: new SiteStore().list(),
        totalElements: 6,
      },
    },
    sitesEmpty: {
      route: sitesRoute,
      response: { hasNext: false, sites: [], totalElements: 0 },
    },
  };

  const successRegionEndpoints: CyApiDetails<
    RegionApiAliases,
    infra.GetV1ProjectsByProjectNameRegionsApiResponse
  > = {
    regionsSuccess: {
      route: regionsRoute,
      response: {
        hasNext: false,
        regions: new RegionStore().list(),
        totalElements: 9,
      },
    },
    regionsEmpty: {
      route: regionsRoute,
      response: { hasNext: false, regions: [], totalElements: 0 },
    },
  };

  const successInstanceEndpoints: CyApiDetails<
    InstanceApiAliases,
    infra.GetV1ProjectsByProjectNameComputeInstancesApiResponse
  > = {
    getInstances: {
      route: instanceRoute,
      statusCode: 200,
      response: {
        hasNext: false,
        instances: new InstanceStore().list(),
        totalElements: 9,
      },
    },
    getInstancesEmpty: {
      route: instanceRoute,
      response: { hasNext: false, instances: [], totalElements: 0 },
    },
  };

  const errorApiEndpoints: CyApiDetails<ErrorApiAliases> = {
    hostNotFound: {
      route: hostDetailRoute,
      statusCode: 404,
      response: { details: "error", status: 404 },
    },
    updateHostError: {
      method: "PUT",
      route: hostDetailRoute,
      statusCode: 500,
    },
    updateMetadataError: {
      method: "POST",
      route: metadataRoute,
      statusCode: 500,
    },
    siteByIdNotFound: {
      route: siteByIdRoute,
      statusCode: 404,
      response: { details: "error: site not found", status: 404 },
    },
    getInstances500: {
      route: instanceRoute,
      statusCode: 500,
      networkError: true,
    },
  };

  return {
    ...successHostEndpoints,
    ...successMetadataEndpoints,
    ...successSiteEndpoints,
    ...successRegionEndpoints,
    ...successInstanceEndpoints,
    ...errorApiEndpoints,
  };
};

export class HostEditPom extends CyPom<Selectors, ApiAliases> {
  public static testHost = hostTwo;
  public static testSite = siteSantaClara;

  public hostMetadata: MetadataFormPom;

  constructor(public rootCy: string = "hostEdit") {
    const endpoints = getApiEndpoints();
    super(rootCy, [...dataCySelectors], endpoints);
    this.hostMetadata = new MetadataFormPom();
  }
}
