/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { adm } from "@orch-ui/apis";
import { CyApiDetails, CyPom } from "@orch-ui/tests";
import { UiExtensionsStore } from "@orch-ui/utils";
import { dataCy } from "./DashboardsHeaderBtn";

const dataCySelectors = [
  "mainBtn",
  "dropdown",
  "lpDashboard",
  "infoPopup",
] as const;
type Selectors = (typeof dataCySelectors)[number];

type ApiAliases = "listExtensions" | "listExtensionsEmpty";
const uiExtnStore = new UiExtensionsStore();

const endpoints: CyApiDetails<ApiAliases> = {
  listExtensions: {
    route: "**/deployment.orchestrator.apis/v1/ui_extensions?",
    response: {
      uiExtensions: uiExtnStore.list(),
    } as adm.ListUiExtensionsResponse,
  },
  listExtensionsEmpty: {
    route: "**/deployment.orchestrator.apis/v1/ui_extensions?",
    response: { uiExtensions: [] } as adm.ListUiExtensionsResponse,
  },
};

class DashboardsHeaderBtnPom extends CyPom<Selectors, ApiAliases> {
  public resources = uiExtnStore.list();

  constructor(public rootCy: string = dataCy) {
    super(rootCy, [...dataCySelectors], endpoints);
  }

  public openDropdown() {
    this.el.mainBtn.click();
  }
}
export default DashboardsHeaderBtnPom;
