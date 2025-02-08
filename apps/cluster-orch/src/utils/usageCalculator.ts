/*
 * SPDX-FileCopyrightText: (C) 2022 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

export const usageCalculator = (
  avail?: string | number,
  total?: string | number,
): number => {
  if (!avail || !total) {
    return 0;
  }

  const a: number = parseInt(avail as string);
  const t: number = parseInt(total as string);
  const used = t - a;
  return t > 0 ? Math.floor((used / t) * 100) : 0;
};
