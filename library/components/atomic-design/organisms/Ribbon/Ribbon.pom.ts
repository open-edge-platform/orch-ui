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

  public search(searchText: string) {
    // we might be re-rendering the search input,
    // for now let's try the workaround in this issue
    // https://github.com/cypress-io/cypress/issues/5830
    this.el.search.type(searchText, { force: true });
  }
}
