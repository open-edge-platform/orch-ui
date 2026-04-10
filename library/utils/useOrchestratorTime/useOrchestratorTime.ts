/*
 * SPDX-FileCopyrightText: (C) 2026 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from "react";
import { getUserToken } from "../authConfig/authConfig";
import { RuntimeConfig } from "../runtime-config/runtime-config";

/**
 * Returns the base URL (scheme + host) for the orchestrator API.
 * All API servers share the same `api.<domain>` host, so we derive the
 * origin from RuntimeConfig.infraApiUrl (a public getter).  In mock/test
 * mode getApiUrl falls back to window.location.origin so we do too.
 */
function getOrchestratorApiOrigin(): string {
  try {
    const u = new URL(RuntimeConfig.infraApiUrl);
    return `${u.protocol}//${u.host}`;
  } catch {
    return window.location.origin;
  }
}

export type OrchestratorTimeSource = "orchestrator" | "local";

export interface OrchestratorTimeResult {
  /** The current time, ticking forward every second. */
  time: Date;
  /**
   * `"orchestrator"` once the Date header has been successfully read from
   * the component-status service; `"local"` while the fetch is in-flight,
   * when the endpoint is unreachable, or when the Date header is not yet
   * exposed (e.g. before Access-Control-Expose-Headers is deployed).
   */
  source: OrchestratorTimeSource;
}

/**
 * Fetches the orchestrator's current time by calling GET /v1/orchestrator
 * and reading the `Date` HTTP response header.  Go's net/http sets `Date`
 * to the server's current wall-clock time on **every** response; with
 * Cache-Control: no-store the response is never served from cache, so the
 * header always reflects the real orchestrator time.
 *
 * The hook ticks the returned Date forward every second so the UI shows a
 * live clock without repeated polling.
 *
 * While the fetch is in-flight, the endpoint is unreachable, or the Date
 * header is not yet exposed, the hook falls back to the local system clock
 * so the clock is always visible in the header.  Once the orchestrator time
 * is obtained the clock seamlessly switches to it.
 */
export function useOrchestratorTime(): OrchestratorTimeResult {
  const [result, setResult] = useState<OrchestratorTimeResult>({
    time: new Date(),
    source: "local",
  });
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const baseTimeRef = useRef<Date>(new Date());
  const fetchTimeRef = useRef<number>(performance.now());
  const sourceRef = useRef<OrchestratorTimeSource>("local");

  // Start a local-time tick immediately so the clock is always visible.
  useEffect(() => {
    tickRef.current = setInterval(() => {
      const msElapsed = performance.now() - fetchTimeRef.current;
      setResult({
        time: new Date(baseTimeRef.current.getTime() + msElapsed),
        source: sourceRef.current,
      });
    }, 1000);

    return () => {
      if (tickRef.current !== null) {
        clearInterval(tickRef.current);
        tickRef.current = null;
      }
    };
  }, []);

  // Attempt to read the orchestrator's Date header and, if successful,
  // re-anchor the tick to the server time.
  useEffect(() => {
    let cancelled = false;

    const fetchOrchestratorTime = async () => {
      try {
        const token = getUserToken();
        const origin = getOrchestratorApiOrigin();

        const fetchStart = performance.now();
        const resp = await fetch(`${origin}/v1/orchestrator`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });
        const fetchEnd = performance.now();

        if (cancelled) return;

        // If the response is not OK or the Date header is missing/unreadable
        // (e.g. Access-Control-Expose-Headers not yet deployed), keep the
        // local-time fallback — the clock stays visible and ticking.
        if (!resp.ok) return;

        const dateHeader = resp.headers.get("Date");
        if (!dateHeader) return;

        const serverDate = new Date(dateHeader);
        if (isNaN(serverDate.getTime())) return;

        // Compensate for network round-trip: advance server time by half RTT.
        const halfRtt = (fetchEnd - fetchStart) / 2;
        const adjusted = new Date(serverDate.getTime() + halfRtt);

        // Re-anchor the running tick to orchestrator time.
        baseTimeRef.current = adjusted;
        fetchTimeRef.current = fetchEnd;
        sourceRef.current = "orchestrator";
        setResult({ time: new Date(adjusted), source: "orchestrator" });
      } catch {
        // Network error — keep the local-time fallback running.
      }
    };

    fetchOrchestratorTime();

    return () => {
      cancelled = true;
    };
  }, []);

  return result;
}
