/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { eim } from "@orch-ui/apis";
import {
  ConfirmationDialog,
  Flex,
  MessageBannerAlertState,
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
import {
  goToNextStep,
  goToPrevStep,
  HostConfigSteps,
  selectContainsHosts,
  selectFirstHost,
  selectHostConfigForm,
  setSite,
} from "../../../store/configureHost";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { resetTree } from "../../../store/locations";
import { setMessageBanner } from "../../../store/notifications";
import { HostConfigReview } from "../../atom/HostConfigReview/HostConfigReview";
import { AddHostLabels } from "../../organism/hostConfigure/AddHostLabels/AddHostLabels";
import { HostsDetails } from "../../organism/hostConfigure/HostsDetails/HostsDetails";
import { RegionSite } from "../../organism/hostConfigure/RegionSite/RegionSite";
import "./HostConfig.scss";

export const dataCy = "hostConfig";

interface HostConfigProps {
  // these props are used for testing purposes
  hasRole?: (roles: string[]) => boolean;
}

export const HostConfig = ({ hasRole = hasRoleDefault }: HostConfigProps) => {
  const cy = { "data-cy": dataCy };

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [apiErrorData, setApiErrorData] = useState<{
    hosts: Set<string>;
    message?: string;
  }>();

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

  const containsHosts = useAppSelector(selectContainsHosts);
  const firstHost =
    Object.keys(hosts).length > 0 ? useAppSelector(selectFirstHost) : undefined;
  const preselectedSite = firstHost?.site as eim.SiteRead;
  useEffect(() => {
    if (preselectedSite) {
      dispatch(setSite({ site: preselectedSite }));
    }
  }, [preselectedSite]);

  // host update
  const [patchHost] =
    eim.usePatchV1ProjectsByProjectNameComputeHostsAndHostIdMutation();
  const [postInstance] =
    eim.usePostV1ProjectsByProjectNameComputeInstancesMutation();
  const [clusterConfirmationOpen, setClusterConfirmationOpen] =
    useState<boolean>(false);
  const [createdInstances, setCreatedInstances] = useState<Set<string>>(
    new Set(),
  );

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
        await postInstance({
          projectName: SharedStorage.project?.name ?? "",
          body: {
            securityFeature: host.instance?.securityFeature,
            osID: host.instance?.osID,
            kind: "INSTANCE_KIND_METAL",
            hostID: host.resourceId,
            name: `${host.name}-instance`,
          },
        })
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
          navigate("../../unassigned-hosts", { relative: "path" });
        }, 500);
      }
    }
  };

  // form buttons
  const handlePrev = () => dispatch(goToPrevStep());
  const handleNext = () => {
    switch (currentStep) {
      case HostConfigSteps["Complete Configuration"]:
        // TODO save Host metadata
        updateHost();
        break;
    }
    dispatch(goToNextStep());
  };

  const goToListPage = () => {
    dispatch(resetTree(location.pathname + location.search));
    navigate("../../hosts", { relative: "path" });
  };

  if (!containsHosts) {
    return (
      <div {...cy}>
        <MessageBanner
          data-cy="missingHostMessage"
          variant="info"
          showActionButtons
          messageTitle="No Host has been selected for configuration"
          messageBody="Please go to the Onboarded Host page and select (at least) one"
          onClickPrimary={goToListPage}
          onClickSecondary={goToListPage}
          // FIXME the MessageBanner either shows two buttons or none
          // primaryText="Go to Hosts list"
          // onClickPrimary={goToListPage}
        />
      </div>
    );
  }

  return (
    <div {...cy} className="host-config">
      <Flex cols={[6, 6]}>
        <Heading semanticLevel={4}>Configure Host</Heading>
      </Flex>
      <Stepper
        steps={steps}
        activeStep={currentStep}
        data-cy="hostConfigureStepper"
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
        {currentStep === HostConfigSteps["Complete Configuration"] && (
          <HostConfigReview />
        )}
      </div>
      <div className="host-config__btn_container">
        <ButtonGroup className="host-config__buttons">
          <Button
            size={ButtonSize.Large}
            variant={ButtonVariant.Secondary}
            onPress={goToListPage}
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
              Back
            </Button>
          )}
          <Button
            data-cy="next"
            size={ButtonSize.Large}
            onPress={handleNext}
            isDisabled={!enableNextBtn}
          >
            {currentStep === steps.length - 1 ? "Configure" : "Next"}
          </Button>
        </ButtonGroup>
      </div>

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
            navigate("../../unassigned-hosts", { relative: "path" });
          }}
        />
      )}
    </div>
  );
};
