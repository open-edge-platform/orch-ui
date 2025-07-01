/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { Combobox, IComboboxProps, Item, Text } from "@spark-design/react";
import { InputSize } from "@spark-design/tokens";
import { useMemo, useState } from "react";
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
}

const dataCy = "location-autocomplete";

export const LocationAutocomplete = ({
  nodes,
  placeholder = "Select a location",
  label = "Location",
  isRequired = false,
  onSelect,
  onInputChange,
  ...comboboxProps
}: LocationAutocompleteProps) => {
  const [inputValue, setInputValue] = useState("");

  const nodeMap = useMemo(
    () => new Map(nodes.map((node) => [node.resourceId, node])),
    [nodes],
  );

  const handleSelectionChange = (resourceId: string | null) => {
    let node: AutocompleteNode | undefined;

    if (resourceId && nodeMap.has(resourceId)) {
      node = nodeMap.get(resourceId);
      if (node) {
        setInputValue(node.name);
      }
    } else {
      setInputValue("");
    }

    if (onSelect) {
      onSelect(node || null);
    }
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
    if (onInputChange) {
      onInputChange(value);
    }
  };

  return (
    <div className="location-autocomplete" data-cy={dataCy}>
      <Combobox
        label={label}
        onInputChange={handleInputChange}
        onSelectionChange={handleSelectionChange}
        menuTrigger="input"
        placeholder={placeholder}
        isRequired={isRequired}
        size={InputSize.Large}
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
  );
};

export default LocationAutocomplete;
