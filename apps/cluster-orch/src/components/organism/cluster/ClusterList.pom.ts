/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: LicenseRef-Intel
 */

import { cm } from "@orch-ui/apis";
import { ConfirmationDialogPom, TablePom } from "@orch-ui/components";
import { CyApiDetails, cyGet, CyPom } from "@orch-ui/tests";
import {
  clusterEmptyLocationInfo,
  clusterFive,
  clusterFour,
  clusterOne,
  clusterOneCreating,
  clusterSix,
  clusterThree,
  clusterTwo,
} from "@orch-ui/utils";

const dataCySelectors = ["tableRowOptions"] as const;
type Selectors = (typeof dataCySelectors)[number];

type ClusterSuccessApiAliases =
  | "clusterListSuccess"
  | "clusterListWithFilter"
  | "clusterListWithOffset"
  | "clusterListOverFive"
  | "clusterListEmpty"
  | "clusterListNoLocationInfo"
  | "deleteCluster"
  | "creatingHostCluster";

type ClusterErrorApiAliases = "clusterListError500";

type ApiAliases = ClusterSuccessApiAliases | ClusterErrorApiAliases;

const route = "**/v2/**/clusters**";
const routeDelete = "**/v2/**/clusters/**";
const successEndpoints: CyApiDetails<
  ClusterSuccessApiAliases,
  cm.GetV2ProjectsByProjectNameClustersApiResponse
> = {
  clusterListSuccess: {
    route,
    statusCode: 200,
    response: {
      clusters: [clusterOne, clusterTwo],
      totalElements: 20,
    },
  },
  clusterListWithFilter: {
    route: `${route}filter=name%3Dtesting+OR+providerStatus.indicator%3Dtesting+OR+kubernetesVersion%3Dtesting`,
    statusCode: 200,
    response: {
      clusters: [clusterOne, clusterTwo],
      totalElements: 2,
    },
  },
  clusterListWithOffset: {
    route: `${route}offset=10`,
    statusCode: 200,
    response: {
      clusters: [clusterOne, clusterTwo],
      totalElements: 2,
    },
  },
  clusterListOverFive: {
    route,
    statusCode: 200,
    response: {
      clusters: [
        clusterOne,
        clusterTwo,
        clusterThree,
        clusterFour,
        clusterFive,
        clusterSix,
      ],
      totalElements: 6,
    },
  },

  clusterListEmpty: {
    route,
    statusCode: 200,
    response: {
      clusters: [],
      totalElements: 0,
    },
  },
  clusterListNoLocationInfo: {
    route,
    statusCode: 200,
    response: {
      clusters: [clusterEmptyLocationInfo],
      totalElements: 0,
    },
  },
  deleteCluster: {
    route: routeDelete,
    method: "DELETE",
    statusCode: 200,
  },
  creatingHostCluster: {
    route,
    statusCode: 200,
    response: {
      clusters: [clusterOneCreating],
      totalElements: 1,
    },
  },
};

const errorEndpoints: CyApiDetails<
  ClusterErrorApiAliases,
  cm.GetV2ProjectsByProjectNameClustersApiResponse
> = {
  clusterListError500: { route, statusCode: 500 },
};

export class ClusterListPom extends CyPom<Selectors, ApiAliases> {
  public table: TablePom;
  public confirmationDialogPom: ConfirmationDialogPom;

  constructor(public rootCy: string = "clusterList") {
    super(rootCy, [...dataCySelectors], {
      ...successEndpoints,
      ...errorEndpoints,
    });
    this.table = new TablePom("clusterList");
    this.confirmationDialogPom = new ConfirmationDialogPom();
  }

  public selectPopupOption(clusterName: string, option: string) {
    this.table.getRows().each((el) => {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (cy.wrap(el).contains(clusterName)) {
        cy.wrap(el)
          .contains(clusterName)
          .parent()
          .parent()
          .parent()
          .within(() => {
            cyGet("tableRowOptions").click();
            cy.contains(option).click();
          });
        // break the loop https://docs.cypress.io/api/commands/each#Return-early
        return false;
      }
    });
  }
}
