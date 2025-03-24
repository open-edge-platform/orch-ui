/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { cm } from "@orch-ui/apis";
import ClusterNodesTable from "./ClusterNodesTable";
import ClusterNodesTablePom from "./ClusterNodesTable.pom";

const nodes: cm.NodeInfo[] = [
  {
    id: "hostId",
    status: { condition: "STATUS_CONDITION_READY" },
  },
];

const pom = new ClusterNodesTablePom();
describe("<ClusterNodesTable/> should", () => {
  beforeEach(() => {
    pom.interceptApis([pom.api.getHosts]);
    cy.mount(<ClusterNodesTable nodes={nodes} readinessType="cluster" />);
    pom.waitForApis();
  });

  it("render component", () => {
    pom.root.should("exist");
  });

  it("load data", () => {
    pom.root.should("contain", "Node 1");
    pom.root.should("contain", "linux");
    pom.root.should("contain", "CONDITION READY");
  });

  it("check default sorting as Host name", () => {
    cy.get(".caret-up-select")
      .parents(".table-header-cell")
      .should("contain.text", "Host Name");
  });
});

describe("<ClusterNodesTable/> status should", () => {
  it("render empty", () => {
    cy.mount(<ClusterNodesTable nodes={[]} readinessType="cluster" />);
    pom.root.should("contain", "No information to display");
  });
});
