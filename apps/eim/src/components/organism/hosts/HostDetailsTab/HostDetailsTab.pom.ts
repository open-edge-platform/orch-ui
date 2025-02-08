/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { CyPom } from "@orch-ui/tests";

const dataCySelectors = ["hostLabelMetadata"] as const;
type Selectors = (typeof dataCySelectors)[number];

class HostDetailsTabPom extends CyPom<Selectors> {
  constructor(public rootCy: string = "iaasHostResources") {
    super(rootCy, [...dataCySelectors]);
  }

  public clickTab(tabName: string) {
    this.root.find(".spark-tabs").contains(tabName).click();
  }
}
export default HostDetailsTabPom;
