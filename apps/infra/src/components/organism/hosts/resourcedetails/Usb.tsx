/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import { TableColumn } from "@orch-ui/components";
import { Table } from "@spark-design/react";
import { ResourceDetailsDisplayProps } from "../ResourceDetails";

const Usb = ({
  data,
}: ResourceDetailsDisplayProps<infra.HostResourcesUsbRead>) => {
  const columns: TableColumn<infra.HostResourcesUsbRead>[] = [
    { Header: "Class", accessor: "class" },
    { Header: "Serial", accessor: "serial" },
    { Header: "Vendor Id", accessor: "idVendor" },
    { Header: "Product Id", accessor: "idProduct" },
    { Header: "Bus", accessor: "bus" },
    { Header: "Address", accessor: "addr" },
    // TODO: api is not ready for this yet

    // {
    //   Header: "Status",
    //   accessor: (data: Status) => {
    //     return <div>{data.condition}</div>;
    //   },
    // },
  ];
  return (
    <div data-cy="usb">
      <Table
        data-cy="usbTable"
        columns={columns}
        data={data}
        variant="minimal"
        size="l"
        sort={[0, 1, 2, 3, 4, 5, 6]}
      />
    </div>
  );
};

export default Usb;
