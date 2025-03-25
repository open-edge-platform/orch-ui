/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

export interface TestRegisterHostData {
  name: string;
  serialNumber: string;
}

export const isTestRegisterHostData = (
  arg: any,
): arg is TestRegisterHostData => {
  if (!arg.name || !arg.serialNumber) return false;
  return true;
};
