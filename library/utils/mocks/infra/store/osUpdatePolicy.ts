/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import { BaseStore } from "./baseStore";
import { osRedHat, osTbUpdate, osUbuntu } from "./osresources";

export const createOsUpdatePolicy = (
  id: string,
  name: string,
  description: string,
  updatePolicy: infra.UpdatePolicy,
  targetOs?: infra.OperatingSystemResourceRead,
  installPackages?: string,
  updateSources?: string[],
  kernelCommand?: string,
): infra.OsUpdatePolicyRead => {
  const currentTime = new Date().toISOString();
  return {
    resourceId: id,
    name,
    description,
    installPackages: installPackages || "",
    updateSources: updateSources || [],
    kernelCommand: kernelCommand || "",
    targetOs,
    updatePolicy,
    timestamps: {
      createdAt: currentTime,
      updatedAt: currentTime,
    },
  };
};

// Sample OS update policies
export const osUpdatePolicyTarget = createOsUpdatePolicy(
  "osupdatepolicy-a11016d5",
  "Test immutable target policy",
  "Test immutable target policy for specific OS version",
  "UPDATE_POLICY_TARGET" as infra.UpdatePolicy,
  osTbUpdate, // Use the actual OS resource
);

export const osUpdatePolicyLatest = createOsUpdatePolicy(
  "osupdatepolicy-b22027e6",
  "Production Security Updates",
  "Automated security updates policy for production environments",
  "UPDATE_POLICY_LATEST" as infra.UpdatePolicy,
  osUbuntu, // Use the actual OS resource
  "security-updates kernel-updates",
  ["https://security-updates.example.com/repo"],
  "grub-reboot 0",
);

export const osUpdatePolicyUnspecified = createOsUpdatePolicy(
  "osupdatepolicy-c33038f7",
  "Default Update Policy",
  "Default update policy with unspecified behavior",
  "UPDATE_POLICY_UNSPECIFIED" as infra.UpdatePolicy,
  osRedHat, // Use the actual OS resource
  "critical-patches",
  ["https://critical-updates.example.com/repo"],
);

export class OsUpdatePolicyStore extends BaseStore<
  "resourceId",
  infra.OsUpdatePolicyRead,
  infra.OsUpdatePolicyWrite
> {
  constructor() {
    super("resourceId", [
      osUpdatePolicyTarget,
      osUpdatePolicyLatest,
      osUpdatePolicyUnspecified,
    ]);
  }

  convert(body: infra.OsUpdatePolicyWrite): infra.OsUpdatePolicyRead {
    const currentTime = new Date().toISOString();
    return {
      ...body,
      resourceId: `osupdatepolicy-${Math.random().toString(36).substr(2, 9)}`,
      targetOs: undefined,
      timestamps: {
        createdAt: currentTime,
        updatedAt: currentTime,
      },
    };
  }
}
