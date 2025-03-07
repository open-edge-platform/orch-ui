/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { cm } from "@orch-ui/apis";
import { TablePom } from "@orch-ui/components";
import { CyApiDetails, CyPom } from "@orch-ui/tests";
import { clusterInfo1, clusterInfo2 } from "@orch-ui/utils";
import { dataCy } from "./ClusterList";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

type ApiAliases =
  | "cluster"
  | "clusterMocked"
  | "cluster500"
  | "clusterMockedWithFilter"
  | "clusterMockedWithOffset";

const route = "**/v2/**/clusters**";

const endpoints: CyApiDetails<
  ApiAliases,
  cm.GetV2ProjectsByProjectNameClustersApiResponse
> = {
  cluster: {
    route,
  },
  clusterMocked: {
    route,
    statusCode: 200,
    response: {
      clusters: [clusterInfo1, clusterInfo2],
      totalElements: 20,
    },
  },
  clusterMockedWithFilter: {
    route: `${route}filter=name%3Dtesting+OR+status%3Dtesting+OR+kubernetesVersion%3Dtesting`,
    statusCode: 200,
    response: {
      clusters: [clusterInfo1, clusterInfo2],
      totalElements: 2,
    },
  },
  clusterMockedWithOffset: {
    route: `${route}offset=10*`,
    statusCode: 200,
    response: {
      clusters: [clusterInfo1, clusterInfo2],
      totalElements: 20,
    },
  },
  cluster500: {
    route,
    statusCode: 500,
    response: undefined,
  },
};

class ClusterListPom extends CyPom<Selectors, ApiAliases> {
  public table: TablePom;
  constructor(public rootCy: string = dataCy) {
    super(rootCy, [...dataCySelectors], endpoints);
    this.table = new TablePom("table");
  }
}
export default ClusterListPom;
