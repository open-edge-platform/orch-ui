/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { catalog } from "@orch-ui/apis";
import {
  CyApiDetail,
  CyApiDetails,
  CyPom,
  defaultActiveProject,
} from "@orch-ui/tests";
import {
  applicationFormValues,
  chartData,
  multipleApplicationsResponse,
  registryResponse,
} from "@orch-ui/utils";
import ApplicationFormPom from "../../organisms/applications/ApplicationForm/ApplicationForm.pom";
import ApplicationReviewPom from "../../organisms/applications/ApplicationReview/ApplicationReview.pom";
import ApplicationSourcePom from "../../organisms/applications/ApplicationSource/ApplicationSource.pom";
import ApplicationProfileFormPom from "../../organisms/profiles/ApplicationProfileForm/ApplicationProfileForm.pom";
import ApplicationProfileTablePom from "../../organisms/profiles/ApplicationProfileTable/ApplicationProfileTable.pom";

export const steps = [
  "Select Application Source",
  "Enter Application Details",
  "Add Profiles",
  "Review",
];

const dataCySelectors = [
  "title",
  "stepper",
  "stepSourceInfoCancelBtn",
  "stepBasicInfoCancelBtn",
  "stepProfileCancelBtn",
  "stepReviewCancelBtn",
  "stepSourceInfoNextBtn",
  "stepBasicInfoNextBtn",
  "profilesTitle",
  "addProfileBtn",
  "profileModal",
  "profileFormCancelBtn",
  "profileFormSubmitBtn",
  "profileDeleteModal",
  "stepBasicInfoPreviousBtn",
  "stepProfilePreviousBtn",
  "stepProfileNextBtn",
  "reviewBasicInfoTitle",
  "reviewProfilesTitle",
  "stepReviewPreviousBtn",
  "submitBtn",
  "successToast",
  "errorToast",
  "helmRegistryNameCombobox",
  "helmLocationInput",
  "chartNameCombobox",
  "chartVersionCombobox",
  "imageRegistryNameCombobox",
  "imageLocationInput",
] as const;
type Selectors = (typeof dataCySelectors)[number];
const selectedRegistry = "orch-harbor";
const selectedChart = "chart1";

type ApiAliases =
  | "registry"
  | "addApp500"
  | "addApp200"
  | "appMultiple"
  | "appEmpty"
  | "listChartNames"
  | "listChartVersions";

const project = defaultActiveProject.name;
const registry: CyApiDetail<catalog.ListRegistriesResponse> = {
  route: `/v3/projects/${project}/catalog/registries?`,
  response: registryResponse,
};

const baseAppRoute = `/v3/projects/${project}/catalog/applications`;

const listChartNames: CyApiDetail<string[]> = {
  route: `/v3/projects/${project}/catalog/charts?registry=${selectedRegistry}`,
  response: chartData
    .filter((chart) => chart.registry === selectedRegistry)
    .map((chart) => chart.chartName),
};

const listChartVersions: CyApiDetail<string[]> = {
  route: `/v3/projects/${project}/catalog/charts?registry=${selectedRegistry}&chart=${selectedChart}`,
  response: chartData
    .filter(
      (chart) =>
        chart.registry === selectedRegistry &&
        chart.chartName === selectedChart,
    )
    .map((chart) => chart.versions)[0],
};

const addApp200: CyApiDetail<
  catalog.CreateApplicationResponse,
  catalog.Application
> = {
  method: "POST",
  route: baseAppRoute,
  body: applicationFormValues,
  statusCode: 201,
};

const addApp500: CyApiDetail<
  catalog.CreateApplicationResponse,
  catalog.Application
> = {
  method: "POST",
  route: baseAppRoute,
  body: applicationFormValues,
  statusCode: 500,
};

const appMultiple: CyApiDetail<catalog.ListApplicationsResponse> = {
  route: `${baseAppRoute}?*`,
  response: multipleApplicationsResponse,
  statusCode: 200,
};

const appEmpty: CyApiDetail<catalog.ListApplicationsResponse> = {
  route: `${baseAppRoute}?*`,
  response: { applications: [], totalElements: 0 },
  statusCode: 200,
};

const apis: CyApiDetails<ApiAliases, any, null | catalog.Application> = {
  registry,
  listChartNames,
  listChartVersions,
  addApp200,
  addApp500,
  appMultiple,
  appEmpty,
};

class ApplicationCreateEditPom extends CyPom<Selectors, ApiAliases> {
  public sourceForm: ApplicationSourcePom;
  public appForm: ApplicationFormPom;
  public profileTable: ApplicationProfileTablePom;
  public profileForm: ApplicationProfileFormPom;
  public appReview: ApplicationReviewPom;
  constructor(public rootCy = "appActionPage") {
    super(rootCy, [...dataCySelectors], apis);
    this.sourceForm = new ApplicationSourcePom("appSourceForm");
    this.appForm = new ApplicationFormPom("appForm");
    this.profileTable = new ApplicationProfileTablePom();
    this.profileForm = new ApplicationProfileFormPom();
    this.appReview = new ApplicationReviewPom("appReview");
  }

  public addApplicationProfileByProfileFormDrawer(
    profile: Partial<catalog.Profile>,
  ): void {
    this.el.addProfileBtn.click();
    this.profileForm.fillProfileForm(profile);
    this.el.profileFormSubmitBtn.click();
  }
}

export default ApplicationCreateEditPom;
