/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { catalog } from "@orch-ui/apis";
import {
  ApiErrorPom,
  EmptyPom,
  RibbonPom,
  TablePom,
  TextTruncatePom,
} from "@orch-ui/components";
import { SiTablePom } from "@orch-ui/poms";
import { Cy, CyApiDetails, CyPom, defaultActiveProject } from "@orch-ui/tests";
import {
  applicationOne,
  ApplicationsStore,
  multipleExtensionsResponse,
} from "@orch-ui/utils";
import ApplicationDetailsDrawerContentPom from "../ApplicationDetailsDrawerContent/ApplicationDetailsDrawerContent.pom";

const dataCySelectors = ["squareSpinner", "newAppRibbonButton"] as const;
type Selectors = (typeof dataCySelectors)[number];

type ApiAliases =
  | "appError500"
  | "appEmpty"
  | "appSingleList"
  | "appMultipleListPage1"
  | "appMultipleListPage2"
  | "appMultipleWithFilter"
  | "appExtensionsMultiple";

const project = defaultActiveProject.name;
const applicationApiUrl = `**/v3/projects/${project}/catalog/applications?*`;

const applicationStore = new ApplicationsStore();
const multipleApplicationPage1: catalog.Application[] =
  applicationStore.generateMockList(10);
const multipleApplicationPage2: catalog.Application[] =
  applicationStore.generateMockList(8, 10);

const appApiIntercepts: CyApiDetails<
  ApiAliases,
  catalog.ListApplicationsResponse
> = {
  appError500: { route: applicationApiUrl, statusCode: 500 },
  appEmpty: {
    route: applicationApiUrl,
    statusCode: 200,
    response: {
      applications: [],
      totalElements: 0,
    },
  },
  appSingleList: {
    route: applicationApiUrl,
    response: {
      applications: [applicationOne],
      totalElements: 1,
    },
  },
  appMultipleListPage1: {
    route: `${applicationApiUrl}*offset=0*`,
    response: {
      applications: multipleApplicationPage1,
      totalElements: 18,
    },
  },
  appMultipleListPage2: {
    route: `${applicationApiUrl}*offset=10*`,
    response: {
      applications: multipleApplicationPage2,
      totalElements: 18,
    },
  },
  appExtensionsMultiple: {
    route: applicationApiUrl,
    response: multipleExtensionsResponse,
  },
  appMultipleWithFilter: {
    route: `${applicationApiUrl}*filter=*`,
    response: {
      applications: multipleApplicationPage2.map((app) => ({
        ...app,
        description: "test-search",
      })),
      totalElements: 8,
    },
  },
};

export const headerList = [
  "Select",
  "Name",
  "Version",
  "Chart name",
  "Chart version",
  "Description",
  "Action",
];
export const keyList = [
  "select",
  "displayName",
  "version",
  "chartName",
  "chartVersion",
  "description",
  "action",
] as const;
export type KeyList = (typeof keyList)[number];

class ApplicationTablePom extends CyPom<Selectors, ApiAliases> {
  table: TablePom;
  tableUtils: SiTablePom;
  tableRibbon: RibbonPom;
  empty: EmptyPom;
  apiErrorPom: ApiErrorPom;
  appDescriptionTextPom: TextTruncatePom;
  appDrawerPom: ApplicationDetailsDrawerContentPom;
  constructor(public rootCy = "applicationTable") {
    super(rootCy, [...dataCySelectors], appApiIntercepts);

    this.table = new TablePom("table");
    this.tableUtils = new SiTablePom("table");
    this.tableRibbon = new RibbonPom("");
    this.empty = new EmptyPom();
    this.apiErrorPom = new ApiErrorPom();
    this.appDrawerPom = new ApplicationDetailsDrawerContentPom();
    this.appDescriptionTextPom = new TextTruncatePom();
  }

  public getActionPopupBySearchText(search: string): Cy {
    return this.tableUtils
      .getRowBySearchText(search)
      .find("[data-cy='appPopup']");
  }

  public getCheckBoxBySearchText(search: string): Cy {
    return this.tableUtils
      .getRowBySearchText(search)
      .find(".spark-table-rows-select-checkbox");
  }

  public getNthCheckBox(n: number): Cy {
    return this.root
      .find("tbody tr .spark-table-rows-select-checkbox")
      .eq(n - 1);
  }
}

export default ApplicationTablePom;
