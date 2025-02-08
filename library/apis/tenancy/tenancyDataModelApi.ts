import { tdmApi as api } from "./apiSlice";
export const addTagTypes = ["Org", "License", "Project", "Network"] as const;
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
      patchV1OrgsOrgOrg: build.mutation<
        PatchV1OrgsOrgOrgApiResponse,
        PatchV1OrgsOrgOrgApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/orgs/${queryArg["org.Org"]}`,
          method: "PATCH",
          body: queryArg.orgOrgPost,
        }),
        invalidatesTags: ["Org"],
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
      getV1OrgsOrgOrgLicense: build.query<
        GetV1OrgsOrgOrgLicenseApiResponse,
        GetV1OrgsOrgOrgLicenseApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/orgs/${queryArg["org.Org"]}/License`,
        }),
        providesTags: ["Org"],
      }),
      listV1OrgsOrgOrgLicenses: build.query<
        ListV1OrgsOrgOrgLicensesApiResponse,
        ListV1OrgsOrgOrgLicensesApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/orgs/${queryArg["org.Org"]}/licenses`,
        }),
        providesTags: ["License"],
      }),
      deleteV1OrgsOrgOrgLicensesLicenseLicense: build.mutation<
        DeleteV1OrgsOrgOrgLicensesLicenseLicenseApiResponse,
        DeleteV1OrgsOrgOrgLicensesLicenseLicenseApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/orgs/${queryArg["org.Org"]}/licenses/${queryArg["license.License"]}`,
          method: "DELETE",
        }),
        invalidatesTags: ["License"],
      }),
      getV1OrgsOrgOrgLicensesLicenseLicense: build.query<
        GetV1OrgsOrgOrgLicensesLicenseLicenseApiResponse,
        GetV1OrgsOrgOrgLicensesLicenseLicenseApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/orgs/${queryArg["org.Org"]}/licenses/${queryArg["license.License"]}`,
        }),
        providesTags: ["License"],
      }),
      patchV1OrgsOrgOrgLicensesLicenseLicense: build.mutation<
        PatchV1OrgsOrgOrgLicensesLicenseLicenseApiResponse,
        PatchV1OrgsOrgOrgLicensesLicenseLicenseApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/orgs/${queryArg["org.Org"]}/licenses/${queryArg["license.License"]}`,
          method: "PATCH",
          body: queryArg.licenseLicensePost,
        }),
        invalidatesTags: ["License"],
      }),
      putV1OrgsOrgOrgLicensesLicenseLicense: build.mutation<
        PutV1OrgsOrgOrgLicensesLicenseLicenseApiResponse,
        PutV1OrgsOrgOrgLicensesLicenseLicenseApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/orgs/${queryArg["org.Org"]}/licenses/${queryArg["license.License"]}`,
          method: "PUT",
          body: queryArg.licenseLicensePost,
          params: { update_if_exists: queryArg.updateIfExists },
        }),
        invalidatesTags: ["License"],
      }),
      getV1OrgsOrgOrgLicensesLicenseLicenseStatus: build.query<
        GetV1OrgsOrgOrgLicensesLicenseLicenseStatusApiResponse,
        GetV1OrgsOrgOrgLicensesLicenseLicenseStatusApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/orgs/${queryArg["org.Org"]}/licenses/${queryArg["license.License"]}/status`,
        }),
        providesTags: ["License"],
      }),
      patchV1OrgsOrgOrgLicensesLicenseLicenseStatus: build.mutation<
        PatchV1OrgsOrgOrgLicensesLicenseLicenseStatusApiResponse,
        PatchV1OrgsOrgOrgLicensesLicenseLicenseStatusApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/orgs/${queryArg["org.Org"]}/licenses/${queryArg["license.License"]}/status`,
          method: "PATCH",
          body: queryArg.licenseLicenseStatus,
        }),
        invalidatesTags: ["License"],
      }),
      putV1OrgsOrgOrgLicensesLicenseLicenseStatus: build.mutation<
        PutV1OrgsOrgOrgLicensesLicenseLicenseStatusApiResponse,
        PutV1OrgsOrgOrgLicensesLicenseLicenseStatusApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/orgs/${queryArg["org.Org"]}/licenses/${queryArg["license.License"]}/status`,
          method: "PUT",
          body: queryArg.licenseLicenseStatus,
        }),
        invalidatesTags: ["License"],
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
      patchV1OrgsOrgOrgStatus: build.mutation<
        PatchV1OrgsOrgOrgStatusApiResponse,
        PatchV1OrgsOrgOrgStatusApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/orgs/${queryArg["org.Org"]}/status`,
          method: "PATCH",
          body: queryArg.orgOrgStatus,
        }),
        invalidatesTags: ["Org"],
      }),
      putV1OrgsOrgOrgStatus: build.mutation<
        PutV1OrgsOrgOrgStatusApiResponse,
        PutV1OrgsOrgOrgStatusApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/orgs/${queryArg["org.Org"]}/status`,
          method: "PUT",
          body: queryArg.orgOrgStatus,
        }),
        invalidatesTags: ["Org"],
      }),
      listV1Projects: build.query<
        ListV1ProjectsApiResponse,
        ListV1ProjectsApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects`,
          // FIXME this parameter has been manually added,
          // we need to have it in the openapi specs or it will be overridden everytime we auto-generate the code
          params: { "member-role": queryArg["member-role"] },
        }),
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
      patchV1ProjectsProjectProject: build.mutation<
        PatchV1ProjectsProjectProjectApiResponse,
        PatchV1ProjectsProjectProjectApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg["project.Project"]}`,
          method: "PATCH",
          body: queryArg.projectProjectPost,
        }),
        invalidatesTags: ["Project"],
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
      patchV1ProjectsProjectProjectNetworksNetworkNetwork: build.mutation<
        PatchV1ProjectsProjectProjectNetworksNetworkNetworkApiResponse,
        PatchV1ProjectsProjectProjectNetworksNetworkNetworkApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg["project.Project"]}/networks/${queryArg["network.Network"]}`,
          method: "PATCH",
          body: queryArg.networkNetworkPost,
        }),
        invalidatesTags: ["Network"],
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
      patchV1ProjectsProjectProjectNetworksNetworkNetworkStatus: build.mutation<
        PatchV1ProjectsProjectProjectNetworksNetworkNetworkStatusApiResponse,
        PatchV1ProjectsProjectProjectNetworksNetworkNetworkStatusApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg["project.Project"]}/networks/${queryArg["network.Network"]}/status`,
          method: "PATCH",
          body: queryArg.networkNetworkStatus,
        }),
        invalidatesTags: ["Network"],
      }),
      putV1ProjectsProjectProjectNetworksNetworkNetworkStatus: build.mutation<
        PutV1ProjectsProjectProjectNetworksNetworkNetworkStatusApiResponse,
        PutV1ProjectsProjectProjectNetworksNetworkNetworkStatusApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg["project.Project"]}/networks/${queryArg["network.Network"]}/status`,
          method: "PUT",
          body: queryArg.networkNetworkStatus,
        }),
        invalidatesTags: ["Network"],
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
      patchV1ProjectsProjectProjectStatus: build.mutation<
        PatchV1ProjectsProjectProjectStatusApiResponse,
        PatchV1ProjectsProjectProjectStatusApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg["project.Project"]}/status`,
          method: "PATCH",
          body: queryArg.projectProjectStatus,
        }),
        invalidatesTags: ["Project"],
      }),
      putV1ProjectsProjectProjectStatus: build.mutation<
        PutV1ProjectsProjectProjectStatusApiResponse,
        PutV1ProjectsProjectProjectStatusApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg["project.Project"]}/status`,
          method: "PUT",
          body: queryArg.projectProjectStatus,
        }),
        invalidatesTags: ["Project"],
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
export type PatchV1OrgsOrgOrgApiResponse = /** status 200 Default response */ {
  message?: string;
};
export type PatchV1OrgsOrgOrgApiArg = {
  /** Name of the org.Org node */
  "org.Org": string;
  /** Request used to create org.Org */
  orgOrgPost: OrgOrgPost;
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
export type GetV1OrgsOrgOrgLicenseApiResponse =
  /** status 200 Response returned back after getting org.Org objects */ OrgOrgSingleLink;
export type GetV1OrgsOrgOrgLicenseApiArg = {
  /** Name of the org.Org node */
  "org.Org": string;
};
export type ListV1OrgsOrgOrgLicensesApiResponse =
  /** status 200 Response returned back after getting license.License objects */ LicenseLicenseList;
export type ListV1OrgsOrgOrgLicensesApiArg = {
  /** Name of the org.Org node */
  "org.Org": string;
};
export type DeleteV1OrgsOrgOrgLicensesLicenseLicenseApiResponse = unknown;
export type DeleteV1OrgsOrgOrgLicensesLicenseLicenseApiArg = {
  /** Name of the org.Org node */
  "org.Org": string;
  /** Name of the license.License node */
  "license.License": string;
};
export type GetV1OrgsOrgOrgLicensesLicenseLicenseApiResponse =
  /** status 200 Response returned back after getting license.License object */ LicenseLicenseGet;
export type GetV1OrgsOrgOrgLicensesLicenseLicenseApiArg = {
  /** Name of the org.Org node */
  "org.Org": string;
  /** Name of the license.License node */
  "license.License": string;
};
export type PatchV1OrgsOrgOrgLicensesLicenseLicenseApiResponse =
  /** status 200 Default response */ {
    message?: string;
  };
export type PatchV1OrgsOrgOrgLicensesLicenseLicenseApiArg = {
  /** Name of the org.Org node */
  "org.Org": string;
  /** Name of the license.License node */
  "license.License": string;
  /** Request used to create license.License */
  licenseLicensePost: LicenseLicensePost;
};
export type PutV1OrgsOrgOrgLicensesLicenseLicenseApiResponse =
  /** status 200 Default response */ {
    message?: string;
  };
export type PutV1OrgsOrgOrgLicensesLicenseLicenseApiArg = {
  /** Name of the org.Org node */
  "org.Org": string;
  /** Name of the license.License node */
  "license.License": string;
  /** If set to false, disables update of preexisting object. Default value is true */
  updateIfExists?: boolean;
  /** Request used to create license.License */
  licenseLicensePost: LicenseLicensePost;
};
export type GetV1OrgsOrgOrgLicensesLicenseLicenseStatusApiResponse =
  /** status 200 Response returned back after getting status subresource of license.License object */ LicenseLicenseStatus;
export type GetV1OrgsOrgOrgLicensesLicenseLicenseStatusApiArg = {
  /** Name of the org.Org node */
  "org.Org": string;
  /** Name of the license.License node */
  "license.License": string;
};
export type PatchV1OrgsOrgOrgLicensesLicenseLicenseStatusApiResponse =
  /** status 200 Default response */ {
    message?: string;
  };
export type PatchV1OrgsOrgOrgLicensesLicenseLicenseStatusApiArg = {
  /** Name of the org.Org node */
  "org.Org": string;
  /** Name of the license.License node */
  "license.License": string;
  /** Request used to create Status subresource of license.License */
  licenseLicenseStatus: LicenseLicenseStatus;
};
export type PutV1OrgsOrgOrgLicensesLicenseLicenseStatusApiResponse =
  /** status 200 Default response */ {
    message?: string;
  };
export type PutV1OrgsOrgOrgLicensesLicenseLicenseStatusApiArg = {
  /** Name of the org.Org node */
  "org.Org": string;
  /** Name of the license.License node */
  "license.License": string;
  /** Request used to create Status subresource of license.License */
  licenseLicenseStatus: LicenseLicenseStatus;
};
export type GetV1OrgsOrgOrgStatusApiResponse =
  /** status 200 Response returned back after getting status subresource of org.Org object */ OrgOrgStatus;
export type GetV1OrgsOrgOrgStatusApiArg = {
  /** Name of the org.Org node */
  "org.Org": string;
};
export type PatchV1OrgsOrgOrgStatusApiResponse =
  /** status 200 Default response */ {
    message?: string;
  };
export type PatchV1OrgsOrgOrgStatusApiArg = {
  /** Name of the org.Org node */
  "org.Org": string;
  /** Request used to create Status subresource of org.Org */
  orgOrgStatus: OrgOrgStatus;
};
export type PutV1OrgsOrgOrgStatusApiResponse =
  /** status 200 Default response */ {
    message?: string;
  };
export type PutV1OrgsOrgOrgStatusApiArg = {
  /** Name of the org.Org node */
  "org.Org": string;
  /** Request used to create Status subresource of org.Org */
  orgOrgStatus: OrgOrgStatus;
};
export type ListV1ProjectsApiResponse =
  /** status 200 Response returned back after getting project.Project objects */ ProjectProjectList;
export type ListV1ProjectsApiArg = { "member-role"?: boolean }; // FIXME this needs to be added to the openapi specs
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
export type PatchV1ProjectsProjectProjectApiResponse =
  /** status 200 Default response */ {
    message?: string;
  };
export type PatchV1ProjectsProjectProjectApiArg = {
  /** Name of the project.Project node */
  "project.Project": string;
  /** Request used to create project.Project */
  projectProjectPost: ProjectProjectPost;
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
export type PatchV1ProjectsProjectProjectNetworksNetworkNetworkApiResponse =
  /** status 200 Default response */ {
    message?: string;
  };
export type PatchV1ProjectsProjectProjectNetworksNetworkNetworkApiArg = {
  /** Name of the project.Project node */
  "project.Project": string;
  /** Name of the network.Network node */
  "network.Network": string;
  /** Request used to create network.Network */
  networkNetworkPost: NetworkNetworkPost;
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
export type PatchV1ProjectsProjectProjectNetworksNetworkNetworkStatusApiResponse =
  /** status 200 Default response */ {
    message?: string;
  };
export type PatchV1ProjectsProjectProjectNetworksNetworkNetworkStatusApiArg = {
  /** Name of the project.Project node */
  "project.Project": string;
  /** Name of the network.Network node */
  "network.Network": string;
  /** Request used to create Status subresource of network.Network */
  networkNetworkStatus: NetworkNetworkStatus;
};
export type PutV1ProjectsProjectProjectNetworksNetworkNetworkStatusApiResponse =
  /** status 200 Default response */ {
    message?: string;
  };
export type PutV1ProjectsProjectProjectNetworksNetworkNetworkStatusApiArg = {
  /** Name of the project.Project node */
  "project.Project": string;
  /** Name of the network.Network node */
  "network.Network": string;
  /** Request used to create Status subresource of network.Network */
  networkNetworkStatus: NetworkNetworkStatus;
};
export type GetV1ProjectsProjectProjectStatusApiResponse =
  /** status 200 Response returned back after getting status subresource of project.Project object */ ProjectProjectStatus;
export type GetV1ProjectsProjectProjectStatusApiArg = {
  /** Name of the project.Project node */
  "project.Project": string;
};
export type PatchV1ProjectsProjectProjectStatusApiResponse =
  /** status 200 Default response */ {
    message?: string;
  };
export type PatchV1ProjectsProjectProjectStatusApiArg = {
  /** Name of the project.Project node */
  "project.Project": string;
  /** Request used to create Status subresource of project.Project */
  projectProjectStatus: ProjectProjectStatus;
};
export type PutV1ProjectsProjectProjectStatusApiResponse =
  /** status 200 Default response */ {
    message?: string;
  };
export type PutV1ProjectsProjectProjectStatusApiArg = {
  /** Name of the project.Project node */
  "project.Project": string;
  /** Request used to create Status subresource of project.Project */
  projectProjectStatus: ProjectProjectStatus;
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
export type OrgOrgSingleLink = object;
export type LicenseLicenseList = {
  name?: string;
  spec?: {
    customerID?: string;
    productKey?: string;
  };
  status?: object;
}[];
export type LicenseLicenseGet = {
  spec?: {
    customerID?: string;
    productKey?: string;
  };
  status?: object;
};
export type LicenseLicensePost = {
  customerID?: string;
  productKey?: string;
};
export type LicenseLicenseStatus = object;
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
  usePatchV1OrgsOrgOrgMutation,
  usePutV1OrgsOrgOrgMutation,
  useGetV1OrgsOrgOrgFoldersQuery,
  useGetV1OrgsOrgOrgLicenseQuery,
  useListV1OrgsOrgOrgLicensesQuery,
  useDeleteV1OrgsOrgOrgLicensesLicenseLicenseMutation,
  useGetV1OrgsOrgOrgLicensesLicenseLicenseQuery,
  usePatchV1OrgsOrgOrgLicensesLicenseLicenseMutation,
  usePutV1OrgsOrgOrgLicensesLicenseLicenseMutation,
  useGetV1OrgsOrgOrgLicensesLicenseLicenseStatusQuery,
  usePatchV1OrgsOrgOrgLicensesLicenseLicenseStatusMutation,
  usePutV1OrgsOrgOrgLicensesLicenseLicenseStatusMutation,
  useGetV1OrgsOrgOrgStatusQuery,
  usePatchV1OrgsOrgOrgStatusMutation,
  usePutV1OrgsOrgOrgStatusMutation,
  useListV1ProjectsQuery,
  useDeleteV1ProjectsProjectProjectMutation,
  useGetV1ProjectsProjectProjectQuery,
  usePatchV1ProjectsProjectProjectMutation,
  usePutV1ProjectsProjectProjectMutation,
  useGetV1ProjectsProjectProjectNetworksQuery,
  useListV1ProjectsProjectProjectNetworksQuery,
  useDeleteV1ProjectsProjectProjectNetworksNetworkNetworkMutation,
  useGetV1ProjectsProjectProjectNetworksNetworkNetworkQuery,
  usePatchV1ProjectsProjectProjectNetworksNetworkNetworkMutation,
  usePutV1ProjectsProjectProjectNetworksNetworkNetworkMutation,
  useGetV1ProjectsProjectProjectNetworksNetworkNetworkStatusQuery,
  usePatchV1ProjectsProjectProjectNetworksNetworkNetworkStatusMutation,
  usePutV1ProjectsProjectProjectNetworksNetworkNetworkStatusMutation,
  useGetV1ProjectsProjectProjectStatusQuery,
  usePatchV1ProjectsProjectProjectStatusMutation,
  usePutV1ProjectsProjectProjectStatusMutation,
} = injectedRtkApi;
