/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

// eslint-disable-next-line @typescript-eslint/triple-slash-reference
///<reference path="../index.d.ts"/>

import { User } from "oidc-client-ts";
import { AuthProviderProps, useAuth } from "react-oidc-context";
import { Role } from "../interfaces/Role";
import { RuntimeConfig } from "../runtime-config/runtime-config";
import { SharedStorage } from "../shared-storage/shared-storage";

export const authority = `${
  window.__RUNTIME_CONFIG__
    ? window.__RUNTIME_CONFIG__.KC_URL
    : window.location.origin
}/realms/${
  window.__RUNTIME_CONFIG__ ? window.__RUNTIME_CONFIG__.KC_REALM : "master"
}`;

export const getAuthCfg = (): AuthProviderProps => {
  // if auth is not enabled we simply don't configure the auth library
  if (!RuntimeConfig.isAuthEnabled()) {
    return {};
  }

  return {
    authority: authority,
    client_id: window.__RUNTIME_CONFIG__
      ? window.__RUNTIME_CONFIG__.KC_CLIENT_ID
      : "ui",
    redirect_uri: window.location.href,
    onSigninCallback: () => {
      window.history.replaceState({}, document.title, window.location.pathname);
    },
    automaticSilentRenew: true,
  };
};

// only to be used outside components
export const getUserToken = (): string | null => {
  const oidcStorage = sessionStorage.getItem(
    `oidc.user:${authority}:${
      window.__RUNTIME_CONFIG__ ? window.__RUNTIME_CONFIG__.KC_CLIENT_ID : "ui"
    }`,
  );
  if (!oidcStorage) {
    return null;
  }

  return User.fromStorageString(oidcStorage).access_token;
};

export const hasRole = (roles: string[]): boolean => {
  return true;
  // return roles.some((role) => hasRealmRole(role));
};

export const hasRealmRole = (role: string): boolean => {
  const token = getUserToken();
  if (!token) {
    return false;
  }
  const decoded = decodeToken(token);

  // If realm_access is not present in token, implies that no roles are available
  if (!decoded.realm_access) return false;

  // Some roles are prefixed with the OrgID, but the UI does not have access to it.
  // For those roles just compare the suffix, we can assume a user belongs to a single org.
  const orgRoles = [
    Role.PROJECT_WRITE,
    Role.PROJECT_READ,
    Role.PROJECT_DELETE,
    Role.PROJECT_UPDATE,
  ] as string[];
  if (orgRoles.indexOf(role) >= 0) {
    return decoded.realm_access.roles.some((r) => r.endsWith(role));
  }

  const currentProject = SharedStorage.project;
  /*
   * roles in multitenancy follows projectId_<role> format. Eg: 123_alerts-read-role
   */
  const userProjectRole =
    currentProject &&
    decoded.realm_access.roles.indexOf(`${currentProject.uID}_${role}`) >= 0;

  const userRole = decoded.realm_access.roles.indexOf(role) >= 0;

  return userProjectRole || userRole;
};

/**
 * Function to return if current user's role is one of the required roles
 * @param {Role[]}
 * @returns {boolean}
 */
export const checkAuthAndRole = (roles: Role[]): boolean => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? hasRole(roles) : true;
};

// from https://github.com/keycloak/keycloak/blob/main/js/libs/keycloak-js/dist/keycloak.d.ts
interface KeycloakResourceAccess {
  [key: string]: KeycloakRoles;
}

interface KeycloakRoles {
  roles: string[];
}
interface KeycloakTokenParsed {
  iss?: string;
  sub?: string;
  aud?: string;
  exp?: number;
  iat?: number;
  auth_time?: number;
  nonce?: string;
  acr?: string;
  amr?: string;
  azp?: string;
  session_state?: string;
  realm_access?: KeycloakRoles;
  resource_access?: KeycloakResourceAccess;
  [key: string]: any; // Add other attributes here.
}
export function decodeToken(str: string): KeycloakTokenParsed {
  str = str.split(".")[1];

  str = str.replace(/-/g, "+");
  str = str.replace(/_/g, "/");
  switch (str.length % 4) {
    case 0:
      break;
    case 2:
      str += "==";
      break;
    case 3:
      str += "=";
      break;
    default:
      throw "Invalid token";
  }

  str = decodeURIComponent(escape(atob(str)));

  return JSON.parse(str);
}
