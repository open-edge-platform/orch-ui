/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { IRuntimeConfig } from "@orch-ui/utils";
import HeaderItem from "../HeaderItem/HeaderItem";
import Header, { HeaderSize } from "./Header";
import HeaderPom from "./Header.pom";

const pom = new HeaderPom();

const runtimeConfig: IRuntimeConfig = {
  TITLE: "SampleTitle",
  AUTH: "",
  KC_URL: "",
  KC_REALM: "",
  KC_CLIENT_ID: "",
  SESSION_TIMEOUT: 0,
  OBSERVABILITY_URL: "",
  DOCUMENTATION_URL: "https://test.com/",
  MFE: {
    APP_ORCH: undefined,
    INFRA: undefined,
    CLUSTER_ORCH: undefined,
    ADMIN: undefined,
  },
  API: {},
  VERSIONS: { v: undefined },
  DOCUMENTATION: [],
};

window.__RUNTIME_CONFIG__ = runtimeConfig;

describe("<Header/>", () => {
  it("should render component size L", () => {
    cy.mount(
      <Header size={HeaderSize.Large}>
        <HeaderItem to="/to" size={HeaderSize.Large}>
          One
        </HeaderItem>
      </Header>,
    );
    pom.root.should("exist");
    pom.root.should("have.css", "height", "80px");
  });

  it("should render component size M", () => {
    cy.mount(
      <Header size={HeaderSize.Medium}>
        <HeaderItem to="/to" size={HeaderSize.Medium}>
          One
        </HeaderItem>
      </Header>,
    );
    pom.root.should("exist");
    pom.root.should("have.css", "height", "64px");
  });

  it("should render component size S", () => {
    cy.mount(
      <Header size={HeaderSize.Small}>
        <HeaderItem to="/to" size={HeaderSize.Small}>
          One
        </HeaderItem>
      </Header>,
    );
    pom.root.should("exist");
    pom.root.should("have.css", "height", "48px");
  });

  it("correctly displays the documentation link", () => {
    const cfg: IRuntimeConfig = {
      DOCUMENTATION_URL: "https://test.com/",
      DOCUMENTATION: [
        {
          src: "/dashboard",
          dest: "/docs/content/dev_guide/monitor_deployments/monitor_deployment.html",
        },
      ],
      AUTH: "false",
      KC_URL: "",
      KC_REALM: "",
      KC_CLIENT_ID: "",
      TITLE: "",
      SESSION_TIMEOUT: 1800,
      OBSERVABILITY_URL: "",
      MFE: {},
      API: {},
      VERSIONS: {},
    };
    window.__RUNTIME_CONFIG__ = cfg;
    cy.mount(
      <Header size={HeaderSize.Small}>
        <HeaderItem to="/to" size={HeaderSize.Small}>
          One
        </HeaderItem>
      </Header>,
    );
    pom.el.menuDocumentation
      .find("a")
      .should(
        "have.attr",
        "href",
        "https://test.com/docs/content/dev_guide/monitor_deployments/monitor_deployment.html",
      );
  });
});
