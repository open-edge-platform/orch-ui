/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { eim } from "@orch-ui/apis";
import { osRedHatId, osTiberId, osTiberUpdateId, osUbuntuId } from "../data";
import { BaseStore } from "./baseStore";

export const createOsResource = (
  id: string,
  name: string,
  architecture: string,
  repoUrl: string,
  kernelCommand: string,
  updateResources: string[],
  profileName: string,
  securityFeature: eim.SecurityFeature,
  osType: eim.OperatingSystemType,
): eim.OperatingSystemResourceRead => {
  return {
    resourceId: id,
    architecture,
    name,
    repoUrl: repoUrl,
    kernelCommand: kernelCommand,
    updateSources: updateResources,
    sha256: "09f6e5d55cd9741a026c0388d4905b7492749feedbffc741e65aab35fc38430d",
    profileName: profileName,
    securityFeature: securityFeature,
    osType: osType,
    installedPackages:
      '{"Repo":[{"Name":"libpcre2-32-0","Version":"10.42-3","Architecture":"x86_64","Distribution":"tmv3","URL":"https://www.pcre.org/","License":"BSD","Modified":"No"},{"Name":"libpcre2-16-0","Version":"10.42-3","Architecture":"x86_64","Distribution":"tmv3","URL":"https://www.pcre.org/","License":"BSD","Modified":"No"}]}',
  };
};

export const osTiber = createOsResource(
  osTiberId,
  "Tiber Os",
  "x86_64",
  "http://one-intel-edge/tiberos",
  "kvmgt vfio-iommu-type1 vfio-mdev i915.enable_gvt=1",
  ["deb https://files.edgeorch.net orchui release"],
  "TiberOS",
  "SECURITY_FEATURE_SECURE_BOOT_AND_FULL_DISK_ENCRYPTION",
  "OPERATING_SYSTEM_TYPE_IMMUTABLE",
);

export const osTiberUpdate = createOsResource(
  osTiberUpdateId,
  "Tiber new Os",
  "x86_64",
  "http://one-intel-edge/tiberos",
  "kvmgt vfio-iommu-type1 vfio-mdev i915.enable_gvt=1",
  ["deb https://files.edgeorch.net orchui release"],
  "TiberOS",
  "SECURITY_FEATURE_SECURE_BOOT_AND_FULL_DISK_ENCRYPTION",
  "OPERATING_SYSTEM_TYPE_IMMUTABLE",
);

export const osUbuntu = createOsResource(
  osUbuntuId,
  "Ubuntu",
  "x86_64",
  "http://archive.ubuntu.com/ubuntu",
  "kvmgt vfio-iommu-type1 vfio-mdev i915.enable_gvt=1",
  ["deb https://files.edgeorch.net orchui release"],
  "Ubuntu-x86_profile",
  "SECURITY_FEATURE_SECURE_BOOT_AND_FULL_DISK_ENCRYPTION",
  "OPERATING_SYSTEM_TYPE_MUTABLE",
);

export const osRedHat = createOsResource(
  osRedHatId,
  "Red Hat",
  "x86_64",
  "http://redhat.com/redhat",
  "kvmgt vfio-iommu-type1 vfio-mdev i915.enable_gvt=1",
  ["deb https://files.edgeorch.net orchui release"],
  "Redhat-x86_profile",
  "SECURITY_FEATURE_NONE",
  "OPERATING_SYSTEM_TYPE_MUTABLE",
);

export class OsResourceStore extends BaseStore<
  "resourceId",
  eim.OperatingSystemResourceRead,
  eim.OperatingSystemResource
> {
  constructor() {
    super("resourceId", [osUbuntu, osRedHat]);
  }

  convert(
    body: eim.OperatingSystemResource,
    //id: string | undefined
  ): eim.OperatingSystemResourceRead {
    const currentTime = new Date().toISOString();
    return {
      ...body,
      sha256: "",
      updateSources: [],
      timestamps: {
        createdAt: currentTime,
        updatedAt: currentTime,
      },
    };
  }
}
