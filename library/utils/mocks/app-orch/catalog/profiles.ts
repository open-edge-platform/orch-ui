/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { catalog } from "@orch-ui/apis";
import {
  profileOneDisplayName,
  profileOneName,
  profileThreeName,
  profileTwoDisplayName,
  profileTwoName,
} from "./data/appCatalogIds";
import {
  parameterTemplateFive,
  parameterTemplateFour,
  parameterTemplateOne,
  parameterTemplateThree,
  parameterTemplateTwo,
} from "./parameterTemplates";

export const profileOne: catalog.Profile = {
  name: profileOneName,
  displayName: profileOneDisplayName,
  description: "Description for profile one",
  chartValues:
    "image:\n  containerDisk:\n    pullSecret: '%OrchGeneratedDockerCredential%'\nversion: 10",
  parameterTemplates: [
    parameterTemplateThree,
    parameterTemplateFour,
    parameterTemplateOne,
    parameterTemplateFive,
  ],
};

export const profileTwo: catalog.Profile = {
  name: profileTwoName,
  displayName: profileTwoDisplayName,
  description: "Description for profile two",
  chartValues:
    "image:\n  containerDisk:\n    pullSecret: '%OrchGeneratedDockerCredential%'",
  parameterTemplates: [parameterTemplateOne, parameterTemplateTwo],
};

export const profileThree: catalog.Profile = {
  name: profileThreeName,
  description: "Description for profile three",
  parameterTemplates: [parameterTemplateTwo],
  chartValues:
    "image:\n  containerDisk:\n    pullSecret: '%OrchGeneratedDockerCredential%'",
};
