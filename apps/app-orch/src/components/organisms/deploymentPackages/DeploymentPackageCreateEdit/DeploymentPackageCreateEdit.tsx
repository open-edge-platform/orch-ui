/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { catalog } from "@orch-ui/apis";
import { ConfirmationDialog } from "@orch-ui/components";
import {
  checkAuthAndRole,
  parseError,
  Role,
  SharedStorage,
} from "@orch-ui/utils";
import {
  Button,
  ButtonGroup,
  Heading,
  Stepper,
  StepperStep,
  ToastProps,
} from "@spark-design/react";
import {
  ButtonGroupAlignment,
  ButtonSize,
  ButtonVariant,
  ToastPosition,
  ToastState,
  ToastVisibility,
} from "@spark-design/tokens";
import isEqual from "lodash/isEqual";
import startCase from "lodash/startCase";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  clearDeploymentPackage,
  clearProfileData,
  selectDeploymentPackage,
  selectDeploymentPackageProfiles,
  setApplicationReferences,
} from "../../../../store/reducers/deploymentPackage";
import { setProps } from "../../../../store/reducers/toast";
import ApplicationTable from "../../applications/ApplicationTable/ApplicationTable";
import DeploymentPackageProfileForm from "../../profiles/DeploymentPackageProfileForm/DeploymentPackageProfileForm";
import DeploymentPackageCreateEditReview from "../DeploymentPackageCreateEditReview/DeploymentPackageCreateEditReview";
import DeploymentPackageCreateGeneral from "../DeploymentPackageGeneralInfoForm/DeploymentPackageGeneralInfoForm";
import "./DeploymentPackageCreateEdit.scss";

export const dataCy = "deploymentPackageCreateEdit";

export type PackageInputs = {
  name: string;
  version: string;
};

export type DeploymentPackageCreateMode = "add" | "update" | "clone";

interface DeploymentPackageCreateEditProps {
  /** Verb mode ("add" | "update" | "clone") of the composite application form. */
  mode: DeploymentPackageCreateMode;
}

export const noProfileErrorMessage =
  "This application does not have profiles defined.";

export const removeEmptyApplicationProfiles = (
  deploymentPackage: catalog.DeploymentPackage,
) => {
  const { profiles } = deploymentPackage;
  const updatedProfiles: catalog.DeploymentProfile[] = [];

  if (profiles)
    profiles.forEach((profile) => {
      const { applicationProfiles } = profile;
      const updatedApplicationProfiles: any = {};
      Object.keys(applicationProfiles).forEach((value: string) => {
        if (applicationProfiles[value] !== noProfileErrorMessage)
          updatedApplicationProfiles[value] = applicationProfiles[value];
      });
      updatedProfiles.push({
        ...profile,
        applicationProfiles: updatedApplicationProfiles,
      });
    });

  const updatedDeploymentPackage = {
    ...deploymentPackage,
    profiles: updatedProfiles,
  };

  return updatedDeploymentPackage;
};

const DeploymentPackageCreateEdit = ({
  mode,
}: DeploymentPackageCreateEditProps) => {
  const cy = { "data-cy": dataCy };
  const toastProps: ToastProps = {
    state: ToastState.Success,
    visibility: ToastVisibility.Hide,
    position: ToastPosition.TopRight,
    duration: 10000,
  };

  /** Step details */
  const steps: StepperStep[] = [
    {
      text: "General Information",
    },
    {
      text: "Applications",
    },
    {
      text: "Add Profiles",
    },
    {
      text: "Review",
    },
  ];

  // Hooks
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // State Management: General CreateEdit-DeploymentPackage level
  const [step, setStep] = useState<number>(0);
  const [previousButtonDisable, setPreviousButtonDisable] =
    useState<boolean>(false);

  // State management: Deployment Package details (redux)
  const deploymentPackage = useAppSelector(selectDeploymentPackage);
  const { applicationReferences } = useAppSelector(
    (state) => state.deploymentPackage,
  );
  const deploymentPackageProfiles = useAppSelector(
    selectDeploymentPackageProfiles,
  );

  // State management: Step1 - Deployment Package form (name, version) & publisher controller
  const {
    control,
    formState: { errors, isValid },
  } = useForm<PackageInputs>({
    mode: "all",
    defaultValues: {
      name: deploymentPackage.displayName,
      version: deploymentPackage.version,
    },
  });

  // Api Settings: Create & Edit Mutation APIs
  const [createDeploymentPackage] =
    catalog.useCatalogServiceCreateDeploymentPackageMutation();
  const [editDeploymentPackage] =
    catalog.useCatalogServiceUpdateDeploymentPackageMutation();

  /** Indicate the message by verb mode */
  const getModeTitle = (mode: DeploymentPackageCreateMode): string => {
    let title: string;
    switch (mode) {
      case "clone":
        title = mode;
        break;
      case "update":
        title = "edit";
        break;
      case "add":
      default:
        title = "create";
        break;
    }
    return startCase(title);
  };

  // Step-2
  // State Management: Step2 - Generate default selected application rows
  const [selectedApps, setSelectedApps] = useState<
    catalog.ApplicationReference[]
  >(deploymentPackage.applicationReferences);
  // This shows warning of profile deletion upon application step change
  const [showProfilesWarning, setShowProfilesWarning] =
    useState<boolean>(false);
  const getIdFromRow = (
    app: catalog.Application | catalog.ApplicationReference,
  ) => `${app.name}@${app.version}`;
  useEffect(() => {
    // If `update/edit` or `clone` make default selection using previous selection
    if (mode !== "add" && selectedApps.length === 0)
      setSelectedApps(applicationReferences);
  }, [applicationReferences]);
  /** Step-2: Returns true if app selection was changed from
   *  previous package creation or return from application step proceed.
   * (Likely from edit or jumping back from next steps with previous).
   * Else return false.
   **/
  const changedAppsSelection = (apps: catalog.ApplicationReference[]) => {
    if (selectedApps.length === 0) {
      return false;
    }
    return (
      selectedApps.length != apps.length ||
      !selectedApps.every((element, index) => isEqual(element, apps[index]))
    );
  };
  /** Step-2: Process `Application table selections` and move to `Step-3:Profile creation` */
  const processToStep2 = (selectedApps: catalog.ApplicationReference[]) => {
    dispatch(setApplicationReferences(selectedApps));
    setStep(2);
  };

  // Final Step
  /** Final step: Indicate the message by verb mode */
  const modeToVerb = (mode: DeploymentPackageCreateMode): string => {
    return {
      add: "added",
      clone: "cloned",
      update: "updated",
    }[mode];
  };
  /** Final step: This will save (Create & Edit) Deployment Package after step competion */
  const saveDeploymentPackage = async () => {
    let p;
    if (["add", "clone"].includes(mode)) {
      //Check if applications don't have profile, if so, empty them out

      const updatedDeploymentPackage =
        removeEmptyApplicationProfiles(deploymentPackage);

      p = createDeploymentPackage({
        projectName: SharedStorage.project?.name ?? "",
        deploymentPackage: updatedDeploymentPackage,
      }).unwrap();
    } else {
      p = editDeploymentPackage({
        projectName: SharedStorage.project?.name ?? "",
        deploymentPackageName: deploymentPackage.name,
        version: deploymentPackage.version,
        deploymentPackage: deploymentPackage,
      }).unwrap();
    }

    p.then(() => {
      dispatch(
        setProps({
          ...toastProps,
          state: ToastState.Success,
          message: `Deployment Package ${modeToVerb(
            mode,
          )}, redirecting you back to Deployment Packages page...`,
          visibility: ToastVisibility.Show,
        }),
      );
      // currently, cannot use onHide callback of Toast because Layout.tsx is using it to control visibility
      setTimeout(() => {
        dispatch(clearDeploymentPackage());
        navigate("../packages");
      }, 1000);

      setPreviousButtonDisable(true);
    }).catch((err) => {
      const e = parseError(err);
      if (e.status === 401 || e.status === 403) {
        dispatch(
          setProps({
            ...toastProps,
            state: ToastState.Danger,
            message:
              "You are not authorized to perform this action. Please contact the administrator.",
            visibility: ToastVisibility.Show,
          }),
        );
      } else {
        dispatch(
          setProps({
            ...toastProps,
            state: ToastState.Danger,
            message: e.data,
            visibility: ToastVisibility.Show,
          }),
        );
      }
    });
  };

  return (
    <div className="deployment-package-create-edit" {...cy}>
      <Heading semanticLevel={1} size="l">
        {/** Display title with different mode ("add" | "update" | "clone") */}
        {getModeTitle(mode)} Deployment Package
      </Heading>
      <Stepper data-cy="dpCreateEditStepper" steps={steps} activeStep={step} />

      {/** Step-1: General Deployment Package information. */}
      {step === 0 && (
        <div>
          <DeploymentPackageCreateGeneral
            control={control}
            errors={errors}
            mode={mode}
          />
          <ButtonGroup
            className="deployment-package-create-edit__footer"
            align={ButtonGroupAlignment.End}
          >
            <Button
              onPress={() => {
                navigate("../packages");
                dispatch(clearDeploymentPackage());
              }}
              size={ButtonSize.Large}
              variant={ButtonVariant.Secondary}
              data-cy="cancelBtn"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              onPress={() => {
                if (isValid) {
                  setStep(1);
                }
              }}
              size={ButtonSize.Large}
              isDisabled={!isValid}
              data-cy="step0NextBtn"
            >
              Next
            </Button>
          </ButtonGroup>
        </div>
      )}

      {/** Step-2: Application Selections */}
      {step === 1 && (
        <div>
          <Heading semanticLevel={5}>Applications</Heading>
          <ApplicationTable
            canSelect
            isShownByDrawer
            selectedIds={selectedApps.map(getIdFromRow)}
            hasPermission={checkAuthAndRole([Role.CATALOG_WRITE])}
            onSelect={(row, isSelected) => {
              const rowId = getIdFromRow(row); // you can also use the unused var `rowIndex` here...
              setSelectedApps((prev) => {
                if (isSelected) {
                  return prev.concat(row);
                }
                return prev.filter(
                  (selectedRow) => getIdFromRow(selectedRow) !== rowId,
                );
              });
            }}
            kind={deploymentPackage.kind ?? "KIND_NORMAL"}
          />
          <div className="deployment-package-create-edit__footer">
            <Button
              onPress={() => {
                navigate("../packages");
                dispatch(clearDeploymentPackage());
              }}
              size={ButtonSize.Large}
              variant={ButtonVariant.Secondary}
            >
              Cancel
            </Button>
            <Button
              onPress={() => setStep(0)}
              size={ButtonSize.Large}
              variant={ButtonVariant.Secondary}
            >
              Previous
            </Button>
            <Button
              data-cy="step1NextBtn"
              onPress={() => {
                if (changedAppsSelection(selectedApps))
                  setShowProfilesWarning(true);
                else processToStep2(selectedApps);
              }}
              size={ButtonSize.Large}
              isDisabled={Object.keys(selectedApps).length === 0}
            >
              Next
            </Button>
          </div>
          {showProfilesWarning && (
            <ConfirmationDialog
              content="Changing applications in a deployment package will result in all deployment package profiles being deleted. Are you sure you want to continue?"
              isOpen={showProfilesWarning}
              confirmCb={() => {
                setShowProfilesWarning(false);
                dispatch(clearProfileData());
                processToStep2(selectedApps);
              }}
              confirmBtnText="OK"
              confirmBtnVariant={ButtonVariant.Action}
              cancelCb={() => setShowProfilesWarning(false)}
            />
          )}
        </div>
      )}
      {/** Step-3: Profile Creation */}
      {step === 2 && (
        <div>
          <DeploymentPackageProfileForm />

          <div className="deployment-package-create-edit__footer">
            <Button
              onPress={() => {
                navigate("../packages");
                dispatch(clearDeploymentPackage());
              }}
              size={ButtonSize.Large}
              variant={ButtonVariant.Secondary}
            >
              Cancel
            </Button>
            <Button
              onPress={() => setStep(1)}
              size={ButtonSize.Large}
              variant={ButtonVariant.Secondary}
            >
              Previous
            </Button>
            <Button
              data-cy="step2NextBtn"
              size={ButtonSize.Large}
              isDisabled={
                !deploymentPackageProfiles ||
                deploymentPackageProfiles.length === 0
              }
              onPress={() => setStep(3)}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {/** Step-4 (Final step): Review */}
      {step === 3 && (
        <div>
          <DeploymentPackageCreateEditReview />
          <div className="deployment-package-create-edit__footer">
            <Button
              onPress={() => {
                navigate("../packages");
                dispatch(clearDeploymentPackage());
              }}
              size={ButtonSize.Large}
              variant={ButtonVariant.Secondary}
            >
              Cancel
            </Button>
            <Button
              isDisabled={previousButtonDisable}
              onPress={() => setStep(2)}
              size={ButtonSize.Large}
              variant={ButtonVariant.Secondary}
            >
              Previous
            </Button>
            <Button
              data-cy="submitButton"
              onPress={saveDeploymentPackage}
              size={ButtonSize.Large}
            >
              {startCase(mode)} Deployment Package
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeploymentPackageCreateEdit;
