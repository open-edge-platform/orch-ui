/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { Dropdown, Item } from "@spark-design/react";
import { DropdownSize } from "@spark-design/tokens";
import { SecurityOptions } from "../SecurityDropdown/SecurityDropdown";
import "./GlobalSecurityDropdown.scss";
export const dataCy = "globalSecurityDropdown";
export interface GlobalSecurityDropdownProps {
  isDisabled?: boolean;
  value?: string;
  onSelectionChange?: (bootOption: string) => void;
}
export const GlobalSecurityDropdown = ({
  isDisabled = false,
  value,
  onSelectionChange,
}: GlobalSecurityDropdownProps) => {
  const cy = { "data-cy": dataCy };

  const options: SecurityOptions = [
    ["SECURITY_FEATURE_SECURE_BOOT_AND_FULL_DISK_ENCRYPTION", "Enable All"],
    ["SECURITY_FEATURE_NONE", "Disable All"],
  ];

  return (
    <div {...cy} className="global-security-dropdown">
      <Dropdown
        label=""
        name="globalSecurity"
        isDisabled={isDisabled}
        placeholder="Select security configuration"
        size={DropdownSize.Medium}
        selectedKey={value}
        onSelectionChange={(key) => onSelectionChange?.(key.toString())}
        isRequired
      >
        {options.map((option) => {
          const [key, value] = option;
          return <Item key={key}>{value}</Item>;
        })}
      </Dropdown>
    </div>
  );
};
