import { appDeploymentManagerApi as api } from "./apiSlice";
export const addTagTypes = [
  "deployment.v1.ClusterService",
  "deployment.v1.DeploymentService",
] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getV1ProjectsByProjectNameAppdeploymentClusters: build.query<
        GetV1ProjectsByProjectNameAppdeploymentClustersApiResponse,
        GetV1ProjectsByProjectNameAppdeploymentClustersApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/appdeployment/clusters`,
          params: {
            labels: queryArg.labels,
            orderBy: queryArg.orderBy,
            filter: queryArg.filter,
            pageSize: queryArg.pageSize,
            offset: queryArg.offset,
          },
        }),
        providesTags: ["deployment.v1.ClusterService"],
      }),
      getV1ProjectsByProjectNameAppdeploymentDeployments: build.query<
        GetV1ProjectsByProjectNameAppdeploymentDeploymentsApiResponse,
        GetV1ProjectsByProjectNameAppdeploymentDeploymentsApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/appdeployment/deployments`,
          params: {
            labels: queryArg.labels,
            orderBy: queryArg.orderBy,
            filter: queryArg.filter,
            pageSize: queryArg.pageSize,
            offset: queryArg.offset,
          },
        }),
        providesTags: ["deployment.v1.DeploymentService"],
      }),
      postV1ProjectsByProjectNameAppdeploymentDeployments: build.mutation<
        PostV1ProjectsByProjectNameAppdeploymentDeploymentsApiResponse,
        PostV1ProjectsByProjectNameAppdeploymentDeploymentsApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/appdeployment/deployments`,
          method: "POST",
          body: queryArg.deploymentV1Deployment,
        }),
        invalidatesTags: ["deployment.v1.DeploymentService"],
      }),
      getV1ProjectsByProjectNameSummaryDeploymentsStatus: build.query<
        GetV1ProjectsByProjectNameSummaryDeploymentsStatusApiResponse,
        GetV1ProjectsByProjectNameSummaryDeploymentsStatusApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/appdeployment/summary/deployments_status`,
          params: { labels: queryArg.labels },
        }),
        providesTags: ["deployment.v1.DeploymentService"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as deploymentManager };
export type GetV1ProjectsByProjectNameAppdeploymentClustersApiResponse =
  /** status 200 Success */ ListClustersResponseRead;
export type GetV1ProjectsByProjectNameAppdeploymentClustersApiArg = {
  /** Optional. A string array that filters cluster labels to be
     displayed ie color=blue,customer=intel. Labels separated by a comma. */
  labels?: string[];
  /** Optional. Select field and order based on which cluster list will be sorted. */
  orderBy?: string;
  /** Optional. Selection criteria to list clusters. */
  filter?: string;
  /** Optional. Select count of clusters to be listed per page. */
  pageSize?: number;
  /** Optional. Offset is used to select the correct page from which clusters list will be displayed.
     (E.g If there are 10 clusters, page size is 2 and offset is set as 4, then the response will display clusters 5 and 6). */
  offset?: number;
  /** unique projectName for the resource */
  projectName: string;
};
export type GetV1ProjectsByProjectNameAppdeploymentDeploymentsApiResponse =
  /** status 200 Success */ ListDeploymentsResponseRead;
export type GetV1ProjectsByProjectNameAppdeploymentDeploymentsApiArg = {
  /** Optional. A string array that filters cluster labels to be
     displayed ie color=blue,customer=intel-corp. Labels separated by a comma. */
  labels?: string[];
  /** Optional. Select field and order based on which Deployment list will be sorted. */
  orderBy?: string;
  /** Optional. Selection criteria to list Deployments. */
  filter?: string;
  /** Optional. Select count of Deployment to be listed per page. */
  pageSize?: number;
  /** Optional. Offset is used to select the correct page from which Deployment list will be displayed.
     (E.g If there are 10 Deployments, page size is 2 and offset is set as 4, then the response will display Deployment 5 and 6.) */
  offset?: number;
  /** unique projectName for the resource */
  projectName: string;
};
export type PostV1ProjectsByProjectNameAppdeploymentDeploymentsApiResponse =
  /** status 200 Success */ CreateDeploymentResponse;
export type PostV1ProjectsByProjectNameAppdeploymentDeploymentsApiArg = {
  /** unique projectName for the resource */
  projectName: string;
  /** Required. Initial values for the deployment. */
  deploymentV1Deployment: Deployment;
};
export type GetV1ProjectsByProjectNameSummaryDeploymentsStatusApiResponse =
  /** status 200 Success */ GetDeploymentsStatusResponseRead;
export type GetV1ProjectsByProjectNameSummaryDeploymentsStatusApiArg = {
  /** Optional. A string array that filters cluster labels to be
     displayed ie color=blue,customer=intel-corp. Labels separated by a comma. */
  labels?: string[];
  /** unique projectName for the resource */
  projectName: string;
};
export type GoogleProtobufTimestamp = string;
export type ClusterInfo = {
  createTime?: GoogleProtobufTimestamp;
};
export type ClusterInfoRead = {
  createTime?: GoogleProtobufTimestamp;
  /** ID is the cluster id which ECM generates and assigns to the Rancher cluster name. */
  id?: string;
  /** List of cluster labels retrieved from Fleet cluster object. */
  labels?: {
    [key: string]: string;
  };
  /** Name is the display name which user provides and ECM creates and assigns clustername label to Fleet cluster object. */
  name?: string;
};
export type ListClustersResponse = {
  /** A list of Cluster Objects. */
  clusters: ClusterInfo[];
  totalElements: number;
};
export type ListClustersResponseRead = {
  /** A list of Cluster Objects. */
  clusters: ClusterInfoRead[];
  totalElements: number;
};
export type TargetClusters = {
  /** (OPTIONAL) The targeted deployment package name. */
  appName?: string;
  /** (OPTIONAL) Cluster id to match the target cluster when targeted deployment. */
  clusterId?: string;
  /** (OPTIONAL) Cluster labels to match the target cluster when auto-scaling deployment. */
  labels?: {
    [key: string]: string;
  };
};
export type GoogleProtobufValue = {
  [key: string]: any;
} | null;
export type GoogleProtobufStruct = {
  [key: string]: GoogleProtobufValue;
};
export type OverrideValues = {
  /** deployment package name to use when overriding values. */
  appName: string;
  /** (OPTIONAL) The namespace to deploy the app onto, default namespace is default. */
  targetNamespace?: string;
  values?: GoogleProtobufStruct;
};
export type ServiceExport = {
  appName: string;
  enabled?: boolean;
};
export type State =
  | "UNKNOWN"
  | "RUNNING"
  | "DOWN"
  | "INTERNAL_ERROR"
  | "DEPLOYING"
  | "UPDATING"
  | "TERMINATING"
  | "ERROR"
  | "NO_TARGET_CLUSTERS";
export type Summary = {};
export type SummaryRead = {
  /** Number of down apps/clusters in the deployment. */
  down?: number;
  /** Number of running apps/clusters in the deployment, value from owned GitRepo objects. */
  running?: number;
  /** Total count of apps/clusters in the deployment, value from owned GitRepo objects. */
  total?: number;
  /** Type of thing that we're counting, ie clusters, apps. */
  type?: string;
  /** Unknown status to indicate cluster not reachable. */
  unknown?: number;
};
export type Status = {
  state?: State;
  summary?: Summary;
};
export type StatusRead = {
  message?: string;
  state?: State;
  summary?: SummaryRead;
};
export type Deployment = {
  allAppTargetClusters?: TargetClusters;
  /** The deployment package name to deploy from the catalog. */
  appName: string;
  /** The version of the deployment package. */
  appVersion: string;
  createTime?: GoogleProtobufTimestamp;
  /** (OPTIONAL) The deployment type for the target cluster deployment can be either auto-scaling or targeted.
     In Auto-scaling type, the application will be automatically deployed on all the
     clusters which match the Target cluster label. In Targeted type, the user has to select among pre created
     clusters to deploy the application. */
  deploymentType?: string;
  /** (OPTIONAL) Deployment display name. */
  displayName?: string;
  /** (OPTIONAL) network_name is the name of the interconnect network that deployment be part of */
  networkName?: string;
  /** (OPTIONAL) The Override values can be used to override any of the base profile values based on Deployment scenario. */
  overrideValues?: OverrideValues[];
  /** (OPTIONAL) The selected profile name to be used for the base Helm values of the different applications in the deployment package */
  profileName?: string;
  /** (OPTIONAL)  */
  serviceExports?: ServiceExport[];
  status?: Status;
  /** (OPTIONAL) Cluster labels on which we want to deploy the application. */
  targetClusters?: TargetClusters[];
};
export type App = {
  status?: Status;
};
export type AppRead = {
  /** Id of the app (same as Fleet bundle name) which is,
     concatenated from name and deploy_id (uid which comes from k8s). */
  id?: string;
  /** The deployment package app name. */
  name?: string;
  status?: StatusRead;
};
export type DeploymentRead = {
  allAppTargetClusters?: TargetClusters;
  /** The deployment package name to deploy from the catalog. */
  appName: string;
  /** The version of the deployment package. */
  appVersion: string;
  /** Application details. */
  apps?: AppRead[];
  createTime?: GoogleProtobufTimestamp;
  /** The id of the deployment. */
  deployId?: string;
  /** (OPTIONAL) The deployment type for the target cluster deployment can be either auto-scaling or targeted.
     In Auto-scaling type, the application will be automatically deployed on all the
     clusters which match the Target cluster label. In Targeted type, the user has to select among pre created
     clusters to deploy the application. */
  deploymentType?: string;
  /** (OPTIONAL) Deployment display name. */
  displayName?: string;
  /** Deployment name (unique string assigned by Orchestrator). */
  name?: string;
  /** (OPTIONAL) network_name is the name of the interconnect network that deployment be part of */
  networkName?: string;
  /** (OPTIONAL) The Override values can be used to override any of the base profile values based on Deployment scenario. */
  overrideValues?: OverrideValues[];
  /** (OPTIONAL) The selected profile name to be used for the base Helm values of the different applications in the deployment package */
  profileName?: string;
  /** (OPTIONAL)  */
  serviceExports?: ServiceExport[];
  status?: StatusRead;
  /** (OPTIONAL) Cluster labels on which we want to deploy the application. */
  targetClusters?: TargetClusters[];
};
export type ListDeploymentsResponse = {
  /** A list of Deployment Objects. */
  deployments: Deployment[];
  totalElements: number;
};
export type ListDeploymentsResponseRead = {
  /** A list of Deployment Objects. */
  deployments: DeploymentRead[];
  totalElements: number;
};
export type CreateDeploymentResponse = {
  /** Returns the new Deployment Id. */
  deploymentId: string;
};
export type GetDeploymentsStatusResponse = {};
export type GetDeploymentsStatusResponseRead = {
  deploying?: number;
  down?: number;
  error?: number;
  running?: number;
  terminating?: number;
  total?: number;
  unknown?: number;
  updating?: number;
};
export const {
  useGetV1ProjectsByProjectNameAppdeploymentClustersQuery,
  useGetV1ProjectsByProjectNameAppdeploymentDeploymentsQuery,
  usePostV1ProjectsByProjectNameAppdeploymentDeploymentsMutation,
  useGetV1ProjectsByProjectNameSummaryDeploymentsStatusQuery,
} = injectedRtkApi;
