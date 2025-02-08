/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { ctm } from "@orch-ui/apis";
import { EmptyPom } from "@orch-ui/components";
import { SiDropdown } from "@orch-ui/poms";
import { CyApiDetail, CyApiDetails, CyPom } from "@orch-ui/tests";
import { clusterTemplateOneV1, templates } from "@orch-ui/utils";

const dataCySelectors = ["empty"] as const;
type Selectors = (typeof dataCySelectors)[number];

type ApiAliases =
  | "getTemplatesSuccess"
  | "getTemplates404"
  | "getTemplatesError500"
  | "getSingleTemplates"
  | "getTemplatesEmpty";
const route = "**/v1/**/templates?*";
const singleRoute = `${route}/*`;

const getTemplatesSuccess: CyApiDetail<ctm.GetV1ProjectsByProjectNameTemplatesApiResponse> =
  {
    route: route,
    statusCode: 200,
    response: templates,
  };

const endpoints: CyApiDetails<ApiAliases> = {
  getTemplatesSuccess,
  getTemplates404: {
    route: route,
    statusCode: 404,
    response: {
      detail:
        'rpc error: code = NotFound desc = No resources found for filter: client_uuid:"9dfa85f8-1e80-4c13-bc57-020ad8d49177"  filter:{kind:RESOURCE_KIND_REGION  limit:20}',
      status: 404,
    },
  },
  getTemplatesError500: {
    route: route,
    statusCode: 500,
    response: [],
  },
  getTemplatesEmpty: {
    route: route,
    statusCode: 200,
    response: {
      regions: [],
    },
  },
  getSingleTemplates: {
    route: singleRoute,
    statusCode: 200,
    response: clusterTemplateOneV1,
  },
};

class ClusterTemplateVersionsDropdownPom extends CyPom<Selectors, ApiAliases> {
  public dropdown = new SiDropdown("clusterTemplateVersionDropdown");
  public emptyPom = new EmptyPom("empty");
  constructor(public rootCy: string = "clusterTemplateVersionDropdown") {
    super(rootCy, [...dataCySelectors], endpoints);
  }
}

export default ClusterTemplateVersionsDropdownPom;
