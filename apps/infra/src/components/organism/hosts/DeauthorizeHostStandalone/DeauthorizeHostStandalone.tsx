/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import { ConfirmationDialog } from "@orch-ui/components";
import {
  hostsRoute,
  InternalError,
  SharedStorage,
  useInfraNavigate,
} from "@orch-ui/utils";
import { TextField } from "@spark-design/react";
import { ButtonVariant, InputSize, ModalSize } from "@spark-design/tokens";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { setErrorInfo } from "../../../../store/notifications";
import "./DeauthorizeHostStandalone.scss";

const dataCy = "deauthorizeHostStandalone";

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
  isDeauthConfirmationOpen,
  setDeauthorizeConfirmationOpen,
}: DeauthorizeHostStandaloneProps) => {
  const cy = { "data-cy": dataCy };
  const [deauthorizeReason, setDeauthorizeReason] = useState<string>("");
  const { control: controlDeauthBasicInfo } = useForm<DeauthInputs>({
    mode: "all",
  });

  const navigate = useInfraNavigate();
  const [deauthorizeHost] = infra.useHostServiceInvalidateHostMutation();
  const [patchHost] = infra.useHostServicePatchHostMutation();

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
            label="Reason for deauthorization"
            data-cy="reason"
            onInput={(e) => {
              const value = e.currentTarget.value;
              setDeauthorizeReason(value);
              field.onChange(value);
            }}
            size={InputSize.Large}
            className="text-field-align"
          />
        )}
      />
    </div>
  );

  const deauthorizeHostFn = async (reason: string) => {
    try {
      await patchHost({
        projectName: SharedStorage.project?.name ?? "",
        resourceId: hostId,
        hostResource: {
          name: hostName || hostId,
          desiredAmtState: "AMT_STATE_UNPROVISIONED",
          desiredPowerState: "POWER_STATE_OFF",
        },
      }).unwrap();

      await deauthorizeHost({
        projectName: SharedStorage.project?.name ?? "",
        resourceId: hostId,
        note: reason,
      }).unwrap();
    } catch (e) {
      setErrorInfo(e as InternalError);
    } finally {
      setDeauthorizeConfirmationOpen(false);
      navigate(hostsRoute);
    }
  };

  return isDeauthConfirmationOpen ? (
    <ConfirmationDialog
      showTriggerButton={false}
      triggerButtonId="deauthorization-confirmation"
      title="Confirm Host Deauthorization"
      content={deauthDialogContent}
      isOpen={isDeauthConfirmationOpen}
      confirmBtnVariant={ButtonVariant.Alert}
      confirmBtnDisabled={
        !deauthorizeReason || deauthorizeReason.trim().length === 0
      }
      confirmCb={() => deauthorizeHostFn(deauthorizeReason ?? "")}
      confirmBtnText="Deauthorize"
      cancelCb={() => setDeauthorizeConfirmationOpen(false)}
      size={ModalSize.Medium}
    />
  ) : (
    <></>
  );
};

export default DeauthorizeHostStandalone;
