/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import HostProvision from "./HostProvision";
import HostProvisionPom from "./HostProvision.pom";

const pom = new HostProvisionPom();
describe("<HostProvision/>", () => {
  it("should render component", () => {
    cy.mount(<HostProvision />);
    pom.root.should("exist");
  });
});
