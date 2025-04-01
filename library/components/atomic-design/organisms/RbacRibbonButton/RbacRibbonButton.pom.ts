/*
 * SPDX-FileCopyrightText: (C) 2024 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { CyPom } from "@orch-ui/tests";

const dataCySelectors = ["button", "tooltip"] as const;
type Selectors = (typeof dataCySelectors)[number];

export class RbacRibbonButtonPom extends CyPom<Selectors> {
  constructor(public rootCy: string) {
    super(rootCy, [...dataCySelectors]);
  }
}
