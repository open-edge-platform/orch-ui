/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { Table } from "@spark-design/react";
import { ResourceDetailsDisplayProps } from "../ResourceDetails";

const Qat = ({ data }: ResourceDetailsDisplayProps<any>) => (
  <div data-cy="qat">
    <Table
      data-cy="qatTable"
      columns={[
        { Header: "Model", accessor: "model" },
        { Header: "Vendor", accessor: "vendor" },
        { Header: "VFS", accessor: "vfs" },
      ]}
      data={data}
      variant="minimal"
      size="l"
      sort={[0, 1, 2, 3]}
    />
  </div>
);

export default Qat;
