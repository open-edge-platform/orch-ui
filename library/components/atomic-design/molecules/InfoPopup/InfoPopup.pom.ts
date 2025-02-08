/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { CyPom } from "@orch-ui/tests";

const dataCySelectors = ["okButton"] as const;
type Selectors = (typeof dataCySelectors)[number];

export class InfoPopupPom extends CyPom<Selectors> {
  constructor(public rootCy: string = "infoPopup") {
    super(rootCy, [...dataCySelectors]);
  }
}
