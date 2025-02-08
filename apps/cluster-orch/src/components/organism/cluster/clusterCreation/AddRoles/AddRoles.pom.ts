/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { CyPom } from "@orch-ui/tests";
import NodeRoleDropdownPom from "../../../../atom/NodeRoleDropdown/NodeRoleDropdown.pom";
import ClusterNodesTablePom from "../../../ClusterNodesTable/ClusterNodesTable.pom";
import { dataCy } from "./AddRoles";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

class AddRolesPom extends CyPom<Selectors> {
  public clusterNodesTablePom = new ClusterNodesTablePom("clusterNodesTable");
  public nodeRoleDropdown = new NodeRoleDropdownPom();

  constructor(public rootCy: string = dataCy) {
    super(rootCy, [...dataCySelectors]);
  }
}
export default AddRolesPom;
