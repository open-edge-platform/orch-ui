import { rpsApi as api } from "./apiSlice";
export const addTagTypes = ["Domains"] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getAllDomains: build.query<GetAllDomainsApiResponse, GetAllDomainsApiArg>(
        {
          query: (queryArg) => ({
            url: `/v1/projects/${queryArg.projectName}/dm/amt/admin/domains`,
            params: {
              $skip: queryArg.$skip,
              $top: queryArg.$top,
              $count: queryArg.$count,
            },
          }),
          providesTags: ["Domains"],
        },
      ),
      updateDomainSuffix: build.mutation<
        UpdateDomainSuffixApiResponse,
        UpdateDomainSuffixApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/dm/amt/admin/domains`,
          method: "PATCH",
          body: queryArg.domainPatch,
        }),
        invalidatesTags: ["Domains"],
      }),
      createDomain: build.mutation<CreateDomainApiResponse, CreateDomainApiArg>(
        {
          query: (queryArg) => ({
            url: `/v1/projects/${queryArg.projectName}/dm/amt/admin/domains`,
            method: "POST",
            body: queryArg.domainPost,
          }),
          invalidatesTags: ["Domains"],
        },
      ),
      removeDomain: build.mutation<RemoveDomainApiResponse, RemoveDomainApiArg>(
        {
          query: (queryArg) => ({
            url: `/v1/projects/${queryArg.projectName}/dm/amt/admin/domains/${queryArg.profileName}`,
            method: "DELETE",
          }),
          invalidatesTags: ["Domains"],
        },
      ),
      getDomain: build.query<GetDomainApiResponse, GetDomainApiArg>({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/dm/amt/admin/domains/${queryArg.profileName}`,
        }),
        providesTags: ["Domains"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as remoteProvisioningApis };
export type GetAllDomainsApiResponse =
  /** status 200 successful operation */
  DomainResponse[] | CountDomainResponse;
export type GetAllDomainsApiArg = {
  /** The number of items to skip before starting to collect the result set */
  $skip?: number;
  /** The numbers of items to return */
  $top?: number;
  /** The total number of domains */
  $count?: boolean;
  /** unique projectName for the resource */
  projectName: string;
};
export type UpdateDomainSuffixApiResponse =
  /** status 200 successful operation */ DomainResponse;
export type UpdateDomainSuffixApiArg = {
  /** unique projectName for the resource */
  projectName: string;
  domainPatch: DomainPatch;
};
export type CreateDomainApiResponse =
  /** status 201 successful operation */ DomainResponse;
export type CreateDomainApiArg = {
  /** unique projectName for the resource */
  projectName: string;
  /** **provisioningCert** must be a base64 string of the Personal Information Exchange (PFX) certificate that includes the entire certificate chain and private key.
   */
  domainPost: DomainPost;
};
export type RemoveDomainApiResponse =
  /** status 204 successful operation */ void;
export type RemoveDomainApiArg = {
  /** Name of domain profile to remove */
  profileName: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type GetDomainApiResponse =
  /** status 200 successful operation */ DomainResponse;
export type GetDomainApiArg = {
  /** Name of domain profile to return */
  profileName: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type DomainResponse = {
  domainSuffix: string;
  expirationDate: string;
  profileName: string;
  provisioningCertStorageFormat: string;
  tenantId: string;
  version: string;
};
export type CountDomainResponse = {
  data?: DomainResponse[];
  totalCount?: number;
};
export type ApiResponse = {
  error?: string;
  message?: string;
};
export type DomainPatch = {
  domainSuffix: string;
  profileName: string;
  provisioningCert: string;
  provisioningCertPassword: string;
  provisioningCertStorageFormat: string;
  version: string;
};
export type DomainPost = {
  domainSuffix: string;
  profileName: string;
  provisioningCert: string;
  provisioningCertPassword: string;
  provisioningCertStorageFormat: string;
};
export const {
  useGetAllDomainsQuery,
  useLazyGetAllDomainsQuery,
  useUpdateDomainSuffixMutation,
  useCreateDomainMutation,
  useRemoveDomainMutation,
  useGetDomainQuery,
  useLazyGetDomainQuery,
} = injectedRtkApi;
