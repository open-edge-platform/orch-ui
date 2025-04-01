/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { catalog, CatalogKinds } from "@orch-ui/apis";
import {
  appForEditDeployment1,
  appForEditDeployment2,
  applicationEight,
  applicationFive,
  applicationFour,
  applicationNine,
  applicationOne,
  applicationSeven,
  applicationSix,
  applicationThree,
  applicationTwo,
  appWithParameterTemplates,
} from "./applications";
import CatalogStore from "./baseStore";
import {
  appPackageOneName,
  appPackageOneNameExtension,
  appPackageOneVersionOne,
  appPackageOneVersionTwo,
  appPackageThreeName,
  appPackageThreeVersion,
  appPackageTwoName,
  appPackageTwoNameExtension,
  appPackageTwoVersion,
  appUnknownName,
  appUnknownVersion,
} from "./data/appCatalogIds";
import {
  packageOneDescription,
  packageThreeDescription,
  packageTwoDescription,
} from "./data/appCatalogInfo";
import {
  deploymentProfileOne,
  deploymentProfileTwo,
} from "./deploymentProfiles";
import { profileOne } from "./profiles";

export const packageOne: catalog.DeploymentPackageRead = {
  applicationReferences: [
    {
      name: applicationTwo.name,
      version: applicationTwo.version,
    },
    {
      name: applicationThree.name,
      version: applicationThree.version,
      /* NOTE: This `publisherName` is intentionally not set */
    },
    {
      name: applicationFive.name,
      version: applicationFive.version,
    },
    {
      name: applicationSix.name,
      version: applicationSix.version,
    },
    {
      name: applicationSeven.name,
      version: applicationSeven.version,
    },
    {
      // Fake/Corrupted application
      name: appUnknownName,
      version: appUnknownVersion,
    },
  ],
  artifacts: [],
  extensions: [],
  name: appPackageOneName,
  displayName: appPackageOneName,
  version: appPackageOneVersionOne,
  description: packageOneDescription,
  isDeployed: true,
  profiles: [
    {
      name: "default-profile",
      applicationProfiles: { [applicationTwo.name]: profileOne.name },
    },
  ],
  kind: "KIND_NORMAL",
};

export const packageOneExtension: catalog.DeploymentPackageRead = {
  applicationReferences: [
    {
      name: applicationTwo.name,
      version: applicationTwo.version,
    },
    {
      name: applicationThree.name,
      version: applicationThree.version,
      /* NOTE: This `publisherName` is intentionally not set */
    },
    {
      name: applicationFive.name,
      version: applicationFive.version,
    },
    {
      name: applicationSix.name,
      version: applicationSix.version,
    },
    {
      name: applicationSeven.name,
      version: applicationSeven.version,
    },
    {
      // Fake/Corrupted application
      name: appUnknownName,
      version: appUnknownVersion,
    },
  ],
  artifacts: [],
  extensions: [],
  name: appPackageOneNameExtension,
  displayName: appPackageOneNameExtension,
  version: appPackageOneVersionOne,
  description: packageOneDescription,
  isDeployed: true,
  profiles: [
    {
      name: "default-profile",
      applicationProfiles: { [applicationTwo.name]: profileOne.name },
    },
  ],
  kind: "KIND_EXTENSION",
};

export const packageTwo: catalog.DeploymentPackageRead = {
  ...packageOne,
  name: "smart-inventory-package-two",
  version: appPackageOneVersionTwo,
  isDeployed: false,
  createTime: new Date("11/12/2023").toDateString(),
  applicationReferences: [
    {
      name: applicationTwo.name,
      version: applicationTwo.version,
    },
    {
      name: applicationThree.name,
      version: applicationThree.version,
    },
    {
      name: applicationFour.name,
      version: applicationFour.version,
    },
    {
      name: applicationFive.name,
      version: applicationFive.version,
    },
    {
      name: applicationSix.name,
      version: applicationSix.version,
    },
    {
      name: applicationSeven.name,
      version: applicationSeven.version,
    },
  ],
  kind: "KIND_NORMAL",
};

export const packageTwoExtension: catalog.DeploymentPackageRead = {
  ...packageOne,
  name: appPackageTwoNameExtension,
  displayName: appPackageTwoNameExtension,
  version: appPackageOneVersionTwo,
  isDeployed: false,
  createTime: new Date("11/12/2023").toDateString(),
  applicationReferences: [
    {
      name: applicationTwo.name,
      version: applicationTwo.version,
    },
    {
      name: applicationThree.name,
      version: applicationThree.version,
    },
    {
      name: applicationFour.name,
      version: applicationFour.version,
    },
    {
      name: applicationFive.name,
      version: applicationFive.version,
    },
    {
      name: applicationSix.name,
      version: applicationSix.version,
    },
    {
      name: applicationSeven.name,
      version: applicationSeven.version,
    },
  ],
  kind: "KIND_EXTENSION",
};

export const packageThree: catalog.DeploymentPackageRead = {
  applicationReferences: [
    {
      name: applicationTwo.name,
      version: applicationTwo.version,
    },
    {
      name: applicationThree.name,
      version: applicationThree.version,
    },
    {
      name: applicationFour.name,
      version: applicationFour.version,
    },
    {
      name: applicationFive.name,
      version: applicationFive.version,
    },
    {
      name: applicationSix.name,
      version: applicationSix.version,
    },
    {
      name: applicationSeven.name,
      version: applicationSeven.version,
    },
  ],
  artifacts: [],
  extensions: [],
  name: appPackageTwoName,
  kind: "KIND_NORMAL",
  displayName: appPackageTwoName,
  version: appPackageTwoVersion,
  description: packageTwoDescription,
  isDeployed: true,
  profiles: [],
  // This package doesn't have defaultProfileName intentionally.
};

export const packageFour: catalog.DeploymentPackageRead = {
  applicationReferences: [
    {
      name: applicationOne.name,
      version: applicationOne.version,
    },
    {
      name: applicationTwo.name,
      version: applicationTwo.version,
    },
    {
      name: applicationThree.name,
      version: applicationThree.version,
    },
    {
      name: applicationFive.name,
      version: applicationFive.version,
    },
    {
      name: applicationSix.name,
      version: applicationSix.version,
    },
    {
      name: applicationSeven.name,
      version: applicationSeven.version,
    },
    {
      name: applicationEight.name,
      version: applicationEight.version,
    },
    {
      name: applicationNine.name,
      version: applicationNine.version,
    },
  ],
  artifacts: [],
  extensions: [],
  name: appPackageThreeName,
  displayName: appPackageThreeName,
  version: appPackageThreeVersion,
  description: packageThreeDescription,
  isDeployed: true,
  profiles: [deploymentProfileOne, deploymentProfileTwo],
  defaultProfileName: deploymentProfileOne.name,
  kind: "KIND_NORMAL",
};

/**
 * Deployment package to test parameter templates.
 * It contains a single app (llama2) which has 2 profiles (cpu, gpu)
 * The gpu profile contains a parameter template.
 * The DP will have 2 profiles:
 * - low-perf (default) uses the cpu profile
 * - high-perf uses the gpu profile (has a parameter template)
 */
export const packageWithParameterTemplates: catalog.DeploymentPackageRead = {
  applicationReferences: [
    {
      name: appWithParameterTemplates.name,
      version: appWithParameterTemplates.version,
    },
  ],
  artifacts: [],
  extensions: [],
  name: "DP with Template",
  version: "1.0.0-dev",
  defaultProfileName: "low-perf",
  profiles: [
    {
      name: "low-perf",
      applicationProfiles: {
        [appWithParameterTemplates.name]:
          appWithParameterTemplates.profiles![0].name,
      },
    },
    {
      name: "high-perf",
      applicationProfiles: {
        [appWithParameterTemplates.name]:
          appWithParameterTemplates.profiles![1].name,
      },
    },
  ],
  kind: "KIND_NORMAL",
};

export const packageForEditDeployment: catalog.DeploymentPackageRead = {
  name: "package-for-edit-deployment",
  version: "1.0.0",
  kind: "KIND_NORMAL",
  artifacts: [],
  extensions: [],
  applicationReferences: [
    {
      name: appForEditDeployment1.name,
      version: appForEditDeployment1.version,
    },
    {
      name: appForEditDeployment2.name,
      version: appForEditDeployment2.version,
    },
  ],
  defaultProfileName: "min",
  profiles: [
    {
      name: "min",
      applicationProfiles: {
        [appForEditDeployment1.name]: appForEditDeployment1.profiles![0].name,
        [appForEditDeployment2.name]: appForEditDeployment2.profiles![0].name,
      },
    },
    {
      name: "max",
      applicationProfiles: {
        [appForEditDeployment1.name]: appForEditDeployment1.profiles![1].name,
        [appForEditDeployment2.name]: appForEditDeployment2.profiles![1].name,
      },
    },
  ],
};

export class DeploymentPackagesStore extends CatalogStore<catalog.DeploymentPackageRead> {
  constructor() {
    super([
      packageOne,
      packageTwo,
      packageThree,
      packageFour,
      packageWithParameterTemplates,
      packageOneExtension,
      packageTwoExtension,
      packageForEditDeployment,
    ]);
  }

  post(body: catalog.DeploymentPackageRead): catalog.DeploymentPackageRead {
    this.resources.push(body);
    return body;
  }

  filter(
    searchTerm: string | undefined,
    pkgs: catalog.DeploymentPackageRead[],
  ): catalog.DeploymentPackageRead[] {
    if (!searchTerm || searchTerm === null || searchTerm.trim().length === 0)
      return pkgs;
    const searchTermValue = searchTerm.split("OR")[0].split("=")[1];
    const result = pkgs.filter((pkg: catalog.DeploymentPackageRead) => {
      return (
        pkg.name.includes(searchTermValue) ||
        pkg.displayName?.includes(searchTermValue) ||
        pkg.version?.includes(searchTermValue) ||
        pkg.description?.includes(searchTermValue)
      );
    });
    return result;
  }

  sort(
    orderBy: string | undefined,
    pkgs: catalog.DeploymentPackageRead[],
  ): catalog.DeploymentPackageRead[] {
    if (!orderBy || orderBy === null || orderBy.trim().length === 0)
      return pkgs;
    const column: "name" | "description" | "version" = orderBy.split(" ")[0] as
      | "name"
      | "description"
      | "version";
    const direction = orderBy.split(" ")[1];

    pkgs.sort((a, b) => {
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

    return pkgs;
  }

  getByPackagesKind(
    packages: catalog.DeploymentPackageRead[],
    kind: CatalogKinds,
  ) {
    if (!kind) return packages; // Retuns all kinds
    return packages.filter((pckg) => pckg.kind === kind);
  }
}
