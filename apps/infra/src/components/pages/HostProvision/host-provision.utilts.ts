import { infra } from "@orch-ui/apis";
import { SharedStorage } from "@orch-ui/utils";
import { useState } from "react";
import { useAppSelector } from "src/store/hooks";
import { HostData, selectHostProvisionState } from "src/store/provisionHost";

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
        register: { status: "pending", result: null, error: null },
        hostDetails: { status: "pending", result: null, error: null },
        instance: { status: "pending", result: null, error: null },
        cluster: { status: "pending", result: null, error: null },
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
    setProvisionState((prev) => ({
      ...prev,
      [hostSerialNumber]: {
        ...prev[hostSerialNumber],
        [step]: { status, result, error },
      },
    }));
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
    // getStepResult,
  } = useProvisioningState();

  const { createCluster } = useAppSelector(selectHostProvisionState);

  const [registerHost] = infra.useHostServiceRegisterHostMutation();
  const [patchHost] = infra.useHostServicePatchHostMutation();
  const [postInstance] = infra.useInstanceServiceCreateInstanceMutation();

  console.log({
    provisionState,
    isProvisioning,
    setIsProvisioning,
    initializeState,
    updateStepStatus,
    // getStepResult,
  });

  const executeStep = async (
    serialNumber: string,
    step: string,
    apiCall: () => Promise<any>,
  ) => {
    const currentStatus = provisionState[serialNumber]?.[step]?.status;

    // If already completed, return the stored result
    if (currentStatus === "completed") {
      return provisionState[serialNumber][step].result;
    }

    // Mark as in progress
    updateStepStatus(serialNumber, step, "inProgress");

    try {
      // Execute the API call directly
      const result = await apiCall();
      updateStepStatus(serialNumber, step, "completed", result);
      return result;
    } catch (error) {
      updateStepStatus(serialNumber, step, "failed", null, error.message);
      throw error;
    }
  };

  const provisionHosts = async (hosts: HostData[], autoOnboard: boolean) => {
    setIsProvisioning(true);

    // Initialize state if not already done
    if (!provisionState || Object.keys(provisionState).length === 0) {
      initializeState(hosts);
    }

    for (const host of hosts) {
      if (!host.serialNumber) {
        console.warn(`Host ${host.name} has no serial number, skipping`);
        continue;
      }

      try {
        // Step 1: Register
        const registerHostResp = await executeStep(
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

        // Step 2: Host Details
        await executeStep(host.serialNumber, "hostDetails", () =>
          patchHost({
            projectName: SharedStorage.project?.name ?? "",
            resourceId: registerHostResp.resourceId,
            hostResource: {
              name: host.name,
              siteId: host.siteId,
              metadata: host.metadata,
            },
          }).unwrap(),
        );

        // Step 3: Create instance - uncomment and implement when ready
        const instanceResult = await executeStep(
          host.serialNumber,
          "instance",
          () =>
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

        console.log({ instanceResult });

        // Step 4: Create cluster - uncomment and implement when ready

        // if (createCluster === true) {
        //   await executeStep(host.serialNumber, "cluster", () =>
        //     createCluster({
        //       projectName: SharedStorage.project?.name ?? "",
        //       clusterResource: {
        //         name: `cluster-${host.name}`,
        //         instanceID: instanceResult.resourceId,
        //       },
        //     }),
        //   );
        // }
      } catch (error) {
        console.error(`Failed to provision host ${host.name}:`, error);
        // Continue to next host
      }
    }

    setIsProvisioning(false);

    // Compute results from provisionState instead
    // const successHosts = Object.entries(provisionState).filter(
    //   ([_, hostState]) =>
    //     !Object.values(hostState).some((step) => step.status === "failed"),
    // ).length;

    // const failedHosts = Object.keys(provisionState).length - successHosts;

    // return {
    //   success: successHosts > 0,
    //   successCount: successHosts,
    //   failureCount: failedHosts,
    // };

    return {
      isProvisioningDone: true,
    };
  };

  return {
    provisionState,
    isProvisioning,
    provisionHosts,
    retryProvisioning: provisionHosts,
  };
};

const REGISTER_HOST_RESP = {
  biosReleaseDate: "",
  biosVendor: "",
  biosVersion: "",
  cpuArchitecture: "",
  cpuCapabilities: "",
  cpuCores: 0,
  cpuModel: "",
  cpuSockets: 0,
  cpuThreads: 0,
  cpuTopology: "",
  currentPowerState: "POWER_STATE_UNSPECIFIED",
  currentState: "HOST_STATE_UNSPECIFIED",
  desiredPowerState: "POWER_STATE_UNSPECIFIED",
  desiredState: "HOST_STATE_ONBOARDED",
  hostGpus: [],
  hostNics: [],
  hostStatus: "",
  hostStatusIndicator: "STATUS_INDICATION_UNSPECIFIED",
  hostStatusTimestamp: 0,
  hostStorages: [],
  hostUsbs: [],
  hostname: "",
  memoryBytes: "0",
  metadata: [],
  name: "june-host-one",
  note: "",
  onboardingStatus: "",
  onboardingStatusIndicator: "STATUS_INDICATION_UNSPECIFIED",
  onboardingStatusTimestamp: 0,
  productName: "",
  registrationStatus: "",
  registrationStatusIndicator: "STATUS_INDICATION_UNSPECIFIED",
  registrationStatusTimestamp: 0,
  resourceId: "host-9d0f7d78",
  serialNumber: "03d483ee9011004",
  timestamps: {
    createdAt: "2025-06-15T16:38:21.751Z",
    updatedAt: "2025-06-15T16:38:21.751Z",
  },
};
