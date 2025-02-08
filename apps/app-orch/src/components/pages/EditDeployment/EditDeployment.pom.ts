/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { adm } from "@orch-ui/apis";
import { CyApiDetails, CyPom } from "@orch-ui/tests";
import { deploymentMinimal } from "@orch-ui/utils";
import { dataCy } from "./EditDeployment";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

type GetDeploymentDetailsSuccessApiAliases = "minimalDeploymentDetailsResponse";
type ApiAliases = GetDeploymentDetailsSuccessApiAliases;

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
};

class EditDeploymentPom extends CyPom<Selectors, ApiAliases> {
  constructor(public rootCy: string = dataCy) {
    super(rootCy, [...dataCySelectors], {
      ...getDeploymentDetailsSuccessEndpoints,
    });
  }
}
export default EditDeploymentPom;
