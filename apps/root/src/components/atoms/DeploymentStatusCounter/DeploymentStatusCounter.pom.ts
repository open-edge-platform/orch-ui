/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { Cy, CyPom } from "@orch-ui/tests";

const dataCySelectors = ["statusText", "chart"] as const;
type Selectors = (typeof dataCySelectors)[number];

export class DeploymentStatusCounterPom extends CyPom<Selectors> {
  constructor(public rootCy: string = "deploymentStatusCounter") {
    super(rootCy, [...dataCySelectors]);
  }

  public getStatusElement(index: number): Cy {
    return this.root.find(`.status-icon:nth-child(${index}) .spark-font-100`);
  }
}
