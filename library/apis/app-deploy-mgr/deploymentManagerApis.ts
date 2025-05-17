import { appDeploymentManagerApi as api } from "./apiSlice";
export const addTagTypes = ["ClusterService", "DeploymentService"] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      clusterServiceListClusters: build.query<
        ClusterServiceListClustersApiResponse,
        ClusterServiceListClustersApiArg
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
        providesTags: ["ClusterService"],
      }),
      clusterServiceGetCluster: build.query<
        ClusterServiceGetClusterApiResponse,
        ClusterServiceGetClusterApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/appdeployment/clusters/${queryArg.clusterId}`,
        }),
        providesTags: ["ClusterService"],
      }),
      deploymentServiceListDeployments: build.query<
        DeploymentServiceListDeploymentsApiResponse,
        DeploymentServiceListDeploymentsApiArg
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
        providesTags: ["DeploymentService"],
      }),
      deploymentServiceCreateDeployment: build.mutation<
        DeploymentServiceCreateDeploymentApiResponse,
        DeploymentServiceCreateDeploymentApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/appdeployment/deployments`,
          method: "POST",
          body: queryArg.deployment,
        }),
        invalidatesTags: ["DeploymentService"],
      }),
      deploymentServiceDeleteDeployment: build.mutation<
        DeploymentServiceDeleteDeploymentApiResponse,
        DeploymentServiceDeleteDeploymentApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/appdeployment/deployments/${queryArg.deplId}`,
          method: "DELETE",
          params: { deleteType: queryArg.deleteType },
        }),
        invalidatesTags: ["DeploymentService"],
      }),
      deploymentServiceGetDeployment: build.query<
        DeploymentServiceGetDeploymentApiResponse,
        DeploymentServiceGetDeploymentApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/appdeployment/deployments/${queryArg.deplId}`,
        }),
        providesTags: ["DeploymentService"],
      }),
      deploymentServiceUpdateDeployment: build.mutation<
        DeploymentServiceUpdateDeploymentApiResponse,
        DeploymentServiceUpdateDeploymentApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/appdeployment/deployments/${queryArg.deplId}`,
          method: "PUT",
          body: queryArg.deployment,
        }),
        invalidatesTags: ["DeploymentService"],
      }),
      deploymentServiceListDeploymentClusters: build.query<
        DeploymentServiceListDeploymentClustersApiResponse,
        DeploymentServiceListDeploymentClustersApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/appdeployment/deployments/${queryArg.deplId}/clusters`,
          params: {
            orderBy: queryArg.orderBy,
            filter: queryArg.filter,
            pageSize: queryArg.pageSize,
            offset: queryArg.offset,
          },
        }),
        providesTags: ["DeploymentService"],
      }),
      deploymentServiceListDeploymentsPerCluster: build.query<
        DeploymentServiceListDeploymentsPerClusterApiResponse,
        DeploymentServiceListDeploymentsPerClusterApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/deployments/clusters/${queryArg.clusterId}`,
          params: {
            labels: queryArg.labels,
            orderBy: queryArg.orderBy,
            filter: queryArg.filter,
            pageSize: queryArg.pageSize,
            offset: queryArg.offset,
          },
        }),
        providesTags: ["DeploymentService"],
      }),
      deploymentServiceGetDeploymentsStatus: build.query<
        DeploymentServiceGetDeploymentsStatusApiResponse,
        DeploymentServiceGetDeploymentsStatusApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/summary/deployments_status`,
          params: { labels: queryArg.labels },
        }),
        providesTags: ["DeploymentService"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as deploymentManager };
export type ClusterServiceListClustersApiResponse =
  /** status 200 OK */ ListClustersResponseRead;
export type ClusterServiceListClustersApiArg = {
  /** Optional. A string array that filters cluster labels to be displayed ie color=blue,customer=intel. Labels separated by a comma. */
  labels?: string[];
  /** Optional. Select field and order based on which cluster list will be sorted. */
  orderBy?: string;
  /** Optional. Selection criteria to list clusters. */
  filter?: string;
  /** Optional. Select count of clusters to be listed per page. */
  pageSize?: number;
  /** Optional. Offset is used to select the correct page from which clusters list will be displayed. (E.g If there are 10 clusters, page size is 2 and offset is set as 4, then the response will display clusters 5 and 6). */
  offset?: number;
  /** unique projectName for the resource */
  projectName: string;
};
export type ClusterServiceGetClusterApiResponse =
  /** status 200 OK */ GetClusterResponseRead;
export type ClusterServiceGetClusterApiArg = {
  /** Required. The id of the cluster. */
  clusterId: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type DeploymentServiceListDeploymentsApiResponse =
  /** status 200 OK */ ListDeploymentsResponseRead;
export type DeploymentServiceListDeploymentsApiArg = {
  /** Optional. A string array that filters cluster labels to be displayed ie color=blue,customer=intel-corp. Labels separated by a comma. */
  labels?: string[];
  /** Optional. Select field and order based on which Deployment list will be sorted. */
  orderBy?: string;
  /** Optional. Selection criteria to list Deployments. */
  filter?: string;
  /** Optional. Select count of Deployment to be listed per page. */
  pageSize?: number;
  /** Optional. Offset is used to select the correct page from which Deployment list will be displayed. (E.g If there are 10 Deployments, page size is 2 and offset is set as 4, then the response will display Deployment 5 and 6.) */
  offset?: number;
  /** unique projectName for the resource */
  projectName: string;
};
export type DeploymentServiceCreateDeploymentApiResponse =
  /** status 200 OK */ CreateDeploymentResponse;
export type DeploymentServiceCreateDeploymentApiArg = {
  /** unique projectName for the resource */
  projectName: string;
  deployment: Deployment;
};
export type DeploymentServiceDeleteDeploymentApiResponse = unknown;
export type DeploymentServiceDeleteDeploymentApiArg = {
  /** Required. The id of the deployment to delete. */
  deplId: string;
  /** Required. Different delete types to handle parent and child lists, for dependency support. Available options: PARENT_ONLY, ALL. */
  deleteType?: "PARENT_ONLY" | "ALL";
  /** unique projectName for the resource */
  projectName: string;
};
export type DeploymentServiceGetDeploymentApiResponse =
  /** status 200 OK */ GetDeploymentResponseRead;
export type DeploymentServiceGetDeploymentApiArg = {
  /** Required. The id of the deployment to get. */
  deplId: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type DeploymentServiceUpdateDeploymentApiResponse =
  /** status 200 OK */ UpdateDeploymentResponseRead;
export type DeploymentServiceUpdateDeploymentApiArg = {
  /** Required. The id of the deployment to update. */
  deplId: string;
  /** unique projectName for the resource */
  projectName: string;
  deployment: Deployment;
};
export type DeploymentServiceListDeploymentClustersApiResponse =
  /** status 200 OK */ ListDeploymentClustersResponseRead;
export type DeploymentServiceListDeploymentClustersApiArg = {
  /** Required. The id of the deployment to get. */
  deplId: string;
  /** Optional. Select field and order based on which Deployment cluster list will be sorted. */
  orderBy?: string;
  /** Optional. Selection criteria to list Deployment clusters. */
  filter?: string;
  /** Optional. Select count of Deployment clusters to be listed per page. */
  pageSize?: number;
  /** Optional. Offset is used to select the correct page from which Deployment clusters list will be displayed. (E.g If there are 10 Deployment clusters, page size is 2 and offset is set as 4, then the response will display Deployment clusters 5 and 6.) */
  offset?: number;
  /** unique projectName for the resource */
  projectName: string;
};
export type DeploymentServiceListDeploymentsPerClusterApiResponse =
  /** status 200 OK */ ListDeploymentsPerClusterResponseRead;
export type DeploymentServiceListDeploymentsPerClusterApiArg = {
  clusterId: string;
  /** Optional. A string array that filters cluster labels to be displayed ie color=blue,customer=intel-corp. Labels separated by a comma. */
  labels?: string[];
  /** Optional. Select field and order based on which Deployment list will be sorted. */
  orderBy?: string;
  /** Optional. Selection criteria to list Deployments. */
  filter?: string;
  /** Optional. Select count of Deployment to be listed per page. */
  pageSize?: number;
  /** Optional. Offset is used to select the correct page from which Deployment list will be displayed. (E.g If there are 10 Deployments, page size is 2 and offset is set as 4, then the response will display Deployment 5 and 6.) */
  offset?: number;
  /** unique projectName for the resource */
  projectName: string;
};
export type DeploymentServiceGetDeploymentsStatusApiResponse =
  /** status 200 OK */ GetDeploymentsStatusResponseRead;
export type DeploymentServiceGetDeploymentsStatusApiArg = {
  /** Optional. A string array that filters cluster labels to be displayed ie color=blue,customer=intel-corp. Labels separated by a comma. */
  labels?: string[];
  /** unique projectName for the resource */
  projectName: string;
};
export type ClusterInfo = {};
export type ClusterInfoRead = {
  /** The creation time of the cluster retrieved from Fleet cluster object. */
  createTime?: string;
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
export type DeploymentStatus = {
  summary?: Summary;
};
export type DeploymentStatusRead = {
  message?: string;
  state?:
    | "UNKNOWN"
    | "RUNNING"
    | "DOWN"
    | "INTERNAL_ERROR"
    | "DEPLOYING"
    | "UPDATING"
    | "TERMINATING"
    | "ERROR"
    | "NO_TARGET_CLUSTERS";
  summary?: SummaryRead;
};
export type Cluster = {
  status?: DeploymentStatus;
};
export type App = {
  status?: DeploymentStatus;
};
export type AppRead = {
  /** Id of the app (same as Fleet bundle name) which is, concatenated from name and deploy_id (uid which comes from k8s). */
  id?: string;
  /** The deployment package app name. */
  name?: string;
  status?: DeploymentStatusRead;
};
export type ClusterRead = {
  /** Apps has per-app details. */
  apps?: AppRead[];
  /** ID is the cluster id which ECM generates and assigns to the Rancher cluster name. */
  id?: string;
  /** Name is the display name which user provides and ECM creates and assigns clustername label to Fleet cluster object. */
  name?: string;
  status?: DeploymentStatusRead;
};
export type GetClusterResponse = {
  cluster?: Cluster;
};
export type GetClusterResponseRead = {
  cluster?: ClusterRead;
};
export type TargetClusters = {
  /** The targeted deployment package name. */
  appName?: string;
  /** Cluster id to match the target cluster when targeted deployment. */
  clusterId?: string;
  /** Cluster labels to match the target cluster when auto-scaling deployment. */
  labels?: {
    [key: string]: string;
  };
};
export type OverrideValues = {
  /** deployment package name to use when overriding values. */
  appName: string;
  /** The namespace to deploy the app onto, default namespace is default. */
  targetNamespace?: string;
  /** The YAML representing Helm overrides */
  values?: object;
};
export type ServiceExport = {
  appName: string;
  enabled?: boolean;
};
export type Deployment = {
  allAppTargetClusters?: TargetClusters;
  /** The deployment package name to deploy from the catalog. */
  appName: string;
  /** The version of the deployment package. */
  appVersion: string;
  /** The deployment type for the target cluster deployment can be either auto-scaling or targeted. In Auto-scaling type, the application will be automatically deployed on all the clusters which match the Target cluster label. In Targeted type, the user has to select among pre created clusters to deploy the application. */
  deploymentType?: string;
  /** Deployment display name. */
  displayName?: string;
  /** network_name is the name of the interconnect network that deployment be part of */
  networkName?: string;
  /** The Override values can be used to override any of the base profile values based on Deployment scenario. */
  overrideValues?: OverrideValues[];
  /** The selected profile name to be used for the base Helm values of the different applications in the deployment package */
  profileName?: string;
  serviceExports?: ServiceExport[];
  status?: DeploymentStatus;
  /** Cluster labels on which we want to deploy the application. */
  targetClusters?: TargetClusters[];
};
export type DeploymentRead = {
  allAppTargetClusters?: TargetClusters;
  /** The deployment package name to deploy from the catalog. */
  appName: string;
  /** The version of the deployment package. */
  appVersion: string;
  /** Application details. */
  apps?: AppRead[];
  /** The creation time of the deployment. */
  createTime?: string;
  /** The id of the deployment. */
  deployId?: string;
  /** The deployment type for the target cluster deployment can be either auto-scaling or targeted. In Auto-scaling type, the application will be automatically deployed on all the clusters which match the Target cluster label. In Targeted type, the user has to select among pre created clusters to deploy the application. */
  deploymentType?: string;
  /** Deployment display name. */
  displayName?: string;
  /** Deployment name (unique string assigned by Orchestrator). */
  name?: string;
  /** network_name is the name of the interconnect network that deployment be part of */
  networkName?: string;
  /** The Override values can be used to override any of the base profile values based on Deployment scenario. */
  overrideValues?: OverrideValues[];
  /** The selected profile name to be used for the base Helm values of the different applications in the deployment package */
  profileName?: string;
  serviceExports?: ServiceExport[];
  status?: DeploymentStatusRead;
  /** Cluster labels on which we want to deploy the application. */
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
export type GetDeploymentResponse = {
  deployment: Deployment;
};
export type GetDeploymentResponseRead = {
  deployment: DeploymentRead;
};
export type UpdateDeploymentResponse = {
  deployment: Deployment;
};
export type UpdateDeploymentResponseRead = {
  deployment: DeploymentRead;
};
export type ListDeploymentClustersResponse = {
  clusters: Cluster[];
  totalElements: number;
};
export type ListDeploymentClustersResponseRead = {
  clusters: ClusterRead[];
  totalElements: number;
};
export type DeploymentInstancesCluster = {
  /** Deployment display name. */
  deploymentDisplayName?: string;
  status?: DeploymentStatus;
};
export type DeploymentInstancesClusterRead = {
  /** Apps has per-app details. */
  apps?: AppRead[];
  /** Deployment display name. */
  deploymentDisplayName?: string;
  /** Deployment name (unique string assigned by Orchestrator). */
  deploymentName?: string;
  /** Deployment CR UID. */
  deploymentUid?: string;
  status?: DeploymentStatusRead;
};
export type ListDeploymentsPerClusterResponse = {
  /** A list of Deployment Instance Cluster Objects. */
  deploymentInstancesCluster: DeploymentInstancesCluster[];
  totalElements: number;
};
export type ListDeploymentsPerClusterResponseRead = {
  /** A list of Deployment Instance Cluster Objects. */
  deploymentInstancesCluster: DeploymentInstancesClusterRead[];
  totalElements: number;
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
  useClusterServiceListClustersQuery,
  useClusterServiceGetClusterQuery,
  useDeploymentServiceListDeploymentsQuery,
  useDeploymentServiceCreateDeploymentMutation,
  useDeploymentServiceDeleteDeploymentMutation,
  useDeploymentServiceGetDeploymentQuery,
  useDeploymentServiceUpdateDeploymentMutation,
  useDeploymentServiceListDeploymentClustersQuery,
  useDeploymentServiceListDeploymentsPerClusterQuery,
  useDeploymentServiceGetDeploymentsStatusQuery,
} = injectedRtkApi;
