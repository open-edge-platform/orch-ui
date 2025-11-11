/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { enhancedInfraSlice, infra } from "@orch-ui/apis";
import { Flex, TrustedCompute } from "@orch-ui/components";
import {
  formatOsUpdateAvailable,
  getTrustedComputeCompatibility,
} from "@orch-ui/utils";
import { ScheduleMaintenanceStatusTag } from "../../molecules/ScheduleMaintenanceStatusTag/ScheduleMaintenanceStatusTag";
import "./HostsTableRowExpansionDetail.scss";
const dataCy = "hostsTableRowExpansionDetail";
interface HostsTableRowExpansionDetailProps {
  host: infra.HostResourceRead;
}
const HostsTableRowExpansionDetail = ({
  host,
}: HostsTableRowExpansionDetailProps) => {
  const className = "hosts-table-row-expansion-detail";
  const cy = { "data-cy": dataCy };

  return (
    <div {...cy} className={className}>
      <Flex cols={[6, 6]}>
        <Flex cols={[3, 9]}>
          <b className={`${className}__label`}>Host ID</b>
          <div className={`${className}__content`} data-cy="hostName">
            <span>{host.name}</span>
            <ScheduleMaintenanceStatusTag
              targetEntity={
                "HostRead" as enhancedInfraSlice.ScheduleMaintenanceTargetEntity
              }
              targetEntityType="host"
            />
          </div>
          <b className={`${className}__label`}>UUID</b>
          <div className={`${className}__content`} data-cy="uuid">
            {host.uuid}
          </div>
          <b className={`${className}__label`}>Processor</b>
          <div className={`${className}__content`} data-cy="cpuModel">
            {host.cpuModel}
          </div>
        </Flex>
        <Flex cols={[3, 9]}>
          <b className={`${className}__label`}>Available Update</b>
          <div className={`${className}__content`} data-cy="osUpdate">
            {(formatOsUpdateAvailable(
              host.instance?.osUpdateAvailable,
              "string",
            ) as string) || <em>(No Update)</em>}
          </div>
          <b className={`${className}__label`}>Trusted Compute</b>
          <div className={`${className}__content`} data-cy="trustedCompute">
            <TrustedCompute
              trustedComputeCompatible={getTrustedComputeCompatibility(host)}
            ></TrustedCompute>
          </div>
        </Flex>
      </Flex>
    </div>
  );
};

export default HostsTableRowExpansionDetail;
