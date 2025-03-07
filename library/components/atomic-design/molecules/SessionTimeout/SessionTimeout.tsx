/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { getSessionTimeout } from "@orch-ui/utils";
import { useCallback, useEffect, useRef, useState } from "react";
import { useAuth } from "react-oidc-context";

export const SessionTimeout = () => {
  const sessionTimeout = getSessionTimeout();

  const [events] = useState(["click", "load", "scroll"]);

  const timeoutHandler = useRef<NodeJS.Timeout>();

  const { isAuthenticated, signoutRedirect } = useAuth();

  const resetTimer = useCallback(() => {
    if (isAuthenticated) {
      timeChecker();
    } else {
      if (timeoutHandler.current) {
        clearTimeout(timeoutHandler.current);
      }
    }
  }, [isAuthenticated]);

  const timeChecker = () => {
    if (sessionTimeout === 0) {
      return;
    }
    if (timeoutHandler.current) {
      clearTimeout(timeoutHandler.current);
    }
    timeoutHandler.current = setTimeout(() => {
      //Always kick back to Keycloak if idle time expires
      signoutRedirect({ post_logout_redirect_uri: window.location.origin });
    }, sessionTimeout * 1000);
  };

  useEffect(() => {
    events.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });
    timeChecker();
  }, [resetTimer]);

  return <></>;
};
