/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { CyPom } from "@orch-ui/tests";

const dataCySelectors = ["home"] as const;
type Selectors = (typeof dataCySelectors)[number];

export class PageNotFoundPom extends CyPom<Selectors> {
  constructor(public rootCy: string = "pageNotFound") {
    super(rootCy, [...dataCySelectors]);
  }
}
