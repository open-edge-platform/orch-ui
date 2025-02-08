/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */
import { CyPom } from "@orch-ui/tests";
import { dataCy } from "./DeploymentDrawerContent";

const dataCySelectors = [
  "compositePackageDetails",
  "deploymentMetadata",
  "deploymentCounter",
  "hostCounter",
  "instanceList",
] as const;
type Selectors = (typeof dataCySelectors)[number];

class DeploymentDrawerContentPom extends CyPom<Selectors> {
  constructor(public rootCy: string = dataCy) {
    super(rootCy, [...dataCySelectors]);
  }
}
export default DeploymentDrawerContentPom;
