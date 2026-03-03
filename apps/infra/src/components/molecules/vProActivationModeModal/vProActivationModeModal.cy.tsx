/*
 * SPDX-FileCopyrightText: (C) 2026 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import VProActivationModeModal from "./vProActivationModeModal";
import vProActivationModeModalPom from "./vProActivationModeModal.pom";

const pom = new vProActivationModeModalPom();

const mockHost: infra.HostResourceRead = {
  resourceId: "test-host-id",
  name: "test-host",
  uuid: "test-uuid",
  instance: undefined,
  amtSku: "AMT_SKU_AMT",
  currentAmtState: "AMT_STATE_PROVISIONED",
} as infra.HostResourceRead;

describe("<VProActivationModeModal/>", () => {
  it("should render component", () => {
    cy.mount(
      <VProActivationModeModal
        isOpen={true}
        onRequestClose={cy.stub()}
        host={mockHost}
        selectedAmtControlMode="AMT_CONTROL_MODE_ACM"
        onAmtControlModeChange={cy.stub()}
        onActivate={cy.stub()}
      />,
    );
    pom.root.should("exist");
  });
});
