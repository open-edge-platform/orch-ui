/*
 * SPDX-FileCopyrightText: (C) 2025 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

export class MockUtils {
  public static randomString(): string {
    return (Math.random() + 1).toString(36).substring(2);
  }

  public static currentTimestamp(): string {
    return new Date().toISOString();
  }
}
