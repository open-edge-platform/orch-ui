/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { Badge, Button } from "@spark-design/react";
import { ButtonSize } from "@spark-design/tokens";
import { useEffect, useRef, useState } from "react";

import "./MultiSelectDropdown.scss";

export const defaultCy = "multiSelectDropdown";
export interface MultiSelectDropdownProps {
  dataCy?: string;
  label: string;
  pluralLabel?: string;
  /** all available options (initial/modified) */
  selectOptions: MultiDropdownOption[];
  /** Gives all available `options` with the update on `option.isSelected` */
  onSelectionChange: (options: MultiDropdownOption[]) => void;
}

// TODO: To be moved into components.utils
export interface MultiDropdownOption {
  id: string;
  text: string;
  isSelected: boolean;
}

// TODO: To be moved into components.utils
const MultiSelectDropdown = ({
  label,
  pluralLabel,
  selectOptions,
  onSelectionChange,
  dataCy,
}: MultiSelectDropdownProps) => {
  const cy = { "data-cy": dataCy ?? defaultCy };

  const ref = useRef<HTMLUListElement>(null);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  useEffect(() => {
    document.addEventListener("mousedown", (e) => {
      // Check if the click is outside of this (dropdown) component
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    });
  }, []);

  return (
    <div {...cy} className="multi-select-dropdown lp-multi-dropdown">
      <div className="spark-dropdown spark-dropdown-primary spark-dropdown-size-l">
        <div className="spark-fieldtext-wrapper">
          <label className="spark-fieldlabel spark-fieldlabel-size-l">
            {label}
          </label>
          <Button
            variant="action"
            size={ButtonSize.Medium}
            className="spark-dropdown-button spark-focus-visible spark-focus-visible-self spark-focus-visible-snap"
            onPress={() => {
              setShowDropdown(!showDropdown);
            }}
          >
            <span className="spark-button-content">
              <span className="spark-dropdown-button-label spark-dropdown-button-label-is-selected">
                <Badge
                  shape="square"
                  text={`${selectOptions
                    .filter((option) => option.isSelected)
                    .length.toString()}x`}
                />{" "}
                <span className="pal-1">{pluralLabel || `${label}s`}</span>
              </span>
            </span>
            <span className="spark-icon spark-icon-chevron-down spark-icon-regular spark-dropdown-arrow-icon"></span>
          </Button>
        </div>
      </div>

      {showDropdown && (
        <div className="dropdown-list" data-cy="dropdownList">
          <div className="spark-popover spark-shadow">
            <div className="spark-scrollbar spark-scrollbar-y spark-focus-visible spark-focus-visible-self spark-focus-visible-snap spark-dropdown-list-box-scroll">
              <ul
                className="spark-list spark-list-size-l spark-dropdown-list-box spark-dropdown-primary pad-scrollbar"
                ref={ref}
              >
                <li
                  key="__all"
                  data-key={"__all"}
                  className="spark-list-item"
                  onClick={() => {
                    if (
                      selectOptions.length ===
                      selectOptions.filter((option) => option.isSelected).length
                    ) {
                      onSelectionChange(
                        selectOptions.map((option) => ({
                          ...option,
                          isSelected: false,
                        })),
                      );
                    } else {
                      onSelectionChange(
                        selectOptions.map((option) => ({
                          ...option,
                          isSelected: true,
                        })),
                      );
                    }
                  }}
                >
                  <div className="spark-list-item-text">
                    <input
                      type="checkbox"
                      checked={
                        selectOptions.length ===
                        selectOptions.filter((option) => option.isSelected)
                          .length
                      }
                    />{" "}
                    Select All
                  </div>
                </li>
                {selectOptions.map((option) => (
                  <li
                    key={option.id.toString()}
                    data-key={option.id.toString()}
                    className="spark-list-item"
                    onClick={() => {
                      onSelectionChange(
                        selectOptions.map((day) =>
                          option.id === day.id
                            ? {
                                ...option,
                                isSelected: !option.isSelected,
                              }
                            : day,
                        ),
                      );
                    }}
                  >
                    <div className="spark-list-item-text">
                      <input type="checkbox" checked={option.isSelected} />{" "}
                      {option.text}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
