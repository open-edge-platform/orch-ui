/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { cm } from "@orch-ui/apis";
import { Table, TableColumn } from "@orch-ui/components";

export const dataCy = "clusterNodesTable";
interface ClusterNodesTableProps {
  nodes?: cm.NodeInfo[];
  columns: TableColumn<cm.NodeInfo>[];
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
