/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { Cy, CyPom } from "@orch-ui/tests";

const dataCySelectors = [
  "add",
  "delete",
  "displayName",
  "defaultValue",
  "suggestedValue",
  "paramSelect",
  "paramFlagsSelect",
] as const;
type Selectors = (typeof dataCySelectors)[number];

class ParameterOverridesFormPom extends CyPom<Selectors> {
  constructor(public rootCy: string = "parameterOverridesForm") {
    super(rootCy, [...dataCySelectors]);
  }

  public expectRows(rows: number): Cy {
    return this.root
      .get("div.parameter-overrides-form__entries")
      .should("have.length", rows);
  }

  public getRow(num: number): Cy {
    return this.root.find("div.parameter-overrides-form__entries").eq(num);
  }

  public deleteRow(num: number): Cy {
    return this.root
      .find("div.parameter-overrides-form__entries")
      .eq(num)
      .within(() => {
        cy.get('[data-cy="delete"]').click();
      });
  }
}
export default ParameterOverridesFormPom;
