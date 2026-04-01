/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import { SharedStorage } from "@orch-ui/utils";
import { useMemo, useState } from "react";
import {
  AutocompleteNode,
  buildNodeTree,
} from "../../../molecules/LocationAutocomplete/location-autocomplete";
import LocationAutocompleteReactAria from "../../../molecules/LocationAutocompleteReactAria/LocationAutocompleteReactAria";

interface SiteSearchProps {
  placeholder?: string;
  label?: string;
  isRequired?: boolean;
  defaultInputValue?: string;
  onSiteSelect: (selectedSite: AutocompleteNode | null) => void;
}

export const SiteSearch = ({
  onSiteSelect,
  placeholder = "Search",
  label = "Site",
  isRequired = false,
  defaultInputValue = "",
}: SiteSearchProps) => {
  const projectName = SharedStorage.project?.name ?? "";
  const [searchTerm, setSearchTerm] = useState<string>(defaultInputValue);

  // Fetch locations filtered by search term
  const { data } = infra.useLocationServiceListLocationsQuery(
    {
      projectName,
      name: searchTerm || undefined,
      showRegions: true,
      showSites: true,
    },
    { skip: !searchTerm || !projectName },
  );

  const nodes = useMemo(() => {
    if (!data?.nodes) return [];

    const nodeTree = buildNodeTree(data.nodes);

    return Array.from(nodeTree.values()).filter(
      (node) => node.path && node.type === "RESOURCE_KIND_SITE",
    );
  }, [data]);

  const handleSelect = (selectedNode: AutocompleteNode | null) => {
    onSiteSelect(selectedNode);
  };

  const handleInputChange = (value: string) => {
    setSearchTerm(value);
  };

  return (
    <LocationAutocompleteReactAria
      nodes={nodes}
      onSelect={handleSelect}
      onInputChange={handleInputChange}
      defaultInputValue={defaultInputValue}
      placeholder={placeholder}
      label={label}
      isRequired={isRequired}
    />
  );
};

export default SiteSearch;
