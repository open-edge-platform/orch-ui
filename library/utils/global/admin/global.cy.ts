/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { maxValue, minValue, toApiName, updateValue } from "./global";

describe("The Utils", () => {
  describe("minValue", () => {
    it("should return current min value correctly", () => {
      expect(minValue("30s", "s")).eq(30);
      expect(minValue("30s", "m")).eq(1);
      expect(minValue("30s", "h")).eq(1);
      expect(minValue("30m", "s")).eq(1800);
      expect(minValue("30m", "m")).eq(30);
      expect(minValue("30m", "h")).eq(1);
      expect(minValue("30h", "s")).eq(108000);
      expect(minValue("30h", "m")).eq(1800);
      expect(minValue("30h", "h")).eq(30);
    });
  });
  describe("maxValue", () => {
    it("should return current max value correctly", () => {
      expect(maxValue("30s", "s")).eq(30);
      expect(maxValue("30s", "m")).eq(0);
      expect(maxValue("30s", "h")).eq(0);
      expect(maxValue("30m", "s")).eq(1800);
      expect(maxValue("30m", "m")).eq(30);
      expect(maxValue("30m", "h")).eq(0);
      expect(maxValue("30h", "s")).eq(108000);
      expect(maxValue("30h", "m")).eq(1800);
      expect(maxValue("30h", "h")).eq(30);
    });
  });
  describe("updateValue", () => {
    it("should return current min value correctly", () => {
      expect(updateValue(30, 0, 100)).eq(30);
      expect(updateValue(30, 45, 100)).eq(45);
      expect(updateValue(30, 0, 25)).eq(25);
    });
  });
  describe("toApiName", () => {
    it("should convert strings to valid DNS format", () => {
      const validDns = /^(?!-)[a-zA-Z0-9-_]{1,63}$/g;

      const testValues: { in: string; out: string }[] = [
        { in: "valid-name", out: "valid-name" },
        { in: "With Spaces", out: "with-spaces" },
        { in: "Special?!*()Chars+#$<>//\\{}[]", out: "specialchars" },
      ];

      testValues.forEach((t) => {
        const res = toApiName(t.in);
        expect(res).to.eq(t.out);

        // should be valid DNS
        const match = res.match(validDns);
        expect(match?.[0]).to.eq(res);
      });
    });
  });
});
