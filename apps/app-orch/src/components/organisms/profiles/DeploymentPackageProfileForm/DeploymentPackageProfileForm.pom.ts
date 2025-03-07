/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { CyPom } from "@orch-ui/tests";
import DeploymentPackageProfileAddEditDrawerPom from "../DeploymentPackageProfileAddEditDrawer/DeploymentPackageProfileAddEditDrawer.pom";
import DeploymentPackageProfileListPom from "../DeploymentPackageProfileList/DeploymentPackageProfileList.pom";
import { dataCy } from "./DeploymentPackageProfileForm";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

class DeploymentPackageProfileFormPom extends CyPom<Selectors> {
  addEditProfileDrawer: DeploymentPackageProfileAddEditDrawerPom;
  profileList: DeploymentPackageProfileListPom;
  constructor(public rootCy = dataCy) {
    super(rootCy, [...dataCySelectors]);
    this.addEditProfileDrawer = new DeploymentPackageProfileAddEditDrawerPom();
    this.profileList = new DeploymentPackageProfileListPom();
  }
}

export default DeploymentPackageProfileFormPom;
