/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { Button, Heading, Icon, IconProps, Text } from "@spark-design/react";
import { ButtonVariant } from "@spark-design/tokens";
import "./MessageBanner.scss";
export const dataCy = "messageBanner";
export enum MessageBannerVariant {
  Info = "info",
  Warning = "warning",
  Error = "error",
  Success = "success",
}
export interface MessageBannerProps {
  className?: string;
  title?: string;
  icon?: IconProps["icon"];
  text?: string;
  content?: React.ReactNode;
  /* Variant prop is applied only if icon prop is received */
  variant?: MessageBannerVariant;
  onClose?: () => void;
  isDismmisible?: boolean;
}
export const MessageBanner = ({
  className: _className,
  icon,
  title,
  text,
  variant,
  content,
  onClose,
  isDismmisible = true,
}: MessageBannerProps) => {
  const cy = { "data-cy": dataCy };
  const className = "message-banner";
  const variantClass = variant ? `${className}__title-icon--${variant}` : "";
  return (
    <div {...cy} className={`${className} ${_className}`.trim()}>
      <div className={`${className}__header`}>
        <div className={`${className}__title-container`}>
          {icon && (
            <Icon
              data-cy="titleIcon"
              className={`${className}__title-icon ${variantClass}`.trim()}
              icon={icon}
            />
          )}
          {title && (
            <Heading
              data-cy="title"
              className={`${className}__title`}
              semanticLevel={6}
            >
              {title}
            </Heading>
          )}
        </div>
        {isDismmisible && (
          <Button
            data-cy="close"
            variant={ButtonVariant.Ghost}
            iconOnly
            className={`${className}__close`}
            onPress={() => onClose && onClose()}
          >
            <Icon icon="cross" />
          </Button>
        )}
      </div>
      {text && (
        <Text data-cy="messageBannerText" className={`${className}__text`}>
          {text}
        </Text>
      )}
      {content && (
        <div
          className={`${className}__content_container`}
          data-cy="messageBannerContent"
        >
          {content}
        </div>
      )}
    </div>
  );
};
