/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { RuntimeConfig } from "@orch-ui/utils";
import { PropsWithChildren } from "react";
import { useAuth } from "react-oidc-context";
import { SquareSpinner } from "../SquareSpinner/SquareSpinner";
import "./AuthWrapper.scss";

export const authWrapperDataCy = "authWrapper";

export interface AuthWrapperProps {
  isAuthEnabled?: () => boolean;
}

export const AuthWrapper = ({
  children,
  // eslint-disable-next-line
  isAuthEnabled = RuntimeConfig.isAuthEnabled,
}: PropsWithChildren & AuthWrapperProps) => {
  const auth = useAuth();
  const cy = { "data-cy": authWrapperDataCy };
  const isAuthEnabledResult = RuntimeConfig.isAuthEnabled();

  switch (isAuthEnabledResult && auth.activeNavigator) {
    case "signinSilent":
      return <div>Signing you in...</div>;
    case "signoutRedirect":
      return <div>Signing you out...</div>;
  }

  if (isAuthEnabledResult && auth.isLoading) {
    return (
      <div className="lp-ui-loader__container" {...cy}>
        <div className="lp-ui-loader__box" data-cy="loader">
          <SquareSpinner />
        </div>
      </div>
    );
  }

  if (isAuthEnabledResult && auth.error) {
    auth.removeUser();
    auth.signinRedirect();
  }

  if (RuntimeConfig.isAuthEnabled() && !auth.isAuthenticated) {
    auth.signinRedirect({ redirect_uri: window.location.origin });
  }

  return <div {...cy}>{children}</div>;
};
