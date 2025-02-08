/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { ConfirmationDialogPom } from "@orch-ui/components";
import { CyPom } from "@orch-ui/tests";
import HostPopupPom from "../HostPopup/HostPopup.pom";
import UnconfiguredHostPopupPom from "../UnconfiguredHostPopup/UnconfiguredHostPopup.pom";

const dataCySelectors = ["configuredOptions", "unconfiguredActions"] as const;
type Selectors = (typeof dataCySelectors)[number];

class HostDetailsActionsPom extends CyPom<Selectors> {
  /** configured host popup pom */
  public hostPopup: HostPopupPom;
  /** unconfigured host popup pom */
  public unconfiguredHostPopup: UnconfiguredHostPopupPom;
  public confirmationDialog: ConfirmationDialogPom;

  constructor(public rootCy: string = "hostDetailsActions") {
    super(rootCy, [...dataCySelectors]);
    this.hostPopup = new HostPopupPom();
    this.unconfiguredHostPopup = new UnconfiguredHostPopupPom();
    this.confirmationDialog = new ConfirmationDialogPom();
  }
}

export default HostDetailsActionsPom;
