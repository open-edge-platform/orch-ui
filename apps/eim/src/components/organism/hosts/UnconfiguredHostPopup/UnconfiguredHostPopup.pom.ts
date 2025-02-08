/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { eim } from "@orch-ui/apis";
import { ConfirmationDialogPom } from "@orch-ui/components";
import { CyApiDetails, CyPom } from "@orch-ui/tests";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

type ApiAliases = "deleteHostSuccessMocked" | "deleteInstanceSuccessMocked";

const endpoint: CyApiDetails<
  ApiAliases,
  eim.DeleteV1ProjectsByProjectNameComputeHostsAndHostIdApiResponse
> = {
  deleteHostSuccessMocked: {
    route: "**/compute/hosts/**",
    method: "DELETE",
    statusCode: 200,
  },
  deleteInstanceSuccessMocked: {
    route: "**/instances/**",
    method: "DELETE",
    statusCode: 200,
  },
};

class UnconfiguredHostPopupPom extends CyPom<Selectors, ApiAliases> {
  public deleteDialogPom: ConfirmationDialogPom;
  constructor(public rootCy: string = "unconfiguredHostPopup") {
    super(rootCy, [...dataCySelectors], endpoint);
    this.deleteDialogPom = new ConfirmationDialogPom();
  }
}

export default UnconfiguredHostPopupPom;
