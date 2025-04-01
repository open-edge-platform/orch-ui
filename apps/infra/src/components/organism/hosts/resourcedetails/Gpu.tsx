/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { eim } from "@orch-ui/apis";
import { TableColumn } from "@orch-ui/components";
import { Table } from "@spark-design/react";
import { ResourceDetailsDisplayProps } from "../ResourceDetails";

const dataCy = "gpu";
const Gpu = ({
  data,
}: ResourceDetailsDisplayProps<eim.HostResourcesGpuRead[]>) => {
  const columns: TableColumn<eim.HostResourcesGpuRead>[] = [
    { Header: "Model", accessor: "deviceName" },
    { Header: "Vendor", accessor: "vendor" },
    {
      Header: "Capabilities",
      accessor: (data: { capabilities: string[] }) => {
        const capabilities = data.capabilities;
        if (!capabilities || capabilities.length === 0) return "N/A";

        let allData = "";
        capabilities.map((item: string, index) => {
          allData += item;
          if (index != capabilities.length - 1) {
            allData += ", ";
          }
        });
        return allData;
      },
    },
  ];

  return (
    <div data-cy={dataCy}>
      <Table
        data-cy="gpuTable"
        columns={columns}
        data={data}
        variant="minimal"
        size="l"
        sort={[0, 1, 2]}
      />
    </div>
  );
};

export default Gpu;
