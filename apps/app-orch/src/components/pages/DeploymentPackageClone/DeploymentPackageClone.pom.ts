/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { CyPom } from "@orch-ui/tests";
import DeploymentPackageCreateEditPom from "../../organisms/deploymentPackages/DeploymentPackageCreateEdit/DeploymentPackageCreateEdit.pom";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

class DeploymentPackageClonePom extends CyPom<Selectors> {
  dpEditPom: DeploymentPackageCreateEditPom;
  constructor(public rootCy = "deploymentPackageClone") {
    super(rootCy, [...dataCySelectors]);
    this.dpEditPom = new DeploymentPackageCreateEditPom();
  }
}

export default DeploymentPackageClonePom;
