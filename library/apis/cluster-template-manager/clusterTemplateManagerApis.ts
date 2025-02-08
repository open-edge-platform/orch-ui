import { ctmApi as api } from "./apiSlice";
export const addTagTypes = ["Cluster Template Manager"] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getV1ProjectsByProjectNameTemplates: build.query<
        GetV1ProjectsByProjectNameTemplatesApiResponse,
        GetV1ProjectsByProjectNameTemplatesApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/templates`,
          params: { default: queryArg["default"] },
        }),
        providesTags: ["Cluster Template Manager"],
      }),
      postV1ProjectsByProjectNameTemplates: build.mutation<
        PostV1ProjectsByProjectNameTemplatesApiResponse,
        PostV1ProjectsByProjectNameTemplatesApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/templates`,
          method: "POST",
          body: queryArg.importTemplateBody,
        }),
        invalidatesTags: ["Cluster Template Manager"],
      }),
      deleteV1ProjectsByProjectNameTemplatesAndNameVersionsVersion:
        build.mutation<
          DeleteV1ProjectsByProjectNameTemplatesAndNameVersionsVersionApiResponse,
          DeleteV1ProjectsByProjectNameTemplatesAndNameVersionsVersionApiArg
        >({
          query: (queryArg) => ({
            url: `/v1/projects/${queryArg.projectName}/templates/${queryArg.name}/versions/${queryArg.version}`,
            method: "DELETE",
          }),
          invalidatesTags: ["Cluster Template Manager"],
        }),
      getV1ProjectsByProjectNameTemplatesAndNameVersionsVersion: build.query<
        GetV1ProjectsByProjectNameTemplatesAndNameVersionsVersionApiResponse,
        GetV1ProjectsByProjectNameTemplatesAndNameVersionsVersionApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/templates/${queryArg.name}/versions/${queryArg.version}`,
        }),
        providesTags: ["Cluster Template Manager"],
      }),
      putV1ProjectsByProjectNameTemplatesAndNameVersionsVersion: build.mutation<
        PutV1ProjectsByProjectNameTemplatesAndNameVersionsVersionApiResponse,
        PutV1ProjectsByProjectNameTemplatesAndNameVersionsVersionApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/templates/${queryArg.name}/versions/${queryArg.version}`,
          method: "PUT",
          body: queryArg.templateInfo,
        }),
        invalidatesTags: ["Cluster Template Manager"],
      }),
      putV1ProjectsByProjectNameTemplatesAndTemplateNameDefault: build.mutation<
        PutV1ProjectsByProjectNameTemplatesAndTemplateNameDefaultApiResponse,
        PutV1ProjectsByProjectNameTemplatesAndTemplateNameDefaultApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/templates/${queryArg.templateName}/default`,
          method: "PUT",
          body: queryArg.defaultTemplateInfo,
        }),
        invalidatesTags: ["Cluster Template Manager"],
      }),
      getV1ProjectsByProjectNameTemplatesAndTemplateNameVersions: build.query<
        GetV1ProjectsByProjectNameTemplatesAndTemplateNameVersionsApiResponse,
        GetV1ProjectsByProjectNameTemplatesAndTemplateNameVersionsApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/templates/${queryArg.templateName}/versions`,
        }),
        providesTags: ["Cluster Template Manager"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as clusterTemplateManagerApis };
export type GetV1ProjectsByProjectNameTemplatesApiResponse =
  /** status 200 OK */ TemplateInfoList;
export type GetV1ProjectsByProjectNameTemplatesApiArg = {
  /** When set to true, gets only the default template information */
  default?: boolean;
  /** unique projectName for the resource */
  projectName: string;
};
export type PostV1ProjectsByProjectNameTemplatesApiResponse =
  /** status 200 OK */ string;
export type PostV1ProjectsByProjectNameTemplatesApiArg = {
  /** unique projectName for the resource */
  projectName: string;
  importTemplateBody: ImportTemplateBody;
};
export type DeleteV1ProjectsByProjectNameTemplatesAndNameVersionsVersionApiResponse =
  unknown;
export type DeleteV1ProjectsByProjectNameTemplatesAndNameVersionsVersionApiArg =
  {
    /** Name of the template */
    name: string;
    /** Version of the template in the format of 'vX.Y.Z' */
    version: string;
    /** unique projectName for the resource */
    projectName: string;
  };
export type GetV1ProjectsByProjectNameTemplatesAndNameVersionsVersionApiResponse =
  /** status 200 OK */ TemplateInfo;
export type GetV1ProjectsByProjectNameTemplatesAndNameVersionsVersionApiArg = {
  /** Name of the template */
  name: string;
  /** Version of the template in the format of 'vX.Y.Z' */
  version: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type PutV1ProjectsByProjectNameTemplatesAndNameVersionsVersionApiResponse =
  unknown;
export type PutV1ProjectsByProjectNameTemplatesAndNameVersionsVersionApiArg = {
  /** Name of the template */
  name: string;
  /** Version of the template in the format of 'vX.Y.Z' */
  version: string;
  /** unique projectName for the resource */
  projectName: string;
  templateInfo: TemplateInfo;
};
export type PutV1ProjectsByProjectNameTemplatesAndTemplateNameDefaultApiResponse =
  unknown;
export type PutV1ProjectsByProjectNameTemplatesAndTemplateNameDefaultApiArg = {
  /** Name of the cluster template without the version in the string */
  templateName: string;
  /** unique projectName for the resource */
  projectName: string;
  defaultTemplateInfo: DefaultTemplateInfo;
};
export type GetV1ProjectsByProjectNameTemplatesAndTemplateNameVersionsApiResponse =
  /** status 200 OK */ VersionList;
export type GetV1ProjectsByProjectNameTemplatesAndTemplateNameVersionsApiArg = {
  /** Template name without the version */
  templateName: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type DefaultTemplateInfo = {
  /** Template Name. Not required when setting the default, is available in GET /v1/templates */
  name?: string;
  projectID?: string;
  /** Template version. If set to empty, the latest version will be used as default */
  version: string;
};
export type Clusterconfiguration = {
  projectID?: string;
  rke2?: object;
};
export type TemplateInfo = {
  clusterconfiguration: Clusterconfiguration;
  clustertype: string;
  /** Allows users to specify a list of key/value pairs to be attached to a cluster created with the template. These pairs need to conform to https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/#syntax-and-character-set */
  "deployment-metadata"?: {
    [key: string]: string;
  };
  description?: string;
  id?: string;
  name: string;
  projectID?: string;
  providertype: string;
  version?: string;
};
export type TemplateInfoList = {
  defaultTemplateInfo?: DefaultTemplateInfo;
  templateInfoList?: TemplateInfo[];
};
export type ImportTemplateBody = {
  projectID?: string;
  templateConfigurations?: TemplateInfo[];
  templateFiles?: string[];
};
export type VersionList = {
  versionList?: string[];
};
export const {
  useGetV1ProjectsByProjectNameTemplatesQuery,
  usePostV1ProjectsByProjectNameTemplatesMutation,
  useDeleteV1ProjectsByProjectNameTemplatesAndNameVersionsVersionMutation,
  useGetV1ProjectsByProjectNameTemplatesAndNameVersionsVersionQuery,
  usePutV1ProjectsByProjectNameTemplatesAndNameVersionsVersionMutation,
  usePutV1ProjectsByProjectNameTemplatesAndTemplateNameDefaultMutation,
  useGetV1ProjectsByProjectNameTemplatesAndTemplateNameVersionsQuery,
} = injectedRtkApi;
