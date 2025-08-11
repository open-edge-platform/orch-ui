/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { cm, infra } from "@orch-ui/apis";
import { StatusIcon, TableColumn } from "@orch-ui/components";
import {
  getInfraPath,
  hostDetailsRoute,
  nodeStatusToIconStatus,
  nodeStatusToText,
} from "@orch-ui/utils";
import { Link } from "react-router-dom";

export type CombinedNodeHostItem = Partial<infra.HostResourceRead> &
  cm.NodeInfo;
export type CombinedNodeHostList = CombinedNodeHostItem[];

const name: TableColumn<CombinedNodeHostItem> = {
  Header: "Host Name",
  accessor: (node) => {
    if (node.name) {
      return node.name;
    } else if (node.id) {
      return node.id;
    }
  },
  Cell: (table: { row: { original: CombinedNodeHostItem } }) => {
    return table.row.original.id ? (
      <Link
        to={getInfraPath(hostDetailsRoute, {
          id: table.row.original.id,
        })}
      >
        {table.row.original.name !== ""
          ? table.row.original.name
          : table.row.original.id}
      </Link>
    ) : (
      table.row.original.name
    );
  },
};

const nameWithoutLink: TableColumn<CombinedNodeHostItem> = {
  Header: "Host Name",
  accessor: (node) => node.name || node.id,
};

const status: TableColumn<CombinedNodeHostItem> = {
  Header: "Readiness",
  accessor: (item: CombinedNodeHostItem) => nodeStatusToText(item.status),
  Cell: (table: { row: { original: cm.NodeInfo } }) => {
    const row = table.row.original;
    return (
      <StatusIcon
        status={nodeStatusToIconStatus(row.status)}
        text={nodeStatusToText(row.status)}
      />
    );
  },
};

const guid: TableColumn<cm.NodeInfo> = {
  Header: "Guid",
  accessor: (nodes) => nodes.id ?? "-",
};

const os: TableColumn<CombinedNodeHostItem> = {
  Header: "Operating System",
  accessor: (nodes) => nodes.instance?.currentOs?.name ?? "-",
};

const role: TableColumn<CombinedNodeHostItem> = {
  Header: "Role",
  accessor: (nodes) => {
    let roleUpdate = "";
    switch (nodes.role) {
      case "controlplane":
        roleUpdate = "Control Plane";
        break;
      case "all":
        roleUpdate = "All";
        break;
      case "worker":
        roleUpdate = "Worker";
        break;
    }
    return roleUpdate.length > 0 ? roleUpdate : "-";
  },
};

const roleSelect = (
  popupFn: (node: CombinedNodeHostItem) => JSX.Element,
): TableColumn<CombinedNodeHostItem> => ({
  Header: "Role",
  textAlign: "left",
  padding: "0",
  accessor: (node) => popupFn(node),
});

const actions = (
  popupFn: (node: CombinedNodeHostItem) => JSX.Element,
): TableColumn<CombinedNodeHostItem> => ({
  Header: "Actions",
  textAlign: "center",
  padding: "0",
  accessor: (node) => popupFn(node),
});

export const NodeTableColumns = {
  name,
  nameWithoutLink,
  status,
  os,
  guid,
  role,
  roleSelect,
  actions,
};
