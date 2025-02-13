/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { CyPom } from "@orch-ui/tests";
import { dataCy } from "./ContextSwitcher";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

export class ContextSwitcherPom extends CyPom<Selectors> {
  constructor(public rootCy: string = dataCy) {
    super(rootCy, [...dataCySelectors]);
  }

  getTabButton(name: string) {
    return this.root.find(`[data-cy='${name}']`).first();
  }

  getActiveTab() {
    return this.root.find(".active").first();
  }
}
