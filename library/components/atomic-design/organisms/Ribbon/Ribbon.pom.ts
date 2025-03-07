/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { CyPom } from "@orch-ui/tests";

const dataCySelectors = [
  "search",
  "button",
  "searchTooltip",
  "buttonTooltip",
  "rightItem",
  "leftItem",
  "ellipsisButton",
  "popupButtons",
  "subtitle",
] as const;
type Selectors = (typeof dataCySelectors)[number];

export class RibbonPom extends CyPom<Selectors> {
  constructor(public rootCy: string = "ribbon") {
    super(rootCy, [...dataCySelectors]);
  }
}
