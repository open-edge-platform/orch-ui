/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { CyApiDetails, CyPom } from "@orch-ui/tests";
import { clusterTemplateOneV1 } from "@orch-ui/utils";
import { dataCy } from "./ClusterTemplateDetails";

const dataCySelectors = [
  "templateVersion",
  "templateDescription",
  "templateName",
  "clusterTemplateViewPopup",
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
  constructor(public rootCy: string = dataCy) {
    super(rootCy, [...dataCySelectors], endpoints);
  }
}
export default ClusterTemplateDetailsPom;
