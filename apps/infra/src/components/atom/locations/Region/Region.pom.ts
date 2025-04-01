/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { TreePom } from "@orch-ui/components";
import { CyPom } from "@orch-ui/tests";

const dataCySelectors = ["regionTreePopup", "Delete"] as const;
type Selectors = (typeof dataCySelectors)[number];

export class RegionPom extends CyPom<Selectors> {
  public tree: TreePom;
  constructor(public rootCy: string = "region") {
    super(rootCy, [...dataCySelectors]);
    this.tree = new TreePom();
  }
}
