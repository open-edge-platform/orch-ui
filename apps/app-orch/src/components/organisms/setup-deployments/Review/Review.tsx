/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { catalog, cm } from "@orch-ui/apis";
import {
  AggregatedStatuses,
  AggregatedStatusesMap,
  aggregateStatuses,
  Flex,
  MetadataPair,
  Table,
  TableColumn,
} from "@orch-ui/components";
import { clusterToStatuses } from "@orch-ui/utils";
import { Text } from "@spark-design/react";
import { TextSize } from "@spark-design/tokens";
import MetadataMessage from "../../../atoms/MetadataMessage/MetadataMessage";
import { DeploymentType } from "../../../pages/SetupDeployment/SetupDeployment";
import "./Review.scss";

export interface ReviewProps {
  selectedPackage: catalog.DeploymentPackage;
  selectedDeploymentName: string;
  selectedProfileName: string;
  type: string;
  selectedMetadata: MetadataPair[];
  selectedClusters?: cm.ClusterInfoRead[];
}

const Review = ({
  selectedPackage,
  selectedDeploymentName,
  selectedProfileName,
  type,
  selectedClusters,
  selectedMetadata,
}: ReviewProps) => {
  const columns: TableColumn<MetadataPair>[] = [
    { Header: "Key", accessor: "key" },
    { Header: "Value", accessor: "value" },
  ];

  const clusterColumns: TableColumn<cm.ClusterInfoRead>[] = [
    {
      Header: "Cluster Name",
      accessor: (item) => item.name,
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

  return (
    <div className="review" data-cy="review">
      <div className="description">
        <Text>Review</Text>
      </div>
      <div className="review__card">
        <Flex cols={[3, 3, 6]}>
          <Text size={TextSize.Large}>Deployment Package</Text>
          <Text data-cy="applicationPackage">{selectedPackage.name}</Text>
          <div />
          <Text size={TextSize.Large}>Deployment Name</Text>
          <Text data-cy="deployment">{selectedDeploymentName}</Text>
          <div />
          <Text size={TextSize.Large}>Profile</Text>
          <Text data-cy="profile">{selectedProfileName}</Text>
          <div />
        </Flex>
      </div>

      {type === DeploymentType.MANUAL ? (
        <Table
          dataCy="clusterReviewList"
          columns={clusterColumns}
          data={selectedClusters}
          sortColumns={[0, 1]}
        />
      ) : (
        <>
          <div className="review__metadata">
            <MetadataMessage />
          </div>
          <Table
            dataCy="reviewTable"
            columns={columns}
            data={selectedMetadata}
          />
        </>
      )}
    </div>
  );
};

export default Review;
