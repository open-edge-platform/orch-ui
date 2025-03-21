/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { catalog } from "@orch-ui/apis";
import {
  ApiError,
  columnApiNameToDisplayName,
  columnDisplayNameToApiName,
  Empty,
  Popup,
  SortDirection,
  SquareSpinner,
  Table,
  TableColumn,
} from "@orch-ui/components";
import {
  API_INTERVAL,
  checkAuthAndRole,
  Direction,
  getFilter,
  getOrder,
  LpInternalError,
  Operator,
  parseError,
  rfc3339ToDate,
  Role,
  SharedStorage,
} from "@orch-ui/utils";
import { Button, Icon, Tooltip } from "@spark-design/react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./AvailableRegistriesTable.scss";

const dataCy = "availableRegistriesTable";

export interface DeleteRegistryState {
  registry: catalog.Registry;
  onDeleteSuccess?: () => void;
}

interface AvailableRegistriesTableProps {
  searchTerm?: string;
  hasPermission?: boolean;
  hideRibbon?: boolean;
  onAdd?: () => void;
  onEdit?: (registry: catalog.RegistryRead) => void;
  onDelete?: (deleteRegistryState: DeleteRegistryState) => void;
}
const AvailableRegistriesTable = ({
  hasPermission,
  hideRibbon = false,
  onAdd,
  onDelete,
  onEdit,
}: AvailableRegistriesTableProps) => {
  const cy = { "data-cy": dataCy };
  const [searchParams, setSearchParams] = useSearchParams();
  const [parsedError, setParsedError] = useState<LpInternalError>();

  const sortDirection = (searchParams.get("direction") as Direction) || "asc";
  const pageSize = parseInt(searchParams.get("pageSize") || "10");
  const offset = parseInt(searchParams.get("offset") || "0");
  const orderBy =
    getOrder(searchParams.get("column"), sortDirection) ?? "name asc";
  const projectName = SharedStorage.project?.name ?? "";
  const [pollingInterval, setPollingInterval] = useState<number>(API_INTERVAL);
  const { data, error, isError, isLoading, isSuccess } =
    catalog.useCatalogServiceListRegistriesQuery(
      {
        projectName,
        filter: getFilter<catalog.RegistryRead>(
          searchParams.get("searchTerm") ?? "",
          ["name", "type"],
          Operator.OR,
        ),
        orderBy,
        pageSize,
        offset,
        showSensitiveInfo: checkAuthAndRole([Role.CATALOG_WRITE]),
      },
      {
        skip: !projectName,
        pollingInterval,
      },
    );

  useEffect(() => {
    if (isError) {
      setParsedError(parseError(error));
    }
  }, [isError, error]);

  /** change page upon a delete success, if the row count decreases to 0 and user is not in first page */
  const onDeleteSuccess = () => {
    if (
      data &&
      // if not first page
      offset !== 0 &&
      // row count is 0 for the page after delete
      data.totalElements - 1 <= offset &&
      // safe check for `offset-pageSize`
      offset >= pageSize
    ) {
      setSearchParams((prev) => {
        prev.set("offset", (offset - pageSize).toString());
        return prev;
      });
    }
  };

  const columns: TableColumn<catalog.RegistryRead>[] = [
    {
      Header: "Name",
      accessor: (row) => row.name,
      apiName: "name",
    },
    {
      Header: "Type",
      accessor: (row) => row.type,
      apiName: "type",
    },
    {
      Header: "Date Added",
      accessor: (r: catalog.RegistryRead) => rfc3339ToDate(r.createTime, true),
      apiName: "createTime",
    },
    {
      Header: "Actions",
      textAlign: "center",
      padding: "0",
      accessor: (registry) => (
        <Popup
          onToggle={(isToggled: boolean) => {
            setPollingInterval(isToggled ? 0 : API_INTERVAL);
          }}
          dataCy="appRegistryPopup"
          jsx={<Icon icon="ellipsis-v" />}
          options={[
            {
              disable: !hasPermission,
              onSelect: () => onEdit && onEdit(registry),
              displayText: "Edit",
            },
            {
              disable: !hasPermission,
              onSelect: () =>
                onDelete && onDelete({ registry, onDeleteSuccess }),
              displayText: "Delete",
            },
          ]}
        />
      ),
    },
  ];
  const sortColumn =
    columnApiNameToDisplayName(columns, searchParams.get("column")) ?? "Name";

  const totalItems = data && data.registries ? data.registries.length : 0;

  if (isError && parsedError?.status !== 404) {
    return <ApiError error={error} />;
  }
  if (isLoading) {
    return <SquareSpinner />;
  }
  if (!data || (isSuccess && totalItems === 0)) {
    return (
      <Empty
        icon="cube-detached"
        title="There are no registries available."
        actions={[
          {
            action: () => onAdd && onAdd(),
            name: "Add Registry",
            disable: !hasPermission,
          },
        ]}
      />
    );
  }

  // For the remaining if(isSuccess and data is not empty)
  return (
    <div {...cy} className="available-registries-table">
      <Table
        dataCy="registryTable"
        key="available-registries-table"
        isLoading={isLoading}
        // Table data
        columns={columns}
        data={
          data && data.registries && data.registries.length > 0
            ? data.registries
            : []
        }
        // Sorting
        sortColumns={[0, 2, 3]}
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
        canSearch={!hideRibbon}
        actionsJsx={
          <Button
            className="ribbon-button"
            data-cy="ribbonButton"
            isDisabled={!hasPermission}
            onPress={() => onAdd && onAdd()}
          >
            {!hasPermission && (
              <Tooltip
                className="action-tooltip"
                icon={<Icon icon="lock" artworkStyle="solid" />}
                placement="left"
                content="The users with 'View Only' access can mostly view the data and do few of the Add/Edit operations."
              >
                <>Add a Registry</>
              </Tooltip>
            )}
            {hasPermission && "Add a Registry"}
          </Button>
        }
        onSearch={(searchTerm: string) => {
          setSearchParams((prev) => {
            prev.set("direction", "asc");
            prev.set("offset", "0");
            if (searchTerm) prev.set("searchTerm", searchTerm);
            else prev.delete("searchTerm");
            return prev;
          });
        }}
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
};

export default AvailableRegistriesTable;
