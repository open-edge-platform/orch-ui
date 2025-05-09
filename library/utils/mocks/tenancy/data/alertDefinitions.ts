/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { omApi } from "@orch-ui/apis";

export const alertDefinitionOne: omApi.AlertDefinition = {
  id: "Host-ConnectionLostID",
  name: "HostConnectionLost",
  state: "applied",
  values: {
    threshold: "30",
    duration: "30s",
  },
};

export const alertDefinitionTwo: omApi.AlertDefinition = {
  id: "Host-Error-ID",
  name: "HostError",
  state: "applied",
  values: {
    threshold: "30",
    duration: "30s",
  },
};

export const alertDefinitionThree: omApi.AlertDefinition = {
  id: "Host-CPUUsageID",
  name: "HostCPUUsage",
  state: "applied",
  values: {
    threshold: "30",
    duration: "30s",
  },
};

export const alertDefinitionFour: omApi.AlertDefinition = {
  id: "Host-RAM-Usage-ID",
  name: "HostRAMUsage",
  state: "new",
  values: {
    threshold: "30",
    duration: "30s",
  },
};

export const alertDefinitionFive: omApi.AlertDefinition = {
  id: "Deployment-Down-ID",
  name: "DeploymentDown",
  state: "applied",
  values: {
    threshold: "30",
    duration: "30s",
  },
};

export const alertDefinitionSix: omApi.AlertDefinition = {
  id: "Deployment-Error-ID",
  name: "DeploymentError",
  state: "applied",
  values: {
    threshold: "30",
    duration: "30s",
  },
};

export const alertDefinitionSeven: omApi.AlertDefinition = {
  id: "Cluster-Down-ID",
  name: "ClusterDown",
  state: "new",
  values: {
    threshold: "30",
    duration: "30s",
  },
};

export const alertDefinitionEight: omApi.AlertDefinition = {
  id: "Cluster-Error-ID",
  name: "ClusterError",
  state: "applied",
  values: {
    threshold: "30",
    duration: "30s",
  },
};

export const alertDefinitionNine: omApi.AlertDefinition = {
  id: "Cluster-CPU-Usage-ID",
  name: "ClusterCPUUsage",
  state: "applied",
  values: {
    threshold: "30",
    duration: "5m",
  },
};

export const alertDefinitionTen: omApi.AlertDefinition = {
  id: "Cluster-RAM-Usage-ID",
  name: "ClusterRAMUsage",
  state: "applied",
  values: {
    threshold: "30",
    duration: "30s",
  },
};

export const multipleAlertDefinitions: omApi.AlertDefinition[] = [
  alertDefinitionOne,
  alertDefinitionTwo,
  alertDefinitionThree,
  alertDefinitionFour,
  alertDefinitionFive,
  alertDefinitionSix,
  alertDefinitionSeven,
  alertDefinitionEight,
  alertDefinitionNine,
  alertDefinitionTen,
];

export default class AlertDefinitionStore {
  alertDefinitions: omApi.AlertDefinition[];
  constructor() {
    this.alertDefinitions = multipleAlertDefinitions;
  }

  list(): omApi.AlertDefinition[] {
    return this.alertDefinitions;
  }

  get(id: string): omApi.AlertDefinition | undefined {
    return this.alertDefinitions.find((ad) => ad.id === id);
  }
}
