/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { SiTablePom } from "@orch-ui/poms";
import { Cy, CyPom } from "@orch-ui/tests";
import { dataCy as clusterDetailDataCy } from "../ClusterDetails/ClusterDetails";
import ClusterDetailsPom from "../ClusterDetails/ClusterDetails.pom";
import { dataCy } from "./SelectCluster";

const dataCySelectors = ["title", "deploymentNameField"] as const;
type Selectors = (typeof dataCySelectors)[number];
type ApiAliases = "getClusterSuccess";

class SelectClusterPom extends CyPom<Selectors, ApiAliases> {
  public clusterTable: SiTablePom;
  public clusterDetail: ClusterDetailsPom;
  constructor(public rootCy: string = dataCy) {
    super(rootCy, [...dataCySelectors]);
    this.clusterTable = new SiTablePom("table");
    this.clusterDetail = new ClusterDetailsPom(clusterDetailDataCy);
  }

  public selectNthCluster(n: number): Cy {
    return this.clusterTable
      .getRow(n)
      .find(".spark-table-rows-select-checkbox")
      .click();
  }
}
export default SelectClusterPom;
