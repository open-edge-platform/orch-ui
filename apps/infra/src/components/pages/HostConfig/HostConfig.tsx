/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { eim } from "@orch-ui/apis";
import {
  ConfirmationDialog,
  Flex,
  MessageBannerAlertState,
  setActiveNavItem,
} from "@orch-ui/components";
import {
  hasRole as hasRoleDefault,
  Role,
  RuntimeConfig,
  SharedStorage,
} from "@orch-ui/utils";
import {
  Button,
  ButtonGroup,
  Heading,
  MessageBanner,
  Stepper,
  StepperStep,
} from "@spark-design/react";
import { ButtonSize, ButtonVariant } from "@spark-design/tokens";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { clusterNavItem } from "../../../routes/const";
import {
  goToNextStep,
  goToPrevStep,
  HostConfigSteps,
  HostData,
  removeHost,
  reset,
  resetMultiHostForm,
  selectContainsHosts,
  selectFirstHost,
  selectHostConfigForm,
  setSite,
  updateNewRegisteredHost,
} from "../../../store/configureHost";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { resetTree } from "../../../store/locations";
import { setMessageBanner } from "../../../store/notifications";
import { HostConfigReview } from "../../atom/HostConfigReview/HostConfigReview";
import HostRegistrationAndProvisioningCancelDialog from "../../molecules/HostRegistrationAndProvisioningCancelDialog/HostRegistrationAndProvisioningCancelDialog";
import { AddHostLabels } from "../../organism/hostConfigure/AddHostLabels/AddHostLabels";
import { AddSshPublicKey } from "../../organism/hostConfigure/AddSshPublicKey/AddSshPublicKey";
import { HostsDetails } from "../../organism/hostConfigure/HostsDetails/HostsDetails";
import { RegionSite } from "../../organism/hostConfigure/RegionSite/RegionSite";
import "./HostConfig.scss";
import {
  createHostInstance,
  createRegisteredHost,
  isHostRead,
  updateHostDetails,
} from "./HotConfig.utils";

const dataCy = "hostConfig";

interface HostConfigProps {
  // these props are used for testing purposes
  hasRole?: (roles: string[]) => boolean;
}

export enum HostProvisiongProcedures {
  Idle,
  Registering,
  Updating,
  Instantiating,
  Results,
  BackToHosts,
}

export const HostConfig = ({ hasRole = hasRoleDefault }: HostConfigProps) => {
  const cy = { "data-cy": dataCy };

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [apiErrorData, setApiErrorData] = useState<{
    hosts: Set<string>;
    message?: string;
  }>();

  const [provisioningProcedure, setProvisioningProcedure] =
    useState<HostProvisiongProcedures>(HostProvisiongProcedures.Idle);

  // stepper management
  const steps: StepperStep[] = Object.keys(HostConfigSteps)
    // @ts-ignore
    .filter((key) => !isNaN(Number(HostConfigSteps[key])))
    // remove the cluster step if ClusterOrch is not enabled
    // NOTE we might end up removing this altogether
    .filter((k) => {
      return !(
        !RuntimeConfig.isEnabled("CLUSTER_ORCH") && k === "Create Cluster"
      );
    })
    .map((k) => {
      return { text: k };
    });

  // read redux state
  const {
    hosts,
    formStatus: { currentStep, enableNextBtn, enablePrevBtn },
  } = useAppSelector(selectHostConfigForm);
  const {
    autoProvision,
    autoOnboard,
    hosts: hostsInRedux,
  } = useAppSelector((store) => store.configureHost);

  const containsHosts = useAppSelector(selectContainsHosts);
  const firstHost =
    Object.keys(hosts).length > 0 ? useAppSelector(selectFirstHost) : undefined;
  const preselectedSite = firstHost?.site as eim.SiteRead;

  // host register - used when coming in from 'autoProvision' flow, host will not exist
  const [registerHost] =
    eim.usePostV1ProjectsByProjectNameComputeHostsRegisterMutation();
  // host update
  const [patchHost] =
    eim.usePatchV1ProjectsByProjectNameComputeHostsAndHostIdMutation();
  const [postInstance] =
    eim.usePostV1ProjectsByProjectNameComputeInstancesMutation();

  const [clusterConfirmationOpen, setClusterConfirmationOpen] =
    useState<boolean>(false);
  const [showContinueDialog, setShowContinueDialog] = useState<boolean>(false);
  const [createdInstances, setCreatedInstances] = useState<Set<string>>(
    new Set(),
  );
  const [hostResults, setHostResults] = useState<Map<string, string | true>>(
    new Map(),
  );

  const registerAllHosts = async () => {
    for (const host of Object.values<HostData>(hostsInRedux)) {
      //if it was already registered, skip this
      if (hostResults.get(host.name) === true) continue;
      const result = await createRegisteredHost(
        host,
        autoOnboard,
        registerHost,
      );
      if (isHostRead(result)) {
        await dispatch(updateNewRegisteredHost({ host: result })); //updating the redux store content
      } else {
        setHostResults(
          (previous) =>
            new Map(
              previous.set(
                host.name,
                result || "Unknown Error while registering",
              ),
            ),
        );
      }
    }
  };

  const updateAllHostsDetails = async () => {
    for (const host of Object.values<HostData>(hostsInRedux)) {
      if (!host.resourceId || hostResults.get(host.name) === true) continue;
      const result = await updateHostDetails(host, patchHost);
      if (!isHostRead(result)) {
        setHostResults(
          (previous) =>
            new Map(
              previous.set(host.name, result || "Unknown Error while updating"),
            ),
        );
      }
    }
  };

  const createAllHostInstances = async () => {
    for (const host of Object.values(hostsInRedux)) {
      if (!host.resourceId || hostResults.get(host.name) === true) continue;
      const result = await createHostInstance(
        host,
        setCreatedInstances,
        postInstance,
      );

      if (!isHostRead(result)) {
        setHostResults(
          (previous) =>
            new Map(
              previous.set(
                host.name,
                result || "Unknown Error creating instance",
              ),
            ),
        );
      } else {
        setHostResults((previous) => new Map(previous.set(host.name, true)));
      }
    }
  };

  const displayProvisioningResults = () => {
    let resultsHaveErrors = false;
    for (const value of hostResults.values()) {
      // a.k.a an error message detected in the results
      if (typeof value === "string") {
        resultsHaveErrors = true;
        break;
      }
    }
    if (resultsHaveErrors) {
      dispatch(
        setMessageBanner({
          icon: "check-circle",
          text: "Not all hosts were provisioned.  See results below for more information.",
          title: "Setup complete",
          variant: MessageBannerAlertState.Error,
        }),
      );
      setProvisioningProcedure(HostProvisiongProcedures.Idle);
    } else {
      dispatch(
        setMessageBanner({
          icon: "check-circle",
          text: "Hosts successfully registered. Provisioning will start once the hosts are connected.",
          title: "Success",
          variant: MessageBannerAlertState.Success,
        }),
      );
      if (
        RuntimeConfig.isEnabled("CLUSTER_ORCH") &&
        Object.values(hosts).length === 1 &&
        hasRole([Role.CLUSTERS_WRITE])
      ) {
        setProvisioningProcedure(HostProvisiongProcedures.BackToHosts);
        setClusterConfirmationOpen(true);
      } else {
        setProvisioningProcedure(HostProvisiongProcedures.BackToHosts);
      }
    }
  };

  const { data: localAccountsList } =
    eim.useGetV1ProjectsByProjectNameLocalAccountsQuery({
      projectName: SharedStorage.project?.name ?? "",
    });

  const updateHost = async () => {
    const failedHosts = new Set<string>();
    let firstErrorMessage: string | undefined = undefined;

    for (const host of Object.values(hosts)) {
      await patchHost({
        projectName: SharedStorage.project?.name ?? "",
        hostId: host.resourceId!,
        body: {
          name: host.name,
          siteId: host.siteId,
          metadata: host.metadata,
        },
      })
        .unwrap()
        .catch((e) => {
          failedHosts.add(host.name);
          if (firstErrorMessage === undefined) {
            firstErrorMessage = e.data.message;
          }
        });

      if (!host.originalOs && !createdInstances.has(host.resourceId!)) {
        const postInstancePayload: eim.PostV1ProjectsByProjectNameComputeInstancesApiArg =
          {
            projectName: SharedStorage.project?.name ?? "",
            body: {
              securityFeature: host.instance?.securityFeature,
              osID: host.instance?.osID,
              kind: "INSTANCE_KIND_METAL",
              hostID: host.resourceId,
              name: `${host.name}-instance`,
            },
          };
        /* 
          instance is associated with localAccount selected by user
          in "SSH key" step.
        */
        if (host.instance?.localAccountID) {
          postInstancePayload.body.localAccountID =
            host.instance?.localAccountID;
        }
        await postInstance(postInstancePayload)
          .unwrap()
          .then(() => {
            setCreatedInstances((prevState) => prevState.add(host.resourceId!));
          })
          .catch((e) => {
            failedHosts.add(host.name);
            if (firstErrorMessage === undefined) {
              firstErrorMessage = e.data.message;
            }
          });
      }
    }

    if (failedHosts.size > 0) {
      setApiErrorData({
        hosts: failedHosts,
        message: firstErrorMessage,
      });
    } else {
      setApiErrorData(undefined);
      dispatch(
        setMessageBanner({
          icon: "check-circle",
          text: "All hosts has been configured.",
          title: "Update Succeeded",
          variant: MessageBannerAlertState.Success,
        }),
      );
      if (
        RuntimeConfig.isEnabled("CLUSTER_ORCH") &&
        Object.values(hosts).length === 1 &&
        hasRole([Role.CLUSTERS_WRITE])
      ) {
        setClusterConfirmationOpen(true);
      } else {
        setTimeout(() => {
          navigate("../../hosts", { relative: "path" });
        }, 500);
      }
    }
  };

  // form buttons
  const handlePrev = () => dispatch(goToPrevStep());
  const handleNext = async () => {
    switch (currentStep) {
      case HostConfigSteps["Complete Setup"]:
        // TODO save Host metadata
        if (autoProvision) {
          //Check if anything is already registered, if so remove it from list
          hostResults.forEach((value, key) => {
            if (value === true) dispatch(removeHost(key));
          });
          setProvisioningProcedure(HostProvisiongProcedures.Registering);
        } else updateHost();
        break;
      default:
        dispatch(goToNextStep());
        break;
    }
  };

  const goToListPage = () => {
    dispatch(reset());
    dispatch(resetTree(location.pathname + location.search));
    navigate("../../hosts", { relative: "path" });
  };

  useEffect(() => {
    if (preselectedSite) {
      dispatch(setSite({ site: preselectedSite }));
    }
  }, [preselectedSite]);

  useEffect(() => {
    (async () => {
      switch (provisioningProcedure) {
        case HostProvisiongProcedures.Registering:
          await registerAllHosts();
          setProvisioningProcedure(HostProvisiongProcedures.Updating);
          break;
        case HostProvisiongProcedures.Updating:
          await updateAllHostsDetails();
          setProvisioningProcedure(HostProvisiongProcedures.Instantiating);
          break;
        case HostProvisiongProcedures.Instantiating:
          await createAllHostInstances();
          setProvisioningProcedure(HostProvisiongProcedures.Results);
          break;
        case HostProvisiongProcedures.Results:
          displayProvisioningResults();
          break;
        case HostProvisiongProcedures.BackToHosts:
          dispatch(resetMultiHostForm());
          navigate("../../hosts?reset"); //could do route param
          break;
      }
    })();
  }, [provisioningProcedure]);

  if (!containsHosts) {
    return (
      <div {...cy} className="host-config">
        <MessageBanner
          data-cy="missingHostMessage"
          variant="info"
          showActionButtons
          messageTitle="No Host has been selected for provisioning"
          messageBody="Please go to the Hosts page to select hosts."
          onClickPrimary={goToListPage}
          onClickSecondary={goToListPage}

          // FIXME the MessageBanner either shows two buttons or none
          // primaryText="Go to Hosts list"
          // onClickPrimary={goToListPage}
        />
      </div>
    );
  }

  const nextButtonText = () => {
    if (provisioningProcedure !== HostProvisiongProcedures.Idle)
      return "Provisioning...";
    return currentStep === steps.length - 1 ? "Provision" : "Next";
  };

  return (
    <div {...cy} className="host-config">
      <Flex cols={[6, 6]}>
        <Heading semanticLevel={4}>Set up Provisioning</Heading>
      </Flex>
      <Stepper
        steps={steps}
        activeStep={currentStep}
        data-cy="hostConfigureStepper"
        className="host-provisioning-stepper"
      />

      {apiErrorData !== undefined && (
        <div style={{ whiteSpace: "pre-line" }}>
          <MessageBanner
            showIcon
            showClose
            variant="error"
            messageTitle="Configuration failed"
            messageBody={`One or more hosts could not be configured. This is usually due to lack of permissions or a service outage.
          Contact your system administrator.

          Affected hosts: ${[...apiErrorData.hosts].join(", ")}.
          Error message: ${apiErrorData.message}.`}
          />
        </div>
      )}

      <div className="formStep">
        {currentStep === HostConfigSteps["Select Site"] && <RegionSite />}
        {currentStep === HostConfigSteps["Enter Host Details"] && (
          <HostsDetails />
        )}
        {currentStep === HostConfigSteps["Add Host Labels"] && (
          <AddHostLabels />
        )}
        {currentStep === HostConfigSteps["Enable Local Access"] && (
          <AddSshPublicKey localAccounts={localAccountsList?.localAccounts} />
        )}
        {currentStep === HostConfigSteps["Complete Setup"] && (
          <HostConfigReview
            hostResults={hostResults}
            localAccounts={localAccountsList?.localAccounts}
          />
        )}
      </div>
      <div className="host-config__btn_container">
        <ButtonGroup className="host-config__buttons">
          <Button
            size={ButtonSize.Large}
            variant={ButtonVariant.Secondary}
            onPress={() => {
              if (autoProvision) {
                setShowContinueDialog(true);
              } else goToListPage();
            }}
          >
            Cancel
          </Button>
          {currentStep > 0 && (
            <Button
              data-cy="prev"
              size={ButtonSize.Large}
              variant={ButtonVariant.Secondary}
              onPress={handlePrev}
              isDisabled={!enablePrevBtn}
            >
              Previous
            </Button>
          )}
          <Button
            data-cy="next"
            size={ButtonSize.Large}
            onPress={handleNext}
            isDisabled={
              !enableNextBtn ||
              provisioningProcedure !== HostProvisiongProcedures.Idle
            }
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
      {clusterConfirmationOpen && (
        <ConfirmationDialog
          title="Create a cluster now?"
          content="Select 'Create Now' option to create a cluster immediately. Alternatively, select 'Create Later' to defer this setup and complete the cluster creation later."
          isOpen={clusterConfirmationOpen}
          confirmCb={() => {
            const host = Object.values(hosts)[0];
            const regionId = host.region?.resourceId;
            const regionName = host.region?.name;
            const siteId = host.siteId;
            const siteName = host.site?.name;
            const hostId = host.resourceId;

            const query = `?regionId=${regionId}&regionName=${regionName}&siteId=${siteId}&siteName=${siteName}&hostId=${hostId}`;
            dispatch(setActiveNavItem(clusterNavItem));
            navigate(`/infrastructure/clusters/create${query}`, {
              relative: "path",
            });
            setClusterConfirmationOpen(false);
          }}
          confirmBtnText="Create Now"
          confirmBtnVariant={ButtonVariant.Action}
          cancelBtnText="Create Later"
          cancelCb={() => {
            setClusterConfirmationOpen(false);
            navigate("../../hosts", { relative: "path" });
          }}
        />
      )}
    </div>
  );
};
