/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { cm, mbApi } from "@orch-ui/apis";
import { Empty, MetadataPair } from "@orch-ui/components";
import {
  clusterManagementRoute,
  InternalError,
  SharedStorage,
  useInfraNavigate,
} from "@orch-ui/utils";
import {
  Button,
  ButtonGroup,
  Heading,
  Stepper,
  StepperStep,
  Toast,
  ToastProps,
} from "@spark-design/react";
import {
  ButtonSize,
  ButtonVariant,
  HeaderSize,
  ToastPosition,
  ToastState,
  ToastVisibility,
} from "@spark-design/tokens";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  clearCluster,
  getCluster,
  getSelectedSite,
} from "../../../store/reducers/cluster";
import { clearLabels, getLabels } from "../../../store/reducers/labels";
import { clearLocations } from "../../../store/reducers/locations";
import { clearNodes } from "../../../store/reducers/nodes";
import { clearNodesSpec, getNodesSpec } from "../../../store/reducers/nodeSpec";
import { clearTemplateName } from "../../../store/reducers/templateName";
import { clearTemplateVersion } from "../../../store/reducers/templateVersion";
import AddDeploymentMeta from "../../organism/cluster/clusterCreation/AddDeploymentMeta/AddDeploymentMeta";
import ClusterNodesTableBySite from "../../organism/cluster/clusterCreation/ClusterNodesTableBySite/ClusterNodesTableBySite";
import NameAndTemplate from "../../organism/cluster/clusterCreation/NameAndTemplate/NameAndTemplate";
import Review from "../../organism/cluster/clusterCreation/Review/Review";
import SelectSite from "../../organism/cluster/clusterCreation/SelectSite/SelectSite";
import "./ClusterCreation.scss";

const dataCy = "clusterCreation";

const ClusterCreation = () => {
  const cy = { "data-cy": dataCy };
  const topRef = useRef<HTMLDivElement | null>(null);
  const projectName = SharedStorage.project?.name ?? "";

  const navigate = useInfraNavigate();
  const dispatch = useAppDispatch();

  // TODO: reduce below redux states to single redux state
  const currentCluster = useAppSelector(getCluster);
  const currentLabels = useAppSelector(getLabels);
  const currentNodesSpec = useAppSelector(getNodesSpec);
  const selectedClusterSite = useAppSelector(getSelectedSite);

  const [toastProps, setToast] = useState<ToastProps>({
    canClose: false,
    position: ToastPosition.TopRight,
  });
  const hideFeedback = () =>
    setToast((props) => ({
      ...props,
      visibility: ToastVisibility.Hide,
    }));

  const [steps, setSteps] = useState<StepperStep[]>([
    { text: "Enter Cluster Details" },
    { text: "Select Site" },
    { text: "Select Host & Roles" },
    { text: "Add Deployment Metadata" },
    { text: "Review" },
  ]);
  const [step, setStep] = useState<number>(0);
  useEffect(() => {
    if (step === 0 && !window.location.search) {
      navigate(clusterManagementRoute, undefined, "?offset=0");
    }
  }, [step]);

  const [isNextDisabled, setIsNextDisabled] = useState(true);
  const [isCreateBtnDisabled, setIsCreateBtnDisabled] =
    useState<boolean>(false);

  const [clusterTemplateName] = useState<string>("Select Cluster Template");
  const [clusterTemplateVersion, setClusterTemplateVersion] = useState<string>(
    "Select Cluster Version",
  );

  const [selectedHostIds, setSelectedHostIds] = useState<string[]>([]);
  const [inheritedMeta, setInheritedMeta] = useState<MetadataPair[]>([]);

  const clearData = () => {
    localStorage.setItem("clearTree", "true");

    // TODO: optimize redux states
    dispatch(clearCluster());
    dispatch(clearLocations());
    dispatch(clearNodes());
    dispatch(clearNodesSpec());
    dispatch(clearLabels());
    dispatch(clearTemplateName());
    dispatch(clearTemplateVersion());
  };
  const objectToLabels = (data: any) => {
    const labelPair: MetadataPair[] = [];
    if (data && data.labels) {
      Object.keys(data.labels).map((labelKey) => {
        const label = {
          key: labelKey,
          value: data.labels[labelKey],
        };
        labelPair.push(label);
      });
    }
    return labelPair;
  };
  const completedCheck = (currentStep: number, check: boolean) => {
    if (check) {
      setSteps(
        steps.map((v, index) =>
          currentStep === index ? { ...v, icon: "check" } : v,
        ),
      );
    } else {
      steps.map((v, index) => (currentStep === index ? delete v.icon : v));
    }
  };
  const currentMetadata = objectToLabels(currentLabels);
  const accumulatedMeta = inheritedMeta.concat(objectToLabels(currentLabels));

  // Clear form data at begining of the form
  useEffect(clearData, []);

  // Reset `template version` selection if `template name` selection changes
  useEffect(() => {
    setClusterTemplateVersion("Select Cluster Version");
  }, [clusterTemplateName]);

  // Handle next button
  useEffect(() => {
    completedCheck(step, true);
    setIsNextDisabled(false);
    if (step == 0) {
      if (
        currentCluster.name &&
        currentCluster.name !== "Add Name" &&
        currentCluster.name.length > 0 &&
        currentCluster.template &&
        currentCluster.template.indexOf("-v") > -1
      ) {
        completedCheck(step, true);
        setIsNextDisabled(false);
      } else {
        completedCheck(step, false);
        setIsNextDisabled(true);
      }
    } else if (step == 1) {
      if (
        selectedClusterSite &&
        Object.values(selectedClusterSite).length > 0
      ) {
        completedCheck(step, true);
        setIsNextDisabled(false);
      } else {
        completedCheck(step, false);
        setIsNextDisabled(true);
      }
    } else if (step == 2) {
      if (selectedHostIds.length > 0 || currentNodesSpec.length > 0) {
        completedCheck(step, true);
        setIsNextDisabled(false);
      } else {
        completedCheck(step, false);
        setIsNextDisabled(true);
      }
    } else if (
      step == 3 &&
      (selectedHostIds.length > 0 || currentNodesSpec.length > 0)
    ) {
      completedCheck(step, true);
      setIsNextDisabled(false);
    } else if (
      step == 4 &&
      (inheritedMeta.length > 0 || currentMetadata.length > 0) &&
      currentCluster.name &&
      currentCluster.template
    ) {
      completedCheck(step, false);
      setIsNextDisabled(false);
    }
  }, [
    currentCluster,
    selectedClusterSite,
    clusterTemplateVersion,
    selectedHostIds,
    step,
  ]);

  const [createCluster] = cm.usePostV2ProjectsByProjectNameClustersMutation();
  const [createMetadata] =
    mbApi.useMetadataServiceCreateOrUpdateMetadataMutation();

  const setMetadataFormValidation = (hasError: boolean) => {
    setIsNextDisabled(hasError);
  };

  const createHandler = async () => {
    const metadata: MetadataPair[] = [];

    const onSuccess = () => {
      setToast((prev) => {
        return {
          ...prev,
          message:
            "Cluster is created. Redirecting you back to the Clusters page...",
          state: ToastState.Success,
          visibility: ToastVisibility.Show,
        };
      });
      clearData();
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      const timeoutId = setTimeout(() => {
        navigate(clusterManagementRoute);
        clearInterval(timeoutId);
      }, 3000);
    };
    const onFailure = (
      type: "metadata of the cluster" | "cluster",
      err?: string,
    ) => {
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

      if (type === "cluster") {
        setToast((prev) => {
          return {
            ...prev,
            message: `Failed to create ${type}${err ? `: ${err}` : ""}`,
            state: ToastState.Danger,
            visibility: ToastVisibility.Show,
          };
        });
        setIsCreateBtnDisabled(false);
      } else {
        setToast((prev) => {
          return {
            ...prev,
            message:
              "Cluster created successfully. Failed to store Metadata in the metadata-broker, this will not affect functionality.",
            state: ToastState.Warning,
            visibility: ToastVisibility.Show,
          };
        });
        clearData();
        // If metadata failed then move to cluster page as cluster is created
        const timeoutId = setTimeout(() => {
          navigate(clusterManagementRoute);
          clearInterval(timeoutId);
        }, 3000);
      }
    };
    const combinedClusterLabels: { [key: string]: string } = {};
    accumulatedMeta.forEach((tags) => {
      combinedClusterLabels[tags.key] = tags.value;
      metadata.push({ key: tags.key, value: tags.value });
    });

    setIsCreateBtnDisabled(true);
    const onClusterFailure = (err: {
      status: string;
      data?: { message?: string };
    }) => {
      if (err.data && err.data.message) onFailure("cluster", err.data.message);
      else onFailure("cluster");
    };
    createCluster({
      projectName,
      clusterSpec: {
        name: currentCluster.name,
        labels: combinedClusterLabels,
        template: currentCluster.template,
        nodes: currentNodesSpec,
      },
    })
      .unwrap()
      .then(() => {
        const onMetadataFailure = (err: InternalError) => {
          if (err.data) {
            onFailure("metadata of the cluster", err.data);
          } else {
            onFailure("metadata of the cluster");
          }
        };

        createMetadata({
          projectName: SharedStorage.project?.name ?? "",
          metadataList: { metadata: metadata },
        })
          .unwrap()
          .then(onSuccess, onMetadataFailure)
          .catch(onMetadataFailure);
      }, onClusterFailure)
      .catch(onClusterFailure);
  };

  return (
    <div ref={topRef} {...cy} className="cluster-creation">
      {toastProps.visibility === ToastVisibility.Show && (
        /** common notification for this component, esp. on create */
        <Toast
          {...toastProps}
          onHide={hideFeedback}
          style={{ position: "fixed", top: "70px", right: "2rem" }}
        />
      )}

      <Heading semanticLevel={1} size={HeaderSize.Large}>
        Create Cluster
      </Heading>

      <Stepper steps={steps} activeStep={step} />

      <div className="create-cluster">
        {step === 0 && <NameAndTemplate />}
        {step === 1 && (
          <SelectSite
            selectedSite={selectedClusterSite}
            onSelectedInheritedMeta={(value) => setInheritedMeta(value)}
          />
        )}
        {step === 2 &&
          (selectedClusterSite ? (
            <ClusterNodesTableBySite
              site={selectedClusterSite}
              inheritedMeta={inheritedMeta}
              onNodeSelection={(host, isSelected) => {
                const rowId = host.resourceId!;

                // Update host selection
                setSelectedHostIds((prev) => {
                  if (isSelected) {
                    // Add this host row if selected
                    return prev.concat(rowId);
                  }

                  // For every previous host selection, consider it only if it doesn't match the deselected host.
                  return prev.filter(
                    (prevSelectedHostId) => prevSelectedHostId !== rowId,
                  );
                });
              }}
              poll
            />
          ) : (
            <Empty
              dataCy="empty"
              icon="desktop"
              subTitle="Select a region and site to get a list of available hosts. Then select hosts to include in the cluster."
            />
          ))}
        {step === 3 && (
          <AddDeploymentMeta hasError={setMetadataFormValidation} />
        )}

        {step === 4 && <Review accumulatedMeta={accumulatedMeta} />}
      </div>

      <ButtonGroup className="create-cluster__actions">
        <Button
          data-cy="cancelBtn"
          size={ButtonSize.Large}
          variant={ButtonVariant.Secondary}
          onPress={() => {
            clearData();
            navigate(clusterManagementRoute);
          }}
        >
          Cancel
        </Button>

        {step > 0 && (
          <Button
            variant={ButtonVariant.Secondary}
            size={ButtonSize.Large}
            onPress={() => setStep(step - 1)}
          >
            Back
          </Button>
        )}

        <Button
          data-cy="nextBtn"
          size={ButtonSize.Large}
          isDisabled={
            // disable this button if `next` is selectable or `create` is disabled specifically
            (step !== steps.length - 1 && isNextDisabled) ||
            (step === steps.length - 1 && isCreateBtnDisabled)
          }
          onPress={() => {
            if (step < steps.length - 1) {
              setStep(step + 1);
            }
            if (step === steps.length - 1) {
              createHandler();
            }
            setIsNextDisabled(true);
          }}
        >
          {step === steps.length - 1 ? "Create" : "Next"}
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default ClusterCreation;
