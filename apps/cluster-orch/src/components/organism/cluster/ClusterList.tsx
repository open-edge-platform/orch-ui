/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { ecm } from "@orch-ui/apis";
import {
  AggregatedStatuses,
  AggregatedStatusesMap,
  aggregateStatuses,
  ApiError,
  columnApiNameToDisplayName,
  columnDisplayNameToApiName,
  ConfirmationDialog,
  Empty,
  Popup,
  PopupOption,
  RbacRibbonButton,
  SortDirection,
  Table,
  TableColumn,
  TableLoader,
} from "@orch-ui/components";
import {
  API_INTERVAL,
  clusterToStatuses,
  copyToClipboard,
  Direction,
  downloadFile,
  getFilter,
  getOrder,
  Operator,
  parseError,
  SharedStorage,
} from "@orch-ui/utils";
import { Icon, Toast, ToastProps } from "@spark-design/react";
import {
  ButtonSize,
  ButtonVariant,
  ToastPosition,
  ToastState,
  ToastVisibility,
} from "@spark-design/tokens";
import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import "./ClusterList.scss";
import ClusterNodesWrapper from "./ClusterNodesWrapper/ClusterNodesWrapper";

interface ClusterListProps {
  hasPermission?: boolean;
}
export default function ClusterList({ hasPermission }: ClusterListProps) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("searchTerm") ?? undefined;
  const [clusterToDelete, setClusterToDelete] = useState<string>();

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

  const [deleteCluster] =
    ecm.useDeleteV1ProjectsByProjectNameClustersAndClusterNameMutation();

  const { data, isLoading, error, isError, isSuccess } =
    ecm.useGetV1ProjectsByProjectNameClustersQuery(
      {
        projectName: SharedStorage.project?.name ?? "",
        filter: getFilter<ecm.ClusterInfoRead>(
          searchParams.get("searchTerm") ?? "",
          ["name", "status", "kubernetesVersion"],
          Operator.OR,
        ),
        orderBy: getOrder(
          searchParams.get("column"),
          searchParams.get("direction") as Direction,
        ),
        pageSize: searchParams.get("pageSize")
          ? parseInt(searchParams.get("pageSize")!)
          : 10,
        offset: searchParams.get("offset")
          ? parseInt(searchParams.get("offset")!)
          : 0,
      },
      {
        selectFromResult: ({ data, error, isLoading, isSuccess, isError }) => ({
          data,
          error,
          isLoading,
          isError,
          isSuccess,
        }),
        pollingInterval: API_INTERVAL,
        skip: !SharedStorage.project?.name,
      },
    );

  const [trigger] =
    ecm.clusterManagerApis.endpoints.getV1ProjectsByProjectNameClustersAndClusterIdKubeconfigs.useLazyQuery();

  const handleKubeconfig = async (
    clusterId: string,
    type: "download" | "copy",
  ) => {
    trigger({
      projectName: SharedStorage.project?.name ?? "",
      clusterId: clusterId,
    })
      .unwrap()
      .then(
        (
          response: ecm.GetV1ProjectsByProjectNameClustersAndClusterIdKubeconfigsApiResponse,
        ) => {
          if (type === "download") {
            downloadFile(response.kubeconfig ?? "");
          } else {
            copyToClipboard(
              response.kubeconfig ?? "",
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
          }
        },
      );
  };

  const getDropdownItems = (cluster: ecm.ClusterInfoRead): PopupOption[] => {
    return [
      {
        displayText: "View Details",
        onSelect: () => {
          navigate(`../cluster/${cluster.name}`);
        },
      },
      {
        displayText: "Edit",
        disable: !hasPermission,
        onSelect: () => {
          navigate(`../cluster/${cluster.name}/edit`);
        },
      },
      {
        displayText: "Delete",
        disable: !hasPermission,
        onSelect: async () => {
          setClusterToDelete(cluster.name);
        },
      },
      {
        displayText: "Download Kubeconfig File",
        onSelect: async () => {
          handleKubeconfig(cluster.clusterID ?? "", "download");
        },
      },
      {
        displayText: "Copy Kubeconfig File",
        onSelect: async () => {
          handleKubeconfig(cluster.clusterID ?? "", "copy");
        },
      },
    ];
  };

  const deleteClusterFn = async (clusterName: string) => {
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
    setClusterToDelete(undefined);
  };

  const columns: TableColumn<ecm.ClusterInfoRead>[] = [
    {
      Header: "Cluster Name",
      accessor: (item) => item.name,
      apiName: "name",
      Cell: (table: { row: { original: ecm.ClusterInfoRead } }) => {
        return (
          <Link to={`../cluster/${table.row.original.name}`}>
            {table.row.original.name}
          </Link>
        );
      },
    },
    {
      Header: "Cluster Status",
      accessor: (item) =>
        aggregateStatuses(clusterToStatuses(item), "lifecyclePhase").message,
      apiName: "status",
      Cell: (table) => {
        return (
          <AggregatedStatuses<AggregatedStatusesMap>
            statuses={clusterToStatuses(table.row.original)}
            defaultStatusName="lifecyclePhase"
          />
        );
      },
    },
    {
      Header: "Host Count",
      accessor: (item) => {
        if (item.nodeQuantity === 1) {
          return `${item.nodeQuantity} Host`;
        } else {
          return `${item.nodeQuantity} Hosts`;
        }
      },
    },
    {
      Header: "Site",
      accessor: (item) => {
        let site = "-";
        item.locationList?.forEach((label) => {
          if (
            label.locationInfo &&
            label.locationType === "LOCATION_TYPE_SITE_NAME"
          ) {
            const newSite = label.locationInfo;
            site = newSite;
          }
        });

        return site;
      },
    },

    {
      Header: "Actions",
      textAlign: "center",
      padding: "0",
      accessor: (cluster) => (
        <>
          <Popup
            dataCy="tableRowOptions"
            options={getDropdownItems(cluster)}
            jsx={<Icon icon="ellipsis-v" />}
          />
          {clusterToDelete == cluster.name && (
            <ConfirmationDialog
              title="Delete Cluster"
              subTitle={`This action will delete ${clusterToDelete} and return its hosts to unassigned state.`}
              content="Are you sure you want to delete the cluster?"
              buttonPlacement="left-reverse"
              isOpen={true}
              confirmCb={() =>
                clusterToDelete && deleteClusterFn(clusterToDelete)
              }
              confirmBtnText="Delete"
              confirmBtnVariant={ButtonVariant.Alert}
              cancelCb={() => setClusterToDelete(undefined)}
            />
          )}
        </>
      ),
    },
  ];

  const sortColumn =
    columnApiNameToDisplayName(columns, searchParams.get("column")) ??
    "Cluster Name";
  const sortDirection = (searchParams.get("direction") ?? "asc") as Direction;
  const pageSize = parseInt(searchParams.get("pageSize") ?? "10");
  const offset = parseInt(searchParams.get("offset") ?? "0");

  const getContent = () => {
    if (isSuccess && data?.clusterInfoList?.length === 0 && !searchTerm) {
      return (
        <Empty
          icon="document-gear"
          title="Create a cluster using one or more configured hosts."
          actions={[
            {
              action: () => navigate("create"),
              name: "Create Cluster",
              disable: !hasPermission,
            },
          ]}
        />
      );
    }

    if (isError) return <ApiError error={error} />;
    if (isLoading || !data) return <TableLoader />;

    return (
      <Table
        columns={columns}
        data={data.clusterInfoList ?? []}
        initialState={{
          pageSize,
          pageIndex: Math.floor(offset / pageSize),
        }}
        sortColumns={[1, 2]}
        initialSort={{
          column: sortColumn,
          direction: sortDirection,
        }}
        onSort={(column: string, direction: SortDirection) => {
          setSearchParams((prev) => {
            if (direction) {
              const apiName = columnDisplayNameToApiName(columns, column);

              if (apiName) {
                prev.set("column", apiName);
                prev.set("direction", direction);
              }
            } else {
              prev.delete("column");
              prev.delete("direction");
            }
            return prev;
          });
        }}
        key="clusters-table"
        subRow={(row) => (
          <ClusterNodesWrapper clusterName={row.original.name ?? ""} />
        )}
        canPaginate
        isServerSidePaginated
        totalOverallRowsCount={data.totalElements}
        onChangePage={(index: number) => {
          setSearchParams((prev) => {
            prev.set("offset", (index * pageSize).toString());
            return prev;
          });
        }}
        onChangePageSize={(pageSize: number) => {
          setSearchParams((prev) => {
            prev.set("pageSize", pageSize.toString());
            return prev;
          });
        }}
        canSearch
        searchTerm={searchTerm}
        onSearch={(searchTerm: string) => {
          setSearchParams((prev) => {
            prev.set("direction", "asc");
            prev.set("offset", "0");
            if (searchTerm) prev.set("searchTerm", searchTerm);
            else prev.delete("searchTerm");
            return prev;
          });
        }}
        actionsJsx={
          <RbacRibbonButton
            name="createCluster"
            size={ButtonSize.Large}
            variant={ButtonVariant.Action}
            text="Create Cluster"
            disabled={!hasPermission}
            onPress={() => {
              navigate("/infrastructure/clusters/create");
            }}
            tooltip={
              hasPermission
                ? ""
                : "The users with 'View Only' access can mostly view the data and do few of the Add/Edit operations."
            }
            tooltipIcon="lock"
          />
        }
      />
    );
  };

  return (
    <div className="cluster-list" data-cy="clusterList">
      {getContent()}
      {/* TODO: create global shared/store/notification.ts */}
      <Toast
        {...toast}
        onHide={hideFeedback}
        style={{ position: "absolute" }}
      />
    </div>
  );
}
