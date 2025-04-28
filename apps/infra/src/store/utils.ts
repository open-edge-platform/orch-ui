/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { enhancedEimSlice, infra } from "@orch-ui/apis";
import { MessageBannerAlertState } from "@orch-ui/components";
import { InternalError, SharedStorage } from "@orch-ui/utils";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import moment from "moment-timezone";
import { FieldError } from "react-hook-form";
import { MultiDropdownOption } from "../components/atom/MultiSelectDropdown/MultiSelectDropdown";
import { abbreviations } from "../utils/worldTimezones";
import {
  setErrorInfo,
  setMessageBanner,
  _MessageBannerState,
} from "./notifications";
import { AppDispatch } from "./store";

export const successMessageBanner = (
  text: string = "",
): _MessageBannerState => ({
  icon: "check-circle",
  text,
  title: "Success",
  variant: MessageBannerAlertState.Success,
});

export const errorMessageBanner = (text: string = ""): _MessageBannerState => ({
  icon: "cross-circle",
  text,
  title: "Error",
  variant: MessageBannerAlertState.Error,
});

export const isRepeatedMaintenance = (
  maintenance: any,
): maintenance is enhancedEimSlice.RepeatedMaintenance => {
  return (
    "type" in maintenance &&
    (maintenance.type === "repeat-weekly" ||
      maintenance.type === "repeat-monthly") &&
    "repeated" in maintenance &&
    "durationSeconds" in maintenance.repeated &&
    "cronHours" in maintenance.repeated &&
    "cronMinutes" in maintenance.repeated &&
    "cronMonth" in maintenance.repeated
  );
};
export const isSingleMaintenance = (
  maintenance: any,
): maintenance is enhancedEimSlice.SingleMaintenance => {
  return (
    "type" in maintenance &&
    maintenance.type === "no-repeat" &&
    "single" in maintenance &&
    "startSeconds" in maintenance.single
  );
};

/** Returns current time in Unix Timestamp number with round to nearest five seconds */
export const roundToNearestFiveSeconds = () => {
  const milliseconds = 5000;
  const n = new Date();
  const roundedTime = new Date(
    Math.round(n.getTime() / milliseconds) * milliseconds,
  );
  return (roundedTime.getTime() / 1000).toString();
};

/** Convert 24 hrs time string to 12-hrs (AM/PM). Example `13:00 => 1:00 PM`.  */
export const convert24hrTimeTo12hr = (timeStringIn24Hrs: string) => {
  const [immutableHour, mm] = timeStringIn24Hrs
    .split(":")
    .map((value) => parseInt(value));
  let hh = immutableHour;
  let output = "";

  // Finding out the Meridien of time ie. AM or PM
  const Meridien = hh < 12 ? "AM" : "PM";
  hh %= 12;

  // handle `00 to 12 AM` and single digit hour and minute scenarios
  output += hh === 0 ? "12" : hh < 10 ? `0${hh}` : hh;
  output += `:${mm < 10 ? `0${mm}` : mm}`;
  output += " " + Meridien;

  return output;
};

export type ApiPromiseType =
  | void
  | { data: void }
  | { error: FetchBaseQueryError | SerializedError };

export const showErrorMessageBanner = (
  dispatch: AppDispatch,
  message: string,
) => {
  showMessageBanner(dispatch, errorMessageBanner(message));
};

export const showSuccessMessageBanner = (
  dispatch: AppDispatch,
  message: string,
) => {
  showMessageBanner(dispatch, successMessageBanner(message));
};

const showMessageBanner = (
  dispatch: AppDispatch,
  message: _MessageBannerState,
) => {
  dispatch(setMessageBanner(message));
};

export const deleteHostInstanceFn = (
  dispatch: AppDispatch,
  host: infra.HostRead,
  instance?: infra.InstanceRead,
): Promise<ApiPromiseType> => {
  let promise = new Promise<ApiPromiseType>(() => {});
  const deleteHostFn = () => {
    return dispatch(
      infra.infra.endpoints.deleteV1ProjectsByProjectNameComputeHostsAndHostId.initiate(
        {
          projectName: SharedStorage.project?.name ?? "",
          hostId: host.resourceId ?? "",
          hostOperationWithNote: {
            note: host.note ?? "",
          },
        },
      ),
    );
  };

  const deleteInstanceFn = () => {
    return dispatch(
      infra.infra.endpoints.deleteV1ProjectsByProjectNameComputeInstancesAndInstanceId.initiate(
        {
          projectName: SharedStorage.project?.name ?? "",
          instanceId: instance?.instanceID ?? host.instance?.instanceID ?? "",
        },
      ),
    );
  };

  try {
    if (host.instance) {
      promise = deleteInstanceFn()
        .unwrap()
        .then(deleteHostFn)
        .catch(() => {
          dispatch(
            setMessageBanner({
              icon: "cross-circle",
              title: "Error",
              variant: MessageBannerAlertState.Error,
              text: "Failed to delete host !",
            }),
          );
        });
    } else {
      promise = deleteHostFn().unwrap();
    }
    setErrorInfo();
  } catch (e) {
    setErrorInfo(e as InternalError);
  }

  return promise;
};

/** Convert time in seconds to `hh, mm and ss` human-readable */
export const getHumanReadableDuration = (durationSeconds: number) => {
  const hh = Math.trunc(durationSeconds / 3600);
  const mm = Math.trunc((durationSeconds % 3600) / 60);
  const ss = durationSeconds % 60;
  return `${hh} hours, ${mm} minutes and ${ss} seconds`;
};

/** Convert date-time in seconds format to `date, hh, mm` format  */
export const getDateTimeFromSeconds = (seconds: number) => {
  const dateString = new Date(seconds * 1000).toUTCString().split(" ");
  const date = [dateString[1], dateString[2], dateString[3]].join("/");
  const time = dateString[4].split(":");
  const [hh, mm] = [time[0], time[1]];
  return [date, hh, mm];
};

/** This function will convert UTC time (from the API) to Local time of the user's machine.
 *  This function will also return the timezone details and local time details.
 **/
export const convertTimeInLocalTimezone = (
  hh: string,
  mm: string,
  date?: string,
) => {
  const adjustedDate = date ?? new Date().toDateString();
  const localDateTime = new Date(`${adjustedDate} ${hh}:${mm}:00 GMT`);
  const computedOffset = localDateTime.toString().match(/GMT(-|\+)([0-9]+)/);
  const localeDateTimeString = localDateTime.toString();
  const timezoneMatch = localeDateTimeString.match(/\((.*)\)/);
  const timezoneName = (timezoneMatch ?? [])[1];
  const { abbreviation: timezoneAbbreviation, offset: timezoneOffset } =
    timezoneName in abbreviations
      ? abbreviations[timezoneName]
      : {
          offset: computedOffset
            ? `${computedOffset[1]}${computedOffset[2].slice(0, 2)}:${computedOffset[2].slice(2)}`
            : undefined,
          abbreviation: undefined,
        };

  const localDate = localDateTime.toLocaleDateString();
  const localTimeMatch = localeDateTimeString.match(
    /([0-9]{2}:[0-9]{2}):[0-9]{2}/,
  );
  const localTime = (localTimeMatch ?? [])[1];
  return {
    timezoneName,
    timezoneAbbreviation,
    timezoneOffset,
    localDate,
    localTime,
  };
};

/** Returns next Circular value given `min < value < max` when `value` is changed with `offsetChange` */
export const getNextCircularValue = (
  value: number,
  min: number,
  max: number,
  offsetChange = 0,
) => {
  if (value === min && offsetChange < 0) {
    return max + 1 + offsetChange;
  }
  if (value === max && offsetChange > 0) {
    return min + offsetChange - 1;
  }

  return value + offsetChange;
};

/**
 * @deprecated please use getDateOffsetAccrossTimezone() instead
 *
 * Get day offset after `time` in a `timezoneUTCOffset` is converted to UTC(00:00)
 * TODO: remove this upon refactoring maintenance list
 **/
export const getDayOffsetChangeOnUTC = (
  timeIn24HrsFormat: string,
  timezoneUTCOffset: string,
) => {
  const isTimezoneOffsetBehindGMT = timezoneUTCOffset[0] === "-";
  const [timezoneOffsetHH, timezoneOffsetMM] = timezoneUTCOffset
    .slice(1)
    .split(":")
    .map((timeVal) => parseInt(timeVal));
  const [hh, mm] = timeIn24HrsFormat
    .split(":")
    .map((timeVal) => parseInt(timeVal));

  let hourOffset = 0;
  if (isTimezoneOffsetBehindGMT && 60 <= mm + timezoneOffsetMM) {
    hourOffset = 1;
  } else if (!isTimezoneOffsetBehindGMT && mm - timezoneOffsetMM < 0) {
    hourOffset = -1;
  }

  if (isTimezoneOffsetBehindGMT && 24 <= hh + (timezoneOffsetHH + hourOffset)) {
    return 1;
  } else if (
    !isTimezoneOffsetBehindGMT &&
    hh - (timezoneOffsetHH + hourOffset) < 0
  ) {
    return -1;
  }

  return 0;
};

/** Get day offset by difference in date of timezone1 and date of timezone2, when the `localTime1` is set in `timezone1`. */
export const getDateOffsetAccrossTimezone = (
  localTime1: string,
  timezone1TzCode: string,
  timezone2TzCode: string,
) => {
  const formatString = "YYYY-MM-DD HH:mm";
  const dateTimeString = moment(
    `${new Date().toDateString()} ${localTime1}`,
  ).format(formatString);
  const timezone1DateString = moment.tz(
    dateTimeString,
    formatString,
    timezone1TzCode,
  );
  const timezone2DateString = moment
    .tz(dateTimeString, formatString, timezone1TzCode)
    .tz(timezone2TzCode);

  return moment(
    `${timezone1DateString.year()}-${timezone1DateString.month() + 1}-${timezone1DateString.date()}`,
    "YYYY-MM-DD",
  ).diff(
    moment(
      `${timezone2DateString.year()}-${timezone2DateString.month() + 1}-${timezone2DateString.date()}`,
      "YYYY-MM-DD",
    ),
    "day",
  );
};

/** Get day offset after UTC(00:00) is converted to `time` in a `timezoneUTCOffset` */
export const getDayOffsetChangeFromUTC = (
  utcTimeIn24HrsFormat: string,
  timezoneUTCOffset: string,
) => {
  const isTimezoneOffsetBehindGMT = timezoneUTCOffset[0] === "-";
  const [timezoneOffsetHH, timezoneOffsetMM] = timezoneUTCOffset
    .slice(1)
    .split(":")
    .map((timeVal) => parseInt(timeVal));
  const [hh, mm] = utcTimeIn24HrsFormat
    .split(":")
    .map((timeVal) => parseInt(timeVal));

  let hourOffset = 0;
  if (isTimezoneOffsetBehindGMT && mm - timezoneOffsetMM < 0) {
    hourOffset = -1;
  } else if (!isTimezoneOffsetBehindGMT && 60 < mm + timezoneOffsetMM) {
    hourOffset = 1;
  }

  if (isTimezoneOffsetBehindGMT && hh - (timezoneOffsetHH + hourOffset) < 0) {
    return -1;
  } else if (
    !isTimezoneOffsetBehindGMT &&
    24 < hh + (timezoneOffsetHH + hourOffset)
  ) {
    return 1;
  }

  return 0;
};

/** Prefix extra padding digit '0', if the number is a single digit. */
export const singleDigitPadding = (value: string) =>
  value.length < 2 ? `0${value}` : value;

export const convertLocalTimeToUTC = ({
  date,
  time,
  tzCode = "GMT",
}: {
  date?: string;
  time: string;
  /** Timezone JS indicator */
  tzCode?: string;
}) => {
  // Get Timezone Abbreviation (ex: EST, PDT, CST, IST...)
  const localDateTimezone = new Date().toLocaleDateString("en-us", {
    timeZone: tzCode,
    timeZoneName: "short",
  });
  const [localDate, timeZoneAbbreviation] = localDateTimezone
    .replace(",", "")
    .split(" ");

  // Milliseconds to second
  return Math.trunc(
    // Convert time from of a local timezone to UTC/GMT(+00:00)
    new Date(`${date ?? localDate} ${time} ${timeZoneAbbreviation}`).valueOf() /
      1000,
  );
};

/** Convert Cron group selects to multiselect dropdown options */
export const getDropdownSelectsFromCron = (
  labels: string[],
  commaSeperatedIndices?: string,
  indexOffset = 0,
): MultiDropdownOption[] => {
  const selects = commaSeperatedIndices?.split(",");
  return labels.map((entry, index) => {
    const isIndexFound: boolean =
      (selects &&
        selects.findIndex(
          (select) => select === (index + indexOffset).toString(),
        ) !== -1) ||
      false;

    return {
      id: (index + indexOffset).toString(),
      text: `${entry[0].toUpperCase()}${entry.slice(1)}`,
      isSelected: commaSeperatedIndices === "*" || isIndexFound,
    };
  });
};

export const displayNameErrMsgForInvalidCharacter =
  "Name must start and end with a letter or a number. Name can contain spaces, lowercase letter(s), uppercase letter(s), number(s), hyphen(s) or slash(es).";
export const nameErrorMsgForRequired = "Name is required!";
export const getNameErrorMsgForMaxLength = (maxLength: number) =>
  `Name can't be more than ${maxLength} characters.`;
export const nameDefaultErrorMsg =
  "Name entered doesnot meet the required standards.";

/** get error message on Deployment Name entered.
 *
 * This requires `<Controller/>` rendering `<TextField/>` and argument `useForm()->errors.*.type`.  */
export const getDisplayNameValidationErrorMessage = (
  type?: string,
  maxLength = 20,
) => {
  switch (type) {
    case "required":
      return nameErrorMsgForRequired;
    case "maxLength":
      return getNameErrorMsgForMaxLength(maxLength);
    case "pattern":
      return displayNameErrMsgForInvalidCharacter;
  }
  return nameDefaultErrorMsg;
};

/** will return string values "invalid" or "valid". invalid if form field show error else valid  */
export const hasFieldError = (fieldError?: FieldError) => {
  return fieldError && Object.keys(fieldError).length > 0 ? "invalid" : "valid";
};
