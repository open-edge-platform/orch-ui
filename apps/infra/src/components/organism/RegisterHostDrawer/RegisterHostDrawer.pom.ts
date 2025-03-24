/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { CyApiDetails, CyPom } from "@orch-ui/tests";
import { registeredHostOne } from "@orch-ui/utils";

const dataCySelectors = [
  "hostName",
  "serialNumber",
  "uuid",
  "isAutoOnboarded",
  "confirmButton",
] as const;
type Selectors = (typeof dataCySelectors)[number];

type ApiAliases = "postRegisterHost200" | "patchRegisterHost200";

export const endpoints: CyApiDetails<ApiAliases> = {
  postRegisterHost200: {
    method: "POST",
    route: "**/compute/hosts/register",
    statusCode: 200,
  },
  patchRegisterHost200: {
    method: "patch",
    route: `**/compute/hosts/${registeredHostOne.resourceId}**`,
    statusCode: 200,
  },
};

export class RegisterHostDrawerPom extends CyPom<Selectors, ApiAliases> {
  constructor(public rootCy: string = "registerHostDrawer") {
    super(rootCy, [...dataCySelectors], endpoints);
  }

  clickIsAutoOnboarded() {
    this.el.isAutoOnboarded.siblings(".spark-toggle-switch-selector").click();
  }

  getRegisterButton() {
    return this.root.find(".spark-drawer-footer").contains("Register");
  }

  getCancelButton() {
    return this.root.find(".spark-drawer-footer").contains("Cancel");
  }

  getHeaderCloseButton() {
    return cy.get("[data-testid='drawer-header-close-btn']");
  }

  completeForm(): void {
    this.el.hostName.type("Registered Host 1");
    this.el.serialNumber.type("XGHDGYYD");
    this.el.uuid.type("4786ed8a-5f49-42f0-867d-d66bc6c07f52");
    this.clickIsAutoOnboarded();
    this.getRegisterButton().click();
  }
}
