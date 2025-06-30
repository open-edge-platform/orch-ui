/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { appUtilities, catalog, CatalogKinds } from "@orch-ui/apis";
import {
  ApiError,
  columnApiNameToDisplayName,
  columnDisplayNameToApiName,
  ConfirmationDialog,
  Empty,
  Popup,
  PopupOption,
  SortDirection,
  Table,
  TableColumn,
  TableLoader,
  TextTruncate,
} from "@orch-ui/components";
import {
  API_INTERVAL,
  Direction,
  getFilter,
  getOrder,
  Operator,
  parseError,
  rfc3339ToDate,
  SharedStorage,
} from "@orch-ui/utils";
import { Icon, ToastProps } from "@spark-design/react";
import {
  ButtonVariant,
  ToastPosition,
  ToastState,
  ToastVisibility,
} from "@spark-design/tokens";
import { useCallback, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { setDeploymentPackage } from "../../../../store/reducers/deploymentPackage";
import { setProps } from "../../../../store/reducers/toast";
import "./DeploymentPackageTable.scss";

const dataCy = "deploymentPackageTable";

export interface DeploymentPackageTableProps {
  hasPermission?: boolean;
  kind?: CatalogKinds;
  hideColumns?: string[];
  canRadioSelect?: boolean;
  onRadioSelectRow?: (selectedRow: catalog.DeploymentPackageRead) => void;
  prevRadioSelection?: catalog.DeploymentPackageRead;
}

const DeploymentPackageTable = ({
  hasPermission,
  kind,
  hideColumns,
  canRadioSelect,
  onRadioSelectRow,
  prevRadioSelection,
}: DeploymentPackageTableProps) => {
  const cy = { "data-cy": dataCy };

  const toastProps: ToastProps = {
    state: ToastState.Success,
    visibility: ToastVisibility.Hide,
    duration: 3000,
    position: ToastPosition.TopRight,
  };

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  const [pollingInterval, setPollingInterval] = useState<number>(API_INTERVAL);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const [downloadPackage] =
    appUtilities.useLazyCatalogServiceDownloadDeploymentPackageQuery();

  const handleDownload = (name, version) => {
    downloadPackage({
      projectName: SharedStorage.project?.name ?? "",
      deploymentPackageName: name,
      version: version,
    })
      .unwrap()
      .then((blob) => {
        console.log("Blob received:", blob);
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.style.display = "none"; // Optional: Hide the element
        a.href = url;
        a.download = `${name}-${version}.tar.gz`; // Ensure name and version are defined
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a); // Remove the element after clicking

        window.URL.revokeObjectURL(url); // Revoke the URL to free resources
      })
      .catch((error) => {
        console.error("Download failed", error);
      });
  };

  const columns: TableColumn<catalog.DeploymentPackageRead>[] = [
    {
      Header: "Name",
      accessor: (item: catalog.DeploymentPackageRead) => item.name,
      apiName: "name",
      Cell: (table: { row: { original: catalog.DeploymentPackageRead } }) => (
        <Link
          to={`/applications/package/${table.row.original.name}/version/${table.row.original.version}/`}
        >
          {table.row.original.name}
        </Link>
      ),
    },

    {
      Header: "Version",
      accessor: (item) => item.version,
      apiName: "version",
    },
    {
      Header: "Creation Time",
      accessor: (item) => rfc3339ToDate(item.createTime),
    },
    {
      Header: "Deployed",
      accessor: (item) => (item.isDeployed ? "Yes" : "No"),
      Cell: (table) => (
        <div
          className={
            table.row.original.isDeployed
              ? "dp-table-row-is-deployed"
              : "dp-table-row-is-not-deployed"
          }
        >
          {table.row.original.isDeployed ? "Yes" : "No"}
        </div>
      ),
    },
    {
      Header: "Description",
      accessor: (item: catalog.DeploymentPackageRead) => item.description,
      apiName: "description",
      Cell: (table) => {
        const deploymentPackage = table.row.original;
        const id = `${
          deploymentPackage.name
        }-${deploymentPackage.version.replace(".", "_")}`;
        return (
          <TextTruncate id={id} text={deploymentPackage.description ?? "-"} />
        );
      },
    },
    {
      Header: "Actions",
      textAlign: "center",
      padding: "0",
      // NOTE: accessor: will not trigger re-render of table!  We were using
      // Cell:  but that would cause the popup to immediately dissapear whenever
      // it was made visible
      accessor: (item: catalog.DeploymentPackageRead) => (
        <Popup
          onToggle={(isToggled: boolean) => {
            setPollingInterval(isToggled ? 0 : API_INTERVAL);
          }}
          options={getPopupOptions(Number(item.name), item.name, item.version)}
          jsx={<Icon icon="ellipsis-v" data-cy="actionsButton" />}
        />
      ),
    },
  ];
  if (canRadioSelect) {
    columns.unshift({
      Header: "Select",
      Cell: (table: { row: { original: catalog.DeploymentPackageRead } }) => {
        const row = table.row.original;
        return (
          <input
            data-cy={`${row.name}Selector`}
            type="radio"
            name="check"
            checked={
              prevRadioSelection &&
              prevRadioSelection.name === row.name &&
              prevRadioSelection.version === row.version
            }
            onChange={() => onRadioSelectRow && onRadioSelectRow(row)}
          />
        );
      },
    });
  }

  const filteredColums: TableColumn<catalog.DeploymentPackageRead>[] =
    hideColumns
      ? columns.filter((column) => !hideColumns.includes(column.Header))
      : columns;

  // Server-side API config
  const sortColumn =
    columnApiNameToDisplayName(filteredColums, searchParams.get("column")) ??
    "Name";
  const sortDirection = (searchParams.get("direction") ?? "asc") as Direction;
  const pageSize = parseInt(searchParams.get("pageSize") ?? "10");
  const offset = parseInt(searchParams.get("offset") ?? "0");
  const orderBy =
    getOrder(searchParams.get("column"), sortDirection) ?? "name asc";
  const searchTerm = searchParams.get("searchTerm") ?? "";
  /**
    Parameter passing kinds in request only if a particular kind type is required..
    In the case of ommiting the kinds field in the request fetches both applications and extensions
   */
  const kindsParam = kind ? { kinds: [kind] } : {};
  const { data, isSuccess, error, isError, isLoading } =
    catalog.useCatalogServiceListDeploymentPackagesQuery(
      {
        projectName: SharedStorage.project?.name ?? "",
        filter: getFilter<catalog.DeploymentPackageRead>(
          searchTerm,
          ["name", "displayName", "description", "version"],
          Operator.OR,
        ),
        orderBy,
        pageSize,
        offset,
        ...kindsParam,
      },
      {
        pollingInterval,
        skip: isDeleteModalOpen || !SharedStorage.project?.name,
      },
    );

  const getPopupOptions = (
    id: number,
    name: string,
    version: string,
  ): PopupOption[] => {
    const commonMenus = [
      // common to KIND_NORMAL and KIND_EXTENSIONS
      {
        displayText: "View Details",
        onSelect: () =>
          navigate(`/applications/package/${name}/version/${version}`),
      },
      {
        displayText: "Edit",
        disable: !hasPermission,
        onSelect: () => {
          const deploymentPackage = data?.deploymentPackages?.find(
            (ca) => ca.name === name && ca.version === version,
          );
          if (deploymentPackage) {
            dispatch(setDeploymentPackage(deploymentPackage));
            navigate(`../packages/edit/${name}/version/${version}`);
          }
        },
      },
      {
        displayText: "Export",
        onSelect: () => {
          const deploymentPackage = data?.deploymentPackages?.find(
            (deploymentPackage) =>
              deploymentPackage.name === name &&
              deploymentPackage.version === version,
          );
          if (deploymentPackage) {
            handleDownload(name, version);
          }
        },
      },
      {
        displayText: "Deploy",
        onSelect: () =>
          navigate(`/applications/package/deploy/${name}/version/${version}`),
      },
    ];
    if (kind === "KIND_NORMAL") {
      return [
        ...commonMenus,
        {
          displayText: "Clone",
          onSelect: () => {
            navigate(`../packages/clone/${name}/version/${version}`);
          },
        },
        {
          displayText: "Delete",
          disable: !hasPermission,
          onSelect: () => {
            const deploymentPackage = data?.deploymentPackages?.find(
              (deploymentPackage) =>
                deploymentPackage.name === name &&
                deploymentPackage.version === version,
            );
            if (deploymentPackage) {
              dispatch(setDeploymentPackage(deploymentPackage));
              setIsDeleteModalOpen(true);
            } // else {Error: invalid deploymentPackage format or undefined}
          },
        },
      ];
    } else {
      return commonMenus;
    }
  };

  const { name, version } = useAppSelector((state) => state.deploymentPackage);

  const [deleteDeploymentPackage] =
    catalog.useCatalogServiceDeleteDeploymentPackageMutation();
  const deleteFn = () => {
    deleteDeploymentPackage({
      projectName: SharedStorage.project?.name ?? "",
      deploymentPackageName: name,
      version: version,
    })
      .unwrap()
      .then(() => {
        dispatch(
          setProps({
            ...toastProps,
            state: ToastState.Success,
            message: "Deployment Package Successfully removed",
            visibility: ToastVisibility.Show,
          }),
        );
        navigate("/applications/packages");
      })
      .catch((err) => {
        const errorObj = parseError(err);
        dispatch(
          setProps({
            ...toastProps,
            state: ToastState.Danger,
            message: errorObj.data,
            visibility: ToastVisibility.Show,
          }),
        );
      });
    setIsDeleteModalOpen(false);
  };

  const memoTable = useCallback(
    (
      deploymentPackages: catalog.DeploymentPackageRead[],
      totalElements: number,
    ) => {
      return (
        <Table
          key="deployment-package-table"
          // Table data
          columns={filteredColums}
          data={deploymentPackages}
          // Initial state
          initialState={{
            pageSize,
            pageIndex: Math.floor(offset / pageSize),
          }}
          initialSort={{
            column: sortColumn,
            direction: sortDirection,
          }}
          // Sorting
          sortColumns={canRadioSelect ? [1, 2] : [0, 1]}
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
          totalOverallRowsCount={totalElements ?? 0}
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
        />
      );
    },
    [data?.deploymentPackages],
  );
  const getContent = () => {
    if (isError) return <ApiError error={error} />;
    if (isLoading || !data) return <TableLoader />;
    if (isSuccess && data.totalElements === 0 && !searchTerm) {
      return (
        <Empty
          icon="cube-detached"
          title="There are no Deployment Packages currently available."
          subTitle={
            kind === "KIND_NORMAL"
              ? "To add deployment package, select Add Deployment Package."
              : ""
          }
          actions={
            kind === "KIND_NORMAL"
              ? [
                  {
                    action: () => navigate("/applications/packages/import"),
                    name: "Import Deployment Package",
                    disable: !hasPermission,
                    variant: ButtonVariant.Primary,
                    dataCy: "importActionBtn",
                  },
                  {
                    action: () => navigate("/applications/packages/create"),
                    name: "Add Deployment Package",
                    disable: !hasPermission,
                    dataCy: "emptyActionBtn",
                  },
                ]
              : []
          }
        />
      );
    }
    if (isSuccess && data.totalElements === 0 && searchTerm) {
      return <Empty icon="cube-detached" title="No information to display" />;
    }

    return memoTable(data.deploymentPackages, data.totalElements);
  };

  return (
    <div {...cy} className="deployment-package-table">
      {getContent()}
      {isDeleteModalOpen && (
        <ConfirmationDialog
          content={`Are you sure to delete ${name}@${version}?`}
          isOpen={true}
          confirmCb={deleteFn}
          confirmBtnText="Delete"
          confirmBtnVariant={ButtonVariant.Alert}
          cancelCb={() => setIsDeleteModalOpen(false)}
        />
      )}
    </div>
  );
};

export default DeploymentPackageTable;
