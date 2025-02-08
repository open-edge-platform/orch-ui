/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { catalog } from "@orch-ui/apis";

/**
 * @deprecated use shared/src/mocks/app-orch/catalog/profiles.ts instead
 */
export const singleProfile: catalog.ProfileRead = {
  name: "default",
  displayName: "profile default",
  description: "Default Profile description",
  chartValues: "testing",
};

/**
 * @deprecated use shared/src/mocks/app-orch/catalog/profiles.ts instead
 */
export const minimalSingleProfile: catalog.ProfileRead = {
  name: "minimal",
};

/**
 * @deprecated use shared/src/mocks/app-orch/catalog/profiles.ts instead
 */
export const completeSingleProfile: catalog.ProfileRead = {
  name: "complete",
  displayName: "Testing Name",
  description: "TestingDescription",
  chartValues: "specSchema: 'Publisher'",
  createTime: "2022-03-30T13:29:10Z",
  updateTime: "2022-03-30T13:29:10Z",
};

/**
 * @deprecated use shared/src/mocks/app-orch/catalog/profiles.ts instead
 */
export const profileFormValues: catalog.ProfileRead = {
  name: "testing-name",
  displayName: "Testing-Name",
  description: "TestingDescription",
  chartValues: "specSchema: 'Publisher'",
};
