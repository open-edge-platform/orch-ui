/*
 * SPDX-FileCopyrightText: (C) 2026 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import { Modal } from "@orch-ui/components";
import { Button, RadioButton, RadioGroup, Text } from "@spark-design/react";
import { ButtonSize, ButtonVariant, ModalSize } from "@spark-design/tokens";
import "./vProActivationModeModal.scss";

const dataCy = "vProActivationModeModal";

interface vProActivationModeModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  host: infra.HostResourceRead;
  selectedAmtControlMode: infra.AmtControlMode;
  onAmtControlModeChange: (mode: infra.AmtControlMode) => void;
  onActivate: () => void;
}

const VProActivationModeModal = ({
  isOpen,
  onRequestClose,
  host,
  selectedAmtControlMode,
  onAmtControlModeChange,
  onActivate,
}: vProActivationModeModalProps) => {
  const cy = { "data-cy": dataCy };

  return (
    <Modal
      open={isOpen}
      onRequestClose={onRequestClose}
      modalHeading="Activate vPro"
      passiveModal
      isDimissable
      size={ModalSize.Small}
      footerContent={
        <div className="v-pro-activation-mode-modal-footer">
          <Button
            variant={ButtonVariant.Secondary}
            size={ButtonSize.Large}
            onPress={onRequestClose}
            data-cy="cancelBtn"
          >
            Cancel
          </Button>
          <Button
            variant={ButtonVariant.Action}
            size={ButtonSize.Large}
            type="submit"
            onPress={onActivate}
            className="v-pro-activation-mode-modal-activate-btn"
          >
            Activate
          </Button>
        </div>
      }
    >
      <div {...cy} className="v-pro-activation-mode-modal">
        <Text>Select the vPro control mode for {host.name}:</Text>
        <div className="v-pro-activation-mode-modal-radio-group">
          <RadioGroup
            value={selectedAmtControlMode}
            onChange={(value) =>
              onAmtControlModeChange(value as infra.AmtControlMode)
            }
          >
            <RadioButton value="AMT_CONTROL_MODE_ACM">
              ACM (Admin Control Mode)
            </RadioButton>
            <RadioButton value="AMT_CONTROL_MODE_CCM">
              CCM (Client Control Mode)
            </RadioButton>
          </RadioGroup>
          <br />
        </div>
      </div>
    </Modal>
  );
};

export default VProActivationModeModal;
