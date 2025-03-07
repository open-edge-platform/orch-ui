/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { CyPom } from "@orch-ui/tests";
import DeploymentPackageCreateEditPom from "../../organisms/deploymentPackages/DeploymentPackageCreateEdit/DeploymentPackageCreateEdit.pom";
import { dataCy } from "./DeploymentPackageEdit";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

class DeploymentPackageEditPom extends CyPom<Selectors> {
  dpEditPom: DeploymentPackageCreateEditPom;
  constructor(public rootCy = dataCy) {
    super(rootCy, [...dataCySelectors]);
    this.dpEditPom = new DeploymentPackageCreateEditPom();
  }
}

export default DeploymentPackageEditPom;
