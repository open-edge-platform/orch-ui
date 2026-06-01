import { tdmApi as api } from "./apiSlice";
export const addTagTypes = ["Org", "Project"] as const;
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
      getV1OrgsByName: build.query<
        GetV1OrgsByNameApiResponse,
        GetV1OrgsByNameApiArg
      >({
        query: (queryArg) => ({ url: `/v1/orgs/${queryArg.name}` }),
        providesTags: ["Org"],
      }),
      putV1OrgsByName: build.mutation<
        PutV1OrgsByNameApiResponse,
        PutV1OrgsByNameApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/orgs/${queryArg.name}`,
          method: "PUT",
          body: queryArg.orgWrite,
          params: { update_if_exists: queryArg.updateIfExists },
        }),
        invalidatesTags: ["Org"],
      }),
      deleteV1OrgsByName: build.mutation<
        DeleteV1OrgsByNameApiResponse,
        DeleteV1OrgsByNameApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/orgs/${queryArg.name}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Org"],
      }),
      getV1OrgsByNameStatus: build.query<
        GetV1OrgsByNameStatusApiResponse,
        GetV1OrgsByNameStatusApiArg
      >({
        query: (queryArg) => ({ url: `/v1/orgs/${queryArg.name}/status` }),
        providesTags: ["Org"],
      }),
      listV1Projects: build.query<
        ListV1ProjectsApiResponse,
        ListV1ProjectsApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects`,
          params: { org: queryArg.org },
        }),
        providesTags: ["Project"],
      }),
      getV1ProjectsByName: build.query<
        GetV1ProjectsByNameApiResponse,
        GetV1ProjectsByNameApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.name}`,
          params: { org: queryArg.org },
        }),
        providesTags: ["Project"],
      }),
      putV1ProjectsByName: build.mutation<
        PutV1ProjectsByNameApiResponse,
        PutV1ProjectsByNameApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.name}`,
          method: "PUT",
          body: queryArg.projectWrite,
          params: {
            org: queryArg.org,
            update_if_exists: queryArg.updateIfExists,
          },
        }),
        invalidatesTags: ["Project"],
      }),
      deleteV1ProjectsByName: build.mutation<
        DeleteV1ProjectsByNameApiResponse,
        DeleteV1ProjectsByNameApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.name}`,
          method: "DELETE",
          params: { org: queryArg.org },
        }),
        invalidatesTags: ["Project"],
      }),
      getV1ProjectsByNameStatus: build.query<
        GetV1ProjectsByNameStatusApiResponse,
        GetV1ProjectsByNameStatusApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.name}/status`,
          params: { org: queryArg.org },
        }),
        providesTags: ["Project"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as tenancyDataModelApi };
export type ListV1OrgsApiResponse =
  /** status 200 List of organizations */ OrgList;
export type ListV1OrgsApiArg = void;
export type GetV1OrgsByNameApiResponse = /** status 200 Organization */ Org;
export type GetV1OrgsByNameApiArg = {
  /** Org name */
  name: string;
};
export type PutV1OrgsByNameApiResponse =
  /** status 200 Created or updated organization */ Org;
export type PutV1OrgsByNameApiArg = {
  /** Org name */
  name: string;
  /** If false, the call fails with 409 when the org already exists. Defaults to true. */
  updateIfExists?: boolean;
  orgWrite: OrgWrite;
};
export type DeleteV1OrgsByNameApiResponse = /** status 200 OK */ void;
export type DeleteV1OrgsByNameApiArg = {
  /** Org name */
  name: string;
};
export type GetV1OrgsByNameStatusApiResponse =
  /** status 200 Organization status */ Org;
export type GetV1OrgsByNameStatusApiArg = {
  /** Org name */
  name: string;
};
export type ListV1ProjectsApiResponse =
  /** status 200 List of projects */ ProjectList;
export type ListV1ProjectsApiArg = {
  /** Filter to a single org by name. When omitted, the caller's resolved org scope (from JWT) is used. */
  org?: string;
};
export type GetV1ProjectsByNameApiResponse = /** status 200 Project */ Project;
export type GetV1ProjectsByNameApiArg = {
  /** Project name */
  name: string;
  /** Disambiguate by org when the same project name exists under multiple orgs. */
  org?: string;
};
export type PutV1ProjectsByNameApiResponse =
  /** status 200 Created or updated project */ Project;
export type PutV1ProjectsByNameApiArg = {
  /** Project name */
  name: string;
  /** Target org (required for creation when the caller has scope to multiple orgs). */
  org?: string;
  /** If false, the call fails with 409 when the project already exists. Defaults to true. */
  updateIfExists?: boolean;
  projectWrite: ProjectWrite;
};
export type DeleteV1ProjectsByNameApiResponse = /** status 200 OK */ void;
export type DeleteV1ProjectsByNameApiArg = {
  /** Project name */
  name: string;
  /** Disambiguate by org when the same project name exists under multiple orgs. */
  org?: string;
};
export type GetV1ProjectsByNameStatusApiResponse =
  /** status 200 Project status */ Project;
export type GetV1ProjectsByNameStatusApiArg = {
  /** Project name */
  name: string;
  org?: string;
};
export type OrgSpec = {
  description?: string;
};
export type StatusDetail = {
  /** One of STATUS_INDICATION_IN_PROGRESS, STATUS_INDICATION_IDLE, STATUS_INDICATION_ERROR. */
  statusIndicator?: string;
  message?: string;
  timeStamp?: number;
  /** Stable UUID of the resource. */
  uID?: string;
};
export type OrgStatusWrap = {
  orgStatus?: StatusDetail;
};
export type Org = {
  name?: string;
  spec?: OrgSpec;
  status?: OrgStatusWrap;
};
export type OrgList = Org[];
export type Error = {
  error?: string;
};
export type OrgWrite = {
  description?: string;
};
export type ProjectSpec = {
  description?: string;
};
export type ProjectStatusWrap = {
  projectStatus?: StatusDetail;
};
export type Project = {
  name?: string;
  /** Name of the org the project belongs to. */
  orgName?: string;
  spec?: ProjectSpec;
  status?: ProjectStatusWrap;
};
export type ProjectList = Project[];
export type ProjectWrite = {
  description?: string;
};
export const {
  useListV1OrgsQuery,
  useGetV1OrgsByNameQuery,
  usePutV1OrgsByNameMutation,
  useDeleteV1OrgsByNameMutation,
  useGetV1OrgsByNameStatusQuery,
  useListV1ProjectsQuery,
  useGetV1ProjectsByNameQuery,
  usePutV1ProjectsByNameMutation,
  useDeleteV1ProjectsByNameMutation,
  useGetV1ProjectsByNameStatusQuery,
} = injectedRtkApi;
