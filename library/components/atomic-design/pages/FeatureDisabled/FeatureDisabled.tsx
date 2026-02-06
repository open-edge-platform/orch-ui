/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { Button, Heading } from "@spark-design/react";
import { ButtonSize } from "@spark-design/tokens";
import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./FeatureDisabled.scss";

export interface FeatureDisabledProps {
  featureName?: string;
}

export const FeatureDisabled = ({
  featureName = "This feature",
}: FeatureDisabledProps) => {
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
    <div className="feature-disabled" data-cy="featureDisabled">
      <div className="feature-disabled__container">
        <Heading semanticLevel={1}>Service Disabled</Heading>
        <p>{featureName} is currently disabled.</p>

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
