/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { ecm, eim } from "@orch-ui/apis";
import { CyApiDetails, CyPom, defaultActiveProject } from "@orch-ui/tests";
import { clusterOne, clusterOneCreating } from "@orch-ui/utils";

const dataCySelectors = ["search", "tableRowOptions", "apiError"] as const;
type Selectors = (typeof dataCySelectors)[number];

type SuccessClusterApiAliases = "getClusterDetails";
type SuccessHostApiAliases = "getFirstHostData";
type CreatingHostApiAliases = "getCreatingHostData";
type ErrorApiAliases = "getClusterError500" | "getFirstHostError500";
type ApiAliases =
  | SuccessClusterApiAliases
  | SuccessHostApiAliases
  | CreatingHostApiAliases
  | ErrorApiAliases;

const clusterRoute = "**/v1/**/clusters/**";
const firstHostRoute = `**/v1/projects/${defaultActiveProject.name}/compute/hosts/**`;

const successClusterEndpoint: CyApiDetails<
  SuccessClusterApiAliases,
  ecm.GetV1ProjectsByProjectNameClustersAndClusterNameApiResponse
> = {
  getClusterDetails: {
    route: clusterRoute,
    statusCode: 200,
    response: clusterOne,
  },
};

const successCreatingClusterHostEndpoint: CyApiDetails<
  CreatingHostApiAliases,
  ecm.GetV1ProjectsByProjectNameClustersAndClusterNameApiResponse
> = {
  getCreatingHostData: {
    route: clusterRoute,
    statusCode: 200,
    response: clusterOneCreating,
  },
};
const successHostEndpoints: CyApiDetails<
  SuccessHostApiAliases,
  eim.GetV1ProjectsByProjectNameComputeHostsAndHostIdApiResponse
> = {
  getFirstHostData: {
    route: firstHostRoute,
    response: (req) => {
      const host = {
        hostID: "host-dh38bjw9",
        instance: "instance-dh38bjw9",
        status: "HOST_STATUS_RUNNING",
        state: {
          timestamp: "",
          condition: "",
          type: "STATUS_CONDITION_RUNNING",
        },
        uuid: "4c4c4544-0044-4210-8031-c2c04f305233",
        site: "restaurant-one",
        metadata: [],
        serial: "hostOneSerial",
      };
      return req.reply({
        statusCode: 200,
        body: host,
      });
    },
  },
};

const errorEndpoints: CyApiDetails<ErrorApiAliases> = {
  getClusterError500: {
    route: clusterRoute,
    statusCode: 500,
    response: { code: 5, message: "host API failed in process", details: [] },
  },
  getFirstHostError500: {
    route: firstHostRoute,
    statusCode: 500,
    response: { code: 5, message: "host API failed in process", details: [] },
  },
};

export class ClusterHostsBySitePom extends CyPom<Selectors, ApiAliases> {
  public testClusterId = clusterOne.clusterID;
  public testCluster = clusterOne;
  public testClusterCreating = clusterOneCreating;

  constructor(public rootCy: string = "clusterHostBySite") {
    super(rootCy, [...dataCySelectors], {
      ...{
        ...successClusterEndpoint,
        ...successHostEndpoints,
        ...successCreatingClusterHostEndpoint,
      },
      ...errorEndpoints,
    });
  }
}
