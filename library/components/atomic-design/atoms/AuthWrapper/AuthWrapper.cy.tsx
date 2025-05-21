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
    let mockAuth: ReturnType<typeof getMockAuthProps>;

    beforeEach(() => {
      cy.stub(RuntimeConfig, "isAuthEnabled").returns(true);
    });

    describe("when loading is true", () => {
      beforeEach(() => {
        mockAuth = getMockAuthProps({ loading: true });

        cy.mount(
          <AuthContext.Provider value={mockAuth}>
            <AuthWrapper>{nestedContent}</AuthWrapper>
          </AuthContext.Provider>,
        );
      });

      it("should render a loader", () => {
        pom.el.loader.should("be.visible");
      });
    });

    describe("when unauthenticated", () => {
      beforeEach(() => {
        mockAuth = getMockAuthProps({ loading: false, authenticated: false });
      });

      it("should redirect to the login page", () => {
        cy.stub(mockAuth, "signinRedirect").as("signinRedirect");

        cy.mount(
          <AuthContext.Provider value={mockAuth}>
            <AuthWrapper>{nestedContent}</AuthWrapper>
          </AuthContext.Provider>,
        );

        cy.get("@signinRedirect").should("have.been.called");
      });

      it("should show 'Signing you in...' if navigator is signinSilent", () => {
        mockAuth = {
          ...mockAuth,
          activeNavigator: "signinSilent",
        };

        cy.mount(
          <AuthContext.Provider value={mockAuth}>
            <AuthWrapper>{nestedContent}</AuthWrapper>
          </AuthContext.Provider>,
        );

        cy.contains("Signing you in...").should("be.visible");
      });

      it("should show 'Signing you out...' if navigator is signoutRedirect", () => {
        mockAuth = {
          ...mockAuth,
          activeNavigator: "signoutRedirect",
        };

        cy.mount(
          <AuthContext.Provider value={mockAuth}>
            <AuthWrapper>{nestedContent}</AuthWrapper>
          </AuthContext.Provider>,
        );

        cy.contains("Signing you out...").should("be.visible");
      });

      it("should call removeUser when auth has an error", () => {
        const removeUser = cy.stub().as("removeUser");

        mockAuth = {
          ...mockAuth,
          error: new Error("Auth failed"),
          removeUser,
        };

        cy.mount(
          <AuthContext.Provider value={mockAuth}>
            <AuthWrapper>{nestedContent}</AuthWrapper>
          </AuthContext.Provider>,
        );

        cy.get("@removeUser").should("have.been.calledOnce");
      });
    });

    describe("when authenticated", () => {
      beforeEach(() => {
        mockAuth = getMockAuthProps({ authenticated: true });
      });

      it("should render children", () => {
        cy.mount(
          <AuthContext.Provider value={mockAuth}>
            <AuthWrapper>{nestedContent}</AuthWrapper>
          </AuthContext.Provider>,
        );

        pom.el.nestedContent.should("be.visible");
      });

      it("should not call signinRedirect", () => {
        cy.stub(mockAuth, "signinRedirect").as("signinRedirect");

        cy.mount(
          <AuthContext.Provider value={mockAuth}>
            <AuthWrapper>{nestedContent}</AuthWrapper>
          </AuthContext.Provider>,
        );

        cy.get("@signinRedirect").should("not.have.been.called");
      });
    });

    describe("attribute tests", () => {
      it("should have the correct data-cy attribute", () => {
        cy.mount(
          <AuthWrapper isAuthEnabled={cy.stub().returns(true)}>
            {nestedContent}
          </AuthWrapper>,
        );
        cyGet("authWrapper").should("exist");
      });
    });
  });
});
