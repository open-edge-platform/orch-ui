/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { CyApiDetail, cyGet, CyPom } from "@orch-ui/tests";

export class SiDrawerPom<T extends string, U extends string = ""> extends CyPom<
  T,
  U
> {
  constructor(
    public rootCy: string,
    properties: string[],
    apis: Record<string, CyApiDetail> = {},
  ) {
    super(rootCy, properties, apis);
  }

  public clickBackdrop() {
    cy.get(".spark-drawer-backdrop").click({ force: true });
  }

  get title() {
    return cyGet(this.rootCy).get('[data-testid="drawer-header"]');
  }
}
