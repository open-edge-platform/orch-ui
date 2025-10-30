/*
 * SPDX-FileCopyrightText: (C) 2025 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import { Flex } from "@orch-ui/components";
import {
  formatOsUpdateAvailable,
  parseError,
  SharedStorage,
} from "@orch-ui/utils";
import { Button, Dropdown, Item, Text } from "@spark-design/react";
import {
  ButtonSize,
  ButtonVariant,
  DropdownSize,
  MessageBannerAlertState,
  ToastState,
} from "@spark-design/tokens";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../store/hooks";
import {
  showMessageNotification,
  showToast,
} from "../../../store/notifications";
import "./OsUpdate.scss";

const dataCy = "osUpdate";
interface OsUpdateProps {
  host: infra.HostResourceRead;
}

const OsUpdate = ({ host }: OsUpdateProps) => {
  const cy = { "data-cy": dataCy };
  const [selectedPolicyId, setSelectedPolicyId] = useState<string>("");
  const dispatch = useAppDispatch();

  // Fetch OS Update Policies
  const {
    data: osUpdatePolicies,
    isLoading: isPoliciesLoading,
    isError: isPoliciesError,
    error: policiesError,
  } = infra.useOsUpdatePolicyListOsUpdatePolicyQuery({
    projectName: SharedStorage.project?.name ?? "",
    pageSize: 100,
  });

  // Handle policies loading error
  useEffect(() => {
    if (isPoliciesError && policiesError) {
      dispatch(
        showMessageNotification({
          messageTitle: "Failed to load OS Update Policies",
          messageBody: `${parseError(policiesError).data}`,
          variant: MessageBannerAlertState.Error,
          showMessage: true,
        }),
      );
    }
  }, [isPoliciesError, policiesError]);

  // Patch Instance Mutation
  const [patchInstance, { isLoading: isPatching }] =
    infra.useInstanceServicePatchInstanceMutation();

  const handleApplyPolicy = async () => {
    if (!selectedPolicyId) {
      showToast({
        message: "Please select an OS Update Policy",
        state: ToastState.Danger,
      });
      return;
    }

    try {
      const patchPayload: infra.InstanceServicePatchInstanceApiArg = {
        projectName: SharedStorage.project?.name ?? "",
        resourceId: host.instance?.resourceId ?? "",
        instanceResource: {
          osUpdatePolicyID: selectedPolicyId,
        },
      };

      await patchInstance(patchPayload).unwrap();
      dispatch(
        showMessageNotification({
          messageTitle: "OS Update Policy applied successfully",
          messageBody: "",
          variant: MessageBannerAlertState.Success,
          showMessage: true,
        }),
      );
    } catch (error) {
      dispatch(
        showMessageNotification({
          messageTitle: "Failed to apply OS Update Policy",
          messageBody: `${parseError(error).data}`,
          variant: MessageBannerAlertState.Error,
          showMessage: true,
        }),
      );
    }
  };

  const policies = osUpdatePolicies?.osUpdatePolicies || [];

  return (
    <div {...cy} className="os-update">
      <Flex align="middle" className="os-update-policy-container" cols={[3, 9]}>
        <Text>Available Update</Text>
        <Text data-cy="desiredOsProfiles">
          {formatOsUpdateAvailable(host?.instance?.osUpdateAvailable ?? "-") ||
            "-"}
        </Text>
      </Flex>

      <Flex align="middle" className="os-update-policy-container" cols={[3, 9]}>
        <Text>Assigned OS Update Policy</Text>
        <Text data-cy="desiredOsProfiles">
          {host.instance?.updatePolicy?.name || "-"}
        </Text>
      </Flex>

      <Flex align="middle" className="os-update-policy-container" cols={[3, 9]}>
        <Text className="os-update-policy-label">
          <strong>Select OS Update Policy</strong>
        </Text>
        <Flex
          align="middle"
          className="os-update-dropdown-container"
          cols={[8, 4]}
        >
          <Dropdown
            name="osUpdatePolicy"
            data-cy="osUpdatePolicy"
            label=""
            placeholder={
              isPoliciesLoading
                ? "Loading policies..."
                : policies.length > 0
                  ? "Select an OS Update Policy"
                  : "No OS Update Policies Available"
            }
            selectedKey={selectedPolicyId}
            onSelectionChange={(key) => setSelectedPolicyId(key as string)}
            size={DropdownSize.Large}
            isDisabled={isPoliciesLoading || policies.length === 0}
          >
            {policies.map((policy) => (
              <Item key={policy.resourceId || ""} textValue={policy.name}>
                <div>
                  <Text size="m">{policy.name}</Text>
                </div>
              </Item>
            ))}
          </Dropdown>

          {/* Apply Button */}
          <div className="os-update__actions">
            <Button
              className="os-update__apply-button"
              data-cy="applyPolicyBtn"
              size={ButtonSize.Medium}
              variant={ButtonVariant.Primary}
              onPress={handleApplyPolicy}
              isDisabled={!selectedPolicyId || isPatching}
            >
              {isPatching ? "Applying..." : "Apply"}
            </Button>
          </div>
        </Flex>
      </Flex>
    </div>
  );
};

export default OsUpdate;
