/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { CyPom } from "@orch-ui/tests";

const dataCySelectors = ["row"] as const;
type Selectors = (typeof dataCySelectors)[number];

export class TableLoaderPom extends CyPom<Selectors> {
  constructor(public rootCy: string = "tableLoader") {
    super(rootCy, [...dataCySelectors]);
  }
}
