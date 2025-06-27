/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

export const filterFilesByExtension = (
  items: File[],
  types: string[] = ["yaml", "tar.gz"],
): File[] => {
  const result: File[] = [];

  items.forEach((item) => {
    const fileName = item.name.toLowerCase();

    if (types.some((type) => fileName.endsWith(`.${type}`))) {
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
