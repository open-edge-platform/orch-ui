/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import RegisterHosts from "./RegisterHosts";
import RegisterHostsPom from "./RegisterHosts.pom";

const pom = new RegisterHostsPom();
describe("<RegisterHosts/>", () => {
  beforeEach(() => {
    cy.mount(<RegisterHosts />);
  });

  it("should render component", () => {
    pom.root.should("exist");
  });

  it("create cluster option is enabled by default", () => {
    pom.el.createCluster.should("not.be.disabled");
  });

  it("create cluster option is disabled when provision is off", () => {
    // turn off auto onboard
    pom.el.isAutoProvisioned.parent().find("span").click();
    pom.el.createCluster.should("be.disabled");
  });

  it("create cluster option is disabled when onboard is off", () => {
    // turn off auto provision
    pom.el.isAutoOnboarded.parent().find("span").click();
    pom.el.createCluster.should("be.disabled");
  });
});
