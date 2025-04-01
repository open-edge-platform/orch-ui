/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { CyPom } from "@orch-ui/tests";
import DeploymentPackageDetailsProfileListPom from "../DeploymentPackageDetailsProfileList/DeploymentPackageDetailsProfileList.pom";

const dataCySelectors = [
  "dpVersion",
  "dpDefaultProfile",
  "dpCreatedOn",
  "dpLastUpdate",
  "dpIsDeployed",
  "dpIsVisible",
] as const;
type Selectors = (typeof dataCySelectors)[number];

export class DeploymentPackageDetailsMainPom extends CyPom<Selectors> {
  profileListPom: DeploymentPackageDetailsProfileListPom;
  constructor(public rootCy = "deploymentPackageDetailsMain") {
    super(rootCy, [...dataCySelectors]);
    this.profileListPom = new DeploymentPackageDetailsProfileListPom();
  }
}
