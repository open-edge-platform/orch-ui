/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */
import { RbacRibbonButtonPom, RibbonPom } from "@orch-ui/components";
import { CyPom } from "@orch-ui/tests";
import DeploymentPackageTablePom from "../../organisms/deploymentPackages/DeploymentPackageTable/DeploymentPackageTable.pom";
import { dataCy } from "./DeploymentPackages";

const dataCySelectors = [
  "title",
  "packagesTabContent",
  "extensionsTabContent",
] as const;

type Selectors = (typeof dataCySelectors)[number];

class DeploymentPackagesPom extends CyPom<Selectors> {
  public deploymentPackageTable: DeploymentPackageTablePom;
  public importButtonPom: RbacRibbonButtonPom;
  public createButtonPom: RbacRibbonButtonPom;
  public ribbonPom: RibbonPom;
  constructor(public rootCy = dataCy) {
    super(rootCy, [...dataCySelectors]);
    this.deploymentPackageTable = new DeploymentPackageTablePom();
    this.importButtonPom = new RbacRibbonButtonPom("ribbonButtonimport");
    this.createButtonPom = new RbacRibbonButtonPom("ribbonButtoncreate");
    this.ribbonPom = new RibbonPom();
  }
}

export default DeploymentPackagesPom;
