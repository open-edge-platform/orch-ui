/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { catalog } from "@orch-ui/apis";
import { applicationOne, applicationTwo } from "./applications";
import {
  deploymentPprofileOneName,
  deploymentPprofileTwoName,
} from "./data/appCatalogIds";

export const deploymentProfileOne: catalog.DeploymentProfile = {
  name: deploymentPprofileOneName,
  description: "Description for profile one",
  applicationProfiles: {
    [applicationOne.name]: applicationOne.defaultProfileName ?? "",
  },
};

export const deploymentProfileTwo: catalog.DeploymentProfile = {
  name: deploymentPprofileTwoName,
  description: "Description for profile two",
  applicationProfiles: {
    [applicationOne.name]: applicationOne.defaultProfileName ?? "",
    [applicationTwo.name]: applicationTwo.profiles
      ? applicationTwo.profiles[0].name
      : "",
  },
};
