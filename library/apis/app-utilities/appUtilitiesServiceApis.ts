import { appUtilitiesApis as api } from "./apiSlice";
export const addTagTypes = ["CatalogService"] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      catalogServiceGetRegistryCharts: build.query<
        CatalogServiceGetRegistryChartsApiResponse,
        CatalogServiceGetRegistryChartsApiArg
      >({
        query: (queryArg) => ({
          url: `/v3/projects/${queryArg.projectName}/catalog/charts`,
          params: { registry: queryArg.registry, chart: queryArg.chart },
        }),
        providesTags: ["CatalogService"],
      }),
      catalogServiceDownloadDeploymentPackage: build.query<
        CatalogServiceDownloadDeploymentPackageApiResponse,
        CatalogServiceDownloadDeploymentPackageApiArg
      >({
        query: (queryArg) => ({
          url: `/v3/projects/${queryArg.projectName}/catalog/deployment_packages/${queryArg.deploymentPackageName}/versions/${queryArg.version}/download`,
          responseHandler: (response) => response.blob(),
          extraOptions: {
            skipCache: true, // Prevent caching the response in Redux state
          },
        }),
        keepUnusedDataFor: 0, // Don't keep data after it's used
        providesTags: ["CatalogService"],
      }),
      catalogServiceBulkCatalogUpload: build.mutation<
        CatalogServiceBulkCatalogUploadApiResponse,
        CatalogServiceBulkCatalogUploadApiArg
      >({
        query: (queryArg) => ({
          url: `/v3/projects/${queryArg.projectName}/catalog/upload`,
          method: "POST",
          body: queryArg.body,
        }),
        invalidatesTags: ["CatalogService"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as appUtilitiesServiceApis };
export type CatalogServiceGetRegistryChartsApiResponse =
  /** status 200 OK */ string[];
export type CatalogServiceGetRegistryChartsApiArg = {
  /** Names the HELM registry to be queried */
  registry?: string;
  /** Optional name of the chart whose version list is desired. */
  chart?: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type CatalogServiceDownloadDeploymentPackageApiResponse = unknown;
export type CatalogServiceDownloadDeploymentPackageApiArg = {
  /** Name of the DeploymentPackage. */
  deploymentPackageName: string;
  /** Version of the DeploymentPackage. */
  version: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type CatalogServiceBulkCatalogUploadApiResponse = /** status 200 OK */ {
  errorMessages?: string[];
  sessionID?: string;
  uploadNumber?: number;
}[];
export type CatalogServiceBulkCatalogUploadApiArg = {
  /** unique projectName for the resource */
  projectName: string;
  body: {
    files?: Blob[];
  };
};
export const {
  useCatalogServiceGetRegistryChartsQuery,
  useLazyCatalogServiceGetRegistryChartsQuery,
  useCatalogServiceDownloadDeploymentPackageQuery,
  useLazyCatalogServiceDownloadDeploymentPackageQuery,
  useCatalogServiceBulkCatalogUploadMutation,
} = injectedRtkApi;
