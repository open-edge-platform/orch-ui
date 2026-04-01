/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Combobox,
  IComboboxProps,
  Icon,
  Item,
  Text,
} from "@spark-design/react";
import { InputSize } from "@spark-design/tokens";
import { useMemo } from "react";
import Highlighter from "react-highlight-words";
import { AutocompleteNode } from "./location-autocomplete";
import "./LocationAutocomplete.scss";

interface LocationAutocompleteProps extends Omit<IComboboxProps, "children"> {
  nodes: AutocompleteNode[];
  placeholder?: string;
  label?: string;
  isRequired?: boolean;
  onSelect?: (selectedNode: AutocompleteNode | null) => void;
  onInputChange?: (value: string) => void;
  inputValue?: string;
}

const dataCy = "location-autocomplete";

export const LocationAutocomplete = ({
  nodes,
  placeholder = "Select a location",
  label = "Location",
  isRequired = false,
  onSelect,
  inputValue = "",
  onInputChange,
  ...comboboxProps
}: LocationAutocompleteProps) => {
  const nodeMap = useMemo(
    () => new Map(nodes.map((node) => [node.resourceId, node])),
    [nodes],
  );

  const handleSelectionChange = (resourceId: string | null) => {
    const node =
      resourceId && nodeMap.has(resourceId)
        ? nodeMap.get(resourceId)
        : undefined;

    if (node && onInputChange) {
      onInputChange(node.name);
    } else if (!resourceId && onInputChange) {
      onInputChange("");
    }

    if (onSelect) {
      onSelect(node || null);
    }
  };

  const handleInputChange = (value: string) => {
    if (onInputChange) {
      onInputChange(value);
    }
  };

  return (
    <div className="location-autocomplete" data-cy={dataCy}>
      <div className="location-autocomplete__input-wrapper">
        <Icon icon="magnifier" className="location-autocomplete__icon" />
        <Combobox
          label={label}
          inputValue={inputValue}
          onInputChange={handleInputChange}
          onChange={handleSelectionChange}
          menuTrigger="input"
          placeholder={placeholder}
          isRequired={isRequired}
          size={InputSize.Large}
          allowsCustomValue
          {...comboboxProps}
          className="location-autocomplete__combobox"
          data-cy="locationCombobox"
        >
          {nodes.length > 0 ? (
            nodes.map((node) => {
              const displayText = node.path?.join(" | ") ?? node.name;
              return (
                <Item key={node.resourceId} textValue={displayText}>
                  <Highlighter
                    highlightClassName="highlighted"
                    searchWords={[inputValue.trim()]}
                    autoEscape={true}
                    textToHighlight={displayText}
                  />
                </Item>
              );
            })
          ) : (
            <Item key="no-results">
              <Text>No locations found</Text>
            </Item>
          )}
        </Combobox>
      </div>
    </div>
  );
};

export default LocationAutocomplete;
