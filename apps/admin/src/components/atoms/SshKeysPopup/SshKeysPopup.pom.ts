/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { PopupPom } from "@orch-ui/components";
import { CyApiDetails, CyPom } from "@orch-ui/tests";
import { assignedWorkloadHostOne, instanceTwo } from "@orch-ui/utils";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

type ApiAliases = "getInstanceEmpty" | "getInstance" | "getInstanceError";

const instanceUrl = "**/instances*";
const instanceEndpoint: CyApiDetails<
  ApiAliases,
  infra.GetV1ProjectsByProjectNameComputeInstancesApiResponse
> = {
  getInstance: {
    route: instanceUrl,
    statusCode: 200,
    response: {
      instances: [
        {
          ...instanceTwo,
          host: { ...assignedWorkloadHostOne, instance: undefined },
        },
      ],
      hasNext: false,
      totalElements: 1,
    },
  },
  getInstanceEmpty: {
    route: instanceUrl,
    statusCode: 200,
    response: {
      instances: [],
      hasNext: false,
      totalElements: 0,
    },
  },
  getInstanceError: {
    route: instanceUrl,
    statusCode: 500,
  },
};

class SshKeysPopupPom extends CyPom<Selectors, ApiAliases> {
  popupPom: PopupPom;
  constructor(public rootCy: string = "sshKeysPopup") {
    super(rootCy, [...dataCySelectors], instanceEndpoint);
    this.popupPom = new PopupPom();
  }
}
export default SshKeysPopupPom;
