/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { TablePom } from "@orch-ui/components";
import { Cy, CyPom } from "@orch-ui/tests";
import { dataCy } from "./HostConfigReview";

const dataCySelectors = [
  "totalHosts",
  "operatingSystem",
  "security",
  "siteName",
  "expandToggle",
  "hostConfigReviewTable",
] as const;
type Selectors = (typeof dataCySelectors)[number];

export class HostConfigReviewPom extends CyPom<Selectors> {
  public table: TablePom;
  constructor(public rootCy: string = dataCy) {
    super(rootCy, [...dataCySelectors]);
    this.table = new TablePom(rootCy);
  }

  public getRows(): Cy {
    return this.root.find("[data-cy='tableRow']");
  }

  public getColumnHeader(index: number): Cy {
    return this.root.find("[data-cy='tableHeaderCell']").eq(index);
  }

  public getCell(row: number, column: number) {
    const getRow = this.getRows().eq(row - 1);
    return getRow.find("[data-cy='tableRowCell']").eq(column - 1);
  }
}
