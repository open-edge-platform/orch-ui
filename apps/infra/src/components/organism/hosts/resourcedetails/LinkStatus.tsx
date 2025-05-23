/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import { Status, StatusIcon } from "@orch-ui/components";

interface LinkStatusProps {
  status: infra.HostnicResourceRead["linkState"];
}

const LinkStatus = ({ status }: LinkStatusProps) => {
  let s: Status;
  switch (status) {
    case "NETWORK_INTERFACE_LINK_STATE_UP":
      s = Status.Ready;
      break;

    case "NETWORK_INTERFACE_LINK_STATE_DOWN":
      s = Status.Error;
      break;

    default:
      s = Status.Unknown;
  }
  return (
    <StatusIcon
      status={s}
      text={
        status
          ? status
              .replace("NETWORK_INTERFACE_LINK_STATE_", "")
              .replaceAll("_", " ")
          : "Unknown"
      }
    />
  );
};

export default LinkStatus;
