/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { ModalPom } from "@orch-ui/components";
import { CyPom } from "@orch-ui/tests";
import { dataCy } from "./NoProjectsDialog";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

export class NoProjectsDialogPom extends CyPom<Selectors> {
  public modalPom: ModalPom;

  constructor(public rootCy: string = dataCy) {
    super(rootCy, [...dataCySelectors], {});
    this.modalPom = new ModalPom();
  }
}
