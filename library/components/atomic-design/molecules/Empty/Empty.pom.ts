/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { CyPom } from "@orch-ui/tests";

const dataCySelectors = [
  "emptyIcon",
  "emptyTitle",
  "emptySubTitle",
  "emptyActionBtn",
] as const;
type Selectors = (typeof dataCySelectors)[number];

export class EmptyPom extends CyPom<Selectors> {
  constructor(public rootCy: string = "empty") {
    super(rootCy, [...dataCySelectors]);
  }
}
