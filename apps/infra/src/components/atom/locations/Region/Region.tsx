/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */
import { infra } from "@orch-ui/apis";
import { Popup } from "@orch-ui/components";
import { Icon } from "@spark-design/react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  ROOT_REGIONS,
  selectRootSiteCounts,
  selectSearchIsPristine,
  setLoadingBranch,
  setRegionToDelete,
} from "../../../../store/locations";
import "./Region.scss";

const dataCy = "region";

export interface RegionDynamicProps {
  showActionsMenu?: boolean;
  viewHandler?: (region: infra.RegionRead) => void;
  addSiteHandler?: (region: infra.RegionRead) => void;
  addSubRegionHandler?: (region: infra.RegionRead) => void;
  deleteHandler?: (region: infra.RegionRead) => void;
  scheduleMaintenanceHandler?: (region: infra.RegionRead) => void;
}

export interface RegionProps extends RegionDynamicProps {
  region: infra.RegionRead;
  sitesCount?: number;
  showSitesCount?: boolean;
}

export const Region = ({
  region,
  sitesCount = 0,
  showActionsMenu = false,
  showSitesCount = false,
  viewHandler,
  addSiteHandler,
  addSubRegionHandler,
  deleteHandler,
  scheduleMaintenanceHandler,
}: RegionProps) => {
  const cy = { "data-cy": dataCy };
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const searchIsPristine = useAppSelector(selectSearchIsPristine);
  const rootSiteCounts = useAppSelector(selectRootSiteCounts);
  const handleDelete = () => {
    if (deleteHandler) {
      // Checks if handler is passed
      dispatch(setRegionToDelete(region));
      deleteHandler(region);
    }
  };

  const getSiteCount = () => {
    if (!rootSiteCounts) return;
    const result = rootSiteCounts.find(
      (root) => root.resourceId === region.resourceId,
    );
    return result?.totalSites ?? 0;
  };

  return (
    <div {...cy} className="region-tree-container">
      <div className="region-details">
        <div className="region-details-label">
          {region.name ?? "Region name missing"}
        </div>

        {showSitesCount && (
          <>
            <div className="dot-separator" />
            <div className="region-details-label">
              <span>
                {searchIsPristine ? getSiteCount() : sitesCount} Site
                {sitesCount === 1 ? "" : "s"}
              </span>
            </div>
          </>
        )}
      </div>

      {showActionsMenu && (
        <div className="region-tree-action">
          <Popup
            dataCy="regionTreePopup"
            jsx={<Icon artworkStyle="regular" icon="ellipsis-v" />}
            options={[
              {
                displayText: "View Details",
                onSelect: () => viewHandler && viewHandler(region),
              },
              {
                displayText: "Edit",
                onSelect: () => {
                  if (!region.parentRegion || !region.parentRegion.resourceId)
                    dispatch(setLoadingBranch(ROOT_REGIONS));
                  else
                    dispatch(setLoadingBranch(region.parentRegion.resourceId));
                  navigate(`../regions/${region.resourceId}`);
                },
              },
              {
                displayText: "Add Subregion",
                onSelect: () =>
                  addSubRegionHandler && addSubRegionHandler(region),
              },
              {
                displayText: "Add Site",
                onSelect: () => addSiteHandler && addSiteHandler(region),
              },
              {
                displayText: "Schedule Maintenance",
                onSelect: () =>
                  scheduleMaintenanceHandler &&
                  scheduleMaintenanceHandler(region),
              },
              {
                displayText: "Delete",
                disable: !deleteHandler,
                onSelect: handleDelete,
              },
            ]}
          />
        </div>
      )}
    </div>
  );
};
