/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { Combobox, Item, Text } from "@spark-design/react";
import { useMemo, useState } from "react";
import { AutocompleteNode } from "./hierarchical-autocomplete.utils";
import "./HierarchicalAutocomplete.scss";

interface HierarchicalAutocompleteProps {
  nodes: AutocompleteNode[];
  onNodeSelect?: (selectedNode: AutocompleteNode | null) => void;
  placeholder?: string;
  label?: string;
  isRequired?: boolean;
}

const dataCy = "hierarchical-autocomplete";

export const HierarchicalAutocomplete = ({
  nodes,
  onNodeSelect,
  placeholder = "Select a location",
  label = "Location",
  isRequired = false,
}: HierarchicalAutocompleteProps) => {
  const [inputValue, setInputValue] = useState("");

  const nodeMap = useMemo(() => {
    const map = new Map<string, AutocompleteNode>();
    nodes.forEach((node) => {
      map.set(node.resourceId, node);
    });
    return map;
  }, [nodes]);

  const filteredNodes = useMemo(() => {
    if (!inputValue.trim()) return nodes;

    const lowerCaseInput = inputValue.toLowerCase();
    return nodes.filter((node) => {
      if (node.name.toLowerCase().includes(lowerCaseInput)) return true;

      const fullPath = node.path?.join(" | ").toLowerCase() || "";
      return fullPath.includes(lowerCaseInput);
    });
  }, [inputValue, nodes]);

  const handleSelectionChange = (resourceId: string | null) => {
    let node: AutocompleteNode | undefined;

    if (resourceId && nodeMap.has(resourceId)) {
      node = nodeMap.get(resourceId);
      if (node) {
        setInputValue(node.path?.join(" | ") || node.name);
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
        menuTrigger="focus"
        placeholder={placeholder}
        isRequired={isRequired}
      >
        {filteredNodes.length > 0 ? (
          filteredNodes.map((node) => (
            <Item
              key={node.resourceId}
              textValue={node.path?.join(" | ") || node.name}
            >
              {node.path?.join(" | ") || node.name}
            </Item>
          ))
        ) : (
          <Item key="no-results" textValue="No locations found">
            <Text>No locations found</Text>
          </Item>
        )}
      </Combobox>
    </div>
  );
};

export default HierarchicalAutocomplete;
