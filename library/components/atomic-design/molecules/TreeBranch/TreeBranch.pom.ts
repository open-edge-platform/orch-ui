/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { CyPom } from "@orch-ui/tests";
import { TreeExpanderPom } from "../TreeExpander/TreeExpander.pom";
import { dataCy } from "./TreeBranch";

const dataCySelectors = ["content"] as const;
type Selectors = (typeof dataCySelectors)[number];

export class TreeBranchPom extends CyPom<Selectors> {
  public treeExpander = new TreeExpanderPom();
  constructor(public rootCy: string = dataCy) {
    super(rootCy, [...dataCySelectors]);
  }
}
