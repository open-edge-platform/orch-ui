/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import { MetadataDisplayPom } from "@orch-ui/components";
import { CyApiDetails, CyPom, defaultActiveProject } from "@orch-ui/tests";
import {
  assignedWorkloadHostTwo as hostTwo,
  repeatedScheduleOne,
  SiteStore,
} from "@orch-ui/utils";
import HostDetailsActionsPom from "../../organism/hosts/HostDetailsActions/HostDetailsActions.pom";
import HostDetailsTabPom from "../../organism/hosts/HostDetailsTab/HostDetailsTab.pom";

const metadataRoute = "**/v1/projects/**/metadata";
const dataCySelectors = [
  "infraHostDetailsHeader",
  "infraHostDetailsPowerStatus",
  "infraHostDetailsSite",
  "infraHostDetailsMaintenanceBanner",
  "infraHostDetailsHostDescriptionTable",
  "infraHostDetailsDeploymentMetadata",
  "infraHostDetailsStartBtn",
  "infraHostDetailsRestartBtn",
  "infraHostDetailsStopBtn",
  "osUpdateAvailable",
  "guid",
  "serial",
  "osProfiles",
  "site",
  "trustedCompute",
  "provider",
] as const;
type Selectors = (typeof dataCySelectors)[number];

type ApiAliases =
  | "hostSuccess"
  | "hostSuccessWithOsData"
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
export const hostNoName: infra.HostResourceRead = {
  ...mockHost,
  name: "",
};

// Maintenance Schedule test mock
const emptyResponse = {
  singleSchedules: [],
  repeatedSchedules: [],
};
const schedule123: infra.SingleScheduleResource = {
  scheduleStatus: "SCHEDULE_STATUS_MAINTENANCE",
  name: "schedule123",
  startSeconds: 1688148856,
  targetHost: mockHost,
  //singleScheduleID: "schedule_123",
};

const singleScheduleMock = {
  singleSchedules: [schedule123],
  repeatedSchedules: [],
};

const repeatedScheduleMock = {
  singleSchedules: [],
  repeatedSchedules: [repeatedScheduleOne],
};

const getApiEndpoints = (hostId: string): CyApiDetails<ApiAliases> => {
  const route = hostDetailRoute(hostId);

  return {
    // Host mock
    hostSuccess: {
      route: route,
      response: mockHost,
    },
    hostSuccessWithOsData: {
      route: route,
      response: {
        ...mockHost,
        instance: {
          ...mockHost.instance,
          // data for backward compatibility
          currentOs: {
            resourceId: "os-current",
            name: "CurrentOS",
            sha256: "CurrentOSSHA256",
            updateSources: ["CurrentOSUpdateSourceName"],
            osType: "OS_TYPE_IMMUTABLE",
          },
          desiredOs: {
            resourceId: "os-desired",
            name: "DesiredOS",
            sha256: "DesiredOSSHA256",
            updateSources: ["DesiredOSUpdateSourceName"],
          },
          os: {
            name: "OS",
            sha256: "OSSHA256",
            updateSources: ["OSUpdateSourceName"],
          },
        },
      },
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
      },
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
  };
};

export class HostDetailsPom extends CyPom<
  Selectors,
  ApiAliases | LicenseApiAliases
> {
  public hostAction: HostDetailsActionsPom;
  public medataBadge: MetadataDisplayPom;
  public hostDetailsTab: HostDetailsTabPom;

  constructor(
    public hostId: string = "*",
    public rootCy: string = "infraHostDetails",
  ) {
    const endpoints = getApiEndpoints(hostId);
    super(rootCy, [...dataCySelectors], { ...endpoints });
    this.hostAction = new HostDetailsActionsPom();
    this.medataBadge = new MetadataDisplayPom(
      "infraHostDetailsDeploymentMetadata",
    );
    this.hostDetailsTab = new HostDetailsTabPom();
  }

  getHostDescriptionValueByKey(key: string) {
    return this.el.infraHostDetailsHostDescriptionTable
      .contains(key)
      .closest("td")
      .siblings("td")
      .first();
  }
}
