/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { CyApiDetails, CyPom, defaultActiveProject } from "@orch-ui/tests";
import {
  hostNoName,
  hostTwo,
  instanceTwo,
  repeatedScheduleOne,
  SiteStore,
} from "@orch-ui/utils";

import { eim } from "@orch-ui/apis";

import { MetadataDisplayPom } from "@orch-ui/components";
import HostDetailsActionsPom from "../../organism/hosts/HostDetailsActions/HostDetailsActions.pom";
import HostDetailsTabPom from "../../organism/hosts/HostDetailsTab/HostDetailsTab.pom";

const metadataRoute = "**/v1/projects/**/metadata";
const dataCySelectors = [
  "iaasHostDetailsHeader",
  "iaasHostDetailsSite",
  "iaasHostDetailsMaintenanceBanner",
  "iaasHostDetailsHostDescriptionTable",
  "iaasHostDetailsDeploymentMetadata",
  "guid",
  "serial",
  "osProfiles",
  "site",
  "provider",
  "licenseExpireDateString",
  "licenseNearExpiryNotice",
] as const;
type Selectors = (typeof dataCySelectors)[number];

type ApiAliases =
  | "hostSuccess"
  | "hostNoNameSuccess"
  | "hostUuidSuccess"
  | "hostSuccessNoHostLabels"
  | "hostEmptySite"
  | "hostNotFound"
  | "hostUpdate"
  | "siteSuccess"
  | "siteNotFound"
  | "postMetadata"
  | "getMetadata"
  | "getEmptyHostSchedules"
  | "getHostSchedules"
  | "deleteHostSchedule"
  | "instanceSuccess"
  | "getHostRepeatedSchedules";

type LicenseApiAliases =
  | "hostWithNoLicenseInfo"
  | "hostWithErrorMissingLicense"
  | "hostWithErrorServerNotFoundLicense"
  | "hostWithActiveLicense"
  | "hostWithActiveLicenseWithoutExpiry"
  | "hostWithActiveLicenseForMockOnly";

const hostDetailRoute = (hostId: string) =>
  `**/v1/projects/${defaultActiveProject.name}/compute/hosts/${hostId}`;
const sitesRoute = `**/v1/projects/${defaultActiveProject.name}/regions/**/sites?*`;
export const mockHost = hostTwo;
const mockHostNoHostLabels = structuredClone(mockHost);
mockHostNoHostLabels.metadata = [];

const mockHostNoSite = structuredClone(mockHost);
mockHostNoSite.site = undefined;

// Maintenance Schedule test mock
const emptyResponse = {
  SingleSchedules: [],
  RepeatedSchedules: [],
};
const schedule123: eim.SingleSchedule2 = {
  scheduleStatus: "SCHEDULE_STATUS_MAINTENANCE",
  name: "schedule123",
  startSeconds: 1688148856,
  targetHost: mockHost,
  //singleScheduleID: "schedule_123",
};

const singleScheduleMock = {
  SingleSchedules: [schedule123],
  RepeatedSchedules: [],
};

const repeatedScheduleMock = {
  SingleSchedules: [],
  RepeatedSchedules: [repeatedScheduleOne],
};

const getApiEndpoints = (hostId: string): CyApiDetails<ApiAliases> => {
  const route = hostDetailRoute(hostId);

  return {
    // Host mock
    hostSuccess: {
      route: route,
      response: mockHost,
    },
    hostNoNameSuccess: {
      route: route,
      response: hostNoName,
    },
    hostUuidSuccess: {
      route: `**/v1/projects/${defaultActiveProject.name}/compute/hosts?**`,
      response: {
        hasNext: false,
        hosts: [mockHost],
        totalElements: 1,
      } as eim.GetV1ProjectsByProjectNameComputeHostsApiResponse,
    },
    hostSuccessNoHostLabels: {
      route: route,
      response: mockHostNoHostLabels,
    },
    hostEmptySite: {
      route: route,
      response: mockHostNoSite,
    },
    hostNotFound: {
      route: route,
      response: { data: "error" },
    },
    hostUpdate: {
      method: "PUT",
      route: route,
      response: mockHost,
    },
    // Metadata mock
    getMetadata: {
      route: metadataRoute,
      statusCode: 200,
    },
    postMetadata: {
      route: metadataRoute,
      method: "POST",
      statusCode: 200,
    },
    // Site mock
    siteSuccess: {
      route: sitesRoute,
      response: { sites: new SiteStore().list() },
    },
    siteNotFound: {
      route: sitesRoute,
      response: {
        detail:
          'rpc error: code = NotFound desc = No resources found for filter: client_uuid:"e360ebac-80b9-48e6-9f73-f06c5eddfca7" filter:{kind:RESOURCE_KIND_SITE limit:20}',
        status: 404,
      },
      statusCode: 404,
    },
    // Maintenance mock
    getEmptyHostSchedules: {
      route: "**/schedules*",
      statusCode: 200,
      response: emptyResponse,
    },
    getHostSchedules: {
      route: "**/schedules*",
      statusCode: 200,
      response: singleScheduleMock,
    },
    getHostRepeatedSchedules: {
      route: "**/schedules*",
      statusCode: 200,
      response: repeatedScheduleMock,
    },
    deleteHostSchedule: {
      method: "DELETE",
      route: "**/schedules/single/*",
      statusCode: 200,
    },
    // Instance
    instanceSuccess: {
      route: "**/instances*",
      statusCode: 200,
      response: {
        instances: [instanceTwo],
        has_next: false,
      },
    },
  };
};

export class HostDetailsPom extends CyPom<
  Selectors,
  ApiAliases | LicenseApiAliases
> {
  public hostAction: HostDetailsActionsPom;
  public medataBadge: MetadataDisplayPom;
  public hostDetailsTab: HostDetailsTabPom;
  // public addToClusterPom: AddToClusterDrawerPom;

  constructor(
    public hostId: string = "*",
    public rootCy: string = "iaasHostDetails",
  ) {
    const endpoints = getApiEndpoints(hostId);
    super(rootCy, [...dataCySelectors], { ...endpoints });
    this.hostAction = new HostDetailsActionsPom();
    this.medataBadge = new MetadataDisplayPom(
      "iaasHostDetailsDeploymentMetadata",
    );
    this.hostDetailsTab = new HostDetailsTabPom();
    // this.addToClusterPom = new AddToClusterDrawerPom();
  }
}
