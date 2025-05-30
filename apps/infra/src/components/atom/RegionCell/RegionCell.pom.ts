/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */
import { infra } from "@orch-ui/apis";
import {
  CyApiDetail,
  CyApiDetails,
  CyPom,
  defaultActiveProject,
} from "@orch-ui/tests";
import { RegionStore, regionUsWest } from "@orch-ui/utils";

const dataCy = "regionCell";

const dataCySelectors = [dataCy] as const;
type Selectors = (typeof dataCySelectors)[number];

type ApiAliases = "getRegionSuccess" | "getRegionNotFound";

const store = new RegionStore();

const route = `**/v1/projects/${defaultActiveProject.name}/regions/${regionUsWest.resourceId}`;

const getRegionSuccess: CyApiDetail<infra.RegionServiceGetRegionApiResponse> = {
  route: route,
  statusCode: 200,
  response: store.get(regionUsWest.resourceId!),
};

const endpoints: CyApiDetails<ApiAliases> = {
  getRegionSuccess,
  getRegionNotFound: {
    route: route,
    statusCode: 404,
  },
};

export class RegionCellPom extends CyPom<Selectors, ApiAliases> {
  constructor(public rootCy: string = dataCy) {
    super(rootCy, [...dataCySelectors], endpoints);
  }
}
