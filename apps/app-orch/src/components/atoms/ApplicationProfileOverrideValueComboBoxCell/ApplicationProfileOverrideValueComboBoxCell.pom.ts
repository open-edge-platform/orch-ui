/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { SiComboboxPom } from "@orch-ui/poms";
import { CyPom } from "@orch-ui/tests";
import { dataCy } from "./ApplicationProfileOverrideValueComboBoxCell";

const dataCySelectors = ["chartName", "chartValue", "overrideValue"] as const;
type Selectors = (typeof dataCySelectors)[number];

class ApplicationProfileOverrideValueComboBoxCellPom extends CyPom<Selectors> {
  public combobox = new SiComboboxPom("comboxParams");

  constructor(public rootCy: string = dataCy) {
    super(rootCy, [...dataCySelectors]);
  }

  getComboxOptions() {
    this.combobox.open();
    return cy.get(".spark-combobox-list-box").find("li");
  }
}
export default ApplicationProfileOverrideValueComboBoxCellPom;
