/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { Combobox, Item, Text } from "@spark-design/react";
import { InputSize } from "@spark-design/tokens";
import { useMemo, useState } from "react";
import Highlighter from "react-highlight-words";
import { AutocompleteNode } from "./location-autocomplete";
import "./LocationAutocomplete.scss";

interface LocationAutocompleteProps {
  nodes: AutocompleteNode[];
  placeholder?: string;
  label?: string;
  isRequired?: boolean;
  onNodeSelect?: (selectedNode: AutocompleteNode | null) => void;
  onInputChange?: (value: string) => void;
}

const dataCy = "location-autocomplete";

export const LocationAutocomplete = ({
  nodes,
  placeholder = "Select a location",
  label = "Location",
  isRequired = false,
  onNodeSelect,
  onInputChange,
}: LocationAutocompleteProps) => {
  const [inputValue, setInputValue] = useState("");

  const nodeMap = useMemo(
    () => new Map(nodes.map((node) => [node.resourceId, node])),
    [nodes],
  );

  const filteredNodes = useMemo(() => {
    if (!inputValue.trim()) return nodes;

    const lowerCaseInput = inputValue.toLowerCase();
    return nodes.filter((node) => {
      if (node.name.toLowerCase().includes(lowerCaseInput)) return true;

      const fullPath = node.path?.join(" | ").toLowerCase() ?? "";
      return fullPath.includes(lowerCaseInput);
    });
  }, [inputValue, nodes]);

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

    if (onNodeSelect) {
      onNodeSelect(node || null);
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
      >
        {filteredNodes.length > 0 ? (
          filteredNodes.map((node) => {
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
