/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { CyPom } from "@orch-ui/tests";
import { datacyComponentSelector } from "./Layout";

const dataCySelectors = [
  "Hosts",
  "Active",
  "Configured",
  "Onboarded",
  "Deauthorized",
  "Regions",
  "Sites",
] as const;
export type Selectors = (typeof dataCySelectors)[number];

class LayoutPom extends CyPom<Selectors> {
  constructor(public rootCy: string = datacyComponentSelector) {
    super(rootCy, [...dataCySelectors]);
  }
}
export default LayoutPom;
