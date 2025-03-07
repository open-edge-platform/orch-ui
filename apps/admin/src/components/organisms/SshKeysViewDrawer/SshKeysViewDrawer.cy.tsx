/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { fakeSshKey } from "../SshKeysAddEditDrawer/SshKeysAddEditDrawer.pom";
import SshKeysViewDrawer from "./SshKeysViewDrawer";
import SshKeysViewDrawerPom from "./SshKeysViewDrawer.pom";

const pom = new SshKeysViewDrawerPom();
describe("<SshKeysViewDrawer/>", () => {
  const testLocalAccount = {
    resourceId: "ssh-12kjjk1",
    sshKey: fakeSshKey,
    username: "all-group-example-user",
  };

  beforeEach(() => {
    cy.mount(
      <SshKeysViewDrawer
        isOpen
        localAccount={testLocalAccount}
        onHide={cy.stub().as("onHide")}
      />,
    );
  });
  it("should render component", () => {
    pom.root.should("exist");
    pom.el.sshKeyUsername.should("have.text", testLocalAccount.username);
    pom.el.sshPublicKey.should("have.value", testLocalAccount.sshKey);
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
  it("should copy ssh to clipboard", () => {
    pom.el.copySshButton.click();
    cy.window().then((win) => {
      win.navigator.clipboard.readText().then((text) => {
        expect(text).to.eq(fakeSshKey);
      });
    });
  });
});
