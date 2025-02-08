/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { TreePom } from "@orch-ui/components";
import { CyPom } from "@orch-ui/tests";
import { dataCy } from "./Region";

const dataCySelectors = ["regionTreePopup", "Delete"] as const;
type Selectors = (typeof dataCySelectors)[number];

export class RegionPom extends CyPom<Selectors> {
  public tree: TreePom;
  constructor(public rootCy: string = dataCy) {
    super(rootCy, [...dataCySelectors]);
    this.tree = new TreePom();
  }
}
