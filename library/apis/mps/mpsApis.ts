import { mpsApi as api } from "./apiSlice";
export const addTagTypes = ["AMT", "Devices"] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getV1ProjectsByProjectNameDmAmtGeneralSettingsAndGuid: build.query<
        GetV1ProjectsByProjectNameDmAmtGeneralSettingsAndGuidApiResponse,
        GetV1ProjectsByProjectNameDmAmtGeneralSettingsAndGuidApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/dm/amt/generalSettings/${queryArg.guid}`,
        }),
        providesTags: ["AMT"],
      }),
      deleteV1ProjectsByProjectNameDmDevicesAndGuid: build.mutation<
        DeleteV1ProjectsByProjectNameDmDevicesAndGuidApiResponse,
        DeleteV1ProjectsByProjectNameDmDevicesAndGuidApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/dm/devices/${queryArg.guid}`,
          method: "DELETE",
          params: { isSecretToBeDeleted: queryArg.isSecretToBeDeleted },
        }),
        invalidatesTags: ["Devices"],
      }),
      getV1ProjectsByProjectNameDmDevicesAndGuid: build.query<
        GetV1ProjectsByProjectNameDmDevicesAndGuidApiResponse,
        GetV1ProjectsByProjectNameDmDevicesAndGuidApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/dm/devices/${queryArg.guid}`,
        }),
        providesTags: ["Devices"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as mpsApis };
export type GetV1ProjectsByProjectNameDmAmtGeneralSettingsAndGuidApiResponse =
  /** status 200 Successful operation */ GeneralSettingsResponse;
export type GetV1ProjectsByProjectNameDmAmtGeneralSettingsAndGuidApiArg = {
  /** GUID of device */
  guid: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type DeleteV1ProjectsByProjectNameDmDevicesAndGuidApiResponse =
  /** status 204 Successful operation */ DeleteResponse;
export type DeleteV1ProjectsByProjectNameDmDevicesAndGuidApiArg = {
  /** GUID of device to return */
  guid: string;
  /** Delete device information from both the Database **AND Secret Storage**. Caution: This will delete the stored device passwords in Secret Storage. */
  isSecretToBeDeleted?: boolean;
  /** unique projectName for the resource */
  projectName: string;
};
export type GetV1ProjectsByProjectNameDmDevicesAndGuidApiResponse =
  /** status 200 Successful operation */ Device;
export type GetV1ProjectsByProjectNameDmDevicesAndGuidApiArg = {
  /** GUID of device to return */
  guid: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type GeneralSettingsResponse = {
  Body?: {
    AMTNetworkEnabled?: number;
    DDNSPeriodicUpdateInterval?: number;
    DDNSTTL?: number;
    DDNSUpdateByDHCPServerEnabled?: boolean;
    DDNSUpdateEnabled?: boolean;
    DHCPv6ConfigurationTimeout?: number;
    DigestRealm?: string;
    DomainName?: string;
    ElementName?: string;
    HostName?: string;
    HostOSFQDN?: string;
    IdleWakeTimeout?: number;
    InstanceID?: string;
    NetworkInterfaceEnabled?: boolean;
    PingResponseEnabled?: boolean;
    PowerSource?: number;
    PreferredAddressFamily?: number;
    PresenceNotificationInterval?: number;
    PrivacyLevel?: number;
    RmcpPingResponseEnabled?: boolean;
    SharedFQDN?: boolean;
    WsmanOnlyMode?: boolean;
  };
  Header?: {
    Action?: string;
    MessageID?: string;
    Method?: string;
    RelatesTo?: string;
    ResourceURI?: string;
    To?: string;
  };
};
export type DeleteResponse = {
  /** HTTP returncode */
  success?: number;
};
export type DeleteErrorResponse = {
  /** server error message */
  error?: string;
  /** contains device guid */
  errorDescription?: string;
  /** HTTP returncode */
  success?: number;
};
export type Device = {
  connectionStatus?: boolean;
  deviceInfo?: {
    currentMode?: string;
    features?: string;
    fwBuild?: string;
    fwSku?: string;
    fwVersion?: string;
    ipAddress?: string;
    lastUpdated?: string;
  };
  dnsSuffix?: string;
  friendlyName?: string;
  guid?: string;
  hostname?: string;
  lastConnected?: string;
  lastDisconnected?: string;
  lastSeen?: string;
  mpsInstance?: string;
  mpsusername?: string;
  tags?: string[];
  tenantid?: string;
};
export const {
  useGetV1ProjectsByProjectNameDmAmtGeneralSettingsAndGuidQuery,
  useLazyGetV1ProjectsByProjectNameDmAmtGeneralSettingsAndGuidQuery,
  useDeleteV1ProjectsByProjectNameDmDevicesAndGuidMutation,
  useGetV1ProjectsByProjectNameDmDevicesAndGuidQuery,
  useLazyGetV1ProjectsByProjectNameDmDevicesAndGuidQuery,
} = injectedRtkApi;
