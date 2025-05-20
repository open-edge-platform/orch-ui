/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { cyGet } from "@orch-ui/tests";
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
    it("should redirect to the login page", () => {
      const mockAuth = getMockAuthProps({
        loading: false,
        authenticated: false,
      });
      cy.stub(mockAuth, "signinRedirect").as("signinRedirect");
      cy.mount(
        <AuthContext.Provider value={{ ...mockAuth }}>
          <AuthWrapper
            isAuthEnabled={cy
              .stub(RuntimeConfig, "isAuthEnabled")
              .returns(true)}
          >
            {nestedContent}
          </AuthWrapper>
        </AuthContext.Provider>,
      );
      cy.get("@signinRedirect").should("have.been.called");
    });
    it("should render children", () => {
      cy.mount(
        <AuthContext.Provider
          value={{ ...getMockAuthProps({ authenticated: true }) }}
        >
          <AuthWrapper>{nestedContent}</AuthWrapper>
        </AuthContext.Provider>,
      );
      pom.el.nestedContent.should("be.visible");
    });
    it("should have the correct data-cy attribute", () => {
      cy.mount(
        <AuthWrapper isAuthEnabled={cy.stub().returns(true)}>
          {nestedContent}
        </AuthWrapper>,
      );
      cyGet("authWrapper").should("exist");
    });
    it("should not call signinRedirect if user is already authenticated", () => {
      const mockAuth = getMockAuthProps({
        loading: false,
        authenticated: true,
      });
      cy.stub(mockAuth, "signinRedirect").as("signinRedirect").returns(true);
      cy.mount(
        <AuthContext.Provider value={{ ...mockAuth }}>
          <AuthWrapper isAuthEnabled={cy.stub().returns(true)}>
            {nestedContent}
          </AuthWrapper>
        </AuthContext.Provider>,
      );
      cy.get("@signinRedirect").should("not.have.been.called");
    });
    it("should display 'Signing you in...' when auth is in signinSilent mode", () => {
      const mockAuth = {
        ...getMockAuthProps({
          loading: false,
          authenticated: false,
        }),
        activeNavigator: "signinSilent" as const,
      };

      cy.stub(RuntimeConfig, "isAuthEnabled").returns(true);

      cy.mount(
        <AuthContext.Provider value={mockAuth}>
          <AuthWrapper>
            <p>{nestedContent}</p>
          </AuthWrapper>
        </AuthContext.Provider>,
      );

      cy.contains("Signing you in...").should("be.visible");
    });
    it("should display 'Signing you out...' when auth is in signoutRedirect mode", () => {
      const mockAuth = {
        ...getMockAuthProps({
          loading: false,
          authenticated: false,
        }),
        activeNavigator: "signoutRedirect" as const,
      };

      cy.stub(RuntimeConfig, "isAuthEnabled").returns(true);

      cy.mount(
        <AuthContext.Provider value={mockAuth}>
          <AuthWrapper>
            <p>{nestedContent}</p>
          </AuthWrapper>
        </AuthContext.Provider>,
      );

      cy.contains("Signing you out...").should("be.visible");
    });
    it("should call removeUser when auth has an error", () => {
      const removeUser = cy.stub().as("removeUser");

      const mockAuth = {
        ...getMockAuthProps({
          loading: false,
          authenticated: false,
        }),
        error: new Error("Auth failed"),
        removeUser,
      };

      cy.stub(RuntimeConfig, "isAuthEnabled").returns(true);

      cy.mount(
        <AuthContext.Provider value={mockAuth}>
          <AuthWrapper>
            <p>{nestedContent}</p>
          </AuthWrapper>
        </AuthContext.Provider>,
      );

      cy.get("@removeUser").should("have.been.calledOnce");
    });
  });
});
