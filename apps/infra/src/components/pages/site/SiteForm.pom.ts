/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { SiDropdown, SiTablePom } from "@orch-ui/poms";
import { CyApiDetails, CyPom, defaultActiveProject } from "@orch-ui/tests";
import { regions, siteOregonPortland, updateSite } from "@orch-ui/utils";

import { infra, mbApi } from "@orch-ui/apis";
import { MetadataFormPom } from "@orch-ui/components";
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

const metadataRoute = "**/v1/projects/**/metadata";
const dataCySelectors = [
  "siteForm",
  "createSave",
  "regionDropdown",
  "inheritedMetadataTable",
  "siteMetadata",
  "advSettings",
  "name",
  "latitude",
  "longitude",
] as const;
type Selectors = (typeof dataCySelectors)[number];

const route = `**/v1/projects/${defaultActiveProject.name}/regions/**/sites`;
const siteOregonPortlandNoMetadata = structuredClone(siteOregonPortland);
siteOregonPortlandNoMetadata.inheritedMetadata = { location: [] };

type HostsApi = "getHosts";
const hostsEndpoints: CyApiDetails<HostsApi> = {
  getHosts: {
    route: `**/v1/projects/${defaultActiveProject.name}/compute/hosts?*siteID=test-site`,
    response: {
      hosts: [],
      hasNext: false,
      totalElements: 0,
    } as infra.HostServiceListHostsApiResponse,
  },
};

type SingleSiteApis =
  | "createSite"
  | "createSiteMocked"
  | "getSite"
  | "getSiteMocked"
  | "updateSite"
  | "updateSiteMocked"
  | "getSiteSuccess"
  | "getSiteSuccessNoMetadata"
  | "getSiteError"
  | "postSiteSuccess"
  | "putSiteSuccess";

const singleSiteEndpoints: CyApiDetails<
  SingleSiteApis,
  infra.SiteResource /* | infra.ProblemDetails */,
  infra.SiteResource
> = {
  createSite: {
    route: route,
    method: "POST",
  },
  createSiteMocked: {
    route: route,
    method: "POST",
    statusCode: 200,
    body: siteOregonPortland,
  },
  getSite: {
    route: `${route}/site-**`,
  },
  getSiteMocked: {
    route: `${route}/site-**`,
    statusCode: 200,
    response: siteOregonPortland,
  },
  updateSite: {
    route: `${route}/site-**`,
    method: "PUT",
  },
  updateSiteMocked: {
    route: `${route}/site-**`,
    method: "PUT",
    statusCode: 200,
    body: siteOregonPortland,
  },
  getSiteSuccess: {
    route: `${route}/*`,
    statusCode: 200,
    response: siteOregonPortland,
  },
  getSiteSuccessNoMetadata: {
    route: `${route}/*`,
    statusCode: 200,
    response: siteOregonPortlandNoMetadata,
  },
  getSiteError: {
    route: `${route}/*`,
    statusCode: 404,
    response: {
      message:
        'rpc error: code = NotFound desc = No resources found for filter: client_uuid:"f3d81dc0-9e04-415f-bacb-69326dc68cc3" filter:{kind:RESOURCE_KIND_REGION}',
    },
  },
  postSiteSuccess: {
    route,
    method: "POST",
    statusCode: 200,
    response: siteOregonPortland,
  },
  putSiteSuccess: {
    route: `${route}/*`,
    method: "PUT",
    statusCode: 200,
    response: {
      ...updateSite,
      name: "Site-1-modified",
    },
  },
};

type RegionsApis = "getRegions" | "getRegionsMocked";
const regionsEndpoints: CyApiDetails<RegionsApis, infra.ListRegionsResponse> = {
  getRegions: {
    route: `**v1/projects/${defaultActiveProject.name}/regions?*`,
  },
  getRegionsMocked: {
    route: `**/v1/projects/${defaultActiveProject.name}/regions?*`,
    response: regions,
  },
};

type MetadataApis = "postMetadata" | "postMetadataError" | "getMetadata";
const metadataEndpoints: CyApiDetails<MetadataApis, mbApi.MetadataResponse> = {
  postMetadata: {
    route: metadataRoute,
    method: "POST",
    statusCode: 200,
  },
  postMetadataError: {
    route: metadataRoute,
    method: "POST",
    statusCode: 500,
  },
  getMetadata: {
    route: metadataRoute,
    statusCode: 200,
  },
};

type ApiAliases =
  | HostsApi
  | SingleSiteApis
  | RegionsApis
  | MetadataApis
  | TelemetryGroupsLogsApis
  | TelemetryGroupsMetricsApis
  | TelemetryProfilesLogsApis
  | TelemetryProfilesMetricsApis;

class SiteFormPom extends CyPom<Selectors, ApiAliases> {
  public table = new SiTablePom("inheritedMetadataTable");
  public regionDropdown = new SiDropdown("regionDropdown", [
    ...dataCySelectors,
  ]);

  public metadataForm = new MetadataFormPom("metadataForm");

  constructor(public rootCy: string = "siteForm") {
    super(rootCy, [...dataCySelectors], {
      ...hostsEndpoints,
      ...singleSiteEndpoints,
      ...regionsEndpoints,
      ...metadataEndpoints,
      ...telemetryGroupsLogsEndpoints,
      ...telemetryGroupsMetricsEndpoints,
      ...telemetryProfilesLogsEndpoints,
      ...telemetryProfilesMetricsEndpoints,
    });
  }

  public selectRegion(name: string, id: string) {
    this.regionDropdown.openDropdown(this.el.regionDropdown);
    this.regionDropdown.selectDropdownValue(
      this.el.regionDropdown,
      "region-dropdown",
      name,
      id,
    );
  }

  public type(className: string, value: string | number): void {
    this.root.find(`${className} input`).clear().type(value.toString());
  }
  //TODO: need SI support for data- attribute on <TextField />
  public submit(site: infra.SiteResourceWrite) {
    cy.contains("Add New Site").should("be.visible");
    if (!site.name) {
      throw new Error("A name must be specified on Site create");
    }
    this.el.name.type(site.name);

    // optional fields
    if (site.siteLat) this.type(".siteLatitude", site.siteLat);
    if (site.siteLng) this.type(".longitude", site.siteLng);
    this.el.createSave.click();
  }

  public getCreateUpdateResponse(isUpdate: boolean) {
    if (isUpdate) {
      return CyPom.isResponseMocked
        ? this.api.updateSiteMocked
        : this.api.updateSite;
    } else {
      return CyPom.isResponseMocked
        ? this.api.createSiteMocked
        : this.api.createSite;
    }
  }

  public getRegionsApi() {
    return CyPom.isResponseMocked
      ? this.api.getRegionsMocked
      : this.api.getRegions;
  }

  public getResponse() {
    return CyPom.isResponseMocked ? this.api.getSiteMocked : this.api.getSite;
  }
}

export default SiteFormPom;
