/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { catalog } from "@orch-ui/apis";
import { MessageBanner, Text } from "@spark-design/react";
import { TextSize } from "@spark-design/tokens";
import { useAppSelector } from "../../../../store/hooks";
import { setupDeploymentHasMandatoryParams } from "../../../../store/reducers/setupDeployment";
import OverrideProfileTable from "../../setup-deployments/OverrideProfileValues/OverrideProfileTable";
import "./DeploymentProfileForm.scss";

const dataCy = "DeploymentProfileForm";

export interface DeploymentProfileFormProps {
  selectedPackage?: catalog.DeploymentPackage;
  selectedProfile?: catalog.DeploymentProfile;
}

const DeploymentProfileForm = ({
  selectedPackage,
  selectedProfile,
}: DeploymentProfileFormProps) => {
  const cy = { "data-cy": dataCy };
  const hadMandatoryParams = useAppSelector(setupDeploymentHasMandatoryParams);

  return (
    <div
      {...cy}
      id="deployment-override-profile"
      className="deployment-override-profile"
    >
      <div className="deployment-profile-form__message">
        <Text size={TextSize.Large}>
          Configure applications with values that apply to this deployment only.
        </Text>
      </div>

      <div className="deployment-profile-form__description">
        <div>
          <Text size={TextSize.Large} className="package-name">
            Package Name
          </Text>
          <Text>{selectedPackage?.name || "-"}</Text>
        </div>
        <div>
          <Text size={TextSize.Large} className="profile">
            Profile
          </Text>
          <Text>{selectedProfile?.name || "-"}</Text>
        </div>
      </div>

      {hadMandatoryParams && (
        <MessageBanner
          messageTitle="Parameter value override required"
          messageBody="There are applications with mandatory parameters. Please fill all of them before continuing."
          variant="info"
        />
      )}

      <div className="override-profile-values-container">
        {selectedPackage && selectedProfile ? (
          <OverrideProfileTable
            selectedPackage={selectedPackage}
            selectedProfile={selectedProfile}
          />
        ) : (
          <div data-cy="DeploymentProfileFormError">
            <MessageBanner
              messageTitle="Error while creating deployment"
              messageBody="Deployment Package or Deployment Profile not selected"
              variant="error"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DeploymentProfileForm;
