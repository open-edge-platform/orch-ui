/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { enhancedEimSlice } from "@orch-ui/apis";
import { Flex } from "@orch-ui/components";
import { Text } from "@spark-design/react";
import {
  convert24hrTimeTo12hr,
  convertTimeInLocalTimezone,
  getDateTimeFromSeconds,
  getDayOffsetChangeFromUTC,
  getHumanReadableDuration,
  getNextCircularValue,
} from "../../../store/utils";
import { abbreviations, MONTHS, WEEKDAYS } from "../../../utils/worldTimezones";
import "./ScheduleMaintenanceSubComponent.scss";

export const dataCy = "maintenanceTableDecription";

export interface ScheduleMaintenanceSubComponentProps {
  maintenance: enhancedEimSlice.ScheduleMaintenance;
}

export const ScheduleMaintenanceSubComponent = ({
  maintenance,
}: ScheduleMaintenanceSubComponentProps) => {
  const cy = { "data-cy": dataCy };
  // Start Date/Time computation
  let startDate,
    startTime,
    endDate,
    endTime,
    repeated_weekdays,
    repeated_months,
    repeated_day,
    timezoneName,
    timezoneAbbreviation,
    timezoneOffset,
    dayOffset = 0;

  if (maintenance.single && maintenance.single.startSeconds) {
    // In date and hh,mm in UTC
    const [startDate_utc, startTime_hh_utc, startTime_mm_utc] =
      getDateTimeFromSeconds(maintenance.single.startSeconds);

    // Convert to local timezone time
    const localStartTimeDetails = convertTimeInLocalTimezone(
      startTime_hh_utc,
      startTime_mm_utc,
      startDate_utc,
    );

    [timezoneAbbreviation, timezoneName, timezoneOffset] = [
      localStartTimeDetails.timezoneAbbreviation,
      localStartTimeDetails.timezoneName,
      localStartTimeDetails.timezoneOffset,
    ];
    [startDate, startTime] = [
      localStartTimeDetails.localDate,
      localStartTimeDetails.localTime,
    ];

    if (maintenance.single.endSeconds && maintenance.single.endSeconds != 0) {
      const [endDate_utc, endTime_hh_utc, endTime_mm_utc] =
        getDateTimeFromSeconds(maintenance.single.endSeconds);
      const localEndTimeDetails = convertTimeInLocalTimezone(
        endTime_hh_utc,
        endTime_mm_utc,
        endDate_utc,
      );
      [endDate, endTime] = [
        localEndTimeDetails.localDate,
        localEndTimeDetails.localTime,
      ];
    }
  } else if (maintenance.repeated) {
    // In date and hh,mm in UTC
    const [startTime_hh_utc, startTime_mm_utc] = [
      maintenance.repeated.cronHours,
      maintenance.repeated.cronMinutes,
    ];

    if (startTime_hh_utc && startTime_mm_utc) {
      // Convert to local timezone time
      const localStartTimeDetails = convertTimeInLocalTimezone(
        startTime_hh_utc,
        startTime_mm_utc,
      );
      [timezoneAbbreviation, timezoneName, timezoneOffset] = [
        localStartTimeDetails.timezoneAbbreviation,
        localStartTimeDetails.timezoneName,
        localStartTimeDetails.timezoneOffset,
      ];
      [startDate, startTime] = [
        localStartTimeDetails.localDate,
        localStartTimeDetails.localTime,
      ];

      if (localStartTimeDetails.timezoneOffset) {
        dayOffset = getDayOffsetChangeFromUTC(
          `${startTime_hh_utc}:${startTime_mm_utc}`,
          localStartTimeDetails.timezoneOffset,
        );
      }
    }

    // Repeat: Weekdays Details
    const weekdaysNumberList =
      maintenance.repeated.cronDayWeek?.split(",") ?? [];
    if (weekdaysNumberList.length > 1) {
      repeated_weekdays = weekdaysNumberList
        .map((weekdayNumber: string) => {
          const change = getNextCircularValue(
            parseInt(weekdayNumber),
            0,
            6,
            dayOffset,
          );
          return WEEKDAYS[change];
        })
        .join(",");
    } else {
      if (maintenance.repeated.cronDayWeek) {
        if (maintenance.repeated.cronDayWeek === "*") {
          repeated_weekdays = "All days";
        } else {
          repeated_weekdays =
            WEEKDAYS[
              getNextCircularValue(
                parseInt(maintenance.repeated.cronDayWeek),
                0,
                6,
                dayOffset,
              )
            ];
        }
      }
    }

    const repeatedDayList = maintenance.repeated?.cronDayMonth
      ?.split(",")
      .map((day) =>
        getNextCircularValue(parseInt(day), 1, 31, dayOffset).toString(),
      );

    repeated_day = repeatedDayList?.join(",");

    // Repeat: Month Details
    const monthsNumberList = maintenance.repeated.cronMonth?.split(",") ?? [];
    /* record month change */
    let monthOffset = 0;
    if (
      maintenance.repeated.cronDayMonth &&
      repeatedDayList &&
      repeatedDayList.length === 1
    ) {
      if (
        repeatedDayList[0] === "31" && // in Local time
        maintenance.repeated.cronDayMonth === "1" // in GMT
      ) {
        monthOffset = -1;
      } else if (
        repeatedDayList[0] === "1" && // in Local time
        maintenance.repeated.cronDayMonth === "31" // in GMT
      ) {
        monthOffset = 1;
      }
    }
    if (monthsNumberList.length > 1) {
      repeated_months = monthsNumberList
        .map(
          (monthNumber: string) =>
            MONTHS[parseInt(monthNumber) + monthOffset - 1],
        )
        .join(",");
    } else {
      if (maintenance.repeated.cronMonth) {
        if (maintenance.repeated.cronMonth === "*") {
          repeated_months = "All months";
        } else {
          repeated_months =
            MONTHS[parseInt(maintenance.repeated.cronMonth) - 1];
        }
      }
    }
  }

  // Get Timezone String to display
  let timezoneString = timezoneName;
  if (timezoneName && timezoneName in abbreviations) {
    timezoneString += ` (${timezoneAbbreviation}) (GMT${timezoneOffset === "UTC" ? "+00:00" : timezoneOffset})`;
  }

  return (
    <div className="schedule-maintenance-sub-component" {...cy}>
      <div>
        <Flex cols={[2, 10]} className="flex-item-container">
          <Text className="label-bold">Time zone:</Text>
          <Text data-cy="timezone" className="field-value">
            {timezoneString}
          </Text>
        </Flex>

        <Flex cols={[2, 10]} className="flex-item-container">
          <Text className="label-bold">Schedule Type:</Text>
          <Text data-cy="scheduleType" className="field-value">
            {
              {
                "no-repeat": `Does not Repeat${(!maintenance.single?.endSeconds && " (Open-ended)") || ""}`,
                "repeat-weekly": "Repeat by day of week",
                "repeat-monthly": "Repeat by day of month",
              }[maintenance.type]
            }
          </Text>
        </Flex>
      </div>

      {maintenance.type === "no-repeat" && (
        <div>
          <Flex cols={[6, 6]} className="align-items-flex-start">
            <Flex cols={[4, 8]} className="flex-item-container">
              <Text className="label-bold">Start Date:</Text>
              <Text data-cy="startDate" className="field-value">
                {startDate}
              </Text>
            </Flex>

            <Flex cols={[4, 8]} className="flex-item-container">
              <Text className="label-bold">Start Time:</Text>
              <Text data-cy="startTime" className="field-value">
                {convert24hrTimeTo12hr(startTime ?? "")}
              </Text>
            </Flex>
          </Flex>

          <Flex cols={[6, 6]}>
            <Flex cols={[4, 8]} className="flex-item-container">
              <Text className="label-bold">End Date:</Text>
              <Text data-cy="endDate" className="field-value">
                {endDate ?? "N/A"}
              </Text>
            </Flex>

            <Flex cols={[4, 8]} className="flex-item-container">
              <Text className="label-bold">End Time:</Text>
              <Text data-cy="endTime" className="field-value">
                {endTime ? convert24hrTimeTo12hr(endTime) : "N/A"}
              </Text>
            </Flex>
          </Flex>
        </div>
      )}

      {maintenance.type !== "no-repeat" && (
        <div>
          <Flex cols={[6, 6]} className="align-items-flex-start">
            <Flex cols={[4, 8]} className="flex-item-container">
              <Text className="label-bold">Start Time:</Text>
              <Text data-cy="startTime" className="field-value">
                {convert24hrTimeTo12hr(startTime ?? "")}
              </Text>
            </Flex>

            <Flex cols={[4, 8]} className="flex-item-container">
              <Text className="label-bold">Duration:</Text>
              <Text data-cy="duration" className="field-value">
                {(maintenance.repeated?.durationSeconds &&
                  getHumanReadableDuration(
                    maintenance.repeated?.durationSeconds,
                  )) ||
                  "N/A"}
              </Text>
            </Flex>

            {maintenance.type === "repeat-monthly" && (
              <Flex cols={[4, 8]} className="flex-item-container">
                <Text className="label-bold">Day:</Text>
                <Text data-cy="dayOfMonth" className="field-value">
                  {(maintenance.repeated?.cronDayMonth === "*"
                    ? "All days"
                    : repeated_day) ?? "N/A"}
                </Text>
              </Flex>
            )}

            {maintenance.type === "repeat-weekly" && (
              <Flex cols={[4, 8]} className="flex-item-container">
                <Text className="label-bold">Day:</Text>
                <Text data-cy="dayOfWeek" className="field-value">
                  {repeated_weekdays ?? "N/A"}
                </Text>
              </Flex>
            )}

            <Flex cols={[4, 8]} className="flex-item-container">
              <Text className="label-bold">Month:</Text>
              <Text data-cy="months" className="field-value">
                {repeated_months ?? "N/A"}
              </Text>
            </Flex>
          </Flex>
        </div>
      )}
    </div>
  );
};
