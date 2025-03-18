/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { CyPom } from "@orch-ui/tests";
import DeploymentPackageProfileAddEditDrawerPom from "../DeploymentPackageProfileAddEditDrawer/DeploymentPackageProfileAddEditDrawer.pom";
import DeploymentPackageProfileListPom from "../DeploymentPackageProfileList/DeploymentPackageProfileList.pom";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

class DeploymentPackageProfileFormPom extends CyPom<Selectors> {
  addEditProfileDrawer: DeploymentPackageProfileAddEditDrawerPom;
  profileList: DeploymentPackageProfileListPom;
  constructor(public rootCy = "deploymentPackageProfileForm") {
    super(rootCy, [...dataCySelectors]);
    this.addEditProfileDrawer = new DeploymentPackageProfileAddEditDrawerPom();
    this.profileList = new DeploymentPackageProfileListPom();
  }
}

export default DeploymentPackageProfileFormPom;
