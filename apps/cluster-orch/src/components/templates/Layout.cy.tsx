/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { cyGet } from "@orch-ui/tests";
import { innerTransitionTimeout, IRuntimeConfig } from "@orch-ui/utils";
import Layout from "./Layout";
import LayoutPom, { Selectors } from "./Layout.pom";

const pom: LayoutPom = new LayoutPom();

describe("<Layout/>", () => {
  const cfg: IRuntimeConfig = {
    AUTH: "",
    KC_CLIENT_ID: "",
    KC_REALM: "",
    KC_URL: "",
    MFE: {
      ADMIN: "false",
      INFRA: "false",
    },
    OBSERVABILITY_URL: "",
    SESSION_TIMEOUT: 0,
    TITLE: "",
    API: {},
    DOCUMENTATION: [],
    VERSIONS: {},
  };
  // this maps all clickable items to the expected url
  const navToUrlMapping: { [key in Selectors]?: string } = {
    Clusters: "/clusters",
    "Cluster Templates": "/cluster-templates",
  };
  beforeEach(() => {
    cy.mount(<Layout />, {
      runtimeConfig: cfg,
      // NOTE that clusterOrch real components depend on INFRA components,
      // to avoid those imports make up fake routers (we're only testing the transitions)
      routerRule: [
        {
          path: "/",
          element: <Layout />,
          children: [
            {
              path: "clusters",
              element: (
                <div>
                  <h1>Clusters</h1>
                </div>
              ),
            },
            {
              path: "cluster-templates",
              element: (
                <div>
                  <h1>Cluster Templates</h1>
                </div>
              ),
            },
          ],
        },
      ],
    });
  });
  it("should navigate to the correct page", () => {
    for (const el in navToUrlMapping) {
      pom.el[el as Selectors].click();
      pom.getPath().should("contain", navToUrlMapping[el as Selectors]);
      cy.wait(innerTransitionTimeout);
      cy.get("h1", { timeout: 0 }).should("contain.text", el);
    }
  });
  it("should navigate to the correct URL regardless of the timeout", () => {
    for (const el in navToUrlMapping) {
      pom.el[el as Selectors].click();
      pom.getPath().should("contain", navToUrlMapping[el as Selectors]);
    }
  });
  it("should navigate to the correct page regardless of the timeout", () => {
    for (const el in navToUrlMapping) {
      pom.el[el as Selectors].click();
      pom.getPath().should("contain", navToUrlMapping[el as Selectors]);
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(1500);
      cy.get("h1", { timeout: 0 }).should("contain.text", el);
    }
  });
  it("navigation to clusters page", () => {
    cyGet("Clusters").click();
    cy.get("h1").contains("Clusters");
  });
  it("navigation to clusters templates page", () => {
    cyGet("Cluster Templates").click();
    cy.get("h1").contains("Cluster Templates");
  });
});
