/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import {
  ApiError,
  columnApiNameToDisplayName,
  columnDisplayNameToApiName,
  Empty,
  SortDirection,
  Table,
  TableColumn,
  TableLoader,
} from "@orch-ui/components";
import {
  API_INTERVAL,
  Direction,
  getFilter,
  getOrder,
  Operator,
  regionRoute,
  SharedStorage,
  subRegionRoute,
  useInfraNavigate,
} from "@orch-ui/utils";
import { Button, Heading, Tag, Text, Tooltip } from "@spark-design/react";
import { ButtonSize, HeaderSize } from "@spark-design/tokens";
import { Link, useSearchParams } from "react-router-dom";
import "./RegionsTable.scss";

interface RegionsTableProps {
  parentRegionId?: string;
  actions?: TableColumn<infra.RegionRead>;
  radioSelect?: TableColumn<infra.RegionRead>;
  hiddenColumns?: string[];
  hasPermission?: boolean;
  sort?: number[];
  isAllocated?: boolean;
  tableTextSelect?: (item: infra.RegionRead) => void;
  basePath?: string;
  subtitle?: string;
  showSearch?: boolean;
}

const RegionsTable = ({
  parentRegionId,
  hiddenColumns = [],
  showSearch = true,
  actions,
  radioSelect,
  hasPermission,
  tableTextSelect,
  isAllocated,
  sort,
  basePath = "",
  subtitle,
}: RegionsTableProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    data: { regions, totalElements } = {},
    isSuccess,
    isError,
    error,
    isLoading,
  } = infra.useGetV1ProjectsByProjectNameRegionsQuery(
    {
      projectName: SharedStorage.project?.name ?? "",
      parent: parentRegionId,
      pageSize: searchParams.get("pageSize")
        ? parseInt(searchParams.get("pageSize")!)
        : 10,
      offset: searchParams.get("offset")
        ? parseInt(searchParams.get("offset")!)
        : 0,
      filter: getFilter<
        Omit<infra.RegionRead, "parentRegion"> & {
          parentRegion: Omit<infra.RegionRead, "parentRegion">;
        }
      >(
        searchParams.get("searchTerm") ?? "",
        ["name", "resourceId", "parentRegion.name"],
        Operator.OR,
        true,
      ),
      orderBy: getOrder(
        searchParams.get("column"),
        searchParams.get("direction") as Direction,
      ),
    },
    { pollingInterval: API_INTERVAL },
  );
  const navigate = useInfraNavigate();

  const columns: TableColumn<infra.RegionRead>[] = [
    {
      Header: "Name",
      accessor: "name",
      Cell: (table: { row: { original: infra.RegionRead } }) => {
        if (!isAllocated) {
          return (
            <Link
              to={`${basePath}${table.row.original.resourceId}`}
              relative="path"
            >
              {table.row.original.name}
            </Link>
          );
        } else {
          return (
            <Tooltip placement="bottom" content="View the Region Details">
              <Link
                to={"#"}
                onClick={() =>
                  tableTextSelect && tableTextSelect(table.row.original)
                }
              >
                {table.row.original.name}
              </Link>
            </Tooltip>
          );
        }
      },
      apiName: "name",
    },
    {
      Header: "Type",
      accessor: (item) => {
        if (item.metadata) {
          const value = `${item.metadata[0]?.value} ${item.metadata[0]?.key}`;
          return value;
        } else {
          return "item";
        }
      },
      Cell: (table: { row: { original: infra.RegionRead } }) => {
        const metadataPairs = table.row.original.metadata ?? [];
        const tags =
          metadataPairs.length > 2 ? (
            <>
              {new Array(2).fill(undefined).map((_, index) => (
                <Tag
                  data-cy="metaValue"
                  key={index}
                  className="infra-regions-table__tag"
                  label={`${metadataPairs[index].key}: ${metadataPairs[index].value}`}
                  rounding="semi-round"
                  size="small"
                />
              ))}
              <Text>...</Text>
            </>
          ) : (
            metadataPairs.map((metadata) => (
              <Tag
                data-cy="metaValue"
                className="infra-regions-table__tag"
                label={`${metadata.key}: ${metadata.value}`}
                rounding="semi-round"
                size="small"
              />
            ))
          );
        return <>{tags}</>;
      },
    },
  ];

  if (actions) {
    columns.push(actions);
  }

  if (radioSelect) {
    columns.unshift(radioSelect);
  }

  const cols = columns.filter(
    (c) => hiddenColumns.indexOf(c.Header.toLowerCase()) === -1,
  );

  const handleSort = (column: string, direction: SortDirection) => {
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
  };

  const handlePageChange = (index: number) => {
    setSearchParams((prev) => {
      prev.set("offset", (index * pageSize).toString());
      return prev;
    });
  };

  const handleSearch = (searchTerm: string) => {
    setSearchParams((prev) => {
      if (searchTerm) prev.set("searchTerm", searchTerm);
      else prev.delete("searchTerm");
      return prev;
    });
  };

  const handlePageSizeChange = (pageSize: number) => {
    setSearchParams((prev) => {
      prev.set("pageSize", pageSize.toString());
      return prev;
    });
  };

  const sortColumn =
    columnApiNameToDisplayName(columns, searchParams.get("column")) ?? "name";
  const sortDirection = searchParams.get("direction") as SortDirection;
  const pageSize = parseInt(searchParams.get("pageSize") ?? "10");
  const offset = parseInt(searchParams.get("offset") ?? "0");
  const searchTerm = searchParams.get("searchTerm") ?? "";

  const isEmptyError = () =>
    isSuccess && (!regions || regions.length === 0) && !searchTerm;

  const addRegionButtonJSX = (
    <Button
      className="add-region-button"
      data-cy="addRegionsButton"
      size={ButtonSize.Large}
      onPress={() => {
        if (parentRegionId) {
          navigate(subRegionRoute, { parentRegionId, regionId: "new" });
        } else {
          navigate(regionRoute, { regionId: "new" });
        }
      }}
    >
      {parentRegionId ? "Add a Subregion" : "Add a Region"}
    </Button>
  );

  const getContent = () => {
    if (isEmptyError())
      return (
        <Empty
          title="No regions found"
          actions={[
            {
              name: parentRegionId ? "Add a Subregion" : "Add a Region",
              action: () => {
                if (parentRegionId) {
                  navigate(subRegionRoute, {
                    parentRegionId,
                    regionId: "new",
                  });
                } else {
                  navigate(regionRoute, { regionId: "new" });
                }
              },
              disable: !hasPermission,
            },
          ]}
        />
      );

    if (isError) return <ApiError error={error} />;
    if (isLoading) return <TableLoader />;

    return (
      <Table
        columns={cols}
        data={regions}
        totalOverallRowsCount={totalElements}
        canPaginate
        canSearch={showSearch}
        isServerSidePaginated
        initialState={{ pageSize, pageIndex: Math.floor(offset / pageSize) }}
        initialSort={
          sort
            ? {
                column: sortColumn,
                direction: sortDirection,
              }
            : undefined
        }
        searchTerm={searchTerm}
        sortColumns={sort}
        actionsJsx={hasPermission ? addRegionButtonJSX : undefined}
        onSort={handleSort}
        onChangePage={handlePageChange}
        onSearch={handleSearch}
        onChangePageSize={handlePageSizeChange}
      />
    );
  };

  return (
    <div className="regions-table" data-cy="regionsTable">
      {subtitle && (
        <div className="faux-ribbon">
          <Heading
            semanticLevel={4}
            size={HeaderSize.Medium}
            data-cy="subtitle"
          >
            {subtitle}
          </Heading>
          {basePath === "../" && addRegionButtonJSX}
        </div>
      )}
      {getContent()}
    </div>
  );
};

export default RegionsTable;
