/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { CyPom } from "@orch-ui/tests";

const dataCySelectors = [
  "nextButton",
  "isAutoOnboarded",
  "isAutoProvisioned",
  "createCluster",
] as const;
type Selectors = (typeof dataCySelectors)[number];

class RegisterHostsPom extends CyPom<Selectors> {
  constructor(public rootCy: string = "registerHosts") {
    super(rootCy, [...dataCySelectors]);
  }
}
export default RegisterHostsPom;
