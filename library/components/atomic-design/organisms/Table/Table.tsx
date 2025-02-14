/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { Pagination } from "@spark-design/react";
import { ButtonSize } from "@spark-design/tokens";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  HeaderGroup,
  Hooks,
  Row,
  TableInstance,
  TableOptions,
  TableState,
  useExpanded,
  UseExpandedInstanceProps,
  UseExpandedOptions,
  UseExpandedRowProps,
  useGlobalFilter,
  UseGlobalFiltersInstanceProps,
  usePagination,
  UsePaginationInstanceProps,
  UsePaginationState,
  useRowSelect,
  UseRowSelectInstanceProps,
  useSortBy,
  useTable,
} from "react-table";
import { TableLoader } from "../../atoms/TableLoader/TableLoader";
import "./Table.scss";
import { tableWithSelectColumn } from "./TableAllRowsSelected";
import { TableColumn } from "./TableColumn";
import { SortDirection, TableHeaderCell } from "./TableHeaderCell";
import { TableRibbon, TableRibbonProps } from "./TableRibbon";
import { tableRowExpander } from "./TableRowExpander";

//https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/react-table#example-type-file
//https://stackoverflow.com/questions/63617344/how-to-satisfy-the-constraint-of-recordstring-unknown-with-interface

export type RowWithExpansion<T extends object> = Row<T> &
  UseExpandedRowProps<T>;
type TableInstanceWithHooks<T extends object> = Omit<
  TableInstance<T>,
  "rows"
> & {
  rows: Array<RowWithExpansion<T>>;
} & UseGlobalFiltersInstanceProps<T> &
  UseRowSelectInstanceProps<T> &
  UseExpandedInstanceProps<T> &
  Omit<UsePaginationInstanceProps<T>, "page"> & {
    state: UsePaginationState<T>;
    page: Array<RowWithExpansion<T>>;
  };

// Combine TableOptions and UseExpandedOptions
type TableOptionsWithExpanded<T extends object> = TableOptions<T> &
  UseExpandedOptions<T>;

export type TableStateWithPagination<T extends object> = Partial<
  TableState<T>
> &
  Partial<UsePaginationState<T>>;

const DEFAULT_PAGESIZE = 10;
const DEFAULT_PAGEINDEX = 0;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface RowSelectionData<T> {
  selectedRow: T;
  isSelected: boolean;
  rowIndex?: number;
}

export interface TableProps<T extends object> extends TableRibbonProps {
  dataCy?: string;
  columns: Array<TableColumn<T>>;
  data?: Array<T>;
  canSelectRows?: boolean;
  selectedIds?: string[];
  canExpandRows?: boolean;
  canPaginate?: boolean;
  canShowAllRows?: boolean;
  canSearch?: boolean;
  isLoading?: boolean;
  isServerSidePaginated?: boolean;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  initialState?: TableStateWithPagination<object>;
  initialSort?: { column: string; direction: SortDirection };
  searchTerm?: string;
  totalOverallRowsCount?: number;
  sortColumns?: number[];
  autoResetExpanded?: boolean;
  subRow?: (row: RowWithExpansion<T>) => JSX.Element | undefined;
  onSort?: (column: string, direction: SortDirection) => void;
  onSelect?: (
    selectedRowData: T,
    isSelected: boolean,
    rowIndex?: number,
  ) => void;
  onChangePage?: (page: number) => void;
  onChangePageSize?: (pageSize: number) => void;
  getRowId?: (
    originalRow: T,
    relativeIndex?: number,
    parent?: Row<T>,
  ) => string;
}

export const serverSideTotalOverallRowsCountErrorMessage =
  "When server side pagination is enabled, totalOverallRowsCount value must be supplied.  Is the API not returning this value ?";
export const clientSideTotalOverallRowsCountErrorMessage =
  "When client side pagination is used, totalOverallRowsCount does not need to be supplied, if your intent is server side pagination you might be missing the isServerSidePaginated attribute";
export const initialSortWithNoColumnError =
  "Can't have initial sort without sortColumns defined";
export const specifyPaginationTypeMessage =
  "When canPaginate is used isServerSidePagination must be specified";
export const requireCanPaginateMessage =
  "isServerSidePaginated property must be used in conjunction with canPaginate, did you forget to add the canPaginate attribute ?";
export const rowsExcceedPageSizeMessage =
  "The number of returned rows exceeds expected pageSize";

export const Table = <T extends object>({
  dataCy = "table",
  columns,
  data,
  initialState,
  initialSort,
  canSelectRows = false,
  selectedIds = [],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  canExpandRows = false,
  canPaginate,
  canShowAllRows = false,
  canSearch = false,
  isLoading,
  isServerSidePaginated,
  totalOverallRowsCount,
  sortColumns = [],
  autoResetExpanded = false,
  subRow,
  onSort,
  onSelect,
  onSearch,
  onChangePage,
  onChangePageSize,
  getRowId,
  ...rest
}: TableProps<T>) => {
  const caseAndNumberInsensitiveCompare = useCallback(
    (
      rowA: { original: any; values: any },
      rowB: { original: any; values: any },
      columnId: any,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      desc: boolean,
    ): number => {
      let propA = rowA.original[columnId];
      let propB = rowB.original[columnId];

      // if the accessor is a function then columnId will not exist in original[]
      // need to get the calculated value from values[]
      if (!propA) propA = rowA.values[columnId];
      if (!propB) propB = rowB.values[columnId];

      // as a safety net, if can't access them we throw an error
      if (!propA || !propB) {
        throw new Error(
          `the value of column ${columnId} is missing. Check if this property was returned by API.`,
        );
      }
      if (typeof propA === "object" || typeof propB === "object")
        throw new Error(
          `accessor value to column ${columnId} possibly returning non-primitive type.  Did you mean to use Cell: property to return JSX ?`,
        );

      if (typeof propA === "number" && typeof propB === "number") {
        return propA === propB ? 0 : propA > propB ? 1 : -1;
      }
      const compared = propA.localeCompare(propB);
      if (compared === 0) return compared;

      return compared > 0 ? 1 : -1;
    },
    [],
  );

  const localData = useMemo(() => data ?? [], [data]);
  const localColumns = useMemo(
    () =>
      columns.map((column: any) => {
        column.sortType = caseAndNumberInsensitiveCompare;
        return column;
      }),
    [columns],
  );

  //in the case where its not supplied need to look at the data passed
  const localTotalOverallRowsCount: number = (() => {
    if (
      canPaginate &&
      isServerSidePaginated &&
      totalOverallRowsCount === undefined
    )
      throw new Error(serverSideTotalOverallRowsCountErrorMessage);

    if (canPaginate && !isServerSidePaginated && totalOverallRowsCount) {
      throw new Error(clientSideTotalOverallRowsCountErrorMessage);
    }

    //only gets into the or if letting the table handle pagination
    return (canPaginate && totalOverallRowsCount) || localData.length;
  })();

  //This affects the pagination control
  const [localPageSize, setLocalPageSize] = useState(() => {
    if (!canPaginate) return data ? data.length : 0;
    if (!initialState || !initialState.pageSize) return DEFAULT_PAGESIZE;
    const { pageSize } = initialState;
    if (pageSize <= 0) throw new Error("Negative pageSize value not allowed");

    return pageSize > localTotalOverallRowsCount
      ? localTotalOverallRowsCount
      : pageSize;
  });

  const [localPageIndex, setlocalPageIndex] = useState(() => {
    if (!initialState || !initialState.pageIndex) return DEFAULT_PAGEINDEX;
    const { pageIndex } = initialState;
    if (pageIndex <= 0) throw new Error("Negative pageIndex value not allowed");
    const initialRow = pageIndex * localPageSize; //pageIndex: 1, pageSize: 9  .. index: 9 ... too big last index is 8
    if (initialRow >= localTotalOverallRowsCount)
      return Math.floor((localTotalOverallRowsCount - 1) / localPageSize); //last page
    return pageIndex;
  });

  const localInitialState: TableStateWithPagination<object> = useMemo(() => {
    if (initialSort && (!sortColumns || sortColumns.length === 0))
      throw new Error(initialSortWithNoColumnError);

    //Passed in value of column will in theory be what the UI display (eg. "Name")
    //React table uses the `accessor` attribute of a column to sort if `accesssor` is a primitive type
    //Otherwise is uses the Header value displayed.
    const defaultSortableCoulmn = columns[sortColumns[0]];
    return {
      ...initialState,
      pageSize: localPageSize,
      pageIndex: localPageIndex,
      sortBy:
        initialSort && initialSort.column !== null
          ? [{ id: initialSort.column, desc: initialSort.direction === "desc" }]
          : sortColumns?.length > 0 && defaultSortableCoulmn
            ? [
                {
                  id:
                    typeof defaultSortableCoulmn.accessor === "string"
                      ? defaultSortableCoulmn.accessor
                      : defaultSortableCoulmn.Header,
                  desc: false,
                },
              ]
            : [],
    };
  }, [initialState, initialSort]);

  const [isEmpty, setIsEmpty] = useState<boolean>(!data || data.length === 0);

  const getCanDisplayPagination = (): boolean =>
    canPaginate === true && data !== undefined;

  const tableOptions: TableOptionsWithExpanded<T> = {
    data: localData,
    columns: localColumns,
    initialState: localInitialState,
    getRowId: getRowId,
    autoResetExpanded: autoResetExpanded,
  };

  const {
    setGlobalFilter,
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    rows,
    canPreviousPage,
    canNextPage,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    toggleAllRowsExpanded,
    toggleRowSelected,
  } = useTable<T>(
    tableOptions,
    useGlobalFilter,
    useSortBy,
    useExpanded,
    usePagination,
    // Row Selection: Plugin configuration for select.
    useRowSelect,
    (hooks: Hooks<T>) => {
      tableWithSelectColumn(canSelectRows, hooks, onSelect);
      tableRowExpander(!!subRow, hooks, (value?: boolean | undefined) =>
        toggleAllRowsExpanded(value),
      );
    },
  ) as TableInstanceWithHooks<T>;

  useEffect(() => {
    const { searchTerm } = rest;
    if (isServerSidePaginated !== true && searchTerm && searchTerm.length >= 0)
      setGlobalFilter(searchTerm);
    setIsEmpty(rows.length === 0);
  }, [rest.searchTerm, data, rows]);

  // Row Selection: Set row selection by `selectedIds` props
  useEffect(() => {
    localData.forEach((row, index) => {
      // if getRowId is provided set selection on custom row id, else default by index-approach
      const id = getRowId ? getRowId(row) : index.toString();
      if (selectedIds && selectedIds.includes(id)) {
        toggleRowSelected(id, true);
      }
    });
  }, [selectedIds, localData]);

  useEffect(() => {
    if (canPaginate && isServerSidePaginated === undefined)
      throw new Error(specifyPaginationTypeMessage);

    if (isServerSidePaginated !== undefined && !canPaginate)
      throw new Error(requireCanPaginateMessage);

    if (isServerSidePaginated && rows.length > localPageSize)
      throw new Error(rowsExcceedPageSizeMessage);
  }, []);

  const dataRows = isServerSidePaginated ? rows : page; //page is used when doing client side pagination

  return (
    <div data-cy={dataCy}>
      {isLoading && <TableLoader />}
      {!isLoading && (
        <>
          {canSearch && (
            <TableRibbon
              searchTerm={rest.searchTerm}
              searchTooltip={rest.searchTooltip}
              actionsJsx={rest.actionsJsx}
              onSearch={(searchTerm: string) => {
                if (isServerSidePaginated !== true) setGlobalFilter(searchTerm);
                if (onSearch) onSearch(searchTerm);
              }}
            />
          )}
          <table {...getTableProps()} className="table">
            <thead>
              {headerGroups.map((headerGroup: HeaderGroup<T>) => {
                const { key, ...restHeaderGroupProps } =
                  headerGroup.getHeaderGroupProps();
                return (
                  <tr
                    data-testid="table-row-header"
                    key={key}
                    {...restHeaderGroupProps}
                  >
                    {headerGroup.headers.map(
                      //Need Types
                      (column: any, index: number) => {
                        return (
                          <TableHeaderCell
                            key={`${key}-${index}`}
                            canSelectRows={canSelectRows}
                            sortColumns={sortColumns}
                            index={index}
                            column={column}
                            onSort={onSort}
                          />
                        );
                      },
                    )}
                  </tr>
                );
              })}
            </thead>
            <tbody {...getTableBodyProps()}>
              {dataRows.map((row) => {
                prepareRow(row); //helps with lazy rendering, saves cycles
                const { key, ...restRowProps } = row.getRowProps();
                return (
                  <React.Fragment key={key}>
                    <tr {...restRowProps} className="table-row">
                      {row.cells.map((cell) => {
                        const { key, ...restCellProps } = cell.getCellProps();
                        return (
                          <td
                            className="table-row-cell"
                            key={key}
                            {...restCellProps}
                          >
                            <div className="spark-table-cell-box">
                              {cell.render("Cell")}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                    {row.isExpanded && subRow && (
                      <tr className="table-sub-row" key={`sub-${key}`}>
                        <td
                          className="table-sub-row-cell"
                          colSpan={
                            Array.isArray(columns) ? columns.length + 1 : 0
                          }
                        >
                          {subRow(row)}
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
              {isEmpty && (
                <tr className="table-row" key="no-information-to-display">
                  <td colSpan={String(columns).length}>
                    <div
                      className="spark-table-cell-box"
                      data-cy="noInformation"
                    >
                      No information to display
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {getCanDisplayPagination() && (
            <Pagination
              data-cy="pagination"
              pageSize={localPageSize}
              size={ButtonSize.Medium}
              hasControl={true}
              totalItems={localTotalOverallRowsCount}
              pageIndex={localPageIndex}
              canNextPage={
                isServerSidePaginated
                  ? localPageIndex + 1 <
                    Math.ceil(localTotalOverallRowsCount / localPageSize)
                  : canNextPage
              }
              onNextPage={nextPage}
              canPreviousPage={
                isServerSidePaginated ? localPageIndex > 0 : canPreviousPage
              }
              onPreviousPage={previousPage}
              onGotoPage={gotoPage}
              onSetPageSize={(size) => {
                setLocalPageSize(size);
                setPageSize(size);
                if (onChangePageSize) onChangePageSize(size);
              }}
              onChangePage={(index) => {
                gotoPage(index); // sets the table view
                setlocalPageIndex(index); //sets the pagination control
                if (onChangePage) onChangePage(index);
              }}
              showAllButton={canShowAllRows}
            />
          )}
        </>
      )}
    </div>
  );
};
