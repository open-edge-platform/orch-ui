/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { enhancedInfraSlice } from "@orch-ui/apis";
import { Flex } from "@orch-ui/components";
import { Button, Heading, Icon, IconVariant } from "@spark-design/react";
import { ScheduleMaintenanceStatusTag } from "../../../components/molecules/ScheduleMaintenanceStatusTag/ScheduleMaintenanceStatusTag";
import "./DrawerHeader.scss";

const dataCy = "drawerHeader";
export interface DrawerHeaderProps {
  targetEntity: enhancedInfraSlice.ScheduleMaintenanceTargetEntity;
  targetEntityType: enhancedInfraSlice.ScheduleMaintenanceTargetEntityType;
  prefixButtonShown?: boolean;
  prefixButtonIcon?: IconVariant;
  hideMaintenanceTag?: boolean;
  onClose?: () => void;
}
export const DrawerHeader = ({
  targetEntity,
  targetEntityType,
  prefixButtonShown,
  prefixButtonIcon = "chevron-left",
  hideMaintenanceTag,
  onClose,
}: DrawerHeaderProps) => {
  const cy = { "data-cy": dataCy };
  return (
    <div {...cy} className="drawer-header">
      <Flex cols={[11, 1]}>
        <Heading className="title" semanticLevel={5}>
          {prefixButtonShown && (
            <Button
              data-cy="backButton"
              className="pa-1 back-button"
              onPress={onClose}
              variant="ghost"
              iconOnly
            >
              <Icon icon={prefixButtonIcon} />
            </Button>
          )}
          {targetEntity.name}
          {
            /* Maintenance tag */
            !hideMaintenanceTag && (
              <ScheduleMaintenanceStatusTag
                className="maintenance-badge"
                targetEntity={targetEntity}
                targetEntityType={targetEntityType}
                poll
              />
            )
          }
        </Heading>
        <div data-cy="crossButton" className="drawer-close-btn">
          {!prefixButtonShown && (
            <Button variant="ghost" onPress={onClose}>
              <Icon icon="cross" />
            </Button>
          )}
        </div>
      </Flex>
    </div>
  );
};
