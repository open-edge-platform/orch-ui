/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { SiTablePom } from "@orch-ui/poms";
import { CyPom } from "@orch-ui/tests";
import { ApiErrorPom } from "../../atoms/ApiError/ApiError.pom";
import { TableLoaderPom } from "../../atoms/TableLoader/TableLoader.pom";
import { EmptyPom } from "../../molecules/Empty/Empty.pom";
import { RibbonPom } from "../Ribbon/Ribbon.pom";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

export class OrchTablePom extends CyPom<Selectors> {
  public ribbon: RibbonPom;
  public loader: TableLoaderPom;
  public error: ApiErrorPom;
  public empty: EmptyPom;
  public table: SiTablePom;
  constructor(public rootCy: string = "orchTable") {
    super(rootCy, [...dataCySelectors]);
    this.ribbon = new RibbonPom("ribbon");
    this.loader = new TableLoaderPom();
    this.error = new ApiErrorPom("apiError");
    this.empty = new EmptyPom("empty");
    this.table = new SiTablePom("table");
  }

  public clickFirstSortColumn(): void {
    this.table
      .getColumns()
      .first()
      .find(".spark-table-head-cell-box-sort")
      .click();
  }
}
