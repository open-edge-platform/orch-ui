/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { CyPom } from "@orch-ui/tests";

const dataCySelectors = ["name", "version", "description"] as const;
type Selectors = (typeof dataCySelectors)[number];

class DeploymentPackagePom extends CyPom<Selectors> {
  constructor(public rootCy: string = "deploymentPackage") {
    super(rootCy, [...dataCySelectors]);
  }
}
export default DeploymentPackagePom;
