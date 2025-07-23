/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { cm, infra } from "@orch-ui/apis";
import { SharedStorage } from "@orch-ui/utils";
import { ToastState } from "@spark-design/tokens";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { showToast } from "../../../store/notifications";
import {
  HostData,
  removeHost,
  selectHostProvisionState,
} from "../../../store/provisionHost";

type ProvisionStateItem = {
  status: "pending" | "inProgress" | "completed" | "failed";
  result: any;
  error: any;
};

type HostProvisionState = {
  register: ProvisionStateItem;
  hostDetails: ProvisionStateItem;
  instance: ProvisionStateItem;
  cluster: ProvisionStateItem;
};

type ProvisionState = {
  [hostSerialNumber: string]: HostProvisionState;
};

const INITIAL_PROVISION_STATE: ProvisionStateItem = {
  status: "pending",
  result: null,
  error: null,
};

const useProvisioningState = () => {
  const [provisionState, setProvisionState] = useState<ProvisionState>({});

  const initializeState = (hosts: HostData[]) => {
    const initialState = {};
    hosts.forEach((host) => {
      if (!host.serialNumber) {
        console.warn(
          `Host ${host.name} does not have a serial number. Skipping initialization.`,
        );
        return;
      }

      initialState[host.serialNumber] = {
        register: INITIAL_PROVISION_STATE,
        hostDetails: INITIAL_PROVISION_STATE,
        instance: INITIAL_PROVISION_STATE,
        cluster: INITIAL_PROVISION_STATE,
      };
    });
    setProvisionState(initialState);
    return initialState;
  };

  const updateStepStatus = (
    hostSerialNumber: string,
    step: string,
    status: string,
    result = null,
    error = null,
  ) => {
    setProvisionState((prev) => {
      const host = prev[hostSerialNumber] || {};
      const newData = {
        ...prev,
        [hostSerialNumber]: {
          ...host,
          [step]: { status, result, error },
        },
      };

      return newData;
    });
  };

  return {
    provisionState,
    initializeState,
    updateStepStatus,
  };
};

export const useProvisioning = () => {
  const dispatch = useAppDispatch();
  const { provisionState, initializeState, updateStepStatus } =
    useProvisioningState();

  const { createCluster, registerHost } = useAppSelector(
    selectHostProvisionState,
  );

  const [registerHostApi] = infra.useHostServiceRegisterHostMutation();
  const [patchHost] = infra.useHostServicePatchHostMutation();
  const [postInstance] = infra.useInstanceServiceCreateInstanceMutation();
  const [getSite] = infra.useLazySiteServiceGetSiteQuery();
  const [createClusterApi] =
    cm.usePostV2ProjectsByProjectNameClustersMutation();

  const executeStep = async (
    serialNumber: string,
    step: string,
    apiCall: () => Promise<any>,
  ) => {
    const currentStatus = provisionState[serialNumber]?.[step]?.status;

    if (currentStatus === "completed") {
      return provisionState[serialNumber][step].result;
    }

    updateStepStatus(serialNumber, step, "inProgress");

    try {
      const result = await apiCall();
      updateStepStatus(serialNumber, step, "completed", result);
      return result;
    } catch (error) {
      updateStepStatus(serialNumber, step, "failed", null, error.data?.message);

      throw error;
    }
  };

  const provisionHosts = async (hosts: HostData[], autoOnboard: boolean) => {
    if (!provisionState || Object.keys(provisionState).length === 0) {
      initializeState(hosts);
    }

    for (const host of hosts) {
      if (!host.serialNumber) {
        console.warn(`Host ${host.name} has no serial number, skipping`);
        continue;
      }

      // Entire host is received if the call is triggerred from Onboarded tab.
      // Register host payload is received if call is triggered from provision tab
      let registerHostResp: infra.HostResourceRead | undefined = host;
      try {
        if (registerHost) {
          registerHostResp = await executeStep(
            host.serialNumber,
            "register",
            () =>
              registerHostApi({
                hostRegister: {
                  autoOnboard,
                  name: host.name,
                  serialNumber: host.serialNumber || undefined,
                  uuid: host.uuid || undefined,
                },
                projectName: SharedStorage.project?.name ?? "",
              }).unwrap(),
          );
        }

        await executeStep(host.serialNumber, "hostDetails", () =>
          patchHost({
            projectName: SharedStorage.project?.name ?? "",
            resourceId: registerHostResp?.resourceId as string,
            hostResource: {
              name: host.name,
              siteId: host.site?.siteID,
              metadata: host.metadata,
            },
          }).unwrap(),
        );

        await executeStep(host.serialNumber, "instance", () =>
          postInstance({
            projectName: SharedStorage.project?.name ?? "",
            instanceResource: {
              hostID: registerHostResp?.resourceId,
              name: `${host.name}-instance`,
              osID: host.instance?.osID,
              securityFeature: host.instance?.securityFeature,
              kind: "INSTANCE_KIND_METAL",
            },
          }).unwrap(),
        );

        const { data: site } = await getSite({
          projectName: SharedStorage.project?.name ?? "",
          regionResourceId: "*",
          resourceId: host.site?.siteID as string,
        });

        if (createCluster === true) {
          const combinedClusterLabels: { [key: string]: string } = {};

          site?.metadata?.forEach((tags) => {
            combinedClusterLabels[tags.key] = tags.value;
          });

          const nodeSpec: cm.NodeSpec = {
            id: registerHostResp?.resourceId as string,
            role: "all",
          };

          await executeStep(host.serialNumber, "cluster", () =>
            createClusterApi({
              projectName: SharedStorage.project?.name ?? "",
              clusterSpec: {
                name: `cluster-${host.name}`,
                labels: combinedClusterLabels,
                template: `${host.templateName}-${host.templateVersion}`,
                nodes: [nodeSpec],
              },
            }),
          );
        }

        dispatch(
          showToast({
            state: ToastState.Success,
            message: `Host ${host.name} provisioned successfully.`,
          }),
        );

        dispatch(removeHost(host.name));
      } catch (error) {
        console.error(`Failed to provision host ${host.name}:`, error);

        dispatch(
          showToast({
            state: ToastState.Danger,
            message:
              `Error while provisioning host ${host.name} - ${error.data?.message}` ||
              `Failed to provision host ${host.name}`,
          }),
        );
      }
    }

    return {
      isProvisioningDone: true,
    };
  };

  return {
    provisionState,
    provisionHosts,
  };
};
