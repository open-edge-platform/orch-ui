/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { fakeSshKey } from "../SshKeyInUseByHostsCell/SshKeyInUseByHostsCell.pom";
import SshKeysPopup from "./SshKeysPopup";
import SshKeysPopupPom from "./SshKeysPopup.pom";

const pom = new SshKeysPopupPom();
describe("<SshKeysPopup/>", () => {
  const testLocalAccount = {
    sshKey: fakeSshKey,
    username: "test-key-name",
    resourceId: "localaccount:123jlk",
  };

  it("should open view details drawer", () => {
    cy.mount(
      <SshKeysPopup
        localAccount={testLocalAccount}
        onViewDetails={cy.stub().as("onViewDetails")}
        onDelete={cy.stub().as("onDelete")}
      />,
    );
    pom.popupPom.root.click().as("popup");
    cy.get("@popup").contains("View Details").click();
    cy.get("@onViewDetails").should("be.called");
  });

  it("should see delete disabled for the ssh in use", () => {
    pom.interceptApis([pom.api.getInstance]);
    cy.mount(
      <SshKeysPopup
        localAccount={testLocalAccount}
        onViewDetails={cy.stub().as("onViewDetails")}
        onDelete={cy.stub().as("onDelete")}
      />,
    );
    pom.waitForApis();

    pom.popupPom.root.click().as("popup");
    cy.get("@popup")
      .contains("Delete")
      .should("have.class", "popup__option-item-disable");
  });

  it("should see delete modal for the ssh when it's not in use", () => {
    pom.interceptApis([pom.api.getInstanceEmpty]);
    cy.mount(
      <SshKeysPopup
        localAccount={testLocalAccount}
        onViewDetails={cy.stub().as("onViewDetails")}
        onDelete={cy.stub().as("onDelete")}
      />,
    );
    pom.waitForApis();
    pom.popupPom.root.click().as("popup");
    cy.get("@popup").contains("Delete").click();
    cy.get("@onDelete").should("be.called");
  });
});
