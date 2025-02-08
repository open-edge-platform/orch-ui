/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { eim } from "@orch-ui/apis";
import {
  ApiError,
  columnDisplayNameToApiName,
  Empty,
  EmptyActionProps,
  SortDirection,
  Table,
  TableColumn,
} from "@orch-ui/components";
import {
  API_INTERVAL,
  Direction,
  getOrder,
  SharedStorage,
} from "@orch-ui/utils";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setSearchTerm } from "../../../store/hostFilterBuilder";
import { HostTableColumn } from "../../../utils/HostTableColumns";
import HostPopup from "../hosts/HostPopup/HostPopup";
import "./HostsTable.scss";
export const dataCy = "hostsTable";
interface HostsTableProps {
  /** API filters */
  filters?: eim.GetV1ProjectsByProjectNameComputeHostsApiArg & {
    workloadMemberId?: string | undefined;
  };
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
  selectedHostIds?: string[];
  /** manually skip polling */
  poll?: boolean;
  emptyActionProps?: EmptyActionProps[];
  /** Invoked when a Host is selected */
  onHostSelect?: (selectedHost: eim.HostRead, isSelected: boolean) => void;
  /** Invoked when data is loaded */
  onDataLoad?: (data: eim.HostRead[]) => void;
}

const columns: TableColumn<eim.HostRead>[] = [
  HostTableColumn.name("../"),
  HostTableColumn.status,
  HostTableColumn.serialNumber,
  HostTableColumn.os,
  HostTableColumn.siteWithCustomBasePath("../"),
  HostTableColumn.workload,
  HostTableColumn.actions((host: eim.HostRead) => (
    <HostPopup host={host} instance={host.instance} />
  )),
];
const HostsTable = ({
  poll,
  onDataLoad,
  selectable,
  selectedHostIds,
  expandable,
  actionsJsx,
  emptyActionProps,
  onHostSelect,
}: HostsTableProps) => {
  const cy = { "data-cy": dataCy };
  const defaultPageSize = {
    pageSize: 10,
  };

  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  // API configuration
  const pageSize = parseInt(searchParams.get("pageSize") ?? "10");
  const offset = parseInt(searchParams.get("offset") ?? "0");
  // const sortColumn =
  //   columnApiNameToDisplayName(columns, searchParams.get("column")) ?? "Name";
  const sortDirection = (searchParams.get("direction") as Direction) ?? "asc";
  const searchTerm = searchParams.get("searchTerm") ?? "";

  const { filter } = useAppSelector((state) => state.hostFilterBuilder);

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
        // Skip polling
        ...(poll ? { pollingInterval: API_INTERVAL } : {}),
        // Skip if `filters` component props are provided, but `filter` query param is not yet set in the above useEffect
        skip: !SharedStorage.project?.name,
      },
    );

  useEffect(() => {
    if (onDataLoad && isSuccess && data) {
      onDataLoad(data.hosts);
    }
  }, [data, isSuccess]);

  useEffect(() => {
    dispatch(setSearchTerm(searchTerm));
  }, [searchTerm]);

  const isEmptyError = () =>
    isSuccess && data.hosts.length === 0 && !searchTerm;

  if (isError) {
    return <ApiError error={error} />;
  } else if (!data || isEmptyError()) {
    return (
      <div {...cy} className="pa-1">
        <Empty
          title="No hosts are available here."
          icon="information-circle"
          actions={emptyActionProps}
        />
      </div>
    );
  }
  return (
    <div {...cy} className="hosts-table">
      <Table
        // Basic Table data
        columns={columns}
        data={data.hosts}
        // Pagination
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
        // Sorting
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
        // Searching
        canSearch={true}
        getRowId={(row) => row.resourceId!}
        searchTerm={searchTerm}
        onSearch={(searchTerm: string) => {
          setSearchParams((prev) => {
            // reset page offset before getting search result
            prev.set("offset", "0");
            //apply search
            if (searchTerm) prev.set("searchTerm", searchTerm);
            else prev.delete("searchTerm");
            return prev;
          });
          dispatch(setSearchTerm(searchTerm));
        }}
        // Checkbox Selection
        canSelectRows={selectable}
        onSelect={onHostSelect}
        selectedIds={selectedHostIds}
        canExpandRows={expandable}
        subRow={(row: { original: eim.HostRead }) => {
          const host = row.original;
          return (
            <div data-cy="hostDetails">
              <div>Host ID</div>
              <div>{host.name}</div>
            </div>
          );
        }}
        isLoading={isLoading}
        actionsJsx={actionsJsx}
      />
    </div>
  );
};

export default HostsTable;
