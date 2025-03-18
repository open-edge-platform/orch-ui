/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { SiTablePom } from "@orch-ui/poms";
import { CyPom } from "@orch-ui/tests";
import ClusterNodesTableBySitePom from "../../organism/cluster/clusterCreation/ClusterNodesTableBySite/ClusterNodesTableBySite.pom";

const dataCySelectors = ["okBtn", "cancelBtn"] as const;
type Selectors = (typeof dataCySelectors)[number];

class ClusterEditAddNodesDrawerPom extends CyPom<Selectors> {
  nodeTablePom: ClusterNodesTableBySitePom;
  nodeTableUtilsPom: SiTablePom;
  constructor(public rootCy: string = "clusterEditAddNodesDrawer") {
    super(rootCy, [...dataCySelectors]);
    this.nodeTablePom = new ClusterNodesTableBySitePom();
    this.nodeTableUtilsPom = new SiTablePom("table");
  }

  getNodeDropdownByName(name: string) {
    return this.nodeTableUtilsPom
      .getRowBySearchText(name)
      .find("[data-cy='roleDropdown']");
  }
  getNodeDropdownValueByName(name: string) {
    return this.getNodeDropdownByName(name).find(
      ".spark-dropdown-button-label",
    );
  }
  setNodeDropdownValueByName(name: string, value: string) {
    this.getNodeDropdownByName(name).find("button").click();
    cy.get(".spark-dropdown-list-box").contains(value).click();
  }
}
export default ClusterEditAddNodesDrawerPom;
