/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

export * from "./data/deploymentApps"; /** @deprecated */
export * from "./data/deploymentClusters"; /** @deprecated */
export * from "./data/deployments"; /** @deprecated */
export * from "./data/ids"; /** @deprecated */
export * from "./data/listCompositeApplicationResponse"; /** @deprecated */
export * from "./data/vms"; /** @deprecated */

/** current */
export * from "./data/appDeploymentManagerIds";
export * from "./data/appResourceManagerIds";
export * from "./deployments";
export * from "./uiExtensions";
export * from "./clusters";
export * as deploymentManager from "./deploymentManager"; 
export * as appResourceManager from "./appResourceManager"; 


