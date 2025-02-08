/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { eim } from "@orch-ui/apis";
import BaseStore from "./baseStore";
import { osRedHatId, osUbuntuId } from "./iaasIds";

export const createOsResource = (
  id: string,
  name: string,
  architecture: string,
  repoUrl: string,
  kernelCommand: string,
  updateResources: string[],
): eim.OperatingSystemResourceRead => {
  return {
    osResourceID: id,
    architecture,
    name,
    repoUrl: repoUrl,
    kernelCommand: kernelCommand,
    updateSources: updateResources,
    sha256: "09f6e5d55cd9741a026c0388d4905b7492749feedbffc741e65aab35fc38430d",
  };
};

export const osUbuntu = createOsResource(
  osUbuntuId,
  "Ubuntu",
  "x86_64",
  "http://archive.ubuntu.com/ubuntu",
  "kvmgt vfio-iommu-type1 vfio-mdev i915.enable_gvt=1",
  ["deb https://files.edgeorch.net orchui release"],
);

export const osRedHat = createOsResource(
  osRedHatId,
  "Red Hat",
  "x86_64",
  "http://redhat.com/redhat",
  "kvmgt vfio-iommu-type1 vfio-mdev i915.enable_gvt=1",
  ["deb https://files.edgeorch.net orchui release"],
);

export default class OsResourceStore extends BaseStore<
  "osResourceID",
  eim.OperatingSystemResourceRead,
  eim.OperatingSystemResourceRead
> {
  constructor() {
    super("osResourceID", [osUbuntu, osRedHat]);
  }

  convert(
    body: eim.OperatingSystemResourceRead,
    //id: string | undefined
  ): eim.OperatingSystemResourceRead {
    return body;
  }
}
