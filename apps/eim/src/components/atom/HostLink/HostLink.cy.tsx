/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { mockHost } from "../../pages/HostDetails/HostDetails.pom";
import { HostLink } from "./HostLink";
import { HostLinkPom } from "./HostLink.pom";

const pom = new HostLinkPom();
describe("<HostLink/>", () => {
  it("should render link passing uuid", () => {
    pom.interceptApis([pom.api.getHostByUUID]);
    cy.mount(<HostLink uuid="d2c21d2b-c5e1-49b4-8a49-727320ba1529" />);
    pom.waitForApis();
    pom.root.should("contain.text", mockHost.name);
  });

  it("should render link passing ID", () => {
    pom.interceptApis([pom.api.getHostById]);
    cy.mount(<HostLink id="host-k72ywhgd" />);
    pom.waitForApis();
    pom.root.should("contain.text", mockHost.name);
  });
});
