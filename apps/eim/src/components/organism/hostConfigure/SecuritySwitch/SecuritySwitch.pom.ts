/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { CyPom } from "@orch-ui/tests";

const dataCySelectors = ["security", "securitySwitchToggle"] as const;
type Selectors = (typeof dataCySelectors)[number];

export class SecuritySwitchPom extends CyPom<Selectors> {
  constructor(public rootCy: string = "securitySwitch") {
    super(rootCy, [...dataCySelectors]);
  }
}
