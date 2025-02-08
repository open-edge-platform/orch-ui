/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { simpleTree } from "@orch-ui/utils";
import { SearchTypes } from "./locations";
import { TreeBranchStateUtils } from "./locations.treeBranch";

describe("locations.treeBranch find()", () => {
  it("returns undefined when no branch set", () => {
    const result = TreeBranchStateUtils.find("node-2");
    //eslint-disable-next-line
    expect(result).to.be.undefined;
  });

  it("locates the correct branch", () => {
    const result = TreeBranchStateUtils.find("Site-1", simpleTree);
    expect(result!.name).to.equal("Site-1");
  });

  it("builds tree from search results (empty version)", () => {
    const result = TreeBranchStateUtils.createFromSearchResults(
      [],
      SearchTypes.All,
    );
    expect(result.length).to.equal(0);
  });

  //TODO : API is responding with "reversed" results, once that is corrected
  // this can be re-enabled
  xit("builds tree from search results (non-empty version)", () => {
    const result = TreeBranchStateUtils.createFromSearchResults(
      [
        {
          resourceId: "region-1",
          name: "root-region-1",
        },
        {
          resourceId: "region-2",
          name: "root-region-2",
        },
        {
          resourceId: "region-3",
          name: "root-region-3",
        },
        {
          resourceId: "region-11",
          name: "child-region-1",
          parentId: "region-1",
        },
        {
          resourceId: "region-21",
          name: "child-region-2",
          parentId: "region-2",
        },
        {
          resourceId: "region-31",
          name: "child-region-3",
          parentId: "region-3",
        },
        {
          resourceId: "region-312",
          name: "child-region-3.2",
          parentId: "region-3",
        },
        {
          resourceId: "site-1",
          name: "site-region-1",
          parentId: "region-1",
        },
        {
          resourceId: "site-21",
          name: "site-region-21",
          parentId: "region-21",
        },
        {
          resourceId: "site-31",
          name: "site-region-31",
          parentId: "region-31",
        },
        {
          resourceId: "site-312",
          name: "site-region-31.2",
          parentId: "region-31",
        },
      ],
      SearchTypes.All,
    );
    expect(result.length).to.equal(3);
  });
});
