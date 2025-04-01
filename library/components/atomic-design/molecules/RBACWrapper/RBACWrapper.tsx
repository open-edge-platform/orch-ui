/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { hasRole as hasRoleDefault, Role, RuntimeConfig } from "@orch-ui/utils";
import { useAuth } from "react-oidc-context";

export interface RBACWrapperBaseProps {
  children: JSX.Element | string;
  showTo?: Role[];
  hideFrom?: Role[];
  missingRoleContent?: JSX.Element | string;
  /* this prop should only be used to make test easy, in production component we should always rely on hasRoleDefault*/
  hasRole?: (roles: string[]) => boolean;
}

type RequireProperty<T, Prop extends keyof T> = T & { [key in Prop]-?: T[key] };
type RBACWrapperProps =
  | RequireProperty<RBACWrapperBaseProps, "showTo">
  | RequireProperty<RBACWrapperBaseProps, "hideFrom">;

/**
 * Component to control behavior of children component depending on current user's role
 *
 * @example
 * const showTo = [Role.LP_ADMIN, Role.WRITE_READ]
 * const children = <button>Configuration</button>
 * return (
 *   <RBACWrapper showTo={showTo}>{children}</RBACWrapper>
 * )
 */
export const RBACWrapper = ({
  children,
  showTo,
  hideFrom,
  missingRoleContent,
  hasRole = hasRoleDefault,
}: RBACWrapperProps): JSX.Element => {
  const { isAuthenticated } = useAuth();
  let content =
    (showTo && hasRole(showTo) && children) ||
    (hideFrom && !hasRole(hideFrom) && children);

  // if there is no content it means the user is not allowed to see it,
  // the if there is an alternative content, display it
  if (missingRoleContent && !content) {
    content = missingRoleContent;
  }

  return isAuthenticated ? (
    <>{content}</>
  ) : RuntimeConfig.isAuthEnabled() ? (
    <></>
  ) : (
    <>{children}</>
  );
};
