import { cm, infra } from "@orch-ui/apis";
import { SharedStorage } from "@orch-ui/utils";
import { useState } from "react";
import { useAppSelector } from "src/store/hooks";
import { HostData, selectHostProvisionState } from "src/store/provisionHost";

const INITIAL_PROVISION_STATE = {
  status: "pending",
  result: null,
  error: null,
};

const useProvisioningState = () => {
  const [provisionState, setProvisionState] = useState({});
  const [isProvisioning, setIsProvisioning] = useState(false);

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
    isProvisioning,
    setIsProvisioning,
    initializeState,
    updateStepStatus,
  };
};

export const useProvisioning = () => {
  const {
    provisionState,
    isProvisioning,
    setIsProvisioning,
    initializeState,
    updateStepStatus,
  } = useProvisioningState();

  const { createCluster } = useAppSelector(selectHostProvisionState);

  const [registerHost] = infra.useHostServiceRegisterHostMutation();
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
      updateStepStatus(serialNumber, step, "failed", null, error.data.message);
      throw error;
    }
  };

  const provisionHosts = async (hosts: HostData[], autoOnboard: boolean) => {
    setIsProvisioning(true);

    if (!provisionState || Object.keys(provisionState).length === 0) {
      initializeState(hosts);
    }

    for (const host of hosts) {
      if (!host.serialNumber) {
        console.warn(`Host ${host.name} has no serial number, skipping`);
        continue;
      }

      try {
        const registerHostResp: infra.HostResourceRead = await executeStep(
          host.serialNumber,
          "register",
          () =>
            registerHost({
              hostRegister: {
                autoOnboard,
                name: host.name,
                serialNumber: host.serialNumber || undefined,
                uuid: host.uuid || undefined,
              },
              projectName: SharedStorage.project?.name ?? "",
            }).unwrap(),
        );

        await executeStep(host.serialNumber, "hostDetails", () =>
          patchHost({
            projectName: SharedStorage.project?.name ?? "",
            resourceId: registerHostResp.resourceId as string,
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
              hostID: registerHostResp.resourceId,
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
            id: registerHostResp.resourceId as string,
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
      } catch (error) {
        console.error(`Failed to provision host ${host.name}:`, error);
        // Continue to next host
      }
    }

    setIsProvisioning(false);

    return {
      isProvisioningDone: true,
    };
  };

  return {
    provisionState,
    provisionHosts,
  };
};
