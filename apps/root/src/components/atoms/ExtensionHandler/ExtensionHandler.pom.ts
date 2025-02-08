/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { adm } from "@orch-ui/apis";
import { CyApiDetails, CyPom } from "@orch-ui/tests";
import { dataCy } from "./ExtensionHandler";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

type ApiAliases = "listExtensions";

const extensions = [
  {
    serviceName: "serviceName",
    label: "5G Dashboard",
    description:
      "This is the 5G dashboard that got added as an extension following a 5G deployment done.",
    fileName: "remoteEntry.js",
    appName: "FiveG",
    moduleName: "./App",
  },
];

const endpoints: CyApiDetails<ApiAliases> = {
  listExtensions: {
    route: "**/deployment.orchestrator.apis/v1/ui_extensions?",
    response: { uiExtensions: extensions } as adm.ListUiExtensionsResponse,
  },
};

class ExtensionHandlerPom extends CyPom<Selectors, ApiAliases> {
  public extensions = extensions;
  constructor(public rootCy: string = dataCy) {
    super(rootCy, [...dataCySelectors], endpoints);
  }
}
export default ExtensionHandlerPom;
