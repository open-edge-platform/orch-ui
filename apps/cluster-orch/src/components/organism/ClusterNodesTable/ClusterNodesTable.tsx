/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { ecm } from "@orch-ui/apis";
import { Table, TableColumn } from "@orch-ui/components";

export const dataCy = "clusterNodesTable";
interface ClusterNodesTableProps {
  nodes?: ecm.NodeInfo[];
  columns: TableColumn<ecm.NodeInfo>[];
}
const ClusterNodesTable = ({ nodes, columns }: ClusterNodesTableProps) => {
  const cy = { "data-cy": dataCy };

  return (
    <div {...cy} className="cluster-nodes-table">
      <Table
        columns={columns}
        data={nodes}
        sortColumns={[0, 1, 2, 3]}
        initialSort={{
          column: "Host Name",
          direction: "asc",
        }}
        key="hosts-table"
      />
    </div>
  );
};

export default ClusterNodesTable;
