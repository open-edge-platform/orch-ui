/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { eim } from "@orch-ui/apis";
import { ConfirmationDialog, Popup, PopupOption } from "@orch-ui/components";
import {
  checkAuthAndRole,
  getObservabilityUrl,
  isHostAssigned,
  Role,
  RuntimeConfig,
  SharedStorage,
} from "@orch-ui/utils";
import { Icon } from "@spark-design/react";
import { ButtonVariant } from "@spark-design/tokens";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setErrorInfo } from "../../../../store/notifications";

import DeauthorizeHostStandalone from "../DeauthorizeHostStandalone/DeauthorizeHostStandalone";

import { useAppDispatch } from "../../../../store/hooks";
import { deleteHostInstanceFn } from "../../../../store/utils";
import { ScheduleMaintenanceDrawer } from "../../ScheduleMaintenanceDrawer/ScheduleMaintenanceDrawer";
import "./HostPopup.scss";

interface HostPopupProps {
  /** host for which this popup affects upon. */
  host: eim.HostRead;
  /** instance asssociated with this host, if exists. For assigned and unassigned host only.
   * TODO: REMOVE this line after removing instance prop (from parent)
   **/
  instance?: eim.InstanceRead;
  /** if true then show view details else hide. hide is useful in host details page.  */
  showViewDetailsOption?: boolean;
  /** render button subcomponent/custom click component for which onClick will show the popup. By default show ellipsis.*/
  jsx?: React.ReactNode;
  /** This refers to where the path for links should start from, eg: in case of a ListView all paths are relative the current (""), in case of a detail view we need to go back up one level ("../") */
  basePath?: string;
}

/** This will show all available host actions within popup menu (active/configured, i.e, assigned/unassigned host only) */
const HostPopup = ({
  host,
  // TODO: REMOVE this line after removing instance prop (from parent)
  instance,
  showViewDetailsOption = true,
  jsx = <Icon artworkStyle="light" icon="ellipsis-v" />,
  basePath = "",
}: HostPopupProps) => {
  // MFE component imports
  const [
    DeauthorizeHostConfirmationDialogRemote,
    setDeauthorizeHostConfirmationDialogRemote,
  ] = useState<React.ComponentType<any> | null>(null);
  // const [AddHostToClusterRemote, setAddHostToClusterRemote] =
  //   useState<React.ComponentType<any> | null>(null);

  // Hooks and State Management
  const navigate = useNavigate();
  // const [isHostAddToDrawerShown, setIsHostAddToDrawerShown] =
  //   useState<boolean>(false);
  const [isScheduleMaintenanceDrawerOpen, setIsScheduleMaintenanceDrawerOpen] =
    useState<boolean>(false);
  // temporary hidden, waiting for redesign, more info: LPUUH-1917
  // useEffect(() => {
  //   // Update mfe component only if component is not active
  //   if (!isHostAddToDrawerShown) {
  //     setAddHostToClusterRemote(
  //       RuntimeConfig.isEnabled("CLUSTER_ORCH")
  //         ? React.lazy(async () => await import("ClusterOrchUI/AddToClusterDrawer"))
  //         : null,
  //     );
  //   }
  // }, [isHostAddToDrawerShown]);

  // Delete Host and Instance
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] =
    useState<boolean>(false);

  // Deauthorize Host
  const [deauthorizeHost] =
    eim.usePutV1ProjectsByProjectNameComputeHostsAndHostIdInvalidateMutation();
  const [deauthorizeConfirmationOpen, setDeauthorizeConfirmationOpen] =
    useState<boolean>(false);

  const dispatch = useAppDispatch();
  useEffect(() => {
    // Update mfe component only if component is not active
    if (!deauthorizeConfirmationOpen) {
      setDeauthorizeHostConfirmationDialogRemote(
        RuntimeConfig.isEnabled("CLUSTER_ORCH")
          ? React.lazy(
              async () =>
                await import("ClusterOrchUI/DeauthorizeNodeConfirmationDialog"),
            )
          : null,
      );
    }
  }, [deauthorizeConfirmationOpen]);

  /** Assigned Host: Get the workload. For checking if host is associated with a cluster workload */
  const isAssigned = instance && isHostAssigned([instance]);

  // Required for `Deauthorising an Assigned Host`
  // Note: `host.instance` doesnot contain `host.instance.workloadMembers`
  // In order to get workloadMembers of instance
  const { data: instanceRef } =
    eim.useGetV1ProjectsByProjectNameComputeInstancesAndInstanceIdQuery(
      {
        projectName: SharedStorage.project?.name ?? "",
        instanceId: instance?.resourceId ?? host.instance?.resourceId ?? "",
      },
      { skip: !instance?.resourceId && !host.instance?.resourceId },
    );

  const IsHavingWorkloads =
    instanceRef && (instanceRef.workloadMembers?.length ?? -1 > 0);
  const workloadReference =
    instanceRef &&
    instanceRef.workloadMembers?.find(
      (m) => m.kind === "WORKLOAD_MEMBER_KIND_CLUSTER_NODE",
    );

  /** Host action decision in popup */
  // It probably makes sense to move the <Popup> in a separate component that renders
  // the appropriate elements based on the Host state
  const getPopupOptions = (host: eim.HostRead): PopupOption[] => {
    const opts: PopupOption[] = [];

    if (showViewDetailsOption) {
      opts.push({
        displayText: "View Details",
        onSelect: () => {
          navigate(
            `${basePath}../${isAssigned ? "host" : "unassigned-host"}/${
              host.resourceId
            }`,
            { relative: "path" },
          );
        },
        disable: false,
      });
    }

    opts.push(
      {
        displayText: "Edit",
        disable: !checkAuthAndRole([Role.INFRA_MANAGER_WRITE]),
        onSelect: async () => {
          navigate(
            `${basePath}../${isAssigned ? "host" : "unassigned-host"}/${
              host.resourceId
            }/edit`,
            {
              relative: "path",
            },
          );
        },
      },

      {
        displayText: "Schedule Maintenance",
        disable: !checkAuthAndRole([Role.INFRA_MANAGER_WRITE]),
        onSelect: () => {
          setIsScheduleMaintenanceDrawerOpen(true);
        },
      },
    );
    // Graphana: add Dashboard access link
    if (getObservabilityUrl()) {
      opts.push({
        displayText: "View Metrics",
        onSelect() {
          const url = `${getObservabilityUrl()}/d/edgenode_host/edge-node?orgId=1&refresh=30s&var-guid=${
            host.uuid
          }`;
          window.open(url, "_newtab");
        },
        disable: false,
      });
    }

    opts.push({
      displayText: "Deauthorize",
      disable: !checkAuthAndRole([Role.INFRA_MANAGER_WRITE]),
      onSelect: () => {
        setDeauthorizeConfirmationOpen(true);
      },
    });

    // Unassigned Host: Show delete only if instance exist and host is unassigned (workloadMemberId is undefined)
    if (!IsHavingWorkloads) {
      // temporary hidden, waiting for redesign, more info: LPUUH-1917
      // if (RuntimeConfig.isEnabled("CLUSTER_ORCH")) {
      //   opts.push({
      //     displayText: "Add To Cluster",
      //     disable: !checkAuthAndRole([Role.INFRA_MANAGER_WRITE]),
      //     onSelect: () => {
      //       setIsHostAddToDrawerShown(true);
      //     },
      //   });
      // }

      opts.push({
        displayText: "Delete",
        disable: !checkAuthAndRole([Role.INFRA_MANAGER_WRITE]),
        onSelect: () => {
          setDeleteConfirmationOpen(true);
        },
      });
    }

    return opts;
  };

  const deauthorizeHostFn = async (deauthorizeReason: string) => {
    return await deauthorizeHost({
      projectName: SharedStorage.project?.name ?? "",
      hostId: host.resourceId ?? "",
      hostOperationWithNote: { note: deauthorizeReason },
    });
  };

  return (
    <div className="host-popup">
      <Popup dataCy="hostPopup" jsx={jsx} options={getPopupOptions(host)} />

      {deleteConfirmationOpen && (
        <ConfirmationDialog
          showTriggerButton={false}
          content={`Are you sure you want to delete Host "${
            host.name ?? host.resourceId
          }"?`}
          isOpen={deleteConfirmationOpen}
          confirmCb={() => {
            deleteHostInstanceFn(dispatch, host, instance).then(() => {
              const hostTablePageLink = "unassigned-hosts";
              navigate(`${basePath}../${hostTablePageLink}`, {
                relative: "path",
              });
            });
            setDeleteConfirmationOpen(false);
          }}
          confirmBtnText="Delete"
          confirmBtnVariant={ButtonVariant.Alert}
          cancelCb={() => setDeleteConfirmationOpen(false)}
        />
      )}

      {deauthorizeConfirmationOpen &&
        // enable Deauthorize if cluster orch is available
        DeauthorizeHostConfirmationDialogRemote !== null && (
          <React.Suspense fallback={<></>}>
            <DeauthorizeHostConfirmationDialogRemote
              clusterName={workloadReference?.workload?.name}
              hostName={host.name}
              hostId={host.resourceId}
              hostUuid={host.uuid}
              isDeauthConfirmationOpen={deauthorizeConfirmationOpen}
              setDeauthorizeConfirmationOpen={setDeauthorizeConfirmationOpen}
              deauthorizeHostFn={deauthorizeHostFn}
              setErrorInfo={setErrorInfo}
              skipNodeDeletion={!workloadReference}
            />
          </React.Suspense>
        )}

      {deauthorizeConfirmationOpen &&
        // If ClusterOrch is disabled: enable deauthorize with standalone mode
        DeauthorizeHostConfirmationDialogRemote === null &&
        host.resourceId && (
          <DeauthorizeHostStandalone
            hostId={host.resourceId}
            hostName={host.name}
            setDeauthorizeConfirmationOpen={setDeauthorizeConfirmationOpen}
            isDeauthConfirmationOpen={deauthorizeConfirmationOpen}
          />
        )}

      {/* temporary hidden, waiting for redesign, more info: LPUUH-1917 */}
      {/*{AddHostToClusterRemote !== null && isHostAddToDrawerShown && (*/}
      {/*  <React.Suspense fallback={<></>}>*/}
      {/*    <AddHostToClusterRemote*/}
      {/*      host={host}*/}
      {/*      isDrawerShown={isHostAddToDrawerShown}*/}
      {/*      setHideDrawer={() => setIsHostAddToDrawerShown(false)}*/}
      {/*    />*/}
      {/*  </React.Suspense>*/}
      {/*)}*/}

      {/* Schedule Maintenance Drawer */}
      {isScheduleMaintenanceDrawerOpen && (
        <ScheduleMaintenanceDrawer
          targetEntity={host}
          isDrawerShown
          setHideDrawer={() => setIsScheduleMaintenanceDrawerOpen(false)}
        />
      )}
    </div>
  );
};

export default HostPopup;
