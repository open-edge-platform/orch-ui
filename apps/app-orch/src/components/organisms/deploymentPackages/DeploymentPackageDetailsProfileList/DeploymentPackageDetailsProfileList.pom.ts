/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { EmptyPom, TablePom } from "@orch-ui/components";
import { SiTablePom } from "@orch-ui/poms";
import { CyPom } from "@orch-ui/tests";
import DeploymentPackageDetailsAppProfileListPom from "../DeploymentPackageDetailsAppProfileList/DeploymentPackageDetailsAppProfileList.pom";
import { dataCy } from "./DeploymentPackageDetailsProfileList";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

class DeploymentPackageDetailsProfileListPom extends CyPom<Selectors> {
  emptyPom: EmptyPom;
  profileTable: TablePom;
  profileTableUtils: SiTablePom;
  appProfileList: DeploymentPackageDetailsAppProfileListPom;

  constructor(public rootCy = dataCy) {
    super(rootCy, [...dataCySelectors]);

    this.emptyPom = new EmptyPom();
    this.profileTable = new TablePom("dpProfileListTable");
    this.profileTableUtils = new SiTablePom("dpProfileListTable");
    this.appProfileList = new DeploymentPackageDetailsAppProfileListPom();
  }

  getBadgeByProfileName(profileName: string) {
    return this.profileTableUtils
      .getRowBySearchText(profileName)
      .find("[data-cy='default-badge']");
  }
}

export default DeploymentPackageDetailsProfileListPom;
