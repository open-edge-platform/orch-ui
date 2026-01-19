/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { adm } from "@orch-ui/apis";
import {
  AppOrchShow,
  DashboardStatus,
  MetadataPairs,
} from "@orch-ui/components";
import { API_INTERVAL, SharedStorage } from "@orch-ui/utils";
import "./DashboardDeploymentsStatus.scss";
const { useDeploymentServiceGetDeploymentsStatusQuery } = adm;

const DashboardDeploymentsStatus = ({
  metadata = {
    pairs: [],
  },
}: {
  dataCy?: string;
  metadata?: MetadataPairs;
}) => {
  const { data, isError, error, isLoading, isSuccess } =
    useDeploymentServiceGetDeploymentsStatusQuery(
      {
        projectName: SharedStorage.project?.name ?? "",
        // Add `labels: list_of_metadata(key=value)` only if atleast one metadata exists
        ...(metadata.pairs && metadata.pairs.length > 0
          ? {
              labels: metadata.pairs.map((pair) => {
                return `${pair.key}=${pair.value}`;
              }),
            }
          : {}),
      },
      {
        skip: !SharedStorage.project?.name,
        pollingInterval: API_INTERVAL,
      },
    );

  const deploymentStat = {
    total: data?.total ?? 0,
    running: data?.running ?? 0,
    error: data?.error ?? 0,
  };

  return (
    <div className="deployment-status" data-cy="deploymentsStatus">
      <DashboardStatus
        cardTitle="Deployment Status"
        total={deploymentStat.total}
        running={deploymentStat.running}
        error={deploymentStat.error}
        isSuccess={isSuccess}
        isLoading={isLoading}
        isError={isError}
        apiError={error}
        empty={{
          icon: "three-dots-circle",
          text: "There are no deployments",
        }}
      />
    </div>
  );
};

export default ({ metadata }: { metadata?: MetadataPairs }) => (
  <AppOrchShow>
    <DashboardDeploymentsStatus metadata={metadata} />
  </AppOrchShow>
);
