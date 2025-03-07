/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import SshKeysAddEditDrawer from "./SshKeysAddEditDrawer";
import SshKeysAddEditDrawerPom, {
  fakeIncorrectFormatSshKey,
  fakeSshKey,
} from "./SshKeysAddEditDrawer.pom";

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
      username: "all-groups-example-user",
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
    pom.el.sshKeyUsername.should("have.value", "all-groups-example-user");
    pom.el.sshPublicKey.should("have.value", fakeSshKey);
    pom.el.addEditBtn.should("not.have.class", "spark-button-disabled");

    pom.el.addEditBtn.click();
    cy.get("@onEdit").should("be.calledWithExactly", testLocalAccount);
  });
});
