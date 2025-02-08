/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import Hosts from "./Hosts";
import HostsPom from "./Hosts.pom";

const pom = new HostsPom();
describe("<Hosts/>", () => {
  it("should render component", () => {
    cy.mount(<Hosts />);
    pom.root.should("exist");
  });
});
