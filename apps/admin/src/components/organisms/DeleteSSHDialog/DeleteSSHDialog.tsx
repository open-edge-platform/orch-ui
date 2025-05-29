/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import { Modal } from "@orch-ui/components";
import { parseError, SharedStorage } from "@orch-ui/utils";
import { ButtonVariant, ModalSize } from "@spark-design/tokens";
import "./DeleteSSHDialog.scss";

const dataCy = "deleteSSHDialog";

interface DeleteSSHDialogProps {
  ssh: infra.LocalAccountResourceRead;
  onCancel: () => void;
  onDelete?: () => void;
  onError?: (err: string) => void;
}

/**
 * This component is only shown when we need a removal of ssh
 **/
const DeleteSSHDialog = ({
  ssh,
  onCancel,
  onDelete,
  onError,
}: DeleteSSHDialogProps) => {
  const cy = { "data-cy": dataCy };

  const [deleteSsh] = infra.useLocalAccountServiceDeleteLocalAccountMutation();

  const onDeleteSsh = () => {
    const sshName = ssh.sshKey;
    if (!sshName) {
      return;
    }
    deleteSsh({
      projectName: SharedStorage.project?.name ?? "",
      resourceId: ssh.resourceId ?? "",
    })
      .then(() => {
        if (onDelete) onDelete();
      })
      .catch((err) => {
        if (onError) onError(parseError(err).data);
      });
  };

  return (
    <Modal
      modalHeading={`Delete ${ssh.username || "ssh"}?`}
      modalHeadingClassName="delete-ssh-heading"
      open
      primaryBtnVariant={ButtonVariant.Alert}
      onRequestSubmit={onDeleteSsh}
      primaryButtonText="Delete"
      primaryButtonDisabled={!ssh.sshKey}
      secondaryButtonText="Cancel"
      onSecondarySubmit={onCancel}
      onRequestClose={onCancel}
      buttonPlacement="left"
      size={ModalSize.Medium}
    >
      <div {...cy} className="delete-ssh-confirmation-content">
        <p data-cy="confirmationMessage">
          Are you sure you want to delete this SSH key? This action cannot be
          undone.
        </p>
      </div>
    </Modal>
  );
};

export default DeleteSSHDialog;
