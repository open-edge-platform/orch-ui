/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { catalog } from "@orch-ui/apis";
import { ApiErrorPom, EmptyPom, TablePom } from "@orch-ui/components";
import { SiTablePom } from "@orch-ui/poms";
import { CyApiDetails, CyPom, defaultActiveProject } from "@orch-ui/tests";
import {
  DeploymentPackagesStore,
  packageOneExtension,
  packageTwoExtension,
} from "@orch-ui/utils";
import { dataCy } from "./DeploymentPackageTable";

const dataCySelectors = ["actions-button", "appDeleteModal"] as const;
type Selectors = (typeof dataCySelectors)[number];

type CompositeApiAliases =
  | "packageList"
  | "packageListPage1"
  | "packageListPage2"
  | "packageError500"
  | "packageEmpty"
  | "packageWithFilter"
  | "packageExtensionsList";

const project = defaultActiveProject.name;
const packageApiUrl = `**/v3/projects/${project}/catalog/deployment_packages*`;
const mockStore = new DeploymentPackagesStore();
export const deploymentPackageMock = mockStore.list().slice(0, 10);
export const deploymentPackageFiltered = deploymentPackageMock
  .slice(0, 3)
  .map((pkg) => ({ ...pkg, description: "Testing-Search" }));
export const deploymentPackagePage1 = [...Array(10).keys()].map((key) => ({
  ...deploymentPackageMock[0],
  name: `package-${key}`,
  displayName: `Package${key}`,
}));
export const deploymentPackagePage2 = [...Array(5).keys()].map((key) => ({
  ...deploymentPackageMock[0],
  name: `package-${key + 10}`,
  displayName: `Package${key + 10}`,
}));

const compositeApis: CyApiDetails<
  CompositeApiAliases,
  catalog.CatalogServiceListDeploymentPackagesApiResponse
> = {
  packageError500: { route: packageApiUrl, statusCode: 500 },
  packageEmpty: {
    route: packageApiUrl,
    statusCode: 200,
    response: {
      deploymentPackages: [],
      totalElements: 0,
    },
  },
  packageList: {
    route: packageApiUrl,
    statusCode: 200,
    response: {
      deploymentPackages: deploymentPackageMock,
      totalElements: deploymentPackageMock.length,
    },
  },
  packageListPage1: {
    route: packageApiUrl,
    statusCode: 200,
    response: {
      deploymentPackages: deploymentPackagePage1,
      totalElements:
        deploymentPackagePage1.length + deploymentPackagePage2.length,
    },
  },
  packageListPage2: {
    route: packageApiUrl,
    statusCode: 200,
    response: {
      deploymentPackages: deploymentPackagePage2,
      totalElements:
        deploymentPackagePage1.length + deploymentPackagePage2.length,
    },
  },
  packageExtensionsList: {
    route: packageApiUrl,
    statusCode: 200,
    response: {
      deploymentPackages: [packageOneExtension, packageTwoExtension],
      totalElements: 2,
    },
  },
  packageWithFilter: {
    route: `${packageApiUrl}filter=*`,
    statusCode: 200,
    response: {
      deploymentPackages: deploymentPackageFiltered,
      totalElements: deploymentPackageFiltered.length,
    },
  },
};

class DeploymentPackageTablePom extends CyPom<Selectors, CompositeApiAliases> {
  emptyPom: EmptyPom;
  apiErrorPom: ApiErrorPom;
  table: TablePom;
  tableUtils: SiTablePom;
  constructor(public rootCy = dataCy) {
    super(rootCy, [...dataCySelectors], compositeApis);
    this.emptyPom = new EmptyPom();
    this.apiErrorPom = new ApiErrorPom();
    this.table = new TablePom();
    this.tableUtils = new SiTablePom();
  }
  public getActionPopupBySearchText(searchText: string) {
    return this.tableUtils
      .getRowBySearchText(searchText)
      .find("[data-cy='popup']")
      .click();
  }
  public clickNthActionPopupOption(n: number): void {
    cy.get(`.popup__options > :nth-child(${n})`).click();
  }
  public clickPopupOption(o: string): void {
    cy.get(".popup__options").within(() => {
      cy.contains(o).click();
    });
  }
  public getFieldByName(name: string) {
    return this.root.find(`[data-cy='${name}Selector']`);
  }
}

export default DeploymentPackageTablePom;
