/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { SiTablePom } from "@orch-ui/poms";
import { CyApiDetails, CyPom } from "@orch-ui/tests";
import NodeRoleDropdownPom from "../../atom/NodeRoleDropdown/NodeRoleDropdown.pom";

const dataCySelectors = [] as const;
type Selectors = (typeof dataCySelectors)[number];

type ApiAliases = "getHosts" | "getHostsWithTCEnabled";

const route = "**/v1/**/compute/hosts?filter=resourceId**";

const endpoints: CyApiDetails<
  ApiAliases,
  infra.GetV1ProjectsByProjectNameComputeHostsApiResponse
> = {
  getHosts: {
    route,
    statusCode: 200,
    response: {
      hasNext: false,
      hosts: [
        {
          resourceId: "hostId",
          name: "Node 1",
          instance: {
            os: {
              name: "linux",
              sha256: "sha",
              updateSources: [],
            },
          },
        },
      ],
      totalElements: 1,
    },
  },
  getHostsWithTCEnabled: {
    route,
    statusCode: 200,
    response: {
      hasNext: false,
      hosts: [
        {
          resourceId: "hostId",
          name: "Node 1",
          currentState: "HOST_STATE_ONBOARDED",
          instance: {
            os: {
              name: "linux",
              sha256: "sha",
              updateSources: [],
            },
            securityFeature:
              "SECURITY_FEATURE_SECURE_BOOT_AND_FULL_DISK_ENCRYPTION",
            currentState: "INSTANCE_STATE_RUNNING",
          },
        },
      ],
      totalElements: 1,
    },
  },
};

class ClusterNodesTablePom extends CyPom<Selectors, ApiAliases> {
  public table = new SiTablePom();
  public nodeRoleDropdown = new NodeRoleDropdownPom();

  constructor(public rootCy: string = "clusterNodesTable") {
    super(rootCy, [...dataCySelectors], endpoints);
  }
}
export default ClusterNodesTablePom;
