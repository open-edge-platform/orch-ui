/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { ecm, eim } from "@orch-ui/apis";
import {
  AggregatedStatuses,
  AggregatedStatusesMap,
  ApiError,
  BreadcrumbPiece,
  CardBox,
  CardContainer,
  ConfirmationDialog,
  DetailedStatuses,
  Empty,
  FieldLabels,
  Flex,
  MetadataDisplay,
  Popup,
  PopupOption,
  setActiveNavItem,
  setBreadcrumb as setClusterBreadcrumb,
  TableColumn,
  TypedMetadata,
} from "@orch-ui/components";
import {
  API_INTERVAL,
  checkAuthAndRole,
  clusterToStatuses,
  convertDataUnitsToBytes,
  copyToClipboard,
  downloadFile,
  getDefinedFloatValue,
  parseError,
  Role,
  SharedStorage,
} from "@orch-ui/utils";
import {
  Heading,
  Icon,
  Item,
  Tabs,
  Text,
  Toast,
  ToastProps,
} from "@spark-design/react";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { clustersMenuItem, homeBreadcrumb } from "../../../routes/const";
import { useAppDispatch } from "../../../store/hooks";
import TableLoader from "../../atom/TableLoader";

import {
  ButtonVariant,
  ToastPosition,
  ToastState,
  ToastVisibility,
} from "@spark-design/tokens";
import { NodeTableColumns } from "../../../utils/NodeTableColumns";
import ClusterPerformanceCard from "../../atom/ClusterPerformanceCard/ClusterPerformanceCard";
import DeploymentInstancesTable from "../../organism/clusterDetail/DeploymentInstancesTable/DeploymentInstancesTable";
import ClusterNodesTable from "../../organism/ClusterNodesTable/ClusterNodesTable";
import "./ClusterDetail.scss";

type urlParams = {
  clusterName: string;
};

export const dataCy = "clusterDetail";

export interface ClusterDetailProps {
  hasHeader?: boolean;
  name?: string;
  /** This is required for cluster plugin to to set breadcrumb from fleet-management UI */
  setBreadcrumb?: (breadcrumbs: BreadcrumbPiece[]) => void;
}

// these columns define the nodes in the cluster.
// They are used to render information about the node
const nodesTableColumns: TableColumn<ecm.NodeInfo>[] = [
  NodeTableColumns.name,
  NodeTableColumns.status,
  NodeTableColumns.serial,
  NodeTableColumns.role,
  NodeTableColumns.actions((node) => (
    <Link to={`/infrastructure/host/${node.id}`}>
      <Icon icon="clipboard-forward" /> View Host Details
    </Link>
  )),
];

function ClusterDetail({
  hasHeader = true,
  name,
  setBreadcrumb,
}: ClusterDetailProps) {
  const cy = { "data-cy": dataCy },
    cssSelector = "cluster-detail";
  const { clusterName } = useParams<urlParams>();
  const [clusterFirstHostId, setClusterFirstHostId] = useState<string>();
  const [siteId, setSiteId] = useState<string>();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // TODO: create global shared/store/notification.ts
  const [toast, setToast] = useState<ToastProps>({
    duration: 3 * 1000,
    canClose: true,
    position: ToastPosition.TopRight,
  });
  const hideFeedback = () => {
    setToast((props) => {
      props.visibility = ToastVisibility.Hide;
      return props;
    });
  };

  // Get Cluster Details
  const {
    data: clusterDetail,
    isSuccess,
    isLoading,
    isError,
    error,
  } = ecm.useGetV1ProjectsByProjectNameClustersAndClusterNameQuery(
    {
      projectName: SharedStorage.project?.name ?? "",
      clusterName: (hasHeader ? clusterName : name) ?? "",
    },
    {
      skip: (!name && !clusterName) || !SharedStorage.project?.name,
      pollingInterval: API_INTERVAL,
    },
  );
  // Get Kubeconfig
  const { data: kubeconfig, isLoading: isKubeconfigLoading } =
    ecm.useGetV1ProjectsByProjectNameClustersAndClusterIdKubeconfigsQuery(
      {
        projectName: SharedStorage.project?.name ?? "",
        clusterId: clusterDetail?.clusterID ?? "",
      },
      { skip: !clusterDetail || !SharedStorage.project?.name },
    );

  const [deleteCluster] =
    ecm.useDeleteV1ProjectsByProjectNameClustersAndClusterNameMutation();

  const clusterStatusFields: FieldLabels<ecm.ClusterDetailInfo> = {
    appAgentStatus: { label: "Application Agent" },
    lifecyclePhase: { label: "Lifecycle Phase" },
    nodeHealth: { label: "Node Health" },
    providerStatus: { label: "Readiness" },
    resourceStatus: { label: "Resources" },
  };

  useEffect(() => {
    // Set the first Host GUID to get the `SITE` details on rerender
    if (
      isSuccess &&
      clusterDetail.nodes &&
      clusterDetail.nodes.nodeInfoList &&
      clusterDetail.nodes.nodeInfoList.length > 0
    ) {
      setClusterFirstHostId(clusterDetail.nodes.nodeInfoList[0].id);
    }
  }, [clusterDetail]);
  const { data: firstClusterHost, isSuccess: isFirstHostSuccess } =
    eim.useGetV1ProjectsByProjectNameComputeHostsAndHostIdQuery(
      {
        projectName: SharedStorage.project?.name ?? "",
        hostId: clusterFirstHostId ?? "",
      },
      {
        skip: !isSuccess || !clusterFirstHostId || !SharedStorage.project?.name,
      },
    );

  useEffect(() => {
    // Set `SITE` details
    if (isFirstHostSuccess && firstClusterHost.site) {
      setSiteId(firstClusterHost.site.resourceId);
    }
  }, [firstClusterHost]);

  const { data: siteData } =
    eim.useGetV1ProjectsByProjectNameRegionsAndRegionIdSitesSiteIdQuery(
      {
        projectName: SharedStorage.project?.name ?? "",
        regionId: "*", // Cluster or associated host have no region information
        siteId: siteId ?? "",
      },
      { skip: !siteId || !SharedStorage.project?.name },
    ); // Host's Site details
  // Breadcrumb settings
  const breadcrumb = useMemo(
    () => [
      homeBreadcrumb,
      {
        text: "Clusters",
        link: "../../clusters",
      },
      {
        text: `${clusterDetail?.name}`,
        link: `../../cluster/${clusterName}`,
      },
    ],
    [clusterDetail],
  );

  useEffect(() => {
    if (hasHeader) {
      // use cluster-native breadcrumb unless specified
      if (setBreadcrumb) {
        setBreadcrumb(breadcrumb);
      } else {
        dispatch(setClusterBreadcrumb(breadcrumb));
      }
      dispatch(setActiveNavItem(clustersMenuItem));
    }
  }, [breadcrumb]);

  // we only display metadata that are actually associated with the cluster and are editable by the user
  // If the metadata is also present in site.metadata we mark it as a Site metadata
  // if the metadata is also present in site.inheritedMetadata we mark it as a Region metadata
  const combinedMetadata = useMemo(() => {
    const metadata: TypedMetadata[] =
      clusterDetail &&
      clusterDetail.clusterLabels &&
      clusterDetail.userDefinedLabelKeys
        ? Object.entries(clusterDetail.clusterLabels)
            .filter((kv) => {
              const userDefinedLabelKeys =
                clusterDetail.userDefinedLabelKeys ?? [];
              if (userDefinedLabelKeys.some((k) => k === kv[0])) {
                return kv;
              }
            })
            .map((kv) => ({
              key: kv[0],
              value: kv[1],
            }))
        : [];

    return metadata.map((md) => {
      if (
        siteData?.metadata?.find(
          (smd) => smd.key === md.key && smd.value === md.value,
        )
      ) {
        md.type = "site";
      }
      if (
        siteData?.inheritedMetadata?.location?.find(
          (rmd) => rmd.key === md.key && rmd.value === md.value,
        )
      ) {
        md.type = "region";
      }
      return md;
    });
  }, [
    clusterDetail?.userDefinedLabelKeys,
    clusterDetail?.clusterLabels,
    siteData,
  ]);

  if (isLoading) {
    return <TableLoader />;
  } else if (isError || !clusterDetail) {
    return <ApiError error={error} />;
  }

  const popupOptions: PopupOption[] = [
    {
      displayText: "Edit",
      disable: !checkAuthAndRole([Role.CLUSTERS_WRITE]),
      onSelect: () => {
        navigate(`../cluster/${clusterDetail.name}/edit`);
      },
    },
    {
      displayText: "Delete",
      disable: !checkAuthAndRole([Role.CLUSTERS_WRITE]),
      onSelect: async () => {
        setIsDeleteModalOpen(true);
      },
    },
    {
      displayText: "Download Kubeconfig",
      disable: isKubeconfigLoading,
      onSelect: () => {
        downloadFile(kubeconfig?.kubeconfig ?? "");
      },
    },
    {
      displayText: "Copy Kubeconfig",
      disable: isKubeconfigLoading,
      onSelect: () => {
        copyToClipboard(
          kubeconfig?.kubeconfig ?? "",
          () =>
            setToast((p) => ({
              ...p,
              state: ToastState.Success,
              message: "Copied Kubeconfig to clipboard successfully",
              visibility: ToastVisibility.Show,
            })),
          () =>
            setToast((p) => ({
              ...p,
              state: ToastState.Danger,
              message: "Failed to copy Kubeconfig to clipboard",
              visibility: ToastVisibility.Show,
            })),
        );
      },
    },
  ];
  const tabItems = [
    {
      id: 1,
      title: "Hosts",
    },
    {
      id: 2,
      title: "Performance",
    },
    {
      id: 3,
      title: "Cluster Extension",
    },
  ];

  // Get Cluster Performance chart data
  let cpuAvail = 0,
    memAvail = 0,
    cpuCapacity = 0,
    memCapacity = 0;

  if (clusterDetail.resources) {
    // Available Capacity
    if (clusterDetail.resources.availability) {
      cpuAvail = getDefinedFloatValue(clusterDetail.resources.availability.cpu);
      memAvail = convertDataUnitsToBytes(
        clusterDetail.resources.availability.memory,
      );
    }
    // Maximum Capacity
    if (clusterDetail.resources.capacity) {
      cpuCapacity = getDefinedFloatValue(clusterDetail.resources.capacity.cpu);
      memCapacity = convertDataUnitsToBytes(
        clusterDetail.resources.capacity.memory,
      );
    }
  }

  const deleteClusterFn = async (clusterName: string) => {
    if (!clusterName) {
      // NOTE we know this never happens,
      return;
    }
    deleteCluster({
      projectName: SharedStorage.project?.name ?? "",
      clusterName,
    })
      .unwrap()
      .then(() => {
        setToast((p) => ({
          ...p,
          message: `Cluster ${clusterName} deleted`,
          state: ToastState.Success,
          visibility: ToastVisibility.Show,
        }));
        navigate("/infrastructure/clusters");
      })
      .catch((e) => {
        setToast((p) => ({
          ...p,
          message: `Failed to delete cluster ${clusterName}: ${
            parseError(e).data
          }`,
          state: ToastState.Danger,
          visibility: ToastVisibility.Show,
        }));
      });
    setIsDeleteModalOpen(false);
  };

  return (
    <div className={cssSelector} {...cy}>
      <header>
        {hasHeader && (
          <div className={`${cssSelector}-row`}>
            <Heading
              data-cy={`${dataCy}Heading`}
              className={`${cssSelector}-heading`}
              semanticLevel={1}
              size="l"
            >
              {clusterDetail.name}
            </Heading>
            <div className={`${cssSelector}-action-button`}>
              <Popup
                dataCy={`${dataCy}Popup`}
                options={popupOptions}
                jsx={
                  <button
                    className="spark-button spark-button-action spark-button-size-l spark-focus-visible spark-focus-visible-self spark-focus-visible-snap"
                    type="button"
                  >
                    <span className="spark-button-content">
                      Cluster Action{" "}
                      <Icon className="margin-1" icon="chevron-down" />
                    </span>
                  </button>
                }
              />

              {isDeleteModalOpen && (
                <ConfirmationDialog
                  title="Delete Cluster"
                  subTitle={`This action will delete ${clusterDetail.name} and return its hosts to unassigned state.`}
                  content="Are you sure you want to delete the cluster?"
                  buttonPlacement="left-reverse"
                  isOpen={true}
                  confirmCb={() =>
                    clusterDetail.name && deleteClusterFn(clusterDetail.name)
                  }
                  confirmBtnText="Delete"
                  confirmBtnVariant={ButtonVariant.Alert}
                  cancelCb={() => setIsDeleteModalOpen(false)}
                />
              )}
            </div>
          </div>
        )}

        {!hasHeader && (
          <>
            <div className={`${cssSelector}-row`}>
              <Heading semanticLevel={6} className={`${cssSelector}-heading`}>
                Cluster Details
              </Heading>
            </div>
            <Flex cols={[12, 12]} colsMd={[6, 6]} colsLg={[6, 6]}>
              <div>
                <table
                  className={`${cssSelector}__general-info__table`}
                  data-cy={`${dataCy}ClusterNameTable`}
                >
                  <tr>
                    <td>Cluster Name</td>
                    <td>{clusterDetail.name || "-"}</td>
                  </tr>
                </table>
              </div>
            </Flex>
          </>
        )}

        <div data-cy={`${dataCy}Status`}>
          <AggregatedStatuses<AggregatedStatusesMap>
            statuses={clusterToStatuses(clusterDetail)}
            defaultStatusName="lifecyclePhase"
          />
        </div>
      </header>

      <Flex
        className={`${cssSelector}__general-info`}
        cols={[12, 12]}
        colsMd={[6, 6]}
        colsLg={[6, 6]}
      >
        <div>
          <table
            className={`${cssSelector}__general-info__table`}
            data-cy={`${dataCy}GeneralInfoTable`}
          >
            <tr>
              <td>Cluster ID</td>
              <td>{clusterDetail.clusterID || "-"}</td>
            </tr>
            <tr>
              <td>Kubernetes version</td>
              <td>{clusterDetail.kubernetesVersion || "-"}</td>
            </tr>
            <tr>
              <td>Region</td>
              <td>{siteData?.region?.name || "-"}</td>
            </tr>
            <tr>
              <td>Site</td>
              <td>{siteData?.name || siteData?.siteID || "-"}</td>
            </tr>
          </table>
        </div>
        <CardContainer
          dataCy={`${dataCy}DeploymentMetadata`}
          className="deployment-heading"
          cardTitle="Deployment Configuration"
          titleSemanticLevel={6}
        >
          {combinedMetadata.length === 0 && (
            <CardBox>
              <Empty icon="database" subTitle="Metadata are not defined" />
            </CardBox>
          )}
          {combinedMetadata.length > 0 && (
            <MetadataDisplay metadata={combinedMetadata} />
          )}
        </CardContainer>
      </Flex>

      {hasHeader && (
        <Tabs
          data-cy={`${dataCy}Tabs`}
          className={`${cssSelector}__tabs`}
          items={tabItems}
          isCloseable={false}
        >
          <Item title={<Text>Status Details</Text>}>
            <DetailedStatuses
              data={clusterToStatuses(clusterDetail)}
              statusFields={clusterStatusFields}
            />
          </Item>
          <Item title={<Text>Hosts</Text>}>
            <ClusterNodesTable
              nodes={clusterDetail.nodes?.nodeInfoList ?? []}
              columns={nodesTableColumns}
            />
          </Item>
          <Item title={<Text>Performance</Text>}>
            <Flex
              className="perf-charts-container"
              cols={[12, 12, 12]}
              colsLg={[3, 3, 3]}
            >
              <ClusterPerformanceCard
                rootCy="cpuChart"
                title="CPU"
                // CPU performance refers to CPU usage
                count={cpuCapacity - cpuAvail}
                max={cpuCapacity}
              />
              <ClusterPerformanceCard
                rootCy="memoryChart"
                title="Memory"
                // Memory performance refers to Memory usage
                count={memCapacity - memAvail}
                max={memCapacity}
              />
              <div>
                {/* This div is required for the third column in Flex*/}
              </div>
            </Flex>
          </Item>
          <Item title={<Text>Deployment Instances</Text>}>
            <DeploymentInstancesTable clusterId={clusterDetail.clusterID} />
          </Item>
        </Tabs>
      )}

      {/* TODO: create global shared/store/notification.ts */}
      <Toast
        {...toast}
        onHide={hideFeedback}
        style={{ position: "absolute", top: "-3rem" }}
      />
    </div>
  );
}

export default ClusterDetail;
