/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */
import DeploymentPackageImport from "./DeploymentPackageImport";
import DeploymentPackageImportPom from "./DeploymentPackageImport.pom";

const pom = new DeploymentPackageImportPom();
describe("<DeploymentPackageImport />", () => {
  beforeEach(() => {
    cy.mount(<DeploymentPackageImport />);
  });
  it("should import files correctly", () => {
    pom.uploadButtonEmpty.uploadFile("cypress/fixtures/");
    pom.getFileByIndex(0).contains("test.yaml");
    pom.getFileByIndex(1).contains("example.yaml");
  });

  it("should delete file correctly", () => {
    pom.uploadButtonEmpty.uploadFile("cypress/fixtures/");
    pom.deleteFileByIndex(0);
    pom.getFiles().should("have.length", 1);
  });

  it("should drag and drop files correctly", () => {
    pom.uploadButtonEmpty.uploadFile("cypress/fixtures/");
    pom.uploadButtonList.dragDropFile("cypress/fixtures/");
    pom.getFileByIndex(0).contains("test.yaml");
    pom.getFileByIndex(1).contains("example.yaml");
  });

  it("should show error message banner when import failed", () => {
    pom.uploadButtonEmpty.uploadFile("cypress/fixtures/");
    pom.interceptApis([pom.api.dpImportFail]);
    pom.el.importButton.click();
    pom.waitForApis();
    pom.messageBanner.should("be.visible").contains("root cause of failure");
  });

  it("should show error message banner when import failed", () => {
    pom.uploadButtonEmpty.uploadFile("cypress/fixtures/");
    pom.interceptApis([pom.api.dpImportSuccess]);
    pom.el.importButton.click();
    pom.waitForApis();
    pom.messageBanner.should("be.visible");
    pom.messageBanner.should(
      "have.class",
      "spark-message-banner-state-success",
    );
  });
});
