/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { CyPom } from "@orch-ui/tests";
import { TreeBranchPom } from "../../molecules/TreeBranch/TreeBranch.pom";
import { dataCy } from "./Tree";

const dataCySelectors = ["error"] as const;
type Selectors = (typeof dataCySelectors)[number];

export class TreePom extends CyPom<Selectors> {
  public branch = new TreeBranchPom();
  constructor(public rootCy: string = dataCy) {
    super(rootCy, [...dataCySelectors]);
  }
}
