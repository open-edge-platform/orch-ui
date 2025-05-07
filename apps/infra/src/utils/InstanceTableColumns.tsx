/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { enhancedInfraSlice, infra } from "@orch-ui/apis";
import { AggregatedStatuses, aggregateStatuses } from "@orch-ui/components";
import {
  HostGenericStatuses,
  hostToStatuses,
  SparkTableColumn,
} from "@orch-ui/utils";
import { Link } from "react-router-dom";
import SiteCell from "../components/atom/SiteCell/SiteCell";

const name: SparkTableColumn<enhancedInfraSlice.InstanceReadModified> = {
  Header: "Name",
  accessor: (item) => {
    if (item.host?.name) {
      return item.host.name;
    } else if (item.host?.resourceId) {
      return item.host.resourceId;
    }
  },
  Cell: (table: {
    row: { original: enhancedInfraSlice.InstanceReadModified };
  }) => (
    <Link to={`../host/${table.row.original.host?.resourceId}`} relative="path">
      {table.row.original.host?.name ?? table.row.original.host?.resourceId}
    </Link>
  ),
};

const status: SparkTableColumn<enhancedInfraSlice.InstanceReadModified> = {
  Header: "Status",
  //TODO: infra.HostRead is not directly coming from item.host
  accessor: (item) =>
    aggregateStatuses(hostToStatuses(item.host!, item), "hostStatus").message,
  Cell: (table: {
    row: { original: enhancedInfraSlice.InstanceReadModified };
  }) => (
    <AggregatedStatuses<HostGenericStatuses>
      defaultStatusName="hostStatus"
      statuses={hostToStatuses(
        table.row.original.host! as infra.HostRead,
        table.row.original.host?.instance,
      )}
    />
  ),
};

const serial: SparkTableColumn<enhancedInfraSlice.InstanceReadModified> = {
  Header: "Serial",
  accessor: (instance) => instance.host?.serialNumber ?? "-",
};

const os: SparkTableColumn<enhancedInfraSlice.InstanceReadModified> = {
  Header: "Operating System",
  accessor: (instance) => instance.os?.name ?? "-",
};

const site: SparkTableColumn<enhancedInfraSlice.InstanceReadModified> = {
  Header: "Site",
  accessor: "host.site.siteID",
  Cell: (table: {
    row: { original: enhancedInfraSlice.InstanceReadModified };
  }) => {
    return (
      <SiteCell
        siteId={table.row.original.host?.site?.siteID ?? "-"}
        regionId={table.row.original.host?.site?.region?.resourceId}
      />
    );
  },
};

export const InstanceTableColumn = {
  name,
  status,
  serial,
  os,
  site,
};
