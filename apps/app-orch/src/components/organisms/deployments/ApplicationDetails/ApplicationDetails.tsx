/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { adm, arm } from "@orch-ui/apis";
import {
  Empty,
  Flex,
  Popup,
  PopupOption,
  SquareSpinner,
  Status,
  StatusIcon,
  Table,
  TableColumn,
} from "@orch-ui/components";
import {
  admStatusToUIStatus,
  API_INTERVAL,
  checkAuthAndRole,
  parseError,
  rfc3339ToDate,
  Role,
  SharedStorage,
} from "@orch-ui/utils";
import { FieldLabel, Icon, Text, Toast, Tooltip } from "@spark-design/react";
import { ToastState, ToastVisibility } from "@spark-design/tokens";
import countBy from "lodash/countBy";
import { useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { getToastProps, setProps } from "../../../../store/reducers/toast";
import { generateAppWorkloadStatus } from "../../../../utils/app-catalog";
import { printStatus } from "../../../../utils/global";
import ApplicationDetailsPodDetails from "../ApplicationDetailsPodDetails/ApplicationDetailsPodDetails";
import ApplicationDetailsServices from "../ApplicationDetailsServices/ApplicationDetailsServices";
import "./ApplicationDetails.scss";
// FIXME understand why if the file is imported in index.scss the styles are not available in the minified UI
import "@orch-ui/styles/transitions.scss";

const {
  useAppWorkloadServiceListAppWorkloadsQuery,
  usePodServiceDeletePodMutation,
  useVirtualMachineServiceRestartVirtualMachineMutation,
  useVirtualMachineServiceStartVirtualMachineMutation,
  useVirtualMachineServiceStopVirtualMachineMutation,
} = arm;

export const dataCy = "applicationDetails";

interface ApplicationDetailsProps {
  app: adm.AppRead;
  clusterId: string;
}

/**
 * ApplicationDetails is responsible to render a collapsible row that shows
 * the application status and, when expanded, the list of VMs associated
 * with this application
 */
const ApplicationDetails = ({ app, clusterId }: ApplicationDetailsProps) => {
  const toastProps = useAppSelector(getToastProps);
  const dispatch = useAppDispatch();

  const tableRef = useRef(null);
  const [expanded, setExpanded] = useState<boolean>(false);

  const [startVm] = useVirtualMachineServiceStartVirtualMachineMutation();
  const [restartVm] = useVirtualMachineServiceRestartVirtualMachineMutation();
  const [stopVm] = useVirtualMachineServiceStopVirtualMachineMutation();
  const [deletePod] = usePodServiceDeletePodMutation();

  const handleApiSuccess = (action: string, aw: arm.AppWorkload) => {
    dispatch(
      setProps({
        ...toastProps,
        state: ToastState.Success,
        message: `${aw.type === "TYPE_POD" ? "Pod" : "VM"} ${
          aw.id
        } ${action} successfully`,
        visibility: ToastVisibility.Show,
      }),
    );
  };

  const handleApiError = (action: string, aw: arm.AppWorkload, err: any) => {
    dispatch(
      setProps({
        ...toastProps,
        state: ToastState.Danger,
        title: `Error while ${action} ${
          aw.type === "TYPE_POD" ? "Pod" : "VM"
        } ${aw.id}`,
        message: parseError(err).data,
        visibility: ToastVisibility.Show,
      }),
    );
  };

  const calculateWorkloadCount = (appWorkloadsList: arm.AppWorkload[]) => {
    let vmCount = 0,
      podCount = 0;
    if (appWorkloadsList.length > 0) {
      const workloadCounts = countBy(
        appWorkloadsList,
        (appWorkload) => appWorkload.type,
      );
      vmCount = workloadCounts["TYPE_VIRTUAL_MACHINE"] ?? 0;
      podCount = workloadCounts["TYPE_POD"] ?? 0;
    }
    return (
      <Text data-cy="workloadValue">
        {`${vmCount} Virtual Machine(s), ${podCount} Pod(s)`}
      </Text>
    );
  };

  const getDropdownItems = (
    appWorkload: arm.AppWorkloadRead,
  ): PopupOption[] => {
    if (!app.id) {
      // NOTE this would most likely never happen as all apps have IDs
      throw new Error("app id not found");
    }

    const paramsVm = {
      clusterId: clusterId,
      appId: app.id,
      virtualMachineId: appWorkload.id,
      projectName: SharedStorage.project?.name ?? "",
    };

    const paramsPod = {
      clusterId: clusterId,
      namespace: appWorkload.namespace ?? "",
      podName: appWorkload.name,
      projectName: SharedStorage.project?.name ?? "",
    };

    if (appWorkload.type === "TYPE_POD") {
      return [
        {
          displayText: "Delete",
          disable: !checkAuthAndRole([Role.AO_WRITE]),
          onSelect: () => {
            deletePod(paramsPod)
              .unwrap()
              .then(() => handleApiSuccess("deleted", appWorkload))
              .catch((err: any) =>
                handleApiError("deleting", appWorkload, err),
              );
          },
        },
      ];
    } else {
      return [
        {
          displayText: "Start",
          disable: !checkAuthAndRole([Role.AO_WRITE]),
          onSelect: () => {
            startVm(paramsVm)
              .unwrap()
              .then(() => handleApiSuccess("started", appWorkload))
              .catch((err: any) =>
                handleApiError("starting", appWorkload, err),
              );
          },
        },
        {
          displayText: "Stop",
          disable: !checkAuthAndRole([Role.AO_WRITE]),
          onSelect: () => {
            stopVm(paramsVm)
              .unwrap()
              .then(() => handleApiSuccess("delete", appWorkload))
              .catch((err: any) =>
                handleApiError("deleting", appWorkload, err),
              );
          },
        },
        {
          displayText: "Restart",
          disable: !checkAuthAndRole([Role.AO_WRITE]),
          onSelect: () => {
            restartVm(paramsVm)
              .unwrap()
              .then(() => handleApiSuccess("restarted", appWorkload))
              .catch((err: any) =>
                handleApiError("restarting", appWorkload, err),
              );
          },
        },
        {
          displayText: "Console",
          disable: !checkAuthAndRole([Role.AO_WRITE]),
          onSelect: () =>
            window.open(
              `/applications/app/${app.id}/cluster/${clusterId}/vm/${appWorkload.id}/console`,
              `vm_${appWorkload.id}`,
            ),
        },
      ];
    }
  };

  const { data: appWorkloadData, isLoading: isAppWorkloadLoading } =
    useAppWorkloadServiceListAppWorkloadsQuery(
      {
        appId: app.id!,
        clusterId: clusterId,
        projectName: SharedStorage.project?.name ?? "",
      },
      {
        skip: !app.id || !SharedStorage.project?.name,
        pollingInterval: API_INTERVAL,
      },
    );

  /** appWorkloads is list of VMs */
  const appWorkloads = appWorkloadData?.appWorkloads ?? [];

  /** Columns for an App VM Workload */
  const appWorkloadColumns: TableColumn<arm.AppWorkloadRead>[] = [
    {
      Header: "Type",
      accessor: (row) => (row.type === "TYPE_POD" ? "Pod" : "Virtual Machine"),
    },
    {
      Header: "Process ID",
      accessor: (row) => row.id,
      Cell: (table: { row: { original: arm.AppWorkloadRead } }) => (
        <Tooltip content={table.row.original.id} placement="right">
          {table.row.original.name}
        </Tooltip>
      ),
    },
    {
      Header: "Created",
      accessor: (row) => rfc3339ToDate(row.createTime),
    },
    {
      Header: "Readiness",
      accessor: (row) => (
        <StatusIcon
          text={row.workloadReady ? "Ready" : "Not ready"}
          status={row.workloadReady ? Status.Ready : Status.Unknown}
        />
      ),
    },
    {
      Header: "Status",
      accessor: (row) => (
        <StatusIcon
          status={generateAppWorkloadStatus(row) as Status}
          text={printStatus(
            row.pod?.status?.state ||
              row.virtualMachine?.status?.state ||
              "Unknown",
          )}
        />
      ),
    },
  ];
  appWorkloadColumns.push({
    Header: "Actions",
    textAlign: "center",
    padding: "0",
    accessor: (row) => (
      <Popup options={getDropdownItems(row)} jsx={<Icon icon="ellipsis-v" />} />
    ),
  });

  if (!app.id) {
    // NOTE: this would most likely never happen as all apps have IDs
    throw new Error("app id not found");
  }

  let applicationWorkloadDetails;
  if (isAppWorkloadLoading) {
    applicationWorkloadDetails = <SquareSpinner />;
  } else if (appWorkloads.length === 0) {
    applicationWorkloadDetails = (
      <Empty
        title="No Workload found"
        subTitle={`No Virtual Machine or Pod are present in the system for ${app.name}`}
        dataCy="empty"
      />
    );
  } else {
    applicationWorkloadDetails = (
      <>
        {/** TODO: Make this another component: ApplicationWorkloadsTable */}
        <div
          data-cy="applicationDetailsWorkloads"
          className="application-details-workload-details"
        >
          <Text className="table-title">Workloads</Text>
          <Table
            dataCy="workloads"
            columns={appWorkloadColumns}
            data={appWorkloads}
            sortColumns={[1, 2, 3, 4, 5]}
            canExpandRows
            subRow={(row: { original: arm.AppWorkloadRead }) =>
              row.original.type === "TYPE_POD" ? (
                <>
                  <Text className="table-title">Container details</Text>
                  <ApplicationDetailsPodDetails
                    containers={row.original.pod?.containers}
                  />
                </>
              ) : (
                <Text>
                  Workload type is a Virtual Machine. Pod details is not
                  available.
                </Text>
              )
            }
          />
        </div>
        <ApplicationDetailsServices appId={app.id!} clusterId={clusterId} />
      </>
    );
  }

  const details = (
    <CSSTransition
      appear
      in={expanded}
      nodeRef={tableRef}
      classNames="slide-down"
      addEndListener={(done: () => void) => done}
    >
      <div ref={tableRef} className="slide-down">
        <div className="hr-gray"></div>
        {applicationWorkloadDetails}
      </div>
    </CSSTransition>
  );

  return (
    <div
      className="deployment-application-details"
      data-cy={dataCy}
      style={{ overflowY: expanded ? "auto" : "hidden" }}
    >
      <div
        className="deployment-application-details-row"
        data-cy="applicationDetailsTable"
      >
        <Flex cols={[2, 2, 2, 5, 1]}>
          <div className="deployment-application-details-row__item">
            <FieldLabel data-cy="nameLabel">Name</FieldLabel>
          </div>
          <div className="deployment-application-details-row__item">
            <FieldLabel data-cy="statusLabel">Status</FieldLabel>
          </div>
          <div className="deployment-application-details-row__item">
            <FieldLabel data-cy="namespaceLabel">Namespace</FieldLabel>
          </div>
          <div className="deployment-application-details-row__item">
            <FieldLabel data-cy="workloadLabel">Workload</FieldLabel>
          </div>
          <div />
        </Flex>

        <Flex cols={[2, 2, 2, 5, 1]}>
          <div className="deployment-application-details-row__item">
            <Text data-cy="nameValue">{app.name ?? app.id}</Text>
          </div>
          <div className="deployment-application-details-row__item">
            <StatusIcon
              status={admStatusToUIStatus(app.status)}
              text={printStatus(app.status?.state ?? "Unknown")}
            />
          </div>
          <div className="deployment-application-details-row__item">
            <Text data-cy="namespaceValue">
              {appWorkloads.length > 0 && appWorkloads[0].namespace
                ? appWorkloads[0].namespace
                : "-"}
            </Text>
          </div>
          <div className="deployment-application-details-row__item">
            {calculateWorkloadCount(appWorkloads)}
          </div>
          <Icon
            data-cy="expandToggle"
            className="expand-toggle"
            icon={expanded ? "chevron-up" : "chevron-down"}
            onClick={() => setExpanded((e) => !e)}
          />
        </Flex>
        {details}
      </div>

      {toastProps.visibility === ToastVisibility.Show && (
        <Toast
          {...toastProps}
          onHide={() =>
            setProps({ ...toastProps, visibility: ToastVisibility.Hide })
          }
        />
      )}
    </div>
  );
};

export default ApplicationDetails;
