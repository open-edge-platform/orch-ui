/*
 * SPDX-FileCopyrightText: (C) 2026 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { cyGet } from "@orch-ui/tests";
import { OrchestratorClock } from "./OrchestratorClock";

// A fixed server-side time to use in tests.
const FAKE_SERVER_DATE = "Wed, 01 Jan 2026 12:00:00 GMT";
const FAKE_ISO = "2026-01-01 12:00:00Z";

describe("<OrchestratorClock/>", () => {
  beforeEach(() => {
    // Stub the component-status endpoint: return 200 with a Date header.
    // In Cypress component tests, RuntimeConfig falls back to
    // window.location.origin so the path resolves correctly.
    cy.intercept("GET", "/v1/orchestrator", {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        Date: FAKE_SERVER_DATE,
      },
      body: {},
    }).as("getOrchestratorTime");
  });

  it("renders the orchestrator time in ISO format after fetch", () => {
    cy.mount(<OrchestratorClock />);
    cy.wait("@getOrchestratorTime");
    cyGet("orchestratorClock")
      .should("exist")
      .and("contain.text", FAKE_ISO);
  });

  it("does not render before the fetch completes", () => {
    // Delay the response so we can catch the pre-render state
    cy.intercept("GET", "/v1/orchestrator", (req) => {
      req.reply({
        delay: 2000,
        statusCode: 200,
        headers: { Date: FAKE_SERVER_DATE },
        body: {},
      });
    }).as("slowOrchestratorTime");
    cy.mount(<OrchestratorClock />);
    cyGet("orchestratorClock").should("not.exist");
    cy.wait("@slowOrchestratorTime");
    cyGet("orchestratorClock").should("exist");
  });

  it("renders nothing when the fetch fails", () => {
    cy.intercept("GET", "/v1/orchestrator", { forceNetworkError: true }).as(
      "failedOrchestratorTime",
    );
    cy.mount(<OrchestratorClock />);
    // Give time for the fetch attempt to settle
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500);
    cyGet("orchestratorClock").should("not.exist");
  });
});
