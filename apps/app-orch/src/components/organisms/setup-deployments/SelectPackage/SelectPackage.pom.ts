/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { RibbonPom } from "@orch-ui/components";
import { cyGet, CyPom } from "@orch-ui/tests";
import DeploymentPackageTablePom from "../../deploymentPackages/DeploymentPackageTable/DeploymentPackageTable.pom";

const dataCySelectors = ["packagesTabContent", "extensionsTabContent"] as const;
type Selectors = (typeof dataCySelectors)[number];

export class SelectPackagePom extends CyPom<Selectors> {
  public table = new DeploymentPackageTablePom();
  public ribbonPom = new RibbonPom();

  constructor(public rootCy = "selectPackage") {
    super(rootCy, [...dataCySelectors]);
  }

  selectDeploymentPackageByName(name: string) {
    cyGet(`${name}Selector`).click();
  }
}
