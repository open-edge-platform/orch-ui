/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { ecm } from "@orch-ui/apis";
import { StatusIcon, TableColumn } from "@orch-ui/components";
import { nodeStatusToIconStatus, nodeStatusToText } from "@orch-ui/utils";
import { Link } from "react-router-dom";

const name: TableColumn<ecm.NodeInfo> = {
  Header: "Host Name",
  accessor: (node) => {
    if (node.name) {
      return node.name;
    } else if (node.id) {
      return node.id;
    }
  },
  Cell: (table: { row: { original: ecm.NodeInfo } }) => (
    <Link to={`/infrastructure/host/${table.row.original.id}`}>
      {table.row.original.name !== ""
        ? table.row.original.name
        : table.row.original.id}
    </Link>
  ),
};

const nameWithoutLink: TableColumn<ecm.NodeInfo> = {
  Header: "Host Name",
  accessor: (node) => node.name ?? node.id,
};

const status: TableColumn<ecm.NodeInfo> = {
  Header: "Readiness",
  accessor: (item: ecm.NodeInfo) => nodeStatusToText(item.status),
  Cell: (table: { row: { original: ecm.NodeInfo } }) => {
    const row = table.row.original;
    return (
      <StatusIcon
        status={nodeStatusToIconStatus(row.status)}
        text={nodeStatusToText(row.status)}
      />
    );
  },
};

const guid: TableColumn<ecm.NodeInfo> = {
  Header: "Guid",
  accessor: (nodes) => nodes.guid ?? "-",
};

const serial: TableColumn<ecm.NodeInfo> = {
  Header: "Serial Number",
  accessor: (nodes) => nodes.serial ?? "-",
};

const os: TableColumn<ecm.NodeInfo> = {
  Header: "Operating System",
  accessor: (nodes) => nodes.os ?? "-",
};

const role: TableColumn<ecm.NodeInfo> = {
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
  popupFn: (node: ecm.NodeInfo) => JSX.Element,
): TableColumn<ecm.NodeInfo> => ({
  Header: "Role",
  textAlign: "left",
  padding: "0",
  accessor: (node) => popupFn(node),
});

const actions = (
  popupFn: (node: ecm.NodeInfo) => JSX.Element,
): TableColumn<ecm.NodeInfo> => ({
  Header: "Actions",
  textAlign: "center",
  padding: "0",
  accessor: (node) => popupFn(node),
});

export const NodeTableColumns = {
  name,
  nameWithoutLink,
  serial,
  status,
  os,
  guid,
  role,
  roleSelect,
  actions,
};
