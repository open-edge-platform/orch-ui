/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { CyPom } from "@orch-ui/tests";
import { dataCy } from "./HostsTableRowExpansionDetail";

const dataCySelectors = ["hostName", "uuid", "cpuModel"] as const;
type Selectors = (typeof dataCySelectors)[number];

class HostsTableRowExpansionDetailPom extends CyPom<Selectors> {
  constructor(public rootCy: string = dataCy) {
    super(rootCy, [...dataCySelectors]);
  }
}
export default HostsTableRowExpansionDetailPom;
