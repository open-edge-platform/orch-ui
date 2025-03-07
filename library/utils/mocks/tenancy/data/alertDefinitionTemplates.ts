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
    am_threshold: "30",
    am_threshold_min: "0",
    am_threshold_max: "100",
    am_definition_type: "integer",
    am_threshold_unit: "Mb/s",
    am_duration: "30s",
    am_duration_min: "15s",
    am_duration_max: "10m",
    am_enabled: "true",
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
