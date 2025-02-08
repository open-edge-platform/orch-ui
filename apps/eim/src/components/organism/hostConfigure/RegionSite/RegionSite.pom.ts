/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { CyPom } from "@orch-ui/tests";

const dataCySelectors = ["search"] as const;
type Selectors = (typeof dataCySelectors)[number];

export class RegionAndSitePom extends CyPom<Selectors> {
  constructor(public rootCy: string = "hostSiteSelect") {
    super(rootCy, [...dataCySelectors]);
  }

  public search(term: string) {
    this.el.search.dataCy("textField").type(term);
  }
}
