/*
 * SPDX-FileCopyrightText: (C) 2026 Intel Corporation
 * SPDX-License-Identifier: Apache-2.0
 */

import { rps } from "@orch-ui/apis";
import { TablePom } from "@orch-ui/components";
import { CyApiDetails, CyPom, defaultActiveProject } from "@orch-ui/tests";
import { domain1, domains } from "@orch-ui/utils";

const dataCySelectors = ["domainTableList", "createDomainBtn"] as const;
type Selectors = (typeof dataCySelectors)[number];

type DomainSuccessApiAliases =
  | "getAllDomainsMocked"
  | "getAllDomainsEmpty"
  | "createDomainSuccess"
  | "updateDomainSuccess"
  | "deleteDomainSuccess";
type DomainErrorApiAliases = "getAllDomainsError";

type ApiAliases = DomainSuccessApiAliases | DomainErrorApiAliases;

const route = `**/v1/projects/${defaultActiveProject.name}/dm/amt/admin/domains`;
const routeWithParams = `${route}?*`;

const successEndpoints: CyApiDetails<
  DomainSuccessApiAliases,
  rps.CountDomainResponse
> = {
  getAllDomainsMocked: {
    route: routeWithParams,
    statusCode: 200,
    response: domains,
  },
  getAllDomainsEmpty: {
    route: routeWithParams,
    statusCode: 200,
    response: {
      data: [],
      totalCount: 0,
    },
  },
  createDomainSuccess: {
    route: route,
    method: "POST",
    statusCode: 201,
    response: domain1,
  },
  updateDomainSuccess: {
    route: route,
    method: "PATCH",
    statusCode: 200,
    response: domain1,
  },
  deleteDomainSuccess: {
    route: `${route}/*`,
    method: "DELETE",
    statusCode: 204,
  },
};

const errorEndpoints: CyApiDetails<DomainErrorApiAliases> = {
  getAllDomainsError: {
    route: routeWithParams,
    statusCode: 500,
  },
};

class DomainProfileTablePom extends CyPom<Selectors, ApiAliases> {
  public table: TablePom;

  constructor(public rootCy: string = "domainTable") {
    super(rootCy, [...dataCySelectors], {
      ...successEndpoints,
      ...errorEndpoints,
    });
    this.table = new TablePom("domainTableList");
  }
}

export default DomainProfileTablePom;
