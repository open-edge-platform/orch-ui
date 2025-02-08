/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { eim } from "@orch-ui/apis";
import { StatusIcon } from "@orch-ui/components";
import { hostStatusToIconStatus, hostStatusToString } from "@orch-ui/utils";
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
      ]}
      data={data}
      variant="minimal"
      size="l"
      sort={[0, 1, 2, 3]}
    />
  </div>
);

export default Qat;
