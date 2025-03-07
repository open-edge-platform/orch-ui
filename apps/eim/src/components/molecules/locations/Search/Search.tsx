/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { eim, eimSlice } from "@orch-ui/apis";
import { SharedStorage } from "@orch-ui/utils";
import { Button, Dropdown, Item, TextField } from "@spark-design/react";
import {
  ButtonSize,
  ButtonVariant,
  DropdownSize,
  InputSize,
} from "@spark-design/tokens";
import _debounce from "lodash/debounce";
import { Key, useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  SearchTypes,
  selectSearchTerm,
  selectSearchType,
  setIsLoadingTree,
  setNodesSearchResults,
  setSearchTerm,
  setSearchType,
} from "../../../../store/locations";
import "./Search.scss";
export const dataCy = "search";
export interface SearchTypeItem {
  id: string;
  name: string;
}
export interface SearchProps {
  searchTypes: SearchTypeItem[];
  defaultSearchType: SearchTypeItem;
  popoverWidth?: string;
  debounceTime?: number;
}

export const Search = ({
  searchTypes,
  popoverWidth = "200px",
  debounceTime = 1000,
}: SearchProps) => {
  const cy = { "data-cy": dataCy };
  const className = "search";
  const dispatch = useAppDispatch();
  const searchTerm = useAppSelector(selectSearchTerm);
  const searchType = useAppSelector(selectSearchType);
  const [localSearchTerm, setLocalSearchTerm] = useState<string>(
    searchTerm ?? "",
  );
  const canSearch = searchTerm !== undefined && searchTerm.length > 0;

  const handleOnChange = useCallback(
    _debounce((value: string) => {
      //get rid of cache, about to create new tree
      dispatch(eimSlice.util.resetApiState());
      if (value.length > 1) dispatch(setSearchTerm(value));
      else {
        dispatch(setSearchTerm(undefined));
      }
    }, debounceTime),
    [],
  );

  const handleOnSelectionChange = (key: Key) => {
    const result = searchTypes.find((item) => item.id === key)!;
    dispatch(eim.eim.util.invalidateTags([{ type: "Location" }]));
    dispatch(setSearchType(result.id as SearchTypes));
  };

  const shouldShowRegions =
    searchType === SearchTypes.All || searchType === SearchTypes.Regions;
  const shouldShowSites =
    searchType === SearchTypes.All || searchType === SearchTypes.Sites;
  const projectName = SharedStorage.project?.name ?? "";
  const { data: searchResults, isFetching } =
    eim.useGetV1ProjectsByProjectNameLocationsQuery(
      {
        projectName,
        name: searchTerm,
        showRegions: shouldShowRegions,
        showSites: shouldShowSites,
      },
      { skip: !canSearch || !projectName },
    );

  useEffect(() => {
    setLocalSearchTerm(searchTerm ?? "");
  }, [searchTerm]);

  useEffect(() => {
    if (isFetching) {
      dispatch(setIsLoadingTree(true));
      return;
    }
    if (!isFetching && searchResults && searchTerm) {
      dispatch(setNodesSearchResults(searchResults.nodes));
    }
  }, [isFetching]);

  return (
    <div {...cy} className={className}>
      <TextField
        startIcon="magnifier"
        placeholder="Search"
        className={`${className}__text-field`}
        size={InputSize.Large}
        data-cy="textField"
        onChange={(value) => {
          setLocalSearchTerm(value);
          handleOnChange(value);
        }}
        value={localSearchTerm}
        interiorButton={canSearch}
        interiorButtonIcon="cross"
        interiorButtonOnPress={() => {
          setLocalSearchTerm("");
          dispatch(eimSlice.util.resetApiState());
          dispatch(setSearchTerm(undefined));
        }}
      />
      <Button
        className={`${className}__button`}
        data-cy="button"
        size={ButtonSize.Large}
        isMonochrome
        variant={ButtonVariant.Secondary}
        onPress={() => {
          if (!canSearch) return;
          dispatch(eim.eim.util.invalidateTags([{ type: "Location" }]));
          dispatch(setSearchTerm(searchTerm));
        }}
      >
        {searchType}
      </Button>
      <Dropdown
        className={`${className}__dropdown`}
        size={DropdownSize.Large}
        data-cy="dropdown"
        label=""
        name="Search Type"
        placeholder="Select a type"
        selectedKey={null}
        popoverInlineSize={popoverWidth}
        onSelectionChange={handleOnSelectionChange}
      >
        {searchTypes.map((item) => (
          <Item data-cy="dropdownItem" key={item.id}>
            {item.name}
          </Item>
        ))}
      </Dropdown>
    </div>
  );
};
