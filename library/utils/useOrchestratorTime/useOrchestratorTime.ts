/*
 * SPDX-FileCopyrightText: (C) 2026 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from "react";
import { useAuth } from "react-oidc-context";
import { useGetOrchestratorStatusQuery } from "../../apis/component-status/componentStatusApis";
import { RuntimeConfig } from "../runtime-config/runtime-config";

export type OrchestratorTimeSource = "orchestrator" | "local";

export interface OrchestratorTimeResult {
  /** The current time, ticking forward every second. */
  time: Date;
  /**
   * `"orchestrator"` once the Date header has been successfully read from
   * the component-status service; `"local"` while the query is in-flight
   * or when the endpoint is unreachable.
   */
  source: OrchestratorTimeSource;
}

/**
 * Returns a live-ticking orchestrator clock sourced from the `Date` HTTP
 * response header of GET /v1/orchestrator (component-status service).
 *
 * Uses RTK Query (`useGetOrchestratorStatusQuery`) for the single initial
 * fetch.  After that the hook ticks the time forward every second so the
 * UI shows a live clock without repeated polling.
 *
 * While the query is in-flight or the endpoint is unreachable the hook
 * falls back to the local system clock so the clock is always visible.
 * Once orchestrator time is obtained it seamlessly switches.
 *
 * Prerequisites (orch-utils chart changes):
 *   - `cors` Traefik middleware added to the component-status IngressRoute
 *     (provides Access-Control-Allow-Origin)
 *   - `accessControlExposeHeaders: ["Date"]` added to the cors middleware
 *     (allows the browser to read the Date header from JS)
 *   - `Cache-Control: no-store` on the handler (already shipped)
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
  const anchoredRef = useRef(false);

  // Skip the query until the user is authenticated so that the request
  // carries a valid JWT.  Layout renders before AuthWrapper, so on a fresh
  // login the OIDC callback is still in-flight when this hook first runs —
  // without skip the request would fire without a token, get a 403 from
  // validate-jwt, and RTK Query would mark it as an error (never as data).
  // When auth is disabled we never skip.
  const { isAuthenticated } = useAuth();
  const skipQuery = RuntimeConfig.isAuthEnabled() && !isAuthenticated;
  const { data, fulfilledTimeStamp } = useGetOrchestratorStatusQuery(
    undefined,
    { skip: skipQuery },
  );

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

  // When RTK Query fulfils the request, anchor the tick to orchestrator time.
  useEffect(() => {
    if (!data?.serverTime || anchoredRef.current) return;

    const serverDate = new Date(data.serverTime);
    if (isNaN(serverDate.getTime())) return;

    // fulfilledTimeStamp is the Unix ms when RTK Query received the response.
    // Approximate fetch midpoint: half the RTT from the start of mount.
    // We don't have fetchStart here, but fulfilledTimeStamp is close enough.
    const now = performance.now();
    const fetchedAt = fulfilledTimeStamp ?? Date.now();
    // Advance server time forward by the time elapsed since RTK Query fulfilled
    const msElapsedSinceFulfilled = Date.now() - fetchedAt;
    const adjusted = new Date(serverDate.getTime() + msElapsedSinceFulfilled);

    baseTimeRef.current = adjusted;
    fetchTimeRef.current = now;
    sourceRef.current = "orchestrator";
    anchoredRef.current = true;
    setResult({ time: new Date(adjusted), source: "orchestrator" });
  }, [data, fulfilledTimeStamp]);

  return result;
}
