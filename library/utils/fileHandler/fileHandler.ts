/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

export const returnYaml = (
  items: File[],
  types: string[] = ["yaml"],
): File[] => {
  const result: File[] = [];
  items.map((item) => {
    if (
      types.indexOf(item.name.split(".")[item.name.split(".").length - 1]) >= 0
    ) {
      result.push(item);
    }
  });
  return result;
};

export const checkSize = (files: File[], sizeLimit: number): boolean => {
  let result = true;
  files.map((f) => {
    if (f.size / 1048576 >= sizeLimit) {
      result = false;
    }
  });
  return result;
};
