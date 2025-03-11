/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { eim, enhancedEimSlice } from "@orch-ui/apis";
import { Flex } from "@orch-ui/components";
import {
  getTrustedComputeCompatibility,
  TrustedComputeCompatible,
} from "@orch-ui/utils";
import { Icon } from "@spark-design/react";
import { ScheduleMaintenanceStatusTag } from "../../molecules/ScheduleMaintenanceStatusTag/ScheduleMaintenanceStatusTag";
import { OsConfig } from "../OsConfig/OsConfig";
import "./HostsTableRowExpansionDetail.scss";
export const dataCy = "hostsTableRowExpansionDetail";
interface HostsTableRowExpansionDetailProps {
  host: eim.HostRead;
}
const HostsTableRowExpansionDetail = ({
  host,
}: HostsTableRowExpansionDetailProps) => {
  const className = "hosts-table-row-expansion-detail";
  const cy = { "data-cy": dataCy };
  const trustedComputeCompatible: TrustedComputeCompatible =
    getTrustedComputeCompatibility(host);
  return (
    <div {...cy} className={className}>
      <Flex cols={[6, 6]}>
        <Flex cols={[3, 9]}>
          <b className={`${className}__label`}>Host ID</b>
          <div className={`${className}__content`} data-cy="hostName">
            <span>{host.name}</span>
            <ScheduleMaintenanceStatusTag
              targetEntity={
                "HostRead" as enhancedEimSlice.ScheduleMaintenanceTargetEntity
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
          <b className={`${className}__label`}>Latest Updates</b>
          <div className={`${className}__content`}>
            <OsConfig instance={host.instance} iconOnly />
          </div>
          <b className={`${className}__label`}>Trusted Compute</b>
          <div className={`${className}__content`} data-cy="trustedCompute">
            {trustedComputeCompatible.text}
            <Icon
              className="tc-info-icon"
              data-cy="tc-info-icon"
              icon="information-circle"
              title={trustedComputeCompatible.tooltip}
            />
          </div>
        </Flex>
      </Flex>
    </div>
  );
};

export default HostsTableRowExpansionDetail;
