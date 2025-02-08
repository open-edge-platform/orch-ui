/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { CyPom } from "@orch-ui/tests";

const dataCySelectors = ["list"] as const;
type Selectors = (typeof dataCySelectors)[number];

export class PopupPom extends CyPom<Selectors> {
  constructor(public rootCy: string = "popup") {
    super(rootCy, [...dataCySelectors]);
  }
}
