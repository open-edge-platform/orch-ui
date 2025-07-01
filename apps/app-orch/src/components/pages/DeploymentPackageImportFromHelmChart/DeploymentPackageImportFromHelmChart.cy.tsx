/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import DeploymentPackageImportFromHelmChart from "./DeploymentPackageImportFromHelmChart";
import DeploymentPackageImportFromHelmChartPom from "./DeploymentPackageImportFromHelmChart.pom";

const pom = new DeploymentPackageImportFromHelmChartPom();

describe("<DeploymentPackageImportFromHelmChart />", () => {
  beforeEach(() => {
    cy.mount(<DeploymentPackageImportFromHelmChart />);
  });

  it("renders title and subtitle correctly", () => {
    pom.title.should("contain.text", "Import from Helm Chart");
    pom.subTitle.should(
      "contain.text",
      "Provide Helm Chart details to import a deployment",
    );
  });

  it("displays input fields and allows typing", () => {
    pom.helmChartUrl.type("https://example.com/chart");
    pom.advSettingsPom.el.advSettingsTrue.click({ force: true });
    pom.username.type("my-user");
    pom.password.type("my-pass");

    pom.helmChartUrl.should("have.value", "https://example.com/chart");
    pom.username.should("have.value", "my-user");
    pom.password.should("have.value", "my-pass");
  });

  it("shows required error for helmChartURL when cleared", () => {
    pom.helmChartUrl.type(" ").clear();
    cy.contains("Helm Chart URL is required").should("be.visible");
  });
});
