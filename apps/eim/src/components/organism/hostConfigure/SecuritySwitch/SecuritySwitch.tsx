/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { ToggleSwitch } from "@spark-design/react";
import { ToggleSwitchSize } from "@spark-design/tokens";
import "./SecuritySwitch.scss";

export const dataCy = "securitySwitch";

export interface SecuritySwitchProps {
  value?: boolean;
  onChange?: (sbFdeEnabled: boolean) => void;
}
export const SecuritySwitch = ({ value, onChange }: SecuritySwitchProps) => {
  const cy = { "data-cy": dataCy };

  return (
    <div {...cy} className="security-switch">
      <ToggleSwitch
        name="security"
        data-cy="securitySwitchToggle"
        isSelected={value}
        onChange={onChange}
        size={ToggleSwitchSize.Medium}
      >
        {value ? "Enabled" : "Disabled"}
      </ToggleSwitch>
    </div>
  );
};
