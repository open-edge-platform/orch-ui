/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { catalog } from "@orch-ui/apis";
import {
  ConfirmationDialog,
  MessageBanner,
  MessageBannerAlertState,
  setActiveNavItem,
  setBreadcrumb,
} from "@orch-ui/components";
import { parseError, SharedStorage } from "@orch-ui/utils";
import {
  Button,
  ButtonGroup,
  Drawer,
  Heading,
  Stepper,
  StepperStep,
  Toast,
} from "@spark-design/react";
import {
  ButtonGroupAlignment,
  ButtonSize,
  ButtonVariant,
  DrawerSize,
  ToastPosition,
  ToastState,
  ToastVisibility,
} from "@spark-design/tokens";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  addApplicationBreadcrumb,
  applicationBreadcrumb,
  applicationsNavItem,
  editApplicationBreadcrumb,
  homeBreadcrumb,
} from "../../../routes/const";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  addProfile,
  clearApplication,
  deleteProfile,
  selectApplication,
  setApplication,
  setDefaultProfileName,
} from "../../../store/reducers/application";
import {
  clearProfile,
  selectProfile,
  setProfile,
} from "../../../store/reducers/profile";
import ApplicationForm from "../../organisms/applications/ApplicationForm/ApplicationForm";
import ApplicationReview from "../../organisms/applications/ApplicationReview/ApplicationReview";
import ApplicationSource from "../../organisms/applications/ApplicationSource/ApplicationSource";
import ApplicationProfileForm from "../../organisms/profiles/ApplicationProfileForm/ApplicationProfileForm";
import ApplicationProfileTable from "../../organisms/profiles/ApplicationProfileTable/ApplicationProfileTable";
import "./ApplicationCreateEdit.scss";

export const dataCy = "appActionPage"; // "applicationCreateEdit";

export type ApplicationInputs = {
  displayName: string;
  version: string;
  chartVersion: string;
  chartName: string;
  helmRegistryLocation: string;
  imageRegistryLocation: string;
};

export type ProfileInputs = {
  displayName: string;
  chartValues: string;
};

const ApplicationCreateEdit = () => {
  const cy = { "data-cy": dataCy };
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const isCreatePage = location.pathname.includes("applications/add");
  const isEditPage = location.pathname.includes("applications/edit");

  const breadcrumb = useMemo(() => {
    if (isCreatePage) {
      return [homeBreadcrumb, applicationBreadcrumb, addApplicationBreadcrumb];
    } else {
      return [homeBreadcrumb, applicationBreadcrumb, editApplicationBreadcrumb];
    }
  }, [isCreatePage, isEditPage]);

  useEffect(() => {
    dispatch(setBreadcrumb(breadcrumb));
    dispatch(setActiveNavItem(applicationsNavItem));
  }, [isCreatePage, isEditPage]);

  const { appName, version } = useParams();

  const { data, isSuccess } = catalog.useCatalogServiceGetApplicationQuery(
    {
      projectName: SharedStorage.project?.name ?? "",
      applicationName: appName!,
      version: version!,
    },
    {
      skip: !isEditPage || !appName || !version || !SharedStorage.project?.name,
    },
  );

  useEffect(() => {
    if (isSuccess && !isCreatePage && data.application) {
      dispatch(setApplication(data.application));
    }
  }, [isSuccess, data]);

  const application = useAppSelector(selectApplication);
  const profile = useAppSelector(selectProfile);

  const {
    control: controlBasicInfo,
    formState: { errors: errorsBasicInfo, isValid: isValidBasicInfo },
  } = useForm<ApplicationInputs>({
    mode: "all",
  });

  const {
    control: controlSourceInfo,
    formState: { isValid: isValidSourceInfo },
  } = useForm<ApplicationInputs>({
    mode: "all",
  });

  const {
    control: controlProfile,
    formState: { errors: errorsProfile, isValid: isValidProfile },
  } = useForm<ProfileInputs>({
    mode: "all",
  });

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

  const [successVisibility, setSuccessVisibility] = useState<ToastVisibility>(
    ToastVisibility.Hide,
  );

  const [previousButtonDisable, setPreviousButtonDisable] =
    useState<boolean>(false);
  const [isCreatingProfile, setIsCreatingProfile] = useState<boolean>(true);
  const [yamlHasError, setYamlHasError] = useState<boolean>(false);
  const [versionValidate, setVersionValidate] = useState<boolean>(false);
  const [paramsOverrideHasError, setParamsOverrideHasError] =
    useState<boolean>(false);

  const [
    createApplication,
    {
      isSuccess: isCreateSuccess,
      isError: isCreateError,
      error: createErrorResp,
    },
  ] = catalog.useCatalogServiceCreateApplicationMutation();
  const [
    editApplication,
    { isSuccess: isEditSuccess, isError: isEditError, error: editErrorResp },
  ] = catalog.useCatalogServiceUpdateApplicationMutation();

  useEffect(() => {
    if (isCreateError === false && isEditError === false) {
      return;
    }

    setErrorMessage(
      parseError(isCreateError ? createErrorResp : editErrorResp).data,
    );

    setTimeout(() => {
      dispatch(clearApplication());
      navigate("../applications");
    }, 5000);
  }, [isCreateError, isEditError]);

  const [step, setStep] = useState<number>(0);
  const steps: StepperStep[] = [
    {
      text: "Select Application Source",
    },
    {
      text: "Enter Application Details",
    },
    {
      text: "Add Profiles",
    },
    {
      text: "Review",
    },
  ];

  const updateOrCreateApp = () => {
    const app = structuredClone(application);
    // Delete if None is selected
    if (app.imageRegistryName === "None") {
      delete app.imageRegistryName;
    }

    if (isCreatePage) {
      createApplication({
        projectName: SharedStorage.project?.name ?? "",
        application: app,
      });
    } else if (appName && version) {
      // if it's edit we surely have the name and version
      editApplication({
        projectName: SharedStorage.project?.name ?? "",
        applicationName: appName,
        version: version,
        application: app,
      });
    } /* else appName & version is missing on Edit */
    setPreviousButtonDisable(true);
  };

  return (
    <div className="application-create-edit" {...cy}>
      <Heading semanticLevel={1} size="l" data-cy="title">
        {isCreatePage ? "Add Application" : "Edit Application"}
      </Heading>
      <Stepper steps={steps} activeStep={step} data-cy="stepper" />
      <div>
        {step === 0 && (
          <div>
            <ApplicationSource
              control={controlSourceInfo}
              validateVersionFn={(versionValidate: boolean) => {
                setVersionValidate(versionValidate);
              }}
            />
            <ButtonGroup
              className="application-create-edit__footer"
              align={ButtonGroupAlignment.End}
            >
              <Button
                onPress={() => {
                  dispatch(clearApplication());
                  navigate("../applications");
                }}
                variant={ButtonVariant.Secondary}
                size={ButtonSize.Large}
                data-cy="stepSourceInfoCancelBtn"
              >
                Cancel
              </Button>
              <Button
                onPress={() => {
                  if (
                    application.chartName ||
                    application.chartVersion ||
                    isValidSourceInfo
                  ) {
                    setStep(1);
                  }
                }}
                type="submit"
                isDisabled={
                  !application.chartName ||
                  !application.chartVersion ||
                  !isValidSourceInfo ||
                  !versionValidate
                }
                size={ButtonSize.Large}
                data-cy="stepSourceInfoNextBtn"
              >
                Next
              </Button>
            </ButtonGroup>
          </div>
        )}
        {step === 1 && (
          <div>
            <ApplicationForm
              control={controlBasicInfo}
              errors={errorsBasicInfo}
            />
            <ButtonGroup
              className="application-create-edit__footer"
              align={ButtonGroupAlignment.End}
            >
              <Button
                onPress={() => {
                  dispatch(clearApplication());
                  navigate("../applications");
                }}
                variant={ButtonVariant.Secondary}
                size={ButtonSize.Large}
                data-cy="stepBasicInfoCancelBtn"
              >
                Cancel
              </Button>
              <Button
                onPress={() => setStep(0)}
                isDisabled={previousButtonDisable}
                size={ButtonSize.Large}
                variant={ButtonVariant.Secondary}
                data-cy="stepBasicInfoPreviousBtn"
              >
                Previous
              </Button>
              <Button
                onPress={() => {
                  if (isValidBasicInfo) {
                    setStep(2);
                  }
                }}
                type="submit"
                isDisabled={!isValidBasicInfo}
                size={ButtonSize.Large}
                data-cy="stepBasicInfoNextBtn"
              >
                Next
              </Button>
            </ButtonGroup>
          </div>
        )}
        {step === 2 && (
          <div>
            <div className="application-create-edit__header">
              <Heading semanticLevel={2} size="m" data-cy="profilesTitle">
                Profiles
              </Heading>
              <Button
                onPress={() => {
                  setIsCreatingProfile(true);
                  setIsModalOpen(true);
                }}
                size={ButtonSize.Large}
                data-cy="addProfileBtn"
              >
                Add Profile
              </Button>
            </div>
            <ApplicationProfileTable
              actions={[
                {
                  text: "Edit",
                  action: (item: catalog.Profile) => {
                    dispatch(setProfile(item));
                    setIsCreatingProfile(false);
                    setIsModalOpen(true);
                  },
                },
                {
                  text: "Delete",
                  action: (item: catalog.Profile) => {
                    dispatch(setProfile(item));
                    setIsDeleteModalOpen(true);
                  },
                },
              ]}
            />
            <Drawer
              data-cy="profileModal"
              size={DrawerSize.Large}
              show={isModalOpen}
              headerProps={{
                title: `${
                  isCreatingProfile ? "Add" : "Update"
                } Application Profile`,
                subTitle: "",
                onHide: () => setIsModalOpen(false),
              }}
              bodyContent={
                <div className="application-create-edit__profile">
                  <ApplicationProfileForm
                    control={controlProfile}
                    errors={errorsProfile}
                    isCreating={isCreatingProfile}
                    show={isModalOpen}
                    yamlHasError={yamlHasError}
                    setYamlHasError={setYamlHasError}
                    setParamsOverrideHasError={setParamsOverrideHasError}
                  />
                </div>
              }
              footerContent={
                <ButtonGroup
                  className="application-create-edit__footer"
                  align={ButtonGroupAlignment.End}
                >
                  <Button
                    data-cy="profileFormCancelBtn"
                    size={ButtonSize.Large}
                    variant={ButtonVariant.Secondary}
                    onPress={() => {
                      setIsModalOpen(false);
                      dispatch(clearProfile());
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    size={ButtonSize.Large}
                    onPress={() => {
                      setIsModalOpen(false);
                      if (
                        application.profiles &&
                        application.profiles.length === 0
                      ) {
                        dispatch(setDefaultProfileName(profile.name));
                      }
                      dispatch(addProfile(profile));
                    }}
                    isDisabled={
                      (isCreatingProfile && !isValidProfile) ||
                      yamlHasError ||
                      !profile.chartValues ||
                      !profile.chartValues.length ||
                      paramsOverrideHasError
                    }
                    data-cy="profileFormSubmitBtn"
                  >
                    {isCreatingProfile ? "Add Profile" : "Update Profile"}
                  </Button>
                </ButtonGroup>
              }
            />
            {isDeleteModalOpen && (
              <ConfirmationDialog
                content={`Are you sure to delete this ${profile.name}?`}
                isOpen={true}
                confirmCb={() => {
                  dispatch(deleteProfile(profile.name));
                  dispatch(clearProfile());
                  setIsDeleteModalOpen(false);
                }}
                confirmBtnText="Delete"
                confirmBtnVariant={ButtonVariant.Alert}
                cancelCb={() => setIsDeleteModalOpen(false)}
              />
            )}
            <ButtonGroup
              className="application-create-edit__footer"
              align={ButtonGroupAlignment.End}
            >
              <Button
                onPress={() => {
                  dispatch(clearApplication());
                  navigate("../applications");
                }}
                variant={ButtonVariant.Secondary}
                size={ButtonSize.Large}
                data-cy="stepProfileCancelBtn"
              >
                Cancel
              </Button>
              <Button
                onPress={() => setStep(1)}
                size={ButtonSize.Large}
                variant={ButtonVariant.Secondary}
                data-cy="stepProfilePreviousBtn"
              >
                Previous
              </Button>
              <Button
                onPress={() => {
                  setStep(3);
                }}
                size={ButtonSize.Large}
                data-cy="stepProfileNextBtn"
              >
                Next
              </Button>
            </ButtonGroup>
          </div>
        )}
        {step === 3 && (
          <div>
            <Heading semanticLevel={2} size="m" data-cy="reviewBasicInfoTitle">
              Review
            </Heading>
            <Heading semanticLevel={2} size="s" data-cy="reviewBasicInfoTitle">
              General information
            </Heading>
            <ApplicationReview />
            <Heading semanticLevel={2} size="s" data-cy="reviewProfilesTitle">
              Profiles:
            </Heading>
            <ApplicationProfileTable />
            <ButtonGroup
              className="application-create-edit__footer"
              align={ButtonGroupAlignment.End}
            >
              <Button
                onPress={() => {
                  dispatch(clearApplication());
                  navigate("../applications");
                }}
                variant={ButtonVariant.Secondary}
                size={ButtonSize.Large}
                data-cy="stepReviewCancelBtn"
              >
                Cancel
              </Button>
              <Button
                onPress={() => setStep(2)}
                isDisabled={previousButtonDisable}
                size={ButtonSize.Large}
                variant={ButtonVariant.Secondary}
                data-cy="stepReviewPreviousBtn"
              >
                Previous
              </Button>
              <Button
                onPress={updateOrCreateApp}
                size={ButtonSize.Large}
                data-cy="submitBtn"
              >
                {isCreatePage ? "Add Application" : "Update Application"}
              </Button>
            </ButtonGroup>
          </div>
        )}
      </div>
      <Toast
        message={`Application ${
          isCreatePage ? "created" : "updated"
        }, redirecting you back to Applications page...`}
        state={ToastState.Success}
        position={ToastPosition.TopCenter}
        visibility={
          isCreateSuccess || isEditSuccess
            ? ToastVisibility.Show
            : successVisibility
        }
        canClose={true}
        duration={3000}
        onHide={() => {
          setSuccessVisibility(ToastVisibility.Hide);
          dispatch(clearApplication());
          navigate("../applications");
        }}
        data-cy="successToast"
      />
      {errorMessage && (
        <MessageBanner
          variant={MessageBannerAlertState.Error}
          text={errorMessage}
          isDismmisible
          className="application-create-edit-message"
          title="Error"
          onClose={() => {
            setErrorMessage(null);
          }}
        />
      )}
    </div>
  );
};

export default ApplicationCreateEdit;
