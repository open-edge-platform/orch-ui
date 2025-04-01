/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

export interface TestProvisionHostData {
  hosts: { name: string; site: string; serialNumber: string }[];
  site: string;
  region: string;
}

export const isTestProvisionHostData = (
  arg: any,
): arg is TestProvisionHostData => {
  if (!Array.isArray(arg.hosts)) return false;
  arg.hosts.forEach((host) => {
    if (!host.name || !host.site || !host.serialNumber) {
      return false;
    }
  });

  if (!arg.site || !arg.region) return false;
  return true;
};
