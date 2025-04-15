/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  generateSshMocks,
  instanceOne,
  onboardedHostOne,
} from "@orch-ui/utils";
import { PublicSshKeyDropdown } from "./PublicSshKeyDropdown";
import { PublicSshKeyDropdownPom } from "./PublicSshKeyDropdown.pom";

const pom = new PublicSshKeyDropdownPom();
const sampleLocalAccount = generateSshMocks(1, 0);
describe("<PublicSshKeyDropdown/>", () => {
  it("should render component", () => {
    cy.mount(
      <PublicSshKeyDropdown
        hostId={onboardedHostOne.resourceId!}
        host={{ ...onboardedHostOne, instance: instanceOne }}
        onPublicKeySelect={cy.stub().as("onPublicKeySelect")}
        localAccounts={sampleLocalAccount}
      />,
    );
    pom.root.should("exist");
    pom.sshKeyDrpopdown.openDropdown(pom.root);
    pom.sshKeyDrpopdown.selectNthListItemValue(2); // Select the second item
    cy.get("@onPublicKeySelect").should(
      "have.been.calledWith",
      onboardedHostOne.resourceId,
      sampleLocalAccount[0],
    );
  });
});
