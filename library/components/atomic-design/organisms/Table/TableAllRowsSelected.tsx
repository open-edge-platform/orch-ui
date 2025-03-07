/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef } from "react";
import {
  CellProps,
  Column,
  ColumnInstance,
  Hooks,
  UseRowSelectRowProps,
} from "react-table";

type CellPropsWithRowSelect<D extends object> = CellProps<D> & {
  row: UseRowSelectRowProps<D>;
};

interface IndeterminateCheboxProps {
  indeterminate: any;
  onSelect?: (isSelected: boolean) => void;
}
const IndeterminateCheckbox = ({
  indeterminate,
  onSelect,
  ...rest
}: IndeterminateCheboxProps) => {
  // For checkbox `onChange`
  const inputRef = useRef(null);

  useEffect(() => {
    /* once onChange is seen, set back the default `null` */
    if (inputRef.current !== null) {
      inputRef.current = indeterminate;
    }
  }, [inputRef, IndeterminateCheckbox]);

  return (
    <input
      data-cy="rowSelectCheckbox"
      className="spark-table-rows-select-checkbox"
      type="checkbox"
      aria-label="checkbox"
      /* React component has inbuilt feature to set `inputRef.current:boolean` `onChange` occurs with user click */
      ref={inputRef}
      onClick={(event) => {
        if (onSelect) onSelect(event.currentTarget.checked);
      }}
      {...rest}
    />
  );
};

export const tableWithSelectColumn = <T extends object>(
  canSelectRows: boolean,
  hooks: Hooks<T>,
  onSelect?: (
    data: CellPropsWithRowSelect<T>["row"]["original"],
    isSelected: boolean,
    rowIndex?: number,
  ) => void,
) => {
  if (!canSelectRows) return;
  hooks.visibleColumns.push(
    /* Add column for selection for every row in the table */
    (allColumns: ColumnInstance<T>[]) =>
      [
        {
          id: "selection",
          Cell: ({ row }: CellPropsWithRowSelect<T>) => (
            <span key={`checkbox-${{ row }.row.index}`}>
              <IndeterminateCheckbox
                indeterminate={null}
                data-testid="select-row-checkbox"
                onSelect={(isSelected: boolean) => {
                  // eslint-disable-next-line no-unused-expressions
                  onSelect && onSelect(row.original, isSelected, row.index);
                }}
                {...row.getToggleRowSelectedProps()}
              />
            </span>
          ),
        },
        ...allColumns,
      ] as Column<T>[],
  );
};
