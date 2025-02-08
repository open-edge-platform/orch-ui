/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { CyPom } from "@orch-ui/tests";
import { dataCy } from "./TextTruncate";

const dataCySelectors = ["checkbox", "content", "label"] as const;
type Selectors = (typeof dataCySelectors)[number];

export class TextTruncatePom extends CyPom<Selectors> {
  constructor(public rootCy: string = dataCy) {
    super(rootCy, [...dataCySelectors]);
  }
}
