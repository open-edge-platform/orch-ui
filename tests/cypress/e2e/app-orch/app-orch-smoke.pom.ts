/*
 * SPDX-FileCopyrightText: (C) 2024 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { catalog } from "@orch-ui/apis";
import {
  ApplicationCreateEditPom,
  ApplicationsPom,
} from "@orch-ui/app-orch-poms";
import { cyGet, CyPom } from "@orch-ui/tests";
import { RegistryChart } from "../helpers/app-orch";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

class AppOrchPom extends CyPom<Selectors> {
  public applicationsPom: ApplicationsPom;
  public applicationCreateEditPom: ApplicationCreateEditPom;
  constructor(public rootCy: string) {
    super(rootCy, [...dataCySelectors]);

    // All Page POMs in Deployment MFE
    this.applicationsPom = new ApplicationsPom();
    this.applicationCreateEditPom = new ApplicationCreateEditPom();
  }

  /**
   * Add given Registry into E2E App Registry UI.
   * Note: Make sure you are in the Registry Tab before performing below operation.
   **/
  addRegistry(registry: Partial<catalog.Registry>) {
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500); // Needed for the addRegistryButton to be visible on scroll/render

    this.applicationsPom.tabs.el.addRegistryButton.click();
    this.applicationsPom.tabs.registryDrawerPom
      .getDrawerBase()
      .should("have.class", "spark-drawer-show"); // This is required to wait for drawer to completely perform open render

    // Fill form
    this.applicationsPom.tabs.registryDrawerPom.fillAddRegistryForm(registry);

    // Submit Registry
    this.applicationsPom.tabs.registryDrawerPom.el.okBtn.click();
    this.applicationsPom.tabs.registryDrawerPom
      .getDrawerBase()
      .should("have.class", "spark-drawer-hide"); // This required for drawer to completely preform close render
  }

  /**
   * Remove given Registry nameId in E2E App Registry UI.
   * Note: Make sure you are in the Registry Tab before performing below operation.
   **/
  removeRegistry(name: string) {
    this.applicationsPom.tabs.appRegistryTablePom
      .getActionPopupOptionBySearchText(name)
      .click()
      .as("popup");
    cy.get("@popup").contains("Delete").as("deleteBtn");
    cy.get("@deleteBtn").click();
    cyGet("confirmBtn").click(); // click confirm button (Delete) in spark-modal (ConfirmationDialog)
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
   * Note: Make sure you are in the Application Create/Edit page before performing below operation.
   * Warning: Also this doesnot check the version of the application (for testing only)
   */
  removeApplication(name: string) {
    this.applicationsPom.tabs.appTablePom
      .getActionPopupBySearchText(name)
      .click()
      .as("popup");
    cy.get("@popup").contains("Delete").as("deleteBtn");
    cy.get("@deleteBtn").click();
    cyGet("confirmBtn").click(); // click confirm button (Delete) in spark-modal (ConfirmationDialog)
  }
}

export default AppOrchPom;
