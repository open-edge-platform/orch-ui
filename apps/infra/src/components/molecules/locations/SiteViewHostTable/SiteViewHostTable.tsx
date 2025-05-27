/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import { ApiError, Empty, Table, TableColumn } from "@orch-ui/components";
import { SharedStorage } from "@orch-ui/utils";
import { HostTableColumn } from "../../../../utils/HostTableColumns";
import HostPopup from "../../ProvisionedHostPopup/ProvisionedHostPopup";
import "./SiteViewHostTable.scss";

const dataCy = "siteViewHostTable";
export interface SiteViewHostTableProps {
  site?: infra.SiteRead;
  basePath?: string;
}
export const SiteViewHostTable = ({
  site,
  basePath,
}: SiteViewHostTableProps) => {
  const cy = { "data-cy": dataCy };

  const columns: TableColumn<infra.HostRead>[] = [
    HostTableColumn.name(),
    HostTableColumn.status,
    HostTableColumn.actions((host: infra.HostRead) => (
      <HostPopup host={host} basePath={basePath} />
    )),
  ];

  const projectName = SharedStorage.project?.name ?? "";
  const { data, isSuccess, isError, isLoading, error } =
    infra.useGetV1ProjectsByProjectNameComputeHostsQuery(
      {
        projectName,
        pageSize: 10,
        orderBy: "name",
        siteId: site?.resourceId,
      },
      {
        skip: !site?.resourceId || !projectName,
      },
    );

  const isEmptyError = () => isSuccess && data.hosts.length === 0;

  if (isError) {
    return (
      <div {...cy}>
        <ApiError error={error} />
      </div>
    );
  } else if (!data || isEmptyError()) {
    return (
      <div {...cy} className="pa-1">
        <Empty title="No hosts are available here." icon="information-circle" />
      </div>
    );
  }

  return (
    <div {...cy} className="site-view-host-table">
      <Table columns={columns} data={data?.hosts} isLoading={isLoading} />
    </div>
  );
};
