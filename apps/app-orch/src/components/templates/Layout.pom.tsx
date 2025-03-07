/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { CyPom } from "@orch-ui/tests";
import { datacyComponentSelector } from "./Layout";

const dataCySelectors = [
  "Deployments",
  "Deployment Packages",
  "Applications",
] as const;
export type Selectors = (typeof dataCySelectors)[number];

class LayoutPom extends CyPom<Selectors> {
  constructor(public rootCy: string = datacyComponentSelector) {
    super(rootCy, [...dataCySelectors]);
  }
}
export default LayoutPom;
