/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { CyApiDetail, CyPom } from "@orch-ui/tests";

export class SiComboboxPom<
  T extends string,
  U extends string = "",
> extends CyPom<T, U> {
  constructor(
    public rootCy: string = ".spark-combobox",
    properties: string[] = [],
    apis: Record<string, CyApiDetail> = {},
  ) {
    super(rootCy, properties, apis);
  }

  /**
   * Given a cy element opens the corresponding dropdown
   */
  public open() {
    this.root.find(".spark-combobox-arrow-button").click();
  }

  /**
   * Select an existing item from the combobox
   */
  public select(label: string) {
    this.open();
    // NOTE that the dropdown is not contained in the root
    cy.get(".spark-popover").contains(label).click();
  }

  /**
   * Types a new value in the combobox
   */
  public type(value: string) {
    this.root.find("input").type(value);
  }

  /**
   * Get items total
   */
  public hasTotal(totalItems: number) {
    this.open();
    cy.get(".spark-popover").should("have.length", totalItems);
  }

  /**
   * Check it has no values
   */
  public isEmpty() {
    this.open();
    cy.get(".spark-popover").should("not.exist");
  }
}
