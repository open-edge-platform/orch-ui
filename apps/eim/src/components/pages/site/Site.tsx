/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { eim } from "@orch-ui/apis";
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
import { ButtonVariant, ToastState } from "@spark-design/tokens";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ScheduleMaintenanceDrawer } from "../../../components/organism/ScheduleMaintenanceDrawer/ScheduleMaintenanceDrawer";
import {
  homeBreadcrumb,
  sitesBreadcrumb,
  sitesMenuItem,
} from "../../../routes/const";
import { useAppDispatch } from "../../../store/hooks";
import { setErrorInfo, showToast } from "../../../store/notifications";
import SiteTable from "../../organism/site/SitesTable";
import "./Site.scss";

/** @deprecated  */
const Site = () => {
  const { regionId } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [deleteSite] =
    eim.useDeleteV1ProjectsByProjectNameRegionsAndRegionIdSitesSiteIdMutation();
  const [siteToDelete, setSiteToDelete] = useState<eim.SiteRead | null>(null);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] =
    useState<boolean>(false);
  const breadcrumb = useMemo(() => [homeBreadcrumb, sitesBreadcrumb], []);
  useEffect(() => {
    dispatch(setBreadcrumb(breadcrumb));
    dispatch(setActiveNavItem(sitesMenuItem));
  }, []);
  const [scheduleMaintenanceSite, setScheduleMaintenanceSite] = useState<
    eim.SiteRead | undefined
  >();

  const deleteSiteFn = async (siteId: string) => {
    try {
      await deleteSite({
        regionId: regionId ?? "", //TODO: evaluate
        projectName: SharedStorage.project?.name ?? "",
        siteId,
      })
        .unwrap()
        .catch((error) => {
          setErrorInfo(error);
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
    setDeleteConfirmationOpen(false);
  };

  const actions: TableColumn<eim.SiteRead> = {
    Header: "Actions",
    textAlign: "center",
    padding: "0",
    accessor: (site) => {
      return (
        <Popup
          dataCy="sitePopup"
          jsx={<Icon artworkStyle="light" icon="ellipsis-v" />}
          options={[
            {
              displayText: "View Details",
              onSelect: () => {
                navigate(
                  `../regions/${site.region?.resourceId}/sites/${site.resourceId}`,
                  {
                    relative: "path",
                  },
                );
              },
            },
            {
              displayText: "Schedule Maintenance",
              onSelect: () => {
                setScheduleMaintenanceSite(site);
              },
            },
            {
              displayText: "Delete",
              disable: !checkAuthAndRole([Role.INFRA_MANAGER_WRITE]),
              onSelect: () => {
                setSiteToDelete(site);
                setDeleteConfirmationOpen(true);
              },
            },
          ]}
        />
      );
    },
  };

  return (
    <div data-cy="site">
      <Heading semanticLevel={1} size="l">
        Sites
      </Heading>

      {regionId && (
        <SiteTable
          regionId={regionId}
          actions={actions}
          hasPermission={checkAuthAndRole([Role.INFRA_MANAGER_WRITE])}
          hiddenColumns={["select"]}
          basePath={"../regions"}
          sort={[0]}
          source="site"
        />
      )}

      {deleteConfirmationOpen && (
        <ConfirmationDialog
          showTriggerButton={false}
          content={`Are you sure you want to delete Site "${
            siteToDelete?.name ?? siteToDelete?.resourceId
          }"?`}
          isOpen={deleteConfirmationOpen}
          confirmCb={() => deleteSiteFn(siteToDelete?.resourceId ?? "")}
          confirmBtnText="Delete"
          confirmBtnVariant={ButtonVariant.Alert}
          cancelCb={() => setDeleteConfirmationOpen(false)}
        />
      )}
      {/* Schedule Maintenance Drawer */}
      {scheduleMaintenanceSite && (
        <ScheduleMaintenanceDrawer
          targetEntity={scheduleMaintenanceSite}
          targetEntityType="site"
          isDrawerShown={true}
          setHideDrawer={() => setScheduleMaintenanceSite(undefined)}
        />
      )}
    </div>
  );
};

export default Site;
