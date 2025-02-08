/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { adm } from "@orch-ui/apis";
import StatusCounter from "../StatusCounter/StatusCounter";
import "./DeploymentStatusCounter.scss";

interface DeploymentStatusCounterProps {
  summary: adm.SummaryRead;
  showAllStates?: boolean;
}

export const dataCy = "deploymentStatusCounter";

/**
 * Renders a donut chart reporting the number of deployment instances
 * that are running compared to the ones that have error
 * If `detailed=true` it lists both
 */
const DeploymentStatusCounter = ({
  summary,
  showAllStates = false,
}: DeploymentStatusCounterProps) => {
  return (
    <StatusCounter
      dataCy={dataCy}
      summary={{
        down: summary.down ?? 0,
        running: summary.running ?? 0,
        total: summary.total ?? 0,
      }}
      showAllStates={showAllStates}
      showAllStatesTitle="Deployment Status"
      noTotalMessage="Status summary not provided"
    />
  );
};

export default DeploymentStatusCounter;
