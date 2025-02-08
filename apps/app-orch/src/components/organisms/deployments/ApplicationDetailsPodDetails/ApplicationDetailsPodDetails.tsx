/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { arm } from "@orch-ui/apis";
import {
  Empty,
  Status,
  StatusIcon,
  Table,
  TableColumn,
} from "@orch-ui/components";
import {
  generateContainerStatus,
  generateContainerStatusIcon,
} from "../../../../utils/app-catalog"; // TODO: Check if this can be moved to @orch-utils/global/app-orch/global.ts

export const dataCy = "applicationDetailsPodDetails";

interface ApplicationDetailsPodDetailsProps {
  containers?: arm.ContainerRead[];
}

const ApplicationDetailsPodDetails = ({
  containers = [],
}: ApplicationDetailsPodDetailsProps) => {
  const cy = { "data-cy": dataCy };

  const columns: TableColumn<arm.ContainerRead>[] = [
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Status",
      accessor: (row: arm.ContainerRead) =>
        row.status ? (
          <StatusIcon
            text={generateContainerStatus(row.status)}
            status={generateContainerStatusIcon(row.status)}
          />
        ) : (
          <StatusIcon text="Unknown" status={Status.Unknown} />
        ),
    },
    {
      Header: "Image Name",
      accessor: "imageName",
    },
    {
      Header: "Restart count",
      accessor: "restartCount",
    },
  ];

  return (
    <div {...cy} className="application-details-pod-details">
      {containers.length > 0 ? (
        <Table
          dataCy="pods"
          columns={columns}
          data={containers}
          sortColumns={[0, 1, 2, 3]}
          isServerSidePaginated={false}
          canPaginate
        />
      ) : (
        <Empty
          dataCy="empty"
          icon="cube-detached"
          title="There are no Container currently available."
        />
      )}
    </div>
  );
};

export default ApplicationDetailsPodDetails;
