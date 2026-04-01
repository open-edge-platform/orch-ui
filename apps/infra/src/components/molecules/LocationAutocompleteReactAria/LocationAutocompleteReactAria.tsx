/*
 * SPDX-FileCopyrightText: (C) 2025 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useMemo, useRef } from "react";
import {
  useComboBox,
  useFilter,
  useListBox,
  useOption,
  usePopover,
} from "react-aria";
import Highlighter from "react-highlight-words";
import { Item, useComboBoxState } from "react-stately";
import { AutocompleteNode } from "../LocationAutocomplete/location-autocomplete";
import "./LocationAutocompleteReactAria.scss";

interface LocationAutocompleteReactAriaProps {
  nodes: AutocompleteNode[];
  placeholder?: string;
  label?: string;
  isRequired?: boolean;
  defaultInputValue?: string;
  onSelect?: (selectedNode: AutocompleteNode | null) => void;
  onInputChange?: (value: string) => void;
}

const dataCy = "locationAutocompleteReactAria";

interface OptionProps {
  item: any;
  state: any;
  inputValue: string;
}

function Option({ item, state, inputValue }: OptionProps) {
  const ref = useRef<HTMLLIElement>(null);
  const { optionProps, isSelected, isFocused } = useOption(
    { key: item.key },
    state,
    ref,
  );

  return (
    <li
      {...optionProps}
      ref={ref}
      className={`location-autocomplete-react-aria__item ${
        isSelected ? "selected" : ""
      } ${isFocused ? "focused" : ""}`}
    >
      <Highlighter
        highlightClassName="highlighted"
        searchWords={[inputValue.trim()]}
        autoEscape={true}
        textToHighlight={item.textValue as string}
      />
    </li>
  );
}

export const LocationAutocompleteReactAria = ({
  nodes,
  placeholder = "Select a location",
  label = "Location",
  isRequired = false,
  defaultInputValue = "",
  onSelect,
  onInputChange,
}: LocationAutocompleteReactAriaProps) => {
  console.log("nodes:", nodes);
  const nodeMap = useMemo(
    () => new Map(nodes.map((node) => [node.resourceId, node])),
    [nodes],
  );

  const { contains } = useFilter({ sensitivity: "base" });

  const children = useMemo(
    () =>
      nodes.map((node) => (
        <Item
          key={node.resourceId}
          textValue={node.path?.join(" | ") ?? node.name}
        >
          {node.path?.join(" | ") ?? node.name}
        </Item>
      )),
    [nodes],
  );

  const state = useComboBoxState({
    children,
    defaultFilter: contains,
    defaultInputValue,
    menuTrigger: "input",
    onSelectionChange: (key) => {
      const node = key ? nodeMap.get(key as string) : null;
      if (onSelect) {
        onSelect(node || null);
      }
    },
  });

  // Invoke onInputChange callback when input value changes
  useEffect(() => {
    if (onInputChange) {
      onInputChange(state.inputValue);
    }
  }, [state.inputValue, onInputChange]);

  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listBoxRef = useRef<HTMLUListElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const { buttonProps, inputProps, labelProps } = useComboBox(
    {
      label,
      placeholder,
      isRequired,
      inputRef,
      buttonRef,
      listBoxRef,
      popoverRef,
    },
    state,
  );

  const { listBoxProps: listBoxAriaProps } = useListBox({}, state, listBoxRef);

  const { popoverProps } = usePopover(
    {
      triggerRef: inputRef,
      popoverRef,
      placement: "bottom start",
      isNonModal: true,
    },
    state,
  );

  return (
    <div className="location-autocomplete-react-aria" data-cy={dataCy}>
      {label && <label {...labelProps}>{label}</label>}
      <div className="location-autocomplete-react-aria__input-group">
        <input
          {...inputProps}
          ref={inputRef}
          placeholder={placeholder}
          className="location-autocomplete-react-aria__input"
        />
        <button
          {...buttonProps}
          ref={buttonRef}
          className="location-autocomplete-react-aria__button"
        >
          ▼
        </button>
      </div>
      {state.isOpen && (
        <div
          {...popoverProps}
          ref={popoverRef}
          className="location-autocomplete-react-aria__popover"
        >
          <ul
            {...listBoxAriaProps}
            ref={listBoxRef}
            className="location-autocomplete-react-aria__listbox"
          >
            {state.collection.size > 0 ? (
              Array.from(state.collection).map((item) => (
                <Option
                  key={item.key}
                  item={item}
                  state={state}
                  inputValue={state.inputValue}
                />
              ))
            ) : (
              <li className="location-autocomplete-react-aria__no-results">
                No locations found
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LocationAutocompleteReactAria;
