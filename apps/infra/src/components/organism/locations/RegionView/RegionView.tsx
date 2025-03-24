/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { eim } from "@orch-ui/apis";
import { Flex } from "@orch-ui/components";
import { SharedStorage } from "@orch-ui/utils";
import { Dropdown, Heading, Item } from "@spark-design/react";
import { DropdownSize } from "@spark-design/tokens";
import { useNavigate } from "react-router-dom";
import { TelemetryProfileLogs } from "../../../../components/molecules/locations/TelemetryProfileLogs/TelemetryProfileLogs";
import { TelemetryProfileMetrics } from "../../../../components/molecules/locations/TelemetryProfileMetrics/TelemetryProfileMetrics";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  selectRegion,
  setMaintenanceEntity,
  setRegionToDelete,
} from "../../../../store/locations";
import "./RegionView.scss";
const dataCy = "regionView";

export enum RegionViewActions {
  Edit = "Edit",
  "Schedule Maintenance" = "Schedule Maintenance",
  Delete = "Delete",
}
type RegionViewActionsKey = keyof typeof RegionViewActions;

export const RegionView = () => {
  const cy = { "data-cy": dataCy };
  const dispatch = useAppDispatch();
  const region = useAppSelector(selectRegion);
  const navigate = useNavigate();
  const className = "region-view";

  //if you get here from a search result, metadata will be missing
  //because of the lightweight nature of the search results. Will need
  //to retrieve the remaining information
  const { resourceId = undefined } = region ?? {};
  const { data: _region } =
    eim.useGetV1ProjectsByProjectNameRegionsAndRegionIdQuery(
      {
        projectName: SharedStorage.project?.name ?? "",
        regionId: resourceId ?? "",
      },
      {
        skip: !region || (region && region.metadata !== undefined),
      },
    );

  if (!region || !region?.resourceId === null) return null;

  const regionType =
    region && region.metadata && region.metadata.length > 0
      ? region.metadata[0].key
      : _region && _region.metadata && _region.metadata.length > 0
        ? _region.metadata[0].key
        : "Not specified";

  return (
    <div {...cy} className={className}>
      <div className={`${className}__actions-container`}>
        <Dropdown
          className={`${className}__actions`}
          popoverFitContent
          label=""
          name="region-actions"
          data-cy="regionActions"
          placeholder="Region Actions"
          size={DropdownSize.Large}
          selectedKey={null} //prevents the title changing
          onSelectionChange={(e: RegionViewActions) => {
            switch (e) {
              case RegionViewActions.Delete:
                dispatch(setRegionToDelete(region));
                break;
              case RegionViewActions.Edit:
                navigate(`../regions/${region.resourceId}`);
                break;
              case RegionViewActions["Schedule Maintenance"]:
                dispatch(
                  setMaintenanceEntity({
                    targetEntity: region,
                    targetEntityType: "region",
                    showBack: true,
                  }),
                );
                break;
            }
          }}
        >
          {Object.keys(RegionViewActions).map(
            (action: RegionViewActionsKey) => (
              <Item data-cy={action} key={action}>
                {RegionViewActions[action]}
              </Item>
            ),
          )}
        </Dropdown>
      </div>

      <Heading semanticLevel={5}>Details</Heading>
      <Flex cols={[2, 4]}>
        <b className={`${className}__title`}>Name:</b>
        <p>{region?.name ?? "Missing Name"}</p>
        <b className={`${className}__title`}>Type:</b>
        <p data-cy="type">{regionType}</p>
      </Flex>
      <Heading semanticLevel={5}>Advanced Settings</Heading>
      <Heading semanticLevel={6}>Telemetry Settings</Heading>
      {region && (
        <>
          <TelemetryProfileMetrics region={region} />
          <TelemetryProfileLogs region={region} />
        </>
      )}
    </div>
  );
};
