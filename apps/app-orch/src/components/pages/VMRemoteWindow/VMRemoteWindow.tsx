/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import RFB from "@novnc/novnc/lib/rfb";
import { arm } from "@orch-ui/apis";
import { SquareSpinner } from "@orch-ui/components";
import { parseError, SharedStorage } from "@orch-ui/utils";
import { Button } from "@spark-design/react";
import { useCallback, useRef } from "react";
import { useParams } from "react-router-dom";
import "./VMRemoteWindow.scss";

const { useVirtualMachineServiceGetVncQuery } = arm;

export default function VMRemoteWindow() {
  const projectName = SharedStorage.project?.name ?? "";

  const { appId, clusterId, vmId } = useParams();
  const vncClient = useRef<RFB | undefined>();

  const {
    data: vnc,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useVirtualMachineServiceGetVncQuery(
    {
      appId: appId!,
      clusterId: clusterId!,
      virtualMachineId: vmId!,
      projectName,
    },
    {
      skip: !projectName,
    },
  );

  // register event listeners for vnc client
  const register = (rfb: RFB, el: HTMLDivElement) => {
    // TODO Placeholder for the event when connection is established
    // rfb.addEventListener("connect", (e) => {});
    // TODO Placeholder for the event when desktopName is acquired
    // rfb.addEventListener("desktopname", (e) => {});
    // TODO Placeholder for the copy/paste between local and remote
    // rfb.addEventListener("clipboard", (e) => {});
    rfb.addEventListener("credentialsrequired", () => {
      const password = prompt("input password");
      rfb.sendCredentials({
        password: password || "",
        username: "",
        target: "",
      });
    });
    rfb.addEventListener("disconnect", (e) => {
      if (e.detail.clean) {
        el.innerHTML = "Disconnect from remote host";
      } else {
        el.innerHTML = "Something went wrong, connection is closed";
      }
    });
  };

  // mount vnc client when the screen div is ready or API data changes
  const clientSetup = useCallback(
    (el: HTMLDivElement, vnc: arm.GetVncResponse) => {
      const rfb = new RFB(el, vnc.address);
      vncClient.current = rfb;
      rfb.clipViewport = true;
      rfb.scaleViewport = true;

      register(vncClient.current, el);
    },
    [vnc],
  );

  return (
    <div className="container">
      {isLoading && <SquareSpinner message="Loading ..." />}
      {isError && (
        <span className="error_info">{`VNC Loading error: ${
          parseError(error).data
        })`}</span>
      )}
      {isSuccess && vnc && (
        <>
          <div>
            <Button
              onPress={() => {
                // if the btn is visible, the client always exists
                if (vncClient.current) {
                  vncClient.current.sendCtrlAltDel();
                }
              }}
            >
              Send Ctrl + Alt + Del
            </Button>
          </div>
          <div
            ref={(el: HTMLDivElement) => clientSetup(el, vnc)}
            id="vnc-screen"
          />
        </>
      )}
    </div>
  );
}
