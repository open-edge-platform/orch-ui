/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { Button, Heading, Icon, IconVariant, Text } from "@spark-design/react";
import { ButtonSize, ButtonVariant } from "@spark-design/tokens";

import "./Empty.scss";

export interface EmptyProps {
  icon?: IconVariant;
  title?: string;
  subTitle?: string;
  actions?: EmptyActionProps[];
  dataCy?: string;
}

export interface EmptyActionProps {
  name?: string;
  action?: () => void;
  disable?: boolean;
  variant?: ButtonVariant;
  dataCy?: string;
  component?: JSX.Element;
}

export const Empty = ({
  icon,
  title = "",
  subTitle = "",
  actions,
  dataCy = "empty",
}: EmptyProps): JSX.Element => {
  return (
    <div className="empty" data-cy={dataCy}>
      <Icon icon={icon} className="empty__icon" data-cy="emptyIcon" />
      <Heading semanticLevel={1} size="m" data-cy="emptyTitle">
        {title}
      </Heading>
      <Text size="m" className="empty__subTitle" data-cy="emptySubTitle">
        {subTitle}
      </Text>
      <div className="empty__action">
        {actions &&
          actions.map((action, index) => {
            if (action.component) {
              return action.component;
            } else {
              return (
                <Button
                  onPress={action.action}
                  variant={action.variant ?? ButtonVariant.Action}
                  data-cy={
                    action.dataCy
                      ? action.dataCy
                      : actions.length === 1
                        ? "emptyActionBtn"
                        : `emptyActionBtn${index}`
                  }
                  size={ButtonSize.Large}
                  isDisabled={action.disable}
                  key={index}
                >
                  {action.name}
                </Button>
              );
            }
          })}
      </div>
    </div>
  );
};
