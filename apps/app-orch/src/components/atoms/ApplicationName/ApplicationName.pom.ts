/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { catalog } from "@orch-ui/apis";
import { CyApiDetails, CyPom } from "@orch-ui/tests";
import { applicationOne } from "@orch-ui/utils";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];
type ApiAliasses = "application" | "applicationError";

const endpoints: CyApiDetails<
  ApiAliasses,
  catalog.CatalogServiceGetApplicationApiResponse
> = {
  application: {
    route: "**/applications/**",
    response: {
      application: applicationOne,
    },
  },
  applicationError: {
    route: "**/applications/**",
    statusCode: 404,
  },
};

class ApplicationNamePom extends CyPom<Selectors, ApiAliasses> {
  constructor(public rootCy: string = "applicationName") {
    super(rootCy, [...dataCySelectors], endpoints);
  }
}
export default ApplicationNamePom;
