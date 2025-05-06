/*
 * SPDX-FileCopyrightText: (C) 2024 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { adm, catalog } from "@orch-ui/apis";
import {
  ApplicationCreateEditPom,
  ApplicationsPom,
  DeploymentPackageCreatePom,
  DeploymentPackagesPom,
  DeploymentsPom,
} from "@orch-ui/app-orch-poms";
import { MetadataFormPom } from "@orch-ui/components";
import { cyGet, CyPom } from "@orch-ui/tests";
import { RegistryChart } from "../helpers/app-orch";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

class AppOrchPom extends CyPom<Selectors> {
  public applicationsPom: ApplicationsPom;
  public applicationCreateEditPom: ApplicationCreateEditPom;
  public deploymentPackagesPom: DeploymentPackagesPom;
  public deploymentPackageCreatePom: DeploymentPackageCreatePom;
  public deploymentsPom: DeploymentsPom;
  public metadataPom: MetadataFormPom;
  // public setupDeploymentPom: SetupDeploymentPom;
  constructor(public rootCy: string) {
    super(rootCy, [...dataCySelectors]);

    // All Page POMs in Deployments MFE
    this.applicationsPom = new ApplicationsPom();
    this.applicationCreateEditPom = new ApplicationCreateEditPom();
    this.deploymentPackagesPom = new DeploymentPackagesPom();
    this.deploymentPackageCreatePom = new DeploymentPackageCreatePom();
    this.deploymentsPom = new DeploymentsPom();
    this.metadataPom = new MetadataFormPom();
    // this.setupDeploymentPom = new SetupDeploymentPom();
  }

  /**
   * Add given Registry into E2E App Registry UI.
   * Note: Make sure you are in the Registry Tab before performing below operation.
   **/
  addRegistry(registry: Partial<catalog.Registry>) {
    this.applicationsPom.tabs.appRegistryTablePom.root.should(
      "not.contain.text",
      "error",
    );

    this.applicationsPom.tabs.el.addRegistryButton
      .should("be.visible")
      .should("have.text", "Add a Registry");

    this.applicationsPom.tabs.el.addRegistryButton.click();
    this.applicationsPom.tabs.registryDrawerPom
      .getDrawerBase()
      .should("have.class", "spark-drawer-show"); // This is required to wait for drawer to completely perform open render

    // Fill form
    this.applicationsPom.tabs.registryDrawerPom.fillAddRegistryForm(registry);

    // Submit Registry
    cy.intercept({
      method: "POST",
      url: "**/v3/projects/**/catalog/registries",
      times: 1,
    }).as("addRegistry");
    this.applicationsPom.tabs.registryDrawerPom.el.okBtn.click();
    this.applicationsPom.tabs.registryDrawerPom
      .getDrawerBase()
      .should("have.class", "spark-drawer-hide"); // This required for drawer to completely preform close render
    cy.wait("@addRegistry").then((interception) => {
      expect(interception.response?.statusCode).to.equal(200);
    });
  }

  /**
   * Remove given Registry nameId in E2E App Registry UI.
   * Note: Make sure you are in the Registry Tab before performing below operation.
   **/
  removeRegistry(name: string) {
    cy.waitForPageTransition();
    this.applicationsPom.el.applicationSearch.type(name);
    this.applicationsPom.tabs.appRegistryTablePom
      .getActionPopupOptionBySearchText(name)
      .click()
      .as("popup");
    cy.intercept({
      method: "DELETE",
      url: `**/v3/projects/**/catalog/registries/${name}`,
      times: 1,
    }).as("deleteRegistry");
    cy.get("@popup").contains("Delete").as("deleteBtn");
    cy.get("@deleteBtn").click();
    cyGet("confirmBtn").click(); // click confirm button (Delete) in spark-modal (ConfirmationDialog)
    cy.wait("@deleteRegistry").then((interception) => {
      expect(interception.response?.statusCode).to.equal(200);
    });
  }

  /**
   * Add given Application into E2E Applications UI.
   * Note: Make sure you are in the Application Create/Edit page before performing below operation.
   **/
  addApplication(
    registry: Partial<catalog.Registry>,
    registryChart: RegistryChart,
    application: catalog.Application,
    applicationProfile: catalog.Profile,
  ) {
    if (!registry.name) {
      throw Error("Registry name is missing in parameter registry.");
    }

    // Step 1: Application Source (Registry) Info
    this.applicationCreateEditPom.sourceForm.fillApplicationCreateEditSourceInfo(
      registry,
      registryChart,
    );
    this.applicationCreateEditPom.el.stepSourceInfoNextBtn.click();

    // Step 2: Application Basic Info
    this.applicationCreateEditPom.appForm.fillApplicationBasicInfo(
      application!,
    );
    this.applicationCreateEditPom.el.stepBasicInfoNextBtn.click();

    // Step 3: Add Application Profiles
    this.applicationCreateEditPom.addApplicationProfileByProfileFormDrawer(
      applicationProfile,
    );
    this.applicationCreateEditPom.profileTable.tableUtils.getRowBySearchText(
      applicationProfile.name,
    );
    this.applicationCreateEditPom.el.stepProfileNextBtn.click();

    // Step 4: Review
    this.applicationCreateEditPom.el.submitBtn.click();
  }

  /**
   * Remove given Application name in E2E Applications UI.
   * Note: Make sure you are in the Application table page before performing below operation.
   * Warning: Also this doesnot check the version of the application (for testing only)
   */
  removeApplication(name: string) {
    cy.waitForPageTransition();
    this.applicationsPom.tabs.appTablePom
      .getActionPopupBySearchText(name)
      .click()
      .as("popup");
    cy.get("@popup").contains("Delete").as("deleteBtn");
    cy.wait(1000); // FIXME wait for the delete button to be visible
    cy.get("@deleteBtn").click();
    cy.wait(1000); // FIXME wait for the confirm button to be visible
    cyGet("confirmBtn").click(); // click confirm button (Delete) in spark-modal (ConfirmationDialog)
  }

  /**
   * Add given Deployment Package into E2E Deployment Package UI.
   * Note: Make sure you are in the Deployment Package Create/Edit page before performing below operation.
   * Warning: The Deployment package creation relies on system-generated profiles
   */
  addDeploymentPackage(
    deploymentPackage: Partial<catalog.DeploymentPackage>,
    applicationNamesForSelections: string[],
  ) {
    // Fill Deployment Package Creation form flow
    this.deploymentPackageCreatePom.deploymentPackageCreateEditPom.fillDeploymentPackageCreateEditForm(
      deploymentPackage,
      applicationNamesForSelections,
    );

    // Submit at Review step
    this.deploymentPackageCreatePom.deploymentPackageCreateEditPom.el.submitButton.click();
  }

  /**
   * Remove given Deployment Package name in E2E Deployment Package UI.
   * Note: Make sure you are in the Deployment Package table page before performing below operation.
   * Warning: Also this doesnot check the version of the deploymentPackage (for testing only)
   */
  removeDeploymentPackage(name: string) {
    cy.waitForPageTransition();
    this.deploymentPackagesPom.deploymentPackageTable
      .getActionPopupBySearchText(name)
      .click()
      .as("popup");
    cy.get("@popup").contains("Delete").as("deleteBtn");
    cy.get("@deleteBtn").click();
    cyGet("confirmBtn").click(); // click confirm button (Delete) in spark-modal (ConfirmationDialog)
  }

  addDeployment(
    deployment: Partial<adm.Deployment>,
    deploymentPackageName: string,
  ) {
    cyGet(`${deploymentPackageName}Selector`)
      .should("be.visible", { timeout: 10000 })
      .click();
    // Select Package
    cyGet(`${deploymentPackageName}Selector`).click();
    cyGet("nextBtn").click();

    // Select Profiles
    cyGet("selectProfileTable")
      // this was system-generated in add deployment package
      .contains("Deployment Profile 1")
      .closest("tr")
      .find("[data-cy='radioButtonCy']")
      .click();
    cyGet("nextBtn").click();

    // Override Profiles
    cyGet("nextBtn").click();

    // Select Deployment type
    cyGet("selectDeploymentType")
      .find("[data-cy='radioCardAutomatic'] label")
      .click();
    cyGet("nextBtn").click();

    // Enter Deployment Details
    cyGet("deploymentNameField").type(deployment.displayName!);
    cyGet("setupMetadata")
      .find("[data-cy='rhfComboboxEntryKey']")
      .first()
      .type("color");
    cyGet("setupMetadata")
      .find("[data-cy='rhfComboboxEntryValue']")
      .first()
      .type("blue");

    cyGet("setupMetadata").find("[data-cy='add']").click();
    cyGet("nextBtn").click();

    cyGet("nextBtn").contains("Deploy").click();
  }

  removeDeployment(deploymentName: string) {
    this.deploymentsPom.deploymentTablePom
      .getActionPopupBySearchText(deploymentName)
      .click()
      .as("popup");
    cy.get("@popup").contains("Delete").as("deleteBtn");
    cy.get("@deleteBtn").click();
    cyGet("confirmBtn").click(); // click confirm button (Delete) in spark-modal (ConfirmationDialog)
  }

  navigateToAddDeployment() {
    const element = document.querySelector('[data-cy="emptyActionBtn"]');
    if (element) {
      this.deploymentsPom.deploymentTablePom.emptyPom.el.emptyActionBtn.click();
    } else {
      this.deploymentsPom.deploymentTablePom.el.addDeploymentButton.click();
    }
  }
}

export default AppOrchPom;
