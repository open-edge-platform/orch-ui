/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { applicationFormValues } from "@orch-ui/utils";
import { setupStore } from "../../../store";
import ApplicationCreateEdit from "./ApplicationCreateEdit";
import ApplicationCreateEditPom from "./ApplicationCreateEdit.pom";

const pom = new ApplicationCreateEditPom();
describe("<ApplicationCreateEdit />", () => {
  beforeEach(() => {
    const store = setupStore({});
    // @ts-ignore
    window.store = store;
    pom.sourceForm.interceptApis([pom.sourceForm.api.registry]);
    cy.mount(<ApplicationCreateEdit />, {
      reduxStore: store,
      // NOTE the component checks for the URL to contain /add to enable
      // some form fields, so mount it at that route
      routerProps: { initialEntries: ["/applications/add"] },
      routerRule: [
        { path: "/applications/add", element: <ApplicationCreateEdit /> },
      ],
    });
    pom.sourceForm.waitForApis();

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500); // This is needed for the Api to substitute the value onto the Helm Registry SIDropdown
  });

  it("should show the component", () => {
    pom.root.should("exist");
  });

  // TODO: this test is failing on unknow reason when run in unit-test.cy.ts (may be window.store; need inspection)
  // Skipping for now as it is seen passing individually.
  xit("when filling up the General Information should cleanly cancel when the for is filled", () => {
    pom.sourceForm.selectHelmRegistryName(
      pom.sourceForm.registry.resources[0].name,
    );

    // check that the redux state is set correctly
    cy.window()
      .its("store")
      .invoke("getState")
      .then((state) =>
        expect(state.application.helmRegistryName).to.eq(
          pom.sourceForm.registry.resources[0].name,
        ),
      );
    pom.el.stepSourceInfoCancelBtn.click();

    // check that the redux state has been cleared
    cy.window()
      .its("store")
      .invoke("getState")
      .then((state) => expect(state.application.helmRegistryName).to.be.empty);
  });

  // TODO: this test is failing on unknow reason when run in unit-test.cy.ts (may be window.store; need inspection)
  // Skipping for now as it is seen passing individually.
  xit("should validate on invalid chart name with special symbol", () => {
    pom.sourceForm.el.helmRegistryNameCombobox.find("button").click();
    pom.sourceForm.interceptApis([pom.sourceForm.api.chartsMocked]);
    cy.contains(applicationFormValues.helmRegistryName).click();
    pom.sourceForm.waitForApis();

    pom.sourceForm.el.chartNameCombobox.first().type("chart1@");
    pom.sourceForm.el.chartNameCombobox
      .first()
      .parentsUntil(".spark-combobox")
      .should("contain.text", "Invalid Name");
  });

  // TODO: this test is failing on unknow reason when run in unit-test.cy.ts (may be window.store; need inspection)
  // Skipping for now as it is seen passing individually.
  xit("should validate on invalid chart version with special symbol", () => {
    pom.sourceForm.selectHelmRegistryName(
      applicationFormValues.helmRegistryName,
    );
    pom.sourceForm.selectChartName(
      pom.sourceForm.chartName.resources[0].chartName,
    );

    pom.sourceForm.el.chartVersionCombobox.first().type("1.0.0-");
    pom.sourceForm.el.chartVersionCombobox
      .first()
      .parentsUntil(".spark-combobox")
      .should("contain.text", "Invalid version (ex. 1.0.0, v1.0.0, 1.0.0-rc1, 1.0.0-pre-rc1)");
  });

  // TODO: this test is failing on unknow reason when run in unit-test.cy.ts (may be window.store; need inspection)
  // Skipping for now as it is seen passing individually.
  xit("should disable Next Button upon invalid version", () => {
    pom.sourceForm.selectHelmRegistryName(
      applicationFormValues.helmRegistryName,
    );
    pom.sourceForm.selectChartName(
      pom.sourceForm.chartName.resources[0].chartName,
    );

    pom.sourceForm.el.chartVersionCombobox.first().type("1.0.0-");
    pom.el.stepSourceInfoNextBtn.should("have.attr", "aria-disabled", "true");
  });

  // TODO: this test is failing on unknow reason when run in unit-test.cy.ts (may be window.store; need inspection)
  // Skipping for now as it is seen passing individually.
  xit("should create an application (picking an existing values)", () => {
    pom.sourceForm.selectHelmRegistryName(
      applicationFormValues.helmRegistryName,
    );
    pom.sourceForm.selectChartName(
      pom.sourceForm.chartName.resources[0].chartName,
    );
    pom.sourceForm.selectChartVersion(
      pom.sourceForm.chartVersion.resources[0].versions?.[0] ?? "",
    );
    pom.el.stepSourceInfoNextBtn.click();

    pom.interceptApis([pom.api.addApp200]);
    pom.appForm.el.nameInput.type("Test Application");
    pom.appForm.el.versionInput.type("1.0.0");
    pom.el.stepBasicInfoNextBtn.click();
    pom.el.stepProfileNextBtn.click();
    pom.el.submitBtn.click();
    pom.waitForApis();

    cy.get(`@${pom.api.addApp200}`).its("request.body").should("deep.equal", {
      chartName: "chart1",
      chartVersion: "1.0.0",
      defaultProfileName: "",
      description: "",
      displayName: "Test Application",
      helmRegistryName: "orch-harbor",
      name: "test-application",
      profiles: [],
      version: "1.0.0",
    });
  });

  // TODO: this test is failing on unknow reason when run in unit-test.cy.ts (may be window.store; need inspection)
  // Skipping for now as it is seen passing individually.
  xit("should create an application (creating new values)", () => {
    pom.sourceForm.selectHelmRegistryName(
      applicationFormValues.helmRegistryName,
    );
    pom.sourceForm.el.chartNameCombobox.first().type("chart6");
    pom.sourceForm.el.chartVersionCombobox.first().type("1.5.4");
    pom.el.stepSourceInfoNextBtn.click();

    pom.interceptApis([pom.api.addApp200]);
    pom.appForm.el.nameInput.type("Test Application");
    pom.appForm.el.versionInput.type("1.0.0");

    pom.el.stepBasicInfoNextBtn.click();

    pom.el.stepProfileNextBtn.click();

    pom.el.submitBtn.click();

    pom.waitForApis();
    cy.get(`@${pom.api.addApp200}`).its("request.body").should("deep.equal", {
      chartName: "chart6",
      chartVersion: "1.5.4",
      defaultProfileName: "",
      description: "",
      displayName: "Test Application",
      helmRegistryName: "orch-harbor",
      name: "test-application",
      profiles: [],
      version: "1.0.0",
    });
  });
});
