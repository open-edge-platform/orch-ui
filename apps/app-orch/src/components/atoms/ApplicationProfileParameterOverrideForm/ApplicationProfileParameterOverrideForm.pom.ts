/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { EmptyPom, TablePom } from "@orch-ui/components";
import { SiComboboxPom, SiTablePom } from "@orch-ui/poms";
import { CyPom } from "@orch-ui/tests";
import ApplicationProfileOverrideValueComboxCellPom from "../ApplicationProfileOverrideValueComboBoxCell/ApplicationProfileOverrideValueComboBoxCell.pom";

const dataCySelectors = [
  "emptyList",
  "chartName",
  "chartValue",
  "overrideValue",
  "parameterOverrideDeploymentRow",
] as const;
type Selectors = (typeof dataCySelectors)[number];

class ApplicationProfileParameterOverrideFormPom extends CyPom<Selectors> {
  public combobox: SiComboboxPom<string, "">;
  public overrideComboboxCell: ApplicationProfileOverrideValueComboxCellPom;
  public table: TablePom;
  public tableUtil: SiTablePom;
  public empty: EmptyPom;

  constructor(
    public rootCy: string = "applicationProfileParameterOverrideForm",
  ) {
    super(rootCy, [...dataCySelectors]);

    this.combobox = new SiComboboxPom("comboxParams");
    this.table = new TablePom("formTable");
    this.tableUtil = new SiTablePom("formTable");
    this.overrideComboboxCell =
      new ApplicationProfileOverrideValueComboxCellPom();
    this.empty = new EmptyPom();
  }

  public selectParam(row: number, value: string): void {
    this.table.getRows().eq(row).find(".spark-combobox-arrow-button").click();
    cy.get(".spark-popover").contains(value).click();
  }

  public typeParam(row: number, value: string): void {
    if (value.length == 0) {
      this.table.getRows().eq(row).find(".spark-combobox input").clear();
    } else {
      this.table
        .getRows()
        .eq(row)
        .find(".spark-combobox input")
        .clear()
        .type(value);
    }
  }

  public isSelected(row: number, value: string): void {
    this.table
      .getRows()
      .eq(row)
      .find(".spark-combobox input")
      .should("have.value", value);
  }
}

export default ApplicationProfileParameterOverrideFormPom;
