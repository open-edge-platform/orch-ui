/*
 * SPDX-FileCopyrightText: (C) 2026 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import { defaultActiveProject } from "@orch-ui/tests";
import { SharedStorage } from "@orch-ui/utils";
import VproDetails from "./VproDetails";
import VproDetailsPom, { mockHostUuid } from "./VproDetails.pom";

const pom = new VproDetailsPom();

describe("<VproDetails/>", () => {
  const mockHost: infra.HostResourceRead = {
    uuid: mockHostUuid,
    name: "Test Host",
    resourceId: "test-host-id",
    amtSku: "AMT_SKU_AMT",
    desiredAmtState: "AMT_STATE_PROVISIONED",
    currentAmtState: "AMT_STATE_PROVISIONED",
    amtStatus: "AMT Activation Done",
    powerStatus: "Powered on",
  };

  beforeEach(() => {
    // Set up project in SharedStorage
    SharedStorage.project = defaultActiveProject;
  });

  it("should render component", () => {
    cy.mount(<VproDetails host={mockHost} />);
    pom.root.should("exist");
  });

  it("should display SKU value correctly", () => {
    cy.mount(<VproDetails host={mockHost} />);
    pom.getDetailValueByLabel("SKU").should("contain", mockHost.amtSku);
  });

  it("should display Power status value correctly", () => {
    cy.mount(<VproDetails host={mockHost} />);
    pom
      .getDetailValueByLabel("Power status")
      .should("contain", mockHost.powerStatus);
  });

  it("should display AMT Status value correctly", () => {
    cy.mount(<VproDetails host={mockHost} />);
    pom
      .getDetailValueByLabel("AMT Status")
      .should("contain", mockHost.amtStatus);
  });
});
