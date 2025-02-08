/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { adm } from "@orch-ui/apis";
import {
  ApiError,
  columnApiNameToDisplayName,
  columnDisplayNameToApiName,
  ConfirmationDialog,
  Empty,
  Popup,
  PopupOption,
  Ribbon,
  SortDirection,
  StatusIcon,
  Table,
  TableColumn,
  TableLoader,
} from "@orch-ui/components";
import {
  admStatusToText,
  admStatusToUIStatus,
  API_INTERVAL,
  Direction,
  getFilter,
  getOrder,
  Operator,
  parseError,
  SharedStorage,
} from "@orch-ui/utils";
import { Button, Icon, Text, ToastProps, Tooltip } from "@spark-design/react";
import {
  ButtonSize,
  ButtonVariant,
  TextSize,
  ToastPosition,
  ToastState,
  ToastVisibility,
} from "@spark-design/tokens";
import { useCallback, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../../../../store/hooks";
import { setProps } from "../../../../store/reducers/toast";
import DeploymentUpgradeAvailabilityStatus from "../../../atoms/DeploymentUpgradeAvailabilityStatus/DeploymentUpgradeAvailabilityStatus";
import DeploymentUpgradeModal from "../DeploymentUpgradeModal/DeploymentUpgradeModal";
import "./DeploymentsTable.scss";

type DeploymentColumns =
  | "Name"
  | "Status"
  | "Running Instances"
  | "Package name"
  | "Package version"
  | "Actions";

interface DeploymentsTableProps {
  hasPermission?: boolean;
  hideColumns?: DeploymentColumns[];
  onActionPress?: (value: boolean) => void;
  poll?: boolean;
}

export const DeploymentsTable = ({
  hasPermission = true,
  hideColumns,
  onActionPress,
  poll,
}: DeploymentsTableProps) => {
  const toastProps: ToastProps = {
    state: ToastState.Success,
    visibility: ToastVisibility.Hide,
    duration: 3000,
    position: ToastPosition.TopRight,
  };

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  // Component State
  const [popupOpen, isPopupOpen] = useState<boolean>(false);
  const [upgradeState, setUpgradeState] = useState<{
    isModalOpen: boolean;
    // This what is passed to upgrade on re-render
    deployment?: adm.DeploymentRead;
  }>({
    isModalOpen: false,
  });
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] =
    useState<boolean>(false);
  const [deploymentToDelete, setDeploymentToDelete] =
    useState<adm.DeploymentRead | null>(null);

  // Table Configuration
  /** Popup options that are supported within each row action */
  const getPopupOptions = useCallback(
    (deployment: adm.DeploymentRead, disable?: boolean): PopupOption[] => [
      {
        displayText: "Upgrade",
        disable: disable,
        onSelect: () => {
          setUpgradeState({
            deployment: deployment,
            isModalOpen: true,
          });
        },
      },
      {
        displayText: "Edit",
        disable: disable,
        onSelect: () =>
          navigate(`/applications/deployment/${deployment.deployId}/edit`),
      },
      {
        displayText: "Delete",
        disable: disable,
        onSelect: () => {
          setDeploymentToDelete(deployment);
          setDeleteConfirmationOpen(true);
        },
      },
    ],
    [],
  );
  /** Columns that are supported by the deployments table */
  const columns: TableColumn<adm.DeploymentRead, DeploymentColumns>[] = [
    {
      Header: "Name",
      apiName: "name",
      accessor: (item) => item.displayName ?? item.name,
      Cell: (
        table: { row: { original: adm.DeploymentRead } }, //'custom value: ' + value[0]
      ) => (
        <Link to={`/applications/deployment/${table.row.original.deployId}`}>
          {table.row.original.displayName ?? table.row.original.name}
        </Link>
      ),
    },
    {
      Header: "Status",
      apiName: "status",
      accessor: (row) => admStatusToText(row.status),
      Cell: (d) => (
        <StatusIcon
          status={admStatusToUIStatus(d.row.original.status)}
          text={admStatusToText(d.row.original.status)}
        />
      ),
    },
    {
      Header: "Running Instances",
      accessor: (item) => admStatusToText(item.status),
      Cell: (table: {
        row: { original: adm.DeploymentRead };
        cell: { value: string };
      }) => {
        const count = table.row.original.status?.summary
          ? {
              n: table.row.original.status.summary?.running ?? 0,
              of: table.row.original.status.summary?.total ?? 0,
            }
          : undefined;
        return (
          <Text size={TextSize.Medium}>
            {count?.n}/{count?.of}
          </Text>
        );
      },
    },
    {
      Header: "Package name",
      apiName: "appName",
      accessor: (item) => item.appName,
    },
    {
      Header: "Package version",
      apiName: "appVersion",
      accessor: (item) => item.appVersion,
      Cell: (d) => (
        <>
          {d.row.original.appVersion}{" "}
          <DeploymentUpgradeAvailabilityStatus
            currentCompositeAppName={d.row.original.appName}
            currentVersion={d.row.original.appVersion}
          />
        </>
      ),
    },
  ];

  columns.push({
    Header: "Actions",
    textAlign: "center",
    padding: "0",
    accessor: (deployment) => (
      <Popup
        onToggle={isPopupOpen}
        options={getPopupOptions(deployment, !hasPermission)}
        jsx={<Icon icon="ellipsis-v" />}
      />
    ),
  });

  // API configuration
  const sortColumn =
    columnApiNameToDisplayName(columns, searchParams.get("column")) ?? "Name";
  const sortDirection = (searchParams.get("direction") as Direction) || "asc";
  const pageSize = parseInt(searchParams.get("pageSize") ?? "10");
  const offset = parseInt(searchParams.get("offset") ?? "0");
  const searchTerm = searchParams.get("searchTerm") ?? undefined;
  const searchFilter = getFilter<adm.DeploymentRead>(
    searchParams.get("searchTerm") ?? "",
    ["name", "displayName", "appName", "appVersion"],
    Operator.OR,
  );
  const orderBy =
    getOrder(searchParams.get("column"), sortDirection) ?? "name asc";
  const { data, isSuccess, isLoading, isError, error } =
    adm.useDeploymentServiceListDeploymentsQuery(
      {
        offset,
        pageSize,
        orderBy,
        filter: searchFilter,
        projectName: SharedStorage.project?.name ?? "",
      },
      {
        ...(poll && !popupOpen ? { pollingInterval: API_INTERVAL } : {}),
        skip:
          !SharedStorage.project?.name ||
          upgradeState.isModalOpen ||
          deleteConfirmationOpen,
      },
    );

  const [deleteDeployment] = adm.useDeploymentServiceDeleteDeploymentMutation();
  const deleteHostFn = async (deplId: string) => {
    try {
      await deleteDeployment({
        projectName: SharedStorage.project?.name ?? "",
        deplId: deplId,
      }).unwrap();
      dispatch(
        setProps({
          ...toastProps,
          state: ToastState.Success,
          message: "Deployment Successfully removed",
          visibility: ToastVisibility.Show,
        }),
      );
      navigate("/applications/deployments");
    } catch (e) {
      const errorObj = parseError(e);

      dispatch(
        setProps({
          ...toastProps,
          state: ToastState.Danger,
          message: errorObj.data,
          visibility: ToastVisibility.Show,
        }),
      );
    }
    setDeleteConfirmationOpen(false);
  };

  const filteredColumns = hideColumns
    ? columns.filter((column) => !hideColumns.includes(column.Header))
    : columns;

  /** Return true if deployments list is empty after a successful api fetch */
  const isEmpty = () =>
    isSuccess && (!data.deployments || data.deployments.length === 0);

  /** Table or Empty Component */
  let tableContent;
  /** An action button on right-side the search */
  let setupDeploymentRibbonButton = (
    <Button
      data-cy="addDeploymentButton"
      isDisabled={!hasPermission}
      size={ButtonSize.Large}
      onPress={() => {
        if (onActionPress) {
          onActionPress(true);
        }
        navigate("../deployments/setup-deployment");
      }}
    >
      Setup a Deployment
    </Button>
  );
  if (!hasPermission) {
    setupDeploymentRibbonButton = (
      <Tooltip
        icon={<Icon icon="lock" />}
        content="The users with 'View Only' access can mostly view the data and do few of the Add/Edit operations."
        placement="left"
      >
        {setupDeploymentRibbonButton}
      </Tooltip>
    );
  }
  const onDeploymentTableSearch = (searchTerm: string) => {
    setSearchParams((prev) => {
      prev.set("direction", "asc");
      prev.set("offset", "0");
      if (searchTerm) prev.set("searchTerm", searchTerm.trim());
      else prev.delete("searchTerm");
      return prev;
    });
  };

  if (isError) return <ApiError error={error} />;
  else if (isLoading) return <TableLoader />;
  else if (!data || isEmpty()) {
    tableContent = (
      <>
        <Ribbon
          showSearch
          onSearchChange={onDeploymentTableSearch}
          defaultValue={searchTerm}
        />
        <Empty
          dataCy="empty"
          icon="cube-detached"
          title="There are no Deployments currently available."
          subTitle="To deploy Applications, select Setup a Deployment."
          actions={[
            {
              name: "Setup a Deployment",
              action: () => navigate("../deployments/setup-deployment"),
              disable: !hasPermission,
            },
          ]}
        />
      </>
    );
  } else if (isSuccess && data.deployments && data.deployments.length > 0) {
    tableContent = (
      <div data-cy="deploymentsTableTableContent" className="deployments-table">
        <Table
          key="deployments-table"
          isLoading={isLoading}
          // Table data
          columns={filteredColumns}
          data={data.deployments}
          // Sorting
          sortColumns={[0, 1, 3, 4]}
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
          // Pagination
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
          // Searching
          canSearch
          searchTerm={searchTerm}
          onSearch={onDeploymentTableSearch}
          actionsJsx={setupDeploymentRibbonButton}
          // Initial state
          initialState={{
            pageSize,
            pageIndex: Math.floor(offset / pageSize),
          }}
          initialSort={{
            column: sortColumn,
            direction: sortDirection,
          }}
        />
      </div>
    );
  }

  return (
    <div className="deployments-table" data-cy="deploymentsTable">
      {upgradeState.deployment && (
        <DeploymentUpgradeModal
          isOpen={upgradeState.isModalOpen}
          data-cy="upgradeDeploymentModal"
          deployment={upgradeState.deployment}
          setIsOpen={(isModalOpen: boolean) => {
            setUpgradeState({ ...upgradeState, isModalOpen });
          }}
        />
      )}
      {deleteConfirmationOpen && (
        <ConfirmationDialog
          content={`Are you sure you want to delete Deployment "${
            deploymentToDelete?.displayName ?? deploymentToDelete?.name ?? ""
          }"?`}
          isOpen={true}
          confirmCb={() => deleteHostFn(deploymentToDelete?.deployId ?? "")}
          confirmBtnText="Delete"
          confirmBtnVariant={ButtonVariant.Alert}
          cancelCb={() => setDeleteConfirmationOpen(false)}
        />
      )}
      {tableContent}
    </div>
  );
};

export default DeploymentsTable;
