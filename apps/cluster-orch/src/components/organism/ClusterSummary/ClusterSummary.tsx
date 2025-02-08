/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { ecm } from "@orch-ui/apis";
import { Flex, SquareSpinner, StatusIcon } from "@orch-ui/components";
import { clusterStatusToIconStatus, SharedStorage } from "@orch-ui/utils";
import { Icon, MessageBanner } from "@spark-design/react";
import { MessageBannerAlertState } from "@spark-design/tokens";
import { Link } from "react-router-dom";
import "./ClusterSummary.scss";

export const dataCy = "clusterSummary";
export interface ClusterSummaryProps {
  uuid: string;
  site?: string;
}

const ClusterSummary = ({ uuid, site }: ClusterSummaryProps) => {
  const projectName = SharedStorage.project?.name ?? "";
  const { data, isFetching, isSuccess } =
    ecm.useGetV1ProjectsByProjectNameClustersAndNodeUuidClusterdetailQuery(
      {
        projectName,
        nodeUuid: uuid,
      },
      {
        skip: !projectName,
      },
    );

  const cy = { "data-cy": dataCy };

  return isFetching ? (
    <SquareSpinner />
  ) : data && isSuccess ? (
    <div {...cy} className="cluster-summary">
      <Flex cols={[3, 7]}>
        <b>Cluster Name</b>
        <div data-cy="name">{data.name}</div>
        <b>Status</b>
        <div data-cy="status">
          <>
            {data.status && (
              <StatusIcon
                status={clusterStatusToIconStatus(data.status)}
                text={data.status}
              />
            )}
          </>
        </div>
        <b>Total Hosts</b>
        <div data-cy="hosts">{data.nodes?.nodeInfoList?.length ?? 0}</div>
        <b>Site</b>
        <div data-cy="site">{site}</div>
        <b>Action</b>
        <div>
          <Link data-cy="link" to={`/infrastructure/cluster/${data.name}`}>
            <Icon icon="clipboard-forward" /> View Cluster Details
          </Link>
        </div>
      </Flex>
    </div>
  ) : (
    <MessageBanner
      messageTitle={undefined}
      messageBody="Error while retrieving cluster. Check logs for more details"
      variant={MessageBannerAlertState.Error}
    />
  );
};

export default ClusterSummary;
