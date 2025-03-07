/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { CyPom } from "@orch-ui/tests";

const dataCySelectors = [
  "clusterConfigurationOptionSingle",
  "clusterConfigurationOptionMulti",
  "clusterConfigurationOptionSingleDetails",
] as const;
type Selectors = (typeof dataCySelectors)[number];

class ClusterConfigurationPom extends CyPom<Selectors> {
  constructor(public rootCy: string = "clusterConfiguration") {
    super(rootCy, [...dataCySelectors]);
  }

  public selectOptionSingle() {
    this.el.clusterConfigurationOptionSingle.parent().click();
    // Note: avoid forcing a click on a hidden element. Tests need to
    // behave in a way the end user would interact with UI.  In this situation
    // the parent() element of where the data-cy (clusterConfiguraitonOptionSingle)
    // is targeted (the <label />) is what should actually be clicked
    // this.el.clusterConfigurationOptionSingle.click({ force: true });
  }

  public selectOptionMulti() {
    this.el.clusterConfigurationOptionMulti.click({ force: true });
  }
}
export default ClusterConfigurationPom;
