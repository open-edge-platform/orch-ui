import { coApi as api } from "./apiSlice";
export const addTagTypes = ["ECM Cluster", "ECM Kubeconfig"] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getV1ProjectsByProjectNameClusters: build.query<
        GetV1ProjectsByProjectNameClustersApiResponse,
        GetV1ProjectsByProjectNameClustersApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/clusters`,
          params: {
            pageSize: queryArg.pageSize,
            offset: queryArg.offset,
            orderBy: queryArg.orderBy,
            filter: queryArg.filter,
          },
        }),
        providesTags: ["ECM Cluster"],
      }),
      postV1ProjectsByProjectNameClusters: build.mutation<
        PostV1ProjectsByProjectNameClustersApiResponse,
        PostV1ProjectsByProjectNameClustersApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/clusters`,
          method: "POST",
          body: queryArg.clusterSpec,
        }),
        invalidatesTags: ["ECM Cluster"],
      }),
      getV1ProjectsByProjectNameClustersAndClusterIdKubeconfigs: build.query<
        GetV1ProjectsByProjectNameClustersAndClusterIdKubeconfigsApiResponse,
        GetV1ProjectsByProjectNameClustersAndClusterIdKubeconfigsApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/clusters/${queryArg.clusterId}/kubeconfigs`,
        }),
        providesTags: ["ECM Kubeconfig"],
      }),
      deleteV1ProjectsByProjectNameClustersAndClusterName: build.mutation<
        DeleteV1ProjectsByProjectNameClustersAndClusterNameApiResponse,
        DeleteV1ProjectsByProjectNameClustersAndClusterNameApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/clusters/${queryArg.clusterName}`,
          method: "DELETE",
        }),
        invalidatesTags: ["ECM Cluster"],
      }),
      getV1ProjectsByProjectNameClustersAndClusterName: build.query<
        GetV1ProjectsByProjectNameClustersAndClusterNameApiResponse,
        GetV1ProjectsByProjectNameClustersAndClusterNameApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/clusters/${queryArg.clusterName}`,
        }),
        providesTags: ["ECM Cluster"],
      }),
      postV1ProjectsByProjectNameClustersAndClusterName: build.mutation<
        PostV1ProjectsByProjectNameClustersAndClusterNameApiResponse,
        PostV1ProjectsByProjectNameClustersAndClusterNameApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/clusters/${queryArg.clusterName}`,
          method: "POST",
        }),
        invalidatesTags: ["ECM Cluster"],
      }),
      putV1ProjectsByProjectNameClustersAndClusterName: build.mutation<
        PutV1ProjectsByProjectNameClustersAndClusterNameApiResponse,
        PutV1ProjectsByProjectNameClustersAndClusterNameApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/clusters/${queryArg.clusterName}`,
          method: "PUT",
          body: queryArg.clusterConfig,
        }),
        invalidatesTags: ["ECM Cluster"],
      }),
      putV1ProjectsByProjectNameClustersAndClusterNameLabels: build.mutation<
        PutV1ProjectsByProjectNameClustersAndClusterNameLabelsApiResponse,
        PutV1ProjectsByProjectNameClustersAndClusterNameLabelsApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/clusters/${queryArg.clusterName}/labels`,
          method: "PUT",
          body: queryArg.clusterLabels,
        }),
        invalidatesTags: ["ECM Cluster"],
      }),
      putV1ProjectsByProjectNameClustersAndClusterNameNodes: build.mutation<
        PutV1ProjectsByProjectNameClustersAndClusterNameNodesApiResponse,
        PutV1ProjectsByProjectNameClustersAndClusterNameNodesApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/clusters/${queryArg.clusterName}/nodes`,
          method: "PUT",
          body: queryArg.clusterNodes,
        }),
        invalidatesTags: ["ECM Cluster"],
      }),
      putV1ProjectsByProjectNameClustersAndClusterNameNodesNodeUuid:
        build.mutation<
          PutV1ProjectsByProjectNameClustersAndClusterNameNodesNodeUuidApiResponse,
          PutV1ProjectsByProjectNameClustersAndClusterNameNodesNodeUuidApiArg
        >({
          query: (queryArg) => ({
            url: `/v1/projects/${queryArg.projectName}/clusters/${queryArg.clusterName}/nodes/${queryArg.nodeUuid}`,
            method: "PUT",
            body: queryArg.nodeOperation,
          }),
          invalidatesTags: ["ECM Cluster"],
        }),
      putV1ProjectsByProjectNameClustersAndClusterNameTemplate: build.mutation<
        PutV1ProjectsByProjectNameClustersAndClusterNameTemplateApiResponse,
        PutV1ProjectsByProjectNameClustersAndClusterNameTemplateApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/clusters/${queryArg.clusterName}/template`,
          method: "PUT",
          body: queryArg.clusterTemplateInfo,
        }),
        invalidatesTags: ["ECM Cluster"],
      }),
      getV1ProjectsByProjectNameClustersAndNodeUuidClusterdetail: build.query<
        GetV1ProjectsByProjectNameClustersAndNodeUuidClusterdetailApiResponse,
        GetV1ProjectsByProjectNameClustersAndNodeUuidClusterdetailApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/clusters/${queryArg.nodeUuid}/clusterdetail`,
        }),
        providesTags: ["ECM Cluster"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as clusterManagerApis };
export type GetV1ProjectsByProjectNameClustersApiResponse =
  /** status 200 OK */ ClusterInfoListRead;
export type GetV1ProjectsByProjectNameClustersApiArg = {
  /** The maximum number of items to return. */
  pageSize?: number;
  /** Index of the first item to return. It is almost always used in conjunction with the 'pageSize' query. */
  offset?: number;
  /** The ordering of the entries. "asc" and "desc" are valid values. If none is specified, "asc" is used. */
  orderBy?: string;
  /** Filters the entries based on the filter provided. */
  filter?: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type PostV1ProjectsByProjectNameClustersApiResponse =
  /** status 201 OK */ string;
export type PostV1ProjectsByProjectNameClustersApiArg = {
  /** unique projectName for the resource */
  projectName: string;
  clusterSpec: ClusterSpec;
};
export type GetV1ProjectsByProjectNameClustersAndClusterIdKubeconfigsApiResponse =
  /** status 200 OK */ KubeconfigInfo;
export type GetV1ProjectsByProjectNameClustersAndClusterIdKubeconfigsApiArg = {
  clusterId: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type DeleteV1ProjectsByProjectNameClustersAndClusterNameApiResponse =
  unknown;
export type DeleteV1ProjectsByProjectNameClustersAndClusterNameApiArg = {
  clusterName: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type GetV1ProjectsByProjectNameClustersAndClusterNameApiResponse =
  /** status 200 OK */ ClusterDetailInfoRead;
export type GetV1ProjectsByProjectNameClustersAndClusterNameApiArg = {
  clusterName: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type PostV1ProjectsByProjectNameClustersAndClusterNameApiResponse =
  /** status 201 OK */ ClusterInfoRead;
export type PostV1ProjectsByProjectNameClustersAndClusterNameApiArg = {
  clusterName: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type PutV1ProjectsByProjectNameClustersAndClusterNameApiResponse =
  /** status 200 The cluster is updated successfully. */ void;
export type PutV1ProjectsByProjectNameClustersAndClusterNameApiArg = {
  clusterName: string;
  /** unique projectName for the resource */
  projectName: string;
  clusterConfig: ClusterConfig;
};
export type PutV1ProjectsByProjectNameClustersAndClusterNameLabelsApiResponse =
  /** status 200 The cluster labels are updated successfully. */ void;
export type PutV1ProjectsByProjectNameClustersAndClusterNameLabelsApiArg = {
  clusterName: string;
  /** unique projectName for the resource */
  projectName: string;
  clusterLabels: ClusterLabels;
};
export type PutV1ProjectsByProjectNameClustersAndClusterNameNodesApiResponse =
  /** status 200 The cluster nodes are updated successfully. */ void;
export type PutV1ProjectsByProjectNameClustersAndClusterNameNodesApiArg = {
  clusterName: string;
  /** unique projectName for the resource */
  projectName: string;
  clusterNodes: ClusterNodes;
};
export type PutV1ProjectsByProjectNameClustersAndClusterNameNodesNodeUuidApiResponse =
  /** status 200 The cluster node is operated successfully. */ void;
export type PutV1ProjectsByProjectNameClustersAndClusterNameNodesNodeUuidApiArg =
  {
    clusterName: string;
    nodeUuid: string;
    /** unique projectName for the resource */
    projectName: string;
    nodeOperation: NodeOperation;
  };
export type PutV1ProjectsByProjectNameClustersAndClusterNameTemplateApiResponse =
  /** status 202 The cluster template update request is accepted. */ void;
export type PutV1ProjectsByProjectNameClustersAndClusterNameTemplateApiArg = {
  clusterName: string;
  /** unique projectName for the resource */
  projectName: string;
  clusterTemplateInfo: ClusterTemplateInfo;
};
export type GetV1ProjectsByProjectNameClustersAndNodeUuidClusterdetailApiResponse =
  /** status 200 OK */ ClusterDetailInfoRead;
export type GetV1ProjectsByProjectNameClustersAndNodeUuidClusterdetailApiArg = {
  nodeUuid: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type StatusIndicator =
  | "STATUS_INDICATION_UNSPECIFIED"
  | "STATUS_INDICATION_ERROR"
  | "STATUS_INDICATION_IN_PROGRESS"
  | "STATUS_INDICATION_IDLE";
export type StatusIndicatorRead =
  | "STATUS_INDICATION_UNSPECIFIED"
  | "STATUS_INDICATION_ERROR"
  | "STATUS_INDICATION_IN_PROGRESS"
  | "STATUS_INDICATION_IDLE";
export type GenericStatus = {
  indicator: StatusIndicator;
};
export type GenericStatusRead = {
  indicator: StatusIndicatorRead;
  /** A human-readable status message. */
  message: string;
  /** A Unix, UTC timestamp when the status was last updated. */
  timestamp: number;
};
export type Location = {
  locationInfo?: string;
  locationType?:
    | "LOCATION_TYPE_SITE_ID"
    | "LOCATION_TYPE_SITE_NAME"
    | "LOCATION_TYPE_REGION_ID"
    | "LOCATION_TYPE_REGION_NAME";
};
export type ClusterInfo = {
  appAgentStatus?: GenericStatus;
  clusterID?: string;
  clusterLabels?: object;
  kubernetesVersion?: string;
  lifecyclePhase?: GenericStatus;
  locationList?: Location[];
  name?: string;
  nodeHealth?: GenericStatus;
  nodeQuantity?: number;
  projectID?: string;
  providerStatus?: GenericStatus;
  resourceStatus?: GenericStatus;
  status?:
    | "init"
    | "creating"
    | "reconciling"
    | "active"
    | "updating"
    | "removing"
    | "inactive"
    | "error";
};
export type ClusterInfoRead = {
  appAgentStatus?: GenericStatusRead;
  clusterID?: string;
  clusterLabels?: object;
  kubernetesVersion?: string;
  lifecyclePhase?: GenericStatusRead;
  locationList?: Location[];
  name?: string;
  nodeHealth?: GenericStatusRead;
  nodeQuantity?: number;
  projectID?: string;
  providerStatus?: GenericStatusRead;
  resourceStatus?: GenericStatusRead;
  status?:
    | "init"
    | "creating"
    | "reconciling"
    | "active"
    | "updating"
    | "removing"
    | "inactive"
    | "error";
};
export type ClusterInfoList = {
  clusterInfoList?: ClusterInfo[];
  /** The count of items in the entire list, regardless of pagination. */
  totalElements: number;
};
export type ClusterInfoListRead = {
  clusterInfoList?: ClusterInfoRead[];
  /** The count of items in the entire list, regardless of pagination. */
  totalElements: number;
};
export type NodeSpec = {
  /** The unique identifier of this host in Edge IaaS */
  nodeGuid: string;
  nodeRole: "all" | "controlplane" | "worker";
};
export type ClusterSpec = {
  /** Labels are key/value pairs that need to conform to https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/#syntax-and-character-set */
  clusterLabels: {
    [key: string]: string;
  };
  clusterName?: string;
  clusterTemplateName?: string;
  locationList: Location[];
  nodeList: NodeSpec[];
  projectID?: string;
};
export type KubeconfigInfo = {
  id?: string;
  kubeconfig?: string;
};
export type NodeResourceAvailability = {
  cpu?: string;
  memory?: string;
  netVFs?: number;
};
export type NodeResourceCapacity = {
  cpu?: string;
  memory?: string;
  netVFs?: number;
};
export type NodeResources = {
  availability?: NodeResourceAvailability;
  capacity?: NodeResourceCapacity;
};
export type StatusInfo = {
  condition?:
    | "STATUS_CONDITION_UNKNOWN"
    | "STATUS_CONDITION_READY"
    | "STATUS_CONDITION_NOTREADY"
    | "STATUS_CONDITION_PROVISIONING"
    | "STATUS_CONDITION_REMOVING";
  reason?: string;
  timestamp?: string;
};
export type NodeInfo = {
  /** The unique identifier of this host in Edge IaaS. */
  guid?: string;
  id?: string;
  name?: string;
  os?: string;
  projectID?: string;
  resources?: NodeResources;
  role?: string;
  serial?: string;
  status?: StatusInfo;
};
export type NodeInfoList = {
  nodeInfoList?: NodeInfo[];
};
export type ClusterResourceAvailability = {
  cpu?: string;
  memory?: string;
  netVFs?: number;
  pods?: number;
};
export type ClusterResourceCapacity = {
  cpu?: string;
  memory?: string;
  netVFs?: number;
  pods?: number;
};
export type ClusterResources = {
  availability?: ClusterResourceAvailability;
  capacity?: ClusterResourceCapacity;
};
export type ClusterDetailInfo = {
  appAgentStatus?: GenericStatus;
  clusterID?: string;
  clusterLabels?: object;
  clusterTemplateName?: string;
  kubernetesVersion?: string;
  lifecyclePhase?: GenericStatus;
  name?: string;
  nodeHealth?: GenericStatus;
  nodes?: NodeInfoList;
  projectID?: string;
  providerStatus?: GenericStatus;
  resourceStatus?: GenericStatus;
  resources?: ClusterResources;
  status?:
    | "init"
    | "creating"
    | "reconciling"
    | "active"
    | "updating"
    | "removing"
    | "inactive"
    | "error";
  userDefinedLabelKeys?: string[];
};
export type ClusterDetailInfoRead = {
  appAgentStatus?: GenericStatusRead;
  clusterID?: string;
  clusterLabels?: object;
  clusterTemplateName?: string;
  kubernetesVersion?: string;
  lifecyclePhase?: GenericStatusRead;
  name?: string;
  nodeHealth?: GenericStatusRead;
  nodes?: NodeInfoList;
  projectID?: string;
  providerStatus?: GenericStatusRead;
  resourceStatus?: GenericStatusRead;
  resources?: ClusterResources;
  status?:
    | "init"
    | "creating"
    | "reconciling"
    | "active"
    | "updating"
    | "removing"
    | "inactive"
    | "error";
  userDefinedLabelKeys?: string[];
};
export type ErrorResponse = {
  /** error message */
  message?: string;
};
export type Metadata = {
  labels?: object;
  name?: string;
};
export type Spec = {
  kubernetesVersion?: string;
  rkeConfig?: object;
};
export type ClusterConfig = {
  metadata?: Metadata;
  spec?: Spec;
};
export type ClusterLabels = {
  /** Labels are key/value pairs that need to conform to https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/#syntax-and-character-set */
  labels?: {
    [key: string]: string;
  };
  /** Adds all user-defined label keys in this array. */
  userDefinedLabelKeys?: string[];
};
export type ClusterNodes = {
  nodeList: NodeSpec[];
};
export type NodeOperation = {
  /** Node operation */
  action: "remove" | "forceremove";
};
export type ClusterTemplateInfo = {
  /** Cluster template name */
  name: string;
  /** Cluster template version */
  version: string;
};
export const {
  useGetV1ProjectsByProjectNameClustersQuery,
  usePostV1ProjectsByProjectNameClustersMutation,
  useGetV1ProjectsByProjectNameClustersAndClusterIdKubeconfigsQuery,
  useDeleteV1ProjectsByProjectNameClustersAndClusterNameMutation,
  useGetV1ProjectsByProjectNameClustersAndClusterNameQuery,
  usePostV1ProjectsByProjectNameClustersAndClusterNameMutation,
  usePutV1ProjectsByProjectNameClustersAndClusterNameMutation,
  usePutV1ProjectsByProjectNameClustersAndClusterNameLabelsMutation,
  usePutV1ProjectsByProjectNameClustersAndClusterNameNodesMutation,
  usePutV1ProjectsByProjectNameClustersAndClusterNameNodesNodeUuidMutation,
  usePutV1ProjectsByProjectNameClustersAndClusterNameTemplateMutation,
  useGetV1ProjectsByProjectNameClustersAndNodeUuidClusterdetailQuery,
} = injectedRtkApi;
