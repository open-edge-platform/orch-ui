/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { enhancedEimSlice } from "@orch-ui/apis";
import { Flex } from "@orch-ui/components";
import { TextField } from "@spark-design/react";
import { InputSize } from "@spark-design/tokens";
import moment from "moment-timezone";
import { useEffect, useRef, useState } from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import MultiSelectDropdown, {
  MultiDropdownOption,
} from "../../../components/atom/MultiSelectDropdown/MultiSelectDropdown";
import {
  getDateOffsetAccrossTimezone,
  getDropdownSelectsFromCron,
  getNextCircularValue,
  hasFieldError,
} from "../../../store/utils";
import {
  CalenderDays,
  Months,
  Timezone,
  Weekdays,
} from "../../../utils/worldTimezones";
import "./RepeatedScheduleMaintenance.scss";

const dataCy = "repeatedScheduleMaintenanceForm";

export interface RepeatedScheduleMaintenanceFormProps {
  maintenance: enhancedEimSlice.ScheduleMaintenanceRead;
  /** Reference of current timezone selection */
  timezone: Timezone;
  formControl: Control<enhancedEimSlice.ScheduleMaintenance, any>;
  formErrors: FieldErrors<enhancedEimSlice.ScheduleMaintenance>;
  onUpdate: (maintenance: enhancedEimSlice.ScheduleMaintenanceRead) => void;
}

/** Get Reference to previous timezone upon change to new timezone. */
const usePreviousTimezone = (timezone: Timezone) => {
  const ref = useRef<Timezone>();
  useEffect(() => {
    ref.current = timezone;
  });
  return ref.current;
};

export const RepeatedScheduleMaintenanceForm = ({
  maintenance,
  timezone,
  formControl,
  formErrors,
  onUpdate,
}: RepeatedScheduleMaintenanceFormProps) => {
  const cy = { "data-cy": dataCy };
  /** Reset dropdown selection for weekday */
  const getWeekdaysReset = () =>
    Weekdays.map((day, index) => ({
      id: index.toString(),
      text: `${day[0].toUpperCase()}${day.slice(1)}`,
      isSelected: false,
    }));
  /** Reset dropdown selection for calender days */
  const getDaysReset = () =>
    CalenderDays.map((dayNumber) => ({
      id: (dayNumber + 1).toString(),
      text: (dayNumber + 1).toString(),
      isSelected: false,
    }));
  /** Reset dropdown selection for months */
  const getMonthReset = () =>
    Months.map((month, index) => ({
      id: (index + 1).toString(),
      text: month,
      isSelected: false,
    }));

  /* RepeatedCron Inputboxes states */
  const [startTime, setStartTime] = useState<string>();
  const [duration, setDuration] = useState<string>("");
  // Selectable list of WeekDays (SUN,MON-SAT)
  const [selectedWeekdays, setSelectedWeekdays] =
    useState<MultiDropdownOption[]>();
  // Selectable list of Months (JAN,1-DEC,12)
  const [selectedMonths, setSelectedMonths] = useState<MultiDropdownOption[]>();
  // Selectable list of Day (1-31)
  const [selectedDays, setSelectedDays] = useState<MultiDropdownOption[]>();
  /** Reference of previous timezone */
  const prevTimezone = usePreviousTimezone(timezone) ?? {
    label: "Greenwich (-00:00)",
    tzCode: "Greenwich",
    utc: "-00:00",
  };

  /** This function will give modified day of month and month after finding:
   *  - a month underflow upon subtraction of day offset (Ex: `1,2,3...31 - {dayOffset:1} = 0,1,2,3...30`; this will remove 0 and notify seperate call for 31 of prev month)
   *  - a month overflow upon addition of day offset (Ex: `1,2,3...31 - {dayOffset:-1} = 2,3...30,31,32`; this will remove 32 and notify seperate call for 1 of next month) */
  const getDayOfMonthChangeByDateOffset = (
    dateOffsetToGMT: number,
    dayOfMonthLocalString?: string,
    monthLocalString?: string,
  ) => {
    /** Signal to call a seperate previous month api. when local time to GMT causes 1 of month to 31 of previous month. */
    let countPrevMonth = false,
      /** Signal to call a seperate next month api. when local time to GMT causes 31 of month to 1 of next month. */
      countNextMonth = false;
    /** month in GMT */
    let cronMonth = monthLocalString;
    let selectedDaysSet = dayOfMonthLocalString
      ?.split(",")
      .map((day) =>
        getNextCircularValue(parseInt(day), 1, 31, dateOffsetToGMT).toString(),
      );
    if (selectedDaysSet && cronMonth && cronMonth !== "*") {
      // If not a single selection
      if (selectedDaysSet.length > 1) {
        // if timezone modifcation from local timezone to GMT show 31,1,2...
        if (selectedDaysSet[0] === "31") {
          // then signal to count prevMonth with 31 in GMT
          countPrevMonth = true;
          selectedDaysSet = selectedDaysSet.slice(1);
        }
        // if timezone modifcation from local timezone to GMT show 2,3...30,31,1
        else if (selectedDaysSet[selectedDaysSet.length - 1] === "1") {
          // then signal to count nextMonth with 1 in GMT
          countNextMonth = true;
          selectedDaysSet = selectedDaysSet.slice(
            0,
            selectedDaysSet.length - 1,
          );
        }
      } else if (selectedDaysSet.length === 1) {
        // if single selection go with taking date offset as month offset
        let monthOffset = 0;
        if (selectedDaysSet[0] === "31" || selectedDaysSet[0] === "1") {
          monthOffset = dateOffsetToGMT;
        }
        cronMonth = cronMonth
          ?.split(",")
          .map((month) =>
            getNextCircularValue(
              parseInt(month),
              1,
              12,
              monthOffset,
            ).toString(),
          )
          .join(",");
      }
    }

    /** dayOfMonth in GMT */
    const cronDayMonth = selectedDaysSet?.join(",");

    return {
      // Modified month and dayofMonth in GMT timezone
      cronMonth,
      cronDayMonth,

      // Request signals for maintenance call within new month of GMT timezone
      countNextMonth,
      countPrevMonth,
    };
  };

  // Make value substitutions to input-boxes from GMT to local timezone selection
  useEffect(() => {
    if (maintenance.repeated) {
      /** dateOffset between prev/GMT timezone and new selected timezone */
      let dateOffset = 0,
        /** monthOffset between prev/GMT timezone and new selected timezone */
        monthOffset = 0;

      // substitute startTime
      if (maintenance.repeated.cronHours && maintenance.repeated.cronMinutes) {
        const utcTime = `${maintenance.repeated.cronHours}:${maintenance.repeated.cronMinutes}`;

        /** localStartTime in current timezone selection */
        const localStartTime = moment(
          `${new Date().toLocaleDateString()} ${utcTime} GMT`,
        )
          .tz(timezone.tzCode)
          .format("HH:mm")
          .toString();
        setStartTime(localStartTime);

        /* dateOffsetPrevTzToCurrentTz = (CurrentTimezoneSelection date - PrevTimezone/GMT date) */
        dateOffset = getDateOffsetAccrossTimezone(
          localStartTime,
          timezone.tzCode, // new timezone selection / default: tz.guess()
          prevTimezone.tzCode, // previous selection / default: GMT
        );
      }

      // substitute duration
      if (maintenance.repeated.durationSeconds) {
        setDuration(
          moment
            .utc(maintenance.repeated.durationSeconds * 1000)
            .format("H:m:s")
            .toString(),
        );
      }

      // substitute day of week dropbox selections
      if (maintenance.repeated.cronDayWeek) {
        const weekSelectionString = selectedWeekdays
          ? // If week day selection was made previously then we take it for weekdays selection;
            // As this will contains days that set by change of timezone values.
            selectedWeekdays
              .filter((o) => o.isSelected)
              .map((o) => o.id)
              .join(",")
          : // otherwise, we select utc based dates to show week selection
            maintenance.repeated.cronDayWeek;
        // If the timezone changes week offset
        if (weekSelectionString !== "*" && dateOffset !== 0) {
          const updatedCronWeek = weekSelectionString
            .split(",")
            .map((option) =>
              // get the day selections adding day offset change
              getNextCircularValue(
                parseInt(option),
                0, // Sun
                6, // Sat
                dateOffset,
              ).toString(),
            )
            .join(",");

          // update selections
          setSelectedWeekdays(
            // SUN,MON-SAT (0,1-6)
            getDropdownSelectsFromCron(Weekdays, updatedCronWeek),
          );
        } else {
          setSelectedWeekdays(
            // SUN,MON-SAT (0,1-6)
            getDropdownSelectsFromCron(Weekdays, weekSelectionString),
          );
        }
      }

      // substitute day of month dropbox selections
      if (maintenance.repeated.cronDayMonth) {
        /** PreviousTimezone/GMT based Day selections */
        const daySelectionString = selectedDays
          ? selectedDays
              .filter((o) => o.isSelected)
              .map((o) => o.id)
              .join(",")
          : maintenance.repeated.cronDayMonth;

        // if a corner day is presented as single date selection, especially in edit substitution case
        if (daySelectionString === "1" || daySelectionString === "31") {
          /** GMT day (1 or 31) */
          const cornerDayOfMonth = parseInt(daySelectionString);

          // calculate any monthOffset caused by prev to next timezone timezone change
          if (cornerDayOfMonth - dateOffset === 0) {
            // if localDate === 0
            // month underflow: choose prev month in check box
            monthOffset = -1;
          } else if (cornerDayOfMonth - dateOffset === 32) {
            // if localDate === 32
            // month overflow: choose next month in check box
            monthOffset = 1;
          }
        }

        if (daySelectionString !== "*" && dateOffset !== 0) {
          /** Local timezone based Day selection array */
          const updatedCronDayArray = daySelectionString
            .split(",")
            .map((option) =>
              getNextCircularValue(
                parseInt(option),
                1,
                31,
                dateOffset,
              ).toString(),
            );

          if (
            maintenance.repeated.countNextMonthOnTzGMT &&
            // if `dayOfMonth + (dayOffset:1) ` goes to next month
            dateOffset !== 1
          )
            updatedCronDayArray.push("31");
          else if (
            maintenance.repeated.countPrevMonthOnTzGMT &&
            // if `dayOfMonth + (dayOffset:-1)` goes to previous month
            dateOffset !== -1
          )
            updatedCronDayArray.unshift("1");

          /** Local timezone based Day selections */
          const updatedCronDay = updatedCronDayArray.join(",");
          setSelectedDays(
            // 1-31 days
            getDropdownSelectsFromCron(
              CalenderDays.map((day) => (day + 1).toString()),
              updatedCronDay,
              1,
            ),
          );
        } else {
          setSelectedDays(
            // 1-31 days
            getDropdownSelectsFromCron(
              CalenderDays.map((day) => (day + 1).toString()),
              daySelectionString,
              1,
            ),
          );
        }
      }

      // substitute month dropbox selections
      if (maintenance.repeated.cronMonth) {
        const monthSelectionString = selectedMonths
          ? // If month selection was made previously then we take it;
            // As this will contains month that set by change of timezone values.
            selectedMonths
              .filter((o) => o.isSelected)
              .map((o) => o.id)
              .join(",")
          : // otherwise, we select utc based month to show selection
            maintenance.repeated.cronMonth;

        // If the timezone changes month offset
        if (monthSelectionString !== "*" && monthOffset !== 0) {
          const updatedCronMonth = monthSelectionString
            .split(",")
            .map((option) =>
              // get the month selections adding month offset change
              getNextCircularValue(
                parseInt(option),
                1, // Jan
                12, // Dec
                monthOffset,
              ).toString(),
            )
            .join(",");

          // update selections
          setSelectedMonths(
            // JAN-DEC (1-12)
            getDropdownSelectsFromCron(Months, updatedCronMonth, 1),
          );
        } else {
          setSelectedMonths(
            // JAN-DEC (1-12)
            getDropdownSelectsFromCron(Months, monthSelectionString, 1),
          );
        }
      }
    }
  }, [maintenance.repeated, timezone]); // if the timezone value changes or the maintenance is updated.

  return (
    <div {...cy} className="repeated-schedule-maintenance-form">
      <Flex cols={[12, 12, 12, 12]} colsMd={[6, 6, 6, 6]}>
        <div className="pa-1">
          <Controller
            name="repeated.cronHours"
            control={formControl}
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <TextField
                data-cy="startTime"
                {...field}
                type="time"
                label="Start Time"
                size={InputSize.Large}
                validationState={hasFieldError(formErrors?.repeated?.cronHours)}
                value={startTime}
                onChange={(value) => {
                  const timeArray = moment
                    .tz(value, "HH:mm", timezone.tzCode)
                    .utc()
                    .format("HH:mm")
                    .toString()
                    .split(":");

                  if (timeArray.length === 2) {
                    let cronMonth = maintenance.repeated?.cronMonth,
                      cronDayMonth = maintenance.repeated?.cronDayMonth;
                    // if previous time was present
                    if (startTime) {
                      // convert dayOfMonth and Month from GMT to localtime
                      const dateOffsetGmtToPrevTz =
                        getDateOffsetAccrossTimezone(
                          startTime,
                          prevTimezone.tzCode,
                          "GMT",
                        );

                      // Convert GMT to prev timezone: To convert the previous days & months selected in at a local-time timezone to current-time in timezone
                      const {
                        cronDayMonth: prevLocalDayMonth,
                        cronMonth: prevLocalMonth,
                      } = getDayOfMonthChangeByDateOffset(
                        dateOffsetGmtToPrevTz,
                        cronDayMonth,
                        cronMonth,
                      );

                      cronDayMonth = prevLocalDayMonth;
                      cronMonth = prevLocalMonth;

                      if (
                        cronDayMonth &&
                        maintenance.repeated?.countNextMonthOnTzGMT &&
                        dateOffsetGmtToPrevTz === -1
                      ) {
                        cronDayMonth = cronDayMonth.concat(",31");
                      } else if (
                        cronDayMonth &&
                        maintenance.repeated?.countPrevMonthOnTzGMT &&
                        dateOffsetGmtToPrevTz === 1
                      ) {
                        cronDayMonth = "1,".concat(cronDayMonth);
                      }
                    }

                    const dateOffsetCurrentTimeToGmt =
                      -getDateOffsetAccrossTimezone(
                        value,
                        timezone.tzCode,
                        "GMT",
                      );
                    // convert current timezone to GMT timezone
                    const {
                      cronDayMonth: gmtDayMonth,
                      cronMonth: gmtMonth,
                      countNextMonth,
                      countPrevMonth,
                    } = getDayOfMonthChangeByDateOffset(
                      dateOffsetCurrentTimeToGmt,
                      cronDayMonth,
                      cronMonth,
                    );

                    // new time update
                    const [hh, mm] = timeArray;

                    onUpdate({
                      ...maintenance,
                      repeated: {
                        ...maintenance.repeated,
                        cronHours: hh,
                        cronMinutes: mm,
                        cronDayMonth: gmtDayMonth,
                        cronMonth: gmtMonth,
                        countNextMonthOnTzGMT: countNextMonth,
                        countPrevMonthOnTzGMT: countPrevMonth,
                      },
                    });
                  }

                  setStartTime(value);
                }}
                isRequired
              />
            )}
          />
        </div>
        <div className="pa-1">
          {/* How long is the maintenance stays in affect once executed? */}
          <Controller
            name="repeated.durationSeconds"
            control={formControl}
            rules={{
              required: true,
              min: 1,
              pattern: new RegExp(
                /^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)/,
              ),
            }}
            render={({ field }) => (
              <TextField
                {...field}
                data-cy="duration"
                type="text"
                label="Duration"
                value={duration}
                placeholder="hh:mm:ss"
                pattern="^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$"
                validationState={hasFieldError(
                  formErrors?.repeated?.durationSeconds,
                )}
                size={InputSize.Large}
                onChange={(value) => {
                  if (
                    value.match(
                      /^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$/,
                    )
                  ) {
                    let durationSplits = value.split(":");
                    if (durationSplits.length === 1) {
                      durationSplits = ["0", "0", durationSplits[0]];
                    } else if (durationSplits.length === 2) {
                      durationSplits = [
                        "0",
                        durationSplits[0],
                        durationSplits[1],
                      ];
                    }
                    const [hh, mm, ss] = durationSplits;
                    const durationInSeconds =
                      parseInt(hh) * 60 * 60 + parseInt(mm) * 60 + parseInt(ss);
                    onUpdate({
                      ...maintenance,
                      repeated: {
                        ...maintenance.repeated,
                        durationSeconds: durationInSeconds,
                      },
                    });
                    setDuration(durationSplits.join(":"));
                  }

                  setDuration(value);
                }}
                isRequired
              />
            )}
          />
        </div>
        <div className="pa-1">
          {/* If maintenance is repeated weekly once on selected weekday(s)  */}
          {maintenance.type === "repeat-weekly" && (
            <MultiSelectDropdown
              dataCy="weekday"
              label="Day *"
              pluralLabel="Days"
              selectOptions={selectedWeekdays ?? getWeekdaysReset()}
              onSelectionChange={(options) => {
                setSelectedWeekdays(options);

                // Convert timezone date to GMT date
                const dateOffsetLocalToGMT = startTime
                  ? getDateOffsetAccrossTimezone(
                      startTime,
                      timezone.tzCode,
                      "GMT",
                    )
                  : 0;
                // make conversion for local timezone days selected to GMT timezone
                const selectedSet = options
                  .filter((option) => option.isSelected)
                  .map((option) =>
                    getNextCircularValue(
                      parseInt(option.id),
                      0, // Sun
                      6, // Sat
                      -dateOffsetLocalToGMT,
                    ).toString(),
                  );

                // Save by all info in GMT timezone
                onUpdate({
                  ...maintenance,
                  repeated: {
                    ...maintenance.repeated,
                    cronDayWeek:
                      selectedSet.length === options.length
                        ? "*"
                        : selectedSet.join(","),
                  },
                });
              }}
            />
          )}

          {/* If maintenance is repeated monthly once on selected day number(s)  */}
          {maintenance.type === "repeat-monthly" && (
            <MultiSelectDropdown
              dataCy="dayNumber"
              label="Day *"
              pluralLabel="Days"
              selectOptions={selectedDays ?? getDaysReset()}
              onSelectionChange={(options) => {
                setSelectedDays(options);

                /** month selection in local timezone */
                const selectedMonthSet = selectedMonths
                  ?.filter((option) => option.isSelected)
                  .map((option) => option.id);
                /** dayOfMonth selection in local timezone */
                const selectedDaysSet = options
                  .filter((option) => option.isSelected)
                  .map((option) => option.id);

                // Recompute dayOfMonth, month selection when localTime changes to GMT
                /** dateOffsetLocalToGMT = (date in selected timezone - date in GMT) */
                const dateOffsetLocalToGMT = startTime
                  ? getDateOffsetAccrossTimezone(
                      startTime,
                      timezone.tzCode,
                      "GMT",
                    )
                  : 0;
                const { countNextMonth, countPrevMonth, cronMonth } =
                  getDayOfMonthChangeByDateOffset(
                    // subtract dateOffset from local dates, which converts to GMT
                    -dateOffsetLocalToGMT,
                    selectedDaysSet.join(","),
                    selectedMonthSet?.join(","),
                  );

                // Save by all info in GMT timezone
                onUpdate({
                  ...maintenance,
                  repeated: {
                    ...maintenance.repeated,
                    cronDayMonth:
                      selectedDaysSet.length === options.length
                        ? "*"
                        : selectedDaysSet.join(","),
                    cronMonth,
                    // Call a seperate Next or Prev Month when local time changes to GMT
                    countNextMonthOnTzGMT: countNextMonth,
                    countPrevMonthOnTzGMT: countPrevMonth,
                  },
                });
              }}
            />
          )}
        </div>
        <div className="pa-1">
          {/* Months in which this maintenance schedule stays in affect on. */}
          <MultiSelectDropdown
            dataCy="month"
            label="Month *"
            pluralLabel="Months"
            selectOptions={selectedMonths ?? getMonthReset()}
            onSelectionChange={(options) => {
              setSelectedMonths(options);
              /** month selection in local timezone */
              const selectedMonthSet = options
                .filter((option) => option.isSelected)
                .map((option) => option.id);
              /** days selection in local timezone */
              const selectedDaysSet = selectedDays
                ?.filter((option) => option.isSelected)
                .map((option) => option.id);

              // Recompute dayOfMonth, month selection when localTime changes to GMT
              /** dateOffsetLocalToGMT = (date in selected timezone - date in GMT) */
              const dateOffsetLocalToGMT = startTime
                ? getDateOffsetAccrossTimezone(
                    startTime,
                    timezone.tzCode,
                    "GMT",
                  )
                : 0;
              const {
                countNextMonth,
                countPrevMonth,
                cronDayMonth,
                cronMonth,
              } = getDayOfMonthChangeByDateOffset(
                // subtract dateOffset from local dates, which converts to GMT
                -dateOffsetLocalToGMT,
                selectedDaysSet?.join(","),
                selectedMonthSet.join(","),
              );

              // Save by all info in GMT timezone
              onUpdate({
                ...maintenance,
                repeated: {
                  ...maintenance.repeated,
                  cronDayMonth,
                  cronMonth:
                    selectedMonthSet.length === options.length
                      ? "*"
                      : cronMonth,
                  // Call a seperate Next or Prev Month when local time changes to GMT
                  countNextMonthOnTzGMT: countNextMonth,
                  countPrevMonthOnTzGMT: countPrevMonth,
                },
              });
            }}
          />
        </div>
      </Flex>
    </div>
  );
};
