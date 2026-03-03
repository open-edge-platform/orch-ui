/*
 * SPDX-FileCopyrightText: (C) 2026 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { rps } from "@orch-ui/apis";
import {
  ApiError,
  columnApiNameToDisplayName,
  ConfirmationDialog,
  Empty,
  Popup,
  PopupOption,
  RbacRibbonButton,
  SquareSpinner,
  Table,
  TableColumn,
} from "@orch-ui/components";
import {
  Direction,
  hasRole as hasRoleDefault,
  parseError,
  Role,
  SharedStorage,
} from "@orch-ui/utils";
import { Heading, Icon } from "@spark-design/react";
import { ButtonSize, ButtonVariant, ToastState } from "@spark-design/tokens";
import moment from "moment";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { showToast } from "../../../store/notifications";
import { CreateEditDomainProfile } from "../CreateEditDomainProfile/CreateEditDomainProfile";
import "./DomainProfileTable.scss";

const dataCy = "domainTable";

export type DomainProfileModalType = "create" | "edit" | "delete";

interface DomainProfileModalState {
  type?: DomainProfileModalType;
  forDomain?: rps.DomainResponse;
}

interface DomainProfileTableProps {
  hasRole?: (roles: string[]) => boolean;
}

const DomainProfileTable = ({
  hasRole = hasRoleDefault,
}: DomainProfileTableProps) => {
  const cy = { "data-cy": dataCy };

  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const [domainModalState, setDomainModalState] = useState<
    DomainProfileModalState | undefined
  >();

  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [domainToDelete, setDomainToDelete] = useState<
    rps.DomainResponse | undefined
  >();

  const onCloseDeleteConfirmation = () => {
    setDeleteConfirmationOpen(false);
    setDomainToDelete(undefined);
  };

  const onCloseModal = () => {
    setDomainModalState(undefined);
  };

  const [deleteDomain] = rps.useRemoveDomainMutation();

  const deleteDomainProfile = async (domain: rps.DomainResponse) => {
    try {
      await deleteDomain({
        projectName: SharedStorage.project?.name ?? "",
        profileName: domain.profileName,
      }).unwrap();
      dispatch(
        showToast({
          message: `Successfully deleted domain ${domain.profileName}.`,
          state: ToastState.Success,
        }),
      );
      onCloseDeleteConfirmation();
    } catch (error) {
      const errorObj = parseError(error);
      dispatch(
        showToast({
          message: errorObj.data,
          state: ToastState.Danger,
        }),
      );
    }
  };

  const getPopupOptions = (domain: rps.DomainResponse): PopupOption[] => [
    {
      displayText: "Edit",
      onSelect: () => {
        setDomainModalState({
          type: "edit",
          forDomain: domain,
        });
      },
    },
    {
      displayText: "Delete",
      onSelect: () => {
        setDomainToDelete(domain);
        setDeleteConfirmationOpen(true);
      },
    },
  ];

  const columns: TableColumn<rps.DomainResponse>[] = [
    {
      Header: "Name",
      accessor: (domain) => domain.profileName ?? "-",
    },
    {
      Header: "Suffix",
      accessor: (domain) => domain.domainSuffix ?? "-",
    },
    {
      Header: "Expiration Date",
      accessor: (domain) =>
        domain.expirationDate
          ? moment(domain.expirationDate).format("YYYY-MM-DD")
          : "N/A",
    },
    {
      Header: "Actions",
      textAlign: "center",
      accessor: (domain: rps.DomainResponse) => (
        <Popup
          options={getPopupOptions(domain)}
          jsx={<Icon icon="ellipsis-v" />}
        />
      ),
    },
  ];

  const sortColumn =
    columnApiNameToDisplayName(columns, searchParams.get("column")) ?? "Name";
  const sortDirection = (searchParams.get("direction") ?? "asc") as Direction;

  const { data, isSuccess, isLoading, isError, error } =
    rps.useGetAllDomainsQuery({
      projectName: SharedStorage.project?.name ?? "",
      $count: true,
    });

  // Since we pass $count: true, response is always CountDomainResponse
  const domainList = data as rps.CountDomainResponse;
  const domainData = domainList?.data ?? [];

  const getDomainTableComponent = () => {
    if (isError) {
      return <ApiError error={error} />;
    } else if (isLoading) {
      return <SquareSpinner />;
    } else if (isSuccess && domainData.length === 0) {
      return (
        <Empty
          title="No domain profiles available."
          icon="information-circle"
          actions={[
            {
              name: "Create Domain",
              disable: !hasRole([Role.PROJECT_WRITE]),
              action: () => {
                setDomainModalState({
                  type: "create",
                });
              },
            },
          ]}
        />
      );
    } else {
      return (
        <Table
          key={`domainTable-${domainData.length}`}
          dataCy="domainTableList"
          columns={columns}
          data={domainData}
          initialSort={{
            column: sortColumn,
            direction: sortDirection,
          }}
          sortColumns={[0]}
          canSearch
          actionsJsx={
            <RbacRibbonButton
              name="createDomainBtn"
              size={ButtonSize.Large}
              variant={ButtonVariant.Action}
              text="Create Domain"
              onPress={() =>
                setDomainModalState({
                  type: "create",
                })
              }
              disabled={!hasRole([Role.PROJECT_WRITE])}
              tooltip=""
              tooltipIcon="lock"
            />
          }
        />
      );
    }
  };

  return (
    <div {...cy} className="domain-table">
      <Heading semanticLevel={1} size="l" data-cy="projectsTitle">
        Manage Domains
      </Heading>
      {getDomainTableComponent()}

      {(domainModalState?.type === "create" ||
        domainModalState?.type === "edit") && (
        <CreateEditDomainProfile
          isOpen
          onClose={onCloseModal}
          editDomain={domainModalState.forDomain}
          onCreateEdit={() => {
            dispatch(
              showToast({
                message: `Successfully ${domainModalState.type === "edit" ? "updated" : "created"} domain`,
                state: ToastState.Success,
              }),
            );
            setDomainModalState(undefined);
          }}
          onError={(errorMessage) => {
            dispatch(
              showToast({
                message: `Error ${domainModalState.type === "edit" ? "updating" : "creating"} domain. ${errorMessage}`,
                state: ToastState.Danger,
              }),
            );
          }}
          isDimissable
        />
      )}

      {deleteConfirmationOpen && (
        <ConfirmationDialog
          content={`Are you sure you want to delete Domain "${
            domainToDelete?.profileName ?? ""
          }"?`}
          isOpen={true}
          confirmCb={() => deleteDomainProfile(domainToDelete!)}
          confirmBtnText="Delete"
          confirmBtnVariant={ButtonVariant.Alert}
          cancelCb={onCloseDeleteConfirmation}
        />
      )}
    </div>
  );
};

export default DomainProfileTable;
