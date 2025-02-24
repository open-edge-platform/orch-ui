/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */
import { eim } from "@orch-ui/apis";
import {
  AggregatedStatuses,
  FieldLabels,
  Flex,
  Popover,
  StatusIcon,
} from "@orch-ui/components";
import {
  CONSTANTS,
  genericHostStatusMessages,
  HostGenericStatuses,
  hostStatusFields,
  hostToStatuses,
  statusIndicatorToIconStatus,
} from "@orch-ui/utils";
import { Text } from "@spark-design/react";
import { useMemo } from "react";

import "./HostStatusPopover.scss";
export const dataCy = "hostStatusPopover";
export interface HostStatusPopoverProps {
  data: eim.HostRead;
}

type FieldLabel = {
  label: string;
};

type HostGenericStatusKeys = keyof HostGenericStatuses;

// For rendering of statuses iteratively

export const HostStatusPopover = ({ data }: HostStatusPopoverProps) => {
  const cy = { "data-cy": dataCy };
  const statuses: HostGenericStatuses = useMemo(
    () => hostToStatuses(data, data.instance),
    [data, data.instance],
  );

  const renderStatus = (hostStatusFields: FieldLabels<HostGenericStatuses>) =>
    Object.entries(hostStatusFields).map(
      ([key, currentStatus]: [string, FieldLabel]) => {
        const typedKey = key as HostGenericStatusKeys;
        return (
          <Flex cols={[4, 8]}>
            <div data-cy={`label-${typedKey}`}>
              <Text>{currentStatus.label}</Text>
            </div>
            <div data-cy={`icon-${typedKey}`}>
              <StatusIcon
                status={statusIndicatorToIconStatus(
                  statuses[typedKey]?.indicator ??
                    "STATUS_INDICATION_UNSPECIFIED",
                )}
                text={statuses[typedKey]?.message ?? "Unknown"}
              />
            </div>
          </Flex>
        );
      },
    );

  const hostMessage = genericHostStatusMessages(data);
  return (
    <div {...cy} className="host-status-popover">
      <Popover
        title={hostMessage.title}
        content={
          <div className="status-popover">
            {hostMessage.subTitle && (
              <div className="subtitle">
                <Text>{hostMessage.subTitle}</Text>
              </div>
            )}
            {renderStatus(hostStatusFields)}
          </div>
        }
        placement="right"
      >
        <AggregatedStatuses<HostGenericStatuses>
          defaultStatusName="hostStatus"
          statuses={hostToStatuses(data, data.instance)}
          //if the host is evaluated to be idle and hostStatus message is not present
          defaultMessages={{ idle: CONSTANTS.HOST_STATUS.NOT_CONNECTED }}
        />
      </Popover>
    </div>
  );
};
