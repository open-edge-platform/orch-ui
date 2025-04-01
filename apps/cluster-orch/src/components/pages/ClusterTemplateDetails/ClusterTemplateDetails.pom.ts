/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { CyApiDetails, CyPom } from "@orch-ui/tests";
import { clusterTemplateOneV1 } from "@orch-ui/utils";

const dataCySelectors = [
  "templateVersion",
  "templateDescription",
  "templateName",
  "clusterTemplateDetailsPopup",
] as const;
type Selectors = (typeof dataCySelectors)[number];

type ApiAliases = "getTemplate" | "getTemplateError";

const route = "**/v2/**/templates";

const endpoints: CyApiDetails<ApiAliases> = {
  getTemplate: {
    route: `${route}/**/**`,
    statusCode: 200,
    response: clusterTemplateOneV1,
  },
  getTemplateError: {
    route: `${route}/**/**`,
    statusCode: 500,
  },
};

class ClusterTemplateDetailsPom extends CyPom<Selectors, ApiAliases> {
  constructor(public rootCy: string = "clusterTemplateDetails") {
    super(rootCy, [...dataCySelectors], endpoints);
  }
}
export default ClusterTemplateDetailsPom;
