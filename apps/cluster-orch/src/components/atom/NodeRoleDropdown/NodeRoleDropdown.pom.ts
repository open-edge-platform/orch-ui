/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { SiDropdown } from "@orch-ui/poms";
import { CyPom } from "@orch-ui/tests";
import { dataCy } from "./NodeRoleDropdown";

const dataCySelectors = ["roleDropdown"] as const;
type Selectors = (typeof dataCySelectors)[number];

class NodeRoleDropdownPom extends CyPom<Selectors> {
  public roleDropdownPom = new SiDropdown("roleDropdown");

  constructor(public rootCy: string = dataCy) {
    super(rootCy, [...dataCySelectors]);
  }
}
export default NodeRoleDropdownPom;
