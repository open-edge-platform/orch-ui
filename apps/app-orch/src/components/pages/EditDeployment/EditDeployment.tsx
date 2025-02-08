/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { adm, catalog } from "@orch-ui/apis";
import { Empty, setActiveNavItem, setBreadcrumb } from "@orch-ui/components";
import { SharedStorage } from "@orch-ui/utils";
import {
  Button,
  ButtonGroup,
  Heading,
  ProgressLoader,
  Stepper,
  StepperStep,
} from "@spark-design/react";
import {
  ButtonGroupAlignment,
  ButtonSize,
  ButtonVariant,
} from "@spark-design/tokens";
import { ReactElement, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  deploymentBreadcrumb,
  deploymentsNavItem,
  homeBreadcrumb,
} from "../../../routes/const";
import { useAppDispatch } from "../../../store/hooks";
import ChangePackageProfile from "../../organisms/edit-deployments/ChangePackageProfile/ChangePackageProfile";
import "./EditDeployment.scss";

export const dataCy = "editDeployment";

type params = {
  id: string;
};

enum EditDeploymentSteps {
  "Change Package Profile",
  "Override Profile Values",
  "Change Deployment Details",
  "Review",
}

const EditDeployment = () => {
  const cy = { "data-cy": dataCy };
  const className = "edit-deployment";
  const projectName = SharedStorage.project?.name ?? "";

  const { id } = useParams<keyof params>();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Stepper: Overall state controls
  const [currentStep, setCurrentStep] = useState(0);
  const [stepJsx, setStepJsx] = useState<ReactElement | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isNextDisabled, setIsNextDisabled] = useState<boolean>(false);
  // This will disable click on final step's `Edit` button until api reponds back with a failure for retry
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const [availableSteps, setAvailableSteps] = useState<number[]>([]);
  const [steps, setSteps] = useState<StepperStep[]>([]);

  const {
    data: apiDeployment,
    isSuccess: isDeploymentSuccess,
    isLoading: isDeploymentLoading,
    isError: isDeploymentError,
  } = adm.useDeploymentServiceGetDeploymentQuery(
    {
      projectName,
      deplId: id!,
    },
    {
      skip: !SharedStorage.project?.name || !id,
    },
  );

  let deploymentIdBreadcrumb = { text: "Getting deployment...", link: "#" };
  if (
    isDeploymentSuccess &&
    apiDeployment &&
    apiDeployment.deployment &&
    apiDeployment.deployment.name
  ) {
    deploymentIdBreadcrumb = {
      text:
        apiDeployment.deployment.displayName ?? apiDeployment.deployment.name,
      link: `deployment/${apiDeployment.deployment.deployId}`,
    };
  }

  const breadcrumb = [
    homeBreadcrumb,
    deploymentBreadcrumb,
    deploymentIdBreadcrumb,
    {
      text: "Edit Deployment",
      link: "#",
    },
  ];

  useEffect(() => {
    dispatch(setBreadcrumb(breadcrumb));
    dispatch(setActiveNavItem(deploymentsNavItem));
  }, [breadcrumb]);

  // Step 1: Change Package Profile
  const [currentPackageProfile, setCurrentPackageProfile] =
    useState<catalog.DeploymentProfile | null>(null);

  // Step 2: Override Profile Values

  // Step 3: Change Deployment Details

  // Step 4: Review

  useEffect(() => {
    const steps = Object.keys(EditDeploymentSteps)
      // filter out the reverse mappings of enums in typescript
      .filter((key) => !isNaN(Number(key)));
    setSteps(
      steps
        // create step using enum values
        .map((key) => ({ text: EditDeploymentSteps[Number(key)] })),
    );
    setAvailableSteps(steps.map((key) => Number(key)));
  }, []);

  useEffect(() => {
    if (!isDeploymentSuccess || !apiDeployment) return;
    let nextJsx: ReactElement | null = null;
    switch (availableSteps[currentStep]) {
      case EditDeploymentSteps["Change Package Profile"]:
        nextJsx = (
          <ChangePackageProfile
            deployment={apiDeployment.deployment}
            selectedProfile={currentPackageProfile ?? undefined}
            onProfileSelect={setCurrentPackageProfile}
          />
        );
        break;
      case EditDeploymentSteps["Override Profile Values"]:
        nextJsx = <div>Override Profile Values</div>;
        break;
      case EditDeploymentSteps["Change Deployment Details"]:
        nextJsx = <div>Change Deployment Details</div>;
        break;
      case EditDeploymentSteps["Review"]:
        nextJsx = <div>Review</div>;
        break;
    }
    if (nextJsx !== null) {
      setStepJsx(nextJsx);
    }
  }, [availableSteps, currentStep, apiDeployment, isDeploymentSuccess]);

  // Rendering Logic
  if (isDeploymentLoading) {
    return <ProgressLoader variant="circular" />;
  }

  if (isDeploymentError || !apiDeployment) {
    return (
      <>
        <Empty
          dataCy="error"
          icon="cross"
          title="Facing error in getting the deployment for edit!"
        />
      </>
    );
  }

  // if isSuccess
  const deployment = apiDeployment.deployment;

  const edit = async (): Promise<void> => {
    setIsEditing(true);
    // TODO: edit api calls here
    setIsEditing(false);
  };

  return (
    <div {...cy} className={className}>
      <Heading className={`${className}__title`} semanticLevel={1} size="l">
        Edit Deployment
      </Heading>
      <Stepper
        className={`${className}__stepper`}
        steps={steps}
        activeStep={currentStep}
        data-cy="stepper"
      />
      <div className={`${className}__content`}>{stepJsx}</div>
      <ButtonGroup
        className={`${className}__actions`}
        align={ButtonGroupAlignment.End}
      >
        <Button
          size={ButtonSize.Large}
          variant={ButtonVariant.Primary}
          onPress={() =>
            navigate(`/applications/deployment/${deployment.deployId}`)
          }
        >
          Cancel
        </Button>
        {currentStep > 0 && (
          <Button
            size={ButtonSize.Large}
            variant={ButtonVariant.Primary}
            onPress={() => setCurrentStep(currentStep - 1)}
          >
            Previous
          </Button>
        )}

        <Button
          data-cy="nextBtn"
          size={ButtonSize.Large}
          isDisabled={isNextDisabled || isEditing}
          onPress={() => {
            if (availableSteps[currentStep] === EditDeploymentSteps["Review"]) {
              edit();
            } else {
              setCurrentStep(currentStep + 1);
            }
          }}
        >
          {availableSteps[currentStep] === EditDeploymentSteps["Review"]
            ? "Edit"
            : "Next"}
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default EditDeployment;
