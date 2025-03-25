/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { catalog } from "@orch-ui/apis";
import { BaseStore } from "../../baseStore";
import {
  registryFiveName,
  registryFourName,
  registryOneName,
  registryThreeName,
  registryTwoName,
} from "./data/appCatalogIds";

export const registryOne: catalog.RegistryRead = {
  name: registryOneName,
  displayName: registryOneName,
  rootUrl: "https://sample-registry.com/chartrepo/open-edge-platform/",
  type: "HELM",
  createTime: "2017-07-21T17:32:28Z",
  username: "intel-user1",
  authToken: "authSecret1",
};
export const registryTwo: catalog.RegistryRead = {
  name: registryTwoName,
  displayName: registryTwoName,
  rootUrl: "https://micron.com",
  inventoryUrl: "https://micron.com/inventory",
  type: "IMAGE",
  createTime: "2017-07-21T17:32:28Z",
  username: "intel-user2",
  authToken: "authSecret2",
};
export const registryThree: catalog.RegistryRead = {
  name: registryThreeName,
  displayName: registryThreeName,
  rootUrl: "https://intel.com",
  inventoryUrl: "https://intel.com/inventory",
  type: "HELM",
  createTime: "2017-07-21T17:32:28Z",
  username: "intel-user3",
  authToken: "authSecret3",
};
export const registryFour: catalog.RegistryRead = {
  name: registryFourName,
  displayName: registryFourName,
  rootUrl: "https://edgeAI.com",
  inventoryUrl: "https://edgeAI.com/inv",
  type: "IMAGE",
  createTime: "2017-07-21T17:32:28Z",
  username: "intel-user4",
  authToken: "authSecret4",
};
export const registryFive: catalog.RegistryRead = {
  name: registryFiveName,
  displayName: registryFiveName,
  rootUrl: "https://no-inventory.com",
  type: "HELM",
  createTime: "2017-07-21T17:32:28Z",
};
export const registrySix: catalog.RegistryRead = {
  name: registryThreeName,
  rootUrl: "https://charts.bitnami.com/bitnami",
  type: "HELM",
  createTime: "2017-07-21T17:32:28Z",
};

export class RegistryStore extends BaseStore<
  "name",
  catalog.RegistryRead,
  catalog.RegistryRead
> {
  constructor() {
    super("name", [
      registryOne,
      registryTwo,
      registryThree,
      registryFour,
      registryFive,
      registrySix,
      registryOne,
      registryTwo,
      registryThree,
      registryFour,
      registryFive,
      registrySix,
    ]);
  }

  static convertNameToDisplayName(name: string) {
    return name.toLowerCase().split(" ").join("-");
  }

  convert(body: catalog.Registry): catalog.Registry {
    return body;
  }

  list(): catalog.Registry[] {
    return this.resources;
  }

  filter(searchTerm: string | undefined): catalog.Registry[] {
    if (!searchTerm || searchTerm === null || searchTerm.trim().length === 0)
      return this.resources;

    return this.resources.filter(
      (registry: catalog.Registry) => registry.name.indexOf(searchTerm) >= 0,
    );
  }
}
