/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { eim } from "@orch-ui/apis";
import { CyApiDetails, CyPom, defaultActiveProject } from "@orch-ui/tests";
import { sitePortland } from "@orch-ui/utils";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];
type ApiAliases = "getSiteSuccess" | "getSiteNotFound";

const route = `**/v1/projects/${defaultActiveProject.name}/regions/**/sites/${sitePortland.resourceId}`;

const endpoints: CyApiDetails<
  ApiAliases,
  eim.GetV1ProjectsByProjectNameRegionsAndRegionIdSitesSiteIdApiResponse
> = {
  getSiteSuccess: {
    route: route,
    statusCode: 200,
    response: sitePortland,
  },
  getSiteNotFound: {
    route: route,
    statusCode: 404,
  },
};

class SiteCellPom extends CyPom<Selectors, ApiAliases> {
  constructor(public rootCy: string = "siteCell") {
    super(rootCy, [...dataCySelectors], endpoints);
  }
}
export default SiteCellPom;
