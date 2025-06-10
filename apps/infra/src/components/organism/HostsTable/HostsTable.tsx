/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { eim } from "@orch-ui/apis";
import {
  ApiError,
  columnDisplayNameToApiName,
  Empty,
  EmptyActionProps,
  Flex,
  Ribbon,
  SortDirection,
  Table,
  TableColumn,
} from "@orch-ui/components";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  API_INTERVAL,
  checkAuthAndRole,
  Direction,
  getOrder,
  Role,
  SharedStorage,
} from "@orch-ui/utils";
import { Button } from "@spark-design/react";
import { reset, setHosts } from "../../../store/configureHost";
import { showErrorMessageBanner, showSuccessMessageBanner } from "../../../store/utils";
import { HostTableColumn } from "../../../utils/HostTableColumns";
import HostsTableRowExpansionDetail from "../../atom/HostsTableRowExpansionDetail/HostsTableRowExpansionDetail";
import HostDetailsActions from "../hosts/HostDetailsActions/HostDetailsActions";
import { LifeCycleState } from "../../../store/hostFilterBuilder";
import "./HostsTable.scss";
import { useAppDispatch } from "src/store/hooks";

export const dataCy = "hostsTable";

export interface HostsTableProps {
  searchTerm?: string;
  /** columns to show from Host object */
  columns?: TableColumn<eim.HostRead>[];
  /** Lifecycle category */
  category?: LifeCycleState;
  /** API filters */
  filters?: Partial<eim.GetV1ProjectsByProjectNameComputeHostsApiArg> & {
    workloadMemberId?: string;
    byUuids?: string[];
    byHostIds?: string[];
  };
  hasWorkload?: boolean;
  /** hide only Deauthorized Hosts (default: false) */
  hideDeauthorized?: boolean;
  /** hide only Authorized Hosts (default: false) */
  hideAuthorized?: boolean;
  siteId?: string;
  actionsJsx?: JSX.Element;
  /** Miscellaneous configuration for search ribbon */
  searchConfig?: {
    hideSearch?: boolean;
    searchTooltipContent?: string;
  };
  /** expandable */
  expandable?: boolean;
  /** enable checkbox select feature on this table component */
  selectable?: boolean;
  /** initial selected rows */
  selectedHosts?: eim.HostRead[];
  /** manually skip polling */
  poll?: boolean;
  emptyActionProps?: EmptyActionProps[];
  hideSelectedItemBanner?: boolean;
  /** Invoked when a Host is selected */
  onHostSelect?: (selectedHost: eim.HostRead, isSelected: boolean) => void;
  /** Invoked when data is loaded */
  onDataLoad?: (data: eim.HostRead[]) => void;
  unsetSelectedHosts?: () => void;
  provisionHosts?: () => void;
  /** This will decide on what HostRead info basis is host is selected  */
  getSelectionId?: (row: eim.HostRead) => string;
  onSearch?: (term: string) => void;
}

const hostColumns: TableColumn<eim.HostRead>[] = [
  HostTableColumn.name("../"),
  HostTableColumn.status,
  HostTableColumn.serialNumber,
  HostTableColumn.os,
  HostTableColumn.siteWithCustomBasePath("../"),
  HostTableColumn.workload,
  HostTableColumn.actions((host: eim.HostRead) => (
    <HostDetailsActions host={host} />
  )),
];

const HostsTable = ({
  columns = hostColumns,
  category,
  filters,
  searchTerm,  
  poll,
  selectable,
  selectedHosts,
  expandable,
  actionsJsx,
  emptyActionProps,
  hideSelectedItemBanner,
  onDataLoad,
  onHostSelect,
  unsetSelectedHosts,
  getSelectionId = (row) => row.resourceId!,   
  onSearch,        
}: HostsTableProps) => {
  const cy = { "data-cy": dataCy };
  const defaultPageSize = {
    pageSize: 10,
  };

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [onboardHost] =
    eim.usePatchV1ProjectsByProjectNameComputeHostsAndHostIdOnboardMutation();

  const pageSize = parseInt(searchParams.get("pageSize") ?? "10");
  const offset = parseInt(searchParams.get("offset") ?? "0");
  const sortDirection = (searchParams.get("direction") as Direction) ?? "asc";
  const filter = filters?.filter;

  const { data, isSuccess, isError, isLoading, error } =
    eim.useGetV1ProjectsByProjectNameComputeHostsQuery(
      {
        projectName: SharedStorage.project?.name ?? "",
        ...defaultPageSize,
        offset,
        pageSize,
        orderBy: getOrder(searchParams.get("column") ?? "name", sortDirection),
        filter,
      },
      {
        ...(poll ? { pollingInterval: API_INTERVAL } : {}),
        skip: !SharedStorage.project?.name,
      },
    );

  useEffect(() => {
    if (onDataLoad && isSuccess && data) {
      onDataLoad(data.hosts);
    }
  }, [data, isSuccess]);

  const isEmptyError = () =>
    isSuccess && data.hosts.length === 0 && !searchTerm;

  const provisionHosts = () => {
    if (selectedHosts) {
      dispatch(reset());
      dispatch(setHosts({ hosts: selectedHosts }));
      navigate("../hosts/set-up-provisioning", { relative: "path" });
    }
  };

  const onOnboard = async () => {
    const failedHosts = new Set<string>();
    let firstErrorMessage: string | undefined = undefined;
    if (!selectedHosts) return;
    for (const host of selectedHosts) {
      await onboardHost({
        projectName: SharedStorage.project?.name ?? "",
        hostId: host.resourceId!,
      })
        .unwrap()
        .catch((e) => {
          failedHosts.add(host.name);
          if (firstErrorMessage === undefined) {
            firstErrorMessage = e.data?.message;
          }
        });
    }

    if (failedHosts.size > 0) {
      showErrorMessageBanner(
        dispatch,
        `Failed to onboard hosts ${[...failedHosts].join(", ")} !`,
      );
    } else {
      const successMessage =
        selectedHosts && selectedHosts?.length > 1
          ? "Hosts are now being onboarded."
          : "Host is now being onboarded.";
      showSuccessMessageBanner(dispatch, successMessage);
      unsetSelectedHosts && unsetSelectedHosts();
    }
  };

  const renderSelectedItemsBanner = () => {
    const hasWriteAccess = checkAuthAndRole([Role.INFRA_MANAGER_WRITE]);
    return selectedHosts?.length ? (
      <Flex
        dataCy="selectedHostsBanner"
        justify="end"
        cols={[4, 8]}
        className="selected-hosts-banner"
      >
        <div>{selectedHosts?.length} item selected</div>
        <div className="action-btns-container">
          <Button
            isDisabled={
              !hasWriteAccess || category === LifeCycleState.Onboarded
            }
            className="hosts-action-btn"
            data-cy="onboardBtn"
            onPress={() => {
              onOnboard();
            }}
          >
            Onboard
          </Button>
          <Button
            isDisabled={
              !hasWriteAccess || category === LifeCycleState.Registered
            }
            className="hosts-action-btn"
            data-cy="provisionBtn"
            onPress={() => {
              provisionHosts();
            }}
          >
            Provision
          </Button>
          <span className="btn-seperator">|</span>
          <Button
            onPress={() => unsetSelectedHosts && unsetSelectedHosts()}
            className="hosts-action-btn"
            data-cy="cancelBtn"
          >
            Cancel
          </Button>
        </div>
      </Flex>
    ) : null;
  };

  if (isError) {
    return <ApiError error={error} />;
  } else if (!data || isEmptyError()) {
    return (
      <div {...cy}>
        <Ribbon
          defaultValue={searchTerm}
          onSearchChange={onSearch}
          customButtons={actionsJsx}
        />
        <Empty
          title="No hosts are available here."
          icon="information-circle"
          actions={emptyActionProps}
        />
      </div>
    );
  }

  const selectedIds = selectedHosts?.map((host) => host.resourceId!);
  return (
    <div {...cy} className="hosts-table">
      {!hideSelectedItemBanner && renderSelectedItemsBanner()}
      <Table
        key={selectable ? "selectable" : "non-selectable"}
        columns={columns}
        data={data.hosts}
        canPaginate
        isServerSidePaginated
        totalOverallRowsCount={data.totalElements}
        onChangePage={(index: number) => {
          setSearchParams((prev) => {
            prev.set("offset", (index * pageSize).toString());
            return prev;
          });
        }}
        onChangePageSize={(pageSize: number) => {
          setSearchParams((prev) => {
            prev.set("pageSize", pageSize.toString());
            return prev;
          });
        }}
        sortColumns={[1]}
        initialSort={{
          column: "Name",
          direction: "asc",
        }}
        onSort={(column: string, direction: SortDirection) => {
          setSearchParams((prev) => {
            if (direction) {
              const apiName = columnDisplayNameToApiName(columns, column);
              if (apiName) {
                prev.set("column", apiName);
                prev.set("direction", direction);
              }
            } else {
              prev.delete("column");
              prev.delete("direction");
            }
            return prev;
          });
        }}
        canSearch={hideSelectedItemBanner || !selectedIds?.length}
        searchTerm={searchTerm}
        onSearch={onSearch}
        canSelectRows={selectable}
        onSelect={onHostSelect}
        getRowId={getSelectionId}
        selectedIds={selectedIds}
        canExpandRows={expandable}
        subRow={(row: { original: eim.HostRead }) => {
          const host = row.original;
          return <HostsTableRowExpansionDetail host={host} />;
        }}
        isLoading={isLoading}
        actionsJsx={actionsJsx}
      />
    </div>
  );
};

export default HostsTable;