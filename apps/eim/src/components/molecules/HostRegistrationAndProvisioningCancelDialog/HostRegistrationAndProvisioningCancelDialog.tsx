/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { ConfirmationDialog } from "@orch-ui/components";
import { ButtonVariant } from "@spark-design/tokens";
import { useNavigate } from "react-router-dom";
import { reset } from "../../../store/configureHost";
import { useAppDispatch } from "../../../store/hooks";
export const dataCy = "hostRegistrationAndProvisioningCancelDialog";
interface HostRegistrationAndProvisioningCancelDialogProps {
  isOpen: boolean;
  onClose: () => void;
}
const HostRegistrationAndProvisioningCancelDialog = ({
  isOpen,
  onClose,
}: HostRegistrationAndProvisioningCancelDialogProps) => {
  const cy = { "data-cy": dataCy };
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  return (
    <div {...cy} className="host-registration-and-provisioning-setup-dialog">
      <ConfirmationDialog
        title="Cancel Host Registration and Provisioning Setup?"
        content="Any progress made in the setup will be lost, and no hosts will be registered"
        isOpen={isOpen}
        confirmCb={() => {
          onClose();
        }}
        confirmBtnText="Continue Setup"
        confirmBtnVariant={ButtonVariant.Primary}
        cancelBtnText="Cancel Setup"
        cancelBtnVariant={ButtonVariant.Action}
        cancelCb={() => {
          onClose();
          dispatch(reset());
          navigate("../hosts");
        }}
      />
    </div>
  );
};

export default HostRegistrationAndProvisioningCancelDialog;
