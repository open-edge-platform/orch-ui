/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */
import { eim } from "@orch-ui/apis";
import { PopoverPom } from "@orch-ui/components";
import { cyGet } from "@orch-ui/tests";
import { assignedWorkloadHostOne as hostOne } from "@orch-ui/utils";
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
});
