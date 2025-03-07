/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { CyPom } from "@orch-ui/tests";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

class ApplicationReviewPom extends CyPom<Selectors> {
  constructor(public rootCy: string) {
    super(rootCy, [...dataCySelectors]);
  }

  public getRows() {
    return this.root.find("tbody tr");
  }

  public getLabel(tr: JQuery<HTMLElement>) {
    return cy.wrap(tr).find("td").first();
  }

  public getValue(tr: JQuery<HTMLElement>) {
    return cy.wrap(tr).find("td").last();
  }
}

export default ApplicationReviewPom;
