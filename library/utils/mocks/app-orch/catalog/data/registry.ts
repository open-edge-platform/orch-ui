/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { catalog } from "@orch-ui/apis";

export const registry: catalog.RegistryRead = {
  name: "orch-harbor",
  displayName: "",
  description: "The orch internal harbor",
  rootUrl: "https://open-registry.com/chartrepo/open-edge-platform/",
  username: "",
  authToken: "",
  createTime: "2023-02-23T21:25:56.792009Z",
  updateTime: "2023-02-23T21:25:56.792009Z",
  type: "HELM",
};

export const dockerImageRegistry: catalog.RegistryRead = {
  name: "orch-image",
  displayName: "orch-image",
  rootUrl: "https://edgeAI.com",
  inventoryUrl: "https://edgeAI.com/inv",
  type: "IMAGE",
  createTime: "2017-07-21T17:32:28Z",
  username: "intel-user4",
  authToken: "authSecret",
};

/**
 * @deprecated create shared/src/mocks/app-orch/catalog/registries.ts instead
 */
export const registryResponse: catalog.ListRegistriesResponseRead = {
  registries: [
    {
      name: "orch-harbor",
      displayName: "",
      description: "The orch internal harbor",
      rootUrl: "https://open-registry.com/chartrepo/open-edge-platform/",
      username: "",
      authToken: "",
      createTime: "2023-02-23T21:25:56.792009Z",
      updateTime: "2023-02-23T21:25:56.792009Z",
      type: "HELM",
    },
    {
      name: "culvers-harbor",
      displayName: "lp",
      description:
        "The Culvers-specific harbor repo hosted within Orch infrastructure",
      rootUrl: "https://registry.demo.orch.intel.com/chartrepo/culvers",
      username: "",
      authToken: "",
      createTime: "2023-03-02T23:31:59.666707Z",
      updateTime: "2023-03-03T18:22:57.721770Z",
      type: "HELM",
    },
    {
      name: "intel-harbor",
      displayName: "",
      description: "The orch internal harbor",
      rootUrl:
        "https://open-edge-platform.registry.com/chartrepo/open-edge-platform/",
      username: "",
      authToken: "",
      createTime: "2023-03-02T23:31:59.737848Z",
      updateTime: "2023-03-03T18:22:57.792956Z",
      type: "HELM",
    },
    {
      name: "culvers-image",
      displayName: "",
      description: "The orch internal harbor",
      rootUrl: "https://open-edge-platform.registry.com/chartrepo/",
      username: "",
      authToken: "",
      createTime: "2023-03-02T23:31:59.737848Z",
      updateTime: "2023-03-03T18:22:57.792956Z",
      type: "IMAGE",
    },
    {
      name: "orch-image",
      displayName: "",
      description: "The orch internal harbor",
      rootUrl: "https://open-edge-platform.registry.com/chartrepo/",
      username: "",
      authToken: "",
      createTime: "2023-03-02T23:31:59.737848Z",
      updateTime: "2023-03-03T18:22:57.792956Z",
      type: "IMAGE",
    },
  ],
  totalElements: 5,
};
