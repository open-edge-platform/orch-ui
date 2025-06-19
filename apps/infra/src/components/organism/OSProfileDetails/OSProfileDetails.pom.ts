/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { TablePom } from "@orch-ui/components";
import { CyPom } from "@orch-ui/tests";

const dataCySelectors = ["installedPackagesRoot", "cveTabRoot"] as const;
type Selectors = (typeof dataCySelectors)[number];

export class OSProfileDetailsPom extends CyPom<Selectors> {
  public table: TablePom;
  constructor(public rootCy: string = "osProfileDetails") {
    super(rootCy, [...dataCySelectors]);
    this.table = new TablePom();
  }

  getTab(tabName: string) {
    return this.root.find(".spark-tabs-tab").contains(tabName);
  }
}
