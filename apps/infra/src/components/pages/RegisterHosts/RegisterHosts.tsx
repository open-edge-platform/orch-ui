/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import { Flex, MessageBannerAlertState } from "@orch-ui/components";
import {
  hostProvisioningRoute,
  hostProvisionRoute,
  hostsRoute,
  useInfraNavigate,
} from "@orch-ui/utils";
import {
  Button,
  ButtonGroup,
  Heading,
  ToggleSwitch,
} from "@spark-design/react";
import {
  ButtonGroupAlignment,
  ButtonSize,
  ButtonVariant,
} from "@spark-design/tokens";
import {
  setAutoOnboardValue as setAutoOnboardValueHost,
  setAutoProvisionValue as setAutoProvisionValueHost,
  setCreateClusterValue as setCreateClusterValueHost,
} from "../../../store/configureHost";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setMessageBanner } from "../../../store/notifications";
import {
  reset,
  selectHostProvisionState,
  selectUnregisteredHosts,
  setAutoOnboardValue,
  setAutoProvisionValue,
  setCreateClusterValue,
} from "../../../store/provisionHost";
import AutoPropertiesMessageBanner from "../../molecules/AutoPropertiesMessageBanner/AutoPropertiesMessageBanner";
import AddHostsForm from "../../organism/AddHostsForm/AddHostsForm";
import "./RegisterHosts.scss";
import { registerHostPost } from "./RegisterHosts.utils";

const dataCy = "registerHosts";

const RegisterHosts = () => {
  const cy = { "data-cy": dataCy };
  const className = "register-hosts";
  const navigate = useInfraNavigate();
  const dispatch = useAppDispatch();
  const { hosts, hasMultiHostValidationError } = useAppSelector(
    (state) => state.configureHost,
  );
  const { hasHostDefinitionError, autoOnboard, autoProvision, createCluster } =
    useAppSelector(selectHostProvisionState);
  const unregisteredHosts = useAppSelector(selectUnregisteredHosts);

  const [registerHost] =
    infra.usePostV1ProjectsByProjectNameComputeHostsRegisterMutation();

  return (
    <div {...cy} className={className}>
      <Heading semanticLevel={4}>Register Hosts</Heading>
      <p>
        To register your hosts enter either the serial number or the UUID for
        each host in the respective fields
      </p>
      <AddHostsForm />
      <Flex cols={[4]} align="start">
        <div className={`${className}__auto-onboard`}>
          <Heading semanticLevel={6}>Onboard Automatically</Heading>
          <p>Hosts will be onboarded once they connect</p>
          <ToggleSwitch
            data-cy="isAutoOnboarded"
            isSelected={autoOnboard}
            onChange={(value) => {
              // TODO: remove
              dispatch(setAutoOnboardValueHost(value));
              dispatch(setAutoOnboardValue(value));
            }}
            className={`${className}__auto-onboard-switch`}
          >
            <label>Onboard Automatically</label>
          </ToggleSwitch>
        </div>
        <div className={`${className}__auto-provision`}>
          <Heading semanticLevel={6}>Provision Automatically</Heading>
          <p>
            Hosts will be provisioned automatically once they are onboarded.
          </p>
          <ToggleSwitch
            data-cy="isAutoProvisioned"
            isSelected={autoProvision}
            onChange={(value) => {
              // TODO: remove
              dispatch(setAutoProvisionValueHost(value));
              dispatch(setAutoProvisionValue(value));
            }}
            className={`${className}__auto-provision-switch`}
          >
            <label>Provision Automatically</label>
          </ToggleSwitch>
        </div>
        <div className={`${className}__create-cluster`}>
          <Heading semanticLevel={6}>Create Single-host Clusters</Heading>
          <p>Each host will be assigned to a new cluster.</p>
          <ToggleSwitch
            data-cy="createCluster"
            isSelected={createCluster}
            onChange={(value) => {
              // TODO: remove
              dispatch(setCreateClusterValueHost(value));
              dispatch(setCreateClusterValue(value));
            }}
            isDisabled={!autoOnboard || !autoProvision}
            className={`${className}__auto-provision-switch`}
          >
            <label>Create Single-host Clusters</label>
          </ToggleSwitch>
        </div>
      </Flex>

      <AutoPropertiesMessageBanner />
      <ButtonGroup
        align={ButtonGroupAlignment.End}
        className={`${className}__button-group`}
      >
        <Button
          size={ButtonSize.Large}
          variant={ButtonVariant.Primary}
          onPress={() => {
            dispatch(reset());
            navigate(hostsRoute);
          }}
        >
          Cancel
        </Button>

        <Button
          data-cy="nextButton"
          size={ButtonSize.Large}
          variant={ButtonVariant.Action}
          onPress={async () => {
            if (!autoProvision) {
              const successCount = await registerHostPost(
                dispatch,
                registerHost,
                unregisteredHosts,
                autoOnboard,
              );
              setTimeout(() => {
                if (successCount === 0) return;
                const totalCount = Object.keys(unregisteredHosts).length;
                const allSucceeded = totalCount === successCount;
                dispatch(
                  setMessageBanner({
                    icon: "check-circle",
                    text: allSucceeded
                      ? "All hosts registered successfully."
                      : `Successfully registered ${successCount} out of ${totalCount} host(s)`,
                    title: "Hosts Registered",
                    variant: MessageBannerAlertState.Success,
                  }),
                );
                if (allSucceeded) {
                  dispatch(reset());
                  navigate(hostsRoute);
                }
              }, 20);
            } else {
              navigate(hostProvisioningRoute);
            }
          }}
          isDisabled={
            // TODO: remove hasMultiHostValidationError
            hasHostDefinitionError ||
            hasMultiHostValidationError ||
            Object.keys(hosts).length === 0
          }
        >
          {autoProvision ? "Continue" : "Register Hosts"}
        </Button>

        <Button
          onPress={() => {
            navigate(hostProvisionRoute);
          }}
        >
          new provision
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default RegisterHosts;
