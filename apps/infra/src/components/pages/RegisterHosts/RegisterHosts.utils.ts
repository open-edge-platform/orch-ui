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
import { updateRegisteredHost } from "../../../store/provisionHost";

export const registerHostPost = async (
  dispatch,
  registerHost,
  hosts: { [id: string]: HostData },
  autoOnboard: boolean,
): Promise<number> => {
  const calls: Promise<infra.HostResourceRead>[] = [];
  Object.keys(hosts).forEach((name) => {
    const host = hosts[name];
    const payload: infra.HostServiceRegisterHostApiArg = {
      projectName: SharedStorage.project?.name ?? "",
      hostRegister: {
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
          // TODO: remove
          await dispatch(updateNewRegisteredHost({ host: response.value }));
          dispatch(updateRegisteredHost({ host: response.value }));
          registeredCount++;
        }
      });
  });
  return registeredCount;
};
