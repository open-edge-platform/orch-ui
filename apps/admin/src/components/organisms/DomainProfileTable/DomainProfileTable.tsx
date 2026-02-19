/*
 * SPDX-FileCopyrightText: (C) 2026 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ApiError,
  columnApiNameToDisplayName,
  Empty,
  RbacRibbonButton,
  SortDirection,
  SquareSpinner,
  Table,
  TableColumn,
} from "@orch-ui/components";
import { API_INTERVAL, hasRole as hasRoleDefault, Role } from "@orch-ui/utils";
import { Button, Icon } from "@spark-design/react";
import {
  ButtonSize,
  ButtonVariant,
  MessageBannerAlertState,
} from "@spark-design/tokens";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { showMessageNotification } from "../../../store/notifications";
import { CreateEditDomainProfile } from "../CreateEditDomainProfile/CreateEditDomainProfile";
import "./DomainProfileTable.scss";

const dataCy = "domainTable";

export type DomainProfileModalType = "create" | "edit" | "delete";

export interface DomainProfileConfig {
  id: string;
  domainName: string;
  domainSuffix: string;
  certificateFileName?: string;
  status: "active" | "pending" | "error";
  createdAt: string;
}

interface DomainProfileModalState {
  type?: DomainProfileModalType;
  forDomain?: DomainProfileConfig;
}

interface DomainProfileTableProps {
  hasRole?: (roles: string[]) => boolean;
}

const DomainProfileTable = ({
  hasRole = hasRoleDefault,
}: DomainProfileTableProps) => {
  const cy = { "data-cy": dataCy };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const [domainModalState, setDomainModalState] = useState<
    DomainProfileModalState | undefined
  >();

  const [pollingInterval] = useState<number>(API_INTERVAL);

  const onCloseModal = () => {
    setDomainModalState(undefined);
    // Note: When using real API with polling, the table will automatically
    // update with new data. Manual refresh not needed.
  };

  // Mock data - Replace with actual API call
  const mockDomains: DomainProfileConfig[] = [
    {
      id: "1",
      domainName: "example",
      domainSuffix: "example.com",
      certificateFileName: "cert.pem",
      status: "active",
      createdAt: "2026-02-15",
    },
  ];

  const columns: TableColumn<DomainProfileConfig>[] = [
    {
      Header: "Domain Name",
      accessor: (domain) => domain.domainName ?? "-",
    },
    {
      Header: "Domain Suffix",
      accessor: (domain) => domain.domainSuffix ?? "-",
    },
    {
      Header: "Certificate",
      accessor: (domain) => domain.certificateFileName ?? "Not provided",
    },
    {
      Header: "Actions",
      accessor: (item: DomainProfileConfig) => (
        <Button
          iconOnly
          variant="ghost"
          size="m"
          onPress={() => {
            setDomainModalState({
              type: "edit",
              forDomain: item,
            });
          }}
          data-cy="editDomainBtn"
        >
          <Icon artworkStyle="light" icon="edit" altText="Edit" />
        </Button>
      ),
    },
  ];

  const sortColumn =
    columnApiNameToDisplayName(columns, searchParams.get("column")) ??
    "Domain Name";
  const sortDirection = (searchParams.get("direction") ??
    "asc") as SortDirection;
  const searchTerm = searchParams.get("searchTerm") ?? undefined;

  // Mock API states - Replace with actual API
  const isSuccess = true;
  const isError = false;
  const isLoading = false;
  const error = undefined;

  const data = {
    domains: mockDomains,
    totalElements: mockDomains?.length ?? 0,
  };

  const getDomainTableComponent = () => {
    if (
      !hasRole([
        Role.PROJECT_READ,
        Role.PROJECT_WRITE,
        Role.PROJECT_UPDATE,
        Role.PROJECT_DELETE,
      ])
    ) {
      return;
    }

    if (isError) {
      return <ApiError error={error} />;
    } else if (isLoading) {
      return <SquareSpinner />;
    } else if (isSuccess && data.totalElements === 0) {
      return (
        <Empty
          title="No domain configurations available."
          icon="information-circle"
          actions={[
            {
              name: "Create Domain Configuration",
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
          key="domainTable"
          dataCy="domainTableList"
          columns={columns}
          data={data.domains}
          initialSort={{
            column: sortColumn,
            direction: sortDirection,
          }}
          sortColumns={[0]}
          canSearch
          searchTerm={searchTerm}
          onSearch={() => {
            /* TODO: search actions */
          }}
          actionsJsx={
            <RbacRibbonButton
              name="createDomainBtn"
              size={ButtonSize.Large}
              variant={ButtonVariant.Action}
              text="Create Domain Configuration"
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
      {getDomainTableComponent()}

      {(domainModalState?.type === "create" ||
        domainModalState?.type === "edit") && (
        <CreateEditDomainProfile
          isOpen
          onClose={onCloseModal}
          editDomain={domainModalState.forDomain}
          onCreateEdit={(domainName) => {
            dispatch(
              showMessageNotification({
                messageTitle: "Success",
                messageBody: `Successfully ${domainModalState.type === "edit" ? "updated" : "created"} domain configuration`,
                variant: MessageBannerAlertState.Success,
              }),
            );
            setDomainModalState(undefined);
          }}
          onError={(errorMessage) => {
            dispatch(
              showMessageNotification({
                messageTitle: "Error",
                messageBody: `Error ${domainModalState.type === "edit" ? "updating" : "creating"} domain configuration. ${errorMessage}`,
                variant: MessageBannerAlertState.Error,
              }),
            );
          }}
          isDimissable
        />
      )}
    </div>
  );
};

export default DomainProfileTable;
