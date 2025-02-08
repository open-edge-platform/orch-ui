/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { Cy, CyApiDetails, cyGet, CyPom } from "@orch-ui/tests";
import { dataCy } from "./RegisteredHostsPopup";

const dataCySelectors = [
  "Edit",
  "Onboard",
  "Deauthorize",
  "View Details",
  "Delete",
  "View Error",
  "registeredHostsActions",
  "hostRegisterErrorDrawer",
  "footerOkButton",
] as const;
type Selectors = (typeof dataCySelectors)[number];

type ApiAliases = "deleteHostSuccessMocked" | "deauthorizeHostSuccessMocked";

const endpoints: CyApiDetails<ApiAliases> = {
  deleteHostSuccessMocked: {
    route: "**/compute/hosts/**",
    method: "DELETE",
    statusCode: 200,
  },
  deauthorizeHostSuccessMocked: {
    route: "**/compute/hosts/**/invalidate",
    method: "PUT",
    statusCode: 200,
  },
};

export class RegisteredHostsPopupPom extends CyPom<Selectors, ApiAliases> {
  constructor(public rootCy: string = dataCy) {
    super(rootCy, [...dataCySelectors], endpoints);
  }

  public getDialog(): Cy {
    return cyGet("dialog");
  }

  public confirmDialog(): void {
    this.getDialog();
    cyGet("confirmBtn").click();
  }

  public cancelDialog(): void {
    this.getDialog();
    cyGet("cancelBtn").click();
  }
}
