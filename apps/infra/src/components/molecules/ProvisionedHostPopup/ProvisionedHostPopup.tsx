/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import { PopupOption } from "@orch-ui/components";
import {
  checkAuthAndRole,
  getObservabilityUrl,
  hostEditRoute,
  isHostAssigned,
  Role,
  RuntimeConfig,
  SharedStorage,
  useInfraNavigate,
} from "@orch-ui/utils";
import React, { useEffect, useState } from "react";
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
  host: infra.HostResourceRead;
  onDeauthorizeHostWithoutWorkload?: (hostId: string) => void;
  onScheduleMaintenance?: (targetEntity: infra.HostResourceRead) => void;
  onToggleVpro?: (boolean) => void;
};

/** This will show all available host actions within popup menu (active/configured, i.e, assigned/unassigned host only) */
const ProvisionedHostPopup = (props: ProvisionedHostPopupProps) => {
  const cy = { "data-cy": dataCy };
  const {
    host,
    onDeauthorizeHostWithoutWorkload,
    onScheduleMaintenance,
    onToggleVpro,
  } = props;

  const navigate = useInfraNavigate();

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
  const [deauthorizeHost] = infra.useHostServiceInvalidateHostMutation();

  /** Is host a `Provisioned Host with assigned workload`. Here, Workload and Cluster are synonymous */
  const isAssigned = host.instance && isHostAssigned(host.instance);
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
        if (host.resourceId)
          navigate(hostEditRoute, {
            id: host.resourceId,
          });
      },
    },
    {
      displayText: "Schedule Maintenance",
      disable: !checkAuthAndRole([Role.INFRA_MANAGER_WRITE]),
      onSelect: () => onScheduleMaintenance && onScheduleMaintenance(host),
    },
    ...((host.amtSku === "AMT_SKU_AMT" || host.amtSku === "AMT_SKU_ISM") &&
    host.currentAmtState !== "AMT_STATE_PROVISIONED"
      ? [
          {
            displayText: "Activate vPro",
            disable: !checkAuthAndRole([Role.INFRA_MANAGER_WRITE]),
            onSelect: () => onToggleVpro && onToggleVpro(true),
          },
        ]
      : []),
    ...((host.amtSku === "AMT_SKU_AMT" || host.amtSku === "AMT_SKU_ISM") &&
    host.currentAmtState === "AMT_STATE_PROVISIONED"
      ? [
          {
            displayText: "De-Activate vPro",
            disable: !checkAuthAndRole([Role.INFRA_MANAGER_WRITE]),
            onSelect: () => onToggleVpro && onToggleVpro(false),
          },
        ]
      : []),
  ];

  // Graphana: add Dashboard access
  const project = SharedStorage.project;
  if (getObservabilityUrl() && project) {
    provisionedHostPopup.push({
      displayText: "View Metrics",
      onSelect() {
        const url = `${getObservabilityUrl()}/d/edgenode_host/edge-node?orgId=1&refresh=30s&var-hostId=${
          host.resourceId
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
      resourceId: host.resourceId ?? "",
      note: deauthorizeReason,
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
