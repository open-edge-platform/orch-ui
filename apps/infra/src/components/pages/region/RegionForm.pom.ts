/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra, mbApi } from "@orch-ui/apis";
import { ConfirmationDialogPom } from "@orch-ui/components";
import { SiComboboxPom } from "@orch-ui/poms";
import { CyApiDetails, CyPom, defaultActiveProject } from "@orch-ui/tests";
import { regions, regionSalem, regionUsWest, SiteStore } from "@orch-ui/utils";

import {
  TelemetryGroupsLogsApis,
  telemetryGroupsLogsEndpoints,
  TelemetryGroupsMetricsApis,
  telemetryGroupsMetricsEndpoints,
  TelemetryProfilesLogsApis,
  telemetryProfilesLogsEndpoints,
  TelemetryProfilesMetricsApis,
  telemetryProfilesMetricsEndpoints,
} from "../../../utils/TelemetryApis";
import RegionsTablePom from "../../organism/region/RegionsTable.pom";
import SitesTablePom from "../../organism/site/SitesTable.pom";

const metadataRoute = "**/v1/projects/**/metadata";

const dataCySelectors = [
  "name",
  "create",
  "regionFormPopup",
  "siteListPopup",
  "confirmationDialog",
] as const;
type Selectors = (typeof dataCySelectors)[number];

const regionUsWestUpdated: infra.Region = {
  ...regionUsWest,
  name: `${regionUsWest.name} Updated`,
};

const route = `**/v1/projects/${defaultActiveProject.name}/regions*`;
const route_sites = `**/v1/projects/${defaultActiveProject.name}/sites`;

type SiteApis = "getSites" | "deleteSite";
const siteStore = new SiteStore();
const sites = siteStore.list();
const siteEndpoints: CyApiDetails<
  SiteApis,
  infra.GetV1ProjectsByProjectNameRegionsAndRegionIdSitesApiResponse
> = {
  getSites: {
    route: `${route_sites}?*regionID=${regionUsWest.resourceId}`,
    statusCode: 200,
    response: {
      sites,
      hasNext: false,
      totalElements: sites.length,
    },
  },
  deleteSite: {
    route: `${route_sites}/*`,
    method: "DELETE",
  },
};

type MetadataApis = "postMetadata" | "getMetadata";
const metadataEndpoints: CyApiDetails<MetadataApis, mbApi.MetadataResponse> = {
  postMetadata: {
    route: metadataRoute,
    method: "POST",
    statusCode: 200,
  },
  getMetadata: {
    route: metadataRoute,
    statusCode: 200,
  },
};

type RegionsApis = "getRegions" | "getRegionsError" | "deleteRegion";
const regionsEndpoints: CyApiDetails<
  RegionsApis,
  infra.RegionsList | infra.ProblemDetails
> = {
  getRegions: {
    route: `${route}?*`,
    response: regions,
  },
  getRegionsError: {
    route: `${route}?*`,
    statusCode: 404,
    response: {
      message:
        'rpc error: code = NotFound desc = No resources found for filter: client_uuid:"f3d81dc0-9e04-415f-bacb-69326dc68cc3" filter:{kind:RESOURCE_KIND_REGION}',
    },
  },
  deleteRegion: {
    route: `${route}/*`,
    method: "DELETE",
  },
};

type SingleRegionApis =
  | "getRegion"
  | "getRegionMocked"
  | "getRegionMockedWithParent"
  | "getRegionError"
  | "createRegion"
  | "createRegionMock"
  | "createRegionMocked"
  | "updateRegion"
  | "updateRegionMocked";

const singleRegionEndpoints: CyApiDetails<
  SingleRegionApis,
  infra.Region | infra.ProblemDetails,
  infra.Region
> = {
  getRegion: {
    route: `${route}/*`,
  },
  getRegionMocked: {
    route: `${route}/*`,
    response: regionUsWest,
  },
  getRegionMockedWithParent: {
    route: `${route}/*`,
    response: regionSalem,
  },
  getRegionError: {
    route: `${route}/*`,
    statusCode: 404,
    response: {
      message:
        'rpc error: code = NotFound desc = No resources found for filter: client_uuid:"f3d81dc0-9e04-415f-bacb-69326dc68cc3" filter:{kind:RESOURCE_KIND_REGION}',
    },
  },
  createRegion: {
    route,
    method: "POST",
  },
  createRegionMock: {
    route: `**/v1/projects/${defaultActiveProject.name}/regions`,
    method: "POST",
    statusCode: 200,
    body: {
      name: "name",
    },
    response: {
      message:
        'rpc error: code = NotFound desc = No resources found for filter: client_uuid:"f3d81dc0-9e04-415f-bacb-69326dc68cc3" filter:{kind:RESOURCE_KIND_REGION}',
    },
  },
  createRegionMocked: {
    route,
    method: "POST",
    statusCode: 200,
    body: regionUsWest,
  },
  updateRegion: {
    route: `${route}/*`,
    method: "PUT",
  },
  updateRegionMocked: {
    route: `${route}/*`,
    method: "PUT",
    statusCode: 200,
    body: regionUsWestUpdated,
  },
};

type ApiAliases =
  | RegionsApis
  | SingleRegionApis
  | SiteApis
  | MetadataApis
  | TelemetryProfilesMetricsApis
  | TelemetryProfilesLogsApis
  | TelemetryGroupsMetricsApis
  | TelemetryGroupsLogsApis;

class RegionFormPom extends CyPom<Selectors, ApiAliases> {
  public testRegion = regionUsWest;
  regionType = new SiComboboxPom("regionType");
  parentRegion = new SiComboboxPom("parentRegion");
  regionTable = new RegionsTablePom();
  sitesTable = new SitesTablePom();
  confirmationDialog = new ConfirmationDialogPom();

  constructor(public rootCy: string = "regionForm") {
    super(rootCy, [...dataCySelectors], {
      ...regionsEndpoints,
      ...singleRegionEndpoints,
      ...siteEndpoints,
      ...metadataEndpoints,
      ...telemetryProfilesMetricsEndpoints,
      ...telemetryProfilesLogsEndpoints,
      ...telemetryGroupsMetricsEndpoints,
      ...telemetryGroupsLogsEndpoints,
    });
  }

  public submit(region: infra.Region) {
    this.root.should("be.visible");
    this.el.name.clear().type(region.name!);
    this.regionType.select("State");
    this.el.create.click();
  }

  public getCreateUpdateResponse(isUpdate: boolean) {
    if (isUpdate) {
      return CyPom.isResponseMocked
        ? this.api.updateRegionMocked
        : this.api.updateRegion;
    } else {
      return CyPom.isResponseMocked
        ? this.api.createRegionMocked
        : this.api.createRegion;
    }
  }

  public getResponse() {
    return CyPom.isResponseMocked
      ? this.api.getRegionMocked
      : this.api.getRegion;
  }
}

export default RegionFormPom;
