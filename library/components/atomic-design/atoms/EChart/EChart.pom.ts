/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { Cy, CyPom } from "@orch-ui/tests";

const dataCySelectors = ["textInput", "clear"] as const;
type Selectors = (typeof dataCySelectors)[number];

export class EChartPom extends CyPom<Selectors> {
  constructor(public rootCy: string) {
    super(rootCy, [...dataCySelectors]);
  }

  public getValues(): Cy {
    return this.root.get("text");
  }

  public getToolTip(): Cy {
    return this.root.get("div span");
  }

  public showToolTipFromPoint(point: string): void {
    this.root.get(point).click();
  }
}
