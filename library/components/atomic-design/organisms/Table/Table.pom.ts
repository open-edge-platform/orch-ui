/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { Cy, cyGet, CyPom } from "@orch-ui/tests";
import { RibbonPom } from "../Ribbon/Ribbon.pom";

const dataCySelectors = [
  "pagination",
  "rowSelectCheckbox",
  "rowExpander",
  "rowCollapser",
  "allRowsExpander",
  "allRowsCollapser",
  "tableLoader",
  "noInformation",
  "search",
  "actions",
] as const;
type Selectors = (typeof dataCySelectors)[number];

export interface CustomRow {
  name: string;
  ver: string;
  description: string;
}

export interface CyTableRow {
  col1: string;
  col2: string;
  col3: string;
  col4: number;
  col5: string;
}

export function getRandomEmoji() {
  const emojis = ["😀", "😂", "🤣", "😍", "😎", "🤩", "🥳", "😜", "🤯", "😱"];
  const randomIndex = Math.floor(Math.random() * emojis.length);
  return emojis[randomIndex];
}

export const generateData = (size: number, offset = 0) =>
  [...Array(size).keys()].map(
    (index): CustomRow => ({
      name: `Data ${index + offset}`,
      ver: "1.0.0",
      description: `Data ${index + offset} description`,
    }),
  );

export const data: CyTableRow[] = [
  {
    col1: "c",
    col2: "x",
    col3: "three",
    col4: 98,
    col5: "A-site-1",
  },
  {
    col1: "d",
    col2: "w",
    col3: "four",
    col4: 11,
    col5: "HHH",
  },
  {
    col1: "A",
    col2: "Z",
    col3: "one",
    col4: 2,
    col5: "a-site-1",
  },
  {
    col1: "B",
    col2: "Y",
    col3: "two",
    col4: 9,
    col5: "alpha",
  },

  {
    col1: "E",
    col2: "V",
    col3: "five",
    col4: 543,
    col5: "b-site-1",
  },
  {
    col1: "F",
    col2: "U",
    col3: "six",
    col4: 877,
    col5: "c-site-1",
  },
  {
    col1: "G",
    col2: "T",
    col3: "seven",
    col4: 34,
    col5: "eee",
  },
  {
    col1: "H",
    col2: "S",
    col3: "eight",
    col4: 65,
    col5: "hhhhhh",
  },
  {
    col1: "I",
    col2: "R",
    col3: "nine",
    col4: 7,
    col5: "ssss",
  },
  {
    col1: "C",
    col2: "X",
    col3: "three",
    col4: 98,
    col5: "A site 1",
  },
  {
    col1: "D",
    col2: "W",
    col3: "four",
    col4: 11,
    col5: "H H",
  },
  {
    col1: "J",
    col2: "Q",
    col3: "ten",
    col4: 430,
    col5: "a site 1",
  },
  {
    col1: "a",
    col2: "z",
    col3: "one",
    col4: 2,
    col5: "12",
  },
  {
    col1: "b",
    col2: "y",
    col3: "two",
    col4: 9,
    col5: "12",
  },

  {
    col1: "e",
    col2: "v",
    col3: "five",
    col4: 543,
    col5: "12",
  },
  {
    col1: "f",
    col2: "u",
    col3: "six",
    col4: 877,
    col5: "12",
  },
  {
    col1: "i",
    col2: "r",
    col3: "nine",
    col4: 7,
    col5: "12",
  },
  {
    col1: "j",
    col2: "q",
    col3: "ten",
    col4: 430,
    col5: "12",
  },
  {
    col1: "g",
    col2: "t",
    col3: "seven",
    col4: 34,
    col5: "12",
  },
  {
    col1: "h",
    col2: "s",
    col3: "eight",
    col4: 65,
    col5: "12",
  },
];

const page1Rows = generateData(7);
page1Rows.push(
  {
    name: "Data 0",
    ver: "1.0.1",
    description: "Data 0 description",
  },
  {
    name: "Data 0",
    ver: "1.0.2",
    description: "Data 0 description",
  },
  {
    name: "Data 1",
    ver: "1.1.0",
    description: "Data 1 description",
  },
);
export const page1Data = page1Rows;
export const page2Data = generateData(8, 10);
export const getMultiColumnKeyIdFromRow = (row: CustomRow) =>
  `${row.name},${row.ver}`;

type cyOptions = Partial<
  Cypress.Loggable & Cypress.Timeoutable & Cypress.Withinable & Cypress.Shadow
>;

export class TablePom extends CyPom<Selectors> {
  tableRibbon: RibbonPom;
  constructor(public rootCy: string = "table") {
    super(rootCy, [...dataCySelectors]);
    this.tableRibbon = new RibbonPom();
  }

  public getRows(options?: cyOptions): Cy {
    // NOTE we need to reconcile the cypress configs in order to use .dataCy
    return cy.get(`[data-cy="${this.rootCy}"]`, options).find(".table-row");
  }

  public getColumnHeader(index: number): Cy {
    return this.root.find(".table-header-cell").eq(index);
  }

  public getColumnHeaderSortArrows(index: number): Cy {
    const header = this.getColumnHeader(index);
    return header.find(".table-header-sort-arrows");
  }

  public getCellBySearchText(searchFor: string): Cy<HTMLTableCellElement> {
    return this.root.contains(searchFor).closest("td");
  }

  public getTotalItemCount(): Cy {
    return this.root.find('[data-testid="pagination-control-total"]');
  }

  public getRow(n: number, options?: cyOptions): Cy {
    return this.getRows(options).eq(n - 1);
  }

  public getCell(row: number, column: number, options?: cyOptions) {
    return this.getRow(row)
      .find(".table-row-cell")
      .eq(column - 1, options);
  }

  public getPageButton(page: number): Cy {
    return this.root.find(`[data-testid="page-btn-${page}"]`);
  }

  public getNextPageButton(): Cy {
    return this.root.find('[data-testid="pagination-next"]');
  }

  public getLastPageButton(): Cy {
    return this.root.find('[data-testid="pagination-last"]');
  }

  public getPreviousPageButton(): Cy {
    return this.root.find('[data-testid="pagination-previous"]');
  }

  public getFirstPageButton(): Cy {
    return this.root.find('[data-testid="pagination-first"]');
  }

  public expandRow(row: number) {
    cyGet("rowExpander").eq(row).click();
  }

  /**
   * Searches the table for a term and waits for the search to complete.
   * @param term The term to search for.
   * @param intercept Whether to intercept the search request. Defaults to true. Set it to false if the search is on local data.
   */
  public search(term: string, intercept: boolean = true) {
    this.root.should("be.visible");
    if (intercept) {
      cy.intercept({
        url: "**filter*", // TODO we might need to parametrize this URL
        method: "GET",
        times: 1,
      }).as("search");
    }
    this.el.search.type(term);
    if (intercept) {
      // Wait for the search request to complete
      cy.wait("@search");
    }
  }
}
