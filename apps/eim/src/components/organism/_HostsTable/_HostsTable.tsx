/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { eim } from "@orch-ui/apis";
import {
  ApiError,
  columnApiNameToDisplayName,
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
  getFilter,
  getOrder,
  Operator,
  SharedStorage,
} from "@orch-ui/utils";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./_HostsTable.scss";

export const dataCy = "hostsTable";

export enum HostCategory {
  Active,
  Configured,
  Onboarded,
  Registered,
  Deauthorized,
  All,
}

const getHostState = (category: string, checkBottomUp: boolean = false) =>
  `(desiredState=HOST_STATE_${category}${checkBottomUp ? ` OR currentState=HOST_STATE_${category})` : ")"}`;
const getInstanceState = (category: string) =>
  `(instance.desiredState=INSTANCE_STATE_${category} OR instance.currentState=INSTANCE_STATE_${category})`;
const getWorkLoadMembers = () => "has(instance.workloadMembers)";

const query = new Map<HostCategory, string>();
query.set(
  HostCategory.Active,
  // If the (host is onboarded OR currently in error state) AND (has running instance OR instance currently in error) AND (has a site) AND (has an associated workload).
  `(${getHostState("ONBOARDED", true)} OR currentState=HOST_STATE_ERROR) AND (${getInstanceState("RUNNING")} OR instance.currentState=INSTANCE_STATE_ERROR) AND has(site) AND ${getWorkLoadMembers()}`,
);
query.set(
  HostCategory.Configured,
  // If the (host is onboarded OR currently in error state) AND (has running instance OR instance currently in error) AND (has a site) AND (has no associated workload).
  `(${getHostState("ONBOARDED", true)} OR currentState=HOST_STATE_ERROR) AND (${getInstanceState("RUNNING")} OR instance.currentState=INSTANCE_STATE_ERROR) AND has(site) AND NOT ${getWorkLoadMembers()}`,
);
query.set(
  HostCategory.Onboarded,
  // If the (host is onboarded OR (currently in error state but not registered)) AND (has no site OR has no instance OR (not to have instance desired state of running)). NOTE: desired instance state cannot be INSTANCE_STATE_UNSPECIFIED.
  `(${getHostState("ONBOARDED", true)} OR (currentState=HOST_STATE_ERROR AND NOT desiredState=HOST_STATE_REGISTERED)) AND (NOT has(site) OR NOT has(instance) OR NOT instance.desiredState=INSTANCE_STATE_RUNNING)`,
);
query.set(
  HostCategory.Registered,
  `${getHostState("REGISTERED")} OR (${getHostState("ONBOARDED")} AND currentState=HOST_STATE_UNSPECIFIED)`,
);
query.set(HostCategory.Deauthorized, `${getHostState("UNTRUSTED")}`);

export interface _HostsTableProps {
  /** columns to show from Host object */
  columns: TableColumn<eim.HostRead>[];
  /** sort columns order */
  sort?: number[];
  /** API filters */
  filters?: eim.GetV1ProjectsByProjectNameComputeHostsApiArg & {
    workloadMemberId?: string | undefined;
  };
  /** hide only Deauthorized Hosts (default: false) */
  hideDeauthorized?: boolean;
  /** hide only Authorized Hosts (default: false) */
  hideAuthorized?: boolean;
  siteId?: string;
  /** Miscellaneous configuration for search ribbon */
  searchConfig?: {
    hideSearch?: boolean;
    searchTooltipContent?: string;
  };
  /** enable checkbox select feature on this table component */
  selectable?: boolean;
  /** initial selected rows */
  selectedHostIds?: string[];
  /** manually skip polling */
  poll?: boolean;
  actionsJsx?: JSX.Element;
  category?: HostCategory;
  emptyActionProps?: EmptyActionProps[];
  /** Invoked when a Host is selected */
  onHostSelect?: (selectedHost: eim.HostRead, isSelected: boolean) => void;
  /** Invoked when data is loaded */
  onDataLoad?: (data: eim.HostRead[]) => void;
}

const _HostsTable = ({
  columns,
  sort,
  siteId,
  searchConfig,
  selectable,
  selectedHostIds,
  poll,
  actionsJsx,
  category = HostCategory.Active,
  emptyActionProps,
  onHostSelect,
  onDataLoad,
}: _HostsTableProps) => {
  const cy = { "data-cy": dataCy };
  const defaultPageSize = {
    pageSize: 10,
  };

  const [searchParams, setSearchParams] = useSearchParams();

  /* server-side filter query param string */
  const [filter, setSearchFilters] = useState<string | undefined>();

  // API configuration
  const pageSize = parseInt(searchParams.get("pageSize") ?? "10");
  const offset = parseInt(searchParams.get("offset") ?? "0");
  const sortColumn =
    columnApiNameToDisplayName(columns, searchParams.get("column")) ?? "Name";
  const sortDirection = (searchParams.get("direction") as Direction) ?? "asc";
  const searchTerm = searchParams.get("searchTerm") ?? "";
  useEffect(() => {
    /** Table search filter for server-side data response filtering */
    let searchFilter = getFilter<Omit<eim.HostRead, "instance" | "site">>(
      searchTerm,
      ["name", "uuid", "serialNumber", "resourceId", "note"],
      Operator.OR,
      true,
    );
    if (searchTerm) {
      searchFilter = [
        searchFilter,
        ["site.name", "instance.desiredOs.name"]
          .map((labelKey: string) => `${labelKey}="${searchTerm}"`)
          .join(` ${Operator.OR} `),
      ].join(` ${Operator.OR} `);
    }

    //Include all filters in query params
    const filterQueries: string[] = [];
    if (searchFilter) filterQueries.push(`(${searchFilter})`);
    if (siteId) filterQueries.push(`site.resourceId="${siteId}"`);
    const currentCategoryFilter = query.get(category);
    if (currentCategoryFilter) {
      filterQueries.push(currentCategoryFilter);
    }

    if (filterQueries.length > 0) {
      setSearchFilters(`${filterQueries.join(` ${Operator.AND} `)}`);
    } else setSearchFilters(undefined);
  }, [searchTerm]);

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
        skip: !filter || !SharedStorage.project?.name,
      },
    );

  useEffect(() => {
    if (onDataLoad && isSuccess && data) {
      onDataLoad(data.hosts);
    }
  }, [data, isSuccess]);

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
        sortColumns={sort}
        initialSort={
          sort
            ? {
                column: sortColumn,
                direction: sortDirection,
              }
            : undefined
        }
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
        canSearch={!searchConfig?.hideSearch}
        getRowId={(row) => row.resourceId!}
        searchTerm={searchTerm}
        searchTooltip={searchConfig?.searchTooltipContent}
        onSearch={(searchTerm: string) => {
          setSearchParams((prev) => {
            // reset page offset before getting search result
            prev.set("offset", "0");
            //apply search
            if (searchTerm) prev.set("searchTerm", searchTerm);
            else prev.delete("searchTerm");
            return prev;
          });
        }}
        // Checkbox Selection
        canSelectRows={selectable}
        selectedIds={selectedHostIds}
        onSelect={onHostSelect}
        isLoading={isLoading}
        // Ribbon buttons
        actionsJsx={actionsJsx}
      />
    </div>
  );
};

export default _HostsTable;
