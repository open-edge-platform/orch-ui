/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { CyPom } from "@orch-ui/tests";
import { dataCy } from "./DeploymentPackageGeneralInfoForm";

const dataCySelectors = ["name", "version", "desc", "publisher"] as const;
type Selectors = (typeof dataCySelectors)[number];

class DeploymentPackageGeneralInfoFormPom extends CyPom<Selectors> {
  constructor(public rootCy = dataCy) {
    super(rootCy, [...dataCySelectors]);
  }

  get nameTextField() {
    return this.el.name.parentsUntil(".spark-text-field-container");
  }

  get nameTextInvalidIndicator() {
    return this.nameTextField.find(".spark-fieldtext-wrapper-is-invalid");
  }
}

export default DeploymentPackageGeneralInfoFormPom;
