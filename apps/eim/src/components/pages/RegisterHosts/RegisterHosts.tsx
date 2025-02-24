/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { Flex } from "@orch-ui/components";
import { Heading, ToggleSwitch } from "@spark-design/react";
import {
  setAutoOnboardValue,
  setAutoProvisionValue,
} from "../../../store/configureHost";
import { useAppDispatch } from "../../../store/hooks";
export const dataCy = "registerHosts";

const RegisterHosts = () => {
  const cy = { "data-cy": dataCy };
  const className = "register-hosts";
  const dispatch = useAppDispatch();
  return (
    <div {...cy} className={className}>
      <Heading semanticLevel={4}>Register Hosts</Heading>
      <p>
        To register your hosts enter either the serial number or the UUID for
        each host in the respective fields
      </p>
      <Flex cols={[6]}>
        <div className={`${className}__auto-onboard`}>
          <Heading semanticLevel={6}>Auto Onboard</Heading>
          <p>Hosts will be onboarded once they connect</p>
          <ToggleSwitch
            data-cy="isAutoOnboarded"
            isSelected={true}
            onChange={(value) => {
              dispatch(setAutoOnboardValue(value));
            }}
            className={`${className}__auto-onboard-switch`}
          >
            <label>Auto Onboard</label>
          </ToggleSwitch>
        </div>
        <div className={`${className}__auto-provision`}>
          <Heading semanticLevel={6}>Auto Provision</Heading>
          <p>
            Hosts will be provisioned automatically once they are onboarded.
          </p>
          <ToggleSwitch
            data-cy="isAutoProvisioned"
            isSelected={true}
            onChange={(value) => {
              dispatch(setAutoProvisionValue(value));
            }}
            className={`${className}__auto-provision-switch`}
          >
            <label>Auto Provision</label>
          </ToggleSwitch>
        </div>
      </Flex>
    </div>
  );
};

export default RegisterHosts;
