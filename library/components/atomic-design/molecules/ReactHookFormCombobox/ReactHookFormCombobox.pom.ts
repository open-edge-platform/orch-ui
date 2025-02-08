/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { Cy, CyPom } from "@orch-ui/tests";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

export class ReactHookFormComboboxPom extends CyPom<Selectors> {
  constructor(public rootCy: string = "reactHookFormCombobox") {
    super(rootCy, [...dataCySelectors]);
  }

  public getInput(isEditable: boolean = true): Cy {
    //Need to click to make it actionable for typing
    const inputSelector = "input.spark-combobox-button-label";
    if (isEditable) this.root.find(inputSelector).click();
    return this.root.find(inputSelector);
  }

  public openCombobox(): void {
    this.root.find(".spark-icon").click();
  }

  public selectComboboxItem(index: number): void {
    this.openCombobox();
    this.getPopOver()
      .find(`ul>li:nth-child(${index + 1})`)
      .click();
  }

  public getPopOver() {
    // Technically, cy.get(".spark-popover.spark-shadow"); is the correct element
    // to grab but Cypress doesn't  allow keyboard interactions on <div/> afterwards
    return cy.get("body");
  }

  public getErrorMessage(timeout: number = 10000): Cy {
    return this.root.find(".spark-fieldtext-wrapper-is-invalid", { timeout });
  }
}
