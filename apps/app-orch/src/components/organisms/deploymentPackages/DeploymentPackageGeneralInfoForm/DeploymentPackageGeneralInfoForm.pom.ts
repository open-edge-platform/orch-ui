/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { catalog } from "@orch-ui/apis";
import { CyPom } from "@orch-ui/tests";

const dataCySelectors = ["name", "version", "desc"] as const;
type Selectors = (typeof dataCySelectors)[number];

class DeploymentPackageGeneralInfoFormPom extends CyPom<Selectors> {
  constructor(public rootCy = "deploymentPackageGeneralInfoForm") {
    super(rootCy, [...dataCySelectors]);
  }

  get nameTextField() {
    return this.el.name.parentsUntil(".spark-text-field-container");
  }

  get nameTextInvalidIndicator() {
    return this.nameTextField.find(".spark-fieldtext-wrapper-is-invalid");
  }

  fillGeneralInfoForm(deploymentPackage: Partial<catalog.DeploymentPackage>) {
    this.el.name.type(deploymentPackage.displayName!);
    this.el.version.type(deploymentPackage.version!);
    this.el.desc.type(deploymentPackage.description ?? "");
  }
}

export default DeploymentPackageGeneralInfoFormPom;
