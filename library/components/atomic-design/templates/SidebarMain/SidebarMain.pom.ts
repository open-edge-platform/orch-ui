/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { CyPom } from "@orch-ui/tests";

const dataCySelectors = ["sidebar", "main"] as const;
type Selectors = (typeof dataCySelectors)[number];

export class SidebarMainPom extends CyPom<Selectors> {
  constructor(public rootCy: string = "sidebarMain") {
    super(rootCy, [...dataCySelectors]);
  }
}
