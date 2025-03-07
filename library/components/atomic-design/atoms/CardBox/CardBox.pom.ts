/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { CyPom } from "@orch-ui/tests";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

export class CardBoxPom extends CyPom<Selectors> {
  constructor(public rootCy: string = "cardBox") {
    super(rootCy, [...dataCySelectors]);
  }
}
