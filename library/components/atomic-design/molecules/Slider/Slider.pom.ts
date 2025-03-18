/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { CyPom } from "@orch-ui/tests";

const dataCySelectors = ["rangeInput", "numberInput", "unitText"] as const;
type Selectors = (typeof dataCySelectors)[number];

export class SliderPom extends CyPom<Selectors> {
  constructor(public rootCy: string = "slider") {
    super(rootCy, [...dataCySelectors]);
  }
}
