/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { Cy, CyPom } from "@orch-ui/tests";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

export class ReactHookFormTextFieldPom extends CyPom<Selectors> {
  constructor(public rootCy: string = "reactHookFormTextField") {
    super(rootCy, [...dataCySelectors]);
  }

  public getInput(): Cy {
    const inputSelector = "input.spark-input";
    return this.root.find(inputSelector);
  }

  public getInvalidEl(): Cy {
    const wrapperClass = ".spark-fieldtext-wrapper";
    const isInvalidClass = `${wrapperClass}-is-invalid`;
    return this.root
      .parents()
      .filter(wrapperClass)
      .first()
      .find(isInvalidClass);
  }
}
