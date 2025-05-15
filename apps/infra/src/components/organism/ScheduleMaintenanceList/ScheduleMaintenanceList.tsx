/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { enhancedInfraSlice, infra } from "@orch-ui/apis";
import {
  ApiError,
  ConfirmationDialog,
  Empty,
  Popup,
  Table,
  TableColumn,
  TableLoader,
} from "@orch-ui/components";
import {
  inheritedScheduleToString,
  scheduleStatusToString,
  SharedStorage,
} from "@orch-ui/utils";
import { Button, ButtonGroup, Icon } from "@spark-design/react";
import {
  ButtonVariant,
  MessageBannerAlertState,
  ModalSize,
} from "@spark-design/tokens";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  disableMessageBanner,
  MessageBannerState,
  showMessageNotification,
} from "../../../store/notifications";
import { isSingleMaintenance } from "../../../store/utils";
import { ScheduleMaintenanceSubComponent } from "../../atom/ScheduleMaintenanceSubComponent/ScheduleMaintenanceSubComponent";
import "./ScheduleMaintenanceList.scss";

const dataCy = "scheduleMaintenanceList";

interface ScheduleMaintenanceTargetIds {
  hostId?: string;
  siteId?: string;
  regionId?: string;
}

export interface ScheduleMaintenanceListProps {
  targetEntity: enhancedInfraSlice.ScheduleMaintenanceTargetEntity;
  targetEntityType?: enhancedInfraSlice.ScheduleMaintenanceTargetEntityType;
  sort?: number[];
  onEditSelection: (
    maintenance: enhancedInfraSlice.ScheduleMaintenanceRead,
  ) => void;
  onClose: () => void;
}

/** This function will remove any expired single maintenance from list via end_seconds */
const removeExpiredSingleSchedules = (
  singleScheduleMaintenance: enhancedInfraSlice.ScheduleMaintenanceRead[],
): enhancedInfraSlice.ScheduleMaintenanceRead[] =>
  singleScheduleMaintenance.filter(
    (maintenance) =>
      !maintenance.single?.endSeconds ||
      maintenance.single?.endSeconds === 0 ||
      +new Date() < maintenance.single?.endSeconds * 1000,
  );

/** Convert RepeatedSchedule API response object to ScheduleMaintenance */
const convertRepeatedMaintenanceScheduleAPIScheduleMaintenance = (
  repeatedScheduleMaintenance: infra.SingleScheduleRead,
): enhancedInfraSlice.ScheduleMaintenanceRead => ({
  resourceId: repeatedScheduleMaintenance.repeatedScheduleID,
  name:
    repeatedScheduleMaintenance.name ??
    repeatedScheduleMaintenance.repeatedScheduleID ??
    "",
  scheduleStatus: repeatedScheduleMaintenance.scheduleStatus,
  type:
    repeatedScheduleMaintenance.cronDayMonth === "*"
      ? "repeat-weekly"
      : "repeat-monthly",
  targetHost: repeatedScheduleMaintenance.targetHost,
  targetSite: repeatedScheduleMaintenance.targetSite,
  targetRegion: repeatedScheduleMaintenance.targetRegion,
  repeated: {
    cronDayMonth: repeatedScheduleMaintenance.cronDayMonth,
    cronDayWeek: repeatedScheduleMaintenance.cronDayWeek,
    cronHours: repeatedScheduleMaintenance.cronHours,
    cronMinutes: repeatedScheduleMaintenance.cronMinutes,
    cronMonth: repeatedScheduleMaintenance.cronMonth,
    durationSeconds: repeatedScheduleMaintenance.durationSeconds,
  },
});

/** Convert SingleSchedule2 API response object to ScheduleMaintenance */
const convertSingleMaintenanceScheduleAPIScheduleMaintenance = (
  singleScheduleMaintenance: infra.SingleScheduleRead2,
): enhancedInfraSlice.ScheduleMaintenanceRead => ({
  resourceId: singleScheduleMaintenance.resourceId,
  name:
    singleScheduleMaintenance.name ??
    singleScheduleMaintenance.resourceId ??
    "",
  scheduleStatus: singleScheduleMaintenance.scheduleStatus,
  type: "no-repeat",
  targetHost: singleScheduleMaintenance.targetHost,
  targetSite: singleScheduleMaintenance.targetSite,
  targetRegion: singleScheduleMaintenance.targetRegion,
  single: {
    startSeconds: singleScheduleMaintenance.startSeconds,
    endSeconds: singleScheduleMaintenance.endSeconds,
  },
});

export const ScheduleMaintenanceList = ({
  targetEntity,
  targetEntityType = "host",
  onEditSelection,
  onClose,
}: ScheduleMaintenanceListProps) => {
  const cy = { "data-cy": dataCy };

  /** contains success deactivate Maintenance messages definition */
  const deactivatedMaintenanceMessage = {
    messageTitle: "Deactivated Maintenance Mode",
    messageBody: `${targetEntity.name} is now out of maintenance mode`,
    variant: MessageBannerAlertState.Success,
  };
  /** contains error Maintenance messages definition */
  const errorMaintenanceMessage = () => ({
    messageTitle: "Maintenance Mode Failure",
    messageBody: `Failed to deactivate maintenance mode for ${targetEntity.name}`,
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
  const [maintenanceOnDelete, setMaintenanceOnDelete] =
    useState<enhancedInfraSlice.ScheduleMaintenanceRead>();

  const [deleteMaintenanceWithoutRepeat] =
    infra.useDeleteV1ProjectsByProjectNameSchedulesSingleAndSingleScheduleIdMutation();
  const [deleteMaintenanceWithRepeat] =
    infra.useDeleteV1ProjectsByProjectNameSchedulesRepeatedAndRepeatedScheduleIdMutation();

  // TODO#2: move this to new maintenance list
  /** Delete a maintenance via INFRA-API */
  const deleteMaintenance = (
    maintenance: enhancedInfraSlice.ScheduleMaintenanceRead,
  ) => {
    let apiCall;
    if (maintenance.resourceId) {
      if (isSingleMaintenance(maintenance)) {
        apiCall = deleteMaintenanceWithoutRepeat({
          projectName: SharedStorage.project?.name ?? "",
          singleScheduleId: maintenance.resourceId,
        });
      } else {
        apiCall = deleteMaintenanceWithRepeat({
          projectName: SharedStorage.project?.name ?? "",
          repeatedScheduleId: maintenance.resourceId,
        });
      }
    }

    if (apiCall) {
      apiCall
        .unwrap()
        .then(() => {
          setMessageBannerState(deactivatedMaintenanceMessage);
        })
        .catch(() => setMessageBannerState(errorMaintenanceMessage()));
    } else {
      setMessageBannerState(errorMaintenanceMessage());
    }
    setMaintenanceOnDelete(undefined);
  };

  const targetIds: ScheduleMaintenanceTargetIds = {};
  // Note: target can be host or site. If targetSite is set then targetHost is undefined (not-set).
  if (targetEntityType === "region") {
    targetIds.regionId = targetEntity.resourceId;
  } else if (targetEntityType === "site") {
    targetIds.siteId = targetEntity.resourceId;
  } else {
    targetIds.hostId = targetEntity.resourceId;
  }

  const projectName = SharedStorage.project?.name ?? "";
  // TODO: this need to be converted to combine using filter
  // 1. Single schedule without expired endSeconds* (These are included!)
  // 2. All repeated schedules
  const {
    data: maintenanceJoin,
    isSuccess,
    isLoading,
    isError,
    error,
  } = infra.useScheduleServiceListSchedulesQuery(
    {
      projectName,
      ...targetIds,
    },
    {
      skip: !projectName,
    },
  );

  const combinedMaintenanceList: enhancedInfraSlice.ScheduleMaintenance[] =
    isSuccess
      ? [
          ...removeExpiredSingleSchedules(
            maintenanceJoin.singleSchedules.map(
              convertSingleMaintenanceScheduleAPIScheduleMaintenance,
            ),
          ),
          ...maintenanceJoin.repeatedSchedules.map(
            convertRepeatedMaintenanceScheduleAPIScheduleMaintenance,
          ),
        ]
      : [];
  const totalElements = isSuccess ? maintenanceJoin.totalElements : 0;

  const columns: TableColumn<enhancedInfraSlice.ScheduleMaintenance>[] = [
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Type",
      accessor: (item) => scheduleStatusToString(item.scheduleStatus),
    },
    {
      Header: "Inherited Source",
      accessor: (item) =>
        inheritedScheduleToString(item, targetEntityType, targetEntity),
    },
    {
      Header: "Action",
      textAlign: "center",
      Cell: (table: {
        row: { original: enhancedInfraSlice.ScheduleMaintenanceRead };
      }) => {
        const maintenance = table.row.original;
        return (
          <Popup
            options={[
              {
                displayText: "Delete",
                onSelect: () => {
                  if (maintenance.resourceId) {
                    setMaintenanceOnDelete(maintenance);
                  }
                },
              },
              {
                displayText: "Edit",
                onSelect: () =>
                  maintenance.resourceId && onEditSelection(maintenance),
              },
            ]}
            jsx={<Icon icon="ellipsis-v" />}
          />
        );
      },
    },
  ];

  const isEmpty = () => isSuccess && combinedMaintenanceList.length === 0;

  const maintenanceSubRow = ({
    original: maintenanceDetails,
  }: {
    original: enhancedInfraSlice.ScheduleMaintenance;
  }) => <ScheduleMaintenanceSubComponent maintenance={maintenanceDetails} />;

  const getContent = () => {
    if (isEmpty()) {
      return (
        <Empty icon="document-gear" title="No scheduled maintenance events" />
      );
    }
    if (isError) return <ApiError error={error} />;
    if (isLoading) return <TableLoader />;

    return (
      <Table
        key="maintenance-list-table"
        columns={columns}
        data={combinedMaintenanceList}
        totalOverallRowsCount={totalElements}
        subRow={maintenanceSubRow}
      />
    );
  };

  return (
    <div {...cy} className="schedule-maintenance-list">
      <div className="schedule-maintenance-list__body">{getContent()}</div>
      <div className="schedule-maintenance-list__footer">
        <ButtonGroup align="end" data-cy="footerButtons">
          <Button
            className="close-drawer"
            variant="secondary"
            onPress={onClose}
          >
            Close
          </Button>
        </ButtonGroup>
      </div>

      {maintenanceOnDelete && (
        <ConfirmationDialog
          showTriggerButton={false}
          triggerButtonId="delete-maintenance-confirmation"
          title="Confirm Maintenance Deletion"
          subTitle={`Are you sure you want to delete "${maintenanceOnDelete.name ?? maintenanceOnDelete.resourceId}"?`}
          isOpen={(maintenanceOnDelete && true) || false}
          confirmBtnVariant={ButtonVariant.Alert}
          confirmCb={() => deleteMaintenance(maintenanceOnDelete)}
          confirmBtnText="Delete"
          cancelCb={() => setMaintenanceOnDelete(undefined)}
          buttonPlacement="left-reverse"
          size={ModalSize.Medium}
        />
      )}
    </div>
  );
};
