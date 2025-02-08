/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { CyPom } from "@orch-ui/tests";
import { dataCy } from "./Modal";

const dataCySelectors = [
  "modalLabel",
  "modalTitle",
  "footerBtnGroup",
  "closeDialog",
  "primaryBtn",
  "secondaryBtn",
] as const;
type Selectors = (typeof dataCySelectors)[number];

export class ModalPom extends CyPom<Selectors> {
  constructor(public rootCy: string = dataCy) {
    super(rootCy, [...dataCySelectors]);
  }
}
