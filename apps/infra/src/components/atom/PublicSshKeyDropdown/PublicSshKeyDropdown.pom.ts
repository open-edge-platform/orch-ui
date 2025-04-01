/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { SiDropdown } from "@orch-ui/poms";
import { CyPom } from "@orch-ui/tests";
const dataCySelectors = ["localAccountsDropdown"] as const;
type Selectors = (typeof dataCySelectors)[number];

export class PublicSshKeyDropdownPom extends CyPom<Selectors> {
  public sshKeyDrpopdown = new SiDropdown("localAccountsDropdown");
  constructor(public rootCy: string = "publicSshKeyDropdown") {
    super(rootCy, [...dataCySelectors]);
  }
}
