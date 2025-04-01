/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { innerTransitionTimeout, IRuntimeConfig } from "@orch-ui/utils";
import { routes } from "../../routes";
import Layout from "./Layout";
import LayoutPom, { Selectors } from "./Layout.pom";

const pom: LayoutPom = new LayoutPom();

describe("<Layout/>", () => {
  const cfg: IRuntimeConfig = {
    AUTH: "",
    KC_CLIENT_ID: "",
    KC_REALM: "",
    KC_URL: "",
    DOCUMENTATION: [],
    MFE: {
      ADMIN: "false",
      CLUSTER_ORCH: "false",
    },
    OBSERVABILITY_URL: "",
    SESSION_TIMEOUT: 0,
    TITLE: "",
    API: {},
    VERSIONS: {},
  };
  // this maps all clickable items to the expected url
  const navToUrlMapping: { [key in Selectors]?: string } = {
    Hosts: "/hosts",
  };
  beforeEach(() => {
    cy.mount(<Layout />, {
      runtimeConfig: cfg,
      routerRule: routes,
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
});
