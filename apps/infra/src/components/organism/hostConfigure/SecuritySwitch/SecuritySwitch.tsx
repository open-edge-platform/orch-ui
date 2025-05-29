/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { ToggleSwitch } from "@spark-design/react";
import { ToggleSwitchSize } from "@spark-design/tokens";

const dataCy = "securitySwitch";

export interface SecuritySwitchProps {
  value?: boolean;
  onChange?: (sbFdeEnabled: boolean) => void;
}
//TODO: remove this component
export const SecuritySwitch = ({ value, onChange }: SecuritySwitchProps) => {
  const cy = { "data-cy": dataCy };

  return (
    <div {...cy} className="security-switch">
      <ToggleSwitch
        name="security"
        data-cy="securitySwitchToggle"
        isSelected={value}
        onChange={onChange}
        size={ToggleSwitchSize.Large}
      >
        {value ? "Enabled" : "Disabled"}
      </ToggleSwitch>
    </div>
  );
};
