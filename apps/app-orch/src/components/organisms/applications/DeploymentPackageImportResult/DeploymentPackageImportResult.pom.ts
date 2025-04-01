/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { SiTablePom } from "@orch-ui/poms";
import { Cy, CyPom } from "@orch-ui/tests";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

class DeploymentPackageImportResultPom extends CyPom<Selectors> {
  public resultTable: SiTablePom;
  constructor(public rootCy: string = "deploymentPackageImportResult") {
    super(rootCy, [...dataCySelectors]);
    this.resultTable = new SiTablePom("result");
  }

  public getMsgBannerTitle(): Cy {
    return this.root.find(
      ".spark-message-banner-grid-column-message-column-content-message-title",
    );
  }

  public getMsgBannerDescription(): Cy {
    return this.root.find(
      ".spark-message-banner-grid-column-message-column-content-message-description",
    );
  }
}
export default DeploymentPackageImportResultPom;
