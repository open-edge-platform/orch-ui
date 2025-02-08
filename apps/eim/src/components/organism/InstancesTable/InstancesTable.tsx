/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { eim, enhancedEimSlice } from "@orch-ui/apis";
import { OrchTable } from "@orch-ui/components";
import {
  API_INTERVAL,
  Direction,
  getFilter,
  getOrder,
  Operator,
  SharedStorage,
  SparkTableColumn,
} from "@orch-ui/utils";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import "./InstancesTable.scss";

export interface InstancesTableProps {
  updatedInstances?: enhancedEimSlice.InstanceReadModified[];
  filters?: eim.GetV1ProjectsByProjectNameComputeInstancesApiArg;
  filterByUuids?: string[];
  hideDeauthorized?: boolean;
  sort?: number[];
  hideRibbon?: boolean;
  selectable?: boolean;
  selectedRowsId?: {
    [key: number]: boolean;
  };
  selectedRows?: enhancedEimSlice.InstanceReadModified[];
  onSelected?: (row: any) => void;
  columns: SparkTableColumn<enhancedEimSlice.InstanceReadModified>[];
  getInitialRows?: (rows: enhancedEimSlice.InstanceReadModified[]) => void;
  dataCy?: string;
  /* whether to poll or not, defaults to true*/
  poll?: boolean;
}
const InstancesTable = ({
  updatedInstances,
  filters = { projectName: SharedStorage.project?.name ?? "" },
  hideDeauthorized = false,
  sort,
  hideRibbon,
  selectable = false,
  selectedRowsId,
  onSelected,
  getInitialRows,
  columns,
  dataCy,
  filterByUuids,
  poll = true,
}: InstancesTableProps) => {
  const [searchParams] = useSearchParams();
  const defaultPageSize = {
    pageSize: 10,
  };
  const [pollingInterval] = useState<number>(API_INTERVAL);
  const [apiFilters, setApiFilters] =
    useState<eim.GetV1ProjectsByProjectNameComputeInstancesApiArg>({
      projectName: SharedStorage.project?.name ?? "",
    });
  const [sortedInstance, setSortedInstance] = useState<
    enhancedEimSlice.InstanceReadModified[]
  >([]);

  useEffect(() => {
    // Filter settings
    let workloadExistanceFilter = "";
    if (filters.workloadMemberId === "notnull") {
      workloadExistanceFilter = "has(workloadMembers)";
    } else if (filters.workloadMemberId === "null") {
      workloadExistanceFilter = "NOT has(workloadMembers)";
    }

    let siteExistanceFilter = "";
    if (filters.siteId === "notnull") {
      siteExistanceFilter = "has(host.site)";
    } else if (filters.siteId === "null") {
      siteExistanceFilter = "NOT has(host.site)";
    } else if (filters.siteId) {
      siteExistanceFilter = `host.site.resourceId="${filters.siteId}"`;
    }

    let hideDeauthorizedFilter = "";
    if (hideDeauthorized)
      hideDeauthorizedFilter = "NOT host.desiredState=HOST_STATUS_INVALIDATED";

    const search = searchParams.get("searchTerm") ?? "";
    //TODO: Fix in util function to support array leaves
    let searchFilter = getFilter<
      Omit<eim.InstanceRead, "workloadMembers" | "host">
    >(
      //Instance search
      search,
      ["name", "resourceId"],
      Operator.OR,
      true,
    );
    searchFilter = searchFilter ? searchFilter : "";

    const filterQueries: string[] = [];
    if (workloadExistanceFilter) filterQueries.push(workloadExistanceFilter);
    if (siteExistanceFilter) filterQueries.push(siteExistanceFilter);
    if (searchFilter) filterQueries.push(`(${searchFilter})`);
    if (hideDeauthorizedFilter)
      filterQueries.push(`(${hideDeauthorizedFilter})`);
    // TODO: ADD FILTER BY UUID HERE

    const f: eim.GetV1ProjectsByProjectNameComputeInstancesApiArg = {
      projectName: SharedStorage.project?.name ?? "",
      ...{
        pageSize: searchParams.get("pageSize")
          ? parseInt(searchParams.get("pageSize")!)
          : defaultPageSize.pageSize,
        offset: searchParams.get("offset")
          ? parseInt(searchParams.get("offset")!)
          : 0,
        orderBy: getOrder(
          searchParams.get("column"),
          searchParams.get("direction") as Direction,
        ),
      },
      ...(filterQueries.length > 0
        ? { filter: `${filterQueries.join(` ${Operator.AND} `)}` }
        : {}),

      // If workload wildcard "null/notnull" is not applied, then take workloadId as searchId
      ...(!workloadExistanceFilter
        ? { workloadMemberId: filters.workloadMemberId }
        : {}),
    };
    setApiFilters(f);
  }, [filters, searchParams]);

  const {
    data: { instances, totalElements } = {},
    isSuccess,
    isError,
    isLoading,
    error,
  } = eim.useGetV1ProjectsByProjectNameComputeInstancesQuery(apiFilters, {
    pollingInterval: poll ? pollingInterval : undefined,
    // NOTE: we always set the pagination filter to 100, so wait for it before making the call
    skip: Object.keys(apiFilters).length === 0,
  });

  useEffect(() => {
    const sorted = instances
      ? instances
          .slice()
          .sort(
            (
              a: enhancedEimSlice.InstanceReadModified,
              b: enhancedEimSlice.InstanceReadModified,
            ) => {
              const ta = a.host?.name ?? a.host?.resourceId ?? "";
              const tb = b.host?.name ?? b.host?.resourceId ?? "";
              return ta > tb ? 1 : -1;
            },
          )
      : [];

    setSortedInstance(sorted as enhancedEimSlice.InstanceReadModified[]);
  }, [instances]);

  useEffect(() => {
    const newInstances: enhancedEimSlice.InstanceReadModified[] = [];

    if (filterByUuids) {
      instances?.filter((instance: enhancedEimSlice.InstanceReadModified) => {
        filterByUuids?.map((uuid) => {
          if (uuid == instance.host?.uuid) {
            newInstances.push(instance);
          }
        });
      });

      setSortedInstance(newInstances ? newInstances : []);
    }
  }, [instances, filterByUuids]);

  useEffect(() => {
    if (updatedInstances) {
      setSortedInstance(updatedInstances);
    }
  }, [updatedInstances]);

  useEffect(() => {
    if (getInitialRows && sortedInstance) {
      getInitialRows(sortedInstance);
    }
  }, [sortedInstance]);

  const isEmptyError = () =>
    isSuccess && (!sortedInstance || sortedInstance.length === 0);

  return (
    <div data-cy="instancesTable" className="instances-table">
      <OrchTable
        tableProps={{
          className: "iaas-instances-list",
          pageSize: filters.pageSize,
          columns: columns,
          data: sortedInstance,
          sort: sort,
          sortableColumnsApi: {
            Serial: "host.serialNumber",
            hostTwoUuid: "host.uuid",
            "Operating System": "os.name",
            Status: "host.hostStatus",
          },
          sortableColumnsInit: {
            "host.serialNumber": "Serial",
            "host.uuid": "UUID",
            "os.name": "Operating System",
            "host.hostStatus": "Status",
          },
          selectRow: selectable,
          selectedRowIds: selectedRowsId,
          onSelect: (row) => {
            if (row && onSelected) {
              onSelected(row);
            }
          },
          totalItem: totalElements,
        }}
        ribbonProps={
          !hideRibbon
            ? {
                searchTooltip: "Search hosts from the table below",
              }
            : undefined
        }
        key="hosts-table"
        isSuccess={isSuccess && sortedInstance && sortedInstance?.length != 0}
        isLoading={isLoading}
        isError={isError}
        error={error}
        isEmpty={isEmptyError()}
        emptyProps={{
          icon: "information-circle",
          subTitle: "No hosts are available here.",
        }}
        data-cy={dataCy}
      />
    </div>
  );
};

export default InstancesTable;
