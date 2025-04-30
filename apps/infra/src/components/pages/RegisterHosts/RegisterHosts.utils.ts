/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import { SharedStorage } from "@orch-ui/utils";
import {
  HostData,
  setHostErrorMessage,
  updateNewRegisteredHost,
} from "../../../store/configureHost";

export const registerHostPost = async (
  dispatch,
  registerHost,
  hosts: { [id: string]: HostData },
  autoOnboard: boolean,
): Promise<number> => {
  const calls: Promise<infra.HostRead>[] = [];
  Object.keys(hosts).forEach((name) => {
    const host = hosts[name];
    const payload: infra.PostV1ProjectsByProjectNameComputeHostsRegisterApiArg =
      {
        projectName: SharedStorage.project?.name ?? "",
        hostRegisterInfo: {
          ...host,
          uuid: host.uuid || undefined,
          autoOnboard,
        },
      };

    calls.push(registerHost(payload).unwrap());
  });

  let registeredCount: number = 0;
  await Promise.allSettled(calls).then(async (responses) => {
    responses
      .map((response, index) => ({ name: Object.keys(hosts)[index], response }))
      .forEach(async ({ name, response }) => {
        if (response.status === "rejected") {
          await dispatch(
            setHostErrorMessage({
              hostName: name,
              message: response.reason.data.message,
            }),
          );
        } else {
          await dispatch(updateNewRegisteredHost({ host: response.value }));
          registeredCount++;
        }
      });
  });
  return registeredCount;
};
