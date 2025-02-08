/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import {
  ConfirmationDialog,
  Popup,
  setActiveNavItem,
  setBreadcrumb,
  TableColumn,
} from "@orch-ui/components";
import {
  checkAuthAndRole,
  parseError,
  Role,
  SharedStorage,
} from "@orch-ui/utils";
import { Heading, Icon } from "@spark-design/react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import RegionsTable from "../../organism/region/RegionsTable";
import "./Region.scss";

import { eim } from "@orch-ui/apis";
import { ButtonVariant, ToastState } from "@spark-design/tokens";
import { ScheduleMaintenanceDrawer } from "../../../components/organism/ScheduleMaintenanceDrawer/ScheduleMaintenanceDrawer";
import {
  homeBreadcrumb,
  regionsBreadcrumb,
  regionsMenuItem,
} from "../../../routes/const";
import { useAppDispatch } from "../../../store/hooks";
import { setErrorInfo, showToast } from "../../../store/notifications";

export default function Region() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [deleteRegion] =
    eim.useDeleteV1ProjectsByProjectNameRegionsAndRegionIdMutation();
  const breadcrumb = useMemo(() => [homeBreadcrumb, regionsBreadcrumb], []);
  useEffect(() => {
    dispatch(setBreadcrumb(breadcrumb));
    dispatch(setActiveNavItem(regionsMenuItem));
  }, []);
  const [regionToDelete, setRegionToDelete] = useState<eim.RegionRead | null>(
    null,
  );
  const [scheduleMaintenanceRegion, setScheduleMaintenanceRegion] = useState<
    eim.RegionRead | undefined
  >();

  const deleteRegionFn = async (regionId: string) => {
    try {
      await deleteRegion({
        projectName: SharedStorage.project?.name ?? "",
        regionId,
      })
        .unwrap()
        .catch((error) => {
          dispatch(
            showToast({
              state: ToastState.Danger,
              message: parseError(error).data,
            }),
          );
        });
      setErrorInfo();
    } catch (e) {
      setErrorInfo(e);
    }
    setRegionToDelete(null);
  };

  const actions: TableColumn<eim.RegionRead> = {
    Header: "Action",
    textAlign: "center",
    padding: "0",
    accessor: (region) => {
      return (
        <>
          <Popup
            dataCy="regionPopup"
            jsx={<Icon artworkStyle="light" icon="ellipsis-v" />}
            options={[
              {
                displayText: "View Details",
                onSelect: () => {
                  navigate(`../regions/${region.resourceId}`, {
                    relative: "path",
                  });
                },
              },
              {
                displayText: "Schedule Maintenance",
                onSelect: () => {
                  setScheduleMaintenanceRegion(region);
                },
              },
              {
                displayText: "Delete",
                disable: !checkAuthAndRole([Role.INFRA_MANAGER_WRITE]),
                onSelect: async () => {
                  setRegionToDelete(region);
                  const el = document.getElementById("region-confirmation");
                  el?.click();
                },
              },
            ]}
          />
        </>
      );
    },
  };

  return (
    <div data-cy="iaaSRegions">
      <Heading semanticLevel={1} size="l">
        Regions
      </Heading>

      <div data-cy="table">
        <RegionsTable
          actions={actions}
          hasPermission={checkAuthAndRole([Role.INFRA_MANAGER_WRITE])}
          hiddenColumns={["select"]}
          sort={[0]}
        />
      </div>

      <ConfirmationDialog
        showTriggerButton={false}
        triggerButtonId="region-confirmation"
        content={`Are you sure you want to delete Region "${
          regionToDelete?.name ?? regionToDelete?.resourceId
        }"?`}
        confirmCb={() => {
          if (regionToDelete) deleteRegionFn(regionToDelete.resourceId!);
        }}
        confirmBtnText="Delete"
        confirmBtnVariant={ButtonVariant.Alert}
        cancelCb={() => {
          setRegionToDelete(null);
        }}
      />

      {scheduleMaintenanceRegion && (
        <ScheduleMaintenanceDrawer
          targetEntity={scheduleMaintenanceRegion}
          targetEntityType="region"
          isDrawerShown={true}
          setHideDrawer={() => setScheduleMaintenanceRegion(undefined)}
        />
      )}
    </div>
  );
}
