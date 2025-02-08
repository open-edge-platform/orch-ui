/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { CyPom } from "@orch-ui/tests";
import DeploymentPackageDetailsProfileListPom from "../DeploymentPackageDetailsProfileList/DeploymentPackageDetailsProfileList.pom";
import { dataCy } from "./DeploymentPackageCreateEditReview";

const dataCySelectors = [
  "reviewSection",
  "name",
  "version",
  "description",
  "applicationListSection",
  "advancedSettingsSection",
] as const;
type Selectors = (typeof dataCySelectors)[number];

class DeploymentPackageCreateEditReviewPom extends CyPom<Selectors> {
  profileListPom: DeploymentPackageDetailsProfileListPom;
  constructor(public rootCy: string = dataCy) {
    super(rootCy, [...dataCySelectors]);
    this.profileListPom = new DeploymentPackageDetailsProfileListPom();
  }
}

export default DeploymentPackageCreateEditReviewPom;
