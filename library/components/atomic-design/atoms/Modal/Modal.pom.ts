/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { CyPom } from "@orch-ui/tests";

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
  constructor(public rootCy: string = "modal") {
    super(rootCy, [...dataCySelectors]);
  }
}
