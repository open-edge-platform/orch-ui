/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { CyPom } from "@orch-ui/tests";
import SshKeysTablePom from "../../organisms/SshKeysTable/SshKeysTable.pom";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

class SshKeysPom extends CyPom<Selectors> {
  sshKeyTablePom: SshKeysTablePom;
  constructor(public rootCy: string = "sshKeys") {
    super(rootCy, [...dataCySelectors]);
    this.sshKeyTablePom = new SshKeysTablePom();
  }
}
export default SshKeysPom;
