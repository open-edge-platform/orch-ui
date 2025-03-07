/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { eim } from "@orch-ui/apis";
import { Dropdown, Item } from "@spark-design/react";
import { DropdownSize } from "@spark-design/tokens";
import "./SecurityDropdown.scss";
export const dataCy = "securityDropdown";

export type SecurityOptions = [eim.SecurityFeature | string, string][];
export interface SecurityDropdownProps {
  options: SecurityOptions;
  value?: string;
  isDisabled?: boolean;
  onSelectionChange?: (bootOption: string) => void;
}
export const SecurityDropdown = ({
  options,
  value,
  isDisabled = false,
  onSelectionChange,
}: SecurityDropdownProps) => {
  const cy = { "data-cy": dataCy };

  return (
    <div {...cy} className="security-dropdown">
      <Dropdown
        label=""
        name="security"
        data-cy="security"
        isDisabled={isDisabled || value === ""}
        placeholder=""
        size={DropdownSize.Medium}
        selectedKey={value}
        onSelectionChange={(key) => onSelectionChange?.(key.toString())}
        isRequired
      >
        {options.map((option) => {
          const [key, value] = option;
          return (
            <Item key={key} aria-label={value}>
              {value}
            </Item>
          );
        })}
      </Dropdown>
    </div>
  );
};
