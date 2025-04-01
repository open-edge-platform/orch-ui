/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { cm } from "@orch-ui/apis";
import { MetadataDisplayPom } from "@orch-ui/components";
import { SiTablePom } from "@orch-ui/poms";
import { CyApiDetails, CyPom, defaultActiveProject } from "@orch-ui/tests";
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
type ApiAliases = "getClusterDetailSuccess" | "getHostsSuccess";

const endpoints: CyApiDetails<ApiAliases> = {
  getClusterDetailSuccess: {
    route: "**v1/**/clusters/*",
    response: clusterOne as cm.ClusterInfo,
  },
  getHostsSuccess: {
    route: `**/v1/projects/${defaultActiveProject.name}/compute/hosts/**`,
    response: [],
  },
};

class ClusterDetailsPom extends CyPom<Selectors, ApiAliases> {
  public labelsDisplay: MetadataDisplayPom;
  public infraHostsTable: SiTablePom;
  constructor(public rootCy: string = "clusterDetails") {
    super(rootCy, [...dataCySelectors], endpoints);
    this.labelsDisplay = new MetadataDisplayPom("MetadataDisplay");
    this.infraHostsTable = new SiTablePom("infraHostsTable");
  }
}
export default ClusterDetailsPom;
