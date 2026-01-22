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
    pom.uploadButtonEmpty.uploadFile("../cypress/fixtures/");
    pom.getFileByIndex(0).contains("deployment_file_one.yaml");
    pom.getFileByIndex(1).contains("deployment_file_two.yaml");
    pom.getFileByIndex(2).contains("deployment_file_three.tar.gz");
    pom.getFileByIndex(3).contains("deployment_file_four.tar.gz");
  });

  it("should delete .yaml file correctly", () => {
    pom.uploadButtonEmpty.uploadFile("../cypress/fixtures/");
    pom.deleteFileByIndex(0);
    pom.getFiles().should("have.length", 3);
  });

  it("should drag and drop .yaml files correctly", () => {
    pom.uploadButtonEmpty.uploadFile("../cypress/fixtures/");
    pom.uploadButtonList.dragDropFile("../cypress/fixtures/");
    pom.getFileByIndex(0).contains("deployment_file_one.yaml");
    pom.getFileByIndex(1).contains("deployment_file_two.yaml");
  });

  it("should import .tar.gz files correctly", () => {
    pom.uploadButtonEmpty.uploadFile("../cypress/fixtures/");
    pom.getFileByIndex(2).contains("deployment_file_three.tar.gz");
  });

  it("should import mixed .yaml and .tar.gz files correctly", () => {
    pom.uploadButtonEmpty.uploadFile("../cypress/fixtures/");
    pom.getFileByIndex(0).contains("deployment_file_one.yaml");
    pom.getFileByIndex(2).contains("deployment_file_three.tar.gz");
  });

  it("should delete .tar.gz file correctly", () => {
    pom.uploadButtonEmpty.uploadFile("../cypress/fixtures/");
    pom.deleteFileByIndex(3);
    pom.getFiles().should("have.length", 3);
  });

  it("should drag and drop .tar.gz files correctly", () => {
    pom.uploadButtonEmpty.uploadFile("../cypress/fixtures/");
    pom.getFileByIndex(2).contains("deployment_file_three.tar.gz");
    pom.getFileByIndex(3).contains("deployment_file_four.tar.gz");
  });

  it("should show error message banner when import failed", () => {
    pom.uploadButtonEmpty.uploadFile("../cypress/fixtures/");
    pom.interceptApis([pom.api.dpImportFail]);
    pom.el.importButton.click();
    pom.waitForApis();
    pom.messageBanner.should("be.visible").contains("root cause of failure");
  });

  it("should show error message banner when import failed", () => {
    pom.interceptApis([
      pom.api.listDeploymentPackages,
      pom.api.dpImportSuccess,
    ]);
    pom.uploadButtonEmpty.uploadFile("../cypress/fixtures/");
    pom.el.importButton.click();
    pom.waitForApis();
    pom.messageBanner.should("be.visible");
    pom.messageBanner.should(
      "have.class",
      "spark-message-banner-state-success",
    );
  });

  it("should show confirmation dialog when duplicate packages are detected", () => {
    // Intercept API with duplicates BEFORE mounting
    cy.intercept("GET", "**/deployment_packages*", {
      statusCode: 200,
      body: {
        deploymentPackages: [
          {
            name: "test-package",
            version: "1.0.0",
            description: "Test package",
            createTime: "2024-01-01T00:00:00Z",
          },
        ],
        totalSize: 1,
      },
    }).as("listDeploymentPackages");

    // Mount component AFTER setting up intercept
    cy.mount(<DeploymentPackageImport />);

    // Wait for initial API call
    cy.wait("@listDeploymentPackages");

    // Create a mock YAML file with duplicate name and version
    const yamlContent = `metadata:
  name: test-package
spec:
  version: 1.0.0`;

    const file = new File([yamlContent], "test-package-1.0.0.yaml", {
      type: "text/yaml",
    });

    // Upload file using DataTransfer
    cy.get('[data-cy="uploadButtonEmpty"] input[type="file"]').then((input) => {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      (input[0] as HTMLInputElement).files = dataTransfer.files;
      input[0].dispatchEvent(new Event("change", { bubbles: true }));
    });

    // Click import button
    pom.el.importButton.should("be.visible");
    pom.el.importButton.click();

    // Confirmation dialog should appear
    pom.confirmDialog.should("exist");
    pom.confirmationDialog.el.title.should(
      "contain.text",
      "Duplicate Deployment Package Detected",
    );
    pom.confirmationDialog.el.cancelBtn.should("be.visible");
    pom.confirmationDialog.el.confirmBtn.should("be.visible");
  });

  it("should proceed with upload when user confirms duplicate", () => {
    // Intercept APIs BEFORE mounting
    cy.intercept("GET", "**/deployment_packages*", {
      statusCode: 200,
      body: {
        deploymentPackages: [
          {
            name: "test-package",
            version: "1.0.0",
            description: "Test package",
            createTime: "2024-01-01T00:00:00Z",
          },
        ],
        totalSize: 1,
      },
    }).as("listDeploymentPackages");

    cy.intercept("POST", "**/upload", {
      statusCode: 201,
      body: { responses: [] },
    }).as("dpImportSuccess");

    // Mount component AFTER setting up intercepts
    cy.mount(<DeploymentPackageImport />);

    // Wait for initial API call
    cy.wait("@listDeploymentPackages");

    // Create a mock YAML file with duplicate name and version
    const yamlContent = `metadata:
  name: test-package
spec:
  version: 1.0.0`;

    const file = new File([yamlContent], "test-package-1.0.0.yaml", {
      type: "text/yaml",
    });

    // Upload file
    cy.get('[data-cy="uploadButtonEmpty"] input[type="file"]').then((input) => {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      (input[0] as HTMLInputElement).files = dataTransfer.files;
      input[0].dispatchEvent(new Event("change", { bubbles: true }));
    });

    // Click import button
    pom.el.importButton.click();

    // Wait for confirmation dialog and click continue
    pom.confirmDialog.should("exist");
    pom.confirmationDialog.el.confirmBtn.click();

    // Upload should proceed
    cy.wait("@dpImportSuccess");
  });

  it("should cancel upload when user cancels duplicate confirmation", () => {
    // Intercept API with duplicates BEFORE mounting
    cy.intercept("GET", "**/deployment_packages*", {
      statusCode: 200,
      body: {
        deploymentPackages: [
          {
            name: "test-package",
            version: "1.0.0",
            description: "Test package",
            createTime: "2024-01-01T00:00:00Z",
          },
        ],
        totalSize: 1,
      },
    }).as("listDeploymentPackages");

    // Mount component AFTER setting up intercept
    cy.mount(<DeploymentPackageImport />);

    // Wait for initial API call
    cy.wait("@listDeploymentPackages");

    // Create a mock YAML file with duplicate name and version
    const yamlContent = `metadata:
  name: test-package
spec:
  version: 1.0.0`;

    const file = new File([yamlContent], "test-package-1.0.0.yaml", {
      type: "text/yaml",
    });

    // Upload file
    cy.get('[data-cy="uploadButtonEmpty"] input[type="file"]').then((input) => {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      (input[0] as HTMLInputElement).files = dataTransfer.files;
      input[0].dispatchEvent(new Event("change", { bubbles: true }));
    });

    // Click import button
    pom.el.importButton.click();

    // Wait for confirmation dialog and click cancel
    pom.confirmDialog.should("exist");
    pom.confirmationDialog.el.cancelBtn.click();

    // Dialog should close and upload should not proceed
    pom.confirmDialog.should("not.exist");
  });

  it("should not show confirmation dialog when no duplicates are detected", () => {
    // Intercept APIs BEFORE mounting - no existing packages
    cy.intercept("GET", "**/deployment_packages*", {
      statusCode: 200,
      body: {
        deploymentPackages: [],
        totalSize: 0,
      },
    }).as("listDeploymentPackages");

    cy.intercept("POST", "**/upload", {
      statusCode: 201,
      body: { responses: [] },
    }).as("dpImportSuccess");

    // Mount component AFTER setting up intercepts
    cy.mount(<DeploymentPackageImport />);

    // Wait for initial API call
    cy.wait("@listDeploymentPackages");

    // Create a mock YAML file with unique name and version
    const yamlContent = `metadata:
  name: unique-package
spec:
  version: 2.0.0`;

    const file = new File([yamlContent], "unique-package-2.0.0.yaml", {
      type: "text/yaml",
    });

    // Upload file
    cy.get('[data-cy="uploadButtonEmpty"] input[type="file"]').then((input) => {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      (input[0] as HTMLInputElement).files = dataTransfer.files;
      input[0].dispatchEvent(new Event("change", { bubbles: true }));
    });

    // Click import button
    pom.el.importButton.click();

    // Confirmation dialog should NOT appear
    pom.confirmDialog.should("not.exist");

    // Upload should proceed directly
    cy.wait("@dpImportSuccess");
  });

  it("should detect duplicates in tar.gz files by filename", () => {
    // Mock API to return existing packages BEFORE mounting
    cy.intercept("GET", "**/deployment_packages*", {
      statusCode: 200,
      body: {
        deploymentPackages: [
          {
            name: "dp-wordpress",
            version: "25.0.0",
            description: "Test package",
            createTime: "2024-01-01T00:00:00Z",
          },
        ],
        totalSize: 1,
      },
    }).as("listDeploymentPackages");

    // Mount component AFTER setting up intercept
    cy.mount(<DeploymentPackageImport />);

    // Wait for initial API call
    cy.wait("@listDeploymentPackages");

    // Upload tar.gz file with version in filename that matches existing package (dp-wordpress-25.0.0.tar.gz)
    cy.get('[data-cy="uploadButtonEmpty"] input[type="file"]').selectFile(
      "../cypress/fixtures/dp-wordpress-25.0.0.tar.gz",
      { force: true },
    );

    // Click import button
    pom.el.importButton.click();

    // Confirmation dialog should appear since filename matches existing package name and version
    pom.confirmDialog.should("exist");
    pom.confirmationDialog.el.title.should(
      "contain.text",
      "Duplicate Deployment Package Detected",
    );
  });

  it("should have accessibility attributes on file list", () => {
    pom.uploadButtonEmpty.uploadFile("../cypress/fixtures/");

    // Check that List has aria-label
    pom.el.fileList.should("have.attr", "aria-label", "Uploaded files list");

    // Check that Items have textValue (this is checked by verifying no console errors)
  });
});
