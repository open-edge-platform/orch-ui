/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { CyPom } from "@orch-ui/tests";
import { dataCy } from "./TreeExpander";

const dataCySelectors = [
  "expander",
  "verticalConnector",
  "horizontalConnector",
] as const;
type Selectors = (typeof dataCySelectors)[number];

export class TreeExpanderPom extends CyPom<Selectors> {
  constructor(public rootCy: string = dataCy) {
    super(rootCy, [...dataCySelectors]);
  }
}
