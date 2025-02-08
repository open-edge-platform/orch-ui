/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { CyPom } from "@orch-ui/tests";
import { dataCy } from "./AlertDefinitions";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

class AlertDefinitionsPom extends CyPom<Selectors> {
  constructor(public rootCy: string = dataCy) {
    super(rootCy, [...dataCySelectors]);
  }
}
export default AlertDefinitionsPom;
