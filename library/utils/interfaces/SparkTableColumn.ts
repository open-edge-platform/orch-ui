/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Path } from "react-hook-form";

// TODO move the generics in spark-design and remove this interface completely
export interface SparkTableColumn<T, H = string> {
  Header: H;
  accessor?: keyof T | Path<T> | ((row: T) => React.ReactNode);
  textAlign?: string;
  padding?: string;
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
