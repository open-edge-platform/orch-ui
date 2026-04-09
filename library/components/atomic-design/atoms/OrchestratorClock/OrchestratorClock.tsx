/*
 * SPDX-FileCopyrightText: (C) 2026 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { useOrchestratorTime } from "@orch-ui/utils";
import "./OrchestratorClock.scss";

const dataCy = "orchestratorClock";

/**
 * Displays the orchestrator's current time in ISO 8601 format, ticking
 * forward every second.  Renders nothing until the first time fetch
 * completes so the header layout is not disrupted during load.
 *
 * The time comes from the `Date` HTTP response header of GET /v1/orchestrator
 * (component-status service), which Go's net/http sets to the server's
 * current wall-clock time on every response.
 */
export const OrchestratorClock = () => {
  const time = useOrchestratorTime();

  if (!time) return null;

  return (
    <div data-cy={dataCy} className="orchestrator-clock" title="Orchestrator time (UTC)">
      {time.toISOString().replace("T", " ").replace(/\.\d{3}Z$/, "Z")}
    </div>
  );
};

export default OrchestratorClock;
