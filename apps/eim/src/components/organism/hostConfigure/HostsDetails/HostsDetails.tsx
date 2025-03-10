/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { eim } from "@orch-ui/apis";
import { Flex } from "@orch-ui/components";
import { useEffect } from "react";
import {
  selectHostConfigForm,
  selectHosts,
  setGlobalIsSbAndFdeEnabled,
  setGlobalOsValue,
} from "../../../../store/configureHost";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { GlobalOsDropdown } from "../GlobalOsDropdown/GlobalOsDropdown";
import { GlobalSecuritySwitch } from "../GlobalSecuritySwitch/GlobalSecuritySwitch";
import { HostDetails } from "../HostDetails/HostDetails";
import "./HostsDetails.scss";

export const dataCy = "hostsDetails";
export const HostsDetails = () => {
  const cy = { "data-cy": dataCy };

  const hosts = useAppSelector(selectHosts);

  const nonUniqueHostNames = () => {
    const hostNames = Object.values(hosts).map((host) => host.name);
    return hostNames.filter((item, index) => hostNames.indexOf(item) !== index);
  };

  const duplicatedHostNames = nonUniqueHostNames();

  const allOsPreinstalled = Object.values(hosts).every(
    (host) => host.originalOs,
  );
  const singleHostConfig = Object.keys(hosts).length === 1;

  const {
    formStatus: { globalOsValue, globalIsSbAndFdeEnabled },
  } = useAppSelector(selectHostConfigForm);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (
      globalOsValue === "" &&
      Object.values(hosts)
        .filter((host) => !host.originalOs)
        .every((host, i, arr) => {
          const os1 = host.instance?.os as eim.OperatingSystemResourceRead;
          const os2 = arr[0].instance?.os as eim.OperatingSystemResourceRead;
          return os1?.resourceId === os2?.resourceId;
        })
    ) {
      const value = (
        Object.values(hosts).filter((host) => !host.originalOs)[0]?.instance
          ?.os as eim.OperatingSystemResourceRead
      )?.resourceId;
      if (value) {
        dispatch(setGlobalOsValue(value));
      }
    }
  }, [globalOsValue]);

  return (
    <div {...cy} className="hosts-details">
      <Flex
        cols={[3]}
        className={`top-row labels ${singleHostConfig ? "single" : ""}`}
      >
        <b>Host Name</b>
        <b>Serial Number and UUID</b>
        <b>OS Profile</b>
        <b>Secure Boot and Full Disk Encryption</b>
      </Flex>
      {!singleHostConfig && (
        <Flex cols={[6, 3, 3]} className="top-row">
          <div></div>
          <GlobalOsDropdown
            isDisabled={allOsPreinstalled}
            value={globalOsValue}
            onSelectionChange={(osOption) => {
              dispatch(setGlobalOsValue(osOption));
            }}
          />

          <GlobalSecuritySwitch
            value={globalIsSbAndFdeEnabled}
            onChange={(isEnabled) => {
              dispatch(setGlobalIsSbAndFdeEnabled(isEnabled));
            }}
          />
        </Flex>
      )}
      {Object.keys(hosts).map((hostId) => (
        <HostDetails
          hostId={hostId}
          duplicatedHostNames={duplicatedHostNames}
          key={hostId}
          osOptionValue={globalOsValue}
          onOsOptionChange={(_, effect) => {
            if (!effect) {
              dispatch(setGlobalOsValue(""));
            }
          }}
          securityIsSbAndFdeEnabled={globalIsSbAndFdeEnabled}
        />
      ))}
    </div>
  );
};
