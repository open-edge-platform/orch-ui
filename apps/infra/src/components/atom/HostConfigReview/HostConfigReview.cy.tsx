/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */
import {
  assignedWorkloadHostOne as hostOne,
  assignedWorkloadHostOneId as hostOneId,
  assignedWorkloadHostTwo as hostTwo,
  assignedWorkloadHostTwoId as hostTwoId,
  generateSshMocks,
  osRedHat,
  osUbuntu,
  siteRestaurantOne,
  StoreUtils,
} from "@orch-ui/utils";
import { initialState } from "../../../store/configureHost";
import { setupStore } from "../../../store/store";
import { HostConfigReview } from "./HostConfigReview";
import { HostConfigReviewPom } from "./HostConfigReview.pom";

const pom = new HostConfigReviewPom();
describe("<HostConfigReview/>", () => {
  it("should render component", () => {
    cy.mount(
      <HostConfigReview
        hostResults={new Map()}
        localAccounts={generateSshMocks(2)}
      />,
    );
    pom.root.should("exist");
  });

  describe("Reviewing step for two hosts", () => {
    const localAccounts = generateSshMocks(2);
    const store = setupStore({
      configureHost: {
        formStatus: initialState.formStatus,
        hosts: {
          [hostOneId]: {
            ...hostOne,
            site: siteRestaurantOne, // multi configure is expected to have same site
            instance: {
              ...StoreUtils.convertToWriteInstance({
                ...hostOne.instance, // ubuntu OS instance
              }),
              os: osUbuntu,
              securityFeature:
                "SECURITY_FEATURE_SECURE_BOOT_AND_FULL_DISK_ENCRYPTION",
              localAccountID: localAccounts[0].resourceId,
            },
          },
          [hostTwoId]: {
            ...hostTwo,
            site: siteRestaurantOne,
            instance: {
              ...StoreUtils.convertToWriteInstance({
                ...hostTwo.instance, // redhat OS instance
              }),
              os: osRedHat,
              securityFeature: "SECURITY_FEATURE_NONE",
            },
          },
        },
        autoOnboard: false,
        autoProvision: false,
        hasMultiHostValidationError: false,
      },
    });

    beforeEach(() => {
      // @ts-ignore
      window.store = store;
      cy.mount(
        <HostConfigReview
          hostResults={new Map()}
          localAccounts={localAccounts}
        />,
        {
          reduxStore: store,
        },
      );
    });

    it("Details of the 2 hosts must be rendered", () => {
      pom.el.totalHosts.should("contain.text", "Total hosts: 2");
      pom.el.siteName.should("contain.text", "Restaurant 01");
      pom.el.operatingSystem.contains("Ubuntu (1)");
      pom.el.operatingSystem.contains("Red Hat (1)");
      pom.el.security.contains("Enabled (1)");
      pom.el.security.contains("Disabled (1)");
    });

    it("Expansion panel should be expanded by default and show the table in expansion panel", () => {
      pom.el.expandToggle.should("exist");
      pom.el.hostConfigReviewTable.should("be.visible");
    });

    it("Table in expansion panel should contain headers", () => {
      pom.el.hostConfigReviewTable.should("be.visible");
      pom.getRows().should("have.length", 2);
      pom.getColumnHeader(0).contains("Name");
      pom.getColumnHeader(1).contains("Serial Number and UUID");
      pom.getColumnHeader(2).contains("OS Profile");
      pom.getColumnHeader(3).contains("Secure Boot and Full Disk Encryption");
      pom.getColumnHeader(4).contains("Trusted Compute");
      pom.getColumnHeader(5).contains("Public SSH Key");
    });
    it("should render appropriate values in columns", () => {
      cy.window()
        .its("store")
        .invoke("getState")
        .then((state) => {
          pom.el.hostConfigReviewTable.should("be.visible");
          const host = state.configureHost.hosts[hostOneId];
          pom.getCell(1, 1).should("contain", host.name);
          pom.getCell(1, 2).should("contain", host.serialNumber);
          pom.getCell(1, 2).should("contain", host.uuid);
          pom.getCell(1, 4).should("contain", "Enabled");
          pom.getCell(1, 5).should("contain", "Compatible");
          pom.getCell(1, 6).should("contain", "all-groups-example-user");
        });
    });
  });
});
