/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { eim } from "@orch-ui/apis";
import { SiTablePom } from "@orch-ui/poms";
import { Cy, CyApiDetails, CyPom, defaultActiveProject } from "@orch-ui/tests";
import { InstanceStore } from "@orch-ui/utils";

const dataCySelectors = ["empty", "removeHostBtn"] as const;
type Selectors = (typeof dataCySelectors)[number];

type SuccessApiAliases =
  | "instancesListSuccess"
  | "instancesListSuccessWithFilter"
  | "instancesListSuccessWithOrder"
  | "instancesListSuccessWithOffset"
  | "instancesListEmpty"
  | "getAssignedMocked"
  | "getUnassigned"
  | "getUnassignedMocked"
  | "getInstanceListAfterDeleteMocked";

type ErrorApiAliases = "instancesListError500";

type ApiAliases = SuccessApiAliases | ErrorApiAliases;

const instanceStore = new InstanceStore();
const oneInstanceRemoved = structuredClone(instanceStore.list());
oneInstanceRemoved.pop();

const route = `**/v1/projects/${defaultActiveProject.name}/compute/instances*`;
const totalElements = instanceStore.list().length;

const assignedInstances = instanceStore.list({
  filter: "has(workloadMembers)",
});
const unassignedInstances = instanceStore.list({
  filter: "NOT has(workloadMembers) AND has(host.site)",
});

const successEndpoints: CyApiDetails<
  SuccessApiAliases,
  eim.GetV1ProjectsByProjectNameComputeInstancesApiResponse
> = {
  instancesListSuccess: {
    route: route,
    statusCode: 200,
    response: {
      hasNext: false,
      instances: instanceStore.list(),
      totalElements: 20,
    },
  },
  instancesListSuccessWithFilter: {
    route: `${route}filter=%28name%3D%22testingSearch%22%20OR%20resourceId%3D%22testingSearch%22%29&offset=0&pageSize=10`,
    statusCode: 200,
    response: {
      hasNext: false,
      instances: instanceStore.list(),
      totalElements: totalElements,
    },
  },
  instancesListSuccessWithOrder: {
    route: `${route}orderBy=name%20asc&pageSize=10`,
    statusCode: 200,
    response: {
      hasNext: false,
      instances: instanceStore.list(),
      totalElements: totalElements,
    },
  },
  instancesListSuccessWithOffset: {
    route: `${route}offset=10&pageSize=10`,
    statusCode: 200,
    response: {
      hasNext: false,
      instances: instanceStore.list(),
      totalElements: 20,
    },
  },
  instancesListEmpty: {
    route: route,
    statusCode: 200,
    response: { hasNext: false, instances: [], totalElements: 0 },
  },
  getAssignedMocked: {
    route: `${route}filter=**has%28workloadMembers%29**`,
    statusCode: 200,
    response: {
      hasNext: false,
      instances: assignedInstances,
      totalElements: assignedInstances.length,
    },
  },
  getUnassigned: {
    route: `${route}filter=**NOT%20has%28workloadMembers%29%20AND%20has%28host.site%29**`,
  },
  getUnassignedMocked: {
    route: `${route}filter=**NOT%20has%28workloadMembers%29%20AND%20has%28host.site%29**`,
    statusCode: 200,
    response: {
      hasNext: false,
      instances: unassignedInstances,
      totalElements: unassignedInstances.length,
    },
  },
  getInstanceListAfterDeleteMocked: {
    route: route,
    statusCode: 200,
    response: {
      hasNext: false,
      instances: oneInstanceRemoved,
      totalElements: totalElements,
    },
  },
};

const errorEndpoints: CyApiDetails<ErrorApiAliases> = {
  instancesListError500: {
    route: route,
    statusCode: 500,
  },
};

export class InstancesTablePom extends CyPom<Selectors, ApiAliases> {
  public table: SiTablePom;

  constructor(public rootCy: string = "instancesTable") {
    super(rootCy, [...dataCySelectors], {
      ...successEndpoints,
      ...errorEndpoints,
    });
    this.table = new SiTablePom(rootCy);
  }

  public getTableRows(): Cy {
    return this.table.getRows();
  }

  public getUnassignedResponse(): ApiAliases {
    return CyPom.isResponseMocked
      ? this.api.getUnassignedMocked
      : this.api.getUnassigned;
  }
}
