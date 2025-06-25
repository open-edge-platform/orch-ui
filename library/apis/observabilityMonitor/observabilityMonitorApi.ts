import { observabilityMonitorApi as api } from "./apiSlice";
export const addTagTypes = [
  "alert",
  "alert-definition",
  "alert-receiver",
  "service",
] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getProjectAlerts: build.query<
        GetProjectAlertsApiResponse,
        GetProjectAlertsApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/alerts`,
          params: {
            alert: queryArg.alert,
            host: queryArg.host,
            cluster: queryArg.cluster,
            app: queryArg.app,
            active: queryArg.active,
            suppressed: queryArg.suppressed,
          },
        }),
        providesTags: ["alert"],
      }),
      getProjectAlertDefinitions: build.query<
        GetProjectAlertDefinitionsApiResponse,
        GetProjectAlertDefinitionsApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/alerts/definitions`,
        }),
        providesTags: ["alert-definition"],
      }),
      getProjectAlertDefinition: build.query<
        GetProjectAlertDefinitionApiResponse,
        GetProjectAlertDefinitionApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/alerts/definitions/${queryArg.alertDefinitionId}`,
        }),
        providesTags: ["alert-definition"],
      }),
      patchProjectAlertDefinition: build.mutation<
        PatchProjectAlertDefinitionApiResponse,
        PatchProjectAlertDefinitionApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/alerts/definitions/${queryArg.alertDefinitionId}`,
          method: "PATCH",
          body: queryArg.body,
        }),
        invalidatesTags: ["alert-definition"],
      }),
      getProjectAlertDefinitionRule: build.query<
        GetProjectAlertDefinitionRuleApiResponse,
        GetProjectAlertDefinitionRuleApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/alerts/definitions/${queryArg.alertDefinitionId}/template`,
          params: { rendered: queryArg.rendered },
        }),
        providesTags: ["alert-definition"],
      }),
      getProjectAlertReceivers: build.query<
        GetProjectAlertReceiversApiResponse,
        GetProjectAlertReceiversApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/alerts/receivers`,
        }),
        providesTags: ["alert-receiver"],
      }),
      getProjectAlertReceiver: build.query<
        GetProjectAlertReceiverApiResponse,
        GetProjectAlertReceiverApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/alerts/receivers/${queryArg.receiverId}`,
        }),
        providesTags: ["alert-receiver"],
      }),
      patchProjectAlertReceiver: build.mutation<
        PatchProjectAlertReceiverApiResponse,
        PatchProjectAlertReceiverApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/alerts/receivers/${queryArg.receiverId}`,
          method: "PATCH",
          body: queryArg.body,
        }),
        invalidatesTags: ["alert-receiver"],
      }),
      getServiceStatus: build.query<
        GetServiceStatusApiResponse,
        GetServiceStatusApiArg
      >({
        query: () => ({ url: `/v1/status` }),
        providesTags: ["service"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as observabilityMonitor };
export type GetProjectAlertsApiResponse =
  /** status 200 The list of alert instances is retrieved successfully */ AlertList;
export type GetProjectAlertsApiArg = {
  /** Filters the alert definitions by name */
  alert?: string;
  /** Filters the alerts by Host ID */
  host?: string;
  /** Filters the alerts by cluster ID */
  cluster?: string;
  /** Filters the alerts by application or deployment ID */
  app?: string;
  /** Shows active alerts */
  active?: boolean;
  /** Shows suppressed alerts */
  suppressed?: boolean;
  /** unique projectName for the resource */
  projectName: string;
};
export type GetProjectAlertDefinitionsApiResponse =
  /** status 200 The list of alert definitions is retrieved successfully */ AlertDefinitionList;
export type GetProjectAlertDefinitionsApiArg = {
  /** unique projectName for the resource */
  projectName: string;
};
export type GetProjectAlertDefinitionApiResponse =
  /** status 200 The alert is found */ AlertDefinition;
export type GetProjectAlertDefinitionApiArg = {
  /** ID of an alert definition (UUID format) */
  alertDefinitionId: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type PatchProjectAlertDefinitionApiResponse =
  /** status 204 The alert definition is updated successfully */ void;
export type PatchProjectAlertDefinitionApiArg = {
  /** ID of an alert definition (UUID format) */
  alertDefinitionId: string;
  /** unique projectName for the resource */
  projectName: string;
  /** Payload that defines the properties to be updated */
  body: {
    values?: {
      duration?: string;
      enabled?: string;
      threshold?: string;
    };
  };
};
export type GetProjectAlertDefinitionRuleApiResponse =
  /** status 200 The rendered alerting rule based on alert template, is found */ AlertDefinitionTemplate;
export type GetProjectAlertDefinitionRuleApiArg = {
  /** ID of an alert definition (UUID format) */
  alertDefinitionId: string;
  /** Specifies if template values will be rendered */
  rendered?: boolean;
  /** unique projectName for the resource */
  projectName: string;
};
export type GetProjectAlertReceiversApiResponse =
  /** status 200 The list of alert receivers is retrieved successfully */ ReceiverList;
export type GetProjectAlertReceiversApiArg = {
  /** unique projectName for the resource */
  projectName: string;
};
export type GetProjectAlertReceiverApiResponse =
  /** status 200 The alert receiver is found */ Receiver;
export type GetProjectAlertReceiverApiArg = {
  /** ID of a receiver (UUID format) */
  receiverId: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type PatchProjectAlertReceiverApiResponse =
  /** status 204 The alert receiver is updated successfully */ void;
export type PatchProjectAlertReceiverApiArg = {
  /** ID of a receiver (UUID format) */
  receiverId: string;
  /** unique projectName for the resource */
  projectName: string;
  /** Payload that defines the properties to be updated */
  body: {
    emailConfig: EmailConfigTo;
  };
};
export type GetServiceStatusApiResponse =
  /** status 200 The runtime status of the service is retrieved successfully */ ServiceStatus;
export type GetServiceStatusApiArg = void;
export type Alert = {
  alertDefinitionId?: string;
  annotations?: {
    [key: string]: string;
  };
  endsAt?: string;
  fingerprint?: string;
  labels?: {
    [key: string]: string;
  };
  startsAt?: string;
  status?: {
    state?: "suppressed" | "active" | "resolved";
  };
  updatedAt?: string;
};
export type AlertList = {
  alerts?: Alert[];
};
export type HttpError = {
  code: number;
  message: string;
};
export type StateDefinition =
  | "new"
  | "modified"
  | "pending"
  | "error"
  | "applied";
export type AlertDefinition = {
  id?: string;
  name?: string;
  state?: StateDefinition;
  values?: {
    [key: string]: string;
  };
  version?: number;
};
export type AlertDefinitionList = {
  alertDefinitions?: AlertDefinition[];
};
export type AlertDefinitionTemplate = {
  alert?: string;
  annotations?: {
    [key: string]: string;
  };
  expr?: string;
  for?: string;
  labels?: {
    [key: string]: string;
  };
};
export type Email = string;
export type EmailRecipientList = Email[];
export type EmailConfig = {
  from?: Email;
  mailServer?: string;
  to?: {
    allowed?: EmailRecipientList;
    enabled?: EmailRecipientList;
  };
};
export type Receiver = {
  emailConfig?: EmailConfig;
  id?: string;
  state?: StateDefinition;
  version?: number;
};
export type ReceiverList = {
  receivers?: Receiver[];
};
export type EmailConfigTo = {
  to: {
    enabled: EmailRecipientList;
  };
};
export type ServiceStatus = {
  state: "ready" | "failed";
};
export const {
  useGetProjectAlertsQuery,
  useGetProjectAlertDefinitionsQuery,
  useGetProjectAlertDefinitionQuery,
  usePatchProjectAlertDefinitionMutation,
  useGetProjectAlertDefinitionRuleQuery,
  useGetProjectAlertReceiversQuery,
  useGetProjectAlertReceiverQuery,
  usePatchProjectAlertReceiverMutation,
  useGetServiceStatusQuery,
} = injectedRtkApi;
