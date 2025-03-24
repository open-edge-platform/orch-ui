/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { eim } from "@orch-ui/apis";
import { CyApiDetails, CyPom, defaultActiveProject } from "@orch-ui/tests";
import { instanceOne, workloadOne, workloadOneId } from "@orch-ui/utils";
import OnboardedHostPopupPom from "../../../molecules/OnboardedHostPopup/OnboardedHostPopup.pom";
import ProvisionedHostPopupPom from "../../../molecules/ProvisionedHostPopup/ProvisionedHostPopup.pom";
import RegisteredHostPopupPom from "../../../molecules/RegisteredHostPopup/RegisteredHostPopup.pom";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

type InstanceApiAliases =
  | "getInstanceWithWorkload"
  | "getInstanceWithoutWorkload";
type DeleteApiAliases = "deleteHost" | "deleteInstance";

type ApiAliases = InstanceApiAliases | DeleteApiAliases;

const instanceEndpoints: CyApiDetails<
  InstanceApiAliases,
  eim.GetV1ProjectsByProjectNameComputeInstancesAndInstanceIdApiResponse
> = {
  getInstanceWithWorkload: {
    route: `**/v1/projects/${defaultActiveProject.name}/compute/instances/**`,
    statusCode: 200,
    response: {
      ...instanceOne,
      workloadMembers: [
        {
          kind: "WORKLOAD_MEMBER_KIND_CLUSTER_NODE",
          resourceId: workloadOneId,
          workloadMemberId: workloadOneId,
          workload: workloadOne,
        },
      ],
    },
  },
  getInstanceWithoutWorkload: {
    route: `**/v1/projects/${defaultActiveProject.name}/compute/instances/**`,
    statusCode: 200,
    response: { ...instanceOne, workloadMembers: undefined },
  },
};

const deleteEndpoints: CyApiDetails<
  DeleteApiAliases,
  eim.DeleteV1ProjectsByProjectNameComputeHostsAndHostIdApiResponse
  // | eim.DeleteV1ProjectsByProjectNameComputeInstancesAndInstanceIdApiResponse
> = {
  deleteHost: {
    method: "DELETE",
    route: `**/v1/projects/${defaultActiveProject.name}/compute/hosts/**`,
    statusCode: 200,
  },
  deleteInstance: {
    method: "DELETE",
    route: `**/v1/projects/${defaultActiveProject.name}/compute/instances/**`,
    statusCode: 200,
  },
};

class HostDetailsActionsPom extends CyPom<Selectors, ApiAliases> {
  public onboardedHostPopupPom: OnboardedHostPopupPom;
  public registeredHostPopupPom: RegisteredHostPopupPom;
  public provisionedHostPopupPom: ProvisionedHostPopupPom;

  constructor(public rootCy = "hostDetailsActions") {
    super(rootCy, [...dataCySelectors], {
      ...instanceEndpoints,
      ...deleteEndpoints,
    });
    this.onboardedHostPopupPom = new OnboardedHostPopupPom();
    this.registeredHostPopupPom = new RegisteredHostPopupPom();
    this.provisionedHostPopupPom = new ProvisionedHostPopupPom();
  }
}

export default HostDetailsActionsPom;
