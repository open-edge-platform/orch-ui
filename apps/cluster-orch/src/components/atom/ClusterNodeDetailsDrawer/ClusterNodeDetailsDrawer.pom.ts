/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { CyPom } from "@orch-ui/tests";
import { dataCy } from "./ClusterNodeDetailsDrawer";

const dataCySelectors = [
  "serialNumber",
  "hostGuid",
  "osProfiles",
  "siteName",
  "processorArchitecture",
  "locationMetadata",
  "hostLabels",
] as const;
type Selectors = (typeof dataCySelectors)[number];

class ClusterNodeDetailsDrawerPom extends CyPom<Selectors> {
  constructor(public rootCy: string = dataCy) {
    super(rootCy, [...dataCySelectors]);
  }

  get drawerBase() {
    return this.root.find(".spark-drawer-base");
  }

  get drawerCloseButton() {
    return this.root.find(".spark-drawer-footer").contains("Close");
  }
}
export default ClusterNodeDetailsDrawerPom;
