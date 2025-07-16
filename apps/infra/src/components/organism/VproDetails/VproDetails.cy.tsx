/*
 * SPDX-FileCopyrightText: (C) 2025 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import { defaultActiveProject } from "@orch-ui/tests";
import { SharedStorage } from "@orch-ui/utils";
import VproDetails from "./VproDetails";
import VproDetailsPom, {
  mockAmtSettingsData,
  mockDeviceData,
  mockHostUuid,
} from "./VproDetails.pom";

const pom = new VproDetailsPom();

describe("<VproDetails/>", () => {
  const mockHost: infra.HostResourceRead = {
    uuid: mockHostUuid,
    name: "Test Host",
    resourceId: "test-host-id",
  };

  beforeEach(() => {
    // Set up project in SharedStorage
    SharedStorage.project = defaultActiveProject;
  });

  it("should render component with all data", () => {
    // Intercept API calls and provide mock data
    pom.interceptApis([pom.api.getDeviceData, pom.api.getAmtSettings]);
    cy.mount(<VproDetails host={mockHost} />);
    pom.waitForApis();
    // Verify component renders
    pom.root.should("exist");

    // Verify device details are correctly displayed
    pom.verifyDeviceDetails();

    // Verify AMT settings are correctly displayed
    pom.verifyAmtSettings();
  });

  it("should display loading state while data is being fetched", () => {
    // Use direct intercept with delay instead of interceptApis with delay parameter
    cy.intercept(
      `**/projects/${defaultActiveProject.name}/dm/devices/${mockHostUuid}`,
      {
        statusCode: 200,
        body: mockDeviceData,
        delay: 500,
      },
    ).as("delayedDeviceData");

    cy.intercept(
      `**/projects/${defaultActiveProject.name}/dm/amt/generalSettings/${mockHostUuid}`,
      {
        statusCode: 200,
        body: mockAmtSettingsData,
        delay: 500,
      },
    ).as("delayedAmtSettings");

    cy.mount(<VproDetails host={mockHost} />);
    pom.waitForApis();
    // Should show loading text
    cy.contains("Loading additional details...").should("be.visible");

    // Wait for delayed responses
    cy.wait(["@delayedDeviceData", "@delayedAmtSettings"]);

    // Eventually data should appear
    cy.contains("Display Name").should("exist");
  });

  it("should handle error state in device data", () => {
    // Mock device data with error
    cy.intercept(
      `**/projects/${defaultActiveProject.name}/dm/devices/${mockHostUuid}`,
      {
        statusCode: 500,
        body: { error: "Server Error" },
      },
    ).as("deviceError");

    // Mock AMT settings with success
    cy.intercept(
      `**/projects/${defaultActiveProject.name}/dm/amt/generalSettings/${mockHostUuid}`,
      {
        statusCode: 200,
        body: mockAmtSettingsData,
      },
    ).as("amtSettings");

    cy.mount(<VproDetails host={mockHost} />);
    pom.waitForApis();
    // Should show error message
    cy.contains("Unfortunately an error occurred").should("be.visible");
  });

  it("should handle missing device info gracefully", () => {
    // Mock device data without deviceInfo
    const incompleteData = { ...mockDeviceData };
    delete incompleteData.deviceInfo;

    cy.intercept(
      `**/projects/${defaultActiveProject.name}/dm/devices/${mockHostUuid}`,
      {
        statusCode: 200,
        body: incompleteData,
      },
    ).as("incompleteDevice");

    // Mock AMT settings with success
    cy.intercept(
      `**/projects/${defaultActiveProject.name}/dm/amt/generalSettings/${mockHostUuid}`,
      {
        statusCode: 200,
        body: mockAmtSettingsData,
      },
    ).as("amtSettings");

    cy.mount(<VproDetails host={mockHost} />);
    pom.waitForApis();
    // Basic details should still appear
    pom.getDetailValueByLabel("Display Name").should("exist");

    // But no device info details
    cy.contains("IP Address").should("not.exist");
  });
});
