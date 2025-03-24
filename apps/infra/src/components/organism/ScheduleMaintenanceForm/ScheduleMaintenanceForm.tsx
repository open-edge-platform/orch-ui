/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */
import { eim, enhancedEimSlice } from "@orch-ui/apis";
import { SharedStorage } from "@orch-ui/utils";
import {
  Button,
  ButtonGroup,
  Combobox,
  Dropdown,
  Heading,
  Icon,
  Item,
  TextField,
  ToggleSwitch,
  Tooltip,
} from "@spark-design/react";
import {
  DropdownSize,
  InputSize,
  MessageBannerAlertState,
  ToastState,
} from "@spark-design/tokens";
import moment from "moment-timezone";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  disableMessageBanner,
  MessageBannerState,
  showMessageNotification,
  showToast,
} from "../../../store/notifications";
import {
  getDisplayNameValidationErrorMessage,
  getNextCircularValue,
  isRepeatedMaintenance,
  isSingleMaintenance,
} from "../../../store/utils";
import {
  supportedTimezones as timezones,
  Timezone,
} from "../../../utils/worldTimezones";
import { RepeatedScheduleMaintenanceForm } from "../RepeatedScheduleMaintenanceForm/RepeatedScheduleMaintenanceForm";
import { SingleScheduleMaintenanceForm } from "../SingleScheduleMaintenanceForm/SingleScheduleMaintenanceForm";
import "./ScheduleMaintenanceForm.scss";

import { Flex } from "@orch-ui/components";
const dataCy = "newScheduleMaintenanceForm";

export interface ScheduleMaintenanceFormProps {
  maintenance: enhancedEimSlice.ScheduleMaintenanceRead;
  targetEntityType?: enhancedEimSlice.ScheduleMaintenanceTargetEntityType;
  onUpdate: (maintenance: enhancedEimSlice.ScheduleMaintenanceRead) => void;
  onSave: () => void;
  onClose: () => void;
}

/** maintenance form component  */
export const ScheduleMaintenanceForm = ({
  maintenance,
  targetEntityType = "host",
  onUpdate,
  onSave,
  onClose,
}: ScheduleMaintenanceFormProps) => {
  const cy = { "data-cy": dataCy };

  const targetData: enhancedEimSlice.ScheduleMaintenanceTargetData = {
    targetHostId: maintenance.targetHost?.resourceId,
    targetSiteId: maintenance.targetSite?.resourceId,
    targetRegionId: maintenance.targetRegion?.resourceId,
  };
  const targetEntityName = {
    host: maintenance.targetHost?.name ?? maintenance.targetHost?.resourceId,
    region:
      maintenance.targetRegion?.name ?? maintenance.targetRegion?.resourceId,
    site: maintenance.targetSite?.name ?? maintenance.targetSite?.resourceId,
  }[targetEntityType];

  /** contains success activate Maintenance messages definition */
  const activateMaintenanceMessage = {
    variant: MessageBannerAlertState.Success,
    messageTitle: "Maintenance Mode Created",
    messageBody: `${maintenance.name} is added to ${targetEntityName}`,
  };
  /** contains success updated Maintenance messages definition */
  const updateMaintenanceMessage = {
    variant: MessageBannerAlertState.Success,
    messageTitle: "Maintenance Mode Updated",
    messageBody: `maintenance mode is successfully updated for ${targetEntityName}`,
  };
  /** contains error Maintenance messages definition */
  const errorMaintenanceMessage = (
    maintenanceActivity: "activate" | "update",
    errMsg?: string,
  ) => ({
    messageTitle: "Maintenance Mode Failure",
    messageBody: `Failed to ${maintenanceActivity} maintenance mode ${maintenance.name} for ${targetEntityName}.${errMsg ? ` Err Msg: ${JSON.stringify(errMsg)}` : ""}`,
    variant: MessageBannerAlertState.Error,
  });

  const dispatch = useDispatch();

  /** This will set message and make it disappear after 15 seconds */
  const setMessageBannerState = (message: MessageBannerState) => {
    setTimeout(() => {
      dispatch(disableMessageBanner());
    }, 15000);
    dispatch(showMessageNotification(message));
  };

  /** Form control config */
  const {
    control: formControl,
    formState: { errors: formErrors },
    handleSubmit,
  } = useForm<enhancedEimSlice.ScheduleMaintenanceRead>({
    mode: "all",
    defaultValues: maintenance,
    values: maintenance,
    reValidateMode: "onSubmit",
  });

  /* State Management */
  const [isMaintenanceEdit, setIsMaintenanceEdit] = useState<boolean>(false);
  useEffect(() => {
    setIsMaintenanceEdit(maintenance.resourceId !== undefined);
  }, [maintenance.resourceId]);

  /* APIs */
  const [postSingleMaintenance] =
    eim.usePostV1ProjectsByProjectNameSchedulesSingleMutation();
  const [postRepeatedMaintenance] =
    eim.usePostV1ProjectsByProjectNameSchedulesRepeatedMutation();
  const [editSingleMaintenance] =
    eim.usePutV1ProjectsByProjectNameSchedulesSingleAndSingleScheduleIdMutation();
  const [editRepeatedMaintenance] =
    eim.usePutV1ProjectsByProjectNameSchedulesRepeatedAndRepeatedScheduleIdMutation();

  /** Add new maintenance via FM-API */
  const submitMaintenance = () => {
    const submitSingleMaintenance = isMaintenanceEdit
      ? editSingleMaintenance
      : postSingleMaintenance;
    const submitRepeatedMaintenance = isMaintenanceEdit
      ? editRepeatedMaintenance
      : postRepeatedMaintenance;

    let currentMonthApi, monthChangeApi;
    if (
      isSingleMaintenance(maintenance) &&
      maintenance.scheduleStatus !== "SCHEDULE_STATUS_UNSPECIFIED" &&
      // If not open-ended (or there is no-end for non-repeat maintenance) OR
      // If the end time for the maintenance given
      (maintenance.single.isOpenEnded || maintenance.single.endSeconds)
    ) {
      currentMonthApi = submitSingleMaintenance({
        projectName: SharedStorage.project?.name ?? "",
        ...(isMaintenanceEdit
          ? { singleScheduleId: maintenance.resourceId }
          : {}),
        singleSchedule: {
          name: maintenance.name,
          scheduleStatus: maintenance.scheduleStatus,
          ...targetData,
          startSeconds: maintenance.single.startSeconds,
          ...(!maintenance.single.isOpenEnded
            ? { endSeconds: maintenance.single.endSeconds }
            : {}),
        },
      });
    } else if (
      isRepeatedMaintenance(maintenance) &&
      maintenance.scheduleStatus !== "SCHEDULE_STATUS_UNSPECIFIED" &&
      maintenance.repeated.cronMonth !== "" &&
      maintenance.repeated.cronDayWeek !== ""
    ) {
      const isPrevMonth = maintenance.repeated.countPrevMonthOnTzGMT;
      const isNextMonth = maintenance.repeated.countNextMonthOnTzGMT;

      const repeatedMaintenancePostParam = {
        name: maintenance.name,
        scheduleStatus: maintenance.scheduleStatus,
        ...targetData,
        durationSeconds: maintenance.repeated.durationSeconds,
        cronHours: parseInt(maintenance.repeated.cronHours)?.toString(),
        cronMinutes: parseInt(maintenance.repeated.cronMinutes)?.toString(),
        cronMonth: maintenance.repeated.cronMonth,
        cronDayMonth: "*",
        cronDayWeek: "*",
        ...(maintenance.type === "repeat-monthly"
          ? {
              cronDayMonth: maintenance.repeated.cronDayMonth,
            }
          : {}),
        ...(maintenance.type === "repeat-weekly"
          ? {
              cronDayWeek: maintenance.repeated.cronDayWeek,
            }
          : {}),
      };

      // If conversion from local timezone selection to GMT (on api) make a month change w.r.t to corner dayOfMonth & time
      if (isPrevMonth || isNextMonth) {
        let cronMonthOnGMTChange = "*";
        if (maintenance.repeated.cronMonth !== "*") {
          cronMonthOnGMTChange = maintenance.repeated.cronMonth
            ?.split(",")
            .map((month) => {
              let monthChange;
              if (isPrevMonth) monthChange = -1;
              if (isNextMonth) monthChange = 1;
              if (monthChange) {
                return getNextCircularValue(
                  parseInt(month),
                  1,
                  12,
                  monthChange,
                ).toString();
              }
            })
            .filter((month) => month !== undefined)
            .join(",");
        }

        // Considering rest of the dates
        monthChangeApi = postRepeatedMaintenance({
          projectName: SharedStorage.project?.name ?? "",
          repeatedSchedule: {
            ...repeatedMaintenancePostParam,
            cronMonth: cronMonthOnGMTChange,
            cronDayMonth: (isPrevMonth && "31") || (isNextMonth && "1") || "*",
          },
        });
      }

      if (maintenance.repeated.cronDayMonth !== "") {
        currentMonthApi = submitRepeatedMaintenance({
          projectName: SharedStorage.project?.name ?? "",
          ...(isMaintenanceEdit
            ? { repeatedScheduleId: maintenance.resourceId }
            : {}),
          repeatedSchedule: repeatedMaintenancePostParam,
        });
      }
    }

    let apiCall;
    // Case: Call 2 apis if dayOfMonth make corner days 1 or 31 go to new month on GMT
    if (currentMonthApi && monthChangeApi) {
      Promise.all([monthChangeApi, currentMonthApi])
        .then(([res1, res2]) => {
          if (res1 && res2) {
            setMessageBannerState(
              isMaintenanceEdit
                ? updateMaintenanceMessage
                : activateMaintenanceMessage,
            );
            onSave();
          }
        })
        .catch((err) => {
          setMessageBannerState(errorMaintenanceMessage("update", err));
        });
      return;
    }

    // Case: Call 1 api call
    else if (!currentMonthApi && monthChangeApi) {
      // if only 1 or 31 is selected for any month
      apiCall = monthChangeApi;
    } else if (currentMonthApi) {
      // for general scenario
      apiCall = currentMonthApi;
    }

    if (apiCall) {
      apiCall
        .unwrap()
        .then(() => {
          setMessageBannerState(
            isMaintenanceEdit
              ? updateMaintenanceMessage
              : activateMaintenanceMessage,
          );
          onSave();
        })
        .catch((err) => {
          setMessageBannerState(
            errorMaintenanceMessage(
              isMaintenanceEdit ? "update" : "activate",
              err,
            ),
          );
        });
    } else {
      dispatch(
        showToast({
          message: "Please fill all required fields.",
          state: ToastState.Danger,
        }),
      );
    }
  };

  // set timezone to browser/system timezone
  const currentTimezoneTzCode = moment.tz.guess();
  const currentTimezoneUTC = moment.tz(moment.tz.guess()).format("Z");
  const currentTimezone = {
    label: `${currentTimezoneTzCode} (GMT${currentTimezoneUTC})`,
    tzCode: currentTimezoneTzCode,
    utc: currentTimezoneUTC,
  };
  const [timezone, setTimezone] = useState<Timezone>(currentTimezone);

  return (
    <form
      {...cy}
      className="schedule-maintenance-form"
      onSubmit={handleSubmit(submitMaintenance)}
    >
      <div className="schedule-maintenance-form__body">
        <Heading semanticLevel={6}>Details</Heading>
        <Flex
          cols={[12, 12]}
          {...(!formErrors?.name ? { colsMd: [6, 6] } : {})}
        >
          <div className="pa-1">
            <Controller
              name="name"
              control={formControl}
              rules={{
                required: true,
                maxLength: 20,
                pattern: new RegExp(
                  /^([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9-\s/]*[A-Za-z0-9])$/,
                ),
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  data-cy="name"
                  name="name"
                  label="Maintenance Name*"
                  placeholder="Enter a name"
                  size={InputSize.Large}
                  onInput={(e) => {
                    const value = e.currentTarget.value;
                    onUpdate({ ...maintenance, name: value });
                  }}
                  errorMessage={getDisplayNameValidationErrorMessage(
                    formErrors?.name?.type,
                    20,
                  )}
                  validationState={
                    formErrors?.name && Object.keys(formErrors?.name).length > 0
                      ? "invalid"
                      : "valid"
                  }
                />
              )}
            />
          </div>
          <div className="pa-1">
            <Dropdown
              data-cy="status"
              name="status"
              label="Maintenance Type*"
              placeholder="Select type"
              selectedKey={maintenance?.scheduleStatus}
              onSelectionChange={(selectedKey: eim.ScheduleStatus) => {
                onUpdate({ ...maintenance, scheduleStatus: selectedKey });
              }}
              size={DropdownSize.Large}
            >
              {maintenance.scheduleStatus === "SCHEDULE_STATUS_UNSPECIFIED"
                ? [
                    <Item key="SCHEDULE_STATUS_UNSPECIFIED">
                      Please select a Maintenance
                    </Item>,
                  ]
                : []}
              <Item key="SCHEDULE_STATUS_MAINTENANCE">Maintenance</Item>
              <Item key="SCHEDULE_STATUS_OS_UPDATE">OS Update</Item>
            </Dropdown>
          </div>
        </Flex>
        <Heading semanticLevel={6}>Maintenance Schedule</Heading>
        <Flex cols={[12, 12]} colsMd={[6, 6]}>
          <div className="pa-1">
            <Dropdown
              data-cy="type"
              name="type"
              label="Schedule Type*"
              placeholder="Select type"
              selectedKey={maintenance?.type}
              onSelectionChange={(
                selectedKey: enhancedEimSlice.ScheduleMaintenanceType,
              ) => {
                onUpdate({ ...maintenance, type: selectedKey });
              }}
              size={DropdownSize.Large}
            >
              <Item key="no-repeat">Does not repeat</Item>
              <Item key="repeat-weekly">Repeat by day of week</Item>
              <Item key="repeat-monthly">Repeat by day of month</Item>
            </Dropdown>
          </div>
          <div>
            {maintenance?.type === "no-repeat" && (
              <ToggleSwitch
                data-cy="isOpenEndedSwitch"
                isSelected={maintenance?.single?.isOpenEnded}
                onChange={(value) => {
                  onUpdate({
                    ...maintenance,
                    single: {
                      ...maintenance.single,
                      isOpenEnded: value,
                    },
                  });
                }}
                className="open-ended-switch"
              >
                <label>
                  Open-ended{" "}
                  <Tooltip
                    placement="left"
                    content="Set a maintenance schedule with no defined end."
                  >
                    <Icon icon="information-circle" />
                  </Tooltip>
                </label>
              </ToggleSwitch>
            )}
          </div>
        </Flex>
        <Flex cols={[12]}>
          <div className="pa-1">
            <Combobox
              data-cy="timezone"
              name="timezone"
              label="Time Zone*"
              placeholder="Select the time-zone from the list"
              selectedKey={timezone?.tzCode}
              onSelectionChange={(selectedKey: string) => {
                const newTimezone = timezones.find(
                  (timezoneCompare) => timezoneCompare?.tzCode === selectedKey,
                );
                if (newTimezone) {
                  setTimezone(newTimezone);
                }
              }}
              size="l"
            >
              {timezones &&
                timezones.map((timezone) => (
                  <Item key={timezone.tzCode}>{timezone.label}</Item>
                ))}
            </Combobox>
          </div>
        </Flex>

        {maintenance.type === "no-repeat" && (
          <SingleScheduleMaintenanceForm
            maintenance={maintenance}
            onUpdate={onUpdate}
            timezone={timezone}
            formControl={formControl}
            formErrors={formErrors}
          />
        )}

        {/* If maintenance is a repeated schedule on a daily basis (weekly or monthly once) */}
        {maintenance.type !== "no-repeat" && (
          <RepeatedScheduleMaintenanceForm
            maintenance={maintenance}
            onUpdate={onUpdate}
            timezone={timezone}
            formControl={formControl}
            formErrors={formErrors}
          />
        )}
      </div>
      <div className="schedule-maintenance-form__footer">
        <ButtonGroup align="end" data-cy="footerButtons">
          <Button
            data-cy="closeButton"
            className="close-drawer"
            variant="secondary"
            onPress={onClose}
          >
            Close
          </Button>
          <Button
            data-cy="saveButton"
            className="action-drawer"
            variant="action"
            isDisabled={Object.keys(formErrors).length !== 0}
            type="submit"
          >
            {isMaintenanceEdit ? "Update" : "Add"}
          </Button>
        </ButtonGroup>
      </div>
    </form>
  );
};
