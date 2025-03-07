/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { Button, Heading } from "@spark-design/react";
import { ButtonSize } from "@spark-design/tokens";
import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PageNotFound.scss";

export const PageNotFound = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getRootPath = useCallback(() => {
    const parts = location.pathname.split("/");

    // all paths containing more than two path segments means its MFE
    // (application under container), e.g. /app-orch/...
    // then they navigate to its own root path
    return parts.length > 2 ? `/${parts[1]}` : "/";
  }, [location]);

  const to = getRootPath();
  return (
    <div className="page-not-found" data-cy="pageNotFound">
      <div className="page-not-found__container">
        <Heading semanticLevel={1}>Page Not Found</Heading>
        <p>The page you are looking for doesn't exist.</p>

        <Button
          data-cy="home"
          style={{ marginLeft: "auto" }}
          onPress={() => navigate(to)}
          size={ButtonSize.Large}
        >
          Home
        </Button>
      </div>
    </div>
  );
};
