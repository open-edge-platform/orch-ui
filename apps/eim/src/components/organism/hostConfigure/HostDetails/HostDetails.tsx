/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { eim } from "@orch-ui/apis";
import { Flex } from "@orch-ui/components";
import { TextField } from "@spark-design/react";
import { InputSize } from "@spark-design/tokens";
import { useCallback, useEffect, useState } from "react";
import {
  selectHostById,
  setHostName,
  setOsProfile,
  setSecurity,
} from "../../../../store/configureHost";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import OsProfileDropdown from "../../OsProfileDropdown/OsProfileDropdown";
import { SecurityDropdown } from "../SecurityDropdown/SecurityDropdown";
import "./HostDetails.scss";

export const dataCy = "details";

/** Return true for valid and false for invalid host name */
export const isValidHostName = (name?: string) =>
  // If host name is not explicitly defined as string, then we do not show error.
  name === undefined ||
  name === "" ||
  // If host name is defined as a string or an empty string, then we perform validation on it.
  (name.length !== 0 && name.length <= 20 && /^[a-zA-Z-_0-9./: ]+$/.test(name));

const containsDuplicatedName = (duplicates: string[], name?: string) => {
  if (!name) return false;
  return duplicates.includes(name);
};

// should be already disabled by {ignoreTopLevelFunctions: true} in the rule definition
interface HostDetailsProps {
  hostId: string;
  duplicatedHostNames?: string[];
  osOptionValue?: string;
  securityOptionValue?: string;
  onOsOptionChange?: (os: eim.OperatingSystemResource, effect: boolean) => void;
  onSecurityOptionChange?: (bootOption: string) => void;
}

// eslint-disable-next-line max-statements
export const HostDetails = ({
  hostId,
  duplicatedHostNames = [],
  osOptionValue,
  securityOptionValue,
  onOsOptionChange,
  onSecurityOptionChange,
}: HostDetailsProps) => {
  const cy = { "data-cy": dataCy };
  const dispatch = useAppDispatch();

  const { name, resourceId, instance, serialNumber, originalOs } =
    useAppSelector(selectHostById(hostId));

  const [localName, setLocalName] = useState<string>();
  const [localOsOptionValue, setLocalOsOptionValue] = useState<string>(
    instance?.osID ?? "",
  );
  const [localSecurityOptionValue, setLocalSecurityOptionValue] =
    useState<string>(
      instance?.securityFeature ?? instance?.os?.securityFeature ?? "",
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
    if (instance?.securityFeature) {
      setLocalSecurityOptionValue(instance.securityFeature);
    }
  }, [instance?.securityFeature]);

  useEffect(() => {
    if (!securitySelectDisabled && securityOptionValue) {
      setLocalSecurityOptionValue(securityOptionValue);
      dispatch(
        setSecurity({
          hostId: hostId,
          value: securityOptionValue as eim.SecurityFeature,
        }),
      );
    } else if (!localSecurityOptionValue) {
      setLocalSecurityOptionValue(
        instance?.securityFeature ?? instance?.os?.securityFeature ?? "",
      );
    }
  }, [securityOptionValue]);

  const isOsSbFdeCapable = useCallback(() => {
    if (originalOs) {
      return (
        originalOs.securityFeature ===
        "SECURITY_FEATURE_SECURE_BOOT_AND_FULL_DISK_ENCRYPTION"
      );
    }
    if (!instance?.os || !instance?.os.securityFeature) return false;
    return (
      instance.os.securityFeature ===
      "SECURITY_FEATURE_SECURE_BOOT_AND_FULL_DISK_ENCRYPTION"
    );
  }, [instance?.os, originalOs]);

  const osSelectDisabled = !!originalOs;
  const securitySelectDisabled =
    !isOsSbFdeCapable() || originalOs !== undefined;

  const getErrorMessage = () => {
    if (!isValidHostName(localName)) {
      return "Name should not contain special characters";
    }
    if (containsDuplicatedName(duplicatedHostNames, localName)) {
      return "Name should be unique";
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
        <div className="serial">{serialNumber}</div>
        <OsProfileDropdown
          hostOs={originalOs}
          value={localOsOptionValue}
          hideLabel
          onSelectionChange={(os, effect) => {
            if (!os) return;
            if (
              os.securityFeature &&
              (os.securityFeature === "SECURITY_FEATURE_NONE" ||
                !instance?.securityFeature)
            ) {
              dispatch(
                setSecurity({
                  hostId: hostId,
                  value: os.securityFeature,
                }),
              );
              setLocalSecurityOptionValue(os.securityFeature);
            }
            dispatch(setOsProfile({ hostId: hostId, os }));

            onOsOptionChange?.(os, effect);
            setLocalOsOptionValue(os?.resourceId ?? "");
          }}
        />
        <SecurityDropdown
          options={[
            [
              "SECURITY_FEATURE_SECURE_BOOT_AND_FULL_DISK_ENCRYPTION",
              "Full Disk Encryption",
            ],
            ["SECURITY_FEATURE_NONE", "None"],
          ]}
          value={localSecurityOptionValue}
          isDisabled={securitySelectDisabled}
          onSelectionChange={(value) => {
            if (
              instance?.securityFeature &&
              localSecurityOptionValue === value
            ) {
              return;
            }
            dispatch(
              setSecurity({
                hostId: hostId,
                value: value as eim.SecurityFeature,
              }),
            );
            onSecurityOptionChange?.(value);
            setLocalSecurityOptionValue(value);
          }}
        />
      </Flex>
    </div>
  );
};
