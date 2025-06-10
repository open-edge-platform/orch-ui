/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import { SharedStorage } from "@orch-ui/utils";
import { debounce } from "lodash";
import { useCallback, useMemo, useState } from "react";
import {
  AutocompleteNode,
  buildNodeTree,
} from "../../../molecules/LocationAutocomplete/location-autocomplete";
import LocationAutocomplete from "../../../molecules/LocationAutocomplete/LocationAutocomplete";

interface SiteSearchProps {
  placeholder?: string;
  label?: string;
  isRequired?: boolean;
  onSiteSelect: (selectedSite: AutocompleteNode | null) => void;
}

export const SiteSearch = ({
  onSiteSelect,
  placeholder = "Select a site",
  label = "Site",
  isRequired = false,
}: SiteSearchProps) => {
  const projectName = SharedStorage.project?.name ?? "";
  const [searchTerm, setSearchTerm] = useState<string | undefined>();

  const canSearch = searchTerm !== undefined && searchTerm.length > 0;

  const { data } = infra.useGetV1ProjectsByProjectNameLocationsQuery(
    {
      projectName,
      name: searchTerm,
      showRegions: true,
      showSites: true,
    },
    { skip: !canSearch || !projectName },
  );

  const nodes = useMemo(() => {
    if (!data?.nodes) return [];

    const nodeTree = buildNodeTree(data.nodes);

    return Array.from(nodeTree.values()).filter(
      (node) => node.path && node.type === "RESOURCE_KIND_SITE",
    );
  }, [data]);

  const handleNodeSelect = (selectedNode: AutocompleteNode | null) => {
    onSiteSelect(selectedNode);
  };

  const debouncedSetSearchTerm = useCallback(
    debounce((value: string) => {
      setSearchTerm(value);
    }, 200),
    [setSearchTerm],
  );

  const handleInputChange = (value: string) => {
    debouncedSetSearchTerm(value);
  };

  return (
    <LocationAutocomplete
      nodes={nodes}
      onNodeSelect={handleNodeSelect}
      onInputChange={handleInputChange}
      placeholder={placeholder}
      label={label}
      isRequired={isRequired}
    />
  );
};

export default SiteSearch;
