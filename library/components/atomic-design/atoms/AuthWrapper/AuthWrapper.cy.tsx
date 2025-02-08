/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { getMockAuthProps, RuntimeConfig } from "@orch-ui/utils";
import { AuthContext } from "react-oidc-context";
import { AuthWrapper } from "./AuthWrapper";
import { AuthWrapperPom } from "./AuthWrapper.pom";

const pom = new AuthWrapperPom();

const nestedContent = <p data-cy="nestedContent">Content</p>;

describe("The AuthWrapper component", () => {
  describe("when Auth is NOT enabled", () => {
    it("should render children", () => {
      cy.mount(
        <AuthWrapper
          isAuthEnabled={cy.stub(RuntimeConfig, "isAuthEnabled").returns(false)}
        >
          {nestedContent}
        </AuthWrapper>,
      );
      pom.el.nestedContent.should("be.visible");
    });
  });

  describe("when Auth is enabled", () => {
    it("should render a loader", () => {
      cy.mount(
        <AuthContext.Provider
          value={{ ...getMockAuthProps({ loading: true }) }}
        >
          <AuthWrapper
            isAuthEnabled={cy
              .stub(RuntimeConfig, "isAuthEnabled")
              .returns(true)}
          >
            {nestedContent}
          </AuthWrapper>
        </AuthContext.Provider>,
      );
      pom.el.loader.should("be.visible");
    });
    xit("should redirect to the login page", () => {
      const mockAuth = getMockAuthProps({
        loading: false,
        authenticated: false,
      });
      cy.stub(mockAuth, "signinRedirect").as("signinRedirect").returns(true);
      cy.mount(
        <AuthContext.Provider value={{ ...mockAuth }}>
          <AuthWrapper>{nestedContent}</AuthWrapper>
        </AuthContext.Provider>,
      );
      cy.get("@signinRedirect").should("have.been.called");
    });
    it("should render childer", () => {
      cy.mount(
        <AuthContext.Provider
          value={{ ...getMockAuthProps({ authenticated: true }) }}
        >
          <AuthWrapper>{nestedContent}</AuthWrapper>
        </AuthContext.Provider>,
      );
      pom.el.nestedContent.should("be.visible");
    });
  });
});
