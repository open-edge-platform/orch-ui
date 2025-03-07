/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { ConfirmationDialogPom } from "@orch-ui/components";
import { CyApiDetails, CyPom } from "@orch-ui/tests";
import ApplicationAddRegistryDrawerPom from "../ApplicationAddRegistryDrawer/ApplicationAddRegistryDrawer.pom";
import ApplicationTablePom from "../ApplicationTable/ApplicationTable.pom";
import AvailableRegistriesTablePom from "../AvailableRegistriesTable/AvailableRegistriesTable.pom";
import { dataCy } from "./ApplicationTabs";

const dataCySelectors = [
  "appTableContent",
  "appExtensionsContent",
  "registryTableContent",
  "addApplicationButton",
  "addRegistryButton",
  "empty",
] as const;
type Selectors = (typeof dataCySelectors)[number];

type SuccessDeleteApplicationApiAliases = "deleteApplication";
const deleteApplicationEndpoint: CyApiDetails<SuccessDeleteApplicationApiAliases> =
  {
    deleteApplication: {
      method: "DELETE",
      route: /.*\/applications\/.*\/.*/,
      statusCode: 200,
    },
  };

class ApplicationTabsPom extends CyPom<
  Selectors,
  SuccessDeleteApplicationApiAliases
> {
  appTablePom: ApplicationTablePom;
  appRegistryTablePom: AvailableRegistriesTablePom;
  registryDrawerPom: ApplicationAddRegistryDrawerPom;
  deleteConfirmationPom: ConfirmationDialogPom;
  constructor(public rootCy: string = dataCy) {
    super(rootCy, [...dataCySelectors], deleteApplicationEndpoint);
    this.appTablePom = new ApplicationTablePom();
    this.appRegistryTablePom = new AvailableRegistriesTablePom(
      "availableRegistriesTable",
    );
    this.registryDrawerPom = new ApplicationAddRegistryDrawerPom();
    this.deleteConfirmationPom = new ConfirmationDialogPom(
      "deleteConfirmationDialog",
    );
  }

  getTab(tabName: string) {
    return this.root.find(".spark-tabs-tab").contains(tabName);
  }
}
export default ApplicationTabsPom;
