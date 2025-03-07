/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { eim } from "@orch-ui/apis";
import { ApiError, Flex, SquareSpinner } from "@orch-ui/components";
import { SharedStorage } from "@orch-ui/utils";
import { Text } from "@spark-design/react";
import "./TelemetryProfileLogs.scss";
export const dataCy = "telemetryProfileLogs";
export interface TelemetryProfileProps {
  region?: eim.RegionRead;
  site?: eim.SiteRead;
}
export const TelemetryProfileLogs = ({
  region,
  site,
}: TelemetryProfileProps) => {
  const cy = { "data-cy": dataCy };
  const args: eim.GetV1ProjectsByProjectNameTelemetryLoggroupsAndTelemetryLogsGroupIdLogprofilesApiArg =
    {
      telemetryLogsGroupId: "group-id", //TODO: evaluate
      projectName: SharedStorage.project?.name ?? "",
      ...(region
        ? { regionId: region.resourceId }
        : site
          ? { siteId: site.resourceId }
          : {}),
    };

  const {
    data: _logs,
    isError,
    isLoading,
    error,
  } = eim.useGetV1ProjectsByProjectNameTelemetryLoggroupsAndTelemetryLogsGroupIdLogprofilesQuery(
    args,
    {
      skip: Object.keys(args).length === 0,
    },
  );
  const logs = _logs ? _logs.TelemetryLogsProfiles : [];
  const className = "telemetry-profile-logs";

  const getJSX = () => {
    if (isError) return <ApiError error={error} />;
    if (isLoading) return <SquareSpinner />;
    return logs.length === 0 ? (
      <Text className={`${className}__empty`} data-cy="empty">
        No logs available.
      </Text>
    ) : (
      logs.map(({ logsGroup, logLevel }) => (
        <Flex cols={[2, 4]}>
          <div className={`${className}__source-label`}>Source:</div>
          <div
            className={`${className}__source-value`}
            title={logsGroup?.name}
            data-cy="source"
          >
            {logsGroup?.name}
          </div>
          <div className={`${className}__log-level-label`}>Log Level:</div>
          <div
            className={`${className}__log-level-value`}
            title={logLevel}
            data-cy="level"
          >
            {logLevel}
          </div>
        </Flex>
      ))
    );
  };

  return (
    <div {...cy} className={className}>
      <b className={`${className}__title`}>System Logs</b>
      {getJSX()}
    </div>
  );
};
