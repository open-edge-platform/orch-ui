/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { enhancedInfraSlice, infra } from "@orch-ui/apis";
import { API_INTERVAL, SharedStorage } from "@orch-ui/utils";
import { Badge } from "@spark-design/react";
import { useEffect, useState } from "react";
import "./ScheduleMaintenanceStatusTag.scss";
const dataCy = "scheduleMaintenanceStatusTag";
export interface ScheduleMaintenanceStatusTagProps {
  targetEntity: enhancedInfraSlice.ScheduleMaintenanceTargetEntity;
  targetEntityType: enhancedInfraSlice.ScheduleMaintenanceTargetEntityType;
  className?: string;
  poll?: boolean;
}

export const ScheduleMaintenanceStatusTag = ({
  targetEntity,
  targetEntityType,
  className,
  poll,
}: ScheduleMaintenanceStatusTagProps) => {
  const cy = { "data-cy": dataCy };
  const [isInMaintenance, setIsInMaintenance] = useState<boolean>(false);

  const apiFilter: infra.GetV1ProjectsByProjectNameComputeSchedulesApiArg = {
    projectName: SharedStorage.project?.name ?? "",
    unixEpoch: Math.trunc(+new Date() / 1000).toString(),
  };

  switch (targetEntityType) {
    case "region":
      apiFilter.regionId = (targetEntity as infra.RegionRead).resourceId;
      break;
    case "site":
      apiFilter.siteId = (targetEntity as infra.SiteRead).resourceId;
      break;
    default:
      apiFilter.hostId = (targetEntity as infra.HostRead).resourceId;
  }

  const { data: schedules, isSuccess } =
    infra.useGetV1ProjectsByProjectNameComputeSchedulesQuery(apiFilter, {
      skip: !apiFilter.hostId && !apiFilter.siteId && !apiFilter.regionId,
      ...(poll ? { pollingInterval: API_INTERVAL } : {}),
    });

  const filteredMaintenance = schedules?.SingleSchedules.filter(
    (schedule) =>
      // filter schedules based on shipping and maintenance
      schedule.scheduleStatus === "SCHEDULE_STATUS_MAINTENANCE",
  );

  // If a new single schedule of type user `maintenance` exists
  const newSingleScheduleExists =
    (filteredMaintenance && filteredMaintenance.length > 0) || false;
  // If a new repeated schedule exists
  const newRepeatedScheduleExists =
    (schedules?.RepeatedSchedules && schedules.RepeatedSchedules.length > 0) ||
    false;

  useEffect(() => {
    if (isSuccess && schedules) {
      setIsInMaintenance(newSingleScheduleExists || newRepeatedScheduleExists);
    }
  }, [schedules]);

  /* This feature makes decision to show the maintenance tag based on above api call. Hide maintenance tag by showing empty component */
  if (!isInMaintenance) {
    return null;
  }

  /* Show `In Maintenance` tag */
  return (
    <span
      {...cy}
      className={"schedule-maintenance-status-tag".concat(` ${className}`)}
    >
      <Badge
        text="In Maintenance"
        shape="square"
        className="in-maintenance-badge"
      />
    </span>
  );
};
