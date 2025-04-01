/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { adm, cm } from "@orch-ui/apis";
import {
  AggregatedStatuses,
  AggregatedStatusesMap,
  aggregateStatuses,
  SquareSpinner,
  Table,
  TableColumn,
} from "@orch-ui/components";
import { clusterToStatuses, SharedStorage } from "@orch-ui/utils";
import { Heading } from "@spark-design/react";
import { useCallback } from "react";
import "./Review.scss";

const dataCy = "reviewClusters";

interface ReviewProps {
  deployment: adm.DeploymentRead;
  changedOnly: boolean;
  selectedClusters?: cm.ClusterInfoRead[];
}

const ReviewClusters = ({
  deployment,
  changedOnly,
  selectedClusters,
}: ReviewProps) => {
  const cy = { "data-cy": dataCy };
  const projectName = SharedStorage.project?.name ?? "";
  const oldClusters = deployment.targetClusters?.map((tc) => tc.clusterId);

  const asterisk = useCallback(
    (value?: string): string =>
      oldClusters?.includes(value) === true ? "" : "*",
    [],
  );

  const clustersFilter = selectedClusters
    ?.map((sc) => sc.name)
    ?.map((name) => `name=${name}`)
    .join(" OR ");

  const { data: clustersResponse, isSuccess: clustersSuccess } =
    cm.useGetV2ProjectsByProjectNameClustersQuery({
      projectName,
      filter: clustersFilter,
    });

  if (!clustersResponse || !clustersSuccess) {
    return <SquareSpinner />;
  }

  const clusterColumns: TableColumn<cm.ClusterInfoRead>[] = [
    {
      Header: "Cluster Name",
      accessor: (item) => `${item.name}${asterisk(item.name)}`,
    },
    {
      Header: "Host Count",
      accessor: "nodeQuantity",
    },
    {
      Header: "Status",
      accessor: (item) =>
        aggregateStatuses(clusterToStatuses(item), "lifecyclePhase").message,
      Cell: (table) => (
        <AggregatedStatuses<AggregatedStatusesMap>
          statuses={clusterToStatuses(table.row.original)}
          defaultStatusName="lifecyclePhase"
        />
      ),
    },
  ];

  const clusters = clustersResponse.clusters;

  const clustersChangedOnly = clusters?.filter(
    (cluster) => !oldClusters?.includes(cluster.name),
  );

  return (
    <div {...cy} className="review-clusters">
      <Heading semanticLevel={6}>Clusters</Heading>
      <Table
        dataCy="clusterReviewList"
        columns={clusterColumns}
        data={changedOnly ? clustersChangedOnly : clusters}
        sortColumns={[0, 1]}
      />
    </div>
  );
};

export default ReviewClusters;
