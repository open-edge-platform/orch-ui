/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { getMockAuthProps, IRuntimeConfig } from "@orch-ui/utils";
import { AuthContext } from "react-oidc-context";
import { SessionTimeout } from "./SessionTimeout";

describe("SessionTimeout component", () => {
  describe("when authentication is enabled", () => {
    xit("should logout after timeout", () => {
      const runtimeConfig: IRuntimeConfig = {
        KC_CLIENT_ID: "",
        KC_REALM: "",
        KC_URL: "",
        AUTH: "true",
        SESSION_TIMEOUT: 0.1,
        OBSERVABILITY_URL: "",
        MFE: { APP_ORCH: "false", CLUSTER_ORCH: "false", INFRA: "false" },
        TITLE: "",
        API: {},
      };

      const providerProps = { ...getMockAuthProps({}) };
      cy.spy(providerProps, "signoutSilent").as("loggedOut");
      cy.mount(
        <AuthContext.Provider value={providerProps}>
          <SessionTimeout />
        </AuthContext.Provider>,
        { runtimeConfig },
      );
      cy.wait(150);
      cy.get("@loggedOut").should("have.been.called");
    });
    it("should disable timeout when value is 0", () => {
      const runtimeConfig: IRuntimeConfig = {
        KC_CLIENT_ID: "",
        KC_REALM: "",
        KC_URL: "",
        AUTH: "true",
        SESSION_TIMEOUT: 0,
        OBSERVABILITY_URL: "",
        MFE: { APP_ORCH: "false", CLUSTER_ORCH: "false", INFRA: "false" },
        TITLE: "",
        API: {},
      };

      const providerProps = { ...getMockAuthProps({}) };
      cy.spy(providerProps, "signoutSilent").as("loggedOut");
      cy.mount(
        <AuthContext.Provider value={providerProps}>
          <SessionTimeout />
        </AuthContext.Provider>,
        { runtimeConfig },
      );
      cy.get("body").click();
      cy.wait(150);
      cy.get("@loggedOut").should("have.not.been.called");
    });
  });
});
