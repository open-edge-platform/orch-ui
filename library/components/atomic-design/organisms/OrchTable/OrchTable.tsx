/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { Direction } from "@orch-ui/utils";
import { Table, TableProps } from "@spark-design/react";
import { TableSize } from "@spark-design/tokens";
import _ from "lodash";
import { useSearchParams } from "react-router-dom";
import { ApiError } from "../../atoms/ApiError/ApiError";
import { TableLoader } from "../../atoms/TableLoader/TableLoader";
import { Empty, EmptyProps } from "../../molecules/Empty/Empty";
import { Ribbon, RibbonProps } from "../Ribbon/Ribbon";

interface OrchTableProps {
  tableProps: TableProps & {
    // sortableColumnsApi is a mapping of sortable column key and header
    // key is returned column value of onSort
    // value is to be passed to api
    sortableColumnsApi?: { [key: string]: string };
    // sortableColumnsInit is a mapping of sortable column key and initSort
    // key is api key field (value in search parameter in URL)
    // value is to be passed to initialSort
    sortableColumnsInit?: { [key: string]: string };
  };
  ribbonProps?: RibbonProps;
  isSuccess?: boolean;
  isError?: boolean;
  error?: unknown;
  isLoading?: boolean;
  isEmpty?: boolean;
  emptyProps?: EmptyProps;
}

export const OrchTable = ({
  tableProps,
  ribbonProps,
  isSuccess,
  isEmpty,
  emptyProps,
  isError,
  error,
  isLoading,
  ...rest
}: OrchTableProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  // Function to find column by Header or accessort
  const columnSorted = (column: string) =>
    Array.isArray(tableProps.columns) &&
    tableProps.columns.find(
      (c) => c.Header === column || c.accessor === column,
    );
  // Function to generate query parameter in url
  const getQueryParameterColumn = (
    prev: URLSearchParams,
    column: string,
    direction: Direction,
  ) => {
    const ctbs = columnSorted(column);
    const sCA = tableProps.sortableColumnsApi;
    if (sCA && sCA[column]) {
      prev.set("column", sCA[column]);
    } else if (ctbs && typeof ctbs.accessor === "string") {
      prev.set("column", ctbs.accessor);
    } else {
      prev.set("column", _.camelCase(column));
    }
    prev.set("direction", direction);
  };
  // Function to generate initial sort props for spark-table
  const getInitialSortColumn = () => {
    // React table will first use accessor when it's a string
    // Secondly, react table will use Header
    const column = searchParams.get("column");
    const sCI = tableProps.sortableColumnsInit;
    if (column === null) {
      return "";
    } else {
      const cSorted = columnSorted(column);
      if (sCI && sCI[column]) {
        return sCI[column];
      } else if (cSorted) {
        // TODO check react table, if space is not allowed in initSort, this block can be removed
        if (typeof cSorted.accessor === "string") return cSorted.accessor;
        return cSorted.Header;
      } else {
        // TODO check react table, if space is not allowed in initSort, this block can be removed
        return _.startCase(column);
      }
    }
  };

  const caseAndNumberInsensitiveCompare = (
    rowA: { original: any },
    rowB: { original: any },
    columnId: any,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    desc: boolean,
  ): number => {
    let propA = rowA.original[columnId];
    let propB = rowB.original[columnId];

    // if the accessor is a function then the columnID seems to be the Name (Header)
    // try to access the value if possible
    // for example in the Site table, we get Name
    if (!propA) {
      propA = rowA.original[columnId.toLowerCase()];
    }
    if (!propB) {
      propB = rowB.original[columnId.toLowerCase()];
    }

    // as a safety net, if can't access them we just say they're equal
    if (!propA || !propB) {
      return 0;
    }
    if (typeof propA === "number" && typeof propB === "number") {
      if (propA == propB) {
        return 0;
      }
      return propA > propB ? 1 : -1;
    }
    const compared = propA.localeCompare(propB);
    if (compared === 0) {
      return compared;
    }
    return compared > 0 ? 1 : -1;
  };

  // FIXME why are we setting total items to 0??
  const totalItem = tableProps.totalItem ?? 0;
  const pageSize = parseInt(searchParams.get("pageSize") ?? "10");
  const offset = parseInt(searchParams.get("offset") ?? "0");
  const searchTerm = searchParams.get("searchTerm") ?? "";
  const canNextPage = (offset: number) => {
    // if offset (the total number of items in the previous pages) plus
    // the pageSize (the maximum number of items in this page) is less than
    // the totalItems we disable the next button
    return offset + pageSize < totalItem;
  };

  const serverSideSortColumns = Array.isArray(tableProps.columns)
    ? tableProps.columns.map((c) => {
        c.sortType = caseAndNumberInsensitiveCompare;
        return c;
      })
    : tableProps.columns;
  return (
    <div data-cy="orchTable">
      {ribbonProps && (
        <Ribbon
          onSearchChange={(value) => {
            setSearchParams((prev) => {
              // TODO In ribbon component, when value is empty, we set search value as a space.
              // TODO Need to remove this space after all migrate to server side filter and pagination.
              if (value === " " || !value) prev.delete("searchTerm");
              else prev.set("searchTerm", value);
              return prev;
            });
          }}
          defaultValue={searchTerm}
          {...ribbonProps}
        />
      )}
      {isSuccess && (
        <Table
          data-cy="table"
          size={TableSize.Large}
          variant="minimal"
          onPageIndex={offset / pageSize}
          pagination
          pageSize={pageSize}
          onPageSizeChange={(pageSize: number) => {
            setSearchParams((prev) => {
              prev.set("pageSize", pageSize.toString());
              prev.set("offset", "0");
              return prev;
            });
          }}
          onChangePage={(index: number) => {
            setSearchParams((prev) => {
              prev.set("offset", (index * pageSize).toString());
              return prev;
            });
          }}
          // @ts-ignore  // Direction does represent "asc | desc"
          onSort={(column: string, direction: Direction | null) => {
            setSearchParams((prev) => {
              if (direction) {
                getQueryParameterColumn(prev, column, direction);
              } else {
                prev.delete("column");
                prev.delete("direction");
              }
              return prev;
            });
          }}
          initialSort={
            searchParams.get("column") && searchParams.get("direction")
              ? {
                  column: getInitialSortColumn(),
                  direction:
                    (searchParams.get("direction") as Direction) ?? "desc",
                }
              : undefined
          }
          onNextPage={canNextPage(offset)}
          onPreviousPage={offset > 0}
          {...tableProps}
          columns={serverSideSortColumns}
          {...rest}
        />
      )}
      {isLoading && <TableLoader />}
      {isError && <ApiError error={error} />}
      {isEmpty && <Empty {...emptyProps} />}
    </div>
  );
};
