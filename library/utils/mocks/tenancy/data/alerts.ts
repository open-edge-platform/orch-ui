/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { omApi } from "@orch-ui/apis";
import {
  alertDefinitionEight,
  alertDefinitionFive,
  alertDefinitionFour,
  alertDefinitionNine,
  alertDefinitionOne,
  alertDefinitionSeven,
  alertDefinitionSix,
  alertDefinitionTen,
  alertDefinitionThree,
  alertDefinitionTwo,
} from "./alertDefinitions";

export const alertOne: omApi.Alert = {
  alertDefinitionId: alertDefinitionOne.id,
  startsAt: "2023-07-08 11:30",
  updatedAt: "2023-07-08 12:30",
  endsAt: "2023-07-08 13:30",
  status: { state: "active" },
  fingerprint: "fingerprint",
  labels: {
    alert_category: "Health",
    alert_context: "host",
    host_uuid: "4c4c4544-0035-3010-8030-c4c04f4a4633",
  },
  annotations: { description: "accumsan ante sagittis ege" },
};

export const alertTwo: omApi.Alert = {
  alertDefinitionId: alertDefinitionTwo.id,
  startsAt: "2023-07-08 11:30",
  updatedAt: "2023-07-08 12:30",
  endsAt: "2023-07-08 13:30",
  status: { state: "active" },
  fingerprint: "fingerprint",
  labels: {
    alert_category: "Health",
    alert_context: "host",
    host_uuid: "4c4c4544-004e-3710-8043-b6c04f4d5033",
  },
  annotations: { description: "accumsan ante sagittis ege" },
};

export const alertThree: omApi.Alert = {
  alertDefinitionId: alertDefinitionThree.id,
  startsAt: "2023-07-08 11:30",
  updatedAt: "2023-07-08 12:30",
  endsAt: "2023-07-08 13:30",
  status: { state: "active" },
  fingerprint: "fingerprint",
  labels: {
    alert_category: "Health",
    alert_context: "host",
    host_uuid: "4c4c4544-0056-4810-8053-b8c04f595233",
  },
  annotations: { description: "accumsan ante sagittis ege" },
};

export const alertFour: omApi.Alert = {
  alertDefinitionId: alertDefinitionFour.id,
  startsAt: "2023-07-08 11:30",
  updatedAt: "2023-07-08 12:30",
  endsAt: "2023-07-08 13:30",
  status: { state: "active" },
  fingerprint: "fingerprint",
  labels: {
    alert_category: "Health",
    alert_context: "host",
    host_uuid: "4c4c4544-0035-3070-8030-c4c04f4a4633",
  },
  annotations: { description: "accumsan ante sagittis ege" },
};

export const alertFive: omApi.Alert = {
  alertDefinitionId: alertDefinitionFive.id,
  startsAt: "2023-07-08 11:30",
  updatedAt: "2023-07-08 12:30",
  endsAt: "2023-07-08 13:30",
  status: { state: "active" },
  fingerprint: "fingerprint",
  labels: {
    alert_category: "Deployment",
    alert_context: "deployment",
    deployment_id: "deployment-one",
  },
  annotations: { description: "accumsan ante sagittis ege" },
};

export const alertSix: omApi.Alert = {
  alertDefinitionId: alertDefinitionSix.id,
  startsAt: "2023-07-08 11:30",
  updatedAt: "2023-07-08 12:30",
  endsAt: "2023-07-08 13:30",
  status: { state: "active" },
  fingerprint: "fingerprint",
  labels: {
    alert_category: "Deployment",
    alert_context: "deployment",
    deployment_id: "deployment-three",
  },
  annotations: { description: "accumsan ante sagittis ege" },
};

export const alertSeven: omApi.Alert = {
  alertDefinitionId: alertDefinitionSeven.id,
  startsAt: "2023-07-08 11:30",
  updatedAt: "2023-07-08 12:30",
  endsAt: "2023-07-08 13:30",
  status: { state: "active" },
  fingerprint: "fingerprint",
  labels: {
    alert_category: "Health",
    alert_context: "cluster",
    cluster_name: "clusterA",
  },
  annotations: {
    description: "accumsan ante sagittis ege",
  },
};

export const alertEight: omApi.Alert = {
  alertDefinitionId: alertDefinitionEight.id,
  startsAt: "2023-07-08 11:30",
  updatedAt: "2023-07-08 12:30",
  endsAt: "2023-07-08 13:30",
  status: { state: "active" },
  fingerprint: "fingerprint",
  labels: {
    alert_category: "Health",
    alert_context: "host",
    host_uuid: "4c4d4544-004e-4488-1050-c7c04f4d4533",
  },
  annotations: { description: "accumsan ante sagittis ege" },
};

export const alertNine: omApi.Alert = {
  alertDefinitionId: alertDefinitionNine.id,
  startsAt: "2023-07-08 11:30",
  updatedAt: "2023-07-08 12:30",
  endsAt: "2023-07-08 13:30",
  status: { state: "active" },
  fingerprint: "fingerprint",
  labels: {
    alert_category: "Health",
    alert_context: "host",
    host_uuid: "HostY",
  },
  annotations: { description: "accumsan ante sagittis ege" },
};

export const alertTen: omApi.Alert = {
  alertDefinitionId: alertDefinitionTen.id,
  startsAt: "2023-07-08 11:30",
  updatedAt: "2023-07-08 12:30",
  endsAt: "2023-07-08 13:30",
  status: { state: "active" },
  fingerprint: "fingerprint",
  labels: {
    alert_category: "Health",
    alert_context: "host",
    host_uuid: "HostZ",
  },
  annotations: { description: "accumsan ante sagittis ege" },
};

export const alertNoSource: omApi.Alert = {
  alertDefinitionId: alertDefinitionTen.id,
  startsAt: "2023-07-08 11:30",
  updatedAt: "2023-07-08 12:30",
  endsAt: "2023-07-08 13:30",
  status: { state: "active" },
  fingerprint: "fingerprint",
  labels: {
    alert_category: "Health",
  },
  annotations: { description: "accumsan ante sagittis ege" },
};

export const multipleAlerts: omApi.Alert[] = [
  alertOne,
  alertTwo,
  alertThree,
  alertFour,
  alertFive,
  alertSix,
  alertSeven,
  alertEight,
  alertNine,
  alertTen,
];

export default class AlertStore {
  alerts: omApi.Alert[];
  constructor() {
    this.alerts = multipleAlerts;
  }

  list(): omApi.Alert[] {
    return this.alerts;
  }

  get(id: string): omApi.Alert | undefined {
    return this.alerts.find((a) => a.alertDefinitionId === id);
  }
}
