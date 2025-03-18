/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { Icon, Text } from "@spark-design/react";
import { TextSize } from "@spark-design/tokens";
import { HTMLProps } from "react";
import "./StatusIcon.scss";

const dataCy = "statusIcon";

export enum Status {
  Ready = "ready",
  NotReady = "not-ready",
  Error = "error",
  Unknown = "unknown",
}

interface StatusIconProps extends Omit<HTMLProps<HTMLSpanElement>, "size"> {
  status: Status;
  count?: {
    n: number;
    of: number;
  };
  text?: string;
  size?: TextSize;
  showCount?: boolean;
}

export const StatusIcon = ({
  status,
  count,
  text,
  size = TextSize.Medium,
  showCount = true,
  ...rest
}: StatusIconProps) => {
  const cy = { "data-cy": dataCy };
  const label = (
    <>
      {text && <Text size={size}>{text}</Text>}
      {showCount && count && (
        <Text size={size}>
          ({count.n}/{count.of})
        </Text>
      )}
    </>
  );

  return status == Status.NotReady ? (
    <span {...cy}>
      <Icon
        icon="spinner-three-quarters-half"
        className="status-icon-animated"
        isAnimated
      />
      {label}
    </span>
  ) : (
    <span {...cy} className="status-icon" {...rest}>
      <span className={`icon icon-${status}`} />
      {label}
    </span>
  );
};
