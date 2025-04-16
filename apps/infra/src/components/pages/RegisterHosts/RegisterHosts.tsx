/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { eim } from "@orch-ui/apis";
import {
  Flex,
  MessageBannerAlertState,
  setActiveNavItem,
} from "@orch-ui/components";
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
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { hostsNavItem } from "../../../routes/const";
import {
  reset,
  selectUnregisteredHosts,
  setAutoOnboardValue,
  setAutoProvisionValue,
} from "../../../store/configureHost";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setMessageBanner } from "../../../store/notifications";
import AutoPropertiesMessageBanner from "../../molecules/AutoPropertiesMessageBanner/AutoPropertiesMessageBanner";
import AddHostsForm from "../../organism/AddHostsForm/AddHostsForm";
import "./RegisterHosts.scss";
import { registerHostPost } from "./RegisterHosts.utils";
const dataCy = "registerHosts";

const RegisterHosts = () => {
  const cy = { "data-cy": dataCy };
  const className = "register-hosts";
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { autoOnboard, autoProvision, hosts, hasMultiHostValidationError } =
    useAppSelector((state) => state.configureHost);
  const unregisteredHosts = useAppSelector(selectUnregisteredHosts);

  const [registerHost] =
    eim.usePostV1ProjectsByProjectNameComputeHostsRegisterMutation();
  useEffect(() => {
    dispatch(setActiveNavItem(hostsNavItem));
  }, []);
  return (
    <div {...cy} className={className}>
      <Heading semanticLevel={4}>Register Hosts</Heading>
      <p>
        To register your hosts enter either the serial number or the UUID for
        each host in the respective fields
      </p>
      <AddHostsForm />
      <Flex cols={[6]}>
        <div className={`${className}__auto-onboard`}>
          <Heading semanticLevel={6}>Onboard Automatically</Heading>
          <p>Hosts will be onboarded once they connect</p>
          <ToggleSwitch
            data-cy="isAutoOnboarded"
            isSelected={autoOnboard}
            onChange={(value) => {
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
              dispatch(setAutoProvisionValue(value));
            }}
            className={`${className}__auto-provision-switch`}
          >
            <label>Provision Automatically</label>
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
            navigate("../hosts");
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
                      ? "All hosts registered sucessfully."
                      : `Sucessfully registered ${successCount} out of ${totalCount} host(s)`,
                    title: "Hosts Registered",
                    variant: MessageBannerAlertState.Success,
                  }),
                );
                if (allSucceeded) {
                  dispatch(reset());
                  navigate("../hosts");
                }
              }, 20);
            } else {
              navigate("../hosts/set-up-provisioning");
            }
          }}
          isDisabled={
            hasMultiHostValidationError || Object.keys(hosts).length === 0
          }
        >
          {autoProvision ? "Continue" : "Register Hosts"}
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default RegisterHosts;
