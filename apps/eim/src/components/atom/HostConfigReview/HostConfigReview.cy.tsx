/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */
import {
  assignedWorkloadHostOne as hostOne,
  assignedWorkloadHostOneId as hostOneId,
  assignedWorkloadHostTwo as hostTwo,
  assignedWorkloadHostTwoId as hostTwoId,
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
    cy.mount(<HostConfigReview />);
    pom.root.should("exist");
  });

  describe("Reviewing step for two hosts", () => {
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
      },
    });

    beforeEach(() => {
      cy.mount(<HostConfigReview />, { reduxStore: store });
    });

    it("Details of the 2 hosts must be rendered", () => {
      pom.el.totalHosts.should("contain.text", "Total hosts: 2");
      pom.el.siteName.should("contain.text", "Restaurant 01");
      pom.el.operatingSystem.contains("Ubuntu (1)");
      pom.el.operatingSystem.contains("Red Hat (1)");
      pom.el.security.contains("Enabled (1)");
      pom.el.security.contains("Disabled (1)");
    });

    it("Should expand panel on click of chevron icon and show the table in expandsion panel", () => {
      pom.el.hostConfigReviewTable.should("not.be.visible");
      pom.el.expandToggle.should("exist");
      pom.el.expandToggle.click();
      pom.el.hostConfigReviewTable.should("be.visible");
    });

    it("Should expand panel on click of chevron icon and show all selected hosts details in table", () => {
      pom.el.expandToggle.should("exist");
      pom.el.expandToggle.click();
      pom.el.hostConfigReviewTable.should("be.visible");
      pom.table.getRows().should("have.length", 2);
      pom.table.getColumnHeader(0).contains("Name");
      pom.table.getColumnHeader(1).contains("Serial Number");
      pom.table.getColumnHeader(2).contains("OS Profile");
      pom.table.getColumnHeader(3).contains("Security Configuration");
    });
  });
});
