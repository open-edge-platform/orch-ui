/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { cm } from "@orch-ui/apis";
import { CyApiDetails, CyPom } from "@orch-ui/tests";
import { clusterOne } from "@orch-ui/utils";
import { dataCy } from "./ClusterNodesWrapper";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];
type SuccessClusterApiAlias = "getClusterSuccess";

const route = "**/v1/**/clusters/**";

type ApiAliases = SuccessClusterApiAlias;

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

class ClusterNodesWrapperPom extends CyPom<Selectors, ApiAliases> {
  constructor(public rootCy: string = dataCy) {
    super(rootCy, [...dataCySelectors], {
      ...successClusterEndpoint,
    });
  }
}
export default ClusterNodesWrapperPom;
