/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { cm } from "@orch-ui/apis";
import { MetadataDisplayPom } from "@orch-ui/components";
import { CyApiDetails, CyPom } from "@orch-ui/tests";
import { clusterOne } from "@orch-ui/utils";

const dataCySelectors = [
  "status",
  "statusValue",
  "id",
  "idValue",
  "site",
  "siteValue",
  "labels",
  "hosts",
] as const;
type Selectors = (typeof dataCySelectors)[number];
type ApiAliases = "getClusterDetailSuccess";

const endpoints: CyApiDetails<ApiAliases, cm.ClusterInfo> = {
  getClusterDetailSuccess: {
    route: "**/clusters/**",
    response: clusterOne,
  },
};

class ClusterDetailsDrawerPom extends CyPom<Selectors, ApiAliases> {
  public labelsDisplay: MetadataDisplayPom;
  constructor(public rootCy: string = "clusterDetailsDrawer") {
    super(rootCy, [...dataCySelectors], endpoints);
    this.labelsDisplay = new MetadataDisplayPom("MetadataDisplay");
  }
}
export default ClusterDetailsDrawerPom;
