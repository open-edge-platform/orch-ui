/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { CyPom } from "@orch-ui/tests";

const dataCySelectors = [
  "popoverContent",
  "popoverTitle",
  "closePopover",
] as const;
type Selectors = (typeof dataCySelectors)[number];

export class PopoverPom extends CyPom<Selectors> {
  constructor(public rootCy: string = "popover") {
    super(rootCy, [...dataCySelectors]);
  }
}
