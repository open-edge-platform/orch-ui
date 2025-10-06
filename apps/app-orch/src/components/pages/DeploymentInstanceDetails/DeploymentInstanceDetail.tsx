/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { adm, cm } from "@orch-ui/apis";
import {
  ApiError,
  Empty,
  setActiveNavItem,
  setBreadcrumb,
  SquareSpinner,
  Status,
  StatusIcon,
  TypedMetadata,
} from "@orch-ui/components";
import {
  API_INTERVAL,
  checkAuthAndRole,
  copyToClipboard,
  downloadFile,
  getFilter,
  Operator,
  Role,
  SharedStorage,
} from "@orch-ui/utils";
import { ProgressLoader, ToastProps } from "@spark-design/react";
import {
  ToastPosition,
  ToastState,
  ToastVisibility,
} from "@spark-design/tokens";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  deploymentBreadcrumb,
  deploymentsNavItem,
  homeBreadcrumb,
} from "../../../routes/const";
import { useAppDispatch } from "../../../store/hooks";
import { setProps } from "../../../store/reducers/toast";
import { printStatus } from "../../../utils/global";
import ApplicationDetails from "../../organisms/deployments/ApplicationDetails/ApplicationDetails";
import DeploymentDetailsHeader from "../../organisms/deployments/DeploymentDetailsHeader/DeploymentDetailsHeader";
import DeploymentInstanceClusterStatus from "../../organisms/deployments/DeploymentInstanceClusterStatus/DeploymentInstanceClusterStatus";
import "./DeploymentInstanceDetails.scss";

const {
  useDeploymentServiceGetDeploymentQuery,
  useDeploymentServiceListDeploymentClustersQuery,
} = adm;

const DeploymentInstanceDetail = () => {
  const dispatch = useAppDispatch();
  const { deplId, name } = useParams<{
    deplId: string;
    name: string;
  }>();
  const [toastProps] = useState<ToastProps>({
    state: ToastState.Success,
    visibility: ToastVisibility.Hide,
    duration: 3000,
    position: ToastPosition.TopRight,
  });

  const { data: deployment, isLoading: isDeploymentLoading } =
    useDeploymentServiceGetDeploymentQuery(
      {
        deplId: deplId!,
        projectName: SharedStorage.project?.name ?? "",
      },
      {
        skip: !SharedStorage.project?.name || !deplId,
        pollingInterval: API_INTERVAL,
      },
    );

  const { data: kubeconfig, isLoading: isKubeconfigLoading } =
    cm.useGetV2ProjectsByProjectNameClustersAndNameKubeconfigsQuery(
      {
        projectName: SharedStorage.project?.name ?? "",
        name: name!,
      },
      { skip: !name || !SharedStorage.project?.name },
    );

  const clusterFilter = getFilter<adm.ClusterRead>(
    name ?? "",
    ["id"],
    Operator.OR,
  );
  const {
    data: deploymentClusters,
    isSuccess,
    isError,
    isLoading,
    error,
  } = useDeploymentServiceListDeploymentClustersQuery(
    {
      projectName: SharedStorage.project?.name ?? "",
      deplId: deplId!,
      filter: clusterFilter,
    },
    {
      skip: !deplId || !name || !SharedStorage.project?.name,
    },
  );
  const cluster =
    isSuccess && deploymentClusters && deploymentClusters.clusters
      ? deploymentClusters.clusters.find((c) => c.id === name)
      : null;

  useEffect(() => {
    if (!isDeploymentLoading && deployment) {
      const breadcrumb = [
        homeBreadcrumb,
        deploymentBreadcrumb,
        {
          text:
            deployment.deployment.displayName ??
            deployment.deployment.name ??
            deployment.deployment.deployId!,
          link: `/applications/deployment/${deployment.deployment.deployId}`,
        },
        {
          text: cluster?.id ?? "",
          link: `/applications/deployment/${deployment.deployment.deployId}`,
        },
      ];
      dispatch(setBreadcrumb(breadcrumb));
    }
    dispatch(setActiveNavItem(deploymentsNavItem));
  }, [deployment, isDeploymentLoading]);

  if (isDeploymentLoading) {
    return <ProgressLoader variant="circular" />;
  }

  if (isSuccess && !cluster) {
    return <Empty title="Cluster not found" />;
  } else if (isError) {
    return <ApiError error={error} />;
  } else if (isLoading || !cluster) return <SquareSpinner />;

  let clusterStatusIndicator = Status.Unknown;
  switch (cluster.status?.state?.toLowerCase()) {
    case "ready":
      clusterStatusIndicator = Status.Ready;
      break;
    case "not-ready":
      clusterStatusIndicator = Status.NotReady;
  }

  const clusterStatus = {
    status: (
      <StatusIcon
        status={clusterStatusIndicator}
        text={printStatus(cluster.status?.state ?? "Unknown")}
      />
    ),
    applicationReady: cluster.status?.summary?.running ?? 0,
    applicationTotal: cluster.status?.summary?.total ?? 0,
  };

  const currentCluster = deployment?.deployment.targetClusters?.find(
    (tc) => tc.clusterId === name,
  );

  const metadata: TypedMetadata[] = currentCluster?.labels
    ? Object.entries(currentCluster.labels).map(([key, value]) => ({
        key,
        value,
      }))
    : [];

  return (
    <div
      className="deployment-instance-details"
      data-cy="deploymentInstanceDetails"
    >
      {/* First Row (Main Heading and Button) */}
      <DeploymentDetailsHeader
        headingTitle={cluster.id ?? ""}
        popupOptions={[
          {
            displayText: "Download Kubeconfig",
            disable:
              isKubeconfigLoading || !checkAuthAndRole([Role.CLUSTERS_WRITE]),
            onSelect: () => {
              downloadFile(kubeconfig?.kubeconfig ?? "");
            },
          },
          {
            displayText: "Copy Kubeconfig",
            disable:
              isKubeconfigLoading || !checkAuthAndRole([Role.CLUSTERS_WRITE]),
            onSelect: () => {
              copyToClipboard(
                kubeconfig?.kubeconfig ?? "",
                () =>
                  dispatch(
                    setProps({
                      ...toastProps,
                      state: ToastState.Success,
                      message: "Copied Kubeconfig to clipboard successfully",
                      visibility: ToastVisibility.Show,
                    }),
                  ),
                () =>
                  dispatch(
                    setProps({
                      ...toastProps,
                      state: ToastState.Danger,
                      message: "Failed to copy Kubeconfig to clipboard",
                      visibility: ToastVisibility.Show,
                    }),
                  ),
              );
            },
          },
        ]}
      />
      {/* Second Row (Status) */}
      <div className="deployment-instance-details-row">
        <DeploymentInstanceClusterStatus
          clusterStatus={clusterStatus}
          clusterMetaDataPairs={metadata}
        />
      </div>
      {cluster.apps &&
        cluster.apps
          .slice()
          .sort((a, b) => (a.name && b.name && a.name > b.name ? 1 : -1))
          .map((app, i) => (
            <div className="deployment-instance-details-row" key={i}>
              {cluster.id && (
                <ApplicationDetails clusterId={cluster.id} app={app} />
              )}
            </div>
          ))}
    </div>
  );
};

export default DeploymentInstanceDetail;
