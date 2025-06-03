/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import { SharedStorage } from "@orch-ui/utils";
import { HostData } from "../../../store/configureHost";

export const isHostRead = (object: any): object is infra.HostResourceRead => {
  return typeof object === "object" && object !== null && object.resourceId;
};

// infra.HostResourceRead successfull API call that returns updated values
// string = error message from API failure
// undefined = no API call made
export type HostConfigResponse = infra.HostResourceRead | string | undefined;

export const createRegisteredHost = async (
  host: HostData,
  autoOnboard: boolean,
  registerHostApi,
): Promise<HostConfigResponse> => {
  let response: HostConfigResponse = undefined;
  await registerHostApi({
    hostRegister: {
      autoOnboard,
      name: host.name,
      serialNumber: host.serialNumber || undefined, //undefined takes it away from existing in payload
      uuid: host.uuid || undefined,
    },
    projectName: SharedStorage.project?.name ?? "",
  })
    .unwrap()
    .then((host) => {
      response = host;
    })
    .catch((e) => {
      response = e.data.message;
    });

  return response;
};

export const updateHostDetails = async (
  host: HostData,
  patchHostApi,
): Promise<HostConfigResponse> => {
  let response: HostConfigResponse = undefined;
  await patchHostApi({
    projectName: SharedStorage.project?.name ?? "",
    resourceId: host.resourceId!,
    body: {
      name: host.name,
      siteId: host.siteId,
      metadata: host.metadata,
    },
  })
    .unwrap()
    .then((host) => {
      response = host;
    })
    .catch((e) => {
      response = e.data.message;
    });

  return response;
};

export const createHostInstance = async (
  host,
  setCreatedInstances,
  postInstanceApi,
): Promise<HostConfigResponse> => {
  let response: HostConfigResponse = undefined;
  const payload: infra.InstanceServiceCreateInstanceApiArg = {
    projectName: SharedStorage.project?.name ?? "",
    instanceResource: {
      securityFeature: host.instance?.securityFeature,
      osID: host.instance?.osID,
      kind: "INSTANCE_KIND_METAL",
      hostID: host.resourceId,
      name: `${host.name}-instance`,
      localAccountID: host.instance?.localAccountID,
    },
  };
  await postInstanceApi(payload)
    .unwrap()
    .then(() => {
      response = host;
      setCreatedInstances((prevState) => prevState.add(host.resourceId!));
    })
    .catch((e) => {
      response = e.data.message;
    });

  return response;
};
