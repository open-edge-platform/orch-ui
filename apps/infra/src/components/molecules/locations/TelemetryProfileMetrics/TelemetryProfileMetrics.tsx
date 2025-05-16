/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import { ApiError, Flex, SquareSpinner } from "@orch-ui/components";
import { SharedStorage } from "@orch-ui/utils";
import { Text } from "@spark-design/react";
import "./TelemetryProfileMetrics.scss";
const dataCy = "telemetryProfileMetrics";
export interface TelemetryProfileMetricsProps {
  region?: infra.RegionRead;
  site?: infra.SiteRead;
}
export const TelemetryProfileMetrics = ({
  region,
  site,
}: TelemetryProfileMetricsProps) => {
  const cy = { "data-cy": dataCy };
  const args: infra.GetV1ProjectsByProjectNameTelemetryMetricgroupsAndTelemetryMetricsGroupIdMetricprofilesApiArg =
    {
      telemetryMetricsGroupId: "group-id", //TODO: evaluate
      projectName: SharedStorage.project?.name ?? "",
      ...(region
        ? { regionId: region.resourceId }
        : site
          ? { siteId: site.resourceId }
          : {}),
    };

  const {
    data: _metrics,
    isError,
    isLoading,
    error,
  } = infra.useTelemetryMetricsProfileServiceListTelemetryMetricsProfilesQuery(
    args,
    {
      skip: Object.keys(args).length === 0,
    },
  );
  const metrics = _metrics ? _metrics.telemetryMetricsProfiles : [];
  const className = "telemetry-profile-metrics";

  const getJSX = () => {
    if (isError) return <ApiError error={error} />;
    if (isLoading) return <SquareSpinner />;
    return metrics.length === 0 ? (
      <Text className={`${className}__empty`} data-cy="empty">
        No metrics available.
      </Text>
    ) : (
      metrics.map(({ metricsGroup, metricsInterval }) => (
        <Flex cols={[2, 4]}>
          <div className={`${className}__metric-type-label`}>MetricType:</div>
          <div
            className={`${className}__metric-type-value`}
            title={metricsGroup?.name}
            data-cy="metricType"
          >
            {metricsGroup?.name}
          </div>
          <div className={`${className}__interval-label`}>Sample Interval:</div>
          <div className={`${className}__interval-value`} data-cy="interval">
            {metricsInterval} Min
          </div>
        </Flex>
      ))
    );
  };

  return (
    <div {...cy} className={className}>
      <b className={`${className}__title`}>System Metrics</b>
      {getJSX()}
    </div>
  );
};
