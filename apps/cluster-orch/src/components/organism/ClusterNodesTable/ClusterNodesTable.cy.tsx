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
    status: { condition: "STATUS_CONDITION_READY", reason: "Running" },
  },
];

const pom = new ClusterNodesTablePom();
describe("<ClusterNodesTable/> should", () => {
  beforeEach(() => {
    pom.interceptApis([pom.api.getHosts]);
    cy.mount(
      <ClusterNodesTable
        nodes={nodes}
        readinessType="cluster"
        filterOn="resourceId"
      />,
    );
    pom.waitForApis();
  });

  it("render component", () => {
    pom.root.should("exist");
  });

  it("load data", () => {
    pom.root.should("contain", "Node 1");
    pom.root.should("contain", "linux");
    pom.root.should("contain", "Running");
  });

  it("display 'Not compatible' when trusted compute is not enabled", () => {
    pom.root.should("contain", "Not compatible");
  });

  it("display 'Compatible' when trusted compute is enabled", () => {
    pom.interceptApis([pom.api.getHostsWithTCEnabled]);
    cy.mount(
      <ClusterNodesTable
        nodes={nodes}
        readinessType="cluster"
        filterOn={"resourceId"}
      />,
    );
    pom.waitForApis();
    pom.root.should("contain", "Compatible");
  });

  it("check default sorting as Host name", () => {
    cy.get(".caret-up-select")
      .parents(".table-header-cell")
      .should("contain.text", "Host Name");
  });

  it("call onDataLoad prop when data is loaded", () => {
    const onDataLoadSpy = cy.spy().as("onDataLoadSpy");
    cy.mount(
      <ClusterNodesTable
        nodes={nodes}
        readinessType="cluster"
        filterOn="resourceId"
        onDataLoad={onDataLoadSpy}
      />,
    );
    pom.waitForApis();
    cy.get("@onDataLoadSpy").should("have.been.calledOnce");
  });
});

describe("<ClusterNodesTable/> status should", () => {
  it("render empty", () => {
    cy.mount(
      <ClusterNodesTable
        nodes={[]}
        readinessType="cluster"
        filterOn="resourceId"
      />,
    );
    pom.root.should("contain", "No information to display");
  });
});
