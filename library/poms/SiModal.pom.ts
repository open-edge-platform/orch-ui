/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { Cy, CyPom } from "@orch-ui/tests";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

export class SiModalPom extends CyPom<Selectors> {
  constructor(public rootCy: string = "table") {
    super(rootCy, [...dataCySelectors]);
  }

  public getCancelButton(): Cy {
    return this.root.find(".spark-modal-footer .spark-button:nth-child(1)");
  }

  public getOkButton(): Cy {
    return this.root.find(".spark-modal-footer .spark-button:nth-child(2)");
  }

  public getBody(): Cy {
    return this.root.find(".spark-modal-body");
  }
}
