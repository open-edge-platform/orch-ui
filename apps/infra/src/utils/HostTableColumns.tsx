/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import { aggregateStatuses, TableColumn } from "@orch-ui/components";
import { getInfraPath, hostDetailsRoute, hostToStatuses } from "@orch-ui/utils";
import { Link } from "react-router-dom";
import ClusterNameAssociatedToHost from "../components/atom/ClusterNameAssociatedToHost/ClusterNameAssociatedToHost";
import { HostStatusPopover } from "../components/atom/HostStatusPopover/HostStatusPopover";
import { OsConfig } from "../components/atom/OsConfig/OsConfig";
import SiteCell from "../components/atom/SiteCell/SiteCell";
import { HostData } from "../store/configureHost";

const _name = (basePath: string = ""): TableColumn<infra.HostRead> => {
  return {
    Header: "Name",
    apiName: "name",
    accessor: (item) => {
      if (item.name) {
        return item.name;
      } else if (item.resourceId) {
        return item.resourceId;
      }
    },
    Cell: (table: { row: { original: infra.HostRead } }) => {
      return (
        <Link
          to={getInfraPath(hostDetailsRoute, {
            id: table.row.original?.resourceId ?? "",
          })}
        >
          {table.row.original.name !== ""
            ? table.row.original.name
            : table.row.original.resourceId}
        </Link>
      );
    },
  };
};

const name = (basePath: string = ""): TableColumn<infra.HostRead> => {
  return {
    Header: "Name",
    apiName: "name",
    accessor: (item) => {
      if (item.name) {
        return item.name;
      } else if (item.resourceId) {
        return item.resourceId;
      }
    },
    Cell: (table: { row: { original: infra.HostRead } }) => {
      const hostId = table.row.original.resourceId;
      return hostId ? (
        <Link
          to={`${getInfraPath(hostDetailsRoute, { id: hostId })}`}
          relative="path"
        >
          {table.row.original.name !== "" ? table.row.original.name : hostId}
        </Link>
      ) : (
        <>{table.row.original.name}</>
      );
    },
  };
};

const nameWithoutLink: TableColumn<infra.HostRead> = {
  Header: "Host Name",
  apiName: "name",
  accessor: (item) => {
    if (item.name) {
      return item.name;
    } else if (item.resourceId) {
      return item.resourceId;
    }
  },
};

const guid: TableColumn<infra.HostRead> = {
  Header: "UUID",
  apiName: "uuid",
  accessor: (host) => host.uuid ?? "-",
};

const serialNumber: TableColumn<infra.HostRead> = {
  Header: "Serial Number",
  apiName: "serialNumber",
  accessor: (host) => host.serialNumber,
};

const site: TableColumn<infra.HostRead> = {
  Header: "Site",
  accessor: "site.siteID",
  Cell: (table: { row: { original: infra.HostRead } }) => {
    return (
      <SiteCell
        siteId={table.row.original.site?.region?.resourceId}
        regionId={table.row.original.site?.region?.resourceId}
      />
    );
  },
};

const siteWithCustomBasePath = (
  basePath: string,
): TableColumn<infra.HostRead> => ({
  Header: "Site",
  accessor: "site.siteID",
  Cell: (table: { row: { original: infra.HostRead } }) => {
    return (
      <SiteCell
        siteId={table.row.original.site?.siteID}
        basePath={basePath}
        regionId={table.row.original.site?.region?.resourceId}
      />
    );
  },
});

const status: TableColumn<infra.HostRead> = {
  Header: "Host Status",
  apiName: "hostStatus",
  accessor: (host) =>
    aggregateStatuses(hostToStatuses(host, host.instance), "hostStatus")
      .message || "-",
  Cell: (table: { row: { original: infra.HostRead } }) => (
    <HostStatusPopover data={table.row.original} />
  ),
};

const os: TableColumn<infra.HostRead> = {
  Header: "Operating System",
  accessor: (host) => host.instance?.currentOs?.name ?? "-",
  Cell: (table: { row: { original: infra.HostRead } }) => {
    return <OsConfig instance={table.row.original.instance} iconOnly />;
  },
};

const reason: TableColumn<infra.HostRead> = {
  Header: "Deauthorized Reason",
  apiName: "note",
  accessor: "note",
  Cell: (table: { row: { original: infra.HostRead } }) =>
    table.row.original.note || <em>(Reason not specified)</em>,
};

const autoOnboard: TableColumn<infra.HostRead> = {
  Header: "Auto Onboard",
  accessor: (host) =>
    host.desiredState === "HOST_STATE_ONBOARDED" ? "Yes" : "No",
};

const workload: TableColumn<infra.HostRead> = {
  Header: "Workload",
  Cell: (table: { row: { original: infra.HostRead } }) => {
    const host = table.row.original;
    return <ClusterNameAssociatedToHost host={host} />;
  },
};

const actions = (
  popupFn: (host: infra.HostRead) => JSX.Element,
): TableColumn<infra.HostRead> => ({
  Header: "Actions",
  textAlign: "center",
  padding: "0",
  accessor: (host) => popupFn(host),
});

const hostConfigName: TableColumn<HostData> = {
  Header: "Host Name",
  apiName: "name",
  accessor: (item) => {
    if (item.name) {
      return item.name;
    } else if (item.resourceId) {
      return item.resourceId;
    }
  },
};

const serialNumberUuid: TableColumn<HostData> = {
  Header: "Serial Number and UUID",
  accessor: (host) => host.serialNumber,
  Cell: (table: { row: { original: HostData } }) => {
    const serialNumber = table.row.original.serialNumber;
    const uuid = table.row.original.uuid;
    return (
      <>
        <div className="serial-number">
          {serialNumber || "No serial number present"}
        </div>
        <div className="uuid">{uuid || "No UUID present"}</div>
      </>
    );
  },
};

const publicSshKey = (
  popupFn: (host: HostData) => JSX.Element,
): TableColumn<HostData> => ({
  Header: "SSH Key Name",
  accessor: (host) => popupFn(host),
});

export const HostTableColumn = {
  _name,
  name,
  nameWithoutLink,
  guid,
  serialNumber,
  site,
  siteWithCustomBasePath,
  status,
  os,
  reason,
  autoOnboard,
  actions,
  workload,
  hostConfigName,
  serialNumberUuid,
  publicSshKey,
};
