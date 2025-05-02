/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import { Flex } from "@orch-ui/components";
import { SharedStorage } from "@orch-ui/utils";
import {
  Button,
  ButtonGroup,
  Drawer,
  TextField,
  ToggleSwitch,
} from "@spark-design/react";
import { ButtonSize, InputSize } from "@spark-design/tokens";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useAppDispatch } from "../../../store/hooks";
import {
  hasFieldError,
  showErrorMessageBanner,
  showSuccessMessageBanner,
} from "../../../store/utils";
import "./RegisterHostDrawer.scss";

const dataCy = "registerHostDrawer";
export interface RegisterHostDrawerProps {
  isOpen: boolean;
  onHide: (registerHost: infra.HostRegisterInfo) => void;
  host?: infra.HostRead;
}

export const RegisterHostDrawer = ({
  isOpen,
  onHide,
  host,
}: RegisterHostDrawerProps) => {
  const cy = { "data-cy": dataCy };
  const dispatch = useAppDispatch();
  const formDefault: infra.HostRegisterInfo = {
    name: host?.name ?? "",
    serialNumber: host?.serialNumber ?? "",
    uuid: host?.uuid,
    autoOnboard: host?.desiredState === "HOST_STATE_ONBOARDED",
  };
  const [hostRegisterInfo, setHostRegisterInfo] =
    useState<infra.HostRegisterInfo>(formDefault);
  const [registerHost] =
    infra.usePostV1ProjectsByProjectNameComputeHostsRegisterMutation();
  const [updateHost] =
    infra.usePatchV1ProjectsByProjectNameComputeHostsAndHostIdRegisterMutation();
  const {
    control: registerHostInfoControl,
    formState: { errors: formErrors },
  } = useForm<infra.HostRegisterInfo>({
    mode: "all",
    defaultValues: hostRegisterInfo,
    values: hostRegisterInfo,
  });
  const hasFormError = () =>
    !(hostRegisterInfo.uuid || hostRegisterInfo.serialNumber) ||
    hasFieldError(formErrors.name) === "invalid" ||
    hasFieldError(formErrors.uuid) === "invalid" ||
    hasFieldError(formErrors.serialNumber) === "invalid";
  const onUpdate = () => {
    if (!host?.resourceId) return;
    updateHost({
      body: {
        name: hostRegisterInfo.name,
        autoOnboard: hostRegisterInfo.autoOnboard,
      },
      hostId: host.resourceId,
      projectName: SharedStorage.project?.name ?? "",
    })
      .unwrap()
      .then(() => {
        showSuccessMessageBanner(dispatch, "Saved registered host.");
        onHideDrawer();
      })
      .catch((error: { data: any }) => {
        showErrorMessageBanner(
          dispatch,
          `Failed to save host !  ${error.data.message ?? ""}`,
        );
      });
  };
  const onRegister = () => {
    const payload = {
      projectName: SharedStorage.project?.name ?? "",
      hostRegisterInfo: {
        ...hostRegisterInfo,
        uuid: hostRegisterInfo.uuid === "" ? undefined : hostRegisterInfo.uuid,
      },
    };

    registerHost(payload)
      .unwrap()
      .then(() => {
        showSuccessMessageBanner(dispatch, "Successfully registered host !");
        onHideDrawer();
      })
      .catch((error: { data: any }) => {
        showErrorMessageBanner(
          dispatch,
          `Failed to register host !  ${error.data.message ?? ""}`,
        );
      });
  };
  const onHideDrawer = () => {
    onHide(hostRegisterInfo);
    setHostRegisterInfo(formDefault);
  };

  const getDrawerContent = () => {
    return (
      <form className="register-host-form" data-cy="registerHostForm">
        <Flex cols={[6, 6]}>
          <Controller
            name="name"
            control={registerHostInfoControl}
            rules={{
              required: false,
              maxLength: 2048,
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Host Name"
                data-cy="hostName"
                onInput={(e) => {
                  setHostRegisterInfo({
                    ...hostRegisterInfo,
                    name: e.currentTarget.value,
                  });
                }}
                size={InputSize.Large}
                className="text-field-align"
                placeholder="Enter the host name"
              />
            )}
          />
          <Controller
            name="serialNumber"
            control={registerHostInfoControl}
            rules={{
              required: false,
              minLength: {
                value: 5,
                message: "Must be greater than 5 characters",
              },
              maxLength: {
                value: 20,
                message: "Must be less than 20 characters",
              },
            }}
            render={({ field, fieldState: { error } }) => {
              const validationState = error ? "invalid" : "valid";
              return (
                <TextField
                  {...field}
                  label="Serial Number"
                  errorMessage={validationState === "invalid" && error?.message}
                  validationState={validationState}
                  data-cy="serialNumber"
                  onInput={(e) => {
                    setHostRegisterInfo({
                      ...hostRegisterInfo,
                      serialNumber: e.currentTarget.value,
                    });
                  }}
                  isDisabled={host !== undefined}
                  size={InputSize.Large}
                  className="text-field-align"
                  placeholder={!host ? "Enter the host serial number" : ""}
                />
              );
            }}
          />
        </Flex>
        <Flex cols={[12]}>
          <div className="pa-1">
            <Controller
              name="uuid"
              control={registerHostInfoControl}
              rules={{
                required: false,
                pattern: {
                  value:
                    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
                  message: "UUID does not match expected format",
                },
              }}
              render={({ field, fieldState: { error } }) => {
                const validationState = error ? "invalid" : "valid";
                return (
                  <TextField
                    {...field}
                    label="UUID"
                    data-cy="uuid"
                    onInput={(e) => {
                      setHostRegisterInfo({
                        ...hostRegisterInfo,
                        uuid: e.currentTarget.value,
                      });
                    }}
                    isDisabled={host !== undefined}
                    size={InputSize.Large}
                    errorMessage={
                      validationState === "invalid" && error?.message
                    }
                    validationState={validationState}
                    placeholder="Enter the host uuid"
                  />
                );
              }}
            />
          </div>
        </Flex>
        <Flex cols={[6]}>
          <div className="pa-1">
            <ToggleSwitch
              data-cy="isAutoOnboarded"
              isSelected={hostRegisterInfo.autoOnboard}
              onChange={(value) => {
                setHostRegisterInfo({
                  ...hostRegisterInfo,
                  autoOnboard: value,
                });
              }}
              className="auto-onboard-switch"
            >
              <label>Auto Onboard</label>
            </ToggleSwitch>
          </div>
        </Flex>
      </form>
    );
  };

  const getFooterContent = () => {
    return (
      <ButtonGroup align="end">
        <Button
          size={ButtonSize.Large}
          onPress={onHideDrawer}
          variant="secondary"
        >
          Cancel
        </Button>
        <Button
          size={ButtonSize.Large}
          data-cy="confirmButton"
          onPress={host ? onUpdate : onRegister}
          isDisabled={hasFormError()}
        >
          {`${host ? "Save" : "Register"}`}
        </Button>
      </ButtonGroup>
    );
  };

  useEffect(() => {
    if (host) {
      setHostRegisterInfo({
        name: host?.name ?? "",
        serialNumber: host?.serialNumber ?? "",
        uuid: host?.uuid,
        autoOnboard: host?.desiredState === "HOST_STATE_ONBOARDED",
      });
    } else {
      setHostRegisterInfo({
        name: "",
        serialNumber: "",
        autoOnboard: false,
      });
    }
  }, [host]);

  return (
    <div {...cy} className="register-host-drawer">
      <Drawer
        show={isOpen}
        onHide={onHideDrawer}
        headerProps={{
          onHide: onHideDrawer,
          title: `${host ? "Edit" : "Register"} Host`,
          subTitle: "Serial Number or UUID is required",
          className: "register-host-drawer-header",
          closable: true,
        }}
        bodyContent={getDrawerContent()}
        footerContent={getFooterContent()}
        backdropClosable
      />
    </div>
  );
};
