/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { eim } from "@orch-ui/apis";
import { PopupOption } from "@orch-ui/components";
import {
  checkAuthAndRole,
  getObservabilityUrl,
  isHostAssigned,
  Role,
  RuntimeConfig,
  SharedStorage,
} from "@orch-ui/utils";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setErrorInfo } from "../../../store/notifications";
import GenericHostPopup, {
  GenericHostPopupProps,
} from "../../atom/GenericHostPopup/GenericHostPopup";
import "./ProvisionedHostPopup.scss";

const dataCy = "provisionedHostPopup";
export type ProvisionedHostPopupProps = Omit<
  GenericHostPopupProps,
  "additionalPopupOptions" | "onDeauthorize" | "showDeleteOption"
> & {
  /**
   * Provisioned host with an instance. (with/without assigning to workload/cluster)
   *
   * Note: If instance is assigned make sure instance shows workloadMember before passing to this field.
   **/
  host: eim.HostRead;
  onDeauthorizeHostWithoutWorkload?: (hostId: string) => void;
  onScheduleMaintenance?: (targetEntity: eim.HostRead) => void;
};

/** This will show all available host actions within popup menu (active/configured, i.e, assigned/unassigned host only) */
const ProvisionedHostPopup = (props: ProvisionedHostPopupProps) => {
  const cy = { "data-cy": dataCy };
  const {
    host,
    basePath = "",
    onDeauthorizeHostWithoutWorkload,
    onScheduleMaintenance,
  } = props;

  const navigate = useNavigate();

  // Deauthorizing a Host
  const [
    deauthorizeHostWithinWorkloadIsOpen,
    setDeauthorizeHostWithinWorkloadIsOpen,
  ] = useState<boolean>(false);
  const [
    DeauthorizeHostConfirmationDialogRemote,
    setDeauthorizeHostConfirmationDialogRemote,
  ] = useState<React.ComponentType<any> | null>(null);

  useEffect(() => {
    // Update mfe component only if component is not active.
    // This will avoid flickering render of remote component upon polling.
    if (!deauthorizeHostWithinWorkloadIsOpen) {
      setDeauthorizeHostConfirmationDialogRemote(
        RuntimeConfig.isEnabled("CLUSTER_ORCH")
          ? React.lazy(
              async () =>
                await import("ClusterOrchUI/DeauthorizeNodeConfirmationDialog"),
            )
          : null,
      );
    }
  }, [deauthorizeHostWithinWorkloadIsOpen]);
  const [deauthorizeHost] =
    eim.usePutV1ProjectsByProjectNameComputeHostsAndHostIdInvalidateMutation();

  /** Is host a `Provisioned Host with assigned workload`. Here, Workload and Cluster are synonymous */
  const isAssigned = host.instance && isHostAssigned([host.instance]);
  const workloadReference =
    host.instance &&
    host.instance.workloadMembers?.find(
      (m) => m.kind === "WORKLOAD_MEMBER_KIND_CLUSTER_NODE",
    );

  const provisionedHostPopup: PopupOption[] = [
    {
      displayText: "Edit",
      disable: !checkAuthAndRole([Role.INFRA_MANAGER_WRITE]),
      onSelect: async () => {
        navigate(`${basePath}../host/${host.resourceId}/edit`, {
          relative: "path",
        });
      },
    },
    {
      displayText: "Schedule Maintenance",
      disable: !checkAuthAndRole([Role.INFRA_MANAGER_WRITE]),
      onSelect: () => onScheduleMaintenance && onScheduleMaintenance(host),
    },
  ];

  // Graphana: add Dashboard access
  const project = SharedStorage.project;
  if (getObservabilityUrl() && project) {
    provisionedHostPopup.push({
      displayText: "View Metrics",
      onSelect() {
        const url = `${getObservabilityUrl()}/d/edgenode_host/edge-node?orgId=1&refresh=30s&var-guid=${
          host.uuid
        }&var-projectId=${project.uID}&var-projectName=${project.name}`;
        window.open(url, "_newtab");
      },
      disable: false,
    });
  }

  /**
   * Deauthorize host only.
   *
   * For Letting the remote component in CLUSTER_ORCH know
   * how to deauthorize node after removing node/host from cluster.
   **/
  const deauthorizeHostFn = async (deauthorizeReason: string) => {
    return await deauthorizeHost({
      projectName: SharedStorage.project?.name ?? "",
      hostId: host.resourceId ?? "",
      hostOperationWithNote: { note: deauthorizeReason },
    });
  };

  /** Decide & Execute,
   * - if we need to perform usual flow onDeauthorize (in case of `Provisioned host without assigned workload/cluster`).
   * - if we need to perform `Provisioned host with assigned workload/cluster` specific deauthorize flow.
   **/
  const onDeauthorizeProvisionedHost = () => {
    if (isAssigned) {
      // Deauthorize `Provisioned host with assigned workload/cluster`
      setDeauthorizeHostWithinWorkloadIsOpen(true);
    } else {
      // Deauthorize `Provisioned host without assigned workload/cluster`
      if (onDeauthorizeHostWithoutWorkload)
        onDeauthorizeHostWithoutWorkload(host.resourceId!);
    }
  };

  return (
    <div className="provisioned-host-popup" {...cy}>
      <GenericHostPopup
        {...props}
        additionalPopupOptions={provisionedHostPopup}
        showDeleteOption={!isAssigned}
        onDeauthorize={onDeauthorizeProvisionedHost}
      />

      {/* Below is only called when Deauthorizing `Provisioned host with assigned workload/cluster`! */}
      {deauthorizeHostWithinWorkloadIsOpen &&
        // enable Deauthorize if cluster orch is available
        DeauthorizeHostConfirmationDialogRemote !== null && (
          <React.Suspense fallback={<></>}>
            <DeauthorizeHostConfirmationDialogRemote
              clusterName={workloadReference?.workload?.name}
              hostName={host.name}
              hostId={host.resourceId}
              hostUuid={host.uuid}
              isDeauthConfirmationOpen={deauthorizeHostWithinWorkloadIsOpen}
              setDeauthorizeConfirmationOpen={
                setDeauthorizeHostWithinWorkloadIsOpen
              }
              deauthorizeHostFn={deauthorizeHostFn}
              setErrorInfo={setErrorInfo}
              skipNodeDeletion={!workloadReference}
            />
          </React.Suspense>
        )}
    </div>
  );
};

export default ProvisionedHostPopup;
