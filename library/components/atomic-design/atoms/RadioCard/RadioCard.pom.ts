/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { CyPom } from "@orch-ui/tests";

const dataCySelectors = ["radioBtn", "description"] as const;
type Selectors = (typeof dataCySelectors)[number];

export class RadioCardPom extends CyPom<Selectors> {
  constructor(public rootCy: string = "radioCard") {
    super(rootCy, [...dataCySelectors]);
  }
}
