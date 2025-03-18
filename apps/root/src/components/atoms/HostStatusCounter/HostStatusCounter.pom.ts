/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { Cy, CyApiDetails, CyPom } from "@orch-ui/tests";
import { clusterA, clusterB, clusterC } from "@orch-ui/utils";

const dataCySelectors = ["statusText", "error", "chart"] as const;
type Selectors = (typeof dataCySelectors)[number];

type ApiAliases = "clustersList";

const deploymentClustersApiUrl =
  "**/v1/projects/**/appdeployment/deployments/**/clusters*";

const apis: CyApiDetails<ApiAliases> = {
  clustersList: {
    route: deploymentClustersApiUrl,
    statusCode: 200,
    response: {
      clusters: [clusterA, clusterB, clusterC],
      totalElements: 3,
    },
  },
};

export class HostStatusCounterPom extends CyPom<Selectors, ApiAliases> {
  constructor(public rootCy: string = "hostStatusCounter") {
    super(rootCy, [...dataCySelectors], apis);
  }

  public getStatusElement(index: number): Cy {
    return this.root.find(`.status-icon:nth-child(${index}) .spark-font-100`);
  }
}
