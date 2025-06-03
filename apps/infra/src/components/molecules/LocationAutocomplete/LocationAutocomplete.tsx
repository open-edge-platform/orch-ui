/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { Combobox, Item, Text } from "@spark-design/react";
import { useMemo, useState } from "react";
import Highlighter from "react-highlight-words";
import { AutocompleteNode } from "./location-autocomplete";
import "./LocationAutocomplete.scss";

interface HierarchicalAutocompleteProps {
  nodes: AutocompleteNode[];
  onNodeSelect?: (selectedNode: AutocompleteNode | null) => void;
  placeholder?: string;
  label?: string;
  isRequired?: boolean;
}

const dataCy = "location-autocomplete";

export const LocationAutocomplete = ({
  nodes,
  onNodeSelect,
  placeholder = "Select a location",
  label = "Location",
  isRequired = false,
}: HierarchicalAutocompleteProps) => {
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
        setInputValue(node.path?.join(" | ") ?? node.name);
      }
    } else {
      setInputValue("");
    }

    if (onNodeSelect) {
      onNodeSelect(node || null);
    }
  };

  return (
    <div className="hierarchical-autocomplete" data-cy={dataCy}>
      <Combobox
        label={label}
        inputValue={inputValue}
        onInputChange={setInputValue}
        onSelectionChange={handleSelectionChange}
        menuTrigger="input"
        placeholder={placeholder}
        isRequired={isRequired}
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
