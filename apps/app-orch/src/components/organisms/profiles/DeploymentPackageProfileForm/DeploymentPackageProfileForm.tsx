/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { Button, Heading, MessageBanner } from "@spark-design/react";
import {
  ButtonSize,
  ButtonVariant,
  HeaderSize,
  MessageBannerAlertState,
} from "@spark-design/tokens";
import { useState } from "react";
import DeploymentPackageProfileAddEditDrawer from "../DeploymentPackageProfileAddEditDrawer/DeploymentPackageProfileAddEditDrawer";
import DeploymentPackageProfilesList from "../DeploymentPackageProfileList/DeploymentPackageProfileList";
import "./DeploymentPackageProfileForm.scss";

export const dataCy = "deploymentPackageProfileForm";

const DeploymentPackageProfileForm = () => {
  const cy = { "data-cy": dataCy };
  const [showProfileDrawer, setShowProfileDrawer] = useState<boolean>(false);

  return (
    <div {...cy} className="deployment-package-profile-form">
      <Heading semanticLevel={4} size={HeaderSize.Medium}>
        Deployment Package Profile
      </Heading>
      <div
        id="composite-profile"
        className="deployment-package-profile-form__body"
      >
        <MessageBanner
          messageBody="Create a new deployment profile to customize the application profiles used for this package. If no custom profile is created, default profiles will be applied."
          variant={MessageBannerAlertState.Info}
          messageTitle=""
          size="s"
          showIcon
          outlined
        />
        <div className="add-profile-btn">
          <Button
            onPress={() => setShowProfileDrawer(true)}
            size={ButtonSize.Large}
            variant={ButtonVariant.Secondary}
          >
            Add Profile
          </Button>
        </div>

        <DeploymentPackageProfileAddEditDrawer
          show={showProfileDrawer}
          onClose={() => setShowProfileDrawer(false)}
        />

        <DeploymentPackageProfilesList />
      </div>
    </div>
  );
};

export default DeploymentPackageProfileForm;
