/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { CyPom } from "@orch-ui/tests";

const dataCySelectors = ["headerItem", "headerItemLink"] as const;
type Selectors = (typeof dataCySelectors)[number];

export class HeaderItemPom extends CyPom<Selectors> {
  constructor(public rootCy: string) {
    super(rootCy, [...dataCySelectors]);
  }
}
export default HeaderItemPom;
