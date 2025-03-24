/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { eim } from "@orch-ui/apis";
import {
  CounterWheel,
  MetadataPairs,
  SquareSpinner,
} from "@orch-ui/components";
import { API_INTERVAL, SharedStorage } from "@orch-ui/utils";
import { MessageBanner } from "@spark-design/react";
import { useMemo } from "react";
import { Provider } from "react-redux";
import { store } from "../../../store/store";
import "./Dashboard.scss";

const DashboardUnallocatedHostsWheel = ({
  metadata = {
    pairs: [],
  },
}: {
  metadata?: MetadataPairs;
}) => {
  const { data, isSuccess, isLoading, isError } =
    eim.useGetV1ProjectsByProjectNameComputeHostsQuery(
      {
        projectName: SharedStorage.project?.name ?? "",
        // If metadata exists then add call `host API` with optional metadata filter
        ...(metadata && metadata.pairs && metadata.pairs.length !== 0
          ? {
              metadata: metadata.pairs.map(
                ({ key, value }) => `${key}=${value}`,
              ),
            }
          : {}),
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

  let count = 0; // By default count is set to 0

  // This part is only calculater when data is changed
  const calculateCount = useMemo(
    () =>
      data && data.hosts
        ? data?.hosts.reduce((prevCount, host) => {
            if (!host.site || host.site === undefined) {
              /* Check if Deploying, Upgrading, Terminating & Unknown in running */
              prevCount++;
            }
            return prevCount;
          }, 0)
        : 0,
    [data?.hosts],
  );

  // If data is countable
  // i.e., If API data is loaded on isSuccess when data is not fetching (in RTK) and errorStatus is not 404 (empty list)
  // calculate new count
  if (
    data?.hosts &&
    /* There seems to be a moment in RTK where isSuccess is true with error.status=400 when Fetching is false, hence statusCode!=404 */
    isSuccess
  ) {
    count = calculateCount;
  }

  return (
    <div
      className="host-card parent-height"
      data-cy="dashboardUnallocatedHosts"
    >
      {isSuccess && (
        <CounterWheel
          counterTitle="Unconfigured Hosts"
          count={count}
          total={(data?.hosts ?? []).length}
          emptyText="No unconfigured hosts"
          emptyIcon="pie-chart"
        />
      )}
      {isError && (
        <div className="dashboard-box">
          <MessageBanner
            messageTitle="Error"
            messageBody="Unable to get Hosts stat data"
            variant="error"
            showIcon
            outlined
          />
        </div>
      )}
      {isLoading && (
        <div className="dashboard-box">
          <SquareSpinner />
        </div>
      )}
    </div>
  );
};

export default ({ metadata }: { metadata?: MetadataPairs }) => (
  <Provider store={store}>
    <DashboardUnallocatedHostsWheel metadata={metadata} />
  </Provider>
);
