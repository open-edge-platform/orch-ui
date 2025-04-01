/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { CyPom } from "@orch-ui/tests";

const dataCySelectors = ["search"] as const;
type Selectors = (typeof dataCySelectors)[number];

export class RegionAndSiteConfigurePom extends CyPom<Selectors> {
  constructor(public rootCy: string = "hostSiteSelect") {
    super(rootCy, [...dataCySelectors]);
  }

  public search(term: string) {
    this.el.search.dataCy("textField").type(term);
  }
}
