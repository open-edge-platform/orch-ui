/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { adm, catalog, cm, mbApi, tm } from "@orch-ui/apis";
import {
  MetadataPair,
  setActiveNavItem,
  setBreadcrumb,
  SquareSpinner,
} from "@orch-ui/components";
import { logError, parseError, SharedStorage } from "@orch-ui/utils";
import {
  Button,
  ButtonGroup,
  Heading,
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
import { ReactElement, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  createDeploymentBreadcrumb,
  deployDeploymentPackageBreadcrumb,
  deploymentBreadcrumb,
  deploymentPackageBreadcrumb,
  deploymentsNavItem,
  homeBreadcrumb,
} from "../../../routes/const";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  getCurrentDeploymentPackage,
  getCurrentPackageProfile,
  profileParameterOverridesSelector,
  setCurrentDeploymentPackage,
  setCurrentPackageProfile,
  setupDeploymentHasEmptyMandatoryParams,
  wholeStateSelector,
} from "../../../store/reducers/setupDeployment";
import { setProps } from "../../../store/reducers/toast";
import ChangeProfileValues from "../../organisms/edit-deployments/ChangeProfileValues/ChangeProfileValues";
import NetworkInterconnect from "../../organisms/setup-deployments/NetworkInterconnect/NetworkInterconnect";
import Review from "../../organisms/setup-deployments/Review/Review";
import SelectCluster, {
  SelectClusterMode,
} from "../../organisms/setup-deployments/SelectCluster/SelectCluster";
import SelectDeploymentType from "../../organisms/setup-deployments/SelectDeploymentType/SelectDeploymentType";
import SelectPackage from "../../organisms/setup-deployments/SelectPackage/SelectPackage";
import SelectProfilesTable from "../../organisms/setup-deployments/SelectProfileTable/SelectProfileTable";
import SetupMetadata, {
  SetupMetadataMode,
} from "../../organisms/setup-deployments/SetupMetadata/SetupMetadata";
import "./SetupDeployment.scss";

type params = {
  appName: string;
  version: string;
};

export enum DeploymentType {
  AUTO = "auto-scaling",
  MANUAL = "targeted",
  UNDEFINED = "",
}

enum SetupDeploymentSteps {
  "Select a Package",
  "Select a Profile",
  "Override Profile Values",
  "Network Interconnect",
  "Select Deployment Type",
  "Enter Deployment Details",
  "Review",
}

const SetupDeployment = () => {
  const className = "setup-deployment";
  const projectName = SharedStorage.project?.name ?? "";
  const toastProps = {
    state: ToastState.Success,
    visibility: ToastVisibility.Hide,
    duration: 3000,
    position: ToastPosition.TopRight,
  };

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [stepJsx, setStepJsx] = useState<ReactElement | null>(null);
  // Stepper: Overall state controls
  const [currentStep, setCurrentStep] = useState(0);
  const [isNextDisabled, setIsNextDisabled] = useState<boolean>(false);
  // This will disable click on final step's `Deploy` button until api reponds back with a failure for retry
  const [isDeploying, setIsDeploying] = useState<boolean>(false);

  const [availableSteps, setAvailableSteps] = useState<number[]>([]);
  const [steps, setSteps] = useState<StepperStep[]>([]);

  // Step 1: Select Package states
  const currentDeploymentPackage = useAppSelector(getCurrentDeploymentPackage);

  // Step 2: Select a Profile states
  const currentPackageProfile = useAppSelector(getCurrentPackageProfile);
  // Step 3: Override profile values states
  const profileParameterOverrides = useAppSelector(
    profileParameterOverridesSelector,
  );
  const emptyMandatoryParams = useAppSelector(
    setupDeploymentHasEmptyMandatoryParams,
  );

  // Step 4: Network Interconnect
  const { data: networks, isSuccess: networksLoaded } =
    tm.useListV1ProjectsProjectProjectNetworksQuery({
      "project.Project": SharedStorage.project?.name ?? "",
    });
  const [projectNetworks, setProjectNetworks] = useState<string[]>([]);
  const [selectedNetwork, setSelectedNetwork] = useState<string>("");
  const [exposedServices, setExposedServices] = useState<adm.ServiceExport[]>(
    [],
  );

  useEffect(() => {
    if (networksLoaded && networks) {
      setProjectNetworks(networks.map((n) => n.name!));
    }
  }, [networksLoaded]);

  // Step 5: Select Deployment type states
  const [type, setType] = useState<DeploymentType>(DeploymentType.UNDEFINED);
  const [currentMetadata, setCurrentMetadata] = useState<MetadataPair[]>([]); // upon DeploymentType.Automatic

  const [selectedClusters, setSelectedClusters] = useState<
    cm.ClusterInfoRead[]
  >([]); // upon DeploymentType.Manual

  // Step 6: Enter Deployment Details states
  const [currentDeploymentName, setCurrentDeploymentName] = useState<
    string | null
  >(null);

  /** Setup a Deployment - Breadcrumb state to redux */
  const breadcrumb = useMemo(() => {
    if (location.pathname.includes("deployments")) {
      return [homeBreadcrumb, deploymentBreadcrumb, createDeploymentBreadcrumb];
    } else {
      return [
        homeBreadcrumb,
        deploymentPackageBreadcrumb,
        deployDeploymentPackageBreadcrumb,
      ];
    }
  }, []);
  useEffect(() => {
    dispatch(setBreadcrumb(breadcrumb));
    dispatch(setActiveNavItem(deploymentsNavItem));
  }, []);

  useEffect(() => {
    const deploymentPackageKind = currentDeploymentPackage?.kind;
    const steps = Object.keys(SetupDeploymentSteps)
      // filter out the reverse mappings of enums in typescript
      .filter((key) => !isNaN(Number(key)))
      .filter((key) => {
        if (SetupDeploymentSteps[Number(key)] === "Network Interconnect") {
          return (
            networksLoaded &&
            projectNetworks.length &&
            deploymentPackageKind !== "KIND_EXTENSION"
          );
        } else {
          return true;
        }
      });
    setSteps(
      steps
        // create step using enum values
        .map((key) => ({ text: SetupDeploymentSteps[Number(key)] })),
    );
    setAvailableSteps(steps.map((key) => Number(key)));
  }, [networksLoaded, projectNetworks, currentDeploymentPackage]);

  /** Setup a Deployment - header steps configuration */

  // in case we get here from a specific package, load it and skip the selection step
  const { appName, version } = useParams<keyof params>();
  // NOTE that this call only happens if the parameters are set
  const selectedApp = catalog.useCatalogServiceGetDeploymentPackageQuery(
    {
      projectName,
      deploymentPackageName: appName!,
      version: version!,
    },
    { skip: !appName || !version || !projectName },
  );
  useEffect(() => {
    if (selectedApp.data && selectedApp.data.deploymentPackage) {
      dispatch(setCurrentDeploymentPackage(selectedApp.data.deploymentPackage));
      setCurrentStep(SetupDeploymentSteps["Select a Profile"]);
    }
    if (!appName) {
      // if no appName is specified in the URL parameters we need to start from the beginning
      setCurrentDeploymentPackage(null);
      setCurrentStep(SetupDeploymentSteps["Select a Package"]);
    }
  }, [selectedApp]);

  const [createDeployment] = adm.useDeploymentServiceCreateDeploymentMutation();
  const [createMetadata] =
    mbApi.useMetadataServiceCreateOrUpdateMetadataMutation();
  // NOTE that this call only happens if the currentDeploymentPackage is set

  useEffect(() => {
    // on first load the currentDeploymentPackage is null,
    // but if there is a default we can pre-select it
    if (!currentPackageProfile && currentDeploymentPackage) {
      const defaultProfile = currentDeploymentPackage.profiles?.find(
        (p) => p.name === currentDeploymentPackage.defaultProfileName,
      );
      if (defaultProfile !== undefined) {
        setCurrentPackageProfile({ ...defaultProfile });
      }
    }
  }, [currentDeploymentPackage]);

  useEffect(() => {
    let nextJsx: ReactElement | null = null;
    switch (availableSteps[currentStep]) {
      case SetupDeploymentSteps["Select a Package"]:
        nextJsx = (
          <SelectPackage
            key="selectPackage"
            onSelect={(dep) => dispatch(setCurrentDeploymentPackage(dep))}
            selectedPackage={currentDeploymentPackage ?? undefined}
          />
        );
        break;
      case SetupDeploymentSteps["Select a Profile"]:
        if (currentDeploymentPackage) {
          nextJsx = (
            <SelectProfilesTable
              key="selectProfile"
              selectedPackage={currentDeploymentPackage}
              selectedProfile={currentPackageProfile ?? undefined}
              onProfileSelect={(profile) =>
                dispatch(setCurrentPackageProfile(profile))
              }
            />
          );
        }
        break;
      case SetupDeploymentSteps["Override Profile Values"]:
        nextJsx = (
          <ChangeProfileValues
            deploymentPackage={currentDeploymentPackage ?? undefined}
            deploymentProfile={currentPackageProfile ?? undefined}
          />
        );
        break;
      case SetupDeploymentSteps["Network Interconnect"]:
        nextJsx = (
          <NetworkInterconnect
            networks={projectNetworks}
            selectedNetwork={selectedNetwork}
            applications={currentDeploymentPackage?.applicationReferences}
            selectedServices={exposedServices}
            onNetworkUpdate={(value) => {
              setSelectedNetwork(value);
              if (value === "") {
                setExposedServices((prev) => {
                  const curr = prev;
                  curr.forEach((se) => {
                    se.enabled = false;
                  });
                  return curr;
                });
              }
            }}
            onExportsUpdate={(appRef, isExported) => {
              setExposedServices((prev) => {
                const curr = prev;
                const idx = curr.findIndex(
                  ({ appName }) => appName === appRef.name,
                );
                curr[idx].enabled = isExported;
                return curr;
              });
            }}
          ></NetworkInterconnect>
        );
        break;
      case SetupDeploymentSteps["Select Deployment Type"]:
        nextJsx = (
          <SelectDeploymentType
            key={"SelectDeploymentType"}
            type={type}
            setType={setType}
          />
        );
        break;
      case SetupDeploymentSteps["Enter Deployment Details"]:
        if (!currentDeploymentPackage) {
          // TODO @Zano any hint on how to best handle this?
          throw new Error("Missing required parameters");
        }
        if (type === DeploymentType.MANUAL) {
          nextJsx = (
            <SelectCluster
              mode={SelectClusterMode.CREATE}
              selectedIds={selectedClusters.map((cluster) => cluster.name!)}
              onSelect={(cluster: cm.ClusterInfo, isSelected: boolean) => {
                setSelectedClusters((prev) => {
                  if (isSelected) {
                    return prev.concat(cluster as cm.ClusterInfoRead);
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
            <>
              <SetupMetadata
                mode={SetupMetadataMode.CREATE}
                metadataPairs={currentMetadata}
                applicationPackage={currentDeploymentPackage}
                currentDeploymentName={currentDeploymentName ?? ""}
                onDeploymentNameChange={setCurrentDeploymentName}
                onMetadataUpdate={(m) => {
                  setCurrentMetadata(m);
                }}
              />
            </>
          );
        }
        break;
      case SetupDeploymentSteps["Review"]:
        if (!currentDeploymentPackage || !currentDeploymentName) {
          // TODO @Zano any hint on how to best handle this?
          throw new Error("Missing required parameters");
        }
        nextJsx = (
          <Review
            selectedPackage={currentDeploymentPackage}
            selectedDeploymentName={currentDeploymentName}
            selectedProfileName={currentPackageProfile!.name}
            selectedMetadata={currentMetadata}
            selectedClusters={selectedClusters}
            type={type}
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
    currentPackageProfile,
    profileParameterOverrides,
    selectedClusters,
    currentMetadata,
  ]);

  useEffect(() => {
    setIsNextDisabled(currentDeploymentPackage === null);
  }, [currentDeploymentPackage, currentStep]);

  useEffect(() => {
    if (
      availableSteps[currentStep] === SetupDeploymentSteps["Select a Profile"]
    ) {
      const searchParams = new URLSearchParams(location.search);
      searchParams.delete("searchTerm");
      navigate({
        pathname: location.pathname,
        search: searchParams.toString(),
      });
      setIsNextDisabled(!currentPackageProfile);
    }
  }, [currentPackageProfile, currentStep]);

  useEffect(() => {
    if (
      availableSteps[currentStep] ===
      SetupDeploymentSteps["Override Profile Values"]
    ) {
      setIsNextDisabled(emptyMandatoryParams);
    }
  }, [profileParameterOverrides, currentStep, emptyMandatoryParams]);

  useEffect(() => {
    if (
      availableSteps[currentStep] ===
      SetupDeploymentSteps["Select Deployment Type"]
    ) {
      setIsNextDisabled(type === "");
    }
  }, [type, currentStep]);

  useEffect(() => {
    if (
      availableSteps[currentStep] ===
      SetupDeploymentSteps["Enter Deployment Details"]
    ) {
      setIsNextDisabled(
        !currentDeploymentName ||
          currentDeploymentName === "" ||
          (type === DeploymentType.MANUAL && selectedClusters.length === 0) ||
          (type == DeploymentType.AUTO && currentMetadata.length === 0),
      );
    }
  }, [currentStep, currentMetadata, selectedClusters, currentDeploymentName]);

  useEffect(() => {
    if (currentDeploymentPackage?.applicationReferences) {
      setExposedServices(
        currentDeploymentPackage?.applicationReferences.map((appRef) => {
          return {
            appName: appRef.name,
            enabled: false,
          };
        }),
      );
    }
  }, [currentDeploymentPackage?.applicationReferences]);

  //   useState<OverrideValuesList>({});
  const wholeState = useAppSelector(wholeStateSelector);
  console.log("Whole State:", wholeState);

  const convertMetadataPairsToObject = (
    metadataPairs: MetadataPair[],
  ): { [key: string]: string } =>
    metadataPairs.reduce((accumulator: any, currentValue: MetadataPair) => {
      return {
        ...accumulator,
        [currentValue.key]: currentValue.value,
      };
    }, {});

  const createDeploymentApi = async (
    applicationPackage: catalog.DeploymentPackage | null,
    deploymentName: string | null,
    overrideValuesDict: { [key: string]: adm.OverrideValues },
    networkName: string,
    serviceExports: adm.ServiceExport[],
  ): Promise<boolean> => {
    // if we don't have:
    // - a package selected
    // - a name picked
    // we can't get to this step, so it's safe to mark them as present
    if (!applicationPackage || !deploymentName) return false;

    let isCreated = true;
    const labels = convertMetadataPairsToObject(currentMetadata);
    // Prepare the override values
    const overrideValues: adm.OverrideValues[] = [];
    Object.keys(overrideValuesDict).forEach((key) => {
      const appName = key.split(" ")[0];
      overrideValues.push({
        appName: appName,
        values: overrideValuesDict[key]?.values || {},
      });
    });

    const targetClusters: adm.TargetClusters[] =
      currentDeploymentPackage && currentDeploymentPackage.applicationReferences
        ? currentDeploymentPackage.applicationReferences.reduce<
            adm.TargetClusters[]
          >((p: adm.TargetClusters[], app: catalog.ApplicationReference) => {
            if (selectedClusters && selectedClusters.length > 0) {
              return [
                ...p,
                ...selectedClusters.map((c) => {
                  // NOTE whitout explicitly typing the variable,
                  // the compiler will not throw errors if the interface is wrong
                  const tc: adm.TargetClusters = {
                    appName: app.name,
                    clusterId: c.name ?? "",
                  };
                  return tc;
                }),
              ];
            } else {
              return [
                ...p,
                {
                  appName: app.name,
                  labels: labels,
                },
              ];
            }
          }, [])
        : [];
    await createDeployment({
      projectName,
      deployment: {
        appName: applicationPackage.name,
        appVersion: applicationPackage.version,
        profileName: currentPackageProfile ? currentPackageProfile.name : "",
        targetClusters,
        displayName: deploymentName,
        deploymentType: type,
        overrideValues: overrideValues || [],
        publisherName: "intel", // FIXME remove once the API support it
        networkName,
        serviceExports: networkName !== "" ? serviceExports : [],
      },
    })
      .unwrap()
      .then((response) => {
        dispatch(
          setProps({
            ...toastProps,
            state: ToastState.Success,
            message: `Deployment Successful - ${response.deploymentId}`,
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
        isCreated = false;
      });

    return isCreated;
  };

  const createMetadataApi = async (): Promise<void> => {
    await createMetadata({
      projectName: SharedStorage.project?.name ?? "",
      metadataList: { metadata: currentMetadata },
    })
      .unwrap()
      .catch((error) => {
        logError(error, "Failed to POST Metadata.");
      });
  };

  const deploy = async (): Promise<void> => {
    //const overrideValues = Object.values(newValueDict);
    setIsDeploying(true);
    const isDeploymentCreated = await createDeploymentApi(
      currentDeploymentPackage,
      currentDeploymentName,
      profileParameterOverrides,
      selectedNetwork,
      exposedServices,
    );
    setIsDeploying(false);
    if (!isDeploymentCreated) return;
    await createMetadataApi(); // TODO: Should this be executed in manual setup?
  };

  if (appName && (selectedApp.isLoading || !currentDeploymentPackage)) {
    return <SquareSpinner />;
  }

  return (
    <div className={className} data-cy="setupDeployment">
      <Heading className={`${className}__title`} semanticLevel={1} size="l">
        Setup a Deployment
      </Heading>
      <Stepper
        className={`${className}__stepper`}
        steps={steps}
        activeStep={currentStep}
        data-cy="stepper"
      />
      <div className="setup-deployment__content">{stepJsx}</div>
      <ButtonGroup
        className="setup-deployment__actions"
        align={ButtonGroupAlignment.End}
      >
        <Button
          size={ButtonSize.Large}
          variant={ButtonVariant.Primary}
          onPress={() => navigate("/applications/deployments")}
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
          isDisabled={isNextDisabled || isDeploying}
          onPress={() => {
            if (
              availableSteps[currentStep] === SetupDeploymentSteps["Review"]
            ) {
              deploy();
            } else {
              setCurrentStep(currentStep + 1);
            }
          }}
        >
          {availableSteps[currentStep] === SetupDeploymentSteps["Review"]
            ? "Deploy"
            : "Next"}
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default SetupDeployment;
