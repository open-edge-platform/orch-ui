/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { SiDropdown } from "@orch-ui/poms";
import { CyPom } from "@orch-ui/tests";
import { dataCy } from "./SecurityDropdown";

const dataCySelectors = ["security"] as const;
type Selectors = (typeof dataCySelectors)[number];

export class SecurityDropdownPom extends CyPom<Selectors> {
  public dropdown = new SiDropdown(dataCy);
  constructor(public rootCy: string = dataCy) {
    super(rootCy, [...dataCySelectors]);
  }
}
