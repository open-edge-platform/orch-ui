/*
 * SPDX-FileCopyrightText: (C) 2026 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { Button, Heading, Icon } from "@spark-design/react";
import { ButtonSize } from "@spark-design/tokens";
import { useNavigate } from "react-router-dom";
import "./FeatureDisabled.scss";

export interface FeatureDisabledProps {
  featureName?: string;
}

export const FeatureDisabled = ({
  featureName = "This feature",
}: FeatureDisabledProps) => {
  const navigate = useNavigate();

  const to = "/dashboard";
  return (
    <div className="feature-disabled" data-cy="featureDisabled">
      <div className="feature-disabled__container">
        <Icon icon="gears" className="feature-disabled__icon" />
        <Heading semanticLevel={5}>Service Disabled</Heading>
        <p>{featureName} is currently disabled in your orchestrator.</p>

        <Button
          data-cy="home"
          onPress={() => navigate(to)}
          size={ButtonSize.Large}
        >
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
};
