/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Path } from "react-hook-form";

export interface TableColumn<T = object, H = string> {
  Header: H;
  accessor?: keyof T | Path<T> | ((row: T) => React.ReactNode);
  textAlign?: "left" | "right" | "center";
  padding?: string;
  apiName?: string;
  Cell?: (table: {
    row: { original: T };
    cell: { value: string };
  }) => React.ReactNode;
  sortType?: (
    rowA: { original: T },
    rowB: { original: T },
    columnId: keyof T,
    desc: boolean,
  ) => number;
  id?: keyof T | Path<T>;
}

//Get column name based on searchParams()
export const columnApiNameToDisplayName = <T = object>(
  columns: TableColumn<T>[],
  apiName: string | null,
): string | null => {
  if (!apiName) return null;
  const column = columns.find(
    (value: TableColumn<T>) => value.apiName === apiName,
  );
  if (!column)
    throw new Error(
      `apiName property missing in column definition related to ${apiName}`,
    );
  return column?.Header;
};

export const columnDisplayNameToApiName = <T = object>(
  columns: TableColumn<T>[],
  name: string | null,
): string | null => {
  if (!name) return null;
  const column = columns.find((value: TableColumn<T>) => value.Header === name);
  if (!column?.apiName)
    throw new Error(
      `apiName property missing in column defiition related to ${name}`,
    );
  return column.apiName;
};
