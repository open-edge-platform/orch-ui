/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { TablePom } from "@orch-ui/components";
import { SiTablePom } from "@orch-ui/poms";
import { CyPom } from "@orch-ui/tests";

const dataCySelectors = [
  "appName",
  "appVersion",
  "helmRegistryName",
  "chartName",
  "chartVersion",
  "description",
] as const;

type Selectors = (typeof dataCySelectors)[number];

class ApplicationDetailsDrawerContentPom extends CyPom<Selectors> {
  profileTable: TablePom;
  profileTableUtils: SiTablePom;
  constructor(public rootCy = "appDetailsDrawerContent") {
    super(rootCy, [...dataCySelectors]);
    this.profileTable = new TablePom("profilesTable");
    this.profileTableUtils = new SiTablePom("profilesTable");
  }
}

export default ApplicationDetailsDrawerContentPom;
