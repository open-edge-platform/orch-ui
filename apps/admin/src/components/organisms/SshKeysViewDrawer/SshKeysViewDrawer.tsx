/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import { copyToClipboard } from "@orch-ui/utils";
import {
  Button,
  ButtonGroup,
  Drawer,
  FieldLabel,
  Icon,
  Text,
} from "@spark-design/react";
import {
  ButtonGroupAlignment,
  ButtonSize,
  ButtonVariant,
  FieldLabelSize,
  ToastState,
} from "@spark-design/tokens";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { showToast } from "../../../store/notifications";
import SshHostsTable from "../../atoms/SshHostsTable/SshHostsTable";
import "./SshKeysViewDrawer.scss";

const dataCy = "sshKeysViewDrawer";
interface SshKeysViewDrawerProps {
  /** Local account value to view */
  localAccount: infra.LocalAccountResourceRead;
  /** Is the drawer open in current state of UI. */
  isOpen?: boolean;
  /** This will be executed when we ckick any of the close button or drawer backdrop.  */
  onHide: () => void;
}
const SshKeysViewDrawer = ({
  isOpen = false,
  localAccount,
  onHide,
}: SshKeysViewDrawerProps) => {
  const cy = { "data-cy": dataCy };

  const dispatch = useAppDispatch();
  const { toastState: toastProps } = useAppSelector(
    (state) => state.notificationStatusList,
  );

  const copySsh = () => {
    copyToClipboard(
      localAccount.sshKey,
      () =>
        dispatch(
          showToast({
            ...toastProps,
            state: ToastState.Success,
            message: "Copied SSH to clipboard successfully",
          }),
        ),
      () =>
        dispatch(
          showToast({
            ...toastProps,
            state: ToastState.Danger,
            message: "Failed to copy SSH to clipboard",
          }),
        ),
    );
  };

  const sshViewDetails = (
    <div data-cy="sshDetails">
      <div className="ssh-field-container">
        <FieldLabel size={FieldLabelSize.Large}>Key Name:</FieldLabel>
        <Text data-cy="sshKeyUsername">{localAccount.username}</Text>
      </div>
      <div className="ssh-field-container">
        <FieldLabel size={FieldLabelSize.Large}>Public Key:</FieldLabel>
        <div className="text-area-container">
          <textarea
            className="ssh-public-key"
            data-cy="sshPublicKey"
            placeholder="No Ssh Key is returned"
            value={localAccount.sshKey}
            contentEditable="false"
          />
          <Button
            data-cy="copySshButton"
            iconOnly
            variant={ButtonVariant.Ghost}
            className="copy-clipboard"
            onPress={copySsh}
          >
            <Icon icon="copy" />
          </Button>
        </div>
      </div>
    </div>
  );
  const sshViewBody = (
    <div data-cy="drawerBody">
      {sshViewDetails}
      <div className="ssh-field-container">
        <SshHostsTable localAccount={localAccount} poll />
      </div>
    </div>
  );
  const sshViewFooter = (
    <ButtonGroup align={ButtonGroupAlignment.End}>
      <Button
        data-cy="cancelFooterBtn"
        size={ButtonSize.Medium}
        onPress={onHide}
        variant={ButtonVariant.Secondary}
      >
        Cancel
      </Button>
    </ButtonGroup>
  );

  return (
    <div {...cy} className="ssh-keys-view-drawer">
      <Drawer
        show={isOpen}
        backdropClosable={true}
        onHide={onHide}
        headerProps={{
          title: "SSH Key Details",
          onHide,
          closable: true,
        }}
        bodyContent={sshViewBody}
        footerContent={sshViewFooter}
      />
    </div>
  );
};

export default SshKeysViewDrawer;
