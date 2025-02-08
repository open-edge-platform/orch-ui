/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { RadioCardPom } from "@orch-ui/components";
import { CyPom } from "@orch-ui/tests";
import { dataCy } from "./SelectDeploymentType";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

class SelectDeploymentTypePom extends CyPom<Selectors> {
  public radioCardManual: RadioCardPom;
  public radioCardAutomatic: RadioCardPom;
  constructor(public rootCy: string = dataCy) {
    super(rootCy, [...dataCySelectors]);
    this.radioCardManual = new RadioCardPom("radioCardManual");
    this.radioCardAutomatic = new RadioCardPom("radioCardAutomatic");
  }
}

export default SelectDeploymentTypePom;
