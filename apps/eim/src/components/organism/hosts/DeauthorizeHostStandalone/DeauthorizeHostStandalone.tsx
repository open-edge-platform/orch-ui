/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { eim } from "@orch-ui/apis";
import { ConfirmationDialog } from "@orch-ui/components";
import { LpInternalError, SharedStorage } from "@orch-ui/utils";
import { TextField } from "@spark-design/react";
import { ButtonVariant, InputSize, ModalSize } from "@spark-design/tokens";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { setErrorInfo } from "../../../../store/notifications";
import "./DeauthorizeHostStandalone.scss";

export const dataCy = "deauthorizeHostStandalone";

interface DeauthInputs {
  reason: string;
}

interface DeauthorizeHostStandaloneProps {
  hostId: string;
  hostName?: string;
  basePath?: string;
  /** getter variable for visibility of confirmation dialog */
  isDeauthConfirmationOpen: boolean;
  /** setter for controlling visibility of confirmation dialog */
  setDeauthorizeConfirmationOpen: (isOpen: boolean) => void;
}

/**
 * This component is only shown when we need to delete a `host`,
 * without the need for `cluster_orch` for node removal.
 **/
const DeauthorizeHostStandalone = ({
  hostId,
  hostName,
  basePath = "",
  isDeauthConfirmationOpen,
  setDeauthorizeConfirmationOpen,
}: DeauthorizeHostStandaloneProps) => {
  const cy = { "data-cy": dataCy };
  const [deauthorizeReason, setDeauthorizeReason] = useState<string>();
  const { control: controlDeauthBasicInfo } = useForm<DeauthInputs>({
    mode: "all",
  });

  const navigate = useNavigate();
  const [deauthorizeHost] =
    eim.usePutV1ProjectsByProjectNameComputeHostsAndHostIdInvalidateMutation();

  const deauthDialogContent = (
    <div {...cy} className="deauthorize-host-standalone">
      <p>Are you sure you want to deauthorize {hostName || hostId}?</p>
      <p>
        The host's security certificates will be invalidated. The host must be
        reprovisioned in order to regain access to the service. Note: this
        process can take up to an hour.
      </p>
      <Controller
        name="reason"
        control={controlDeauthBasicInfo}
        rules={{
          required: false,
          maxLength: 2048,
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Deauthorize reason (Optional)"
            data-cy="reason"
            onInput={(e) => {
              setDeauthorizeReason(e.currentTarget.value);
            }}
            size={InputSize.Large}
            className="text-field-align"
          />
        )}
      />
    </div>
  );

  const deauthorizeHostFn = (reason: string) => {
    try {
      deauthorizeHost({
        projectName: SharedStorage.project?.name ?? "",
        hostId: hostId,
        hostOperationWithNote: { note: reason },
      })
        .unwrap()
        .then(() => {
          //setErrorInfo();  Why is this being called here ?
          navigate(`${basePath}../deauthorized-hosts`, { relative: "path" });
        });
    } catch (e) {
      setErrorInfo(e as LpInternalError);
    }
    setDeauthorizeConfirmationOpen(false);
  };

  return isDeauthConfirmationOpen ? (
    <ConfirmationDialog
      showTriggerButton={false}
      triggerButtonId="deauthorization-confirmation"
      title="Confirm Host Deauthorization"
      content={deauthDialogContent}
      isOpen={isDeauthConfirmationOpen}
      confirmBtnVariant={ButtonVariant.Alert}
      confirmCb={() => deauthorizeHostFn(deauthorizeReason ?? "")}
      confirmBtnText="Deauthorize"
      cancelCb={() => setDeauthorizeConfirmationOpen(false)}
      buttonPlacement="left-reverse"
      size={ModalSize.Medium}
    />
  ) : (
    <></>
  );
};

export default DeauthorizeHostStandalone;
