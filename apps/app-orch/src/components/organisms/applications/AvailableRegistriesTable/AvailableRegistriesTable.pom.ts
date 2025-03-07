/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { catalog } from "@orch-ui/apis";
import { EmptyPom, TablePom } from "@orch-ui/components";
import { SiTablePom } from "@orch-ui/poms";
import { CyApiDetails, CyPom, defaultActiveProject } from "@orch-ui/tests";
import { RegistryStore } from "@orch-ui/utils";
import { dataCy } from "./AvailableRegistriesTable";

const dataCySelectors = ["ribbonButton"] as const;
type Selectors = (typeof dataCySelectors)[number];
type ApiAliases =
  | "registries"
  | "registriesMock"
  | "registriesMockPage2"
  | "registries500"
  | "registriesEmpty"
  | "registriesWithDelay"
  | "registriesShorList"
  | "deleteRegistry";

const route = "**/registries**";
const project = defaultActiveProject.name;
export const registries = new RegistryStore().list();
export const totalMockElements = 11;
const registryPage1Response: catalog.CatalogServiceListRegistriesApiResponse = {
  registries: registries.slice(0, 10),
  totalElements: totalMockElements,
};
const registryPage2Response: catalog.CatalogServiceListRegistriesApiResponse = {
  registries: [
    {
      ...registries[10],
      name: "page-2-registry",
      displayName: "Page 2 registry",
    },
  ],
  totalElements: totalMockElements,
};

const endpoints: CyApiDetails<
  ApiAliases,
  catalog.CatalogServiceListRegistriesApiResponse
> = {
  registries: {
    route,
  },
  registriesMock: {
    statusCode: 200,
    route: `${route}`,
    response: registryPage1Response,
  },
  registriesMockPage2: {
    statusCode: 200,
    route,
    response: registryPage2Response,
  },
  registries500: {
    statusCode: 500,
    route,
    networkError: true,
  },
  registriesEmpty: {
    statusCode: 200,
    route,
    response: {
      registries: [],
      totalElements: 0,
    },
  },
  registriesWithDelay: {
    statusCode: 200,
    route,
    delay: 1000,
    response: {
      registries: [],
      totalElements: 0,
    },
  },
  registriesShorList: {
    statusCode: 200,
    route,
    response: {
      registries: registries.slice(0, 2),
      totalElements: 2,
    },
  },
  deleteRegistry: {
    method: "DELETE",
    route: `**/v3/projects/${project}/catalog/registries/**`,
    statusCode: 200,
  },
};

class AvailableRegistriesTablePom extends CyPom<Selectors, ApiAliases> {
  public table: TablePom;
  public tableUtils: SiTablePom;
  public empty: EmptyPom;
  constructor(public rootCy: string = dataCy) {
    super(rootCy, [...dataCySelectors], endpoints);
    this.table = new TablePom("registryTable");
    this.tableUtils = new SiTablePom("registryTable");
    this.empty = new EmptyPom();
  }

  getActionPopupOptionBySearchText(search: string) {
    return this.tableUtils
      .getRowBySearchText(search)
      .find("[data-cy='appRegistryPopup']");
  }
}
export default AvailableRegistriesTablePom;
