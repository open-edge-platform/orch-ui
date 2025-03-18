/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { adm } from "@orch-ui/apis";
import { MessageBannerAlertState } from "@orch-ui/components";
import { LpInternalError, parseError, SharedStorage } from "@orch-ui/utils";
import { MessageBanner } from "@spark-design/react";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../store/hooks";
import { AppDispatch } from "../../../store/store";
import {
  getHostsList as gHL,
  getHostStatus as gHS,
  IHostStatusCounter,
} from "../../../utils/helpers";
import StatusCounter from "../StatusCounter/StatusCounter";

const { useDeploymentServiceListDeploymentClustersQuery } = adm;

// TODO support a property to display both running and not running totals
interface DeploymentStatusCounterProps {
  deployment: adm.DeploymentRead;
  showAllStates?: boolean;
  // the following props are intended to simplify testing,
  // avoid using
  getHostsList?: (
    dispatch: AppDispatch,
    clusterNames?: string[],
  ) => Promise<string[]>;
  getHostStatus?: (
    dispatch: AppDispatch,
    uniqueHosts: string[],
  ) => Promise<IHostStatusCounter>;
}

const dataCy = "hostStatusCounter";

/**
 * Renders a donut chart reporting the number of hsots
 * that are running compared to the ones that have error
 * If `detailed=true` it lists both
 */
const HostStatusCounter = ({
  deployment,
  showAllStates = false,
  getHostsList = gHL,
  getHostStatus = gHS,
}: DeploymentStatusCounterProps) => {
  const projectName = SharedStorage.project?.name ?? "";
  const cy = { "data-cy": dataCy };

  const dispatch = useAppDispatch();

  const [status, setStatus] = useState<IHostStatusCounter>({
    error: 0,
    notRunning: 0,
    total: 0,
    running: 0,
  });
  const [error, setError] = useState<LpInternalError | undefined>();

  const { data: deploymentClusters, isSuccess } =
    useDeploymentServiceListDeploymentClustersQuery(
      {
        deplId: deployment.deployId ?? "",
        projectName,
      },
      { skip: !projectName },
    );

  useEffect(() => {
    if (isSuccess && deploymentClusters && deploymentClusters.clusters) {
      getHostsList(
        dispatch,
        deploymentClusters.clusters.reduce(
          (list, c) => (c.name ? [...list, c.name] : list),
          [],
        ),
      )
        .then((hostGuids) => getHostStatus(dispatch, hostGuids))
        .then((status) => {
          setStatus(status);
        })
        .catch((e) => setError(parseError(e)));
    }
  }, [deployment, deploymentClusters, isSuccess]);

  if (error) {
    return (
      <div {...cy}>
        <div data-cy="error">
          <MessageBanner
            variant={MessageBannerAlertState.Error}
            messageTitle={""}
            messageBody={`[Status: ${error.status}] ${error.data}`}
            showIcon
            outlined
          />
        </div>
      </div>
    );
  }

  return (
    <div {...cy}>
      <StatusCounter
        summary={{
          down: status.notRunning + status.error,
          running: status.running,
          total: status.total,
        }}
        showAllStates={showAllStates}
        showAllStatesTitle="Host Status"
        noTotalMessage="No associated hosts"
      />
    </div>
  );
};

export default HostStatusCounter;
