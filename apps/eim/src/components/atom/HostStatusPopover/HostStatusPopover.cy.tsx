/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */
import { PopoverPom } from "@orch-ui/components";
import { cyGet } from "@orch-ui/tests";
import {
  assignedWorkloadHostOne as hostOne,
  assignedWorkloadHostThree,
  assignedWorkloadHostTwo,
  instanceOne,
  registeredHostOne,
} from "@orch-ui/utils";
import { HostStatusPopover } from "./HostStatusPopover";
import HostStatusPopoverPom from "./HostStatusPopover.pom";
const pom = new HostStatusPopoverPom();
const popOverPom = new PopoverPom();

describe("<HostStatusPopover/>", () => {
  it("should render host statuses", () => {
    cy.mount(
      <HostStatusPopover
        data={{
          ...hostOne,
          currentState: "HOST_STATE_ONBOARDED",
          hostStatus: "Running",
          hostStatusIndicator: "STATUS_INDICATION_IDLE",
          onboardingStatus: "Onboarded",
          onboardingStatusIndicator: "STATUS_INDICATION_IDLE",
          instance: {
            ...hostOne.instance,
            instanceStatus: "Running",
            instanceStatusIndicator: "STATUS_INDICATION_IDLE",
            provisioningStatus: "Provisioning in Progress",
            provisioningStatusIndicator: "STATUS_INDICATION_IN_PROGRESS",
            updateStatus: "Update Failed",
            updateStatusIndicator: "STATUS_INDICATION_ERROR",
          },
        }}
      />,
    );
    pom.root.should("exist");
    cyGet("popover").click();
    popOverPom.el.popoverContent.should("be.visible");
    // Within Host
    pom.getIconByStatus("hostStatus").contains("Running");
    pom.getIconByStatus("onboardingStatus").contains("Onboarded");

    // Within Host.Instance
    pom.getIconByStatus("instanceStatus").contains("Running");
    pom
      .getIconByStatus("provisioningStatus")
      .contains("Provisioning in Progress");
    pom.getIconByStatus("updateStatus").contains("Update Failed");
  });

  it("should show unknown for statuses that are not available", () => {
    cy.mount(
      <HostStatusPopover
        data={{
          ...hostOne,
          currentState: "HOST_STATE_UNSPECIFIED",
          hostStatus: "Unknown",
          hostStatusIndicator: "STATUS_INDICATION_UNSPECIFIED",
          instance: {
            ...hostOne.instance,
            instanceStatus: "Running",
            instanceStatusIndicator: "STATUS_INDICATION_IDLE",
            provisioningStatus: "Unknown",
            provisioningStatusIndicator: "STATUS_INDICATION_UNSPECIFIED",
          },
        }}
      />,
    );
    pom.root.should("exist");
    cyGet("popover").click();
    popOverPom.el.popoverContent.should("be.visible");
    pom.getIconByStatus("hostStatus").contains("Unknown");
    pom.getIconByStatus("provisioningStatus").contains("Unknown");

    pom.getIconByStatus("instanceStatus").contains("Running");
  });

  it("should show close Popover on click of close icon", () => {
    cy.mount(<HostStatusPopover data={hostOne} />);
    cyGet("popover").click();
    popOverPom.el.popoverContent.should("be.visible");
    popOverPom.el.closePopover.click();
    popOverPom.el.popoverContent.should("not.exist");
  });

  describe("Should render trusted compute status", () => {
    it("when instance does not have trusted compute enabled", () => {
      cy.mount(<HostStatusPopover data={hostOne} />);
      cyGet("popover").click();
      popOverPom.el.popoverContent.should("be.visible");
      pom
        .getIconByStatus("trustedAttestationStatus")
        .find(".status-icon .icon")
        .should("have.class", "icon-unknown");
    });

    it("when instance has trusted compute enabled", () => {
      cy.mount(<HostStatusPopover data={assignedWorkloadHostThree} />);
      cyGet("popover").click();
      popOverPom.el.popoverContent.should("be.visible");
      pom
        .getIconByStatus("trustedAttestationStatus")
        .find(".status-icon .icon")
        .should("have.class", "icon-ready");
    });

    it("when instance has trusted compute error", () => {
      cy.mount(<HostStatusPopover data={assignedWorkloadHostTwo} />);
      cyGet("popover").click();
      popOverPom.el.popoverContent.should("be.visible");
      pom
        .getIconByStatus("trustedAttestationStatus")
        .find(".status-icon .icon")
        .should("have.class", "icon-error");
      pom
        .getIconByStatus("trustedAttestationStatus")
        .contains("Failed: PCR Measurement Mismatch");
    });
  });

  describe("Should render aggregate status", () => {
    it("when host is registered", () => {
      const host = structuredClone(registeredHostOne);
      cy.mount(<HostStatusPopover data={host} />);
      pom.aggregateStatusPom.root.should("contain", "Registered");
      cyGet("statusIcon").find(".icon").should("have.class", "icon-ready");

      pom.validatePopOverTitle(
        `${host.name} is registered`,
        `${host.name} is registered and ready to be onboarded.`,
      );
    });

    it("when host has registration error", () => {
      const host = structuredClone(registeredHostOne);
      host.registrationStatusIndicator = "STATUS_INDICATION_ERROR";
      host.registrationStatus = "Failed to register host";

      cy.mount(<HostStatusPopover data={host} />);
      pom.aggregateStatusPom.root.should("contain", "Failed to register host");
      cyGet("statusIcon").find(".icon").should("have.class", "icon-error");
      pom.validatePopOverTitle(`${host.name} has registration error`);
    });

    it("when host is onboarding", () => {
      const host = structuredClone(registeredHostOne);
      host.currentState = "HOST_STATE_ONBOARDED";
      host.onboardingStatusIndicator = "STATUS_INDICATION_IN_PROGRESS";
      host.onboardingStatus = "Onboarding";

      cy.mount(<HostStatusPopover data={host} />);
      pom.aggregateStatusPom.root.should("contain", "Onboarding");
      cyGet("statusIcon")
        .find(".spark-icon")
        .should("have.class", "spark-icon-spin");
      pom.validatePopOverTitle(`${host.name} onboarding in progress`);
    });

    it("when host has onboarding error", () => {
      const host = structuredClone(registeredHostOne);
      host.currentState = "HOST_STATE_ONBOARDED";
      host.onboardingStatusIndicator = "STATUS_INDICATION_ERROR";
      host.onboardingStatus = "Error";

      cy.mount(<HostStatusPopover data={host} />);
      pom.aggregateStatusPom.root.should("contain", "Error");
      cyGet("statusIcon").find(".icon").should("have.class", "icon-error");
      pom.validatePopOverTitle(`${host.name} has onboarding error`);
    });

    it("when host is onboarded and not provisioned", () => {
      const host = structuredClone(registeredHostOne);
      host.currentState = "HOST_STATE_ONBOARDED";
      host.onboardingStatusIndicator = "STATUS_INDICATION_IDLE";
      host.onboardingStatus = "Onboarded";

      cy.mount(<HostStatusPopover data={host} />);
      pom.aggregateStatusPom.root.should("contain", "Onboarded");
      cyGet("statusIcon").find(".icon").should("have.class", "icon-ready");
      pom.validatePopOverTitle(
        `${host.name} is onboarded`,
        `${host.name} is onboarded and ready to be provisioned`,
      );
    });

    it("when host provisioning in progress", () => {
      const host = structuredClone(registeredHostOne);
      host.onboardingStatusIndicator = "STATUS_INDICATION_IDLE";
      host.currentState = "HOST_STATE_ONBOARDED";

      const instance = structuredClone(instanceOne);
      instance.currentState = "INSTANCE_STATE_UNSPECIFIED";
      instance.provisioningStatusIndicator = "STATUS_INDICATION_IN_PROGRESS";
      instance.provisioningStatus = "Provisioning";
      host.instance = instance;

      cy.mount(<HostStatusPopover data={host} />);
      pom.aggregateStatusPom.root.should("contain", "Provisioning");
      cyGet("statusIcon")
        .find(".spark-icon")
        .should("have.class", "spark-icon-spin");

      pom.validatePopOverTitle(`${host.name} provisioning in progress`);
    });

    it("when host has provisioning error", () => {
      const host = structuredClone(registeredHostOne);
      host.onboardingStatusIndicator = "STATUS_INDICATION_IDLE";
      host.currentState = "HOST_STATE_ONBOARDED";

      const instance = structuredClone(instanceOne);
      instance.currentState = "INSTANCE_STATE_ERROR";
      instance.provisioningStatusIndicator = "STATUS_INDICATION_ERROR";
      instance.provisioningStatus = "Error";
      host.instance = instance;

      cy.mount(<HostStatusPopover data={host} />);
      pom.aggregateStatusPom.root.should("contain", "Error");
      cyGet("statusIcon").find(".icon").should("have.class", "icon-error");
      pom.validatePopOverTitle(`${host.name} has provisioning error`);
    });

    it("when host is provisioned and no workloadMember assigned", () => {
      const host = structuredClone(registeredHostOne);
      host.onboardingStatusIndicator = "STATUS_INDICATION_IDLE";
      host.currentState = "HOST_STATE_ONBOARDED";

      const instance = structuredClone(instanceOne);
      instance.provisioningStatusIndicator = "STATUS_INDICATION_IDLE";
      delete instance.workloadMembers; // workloadmember deleted from test data
      host.instance = instance;

      cy.mount(<HostStatusPopover data={host} />);
      pom.aggregateStatusPom.root.should("contain", "Provisioned");
      cyGet("statusIcon").find(".icon").should("have.class", "icon-ready");
      pom.validatePopOverTitle(`${host.name} is provisioned`);
    });

    it("when host is provisioned and workloadMember assigned", () => {
      const host = structuredClone(registeredHostOne);
      host.onboardingStatusIndicator = "STATUS_INDICATION_IDLE";
      host.currentState = "HOST_STATE_ONBOARDED";

      const instance = structuredClone(instanceOne);
      instance.provisioningStatusIndicator = "STATUS_INDICATION_IDLE";
      host.instance = instance;

      cy.mount(<HostStatusPopover data={host} />);
      pom.aggregateStatusPom.root.should("contain", "Active");
      cyGet("statusIcon").find(".icon").should("have.class", "icon-ready");
      pom.validatePopOverTitle(`${host.name} is active`);
    });

    it("when host is de-authorised", () => {
      const host = structuredClone(registeredHostOne);
      host.onboardingStatusIndicator = "STATUS_INDICATION_IDLE";
      host.registrationStatusIndicator = "STATUS_INDICATION_IDLE";
      host.currentState = "HOST_STATE_UNTRUSTED";

      cy.mount(<HostStatusPopover data={host} />);
      pom.aggregateStatusPom.root.should("contain", "Deauthorized");
      cyGet("statusIcon").find(".icon").should("have.class", "icon-unknown");
      pom.validatePopOverTitle(`${host.name} is deauthorized`);
    });

    it("when host is deleted", () => {
      const host = structuredClone(registeredHostOne);
      host.onboardingStatusIndicator = "STATUS_INDICATION_IDLE";
      host.registrationStatusIndicator = "STATUS_INDICATION_IDLE";
      host.currentState = "HOST_STATE_DELETED";

      cy.mount(<HostStatusPopover data={host} />);
      pom.aggregateStatusPom.root.should("contain", "Deleted");
      cyGet("statusIcon").find(".icon").should("have.class", "icon-error");
      pom.validatePopOverTitle(`${host.name} is deleted`);
    });

    it("when no appropriate status is received", () => {
      const host = structuredClone(registeredHostOne);
      delete host.site;
      delete host.instance;
      host.currentState = "HOST_STATE_UNSPECIFIED";
      cy.mount(<HostStatusPopover data={host} />);
      pom.aggregateStatusPom.root.should("contain", "Unknown");
      pom.validatePopOverTitle(
        `${host.name} is not connected`,
        `Waiting for ${host.name} to connect`,
      );
    });

    it("when instance has trusted compute error", () => {
      cy.mount(<HostStatusPopover data={assignedWorkloadHostTwo} />);
      pom.aggregateStatusPom.root.should(
        "contain",
        "Failed: PCR Measurement Mismatch",
      );
      cyGet("statusIcon").find(".icon").should("have.class", "icon-error");

      cyGet("popover").click();
      popOverPom.el.popoverContent.should("be.visible");
      pom
        .getIconByStatus("trustedAttestationStatus")
        .contains("Failed: PCR Measurement Mismatch");
    });
  });
});
