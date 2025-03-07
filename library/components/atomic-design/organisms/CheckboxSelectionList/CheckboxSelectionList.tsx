/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { Checkbox, Text } from "@spark-design/react";
import { TextSize } from "@spark-design/tokens";
import "./CheckboxSelectionList.scss";

export const dataCy = "checkboxSelectionList";

export interface CheckboxSelectionOption {
  id: string;
  name: string;
  isSelected?: boolean;
}

interface CheckboxSelectionListProps {
  label: string;
  options: CheckboxSelectionOption[];
  onSelectionChange?: (selection: string, isSelected: boolean) => void;
}

export const CheckboxSelectionList = ({
  label,
  options,
  onSelectionChange,
}: CheckboxSelectionListProps) => {
  const cy = { "data-cy": dataCy };
  const className = "checkbox-selection-list";

  return (
    <div {...cy} className={className}>
      {label && (
        <Text className={`${className}__title`} size={TextSize.Medium}>
          {label}
        </Text>
      )}
      <ol className={`${className}__selection-list`}>
        {options.map((listOption) => {
          return (
            <li
              key={`option__${listOption.id}`}
              className={`${className}__selection-list__option`}
            >
              <label
                htmlFor={`option__${listOption.id}`}
                data-cy={`label${listOption.id}`}
              >
                <Checkbox
                  id={`option__${listOption.id}`}
                  name={`option__${listOption.id}`}
                  onChange={(isSelected) => {
                    if (onSelectionChange)
                      onSelectionChange(listOption.id, isSelected);
                  }}
                  defaultSelected={listOption.isSelected}
                />
                <Text
                  className={`${className}__selection-list__option-text`}
                  size={TextSize.Medium}
                >
                  {listOption.name}
                </Text>
              </label>
            </li>
          );
        })}
      </ol>
    </div>
  );
};
