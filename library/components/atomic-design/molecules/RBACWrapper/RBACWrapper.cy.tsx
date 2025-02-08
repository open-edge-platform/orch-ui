/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { IRuntimeConfig, Role } from "@orch-ui/utils";
import * as AuthConfig from "../../../../utils/authConfig/authConfig";
import { RBACWrapper } from "./RBACWrapper";

const mainContent = <p id="content">Testing RBAC wrapper</p>;
const alternateContent = <p id="alternate">Alternate content</p>;

describe("RBAC Wrapper component", () => {
  describe("when authentication is enabled", () => {
    // for the app to think auth is enabled
    const runtimeConfig: IRuntimeConfig = {
      KC_CLIENT_ID: "",
      KC_REALM: "",
      KC_URL: "",
      AUTH: "true",
      SESSION_TIMEOUT: 0,
      OBSERVABILITY_URL: "",
      MFE: {
        APP_ORCH: "true",
        FM: "true",
        CLUSTER_ORCH: "true",
      },
      TITLE: "",
      API: {},
      VERSIONS: {},
      DOCUMENTATION: [],
    };

    describe("when using 'showTo'", () => {
      it("should render the children when the role is matched", () => {
        cy.mount(
          <RBACWrapper
            showTo={[Role.AO_WRITE]}
            hasRole={cy
              .stub(AuthConfig, "hasRole")
              .as("hasRoleStub")
              .callsFake(() => true)}
          >
            {mainContent}
          </RBACWrapper>,
          { mockAuth: true, runtimeConfig },
        );
        cy.get("#content").should("exist");
      });

      it("should NOT render the children when the role is NOT matched", () => {
        cy.mount(
          <RBACWrapper
            showTo={[Role.AO_WRITE]}
            hasRole={cy
              .stub(AuthConfig, "hasRole")
              .as("hasRoleStub")
              .callsFake(() => false)}
          >
            {mainContent}
          </RBACWrapper>,
          { mockAuth: true, runtimeConfig },
        );
        cy.get("#content").should("not.exist");
      });

      describe("when 'missingRoleContent' is provided and role is NOT matched", () => {
        it("should render the alternate content", () => {
          cy.mount(
            <RBACWrapper
              showTo={[Role.AO_WRITE]}
              missingRoleContent={alternateContent}
              hasRole={cy
                .stub(AuthConfig, "hasRole")
                .as("hasRoleStub")
                .callsFake(() => false)}
            >
              {mainContent}
            </RBACWrapper>,
            { mockAuth: true },
          );
          cy.get("#content").should("not.exist");
          cy.get("#alternate").should("be.visible");
        });
      });
    });

    describe("when using 'hideFrom'", () => {
      it("should NOT render the children when the role is matched", () => {
        cy.mount(
          <RBACWrapper
            hideFrom={[Role.AO_WRITE]}
            hasRole={cy
              .stub(AuthConfig, "hasRole")
              .as("hasRoleStub")
              .callsFake(() => false)}
          >
            {mainContent}
          </RBACWrapper>,
          { mockAuth: true },
        );
        cy.get("#content").should("exist");
      });

      it("should render the children when the role is NOT matched", () => {
        cy.mount(
          <RBACWrapper
            hideFrom={[Role.AO_WRITE]}
            hasRole={cy
              .stub(AuthConfig, "hasRole")
              .as("hasRoleStub")
              .callsFake(() => true)}
          >
            {mainContent}
          </RBACWrapper>,
          { mockAuth: true },
        );
        cy.get("#content").should("not.exist");
      });

      describe("when 'missingRoleContent' is provided and role is matched", () => {
        it("should render the alternate content", () => {
          cy.mount(
            <RBACWrapper
              hideFrom={[Role.AO_WRITE]}
              missingRoleContent={alternateContent}
              hasRole={cy
                .stub(AuthConfig, "hasRole")
                .as("hasRoleStub")
                .callsFake(() => true)}
            >
              {mainContent}
            </RBACWrapper>,
            { mockAuth: true },
          );
          cy.get("#content").should("not.exist");
          cy.get("#alternate").should("be.visible");
        });
      });
    });
  });
  describe("when authentication is disabled", () => {
    // for the app to think auth is disabled
    const runtimeConfig: IRuntimeConfig = {
      KC_CLIENT_ID: "",
      KC_REALM: "",
      KC_URL: "",
      AUTH: "false",
      SESSION_TIMEOUT: 0,
      OBSERVABILITY_URL: "",
      MFE: {
        APP_ORCH: "true",
        FM: "true",
        CLUSTER_ORCH: "true",
      },
      TITLE: "",
      API: {},
      VERSIONS: {},
      DOCUMENTATION: [],
    };
    it("should render children regardless of roles", () => {
      cy.mount(
        <RBACWrapper
          showTo={[Role.AO_WRITE]}
          hasRole={cy
            .stub(AuthConfig, "hasRole")
            .as("hasRoleStub")
            .callsFake(() => true)}
        >
          {mainContent}
        </RBACWrapper>,
        {
          runtimeConfig,
        },
      );
      cy.contains("Testing RBAC wrapper");
    });
  });
});
