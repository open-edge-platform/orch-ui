/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { Cy, CyApiDetail, CyPom } from "@orch-ui/tests";

export class SiDropdown<T extends string, U extends string = ""> extends CyPom<
  T,
  U
> {
  constructor(
    public rootCy: string = ".spark-dropdown",
    properties: string[] = [],
    apis: Record<string, CyApiDetail> = {},
  ) {
    super(rootCy, properties, apis);
  }

  /**
   * Given a cy element opens the corresponding dropdown
   */
  public openDropdown(el: Cy) {
    // NOTE that SI in dropdowns duplicates the data-cy attribute
    el.first().within(() => {
      cy.get("button").click();
    });
  }

  public selectDropdownValue(el: Cy, name: string, label: string, val = "") {
    el.first().within(() => {
      this.cyGetByAttr("select", { name })
        .select(label, {
          force: true,
        })
        .should("have.value", val);
    });
  }

  public selectDropdownValueByLabel(el: Cy, name: string, label: string) {
    el.first().within(() => {
      this.cyGetByAttr("select", { name }).select(label, {
        force: true,
      });
    });
  }

  public getDropdownValue(el: Cy, name: string, label: string, val = "") {
    el.first().within(() => {
      this.cyGetByAttr("select", { name }).should("have.value", val);
    });
  }

  public getDropdown(name: string) {
    return cy.get(`[data-cy="${name}"] > .spark-button-content`);
  }

  public selectFirstListItemValue(): void {
    cy.get(".spark-popover .spark-list-item:first-child").click();
  }

  public selectNthListItemValue(nth: number): void {
    cy.get(`.spark-popover .spark-list-item:nth-child(${nth})`).click();
  }
}
