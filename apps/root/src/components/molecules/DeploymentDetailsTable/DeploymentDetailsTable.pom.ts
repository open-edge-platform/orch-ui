/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { adm } from "@orch-ui/apis";
import { TablePom } from "@orch-ui/components";
import { SiTablePom } from "@orch-ui/poms";
import { CyApiDetails, CyPom } from "@orch-ui/tests";
import { deploymentOne } from "@orch-ui/utils";
import { dataCy } from "./DeploymentDetailsTable";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];
type ApiAliases = "getDeploymentMock";

const url = "**/v1/projects/**/appdeployment/deployments*";

const endpoints: CyApiDetails<
  ApiAliases,
  adm.DeploymentServiceListDeploymentsApiResponse
> = {
  getDeploymentMock: {
    route: `${url}?*`,
    statusCode: 200,
    response: {
      deployments: [deploymentOne],
      totalElements: 1,
    },
  },
};

class DeploymentDetailsTablePom extends CyPom<Selectors, ApiAliases> {
  public table: TablePom;
  public tableUtil: SiTablePom;
  constructor(public rootCy: string = dataCy) {
    super(rootCy, [...dataCySelectors], endpoints);
    this.table = new TablePom("deployments-table");
    this.tableUtil = new SiTablePom("deployments-table");
  }
}
export default DeploymentDetailsTablePom;
