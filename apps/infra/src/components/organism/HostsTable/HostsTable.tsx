/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
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
import { useSearchParams } from "react-router-dom";

import {
  API_INTERVAL,
  checkAuthAndRole,
  Direction,
  getOrder,
  hostProvisioningRoute,
  Role,
  SharedStorage,
  useInfraNavigate,
} from "@orch-ui/utils";
import { Button } from "@spark-design/react";
import { useEffect } from "react";
import { reset, setHosts } from "../../../store/configureHost";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  LifeCycleState,
  setHasWorkload,
  setLifeCycleState,
  setSearchTerm,
  setSiteId,
  setWorkloadMemberId,
} from "../../../store/hostFilterBuilder";
import {
  showErrorMessageBanner,
  showSuccessMessageBanner,
} from "../../../store/utils";
import { HostTableColumn } from "../../../utils/HostTableColumns";
import HostsTableRowExpansionDetail from "../../atom/HostsTableRowExpansionDetail/HostsTableRowExpansionDetail";
import HostDetailsActions from "../hosts/HostDetailsActions/HostDetailsActions";
import "./HostsTable.scss";
export const dataCy = "hostsTable";
export interface HostsTableProps {
  /** columns to show from Host object */
  columns?: TableColumn<infra.HostRead>[];
  /** Lifecycle category */
  category?: LifeCycleState;
  /** API filters */
  filters?: infra.GetV1ProjectsByProjectNameComputeHostsApiArg & {
    workloadMemberId?: string | undefined;
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
  selectedHosts?: infra.HostRead[];
  /** manually skip polling */
  poll?: boolean;
  emptyActionProps?: EmptyActionProps[];
  hideSelectedItemBanner?: boolean;
  /** Invoked when a Host is selected */
  onHostSelect?: (selectedHost: infra.HostRead, isSelected: boolean) => void;
  /** Invoked when data is loaded */
  onDataLoad?: (data: infra.HostRead[]) => void;
  unsetSelectedHosts?: () => void;
  provisionHosts?: () => void;
  /** This will decide on what HostRead info basis is host is selected  */
  getSelectionId?: (row: infra.HostRead) => string;
}

const hostColumns: TableColumn<infra.HostRead>[] = [
  HostTableColumn.name(),
  HostTableColumn.status,
  HostTableColumn.serialNumber,
  HostTableColumn.os,
  HostTableColumn.siteWithCustomBasePath("../"),
  HostTableColumn.workload,
  HostTableColumn.actions((host: infra.HostRead) => (
    <HostDetailsActions host={host} />
  )),
];
const HostsTable = ({
  columns = hostColumns,
  category,
  filters,
  hasWorkload,
  poll,
  siteId,
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
}: HostsTableProps) => {
  const cy = { "data-cy": dataCy };

  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const navigate = useInfraNavigate();

  const [onboardHost] =
    infra.usePatchV1ProjectsByProjectNameComputeHostsAndHostIdOnboardMutation();

  // API configuration
  const pageSize = parseInt(searchParams.get("pageSize") ?? "10");
  const offset = parseInt(searchParams.get("offset") ?? "0");

  // const sortColumn =
  //   columnApiNameToDisplayName(columns, searchParams.get("column")) ?? "Name";
  const sortDirection = (searchParams.get("direction") as Direction) ?? "asc";
  const searchTerm = searchParams.get("searchTerm") ?? "";

  const { filter, lifeCycleState } = useAppSelector(
    (state) => state.hostFilterBuilder,
  );

  useEffect(() => {
    dispatch(setSiteId(siteId));
  }, [siteId]);

  useEffect(() => {
    if (category) {
      dispatch(setLifeCycleState(category));
    }
  }, [category]);

  useEffect(() => {
    dispatch(setHasWorkload(hasWorkload));
  }, [hasWorkload]);

  useEffect(() => {
    dispatch(setWorkloadMemberId(filters?.workloadMemberId));
    /* Add more dispatch if you have more filters here ... */
  }, [filter]);

  const { data, isSuccess, isError, isLoading, error } =
    infra.useGetV1ProjectsByProjectNameComputeHostsQuery(
      {
        projectName: SharedStorage.project?.name ?? "",
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

  const onSearchChange = (searchTerm: string) => {
    setSearchParams((prev) => {
      const previousSearchTerm = prev.get("searchTerm");

      if (!previousSearchTerm && !searchTerm) return prev;

      // reset page offset before getting search result
      prev.set("offset", "0");
      //apply search
      if (searchTerm) prev.set("searchTerm", searchTerm);
      else prev.delete("searchTerm");
      return prev;
    });
    dispatch(setSearchTerm(searchTerm));
  };

  useEffect(() => {
    // clear selections when tab changes
    if (selectedHosts?.length && unsetSelectedHosts) {
      unsetSelectedHosts();
    }
  }, [lifeCycleState]);

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

  const provisionHosts = () => {
    if (selectedHosts) {
      // reset the HostConfig form
      dispatch(reset());
      // store the current Host in Redux, so we don't have to fetch it again
      dispatch(setHosts({ hosts: selectedHosts }));
      navigate(hostProvisioningRoute);
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
              !hasWriteAccess || lifeCycleState === LifeCycleState.Onboarded
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
              !hasWriteAccess || lifeCycleState === LifeCycleState.Registered
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
          onSearchChange={onSearchChange}
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
        // Basic Table data
        key={selectable ? "selectable" : "non-selectable"}
        columns={columns}
        data={data.hosts}
        // Pagination
        canPaginate
        isServerSidePaginated
        totalOverallRowsCount={data.totalElements}
        initialState={{ pageSize, pageIndex: Math.floor(offset / pageSize) }}
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
        canSearch={hideSelectedItemBanner || !selectedIds?.length} // If selctedItems banner is shown, hiding the search
        searchTerm={searchTerm}
        onSearch={onSearchChange}
        // Checkbox Selection
        canSelectRows={selectable}
        onSelect={onHostSelect}
        getRowId={getSelectionId}
        selectedIds={selectedIds}
        canExpandRows={expandable}
        subRow={(row: { original: infra.HostRead }) => {
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
