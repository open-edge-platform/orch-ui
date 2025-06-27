/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { checkSize, filterFilesByExtension } from "./fileHandler";

describe("File handler", () => {
  describe("filterFilesByExtension", () => {
    it("should return only yaml file", () => {
      const fileBytes = new Uint8Array();
      const file1 = new File([fileBytes], "test.yaml");
      const file2 = new File([fileBytes], "test.test");
      expect(filterFilesByExtension([file1, file2])).to.deep.equal([file1]);
    });
  });

  describe("checkSize", () => {
    it("should return true when file size is below limit", () => {
      const fileBytes = new Uint8Array();
      const file1 = new File([fileBytes], "test.yaml");
      expect(checkSize([file1], 1)).to.equal(true);
    });
    it("should return false when file size is over limit", () => {
      const fileBytes = new Uint8Array();
      const file1 = new File([fileBytes], "test.yaml");
      expect(checkSize([file1], -1)).to.equal(false);
    });
  });
});
