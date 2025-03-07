/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { SiTablePom } from "@orch-ui/poms";
import { CyPom } from "@orch-ui/tests";
import NodeRoleDropdownPom from "../../atom/NodeRoleDropdown/NodeRoleDropdown.pom";
import { dataCy } from "./ClusterNodesTable";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

class ClusterNodesTablePom extends CyPom<Selectors> {
  public table = new SiTablePom();
  public nodeRoleDropdown = new NodeRoleDropdownPom();

  constructor(public rootCy: string = dataCy) {
    super(rootCy, [...dataCySelectors]);
  }
}
export default ClusterNodesTablePom;
