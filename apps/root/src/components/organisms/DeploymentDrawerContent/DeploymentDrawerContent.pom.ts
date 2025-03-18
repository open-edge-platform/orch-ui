/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */
import { CyPom } from "@orch-ui/tests";

const dataCySelectors = [
  "compositePackageDetails",
  "deploymentMetadata",
  "deploymentCounter",
  "hostCounter",
  "instanceList",
] as const;
type Selectors = (typeof dataCySelectors)[number];

class DeploymentDrawerContentPom extends CyPom<Selectors> {
  constructor(public rootCy: string = "deploymentDrawerContent") {
    super(rootCy, [...dataCySelectors]);
  }
}
export default DeploymentDrawerContentPom;
