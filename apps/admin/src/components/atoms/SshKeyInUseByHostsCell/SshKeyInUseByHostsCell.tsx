/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { eim } from "@orch-ui/apis";
import { parseError, SharedStorage } from "@orch-ui/utils";
import { Icon, Tooltip } from "@spark-design/react";
import { ToastState } from "@spark-design/tokens";
import { memo, useEffect, useState } from "react";
import { useAppDispatch } from "../../../store/hooks";
import { showToast } from "../../../store/notifications";
import "./SshKeyInUseByHostsCell.scss";

export const dataCy = "sshKeyInUseByHostsCell";

interface SshKeyInUseByHostsCellProps {
  localAccount: eim.LocalAccountRead;
}

const SshKeyInUseByHostsCell = memo(
  ({ localAccount }: SshKeyInUseByHostsCellProps) => {
    const cy = { "data-cy": dataCy };
    const dispatch = useAppDispatch();
    const [sshInUse, setSshInUse] = useState<boolean>(true);
    const [error, setError] = useState<string | undefined>("Loading...");

    // This will call only first time a row is displayed or when the details of localaccount changes
    // Note: this doesnot care about he host update (happening on any other page;
    //       but it will be update when the page is switched-revisited/refreshed)
    // TODO: Optimize, This may require an derived attribute from api for `sshInUse:boolean` flag
    useEffect(() => {
      if (SharedStorage.project?.name) {
        const showError = (err: any) => {
          const message = parseError(err).data;
          setError(
            `Error in getting list. ${message ? `Error: ${message}` : ""}`,
          );
          dispatch(
            showToast({
              message:
                "Error in fetching `In Use` details for some local accounts",
              state: ToastState.Danger,
            }),
          );
        };
        dispatch(
          eim.eim.endpoints.getV1ProjectsByProjectNameComputeInstances.initiate(
            {
              projectName: SharedStorage.project.name,
              filter: `has(localaccount) AND localaccount.resourceId="${localAccount.resourceId}"`,
            },
          ),
        ).then((res) => {
          if (res.isError) {
            showError(res.error);
          } else if (res.data) {
            setSshInUse(res.data.totalElements !== 0);
            setError(undefined);
          }
        });
      }
    }, [localAccount]);

    return (
      <div {...cy} className="ssh-key-in-use-by-hosts-cell">
        {sshInUse || error ? (
          <>
            Yes{" "}
            {error && (
              <Tooltip content={error}>
                <Icon icon="information-circle" artworkStyle="light" />
              </Tooltip>
            )}
          </>
        ) : (
          "No"
        )}
      </div>
    );
  },
);

export default SshKeyInUseByHostsCell;
