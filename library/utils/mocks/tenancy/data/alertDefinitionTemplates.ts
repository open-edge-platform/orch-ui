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

export const alertDefinitionTemplateOne: omApi.AlertDefinitionTemplate = {
  alert: alertDefinitionOne.id,
  labels: {
    threshold: "30",
    duration: "30s",
  },
  annotations: {
    am_duration: "30s",
    am_duration_max: "10m",
    am_duration_min: "15s",
    am_enabled: "true",
    am_threshold: "30",
    am_threshold_max: "100",
    am_threshold_min: "0",
    am_definition_type: "integer",
    am_threshold_unit: "Mb/s",
    description: "Host $labels.host_uuid connection lost.",
    display_name: "Host - Connection Lost",
    summary: "Host has lost connection.",
  },
};

export const alertDefinitionTemplateTwo: omApi.AlertDefinitionTemplate = {
  alert: alertDefinitionTwo.id,
  labels: {
    threshold: "30",
    duration: "5m",
  },
  annotations: {
    am_threshold: "30",
    am_threshold_min: "0",
    am_threshold_max: "100",
    am_definition_type: "integer",
    am_threshold_unit: "Mb/s",
    am_duration: "5m",
    am_duration_min: "15s",
    am_duration_max: "10m",
    am_enabled: "true",
    description: "Host $labels.host_uuid is in error state.",
    display_name: "Host - Error",
    summary: "Host is in error state.",
  },
};

export const alertDefinitionTemplateThree: omApi.AlertDefinitionTemplate = {
  alert: alertDefinitionThree.id,
  labels: {
    threshold: "30",
    duration: "30s",
  },
  annotations: {
    am_threshold: "30",
    am_threshold_min: "0",
    am_threshold_max: "100",
    am_definition_type: "integer",
    am_threshold_unit: "Mb/s",
    am_duration: "30s",
    am_duration_min: "15s",
    am_duration_max: "10m",
    am_enabled: "true",
    description: "Host $labels.host_uuid CPU usage is above threshold.",
    display_name: "Host - CPU Usage",
    summary: "High CPU usage on host $labels.host_uuid.",
  },
};

export const alertDefinitionTemplateFour: omApi.AlertDefinitionTemplate = {
  alert: alertDefinitionFour.id,
  labels: {
    threshold: "30",
    duration: "30s",
  },
  annotations: {
    am_threshold: "30",
    am_threshold_min: "0",
    am_threshold_max: "100",
    am_definition_type: "integer",
    am_threshold_unit: "Mb/s",
    am_duration: "30s",
    am_duration_min: "15s",
    am_duration_max: "10m",
    am_enabled: "false",
    description: "Host $labels.host_uuid RAM usage is above threshold.",
    display_name: "Host - RAM Usage",
    summary: "High RAM usage on host $labels.host_uuid.",
  },
};

export const alertDefinitionTemplateFive: omApi.AlertDefinitionTemplate = {
  alert: alertDefinitionFive.id,
  labels: {
    threshold: "30",
    duration: "30s",
  },
  annotations: {
    am_threshold: "30",
    am_threshold_min: "0",
    am_threshold_max: "100",
    am_definition_type: "integer",
    am_threshold_unit: "Mb/s",
    am_duration: "30s",
    am_duration_min: "15s",
    am_duration_max: "10m",
    am_enabled: "true",
    description: "Deployment $labels.deployment_id is down.",
    display_name: "Deployment - Down",
    summary: "Deployment $labels.deployment_id is down.",
  },
};

export const alertDefinitionTemplateSix: omApi.AlertDefinitionTemplate = {
  alert: alertDefinitionSix.id,
  labels: {
    threshold: "30",
    duration: "30s",
  },
  annotations: {
    am_threshold: "1",
    am_threshold_min: "1",
    am_threshold_max: "1",
    am_definition_type: "boolean",
    am_threshold_unit: "Mb/s",
    am_duration: "30s",
    am_duration_min: "15s",
    am_duration_max: "10m",
    am_enabled: "false",
    description: "Deployment $labels.deployment_id is in error state.",
    display_name: "Deployment - Error",
    summary: "Deployment $labels.deployment_id is in error state.",
  },
};

export const alertDefinitionTemplateSeven: omApi.AlertDefinitionTemplate = {
  alert: alertDefinitionSeven.id,
  labels: {
    threshold: "30",
    duration: "30s",
  },
  annotations: {
    am_threshold: "30",
    am_threshold_min: "0",
    am_threshold_max: "100",
    am_definition_type: "integer",
    am_threshold_unit: "Mb/s",
    am_duration: "30s",
    am_duration_min: "15s",
    am_duration_max: "10m",
    am_enabled: "true",
    description: "Cluster $labels.cluster_name is down.",
    display_name: "Cluster - Down",
    summary: "Cluster $labels.cluster_name is down.",
  },
};

export const alertDefinitionTemplateEight: omApi.AlertDefinitionTemplate = {
  alert: alertDefinitionEight.id,
  labels: {
    threshold: "30",
    duration: "30s",
  },
  annotations: {
    am_threshold: "30",
    am_threshold_min: "0",
    am_threshold_max: "100",
    am_definition_type: "integer",
    am_threshold_unit: "Mb/s",
    am_duration: "30s",
    am_duration_min: "15s",
    am_duration_max: "10m",
    am_enabled: "true",
    description: "Cluster $labels.cluster_name is in error state.",
    display_name: "Cluster - Error",
    summary: "Cluster $labels.cluster_name is in error state.",
  },
};

export const alertDefinitionTemplateNine: omApi.AlertDefinitionTemplate = {
  alert: alertDefinitionNine.id,
  labels: {
    threshold: "30",
    duration: "30s",
  },
  annotations: {
    am_threshold: "30",
    am_threshold_min: "0",
    am_threshold_max: "100",
    am_definition_type: "integer",
    am_threshold_unit: "Mb/s",
    am_duration: "30s",
    am_duration_min: "15s",
    am_duration_max: "10m",
    am_enabled: "true",
    description: "Cluster $labels.clusterName CPU usage is above threshold.",
    display_name: "Cluster - CPU Usage",
    summary: "High CPU usage on cluster $labels.clusterName.",
  },
};

export const alertDefinitionTemplateTen: omApi.AlertDefinitionTemplate = {
  alert: alertDefinitionTen.id,
  labels: {
    threshold: "30",
    duration: "30s",
  },
  annotations: {
    am_threshold: "30",
    am_threshold_min: "0",
    am_threshold_max: "100",
    am_definition_type: "integer",
    am_threshold_unit: "Mb/s",
    am_duration: "30s",
    am_duration_min: "15s",
    am_duration_max: "10m",
    am_enabled: "true",
    description: "Cluster $labels.clusterName RAM usage is above threshold.",
    display_name: "Cluster RAM Usage Exceeds Threshold",
    summary: "High RAM usage on cluster $labels.clusterName.",
  },
};

export const multipleAlertDefinitionTemplates: omApi.AlertDefinitionTemplate[] =
  [
    alertDefinitionTemplateOne,
    alertDefinitionTemplateTwo,
    alertDefinitionTemplateThree,
    alertDefinitionTemplateFour,
    alertDefinitionTemplateFive,
    alertDefinitionTemplateSix,
    alertDefinitionTemplateSeven,
    alertDefinitionTemplateEight,
    alertDefinitionTemplateNine,
    alertDefinitionTemplateTen,
  ];

export default class AlertDefinitionTemplateStore {
  alertDefinitionTemplates: omApi.AlertDefinitionTemplate[];
  constructor() {
    this.alertDefinitionTemplates = multipleAlertDefinitionTemplates;
  }

  list(): omApi.AlertDefinitionTemplate[] {
    return this.alertDefinitionTemplates;
  }

  get(alertDefinition: string): omApi.AlertDefinitionTemplate | undefined {
    return this.alertDefinitionTemplates.find(
      (adt) => adt.alert === alertDefinition,
    );
  }
}
