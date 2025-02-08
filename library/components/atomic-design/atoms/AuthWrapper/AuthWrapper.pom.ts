/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { CyPom } from "@orch-ui/tests";
import { authWrapperDataCy } from "./AuthWrapper";

const dataCySelectors = ["nestedContent", "loader"] as const;
type Selectors = (typeof dataCySelectors)[number];

export class AuthWrapperPom extends CyPom<Selectors> {
  constructor(public rootCy: string = authWrapperDataCy) {
    super(rootCy, [...dataCySelectors]);
  }
}
