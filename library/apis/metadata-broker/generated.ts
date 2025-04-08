import { metadataBrokerApi as api } from "./apiSlice";
export const addTagTypes = ["MetadataService"] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      metadataServiceDelete: build.mutation<
        MetadataServiceDeleteApiResponse,
        MetadataServiceDeleteApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/metadata`,
          method: "DELETE",
          params: { key: queryArg.key, value: queryArg.value },
        }),
        invalidatesTags: ["MetadataService"],
      }),
      metadataServiceGetMetadata: build.query<
        MetadataServiceGetMetadataApiResponse,
        MetadataServiceGetMetadataApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/metadata`,
        }),
        providesTags: ["MetadataService"],
      }),
      metadataServiceCreateOrUpdateMetadata: build.mutation<
        MetadataServiceCreateOrUpdateMetadataApiResponse,
        MetadataServiceCreateOrUpdateMetadataApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/metadata`,
          method: "POST",
          body: queryArg.metadataList,
        }),
        invalidatesTags: ["MetadataService"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as metadataBroker };
export type MetadataServiceDeleteApiResponse =
  /** status 200 OK */ MetadataResponse;
export type MetadataServiceDeleteApiArg = {
  key?: string;
  value?: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type MetadataServiceGetMetadataApiResponse =
  /** status 200 OK */ MetadataResponse;
export type MetadataServiceGetMetadataApiArg = {
  /** unique projectName for the resource */
  projectName: string;
};
export type MetadataServiceCreateOrUpdateMetadataApiResponse =
  /** status 200 OK */ MetadataResponse;
export type MetadataServiceCreateOrUpdateMetadataApiArg = {
  /** unique projectName for the resource */
  projectName: string;
  metadataList: MetadataList;
};
export type StoredMetadata = {
  key: string;
  values: string[];
};
export type MetadataResponse = {
  metadata: StoredMetadata[];
};
export type Metadata = {
  key: string;
  value: string;
};
export type MetadataList = {
  metadata: Metadata[];
};
export const {
  useMetadataServiceDeleteMutation,
  useMetadataServiceGetMetadataQuery,
  useMetadataServiceCreateOrUpdateMetadataMutation,
} = injectedRtkApi;
