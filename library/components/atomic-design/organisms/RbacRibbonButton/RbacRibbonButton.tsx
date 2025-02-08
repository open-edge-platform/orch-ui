/*
 * SPDX-FileCopyrightText: (C) 2024 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import type { Icon as IconType } from "@spark-design/iconfont";
import { Button, Icon, Tooltip } from "@spark-design/react";
import { ButtonSize, ButtonVariant } from "@spark-design/tokens";

export interface RbacRibbonButtonProps {
  name: string;
  size: ButtonSize;
  variant: ButtonVariant;
  text: string;
  disabled: boolean;
  onPress: () => void;
  tooltip: string;
  tooltipIcon?: IconType;
}

export const RbacRibbonButton = ({
  name,
  size,
  variant,
  text,
  disabled,
  onPress,
  tooltip,
  tooltipIcon,
}: RbacRibbonButtonProps) => {
  const button = (
    <Button
      size={size}
      onPress={onPress}
      isDisabled={disabled}
      variant={variant}
      data-cy="button"
    >
      {text}
    </Button>
  );

  let content;

  if (tooltip) {
    content = (
      <Tooltip
        placement="top"
        content={tooltip}
        data-cy="tooltip"
        key={`tooltip${name}`}
        icon={tooltipIcon && <Icon artworkStyle="solid" icon={tooltipIcon} />}
      >
        {button}
      </Tooltip>
    );
  } else {
    content = button;
  }

  return <div data-cy={`ribbonButton${name}`}>{content}</div>;
};
