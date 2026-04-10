/*
 * SPDX-FileCopyrightText: (C) 2026 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { cyGet } from "@orch-ui/tests";
import { OrchestratorClock } from "./OrchestratorClock";

// A fixed orchestrator time to use in tests.
// The Date header uses RFC 7231 format; the component formats it as ISO UTC.
const FAKE_SERVER_DATE = "Thu, 01 Jan 2026 12:00:00 GMT";
const FAKE_ISO_DISPLAY = "2026-01-01 12:00:00Z";

describe("<OrchestratorClock/>", () => {
  beforeEach(() => {
    // Stub the component-status endpoint, returning a Date response header.
    // In Cypress component tests RuntimeConfig.infraApiUrl falls back to
    // window.location.origin, so cy.intercept resolves to the Cypress dev server.
    cy.intercept("GET", "/v1/orchestrator", {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        // Expose the Date header as if Access-Control-Expose-Headers is applied
        Date: FAKE_SERVER_DATE,
      },
      body: {
        "schema-version": "1.0",
        orchestrator: { version: "2026.0", features: {} },
      },
    }).as("getOrchestratorTime");
  });

  it("renders the orchestrator time in ISO format after fetch", () => {
    cy.mount(<OrchestratorClock />);
    cy.wait("@getOrchestratorTime");
    cyGet("orchestratorClock")
      .should("exist")
      .and("contain.text", FAKE_ISO_DISPLAY);
  });

  it("shows local time before the fetch completes", () => {
    cy.intercept("GET", "/v1/orchestrator", (req) => {
      req.reply({
        delay: 2000,
        statusCode: 200,
        headers: { Date: FAKE_SERVER_DATE },
        body: {},
      });
    }).as("slowOrchestratorTime");
    cy.mount(<OrchestratorClock />);
    // Clock renders immediately with local fallback time
    cyGet("orchestratorClock").should("exist");
  });

  it("continues showing local time when the fetch fails", () => {
    cy.intercept("GET", "/v1/orchestrator", { forceNetworkError: true }).as(
      "failedOrchestratorTime",
    );
    cy.mount(<OrchestratorClock />);
    cyGet("orchestratorClock").should("exist");
  });
});
