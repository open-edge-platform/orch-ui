/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  TreeBranchProps,
  TreeNode,
} from "../../molecules/TreeBranch/TreeBranch";
import { TreeUtils } from "./Tree.utils";

describe("Tree utils", () => {
  describe("find()", () => {
    it("grabs id of a simple tree branch", () => {
      const branches: TreeBranchProps<TreeNode>[] = [
        { data: { id: "1" }, content: <></> },
        { data: { id: "2" }, content: <></> },
      ];

      const searchResult = TreeUtils.find(branches, "1");

      expect(searchResult).to.not.be.undefined;
    });

    it("grabs id of a deeply nested leaf", () => {
      const branches: TreeBranchProps<TreeNode>[] = [
        { data: { id: "1" }, content: <></> },
        {
          data: { id: "2" },
          content: <></>,
          children: [
            {
              data: { id: "2.1" },
              content: <></>,
              children: [
                {
                  data: { id: "2.1.1" },
                  content: <></>,
                  children: [{ data: { id: "2.1.1.1" }, content: <></> }],
                },
              ],
            },
          ],
        },
      ];

      const searchResult = TreeUtils.find(branches, "2.1.1.1");
      expect(searchResult).to.not.be.undefined;
    });

    it("reports undefined when search yields no results", () => {
      const branches: TreeBranchProps<TreeNode>[] = [
        { data: { id: "1" }, content: <></> },
        { data: { id: "2" }, content: <></> },
      ];

      const searchResult = TreeUtils.find(branches, "3");
      expect(searchResult).to.be.undefined;
    });
  });

  describe("findDuplicateKeys()", () => {
    it("reports 0 hits when keys are not duplicated", () => {
      const branches: TreeBranchProps<TreeNode>[] = [
        { data: { id: "1" }, content: <></> },
        { data: { id: "2" }, content: <></> },
      ];

      const dupes = TreeUtils.findDuplicateKeys(branches);
      expect(dupes.size).to.eq(0);
    });

    it("reports 0 hits when keys are not duplicated in nested branch structure", () => {
      const branches: TreeBranchProps<TreeNode>[] = [
        { data: { id: "1" }, content: <></> },
        {
          data: { id: "2" },
          content: <></>,
          children: [
            {
              data: { id: "2.1" },
              content: <></>,
              children: [{ data: { id: "2.1.1" }, content: <></> }],
            },
          ],
        },
      ];

      const dupes = TreeUtils.findDuplicateKeys(branches);
      expect(dupes.size).to.eq(0);
    });

    it("reports search results > 0 when keys are duplicated on the same branch", () => {
      const branches: TreeBranchProps<TreeNode>[] = [
        { data: { id: "1" }, content: <></> },
        { data: { id: "1" }, content: <></> },
      ];

      const dupes = TreeUtils.findDuplicateKeys(branches);
      expect(dupes.size).to.be.greaterThan(0);
    });

    it("reports search results > 0 when keys are duplicated in different nested areas", () => {
      const branches: TreeBranchProps<TreeNode>[] = [
        { data: { id: "1" }, content: <></> },
        {
          data: { id: "2" },
          content: <></>,
          children: [
            {
              data: { id: "2.1" },
              content: <></>,
              children: [{ data: { id: "1" }, content: <></> }],
            },
          ],
        },
      ];

      const dupes = TreeUtils.findDuplicateKeys(branches);
      expect(dupes.size).to.be.greaterThan(0);
    });
  });
});
