/*
 * SPDX-FileCopyrightText: (C) 2023 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { eim } from "@orch-ui/apis";
import { ConfirmationDialogPom, TablePom } from "@orch-ui/components";
import { SiTablePom } from "@orch-ui/poms";
import {
  CyApiDetails,
  cyGet,
  CyPom,
  defaultActiveProject,
} from "@orch-ui/tests";
import { RegionStore } from "@orch-ui/utils";
import RegionsDropdownPom from "../../organism/region/RegionsDropdown/RegionsDropdown.pom";

const dataCySelectors = [
  "iaasHostDetailsHeader",
  "add",
  "regionFormName",
  "create",
  "empty",
  "regionPopup",
] as const;
type Selectors = (typeof dataCySelectors)[number];

type ApiAliases =
  | "getRegions"
  | "getRegionsMocked"
  | "getRegionsAfterDeleteMocked"
  | "getRegionsUpdatedMocked"
  | "regionsListSuccess"
  | "regionsListNotFound"
  | "deleteRegion"
  | "deleteRegionMocked";

const route = `**/v1/projects/${defaultActiveProject.name}/regions`;

const store = new RegionStore();
const totalElements = store.list().length;

const endpoints: CyApiDetails<ApiAliases> = {
  getRegions: {
    route: `${route}?*`,
  },
  getRegionsMocked: {
    route: `${route}?*`,
    statusCode: 200,
    response: {
      hasNext: false,
      regions: store.list(),
      totalElements: totalElements,
    } as eim.GetV1ProjectsByProjectNameRegionsApiResponse,
  },
  getRegionsAfterDeleteMocked: {
    route: `${route}?*`,
    statusCode: 200,
    response: {
      hasNext: false,
      // pretend that one of the regions was deleted
      regions: store.list().slice(1),
      totalElements: totalElements - 1,
    } as eim.GetV1ProjectsByProjectNameRegionsApiResponse,
  },
  getRegionsUpdatedMocked: {
    route: `${route}?*`,
    statusCode: 200,
    response: {
      hasNext: false,
      // pretend that one of the region was updated
      // TODO ideally we should move the E2E test to use the store for the mock. Can we use MSW instead of cypress?
      regions: store
        .list()
        .slice(0, 10)
        .map((r, i) => {
          if (i === 0) {
            return {
              ...r,
              name: `${r.name} Updated`,
            };
          }
          return r;
        }),
      totalElements: Math.min(10, totalElements),
    } as eim.GetV1ProjectsByProjectNameRegionsApiResponse,
  },
  regionsListSuccess: {
    route: `${route}?*`,
    response: {
      hasNext: false,
      regions: store.list().slice(0, 10),
      totalElements: Math.min(10, totalElements),
    } as eim.GetV1ProjectsByProjectNameRegionsApiResponse,
  },
  regionsListNotFound: {
    route: `${route}?*`,
    statusCode: 404,
    response: {
      status: 404,
      detail:
        'rpc error: code = NotFound desc = No resources found for filter: client_uuid:"f3d81dc0-9e04-415f-bacb-69326dc68cc3" filter:{kind:RESOURCE_KIND_REGION}',
    },
  },
  deleteRegion: {
    route: `${route}/*`,
    method: "DELETE",
  },
  deleteRegionMocked: {
    route: `${route}/*`,
    statusCode: 200,
    method: "DELETE",
  },
};

class RegionPom extends CyPom<Selectors, ApiAliases> {
  public table: SiTablePom;
  public regionsTable: TablePom;
  regionsDropdown: RegionsDropdownPom;
  confirmationDialogPom: ConfirmationDialogPom;

  constructor(public rootCy: string = "iaaSRegions") {
    super(rootCy, [...dataCySelectors], endpoints);
    this.table = new SiTablePom();
    this.regionsTable = new TablePom("regionsTable");
    this.confirmationDialogPom = new ConfirmationDialogPom();
  }

  public gotoAddNewRegion(): void {
    this.el.add.click();
  }

  public getResponse(isUpdate: boolean) {
    if (CyPom.isResponseMocked) {
      return isUpdate
        ? this.api.getRegionsUpdatedMocked
        : this.api.getRegionsMocked;
    } else return this.api.getRegions;
  }

  public gotoUpdateRegion(region: string): void {
    this.table.getCellBySearchText(region).find("a").click();
  }

  public delete(regionID: string, name: string) {
    this.table
      .getRowBySearchText(name)
      .find("[data-cy='regionPopup']")
      .click()
      .get("[data-cy='Delete'")
      .click();

    this.interceptApis([
      ...(CyPom.isResponseMocked
        ? [this.api.deleteRegionMocked, this.api.getRegionsAfterDeleteMocked]
        : [this.api.deleteRegion, this.api.getRegions]),
    ]);
    //this.confirmationDialogPom.el.confirmBtn.contains("Delete").click();
    //pom.confirmationDialog.el.confirmBtn.contains("Delete").click();
    // TODO: need a new SI-pom class in @orch-ui/poms
    cyGet("confirmBtn").click();
    this.waitForApis();

    cy.get(
      `@${
        CyPom.isResponseMocked
          ? this.api.deleteRegionMocked
          : this.api.deleteRegion
      }`,
    )
      .its("request.url")
      .then((url: string) => {
        const match = url.match(regionID);
        expect(match && match.length > 0).to.eq(true);
      });
  }
}

export default RegionPom;
