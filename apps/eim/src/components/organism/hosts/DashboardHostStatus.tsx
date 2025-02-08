/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { eim } from "@orch-ui/apis";
import { DashboardStatus, MetadataPairs } from "@orch-ui/components";
import { API_INTERVAL, Operator, SharedStorage } from "@orch-ui/utils";
//import "./Dashboard.scss";

const DashboardHostsStatus = ({
  metadata = {
    pairs: [],
  },
}: {
  metadata?: MetadataPairs;
}) => {
  const filterQueries = [
    "has(instance.workloadMembers)",
    "(NOT desiredState=HOST_STATE_UNTRUSTED)",
  ];

  if (metadata && metadata.pairs && metadata.pairs.length !== 0) {
    filterQueries.push(
      ...metadata.pairs.map(
        ({ key, value }) => `metadata='"key":"${key}","value":"${value}"'`,
      ),
    );
  }

  const {
    data: hostStat,
    isSuccess,
    isError,
    error,
    isLoading,
  } = eim.useGetV1ProjectsByProjectNameComputeHostsSummaryQuery(
    {
      projectName: SharedStorage.project?.name ?? "",
      filter: `${filterQueries.join(` ${Operator.AND} `)}`,
    },
    {
      pollingInterval: API_INTERVAL,
      selectFromResult: ({ data, error, isSuccess, isError, isLoading }) => ({
        data,
        error,
        isSuccess,
        isError,
        isLoading,
        isFetching: false, // Discard all fetching
      }),
    },
  );

  return (
    <div
      className="host-card dasbhoard-host-status"
      data-cy="dashboardHostStatus"
    >
      <DashboardStatus
        cardTitle="Host Status"
        total={hostStat?.total ?? 0}
        error={hostStat?.error ?? 0}
        running={hostStat?.running ?? 0}
        isSuccess={isSuccess}
        isLoading={isLoading}
        isError={isError}
        apiError={error}
        empty={{
          icon: "desktop",
          text: "There are no hosts",
        }}
      />
    </div>
  );
};

export default ({ metadata }: { metadata?: MetadataPairs }) => (
  <DashboardHostsStatus metadata={metadata} />
);
