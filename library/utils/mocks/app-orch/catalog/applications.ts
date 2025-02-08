/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { catalog, CatalogKinds } from "@orch-ui/apis";
import {
  appEightName,
  appEightVersion,
  appFiveName,
  appFiveVersion,
  appFourName,
  appFourVersion,
  appNineName,
  appNineVersion,
  appOneName,
  appOneVersionOne,
  appOneVersionTwo,
  appSixName,
  appSixVersion,
  appThreeName,
  appThreeVersion,
  appTwoName,
  appTwoVersionOne,
  helmRegistryName,
} from "./data/appCatalogIds";
import {
  appEightChartName,
  appEightChartVersion,
  appEightDescription,
  appExtensionOneDescription,
  appExtensionOneName,
  appExtensionTwoDescription,
  appExtensionTwoName,
  appFiveChartName,
  appFiveChartVersion,
  appFiveDescription,
  appFourChartName,
  appFourChartVersion,
  appFourDescription,
  appNineChartName,
  appNineChartVersion,
  appNineDescription,
  appOneChartName,
  appOneChartVersion,
  appOneDescription,
  appSixChartName,
  appSixChartVersion,
  appSixDescription,
  appThreeChartName,
  appThreeChartVersion,
  appThreeDescription,
  appTwoChartName,
  appTwoChartVersion,
  appTwoDescription,
} from "./data/appCatalogInfo";

import CatalogBaseStore from "./baseStore";
import { profileOne, profileThree, profileTwo } from "./profiles";

export const applicationOne: catalog.ApplicationRead = {
  chartName: appOneChartName,
  chartVersion: appOneChartVersion,
  helmRegistryName: helmRegistryName,
  name: appOneName,
  displayName: "Wordpress",
  version: appOneVersionOne,
  profiles: [profileOne, profileTwo, profileThree],
  description: appOneDescription,
  createTime: "2022-11-04T20:57:45.133Z",
  updateTime: "2022-11-11T11:05:31.109Z",
  defaultProfileName: profileOne.name,
  kind: "KIND_NORMAL",
};

export const applicationTwo: catalog.ApplicationRead = {
  chartName: appTwoChartName,
  chartVersion: appTwoChartVersion,
  helmRegistryName: helmRegistryName,
  name: appTwoName,
  version: appTwoVersionOne,
  profiles: [profileOne],
  description: appTwoDescription,
  createTime: "2023-03-30T23:27:27.340813Z",
  updateTime: "2023-03-30T23:27:27.340813Z",
  defaultProfileName: profileTwo.name,
  kind: "KIND_NORMAL",
};

export const applicationThree: catalog.ApplicationRead = {
  chartName: appThreeChartName,
  chartVersion: appThreeChartVersion,
  helmRegistryName: helmRegistryName,
  name: appThreeName,
  version: appThreeVersion,
  profiles: [profileTwo, profileThree],
  description: appThreeDescription,
  kind: "KIND_NORMAL",
};

export const applicationFour: catalog.ApplicationRead = {
  chartName: appFourChartName,
  chartVersion: appFourChartVersion,
  helmRegistryName: helmRegistryName,
  name: appFourName,
  version: appFourVersion,
  profiles: [profileOne],
  description: appFourDescription,
  createTime: "2022-11-04T20:57:45.133Z",
  updateTime: "2022-11-11T11:05:31.109Z",
  defaultProfileName: profileOne.name,
  kind: "KIND_NORMAL",
};

export const applicationFive: catalog.ApplicationRead = {
  chartName: appFiveChartName,
  chartVersion: appFiveChartVersion,
  helmRegistryName: helmRegistryName,
  name: appFiveName,
  version: appFiveVersion,
  profiles: [profileOne],
  description: appFiveDescription,
  createTime: "2022-11-04T20:57:45.133Z",
  updateTime: "2022-11-11T11:05:31.109Z",
  defaultProfileName: profileOne.name,
  kind: "KIND_NORMAL",
};

export const applicationSix: catalog.ApplicationRead = {
  chartName: appSixChartName,
  chartVersion: appSixChartVersion,
  helmRegistryName: helmRegistryName,
  name: appSixName,
  version: appSixVersion,
  profiles: [profileOne],
  description: appSixDescription,
  createTime: "2022-11-04T20:57:45.133Z",
  updateTime: "2022-11-11T11:05:31.109Z",
  defaultProfileName: profileOne.name,
  kind: "KIND_NORMAL",
};

export const applicationSeven: catalog.ApplicationRead = {
  chartName: appOneChartName,
  chartVersion: appOneChartVersion,
  helmRegistryName: helmRegistryName,
  name: appOneName,
  version: appOneVersionOne,
  profiles: [profileOne],
  description: appOneDescription,
  createTime: "2022-11-04T20:57:45.133Z",
  updateTime: "2022-11-11T11:05:31.109Z",
  defaultProfileName: profileOne.name,
  kind: "KIND_NORMAL",
};

export const applicationEight: catalog.ApplicationRead = {
  chartName: appEightChartName,
  chartVersion: appEightChartVersion,
  helmRegistryName: helmRegistryName,
  name: appEightName,
  version: appEightVersion,
  profiles: [profileOne],
  description: appEightDescription,
  createTime: "2022-11-04T20:57:45.133Z",
  updateTime: "2022-11-11T11:05:31.109Z",
  defaultProfileName: profileOne.name,
  kind: "KIND_NORMAL",
};

export const applicationNine: catalog.ApplicationRead = {
  chartName: appNineChartName,
  chartVersion: appNineChartVersion,
  helmRegistryName: helmRegistryName,
  name: appNineName,
  version: appNineVersion,
  profiles: [profileOne],
  description: appNineDescription,
  createTime: "2022-11-04T20:57:45.133Z",
  updateTime: "2022-11-11T11:05:31.109Z",
  defaultProfileName: profileOne.name,
  kind: "KIND_NORMAL",
};

export const applicationTen: catalog.ApplicationRead = {
  chartName: appOneChartName,
  chartVersion: appOneChartVersion,
  helmRegistryName: helmRegistryName,
  name: appOneName,
  displayName: appOneName,
  version: appOneVersionTwo,
  profiles: [profileOne],
  description: appOneDescription,
  createTime: "2022-11-04T20:57:45.133Z",
  updateTime: "2022-11-11T11:05:31.109Z",
  defaultProfileName: profileOne.name,
  kind: "KIND_NORMAL",
};

export const applicationExtensionOne: catalog.ApplicationRead = {
  chartName: appOneChartName,
  chartVersion: appTwoChartVersion,
  helmRegistryName: helmRegistryName,
  name: appExtensionOneName,
  version: appTwoVersionOne,
  profiles: [profileOne],
  description: appExtensionOneDescription,
  createTime: "2023-03-30T23:27:27.340813Z",
  updateTime: "2023-03-30T23:27:27.340813Z",
  defaultProfileName: profileTwo.name,
  kind: "KIND_EXTENSION",
};

export const applicationExtensionTwo: catalog.ApplicationRead = {
  chartName: appOneChartName,
  chartVersion: appTwoChartVersion,
  helmRegistryName: helmRegistryName,
  name: appExtensionTwoName,
  version: appTwoVersionOne,
  profiles: [profileOne],
  description: appExtensionTwoDescription,
  createTime: "2023-03-30T23:27:27.340813Z",
  updateTime: "2023-03-30T23:27:27.340813Z",
  defaultProfileName: profileTwo.name,
  kind: "KIND_EXTENSION",
};

/**
 * Application to test the Parameter templates
 */
export const appWithParameterTemplates: catalog.ApplicationRead = {
  chartName: "foobar",
  chartVersion: "0.5.43",
  helmRegistryName: "harbor",
  name: "llama2",
  version: "1.0.0-dev",
  profiles: [
    {
      name: "cpu",
      chartValues: "cores: 2\ngpu: false",
    },
    {
      name: "gpu",
      chartValues: "cores: 12\ngpu: true",
      parameterTemplates: [
        {
          name: "cores",
          displayName: "Number of Cores",
          default: "12",
          suggestedValues: ["6", "18", "24"],
          type: "number",
        },
        {
          name: "gpu",
          displayName: "Enable GPU?",
          default: "true",
          suggestedValues: ["false"],
          type: "boolean",
        },
      ],
    },
  ],
  defaultProfileName: "cpu",
};

export const multipleExtensionsResponse: catalog.ListApplicationsResponse = {
  applications: [applicationExtensionOne, applicationExtensionTwo],
  totalElements: 2,
};

export class ApplicationsStore extends CatalogBaseStore<catalog.ApplicationRead> {
  constructor() {
    super([
      applicationOne,
      applicationTwo,
      applicationThree,
      applicationFour,
      applicationFive,
      applicationSix,
      applicationSeven,
      applicationEight,
      applicationNine,
      applicationTen,
      appWithParameterTemplates,
      applicationExtensionOne,
      applicationExtensionTwo,
    ]);
  }

  generateMockList(
    size: number,
    offsetIndex = 0,
    mockApplication = applicationOne,
  ) {
    return [...Array(size).keys()].map((appIndex) => ({
      ...mockApplication,
      name: `application-${appIndex + offsetIndex}`,
      displayName: `Application ${appIndex + offsetIndex}`,
    }));
  }

  getByApplicationKind(
    applications: catalog.ApplicationRead[],
    kind: CatalogKinds,
  ) {
    if (!kind) return applications; // Retuns all kinds
    return applications.filter((app) => app.kind === kind);
  }

  filter(
    searchTerm: string | undefined,
    apps: catalog.ApplicationRead[],
  ): catalog.ApplicationRead[] {
    if (!searchTerm || searchTerm === null || searchTerm.trim().length === 0)
      return apps;
    const searchTermValue = searchTerm.split("OR")[0].split("=")[1];
    const result = apps.filter((app: catalog.ApplicationRead) => {
      return (
        app.name.includes(searchTermValue) ||
        app.displayName?.includes(searchTermValue) ||
        app.description?.includes(searchTermValue)
      );
    });
    return result;
  }

  sort(
    orderBy: string | undefined,
    apps: catalog.ApplicationRead[],
  ): catalog.ApplicationRead[] {
    if (!orderBy || orderBy === null || orderBy.trim().length === 0)
      return apps;
    const column: "name" | "description" | "version" = orderBy.split(" ")[0] as
      | "name"
      | "description"
      | "version";
    const direction = orderBy.split(" ")[1];

    apps.sort((a, b) => {
      const valueA = a[column] ? a[column]!.toUpperCase() : "";
      const valueB = b[column] ? b[column]!.toUpperCase() : "";
      if (valueA < valueB) {
        return direction === "asc" ? -1 : 1;
      }
      if (valueA > valueB) {
        return direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    return apps;
  }
}
