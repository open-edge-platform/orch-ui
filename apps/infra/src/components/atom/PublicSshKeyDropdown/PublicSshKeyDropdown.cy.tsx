/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { PublicSshKeyDropdown } from "./PublicSshKeyDropdown";
import {
  localAccountMocks,
  PublicSshKeyDropdownPom,
} from "./PublicSshKeyDropdown.pom";

const pom = new PublicSshKeyDropdownPom();

describe("<PublicSshKeyDropdown/>", () => {
  beforeEach(() => {
    pom.interceptApis([pom.api.getLocalAccounts]);
    cy.mount(
      <PublicSshKeyDropdown
        onPublicKeySelect={cy.stub().as("onPublicKeySelect")}
        onPublicKeyRemove={cy.stub().as("onPublicKeyRemove")}
      />,
    );
    pom.waitForApis();
  });

  it("should render component", () => {
    pom.root.should("exist");
  });

  it("should react to key select", () => {
    pom.sshKeyDropdown.openDropdown(pom.root);
    pom.sshKeyDropdown.selectNthListItemValue(2);
    cy.get("@onPublicKeySelect").should(
      "have.been.calledWith",
      localAccountMocks[0],
    );
  });

  it("should react to key unselect", () => {
    pom.sshKeyDropdown.openDropdown(pom.root);
    pom.sshKeyDropdown.selectNthListItemValue(1);
    cy.get("@onPublicKeyRemove").should("have.been.called");
  });
});
