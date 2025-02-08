/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { catalog } from "@orch-ui/apis";

export const parameterTemplateOne: catalog.ParameterTemplate = {
  name: "image.containerDisk.pullSecret",
  displayName: "Pull Secret",
  type: "string",
  default: "%OrchGeneratedDockerCredential%",
  suggestedValues: ["value1", "value2", "value3"],
  mandatory: true,
  secret: false,
};

export const parameterTemplateTwo: catalog.ParameterTemplate = {
  name: "version",
  displayName: "ver",
  type: "number",
  default: "10",
  suggestedValues: ["10", "11", "12"],
  mandatory: false,
  secret: false,
};

export const parameterTemplateThree: catalog.ParameterTemplate = {
  name: "image.containerDisk.volume",
  displayName: "Disk Volume",
  type: "string",
  default: "10",
  suggestedValues: ["20", "30"],
  mandatory: true,
  secret: true,
};

export const parameterTemplateFour: catalog.ParameterTemplate = {
  name: "image.containerDisk.justSecret",
  displayName: "Just Secret",
  type: "string",
  default: "%OrchGeneratedDockerCredential%",
  suggestedValues: [],
  mandatory: false,
  secret: true,
};

export const parameterTemplateFive: catalog.ParameterTemplate = {
  name: "image.containerDisk.free",
  displayName: "Free",
  type: "string",
  default: "free",
  suggestedValues: ["value1", "value2", "value3"],
  mandatory: false,
  secret: false,
};
