/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { adm, catalog, cm, mbApi } from "@orch-ui/apis";
import {
  Empty,
  MetadataPair,
  setActiveNavItem,
  setBreadcrumb,
} from "@orch-ui/components";
import { logError, parseError, SharedStorage } from "@orch-ui/utils";
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
  ToastPosition,
  ToastState,
  ToastVisibility,
} from "@spark-design/tokens";
import { ReactElement, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  deploymentBreadcrumb,
  deploymentsNavItem,
  homeBreadcrumb,
} from "../../../routes/const";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setupDeploymentHasEmptyMandatoryParams } from "../../../store/reducers/setupDeployment";
import { setProps } from "../../../store/reducers/toast";
import { generateMetadataPair } from "../../../utils/global";
import ChangePackageProfile from "../../organisms/edit-deployments/ChangePackageProfile/ChangePackageProfile";
import ChangeProfileValues from "../../organisms/edit-deployments/ChangeProfileValues/ChangeProfileValues";
import Review from "../../organisms/edit-deployments/Review/Review";
import { OverrideValuesList } from "../../organisms/setup-deployments/OverrideProfileValues/OverrideProfileTable";
import SelectCluster, {
  SelectClusterMode,
} from "../../organisms/setup-deployments/SelectCluster/SelectCluster";
import SetupMetadata, {
  SetupMetadataMode,
} from "../../organisms/setup-deployments/SetupMetadata/SetupMetadata";
import { DeploymentType } from "../SetupDeployment/SetupDeployment";
import "./EditDeployment.scss";

const dataCy = "editDeployment";

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
  const toastProps = {
    state: ToastState.Success,
    visibility: ToastVisibility.Hide,
    duration: 3000,
    position: ToastPosition.TopRight,
  };

  const { id } = useParams<keyof params>();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [updateDeployment] = adm.useDeploymentServiceUpdateDeploymentMutation();
  const [updateMetadata] =
    mbApi.useMetadataServiceCreateOrUpdateMetadataMutation();

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

  const [deploymentPackage, setDeploymentPackage] = useState<
    catalog.DeploymentPackage | undefined
  >();

  // Step 1: Change Package Profile
  const [currentPackageProfile, setCurrentPackageProfile] = useState<
    catalog.DeploymentProfile | undefined
  >();

  // Step 2: Override Profile Values
  const [profileParameterOverrides, setProfileParameterOverrides] =
    useState<OverrideValuesList>({});
  //console.log("top lvl overrides val ", profileParameterOverrides);

  const emptyMandatoryParams = useAppSelector(
    setupDeploymentHasEmptyMandatoryParams,
  );

  // Step 3: Change Deployment Details
  const [currentDeploymentName, setCurrentDeploymentName] = useState<
    string | undefined
  >(apiDeployment?.deployment.displayName ?? apiDeployment?.deployment.name);
  const [currentMetadata, setCurrentMetadata] = useState<MetadataPair[]>([]);
  const [selectedClusters, setSelectedClusters] = useState<
    cm.ClusterInfoRead[]
  >([]);

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
            onDeploymentPackageLoaded={setDeploymentPackage}
          />
        );
        break;
      case EditDeploymentSteps["Override Profile Values"]:
        nextJsx = (
          <ChangeProfileValues
            deployment={apiDeployment.deployment}
            deploymentPackage={deploymentPackage}
            deploymentProfile={currentPackageProfile}
          />
        );
        break;
      case EditDeploymentSteps["Change Deployment Details"]:
        if (apiDeployment.deployment.deploymentType === DeploymentType.MANUAL) {
          nextJsx = (
            <SelectCluster
              mode={SelectClusterMode.EDIT}
              selectedIds={selectedClusters.map((cluster) => cluster.name!)}
              onSelect={(cluster: cm.ClusterInfoRead, isSelected: boolean) => {
                setSelectedClusters((prev) => {
                  if (isSelected) {
                    return prev.concat(cluster);
                  } else {
                    return prev.filter((c) => c.name !== cluster.name);
                  }
                });
              }}
              currentDeploymentName={currentDeploymentName ?? ""}
              onDeploymentNameChange={setCurrentDeploymentName}
            />
          );
        } else {
          nextJsx = (
            <SetupMetadata
              mode={SetupMetadataMode.EDIT}
              metadataPairs={currentMetadata}
              currentDeploymentName={currentDeploymentName}
              onMetadataUpdate={setCurrentMetadata}
              onDeploymentNameChange={setCurrentDeploymentName}
            />
          );
        }
        break;
      case EditDeploymentSteps["Review"]:
        nextJsx = (
          <Review
            deployment={apiDeployment.deployment}
            deploymentType={apiDeployment.deployment.deploymentType}
            selectedPackage={deploymentPackage}
            selectedProfile={currentPackageProfile}
            selectedParameterOverrides={profileParameterOverrides}
            selectedDeploymentName={currentDeploymentName}
            selectedMetadata={currentMetadata}
            selectedClusters={selectedClusters}
          />
        );
        break;
    }
    if (nextJsx !== null) {
      setStepJsx(nextJsx);
    }
  }, [
    availableSteps,
    currentStep,
    apiDeployment,
    isDeploymentSuccess,
    profileParameterOverrides,
    currentDeploymentName,
    currentMetadata,
    selectedClusters,
  ]);

  useEffect(() => {
    if (isDeploymentSuccess) {
      setCurrentDeploymentName(
        apiDeployment.deployment.displayName ?? apiDeployment.deployment.name,
      );
      if (apiDeployment.deployment.deploymentType === DeploymentType.AUTO) {
        setCurrentMetadata(
          generateMetadataPair(
            apiDeployment.deployment.targetClusters?.find(
              (tc) => Object.keys(tc.labels ?? {}).length > 0,
            )?.labels ?? {},
          ),
        );
      }
      if (apiDeployment.deployment.deploymentType === DeploymentType.MANUAL) {
        if (apiDeployment.deployment.targetClusters) {
          setSelectedClusters(
            apiDeployment.deployment.targetClusters.map((tc) => {
              const cluster: cm.ClusterInfoRead = {
                // to save deployment we just need name
                // therefore no need to load cluster data
                name: tc.clusterId,
              };
              return cluster;
            }),
          );
        }
      }
    }
  }, [isDeploymentSuccess]);

  useEffect(() => {
    if (
      availableSteps[currentStep] ===
      EditDeploymentSteps["Change Package Profile"]
    ) {
      setIsNextDisabled(false);
    }
  }, [currentStep]);

  useEffect(() => {
    if (
      availableSteps[currentStep] ===
      EditDeploymentSteps["Override Profile Values"]
    ) {
      setIsNextDisabled(emptyMandatoryParams);
    }
  }, [profileParameterOverrides, currentStep, emptyMandatoryParams]);

  useEffect(() => {
    if (
      availableSteps[currentStep] ===
      EditDeploymentSteps["Change Deployment Details"]
    ) {
      setIsNextDisabled(
        !currentDeploymentName ||
          currentDeploymentName === "" ||
          (apiDeployment?.deployment.deploymentType === DeploymentType.MANUAL &&
            selectedClusters.length === 0) ||
          (apiDeployment?.deployment.deploymentType === DeploymentType.AUTO &&
            currentMetadata.length === 0),
      );
    }
  }, [currentStep, currentMetadata, selectedClusters, currentDeploymentName]);

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

  // TODO: move this to utils, other occurrence: SetupDeployment.tsx
  const convertMetadataPairsToObject = (
    metadataPairs: MetadataPair[],
  ): { [key: string]: string } =>
    metadataPairs.reduce(
      (accumulator: any, currentValue: MetadataPair) => ({
        ...accumulator,
        [currentValue.key]: currentValue.value,
      }),
      {},
    );

  const updateDeploymentApi = async (): Promise<boolean> => {
    if (!deployment.deployId) return false;
    let isUpdated = true;

    const labels = convertMetadataPairsToObject(currentMetadata);

    const overrideValues: adm.OverrideValues[] = [];
    Object.keys(profileParameterOverrides).forEach((key) => {
      const appName = key.split(" ")[0];
      overrideValues.push({
        appName: appName,
        values: profileParameterOverrides[key]?.values || {},
      });
    });

    // TODO: move this to utils, other occurrence: SetupDeployment.tsx
    const targetClusters =
      deploymentPackage && deploymentPackage.applicationReferences
        ? deploymentPackage.applicationReferences.reduce(
            (p: adm.TargetClusters[], app: catalog.ApplicationReference) => {
              if (selectedClusters && selectedClusters.length > 0) {
                return p.concat(
                  selectedClusters.map((c: cm.ClusterInfoRead) => {
                    return {
                      appName: app.name,
                      clusterId: c.name ?? "",
                    };
                  }),
                );
              } else {
                p.push({
                  appName: app.name,
                  labels: labels,
                });
                return p;
              }
            },
            [],
          )
        : [];

    await updateDeployment({
      projectName,
      deplId: deployment.deployId,
      deployment: {
        appName: deployment.appName,
        appVersion: deployment.appVersion,
        profileName: currentPackageProfile ? currentPackageProfile.name : "",
        displayName: currentDeploymentName,
        deploymentType: deployment.deploymentType,
        targetClusters,
        overrideValues: overrideValues || [],
        publisherName: "intel", // FIXME remove once the API support it
      },
    })
      .unwrap()
      .then((response) => {
        dispatch(
          setProps({
            ...toastProps,
            state: ToastState.Success,
            message: `Deployment ${response.deployment.displayName} updated successfully`,
            visibility: ToastVisibility.Show,
          }),
        );
        navigate("/applications/deployments");
      })
      .catch((error) => {
        dispatch(
          setProps({
            ...toastProps,
            state: ToastState.Danger,
            message: parseError(error).data,
            visibility: ToastVisibility.Show,
          }),
        );
        isUpdated = false;
      });

    return isUpdated;
  };

  const updateMetadataApi = async (): Promise<void> => {
    await updateMetadata({
      projectName: SharedStorage.project?.name ?? "",
      metadataList: { metadata: currentMetadata },
    })
      .unwrap()
      .catch((error) => {
        logError(error, "Failed to update Metadata.");
      });
  };

  const edit = async (): Promise<void> => {
    setIsEditing(true);
    const isDeploymentUpdated = await updateDeploymentApi();
    setIsEditing(false);
    if (!isDeploymentUpdated) return;
    await updateMetadataApi(); // TODO: Should this be executed in manual setup?
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
