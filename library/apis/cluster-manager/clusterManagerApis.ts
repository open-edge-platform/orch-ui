import { coApi as api } from "./apiSlice";
export const addTagTypes = [
  "Clusters",
  "Kubeconfigs",
  "Cluster Templates",
] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getV2ProjectsByProjectNameClusters: build.query<
        GetV2ProjectsByProjectNameClustersApiResponse,
        GetV2ProjectsByProjectNameClustersApiArg
      >({
        query: (queryArg) => ({
          url: `/v2/projects/${queryArg.projectName}/clusters`,
          params: {
            pageSize: queryArg.pageSize,
            offset: queryArg.offset,
            orderBy: queryArg.orderBy,
            filter: queryArg.filter,
          },
        }),
        providesTags: ["Clusters"],
      }),
      postV2ProjectsByProjectNameClusters: build.mutation<
        PostV2ProjectsByProjectNameClustersApiResponse,
        PostV2ProjectsByProjectNameClustersApiArg
      >({
        query: (queryArg) => ({
          url: `/v2/projects/${queryArg.projectName}/clusters`,
          method: "POST",
          body: queryArg.clusterSpec,
        }),
        invalidatesTags: ["Clusters"],
      }),
      deleteV2ProjectsByProjectNameClustersAndName: build.mutation<
        DeleteV2ProjectsByProjectNameClustersAndNameApiResponse,
        DeleteV2ProjectsByProjectNameClustersAndNameApiArg
      >({
        query: (queryArg) => ({
          url: `/v2/projects/${queryArg.projectName}/clusters/${queryArg.name}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Clusters"],
      }),
      getV2ProjectsByProjectNameClustersAndName: build.query<
        GetV2ProjectsByProjectNameClustersAndNameApiResponse,
        GetV2ProjectsByProjectNameClustersAndNameApiArg
      >({
        query: (queryArg) => ({
          url: `/v2/projects/${queryArg.projectName}/clusters/${queryArg.name}`,
        }),
        providesTags: ["Clusters"],
      }),
      getV2ProjectsByProjectNameClustersAndNameKubeconfigs: build.query<
        GetV2ProjectsByProjectNameClustersAndNameKubeconfigsApiResponse,
        GetV2ProjectsByProjectNameClustersAndNameKubeconfigsApiArg
      >({
        query: (queryArg) => ({
          url: `/v2/projects/${queryArg.projectName}/clusters/${queryArg.name}/kubeconfigs`,
        }),
        providesTags: ["Kubeconfigs"],
      }),
      putV2ProjectsByProjectNameClustersAndNameLabels: build.mutation<
        PutV2ProjectsByProjectNameClustersAndNameLabelsApiResponse,
        PutV2ProjectsByProjectNameClustersAndNameLabelsApiArg
      >({
        query: (queryArg) => ({
          url: `/v2/projects/${queryArg.projectName}/clusters/${queryArg.name}/labels`,
          method: "PUT",
          body: queryArg.clusterLabels,
        }),
        invalidatesTags: ["Clusters"],
      }),
      putV2ProjectsByProjectNameClustersAndNameNodes: build.mutation<
        PutV2ProjectsByProjectNameClustersAndNameNodesApiResponse,
        PutV2ProjectsByProjectNameClustersAndNameNodesApiArg
      >({
        query: (queryArg) => ({
          url: `/v2/projects/${queryArg.projectName}/clusters/${queryArg.name}/nodes`,
          method: "PUT",
          body: queryArg.body,
        }),
        invalidatesTags: ["Clusters"],
      }),
      deleteV2ProjectsByProjectNameClustersAndNameNodesNodeId: build.mutation<
        DeleteV2ProjectsByProjectNameClustersAndNameNodesNodeIdApiResponse,
        DeleteV2ProjectsByProjectNameClustersAndNameNodesNodeIdApiArg
      >({
        query: (queryArg) => ({
          url: `/v2/projects/${queryArg.projectName}/clusters/${queryArg.name}/nodes/${queryArg.nodeId}`,
          method: "DELETE",
          params: { force: queryArg.force },
        }),
        invalidatesTags: ["Clusters"],
      }),
      putV2ProjectsByProjectNameClustersAndNameTemplate: build.mutation<
        PutV2ProjectsByProjectNameClustersAndNameTemplateApiResponse,
        PutV2ProjectsByProjectNameClustersAndNameTemplateApiArg
      >({
        query: (queryArg) => ({
          url: `/v2/projects/${queryArg.projectName}/clusters/${queryArg.name}/template`,
          method: "PUT",
          body: queryArg.clusterTemplateInfo,
        }),
        invalidatesTags: ["Clusters"],
      }),
      getV2ProjectsByProjectNameClustersAndNodeIdClusterdetail: build.query<
        GetV2ProjectsByProjectNameClustersAndNodeIdClusterdetailApiResponse,
        GetV2ProjectsByProjectNameClustersAndNodeIdClusterdetailApiArg
      >({
        query: (queryArg) => ({
          url: `/v2/projects/${queryArg.projectName}/clusters/${queryArg.nodeId}/clusterdetail`,
        }),
        providesTags: ["Clusters"],
      }),
      getV2ProjectsByProjectNameClustersSummary: build.query<
        GetV2ProjectsByProjectNameClustersSummaryApiResponse,
        GetV2ProjectsByProjectNameClustersSummaryApiArg
      >({
        query: (queryArg) => ({
          url: `/v2/projects/${queryArg.projectName}/clusters/summary`,
        }),
        providesTags: ["Clusters"],
      }),
      getV2ProjectsByProjectNameTemplates: build.query<
        GetV2ProjectsByProjectNameTemplatesApiResponse,
        GetV2ProjectsByProjectNameTemplatesApiArg
      >({
        query: (queryArg) => ({
          url: `/v2/projects/${queryArg.projectName}/templates`,
          params: { default: queryArg["default"] },
        }),
        providesTags: ["Cluster Templates"],
      }),
      postV2ProjectsByProjectNameTemplates: build.mutation<
        PostV2ProjectsByProjectNameTemplatesApiResponse,
        PostV2ProjectsByProjectNameTemplatesApiArg
      >({
        query: (queryArg) => ({
          url: `/v2/projects/${queryArg.projectName}/templates`,
          method: "POST",
          body: queryArg.templateInfo,
        }),
        invalidatesTags: ["Cluster Templates"],
      }),
      putV2ProjectsByProjectNameTemplatesAndNameDefault: build.mutation<
        PutV2ProjectsByProjectNameTemplatesAndNameDefaultApiResponse,
        PutV2ProjectsByProjectNameTemplatesAndNameDefaultApiArg
      >({
        query: (queryArg) => ({
          url: `/v2/projects/${queryArg.projectName}/templates/${queryArg.name}/default`,
          method: "PUT",
          body: queryArg.defaultTemplateInfo,
        }),
        invalidatesTags: ["Cluster Templates"],
      }),
      getV2ProjectsByProjectNameTemplatesAndNameVersions: build.query<
        GetV2ProjectsByProjectNameTemplatesAndNameVersionsApiResponse,
        GetV2ProjectsByProjectNameTemplatesAndNameVersionsApiArg
      >({
        query: (queryArg) => ({
          url: `/v2/projects/${queryArg.projectName}/templates/${queryArg.name}/versions`,
        }),
        providesTags: ["Cluster Templates"],
      }),
      deleteV2ProjectsByProjectNameTemplatesAndNameVersionsVersion:
        build.mutation<
          DeleteV2ProjectsByProjectNameTemplatesAndNameVersionsVersionApiResponse,
          DeleteV2ProjectsByProjectNameTemplatesAndNameVersionsVersionApiArg
        >({
          query: (queryArg) => ({
            url: `/v2/projects/${queryArg.projectName}/templates/${queryArg.name}/versions/${queryArg.version}`,
            method: "DELETE",
          }),
          invalidatesTags: ["Cluster Templates"],
        }),
      getV2ProjectsByProjectNameTemplatesAndNameVersionsVersion: build.query<
        GetV2ProjectsByProjectNameTemplatesAndNameVersionsVersionApiResponse,
        GetV2ProjectsByProjectNameTemplatesAndNameVersionsVersionApiArg
      >({
        query: (queryArg) => ({
          url: `/v2/projects/${queryArg.projectName}/templates/${queryArg.name}/versions/${queryArg.version}`,
        }),
        providesTags: ["Cluster Templates"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as clusterManagerApis };
export type GetV2ProjectsByProjectNameClustersApiResponse =
  /** status 200 OK */ {
    clusters?: ClusterInfoRead[];
    /** The count of items in the entire list, regardless of pagination. */
    totalElements: number;
  };
export type GetV2ProjectsByProjectNameClustersApiArg = {
  /** unique projectName for the resource */
  projectName: string;
  /** The maximum number of items to return. */
  pageSize?: number;
  /** Index of the first item to return. It is almost always used in conjunction with the 'pageSize' query. */
  offset?: number;
  /** The ordering of the entries. "asc" and "desc" are valid values. If none is specified, "asc" is used. */
  orderBy?: string;
  /** Filters the entries based on the filter provided. */
  filter?: string;
};
export type PostV2ProjectsByProjectNameClustersApiResponse =
  /** status 201 OK */ string;
export type PostV2ProjectsByProjectNameClustersApiArg = {
  /** unique projectName for the resource */
  projectName: string;
  clusterSpec: ClusterSpec;
};
export type DeleteV2ProjectsByProjectNameClustersAndNameApiResponse =
  /** status 204 OK */ void;
export type DeleteV2ProjectsByProjectNameClustersAndNameApiArg = {
  name: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type GetV2ProjectsByProjectNameClustersAndNameApiResponse =
  /** status 200 OK */ ClusterDetailInfoRead;
export type GetV2ProjectsByProjectNameClustersAndNameApiArg = {
  name: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type GetV2ProjectsByProjectNameClustersAndNameKubeconfigsApiResponse =
  /** status 200 OK */ KubeconfigInfo;
export type GetV2ProjectsByProjectNameClustersAndNameKubeconfigsApiArg = {
  name: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type PutV2ProjectsByProjectNameClustersAndNameLabelsApiResponse =
  /** status 200 The cluster labels are updated successfully. */ void;
export type PutV2ProjectsByProjectNameClustersAndNameLabelsApiArg = {
  name: string;
  /** unique projectName for the resource */
  projectName: string;
  clusterLabels: ClusterLabels;
};
export type PutV2ProjectsByProjectNameClustersAndNameNodesApiResponse =
  /** status 200 The cluster nodes are updated successfully. */ void;
export type PutV2ProjectsByProjectNameClustersAndNameNodesApiArg = {
  name: string;
  /** unique projectName for the resource */
  projectName: string;
  body: NodeSpec[];
};
export type DeleteV2ProjectsByProjectNameClustersAndNameNodesNodeIdApiResponse =
  /** status 200 The cluster node is operated successfully. */ void;
export type DeleteV2ProjectsByProjectNameClustersAndNameNodesNodeIdApiArg = {
  name: string;
  nodeId: string;
  /** When set to true, force deletes the edge node. */
  force?: boolean;
  /** unique projectName for the resource */
  projectName: string;
};
export type PutV2ProjectsByProjectNameClustersAndNameTemplateApiResponse =
  /** status 202 The cluster template update request is accepted. */ void;
export type PutV2ProjectsByProjectNameClustersAndNameTemplateApiArg = {
  name: string;
  /** unique projectName for the resource */
  projectName: string;
  clusterTemplateInfo: ClusterTemplateInfo;
};
export type GetV2ProjectsByProjectNameClustersAndNodeIdClusterdetailApiResponse =
  /** status 200 OK */ ClusterDetailInfoRead;
export type GetV2ProjectsByProjectNameClustersAndNodeIdClusterdetailApiArg = {
  nodeId: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type GetV2ProjectsByProjectNameClustersSummaryApiResponse =
  /** status 200 OK */ ClusterSummary;
export type GetV2ProjectsByProjectNameClustersSummaryApiArg = {
  /** unique projectName for the resource */
  projectName: string;
};
export type GetV2ProjectsByProjectNameTemplatesApiResponse =
  /** status 200 OK */ TemplateInfoList;
export type GetV2ProjectsByProjectNameTemplatesApiArg = {
  /** unique projectName for the resource */
  projectName: string;
  /** When set to true, gets only the default template information */
  default?: boolean;
};
export type PostV2ProjectsByProjectNameTemplatesApiResponse =
  /** status 201 OK */ string;
export type PostV2ProjectsByProjectNameTemplatesApiArg = {
  /** unique projectName for the resource */
  projectName: string;
  templateInfo: TemplateInfo;
};
export type PutV2ProjectsByProjectNameTemplatesAndNameDefaultApiResponse =
  /** status 200 OK */ void;
export type PutV2ProjectsByProjectNameTemplatesAndNameDefaultApiArg = {
  /** Name of the template */
  name: string;
  /** unique projectName for the resource */
  projectName: string;
  defaultTemplateInfo: DefaultTemplateInfo;
};
export type GetV2ProjectsByProjectNameTemplatesAndNameVersionsApiResponse =
  /** status 200 OK */ VersionList;
export type GetV2ProjectsByProjectNameTemplatesAndNameVersionsApiArg = {
  /** Name of the template */
  name: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type DeleteV2ProjectsByProjectNameTemplatesAndNameVersionsVersionApiResponse =
  /** status 204 OK */ void;
export type DeleteV2ProjectsByProjectNameTemplatesAndNameVersionsVersionApiArg =
  {
    /** Name of the template */
    name: string;
    /** Version of the template in the format of 'vX.Y.Z' */
    version: string;
    /** unique projectName for the resource */
    projectName: string;
  };
export type GetV2ProjectsByProjectNameTemplatesAndNameVersionsVersionApiResponse =
  /** status 200 OK */ TemplateInfo;
export type GetV2ProjectsByProjectNameTemplatesAndNameVersionsVersionApiArg = {
  /** Name of the template */
  name: string;
  /** Version of the template in the format of 'vX.Y.Z' */
  version: string;
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
export type ClusterInfo = {
  controlPlaneReady?: GenericStatus;
  infrastructureReady?: GenericStatus;
  kubernetesVersion?: string;
  labels?: object;
  lifecyclePhase?: GenericStatus;
  name?: string;
  nodeHealth?: GenericStatus;
  nodeQuantity?: number;
  providerStatus?: GenericStatus;
};
export type ClusterInfoRead = {
  controlPlaneReady?: GenericStatusRead;
  infrastructureReady?: GenericStatusRead;
  kubernetesVersion?: string;
  labels?: object;
  lifecyclePhase?: GenericStatusRead;
  name?: string;
  nodeHealth?: GenericStatusRead;
  nodeQuantity?: number;
  providerStatus?: GenericStatusRead;
};
export type ProblemDetails = {
  /** error message */
  message?: string;
};
export type NodeSpec = {
  /** The unique identifier of this host. */
  id: string;
  role: "all" | "controlplane" | "worker";
};
export type ClusterSpec = {
  /** Labels are key/value pairs that need to conform to https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/#syntax-and-character-set */
  labels?: {
    [key: string]: string;
  };
  name?: string;
  nodes: NodeSpec[];
  template?: string;
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
  /** The unique identifier of this host. */
  id?: string;
  name?: string;
  os?: string;
  role?: string;
  status?: StatusInfo;
};
export type ClusterDetailInfo = {
  controlPlaneReady?: GenericStatus;
  infrastructureReady?: GenericStatus;
  kubernetesVersion?: string;
  labels?: object;
  lifecyclePhase?: GenericStatus;
  name?: string;
  nodeHealth?: GenericStatus;
  nodes?: NodeInfo[];
  providerStatus?: GenericStatus;
  template?: string;
};
export type ClusterDetailInfoRead = {
  controlPlaneReady?: GenericStatusRead;
  infrastructureReady?: GenericStatusRead;
  kubernetesVersion?: string;
  labels?: object;
  lifecyclePhase?: GenericStatusRead;
  name?: string;
  nodeHealth?: GenericStatusRead;
  nodes?: NodeInfo[];
  providerStatus?: GenericStatusRead;
  template?: string;
};
export type KubeconfigInfo = {
  id?: string;
  kubeconfig?: string;
};
export type ClusterLabels = {
  /** Labels are key/value pairs that need to conform to https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/#syntax-and-character-set */
  labels?: {
    [key: string]: string;
  };
};
export type ClusterTemplateInfo = {
  /** Name of the template */
  name: string;
  /** Cluster template version in the format of 'vX.Y.Z' */
  version: string;
};
export type ClusterSummary = {
  /** The number of clusters that are in error state. */
  error: number;
  /** The number of clusters that are in progess state (provisioning/deleting). */
  inProgress: number;
  /** The number of clusters that are ready. */
  ready: number;
  /** The total number of clusters. */
  totalClusters: number;
  /** The number of clusters that are in unknown state. */
  unknown: number;
};
export type DefaultTemplateInfo = {
  /** Name of the template. Not required when setting the default, is available in GET /v1/templates. */
  name?: string;
  /** Template version. If set to empty, the latest version will be used as default. */
  version: string;
};
export type NetworkRanges = {
  /** A list of CIDR blocks in valid CIDR notation. */
  cidrBlocks: string[];
};
export type ClusterNetwork = {
  pods?: NetworkRanges;
  services?: NetworkRanges;
};
export type TemplateInfo = {
  /** Allows users to specify a list of key/value pairs to be attached to a cluster created with the template. These pairs need to conform to https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/#syntax-and-character-set */
  "cluster-labels"?: {
    [key: string]: string;
  };
  clusterNetwork?: ClusterNetwork;
  clusterconfiguration?: object;
  controlplaneprovidertype?: "kubeadm" | "rke2";
  description?: string;
  infraprovidertype?: "docker" | "intel";
  kubernetesVersion: string;
  name: string;
  version: string;
};
export type TemplateInfoList = {
  defaultTemplateInfo?: DefaultTemplateInfo;
  templateInfoList?: TemplateInfo[];
};
export type VersionList = {
  versionList?: string[];
};
export const {
  useGetV2ProjectsByProjectNameClustersQuery,
  usePostV2ProjectsByProjectNameClustersMutation,
  useDeleteV2ProjectsByProjectNameClustersAndNameMutation,
  useGetV2ProjectsByProjectNameClustersAndNameQuery,
  useGetV2ProjectsByProjectNameClustersAndNameKubeconfigsQuery,
  usePutV2ProjectsByProjectNameClustersAndNameLabelsMutation,
  usePutV2ProjectsByProjectNameClustersAndNameNodesMutation,
  useDeleteV2ProjectsByProjectNameClustersAndNameNodesNodeIdMutation,
  usePutV2ProjectsByProjectNameClustersAndNameTemplateMutation,
  useGetV2ProjectsByProjectNameClustersAndNodeIdClusterdetailQuery,
  useGetV2ProjectsByProjectNameClustersSummaryQuery,
  useGetV2ProjectsByProjectNameTemplatesQuery,
  usePostV2ProjectsByProjectNameTemplatesMutation,
  usePutV2ProjectsByProjectNameTemplatesAndNameDefaultMutation,
  useGetV2ProjectsByProjectNameTemplatesAndNameVersionsQuery,
  useDeleteV2ProjectsByProjectNameTemplatesAndNameVersionsVersionMutation,
  useGetV2ProjectsByProjectNameTemplatesAndNameVersionsVersionQuery,
} = injectedRtkApi;
