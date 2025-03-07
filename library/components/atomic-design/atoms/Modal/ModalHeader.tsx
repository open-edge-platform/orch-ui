/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { Button, Heading, Icon, Text } from "@spark-design/react";
import {
  ButtonSize,
  ButtonVariant,
  ModalSize,
  TextSize,
} from "@spark-design/tokens";
import React from "react";

export interface ModalHeaderProps {
  modalHeading?: string;
  modalLabel?: string;
  modalHeadingClassName?: string;
  onClose: () => void;
  size?: ModalSize;
  isDimissable?: boolean;
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({
  modalHeading = "",
  modalLabel = "",
  modalHeadingClassName = "",
  size,
  onClose,
  isDimissable,
}) => {
  const headerSize =
    size === ModalSize.Small || size === ModalSize.Medium
      ? TextSize.ExtraSmall
      : TextSize.Small;
  const modalLabelSize =
    size === ModalSize.Small || size === ModalSize.Medium
      ? TextSize.Medium
      : TextSize.Large;

  return (
    <>
      <div className="spark-modal-header" data-cy="modalHeader">
        <div className="spark-modal-heading-titles">
          <Text
            size={modalLabelSize}
            data-cy="modalLabel"
            className="modal-label"
          >
            {modalLabel}
          </Text>

          <Heading
            semanticLevel={1}
            size={headerSize}
            data-cy="modalTitle"
            className={`m-0 ${modalHeadingClassName}`}
          >
            {modalHeading}
          </Heading>
        </div>
        {isDimissable && (
          <Button
            size={ButtonSize.Small}
            variant={ButtonVariant.Ghost}
            aria-label="dismiss"
            onPress={onClose}
            iconOnly
            data-cy="closeDialog"
          >
            <Icon altText="Close Modal" icon="cross" />
          </Button>
        )}
      </div>
    </>
  );
};
