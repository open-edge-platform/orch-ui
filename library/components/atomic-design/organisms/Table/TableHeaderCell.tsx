/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { HeaderGroup, UseSortByColumnProps } from "react-table";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type HeaderGroupWithSort<T extends object> = HeaderGroup<object> &
  UseSortByColumnProps<object>;

export type SortDirection = "asc" | "desc" | null;
interface TableHeaderCellProps {
  canSelectRows: boolean;
  sortColumns: number[];
  index: number;
  column: HeaderGroupWithSort<object>;
  onSort?: (column: string, direction: SortDirection) => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const TableHeaderCell = <T extends object>({
  canSelectRows,
  sortColumns,
  column,
  index,
  onSort,
}: TableHeaderCellProps) => {
  const adjustedColumnIndex = canSelectRows ? index - 1 : index;
  const isColumnSortable = sortColumns.includes(adjustedColumnIndex);
  const sortProps = isColumnSortable
    ? column.getSortByToggleProps()
    : undefined;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { key, ...restColumn } = column.getHeaderProps(sortProps);

  const name = column.render("Header");

  return (
    <th {...restColumn} {...column.getHeaderProps()}>
      <div
        className={`table-header-cell ${
          (column as any).textAlign ?? ""
        }`.trim()}
        onClick={() => {
          if (!onSort) return;
          // setTimeout used because isSortDesc is giving previous value
          // this was happening previously in SI version as well
          setTimeout(() => {
            let direction: SortDirection = null;
            if (column.isSortedDesc !== undefined)
              direction = column.isSortedDesc ? "desc" : "asc";
            onSort(name as string, direction);
          }, 0);
        }}
      >
        <div>{name}</div>
        {isColumnSortable && (
          <div className="table-header-sort-arrows">
            <div
              className={`caret ${
                column.isSorted && !column.isSortedDesc
                  ? "caret-up-select"
                  : "caret-up"
              }`}
            />
            <div
              className={`caret ${
                column.isSorted && column.isSortedDesc
                  ? "caret-down-select"
                  : "caret-down"
              }`}
            />
          </div>
        )}
      </div>
    </th>
  );
};
