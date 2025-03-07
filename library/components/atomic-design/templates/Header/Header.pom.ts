/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { Cy, CyPom } from "@orch-ui/tests";
import { dataCy } from "./Header";

const dataCySelectors = ["menuDocumentation", "profile"] as const;
type Selectors = (typeof dataCySelectors)[number];

export class HeaderPom extends CyPom<Selectors> {
  constructor(public rootCy: string = dataCy) {
    super(rootCy, [...dataCySelectors]);
  }

  public getProjectName(): Cy {
    return cy.get(".project-name");
  }
}
export default HeaderPom;
