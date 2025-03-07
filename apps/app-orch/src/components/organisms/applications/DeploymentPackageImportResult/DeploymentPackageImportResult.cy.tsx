/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import DeploymentPackageImportResult from "./DeploymentPackageImportResult";
import DeploymentPackageImportResultPom from "./DeploymentPackageImportResult.pom";

const pom = new DeploymentPackageImportResultPom();
describe("<DeploymentPackageImportResult />", () => {
  it("should render component with warning", () => {
    cy.mount(
      <DeploymentPackageImportResult
        results={[
          {
            filename: "test.yaml",
            status: "success",
            errors: [],
          },
          {
            filename: "error.yaml",
            status: "failed",
            errors: ["error one", "error two"],
          },
        ]}
        isError={true}
      />,
    );
    pom.root.should("exist");
    pom.resultTable.root.should("be.exist");
    pom.resultTable.getRows().should("have.length", 2);
    pom.resultTable.getCell(1, 1).contains("test.yaml");
    pom.resultTable.getCell(1, 2).contains("Successful");
    pom.resultTable.getCell(2, 1).contains("error.yaml");
    pom.resultTable.getCell(2, 2).contains("Failed. error one; error two");
    pom.getMsgBannerTitle().contains("Warning");
    pom
      .getMsgBannerDescription()
      .contains("Few of the files couldn't be imported.");
  });
  it("should render component with success message", () => {
    cy.mount(
      <DeploymentPackageImportResult
        results={[
          {
            filename: "test.yaml",
            status: "success",
            errors: [],
          },
        ]}
        isError={false}
      />,
    );
    pom.getMsgBannerTitle().contains("Success");
    pom
      .getMsgBannerDescription()
      .contains("All the files imported successfully.");
  });
  it("should render component with success message", () => {
    cy.mount(
      <DeploymentPackageImportResult
        results={[
          {
            filename: "error.yaml",
            status: "failed",
            errors: ["error one", "error two"],
          },
        ]}
        isError={true}
      />,
    );
    pom.getMsgBannerTitle().contains("Failure");
    pom.getMsgBannerDescription().contains("Files couldn't be imported.");
  });
  it("should render component with error message even without errors", () => {
    cy.mount(
      <DeploymentPackageImportResult
        results={[
          {
            filename: "error.yaml",
            status: "failed",
            errors: [],
          },
        ]}
        isError={true}
      />,
    );
    pom.getMsgBannerTitle().contains("Failure");
    pom
      .getMsgBannerDescription()
      .contains("UNKNOW_ERROR. Please contact the administrator.");
    pom.root.should("not.contain", "Success");
  });
});
