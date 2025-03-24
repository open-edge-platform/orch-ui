/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { CyPom } from "@orch-ui/tests";

const dataCySelectors = ["osUpdate", "icon"] as const;
type Selectors = (typeof dataCySelectors)[number];

export class OsConfigPom extends CyPom<Selectors> {
  constructor(public rootCy: string = "osConfig") {
    super(rootCy, [...dataCySelectors]);
  }
}
