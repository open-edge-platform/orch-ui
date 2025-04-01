/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { CyPom } from "@orch-ui/tests";

const dataCySelectors = ["dropdownList"] as const;
type Selectors = (typeof dataCySelectors)[number];

export class MultiSelectDropdownPom extends CyPom<Selectors> {
  constructor(public rootCy: string = "multiSelectDropdown") {
    super(rootCy, [...dataCySelectors]);
  }

  selectFromMultiDropdown(labels: string[]) {
    this.root.find(".spark-dropdown button").click();
    labels.map((label) => {
      this.el.dropdownList
        .find(".spark-popover .spark-scrollbar li")
        .contains(label)
        .click();
    });
  }

  verifyMultiDropdownSelections(verifyLabels: string[]) {
    this.root.find(".spark-dropdown button").click();
    verifyLabels.forEach((label) => {
      // Check if current option is present
      this.el.dropdownList
        .find(".spark-popover .spark-scrollbar li")
        .contains(label)
        // Get the parent containing text and checkbox
        .parent()
        // verify if check box is ticked
        .find("input")
        .should("be.checked");
    });
  }
}
