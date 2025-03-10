/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { ToggleSwitch } from "@spark-design/react";
import { ToggleSwitchSize } from "@spark-design/tokens";
import {
  selectIsGlobalSbFdeActive,
  setIsGlobalSbFdeActive,
} from "../../../../store/configureHost";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import "./GlobalSecuritySwitch.scss";

export const dataCy = "globalSecuritySwitch";
export interface GlobalSecuritySwitchProps {
  value?: boolean;
  onChange?: (sbFdeEnabled: boolean) => void;
}
export const GlobalSecuritySwitch = ({
  value,
  onChange,
}: GlobalSecuritySwitchProps) => {
  const cy = { "data-cy": dataCy };

  const isGlobalSbFdeActive = useAppSelector(selectIsGlobalSbFdeActive);
  const dispatch = useAppDispatch();

  return (
    <div {...cy} className="global-security-switch">
      <ToggleSwitch
        name="globalSecurity"
        data-cy="globalSecuritySwitchToggle"
        isSelected={value}
        onChange={(isSelected) => {
          dispatch(setIsGlobalSbFdeActive(true));
          onChange?.(isSelected);
        }}
        size={ToggleSwitchSize.Medium}
      >
        {value ? "Enabled" : "Disabled"} for{" "}
        {isGlobalSbFdeActive ? "All" : "Some"} Hosts
      </ToggleSwitch>
    </div>
  );
};
