/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import SshKeys from "./SshKeys";
import SshKeysPom from "./SshKeys.pom";

const pom = new SshKeysPom();
describe("<SshKeys/>", () => {
  it("should render component", () => {
    cy.mount(<SshKeys />);
    pom.root.should("exist");
  });
});
