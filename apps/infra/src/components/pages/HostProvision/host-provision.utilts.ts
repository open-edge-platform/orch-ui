import { infra } from "@orch-ui/apis";
import { SharedStorage } from "@orch-ui/utils";
import { useState } from "react";
import { HostData } from "src/store/provisionHost";

const useProvisioningState = () => {
  const [provisionState, setProvisionState] = useState({});
  const [isProvisioning, setIsProvisioning] = useState(false);

  const initializeState = (hosts) => {
    const initialState = {};
    hosts.forEach((host) => {
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

  const [registerHost] =
    infra.usePostV1ProjectsByProjectNameComputeHostsRegisterMutation();

  console.log({
    provisionState,
    isProvisioning,
    setIsProvisioning,
    initializeState,
    updateStepStatus,
    // getStepResult,
  });

  const executeStep = async (serialNumber, step, apiCall) => {
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

    console.log({ hosts });

    try {
      for (const host of hosts) {
        // Step 1: Register - get or use stored result
        const registerHostResp = await executeStep(
          host.serialNumber,
          "register",
          () =>
            registerHost({
              hostRegisterInfo: {
                autoOnboard,
                name: host.name,
                serialNumber: host.serialNumber || undefined, //undefined takes it away from existing in payload
                uuid: host.uuid || undefined,
              },
              projectName: SharedStorage.project?.name ?? "",
            }),
        );

        console.log({ registerHostResp });

        // Step 2: Host Details - use registerResult (either fresh or from state)
        const hostDetailsResult = await executeStep(
          host.serialNumber,
          "hostDetails",
          () =>
            api.patch(
              `/hosts/${registerResult.hostId}`,
              buildHostDetailsPayload(host),
            ),
        );

        // // Step 3: Instance - use registerResult
        // const instanceResult = await executeStep(
        //   host.serialNumber,
        //   "instance",
        //   () =>
        //     api.post("/instances", {
        //       ...buildInstancePayload(host),
        //       registered_host_id: registerResult.hostId,
        //     }),
        // );

        // // Step 4: Cluster - use instanceResult
        // await executeStep(host.serialNumber, "cluster", () =>
        //   api.post("/clusters", {
        //     ...buildClusterPayload(host),
        //     instance_id: instanceResult.instanceId,
        //   }),
        // );
      }

      // All successful - clear state
      // setProvisionState({});
      setIsProvisioning(false);
      return { success: true };
    } catch (error) {
      setIsProvisioning(false);
      return {
        success: false,
        error: error.message,
        canRetry: true,
      };
    }
  };

  return {
    provisionState,
    isProvisioning,
    provisionHosts,
    retryProvisioning: provisionHosts,
  };
};
