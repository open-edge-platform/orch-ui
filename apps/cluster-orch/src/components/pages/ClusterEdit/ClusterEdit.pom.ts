/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { cm, eim, mbApi } from "@orch-ui/apis";
import {
  ConfirmationDialogPom,
  MetadataDisplayPom,
  MetadataFormPom,
} from "@orch-ui/components";
import { SiDropdown } from "@orch-ui/poms";
import { CyApiDetails, CyPom, defaultActiveProject } from "@orch-ui/tests";
import { clusterOne, clusterOneName, sitePortland } from "@orch-ui/utils";
import ClusterEditAddNodesDrawerPom from "../../atom/ClusterEditAddNodesDrawer/ClusterEditAddNodesDrawer.pom";
import ClusterTemplatesDropdownPom from "../../atom/ClusterTemplatesDropdown/ClusterTemplatesDropdown.pom";
import { dataCy } from "./ClusterEdit";

const dataCySelectors = [
  "name",
  "saveBtn",
  "okBtn",
  "addHostBtn",
  "removeHostBtn",
  "confirmBtn",
  "drawer",
  "openModal",
  "cancelButton",
] as const;
type Selectors = (typeof dataCySelectors)[number];

const route = "**/clusters/**";
const routeName = `**/clusters/${clusterOneName}`;
const labelRoute = `**/clusters/${clusterOneName}/labels`;
const nodesRoute = `**/clusters/${clusterOneName}/nodes`;
const siteByIdRoute = `**/v1/projects/${defaultActiveProject.name}/regions/**/sites/**`;
const firstHostRoute = `**/v1/projects/${defaultActiveProject.name}/compute/hosts/**`;
const templateRoute = "**/template";
const metadataRoute = "**/projects/**/metadata";
const schedulesRoute = "**/v1/schedules*";

type SuccessClusterApiAlias = "getClusterSuccess";
type ErrorClusterApiAliases = "getClusterError";
type ClusterApiAliases = SuccessClusterApiAlias | ErrorClusterApiAliases;

type SuccessNodesApiAliase = "putNodesSuccess";
type SuccessNameApiAliase =
  | "putClusterByNameSuccess"
  | "putClusterNodesInClusterByName";
type SuccessLabelApiAliase = "putClusterByLabelSuccess";
type SuccessTemplateApiAliase = "putTemplateSuccess";
type SuccessMetadataApiAliase = "postMetadataSuccess";
type SuccessSchedules = "schedulesSuccess";
type SuccessFirstHost = "firstHostSuccess";
type SuccessSitesApiAliases = "siteSuccess";
type ErrorSitesApiAliases = "siteError";
type SitesApiAliases = SuccessSitesApiAliases | ErrorSitesApiAliases;

type ApiAliases =
  | ClusterApiAliases
  | SuccessNodesApiAliase
  | SuccessNameApiAliase
  | SuccessLabelApiAliase
  | SuccessLabelApiAliase
  | SuccessMetadataApiAliase
  | SuccessTemplateApiAliase
  | SuccessSchedules
  | SuccessFirstHost
  | SitesApiAliases;

const successClusterEndpoint: CyApiDetails<
  SuccessClusterApiAlias,
  cm.GetV2ProjectsByProjectNameClustersAndNameApiResponse
> = {
  getClusterSuccess: {
    route: route,
    statusCode: 200,
    response: clusterOne,
  },
};
const errorClusterEndpoint: CyApiDetails<
  ErrorClusterApiAliases,
  cm.GetV2ProjectsByProjectNameClustersAndNameApiResponse
> = {
  getClusterError: {
    route: route,
    statusCode: 400,
  },
};

const successClusterNodesEndpoint: CyApiDetails<
  SuccessNodesApiAliase,
  cm.GetV2ProjectsByProjectNameClustersAndNameApiResponse
> = {
  putNodesSuccess: {
    route: nodesRoute,
    statusCode: 200,
    method: "PUT",
  },
};

const successClusterNameEndpoint: CyApiDetails<
  SuccessNameApiAliase,
  cm.GetV2ProjectsByProjectNameClustersAndNameApiResponse
> = {
  putClusterByNameSuccess: {
    route: routeName,
    statusCode: 200,
    method: "PUT",
  },
  putClusterNodesInClusterByName: {
    route: `${route}/nodes`,
    statusCode: 200,
    method: "PUT",
  },
};

const successClusterLabelEndpoint: CyApiDetails<
  SuccessLabelApiAliase,
  cm.PutV2ProjectsByProjectNameClustersAndNameLabelsApiResponse
> = {
  putClusterByLabelSuccess: {
    route: labelRoute,
    statusCode: 200,
    method: "PUT",
  },
};

const successClusterTemplateEndpoint: CyApiDetails<
  SuccessTemplateApiAliase,
  cm.PutV2ProjectsByProjectNameClustersAndNameTemplateApiResponse
> = {
  putTemplateSuccess: {
    route: templateRoute,
    statusCode: 200,
    method: "PUT",
  },
};

const successClusterMetadataEndpoint: CyApiDetails<
  SuccessMetadataApiAliase,
  mbApi.MetadataServiceCreateOrUpdateMetadataApiResponse
> = {
  postMetadataSuccess: {
    route: metadataRoute,
    statusCode: 200,
    method: "POST",
    response: { metadata: [] },
  },
};

const successScheduleEndpoint: CyApiDetails<SuccessSchedules> = {
  schedulesSuccess: {
    route: schedulesRoute,
    statusCode: 200,
    response: [],
  },
};

const successSitesEndpoint: CyApiDetails<
  SuccessSitesApiAliases,
  eim.GetV1ProjectsByProjectNameRegionsAndRegionIdSitesApiResponse
> = {
  siteSuccess: {
    route: siteByIdRoute,
    statusCode: 200,
    // @ts-ignore
    response: sitePortland,
  },
};
const errorSitesEndpoint: CyApiDetails<
  ErrorSitesApiAliases,
  eim.GetV1ProjectsByProjectNameRegionsAndRegionIdSitesApiResponse
> = {
  siteError: {
    route: siteByIdRoute,
    statusCode: 400,
  },
};

const successFirstHostEndpoint: CyApiDetails<SuccessFirstHost, eim.HostRead> = {
  firstHostSuccess: {
    route: firstHostRoute,
    statusCode: 200,
    response: {
      resourceId: "test-host",
      name: "Host One",
      site: sitePortland,
    },
  },
};

class ClusterEditPom extends CyPom<Selectors, ApiAliases> {
  public clusterTemplateDropdown = new SiDropdown("clusterTemplateDropdown");
  public clusterTemplateVersionDropdown = new SiDropdown(
    "clusterTemplateVersionDropdown",
  );
  public metadataForm = new MetadataFormPom();
  public metadataDisplay = new MetadataDisplayPom();
  public clusterNodeSelectDrawerPom = new ClusterEditAddNodesDrawerPom();
  public clusterTemplateDropdownPom = new ClusterTemplatesDropdownPom();
  //public modal = new SiModalPom("profileDeleteModal");
  public confirmationDialog = new ConfirmationDialogPom();

  constructor(public rootCy: string = dataCy) {
    super(rootCy, [...dataCySelectors], {
      ...successClusterEndpoint,
      ...errorClusterEndpoint,
      ...successClusterNodesEndpoint,
      ...successClusterNameEndpoint,
      ...successClusterLabelEndpoint,
      ...successClusterTemplateEndpoint,
      ...successClusterMetadataEndpoint,
      ...successScheduleEndpoint,
      ...successSitesEndpoint,
      ...errorSitesEndpoint,
      ...successFirstHostEndpoint,
    });
  }
}
export default ClusterEditPom;
