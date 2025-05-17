import { appResourceManagerApi as api } from "./apiSlice";
export const addTagTypes = [
  "EndpointsService",
  "AppWorkloadService",
  "VirtualMachineService",
  "PodService",
] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      endpointsServiceListAppEndpoints: build.query<
        EndpointsServiceListAppEndpointsApiResponse,
        EndpointsServiceListAppEndpointsApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/resource/endpoints/applications/${queryArg.appId}/clusters/${queryArg.clusterId}`,
        }),
        providesTags: ["EndpointsService"],
      }),
      appWorkloadServiceListAppWorkloads: build.query<
        AppWorkloadServiceListAppWorkloadsApiResponse,
        AppWorkloadServiceListAppWorkloadsApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/resource/workloads/applications/${queryArg.appId}/clusters/${queryArg.clusterId}`,
        }),
        providesTags: ["AppWorkloadService"],
      }),
      virtualMachineServiceRestartVirtualMachine: build.mutation<
        VirtualMachineServiceRestartVirtualMachineApiResponse,
        VirtualMachineServiceRestartVirtualMachineApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/resource/workloads/applications/${queryArg.appId}/clusters/${queryArg.clusterId}/virtual-machines/${queryArg.virtualMachineId}/restart`,
          method: "PUT",
        }),
        invalidatesTags: ["VirtualMachineService"],
      }),
      virtualMachineServiceStartVirtualMachine: build.mutation<
        VirtualMachineServiceStartVirtualMachineApiResponse,
        VirtualMachineServiceStartVirtualMachineApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/resource/workloads/applications/${queryArg.appId}/clusters/${queryArg.clusterId}/virtual-machines/${queryArg.virtualMachineId}/start`,
          method: "PUT",
        }),
        invalidatesTags: ["VirtualMachineService"],
      }),
      virtualMachineServiceStopVirtualMachine: build.mutation<
        VirtualMachineServiceStopVirtualMachineApiResponse,
        VirtualMachineServiceStopVirtualMachineApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/resource/workloads/applications/${queryArg.appId}/clusters/${queryArg.clusterId}/virtual-machines/${queryArg.virtualMachineId}/stop`,
          method: "PUT",
        }),
        invalidatesTags: ["VirtualMachineService"],
      }),
      virtualMachineServiceGetVnc: build.query<
        VirtualMachineServiceGetVncApiResponse,
        VirtualMachineServiceGetVncApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/resource/workloads/applications/${queryArg.appId}/clusters/${queryArg.clusterId}/virtual-machines/${queryArg.virtualMachineId}/vnc`,
        }),
        providesTags: ["VirtualMachineService"],
      }),
      podServiceDeletePod: build.mutation<
        PodServiceDeletePodApiResponse,
        PodServiceDeletePodApiArg
      >({
        query: (queryArg) => ({
          url: `/v1/projects/${queryArg.projectName}/resource/workloads/pods/clusters/${queryArg.clusterId}/namespaces/${queryArg["namespace"]}/pods/${queryArg.podName}/delete`,
          method: "PUT",
        }),
        invalidatesTags: ["PodService"],
      }),
    }),
    overrideExisting: false,
  });
export { injectedRtkApi as resourceManager };
export type EndpointsServiceListAppEndpointsApiResponse =
  /** status 200 OK */ ListAppEndpointsResponseRead;
export type EndpointsServiceListAppEndpointsApiArg = {
  /** Application ID */
  appId: string;
  /** Cluster ID */
  clusterId: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type AppWorkloadServiceListAppWorkloadsApiResponse =
  /** status 200 OK */ ListAppWorkloadsResponseRead;
export type AppWorkloadServiceListAppWorkloadsApiArg = {
  /** Application ID */
  appId: string;
  /** Cluster ID */
  clusterId: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type VirtualMachineServiceRestartVirtualMachineApiResponse =
  /** status 200 OK */ RestartVirtualMachineResponse;
export type VirtualMachineServiceRestartVirtualMachineApiArg = {
  /** Application ID */
  appId: string;
  /** Cluster ID */
  clusterId: string;
  /** Virtual machine ID */
  virtualMachineId: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type VirtualMachineServiceStartVirtualMachineApiResponse =
  /** status 200 OK */ StartVirtualMachineResponse;
export type VirtualMachineServiceStartVirtualMachineApiArg = {
  /** Application ID */
  appId: string;
  /** Cluster ID */
  clusterId: string;
  /** Virtual machine ID */
  virtualMachineId: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type VirtualMachineServiceStopVirtualMachineApiResponse =
  /** status 200 OK */ StopVirtualMachineResponse;
export type VirtualMachineServiceStopVirtualMachineApiArg = {
  /** Application ID */
  appId: string;
  /** Cluster ID */
  clusterId: string;
  /** Virtual machine ID */
  virtualMachineId: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type VirtualMachineServiceGetVncApiResponse =
  /** status 200 OK */ GetVncResponse;
export type VirtualMachineServiceGetVncApiArg = {
  /** Application ID */
  appId: string;
  /** Cluster ID */
  clusterId: string;
  /** Virtual machine ID */
  virtualMachineId: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type PodServiceDeletePodApiResponse =
  /** status 200 OK */ DeletePodResponse;
export type PodServiceDeletePodApiArg = {
  /** Cluster ID */
  clusterId: string;
  /** Namespace that the pod is running on. */
  namespace: string;
  /** Name of the pod. */
  podName: string;
  /** unique projectName for the resource */
  projectName: string;
};
export type ListAppEndpointsResponse = {};
export type EndpointStatus = {};
export type EndpointStatusRead = {
  /** Endpoint state, either Ready or NotReady. */
  state?: "STATE_UNSPECIFIED" | "STATE_READY" | "STATE_NOT_READY";
};
export type AppEndpoint = {
  endpointStatus?: EndpointStatus;
};
export type Fqdn = {
  fqdn?: string;
};
export type Port = {};
export type PortRead = {
  /** Port name */
  name?: string;
  /** Protocol for a port. */
  protocol?: string;
  /** Service proxy URL for a port. */
  serviceProxyUrl?: string;
  /** Port value */
  value?: number;
};
export type AppEndpointRead = {
  endpointStatus?: EndpointStatusRead;
  /** Fully qualified domain name (FQDN) for external access. */
  fqdns?: Fqdn[];
  /** Endpoint object UID (e.g. service or ingress UID) */
  id?: string;
  /** Endpoint name */
  name?: string;
  /** List of ports exposed by a service for external access */
  ports?: PortRead[];
};
export type ListAppEndpointsResponseRead = {
  /** List of services. */
  appEndpoints?: AppEndpointRead[];
};
export type ContainerStateRunning = object;
export type ContainerStateTerminated = {};
export type ContainerStateTerminatedRead = {
  /** Exit code of the termination status. */
  exitCode?: number;
  /** Message of the termination status. */
  message?: string;
  /** Reason of the termination. */
  reason?: string;
};
export type ContainerStateWaiting = {};
export type ContainerStateWaitingRead = {
  /** Message of the waiting status. */
  message?: string;
  /** Reason of the waiting status. */
  reason?: string;
};
export type ContainerStatus = {
  containerStateRunning?: ContainerStateRunning;
  containerStateTerminated?: ContainerStateTerminated;
  containerStateWaiting?: ContainerStateWaiting;
};
export type ContainerStatusRead = {
  containerStateRunning?: ContainerStateRunning;
  containerStateTerminated?: ContainerStateTerminatedRead;
  containerStateWaiting?: ContainerStateWaitingRead;
};
export type Container = {
  /** Container name */
  name: string;
  status?: ContainerStatus;
};
export type ContainerRead = {
  /** image_name container image name */
  imageName?: string;
  /** Container name */
  name: string;
  /** Number of times that a container is restarted. */
  restartCount?: number;
  status?: ContainerStatusRead;
};
export type PodStatus = {
  /** State information */
  state?:
    | "STATE_UNSPECIFIED"
    | "STATE_PENDING"
    | "STATE_RUNNING"
    | "STATE_SUCCEEDED"
    | "STATE_FAILED";
};
export type Pod = {
  /** containers list of containers per pod */
  containers?: Container[];
  status?: PodStatus;
};
export type PodRead = {
  /** containers list of containers per pod */
  containers?: ContainerRead[];
  status?: PodStatus;
};
export type AdminStatus = {
  /** State information */
  state?: "STATE_UNSPECIFIED" | "STATE_UP" | "STATE_DOWN";
};
export type VirtualMachineStatus = {
  /** Virtual machine state */
  state?:
    | "STATE_UNSPECIFIED"
    | "STATE_STOPPED"
    | "STATE_PROVISIONING"
    | "STATE_STARTING"
    | "STATE_RUNNING"
    | "STATE_PAUSED"
    | "STATE_STOPPING"
    | "STATE_TERMINATING"
    | "STATE_CRASH_LOOP_BACKOFF"
    | "STATE_MIGRATING"
    | "STATE_ERROR_UNSCHEDULABLE"
    | "STATE_ERROR_IMAGE_PULL"
    | "STATE_ERROR_IMAGE_PULL_BACKOFF"
    | "STATE_ERROR_PVC_NOT_FOUND"
    | "STATE_ERROR_DATA_VOLUME"
    | "STATE_WAITING_FOR_VOLUME_BINDING";
};
export type VirtualMachine = {
  adminStatus?: AdminStatus;
  status?: VirtualMachineStatus;
};
export type AppWorkload = {
  /** Workload UUID */
  id: string;
  /** Workload name */
  name: string;
  pod?: Pod;
  /** Application workload type, e.g. virtual machine and pod. */
  type?: "TYPE_UNSPECIFIED" | "TYPE_VIRTUAL_MACHINE" | "TYPE_POD";
  virtualMachine?: VirtualMachine;
};
export type AppWorkloadRead = {
  /** The time when the workload is created. */
  createTime?: string;
  /** Workload UUID */
  id: string;
  /** Workload name */
  name: string;
  /** Namespace where the workload is created. */
  namespace?: string;
  pod?: PodRead;
  /** Application workload type, e.g. virtual machine and pod. */
  type?: "TYPE_UNSPECIFIED" | "TYPE_VIRTUAL_MACHINE" | "TYPE_POD";
  virtualMachine?: VirtualMachine;
  /** Ready status to determines if a workload is fully functional or not. */
  workloadReady?: boolean;
};
export type ListAppWorkloadsResponse = {
  /** A list of virtual machines. */
  appWorkloads?: AppWorkload[];
};
export type ListAppWorkloadsResponseRead = {
  /** A list of virtual machines. */
  appWorkloads?: AppWorkloadRead[];
};
export type RestartVirtualMachineResponse = object;
export type StartVirtualMachineResponse = object;
export type StopVirtualMachineResponse = object;
export type GetVncResponse = {
  address: string;
};
export type DeletePodResponse = object;
export const {
  useEndpointsServiceListAppEndpointsQuery,
  useAppWorkloadServiceListAppWorkloadsQuery,
  useVirtualMachineServiceRestartVirtualMachineMutation,
  useVirtualMachineServiceStartVirtualMachineMutation,
  useVirtualMachineServiceStopVirtualMachineMutation,
  useVirtualMachineServiceGetVncQuery,
  usePodServiceDeletePodMutation,
} = injectedRtkApi;
