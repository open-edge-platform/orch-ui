/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { cyGet } from "@orch-ui/tests";
import HostRegistrationAndProvisioningCancelDialog from "./HostRegistrationAndProvisioningCancelDialog";
import HostRegistrationAndProvisioningCancelDialogPom from "./HostRegistrationAndProvisioningCancelDialog.pom";

const pom = new HostRegistrationAndProvisioningCancelDialogPom();
describe("<HostRegistrationAndProvisioningCancelDialog/>", () => {
  it("should render component", () => {
    cy.mount(
      <HostRegistrationAndProvisioningCancelDialog
        isOpen
        onClose={cy.stub()}
      />,
    );
    pom.root.should("exist");
  });

  it("should return to the hosts page on cancel", () => {
    const route = "/hosts/set-up-provisioning";
    cy.mount(<div />, {
      routerProps: { initialEntries: [route] },
      routerRule: [
        {
          path: route,
          element: (
            <HostRegistrationAndProvisioningCancelDialog
              isOpen
              onClose={cy.stub()}
            />
          ),
        },
      ],
    });
    cyGet("cancelBtn").click();
    pom.getPath().should("contain", "/hosts");
  });
});
