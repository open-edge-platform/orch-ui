/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { CyPom } from "@orch-ui/tests";
import { dataCy } from "./DeploymentSummary";

const dataCySelectors = [
  "compositePackageDetails",
  "caDetailsLink",
  "deploymentMetadata",
  "deploymentCounter",
  "hostCounter",
  "instanceList",
] as const;
type Selectors = (typeof dataCySelectors)[number];

class DeploymentSummaryPom extends CyPom<Selectors> {
  constructor(public rootCy: string = dataCy) {
    super(rootCy, [...dataCySelectors]);
  }
}
export default DeploymentSummaryPom;
