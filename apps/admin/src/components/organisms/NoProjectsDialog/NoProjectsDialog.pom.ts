/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { ModalPom } from "@orch-ui/components";
import { CyPom } from "@orch-ui/tests";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

export class NoProjectsDialogPom extends CyPom<Selectors> {
  public modalPom: ModalPom;

  constructor(public rootCy: string = "noProjectsDialog") {
    super(rootCy, [...dataCySelectors], {});
    this.modalPom = new ModalPom();
  }
}
