/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { clusterOne } from "@orch-ui/utils";
import ClusterSummary from "./ClusterSummary";
import ClusterSummaryPom from "./ClusterSummary.pom";

const pom = new ClusterSummaryPom();
describe("<ClusterSummary/>", () => {
  describe("should render component", () => {
    beforeEach(() => {
      pom.interceptApis([pom.api.clusterMocked]);
      cy.mount(<ClusterSummary nodeId="uuid" site="site" />);
      pom.waitForApis();
    });
    it("with mocked properties displayed", () => {
      pom.root.should("exist");
      pom.el.name.contains(clusterOne.name!);
      pom.el.status.contains(clusterOne.providerStatus!.indicator!);
      pom.el.hosts.contains(clusterOne.nodes!.length);
    });

    it("navigates to the cluster details page", () => {
      pom.el.link.click();
      cy.get("#pathname #value").contains(clusterOne.name!);
    });
  });

  describe("Should render error", () => {
    it("on 500 response", () => {
      pom.interceptApis([pom.api.cluster500]);
      cy.mount(<ClusterSummary nodeId="uuid" site="site" />);
      pom.waitForApis();
    });
  });
});
