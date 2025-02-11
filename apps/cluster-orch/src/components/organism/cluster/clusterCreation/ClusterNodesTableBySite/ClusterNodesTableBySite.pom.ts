/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { TablePom } from "@orch-ui/components";
import { CyPom } from "@orch-ui/tests";
import ClusterNodeDetailsDrawerPom from "../../../../atom/ClusterNodeDetailsDrawer/ClusterNodeDetailsDrawer.pom";
import NodeRoleDropdownPom from "../../../../atom/NodeRoleDropdown/NodeRoleDropdown.pom";

const dataCySelectors = ["hostTableContainer", "rowSelectCheckbox"] as const;
type Selectors = (typeof dataCySelectors)[number];

class ClusterNodesTableBySitePom extends CyPom<Selectors> {
  public nodeRoleDropdown: NodeRoleDropdownPom;
  public nodeDetailsDrawer: ClusterNodeDetailsDrawerPom;
  public hostTable: TablePom;

  constructor(public rootCy: string = "clusterNodeTableBySite") {
    super(rootCy, [...dataCySelectors]);

    this.nodeDetailsDrawer = new ClusterNodeDetailsDrawerPom();
    this.nodeRoleDropdown = new NodeRoleDropdownPom();
    this.hostTable = new TablePom("hostTableContainer");
  }
}
export default ClusterNodesTableBySitePom;
