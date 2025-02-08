/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { CyPom } from "@orch-ui/tests";

const dataCySelectors = ["radioBtn", "description"] as const;
type Selectors = (typeof dataCySelectors)[number];

export class RadioCardPom extends CyPom<Selectors> {
  constructor(public rootCy: string = "radioCard") {
    super(rootCy, [...dataCySelectors]);
  }
}
