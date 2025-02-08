/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

export class StoreUtils {
  public static randomString(): string {
    return (Math.random() + 1).toString(36).substring(2);
  }
}
