/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { cm } from "@orch-ui/apis";
import { ConfirmationDialog } from "@orch-ui/components";
import { LpInternalError, SharedStorage } from "@orch-ui/utils";
import { TextField } from "@spark-design/react";
import { ButtonVariant, InputSize, ModalSize } from "@spark-design/tokens";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./DeauthorizeNodeConfirmationDialog.scss";

export const dataCy = "deauthorizeNodeConfirmationDialog";

interface DeauthorizeNodeConfirmationDialogProps {
  name: string;
  hostId: string;
  hostName?: string;
  hostUuid?: string;
  /** getter variable for visibility of confirmation dialog */
  isDeauthConfirmationOpen: boolean;
  /** setter for controlling visibility of confirmation dialog */
  setDeauthorizeConfirmationOpen: (isOpen: boolean) => void;
  /** The Deauthorise process function after node is removed */
  deauthorizeHostFn?: (reason: string) => Promise<any>;
  /** Inform EIM UI of error from ClusterOrch */
  setErrorInfo: (e?: LpInternalError) => void; // TODO: this will be removed as part of LPUUH-951
}

interface DeauthInputs {
  /** The reason why the node/host is deauthorized */
  reason: string;
}

/**
 * This component is only shown when we need a mandatory removal of node from `cluster_orch`,
 * as a pre-requirement for host deauthorize process.
 **/
const DeauthorizeNodeConfirmationDialog = ({
  name,
  hostName,
  hostId,
  hostUuid,
  isDeauthConfirmationOpen,
  setDeauthorizeConfirmationOpen,
  deauthorizeHostFn,
  setErrorInfo,
}: DeauthorizeNodeConfirmationDialogProps) => {
  const cy = { "data-cy": dataCy };
  const projectName = SharedStorage.project?.name ?? "";
  const navigate = useNavigate();

  const [removeHostNodeFromCluster] =
    cm.usePutV2ProjectsByProjectNameClustersAndNameNodesMutation();

  const [deauthorizeReason, setDeauthorizeReason] = useState<string>();

  const { control: controlDeauthBasicInfo } = useForm<DeauthInputs>({
    mode: "all",
  });

  const removeNodeFn = async () => {
    try {
      const deauthorizeFnList: (() => Promise<any>)[] = [];

      if (name && hostUuid) {
        deauthorizeFnList.push(async () => {
          return await removeHostNodeFromCluster({
            projectName,
            name,
            body: [], //TODO: does it need DELETE endpoint to be implemented?
          });
        });
      }
      if (deauthorizeHostFn) {
        deauthorizeFnList.push(
          async () => await deauthorizeHostFn(deauthorizeReason ?? ""),
        );
      }

      // If all details for deleting a node from cluster exists
      Promise.all(deauthorizeFnList)
        .then((promises) => {
          if (promises[0]) promises[0]();

          // Second promise will only be skipped if unassigned/skipNodeDeletion is indicated
          if (promises.length > 1) {
            promises[1]();
          }
        })
        .then(() => {
          setErrorInfo();
          navigate("/infrastructure/deauthorized-hosts");
        });
    } catch (e) {
      setErrorInfo(e);
    }
    setDeauthorizeConfirmationOpen(false);
  };

  const deauthDialogContent = (
    <div data-cy="deauthorizeForm" className="deauthorize-form">
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

  return isDeauthConfirmationOpen ? (
    <ConfirmationDialog
      title="Confirm Host Deauthorization"
      content={
        <div {...cy} className="deauthorize-node-confirmation-dialog">
          <p>Are you sure you want to deauthorize {hostName || hostId}?</p>
          <p>
            The host's security certificates will be invalidated. The host must
            be reprovisioned in order to regain access to the service. Note:
            this process can take up to an hour.
          </p>
          {deauthDialogContent}
        </div>
      }
      isOpen={isDeauthConfirmationOpen}
      confirmBtnVariant={ButtonVariant.Alert}
      confirmCb={removeNodeFn}
      confirmBtnText="Deauthorize"
      cancelCb={() => setDeauthorizeConfirmationOpen(false)}
      buttonPlacement="left-reverse"
      size={ModalSize.Medium}
    />
  ) : (
    <></>
  );
};

export default DeauthorizeNodeConfirmationDialog;
