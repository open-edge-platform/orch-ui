/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import ClusterNameAssociatedToHost from "./ClusterNameAssociatedToHost";
import ClusterNameAssociatedToHostPom from "./ClusterNameAssociatedToHost.pom";

const pom = new ClusterNameAssociatedToHostPom();
const defaultHost: infra.HostRead = {
  name: "host-1",
  instance: { resourceId: "host-1-id" },
};

describe("<ClusterNameAssociatedToHost/>", () => {
  it("should render component", () => {
    cy.mount(<ClusterNameAssociatedToHost host={defaultHost} />);
    pom.root.should("exist");
  });

  it("should render link to cluster details when available", () => {
    pom.interceptApis([pom.api.getClusterName]);
    cy.mount(<ClusterNameAssociatedToHost host={defaultHost} />);
    pom.waitForApis();
    pom.el.clusterLink.should("be.visible");
    pom.el.notAssigned.should("not.exist");
  });

  it("should route to cluster details when activated", () => {
    pom.interceptApis([pom.api.getClusterName]);
    cy.mount(<ClusterNameAssociatedToHost host={defaultHost} />);
    pom.waitForApis();
    pom.el.clusterLink.click();
    cy.get("#pathname").contains("/infrastructure/cluster/cluster-1");
  });

  it("should render 'Not Assigned' when cluster details are not available", () => {
    pom.interceptApis([pom.api.getClusterNameEmpty]);
    cy.mount(<ClusterNameAssociatedToHost host={defaultHost} />);
    pom.waitForApis();
    pom.el.clusterLink.should("not.exist");
    pom.el.notAssigned.should("be.visible");
  });
});
