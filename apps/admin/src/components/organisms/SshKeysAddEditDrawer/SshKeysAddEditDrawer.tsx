/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { eim } from "@orch-ui/apis";
import {
  Button,
  ButtonGroup,
  Drawer,
  FieldLabel,
  TextField,
} from "@spark-design/react";
import {
  ButtonGroupAlignment,
  ButtonSize,
  ButtonVariant,
  FieldLabelSize,
  InputSize,
} from "@spark-design/tokens";
import { useEffect, useState } from "react";
import { Controller, FieldError, useForm } from "react-hook-form";
import "./SshKeysAddEditDrawer.scss";

const dataCy = "sshKeysAddEditDrawer";

interface SshKeysAddEditDrawerProps {
  /** Is the drawer open in current state of UI. */
  isOpen?: boolean;
  /** Initial local account value (used in case of edit) */
  defaultLocalAccount?: eim.LocalAccountRead;
  /** This will be executed when we ckick any of the close button or drawer backdrop.  */
  onHide: () => void;
  /** This will be executed when we click the Add button */
  onAdd?: (ssh: eim.LocalAccount) => void;
  /** This will be executed when we click the Edit button */
  onEdit?: (ssh: eim.LocalAccountRead) => void;
}

const SshKeysAddEditDrawer = ({
  isOpen = false,
  defaultLocalAccount,
  onHide,
  onAdd,
  onEdit,
}: SshKeysAddEditDrawerProps) => {
  const cy = { "data-cy": dataCy };

  const resetValue: eim.LocalAccount = { username: "", sshKey: "" };
  const [localAccountWrite, setLocalAccountWrite] = useState<eim.LocalAccount>(
    defaultLocalAccount ?? resetValue,
  );
  const [isSshValid, setIsSshValid] = useState<boolean>(true);

  const {
    control,
    handleSubmit,
    unregister,
    formState: { errors, isValid },
  } = useForm<eim.LocalAccount>({
    mode: "all",
    values: localAccountWrite,
  });

  useEffect(() => {
    /*
     * Unregisters form fields when dialog's open state changes.
     * this will reset values and errors in the form when dialog closes
     */
    unregister();
  }, [open]);

  const hasFieldError = (fieldError?: FieldError) => {
    return fieldError && Object.keys(fieldError).length > 0;
  };
  const isValidated = () => {
    return !(hasFieldError(errors.username) || hasFieldError(errors.username));
  };

  const handleSshSubmit = () => {
    const onSubmit = defaultLocalAccount ? onEdit : onAdd;
    const localAccountBody = defaultLocalAccount
      ? { ...localAccountWrite, resourceId: defaultLocalAccount?.resourceId }
      : localAccountWrite;
    if (isValidated() && onSubmit) onSubmit(localAccountBody);
    setLocalAccountWrite(resetValue);
    onHide();
  };

  const sshAddEditFormBody = (
    <form data-cy="drawerFormBody" onSubmit={handleSubmit(handleSshSubmit)}>
      <div className="ssh-field-container">
        <FieldLabel size={FieldLabelSize.Large}>
          Key Name (will be used as host's account username) *
        </FieldLabel>
        <Controller
          name="username"
          control={control}
          rules={{
            required: true,
            pattern: /^[a-z][a-z0-9-]{0,31}$/,
          }}
          render={({ field }) => (
            <TextField
              {...field}
              className="ssh-key-username"
              data-cy="sshKeyUsername"
              placeholder={defaultLocalAccount?.username || "Enter name"}
              onInput={(e) =>
                setLocalAccountWrite({
                  ...localAccountWrite,
                  username: e.currentTarget.value,
                })
              }
              validationState={
                errors.username !== undefined ? "invalid" : "valid"
              }
              errorMessage={
                errors.username !== undefined
                  ? "Username must begin with a lowercase letter and contain only lowercase letters, numbers, and hyphens"
                  : ""
              }
              size={InputSize.Large}
              pattern="^[a-z][a-z0-9-]{0,31}$"
              isRequired
            />
          )}
        />
      </div>
      <div className="ssh-field-container">
        <FieldLabel size={FieldLabelSize.Large}>Public Key *</FieldLabel>
        <Controller
          name="sshKey"
          control={control}
          rules={{
            required: true,
            pattern:
              /^(ssh-ed25519|ecdsa-sha2-nistp521) ([A-Za-z0-9+/=]+) ?(.*)?$/,
          }}
          render={({ field }) => (
            <textarea
              {...field}
              className="ssh-public-key"
              data-cy="sshPublicKey"
              placeholder={defaultLocalAccount?.sshKey || ""}
              onInput={(e) => {
                const pattern =
                  /^(ssh-ed25519|ecdsa-sha2-nistp521) ([A-Za-z0-9+/=]+) ?(.*)?$/;
                const isValid = pattern.test(e.currentTarget.value);
                setIsSshValid(isValid);
                setLocalAccountWrite({
                  ...localAccountWrite,
                  sshKey: e.currentTarget.value,
                });
              }}
              required
            />
          )}
        />
        {!isSshValid && (
          <div
            className="textarea-error-message"
            data-cy="sshInputErrorMessage"
          >
            Ssh is invalid! please provide a pattern for an ssh-ed25519 or
            ecdsa-sha2-nistp521
          </div>
        )}
      </div>
    </form>
  );

  const sshAddEditFormFooter = (
    <ButtonGroup align={ButtonGroupAlignment.End}>
      <Button
        data-cy="cancelFooterBtn"
        size={ButtonSize.Medium}
        onPress={onHide}
        variant={ButtonVariant.Secondary}
      >
        Cancel
      </Button>
      <Button
        data-cy="addEditBtn"
        type="submit"
        isDisabled={!isValid}
        size={ButtonSize.Medium}
        variant={ButtonVariant.Action}
        onPress={handleSshSubmit}
      >
        {defaultLocalAccount ? "Save" : "Add"}
      </Button>
    </ButtonGroup>
  );

  return (
    <div {...cy} className="ssh-keys-add-edit-drawer">
      <Drawer
        show={isOpen}
        backdropClosable={true}
        onHide={onHide}
        className="ssh-keys-add-edit-drawer-root"
        headerProps={{
          title: `${
            defaultLocalAccount ? "Edit" : "Enter"
          } SSH Key information to enable local host access`,
          onHide,
          closable: true,
        }}
        bodyContent={sshAddEditFormBody}
        footerContent={sshAddEditFormFooter}
      />
    </div>
  );
};

export default SshKeysAddEditDrawer;
