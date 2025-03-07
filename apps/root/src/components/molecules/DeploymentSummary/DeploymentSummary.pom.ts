/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
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
