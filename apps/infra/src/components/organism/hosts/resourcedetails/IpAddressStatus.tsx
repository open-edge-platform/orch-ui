/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { infra } from "@orch-ui/apis";
import { Status, StatusIcon } from "@orch-ui/components";

interface IpAddressStatusProps {
  status: infra.IpAddressResourceRead["status"];
}

const IpAddressStatus = ({ status }: IpAddressStatusProps) => {
  let s: Status;
  switch (status) {
    case "IP_ADDRESS_STATUS_ASSIGNED":
    case "IP_ADDRESS_STATUS_CONFIGURED":
      s = Status.Ready;
      break;

    case "IP_ADDRESS_STATUS_ERROR":
    case "IP_ADDRESS_STATUS_CONFIGURATION_ERROR":
    case "IP_ADDRESS_STATUS_ASSIGNMENT_ERROR":
      s = Status.Error;
      break;

    default:
      s = Status.Unknown;
  }
  return (
    <StatusIcon
      status={s}
      text={status!.replace("IP_ADDRESS_STATUS_", "").replaceAll("_", " ")}
    />
  );
};

export default IpAddressStatus;
