/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { CyPom } from "@orch-ui/tests";

const dataCySelectors = ["uploadInput"] as const;
type Selectors = (typeof dataCySelectors)[number];

class ClusterTemplatesPom extends CyPom<Selectors> {
  constructor(public rootCy: string = "clusterTemplates") {
    super(rootCy, [...dataCySelectors]);
  }
}
export default ClusterTemplatesPom;
