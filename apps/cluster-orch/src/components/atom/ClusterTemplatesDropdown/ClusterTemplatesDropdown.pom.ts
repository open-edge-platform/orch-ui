/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { ctm } from "@orch-ui/apis";
import { SiDropdown } from "@orch-ui/poms";
import { CyApiDetail, CyApiDetails, CyPom } from "@orch-ui/tests";
import { templates } from "@orch-ui/utils";
const dataCySelectors = ["empty"] as const;
type Selectors = (typeof dataCySelectors)[number];

type ApiAliases =
  | "getTemplatesSuccess"
  | "getTemplates404"
  | "getTemplatesError500"
  | "getTemplatesEmpty";
const route = "**/v1/**/templates?*";

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
};

class ClusterTemplatesDropdownPom extends CyPom<Selectors, ApiAliases> {
  public dropdown = new SiDropdown("clusterTemplateDropdown");

  constructor(public rootCy: string = "clusterTemplateDropdown") {
    super(rootCy, [...dataCySelectors], endpoints);
  }
}

export default ClusterTemplatesDropdownPom;
