/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { catalog } from "@orch-ui/apis";

/**
 * @deprecated use shared/src/mocks/app-orch/catalog/profiles.ts instead
 */
export const singleProfile: catalog.Profile = {
  name: "default",
  displayName: "profile default",
  description: "Default Profile description",
  chartValues: "testing",
};

/**
 * @deprecated use shared/src/mocks/app-orch/catalog/profiles.ts instead
 */
export const minimalSingleProfile: catalog.Profile = {
  name: "minimal",
};

/**
 * @deprecated use shared/src/mocks/app-orch/catalog/profiles.ts instead
 */
export const completeSingleProfile: catalog.Profile = {
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
export const profileFormValues: catalog.Profile = {
  name: "testing-name",
  displayName: "Testing-Name",
  description: "TestingDescription",
  chartValues: "specSchema: 'Publisher'",
};
