/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { cm } from "@orch-ui/apis";
import { StatusIcon, TableColumn } from "@orch-ui/components";
import {
  getInfraPath,
  hostDetailsRoute,
  nodeStatusToIconStatus,
  nodeStatusToText,
} from "@orch-ui/utils";
import { Link } from "react-router-dom";

const name: TableColumn<cm.NodeInfo> = {
  Header: "Host Name",
  accessor: (node) => {
    if (node.name) {
      return node.name;
    } else if (node.id) {
      return node.id;
    }
  },
  Cell: (table: { row: { original: cm.NodeInfo } }) => {
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

const nameWithoutLink: TableColumn<cm.NodeInfo> = {
  Header: "Host Name",
  accessor: (node) => node.name || node.id,
};

const status: TableColumn<cm.NodeInfo> = {
  Header: "Readiness",
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
};

const guid: TableColumn<cm.NodeInfo> = {
  Header: "Guid",
  accessor: (nodes) => nodes.id ?? "-",
};

const os: TableColumn<cm.NodeInfo> = {
  Header: "Operating System",
  accessor: (nodes) => nodes.os ?? "-",
};

const role: TableColumn<cm.NodeInfo> = {
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
  popupFn: (node: cm.NodeInfo) => JSX.Element,
): TableColumn<cm.NodeInfo> => ({
  Header: "Role",
  textAlign: "left",
  padding: "0",
  accessor: (node) => popupFn(node),
});

const actions = (
  popupFn: (node: cm.NodeInfo) => JSX.Element,
): TableColumn<cm.NodeInfo> => ({
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
