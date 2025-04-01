/*
 * SPDX-FileCopyrightText: (C) 2024 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ClusterCreationPom,
  ClusterNodesSiteTablePom,
} from "@orch-ui/cluster-orch-poms";
import { CyPom } from "@orch-ui/tests";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

class ClusterOrchPom extends CyPom<Selectors> {
  public clusterCreationPom: ClusterCreationPom;
  public clusterNodesSiteTablePom: ClusterNodesSiteTablePom;
  constructor(public rootCy: string) {
    super(rootCy, [...dataCySelectors]);
    this.clusterCreationPom = new ClusterCreationPom();
    this.clusterNodesSiteTablePom = new ClusterNodesSiteTablePom();
  }
}

export default ClusterOrchPom;
