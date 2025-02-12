/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { eim } from "@orch-ui/apis";
import { CyApiDetails, cyGet, CyPom } from "@orch-ui/tests";

const dataCySelectors = [
  "textField",
  "button",
  "dropdown",
  "dropdownItem",
] as const;
type Selectors = (typeof dataCySelectors)[number];

type ApiAliases =
  | "getLocations200"
  | "getLocations500"
  | "getLocationsOnSearch200";

const url = "**/locations**";
const endpoints: CyApiDetails<
  ApiAliases,
  eim.GetV1ProjectsByProjectNameLocationsApiResponse
> = {
  getLocations200: {
    route: url,
    statusCode: 200,
    response: {
      nodes: [],
    },
  },
  getLocationsOnSearch200: {
    route: url,
    statusCode: 200,
    response: {
      nodes: [
        {
          name: "Site 1",
          parentId: "region-1",
          resourceId: "site-1",
          type: "RESOURCE_KIND_SITE",
        },
        {
          name: "Root 1",
          parentId: "",
          resourceId: "region-1",
          type: "RESOURCE_KIND_REGION",
        },
      ],
    },
  },
  getLocations500: {
    route: url,
    statusCode: 500,
    networkError: true,
  },
};
export class SearchPom extends CyPom<Selectors, ApiAliases> {
  constructor(public rootCy: string = "search") {
    super(rootCy, [...dataCySelectors], endpoints);
  }

  public selectPopoverItem(index: number): void {
    this.el.dropdown.eq(0).click();
    //Popover appears at the root level, detached from root el
    //therefore need to use cyGet here
    cyGet("dropdownItem").eq(index).click();
  }
}
