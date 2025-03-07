/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { enhancedEimSlice } from "@orch-ui/apis";
import { Flex } from "@orch-ui/components";
import { TextField } from "@spark-design/react";
import { InputSize } from "@spark-design/tokens";
import moment from "moment-timezone";
import { useEffect, useState } from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { hasFieldError } from "../../../store/utils";
import { Timezone } from "../../../utils/worldTimezones";

export const dataCy = "singleScheduleMaintenanceForm";
export interface SingleScheduleMaintenanceFormProps {
  maintenance: enhancedEimSlice.ScheduleMaintenance;
  timezone: Timezone;
  formControl: Control<enhancedEimSlice.ScheduleMaintenance, any>;
  formErrors: FieldErrors<enhancedEimSlice.ScheduleMaintenance>;
  onUpdate: (maintenance: enhancedEimSlice.ScheduleMaintenance) => void;
}
interface SingleScheduleInputState {
  startDate?: string;
  startTime?: string;
  endDate?: string;
  endTime?: string;
}

/** Render maintenance form for a one-time schedule */
export const SingleScheduleMaintenanceForm = ({
  maintenance,
  timezone,
  formControl,
  formErrors,
  onUpdate,
}: SingleScheduleMaintenanceFormProps) => {
  const cy = { "data-cy": dataCy };

  /** Single Schedule inputs state */
  const [singleScheduleInputValues, setSingleScheduleInputValue] =
    useState<SingleScheduleInputState>({});
  // Input values substitutions
  const { startDate, startTime, endDate, endTime } = singleScheduleInputValues;

  // Make value substitutions to input-boxes, if the timezone value changes or the maintenance is updated.
  useEffect(() => {
    if (maintenance.single) {
      const initialValues: SingleScheduleInputState = {};
      // get start time
      if (maintenance.single.startSeconds) {
        const timezoneDateTime = moment(
          maintenance.single.startSeconds * 1000,
        ).tz(timezone.tzCode);
        [initialValues.startDate, initialValues.startTime] = [
          timezoneDateTime.format("YYYY-MM-DD"),
          timezoneDateTime.format("HH:mm"),
        ];
      }

      // get end time
      if (maintenance.single.endSeconds) {
        const timezoneDateTime = moment(
          maintenance.single.endSeconds * 1000,
        ).tz(timezone.tzCode);
        [initialValues.endDate, initialValues.endTime] = [
          timezoneDateTime.format("YYYY-MM-DD"),
          timezoneDateTime.format("HH:mm"),
        ];
      }

      // notify value substitutions to input boxes
      setSingleScheduleInputValue(initialValues);
    }
  }, [maintenance.single, timezone]);

  return (
    <div {...cy} className="single-schedule-maintenance-form">
      <Flex cols={[12, 12, 12, 12]} colsMd={[6, 6, 6, 6]}>
        <div className="pa-1">
          <Controller
            name="single.startSeconds"
            control={formControl}
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <TextField
                {...field}
                data-cy="startDate"
                type="date"
                label="Start Date"
                value={startDate}
                validationState={hasFieldError(
                  formErrors?.single?.startSeconds,
                )}
                onChange={(value) => {
                  setSingleScheduleInputValue({
                    ...singleScheduleInputValues,
                    startDate: value,
                  });
                  onUpdate({
                    ...maintenance,
                    single: {
                      ...maintenance.single,
                      startSeconds: moment
                        .tz(`${value} ${startTime ?? "00:00"}`, timezone.tzCode)
                        .utc()
                        .unix(),
                    },
                  });
                }}
                size={InputSize.Large}
                isRequired
              />
            )}
          />
        </div>
        <div className="pa-1">
          <Controller
            name="single.startSeconds"
            control={formControl}
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <TextField
                {...field}
                data-cy="startTime"
                type="time"
                label="Start Time"
                value={startTime}
                validationState={hasFieldError(
                  formErrors?.single?.startSeconds,
                )}
                onChange={(value) => {
                  setSingleScheduleInputValue({
                    ...singleScheduleInputValues,
                    startTime: value,
                  });
                  onUpdate({
                    ...maintenance,
                    single: {
                      ...maintenance.single,
                      startSeconds: moment
                        .tz(
                          `${startDate ?? new Date().toDateString()} ${value}`,
                          timezone.tzCode,
                        )
                        .utc()
                        .unix(),
                    },
                  });
                }}
                size={InputSize.Large}
                isRequired
              />
            )}
          />
        </div>
        {!maintenance.single?.isOpenEnded && (
          <div className="pa-1">
            <Controller
              name="single.endSeconds"
              control={formControl}
              rules={{
                required: !maintenance.single?.isOpenEnded,
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  data-cy="endDate"
                  type="date"
                  label="End Date"
                  validationState={hasFieldError(
                    formErrors?.single?.endSeconds,
                  )}
                  value={endDate}
                  onChange={(value) => {
                    setSingleScheduleInputValue({
                      ...singleScheduleInputValues,
                      endDate: value,
                    });
                    onUpdate({
                      ...maintenance,
                      single: {
                        ...maintenance.single,
                        endSeconds: moment
                          .tz(`${value} ${endTime ?? "00:00"}`, timezone.tzCode)
                          .utc()
                          .unix(),
                      },
                    });
                  }}
                  size={InputSize.Large}
                  isRequired
                />
              )}
            />
          </div>
        )}
        {!maintenance.single?.isOpenEnded && (
          <div className="pa-1">
            <Controller
              name="single.endSeconds"
              control={formControl}
              rules={{
                required: !maintenance.single?.isOpenEnded,
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  data-cy="endTime"
                  type="time"
                  label="End Time"
                  validationState={hasFieldError(
                    formErrors?.single?.endSeconds,
                  )}
                  value={endTime}
                  onChange={(value) => {
                    setSingleScheduleInputValue({
                      ...singleScheduleInputValues,
                      endTime: value,
                    });
                    onUpdate({
                      ...maintenance,
                      single: {
                        ...maintenance.single,
                        endSeconds: moment
                          .tz(
                            `${endDate ?? new Date().toDateString()} ${value}`,
                            timezone.tzCode,
                          )
                          .utc()
                          .unix(),
                      },
                    });
                  }}
                  size={InputSize.Large}
                  isRequired
                />
              )}
            />
          </div>
        )}
      </Flex>
    </div>
  );
};
