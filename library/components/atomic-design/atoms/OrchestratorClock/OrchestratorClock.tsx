/*
 * SPDX-FileCopyrightText: (C) 2026 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { useOrchestratorTime } from "@orch-ui/utils";
import { Icon } from "@spark-design/react";
import "./OrchestratorClock.scss";

const dataCy = "orchestratorClock";

/** Formats a Date as `YYYY-MM-DD HH:mmZ` (UTC, no seconds). */
function formatDateTime(d: Date): string {
  return d.toISOString().slice(0, 16).replace("T", " ") + "Z";
}

/**
 * Displays the current time as `YYYY-MM-DD HH:mmZ` with a clock icon,
 * positioned at the far right of the header.
 *
 * **Orchestrator time** is the wall-clock of the orchestrator server, read
 * from the `Date` HTTP response header of GET /v1/orchestrator.  This is
 * the reference time used by all orchestrator timestamps so you can compare
 * event times directly.
 *
 * **Local time** (fallback) is the browser's own system clock, shown while
 * the fetch is in-flight or when the server header is not yet exposed
 * (before the Access-Control-Expose-Headers change is deployed).
 */
export const OrchestratorClock = () => {
  const { time, source } = useOrchestratorTime();

  const title =
    source === "orchestrator"
      ? "Orchestrator time (UTC)"
      : "Local browser time (UTC) — orchestrator time unavailable";

  return (
    <div
      data-cy={dataCy}
      className={`orchestrator-clock${
        source === "local" ? " orchestrator-clock--local" : ""
      }`}
      title={title}
    >
      <Icon icon="time" artworkStyle="light" />
      <span>{formatDateTime(time)}</span>
    </div>
  );
};

export default OrchestratorClock;
