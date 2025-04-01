/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { Heading } from "@spark-design/react";
import AlertsList from "../../organisms/AlertsList/AlertsList";
import "./Alerts.scss";

const dataCy = "alerts";

const Alerts = () => {
  const cy = { "data-cy": dataCy };
  return (
    <div {...cy} className="alerts">
      <Heading semanticLevel={1} size="l" data-cy="title">
        Alerts
      </Heading>
      <AlertsList />
    </div>
  );
};

export default Alerts;
