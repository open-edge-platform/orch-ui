/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { CyPom } from "shared/cypress/support/cyBase";
import { SelectProfileTablePom } from "../../setup-deployments/SelectProfileTable/SelectProfileTable.pom";
import { dataCy } from "./ChangePackageProfile";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

class ChangePackageProfilePom extends CyPom<Selectors> {
  public selectProfilePom: SelectProfileTablePom;
  constructor(public rootCy: string = dataCy) {
    super(rootCy, [...dataCySelectors]);
    this.selectProfilePom = new SelectProfileTablePom();
  }
}
export default ChangePackageProfilePom;
