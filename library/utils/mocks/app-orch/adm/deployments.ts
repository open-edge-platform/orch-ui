/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { adm } from "@orch-ui/apis";
import { BaseStore } from "../../baseStore";
import { clusterFiveName, clusterThreeName } from "../../cluster-orch";
import {
  customersKey,
  customersOne,
  customersTwo,
  regionsKey,
  regionsOne,
  statesKey,
  statesOne,
  statesThree,
} from "../../metadata-broker/metadata";
import { StoreUtils } from "../../storeUtils";
import {
  appForEditDeployment2,
  applicationOne,
  applicationTwo,
  deploymentProfileTwo,
  packageForEditDeployment,
  packageFour,
  packageOne,
  packageThree,
  profileOne,
} from "../catalog";
import {
  deploymentDeployingId,
  deploymentErrorId,
  deploymentMinimalId,
  deploymentOneDisplayName,
  deploymentOneId,
  deploymentOneName,
  deploymentThreeId,
  deploymentThreeName,
  deploymentTwoId,
  deploymentTwoName,
  deploymentUnknownId,
  deploymentUpdatingId,
  deploymentWithUpdateAvailableId,
  deploymentWithUpdateAvailableName,
} from "./data/appDeploymentManagerIds";

const deploymentOneMetadata: { [key: string]: string } = {
  [customersKey]: customersOne,
  [statesKey]: statesOne,
  [regionsKey]: regionsOne,
};

const deploymentTwoMetadata: { [key: string]: string } = {
  [customersKey]: customersTwo,
  [statesKey]: statesThree,
};

export const deploymentMinimal: adm.DeploymentRead = {
  deployId: deploymentMinimalId,
  name: "minimal-deployment",
  displayName: "Minimal Deployment",
  appName: packageOne.name,
  appVersion: packageOne.version,
  profileName: "",
  publisherName: "intel", // FIXME remove once gone from ADM
  targetClusters: [],
  status: {
    state: "RUNNING",
    summary: {
      down: 0,
      running: 0,
      total: 0,
    },
  },
  createTime: "Sat Mar 16 2024 22:52:19 GMT-0700",
};

export const deploymentWithUpdateAvailable: adm.DeploymentRead = {
  deployId: deploymentWithUpdateAvailableId,
  name: deploymentWithUpdateAvailableName,
  displayName: deploymentWithUpdateAvailableName,
  appName: packageOne.name,
  appVersion: "0.0.1", //packageOne.version,
  profileName: "default-profile",
  publisherName: "intel", // FIXME remove once gone from ADM
  overrideValues: [
    {
      targetNamespace: "testing",
      appName: applicationOne.name,
      values: {
        version: "11",
        image: { containerDisk: { pullSecret: "value1" } },
        a: { b: { c: { d: { e: "value3" } } } },
      },
    },
    {
      targetNamespace: "console",
      appName: applicationTwo.name,
    },
  ],
  targetClusters: packageOne.applicationReferences.map((ar) => ({
    appName: ar.name,
    labels: deploymentOneMetadata,
  })),
  status: {
    state: "RUNNING",
    summary: {
      down: 0,
      running: 3,
      total: 3,
    },
  },
  createTime: "2022-03-30T13:29:10Z",
  deploymentType: "Auto-scaling",
};

// deploymentOne has 1 cluster and all apps are running fine
export const deploymentOne: adm.DeploymentRead = {
  deployId: deploymentOneId,
  name: deploymentOneName,
  displayName: deploymentOneDisplayName,
  appName: packageOne.name,
  appVersion: packageOne.version,
  profileName: "default-profile",
  publisherName: "intel", // FIXME remove once gone from ADM
  overrideValues: [
    {
      targetNamespace: "testing",
      appName: applicationOne.name,
      values: {
        version: "11",
        image: { containerDisk: { pullSecret: "value1" } },
        a: { b: { c: { d: { e: "value3" } } } },
      },
    },
    {
      targetNamespace: "console",
      appName: applicationTwo.name,
    },
  ],
  targetClusters: packageOne.applicationReferences.map((ar) => ({
    appName: ar.name,
    labels: deploymentOneMetadata,
  })),
  status: {
    state: "RUNNING",
    summary: {
      down: 0,
      running: 3,
      total: 3,
    },
  },
  createTime: "2022-03-30T13:29:10Z",
  deploymentType: "Auto-scaling",
};

// deploymentOne has 1 Ready cluster and 1 NotReady cluster
// TODO add applications in Cluster
export const deploymentTwo: adm.DeploymentRead = {
  deployId: deploymentTwoId,
  name: deploymentTwoName,
  appName: packageThree.name,
  appVersion: packageThree.version,
  profileName: profileOne.name,
  publisherName: "intel", // FIXME remove once gone from ADM
  overrideValues: [
    {
      targetNamespace: "testing",
      appName: applicationOne.name,
      values: {
        image: {
          containerDisk: { pullSecret: "%OrchGeneratedDockerCredential%" },
        },
        version: "11",
      },
    },
  ],
  targetClusters: packageThree.applicationReferences.map((ar) => ({
    appName: ar.name,
    labels: deploymentTwoMetadata,
  })),
  status: {
    state: "RUNNING",
    summary: {
      down: 0,
      running: 2,
      total: 2,
    },
  },
  deploymentType: "Manual",
};

export const deploymentThree: adm.DeploymentRead = {
  deployId: deploymentThreeId,
  name: deploymentThreeName,
  appName: packageFour.name,
  appVersion: packageFour.version,
  profileName: deploymentProfileTwo.name,
  publisherName: "intel", // FIXME remove once gone from ADM
  targetClusters: packageFour.applicationReferences.map((ar) => ({
    appName: ar.name,
    labels: deploymentTwoMetadata,
  })),
  overrideValues: [
    {
      targetNamespace: "testing",
      appName: applicationOne.name,
      values: {
        image: { containerDisk: { pullSecret: "value2" } },
        version: "12",
      },
    },
  ],
  status: {
    state: "DOWN",
    summary: {
      down: 1,
      running: 0,
      total: 1,
    },
  },
  deploymentType: "Auto-scaling",
};

const deploymentDefault = {
  name: deploymentDeployingId,
  appName: packageOne.name,
  appVersion: packageOne.version,
  profileName: "",
  publisherName: "intel", // FIXME remove once gone from ADM
  targetClusters: [],
};
export const deploymentDeploying: adm.DeploymentRead = {
  ...deploymentDefault,
  deployId: deploymentDeployingId,
  displayName: "Deployment Deploying",
  status: {
    state: "DEPLOYING",
    summary: {
      down: 1,
      running: 0,
      total: 1,
    },
  },
};
export const deploymentError: adm.DeploymentRead = {
  ...deploymentDefault,
  deployId: deploymentErrorId,
  displayName: "Deployment Error",
  status: {
    state: "INTERNAL_ERROR",
    summary: {
      down: 0,
      running: 0,
      total: 0,
    },
  },
};
export const deploymentUnknown: adm.DeploymentRead = {
  ...deploymentDefault,
  deployId: deploymentUnknownId,
  displayName: "Deployment Unknown",
  status: {
    state: "UNKNOWN",
    summary: {
      down: 0,
      running: 0,
      total: 0,
    },
  },
  deploymentType: "Manual",
};
export const deploymentUpdating: adm.DeploymentRead = {
  ...deploymentDefault,
  deployId: deploymentUpdatingId,
  displayName: "Deployment Updating",
  status: {
    state: "UPDATING",
    summary: {
      down: 0,
      running: 0,
      total: 0,
    },
  },
};

export const deploymentEditAutomatic: adm.DeploymentRead = {
  deployId: "deployment-for-edit-auto",
  name: "deployment-for-edit-name-auto",
  displayName: "Deployment for edit auto",
  appName: packageForEditDeployment.name,
  appVersion: packageForEditDeployment.version,
  profileName: "min",
  overrideValues: [
    {
      appName: appForEditDeployment2.name,
      values: {
        key: "3",
      },
    },
  ],
  status: {
    state: "RUNNING",
    summary: {
      down: 0,
      running: 3,
      total: 3,
    },
  },
  createTime: "2025-02-04T12:29:10Z",
  deploymentType: "auto-scaling",
  targetClusters: packageForEditDeployment.applicationReferences.map((ar) => ({
    appName: ar.name,
    labels: deploymentOneMetadata,
  })),
};

export const deploymentEditManual: adm.DeploymentRead = {
  deployId: "deployment-for-edit-manual",
  name: "deployment-for-edit-name-manual",
  displayName: "Deployment for edit manual",
  appName: packageForEditDeployment.name,
  appVersion: packageForEditDeployment.version,
  profileName: "min",
  overrideValues: [
    {
      appName: appForEditDeployment2.name,
      values: {
        key: "3",
      },
    },
  ],
  status: {
    state: "RUNNING",
    summary: {
      down: 0,
      running: 3,
      total: 3,
    },
  },
  createTime: "2025-02-07T12:29:10Z",
  deploymentType: "targeted",
  targetClusters: [clusterThreeName, clusterFiveName].flatMap((clusterName) =>
    packageForEditDeployment.applicationReferences.map((ar) => ({
      appName: ar.name,
      clusterId: clusterName,
    })),
  ),
};

export class DeploymentsStore extends BaseStore<
  "deployId",
  adm.DeploymentRead
> {
  constructor() {
    super("deployId", [
      deploymentOne,
      deploymentTwo,
      deploymentThree,
      deploymentEditAutomatic,
      deploymentEditManual,
      deploymentWithUpdateAvailable,
    ]);
  }

  post(body: adm.DeploymentRead): adm.DeploymentRead {
    const d: adm.DeploymentRead = {
      ...body,
      deployId: StoreUtils.randomString(),
      status: {
        state: "DOWN",
        summary: {
          down: 1,
          running: 2,
          total: 3,
        },
      },
    };
    this.resources.push(d);
    return d;
  }

  convert(body: adm.DeploymentRead): adm.DeploymentRead {
    return body;
  }

  filter(
    searchTerm: string | undefined,
    pkgs: adm.DeploymentRead[],
  ): adm.DeploymentRead[] {
    if (!searchTerm || searchTerm === null || searchTerm.trim().length === 0)
      return pkgs;
    const searchTermValue = searchTerm.split("OR")[0].split("=")[1];
    const result = pkgs.filter((pkg: adm.DeploymentRead) => {
      return (
        pkg.name?.includes(searchTermValue) ||
        pkg.displayName?.includes(searchTermValue) ||
        pkg.appVersion?.includes(searchTermValue) ||
        pkg.appName?.includes(searchTermValue)
      );
    });
    return result;
  }

  sort(
    orderBy: string | undefined,
    pkgs: adm.DeploymentRead[],
  ): adm.DeploymentRead[] {
    if (!orderBy || orderBy === null || orderBy.trim().length === 0)
      return pkgs;
    const column: "displayName" | "appName" | "appVersion" = orderBy.split(
      " ",
    )[0] as "displayName" | "appName" | "appVersion";
    const direction = orderBy.split(" ")[1];

    pkgs.sort((a, b) => {
      const valueA = a[column] ? a[column]!.toUpperCase() : "";
      const valueB = b[column] ? b[column]!.toUpperCase() : "";
      if (valueA < valueB) {
        return direction === "asc" ? -1 : 1;
      }
      if (valueA > valueB) {
        return direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    return pkgs;
  }
}

export default DeploymentsStore;
