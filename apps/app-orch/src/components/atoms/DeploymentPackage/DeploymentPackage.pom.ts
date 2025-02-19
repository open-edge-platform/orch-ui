/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { CyPom } from "@orch-ui/tests";
import { dataCy } from "./DeploymentPackage";

const dataCySelectors = ["name", "version", "description"] as const;
type Selectors = (typeof dataCySelectors)[number];

class DeploymentPackagePom extends CyPom<Selectors> {
  constructor(public rootCy: string = dataCy) {
    super(rootCy, [...dataCySelectors]);
  }
}
export default DeploymentPackagePom;
