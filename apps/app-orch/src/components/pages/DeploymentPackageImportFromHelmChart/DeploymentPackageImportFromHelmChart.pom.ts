/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { AdvancedSettingsTogglePom } from "@orch-ui/components";
import { CyPom } from "@orch-ui/tests";
const dataCySelectors = ["helmChartUrl", "username", "password"] as const;
type Selectors = (typeof dataCySelectors)[number];

class DeploymentPackageImportFromHelmChartPom extends CyPom<Selectors> {
  public advSettingsPom: AdvancedSettingsTogglePom;
  constructor(public rootCy = "deploymentPackageGeneralInfoForm") {
    super(rootCy, [...dataCySelectors]);
    this.advSettingsPom = new AdvancedSettingsTogglePom();
  }

  get root() {
    return cy.get("[data-cy='deploymentPackageImportFromHelmChart']");
  }

  get title() {
    return cy.get("[data-cy='title']");
  }

  get subTitle() {
    return cy.get("[data-cy='subTitle']");
  }

  get helmChartUrl() {
    return cy.get("input[name='helmChartURL']");
  }

  get username() {
    return cy.get("input[name='username']");
  }

  get password() {
    return cy.get("input[name='password']");
  }

  getErrors() {
    return cy.get(".spark-form-field__error-message");
  }
}

export default DeploymentPackageImportFromHelmChartPom;
