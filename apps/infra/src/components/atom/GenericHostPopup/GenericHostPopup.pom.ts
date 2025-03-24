/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { PopupPom } from "@orch-ui/components";
import { CyPom } from "@orch-ui/tests";

const dataCySelectors = ["defaultPopupButton"] as const;
type Selectors = (typeof dataCySelectors)[number];

class GenericHostPopupPom extends CyPom<Selectors> {
  popupPom: PopupPom;
  constructor(public rootCy: string = "genericHostPopup") {
    super(rootCy, [...dataCySelectors]);
    this.popupPom = new PopupPom();
  }
  getActionPopupBySearchText(name: string) {
    this.popupPom.root.click().as("popup");
    return cy.get("@popup").contains(name);
  }
}
export default GenericHostPopupPom;
