/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { MetadataDisplayPom } from "@orch-ui/components";
import { CyPom } from "@orch-ui/tests";
import { displayDateTime } from "./DeploymentDetailsStatus";

const dataCySelectors = [
  "pkgName",
  "pkgVersion",
  "viewDetailsButton",
  "emptyMetadata",
  "deploymentsCounterChart",
  "deploymentStatus",
  "setupDate",
  "type",
  "valueOverrides",
] as const;
type Selectors = (typeof dataCySelectors)[number];

class DeploymentDetailsStatusPom extends CyPom<Selectors> {
  public metadataBadge: MetadataDisplayPom;
  constructor(public rootCy: string = "deploymentDetailsStatus") {
    super(rootCy, [...dataCySelectors]);
    this.metadataBadge = new MetadataDisplayPom();
  }
  getDisplayDate(createTime: string) {
    return displayDateTime(createTime);
  }
}

export default DeploymentDetailsStatusPom;
