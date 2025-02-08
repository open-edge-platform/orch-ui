/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import ClusterConfiguration from "./ClusterConfiguration";
import ClusterConfigurationPom from "./ClusterConfiguration.pom";

const pom = new ClusterConfigurationPom();
describe("<ClusterConfiguration/>", () => {
  beforeEach(() => {
    cy.mount(<ClusterConfiguration accumulatedMetadata={[]} />);
  });
  it("should render component", () => {
    pom.root.should("exist");
  });

  it("should show details for single cluster option", () => {
    pom.selectOptionSingle();
    pom.el.clusterConfigurationOptionSingleDetails.should("be.visible");
  });

  it("should show no details for multi cluster option", () => {
    pom.selectOptionMulti();
    pom.el.clusterConfigurationOptionSingleDetails.should("not.exist");
  });
});
