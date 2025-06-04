/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import { TableColumn } from "@orch-ui/components";
import { humanFileSize } from "@orch-ui/utils";
import { Table } from "@spark-design/react";

import { ResourceDetailsDisplayProps } from "../ResourceDetails";

const Storage = ({
  data,
}: ResourceDetailsDisplayProps<infra.HoststorageResourceRead[]>) => {
  const columns: TableColumn<infra.HoststorageResourceRead>[] = [
    { Header: "WWID", accessor: "wwid" },
    {
      Header: "Capacity",
      accessor: (data: infra.HoststorageResourceRead) => {
        const formatData = humanFileSize(parseInt(data.capacityBytes ?? "0"));
        if (!formatData) return null;
        return `${formatData.value} ${formatData.units}`;
      },
    },
    { Header: "Model", accessor: "model" },
    { Header: "Serial", accessor: "serial" },
    { Header: "Vendor", accessor: "vendor" },
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
