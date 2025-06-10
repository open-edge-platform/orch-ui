/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { eim } from "@orch-ui/apis";
import {
  CheckboxSelectionList,
  CheckboxSelectionOption,
  Flex,
} from "@orch-ui/components";
import { SharedStorage } from "@orch-ui/utils";
import { Button, ButtonGroup, Icon } from "@spark-design/react";
import { ButtonVariant } from "@spark-design/tokens";
import { useEffect, useRef, useState } from "react";
import {
  AggregatedStatus,
  LifeCycleState,
  buildFilterNew,
} from "../../../store/hostFilterBuilder";
import "./HostSearchFilters.scss";

const dataCy = "hostSearchFilters";

interface HostSearchFiltersProps {
  lifeCycleState: LifeCycleState;
  onFilterChange: (filters: {
    statuses?: AggregatedStatus[];
    osProfiles?: string[];
    lifeCycleState?: LifeCycleState;
  }) => void;
}

const HostSearchFilters = ({ lifeCycleState, onFilterChange }: HostSearchFiltersProps) => {
  const cy = { "data-cy": dataCy };

    const [localLifeCycleState, setLocalLifeCycleState] = useState<LifeCycleState>(lifeCycleState);

  const reassignFilterState = () => {
    return [
      "Ready",
      "InProgress",
      "Error",
      "Unknown",
      ...(lifeCycleState === LifeCycleState.All ? ["Deauthorized"] : []),
    ].map((name) => ({
      id: name,
      name,
      isSelected: false,
    }));
  };

  const [statusSelections, setStatusSelection] = useState<CheckboxSelectionOption[]>(reassignFilterState());
  const [osProfileSelections, setOsProfileSelection] = useState<CheckboxSelectionOption[]>([]);

  useEffect(() => {
    setStatusSelection(reassignFilterState());
  }, [lifeCycleState]);

  const [showFilter, setShowFilter] = useState<boolean>(false);
  const ribbonFilterRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        ribbonFilterRef.current &&
        !ribbonFilterRef.current.contains(e.target as Node)
      ) {
        setShowFilter(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Update OS profiles options by api response
  const { data: osProfiles, isSuccess: isOSSuccess } =
    eim.useGetV1ProjectsByProjectNameComputeOsQuery(
      {
        projectName: SharedStorage.project?.name ?? "",
      },
      { skip: !SharedStorage.project?.name },
    );

  // Initialize OS Profile selection list
  useEffect(() => {
    if (osProfiles && isOSSuccess) {
      setOsProfileSelection(
        osProfiles.OperatingSystemResources?.map((os) => ({
          id: os.profileName!,
          name: os.name ?? os.profileName!,
          isSelected:
            // See previous value or set default false
            osProfileSelections.find((prevOs) => os.profileName === prevOs.id)
              ?.isSelected || false,
        })) ?? [],
      );
    }
  }, [osProfiles]);

  /** Set isSelected to false across all selection */
  const resetFilters = () => {
    setOsProfileSelection(
      osProfileSelections.map((osProfiles) => ({
        ...osProfiles,
        isSelected: false,
      })),
    );
    setStatusSelection(
      statusSelections.map((status) => ({
        ...status,
        isSelected: false,
      })),
    );
    setLocalLifeCycleState(LifeCycleState.All);
    setShowFilter(false);
  };

  const applyFilters = () => {
    const selectedOs = osProfileSelections.filter((os) => os.isSelected).map((os) => os.id);
    const selectedStatus = statusSelections
      .filter((status) => status.isSelected)
      .map((status) => AggregatedStatus[status.id as keyof typeof AggregatedStatus]);
    const filter = buildFilterNew({
      lifeCycleState: localLifeCycleState,
      statuses: selectedStatus.length > 0 ? selectedStatus : undefined,
      osProfiles: selectedOs.length > 0 ? selectedOs : undefined,
    });
    setShowFilter(false);
    onFilterChange({
  statuses: selectedStatus.length > 0 ? selectedStatus : undefined,
  osProfiles: selectedOs.length > 0 ? selectedOs : undefined,
});
  };

  return (
    <div {...cy} className="host-search-filters">
      <Button
        iconOnly
        className="host-search-filters__button"
        variant={ButtonVariant.Ghost}
        onPress={() => setShowFilter(!showFilter)}
        data-cy="filterButton"
      >
        <Icon icon="filter" />
      </Button>

      {showFilter && (
        <div ref={ribbonFilterRef} className="host-search-filters__content">
          <Flex cols={[6]}>
            <div data-cy="statusCheckboxList">
              <CheckboxSelectionList
                label="Status"
                options={statusSelections}
                onSelectionChange={(selection, isSelected) => {
                  setStatusSelection((prev) => {
                    return prev.map((status) => {
                      if (status.id === selection)
                        return { id: selection, name: status.name, isSelected };
                      return status;
                    });
                  });
                }}
              />
            </div>
            <div data-cy="osProfilesCheckboxList">
              <CheckboxSelectionList
                label="OS Profiles"
                options={osProfileSelections}
                onSelectionChange={(selection, isSelected) => {
                  setOsProfileSelection((prev) => {
                    return prev.map((osProfile) => {
                      if (osProfile.id === selection)
                        return {
                          id: selection,
                          name: osProfile.name,
                          isSelected,
                        };
                      return osProfile;
                    });
                  });
                }}
              />
            </div>
          </Flex>
          <ButtonGroup align="end">
            <Button
              onPress={resetFilters}
              variant={ButtonVariant.Secondary}
              data-cy="resetFiltersBtn"
            >
              Reset filter
            </Button>
            <Button
              onPress={applyFilters}
              variant={ButtonVariant.Action}
              data-cy="applyFiltersBtn"
            >
              Apply filters
            </Button>
          </ButtonGroup>
        </div>
      )}
    </div>
  );
};

export default HostSearchFilters;
