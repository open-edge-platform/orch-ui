/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
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
