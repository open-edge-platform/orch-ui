/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { eim } from "@orch-ui/apis";
import { Status, StatusIcon } from "@orch-ui/components";

interface LinkStatusProps {
  status: eim.LinkStateRead["type"];
}

const LinkStatus = ({ status }: LinkStatusProps) => {
  let s: Status;
  switch (status) {
    case "LINK_STATE_UP":
      s = Status.Ready;
      break;

    case "LINK_STATE_DOWN":
      s = Status.Error;
      break;

    default:
      s = Status.Unknown;
  }
  return (
    <StatusIcon
      status={s}
      text={status.replace("LINK_STATE_", "").replaceAll("_", " ")}
    />
  );
};

export default LinkStatus;
