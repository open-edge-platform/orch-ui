/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { Icon } from "@spark-design/react";
import React from "react";
import { Hooks } from "react-table";
import { RowWithExpansion } from "./Table";

export const tableRowExpander = <T extends object>(
  canExpandRows: boolean,
  hooks: Hooks<T>,
  toggleAllRowsExpanded: (value?: boolean | undefined) => void,
) => {
  if (!canExpandRows) return;

  const toggleRows = (row: RowWithExpansion<object>, expanded: boolean) => {
    toggleAllRowsExpanded(false);
    row.toggleRowExpanded();

    if (expanded) {
      row.toggleRowExpanded(false);
    }
  };

  hooks.visibleColumns.push((columns) => [
    {
      expander: true,
      id: "expander",
      Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }: any) => {
        return (
          <span
            className="toggle-expand-all-rows"
            data-testid="expand-all-rows"
            {...getToggleAllRowsExpandedProps()}
          >
            {isAllRowsExpanded ? (
              <Icon data-cy="allRowsCollapser" icon="chevron-down" />
            ) : (
              <Icon data-cy="allRowsExpander" icon="chevron-right" />
            )}
          </span>
        );
      },
      Cell: ({ row }: any) => (
        <React.Fragment key={`checkbox-${{ row }.row.index}`}>
          {row.isExpanded ? (
            <Icon
              data-cy="rowCollapser"
              icon="chevron-down"
              onClick={() => toggleRows(row, true)}
            />
          ) : (
            <Icon
              data-cy="rowExpander"
              icon="chevron-right"
              onClick={() => toggleRows(row, false)}
            />
          )}
        </React.Fragment>
      ),
    },
    ...columns,
  ]);
};
