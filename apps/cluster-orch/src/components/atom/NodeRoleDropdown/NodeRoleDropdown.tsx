/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { Dropdown, Item } from "@spark-design/react";
import { useEffect, useState } from "react";
import "./NodeRoleDropdown.scss";

const dataCy = "nodeRoleDropdown";

interface NodeRoleDropdownProps {
  role: string;
  disable?: boolean;
  onSelect?: (selected: string) => void;
}

const NodeRoleDropdown = ({
  role,
  disable,
  onSelect,
}: NodeRoleDropdownProps) => {
  const cy = { "data-cy": dataCy };

  const [value, setValue] = useState("all");

  // Update if role is changed due to external factors
  useEffect(() => {
    setValue(role);
  }, [role]);

  const roleFormat = (role: string) => {
    switch (role) {
      case "controlplane":
        return "Control Plane";
      case "worker":
        return "Worker";
    }
    return "All";
  };

  return (
    <div {...cy} className="node-role-dropdown">
      <Dropdown
        data-cy="roleDropdown"
        label="role"
        variant="ghost"
        validationState="valid"
        name="role"
        selectedKey={value ?? "all"}
        onSelectionChange={(selectedValue) => {
          const newValue = selectedValue?.toString() ?? "all";
          setValue(newValue);
          if (onSelect) onSelect(newValue);
        }}
        isDisabled={disable}
        placeholder={role.length > 0 ? roleFormat(role) : "All"}
      >
        <Item key="all">All</Item>
        <Item key="controlplane">Control Plane</Item>
        <Item key="worker">Worker</Item>
      </Dropdown>
    </div>
  );
};

export default NodeRoleDropdown;
