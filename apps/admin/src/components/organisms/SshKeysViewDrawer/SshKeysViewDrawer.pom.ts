/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { CyPom } from "@orch-ui/tests";

const dataCySelectors = [
  "sshKeyUsername",
  "sshPublicKey",
  "copySshButton",
  "cancelFooterBtn",
] as const;
type Selectors = (typeof dataCySelectors)[number];

class SshKeysViewDrawerPom extends CyPom<Selectors> {
  constructor(public rootCy: string = "sshKeysViewDrawer") {
    super(rootCy, [...dataCySelectors]);
  }

  getDrawerBase() {
    return this.root.find(".spark-drawer-base");
  }

  getHeaderCloseButton() {
    return this.root.find("[data-testid='drawer-header-close-btn']");
  }
}
export default SshKeysViewDrawerPom;
