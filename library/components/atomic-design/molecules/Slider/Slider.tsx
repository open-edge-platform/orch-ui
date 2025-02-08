/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { NumberField, Text } from "@spark-design/react";
import "./Slider.scss";
export const dataCy = "slider";
export interface SliderProps {
  defaultValue?: number;
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  unit?: string;
}
export const Slider = ({
  defaultValue,
  value,
  onChange,
  min = 0,
  max = 100,
  unit,
}: SliderProps) => {
  const cy = { "data-cy": dataCy };
  return (
    <div {...cy} className="slider">
      <input
        type="range"
        defaultValue={defaultValue ?? 0}
        value={value}
        onMouseUp={(e) => {
          // eslint-disable-next-line no-unused-expressions
          onChange && onChange(parseInt(e.currentTarget.value));
        }}
        min={min}
        max={max}
        data-cy="rangeInput"
      />
      <NumberField
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        minValue={min}
        maxValue={max}
        data-cy="numberInput"
      />
      <Text size="s" data-cy="unitText" className="unit-container">
        {unit ?? ""}
      </Text>
    </div>
  );
};
