/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { catalog } from "@orch-ui/apis";
import { profileFormValues } from "./profile";

/**
 * @deprecated use shared/src/mocks/app-orch/catalog/applications.ts instead
 */
export const singleApplication: catalog.ApplicationRead = {
  name: "engage",
  displayName: "engage display name",
  description: "This application is VM-based engage app",
  version: "0.0.1",
  chartName: "engage-vm",
  chartVersion: "0.0.1",
  helmRegistryName: "orch-harbor",
  imageRegistryName: "orch-image",
  profiles: [
    {
      name: "profile default",
      description: "An awesome app engage default Profile Description",
      chartValues: "testing",
      createTime: "2022-11-04T20:57:45.133Z",
      updateTime: "2022-11-07T20:57:45.133Z",
    },
    {
      name: "profile a",
    },
    {
      name: "profile b",
      displayName: "profile b diaplay name",
    },
  ],
  createTime: "2022-11-04T20:57:45.133Z",
  updateTime: "2022-11-11T11:05:31.109Z",
  defaultProfileName: "engage",
};

/**
 * @deprecated use shared/src/mocks/app-orch/catalog/applications.ts instead
 */
export const singleApplicationWithShortDescription: catalog.ApplicationRead = {
  name: "engage",
  displayName: "engage display name",
  description: "description",
  version: "0.0.1",
  chartName: "engage-vm",
  chartVersion: "0.0.1",
  helmRegistryName: "orch-harbor",
  imageRegistryName: "orch-image",
  profiles: [
    {
      name: "profile default",
      description: "An awesome app engage default Profile Description",
      chartValues: "testing",
      createTime: "2022-11-04T20:57:45.133Z",
      updateTime: "2022-11-07T20:57:45.133Z",
    },
    {
      name: "profile a",
    },
    {
      name: "profile b",
      displayName: "profile b diaplay name",
    },
  ],
  createTime: "2022-11-04T20:57:45.133Z",
  updateTime: "2022-11-11T11:05:31.109Z",
};

/**
 * @deprecated use shared/src/mocks/app-orch/catalog/applications.ts instead
 */
export const multipleApplication: catalog.ApplicationRead[] = [
  {
    name: "engage",
    displayName: "engage app",
    description: "This application is VM-based engage app",
    version: "0.0.1",
    chartName: "engage-vm",
    chartVersion: "0.0.1",
    helmRegistryName: "culvers-harbor",
    imageRegistryName: "culvers-image",
    profiles: [
      {
        name: "default",
        displayName: "Default",
        description: "This is description of default profile",
        chartValues: "",
        createTime: "2023-03-30T23:27:27.385080Z",
        updateTime: "2023-03-30T23:27:27.385080Z",
      },
    ],
    createTime: "2023-03-30T23:27:27.340813Z",
    updateTime: "2023-03-30T23:27:27.340813Z",
    defaultProfileName: "",
  },
  {
    name: "gsm-sigint",
    displayName: "gsm sigint app",
    description: "This application is VM-based GSM Sigint app",
    version: "0.0.1",
    chartName: "gsm-sigint-vm",
    chartVersion: "0.0.1",
    helmRegistryName: "culvers-harbor",
    imageRegistryName: "culvers-image",
    profiles: [
      {
        name: "default",
        displayName: "Default",
        description: "",
        chartValues: "",
        createTime: "2023-03-30T23:27:27.512518Z",
        updateTime: "2023-03-30T23:27:27.512518Z",
      },
    ],
    createTime: "2023-03-30T23:27:27.460923Z",
    updateTime: "2023-03-30T23:27:27.460923Z",
    defaultProfileName: "",
  },
  {
    name: "nginx2",
    displayName: "nginx version 2",
    description: "Sample web server that displays a page using nginx",
    version: "0.0.1",
    chartName: "nginx",
    chartVersion: "13.2.29",
    helmRegistryName: "bitnami",
    imageRegistryName: "bitnami-image",
    profiles: [
      {
        name: "profile1",
        displayName: "Default #1",
        description: "",
        chartValues:
          'service:\n  type: ClusterIP\n\nserverBlock: |-\n  server {\n    listen 0.0.0.0:8080;\n    location / {\n      default_type text-html;\n      return 200 "hello! This is application-2 profile-1";\n    }\n  }\n',
        createTime: "2023-03-30T23:31:02.631042Z",
        updateTime: "2023-03-30T23:31:02.631043Z",
      },
      {
        name: "profile2",
        displayName: "Default #2",
        description: "",
        chartValues:
          'service:\n  type: ClusterIP\n\nserverBlock: |-\n  server {\n    listen 0.0.0.0:8080;\n    location / {\n      default_type text-html;\n      return 200 "hello! This is application-2 profile-2";\n    }\n  }\n',
        createTime: "2023-03-30T23:31:02.669540Z",
        updateTime: "2023-03-30T23:31:02.669540Z",
      },
    ],
    createTime: "2023-03-30T23:31:02.591902Z",
    updateTime: "2023-03-30T23:31:02.591903Z",
    defaultProfileName: "",
  },
  {
    name: "win19-server",
    displayName: "win19 server",
    description: "This application is VM-based Windows 19 Server app",
    version: "0.0.1",
    chartName: "windows19-vm",
    chartVersion: "0.0.1",
    helmRegistryName: "culvers-harbor",
    imageRegistryName: "culvers-image",
    profiles: [
      {
        name: "default",
        displayName: "Default",
        description: "",
        chartValues: "",
        createTime: "2023-03-30T23:27:27.889786Z",
        updateTime: "2023-03-30T23:27:27.889787Z",
      },
    ],
    createTime: "2023-03-30T23:27:27.856552Z",
    updateTime: "2023-03-30T23:27:27.856552Z",
    defaultProfileName: "",
  },
  {
    name: "wifi-sigint",
    displayName: "wifi",
    description: "This application is VM-based Wifi Sigint app",
    version: "0.0.1",
    chartName: "wifi-sigint-vm",
    chartVersion: "0.0.1",
    helmRegistryName: "culvers-harbor",
    imageRegistryName: "culvers-image",
    profiles: [
      {
        name: "default",
        displayName: "Default",
        description: "",
        chartValues: "",
        createTime: "2023-03-30T23:27:27.779533Z",
        updateTime: "2023-03-30T23:27:27.779533Z",
      },
    ],
    createTime: "2023-03-30T23:27:27.734585Z",
    updateTime: "2023-03-30T23:27:27.734585Z",
    defaultProfileName: "",
  },
  {
    name: "engage",
    displayName: "engage app",
    description: "This application is VM-based engage app",
    version: "0.0.2",
    chartName: "engage-vm",
    chartVersion: "0.0.2",
    helmRegistryName: "culvers-harbor",
    profiles: [
      {
        name: "default",
        displayName: "Default",
        description: "This is description of default profile",
        chartValues: "",
        createTime: "2023-03-30T23:27:27.385080Z",
        updateTime: "2023-03-30T23:27:27.385080Z",
      },
    ],
    createTime: "2023-03-30T23:27:27.340813Z",
    updateTime: "2023-03-30T23:27:27.340813Z",
    defaultProfileName: "",
  },
];
/**
 * @deprecated use shared/src/mocks/app-orch/catalog/applications.ts instead
 */
export const applicationFormValues: catalog.ApplicationRead = {
  name: "testing-name",
  displayName: "Testing Name",
  version: "1.0.0",
  description: "TestingDescription",
  chartName: "testingchartname",
  chartVersion: "0.0.1",
  helmRegistryName: "orch-harbor",
  imageRegistryName: "orch-image",
  profiles: [profileFormValues],
};

/**
 * @deprecated use shared/src/mocks/app-orch/catalog/applications.ts instead
 */
export const applicationReviewInfomation = (
  formInput: catalog.ApplicationRead,
) => [
  { key: "Name", value: formInput.displayName || "testing" },
  { key: "Version", value: formInput.version },
  { key: "Description", value: formInput.description || "" },
  { key: "Chart name", value: formInput.chartName },
  { key: "Chart version", value: formInput.chartVersion },
  { key: "Helm registry name", value: formInput.helmRegistryName },
  { key: "Image registry name", value: formInput.imageRegistryName ?? "" },
];

/**
 * @deprecated use shared/src/mocks/app-orch/catalog/applications.ts instead
 */
export const applicationDetails: catalog.ApplicationRead = {
  name: "wordpress",
  displayName: "engage display name",
  description: "This application is VM-based engage app",
  version: "0.0.1",
  chartName: "engage-vm",
  chartVersion: "0.0.1",
  helmRegistryName: "orch-harbor",
  imageRegistryName: "orch-image",
  profiles: [
    {
      name: "profile default",
      description: "An awesome app engage default Profile Description",
      chartValues: "testing",
      createTime: "2022-11-04T20:57:45.133Z",
      updateTime: "2022-11-07T20:57:45.133Z",
      parameterTemplates: [
        {
          name: "version",
          type: "",
          default: "value1",
          suggestedValues: ["value1", "value2", "value3"],
          mandatory: false,
          secret: false,
        },
        {
          name: "image.containerDisk.pullSecret",
          type: "",
          default: "value2",
          suggestedValues: ["value1", "value2", "value3"],
          mandatory: false,
          secret: false,
        },
        {
          name: "a.b.c.d.e",
          type: "",
          default: "value3",
          suggestedValues: ["value1", "value2", "value3"],
          mandatory: false,
          secret: false,
        },
        {
          name: "val.zero",
          type: "",
          default: "value0",
          suggestedValues: ["value0", "value1", "value1"],
          mandatory: false,
          secret: false,
        },
        {
          name: "val.secret",
          type: "",
          default: "secret",
          suggestedValues: [],
          mandatory: false,
          secret: true,
        },
      ],
    },
    {
      name: "profile a",
    },
    {
      name: "profile b",
      displayName: "profile b diaplay name",
    },
  ],
  createTime: "2022-11-04T20:57:45.133Z",
  updateTime: "2022-11-11T11:05:31.109Z",
};

/**
 * @deprecated use shared/src/mocks/app-orch/catalog/applications.ts instead
 */
export const singleApplicationResponse: catalog.ListApplicationsResponse = {
  applications: [singleApplication],
  totalElements: 1,
};

/**
 * @deprecated use shared/src/mocks/app-orch/catalog/applications.ts instead
 */
export const singleApplicationWithShortDescriptionResponse: catalog.ListApplicationsResponse =
  {
    applications: [singleApplicationWithShortDescription],
    totalElements: 1,
  };

/**
 * @deprecated use shared/src/mocks/app-orch/catalog/applications.ts instead
 */
export const multipleApplicationsResponse: catalog.ListApplicationsResponse = {
  applications: multipleApplication,
  totalElements: 6,
};

/**
 * @deprecated use shared/src/mocks/app-orch/catalog/applications.ts instead
 */
export const applicationDetailsResponse: catalog.GetApplicationResponse = {
  application: applicationDetails,
};
