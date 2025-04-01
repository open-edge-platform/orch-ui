/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { CyPom } from "@orch-ui/tests";

const dataCySelectors = ["hostStatus"] as const;
type Selectors = (typeof dataCySelectors)[number];

class HostsStatusByClusterPom extends CyPom<Selectors> {
  constructor(public rootCy = "hostsStatusByCluster") {
    super(rootCy, [...dataCySelectors]);
  }
}
export default HostsStatusByClusterPom;
