/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { omApi } from "@orch-ui/apis";
import { Flex } from "@orch-ui/components";
import { Drawer, Text } from "@spark-design/react";
import AlertSource from "../../atoms/AlertSource/AlertSource";
import "./AlertDrawer.scss";

const dataCy = "alertDrawer";
interface AlertDrawerProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  alert?: omApi.Alert;
  alertDefinition?: omApi.AlertDefinition;
}
const AlertDrawer = ({
  isOpen = false,
  alert,
  alertDefinition,
  setIsOpen,
}: AlertDrawerProps) => {
  const cy = { "data-cy": dataCy };
  const alertDetail = (
    <div>
      <Flex cols={[2, 8]}>
        <Text size="l" data-cy="alertLabel">
          Alert:
        </Text>
        <Text size="l" data-cy="alertValue">
          {alertDefinition?.name}
        </Text>
      </Flex>
      <Flex cols={[2, 8]}>
        <Text size="l" data-cy="statusLabel">
          Status:
        </Text>
        <Text size="l" data-cy="statusValue">
          {alert?.status?.state}
        </Text>
      </Flex>
      <Flex cols={[2, 8]}>
        <Text size="l" data-cy="categoryLabel">
          Category:
        </Text>
        <Text size="l" data-cy="categoryValue">
          {alert?.labels?.alert_category}
        </Text>
      </Flex>
      <Flex cols={[2, 8]}>
        <Text size="l" data-cy="sourceLabel">
          Source:
        </Text>
        <Text size="l" data-cy="sourceValue">
          {alert && <AlertSource alert={alert} />}
        </Text>
      </Flex>
      <Flex cols={[2, 8]}>
        <Text size="l" data-cy="startLabel">
          Start time:
        </Text>
        <Text size="l" data-cy="startValue">
          {alert?.startsAt}
        </Text>
      </Flex>
      <Flex cols={[2, 8]}>
        <Text size="l" data-cy="modifiedLabel">
          Modified time:
        </Text>
        <Text size="l" data-cy="modifiedValue">
          {alert?.updatedAt}
        </Text>
      </Flex>
      <Flex cols={[2, 8]}>
        <Text size="l" data-cy="descriptionLabel">
          Description:
        </Text>
        <Text size="l" data-cy="descriptionValue">
          {alert?.annotations?.description}
        </Text>
      </Flex>
    </div>
  );
  return (
    <div {...cy} className="alert-drawer">
      <Drawer
        data-cy="alertDrawerBody"
        show={isOpen}
        onHide={() => setIsOpen(false)}
        headerProps={{
          title: "Alert Details",
        }}
        bodyContent={alertDetail}
      ></Drawer>
    </div>
  );
};

export default AlertDrawer;
