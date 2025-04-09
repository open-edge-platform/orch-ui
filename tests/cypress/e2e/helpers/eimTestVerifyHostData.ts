/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

export interface TestVerifyHostData {
  region: string;
  site: string;
}

export const isTestVerifyHostData = (arg: any): arg is TestVerifyHostData => {
  if (!arg.region || !arg.site) return false;
  return true;
};
