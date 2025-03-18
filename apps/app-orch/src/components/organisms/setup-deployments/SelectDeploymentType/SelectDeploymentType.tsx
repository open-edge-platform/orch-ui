/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { RadioCard } from "@orch-ui/components";
import { RadioGroup, Text } from "@spark-design/react";
import { RadioButtonSize, RadioGroupOrientation } from "@spark-design/tokens";
import { DeploymentType } from "../../../pages/SetupDeployment/SetupDeployment";
import "./SelectDeploymentType.scss";

const dataCy = "selectDeploymentType";
interface SelectDeploymentTypeProps {
  type: DeploymentType;
  setType: (type: DeploymentType) => void;
}

const SelectDeploymentType = ({ type, setType }: SelectDeploymentTypeProps) => {
  const cy = { "data-cy": dataCy };
  return (
    <div {...cy} className="select-deployment-type">
      <Text size="l">Select a Deployment Type</Text>
      <div className="selections">
        <RadioGroup
          onChange={(value) => setType(value as DeploymentType)}
          size={RadioButtonSize.Large}
          orientation={RadioGroupOrientation.horizontal}
          defaultValue={type}
        >
          <RadioCard
            value={DeploymentType.AUTO}
            label="Automatic"
            description={
              <>
                <p>
                  Deploy to clusters with metadata that matches the package's
                  deployment metadata.
                </p>
                <p>
                  As new clusters are added, the package will automatically
                  deploy to any that meet the criteria.
                </p>
              </>
            }
            dataCy="radioCardAutomatic"
          />
          <RadioCard
            value={DeploymentType.MANUAL}
            label="Manual"
            description="Select clusters to deploy the package to."
            dataCy="radioCardManual"
          />
        </RadioGroup>
      </div>
    </div>
  );
};

export default SelectDeploymentType;
