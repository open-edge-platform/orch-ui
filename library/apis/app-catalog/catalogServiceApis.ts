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
          body: queryArg.catalogV3Application,
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
          body: queryArg.catalogV3Application,
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
          body: queryArg.catalogV3Artifact,
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
          body: queryArg.catalogV3Artifact,
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
          body: queryArg.catalogV3DeploymentPackage,
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
          body: queryArg.catalogV3DeploymentPackage,
        }),
        invalidatesTags: ["CatalogService"],
      }),
      catalogServiceImport: build.mutation<
        CatalogServiceImportApiResponse,
        CatalogServiceImportApiArg
      >({
        query: (queryArg) => ({
          url: `/v3/projects/${queryArg.projectName}/catalog/import`,
          method: "POST",
          params: {
            url: queryArg.url,
            username: queryArg.username,
            authToken: queryArg.authToken,
            chartValues: queryArg.chartValues,
            includeAuth: queryArg.includeAuth,
            generateDefaultValues: queryArg.generateDefaultValues,
            generateDefaultParameters: queryArg.generateDefaultParameters,
            namespace: queryArg["namespace"],
          },
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
          body: queryArg.catalogV3Registry,
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
          body: queryArg.catalogV3Registry,
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
          body: queryArg.catalogV3Upload,
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
  /** status 200 Success */ ListApplicationsResponse;
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
  kinds?: Kind[];
  /** unique projectName for the resource */
  projectName: string;
};
export type CatalogServiceCreateApplicationApiResponse =
  /** status 200 Success */ CreateApplicationResponse;
export type CatalogServiceCreateApplicationApiArg = {
  /** unique projectName for the resource */
  projectName: string;
  /** The registry to create. */
  catalogV3Application: Application;
};
export type CatalogServiceGetApplicationVersionsApiResponse =
  /** status 200 Success */ GetApplicationVersionsResponse;
export type CatalogServiceGetApplicationVersionsApiArg = {
  /** Name of the application. */
  applicationName: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type CatalogServiceDeleteApplicationApiResponse =
  /** status 200 Success */ GoogleProtobufEmpty;
export type CatalogServiceDeleteApplicationApiArg = {
  /** Name of the application. */
  applicationName: string;
  /** Version of the application. */
  version: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type CatalogServiceGetApplicationApiResponse =
  /** status 200 Success */ GetApplicationResponse;
export type CatalogServiceGetApplicationApiArg = {
  /** Name of the application. */
  applicationName: string;
  /** Version of the application. */
  version: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type CatalogServiceUpdateApplicationApiResponse =
  /** status 200 Success */ GoogleProtobufEmpty;
export type CatalogServiceUpdateApplicationApiArg = {
  /** Name of the application. */
  applicationName: string;
  /** Version of the application. */
  version: string;
  /** unique projectName for the resource */
  projectName: string;
  /** The application update. */
  catalogV3Application: Application;
};
export type CatalogServiceGetApplicationReferenceCountApiResponse =
  /** status 200 Success */ GetApplicationReferenceCountResponse;
export type CatalogServiceGetApplicationReferenceCountApiArg = {
  /** Name of the application. */
  applicationName: string;
  /** Version of the application. */
  version: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type CatalogServiceListArtifactsApiResponse =
  /** status 200 Success */ ListArtifactsResponse;
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
  /** status 200 Success */ CreateArtifactResponse;
export type CatalogServiceCreateArtifactApiArg = {
  /** unique projectName for the resource */
  projectName: string;
  /** The artifact to create. */
  catalogV3Artifact: Artifact;
};
export type CatalogServiceDeleteArtifactApiResponse =
  /** status 200 Success */ GoogleProtobufEmpty;
export type CatalogServiceDeleteArtifactApiArg = {
  /** Name of the artifact. */
  artifactName: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type CatalogServiceGetArtifactApiResponse =
  /** status 200 Success */ GetArtifactResponse;
export type CatalogServiceGetArtifactApiArg = {
  /** Name of the artifact. */
  artifactName: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type CatalogServiceUpdateArtifactApiResponse =
  /** status 200 Success */ GoogleProtobufEmpty;
export type CatalogServiceUpdateArtifactApiArg = {
  /** Name of the artifact. */
  artifactName: string;
  /** unique projectName for the resource */
  projectName: string;
  /** The artifact update. */
  catalogV3Artifact: Artifact;
};
export type CatalogServiceListDeploymentPackagesApiResponse =
  /** status 200 Success */ ListDeploymentPackagesResponse;
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
  kinds?: Kind[];
  /** unique projectName for the resource */
  projectName: string;
};
export type CatalogServiceCreateDeploymentPackageApiResponse =
  /** status 200 Success */ CreateDeploymentPackageResponse;
export type CatalogServiceCreateDeploymentPackageApiArg = {
  /** unique projectName for the resource */
  projectName: string;
  /** The deployment package to create. */
  catalogV3DeploymentPackage: DeploymentPackage;
};
export type CatalogServiceGetDeploymentPackageVersionsApiResponse =
  /** status 200 Success */ GetDeploymentPackageVersionsResponse;
export type CatalogServiceGetDeploymentPackageVersionsApiArg = {
  /** Name of the DeploymentPackage. */
  deploymentPackageName: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type CatalogServiceDeleteDeploymentPackageApiResponse =
  /** status 200 Success */ GoogleProtobufEmpty;
export type CatalogServiceDeleteDeploymentPackageApiArg = {
  /** Name of the DeploymentPackage. */
  deploymentPackageName: string;
  /** Version of the DeploymentPackage. */
  version: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type CatalogServiceGetDeploymentPackageApiResponse =
  /** status 200 Success */ GetDeploymentPackageResponse;
export type CatalogServiceGetDeploymentPackageApiArg = {
  /** Name of the DeploymentPackage. */
  deploymentPackageName: string;
  /** Version of the DeploymentPackage. */
  version: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type CatalogServiceUpdateDeploymentPackageApiResponse =
  /** status 200 Success */ GoogleProtobufEmpty;
export type CatalogServiceUpdateDeploymentPackageApiArg = {
  /** Name of the DeploymentPackage. */
  deploymentPackageName: string;
  /** Version of the DeploymentPackage. */
  version: string;
  /** unique projectName for the resource */
  projectName: string;
  /** The DeploymentPackage update. */
  catalogV3DeploymentPackage: DeploymentPackage;
};
export type CatalogServiceImportApiResponse =
  /** status 200 Success */ ImportResponse;
export type CatalogServiceImportApiArg = {
  /** Required URL of Helm Chart to import */
  url: string;
  /** Optional username for downloading from the URL */
  username?: string;
  /** Optional authentication token or password for downloading from the URL */
  authToken?: string;
  /** Optional raw byte value containing the chart values as raw YAML bytes. */
  chartValues?: string;
  /** If true and a username/auth_token is specified then they will be included
     in the generated Registry object. */
  includeAuth?: boolean;
  /** If true and chart_values is not set, then the values.yaml will be extracted and
     used to generate default profile values. */
  generateDefaultValues?: boolean;
  /** Generates default parameters from the values, from chart_values or from
     generate_default_values as appropriate. */
  generateDefaultParameters?: boolean;
  /** Optional namespace */
  namespace?: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type CatalogServiceListRegistriesApiResponse =
  /** status 200 Success */ ListRegistriesResponse;
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
  /** status 200 Success */ CreateRegistryResponse;
export type CatalogServiceCreateRegistryApiArg = {
  /** unique projectName for the resource */
  projectName: string;
  /** The registry to create. */
  catalogV3Registry: Registry;
};
export type CatalogServiceDeleteRegistryApiResponse =
  /** status 200 Success */ GoogleProtobufEmpty;
export type CatalogServiceDeleteRegistryApiArg = {
  /** Name of the registry. */
  registryName: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type CatalogServiceGetRegistryApiResponse =
  /** status 200 Success */ GetRegistryResponse;
export type CatalogServiceGetRegistryApiArg = {
  /** Name of the registry. */
  registryName: string;
  /** Request that sensitive information, such as username, auth_token, and CA certificates are included in the response. */
  showSensitiveInfo?: boolean;
  /** unique projectName for the resource */
  projectName: string;
};
export type CatalogServiceUpdateRegistryApiResponse =
  /** status 200 Success */ GoogleProtobufEmpty;
export type CatalogServiceUpdateRegistryApiArg = {
  /** Name of the Registry. */
  registryName: string;
  /** unique projectName for the resource */
  projectName: string;
  /** The Registry update. */
  catalogV3Registry: Registry;
};
export type CatalogServiceUploadCatalogEntitiesApiResponse =
  /** status 200 Success */ UploadCatalogEntitiesResponse;
export type CatalogServiceUploadCatalogEntitiesApiArg = {
  /** First upload request in the batch must not specify session ID. Subsequent upload requests must copy
     the session ID from the previously issued response. */
  sessionId?: string;
  /** Deprecated: Upload number must increase sequentially, starting with 1. */
  uploadNumber?: number;
  /** Must be set to 'true' to perform load of all entity files uploaded as part of this session. */
  lastUpload?: boolean;
  /** unique projectName for the resource */
  projectName: string;
  /** Upload record containing the file name and file contents being uploaded. */
  catalogV3Upload: Upload;
};
export type GoogleProtobufTimestamp = string;
export type ResourceReference = {
  /** (OPTIONAL) Ignore whole resource if true. Will use "remove" if false or not present. */
  ignore?: boolean;
  /** Kubernetes resource kind, e.g. ConfigMap. */
  kind: string;
  /** Kubernetes resource name. */
  name: string;
  /** (OPTIONAL) Kubernetes namespace where the ignored resource resides. When empty, the application namespace will be used. */
  namespace?: string;
};
export type Kind =
  | "KIND_UNSPECIFIED"
  | "KIND_NORMAL"
  | "KIND_EXTENSION"
  | "KIND_ADDON";
export type DeploymentRequirement = {
  /** (OPTIONAL) Optional name of the deployment profile to be used. When not provided, the default deployment profile will be used. */
  deploymentProfileName?: string;
  /** Name of the required deployment package. */
  name: string;
  /** Version of the required deployment package. */
  version: string;
};
export type ParameterTemplate = {
  /** (OPTIONAL) Default value for the parameter. */
  default?: string;
  /** (OPTIONAL) Display name is an optional human-readable name for the template. It is used for display purposes on user interfaces. */
  displayName?: string;
  /** (OPTIONAL) Optional mandatory flag for the parameter. */
  mandatory?: boolean;
  /** Human-readable name for the parameter template. */
  name: string;
  /** (OPTIONAL) Optional secret flag for the parameter. */
  secret?: boolean;
  /** (OPTIONAL) List of suggested values to use, to override the default value. */
  suggestedValues?: string[];
  /** Type of parameter: string, number, or boolean. */
  type: string;
  /** (OPTIONAL) Optional validator for the parameter. Usage TBD. */
  validator?: string;
};
export type Profile = {
  /** (OPTIONAL) Raw byte value containing the chart values as raw YAML bytes. */
  chartValues?: string;
  createTime?: GoogleProtobufTimestamp;
  /** (OPTIONAL) List of deployment requirements for this profile. */
  deploymentRequirement?: DeploymentRequirement[];
  /** (OPTIONAL) Description of the profile. Displayed on user interfaces. */
  description?: string;
  /** (OPTIONAL) Display name is an optional human-readable name for the profile. When specified, it must be unique among all
     profiles of a given application. It is used for display purposes on user interfaces. */
  displayName?: string;
  /** Human-readable name for the profile. Unique among all profiles of the same application. */
  name: string;
  /** (OPTIONAL) Parameter templates available for this profile. */
  parameterTemplates?: ParameterTemplate[];
  updateTime?: GoogleProtobufTimestamp;
};
export type Application = {
  /** Helm chart name. */
  chartName: string;
  /** Helm chart version. */
  chartVersion: string;
  createTime?: GoogleProtobufTimestamp;
  /** (OPTIONAL) Name of the profile to be used by default when deploying this application.
     If at least one profile is available, this field must be set. */
  defaultProfileName?: string;
  /** (OPTIONAL) Description of the application. Displayed on user interfaces. */
  description?: string;
  /** (OPTIONAL) Display name is an optional human-readable name for the application. When specified, it must be unique among all
     applications within a project. It is used for display purposes on user interfaces. */
  displayName?: string;
  /** ID of the project's registry where the Helm chart of the application is available for download. */
  helmRegistryName: string;
  /** (OPTIONAL) List of Kubernetes resources that must be ignored during the application deployment. */
  ignoredResources?: ResourceReference[];
  /** (OPTIONAL) ID of the project's registry where the Docker image of the application is available for download. */
  imageRegistryName?: string;
  kind?: Kind;
  /** Name is a human readable unique identifier for the application and must be unique for all applications of a
     given project. Used in network URIs. */
  name: string;
  /** Set of profiles that can be used when deploying the application. */
  profiles?: Profile[];
  updateTime?: GoogleProtobufTimestamp;
  /** Version of the application. Used in combination with the name to identify a unique application within a project. */
  version: string;
};
export type ListApplicationsResponse = {
  /** A list of applications. */
  applications: Application[];
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
};
export type CreateApplicationResponse = {
  application: Application;
};
export type GetApplicationVersionsResponse = {
  /** A list of applications with the same project and name. TODO rename to 'applications' */
  application: Application[];
};
export type GoogleProtobufEmpty = object;
export type GetApplicationResponse = {
  application: Application;
};
export type GetApplicationReferenceCountResponse = {
  referenceCount: number;
};
export type Artifact = {
  /** Raw byte content of the artifact encoded as base64. The limits refer to the number of raw bytes.
    bytes.const = []
     */
  artifact: string;
  createTime?: GoogleProtobufTimestamp;
  /** (OPTIONAL) Description of the artifact. Displayed on user interfaces. */
  description?: string;
  /** (OPTIONAL) Display name is an optional human-readable name for the artifact. When specified, it must be unique among all
     artifacts within a project. It is used for display purposes on user interfaces. */
  displayName?: string;
  /** Artifact's MIME type. Only text/plain, application/json, application/yaml, image/png, and image/jpeg are allowed at this time.
    
     MIME types are defined and standardized in IETF's RFC 6838. */
  mimeType: string;
  /** Name is a human-readable unique identifier for the artifact and must be unique for all artifacts within a project. */
  name: string;
  updateTime?: GoogleProtobufTimestamp;
};
export type ListArtifactsResponse = {
  /** A list of artifacts. */
  artifacts: Artifact[];
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
};
export type CreateArtifactResponse = {
  artifact: Artifact;
};
export type GetArtifactResponse = {
  artifact: Artifact;
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
  /** (OPTIONAL) The name of the application providing this endpoint. */
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
  /** (OPTIONAL) Description of the API extension. Displayed on user interfaces. */
  description?: string;
  /** (OPTIONAL) Display name is an optional human-readable name for the API extension. When specified, it must be unique among all
     extensions of a given deployment package. It is used for display purposes on user interfaces. */
  displayName?: string;
  /** One or more API endpoints provided by the API extension. */
  endpoints?: Endpoint[];
  /** Name is a human-readable unique identifier for the API extension and must be unique for all extensions of a
     given deployment package. */
  name: string;
  uiExtension?: UiExtension;
  /** Version of the API extension. */
  version: string;
};
export type Namespace = {
  /** (OPTIONAL)  */
  annotations?: {
    [key: string]: string;
  };
  /** (OPTIONAL)  */
  labels?: {
    [key: string]: string;
  };
  /** namespace names must be valid RFC 1123 DNS labels.
     Avoid creating namespaces with the prefix `kube-`, since it is reserved for Kubernetes\* system namespaces.
     Avoid `default` - will already exist */
  name: string;
};
export type DeploymentProfile = {
  /** Application profiles map application names to the names of its profile, to be used when deploying the application
     as part of the deployment package together with the deployment profile. */
  applicationProfiles: {
    [key: string]: string;
  };
  createTime?: GoogleProtobufTimestamp;
  /** (OPTIONAL) Description of the deployment profile. Displayed on user interfaces. */
  description?: string;
  /** (OPTIONAL) Display name is an optional human-readable name for the registry. When specified, it must be unique among all
     profiles of a given package. It is used for display purposes on user interfaces. */
  displayName?: string;
  /** Name is a human-readable unique identifier for the profile and must be unique for all profiles of a
     given deployment package. */
  name: string;
  updateTime?: GoogleProtobufTimestamp;
};
export type DeploymentPackage = {
  /** (OPTIONAL) Optional set of application deployment dependencies, expressed as (name, requires) pairs of edges in the
     deployment order dependency graph. */
  applicationDependencies?: ApplicationDependency[];
  /** List of applications comprising this deployment package. Expressed as (name, version) pairs. */
  applicationReferences: ApplicationReference[];
  /** Optional list of artifacts required for displaying or deploying this package. For example, icon or thumbnail
     artifacts can be used by the UI; Grafana\* dashboard definitions can be used by the deployment manager. */
  artifacts: ArtifactReference[];
  createTime?: GoogleProtobufTimestamp;
  /** (OPTIONAL) Optional map of application-to-namespace bindings to be used as a default when deploying the applications that
     comprise the package.
     If a namespace is not defined in the set of "namespaces" in this Deployment Package,
     it will be inferred that it is a simple namespace with no predefined labels or annotations. */
  defaultNamespaces?: {
    [key: string]: string;
  };
  /** (OPTIONAL) Name of the default deployment profile to be used by default when deploying this package. */
  defaultProfileName?: string;
  /** (OPTIONAL) Description of the deployment package. Displayed on user interfaces. */
  description?: string;
  /** (OPTIONAL) Display name is an optional human-readable name for the deployment package. When specified, it must be unique among all
     packages within a project. It is used for display purposes on user interfaces. */
  displayName?: string;
  /** Optional list of API and UI extensions. */
  extensions: ApiExtension[];
  /** (OPTIONAL) Optional flag indicating whether multiple deployments of this package are forbidden within the same realm. */
  forbidsMultipleDeployments?: boolean;
  /** (OPTIONAL) Flag indicating whether the deployment package has been deployed.
     The mutability of the deployment package entity can be limited when this flag is true. For example, one may
     not be able to update when an application is removed from a package after it has been marked as
     deployed. */
  isDeployed?: boolean;
  /** (OPTIONAL) Flag indicating whether the deployment package is visible in the UI.
     Some deployment packages can be classified as auxiliary platform extensions and therefore are to be deployed
     indirectly only when specified as deployment requirements, rather than directly by the platform operator. */
  isVisible?: boolean;
  kind?: Kind;
  /** Name is a human-readable unique identifier for the deployment package and must be unique for all packages of a
     given project. */
  name: string;
  /** (OPTIONAL) Namespace definitions to be created before resources are deployed.
     This allows complex namespaces to be defined with predefined labels and annotations.
     If not defined, simple namespaces will be created as needed. */
  namespaces?: Namespace[];
  /** Set of deployment profiles to choose from when deploying this package. */
  profiles?: DeploymentProfile[];
  updateTime?: GoogleProtobufTimestamp;
  /** Version of the deployment package. */
  version: string;
};
export type ListDeploymentPackagesResponse = {
  /** A list of DeploymentPackages. */
  deploymentPackages: DeploymentPackage[];
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
};
export type CreateDeploymentPackageResponse = {
  deploymentPackage: DeploymentPackage;
};
export type GetDeploymentPackageVersionsResponse = {
  /** A list of DeploymentPackages with the same project and name. */
  deploymentPackages: DeploymentPackage[];
};
export type GetDeploymentPackageResponse = {
  deploymentPackage: DeploymentPackage;
};
export type ImportResponse = {
  /** Any error messages encountered either during chart parsing or entity creation or update. */
  errorMessages?: string[];
};
export type Registry = {
  /** (OPTIONAL) Optional type of the API used to obtain inventory of the articles hosted by the registry. */
  apiType?: string;
  /** Optional authentication token or password for accessing the registry. */
  authToken?: string;
  /** (OPTIONAL) Optional CA certificates for accessing the registry using secure channels, such as HTTPS. */
  cacerts?: string;
  createTime?: GoogleProtobufTimestamp;
  /** (OPTIONAL) Description of the registry. Displayed on user interfaces. */
  description?: string;
  /** (OPTIONAL) Display name is an optional human-readable name for the registry. When specified, it must be unique among all
     registries within a project. It is used for display purposes on user interfaces. */
  displayName?: string;
  /** (OPTIONAL) Optional URL of the API for accessing inventory of artifacts hosted by the registry. */
  inventoryUrl?: string;
  /** Name is a human-readable unique identifier for the registry and must be unique for all registries of a
     given project. */
  name: string;
  /** Root URL for retrieving artifacts, e.g. Docker images and Helm charts, from the registry. */
  rootUrl: string;
  /** Type indicates whether the registry holds Docker images or Helm charts; defaults to Helm charts. */
  type: string;
  updateTime?: GoogleProtobufTimestamp;
  /** Optional username for accessing the registry. */
  username?: string;
};
export type ListRegistriesResponse = {
  /** A list of registries. */
  registries: Registry[];
  /** Count of items in the entire list, regardless of pagination. */
  totalElements: number;
};
export type CreateRegistryResponse = {
  registry: Registry;
};
export type GetRegistryResponse = {
  registry: Registry;
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
  useCatalogServiceImportMutation,
  useCatalogServiceListRegistriesQuery,
  useLazyCatalogServiceListRegistriesQuery,
  useCatalogServiceCreateRegistryMutation,
  useCatalogServiceDeleteRegistryMutation,
  useCatalogServiceGetRegistryQuery,
  useLazyCatalogServiceGetRegistryQuery,
  useCatalogServiceUpdateRegistryMutation,
  useCatalogServiceUploadCatalogEntitiesMutation,
} = injectedRtkApi;
