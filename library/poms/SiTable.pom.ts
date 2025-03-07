/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { Cy, CyPom } from "@orch-ui/tests";

const dataCySelectors = ["empty"] as const;
type Selectors = (typeof dataCySelectors)[number];

export class SiTablePom extends CyPom<Selectors> {
  constructor(public rootCy: string = "table") {
    super(rootCy, [...dataCySelectors]);
  }

  public getRows(): Cy {
    return this.root.find(".spark-table-body .spark-table-row");
  }

  public getColumns(): Cy {
    return this.root.get("thead th");
  }

  public getRow(n: number): Cy {
    return this.getRows().eq(n - 1);
  }

  public expandRow(row: number) {
    cy.get(".spark-table-cell:first-child .spark-icon").eq(row).click();
  }

  public selectRow(row: number) {
    cy.get(".spark-table-cell:first-child .spark-table-rows-select-checkbox")
      .eq(row)
      .click();
  }

  public sortColumnByHeader(row: number) {
    cy.get("thead th").eq(row).click();
  }

  public getRowBySearchText(searchFor: string): Cy<HTMLTableRowElement> {
    return this.root.contains(searchFor).closest("tr");
  }

  public getRowBySearchTerms(terms: string[], onRowFound: (row: Cy) => void) {
    const rows = this.getRows();
    let matchingRow: HTMLElement | null = null;
    let result: Cy | null = null;
    rows.then(($el: JQuery<HTMLElement>) => {
      if (!$el) return;
      for (let i = 0; i < $el.length; i++) {
        //going through rows
        const text = $el[i].innerText;
        matchingRow = $el[i];
        for (const index in terms) {
          if (!text.includes(terms[index])) {
            matchingRow = null;
            break;
          }
        }
        if (matchingRow !== null) {
          result = cy.wrap($el[i]);
          onRowFound(result);
        }
      }
    });
  }

  public getCellBySearchText(searchFor: string): Cy<HTMLTableCellElement> {
    return this.root.contains(searchFor).closest("td");
  }
  public getCell(row: number, column: number) {
    const getRow = this.getRow(row);
    const cell = getRow.find(".spark-table-cell").eq(column - 1);
    return cell;
  }
  public getPagination() {
    return this.root.get(".spark-pagination");
  }
  public getPaginationButton(btn: number) {
    return this.root
      .get(".spark-pagination .spark-pagination-list .spark-button")
      .eq(btn + 1);
  }
  public getNextBtn() {
    return this.getPagination().get('[data-testid="pagination-next"]');
  }
  public getLastBtn() {
    return this.getPagination().get('[data-testid="pagination-last"]');
  }
  public getPrevBtn() {
    return this.getPagination().get('[data-testid="pagination-previous"]');
  }
  public getFirstBtn() {
    return this.getPagination().get('[data-testid="pagination-first"]');
  }
  public selectPageSize(item: 1 | 2 | 3 | 4) {
    this.root
      .get(".spark-pagination .spark-pagination-control .spark-dropdown")
      .click();
    cy.get(".spark-list-item")
      .eq(item - 1)
      .click();
  }
}
