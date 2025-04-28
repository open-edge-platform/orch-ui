/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import {
  CheckboxSelectionList,
  CheckboxSelectionOption,
  Flex,
} from "@orch-ui/components";
import { SharedStorage } from "@orch-ui/utils";
import { Button, ButtonGroup, Icon } from "@spark-design/react";
import { ButtonVariant } from "@spark-design/tokens";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  AggregatedStatus,
  LifeCycleState,
  setOsProfiles,
  setStatuses,
} from "../../../store/hostFilterBuilder";
import "./HostSearchFilters.scss";

const dataCy = "hostSearchFilters";

const HostSearchFilters = () => {
  const cy = { "data-cy": dataCy };
  const hostFilterState = useAppSelector((state) => state.hostFilterBuilder);
  const reassignFilterState = () => {
    return [
      "Ready",
      "InProgress",
      "Error",
      "Unknown",
      ...(hostFilterState.lifeCycleState === LifeCycleState.All
        ? ["Deauthorized"]
        : []),
    ].map((name) => ({
      id: name,
      name,
      isSelected: false,
    }));
  };

  const dispatch = useAppDispatch();
  const [statusSelections, setStatusSelection] = useState<
    CheckboxSelectionOption[]
  >(reassignFilterState());
  // Initialize status selection list
  const [osProfileSelections, setOsProfileSelection] = useState<
    CheckboxSelectionOption[]
  >([]);

  useEffect(() => {
    setStatusSelection(reassignFilterState());
  }, [hostFilterState.lifeCycleState]);

  const [showFilter, setShowFilter] = useState<boolean>(false);
  const ribbonFilterRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    document.addEventListener("mousedown", (e) => {
      // Check if the click is outside of this (popup) component
      if (
        ribbonFilterRef.current &&
        !ribbonFilterRef.current.contains(e.target as Node)
      ) {
        setShowFilter(false);
      }
    });
  }, []);

  // Update OS profiles options by api response
  const { data: osProfiles, isSuccess: isOSSuccess } =
    infra.useGetV1ProjectsByProjectNameComputeOsQuery(
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

    // Reset filters
    dispatch(setStatuses(undefined));
    dispatch(setOsProfiles(undefined));
    setShowFilter(false);
  };

  /** Set Redux store to apply host search filter */
  const applyFilters = () => {
    const selectedOs = osProfileSelections.filter((os) => os.isSelected);
    const selectedStatus = statusSelections.filter(
      (status) => status.isSelected,
    );
    dispatch(
      setStatuses(
        selectedStatus.length > 0
          ? selectedStatus.map((status) => AggregatedStatus[status.id])
          : undefined,
      ),
    );
    dispatch(
      setOsProfiles(
        selectedOs.length > 0 ? selectedOs.map((os) => os.id) : undefined,
      ),
    );
    setShowFilter(false);
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
