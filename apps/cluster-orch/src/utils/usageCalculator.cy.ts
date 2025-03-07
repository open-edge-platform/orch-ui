/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { usageCalculator } from "./usageCalculator";

describe("The Utils", () => {
  describe("usageCalculator", () => {
    it("should return status correctly", () => {
      expect(usageCalculator()).eq(0);
      expect(usageCalculator(1, 2)).eq(50);
      expect(usageCalculator("2", "3")).eq(33);
      expect(usageCalculator(1, -100)).eq(0);
    });
  });
});
