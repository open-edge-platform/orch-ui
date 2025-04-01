/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  SessionStatus,
  User,
  UserManagerEvents,
  UserManagerSettings,
} from "oidc-client-ts";
import { AuthContextProps, AuthState } from "react-oidc-context";

interface args {
  authenticated?: boolean;
  loading?: boolean;
  profile?: { username?: string; name?: string };
}

export const getMockAuthProps = ({
  authenticated = true,
  loading = false,
  profile,
}: args): AuthContextProps => {
  const user: User = {
    access_token: "",
    expires_in: 30000,
    profile: {
      sub: "",
      iss: "",
      aud: "",
      exp: 0,
      iat: 0,
      preferred_username: profile?.username,
      name: profile?.name,
    },
    session_state: null,
    state: undefined,
    token_type: "",
    expired: undefined,
    scopes: [],
    toStorageString(): string {
      return "";
    },
  };

  const state: AuthState = {
    isAuthenticated: authenticated,
    isLoading: loading,
    user: user,
  };

  const settings: UserManagerSettings = {
    authority: "",
    client_id: "",
    redirect_uri: "",
  };

  const props: AuthContextProps = {
    ...state,
    events: {} as UserManagerEvents,
    isAuthenticated: authenticated,
    isLoading: loading,
    settings: settings,
    clearStaleState(): Promise<void> {
      return Promise.resolve(undefined);
    },
    querySessionStatus(): Promise<SessionStatus | null> {
      return Promise.resolve(null);
    },
    removeUser(): Promise<void> {
      return Promise.resolve(undefined);
    },
    revokeTokens(): Promise<void> {
      return Promise.resolve(undefined);
    },
    signinPopup(): Promise<User> {
      return Promise.resolve(user);
    },
    signinRedirect(): Promise<void> {
      return Promise.resolve(undefined);
    },
    signinSilent(): Promise<User | null> {
      return Promise.resolve(user);
    },
    signoutPopup(): Promise<void> {
      return Promise.resolve(undefined);
    },
    signoutRedirect(): Promise<void> {
      return Promise.resolve(undefined);
    },
    signoutSilent(): Promise<void> {
      return Promise.resolve(undefined);
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    startSilentRenew(): void {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    stopSilentRenew(): void {},
    signinResourceOwnerCredentials(): Promise<User> {
      return Promise.resolve(user);
    },
  };

  return props;
};
