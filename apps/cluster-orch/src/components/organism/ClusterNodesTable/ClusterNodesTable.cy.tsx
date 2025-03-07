/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { cm } from "@orch-ui/apis";
import { StatusIcon, TableColumn } from "@orch-ui/components";
import { nodeStatusToIconStatus, nodeStatusToText } from "@orch-ui/utils";
import ClusterNodesTable from "./ClusterNodesTable";
import ClusterNodesTablePom from "./ClusterNodesTable.pom";

// Nodes Table Columns
const columns: TableColumn<cm.NodeInfo>[] = [
  {
    Header: "Host Name",
    accessor: (node) => node.name,
  },

  {
    Header: "Status",
    accessor: (item: cm.NodeInfo) => nodeStatusToText(item.status),
    Cell: (table: { row: { original: cm.NodeInfo } }) => {
      const row = table.row.original;

      return (
        <StatusIcon
          status={nodeStatusToIconStatus(row.status)}
          text={nodeStatusToText(row.status)}
        />
      );
    },
  },
  {
    Header: "Operating System",
    accessor: (nodes) => nodes.os ?? "-",
  },
];

const nodes: cm.NodeInfo[] = [
  {
    name: "Node 1",
    os: "linux",
    status: { condition: "STATUS_CONDITION_READY" },
  },
];

const pom = new ClusterNodesTablePom();
describe("<ClusterNodesTable/> should", () => {
  beforeEach(() => {
    cy.mount(<ClusterNodesTable nodes={nodes} columns={columns} />);
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
    cy.mount(<ClusterNodesTable nodes={[]} columns={columns} />);
    pom.root.should("contain", "No information to display");
  });
});
