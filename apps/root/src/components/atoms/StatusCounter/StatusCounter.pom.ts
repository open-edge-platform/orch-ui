/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { Cy, CyPom } from "@orch-ui/tests";
import { dataCy } from "./StatusCounter";

const dataCySelectors = ["showAllStatesTitle"] as const;
type Selectors = (typeof dataCySelectors)[number];

class StatusCounterPom extends CyPom<Selectors> {
  constructor(public rootCy: string = dataCy) {
    super(rootCy, [...dataCySelectors]);
  }

  public getSingleStatusElement(): Cy {
    return this.root.find(".status-icon");
  }
  public getStatusElement(index: number): Cy {
    return this.root.find(`.status-icon:nth-child(${index})`);
  }
}
export default StatusCounterPom;
