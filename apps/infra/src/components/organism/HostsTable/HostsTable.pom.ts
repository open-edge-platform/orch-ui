/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */
import { infra } from "@orch-ui/apis";
import { TableColumn, TablePom } from "@orch-ui/components";
import {
  Cy,
  CyApiDetails,
  CyPom,
  defaultActiveProject,
  encodeURLQuery,
} from "@orch-ui/tests";
import {
  assignedHosts,
  assignedWorkloadHostOne as hostOne,
  onboardedHosts,
  provisionedHosts,
  registeredHosts,
} from "@orch-ui/utils";
import { HostTableColumn } from "../../../utils/HostTableColumns";
import HostsTableRowExpansionDetailPom from "../../atom/HostsTableRowExpansionDetail/HostsTableRowExpansionDetail.pom";
import HostPopupPom from "../../molecules/ProvisionedHostPopup/ProvisionedHostPopup.pom";

export const unconfiguredColumn: TableColumn<infra.HostRead>[] = [
  HostTableColumn.name("../"),
  HostTableColumn.guid,
  HostTableColumn.serialNumber,
  HostTableColumn.status,
];
export const configuredColumns: TableColumn<infra.HostRead>[] = [
  ...unconfiguredColumn,
  HostTableColumn.site,
];

const dataCySelectors = [
  "selectedHostsBanner",
  "provisionBtn",
  "onboardBtn",
  "cancelBtn",
  "search",
] as const;
type Selectors = (typeof dataCySelectors)[number];

type GenericHostSuccessApiAliases =
  | "getHostsListEmpty"
  | "getHostsListSuccessPage1Total10"
  | "getHostsListSuccessPage1Total18"
  | "getHostsListSuccessPage2"
  | "getHostsListSuccessWithSiteFilter"
  | "getHostsListSuccessWithSearchFilter"
  | "getHostsListSuccessWithOrderAsc"
  | "getHostsListSuccessWithOrderDesc"
  | "patchOnboardHost";
type SpecificHostSuccessApiAliases =
  | "getOnboardedHosts"
  | "getConfiguredHosts"
  | "getActiveHosts"
  | "getRegisteredHosts";
type HostSuccessApiAliases =
  | GenericHostSuccessApiAliases
  | SpecificHostSuccessApiAliases;
type HostErrorApiAliases = "getHostsListError500" | "patchOnboardHostError";

type ApiAliases = HostSuccessApiAliases | HostErrorApiAliases;

const route = `**/v1/projects/${defaultActiveProject.name}/compute/hosts**`;

const generateHostList = (
  size: number,
  indexOffset = 0,
  applyHostChanges = hostOne,
) => {
  return [...Array(size).keys()].map((i) => {
    return {
      hostOne,
      ...applyHostChanges,
      name: `Host ${indexOffset + i}`,
      resourceId: `host-${indexOffset + i}`,
    };
  });
};

const hostResponseOfSize10Total10 = {
  hasNext: false,
  hosts: generateHostList(10),
  totalElements: 10,
};

const hostResponseOfSize10Total18 = {
  ...hostResponseOfSize10Total10,
  hasNext: true,
  totalElements: 18,
};

const genericHostSuccessEndpoints: CyApiDetails<
  GenericHostSuccessApiAliases,
  infra.GetV1ProjectsByProjectNameComputeHostsApiResponse
> = {
  getHostsListEmpty: {
    route: route,
    statusCode: 200,
    response: { hasNext: false, hosts: [], totalElements: 0 },
  },
  getHostsListSuccessPage1Total10: {
    route: route,
    statusCode: 200,
    response: hostResponseOfSize10Total10,
  },
  getHostsListSuccessPage1Total18: {
    route: route,
    statusCode: 200,
    response: hostResponseOfSize10Total18,
  },
  getHostsListSuccessPage2: {
    route: route,
    statusCode: 200,
    response: {
      hasNext: true,
      hosts: generateHostList(8, 10),
      totalElements: 8,
    },
  },
  getHostsListSuccessWithSearchFilter: {
    route: `${route}filter=${encodeURLQuery('(name="testingSearch" OR uuid="testingSearch" OR serialNumber="testingSearch" OR resourceId="testingSearch" OR note="testingSearch" OR site.name="testingSearch" OR instance.desiredOs.name="testingSearch")')}**`,
    statusCode: 200,
    response: {
      hasNext: true,
      hosts: generateHostList(5, 0, {
        name: "rough",
        serialNumber: "testingSearch",
      }),
      totalElements: 5,
    },
  },
  getHostsListSuccessWithSiteFilter: {
    route: `${route}filter=${encodeURLQuery('site.resourceId="test-site" AND (desiredState=HOST_STATE_ONBOARDED OR currentState=HOST_STATE_ONBOARDED) AND instance.desiredState=INSTANCE_STATE_RUNNING AND has(site) AND has(instance.workloadMembers)')}**`,
    response: (req) => {
      const hostRes = {
        hasNext: false,
        hosts: generateHostList(8, 0, {
          name: "rough",
          site: {
            name: "testSite",
            resourceId: "test-site",
            siteID: "test-site",
          },
        }),
        totalElements: 8,
      };
      req.reply({ statusCode: 200, body: hostRes });
      return hostRes;
    },
  },
  getHostsListSuccessWithOrderAsc: {
    route: `${route}orderBy=name%20asc**`,
    statusCode: 200,
    response: hostResponseOfSize10Total10,
  },
  getHostsListSuccessWithOrderDesc: {
    route: `${route}orderBy=name%20desc**`,
    statusCode: 200,
    response: {
      ...hostResponseOfSize10Total10,
      hosts: hostResponseOfSize10Total10.hosts.reverse(),
    },
  },
  patchOnboardHost: {
    method: "patch",
    route: "**/compute/hosts/**",
    statusCode: 200,
  },
};

const specificHostSuccessApiEndpoints: CyApiDetails<
  SpecificHostSuccessApiAliases,
  infra.GetV1ProjectsByProjectNameComputeHostsApiResponse
> = {
  getOnboardedHosts: {
    route: `${route}filter=${encodeURLQuery("((desiredState=HOST_STATE_ONBOARDED OR currentState=HOST_STATE_ONBOARDED) OR (currentState=HOST_STATE_ERROR AND NOT desiredState=HOST_STATE_REGISTERED)) AND (NOT has(site) OR NOT has(instance) OR NOT instance.desiredState=INSTANCE_STATE_RUNNING)")}**`,
    statusCode: 200,
    response: onboardedHosts,
  },
  getConfiguredHosts: {
    route: `${route}filter=${encodeURLQuery("((desiredState=HOST_STATE_ONBOARDED OR currentState=HOST_STATE_ONBOARDED) OR currentState=HOST_STATE_ERROR) AND ((instance.desiredState=INSTANCE_STATE_RUNNING OR instance.currentState=INSTANCE_STATE_RUNNING) OR instance.currentState=INSTANCE_STATE_ERROR) AND has(site) AND NOT has(instance.workloadMembers)")}**`,
    statusCode: 200,
    response: provisionedHosts,
  },
  getActiveHosts: {
    route: `${route}filter=${encodeURLQuery("((desiredState=HOST_STATE_ONBOARDED OR currentState=HOST_STATE_ONBOARDED) OR currentState=HOST_STATE_ERROR) AND ((instance.desiredState=INSTANCE_STATE_RUNNING OR instance.currentState=INSTANCE_STATE_RUNNING) OR instance.currentState=INSTANCE_STATE_ERROR) AND has(site) AND has(instance.workloadMembers)")}**`,
    statusCode: 200,
    response: assignedHosts,
  },
  getRegisteredHosts: {
    route: `${route}filter=${encodeURLQuery("(desiredState=HOST_STATE_REGISTERED) OR ((desiredState=HOST_STATE_ONBOARDED) AND currentState=HOST_STATE_UNSPECIFIED)")}**`,
    statusCode: 200,
    response: registeredHosts,
  },
};

const errorEndpoints: CyApiDetails<HostErrorApiAliases> = {
  getHostsListError500: {
    route: route,
    statusCode: 500,
  },
  patchOnboardHostError: {
    method: "patch",
    route: "**/compute/hosts/**",
    statusCode: 500,
  },
};

class HostsTablePom extends CyPom<Selectors, ApiAliases> {
  public table: TablePom;
  public hostPopup: HostPopupPom;
  public hostRowDetails: HostsTableRowExpansionDetailPom;

  constructor(public rootCy: string = "hostsTable") {
    super(rootCy, [...dataCySelectors], {
      ...genericHostSuccessEndpoints,
      ...specificHostSuccessApiEndpoints,
      ...errorEndpoints,
    });
    this.table = new TablePom();
    this.hostPopup = new HostPopupPom();
    this.hostRowDetails = new HostsTableRowExpansionDetailPom();
  }

  public getTableRows(): Cy {
    return this.table.getRows();
  }

  public getCell(row: number, column: number): Cy {
    return this.table.getCell(row, column);
  }
  // TODO: REMOVE this when @orch-ui/components tablePom has below functions definition
  public getRowBySearchText(searchFor: string): Cy<HTMLTableRowElement> {
    return this.root.contains(searchFor).closest("tr");
  }
  public getColumns(): Cy {
    return this.root.get("thead th");
  }
  public getHostCheckboxByName(name: string) {
    return this.getRowBySearchText(name).find("[data-cy='rowSelectCheckbox']");
  }
  // TODO: END
}
export default HostsTablePom;
