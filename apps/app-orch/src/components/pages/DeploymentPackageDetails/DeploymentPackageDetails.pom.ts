/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { catalog } from "@orch-ui/apis";
import { EmptyPom } from "@orch-ui/components";
import {
  CyApiDetail,
  CyApiDetails,
  CyPom,
  defaultActiveProject,
} from "@orch-ui/tests";
import { packageOne } from "@orch-ui/utils";
import { DeploymentPackageDetailsHeaderPom } from "../../organisms/deploymentPackages/DeploymentPackageDetailsHeader/DeploymentPackageDetailsHeader.pom";
import { DeploymentPackageDetailsMainPom } from "../../organisms/deploymentPackages/DeploymentPackageDetailsMain/DeploymentPackageDetailsMain.pom";
import DeploymentPackageDetailsProfileListPom from "../../organisms/deploymentPackages/DeploymentPackageDetailsProfileList/DeploymentPackageDetailsProfileList.pom";
import { dataCy } from "./DeploymentPackageDetails";

const dataCySelectors = ["loading", "backButton"] as const;
type Selectors = (typeof dataCySelectors)[number];

type ApiAliases = "getDeploymentPackage" | "getDeploymentPackageError";

const project = defaultActiveProject.name;
const apiUrl = `/v3/projects/${project}/catalog/deployment_packages/*/versions/*?*`;

const successApi: CyApiDetail<catalog.CatalogServiceGetDeploymentPackageApiResponse> =
  {
    statusCode: 200,
    response: {
      deploymentPackage: packageOne,
    },
    route: apiUrl,
  };

const errorApi: CyApiDetail<catalog.CatalogServiceGetDeploymentPackageApiResponse> =
  {
    statusCode: 404,
    route: apiUrl,
  };

const apis: CyApiDetails<
  ApiAliases,
  catalog.CatalogServiceGetDeploymentPackageApiResponse
> = {
  getDeploymentPackage: successApi,
  getDeploymentPackageError: errorApi,
};

class DeploymentPackageDetailsPom extends CyPom<Selectors, ApiAliases> {
  public empty: EmptyPom;
  public dpDetailsHeaderPom: DeploymentPackageDetailsHeaderPom;
  public dpDetailsMainPom: DeploymentPackageDetailsMainPom;
  public dpDetailsProfileListPom: DeploymentPackageDetailsProfileListPom;
  constructor(public rootCy = dataCy) {
    super(rootCy, [...dataCySelectors], apis);

    this.empty = new EmptyPom();
    this.dpDetailsHeaderPom = new DeploymentPackageDetailsHeaderPom();
    this.dpDetailsMainPom = new DeploymentPackageDetailsMainPom();
    this.dpDetailsProfileListPom = new DeploymentPackageDetailsProfileListPom();
  }
}

export default DeploymentPackageDetailsPom;
