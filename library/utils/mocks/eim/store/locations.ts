/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { eim } from "@orch-ui/apis";
import { TreeBranchState } from "../../../../../apps/eim/src/store/locations.treeBranch"; // TODO: check how the mock can use common eim store files

export const simpleTree: TreeBranchState<eim.RegionRead | eim.SiteRead>[] = [
  {
    id: "Root-1",
    name: "Root-1",
    data: { resourceId: "Root-1", name: "Root-1" },
    type: "region",
    isRoot: true,
    isExpanded: true,
    children: [
      {
        id: "Site-1",
        name: "Site-1",
        data: {
          resourceId: "Site-1",
          name: "Site-1",
          siteID: "site-1",
          region: { resourceId: "Root-1" },
        },
        type: "site",
      },
      {
        id: "Root-2",
        name: "Root-2",
        data: { resourceId: "Root-2", name: "Root-2" },
        type: "region",
      },
    ],
  },
];
