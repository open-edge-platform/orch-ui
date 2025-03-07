/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { ClusterDetailPom } from "../../../pages/ClusterDetail/ClusterDetail.pom";
import ClusterNodesWrapper from "./ClusterNodesWrapper";
import ClusterNodesWrapperPom from "./ClusterNodesWrapper.pom";

const pom = new ClusterNodesWrapperPom();
const clusterDetailPom = new ClusterDetailPom();

describe("<ClusterNodesWrapper/>", () => {
  it("should render component", () => {
    clusterDetailPom.interceptApis([clusterDetailPom.api.getClusterSuccess]);
    pom.waitForApis();
    cy.mount(<ClusterNodesWrapper name="restaurant-portland" />);
    pom.root.should("exist");
  });

  it("should render empty component", () => {
    clusterDetailPom.interceptApis([clusterDetailPom.api.getClusterEmptyNodes]);
    pom.waitForApis();
    cy.mount(<ClusterNodesWrapper name="restaurant-portland" />);
    pom.root.should("exist");
    pom.root.should("have.text", "No nodes available.");
  });

  it("should render error", () => {
    clusterDetailPom.interceptApis([clusterDetailPom.api.getClusterError]);
    pom.waitForApis();
    cy.mount(<ClusterNodesWrapper name="restaurant-portland" />);
    pom.root.should("exist");
    pom.root.should("contain", "Unfortunately an error occurred");
  });
});
