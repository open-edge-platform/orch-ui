/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { cm, infra, mbApi } from "@orch-ui/apis";
import { MetadataFormPom, TablePom } from "@orch-ui/components";
import { SiDropdown } from "@orch-ui/poms";
import { CyApiDetails, CyPom, defaultActiveProject } from "@orch-ui/tests";
import { siteRestaurantOne } from "@orch-ui/utils";
import { setClusterSelectedSite } from "../../../store/reducers/cluster";
import {
  updateRegionId,
  updateRegionName,
  updateSiteId,
  updateSiteName,
} from "../../../store/reducers/locations";
import { setNodes } from "../../../store/reducers/nodes";
import { setNodesSpec } from "../../../store/reducers/nodeSpec";
import ClusterNodesTableBySite from "../../organism/cluster/clusterCreation/ClusterNodesTableBySite/ClusterNodesTableBySite.pom";
import ClusterNodesTablePom from "../../organism/ClusterNodesTable/ClusterNodesTable.pom";

type ModifiedInstance = Omit<infra.InstanceResourceRead, "os" | "host"> & {
  os: infra.OperatingSystemResourceRead;
  host: infra.HostResourceRead;
};

const dataCySelectors = [
  "clusterName",
  "clusterTemplateName",
  "nextBtn",
  "region",
  "mockHosts",
  "cancelBtn",
] as const;

type Selectors = (typeof dataCySelectors)[number];
const route = "**/v2/**/clusters";
const metadataRoute = "**/v1/projects/**/metadata";
const schedulesRoute = "**/v1/schedules*";

type SuccessClusterApiAliases = "createClusterSuccess";
type ErrorClusterApiAliases = "createClusterFail";
type SuccessMetadataApiAliases = "createMetaSuccess";
type ErrorMetadataApiAliases = "createMetaError";
type SuccessSchedules = "schedulesSuccess";
type GetRegions = "getRegions";
type GetSites = "getSites";
type GetInstances = "getInstances";
type ExpandRegions = "expandRegion";
type ApiAliases =
  | SuccessClusterApiAliases
  | ErrorClusterApiAliases
  | SuccessMetadataApiAliases
  | ErrorMetadataApiAliases
  | SuccessSchedules
  | GetRegions
  | GetInstances
  | GetSites
  | ExpandRegions;

const successScheduleEndpoint: CyApiDetails<SuccessSchedules> = {
  schedulesSuccess: {
    route: schedulesRoute,
    statusCode: 200,
    response: [],
  },
};
const successClusterEndpoint: CyApiDetails<
  SuccessClusterApiAliases,
  cm.PostV2ProjectsByProjectNameClustersApiResponse
> = {
  createClusterSuccess: {
    route,
    statusCode: 200,
    method: "POST",
    delay: 2000,
    // @ts-ignore
    response: {}, // the PostV1ClustersApiResponse says string, but we need JSON
  },
};
const errorClusterEndpoint: CyApiDetails<
  ErrorClusterApiAliases,
  cm.PostV2ProjectsByProjectNameClustersApiResponse
> = {
  createClusterFail: {
    route,
    statusCode: 500,
    method: "POST",
    delay: 2000,
  },
};

const regionEndpoint: CyApiDetails<
  GetRegions,
  infra.RegionServiceListRegionsApiResponse
> = {
  getRegions: {
    route: `**/v1/projects/${defaultActiveProject.name}/regions*`,
    statusCode: 200,
    response: {
      hasNext: false,
      regions: [
        {
          regionID: "region-portland",
          resourceId: "region-portland",
          name: "Oregon",
        },
      ],
      totalElements: 1,
    },
  },
};

const rootRegionExpandEndpoint: CyApiDetails<
  ExpandRegions,
  infra.RegionServiceListRegionsApiResponse
> = {
  expandRegion: {
    route: "**/regions*parentRegion.resourceId%3D%22region-portland%22*",
    statusCode: 200,
    response: {
      hasNext: false,
      regions: [{ resourceId: "region-1.1", name: "Region 1.1" }],
      totalElements: 1,
    },
  },
};

export const siteOne = {
  siteID: "site-portland",
  resourceId: "site-portland",
  name: "Portland",
  metadata: [
    {
      key: "meta",
      value: "data",
    },
  ],
  inheritedMetadata: [
    {
      key: "region",
      value: "region-uswest",
    },
  ],
  region: {
    // parent region
    regionID: "region-portland",
    resourceId: "region-portland",
    name: "Oregon",
  },
};

const siteEndpoint: CyApiDetails<
  GetSites,
  infra.SiteServiceListSitesApiResponse
> = {
  getSites: {
    route: `**/v1/projects/${defaultActiveProject.name}/sites*`,
    statusCode: 200,
    response: {
      hasNext: false,
      sites: [siteOne],
      totalElements: 1,
    },
  },
};

const instanceOne: ModifiedInstance = {
  instanceID: "instance-dh38bjw9",
  name: "Instance One",
  instanceStatusIndicator: "STATUS_INDICATION_IDLE",
  instanceStatus: "Running",
  instanceStatusTimestamp: 1717761389,
  kind: "INSTANCE_KIND_METAL",
  updatePolicy: {
    name: "Update policy",
    updateSources: ["updateResources"],
  },
  os: {
    osResourceID: "os-ubuntu",
    sha256: "",
    repoUrl: "",
  },
  workloadMembers: [],
  host: {
    serialNumber: "ec269d77-9b98-bda3-2f68-61fe4428a8da",
    resourceId: "host-dh38bjw9",
    name: "host-dh38bjw9",
    uuid: "4c4c4544-0044-4210-8031-c2c04f305233",
    site: siteRestaurantOne,
    metadata: [],
    hostStatusIndicator: "STATUS_INDICATION_IDLE",
    hostStatus: "Running",
    hostStatusTimestamp: 1717761389,
    desiredState: "HOST_STATE_ONBOARDED",
    currentState: "HOST_STATE_ONBOARDED",
    currentPowerState: "POWER_STATE_ON",
  },
};
const instancesEndpoint: CyApiDetails<
  GetInstances,
  infra.InstanceServiceListInstancesApiResponse
> = {
  getInstances: {
    route: "**/v1/projects/**/compute/instances**",
    statusCode: 200,
    response: {
      hasNext: false,
      totalElements: 1,
      instances: [instanceOne],
    },
  },
};

const successMetadataEndpoint: CyApiDetails<
  SuccessMetadataApiAliases,
  mbApi.MetadataServiceCreateOrUpdateMetadataApiResponse
> = {
  createMetaSuccess: {
    route: metadataRoute,
    statusCode: 200,
    method: "POST",
    response: { metadata: [{ key: "type", values: ["mockHosts"] }] },
  },
};
const errorMetadataEndpoint: CyApiDetails<
  ErrorMetadataApiAliases,
  mbApi.MetadataServiceCreateOrUpdateMetadataApiResponse
> = {
  createMetaError: {
    route: metadataRoute,
    statusCode: 500,
    method: "POST",
  },
};

class ClusterCreationPom extends CyPom<Selectors, ApiAliases> {
  public clusterTemplateDropdown = new SiDropdown("clusterTemplateDropdown");
  public clusterTemplateVersionDropdown = new SiDropdown(
    "clusterTemplateVersionDropdown",
  );
  public sitesDropdown = new SiDropdown("site");
  public metadataForm = new MetadataFormPom();
  public table = new TablePom("selectHost");
  public clusterNodesReviewTable = new ClusterNodesTablePom();
  public clusterNodesSelectTable = new ClusterNodesTableBySite();

  regionsDropdown: SiDropdown<string>;

  constructor(public rootCy: string = "clusterCreation") {
    super(rootCy, [...dataCySelectors], {
      ...successClusterEndpoint,
      ...errorClusterEndpoint,
      ...successMetadataEndpoint,
      ...errorMetadataEndpoint,
      ...successScheduleEndpoint,
      ...regionEndpoint,
      ...siteEndpoint,
      ...instancesEndpoint,
      ...rootRegionExpandEndpoint,
    });
    this.regionsDropdown = new SiDropdown("region", []);
  }

  public fillSpecifyNameAndTemplates(
    clusterName: string,
    templateLabel: string,
    versionLabel: string,
    templateVal?: string,
    versionVal?: string,
  ) {
    this.el.clusterName.should("be.visible");
    this.el.clusterName.type(clusterName);
    this.clusterTemplateDropdown.selectDropdownValue(
      this.clusterTemplateDropdown.root,
      "clusterTemplateDropdown",
      templateLabel,
      templateVal ?? templateLabel,
    );
    this.clusterTemplateVersionDropdown.selectDropdownValue(
      this.clusterTemplateVersionDropdown.root,
      "clusterTemplateVersionDropdown",
      versionLabel,
      versionVal ?? versionLabel,
    );
  }

  public selectSites(store: any) {
    store.dispatch(setClusterSelectedSite(siteOne));
    store.dispatch(updateSiteId(siteOne.resourceId));
    store.dispatch(updateSiteName(siteOne.name));
    store.dispatch(updateRegionId(siteOne.region.resourceId));
    store.dispatch(updateRegionName(siteOne.region.name));
  }

  public selectHostNode(store: any) {
    store.dispatch(
      setNodes([
        {
          id: "4c4c4544-0044-4210-8031-c2c04f305233",
        },
      ]),
    );
    store.dispatch(
      setNodesSpec([
        {
          id: "4c4c4544-0044-4210-8031-c2c04f305233",
          role: "worker",
        },
      ]),
    );
  }

  public fillMetadata(key: string, value: string) {
    this.metadataForm.getNewEntryInput("Key").type(key);
    this.metadataForm.getNewEntryInput("Value").type(value);
  }
}
export default ClusterCreationPom;
