/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { adm, cm } from "@orch-ui/apis";
import { ApiErrorPom, EmptyPom } from "@orch-ui/components";
import { CyApiDetails, CyPom } from "@orch-ui/tests";
import { clusterA, deploymentOne } from "@orch-ui/utils";
import ApplicationDetailsPom from "../../organisms/deployments/ApplicationDetails/ApplicationDetails.pom";
import { DeploymentDetailsHeaderPom } from "../../organisms/deployments/DeploymentDetailsHeader/DeploymentDetailsHeader.pom";
import DeploymentInstanceClusterStatusPom from "../../organisms/deployments/DeploymentInstanceClusterStatus/DeploymentInstanceClusterStatus.pom";

const dataCySelectors = [] as const;
export type Selectors = (typeof dataCySelectors)[number];

type DeploymentApiAliases = "deploymentSuccess" | "deploymentError";
type KubeconfigApiAliases = "kubeconfigSuccess" | "kubeconfigError";
type ClusterApiAliases =
  | "clustersList"
  | "clustersEmptyList"
  | "clustersListError";

const deploymentDetailsApiUrl = "**/v1/projects/**/appdeployment/deployments/*";
const kubeconfigApiUrl = "**/v2/**/clusters/**/kubeconfigs";
const clusterApiUrl =
  "**/v1/projects/**/appdeployment/deployments/**/clusters?filter=id%3D**";

const deploymentEndpoints: CyApiDetails<
  DeploymentApiAliases,
  adm.DeploymentServiceGetDeploymentApiResponse
> = {
  deploymentSuccess: {
    route: deploymentDetailsApiUrl,
    statusCode: 200,
    response: {
      deployment: { ...deploymentOne },
    },
  },
  deploymentError: {
    route: deploymentDetailsApiUrl,
    statusCode: 500,
  },
};

const kubeconfigEndpoints: CyApiDetails<
  KubeconfigApiAliases,
  cm.GetV2ProjectsByProjectNameClustersAndNameKubeconfigsApiResponse
> = {
  kubeconfigSuccess: {
    route: kubeconfigApiUrl,
    statusCode: 200,
    response: {
      kubeconfig: "testing",
    },
  },
  kubeconfigError: {
    route: kubeconfigApiUrl,
    statusCode: 500,
  },
};

const clusterEndpoints: CyApiDetails<
  ClusterApiAliases,
  adm.DeploymentServiceListDeploymentClustersApiResponse
> = {
  clustersList: {
    route: clusterApiUrl,
    statusCode: 200,
    response: {
      /** Note: This response mock assume that cluster list is for a filter clusterid of clusterA */
      clusters: [clusterA],
      totalElements: 1,
    },
  },
  clustersEmptyList: {
    route: clusterApiUrl,
    statusCode: 200,
    response: {
      clusters: [],
      totalElements: 0,
    },
  },
  clustersListError: {
    route: clusterApiUrl,
    statusCode: 500,
  },
};

class DeploymentInstanceDetailsPom extends CyPom<
  Selectors,
  DeploymentApiAliases | KubeconfigApiAliases | ClusterApiAliases
> {
  //Deployments
  public header: DeploymentDetailsHeaderPom;
  public status: DeploymentInstanceClusterStatusPom;
  public applicationDetail: ApplicationDetailsPom;
  public emptyPom: EmptyPom;
  public apiErrorPom: ApiErrorPom;

  constructor(public rootCy: string = "deploymentInstanceDetails") {
    super(rootCy, [...dataCySelectors], {
      ...deploymentEndpoints,
      ...kubeconfigEndpoints,
      ...clusterEndpoints,
    });
    this.header = new DeploymentDetailsHeaderPom("deploymentDetailsHeader");
    this.status = new DeploymentInstanceClusterStatusPom();
    this.applicationDetail = new ApplicationDetailsPom("applicationDetails");
    this.emptyPom = new EmptyPom();
    this.apiErrorPom = new ApiErrorPom();
  }
}

export default DeploymentInstanceDetailsPom;
