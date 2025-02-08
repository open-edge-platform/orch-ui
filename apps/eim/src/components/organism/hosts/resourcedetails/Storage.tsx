/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { eim } from "@orch-ui/apis";
import { StatusIcon, TableColumn } from "@orch-ui/components";
import {
  hostStatusToIconStatus,
  hostStatusToString,
  humanFileSize,
} from "@orch-ui/utils";
import { Table } from "@spark-design/react";

import { ResourceDetailsDisplayProps } from "../ResourceDetails";

const Storage = ({
  data,
}: ResourceDetailsDisplayProps<eim.HostResourcesStorageRead[]>) => {
  const columns: TableColumn<eim.HostResourcesStorageRead>[] = [
    { Header: "WWID", accessor: "wwid" },
    {
      Header: "Capacity",
      accessor: (data: eim.HostResourcesStorageRead) => {
        const formatData = humanFileSize(parseInt(data.capacityBytes ?? "0"));
        if (!formatData) return null;
        return `${formatData.value} ${formatData.units}`;
      },
    },
    { Header: "Model", accessor: "model" },
    { Header: "Serial", accessor: "serial" },
    { Header: "Vendor", accessor: "vendor" },
    {
      Header: "Status",
      accessor: (data: eim.HostResourcesStorageRead) => {
        if (data && data.status?.type && data.status) {
          return (
            <StatusIcon
              status={hostStatusToIconStatus(data.status.type)}
              text={hostStatusToString(data.status.type)}
            />
          );
        }
      },
    },
  ];

  return (
    <div data-cy="storage">
      <Table
        data-cy="storageTable"
        columns={columns}
        data={data}
        variant="minimal"
        size="l"
        sort={[0, 1, 2, 3, 4, 5]}
      />
    </div>
  );
};

export default Storage;
