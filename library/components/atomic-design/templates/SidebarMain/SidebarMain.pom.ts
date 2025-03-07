/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { CyPom } from "@orch-ui/tests";

const dataCySelectors = ["sidebar", "main"] as const;
type Selectors = (typeof dataCySelectors)[number];

export class SidebarMainPom extends CyPom<Selectors> {
  constructor(public rootCy: string = "sidebarMain") {
    super(rootCy, [...dataCySelectors]);
  }
}
