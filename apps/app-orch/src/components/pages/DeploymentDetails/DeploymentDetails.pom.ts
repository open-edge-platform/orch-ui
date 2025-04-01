/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { adm } from "@orch-ui/apis";
import { CyApiDetails, CyPom } from "@orch-ui/tests";
import {
  deploymentMinimal,
  deploymentOne,
  deploymentTwo,
  deploymentUnknown,
} from "@orch-ui/utils";
import DeploymentDetailsDrawerContentPom from "../../organisms/deployments/DeploymentDetailsDrawerContent/DeploymentDetailsDrawerContent.pom";
import DeploymentDetailsStatusPom from "../../organisms/deployments/DeploymentDetailsStatus/DeploymentDetailsStatus.pom";
import DeploymentDetailsTablePom from "../../organisms/deployments/DeploymentDetailsTable/DeploymentDetailsTable.pom";
import { DeploymentUpgradeModalPom } from "../../organisms/deployments/DeploymentUpgradeModal/DeploymentUpgradeModal.pom";

const dataCySelectors = [
  "deploymentDetailsHeader",
  "deploymentDetailsHeaderPopup",
  "viewDetailsContent",
  "backButton",
  "error",
] as const;
export type Selectors = (typeof dataCySelectors)[number];

type GetDeploymentDetailsSuccessApiAliases =
  | "minimalDeploymentDetailsResponse"
  | "completeDeploymentDetailsResponse"
  | "notReadyStateDeploymentDetailsResponse"
  | "unknownStateDeploymentDetailsResponse"
  | "deploymentDetails500";
type GetDeploymentDetailsErrorApiAliases =
  | "deploymentError400"
  | "deploymentError500";
type GetDeploymentDetailsApiAliases =
  | GetDeploymentDetailsSuccessApiAliases
  | GetDeploymentDetailsErrorApiAliases;
type DeleteDeploymentDetailsApiAliases = "deleteDeployment";
type ApiAliases =
  | GetDeploymentDetailsApiAliases
  | DeleteDeploymentDetailsApiAliases;

const deploymentDetailsApiUrl =
  "**/v1/projects/**/appdeployment/deployments/**";

const getDeploymentDetailsSuccessEndpoints: CyApiDetails<
  GetDeploymentDetailsSuccessApiAliases,
  adm.DeploymentServiceGetDeploymentApiResponse
> = {
  minimalDeploymentDetailsResponse: {
    route: deploymentDetailsApiUrl,
    response: {
      deployment: deploymentMinimal,
    },
  },
  completeDeploymentDetailsResponse: {
    route: deploymentDetailsApiUrl,
    response: {
      deployment: { ...deploymentOne },
    },
  },
  notReadyStateDeploymentDetailsResponse: {
    route: deploymentDetailsApiUrl,
    response: {
      deployment: { ...deploymentTwo },
    },
  },
  unknownStateDeploymentDetailsResponse: {
    route: deploymentDetailsApiUrl,
    response: {
      deployment: { ...deploymentUnknown },
    },
  },
  deploymentDetails500: {
    route: deploymentDetailsApiUrl,
    statusCode: 500,
    networkError: true,
  },
};

const getDeploymentDetailsErrorEndpoints: CyApiDetails<GetDeploymentDetailsErrorApiAliases> =
  {
    deploymentError400: {
      route: deploymentDetailsApiUrl,
      statusCode: 400,
    },
    deploymentError500: {
      route: deploymentDetailsApiUrl,
      statusCode: 500,
      networkError: true,
    },
  };

const deleteDeploymentDetailsErrorEndpoints: CyApiDetails<DeleteDeploymentDetailsApiAliases> =
  {
    deleteDeployment: {
      method: "DELETE",
      route: deploymentDetailsApiUrl,
      statusCode: 200,
    },
  };

class DeploymentDetailsPom extends CyPom<Selectors, ApiAliases> {
  public detailsStatusPom: DeploymentDetailsStatusPom;
  public tablePom: DeploymentDetailsTablePom;
  public upgradeModalPom: DeploymentUpgradeModalPom;
  public drawerContentPom: DeploymentDetailsDrawerContentPom;

  constructor(public rootCy: string = "deploymentDetails") {
    super(rootCy, [...dataCySelectors], {
      ...getDeploymentDetailsSuccessEndpoints,
      ...getDeploymentDetailsErrorEndpoints,
      ...deleteDeploymentDetailsErrorEndpoints,
    });
    this.detailsStatusPom = new DeploymentDetailsStatusPom();
    this.tablePom = new DeploymentDetailsTablePom();
    this.upgradeModalPom = new DeploymentUpgradeModalPom();
    this.drawerContentPom = new DeploymentDetailsDrawerContentPom();
  }

  getDrawerCloseButton() {
    return this.root.find(".spark-drawer-footer").contains("Close");
  }
  getBackButton() {
    return this.el.backButton.find("button").contains("Back");
  }
}

export default DeploymentDetailsPom;
