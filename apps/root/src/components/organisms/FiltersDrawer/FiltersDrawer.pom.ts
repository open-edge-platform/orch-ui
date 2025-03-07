/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { CyPom } from "@orch-ui/tests";

const dataCySelectors = [
  "buttonClose",
  "buttonClear",
  "buttonApply",
  "content",
] as const;
type Selectors = (typeof dataCySelectors)[number];

export class FiltersDrawerPom extends CyPom<Selectors> {
  constructor(public rootCy: string = "drawerContent") {
    super(rootCy, [...dataCySelectors]);
  }
}
