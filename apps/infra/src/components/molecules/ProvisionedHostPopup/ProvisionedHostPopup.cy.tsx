/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  assignedWorkloadHostOne as hostOne,
  IRuntimeConfig,
  provisionedHostOne,
  workloadOne,
  workloadOneId,
} from "@orch-ui/utils";
// import { store } from "../../../store/store";
import ProvisionedHostPopup, {
  ProvisionedHostPopupProps,
} from "./ProvisionedHostPopup";
import ProvisionedHostPopupPom from "./ProvisionedHostPopup.pom";

const pom = new ProvisionedHostPopupPom();
describe("<ProvisionedHostPopup />", () => {
  const runtimeConfig: IRuntimeConfig = {
    AUTH: "",
    KC_CLIENT_ID: "",
    KC_REALM: "",
    KC_URL: "",
    SESSION_TIMEOUT: 0,
    OBSERVABILITY_URL: "testUrl",
    DOCUMENTATION: [],
    TITLE: "",
    MFE: {},
    API: {},
    VERSIONS: {},
  };

  it("should not show `View Details`", () => {
    cy.mount(
      <ProvisionedHostPopup host={hostOne} showViewDetailsOption={false} />,
    );
    pom.root.click();
    pom.hostPopupPom
      .getActionPopupBySearchText("View Details")
      .should("not.exist");
  });

  describe("Provisioned host with assigned workload/cluster", () => {
    beforeEach(() => {
      const props: ProvisionedHostPopupProps = {
        host: {
          ...hostOne,
          instance: {
            ...hostOne.instance,
            workloadMembers: [
              {
                kind: "WORKLOAD_MEMBER_KIND_CLUSTER_NODE",
                resourceId: workloadOneId,
                workloadMemberId: workloadOneId,
                workload: workloadOne,
              },
            ],
          },
        },
        onViewDetails: cy.stub().as("onViewDetailsStub"),
        onDelete: cy.stub().as("onDeleteStub"),
        onDeauthorizeHostWithoutWorkload: cy
          .stub()
          .as("onDeauthorizeWithoutWorkloadStub"),
        onScheduleMaintenance: cy.stub().as("onScheduleMaintenanceStub"),
      };
      cy.mount(<ProvisionedHostPopup {...props} showViewDetailsOption />, {
        runtimeConfig,
      });
      pom.root.click();
    });
    it("should call `onEdit`", () => {
      pom.hostPopupPom.getActionPopupBySearchText("Edit").click();
      pom.getPath().should("contain", `/host/${hostOne.resourceId!}/edit`);
    });
    it("should call `onViewDetails`", () => {
      pom.hostPopupPom.getActionPopupBySearchText("View Details").click();
      cy.get("@onViewDetailsStub").should("be.called");
    });
    it("should call `onScheduleMaintenance`", () => {
      pom.hostPopupPom
        .getActionPopupBySearchText("Schedule Maintenance")
        .click();
      cy.get("@onScheduleMaintenanceStub").should("be.called");
    });
    it("should not show `Delete`", () => {
      pom.hostPopupPom.getActionPopupBySearchText("Delete").should("not.exist");
    });
  });

  describe("Provisioned host without assigned workload/cluster", () => {
    beforeEach(() => {
      const props: ProvisionedHostPopupProps = {
        host: {
          ...provisionedHostOne,
          instance: {
            ...hostOne.instance,
            workloadMembers: undefined,
          },
        },
        onDelete: cy.stub().as("onDeleteStub"),
        onDeauthorizeHostWithoutWorkload: cy
          .stub()
          .as("onDeauthorizeWithoutWorkloadStub"),
      };
      cy.mount(<ProvisionedHostPopup {...props} />);
      pom.root.click();
    });
    it("should call `onDelete`", () => {
      pom.hostPopupPom.getActionPopupBySearchText("Delete").click();
      cy.get("@onDeleteStub").should("be.called");
    });
    it("should call `onDeauthorizeWithoutWorkloadStub` for `provisioned host without assigned workload/cluster`", () => {
      pom.hostPopupPom.getActionPopupBySearchText("Deauthorize").click();
      cy.get("@onDeauthorizeWithoutWorkloadStub").should("be.called");
    });
  });

  describe("Provisioned host with vPro capabilities", () => {
    it("should show the Activate vPro option when AMT state is not provisioned", () => {
      const props: ProvisionedHostPopupProps = {
        host: {
          ...provisionedHostOne,
          instance: {
            ...hostOne.instance,
            workloadMembers: undefined,
          },
          amtSku: "AMT_SKU_AMT",
          currentAmtState: "AMT_STATE_UNSPECIFIED",
        },
      };
      cy.mount(<ProvisionedHostPopup {...props} />);
      pom.root.click();

      pom.hostPopupPom
        .getActionPopupBySearchText("Activate vPro")
        .should("exist");
    });

    it("should show the De-Activate vPro option when AMT state is provisioned", () => {
      const props: ProvisionedHostPopupProps = {
        host: {
          ...provisionedHostOne,
          instance: {
            ...hostOne.instance,
            workloadMembers: undefined,
          },
          amtSku: "AMT_SKU_AMT",
          currentAmtState: "AMT_STATE_PROVISIONED",
        },
      };
      cy.mount(<ProvisionedHostPopup {...props} />);
      pom.root.click();

      pom.hostPopupPom
        .getActionPopupBySearchText("De-Activate vPro")
        .should("exist");
    });
  });
});
