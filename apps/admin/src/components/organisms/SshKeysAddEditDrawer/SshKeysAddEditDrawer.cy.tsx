/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import SshKeysAddEditDrawer from "./SshKeysAddEditDrawer";
import SshKeysAddEditDrawerPom, {
  fakeIncorrectFormatSshKey,
  fakeSshKey,
} from "./SshKeysAddEditDrawer.pom";

const errorMessage =
  "Username must begin with a lowercase letter and contain only lowercase letters, numbers, and hyphens (Max 32 characters)";

const pom = new SshKeysAddEditDrawerPom();
describe("<SshKeysAddEditDrawer/>", () => {
  beforeEach(() => {
    cy.mount(
      <SshKeysAddEditDrawer
        onHide={cy.stub().as("onHide")}
        onAdd={cy.stub().as("onAdd")}
        onEdit={cy.stub().as("onEdit")}
        isOpen
      />,
    );
  });

  it("should render component", () => {
    pom.root.should("exist");
  });

  it("should call onHide by header close button", () => {
    pom.root.should("exist");
    pom.getHeaderCloseButton().click();
    cy.get("@onHide").should("be.called");
  });
  it("should call onHide by footer close button", () => {
    pom.root.should("exist");
    pom.el.cancelFooterBtn.click();
    cy.get("@onHide").should("be.called");
  });

  it("should show error when inputting a wrong ssh format", () => {
    const testLocalAccount = {
      username: "test-user",
      sshKey: fakeIncorrectFormatSshKey,
    };
    pom.root.should("exist");
    pom.el.sshInputErrorMessage.should("not.exist");
    pom.fillSshForm(testLocalAccount);
    pom.el.sshInputErrorMessage.should("exist");
    pom.el.addEditBtn.should("have.class", "spark-button-disabled");
  });

  it("should enforce username format validation", () => {
    /* should show error when inputting a invalid format */
    pom.el.drawerFormBody.should("not.contain.text", errorMessage); // default no error

    pom.el.sshKeyUsername.clear().type("-"); // error when inputting a hyphen instead of a lowercase letter
    pom.el.sshKeyUsername.blur();
    pom.el.drawerFormBody.should("contain.text", errorMessage);

    pom.el.sshKeyUsername.clear().type("test-user"); // valid input
    pom.el.sshKeyUsername.blur();
    pom.el.drawerFormBody.should("not.contain.text", errorMessage);

    pom.el.sshKeyUsername.type("@fake-key"); // in continuation error when inputting a special character
    pom.el.sshKeyUsername.blur();
    pom.el.drawerFormBody.should("contain.text", errorMessage);
  });

  it("should show error when username exceeds 32 characters", () => {
    // 32 characters
    pom.el.sshKeyUsername.clear().type("abcdefghijklmnopqrstuvwxyzabcdefg"); // input exceeding 32 characters
    pom.el.sshKeyUsername.blur();
    pom.el.drawerFormBody.should("contain.text", errorMessage); // error message should be shown
  });

  it("should call onAdd by footer close button", () => {
    const testLocalAccount = { username: "test-user", sshKey: fakeSshKey };
    pom.root.should("exist");
    pom.el.addEditBtn.should("have.class", "spark-button-disabled");
    pom.fillSshForm(testLocalAccount);
    pom.el.addEditBtn.should("not.have.class", "spark-button-disabled");
    pom.el.addEditBtn.click();
    cy.get("@onAdd").should("be.calledWithExactly", testLocalAccount);
  });

  it("should call onEdit by footer close button", () => {
    const testLocalAccount = {
      sshKey: fakeSshKey,
      username: "test-key-name",
      resourceId: "ssh-key",
    };

    cy.mount(
      <SshKeysAddEditDrawer
        defaultLocalAccount={testLocalAccount}
        onHide={cy.stub().as("onHide")}
        onAdd={cy.stub().as("onAdd")}
        onEdit={cy.stub().as("onEdit")}
        isOpen
      />,
    );

    pom.root.should("exist");
    pom.el.sshKeyUsername.should("have.value", "test-key-name");
    pom.el.sshPublicKey.should("have.value", fakeSshKey);
    pom.el.addEditBtn.should("not.have.class", "spark-button-disabled");

    pom.el.addEditBtn.click();
    cy.get("@onEdit").should("be.calledWithExactly", testLocalAccount);
  });
});
