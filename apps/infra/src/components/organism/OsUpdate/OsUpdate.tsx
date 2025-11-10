/*
 * SPDX-FileCopyrightText: (C) 2025 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import { Flex, Table, TableColumn } from "@orch-ui/components";
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
  ToastState,
} from "@spark-design/tokens";
import { useEffect, useMemo, useState } from "react";
import { useAppDispatch } from "../../../store/hooks";
import { showToast } from "../../../store/notifications";
import "./OsUpdate.scss";

interface Package {
  name: string;
  available_version: string;
  architecture: string;
}

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
        showToast({
          message: `Failed to load OS Update Policies: ${parseError(policiesError).data}`,
          state: ToastState.Danger,
        }),
      );
    }
  }, [isPoliciesError, policiesError]);

  // Patch Instance Mutation
  const [patchInstance, { isLoading: isPatching }] =
    infra.useInstanceServicePatchInstanceMutation();

  // Get available packages from host.instance.osUpdateAvailable field to display in table
  const availablePackages: Package[] = useMemo(() => {
    if (!host.instance?.osUpdateAvailable) return [];

    try {
      const packageData: Package[] = JSON.parse(
        host.instance.osUpdateAvailable,
      );
      return packageData || [];
    } catch (error) {
      return [];
    }
  }, [host.instance?.osUpdateAvailable]);

  // Table columns for package selection
  const packageColumns: TableColumn<Package>[] = [
    {
      Header: "Package Name",
      accessor: "name",
    },
    {
      Header: "Available Version",
      accessor: "available_version",
    },
    {
      Header: "Architecture",
      accessor: "architecture",
    },
  ];

  const handleApplyPolicy = async () => {
    if (!selectedPolicyId) {
      dispatch(
        showToast({
          message: "Please select an OS Update Policy",
          state: ToastState.Danger,
        }),
      );
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
        showToast({
          message: "OS Update Policy applied successfully",
          state: ToastState.Success,
        }),
      );
    } catch (error) {
      dispatch(
        showToast({
          message: `Failed to apply OS Update Policy: ${parseError(error).data}`,
          state: ToastState.Danger,
        }),
      );
    }
  };

  const policies = osUpdatePolicies?.osUpdatePolicies || [];

  return (
    <div {...cy} className="os-update">
      {Array.isArray(availablePackages) && availablePackages.length > 0 ? (
        <Flex align="start" cols={[3, 9]}>
          <Text className="os-update__policy-label">Available Update</Text>
          <Flex cols={[8, 4]}>
            <Table
              data-cy="osUpdatePackageTable"
              columns={packageColumns}
              data={availablePackages}
            />
          </Flex>
        </Flex>
      ) : (
        <Flex
          align="middle"
          className="os-update-policy-container"
          cols={[3, 9]}
        >
          <Text className="os-update__policy-label">Available Update</Text>
          <Text data-cy="desiredOsProfiles">
            {(formatOsUpdateAvailable(
              host?.instance?.osUpdateAvailable ?? "-",
              "string",
            ) as string) || "-"}
          </Text>
        </Flex>
      )}

      <Flex align="middle" className="os-update-policy-container" cols={[3, 9]}>
        <Text className="os-update__policy-label">
          Assigned OS Update Policy
        </Text>
        <Text data-cy="desiredOsProfiles">
          {host.instance?.updatePolicy?.name || "-"}
        </Text>
      </Flex>

      <Flex align="middle" className="os-update-policy-container" cols={[3, 9]}>
        <Text className="os-update__policy-label">Select OS Update Policy</Text>
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
