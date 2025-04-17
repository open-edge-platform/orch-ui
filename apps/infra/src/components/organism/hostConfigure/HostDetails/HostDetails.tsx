/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { eim } from "@orch-ui/apis";
import { Flex } from "@orch-ui/components";
import { TextField } from "@spark-design/react";
import { InputSize } from "@spark-design/tokens";
import { useEffect, useState } from "react";
import {
  selectHostById,
  selectIsGlobalSbFdeActive,
  setHostName,
  setIsGlobalSbFdeActive,
  setOsProfile,
  setSecurity,
} from "../../../../store/configureHost";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import OsProfileDropdown from "../../OsProfileDropdown/OsProfileDropdown";
import { SecuritySwitch } from "../SecuritySwitch/SecuritySwitch";
import "./HostDetails.scss";

const dataCy = "details";
const validNameRegex = /^[a-zA-Z-_0-9./: ]{1,20}$/;

export const isValidHostName = (name?: string) => {
  return (
    name != undefined && name.trim().length > 0 && validNameRegex.test(name)
  );
};

const containsDuplicatedName = (duplicates: string[], name?: string) => {
  if (!name) return false;
  return duplicates.includes(name);
};

// should be already disabled by {ignoreTopLevelFunctions: true} in the rule definition
interface HostDetailsProps {
  hostId: string;
  duplicatedHostNames?: string[];
  osOptionValue?: string;
  securityIsSbAndFdeEnabled?: boolean;
  onOsOptionChange?: (os: eim.OperatingSystemResource, effect: boolean) => void;
}

// eslint-disable-next-line max-statements
export const HostDetails = ({
  hostId,
  duplicatedHostNames = [],
  osOptionValue,
  securityIsSbAndFdeEnabled = false,
  onOsOptionChange,
}: HostDetailsProps) => {
  const cy = { "data-cy": dataCy };
  const dispatch = useAppDispatch();

  const { name, resourceId, instance, serialNumber, originalOs, uuid } =
    useAppSelector(selectHostById(hostId));

  const isGlobalSbFdeActive = useAppSelector(selectIsGlobalSbFdeActive);

  const [localName, setLocalName] = useState<string>();
  const [localOsOptionValue, setLocalOsOptionValue] = useState<string>(
    instance?.osID ?? "",
  );
  const [localSecurityIsSbAndFdeEnabled, setLocalSecurityIsSbAndFdeEnabled] =
    useState<boolean>(
      instance?.securityFeature ===
        "SECURITY_FEATURE_SECURE_BOOT_AND_FULL_DISK_ENCRYPTION",
    );

  useEffect(() => {
    const n = name || resourceId || "";
    setLocalName(n);
    dispatch(setHostName({ hostId: hostId, name: n }));
  }, []);

  useEffect(() => {
    // NOTE we read the name from redux,
    // but we keep it in the local state so we can update the view
    // and display errors without updating the redux state
    setLocalName(name);
  }, [name]);

  useEffect(() => {
    if (!osSelectDisabled && osOptionValue) {
      setLocalOsOptionValue(osOptionValue);
    } else if (!localOsOptionValue) {
      setLocalOsOptionValue(instance?.osID ?? "");
    }
  }, [osOptionValue]);

  useEffect(() => {
    if (
      isGlobalSbFdeActive &&
      instance?.os?.securityFeature ===
        "SECURITY_FEATURE_SECURE_BOOT_AND_FULL_DISK_ENCRYPTION"
    ) {
      setLocalSecurityIsSbAndFdeEnabled(securityIsSbAndFdeEnabled);
      dispatch(
        setSecurity({
          hostId: hostId,
          value: securityIsSbAndFdeEnabled
            ? "SECURITY_FEATURE_SECURE_BOOT_AND_FULL_DISK_ENCRYPTION"
            : "SECURITY_FEATURE_NONE",
        }),
      );
    }
  }, [securityIsSbAndFdeEnabled]);

  useEffect(() => {
    dispatch(
      setSecurity({
        hostId: hostId,
        value: "SECURITY_FEATURE_NONE",
      }),
    );
    if (
      instance?.os &&
      instance.os.securityFeature !==
        "SECURITY_FEATURE_SECURE_BOOT_AND_FULL_DISK_ENCRYPTION"
    ) {
      setLocalSecurityIsSbAndFdeEnabled(false);
      if (isGlobalSbFdeActive && securityIsSbAndFdeEnabled) {
        dispatch(setIsGlobalSbFdeActive(false));
      }
    }
  }, [instance?.os?.securityFeature]);

  const osSelectDisabled = !!originalOs;

  const getErrorMessage = () => {
    if (!localName || localName.trim().length == 0)
      return "Name cannot be empty";
    if (localName.trim().length > 20)
      return "Name should not exceed more than 20 characters";
    if (!validNameRegex.test(localName))
      return "Name should not contain special characters";
    if (containsDuplicatedName(duplicatedHostNames, localName))
      return "Name should be unique";
  };

  const getSbFde = () => {
    if (
      instance?.os?.securityFeature ===
      "SECURITY_FEATURE_SECURE_BOOT_AND_FULL_DISK_ENCRYPTION"
    ) {
      return (
        <SecuritySwitch
          value={localSecurityIsSbAndFdeEnabled}
          onChange={(sbFdeEnabled) => {
            dispatch(setIsGlobalSbFdeActive(false));
            dispatch(
              setSecurity({
                hostId: hostId,
                value: sbFdeEnabled
                  ? "SECURITY_FEATURE_SECURE_BOOT_AND_FULL_DISK_ENCRYPTION"
                  : "SECURITY_FEATURE_NONE",
              }),
            );
            setLocalSecurityIsSbAndFdeEnabled(sbFdeEnabled);
          }}
        />
      );
    } else if (instance?.os?.securityFeature) {
      return <i>Not supported by OS</i>;
    } else {
      return <></>;
    }
  };

  return (
    <div {...cy} className="host-details">
      <Flex cols={[3, 3, 3, 3]}>
        <TextField
          data-cy="name"
          size={InputSize.Medium}
          label=""
          errorMessage={getErrorMessage()}
          validationState={
            isValidHostName(localName) &&
            !containsDuplicatedName(duplicatedHostNames, localName)
              ? "valid"
              : "invalid"
          }
          maxLength={20}
          value={localName}
          placeholder="Add Name"
          onChange={(value) => {
            setLocalName(value);
            dispatch(setHostName({ hostId: hostId, name: value }));
          }}
        />
        <div className="sn-uuid">
          <p className="sn-uuid__sn">
            {serialNumber == "" ? "No serial number present" : serialNumber}
          </p>
          <p className="sn-uuid__uuid">{uuid || "No UUID present"}</p>
        </div>
        <OsProfileDropdown
          hostOs={originalOs}
          value={localOsOptionValue}
          hideLabel
          onSelectionChange={(os, effect) => {
            if (!os) return;
            dispatch(setOsProfile({ hostId: hostId, os }));

            onOsOptionChange?.(os, effect);
            setLocalOsOptionValue(os?.resourceId ?? "");
          }}
        />
        {getSbFde()}
      </Flex>
    </div>
  );
};
