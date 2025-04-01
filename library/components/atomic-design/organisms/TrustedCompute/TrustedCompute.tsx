/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { Button, Icon, Text, Tooltip } from "@spark-design/react";
import { TooltipPlacement } from "@spark-design/tokens";
import "./TrustedCompute.scss";

export type TrustedComputeCompatibility = { text: string; tooltip: string };

export interface TrustedComputeProps {
  trustedComputeCompatible: TrustedComputeCompatibility;
  dataCy?: string;
}
export const TrustedCompute = ({
  trustedComputeCompatible,
  dataCy = "trustedCompute",
}: TrustedComputeProps) => {
  return (
    <Tooltip
      content={trustedComputeCompatible.tooltip}
      size="m"
      placement={TooltipPlacement.RIGHT}
    >
      <div className="tc-tooltip-content" data-cy={dataCy}>
        <Text className="tc-text">{trustedComputeCompatible.text}</Text>
        <Button iconOnly size="m" variant="ghost">
          <Icon altText="Information" icon="information-circle" />
        </Button>
      </div>
    </Tooltip>
  );
};
