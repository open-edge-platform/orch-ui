import { appCatalogApis as api } from "./apiSlice";
export const addTagTypes = ["CatalogService"] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      catalogServiceListApplications: build.query<
        CatalogServiceListApplicationsApiResponse,
        CatalogServiceListApplicationsApiArg
      >({
        query: (queryArg) => ({
          url: `/v3/projects/${queryArg.projectName}/catalog/applications`,
          params: {
            orderBy: queryArg.orderBy,
            filter: queryArg.filter,
            pageSize: queryArg.pageSize,
            offset: queryArg.offset,
            kinds: queryArg.kinds,
          },
        }),
        providesTags: ["CatalogService"],
      }),
      catalogServiceCreateApplication: build.mutation<
        CatalogServiceCreateApplicationApiResponse,
        CatalogServiceCreateApplicationApiArg
      >({
        query: (queryArg) => ({
          url: `/v3/projects/${queryArg.projectName}/catalog/applications`,
          method: "POST",
          body: queryArg.application,
        }),
        invalidatesTags: ["CatalogService"],
      }),
      catalogServiceGetApplicationVersions: build.query<
        CatalogServiceGetApplicationVersionsApiResponse,
        CatalogServiceGetApplicationVersionsApiArg
      >({
        query: (queryArg) => ({
          url: `/v3/projects/${queryArg.projectName}/catalog/applications/${queryArg.applicationName}/versions`,
        }),
        providesTags: ["CatalogService"],
      }),
      catalogServiceDeleteApplication: build.mutation<
        CatalogServiceDeleteApplicationApiResponse,
        CatalogServiceDeleteApplicationApiArg
      >({
        query: (queryArg) => ({
          url: `/v3/projects/${queryArg.projectName}/catalog/applications/${queryArg.applicationName}/versions/${queryArg.version}`,
          method: "DELETE",
        }),
        invalidatesTags: ["CatalogService"],
      }),
      catalogServiceGetApplication: build.query<
        CatalogServiceGetApplicationApiResponse,
        CatalogServiceGetApplicationApiArg
      >({
        query: (queryArg) => ({
          url: `/v3/projects/${queryArg.projectName}/catalog/applications/${queryArg.applicationName}/versions/${queryArg.version}`,
        }),
        providesTags: ["CatalogService"],
      }),
      catalogServiceUpdateApplication: build.mutation<
        CatalogServiceUpdateApplicationApiResponse,
        CatalogServiceUpdateApplicationApiArg
      >({
        query: (queryArg) => ({
          url: `/v3/projects/${queryArg.projectName}/catalog/applications/${queryArg.applicationName}/versions/${queryArg.version}`,
          method: "PUT",
          body: queryArg.application,
        }),
        invalidatesTags: ["CatalogService"],
      }),
      catalogServiceGetApplicationReferenceCount: build.query<
        CatalogServiceGetApplicationReferenceCountApiResponse,
        CatalogServiceGetApplicationReferenceCountApiArg
      >({
        query: (queryArg) => ({
          url: `/v3/projects/${queryArg.projectName}/catalog/applications/${queryArg.applicationName}/versions/${queryArg.version}/reference_count`,
        }),
        providesTags: ["CatalogService"],
      }),
      catalogServiceListArtifacts: build.query<
        CatalogServiceListArtifactsApiResponse,
        CatalogServiceListArtifactsApiArg
      >({
        query: (queryArg) => ({
          url: `/v3/projects/${queryArg.projectName}/catalog/artifacts`,
          params: {
            orderBy: queryArg.orderBy,
            filter: queryArg.filter,
            pageSize: queryArg.pageSize,
            offset: queryArg.offset,
          },
        }),
        providesTags: ["CatalogService"],
      }),
      catalogServiceCreateArtifact: build.mutation<
        CatalogServiceCreateArtifactApiResponse,
        CatalogServiceCreateArtifactApiArg
      >({
        query: (queryArg) => ({
          url: `/v3/projects/${queryArg.projectName}/catalog/artifacts`,
          method: "POST",
          body: queryArg.artifact,
        }),
        invalidatesTags: ["CatalogService"],
      }),
      catalogServiceDeleteArtifact: build.mutation<
        CatalogServiceDeleteArtifactApiResponse,
        CatalogServiceDeleteArtifactApiArg
      >({
        query: (queryArg) => ({
          url: `/v3/projects/${queryArg.projectName}/catalog/artifacts/${queryArg.artifactName}`,
          method: "DELETE",
        }),
        invalidatesTags: ["CatalogService"],
      }),
      catalogServiceGetArtifact: build.query<
        CatalogServiceGetArtifactApiResponse,
        CatalogServiceGetArtifactApiArg
      >({
        query: (queryArg) => ({
          url: `/v3/projects/${queryArg.projectName}/catalog/artifacts/${queryArg.artifactName}`,
        }),
        providesTags: ["CatalogService"],
      }),
      catalogServiceUpdateArtifact: build.mutation<
        CatalogServiceUpdateArtifactApiResponse,
        CatalogServiceUpdateArtifactApiArg
      >({
        query: (queryArg) => ({
          url: `/v3/projects/${queryArg.projectName}/catalog/artifacts/${queryArg.artifactName}`,
          method: "PUT",
          body: queryArg.artifact,
        }),
        invalidatesTags: ["CatalogService"],
      }),
      catalogServiceListDeploymentPackages: build.query<
        CatalogServiceListDeploymentPackagesApiResponse,
        CatalogServiceListDeploymentPackagesApiArg
      >({
        query: (queryArg) => ({
          url: `/v3/projects/${queryArg.projectName}/catalog/deployment_packages`,
          params: {
            orderBy: queryArg.orderBy,
            filter: queryArg.filter,
            pageSize: queryArg.pageSize,
            offset: queryArg.offset,
            kinds: queryArg.kinds,
          },
        }),
        providesTags: ["CatalogService"],
      }),
      catalogServiceCreateDeploymentPackage: build.mutation<
        CatalogServiceCreateDeploymentPackageApiResponse,
        CatalogServiceCreateDeploymentPackageApiArg
      >({
        query: (queryArg) => ({
          url: `/v3/projects/${queryArg.projectName}/catalog/deployment_packages`,
          method: "POST",
          body: queryArg.deploymentPackage,
        }),
        invalidatesTags: ["CatalogService"],
      }),
      catalogServiceGetDeploymentPackageVersions: build.query<
        CatalogServiceGetDeploymentPackageVersionsApiResponse,
        CatalogServiceGetDeploymentPackageVersionsApiArg
      >({
        query: (queryArg) => ({
          url: `/v3/projects/${queryArg.projectName}/catalog/deployment_packages/${queryArg.deploymentPackageName}/versions`,
        }),
        providesTags: ["CatalogService"],
      }),
      catalogServiceDeleteDeploymentPackage: build.mutation<
        CatalogServiceDeleteDeploymentPackageApiResponse,
        CatalogServiceDeleteDeploymentPackageApiArg
      >({
        query: (queryArg) => ({
          url: `/v3/projects/${queryArg.projectName}/catalog/deployment_packages/${queryArg.deploymentPackageName}/versions/${queryArg.version}`,
          method: "DELETE",
        }),
        invalidatesTags: ["CatalogService"],
      }),
      catalogServiceGetDeploymentPackage: build.query<
        CatalogServiceGetDeploymentPackageApiResponse,
        CatalogServiceGetDeploymentPackageApiArg
      >({
        query: (queryArg) => ({
          url: `/v3/projects/${queryArg.projectName}/catalog/deployment_packages/${queryArg.deploymentPackageName}/versions/${queryArg.version}`,
        }),
        providesTags: ["CatalogService"],
      }),
      catalogServiceUpdateDeploymentPackage: build.mutation<
        CatalogServiceUpdateDeploymentPackageApiResponse,
        CatalogServiceUpdateDeploymentPackageApiArg
      >({
        query: (queryArg) => ({
          url: `/v3/projects/${queryArg.projectName}/catalog/deployment_packages/${queryArg.deploymentPackageName}/versions/${queryArg.version}`,
          method: "PUT",
          body: queryArg.deploymentPackage,
        }),
        invalidatesTags: ["CatalogService"],
      }),
      catalogServiceListRegistries: build.query<
        CatalogServiceListRegistriesApiResponse,
        CatalogServiceListRegistriesApiArg
      >({
        query: (queryArg) => ({
          url: `/v3/projects/${queryArg.projectName}/catalog/registries`,
          params: {
            orderBy: queryArg.orderBy,
            filter: queryArg.filter,
            pageSize: queryArg.pageSize,
            offset: queryArg.offset,
            showSensitiveInfo: queryArg.showSensitiveInfo,
          },
        }),
        providesTags: ["CatalogService"],
      }),
      catalogServiceCreateRegistry: build.mutation<
        CatalogServiceCreateRegistryApiResponse,
        CatalogServiceCreateRegistryApiArg
      >({
        query: (queryArg) => ({
          url: `/v3/projects/${queryArg.projectName}/catalog/registries`,
          method: "POST",
          body: queryArg.registry,
        }),
        invalidatesTags: ["CatalogService"],
      }),
      catalogServiceDeleteRegistry: build.mutation<
        CatalogServiceDeleteRegistryApiResponse,
        CatalogServiceDeleteRegistryApiArg
      >({
        query: (queryArg) => ({
          url: `/v3/projects/${queryArg.projectName}/catalog/registries/${queryArg.registryName}`,
          method: "DELETE",
        }),
        invalidatesTags: ["CatalogService"],
      }),
      catalogServiceGetRegistry: build.query<
        CatalogServiceGetRegistryApiResponse,
        CatalogServiceGetRegistryApiArg
      >({
        query: (queryArg) => ({
          url: `/v3/projects/${queryArg.projectName}/catalog/registries/${queryArg.registryName}`,
          params: { showSensitiveInfo: queryArg.showSensitiveInfo },
        }),
        providesTags: ["CatalogService"],
      }),
      catalogServiceUpdateRegistry: build.mutation<
        CatalogServiceUpdateRegistryApiResponse,
        CatalogServiceUpdateRegistryApiArg
      >({
        query: (queryArg) => ({
          url: `/v3/projects/${queryArg.projectName}/catalog/registries/${queryArg.registryName}`,
          method: "PUT",
          body: queryArg.registry,
        }),
        invalidatesTags: ["CatalogService"],
      }),
      catalogServiceUploadCatalogEntities: build.mutation<
        CatalogServiceUploadCatalogEntitiesApiResponse,
        CatalogServiceUploadCatalogEntitiesApiArg
      >({
        query: (queryArg) => ({
          url: `/v3/projects/${queryArg.projectName}/catalog/uploads`,
          method: "POST",
          body: queryArg.upload,
          params: {
            sessionId: queryArg.sessionId,
            uploadNumber: queryArg.uploadNumber,
            lastUpload: queryArg.lastUpload,
          },
        }),
        invalidatesTags: ["CatalogService"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as catalogServiceApis };
export type CatalogServiceListApplicationsApiResponse =
  /** status 200 OK */ ListApplicationsResponseRead;
export type CatalogServiceListApplicationsApiArg = {
  /** Names the field to be used for ordering the returned results. */
  orderBy?: string;
  /** Expression to use for filtering the results. */
  filter?: string;
  /** Maximum number of items to return. */
  pageSize?: number;
  /** Index of the first item to return. */
  offset?: number;
  /** List of application kinds to be returned; empty list means all kinds. */
  kinds?: ("KIND_NORMAL" | "KIND_EXTENSION" | "KIND_ADDON")[];
  /** unique projectName for the resource */
  projectName: string;
};
export type CatalogServiceCreateApplicationApiResponse =
  /** status 200 OK */ CreateApplicationResponseRead;
export type CatalogServiceCreateApplicationApiArg = {
  /** unique projectName for the resource */
  projectName: string;
  application: Application;
};
export type CatalogServiceGetApplicationVersionsApiResponse =
  /** status 200 OK */ GetApplicationVersionsResponseRead;
export type CatalogServiceGetApplicationVersionsApiArg = {
  /** Name of the application. */
  applicationName: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type CatalogServiceDeleteApplicationApiResponse = unknown;
export type CatalogServiceDeleteApplicationApiArg = {
  /** Name of the application. */
  applicationName: string;
  /** Version of the application. */
  version: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type CatalogServiceGetApplicationApiResponse =
  /** status 200 OK */ GetApplicationResponseRead;
export type CatalogServiceGetApplicationApiArg = {
  /** Name of the application. */
  applicationName: string;
  /** Version of the application. */
  version: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type CatalogServiceUpdateApplicationApiResponse = unknown;
export type CatalogServiceUpdateApplicationApiArg = {
  /** Name of the application. */
  applicationName: string;
  /** Version of the application. */
  version: string;
  /** unique projectName for the resource */
  projectName: string;
  application: Application;
};
export type CatalogServiceGetApplicationReferenceCountApiResponse =
  /** status 200 OK */ GetApplicationReferenceCountResponse;
export type CatalogServiceGetApplicationReferenceCountApiArg = {
  /** Name of the application. */
  applicationName: string;
  /** Version of the application. */
  version: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type CatalogServiceListArtifactsApiResponse =
  /** status 200 OK */ ListArtifactsResponseRead;
export type CatalogServiceListArtifactsApiArg = {
  /** Names the field to be used for ordering the returned results. */
  orderBy?: string;
  /** Expression to use for filtering the results. */
  filter?: string;
  /** Maximum number of items to return. */
  pageSize?: number;
  /** Index of the first item to return. */
  offset?: number;
  /** unique projectName for the resource */
  projectName: string;
};
export type CatalogServiceCreateArtifactApiResponse =
  /** status 200 OK */ CreateArtifactResponseRead;
export type CatalogServiceCreateArtifactApiArg = {
  /** unique projectName for the resource */
  projectName: string;
  artifact: Artifact;
};
export type CatalogServiceDeleteArtifactApiResponse = unknown;
export type CatalogServiceDeleteArtifactApiArg = {
  /** Name of the artifact. */
  artifactName: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type CatalogServiceGetArtifactApiResponse =
  /** status 200 OK */ GetArtifactResponseRead;
export type CatalogServiceGetArtifactApiArg = {
  /** Name of the artifact. */
  artifactName: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type CatalogServiceUpdateArtifactApiResponse = unknown;
export type CatalogServiceUpdateArtifactApiArg = {
  /** Name of the artifact. */
  artifactName: string;
  /** unique projectName for the resource */
  projectName: string;
  artifact: Artifact;
};
export type CatalogServiceListDeploymentPackagesApiResponse =
  /** status 200 OK */ ListDeploymentPackagesResponseRead;
export type CatalogServiceListDeploymentPackagesApiArg = {
  /** Names the field to be used for ordering the returned results. */
  orderBy?: string;
  /** Expression to use for filtering the results. */
  filter?: string;
  /** Maximum number of items to return. */
  pageSize?: number;
  /** Index of the first item to return. */
  offset?: number;
  /** List of deployment package kinds to be returned; empty list means all kinds. */
  kinds?: ("KIND_NORMAL" | "KIND_EXTENSION" | "KIND_ADDON")[];
  /** unique projectName for the resource */
  projectName: string;
};
export type CatalogServiceCreateDeploymentPackageApiResponse =
  /** status 200 OK */ CreateDeploymentPackageResponseRead;
export type CatalogServiceCreateDeploymentPackageApiArg = {
  /** unique projectName for the resource */
  projectName: string;
  deploymentPackage: DeploymentPackage;
};
export type CatalogServiceGetDeploymentPackageVersionsApiResponse =
  /** status 200 OK */ GetDeploymentPackageVersionsResponseRead;
export type CatalogServiceGetDeploymentPackageVersionsApiArg = {
  /** Name of the DeploymentPackage. */
  deploymentPackageName: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type CatalogServiceDeleteDeploymentPackageApiResponse = unknown;
export type CatalogServiceDeleteDeploymentPackageApiArg = {
  /** Name of the DeploymentPackage. */
  deploymentPackageName: string;
  /** Version of the DeploymentPackage. */
  version: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type CatalogServiceGetDeploymentPackageApiResponse =
  /** status 200 OK */ GetDeploymentPackageResponseRead;
export type CatalogServiceGetDeploymentPackageApiArg = {
  /** Name of the DeploymentPackage. */
  deploymentPackageName: string;
  /** Version of the DeploymentPackage. */
  version: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type CatalogServiceUpdateDeploymentPackageApiResponse = unknown;
export type CatalogServiceUpdateDeploymentPackageApiArg = {
  /** Name of the DeploymentPackage. */
  deploymentPackageName: string;
  /** Version of the DeploymentPackage. */
  version: string;
  /** unique projectName for the resource */
  projectName: string;
  deploymentPackage: DeploymentPackage;
};
export type CatalogServiceListRegistriesApiResponse =
  /** status 200 OK */ ListRegistriesResponseRead;
export type CatalogServiceListRegistriesApiArg = {
  /** Names the field to be used for ordering the returned results. */
  orderBy?: string;
  /** Expression to use for filtering the results. */
  filter?: string;
  /** Maximum number of items to return. */
  pageSize?: number;
  /** Index of the first item to return. */
  offset?: number;
  /** Request that sensitive information, such as username, auth_token, and CA certificates are included in the response. */
  showSensitiveInfo?: boolean;
  /** unique projectName for the resource */
  projectName: string;
};
export type CatalogServiceCreateRegistryApiResponse =
  /** status 200 OK */ CreateRegistryResponseRead;
export type CatalogServiceCreateRegistryApiArg = {
  /** unique projectName for the resource */
  projectName: string;
  registry: Registry;
};
export type CatalogServiceDeleteRegistryApiResponse = unknown;
export type CatalogServiceDeleteRegistryApiArg = {
  /** Name of the registry. */
  registryName: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type CatalogServiceGetRegistryApiResponse =
  /** status 200 OK */ GetRegistryResponseRead;
export type CatalogServiceGetRegistryApiArg = {
  /** Name of the registry. */
  registryName: string;
  /** Request that sensitive information, such as username, auth_token, and CA certificates are included in the response. */
  showSensitiveInfo?: boolean;
  /** unique projectName for the resource */
  projectName: string;
};
export type CatalogServiceUpdateRegistryApiResponse = unknown;
export type CatalogServiceUpdateRegistryApiArg = {
  /** Name of the Registry. */
  registryName: string;
  /** unique projectName for the resource */
  projectName: string;
  registry: Registry;
};
export type CatalogServiceUploadCatalogEntitiesApiResponse =
  /** status 200 OK */ UploadCatalogEntitiesResponse;
export type CatalogServiceUploadCatalogEntitiesApiArg = {
  /** First upload request in the batch must not specify session ID. Subsequent upload requests must copy the session ID from the previously issued response. */
  sessionId?: string;
  /** Deprecated: Upload number must increase sequentially, starting with 1. */
  uploadNumber?: number;
  /** Must be set to 'true' to perform load of all entity files uploaded as part of this session. */
  lastUpload?: boolean;
  /** unique projectName for the resource */
  projectName: string;
  upload: Upload;
};
export type ResourceReference = {
  /** Kubernetes resource kind, e.g. ConfigMap. */
  kind: string;
  /** Kubernetes resource name. */
  name: string;
  /** Kubernetes namespace where the ignored resource resides. When empty, the application namespace will be used. */
  namespace?: string;
};
export type DeploymentRequirement = {
  /** Optional name of the deployment profile to be used. When not provided, the default deployment profile will be used. */
  deploymentProfileName?: string;
  /** Name of the required deployment package. */
  name: string;
  /** Version of the required deployment package. */
  version: string;
};
export type ParameterTemplate = {
  /** Default value for the parameter. */
  default?: string;
  /** Display name is an optional human-readable name for the template. It is used for display purposes on user interfaces. */
  displayName?: string;
  /** Optional mandatory flag for the parameter. */
  mandatory?: boolean;
  /** Human-readable name for the parameter template. */
  name: string;
  /** Optional secret flag for the parameter. */
  secret?: boolean;
  /** List of suggested values to use, to override the default value. */
  suggestedValues?: string[];
  /** Type of parameter: string, number, or boolean. */
  type: string;
  /** Optional validator for the parameter. Usage TBD. */
  validator?: string;
};
export type Profile = {
  /** Raw byte value containing the chart values as raw YAML bytes. */
  chartValues?: string;
  /** List of deployment requirements for this profile. */
  deploymentRequirement?: DeploymentRequirement[];
  /** Description of the profile. Displayed on user interfaces. */
  description?: string;
  /** Display name is an optional human-readable name for the profile. When specified, it must be unique among all profiles of a given application. It is used for display purposes on user interfaces. */
  displayName?: string;
  /** Human-readable name for the profile. Unique among all profiles of the same application. */
  name: string;
  /** Parameter templates available for this profile. */
  parameterTemplates?: ParameterTemplate[];
};
export type ProfileRead = {
  /** Raw byte value containing the chart values as raw YAML bytes. */
  chartValues?: string;
  /** The creation time of the profile. */
  createTime?: string;
  /** List of deployment requirements for this profile. */
  deploymentRequirement?: DeploymentRequirement[];
  /** Description of the profile. Displayed on user interfaces. */
  description?: string;
  /** Display name is an optional human-readable name for the profile. When specified, it must be unique among all profiles of a given application. It is used for display purposes on user interfaces. */
  displayName?: string;
  /** Human-readable name for the profile. Unique among all profiles of the same application. */
  name: string;
  /** Parameter templates available for this profile. */
  parameterTemplates?: ParameterTemplate[];
  /** The last update time of the profile. */
  updateTime?: string;
};
export type Application = {
  /** Helm chart name. */
  chartName: string;
  /** Helm chart version. */
  chartVersion: string;
  /** Name of the profile to be used by default when deploying this application. If at least one profile is available, this field must be set. */
  defaultProfileName?: string;
  /** Description of the application. Displayed on user interfaces. */
  description?: string;
  /** Display name is an optional human-readable name for the application. When specified, it must be unique among all applications within a project. It is used for display purposes on user interfaces. */
  displayName?: string;
  /** ID of the project's registry where the Helm chart of the application is available for download. */
  helmRegistryName: string;
  /** List of Kubernetes resources that must be ignored during the application deployment. */
  ignoredResources?: ResourceReference[];
  /** ID of the project's registry where the Docker image of the application is available for download. */
  imageRegistryName?: string;
  /** Field designating whether the application is a system add-on, system extension, or a normal application. */
  kind?: "KIND_NORMAL" | "KIND_EXTENSION" | "KIND_ADDON";
  /** Name is a human readable unique identifier for the application and must be unique for all applications of a given project. Used in network URIs. */
  name: string;
  /** Set of profiles that can be used when deploying the application. */
  profiles?: Profile[];
  /** Version of the application. Used in combination with the name to identify a unique application within a project. */
  version: string;
};
export type ApplicationRead = {
  /** Helm chart name. */
  chartName: string;
  /** Helm chart version. */
  chartVersion: string;
  /** The creation time of the application. */
  createTime?: string;
  /** Name of the profile to be used by default when deploying this application. If at least one profile is available, this field must be set. */
  defaultProfileName?: string;
  /** Description of the application. Displayed on user interfaces. */
  description?: string;
  /** Display name is an optional human-readable name for the application. When specified, it must be unique among all applications within a project. It is used for display purposes on user interfaces. */
  displayName?: string;
  /** ID of the project's registry where the Helm chart of the application is available for download. */
  helmRegistryName: string;
  /** List of Kubernetes resources that must be ignored during the application deployment. */
  ignoredResources?: ResourceReference[];
  /** ID of the project's registry where the Docker image of the application is available for download. */
  imageRegistryName?: string;
  /** Field designating whether the application is a system add-on, system extension, or a normal application. */
  kind?: "KIND_NORMAL" | "KIND_EXTENSION" | "KIND_ADDON";
  /** Name is a human readable unique identifier for the application and must be unique for all applications of a given project. Used in network URIs. */
  name: string;
  /** Set of profiles that can be used when deploying the application. */
  profiles?: ProfileRead[];
  /** The last update time of the application. */
  updateTime?: string;
  /** Version of the application. Used in combination with the name to identify a unique application within a project. */
  version: string;
};
export type ListApplicationsResponse = {
  /** A list of applications. */
  applications: Application[];
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
};
export type ListApplicationsResponseRead = {
  /** A list of applications. */
  applications: ApplicationRead[];
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
};
export type CreateApplicationResponse = {
  application: Application;
};
export type CreateApplicationResponseRead = {
  application: ApplicationRead;
};
export type GetApplicationVersionsResponse = {
  /** A list of applications with the same project and name. */
  application: Application[];
};
export type GetApplicationVersionsResponseRead = {
  /** A list of applications with the same project and name. */
  application: ApplicationRead[];
};
export type GetApplicationResponse = {
  application: Application;
};
export type GetApplicationResponseRead = {
  application: ApplicationRead;
};
export type GetApplicationReferenceCountResponse = {
  referenceCount: number;
};
export type Artifact = {
  /** Raw byte content of the artifact encoded as base64. The limits refer to the number of raw bytes. */
  artifact: string;
  /** Description of the artifact. Displayed on user interfaces. */
  description?: string;
  /** Display name is an optional human-readable name for the artifact. When specified, it must be unique among all artifacts within a project. It is used for display purposes on user interfaces. */
  displayName?: string;
  /** Artifact's MIME type. Only text/plain, application/json, application/yaml, image/png, and image/jpeg are allowed at this time. MIME types are defined and standardized in IETF's RFC 6838. */
  mimeType: string;
  /** Name is a human-readable unique identifier for the artifact and must be unique for all artifacts within a project. */
  name: string;
};
export type ArtifactRead = {
  /** Raw byte content of the artifact encoded as base64. The limits refer to the number of raw bytes. */
  artifact: string;
  /** The creation time of the artifact. */
  createTime?: string;
  /** Description of the artifact. Displayed on user interfaces. */
  description?: string;
  /** Display name is an optional human-readable name for the artifact. When specified, it must be unique among all artifacts within a project. It is used for display purposes on user interfaces. */
  displayName?: string;
  /** Artifact's MIME type. Only text/plain, application/json, application/yaml, image/png, and image/jpeg are allowed at this time. MIME types are defined and standardized in IETF's RFC 6838. */
  mimeType: string;
  /** Name is a human-readable unique identifier for the artifact and must be unique for all artifacts within a project. */
  name: string;
  /** The last update time of the artifact. */
  updateTime?: string;
};
export type ListArtifactsResponse = {
  /** A list of artifacts. */
  artifacts: Artifact[];
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
};
export type ListArtifactsResponseRead = {
  /** A list of artifacts. */
  artifacts: ArtifactRead[];
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
};
export type CreateArtifactResponse = {
  artifact: Artifact;
};
export type CreateArtifactResponseRead = {
  artifact: ArtifactRead;
};
export type GetArtifactResponse = {
  artifact: Artifact;
};
export type GetArtifactResponseRead = {
  artifact: ArtifactRead;
};
export type ApplicationDependency = {
  /** Name of the application that has the dependency on the other. */
  name: string;
  /** Name of the application that is required by the other. */
  requires: string;
};
export type ApplicationReference = {
  /** Name of the referenced application. */
  name: string;
  /** Version of the referenced application. */
  version: string;
};
export type ArtifactReference = {
  /** Name of the artifact. */
  name: string;
  /** Purpose of the artifact, e.g. icon, thumbnail, Grafana dashboard, etc. */
  purpose: string;
};
export type Endpoint = {
  /** The name of the application providing this endpoint. */
  appName?: string;
  /** Authentication type expected by the endpoint. */
  authType: string;
  /** Externally accessible path to the endpoint. */
  externalPath: string;
  /** Internally accessible path to the endpoint. */
  internalPath: string;
  /** Protocol scheme provided by the endpoint. */
  scheme: string;
  /** The name of the service hosted by the endpoint. */
  serviceName: string;
};
export type UiExtension = {
  /** The name of the application corresponding to this UI extension. */
  appName: string;
  /** Description of the API extension, used on the main UI dashboard. */
  description: string;
  /** The name of the main file to load this specific UI extension. */
  fileName: string;
  /** Label is a human readable text used for display in the main UI dashboard */
  label: string;
  /** Name of the application module to be loaded. */
  moduleName: string;
  /** The name of the API extension endpoint. */
  serviceName: string;
};
export type ApiExtension = {
  /** Description of the API extension. Displayed on user interfaces. */
  description?: string;
  /** Display name is an optional human-readable name for the API extension. When specified, it must be unique among all extensions of a given deployment package. It is used for display purposes on user interfaces. */
  displayName?: string;
  /** One or more API endpoints provided by the API extension. */
  endpoints?: Endpoint[];
  /** Name is a human-readable unique identifier for the API extension and must be unique for all extensions of a given deployment package. */
  name: string;
  uiExtension?: UiExtension;
  /** Version of the API extension. */
  version: string;
};
export type Namespace = {
  annotations?: {
    [key: string]: string;
  };
  labels?: {
    [key: string]: string;
  };
  /** namespace names must be valid RFC 1123 DNS labels. Avoid creating namespaces with the prefix `kube-`, since it is reserved for Kubernetes\* system namespaces. Avoid `default` - will already exist */
  name: string;
};
export type DeploymentProfile = {
  /** Application profiles map application names to the names of its profile, to be used when deploying the application as part of the deployment package together with the deployment profile. */
  applicationProfiles: {
    [key: string]: string;
  };
  /** Description of the deployment profile. Displayed on user interfaces. */
  description?: string;
  /** Display name is an optional human-readable name for the registry. When specified, it must be unique among all profiles of a given package. It is used for display purposes on user interfaces. */
  displayName?: string;
  /** Name is a human-readable unique identifier for the profile and must be unique for all profiles of a given deployment package. */
  name: string;
};
export type DeploymentProfileRead = {
  /** Application profiles map application names to the names of its profile, to be used when deploying the application as part of the deployment package together with the deployment profile. */
  applicationProfiles: {
    [key: string]: string;
  };
  /** The creation time of the deployment profile. */
  createTime?: string;
  /** Description of the deployment profile. Displayed on user interfaces. */
  description?: string;
  /** Display name is an optional human-readable name for the registry. When specified, it must be unique among all profiles of a given package. It is used for display purposes on user interfaces. */
  displayName?: string;
  /** Name is a human-readable unique identifier for the profile and must be unique for all profiles of a given deployment package. */
  name: string;
  /** The last update time of the deployment profile. */
  updateTime?: string;
};
export type DeploymentPackage = {
  /** Optional set of application deployment dependencies, expressed as (name, requires) pairs of edges in the deployment order dependency graph. */
  applicationDependencies?: ApplicationDependency[];
  /** List of applications comprising this deployment package. Expressed as (name, version) pairs. */
  applicationReferences: ApplicationReference[];
  /** Optional list of artifacts required for displaying or deploying this package. For example, icon or thumbnail artifacts can be used by the UI; Grafana\* dashboard definitions can be used by the deployment manager. */
  artifacts: ArtifactReference[];
  /** Optional map of application-to-namespace bindings to be used as a default when deploying the applications that comprise the package. If a namespace is not defined in the set of "namespaces" in this Deployment Package, it will be inferred that it is a simple namespace with no predefined labels or annotations. */
  defaultNamespaces?: {
    [key: string]: string;
  };
  /** Name of the default deployment profile to be used by default when deploying this package. */
  defaultProfileName?: string;
  /** Description of the deployment package. Displayed on user interfaces. */
  description?: string;
  /** Display name is an optional human-readable name for the deployment package. When specified, it must be unique among all packages within a project. It is used for display purposes on user interfaces. */
  displayName?: string;
  /** Optional list of API and UI extensions. */
  extensions: ApiExtension[];
  /** Optional flag indicating whether multiple deployments of this package are forbidden within the same realm. */
  forbidsMultipleDeployments?: boolean;
  /** Flag indicating whether the deployment package has been deployed. The mutability of the deployment package entity can be limited when this flag is true. For example, one may not be able to update when an application is removed from a package after it has been marked as deployed. */
  isDeployed?: boolean;
  /** Flag indicating whether the deployment package is visible in the UI. Some deployment packages can be classified as auxiliary platform extensions and therefore are to be deployed indirectly only when specified as deployment requirements, rather than directly by the platform operator. */
  isVisible?: boolean;
  /** Field designating whether the deployment package is a system add-on, system extension, or a normal package. */
  kind?: "KIND_NORMAL" | "KIND_EXTENSION" | "KIND_ADDON";
  /** Name is a human-readable unique identifier for the deployment package and must be unique for all packages of a given project. */
  name: string;
  /** Namespace definitions to be created before resources are deployed. This allows complex namespaces to be defined with predefined labels and annotations. If not defined, simple namespaces will be created as needed. */
  namespaces?: Namespace[];
  /** Set of deployment profiles to choose from when deploying this package. */
  profiles?: DeploymentProfile[];
  /** Version of the deployment package. */
  version: string;
  username?: string;
  helmChartURL?: string;
  password?: string;
};
export type DeploymentPackageRead = {
  /** Optional set of application deployment dependencies, expressed as (name, requires) pairs of edges in the deployment order dependency graph. */
  applicationDependencies?: ApplicationDependency[];
  /** List of applications comprising this deployment package. Expressed as (name, version) pairs. */
  applicationReferences: ApplicationReference[];
  /** Optional list of artifacts required for displaying or deploying this package. For example, icon or thumbnail artifacts can be used by the UI; Grafana\* dashboard definitions can be used by the deployment manager. */
  artifacts: ArtifactReference[];
  /** The creation time of the deployment package. */
  createTime?: string;
  /** Optional map of application-to-namespace bindings to be used as a default when deploying the applications that comprise the package. If a namespace is not defined in the set of "namespaces" in this Deployment Package, it will be inferred that it is a simple namespace with no predefined labels or annotations. */
  defaultNamespaces?: {
    [key: string]: string;
  };
  /** Name of the default deployment profile to be used by default when deploying this package. */
  defaultProfileName?: string;
  /** Description of the deployment package. Displayed on user interfaces. */
  description?: string;
  /** Display name is an optional human-readable name for the deployment package. When specified, it must be unique among all packages within a project. It is used for display purposes on user interfaces. */
  displayName?: string;
  /** Optional list of API and UI extensions. */
  extensions: ApiExtension[];
  /** Optional flag indicating whether multiple deployments of this package are forbidden within the same realm. */
  forbidsMultipleDeployments?: boolean;
  /** Flag indicating whether the deployment package has been deployed. The mutability of the deployment package entity can be limited when this flag is true. For example, one may not be able to update when an application is removed from a package after it has been marked as deployed. */
  isDeployed?: boolean;
  /** Flag indicating whether the deployment package is visible in the UI. Some deployment packages can be classified as auxiliary platform extensions and therefore are to be deployed indirectly only when specified as deployment requirements, rather than directly by the platform operator. */
  isVisible?: boolean;
  /** Field designating whether the deployment package is a system add-on, system extension, or a normal package. */
  kind?: "KIND_NORMAL" | "KIND_EXTENSION" | "KIND_ADDON";
  /** Name is a human-readable unique identifier for the deployment package and must be unique for all packages of a given project. */
  name: string;
  /** Namespace definitions to be created before resources are deployed. This allows complex namespaces to be defined with predefined labels and annotations. If not defined, simple namespaces will be created as needed. */
  namespaces?: Namespace[];
  /** Set of deployment profiles to choose from when deploying this package. */
  profiles?: DeploymentProfileRead[];
  /** The last update time of the deployment package. */
  updateTime?: string;
  /** Version of the deployment package. */
  version: string;
};
export type ListDeploymentPackagesResponse = {
  /** A list of DeploymentPackages. */
  deploymentPackages: DeploymentPackage[];
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
};
export type ListDeploymentPackagesResponseRead = {
  /** A list of DeploymentPackages. */
  deploymentPackages: DeploymentPackageRead[];
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
};
export type CreateDeploymentPackageResponse = {
  deploymentPackage: DeploymentPackage;
};
export type CreateDeploymentPackageResponseRead = {
  deploymentPackage: DeploymentPackageRead;
};
export type GetDeploymentPackageVersionsResponse = {
  /** A list of DeploymentPackages with the same project and name. */
  deploymentPackages: DeploymentPackage[];
};
export type GetDeploymentPackageVersionsResponseRead = {
  /** A list of DeploymentPackages with the same project and name. */
  deploymentPackages: DeploymentPackageRead[];
};
export type GetDeploymentPackageResponse = {
  deploymentPackage: DeploymentPackage;
};
export type GetDeploymentPackageResponseRead = {
  deploymentPackage: DeploymentPackageRead;
};
export type Registry = {
  /** Optional type of the API used to obtain inventory of the articles hosted by the registry. */
  apiType?: string;
  /** Optional authentication token or password for accessing the registry. */
  authToken?: string;
  /** Optional CA certificates for accessing the registry using secure channels, such as HTTPS. */
  cacerts?: string;
  /** Description of the registry. Displayed on user interfaces. */
  description?: string;
  /** Display name is an optional human-readable name for the registry. When specified, it must be unique among all registries within a project. It is used for display purposes on user interfaces. */
  displayName?: string;
  /** Optional URL of the API for accessing inventory of artifacts hosted by the registry. */
  inventoryUrl?: string;
  /** Name is a human-readable unique identifier for the registry and must be unique for all registries of a given project. */
  name: string;
  /** Root URL for retrieving artifacts, e.g. Docker images and Helm charts, from the registry. */
  rootUrl: string;
  /** Type indicates whether the registry holds Docker images or Helm charts; defaults to Helm charts. */
  type: string;
  /** Optional username for accessing the registry. */
  username?: string;
};
export type RegistryRead = {
  /** Optional type of the API used to obtain inventory of the articles hosted by the registry. */
  apiType?: string;
  /** Optional authentication token or password for accessing the registry. */
  authToken?: string;
  /** Optional CA certificates for accessing the registry using secure channels, such as HTTPS. */
  cacerts?: string;
  /** The creation time of the registry. */
  createTime?: string;
  /** Description of the registry. Displayed on user interfaces. */
  description?: string;
  /** Display name is an optional human-readable name for the registry. When specified, it must be unique among all registries within a project. It is used for display purposes on user interfaces. */
  displayName?: string;
  /** Optional URL of the API for accessing inventory of artifacts hosted by the registry. */
  inventoryUrl?: string;
  /** Name is a human-readable unique identifier for the registry and must be unique for all registries of a given project. */
  name: string;
  /** Root URL for retrieving artifacts, e.g. Docker images and Helm charts, from the registry. */
  rootUrl: string;
  /** Type indicates whether the registry holds Docker images or Helm charts; defaults to Helm charts. */
  type: string;
  /** The last update time of the registry. */
  updateTime?: string;
  /** Optional username for accessing the registry. */
  username?: string;
};
export type ListRegistriesResponse = {
  /** A list of registries. */
  registries: Registry[];
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
};
export type ListRegistriesResponseRead = {
  /** A list of registries. */
  registries: RegistryRead[];
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
};
export type CreateRegistryResponse = {
  registry: Registry;
};
export type CreateRegistryResponseRead = {
  registry: RegistryRead;
};
export type GetRegistryResponse = {
  registry: Registry;
};
export type GetRegistryResponseRead = {
  registry: RegistryRead;
};
export type UploadCatalogEntitiesResponse = {
  /** Any error messages encountered either during YAML parsing or entity creation or update. */
  errorMessages?: string[];
  /** Session ID, generated by the server after the first upload request has been processed. */
  sessionId: string;
  /** Deprecated: Next expected upload number or total number of uploads on the last upload request. */
  uploadNumber: number;
};
export type Upload = {
  /** Raw bytes content of the file being uploaded. */
  artifact: string;
  /** Name of the file being uploaded. */
  fileName: string;
};
export const {
  useCatalogServiceListApplicationsQuery,
  useLazyCatalogServiceListApplicationsQuery,
  useCatalogServiceCreateApplicationMutation,
  useCatalogServiceGetApplicationVersionsQuery,
  useLazyCatalogServiceGetApplicationVersionsQuery,
  useCatalogServiceDeleteApplicationMutation,
  useCatalogServiceGetApplicationQuery,
  useLazyCatalogServiceGetApplicationQuery,
  useCatalogServiceUpdateApplicationMutation,
  useCatalogServiceGetApplicationReferenceCountQuery,
  useLazyCatalogServiceGetApplicationReferenceCountQuery,
  useCatalogServiceListArtifactsQuery,
  useLazyCatalogServiceListArtifactsQuery,
  useCatalogServiceCreateArtifactMutation,
  useCatalogServiceDeleteArtifactMutation,
  useCatalogServiceGetArtifactQuery,
  useLazyCatalogServiceGetArtifactQuery,
  useCatalogServiceUpdateArtifactMutation,
  useCatalogServiceListDeploymentPackagesQuery,
  useLazyCatalogServiceListDeploymentPackagesQuery,
  useCatalogServiceCreateDeploymentPackageMutation,
  useCatalogServiceGetDeploymentPackageVersionsQuery,
  useLazyCatalogServiceGetDeploymentPackageVersionsQuery,
  useCatalogServiceDeleteDeploymentPackageMutation,
  useCatalogServiceGetDeploymentPackageQuery,
  useLazyCatalogServiceGetDeploymentPackageQuery,
  useCatalogServiceUpdateDeploymentPackageMutation,
  useCatalogServiceListRegistriesQuery,
  useLazyCatalogServiceListRegistriesQuery,
  useCatalogServiceCreateRegistryMutation,
  useCatalogServiceDeleteRegistryMutation,
  useCatalogServiceGetRegistryQuery,
  useLazyCatalogServiceGetRegistryQuery,
  useCatalogServiceUpdateRegistryMutation,
  useCatalogServiceUploadCatalogEntitiesMutation,
} = injectedRtkApi;
