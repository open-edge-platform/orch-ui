/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { CyPom } from "@orch-ui/tests";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

class RegisterHostsPom extends CyPom<Selectors> {
  constructor(public rootCy: string = "registerHosts") {
    super(rootCy, [...dataCySelectors]);
  }
}
export default RegisterHostsPom;
