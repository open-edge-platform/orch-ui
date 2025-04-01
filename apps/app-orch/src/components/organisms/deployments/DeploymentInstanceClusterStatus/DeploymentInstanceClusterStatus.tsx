/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */
import {
  Flex,
  MetadataDisplay,
  Status,
  StatusIcon,
  TypedMetadata,
} from "@orch-ui/components";
import { Text } from "@spark-design/react";
import "./DeploymentInstanceClusterStatus.scss";

const dataCy = "deploymentInstanceClusterStatus";

export interface DeploymentClusterStatus {
  status: JSX.Element;
  applicationReady: number;
  applicationTotal: number;
}

export interface DeploymentInstanceClusterStatusProps {
  clusterStatus: DeploymentClusterStatus;
  clusterMetaDataPairs: TypedMetadata[];
}

const DeploymentInstanceClusterStatus = ({
  clusterStatus,
  clusterMetaDataPairs,
}: DeploymentInstanceClusterStatusProps) => {
  const generateApplicationStatus = () => {
    const downCount =
      clusterStatus.applicationTotal - clusterStatus.applicationReady;
    const readyCount = clusterStatus.applicationReady;
    return (
      <>
        <span data-cy="clusterAppDownStatus">
          <StatusIcon status={Status.Error} /> {`${downCount} Down; `}
        </span>
        <span data-cy="clusterAppReadyStatus">
          <StatusIcon status={Status.Ready} /> {`${readyCount} Ready`}
        </span>
      </>
    );
  };

  return (
    <div className="deployment-instance-cluster-status" data-cy={dataCy}>
      <Flex cols={[6, 6]} className="deployment-instance-cluster-status__row">
        <div className="deployment-instance-cluster-status__container">
          <Text className="status-heading">Status</Text>
          <table data-cy="clusterStatusTable" className="cluster-status-table">
            <tr>
              <td>Cluster</td>
              <td data-cy="clusterStatus">{clusterStatus.status}</td>
            </tr>
            <tr>
              <td>Applications</td>
              <td data-cy="clusterApplicationStatus">
                {generateApplicationStatus()}
              </td>
            </tr>
          </table>
        </div>

        <div className="deployment-instance-cluster-status__container">
          <Text className="status-heading">Deployment Configuration</Text>
          <MetadataDisplay metadata={clusterMetaDataPairs} />
        </div>
      </Flex>
    </div>
  );
};

export default DeploymentInstanceClusterStatus;
