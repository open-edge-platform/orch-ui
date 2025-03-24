/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

//TODO: Create a new VM store by reusing below mock data

import { arm } from "@orch-ui/apis";
import {
  deploymentClusterOneAppConsoleId,
  deploymentClusterOneAppOneId,
  deploymentClusterOneAppTwoId,
  deploymentClusterOneAppWordpressId,
} from "./deploymentApps";
import { pod1_id, vm1_id, vm2_id, vm4_id, vm5_id } from "./ids";

/**
 * @deprecated create shared/src/mocks/app-orch/appResourceManager/vm.ts instead
 */

export const container1: arm.ContainerRead = {
  name: "Container-1",
  imageName: "nginx",
  restartCount: 2,
  status: {
    containerStateRunning: {
      reason: "no",
      message: "running",
    },
  },
};

const aw1: arm.AppWorkloadRead = {
  createTime: "1679959947",
  name: "VM One",
  id: vm1_id,
  namespace: "default",
  type: "TYPE_VIRTUAL_MACHINE",
  virtualMachine: {
    status: {
      state: "STATE_RUNNING",
    },
  },
};
const aw2: arm.AppWorkloadRead = {
  createTime: "1679959947",
  name: "VM Two",
  id: vm2_id,
  namespace: "default",
  type: "TYPE_VIRTUAL_MACHINE",
  virtualMachine: {
    status: {
      state: "STATE_RUNNING",
    },
  },
};
const aw3: arm.AppWorkloadRead = {
  createTime: "2023-03-30T23:28:43Z",
  name: "Pod One",
  id: pod1_id,
  namespace: "default",
  type: "TYPE_POD",
  pod: {
    containers: [container1],
    status: {
      state: "STATE_RUNNING",
    },
  },
};

const aw4: arm.AppWorkloadRead = {
  createTime: "2023-03-30T23:28:43Z",
  name: "VM Four",
  id: vm4_id,
  namespace: "default",
  type: "TYPE_VIRTUAL_MACHINE",
  pod: {
    status: {
      state: "STATE_RUNNING",
    },
  },
};

/**
 * @deprecated
 */
const appEndpoint1: arm.AppEndpointRead = {
  id: "test",
  name: "test",
  fqdns: [{ fqdn: "awesome.name.org" }, { fqdn: "amazing.name.eu" }],
  ports: [
    {
      name: "web-traffic",
      value: 80,
      protocol: "HTTP",
      serviceProxyUrl:
        "https://api-proxy.kind.internal/k8s/clusters/deployment-zs425-wordpress-ae/api/v1/namespaces/apps2/services/wordpress:80/proxy/",
    },
    {
      name: "web-traffic-secured",
      value: 433,
      protocol: "HTTPS",
    },
  ],
  endpointStatus: {
    state: "STATE_READY",
  },
};

/**
 * @deprecated
 */
const appEndpoint2: arm.AppEndpointRead = {
  id: "appendpoint2",
  name: "App Endpoint Name",
  fqdns: [{ fqdn: "another.name.org" }],
  ports: [
    {
      name: "file-transfer",
      value: 22,
      protocol: "FTP",
      serviceProxyUrl:
        "https://api-proxy.kind.internal/k8s/clusters/deployment-zs425-wordpress-ae/api/v1/namespaces/apps2/services/wordpress:22/proxy/",
    },
  ],
  endpointStatus: {
    state: "STATE_NOT_READY",
  },
};

/**
 * @deprecated
 */
export const vmWithVnc: arm.AppWorkloadRead = {
  createTime: "2023-03-30T23:28:43Z",
  name: "VM with VNC",
  id: vm5_id,
  namespace: "default",
};

/**
 * @deprecated
 */
export const vncAddress =
  "ws://127.0.0.1:59000/vnc/b-c592006d-4a25-5ef3-8c3f-e288dceb4c1f/c-m-kind/80bdc552-2dbd-40c3-8ac5-06f8088972fd";

/**
 * @deprecated
 */
export const vms: {
  [key: string]: arm.AppWorkloadServiceListAppWorkloadsApiResponse;
} = {
  [deploymentClusterOneAppOneId]: { appWorkloads: [aw1, aw2, aw3] },
  [deploymentClusterOneAppTwoId]: { appWorkloads: [aw4] },
  [deploymentClusterOneAppWordpressId]: { appWorkloads: [aw2, aw4] },
  [deploymentClusterOneAppConsoleId]: { appWorkloads: [aw2, aw3] },
};

/**
 * @deprecated
 */
export const appEndpoints: { [key: string]: arm.ListAppEndpointsResponse } = {
  [deploymentClusterOneAppConsoleId]: {
    appEndpoints: [appEndpoint1, appEndpoint2],
  },
};
