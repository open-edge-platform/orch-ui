/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { catalog } from "@orch-ui/apis";
import { Flex } from "@orch-ui/components";
import { parseError, SharedStorage } from "@orch-ui/utils";
import {
  Button,
  ButtonGroup,
  Drawer,
  RadioButton,
  RadioGroup,
  Text,
  TextField,
  Toast,
  ToastProps,
} from "@spark-design/react";
import {
  ButtonGroupAlignment,
  ButtonVariant,
  RadioButtonSize,
  ToastPosition,
  ToastState,
  ToastVisibility,
} from "@spark-design/tokens";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setProps } from "../../../../store/reducers/toast";
import "./ApplicationAddRegistryDrawer.scss";

export const dataCy = "applicationAddRegistryDrawer";

interface ApplicationAddRegistryDrawerProps {
  editRegistryData?: catalog.RegistryRead;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (isOpen: boolean) => void;
}

const ApplicationAddRegistryDrawer = ({
  isDrawerOpen = false,
  setIsDrawerOpen,
  editRegistryData,
}: ApplicationAddRegistryDrawerProps) => {
  const cy = { "data-cy": dataCy };

  const dispatch = useDispatch();
  const toastProps: ToastProps = {
    state: ToastState.Success,
    visibility: ToastVisibility.Hide,
    duration: 3000,
    position: ToastPosition.TopRight,
  };

  const resetFormState: catalog.RegistryRead = {
    name: "",
    displayName: "",
    rootUrl: "",
    type: "HELM",
    username: "",
    authToken: "",
  };
  const [registryFormState, setRegistryFormState] =
    useState<catalog.RegistryRead>(resetFormState);

  const [createRegistry] = catalog.useCatalogServiceCreateRegistryMutation();
  const [editRegistry] = catalog.useCatalogServiceUpdateRegistryMutation();
  const [resetPassword, setResetPassword] = useState<boolean>(false);

  // Update Form only when there is a change in edit Registry
  useEffect(() => {
    if (isDrawerOpen) {
      if (editRegistryData) setRegistryFormState(editRegistryData);
      else setRegistryFormState(resetFormState);
    }
  }, [editRegistryData, isDrawerOpen]);

  useEffect(() => {
    if (resetPassword) {
      setRegistryFormState({
        ...registryFormState,
        ...(resetPassword ? { authToken: "" } : {}),
      });
    }
  }, [resetPassword]);

  const isEditNotPresent = !editRegistryData;
  const isFormValidationSuccess =
    registryFormState.name &&
    registryFormState.rootUrl &&
    registryFormState.type;

  const createRegistryFn = () => {
    if (isFormValidationSuccess) {
      createRegistry({
        projectName: SharedStorage.project?.name ?? "",
        registry: registryFormState,
      })
        .unwrap()
        .then(() => {
          dispatch(
            setProps({
              ...toastProps,
              state: ToastState.Success,
              message: "Application Registry is successfully created",
              visibility: ToastVisibility.Show,
            }),
          );
          setRegistryFormState(resetFormState);
        })
        .catch((err) => {
          dispatch(
            setProps({
              ...toastProps,
              state: ToastState.Danger,
              message: `Error: ${parseError(err).data}`,
              visibility: ToastVisibility.Show,
            }),
          );
          setRegistryFormState(resetFormState);
        });
      setIsDrawerOpen(false);
    } else {
      dispatch(
        setProps({
          ...toastProps,
          state: ToastState.Danger,
          message: "Please enter all required details for adding registry",
          visibility: ToastVisibility.Show,
        }),
      );
    }
  };

  const editRegistryFn = () => {
    if (isFormValidationSuccess) {
      editRegistry({
        projectName: SharedStorage.project?.name ?? "",
        registryName: registryFormState.name,
        registry: registryFormState,
      })
        .unwrap()
        .then(() => {
          dispatch(
            setProps({
              ...toastProps,
              state: ToastState.Success,
              message: "Application Registry is successfully updated",
              visibility: ToastVisibility.Show,
            }),
          );
          setRegistryFormState(resetFormState);
        })
        .catch((err) => {
          dispatch(
            setProps({
              ...toastProps,
              state: ToastState.Danger,
              message: `Error: ${parseError(err).data}`,
              visibility: ToastVisibility.Show,
            }),
          );
          setRegistryFormState(resetFormState);
        });
      setIsDrawerOpen(false);
    } else {
      dispatch(
        setProps({
          ...toastProps,
          state: ToastState.Danger,
          message: "Please enter all required details before updating registry",
          visibility: ToastVisibility.Show,
        }),
      );
    }
  };

  return (
    <div {...cy} className="application-add-registry-drawer">
      <Drawer
        show={isDrawerOpen}
        backdropClosable={true}
        onHide={() => setIsDrawerOpen(false)}
        headerProps={{
          title: editRegistryData
            ? (editRegistryData.displayName ?? editRegistryData.name)
            : "Add a Registry",
          onHide: () => setIsDrawerOpen(false),
          closable: true,
        }}
        bodyContent={
          <form
            autoComplete="off"
            data-cy="drawerContent"
            className="application-add-registry-drawer-content pa-1"
          >
            <Flex cols={[12]} className="pa-1">
              <TextField
                data-cy="registryNameInput"
                id="registryName"
                label="Registry Name *"
                value={registryFormState.displayName}
                isDisabled={!isEditNotPresent}
                onChange={(value) =>
                  setRegistryFormState({
                    ...registryFormState,
                    name: value.toLowerCase().split(" ").join("-"),
                    displayName: value,
                  })
                }
              />
            </Flex>
            <Flex cols={[12]} className="pa-1">
              <TextField
                data-cy="locationInput"
                id="location"
                label="Location *"
                value={registryFormState.rootUrl}
                onChange={(value) =>
                  setRegistryFormState({
                    ...registryFormState,
                    rootUrl: value,
                  })
                }
              />
            </Flex>

            <Flex cols={[12]} className="pa-1">
              <TextField
                id="inventoryUrl"
                data-cy="inventoryInput"
                label="Inventory"
                value={registryFormState.inventoryUrl ?? ""}
                onChange={(value) =>
                  setRegistryFormState({
                    ...registryFormState,
                    inventoryUrl: value,
                  })
                }
              />
            </Flex>

            <Flex cols={[12]} className="registry-type-input pa-1">
              <RadioGroup
                data-cy="typeRadio"
                label="Type *"
                orientation="horizontal"
                value={registryFormState.type}
                size={RadioButtonSize.Large}
                onChange={(value) => {
                  setRegistryFormState({
                    ...registryFormState,
                    type: value,
                  });
                }}
              >
                <RadioButton
                  value="HELM"
                  data-cy="helmRadio"
                  size={RadioButtonSize.Small}
                  className={
                    registryFormState.type === "HELM"
                      ? "type-radio-selected"
                      : ""
                  }
                >
                  Helm
                </RadioButton>
                <RadioButton
                  value="IMAGE"
                  size={RadioButtonSize.Small}
                  data-cy="dockerRadio"
                  className={
                    registryFormState.type === "IMAGE"
                      ? "type-radio-selected"
                      : ""
                  }
                >
                  Docker
                </RadioButton>
              </RadioGroup>
            </Flex>
            <div className="registry-authentication-text">
              <Text>
                Registry Authentication (if required by registry service)
              </Text>
            </div>
            <Flex cols={[12]} className="pa-1">
              <TextField
                autoComplete="off"
                data-cy="usernameInput"
                id="username"
                label="Username"
                value={registryFormState.username ?? ""}
                isDisabled={!isEditNotPresent && !resetPassword}
                onChange={(value) =>
                  setRegistryFormState({
                    ...registryFormState,
                    username: value,
                  })
                }
              />
            </Flex>
            <Flex cols={[12]} className="pa-1">
              <TextField
                data-cy="passwordInput"
                id="password-input"
                type="password"
                autoComplete="off"
                label="Password"
                value={registryFormState.authToken ?? ""}
                isDisabled={!isEditNotPresent && !resetPassword}
                onChange={(value) =>
                  setRegistryFormState({
                    ...registryFormState,
                    authToken: value,
                  })
                }
              />
            </Flex>
            {editRegistryData && (
              <Button
                data-cy="resetPasswordBtn"
                onPress={() => {
                  setResetPassword(true);
                }}
                className="reset-cred-button"
                type="button"
                variant={ButtonVariant.Ghost}
              >
                Reset Password
              </Button>
            )}
          </form>
        }
        footerContent={
          <ButtonGroup
            className="application-add-registry-drawer-footer"
            align={ButtonGroupAlignment.End}
          >
            <Button
              variant={ButtonVariant.Primary}
              onPress={() => {
                setResetPassword(false);
                setIsDrawerOpen(false);
                setRegistryFormState(resetFormState);
              }}
              data-cy="cancelBtn"
            >
              Cancel
            </Button>
            <Button
              variant={ButtonVariant.Action}
              isDisabled={!isFormValidationSuccess}
              onPress={() => {
                setResetPassword(false);
                if (editRegistryData) editRegistryFn();
                else createRegistryFn();
              }}
              data-cy="okBtn"
            >
              OK
            </Button>
          </ButtonGroup>
        }
      />
      <Toast
        {...toastProps}
        onHide={() =>
          setProps({ ...toastProps, visibility: ToastVisibility.Hide })
        }
      />
    </div>
  );
};

export default ApplicationAddRegistryDrawer;
