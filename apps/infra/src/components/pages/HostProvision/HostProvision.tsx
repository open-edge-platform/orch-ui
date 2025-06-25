/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { ConfirmationDialog, Flex } from "@orch-ui/components";
import { hostsRoute, useInfraNavigate } from "@orch-ui/utils";
import {
  Button,
  ButtonGroup,
  Heading,
  MessageBanner,
  Stepper,
  StepperStep,
} from "@spark-design/react";
import { ButtonSize, ButtonVariant } from "@spark-design/tokens";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  goToNextStep,
  goToPrevStep,
  HostProvisionSteps,
  populateCommonHostData,
  reset,
  selectContainsHosts,
  selectHostProvisionState,
  selectNoChangesInHosts,
} from "../../../store/provisionHost";
import HostRegistrationAndProvisioningCancelDialog from "../../molecules/HostRegistrationAndProvisioningCancelDialog/HostRegistrationAndProvisioningCancelDialog";
import ConfigureAllHosts from "../../organism/ConfigureAllHosts/ConfigureAllHosts";
import ReviewAndCustomize from "../../organism/ReviewAndCustomize/ReviewAndCustomize";
import { useProvisioning } from "./host-provision.utils";
import "./HostProvision.scss";

const dataCy = "hostProvision";
const className = "host-provision";

const HostProvision = () => {
  const cy = { "data-cy": dataCy };

  const navigate = useInfraNavigate();
  const dispatch = useAppDispatch();

  const { provisionHosts } = useProvisioning();

  const [showContinueDialog, setShowContinueDialog] = useState<boolean>(false);
  const [showCommonDataDialog, setShowCommonDataDialog] =
    useState<boolean>(false);

  const steps: StepperStep[] = Object.keys(HostProvisionSteps)
    .filter((key) => !isNaN(Number(HostProvisionSteps[key])))
    .map((k) => {
      return { text: k };
    });

  const {
    hosts,
    autoProvision,
    autoOnboard,
    formStatus: { currentStep, enableNextBtn },
  } = useAppSelector(selectHostProvisionState);

  const containsHosts = useAppSelector(selectContainsHosts);
  const containsChangedHosts = !useAppSelector(selectNoChangesInHosts);

  const goToListPage = () => {
    dispatch(reset());
    navigate(hostsRoute);
  };

  const handleCancel = () => {
    if (autoProvision) {
      setShowContinueDialog(true);
    } else {
      goToListPage();
    }
  };

  const handlePrev = () => {
    if (containsChangedHosts) {
      setShowCommonDataDialog(true);
    } else {
      dispatch(goToPrevStep());
    }
  };

  const handleNext = async () => {
    switch (currentStep) {
      case HostProvisionSteps["Configure All Hosts"]:
        dispatch(populateCommonHostData());
        dispatch(goToNextStep());
        break;
      case HostProvisionSteps["Review and Customize"]:
        if (autoProvision) {
          await provisionHosts(Object.values(hosts), autoOnboard);
          navigate(hostsRoute);
        }
        break;
      default:
        dispatch(goToNextStep());
        break;
    }
  };

  const nextButtonText = () => {
    return currentStep === steps.length - 1 ? "Provision" : "Next";
  };

  if (!containsHosts) {
    return (
      <div {...cy} className={className}>
        <MessageBanner
          data-cy="missingHostMessage"
          variant="info"
          showActionButtons
          messageTitle="No Host has been selected for provisioning"
          messageBody="Please go to the Hosts page to select hosts."
          onClickPrimary={goToListPage}
          onClickSecondary={goToListPage}
        />
      </div>
    );
  }

  return (
    <div {...cy} className={className}>
      <Flex cols={[6, 6]}>
        <Heading semanticLevel={4}>Provision Hosts</Heading>
      </Flex>
      <Stepper
        steps={steps}
        activeStep={currentStep}
        data-cy="hostProvisionStepper"
        className={`${className}__stepper`}
      />
      <div className="formStep">
        {currentStep === HostProvisionSteps["Configure All Hosts"] && (
          <ConfigureAllHosts />
        )}
        {currentStep === HostProvisionSteps["Review and Customize"] && (
          <ReviewAndCustomize />
        )}
      </div>
      <div className={`${className}__btn_container`}>
        <ButtonGroup className={`${className}__buttons`}>
          <Button
            size={ButtonSize.Large}
            variant={ButtonVariant.Secondary}
            onPress={handleCancel}
          >
            Cancel
          </Button>
          {currentStep > 0 && (
            <Button
              data-cy="prev"
              size={ButtonSize.Large}
              variant={ButtonVariant.Secondary}
              onPress={handlePrev}
            >
              Previous
            </Button>
          )}
          <Button
            data-cy="next"
            size={ButtonSize.Large}
            onPress={handleNext}
            isDisabled={!enableNextBtn}
          >
            {nextButtonText()}
          </Button>
        </ButtonGroup>
      </div>
      {showContinueDialog && (
        <HostRegistrationAndProvisioningCancelDialog
          isOpen={showContinueDialog}
          onClose={() => setShowContinueDialog(false)}
        />
      )}
      {showCommonDataDialog && (
        <ConfirmationDialog
          title="Return to the configuration for all hosts?"
          content="Any customization made to individual hosts will be lost."
          isOpen={showCommonDataDialog}
          confirmBtnText="Continue Customization"
          confirmBtnVariant={ButtonVariant.Primary}
          cancelBtnText="Cancel Customization"
          cancelBtnVariant={ButtonVariant.Action}
          confirmCb={() => {
            setShowCommonDataDialog(false);
          }}
          cancelCb={() => {
            dispatch(goToPrevStep());
            setShowCommonDataDialog(false);
          }}
        />
      )}
    </div>
  );
};

export default HostProvision;
