/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { PopupPom } from "@orch-ui/components";
import { CyPom } from "@orch-ui/tests";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

class DeploymentPackagePopupPom extends CyPom<Selectors> {
  public popupPom: PopupPom;
  constructor(public rootCy = "deploymentPackagePopup") {
    super(rootCy, [...dataCySelectors]);
    this.popupPom = new PopupPom();
  }

  public openPopUp() {
    this.popupPom.root.should("be.visible");
    this.popupPom.root.click({ force: true });
  }

  public clickMenuOption(option: string) {
    this.openPopUp();
    cy.wait(1000);
    cy.contains(option).click({ force: true });
  }
}

export default DeploymentPackagePopupPom;
