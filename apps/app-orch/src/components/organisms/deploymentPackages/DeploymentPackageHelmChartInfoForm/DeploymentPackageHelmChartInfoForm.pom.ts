import { CyPom } from "@orch-ui/tests";

const dataCySelectors = ["helm-chart-url", "username", "password", "description"] as const;
type Selectors = (typeof dataCySelectors)[number];

class DeploymentPackageHelmChartInfoFormPom extends CyPom<Selectors> {
  constructor(public rootCy = "deploymentPackageGeneralInfoForm") {
    super(rootCy, [...dataCySelectors]);
  }

  get helmChartUrlField() {
    return this.el["helm-chart-url"].parentsUntil(".spark-text-field-container");
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

  get descriptionTextarea() {
  return this.el.description.find("textarea");
}
}

export default DeploymentPackageHelmChartInfoFormPom;