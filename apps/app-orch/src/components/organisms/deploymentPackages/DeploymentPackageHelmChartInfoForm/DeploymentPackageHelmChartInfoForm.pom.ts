/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { AdvancedSettingsTogglePom } from "@orch-ui/components";
import { CyPom } from "@orch-ui/tests";
const dataCySelectors = [
  "helmChartUrl",
  "username",
  "password",
  "importButton",
] as const;
type Selectors = (typeof dataCySelectors)[number];

class DeploymentPackageHelmChartInfoFormPom extends CyPom<Selectors> {
  public advSettingsPom: AdvancedSettingsTogglePom;
  constructor(public rootCy = "deploymentPackageGeneralInfoForm") {
    super(rootCy, [...dataCySelectors]);
    this.advSettingsPom = new AdvancedSettingsTogglePom();
  }

  get helmChartUrlField() {
    return this.el["helmChartUrl"].parentsUntil(".spark-text-field-container");
  }

  get helmChartUrlInvalidIndicator() {
    return this.helmChartUrlField.find(".spark-fieldtext-wrapper-is-invalid");
  }

  get usernameField() {
    return this.el.username.parentsUntil(".spark-text-field-container");
  }

  get usernameInvalidIndicator() {
    return this.usernameField.find(".spark-fieldtext-wrapper-is-invalid");
  }

  get passwordField() {
    return this.el.password.parentsUntil(".spark-text-field-container");
  }

  get passwordInvalidIndicator() {
    return this.passwordField.find(".spark-fieldtext-wrapper-is-invalid");
  }
}

export default DeploymentPackageHelmChartInfoFormPom;
