/*
 * SPDX-FileCopyrightText: (C) 2024 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { TextField, Tooltip } from "@spark-design/react";
import { InputSize } from "@spark-design/tokens";
import { useRef } from "react";
import "./TableRibbon.scss";

export interface TableRibbonProps {
  searchTooltip?: string;
  searchTerm?: string;
  actionsJsx?: JSX.Element;
  onSearch?: (searchTerm: string) => void;
}
export const TableRibbon = ({
  searchTooltip,
  searchTerm,
  actionsJsx,
  onSearch,
}: TableRibbonProps) => {
  const debounce = useRef<NodeJS.Timeout>(setTimeout(() => {}, 0));

  const jsx = (
    <>
      <TextField
        data-cy="search"
        aria-label="search table"
        type="search"
        startIcon="magnifier"
        placeholder="Search"
        defaultValue={searchTerm}
        onChange={(value: string) => {
          clearTimeout(debounce.current);
          debounce.current = setTimeout(() => {
            if (onSearch) onSearch(value);
          }, 500);
        }}
        size={InputSize.Large}
      />
      {actionsJsx && (
        <div className="table-ribbon-actions" data-cy="actions">
          {actionsJsx}
        </div>
      )}
    </>
  );

  return (
    <div className="table-ribbon">
      {searchTooltip ? (
        <Tooltip
          className="tooltip"
          content={searchTooltip}
          placement="top"
          data-cy="searchTooltip"
        >
          {jsx}
        </Tooltip>
      ) : (
        jsx
      )}
    </div>
  );
};
