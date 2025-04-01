/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { MetadataDisplayPom, TablePom } from "@orch-ui/components";
import { SiTablePom } from "@orch-ui/poms";
import { CyPom } from "@orch-ui/tests";

const dataCySelectors = [
  "clusterStatus",
  "clusterApplicationStatus",
  "clusterAppReadyStatus",
  "clusterAppDownStatus",
] as const;
type Selectors = (typeof dataCySelectors)[number];

class DeploymentInstanceClusterStatusPom extends CyPom<Selectors> {
  public statusTableUtils: SiTablePom;
  public statusTablePom: TablePom;
  public metadataPom: MetadataDisplayPom;

  constructor(rootCy: string = "deploymentInstanceClusterStatus") {
    super(rootCy, [...dataCySelectors]);
    this.metadataPom = new MetadataDisplayPom();
    this.statusTablePom = new TablePom("clusterStatusTable");
    this.statusTableUtils = new SiTablePom("clusterStatusTable");
  }
}

export default DeploymentInstanceClusterStatusPom;
