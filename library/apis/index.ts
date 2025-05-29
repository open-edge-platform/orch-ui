/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

export {
  appCatalogApis as catalogSlice,
  CatalogServiceListChartsApiArg,
  KINDS as CatalogKinds,
  UploadDeploymentPackageResponse as CatalogUploadDeploymentPackageResponse,
  useCatalogServiceListChartsQuery,
  useUploadDeploymentPackageMutation,
} from "./app-catalog/apiSlice";
export * as catalog from "./app-catalog/catalogServiceApis";
export { appDeploymentManagerApi as admSlice } from "./app-deploy-mgr/apiSlice";
export * as adm from "./app-deploy-mgr/deploymentManagerApis";
export { appResourceManagerApi as armSlice } from "./app-resource-mgr/apiSlice";
export * as arm from "./app-resource-mgr/resourceManagerApis";
export * as appUtilities from "./app-utilities/appUtilitiesServiceApis";
export { coApi as cmSlice } from "./cluster-manager/apiSlice";
export * as cm from "./cluster-manager/clusterManagerApis";
export { infraApi as infraSlice } from "./infra/apiSlice";
// Enhanced Api Slice
export * as enhancedInfraSlice from "./infra/enhancedApiSlice";
export * as infra from "./infra/infra";
export { metadataBrokerApi as mbSlice } from "./metadata-broker/apiSlice";
export * as mbApi from "./metadata-broker/generated";
export { observabilityMonitorApi as omSlice } from "./observabilityMonitor/apiSlice";
export * as omApi from "./observabilityMonitor/observabilityMonitorApi";
//vPRO remote provisioning
export { rpsApi as rpsSlice } from "./remote-provisioning/apiSlice";
export * as rps from "./remote-provisioning/remoteProvisioningApis";
export { tdmApi as tmSlice } from "./tenancy/apiSlice";
export * as tm from "./tenancy/tenancyDataModelApi";
