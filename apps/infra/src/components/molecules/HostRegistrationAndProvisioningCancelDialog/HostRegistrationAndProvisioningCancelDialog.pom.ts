/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { ConfirmationDialogPom } from "@orch-ui/components";
import { CyPom } from "@orch-ui/tests";

const dataCySelectors = ["cancelBtn"] as const;
type Selectors = (typeof dataCySelectors)[number];

class HostRegistrationAndProvisioningCancelDialogPom extends CyPom<Selectors> {
  public dialog = new ConfirmationDialogPom();
  constructor(
    public rootCy: string = "hostRegistrationAndProvisioningCancelDialog",
  ) {
    super(rootCy, [...dataCySelectors]);
  }
}
export default HostRegistrationAndProvisioningCancelDialogPom;
