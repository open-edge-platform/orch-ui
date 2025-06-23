/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { CyPom } from "@orch-ui/tests";

const dataCySelectors = ["Create", "Import from file", "Import Helm Chart"] as const;
type Selectors = (typeof dataCySelectors)[number];

class DeploymentPackagePopupPom extends CyPom<Selectors> {
  constructor(public rootCy = "deploymentPackagePopup") {
    super(rootCy, [...dataCySelectors]);
  }

  get trigger() {
    return cy.get("[data-cy='popup-trigger']");
  }
}

export default DeploymentPackagePopupPom;