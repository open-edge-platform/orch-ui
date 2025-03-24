/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { eim } from "@orch-ui/apis";
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
  SharedStorage,
} from "@orch-ui/utils";
import { Button, Heading, Tag, Text, Tooltip } from "@spark-design/react";
import { ButtonSize, HeaderSize } from "@spark-design/tokens";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { regionsRoute, sitesRoute } from "../../../routes/const";
import RegionCell from "../../atom/RegionCell/RegionCell";
import "./SiteTable.scss";

export type SiteSource = "site" | "region";

interface SiteTableProps {
  regionId: string;
  actions?: TableColumn<eim.SiteRead>;
  hiddenColumns?: string[];
  hasPermission?: boolean;
  radioSelect?: TableColumn<eim.SiteRead>;
  isAllocated?: boolean;
  tableTextSelect?: (item: eim.SiteRead) => void;
  radioNameSelected?: string;
  hideRibbon?: boolean;
  sort?: number[];
  basePath?: string;
  subtitle?: string;
  showSearch?: boolean;
  source: SiteSource;
}

const SiteTable = ({
  regionId,
  actions,
  hiddenColumns = [],
  hasPermission,
  radioSelect,
  tableTextSelect,
  isAllocated,
  showSearch = true,
  subtitle,
  sort,
  basePath,
  source = "site",
}: SiteTableProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // construct query args
  const queryArgs: eim.GetV1ProjectsByProjectNameRegionsAndRegionIdSitesApiArg =
    {
      projectName: SharedStorage.project?.name ?? "",
      regionId,
      pageSize: searchParams.get("pageSize")
        ? parseInt(searchParams.get("pageSize")!)
        : 10,
      offset: searchParams.get("offset")
        ? parseInt(searchParams.get("offset")!)
        : 0,
      filter: getFilter<
        Omit<eim.SiteRead, "region"> & {
          region: Omit<eim.RegionRead, "parentRegion">;
        }
      >(
        searchParams.get("searchTerm") ?? "",
        ["name", "resourceId", "region.name", "region.resourceId"],
        Operator.OR,
        true,
      ),
      orderBy: getOrder(
        searchParams.get("column") ?? "name",
        (searchParams.get("direction") as Direction) ?? "asc",
      ),
    };
  const {
    data: { sites, totalElements } = {},
    isError,
    isSuccess,
    isLoading,
    error,
  } = eim.useGetV1ProjectsByProjectNameRegionsAndRegionIdSitesQuery(queryArgs, {
    pollingInterval: API_INTERVAL,
  });

  const navigate = useNavigate();

  const columns: TableColumn<eim.SiteRead>[] = [
    {
      Header: "Name",
      accessor: (item) => {
        if (item.name) {
          return item.name;
        } else if (item.resourceId) {
          return item.resourceId;
        }
      },
      Cell: (table) => {
        let siteName: string | undefined;
        if (table.row.original.name !== "") {
          siteName = table.row.original.name;
        } else {
          siteName = table.row.original.resourceId;
        }
        if (!isAllocated) {
          //to={`/regions/${table.row.original.region}/sites/${table.row.original.resourceId}`} relative="path"
          return (
            <Link
              to={`${basePath}/${table.row.original.region?.resourceId}/sites/${table.row.original.resourceId}?source=${source}`}
              relative="path"
            >
              {siteName}
            </Link>
          );
        } else {
          return (
            <Tooltip placement="bottom" content="View the Site Details">
              <Link
                to={"#"}
                onClick={() =>
                  tableTextSelect && tableTextSelect(table.row.original)
                }
              >
                {siteName}
              </Link>
            </Tooltip>
          );
        }
      },
      apiName: "name",
    },
    {
      Header: "Deployment Metadata",
      accessor: (item) => {
        if (item.metadata) {
          return `${item.metadata[0]?.value} ${item.metadata[0]?.key}`;
        } else {
          return "item";
        }
      },
      Cell: (table: { row: { original: eim.SiteRead } }) => {
        const metadataPairs = table.row.original.metadata ?? [];
        const tags =
          metadataPairs.length > 2 ? (
            <>
              {new Array(2).fill(undefined).map((_, index) => (
                <Tag
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
    {
      Header: "Region",
      accessor: "region.resourceId",
      Cell: (table) => (
        <RegionCell regionId={table.row.original.region?.regionID} />
      ),
    },
  ];

  if (actions) columns.push(actions);

  if (radioSelect) {
    columns.unshift(radioSelect);
  }

  const cols = columns.filter(
    (c) => hiddenColumns.indexOf(c.Header.toLowerCase()) === -1,
  );

  const sortColumn =
    columnApiNameToDisplayName(columns, searchParams.get("column")) ?? "Name";
  const sortDirection = searchParams.get("direction") as SortDirection;
  const pageSize = parseInt(searchParams.get("pageSize") ?? "10");
  const offset = parseInt(searchParams.get("offset") ?? "0");
  const searchTerm = searchParams.get("searchTerm") ?? undefined;

  const isEmptyError = () =>
    isSuccess && (!sites || (sites && sites.length === 0)) && !searchTerm;

  const addSiteButtonJSX = (
    <Button
      className="add-site-button"
      data-cy="addSiteButton"
      size={ButtonSize.Large}
      onPress={() => {
        navigate(
          regionId ? `${sitesRoute}/new?source=region` : "new?source=site",
        );
      }}
    >
      Add a Site
    </Button>
  );

  const getContent = () => {
    if (isEmptyError()) {
      return (
        <Empty
          title="No sites found"
          actions={[
            {
              name: "Add a Site",
              action: () =>
                navigate(
                  regionId
                    ? `../../${regionsRoute}/${regionId}/${sitesRoute}/new?source=region`
                    : `../${sitesRoute}/new?source=site`,
                  { relative: "path" },
                ),
              disable: !hasPermission,
            },
          ]}
        />
      );
    }

    if (isError) return <ApiError error={error} />;
    if (isLoading) return <TableLoader />;

    return (
      <Table
        columns={cols}
        data={sites}
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
        actionsJsx={hasPermission ? addSiteButtonJSX : undefined}
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
        onChangePage={(index: number) => {
          setSearchParams((prev) => {
            prev.set("offset", (index * pageSize).toString());
            return prev;
          });
        }}
        onSearch={(searchTerm: string) => {
          setSearchParams((prev) => {
            if (searchTerm) prev.set("searchTerm", searchTerm);
            else prev.delete("searchTerm");
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
  };

  return (
    <div className="sites-table" data-cy="sitesTable">
      {subtitle && (
        <div className="faux-ribbon">
          <Heading
            semanticLevel={4}
            size={HeaderSize.Medium}
            data-cy="subtitle"
          >
            {subtitle}
          </Heading>
          {basePath === "../../regions" && addSiteButtonJSX}
        </div>
      )}
      {getContent()}
    </div>
  );
};

export default SiteTable;
