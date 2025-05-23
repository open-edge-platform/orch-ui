/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import { parseError, SharedStorage } from "@orch-ui/utils";
import { Icon, Tooltip } from "@spark-design/react";
import { ToastState } from "@spark-design/tokens";
import { useEffect } from "react";
import { useAppDispatch } from "../../../store/hooks";
import { showToast } from "../../../store/notifications";
import "./SshKeyInUseByHostsCell.scss";

const dataCy = "sshKeyInUseByHostsCell";

interface SshKeyInUseByHostsCellProps {
  localAccount: infra.LocalAccountRead;
}

const SshKeyInUseByHostsCell = ({
  localAccount,
}: SshKeyInUseByHostsCellProps) => {
  const cy = { "data-cy": dataCy };
  const dispatch = useAppDispatch();

  const {
    data: instanceList,
    isError,
    error,
  } = infra.useInstanceServiceListInstancesQuery({
    projectName: SharedStorage.project?.name ?? "",
    filter: `has(localaccount) AND localaccount.resourceId="${localAccount.resourceId}"`,
  });

  useEffect(() => {
    if (isError) {
      dispatch(
        showToast({
          message: "Error in fetching `In Use` details for some local accounts",
          state: ToastState.Danger,
        }),
      );
    }
  }, [isError]);

  return (
    <div {...cy} className="ssh-key-in-use-by-hosts-cell">
      {instanceList?.totalElements !== 0 || error ? (
        <>
          Yes{" "}
          {error && (
            <Tooltip content={parseError(error).data}>
              <Icon icon="information-circle" artworkStyle="light" />
            </Tooltip>
          )}
        </>
      ) : (
        "No"
      )}
    </div>
  );
};

export default SshKeyInUseByHostsCell;
