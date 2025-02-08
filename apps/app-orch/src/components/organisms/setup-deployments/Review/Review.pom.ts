/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { TablePom } from "@orch-ui/components";
import { SiTablePom } from "@orch-ui/poms";
import { Cy, CyPom } from "@orch-ui/tests";

const dataCySelectors = [
  "applicationPackage",
  "deployment",
  "profile",
  "selectCluster",
  "clusterReviewList",
  "reviewTable",
] as const;
type Selectors = (typeof dataCySelectors)[number];

export class ReviewPom extends CyPom<Selectors> {
  /** review table */
  table: TablePom;
  selectClusterTable: TablePom;
  selectClusterTableUtils: SiTablePom;
  constructor(public rootCy: string) {
    super(rootCy, [...dataCySelectors]);
    this.table = new TablePom("reviewTable");
    this.selectClusterTable = new TablePom("clusterReviewList");
    this.selectClusterTableUtils = new SiTablePom("clusterReviewList");
  }

  public getReviewTable() {
    return this.root.get("table");
  }
  public getReviewTableRows(): Cy {
    return this.root.get("table tbody tr");
  }
}
