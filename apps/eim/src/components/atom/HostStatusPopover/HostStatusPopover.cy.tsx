/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */
import { eim } from "@orch-ui/apis";
import { PopoverPom } from "@orch-ui/components";
import { cyGet } from "@orch-ui/tests";
import {
  assignedWorkloadHostOne as hostOne,
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

  describe("Should render title", () => {
    it("when host has site associated", () => {
      cy.mount(
        <HostStatusPopover
          data={{
            ...hostOne,
            currentState: "HOST_STATE_ONBOARDED",
          }}
        />,
      );
      cyGet("popover").click();
      popOverPom.el.popoverContent.should("be.visible");
      popOverPom.el.popoverTitle.should("contain", "Host is active");
    });

    it("when host does not have a site and  have instance provisioning", () => {
      const host: eim.HostRead = structuredClone({
        ...hostOne,
        currentState: "HOST_STATE_ONBOARDED",
        instance: {
          ...hostOne.instance,
          instanceStatus: "Running",
          instanceStatusIndicator: "STATUS_INDICATION_IDLE",
          provisioningStatus: "Provisioning",
          provisioningStatusIndicator: "STATUS_INDICATION_IN_PROGRESS",
        },
      });
      delete host.site;
      cy.mount(<HostStatusPopover data={host} />);
      cyGet("popover").click();
      popOverPom.el.popoverContent.should("be.visible");
      popOverPom.el.popoverTitle.should(
        "contain",
        "Host provisioning in progress",
      );
      popOverPom.el.popoverContent.should("contain", "Host is provisioning.");
    });

    it("when host does not have a instance, site associated", () => {
      const host: eim.HostRead = structuredClone({
        ...hostOne,
        currentState: "HOST_STATE_ONBOARDED",
        instance: undefined,
        onboardingStatus: "Onboarded",
        onboardingStatusIndicator: "STATUS_INDICATION_IDLE",
      });
      delete host.site;
      delete host.instance;
      cy.mount(<HostStatusPopover data={host} />);
      cyGet("popover").click();
      popOverPom.el.popoverContent.should("be.visible");
      popOverPom.el.popoverTitle.should("contain", "Host is onboarded");
      popOverPom.el.popoverContent.should(
        "contain",
        "Host is onboarded and ready to be provisioned",
      );
    });

    it("when host is in registered state", () => {
      const host: eim.HostRead = structuredClone({
        ...hostOne,
        instance: undefined,
        currentState: "HOST_STATE_REGISTERED",
        registrationStatus: "Registered",
        registrationStatusIndicator: "STATUS_INDICATION_IDLE",
      });
      delete host.site;
      delete host.instance;
      host.currentState = "HOST_STATE_REGISTERED";
      cy.mount(<HostStatusPopover data={host} />);
      cyGet("popover").click();
      popOverPom.el.popoverContent.should("be.visible");
      popOverPom.el.popoverTitle.should("contain", "Host is registered");
      popOverPom.el.popoverContent.should(
        "contain",
        "Host is registered and ready to be onboarded.",
      );
    });

    it("when no appropriate status is received", () => {
      const host = structuredClone(hostOne);
      delete host.site;
      delete host.instance;
      host.currentState = "HOST_STATE_UNSPECIFIED";
      cy.mount(<HostStatusPopover data={host} />);
      cyGet("popover").click();
      popOverPom.el.popoverContent.should("be.visible");
      popOverPom.el.popoverTitle.should("contain", "Host is not connected");
      popOverPom.el.popoverContent.should(
        "contain",
        "Waiting for host to connect",
      );
    });
  });

  describe("Should render aggregate status", () => {
    it("when host is registered", () => {
      const host = structuredClone(registeredHostOne);
      cy.mount(<HostStatusPopover data={host} />);
      pom.aggregateStatusPom.root.should("contain", "Registered");
      cyGet("statusIcon").find(".icon").should("have.class", "icon-ready");
    });

    it("when host has registration error", () => {
      const host = structuredClone(registeredHostOne);
      host.registrationStatusIndicator = "STATUS_INDICATION_ERROR";
      host.registrationStatus = "Failed to register host";

      cy.mount(<HostStatusPopover data={host} />);
      pom.aggregateStatusPom.root.should("contain", "Failed to register host");
      cyGet("statusIcon").find(".icon").should("have.class", "icon-error");
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
    });

    it("when host has onboarding error", () => {
      const host = structuredClone(registeredHostOne);
      host.currentState = "HOST_STATE_ONBOARDED";
      host.onboardingStatusIndicator = "STATUS_INDICATION_ERROR";
      host.onboardingStatus = "Error";

      cy.mount(<HostStatusPopover data={host} />);
      pom.aggregateStatusPom.root.should("contain", "Error");
      cyGet("statusIcon").find(".icon").should("have.class", "icon-error");
    });

    it("when host is onboarded and not provisioned", () => {
      const host = structuredClone(registeredHostOne);
      host.currentState = "HOST_STATE_ONBOARDED";
      host.onboardingStatusIndicator = "STATUS_INDICATION_IDLE";
      host.onboardingStatus = "Onboarded";

      cy.mount(<HostStatusPopover data={host} />);
      pom.aggregateStatusPom.root.should("contain", "Onboarded");
      cyGet("statusIcon").find(".icon").should("have.class", "icon-ready");
    });

    it("when host provisioning in progress", () => {
      const host = structuredClone(registeredHostOne);
      host.onboardingStatusIndicator = "STATUS_INDICATION_IDLE";
      host.currentState = "HOST_STATE_ONBOARDED";

      const instance = structuredClone(instanceOne);
      instance.provisioningStatusIndicator = "STATUS_INDICATION_IN_PROGRESS";
      instance.provisioningStatus = "Provisioning";
      host.instance = instance;

      cy.mount(<HostStatusPopover data={host} />);
      pom.aggregateStatusPom.root.should("contain", "Provisioning");
      cyGet("statusIcon")
        .find(".spark-icon")
        .should("have.class", "spark-icon-spin");
    });

    it("when host has provisioning error", () => {
      const host = structuredClone(registeredHostOne);
      host.onboardingStatusIndicator = "STATUS_INDICATION_IDLE";
      host.currentState = "HOST_STATE_ONBOARDED";

      const instance = structuredClone(instanceOne);
      instance.provisioningStatusIndicator = "STATUS_INDICATION_ERROR";
      instance.provisioningStatus = "Error";
      host.instance = instance;

      cy.mount(<HostStatusPopover data={host} />);
      pom.aggregateStatusPom.root.should("contain", "Error");
      cyGet("statusIcon").find(".icon").should("have.class", "icon-error");
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
    });

    it("when host is de-authorised", () => {
      const host = structuredClone(registeredHostOne);
      host.onboardingStatusIndicator = "STATUS_INDICATION_IDLE";
      host.registrationStatusIndicator = "STATUS_INDICATION_IDLE";
      host.currentState = "HOST_STATE_UNTRUSTED";

      cy.mount(<HostStatusPopover data={host} />);
      pom.aggregateStatusPom.root.should("contain", "Deauthorized");
      cyGet("statusIcon").find(".icon").should("have.class", "icon-unknown");
    });

    it("when host is deleted", () => {
      const host = structuredClone(registeredHostOne);
      host.onboardingStatusIndicator = "STATUS_INDICATION_IDLE";
      host.registrationStatusIndicator = "STATUS_INDICATION_IDLE";
      host.currentState = "HOST_STATE_DELETED";

      cy.mount(<HostStatusPopover data={host} />);
      pom.aggregateStatusPom.root.should("contain", "Deleted");
      cyGet("statusIcon").find(".icon").should("have.class", "icon-error");
    });
  });
});
