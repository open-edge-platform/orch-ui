/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

// TODO: CREATE A VM Store
import { deploymentClusterOneAppOneId, vms } from "@orch-ui/utils";

import { arm } from "@orch-ui/apis";
import { TablePom } from "@orch-ui/components";
import { SiTablePom } from "@orch-ui/poms";
import { CyApiDetails, CyPom } from "@orch-ui/tests";

const dataCySelectors = [
  "applicationDetailsTable",
  "nameValue",
  "statusValue",
  "namespaceValue",
  "workloadValue",
  "expandToggle",
  "empty",
] as const;
type Selectors = (typeof dataCySelectors)[number];
type QueryApiAliases = "getWorkloads" | "getWorkloadsEmpty";
type MutationApiAliases = "podDeletedSuccess" | "podDeletedFail";

const workloadUrl =
  "**/v1/projects/**/resource/workloads/applications/**/clusters/**";
const workloadPodUrl =
  "**/v1/projects/**/resource/workloads/pods/clusters/**/namespaces/default/pods/**";

const endpointsQuery: CyApiDetails<
  QueryApiAliases,
  arm.AppWorkloadServiceListAppWorkloadsApiResponse
> = {
  getWorkloads: {
    route: workloadUrl,
    statusCode: 200,
    response: vms[deploymentClusterOneAppOneId],
  },
  getWorkloadsEmpty: {
    route: workloadUrl,
    statusCode: 400,
    response: { appWorkloads: [] },
  },
};

const endpointsMutation: CyApiDetails<
  MutationApiAliases,
  arm.PodServiceDeletePodApiResponse
> = {
  podDeletedSuccess: {
    route: `${workloadPodUrl}/delete`,
    method: "PUT",
    statusCode: 200,
  },
  podDeletedFail: {
    route: `${workloadPodUrl}/delete`,
    method: "PUT",
    statusCode: 400,
    response: {
      message: "Error while deleting",
    },
  },
};

class ApplicationDetailsPom extends CyPom<
  Selectors,
  QueryApiAliases | MutationApiAliases
> {
  public workloadsTable: TablePom;
  public workloadsTableUtils: SiTablePom;
  constructor(public rootCy: string = "applicationDetails") {
    super(rootCy, [...dataCySelectors], {
      ...endpointsQuery,
      ...endpointsMutation,
    });
    this.workloadsTable = new TablePom("workloads");
    this.workloadsTableUtils = new SiTablePom("workloads");
  }

  getRowPopupBySearchText(search: string) {
    return this.workloadsTableUtils
      .getRowBySearchText(search)
      .find(".spark-icon-ellipsis-v");
  }
  getRowPopupOptionsBySearchText(search: string) {
    return this.workloadsTableUtils
      .getRowBySearchText(search)
      .find(".popup__options");
  }
}
export default ApplicationDetailsPom;
