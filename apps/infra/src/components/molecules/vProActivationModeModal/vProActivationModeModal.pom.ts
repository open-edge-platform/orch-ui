/*
 * SPDX-FileCopyrightText: (C) 2026 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { CyPom } from "@orch-ui/tests";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

class vProActivationModeModalPom extends CyPom<Selectors> {
  constructor(public rootCy: string = "vProActivationModeModal") {
    super(rootCy, [...dataCySelectors]);
  }
}
export default vProActivationModeModalPom;
