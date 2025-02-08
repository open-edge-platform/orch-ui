/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

/** Controller Input format used for react form controller of create,delete & rename project modal */
export interface ProjectModalInput {
  nameInput: string;
}

const CONVERSION_FACTORS = {
  s: { s: 1, m: 1 / 60, h: 1 / 3600 },
  m: { s: 60, m: 1, h: 1 / 60 },
  h: { s: 3600, m: 60, h: 1 },
};

type ConversionFactor = keyof typeof CONVERSION_FACTORS;

export const minValue = (
  minValueApi: string,
  unit: keyof typeof CONVERSION_FACTORS,
): number => {
  const minValueUnit: ConversionFactor =
    (minValueApi.charAt(minValueApi.length - 1) as ConversionFactor) ?? "s";
  const currentMinValue = parseInt(minValueApi.slice(0, -1));

  return Math.ceil(
    currentMinValue * (CONVERSION_FACTORS[minValueUnit][unit] || 0),
  );
};

export const maxValue = (
  maxValueApi: string,
  unit: keyof typeof CONVERSION_FACTORS,
): number => {
  const maxValueUnit: ConversionFactor =
    (maxValueApi.charAt(maxValueApi.length - 1) as ConversionFactor) ?? "s";
  const currentMaxValue = parseInt(maxValueApi.slice(0, -1));

  return Math.floor(
    currentMaxValue * (CONVERSION_FACTORS[maxValueUnit][unit] || 0),
  );
};

export const updateValue = (current: number, min: number, max: number) => {
  if (current < min) {
    return min;
  } else if (current > max) {
    return max;
  } else {
    return current;
  }
};

// converts user created names to https://google.aip.dev/122 compatible names
export const toApiName = (desc: string): string => {
  return desc
    .trim()
    .replace(/[^a-z0-9_-\s]/gi, "")
    .replaceAll(" ", "-")
    .toLowerCase();
};
