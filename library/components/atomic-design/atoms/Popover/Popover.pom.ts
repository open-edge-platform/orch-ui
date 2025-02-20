/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { CyPom } from "@orch-ui/tests";
import { dataCy } from "./Popover";

const dataCySelectors = [
  "popoverContent",
  "popoverTitle",
  "closePopover",
] as const;
type Selectors = (typeof dataCySelectors)[number];

export class PopoverPom extends CyPom<Selectors> {
  constructor(public rootCy: string = dataCy) {
    super(rootCy, [...dataCySelectors]);
  }
}
