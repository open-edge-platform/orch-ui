/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { Button, Heading, Text } from "@spark-design/react";

import { useState } from "react";
import AlertDefinitionsList from "../../organisms/AlertDefinitionsList/AlertDefinitionsList";
import ReceiversList from "../../organisms/ReceiversList/ReceiversList";
import "./AlertDefinitions.scss";

export const dataCy = "alertDefinitions";

const AlertDefinitions = () => {
  const cy = { "data-cy": dataCy };
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div {...cy} className="alert-definitions">
      <Heading semanticLevel={1} size="l" data-cy="title">
        Alerts Configuration
      </Heading>
      <div className="alerts-subtitle">
        <Text>Use this page to configure alerts</Text>
        <Button variant="primary" onPress={() => setIsOpen(true)}>
          Email Alerts
        </Button>
      </div>
      <AlertDefinitionsList />
      <ReceiversList isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default AlertDefinitions;
