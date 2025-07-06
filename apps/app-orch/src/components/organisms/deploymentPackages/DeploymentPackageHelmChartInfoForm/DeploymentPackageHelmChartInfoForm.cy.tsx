/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { setupStore } from "../../../../store";
import DeploymentPackageHelmChartInfoForm from "./DeploymentPackageHelmChartInfoForm";
import DeploymentPackageHelmChartInfoFormPom from "./DeploymentPackageHelmChartInfoForm.pom";

const pom = new DeploymentPackageHelmChartInfoFormPom();

describe("<DeploymentPackageHelmChartInfoForm />", () => {
  beforeEach(() => {
    const store = setupStore({
      deploymentPackage: {
        applicationReferences: [],
        artifacts: [],
        extensions: [],
        name: "",
        version: "",
      },
    });
    cy.mount(<DeploymentPackageHelmChartInfoForm />, {
      reduxStore: store,
    });
    pom.advSettingsPom.el.advSettingsTrue.click({ force: true });
  });

  it("should render all fields with empty default values", () => {
    pom.el["helmChartUrl"].should("have.value", "");
    pom.el.username.should("have.value", "");
    pom.el.password.should("have.value", "");
  });

  describe("validation", () => {
    it("cannot put more than 70 characters for Helm Chart URL", () => {
      const longValue = "a".repeat(71);
      pom.el["helmChartUrl"].type(longValue);
      const shorterValue = "a".repeat(70);
      pom.el["helmChartUrl"].invoke("val").should("equal", shorterValue);
    });

    it("should not show error for valid Helm Chart URL", () => {
      pom.el["helmChartUrl"].type("valid-chart");
      pom.helmChartUrlInvalidIndicator.should("not.exist");
    });

    it("cannot put more than 30 characters for username", () => {
      const longValue = "a".repeat(31);
      pom.el["username"].type(longValue);
      const shorterValue = "a".repeat(30);
      pom.el["username"].invoke("val").should("equal", shorterValue);
    });

    it("should not show error for valid username", () => {
      pom.el["username"].type("valid-username");
      pom.helmChartUrlInvalidIndicator.should("not.exist");
    });

    it("cannot put more than 30 characters for password", () => {
      const longValue = "a".repeat(31);
      pom.el["password"].type(longValue);
      const shorterValue = "a".repeat(30);
      pom.el["password"].invoke("val").should("equal", shorterValue);
    });

    it("should not show error for valid password", () => {
      pom.el["password"].type("valid-password");
      pom.helmChartUrlInvalidIndicator.should("not.exist");
    });
  });

  it("should allow entering and clearing username", () => {
    pom.el.username.type("testuser");
    pom.el.username.should("have.value", "testuser");
    pom.el.username.clear();
    pom.el.username.should("have.value", "");
  });

  it("should allow entering and clearing password", () => {
    pom.el.password.type("secret");
    pom.el.password.should("have.value", "secret");
    pom.el.password.clear();
    pom.el.password.should("have.value", "");
  });

  it("should allow entering and clearing helm chart url", () => {
    pom.el["helmChartUrl"].type("my-helm-chart");
    pom.el["helmChartUrl"].should("have.value", "my-helm-chart");
    pom.el["helmChartUrl"].clear();
    pom.el["helmChartUrl"].should("have.value", "");
  });

  it("should trim whitespace in helm chart url and validate", () => {
    pom.el["helmChartUrl"].type("  validchart  ");
    pom.el["helmChartUrl"].should("have.value", "  validchart  ");
    pom.helmChartUrlInvalidIndicator.should("not.exist");
  });

  it("should show required error for username if field is required and left empty", () => {
    pom.el.username.focus().blur();
  });

  it("should show required error for password if field is required and left empty", () => {
    pom.el.password.focus().blur();
  });

  it("should not show any validation errors on pristine form", () => {
    pom.helmChartUrlInvalidIndicator.should("not.exist");
    pom.usernameInvalidIndicator.should("not.exist");
    pom.passwordInvalidIndicator.should("not.exist");
  });

  it("should allow special characters in username", () => {
    pom.el.username.type("user!@#");
    pom.helmChartUrlInvalidIndicator.should("not.exist");
  });

  it("should allow special characters in password", () => {
    pom.el.password.type("password!@#");
    pom.helmChartUrlInvalidIndicator.should("not.exist");
  });
});
