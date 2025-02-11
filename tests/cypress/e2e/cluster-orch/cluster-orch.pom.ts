/*
 * SPDX-FileCopyrightText: (C) 2024 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import {
  ClusterCreationPom,
  ClusterNodesTableBySitePom,
} from "@orch-ui/cluster-orch-poms";
import { CyPom } from "@orch-ui/tests";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

class ClusterOrchPom extends CyPom<Selectors> {
  public clusterCreationPom: ClusterCreationPom;
  public clusterNodesTableBySitePom: ClusterNodesTableBySitePom;
  constructor(public rootCy: string) {
    super(rootCy, [...dataCySelectors]);
    this.clusterCreationPom = new ClusterCreationPom();
    this.clusterNodesTableBySitePom = new ClusterNodesTableBySitePom();
  }
}

export default ClusterOrchPom;
