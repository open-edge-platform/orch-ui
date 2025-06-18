import { tdmApi as api } from "./apiSlice";
export const addTagTypes = ["Org", "Project", "Network"] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      listV1Orgs: build.query<ListV1OrgsApiResponse, ListV1OrgsApiArg>({
        query: () => ({ url: `/v1/orgs` }),
        providesTags: ["Org"],
      }),
      deleteV1OrgsOrgOrg: build.mutation<
        DeleteV1OrgsOrgOrgApiResponse,
        DeleteV1OrgsOrgOrgApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/orgs/${queryArg["org.Org"]}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Org"],
      }),
      getV1OrgsOrgOrg: build.query<
        GetV1OrgsOrgOrgApiResponse,
        GetV1OrgsOrgOrgApiArg
      >({
        query: (queryArg) => ({ url: `/v1/orgs/${queryArg["org.Org"]}` }),
        providesTags: ["Org"],
      }),
      putV1OrgsOrgOrg: build.mutation<
        PutV1OrgsOrgOrgApiResponse,
        PutV1OrgsOrgOrgApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/orgs/${queryArg["org.Org"]}`,
          method: "PUT",
          body: queryArg.orgOrgPost,
          params: { update_if_exists: queryArg.updateIfExists },
        }),
        invalidatesTags: ["Org"],
      }),
      getV1OrgsOrgOrgFolders: build.query<
        GetV1OrgsOrgOrgFoldersApiResponse,
        GetV1OrgsOrgOrgFoldersApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/orgs/${queryArg["org.Org"]}/Folders`,
        }),
        providesTags: ["Org"],
      }),
      getV1OrgsOrgOrgStatus: build.query<
        GetV1OrgsOrgOrgStatusApiResponse,
        GetV1OrgsOrgOrgStatusApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/orgs/${queryArg["org.Org"]}/status`,
        }),
        providesTags: ["Org"],
      }),
      listV1Projects: build.query<
        ListV1ProjectsApiResponse,
        ListV1ProjectsApiArg
      >({
        query: () => ({ url: `/v1/projects` }),
        providesTags: ["Project"],
      }),
      deleteV1ProjectsProjectProject: build.mutation<
        DeleteV1ProjectsProjectProjectApiResponse,
        DeleteV1ProjectsProjectProjectApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg["project.Project"]}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Project"],
      }),
      getV1ProjectsProjectProject: build.query<
        GetV1ProjectsProjectProjectApiResponse,
        GetV1ProjectsProjectProjectApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg["project.Project"]}`,
        }),
        providesTags: ["Project"],
      }),
      putV1ProjectsProjectProject: build.mutation<
        PutV1ProjectsProjectProjectApiResponse,
        PutV1ProjectsProjectProjectApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg["project.Project"]}`,
          method: "PUT",
          body: queryArg.projectProjectPost,
          params: { update_if_exists: queryArg.updateIfExists },
        }),
        invalidatesTags: ["Project"],
      }),
      getV1ProjectsProjectProjectNetworks: build.query<
        GetV1ProjectsProjectProjectNetworksApiResponse,
        GetV1ProjectsProjectProjectNetworksApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg["project.Project"]}/Networks`,
        }),
        providesTags: ["Project"],
      }),
      listV1ProjectsProjectProjectNetworks: build.query<
        ListV1ProjectsProjectProjectNetworksApiResponse,
        ListV1ProjectsProjectProjectNetworksApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg["project.Project"]}/networks`,
        }),
        providesTags: ["Network"],
      }),
      deleteV1ProjectsProjectProjectNetworksNetworkNetwork: build.mutation<
        DeleteV1ProjectsProjectProjectNetworksNetworkNetworkApiResponse,
        DeleteV1ProjectsProjectProjectNetworksNetworkNetworkApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg["project.Project"]}/networks/${queryArg["network.Network"]}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Network"],
      }),
      getV1ProjectsProjectProjectNetworksNetworkNetwork: build.query<
        GetV1ProjectsProjectProjectNetworksNetworkNetworkApiResponse,
        GetV1ProjectsProjectProjectNetworksNetworkNetworkApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg["project.Project"]}/networks/${queryArg["network.Network"]}`,
        }),
        providesTags: ["Network"],
      }),
      putV1ProjectsProjectProjectNetworksNetworkNetwork: build.mutation<
        PutV1ProjectsProjectProjectNetworksNetworkNetworkApiResponse,
        PutV1ProjectsProjectProjectNetworksNetworkNetworkApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg["project.Project"]}/networks/${queryArg["network.Network"]}`,
          method: "PUT",
          body: queryArg.networkNetworkPost,
          params: { update_if_exists: queryArg.updateIfExists },
        }),
        invalidatesTags: ["Network"],
      }),
      getV1ProjectsProjectProjectNetworksNetworkNetworkStatus: build.query<
        GetV1ProjectsProjectProjectNetworksNetworkNetworkStatusApiResponse,
        GetV1ProjectsProjectProjectNetworksNetworkNetworkStatusApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg["project.Project"]}/networks/${queryArg["network.Network"]}/status`,
        }),
        providesTags: ["Network"],
      }),
      getV1ProjectsProjectProjectStatus: build.query<
        GetV1ProjectsProjectProjectStatusApiResponse,
        GetV1ProjectsProjectProjectStatusApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg["project.Project"]}/status`,
        }),
        providesTags: ["Project"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as tenancyDataModelApi };
export type ListV1OrgsApiResponse =
  /** status 200 Response returned back after getting org.Org objects */ OrgOrgList;
export type ListV1OrgsApiArg = void;
export type DeleteV1OrgsOrgOrgApiResponse = unknown;
export type DeleteV1OrgsOrgOrgApiArg = {
  /** Name of the org.Org node */
  "org.Org": string;
};
export type GetV1OrgsOrgOrgApiResponse =
  /** status 200 Response returned back after getting org.Org object */ OrgOrgGet;
export type GetV1OrgsOrgOrgApiArg = {
  /** Name of the org.Org node */
  "org.Org": string;
};
export type PutV1OrgsOrgOrgApiResponse = /** status 200 Default response */ {
  message?: string;
};
export type PutV1OrgsOrgOrgApiArg = {
  /** Name of the org.Org node */
  "org.Org": string;
  /** If set to false, disables update of preexisting object. Default value is true */
  updateIfExists?: boolean;
  /** Request used to create org.Org */
  orgOrgPost: OrgOrgPost;
};
export type GetV1OrgsOrgOrgFoldersApiResponse =
  /** status 200 Response returned back after getting org.Org objects */ OrgOrgNamedLink;
export type GetV1OrgsOrgOrgFoldersApiArg = {
  /** Name of the org.Org node */
  "org.Org": string;
};
export type GetV1OrgsOrgOrgStatusApiResponse =
  /** status 200 Response returned back after getting status subresource of org.Org object */ OrgOrgStatus;
export type GetV1OrgsOrgOrgStatusApiArg = {
  /** Name of the org.Org node */
  "org.Org": string;
};
export type ListV1ProjectsApiResponse =
  /** status 200 Response returned back after getting project.Project objects */ ProjectProjectList;
// FIXME this parameter has been manually added,
export type ListV1ProjectsApiArg = { "member-role"?: boolean };
export type DeleteV1ProjectsProjectProjectApiResponse = unknown;
export type DeleteV1ProjectsProjectProjectApiArg = {
  /** Name of the project.Project node */
  "project.Project": string;
};
export type GetV1ProjectsProjectProjectApiResponse =
  /** status 200 Response returned back after getting project.Project object */ ProjectProjectGet;
export type GetV1ProjectsProjectProjectApiArg = {
  /** Name of the project.Project node */
  "project.Project": string;
};
export type PutV1ProjectsProjectProjectApiResponse =
  /** status 200 Default response */ {
    message?: string;
  };
export type PutV1ProjectsProjectProjectApiArg = {
  /** Name of the project.Project node */
  "project.Project": string;
  /** If set to false, disables update of preexisting object. Default value is true */
  updateIfExists?: boolean;
  /** Request used to create project.Project */
  projectProjectPost: ProjectProjectPost;
};
export type GetV1ProjectsProjectProjectNetworksApiResponse =
  /** status 200 Response returned back after getting project.Project objects */ ProjectProjectNamedLink;
export type GetV1ProjectsProjectProjectNetworksApiArg = {
  /** Name of the project.Project node */
  "project.Project": string;
};
export type ListV1ProjectsProjectProjectNetworksApiResponse =
  /** status 200 Response returned back after getting network.Network objects */ NetworkNetworkList;
export type ListV1ProjectsProjectProjectNetworksApiArg = {
  /** Name of the project.Project node */
  "project.Project": string;
};
export type DeleteV1ProjectsProjectProjectNetworksNetworkNetworkApiResponse =
  unknown;
export type DeleteV1ProjectsProjectProjectNetworksNetworkNetworkApiArg = {
  /** Name of the project.Project node */
  "project.Project": string;
  /** Name of the network.Network node */
  "network.Network": string;
};
export type GetV1ProjectsProjectProjectNetworksNetworkNetworkApiResponse =
  /** status 200 Response returned back after getting network.Network object */ NetworkNetworkGet;
export type GetV1ProjectsProjectProjectNetworksNetworkNetworkApiArg = {
  /** Name of the project.Project node */
  "project.Project": string;
  /** Name of the network.Network node */
  "network.Network": string;
};
export type PutV1ProjectsProjectProjectNetworksNetworkNetworkApiResponse =
  /** status 200 Default response */ {
    message?: string;
  };
export type PutV1ProjectsProjectProjectNetworksNetworkNetworkApiArg = {
  /** Name of the project.Project node */
  "project.Project": string;
  /** Name of the network.Network node */
  "network.Network": string;
  /** If set to false, disables update of preexisting object. Default value is true */
  updateIfExists?: boolean;
  /** Request used to create network.Network */
  networkNetworkPost: NetworkNetworkPost;
};
export type GetV1ProjectsProjectProjectNetworksNetworkNetworkStatusApiResponse =
  /** status 200 Response returned back after getting status subresource of network.Network object */ NetworkNetworkStatus;
export type GetV1ProjectsProjectProjectNetworksNetworkNetworkStatusApiArg = {
  /** Name of the project.Project node */
  "project.Project": string;
  /** Name of the network.Network node */
  "network.Network": string;
};
export type GetV1ProjectsProjectProjectStatusApiResponse =
  /** status 200 Response returned back after getting status subresource of project.Project object */ ProjectProjectStatus;
export type GetV1ProjectsProjectProjectStatusApiArg = {
  /** Name of the project.Project node */
  "project.Project": string;
};
export type OrgOrgList = {
  name?: string;
  spec?: {
    description?: string;
  };
  status?: {
    orgStatus?: {
      message?: string;
      statusIndicator?: string;
      timeStamp?: number;
      uID?: string;
    };
  };
}[];
export type OrgOrgGet = {
  spec?: {
    description?: string;
  };
  status?: {
    orgStatus?: {
      message?: string;
      statusIndicator?: string;
      timeStamp?: number;
      uID?: string;
    };
  };
};
export type OrgOrgPost = {
  description?: string;
};
export type OrgOrgNamedLink = object[];
export type OrgOrgStatus = {
  orgStatus?: {
    message?: string;
    statusIndicator?: string;
    timeStamp?: number;
    uID?: string;
  };
};
export type ProjectProjectList = {
  name?: string;
  spec?: {
    description?: string;
  };
  status?: {
    projectStatus?: {
      message?: string;
      statusIndicator?: string;
      timeStamp?: number;
      uID?: string;
    };
  };
}[];
export type ProjectProjectGet = {
  spec?: {
    description?: string;
  };
  status?: {
    projectStatus?: {
      message?: string;
      statusIndicator?: string;
      timeStamp?: number;
      uID?: string;
    };
  };
};
export type ProjectProjectPost = {
  description?: string;
};
export type ProjectProjectNamedLink = object[];
export type NetworkNetworkList = {
  name?: string;
  spec?: {
    description?: string;
    type?: string;
  };
  status?: {
    status?: {
      currentState?: string;
    };
  };
}[];
export type NetworkNetworkGet = {
  spec?: {
    description?: string;
    type?: string;
  };
  status?: {
    status?: {
      currentState?: string;
    };
  };
};
export type NetworkNetworkPost = {
  description?: string;
  type?: string;
};
export type NetworkNetworkStatus = {
  status?: {
    currentState?: string;
  };
};
export type ProjectProjectStatus = {
  projectStatus?: {
    message?: string;
    statusIndicator?: string;
    timeStamp?: number;
    uID?: string;
  };
};
export const {
  useListV1OrgsQuery,
  useDeleteV1OrgsOrgOrgMutation,
  useGetV1OrgsOrgOrgQuery,
  usePutV1OrgsOrgOrgMutation,
  useGetV1OrgsOrgOrgFoldersQuery,
  useGetV1OrgsOrgOrgStatusQuery,
  useListV1ProjectsQuery,
  useDeleteV1ProjectsProjectProjectMutation,
  useGetV1ProjectsProjectProjectQuery,
  usePutV1ProjectsProjectProjectMutation,
  useGetV1ProjectsProjectProjectNetworksQuery,
  useListV1ProjectsProjectProjectNetworksQuery,
  useDeleteV1ProjectsProjectProjectNetworksNetworkNetworkMutation,
  useGetV1ProjectsProjectProjectNetworksNetworkNetworkQuery,
  usePutV1ProjectsProjectProjectNetworksNetworkNetworkMutation,
  useGetV1ProjectsProjectProjectNetworksNetworkNetworkStatusQuery,
  useGetV1ProjectsProjectProjectStatusQuery,
} = injectedRtkApi;
