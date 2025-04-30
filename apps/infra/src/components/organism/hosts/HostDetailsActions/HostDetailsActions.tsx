/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import { ConfirmationDialog } from "@orch-ui/components";
import { SharedStorage } from "@orch-ui/utils";
import { ButtonVariant } from "@spark-design/tokens";
import { useState } from "react";
import { useAppDispatch } from "../../../../store/hooks";
import {
  deleteHostInstanceFn,
  showErrorMessageBanner,
  showSuccessMessageBanner,
} from "../../../../store/utils";
import { GenericHostPopupProps } from "../../../atom/GenericHostPopup/GenericHostPopup";
import OnboardedHostPopup from "../../../molecules/OnboardedHostPopup/OnboardedHostPopup";
import ProvisionedHostPopup from "../../../molecules/ProvisionedHostPopup/ProvisionedHostPopup";
import RegisteredHostPopup from "../../../molecules/RegisteredHostPopup/RegisteredHostPopup";
import { RegisterHostDrawer } from "../../RegisterHostDrawer/RegisterHostDrawer";
import { ScheduleMaintenanceDrawer } from "../../ScheduleMaintenanceDrawer/ScheduleMaintenanceDrawer";
import DeauthorizeHostStandalone from "../DeauthorizeHostStandalone/DeauthorizeHostStandalone";

const dataCy = "hostDetailsActions";
export type HostDetailsActionsProp = Omit<
  GenericHostPopupProps,
  // Below props are all ready applied within HostDetailsActions
  "additionalPopupOptions" | "onDeauthorize" | "onDelete"
>;

/** This renders buttons for all host actions based on configured/unconfigured property of host */
const HostDetailsActions = (props: HostDetailsActionsProp) => {
  const cy = { "data-cy": dataCy };
  const { host, basePath } = props;

  const dispatch = useAppDispatch();

  const [deleteConfirmationOpen, setDeleteConfirmationOpen] =
    useState<boolean>(false);
  const [deauthorizeConfirmationOpen, setDeauthorizeConfirmationOpen] =
    useState<boolean>(false);
  const [isScheduleMaintenanceDrawerOpen, setIsScheduleMaintenanceDrawerOpen] =
    useState<boolean>(false);
  const [isRegisterHostDrawerOpen, setIsRegisterHostDrawerOpen] =
    useState<boolean>(false);

  const [onboardHost] =
    infra.usePatchV1ProjectsByProjectNameComputeHostsAndHostIdRegisterMutation();

  const onDelete = () => {
    setDeleteConfirmationOpen(true);
  };
  const onDeauthorize = () => {
    setDeauthorizeConfirmationOpen(true);
  };
  const onRegisterHostEdit = () => {
    setIsRegisterHostDrawerOpen(true);
  };
  const onRegisterHostOnboard = () => {
    onboardHost({
      projectName: SharedStorage.project?.name ?? "",
      hostId: host.resourceId!,
      body: { autoOnboard: true },
    })
      .unwrap()
      .then(() => {
        showSuccessMessageBanner(dispatch, "Host is now being onboarded.");
      })
      .catch(() => {
        showErrorMessageBanner(dispatch, "Failed to onboard host !");
      });
  };

  // Note: By default upon GET `compute/hosts` doesnot specify existance of workloadMember within `host.instance`.
  // We need to make seperate instance call to fetch complete instance data by `host.instance.resourceId`.
  const { data: instanceRef } =
    infra.useGetV1ProjectsByProjectNameComputeInstancesAndInstanceIdQuery(
      {
        projectName: SharedStorage.project?.name ?? "",
        instanceId: host.instance?.resourceId ?? "",
      },
      { skip: !host.instance?.resourceId },
    );

  const getHostPopup = () => {
    if (host.instance) {
      // if its a provisioned host (with/without assigned workload/cluster)
      return (
        <ProvisionedHostPopup
          {...props}
          // Passing host with complete instance (having workloadMember details)... as per props Note.
          host={{ ...host, instance: instanceRef }}
          onDelete={onDelete}
          onDeauthorizeHostWithoutWorkload={onDeauthorize}
          onScheduleMaintenance={() => {
            setIsScheduleMaintenanceDrawerOpen(true);
          }}
        />
      );
    } else if (
      host.currentState === "HOST_STATE_REGISTERED" ||
      host.currentState === "HOST_STATE_UNSPECIFIED"
    ) {
      // else if its a registered host
      return (
        <RegisteredHostPopup
          {...props}
          onDelete={onDelete}
          onDeauthorize={onDeauthorize}
          onEdit={onRegisterHostEdit}
          onOnboard={onRegisterHostOnboard}
        />
      );
    }
    // else its onboarded host
    return (
      <OnboardedHostPopup
        {...props}
        onDelete={onDelete}
        onDeauthorize={onDeauthorize}
      />
    );
  };

  return (
    <div className="host-details-actions" {...cy}>
      {getHostPopup()}

      {deleteConfirmationOpen && (
        <ConfirmationDialog
          title="Confirm Host Deletion"
          subTitle={`Are you sure you want to delete Host "${
            host.name || host.resourceId
          }"?`}
          content="This will permanently remove the host from the system and cannot be undone."
          isOpen={deleteConfirmationOpen}
          buttonPlacement="left-reverse"
          confirmCb={() => {
            deleteHostInstanceFn(dispatch, host);
            setDeleteConfirmationOpen(false);
          }}
          confirmBtnText="Delete"
          confirmBtnVariant={ButtonVariant.Alert}
          cancelCb={() => setDeleteConfirmationOpen(false)}
        />
      )}

      {deauthorizeConfirmationOpen && host.resourceId && (
        <DeauthorizeHostStandalone
          basePath={basePath}
          hostId={host.resourceId}
          hostName={host.name}
          setDeauthorizeConfirmationOpen={setDeauthorizeConfirmationOpen}
          isDeauthConfirmationOpen={deauthorizeConfirmationOpen}
        />
      )}

      {/* Schedule Maintenance Drawer */}
      {isScheduleMaintenanceDrawerOpen && (
        <ScheduleMaintenanceDrawer
          targetEntity={host}
          isDrawerShown
          setHideDrawer={() => setIsScheduleMaintenanceDrawerOpen(false)}
        />
      )}

      {isRegisterHostDrawerOpen && (
        <RegisterHostDrawer
          host={host}
          isOpen={isRegisterHostDrawerOpen}
          onHide={() => {
            setIsRegisterHostDrawerOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default HostDetailsActions;
