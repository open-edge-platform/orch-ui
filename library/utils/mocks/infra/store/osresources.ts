/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import { osRedHatId, osTbId, osTbUpdateId, osUbuntuId } from "../data";
import { BaseStore } from "./baseStore";

export const createOsResource = (
  id: string,
  name: string,
  architecture: string,
  imageUrl: string,
  profileName: string,
  securityFeature: infra.InstanceResourceRead["securityFeature"],
  osType: infra.OperatingSystemResourceRead["osType"],
): infra.OperatingSystemResourceRead => {
  return {
    resourceId: id,
    architecture,
    name,
    imageUrl: imageUrl,
    sha256: "09f6e5d55cd9741a026c0388d4905b7492749feedbffc741e65aab35fc38430d",
    profileName: profileName,
    securityFeature: securityFeature,
    osType: osType,
    installedPackages:
      '{"Repo":[{"Name":"libpcre2-32-0","Version":"10.42-3","Architecture":"x86_64","Distribution":"tmv3","URL":"https://www.pcre.org/","License":"BSD","Modified":"No"},{"Name":"libpcre2-16-0","Version":"10.42-3","Architecture":"x86_64","Distribution":"tmv3","URL":"https://www.pcre.org/","License":"BSD","Modified":"No"}]}',
    existingCves:
      '[{"cve_id":"CVE-2016-5180","priority":"critical","affected_packages":["fluent-bit-3.1.9-11.emt3.x86_64"]},{"cve_id":"CVE-2021-3672","priority":"medium","affected_packages":["fluent-bit-3.1.9-11.emt3.x86_64"]},{"cve_id":"CVE-2020-8277","priority":"high","affected_packages":["fluent-bit-3.1.9-11.emt3.x86_64"]},{"cve_id":"CVE-2022-4904","priority":"high","affected_packages":["fluent-bit-3.1.9-11.emt3.x86_64"]}]',
  };
};

export const osTb = createOsResource(
  osTbId,
  "Tb Os",
  "x86_64",
  "http://open-edge-platform/tbos",
  "TbOS",
  "SECURITY_FEATURE_SECURE_BOOT_AND_FULL_DISK_ENCRYPTION",
  "OS_TYPE_IMMUTABLE",
);

export const osTbUpdate = createOsResource(
  osTbUpdateId,
  "Tb new Os",
  "x86_64",
  "http://open-edge-platform/tbos",
  "TbOS",
  "SECURITY_FEATURE_SECURE_BOOT_AND_FULL_DISK_ENCRYPTION",
  "OS_TYPE_IMMUTABLE",
);

export const osUbuntu = createOsResource(
  osUbuntuId,
  "Ubuntu",
  "x86_64",
  "http://archive.ubuntu.com/ubuntu",
  "Ubuntu-x86_profile",
  "SECURITY_FEATURE_SECURE_BOOT_AND_FULL_DISK_ENCRYPTION",
  "OS_TYPE_IMMUTABLE",
);

export const osRedHat = createOsResource(
  osRedHatId,
  "Red Hat",
  "x86_64",
  "http://redhat.com/redhat",
  "Redhat-x86_profile",
  "SECURITY_FEATURE_NONE",
  "OS_TYPE_IMMUTABLE",
);

export class OsResourceStore extends BaseStore<
  "resourceId",
  infra.OperatingSystemResourceRead,
  infra.OperatingSystemResource
> {
  constructor() {
    super("resourceId", [osUbuntu, osRedHat]);
  }

  convert(
    body: infra.OperatingSystemResource,
  ): infra.OperatingSystemResourceRead {
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
