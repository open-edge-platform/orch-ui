/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { RadioButton, RadioGroup } from "@spark-design/react";
import { RadioButtonSize } from "@spark-design/tokens";
import { useEffect, useState } from "react";

const dataCy = "advancedSettingsToggle";
interface AdvancedSettingsToggleProps {
  message?: string;
  value?: boolean; // defaults to false
  onChange: (v: boolean) => void;
}
export const AdvancedSettingsToggle = ({
  message = "Do you want to make changes to the advanced settings?",
  value = false,
  onChange,
}: AdvancedSettingsToggleProps) => {
  const cy = { "data-cy": dataCy };

  const [innerValue, setInnerValue] = useState<boolean>(value ?? false);

  useEffect(() => {
    setInnerValue(value ?? false);
  }, [value]);

  return (
    <div {...cy} className="advanced-settings-toggle">
      <RadioGroup
        label={message}
        orientation="horizontal"
        defaultValue={value ? "true" : "false"}
        value={innerValue ? "true" : "false"}
        size={RadioButtonSize.Large}
        onChange={(v) => {
          setInnerValue(v === "true");
          onChange(v === "true");
        }}
      >
        <RadioButton value="true" data-cy="advSettingsTrue">
          yes
        </RadioButton>
        <RadioButton value="false" data-cy="advSettingsFalse">
          no
        </RadioButton>
      </RadioGroup>
    </div>
  );
};
