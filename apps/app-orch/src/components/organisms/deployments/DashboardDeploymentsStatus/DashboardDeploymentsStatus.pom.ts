/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { DashboardStatusPom } from "@orch-ui/components";
import { CyApiDetails, CyPom } from "@orch-ui/tests";

const dataCySelectors = ["deployingStat", "upgradingStat"] as const;
type Selectors = (typeof dataCySelectors)[number];

// TODO: convert this to deployment status when openAPI is ready!
type DeploymentsStatusApiAliases =
  | "unmockedAPI"
  | "deploymentStatusResponse"
  | "deploymentsStatusError403"
  | "deploymentsStatusError500";
const deploymentsStatusApiUrl = "**/v1/projects/**/summary/deployments_status*";
export const deploymentsStatusApis: CyApiDetails<DeploymentsStatusApiAliases> =
  {
    unmockedAPI: {
      route: deploymentsStatusApiUrl,
    },
    deploymentStatusResponse: {
      route: deploymentsStatusApiUrl,
      response: {
        total: 7,
        error: 1,
        running: 2,
      },
    },
    deploymentsStatusError403: {
      route: deploymentsStatusApiUrl,
      statusCode: 403,
    },
    deploymentsStatusError500: {
      route: deploymentsStatusApiUrl,
      statusCode: 500,
      networkError: true,
    },
  };

class DashboardDeploymentsStatusPom extends CyPom<
  Selectors,
  DeploymentsStatusApiAliases
> {
  public deploymentStat: DashboardStatusPom;
  constructor(public rootCy: string = "deploymentsStatus") {
    super(rootCy, [...dataCySelectors], deploymentsStatusApis);
    this.deploymentStat = new DashboardStatusPom(rootCy);
  }
}

export default DashboardDeploymentsStatusPom;
