/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { CyPom } from "@orch-ui/tests";

const dataCySelectors = [
  "createdOn",
  "updateTime",
  "chartValues",
  "valueOverrides",
] as const;
type Selectors = (typeof dataCySelectors)[number];

class ApplicationDetailsProfilesInfoSubRowPom extends CyPom<Selectors> {
  constructor(public rootCy: string = "applicationDetailsProfilesInfoSubRow") {
    super(rootCy, [...dataCySelectors]);
  }
  getAllParameters() {
    return this.el.valueOverrides.find(".profile-parameter-templates");
  }
  getRowByParameterName(name: string) {
    return this.el.valueOverrides.find(`[data-cy='${name}']`);
  }
  getParameterValueByParameterName(name: string) {
    return this.el.valueOverrides
      .find(`[data-cy='${name}']`)
      .find("[data-cy='values']");
  }
  getParameterTypeByParameterName(name: string) {
    return this.el.valueOverrides
      .find(`[data-cy='${name}']`)
      .find("[data-cy='chartValueType']");
  }
}
export default ApplicationDetailsProfilesInfoSubRowPom;
