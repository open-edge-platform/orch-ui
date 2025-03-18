/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
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
  getCustomStatusOnIdleAggregation,
  getPopOverTitles,
  HostGenericStatuses,
  hostStatusFields,
  hostToStatuses,
  statusIndicatorToIconStatus,
} from "@orch-ui/utils";
import { Text } from "@spark-design/react";
import { useMemo } from "react";
import "./HostStatusPopover.scss";

const dataCy = "hostStatusPopover";
export interface HostStatusPopoverProps {
  data: eim.HostRead;
}

type FieldLabel = {
  label: string;
};

type HostGenericStatusKeys = keyof HostGenericStatuses;

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
          <Flex cols={[4, 8]} key={typedKey}>
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

  const hostPopoverTitle = getPopOverTitles(data);
  return (
    <div {...cy} className="host-status-popover">
      <Popover
        title={hostPopoverTitle.title}
        content={
          <div className="status-popover">
            {hostPopoverTitle.subTitle && (
              <div className="subtitle">
                <Text>{hostPopoverTitle.subTitle}</Text>
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
          customAggregationStatus={{
            idle: () => getCustomStatusOnIdleAggregation(data),
          }}
        />
      </Popover>
    </div>
  );
};
