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

/**
 * Fetches the orchestrator's current time by calling GET /v1/orchestrator
 * and reading the `Date` HTTP response header.  Go's net/http sets `Date`
 * to the server's current wall-clock time on **every** response; with
 * Cache-Control: no-store the response is never served from cache, so the
 * header always reflects the real orchestrator time.
 *
 * The hook then ticks the returned Date forward every second so the UI
 * shows a live clock without repeated polling.
 *
 * Returns `null` until the first successful fetch completes.
 */
export function useOrchestratorTime(): Date | null {
  const [orchestratorTime, setOrchestratorTime] = useState<Date | null>(null);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const baseTimeRef = useRef<Date | null>(null);
  const fetchTimeRef = useRef<number>(0); // performance.now() at fetch midpoint

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

        if (!resp.ok || cancelled) return;

        const dateHeader = resp.headers.get("Date");
        if (!dateHeader) return;

        const serverDate = new Date(dateHeader);
        if (isNaN(serverDate.getTime())) return;

        // Compensate for network round-trip: advance server time by half RTT
        const halfRtt = (fetchEnd - fetchStart) / 2;
        const adjusted = new Date(serverDate.getTime() + halfRtt);

        baseTimeRef.current = adjusted;
        fetchTimeRef.current = fetchEnd;
        setOrchestratorTime(new Date(adjusted));

        // Start (or restart) the per-second tick
        if (tickRef.current !== null) {
          clearInterval(tickRef.current);
        }
        tickRef.current = setInterval(() => {
          if (!baseTimeRef.current) return;
          const msElapsed = performance.now() - fetchTimeRef.current;
          setOrchestratorTime(
            new Date(baseTimeRef.current.getTime() + msElapsed),
          );
        }, 1000);
      } catch {
        // Network error — silently ignore; clock stays hidden
      }
    };

    fetchOrchestratorTime();

    return () => {
      cancelled = true;
      if (tickRef.current !== null) {
        clearInterval(tickRef.current);
        tickRef.current = null;
      }
    };
  }, []);

  return orchestratorTime;
}
