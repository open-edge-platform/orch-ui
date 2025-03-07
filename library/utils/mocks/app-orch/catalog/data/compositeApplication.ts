/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { catalog } from "@orch-ui/apis";
import { multipleApplication } from "./application";

/**
 * @deprecated use shared/src/mocks/app-orch/catalog/packages.ts instead
 */
export const ApplicationReferencesOne: catalog.ApplicationReference[] = [
  {
    name: "engage",
    version: "0.0.1",
  },
];

/**
 * @deprecated use shared/src/mocks/app-orch/catalog/packages.ts instead
 */
export const ApplicationReferencesTwo: catalog.ApplicationReference[] =
  multipleApplication.map((application) => ({
    name: application.name,
    version: application.version,
  }));

/**
 * @deprecated use shared/src/mocks/app-orch/catalog/packages.ts instead
 */
export const compositeApplicationDefault: catalog.DeploymentPackageRead = {
  applicationReferences: [],
  name: "defaultName",
  version: "defaultVersion",
  extensions: [],
  artifacts: [],
};

/**
 * @deprecated use shared/src/mocks/app-orch/catalog/packages.ts instead
 */
export const smallResponse: catalog.DeploymentPackageRead[] = [
  compositeApplicationDefault,
];

/**
 * @deprecated use shared/src/mocks/app-orch/catalog/packages.ts instead
 */
const CompositeApplicationOne: catalog.DeploymentPackageRead = {
  name: "intel-app-package-one",
  displayName: "intel-app-package-one",
  description:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
  version: "1.0.0",
  applicationReferences: ApplicationReferencesOne,
  isDeployed: false,
  isVisible: false,
  createTime: "2022-11-04T20:57:45.133Z",
  updateTime: "2022-11-11T11:05:31.109Z",
  extensions: [],
  artifacts: [],
};

/**
 * @deprecated use shared/src/mocks/app-orch/catalog/packages.ts instead
 */
const CompositeApplicationTwo: catalog.DeploymentPackageRead = {
  ...CompositeApplicationOne,
  applicationReferences: ApplicationReferencesTwo,
  name: "intel-app-package-two",
  displayName: "intel-app-package-two",
};

// Version one list
/**
 * @deprecated use shared/src/mocks/app-orch/catalog/packages.ts instead
 */
export const CompositeApplicationOneVersionOne: catalog.DeploymentPackageRead =
  {
    ...CompositeApplicationOne,
    version: "1.0.0",
  };

/**
 * @deprecated use shared/src/mocks/app-orch/catalog/packages.ts instead
 */
export const CompositeApplicationOneVersionTwo: catalog.DeploymentPackageRead =
  {
    ...CompositeApplicationOne,
    version: "2.0.0",
  };

/**
 * @deprecated use shared/src/mocks/app-orch/catalog/packages.ts instead
 */
export const CompositeApplicationOneVersionThree: catalog.DeploymentPackageRead =
  {
    ...CompositeApplicationOne,
    version: "3.0.0",
  };

/**
 * @deprecated use shared/src/mocks/app-orch/catalog/packages.ts instead
 */
export const CompositeApplicationTwoVersionOne: catalog.DeploymentPackageRead =
  {
    ...CompositeApplicationTwo,
    version: "1.0.0",
  };

/**
 * @deprecated use shared/src/mocks/app-orch/catalog/packages.ts instead
 */
export const CompositeApplicationList: catalog.DeploymentPackageRead[] = [
  CompositeApplicationOne,
  CompositeApplicationTwo,
];

/**
 * @deprecated use shared/src/mocks/app-orch/catalog/packages.ts instead
 */
export const CompositeApplicationOneVersionList: catalog.DeploymentPackageRead[] =
  [
    CompositeApplicationOneVersionOne,
    CompositeApplicationOneVersionTwo,
    CompositeApplicationOneVersionThree,
  ];

/**
 * @deprecated use shared/src/mocks/app-orch/catalog/packages.ts instead
 */
export const CompositeApplicationTwoVersionList: catalog.DeploymentPackageRead[] =
  [CompositeApplicationTwoVersionOne];
