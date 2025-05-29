import { rpsApi as api } from "./apiSlice";
export const addTagTypes = [
  "CIRA",
  "Domains",
  "Misc",
  "IEEE802.1x",
  "Profiles",
  "Wireless",
] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getAllCiraConfigs: build.query<
        GetAllCiraConfigsApiResponse,
        GetAllCiraConfigsApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/dmt/admin/ciraconfigs`,
          params: {
            $skip: queryArg.$skip,
            $top: queryArg.$top,
            $count: queryArg.$count,
          },
        }),
        providesTags: ["CIRA"],
      }),
      editCiraConfig: build.mutation<
        EditCiraConfigApiResponse,
        EditCiraConfigApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/dmt/admin/ciraconfigs`,
          method: "PATCH",
          body: queryArg.ciraConfigPatch,
        }),
        invalidatesTags: ["CIRA"],
      }),
      createCiraConfig: build.mutation<
        CreateCiraConfigApiResponse,
        CreateCiraConfigApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/dmt/admin/ciraconfigs`,
          method: "POST",
          body: queryArg.ciraConfigPost,
        }),
        invalidatesTags: ["CIRA"],
      }),
      removeCiraConfig: build.mutation<
        RemoveCiraConfigApiResponse,
        RemoveCiraConfigApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/dmt/admin/ciraconfigs/${queryArg.configName}`,
          method: "DELETE",
        }),
        invalidatesTags: ["CIRA"],
      }),
      getCiraConfig: build.query<GetCiraConfigApiResponse, GetCiraConfigApiArg>(
        {
          query: (queryArg) => ({
            url: `/v1/projects/${queryArg.projectName}/dmt/admin/ciraconfigs/${queryArg.configName}`,
          }),
          providesTags: ["CIRA"],
        },
      ),
      getAllDomains: build.query<GetAllDomainsApiResponse, GetAllDomainsApiArg>(
        {
          query: (queryArg) => ({
            url: `/v1/projects/${queryArg.projectName}/dmt/admin/domains`,
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
          url: `/v1/projects/${queryArg.projectName}/dmt/admin/domains`,
          method: "PATCH",
          body: queryArg.domainPatch,
        }),
        invalidatesTags: ["Domains"],
      }),
      createDomain: build.mutation<CreateDomainApiResponse, CreateDomainApiArg>(
        {
          query: (queryArg) => ({
            url: `/v1/projects/${queryArg.projectName}/dmt/admin/domains`,
            method: "POST",
            body: queryArg.domainPost,
          }),
          invalidatesTags: ["Domains"],
        },
      ),
      removeDomain: build.mutation<RemoveDomainApiResponse, RemoveDomainApiArg>(
        {
          query: (queryArg) => ({
            url: `/v1/projects/${queryArg.projectName}/dmt/admin/domains/${queryArg.profileName}`,
            method: "DELETE",
          }),
          invalidatesTags: ["Domains"],
        },
      ),
      getDomain: build.query<GetDomainApiResponse, GetDomainApiArg>({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/dmt/admin/domains/${queryArg.profileName}`,
        }),
        providesTags: ["Domains"],
      }),
      getV1ProjectsByProjectNameDmtAdminHealth: build.query<
        GetV1ProjectsByProjectNameDmtAdminHealthApiResponse,
        GetV1ProjectsByProjectNameDmtAdminHealthApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/dmt/admin/health`,
        }),
        providesTags: ["Misc"],
      }),
      getAll8021XConfigs: build.query<
        GetAll8021XConfigsApiResponse,
        GetAll8021XConfigsApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/dmt/admin/ieee8021xconfigs`,
          params: {
            $skip: queryArg.$skip,
            $top: queryArg.$top,
            $count: queryArg.$count,
          },
        }),
        providesTags: ["IEEE802.1x"],
      }),
      edit8021XConfig: build.mutation<
        Edit8021XConfigApiResponse,
        Edit8021XConfigApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/dmt/admin/ieee8021xconfigs`,
          method: "PATCH",
          body: queryArg.ieee8021XConfigPatch,
        }),
        invalidatesTags: ["IEEE802.1x"],
      }),
      create8021XConfig: build.mutation<
        Create8021XConfigApiResponse,
        Create8021XConfigApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/dmt/admin/ieee8021xconfigs`,
          method: "POST",
          body: queryArg.ieee8021XConfigPost,
        }),
        invalidatesTags: ["IEEE802.1x"],
      }),
      remove8021XConfig: build.mutation<
        Remove8021XConfigApiResponse,
        Remove8021XConfigApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/dmt/admin/ieee8021xconfigs/${queryArg.profileName}`,
          method: "DELETE",
        }),
        invalidatesTags: ["IEEE802.1x"],
      }),
      get8021XConfig: build.query<
        Get8021XConfigApiResponse,
        Get8021XConfigApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/dmt/admin/ieee8021xconfigs/${queryArg.profileName}`,
        }),
        providesTags: ["IEEE802.1x"],
      }),
      getAllProfiles: build.query<
        GetAllProfilesApiResponse,
        GetAllProfilesApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/dmt/admin/profiles`,
          params: {
            $skip: queryArg.$skip,
            $top: queryArg.$top,
            $count: queryArg.$count,
          },
        }),
        providesTags: ["Profiles"],
      }),
      updateProfile: build.mutation<
        UpdateProfileApiResponse,
        UpdateProfileApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/dmt/admin/profiles`,
          method: "PATCH",
          body: queryArg.profilePatch,
        }),
        invalidatesTags: ["Profiles"],
      }),
      createProfile: build.mutation<
        CreateProfileApiResponse,
        CreateProfileApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/dmt/admin/profiles`,
          method: "POST",
          body: queryArg.profilePost,
        }),
        invalidatesTags: ["Profiles"],
      }),
      removeProfile: build.mutation<
        RemoveProfileApiResponse,
        RemoveProfileApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/dmt/admin/profiles/${queryArg.profileName}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Profiles"],
      }),
      getProfile: build.query<GetProfileApiResponse, GetProfileApiArg>({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/dmt/admin/profiles/${queryArg.profileName}`,
        }),
        providesTags: ["Profiles"],
      }),
      getVersion: build.query<GetVersionApiResponse, GetVersionApiArg>({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/dmt/admin/version`,
        }),
        providesTags: ["Misc"],
      }),
      getAllWirelessConfigs: build.query<
        GetAllWirelessConfigsApiResponse,
        GetAllWirelessConfigsApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/dmt/admin/wirelessconfigs`,
          params: {
            $skip: queryArg.$skip,
            $top: queryArg.$top,
            $count: queryArg.$count,
          },
        }),
        providesTags: ["Wireless"],
      }),
      editWirelessConfig: build.mutation<
        EditWirelessConfigApiResponse,
        EditWirelessConfigApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/dmt/admin/wirelessconfigs`,
          method: "PATCH",
          body: queryArg.wirelessConfigPatch,
        }),
        invalidatesTags: ["Wireless"],
      }),
      createWirelessConfig: build.mutation<
        CreateWirelessConfigApiResponse,
        CreateWirelessConfigApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/dmt/admin/wirelessconfigs`,
          method: "POST",
          body: queryArg.wirelessConfigPost,
        }),
        invalidatesTags: ["Wireless"],
      }),
      removeWirelessConfig: build.mutation<
        RemoveWirelessConfigApiResponse,
        RemoveWirelessConfigApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/dmt/admin/wirelessconfigs/${queryArg.profileName}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Wireless"],
      }),
      getWirelessConfig: build.query<
        GetWirelessConfigApiResponse,
        GetWirelessConfigApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/dmt/admin/wirelessconfigs/${queryArg.profileName}`,
        }),
        providesTags: ["Wireless"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as remoteProvisioningApis };
export type GetAllCiraConfigsApiResponse =
  /** status 200 successful operation */
    | CiraConfigResponse[]
    | CountCiraResponse;
export type GetAllCiraConfigsApiArg = {
  /** The number of items to skip before starting to collect the result set */
  $skip?: number;
  /** The numbers of items to return */
  $top?: number;
  /** The total number of CIRA configs */
  $count?: boolean;
  /** unique projectName for the resource */
  projectName: string;
};
export type EditCiraConfigApiResponse =
  /** status 200 successful operation */ CiraConfigResponse;
export type EditCiraConfigApiArg = {
  /** unique projectName for the resource */
  projectName: string;
  ciraConfigPatch: CiraConfigPatch;
};
export type CreateCiraConfigApiResponse =
  /** status 201 successful operation */ CiraConfigResponse;
export type CreateCiraConfigApiArg = {
  /** unique projectName for the resource */
  projectName: string;
  /** **serverAddressFormat** valid values:
    * 3 = IPv4 address
    * 201 = FQDN
    
    **authMethod** should stay as '2'. 2 is Username/Password Authentication and is how the MPS and AMT device will authenticate to communicate.
    
    **mpsRootCertificate** can be gotten by calling the MPS API endpoint `/api/vi/ciracert`.
     */
  ciraConfigPost: CiraConfigPost;
};
export type RemoveCiraConfigApiResponse =
  /** status 204 successful operation */ void;
export type RemoveCiraConfigApiArg = {
  /** Name of CIRA config to remove */
  configName: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type GetCiraConfigApiResponse =
  /** status 200 successful operation */ CiraConfigResponse;
export type GetCiraConfigApiArg = {
  /** Name of CIRA config to return */
  configName: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type GetAllDomainsApiResponse = /** status 200 successful operation */
  | DomainResponse[]
  | CountDomainResponse;
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
export type GetV1ProjectsByProjectNameDmtAdminHealthApiResponse =
  /** status 200 Successful operation */ HealthcheckResponse;
export type GetV1ProjectsByProjectNameDmtAdminHealthApiArg = {
  /** unique projectName for the resource */
  projectName: string;
};
export type GetAll8021XConfigsApiResponse =
  /** status 200 successful operation */
    | Ieee8021XConfigResponse[]
    | CountIeee8021XResponse;
export type GetAll8021XConfigsApiArg = {
  /** The number of items to skip before starting to collect the result set */
  $skip?: number;
  /** The numbers of items to return */
  $top?: number;
  /** The total number of ieee8021xconfigs */
  $count?: boolean;
  /** unique projectName for the resource */
  projectName: string;
};
export type Edit8021XConfigApiResponse =
  /** status 200 successful operation */ Ieee8021XConfigResponse;
export type Edit8021XConfigApiArg = {
  /** unique projectName for the resource */
  projectName: string;
  /** Wired **authenticationProtocol** valid values:
    * **0 = EAP-TLS** <br>Indicates that the desired EAP type is the Transport Layer Security EAP type specified in RFC 2716.
    * **2 = PEAPv0/EAP-MSCHAPv2** <br>Indicates that the desired EAP type is the Protected Extensible Authentication Protocol (PEAP) Version 0 EAP type specified in draft-kamath-pppext-peapv0, with Microsoft PPP CHAP Extensions, Version 2 (MSCHAPv2) as the inner authentication method.
    * **3 = PEAPv1/EAP-GTC** <br>Indicates that the desired EAP type is the Protected Extensible Authentication Protocol (PEAP) Version 1 EAP type specified in draft-josefsson-pppext-eap-tls-eap, with Generic Token Card (GTC) as the inner authentication method.
    * **5 = EAP-FAST/GTC** <br>Indicates that the desired EAP type is the Flexible Authentication Extensible Authentication Protocol EAP type specified in IETF RFC 4851, with Generic Token Card (GTC) as the inner authentication method.
    * **10 = EAP-FAST/TLS** <br>Indicates that the desired EAP type is the Flexible Authentication EAP type specified in IETF RFC 4851, with TLS as the inner authentication method.
    
    Wireless **authenticationProtocol** valid values:
    * **0 = EAP-TLS** <br>Indicates that the desired EAP type is the Transport Layer Security EAP type specified in RFC 2716.
    * **2 = PEAPv0/EAP-MSCHAPv2** <br>Indicates that the desired EAP type is the Protected Extensible Authentication Protocol (PEAP) Version 0 EAP type specified in draft-kamath-pppext-peapv0, with Microsoft PPP CHAP Extensions, Version 2 (MSCHAPv2) as the inner authentication method.
    
    **pxeTimeout is only valid for Wired 802.1x Configs.** The field is ignored for Wireless 802.1x Configs.
    
    **pxeTimeout** is the number of seconds in which the Intel(R) AMT will hold an authenticated 802.1X session. During the defined period, Intel(R) AMT manages the 802.1X negotiation while a PXE boot takes place. After the timeout, control of the negotiation passes to the host.
    
    **pxeTimeout** valid values:
    * The maximum value is 86400 seconds (one day).
    * A value of 0 disables the feature.
    * If this optional value is omitted, Intel(R) AMT sets a default value of 120 seconds.
     */
  ieee8021XConfigPatch: Ieee8021XConfigPatch;
};
export type Create8021XConfigApiResponse =
  /** status 201 successful operation */ Ieee8021XConfigResponse;
export type Create8021XConfigApiArg = {
  /** unique projectName for the resource */
  projectName: string;
  /** Wired **authenticationProtocol** valid values:
    * **0 = EAP-TLS** <br>Indicates that the desired EAP type is the Transport Layer Security EAP type specified in RFC 2716.
    * **2 = PEAPv0/EAP-MSCHAPv2** <br>Indicates that the desired EAP type is the Protected Extensible Authentication Protocol (PEAP) Version 0 EAP type specified in draft-kamath-pppext-peapv0, with Microsoft PPP CHAP Extensions, Version 2 (MSCHAPv2) as the inner authentication method.
    * **3 = PEAPv1/EAP-GTC** <br>Indicates that the desired EAP type is the Protected Extensible Authentication Protocol (PEAP) Version 1 EAP type specified in draft-josefsson-pppext-eap-tls-eap, with Generic Token Card (GTC) as the inner authentication method.
    * **5 = EAP-FAST/GTC** <br>Indicates that the desired EAP type is the Flexible Authentication Extensible Authentication Protocol EAP type specified in IETF RFC 4851, with Generic Token Card (GTC) as the inner authentication method.
    * **10 = EAP-FAST/TLS** <br>Indicates that the desired EAP type is the Flexible Authentication EAP type specified in IETF RFC 4851, with TLS as the inner authentication method.
    
    Wireless **authenticationProtocol** valid values:
    * **0 = EAP-TLS** <br>Indicates that the desired EAP type is the Transport Layer Security EAP type specified in RFC 2716.
    * **2 = PEAPv0/EAP-MSCHAPv2** <br>Indicates that the desired EAP type is the Protected Extensible Authentication Protocol (PEAP) Version 0 EAP type specified in draft-kamath-pppext-peapv0, with Microsoft PPP CHAP Extensions, Version 2 (MSCHAPv2) as the inner authentication method.
    
    **pxeTimeout is only valid for Wired 802.1x Configs.** This field is ignored for Wireless 802.1x Configs.
    
    **pxeTimeout** is the number of seconds in which the Intel(R) AMT will hold an authenticated 802.1X session. During the defined period, Intel(R) AMT manages the 802.1X negotiation while a PXE boot takes place. After the timeout, control of the negotiation passes to the host.
    
    **pxeTimeout** valid values:
    * The maximum value is 86400 seconds (one day).
    * A value of 0 disables the feature.
    * If this optional value is omitted, Intel(R) AMT sets a default value of 120 seconds.
     */
  ieee8021XConfigPost: Ieee8021XConfigPost;
};
export type Remove8021XConfigApiResponse =
  /** status 204 successful operation */ void;
export type Remove8021XConfigApiArg = {
  /** Name of IEEE802.1x config profile to remove */
  profileName: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type Get8021XConfigApiResponse =
  /** status 200 successful operation */ Ieee8021XConfigResponse;
export type Get8021XConfigApiArg = {
  /** Name of IEEE802.1x config to return */
  profileName: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type GetAllProfilesApiResponse = /** status 200 successful operation */
  | ProfileResponse[]
  | CountProfileResponse;
export type GetAllProfilesApiArg = {
  /** The number of items to skip before starting to collect the result set */
  $skip?: number;
  /** The numbers of items to return */
  $top?: number;
  /** The total number of profiles */
  $count?: boolean;
  /** unique projectName for the resource */
  projectName: string;
};
export type UpdateProfileApiResponse =
  /** status 200 successful operation */ ProfileResponse;
export type UpdateProfileApiArg = {
  /** unique projectName for the resource */
  projectName: string;
  /** **userConsent** valid values:
   * None
   * All (Mandatory for CCM activation.)
   * KVM
   */
  profilePatch: ProfilePatch;
};
export type CreateProfileApiResponse =
  /** status 201 successful operation */ ProfileResponse;
export type CreateProfileApiArg = {
  /** unique projectName for the resource */
  projectName: string;
  /** **userConsent** valid values:
   * None
   * All (Mandatory for CCM activation.)
   * KVM
   */
  profilePost: ProfilePost;
};
export type RemoveProfileApiResponse =
  /** status 204 successful operation */ void;
export type RemoveProfileApiArg = {
  /** Name of profile to remove */
  profileName: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type GetProfileApiResponse =
  /** status 200 successful operation */ ProfileResponse;
export type GetProfileApiArg = {
  /** Name of profile to return */
  profileName: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type GetVersionApiResponse =
  /** status 200 successful operation */ VersionResponse;
export type GetVersionApiArg = {
  /** unique projectName for the resource */
  projectName: string;
};
export type GetAllWirelessConfigsApiResponse =
  /** status 200 successful operation */
    | WirelessConfigResponse[]
    | CountWirelessResponse;
export type GetAllWirelessConfigsApiArg = {
  /** The number of items to skip before starting to collect the result set */
  $skip?: number;
  /** The numbers of items to return */
  $top?: number;
  /** The total number of wireless configs */
  $count?: boolean;
  /** unique projectName for the resource */
  projectName: string;
};
export type EditWirelessConfigApiResponse =
  /** status 200 successful operation */ WirelessConfigResponse;
export type EditWirelessConfigApiArg = {
  /** unique projectName for the resource */
  projectName: string;
  /** **authenticationMethod** valid values:
    * 4 = WPA PSK
    * 5 = WPA_IEEE8021X
    * 6 = WPA2 PSK
    * 7 = WPA2_IEEE8021X
    
    **encryptionMethod** valid values:
    * 3 = TKIP
    * 4 = CCMP
     */
  wirelessConfigPatch: WirelessConfigPatch;
};
export type CreateWirelessConfigApiResponse =
  /** status 201 successful operation */ WirelessConfigResponse;
export type CreateWirelessConfigApiArg = {
  /** unique projectName for the resource */
  projectName: string;
  /** **authenticationMethod** valid values:
    * 4 = WPA PSK
    * 5 = WPA_IEEE8021X
    * 6 = WPA2 PSK
    * 7 = WPA2_IEEE8021X
    
    **encryptionMethod** valid values:
    * 3 = TKIP
    * 4 = CCMP
     */
  wirelessConfigPost: WirelessConfigPost;
};
export type RemoveWirelessConfigApiResponse =
  /** status 204 successful operation */ void;
export type RemoveWirelessConfigApiArg = {
  /** Name of Wireless config to remove */
  profileName: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type GetWirelessConfigApiResponse =
  /** status 200 successful operation */ WirelessConfigResponse;
export type GetWirelessConfigApiArg = {
  /** Name of Wireless config to return */
  profileName: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type CiraConfigResponse = {
  authMethod: number;
  commonName: string;
  configName: string;
  mpsPort: number;
  mpsRootCertificate: string;
  mpsServerAddress: string;
  proxyDetails: string;
  serverAddressFormat: number;
  tenantId?: string;
  username: string;
  version?: string;
};
export type CountCiraResponse = {
  data?: CiraConfigResponse[];
  totalCount?: number;
};
export type ApiResponse = {
  error?: string;
  message?: string;
};
export type CiraConfigPatch = {
  authMethod: number;
  commonName: string;
  configName: string;
  mpsPort: number;
  mpsRootCertificate: string;
  mpsServerAddress: string;
  password?: string;
  proxyDetails: string;
  regeneratePassword: boolean;
  serverAddressFormat: number;
  username: string;
  version: string;
};
export type CiraConfigPost = {
  authMethod: number;
  commonName: string;
  configName: string;
  mpsPort: number;
  mpsRootCertificate: string;
  mpsServerAddress: string;
  password?: string;
  proxyDetails: string;
  serverAddressFormat: number;
  username: string;
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
export type HealthcheckResponse = {
  db?: {
    name?: string;
    status?: string;
  };
  secretStore?: {
    name?: string;
    status?: {
      cluster_id?: string;
      cluster_name?: string;
      initialized?: boolean;
      performance_standby?: boolean;
      replication_dr_mode?: string;
      replication_performance_mode?: string;
      sealed?: boolean;
      server_time_utc?: number;
      standby?: boolean;
      version?: string;
    };
  };
};
export type Ieee8021XConfigResponse = {
  authenticationProtocol: (0 | 2 | 3 | 5 | 10)[];
  profileName: string;
  pxeTimeout: number;
  tenantId: string;
  version: string;
  wiredInterface: boolean;
};
export type CountIeee8021XResponse = {
  data?: Ieee8021XConfigResponse[];
  totalCount?: number;
};
export type Ieee8021XConfigPatch = {
  authenticationProtocol: (0 | 3 | 5 | 10)[];
  profileName: string;
  pxeTimeout?: number;
  tenantId?: string;
  version: string;
  wiredInterface: boolean;
};
export type Ieee8021XConfigPost = {
  authenticationProtocol: (0 | 2 | 3 | 5 | 10)[];
  profileName: string;
  pxeTimeout?: number;
  tenantId?: string;
  version?: string;
  wiredInterface: boolean;
};
export type ProfileResponse = {
  activation: string;
  ciraConfigName: string;
  dhcpEnabled: boolean;
  generateRandomMEBxPassword: boolean;
  generateRandomPassword: boolean;
  iderEnabled: boolean;
  ieee8021xProfile: string;
  ipSyncEnabled?: boolean;
  kvmEnabled: boolean;
  localWifiSyncEnabled?: boolean;
  profileName: string;
  solEnabled: boolean;
  tags: string[];
  tenantId?: string;
  /** Server Authentication Only(1), Server and Non-TLS Authentication (2), Mutual TLS only (3), Mutual and Non-TLS authentication (4) */
  tlsMode: number;
  tlsSigningAuthority: string;
  /** User Consenst must be one of None, All, KVM. It must be 'All' in client control mode */
  userConsent: string;
  version?: string;
  wifiConfigs: object[];
};
export type CountProfileResponse = {
  data?: ProfileResponse[];
  totalCount?: number;
};
export type ProfilePatch = {
  activation: string;
  amtPassword?: string;
  ciraConfigName: string;
  dhcpEnabled: boolean;
  generateRandomMEBxPassword: boolean;
  generateRandomPassword: boolean;
  iderEnabled: boolean;
  ieee8021xProfile?: string;
  ipSyncEnabled?: boolean;
  kvmEnabled: boolean;
  localWifiSyncEnabled?: boolean;
  mebxPassword?: string;
  profileName: string;
  solEnabled: boolean;
  tags: string[];
  /** Server Authentication Only (1), Server and Non-TLS Authentication (2) */
  tlsMode: 1 | 2;
  tlsSigningAuthority?: string;
  /** User Consent must be one of None, All, KVM. It should be 'All' in client control mode */
  userConsent: "None" | "All" | "KVM";
  version: string;
  wifiConfigs: object[];
};
export type ProfilePost = {
  activation: string;
  amtPassword?: string;
  ciraConfigName?: string;
  dhcpEnabled: boolean;
  generateRandomMEBxPassword: boolean;
  generateRandomPassword: boolean;
  iderEnabled?: boolean;
  ieee8021xProfile?: string;
  ipSyncEnabled?: boolean;
  kvmEnabled?: boolean;
  localWifiSyncEnabled?: boolean;
  mebxPassword?: string;
  networkConfigName?: string;
  profileName: string;
  solEnabled?: boolean;
  tags: string[];
  /** Server Authentication Only (1), Server and Non-TLS Authentication (2) */
  tlsMode?: 1 | 2;
  tlsSigningAuthority: string;
  /** User Consent must be one of None, All, KVM. It should be 'All' in client control mode */
  userConsent?: "None" | "All" | "KVM";
  wifiConfigs?: object[];
};
export type VersionResponse = {
  protocolVersion: string;
  serviceVersion: string;
};
export type WirelessConfigResponse = {
  authenticationMethod: number;
  encryptionMethod: number;
  ieee8021xProfile?: string;
  linkPolicy: number[];
  profileName: string;
  pskValue: string;
  ssid: string;
  tenantId?: string;
  total_count?: string;
  version?: string;
};
export type CountWirelessResponse = {
  data?: WirelessConfigResponse[];
  totalCount?: number;
};
export type WirelessConfigPatch = {
  authenticationMethod: number;
  encryptionMethod: number;
  ieee8021xProfile?: string;
  linkPolicy: (1 | 14 | 16 | 224)[];
  profileName: string;
  pskPassphrase?: string;
  ssid: string;
  version: string;
};
export type WirelessConfigPost = {
  authenticationMethod: number;
  encryptionMethod: number;
  ieee8021xProfile?: string;
  linkPolicy: (1 | 14 | 16 | 224)[];
  profileName: string;
  pskPassphrase?: string;
  ssid: string;
};
export const {
  useGetAllCiraConfigsQuery,
  useLazyGetAllCiraConfigsQuery,
  useEditCiraConfigMutation,
  useCreateCiraConfigMutation,
  useRemoveCiraConfigMutation,
  useGetCiraConfigQuery,
  useLazyGetCiraConfigQuery,
  useGetAllDomainsQuery,
  useLazyGetAllDomainsQuery,
  useUpdateDomainSuffixMutation,
  useCreateDomainMutation,
  useRemoveDomainMutation,
  useGetDomainQuery,
  useLazyGetDomainQuery,
  useGetV1ProjectsByProjectNameDmtAdminHealthQuery,
  useLazyGetV1ProjectsByProjectNameDmtAdminHealthQuery,
  useGetAll8021XConfigsQuery,
  useLazyGetAll8021XConfigsQuery,
  useEdit8021XConfigMutation,
  useCreate8021XConfigMutation,
  useRemove8021XConfigMutation,
  useGet8021XConfigQuery,
  useLazyGet8021XConfigQuery,
  useGetAllProfilesQuery,
  useLazyGetAllProfilesQuery,
  useUpdateProfileMutation,
  useCreateProfileMutation,
  useRemoveProfileMutation,
  useGetProfileQuery,
  useLazyGetProfileQuery,
  useGetVersionQuery,
  useLazyGetVersionQuery,
  useGetAllWirelessConfigsQuery,
  useLazyGetAllWirelessConfigsQuery,
  useEditWirelessConfigMutation,
  useCreateWirelessConfigMutation,
  useRemoveWirelessConfigMutation,
  useGetWirelessConfigQuery,
  useLazyGetWirelessConfigQuery,
} = injectedRtkApi;
